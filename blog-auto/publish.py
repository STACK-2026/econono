#!/usr/bin/env python3
"""
Econono blog auto-publisher.

Lit articles_plan.json, trouve l'article scheduled_date <= today qui n'existe pas en md.

Pipeline :
  1. (Optionnel) SERP brief Gemini avec Google Search grounding
  2. Mistral large draft
  3. Claude Sonnet audit (fact-check + structure)
  4. Mistral fix pass
  5. Écrit Markdown avec frontmatter dans site/src/content/blog/<slug>.md
  6. Push via GitHub Contents API (atomique, zéro race)
  7. IndexNow + Bing URL submission

Cron : daily 7h-9h Europe/Paris (memory rule heures aléatoires).
"""
from __future__ import annotations

import base64
import hashlib
import json
import logging
import os
import random
import re
import sys
import time
from datetime import datetime, date, timezone, timedelta
from pathlib import Path
try:
    from zoneinfo import ZoneInfo
    PARIS_TZ = ZoneInfo("Europe/Paris")
except Exception:
    PARIS_TZ = timezone(timedelta(hours=2))  # fallback summer offset

import requests

sys.path.insert(0, str(Path(__file__).parent))
try:
    from mistral_pipeline import generate_with_mistral_audit
except Exception as e:
    print(f"[warn] mistral_pipeline not importable: {e}")
    generate_with_mistral_audit = None

sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))
try:
    from serp_brief import enrich_article_with_serp_brief
except Exception:
    enrich_article_with_serp_brief = None

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("econono-blog-auto")

# ============================================================
# Paths
# ============================================================
BLOG_AUTO_DIR = Path(__file__).parent
PLAN_FILE = BLOG_AUTO_DIR / "articles_plan.json"
PROMPT_FILE = BLOG_AUTO_DIR / "prompts" / "article-seo.md"
BLOG_DIR = BLOG_AUTO_DIR.parent / "site" / "src" / "content" / "blog"
LOG_DIR = BLOG_AUTO_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)

# ============================================================
# Brand / config
# ============================================================
SITE_NAME = "Econono"
SITE_URL = "https://econono.com"
APP_URL = "https://econono.com/calculateurs/"
SITE_DESCRIPTION = (
    "Le média indépendant qui aide les Français à reprendre la main sur leur budget. "
    "Calculateurs gratuits, guides honnêtes, comparatifs sans pub déguisée, actu pouvoir d'achat."
)
POSITIONING = "Média français indépendant sur la gestion de budget personnel, sans lien capitalistique avec une banque ou un courtier"

AUTHORS = [
    "Léa Dubreuil",
    "Marc Henrion",
    "Sophie Vallet",
    "Antoine Berger",
    "Camille Pellier",
]

FORBIDDEN_PHRASES = (
    "jargon bancaire non expliqué, formulations creuses type 'épargner intelligemment', "
    "leçons de morale type 'il faut épargner', conseils vagues sans chiffre, "
    "'investir avec sérénité', 'prendre les rênes de votre avenir financier'"
)

# Bing URL Submission shared key (memory rule)
BING_KEY = os.environ.get("BING_URL_SUBMISSION_KEY", "")
INDEXNOW_KEY = os.environ.get("INDEXNOW_KEY", "")

# GitHub push
GH_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GH_REPO = os.environ.get("GITHUB_REPOSITORY", "STACK-2026/econono")


# ============================================================
# Helpers
# ============================================================
def pick_author(slug: str, override: str | None = None) -> str:
    if override:
        return override
    h = int(hashlib.md5(slug.encode()).hexdigest(), 16)
    return AUTHORS[h % len(AUTHORS)]


def today_str() -> str:
    """Date du jour en zone Paris · évite le bug runner UTC vs cron 7h-9h Paris."""
    return datetime.now(PARIS_TZ).date().isoformat()


def random_publish_time_iso() -> str:
    """ISO datetime UTC, randomised inside the daily 7h-9h Paris window. Memory rule."""
    now = datetime.now(timezone.utc)
    # 7h-9h Paris (été = UTC+2 = 5h-7h UTC ; hiver = UTC+1 = 6h-8h UTC)
    hour = random.randint(5, 7)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return now.replace(hour=hour, minute=minute, second=second, microsecond=0).isoformat()


def strip_em_dashes(text: str) -> str:
    """Remove em/en dashes (memory rule absolute)."""
    return text.replace("—", ", ").replace("–", "-")


def slug_to_path(slug: str) -> Path:
    return BLOG_DIR / f"{slug}.md"


# ============================================================
# Plan loading
# ============================================================
def load_plan() -> dict:
    with PLAN_FILE.open("r", encoding="utf-8") as f:
        return json.load(f)


def find_next_due_article(plan: dict) -> dict | None:
    today = today_str()
    for article in plan.get("articles", []):
        sched = article.get("scheduled_date") or article.get("date")
        if not sched or sched > today:
            continue
        file_path = slug_to_path(article["slug"])
        if file_path.exists():
            continue
        return article
    return None


# ============================================================
# Prompt building
# ============================================================
def load_system_prompt() -> str:
    raw = PROMPT_FILE.read_text(encoding="utf-8")
    return (
        raw.replace("{{SITE_NAME}}", SITE_NAME)
        .replace("{{SITE_URL}}", SITE_URL)
        .replace("{{APP_URL}}", APP_URL)
        .replace("{{SITE_DESCRIPTION}}", SITE_DESCRIPTION)
        .replace("{{POSITIONING}}", POSITIONING)
        .replace("{{FORBIDDEN_PHRASES}}", FORBIDDEN_PHRASES)
    )


def build_user_prompt(article: dict) -> str:
    title = article.get("working_title", "")
    keyword = article.get("target_keyword", "")
    angle = article.get("angle", "")
    pillar = article.get("pillar", "")
    cluster = article.get("cluster", "")

    parts = [
        f"KEYWORD PRINCIPAL: {keyword}",
        f"TITRE DE TRAVAIL: {title}",
        f"ANGLE EDITORIAL: {angle}",
    ]
    if pillar:
        parts.append(f"PILLAR (linker vers): {pillar}")
    if cluster:
        parts.append(f"CLUSTER (linker 2-3 spokes): {cluster}")

    parts.extend([
        "",
        "Contraintes structurelles :",
        "- 3500+ mots si pillar, 1800-2500 si spoke",
        "- TL;DR speakable en tête (50-90 mots)",
        "- 10+ liens internes vers calculateurs/guides/comparatifs",
        "- 5+ liens externes autorité (INSEE, Service-Public, Banque de France, etc.)",
        "- FAQ minimum 5 questions",
        "- Section Sources à la fin avec 5+ liens vérifiés",
        "- Tutoiement, zéro tiret cadratin, accents français corrects",
    ])

    serp = article.get("serp_brief") or {}
    if serp:
        parts.append("\n=== BRIEF CONCURRENTIEL SERP (Gemini grounding) ===")
        parts.append(json.dumps(serp, ensure_ascii=False, indent=2)[:4500])
        parts.append("=== FIN BRIEF ===")
        parts.append("Exploite ces angles faibles et winning moves pour écraser le top 3 Google.")

    return "\n".join(parts)


# ============================================================
# Output parsing
# ============================================================
def extract_frontmatter_fields(generated: str) -> tuple[str, str, str]:
    title_match = re.search(r"^TITLE_TAG:\s*(.+)$", generated, re.MULTILINE)
    meta_match = re.search(r"^META_DESCRIPTION:\s*(.+)$", generated, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else ""
    meta = meta_match.group(1).strip() if meta_match else ""

    body = generated
    if title_match:
        body = re.sub(r"^TITLE_TAG:\s*.+\n?", "", body, count=1, flags=re.MULTILINE)
    if meta_match:
        body = re.sub(r"^META_DESCRIPTION:\s*.+\n?", "", body, count=1, flags=re.MULTILINE)

    body = body.strip()
    if body.startswith("```"):
        body = re.sub(r"^```[a-z]*\n?", "", body)
        body = re.sub(r"\n?```$", "", body)

    return title, meta, body.strip()


def build_markdown_file(article: dict, title: str, meta: str, body: str, author: str) -> str:
    slug = article["slug"]
    category = article.get("category", "guide")
    keywords = article.get("target_keyword", "")
    image_url = article.get("image_url") or "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80"
    image_alt = f"Illustration {title[:80]}"

    body = strip_em_dashes(body)
    title = strip_em_dashes(title)
    meta = strip_em_dashes(meta)

    pub_iso = random_publish_time_iso()
    last_reviewed = today_str()

    fm = [
        "---",
        f'title: {json.dumps(title, ensure_ascii=False)}',
        f'description: {json.dumps(meta[:160], ensure_ascii=False)}',
        f"date: {pub_iso}",
        f"lastReviewed: {last_reviewed}",
        f'author: {json.dumps(author, ensure_ascii=False)}',
        f'reviewedBy: "Économono Editorial"',
        f'category: {json.dumps(category, ensure_ascii=False)}',
        f"tags: {json.dumps([keywords] if keywords else [], ensure_ascii=False)}",
        f"image: {json.dumps(image_url, ensure_ascii=False)}",
        f"imageAlt: {json.dumps(image_alt, ensure_ascii=False)}",
        f"keywords: {json.dumps(keywords, ensure_ascii=False)}",
        "draft: false",
        "---",
        "",
        body,
        "",
    ]
    return "\n".join(fm)


# ============================================================
# GitHub Contents API push (memory rule)
# ============================================================
def push_via_github_api(rel_path: str, content: str, message: str) -> bool:
    if not GH_TOKEN:
        log.warning("GITHUB_TOKEN absent, skip push (dry run)")
        return False

    url = f"https://api.github.com/repos/{GH_REPO}/contents/{rel_path}"
    encoded = base64.b64encode(content.encode("utf-8")).decode("ascii")
    payload = {
        "message": message,
        "content": encoded,
        "branch": "main",
        "committer": {"name": "econono-blog-auto[bot]", "email": "blog-auto@users.noreply.github.com"},
    }

    head = requests.get(
        url,
        headers={"Authorization": f"Bearer {GH_TOKEN}", "Accept": "application/vnd.github+json"},
        params={"ref": "main"},
        timeout=30,
    )
    if head.status_code == 200:
        payload["sha"] = head.json().get("sha", "")

    resp = requests.put(
        url,
        json=payload,
        headers={
            "Authorization": f"Bearer {GH_TOKEN}",
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json",
        },
        timeout=60,
    )

    if resp.status_code in (200, 201):
        commit = resp.json().get("commit", {}).get("sha", "")[:8]
        log.info(f"Pushed {rel_path} via GitHub API (sha {commit})")
        return True
    log.error(f"Push failed {resp.status_code}: {resp.text[:300]}")
    return False


# ============================================================
# IndexNow + Bing URL submission
# ============================================================
def submit_indexnow(url: str) -> bool:
    if not INDEXNOW_KEY:
        return False
    try:
        r = requests.post(
            "https://api.indexnow.org/IndexNow",
            json={
                "host": "econono.com",
                "key": INDEXNOW_KEY,
                "keyLocation": f"https://econono.com/{INDEXNOW_KEY}.txt",
                "urlList": [url],
            },
            timeout=15,
        )
        log.info(f"IndexNow {url}: {r.status_code}")
        return r.status_code in (200, 202)
    except Exception as e:
        log.warning(f"IndexNow failed: {e}")
        return False


def submit_bing_url(url: str) -> bool:
    """Submit URL to Bing Webmaster Tools (memory rule applied to all blog-auto)."""
    if not BING_KEY:
        return False
    try:
        r = requests.post(
            f"https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey={BING_KEY}",
            json={"siteUrl": "https://econono.com", "url": url},
            headers={"Content-Type": "application/json"},
            timeout=15,
        )
        log.info(f"Bing submit {url}: {r.status_code}")
        return r.status_code == 200
    except Exception as e:
        log.warning(f"Bing submit failed: {e}")
        return False


# ============================================================
# Main
# ============================================================
def main() -> int:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"
    log.info(f"start · dry_run={dry_run}")

    plan = load_plan()
    article = find_next_due_article(plan)
    if not article:
        log.info("No article due today. Bye.")
        return 0

    slug = article["slug"]
    log.info(f"next article: {slug} · {article.get('working_title','')}")

    # 0) SERP brief enrichment via Gemini
    if enrich_article_with_serp_brief and os.environ.get("GOOGLE_API_KEY"):
        try:
            article = enrich_article_with_serp_brief(article)
            log.info("serp_brief enriched")
        except Exception as e:
            log.warning(f"serp_brief failed: {e}")

    # 1) Build prompts
    system_prompt = load_system_prompt()
    user_prompt = build_user_prompt(article)

    if dry_run:
        log.info(f"DRY RUN · system={len(system_prompt)} chars, user={len(user_prompt)} chars")
        log.info(f"Would write {slug}.md")
        return 0

    if not generate_with_mistral_audit:
        log.error("mistral_pipeline not available, abort")
        return 1
    if not os.environ.get("MISTRAL_API_KEY") or not os.environ.get("ANTHROPIC_API_KEY"):
        log.error("MISTRAL_API_KEY + ANTHROPIC_API_KEY required, abort")
        return 1

    # 2) Generate (Mistral draft -> Claude audit -> Mistral fix)
    t0 = time.time()
    try:
        generated = generate_with_mistral_audit(system_prompt, user_prompt)
    except Exception as e:
        log.error(f"generation failed: {e}")
        return 1
    elapsed = time.time() - t0
    log.info(f"generated in {elapsed:.1f}s · {len(generated)} chars")

    # 3) Parse output
    title, meta, body = extract_frontmatter_fields(generated)
    if not title or not body:
        log.error("could not extract TITLE_TAG or body")
        (LOG_DIR / f"{slug}.raw.md").write_text(generated, encoding="utf-8")
        return 1

    author = pick_author(slug, article.get("author_pen_name"))

    # 4) Build markdown
    final = build_markdown_file(article, title, meta, body, author)

    # 5) Push via GitHub API (atomic)
    rel_path = f"site/src/content/blog/{slug}.md"
    commit_msg = f"blog-auto: publish {slug}"
    pushed = push_via_github_api(rel_path, final, commit_msg)

    if not pushed:
        p = slug_to_path(slug)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(final, encoding="utf-8")
        log.warning(f"wrote locally to {p} (push failed)")

    # 6) Indexation pings (non-blocking)
    article_url = f"{SITE_URL}/blog/{slug}/"
    submit_indexnow(article_url)
    submit_bing_url(article_url)

    log.info(f"DONE {slug} in {time.time()-t0:.1f}s")
    return 0


if __name__ == "__main__":
    sys.exit(main())
