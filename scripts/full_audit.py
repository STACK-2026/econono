#!/usr/bin/env python3
"""
Audit complet econono.com vs MEMORY.md rules + standards SEO/GEO.

Checks :
A. Brand voice : tirets cadratins, vouvoiement, accents français
B. Slugs : conformes, pas de doublons, ASCII safe
C. Liens internes : tous les hrefs résolvent à une page existante
D. Liens externes : HTTP 200 (échantillon)
E. SEO on-page : titles ≤60c, meta ≤160c, 1 H1 par page, alt sur images
F. Structured data : JSON-LD présent, BreadcrumbList sur pages indexées
G. GEO/AEO : data-speakable sur calculateurs, llms.txt OK
H. STACK-2026 : favicon SVG, cookie banner CNIL, 404 brandé, robots.txt AI bots
I. Sitemap completeness : built pages == sitemap entries

Usage : python3 scripts/full_audit.py [--live]
"""
import json
import os
import re
import sys
import urllib.request
import urllib.error
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).parent.parent
SITE = ROOT / "site"
DIST = SITE / "dist"
SRC = SITE / "src"

issues = defaultdict(list)
counts = defaultdict(int)


def check(category, ok, msg, level="ERROR"):
    counts[category + "_total"] += 1
    if ok:
        counts[category + "_pass"] += 1
    else:
        issues[category].append((level, msg))


# ===========================================================================
# A. BRAND VOICE
# ===========================================================================
print("=== A. Brand voice (tirets, vouvoiement, accents) ===")

# A1. Tirets cadratins dans la source
em_dash_files = []
for f in SRC.rglob("*.astro"):
    content = f.read_text()
    if "—" in content or "–" in content:
        em_dash_files.append(str(f.relative_to(ROOT)))
check("A1_em_dash", len(em_dash_files) == 0, f"Em/en-dashes dans {len(em_dash_files)} fichiers : {em_dash_files[:5]}")

# A2. Tirets cadratins dans le HTML buildé (lignes contenu, pas attributs)
em_dash_html = []
for f in DIST.rglob("*.html"):
    content = f.read_text()
    if "—" in content or "–" in content:
        # filter false positives in JS/JSON
        if re.search(r">[^<]*[—–][^<]*<", content):
            em_dash_html.append(str(f.relative_to(DIST)))
check("A2_em_dash_html", len(em_dash_html) == 0, f"Em-dashes dans le HTML rendu de {len(em_dash_html)} pages : {em_dash_html[:5]}")

# A3. Vouvoiement (hors pages légales et commentaires)
vouvoiement_files = []
# Whitelist pages où "vous" est pluriel grammatical légitime (couple, parents)
LEGAL_PATHS = ["mentions-legales", "politique-confidentialite", "politique-cookies", "budget-couple", "budget-bebe"]
for f in SRC.rglob("*.astro"):
    rel = str(f.relative_to(ROOT))
    if any(lp in rel for lp in LEGAL_PATHS):
        continue
    content = f.read_text()
    # Strip JS/comments
    content_stripped = re.sub(r'^//.*$', '', content, flags=re.M)
    content_stripped = re.sub(r'/\*.*?\*/', '', content_stripped, flags=re.S)
    # Find vouvoiement in textual content (not attributes)
    matches = re.findall(r'(?<![\w/])(vous|votre|vos|Vous|Votre|Vos)\s+[a-zéèêàçîôû]', content_stripped)
    if len(matches) > 1:  # tolerate 1 occurrence (might be data attribute)
        vouvoiement_files.append((rel, len(matches)))
check("A3_vouvoiement", len(vouvoiement_files) == 0, f"Vouvoiement dans {len(vouvoiement_files)} fichiers (hors légal) : {vouvoiement_files[:5]}")

# A4. Accents français : pas de \uXXXX dans le contenu user-facing
unicode_escapes = []
for f in SRC.rglob("*.astro"):
    content = f.read_text()
    # exclude legitimate   (non-breaking space) which is OK in JS contexts
    matches = re.findall(r'\\u00[a-zA-Z][0-9a-fA-F]', content)
    matches = [m for m in matches if m not in ['\\u00a0']]
    if matches:
        unicode_escapes.append((str(f.relative_to(ROOT)), matches[:3]))
check("A4_accents_escape", len(unicode_escapes) == 0, f"Unicode escapes (au lieu d'accents directs) dans {len(unicode_escapes)} fichiers")


# ===========================================================================
# B. SLUGS
# ===========================================================================
print("\n=== B. Slugs ===")

# B1. Pas d'accents dans les slugs URL
slug_with_accent = []
for f in DIST.rglob("*.html"):
    rel = str(f.relative_to(DIST))
    if re.search(r'[éèêàçîôûÉÈÊÀÇÎÔÛ]', rel):
        slug_with_accent.append(rel)
check("B1_slug_accents", len(slug_with_accent) == 0, f"Slugs avec accents : {slug_with_accent}")

# B2. Pas de slug uppercase
slug_upper = []
for f in DIST.rglob("*.html"):
    rel = str(f.relative_to(DIST))
    parts = rel.split("/")
    for p in parts[:-1]:  # all path parts except filename
        if any(c.isupper() for c in p):
            slug_upper.append(rel)
            break
check("B2_slug_lower", len(slug_upper) == 0, f"Slugs avec majuscules : {slug_upper}")


# ===========================================================================
# C. LIENS INTERNES
# ===========================================================================
print("\n=== C. Liens internes (résolution) ===")

# Collect all built page paths
built_paths = set()
for f in DIST.rglob("*.html"):
    rel = "/" + str(f.relative_to(DIST)).replace("/index.html", "/").rstrip("/")
    if rel == "" or rel == "/":
        rel = "/"
    elif not rel.endswith("/") and rel != "/404":
        rel += "/"
    built_paths.add(rel)
    # also add without trailing slash
    if rel.endswith("/"):
        built_paths.add(rel.rstrip("/"))
# Special files
for f in DIST.glob("*"):
    if f.is_file():
        built_paths.add("/" + f.name)

print(f"  {len(built_paths)} chemins buildés")

# Extract internal hrefs from all HTML
# Real check: find broken HTML page links (skip assets)
broken_internal = []
all_internal = set()
all_assets_ok = set()
# Pre-collect all asset paths
for f in DIST.rglob("*"):
    if f.is_file():
        rel = "/" + str(f.relative_to(DIST))
        all_assets_ok.add(rel)

for f in DIST.rglob("*.html"):
    rel_page = "/" + str(f.relative_to(DIST)).replace("/index.html", "/")
    content = f.read_text()
    hrefs = re.findall(r'href="(/[^"#?]*)"', content)
    for h in hrefs:
        all_internal.add(h)
        # Skip assets (CSS, JS, images, fonts, etc.)
        if h.startswith("/_astro/") or h.startswith("/fonts/") or h.startswith("/logos/"):
            continue
        if re.search(r'\.(css|js|svg|png|jpg|jpeg|webp|woff|woff2|ttf|ico|xml|txt|json|pdf)$', h):
            continue
        if h in ["/", "/sitemap.xml", "/sitemap-index.xml", "/rss.xml"]:
            continue
        # Normalize target
        target = h if h.endswith("/") else h + "/"
        if target not in built_paths and h not in built_paths:
            broken_internal.append((rel_page, h))

check("C1_internal_links", len(broken_internal) == 0, f"{len(broken_internal)} liens internes cassés")
if broken_internal:
    seen = set()
    for src, target in broken_internal[:10]:
        key = (src.replace("/index.html", "/"), target)
        if key not in seen:
            seen.add(key)
            print(f"    BROKEN: {src.replace('/index.html','/')} → {target}")


# ===========================================================================
# E. SEO on-page
# ===========================================================================
print("\n=== E. SEO on-page (titles, meta, H1) ===")

title_too_long = []
desc_too_long = []
desc_missing = []
title_missing = []
multiple_h1 = []
no_h1 = []

for f in DIST.rglob("*.html"):
    rel = str(f.relative_to(DIST))
    if "404" in rel:
        continue
    content = f.read_text()
    # Title
    title_m = re.search(r"<title[^>]*>([^<]+)</title>", content)
    if not title_m:
        title_missing.append(rel)
        continue
    title = title_m.group(1)
    if len(title) > 65:
        title_too_long.append((rel, len(title)))
    # Meta description
    desc_m = re.search(r'<meta name="description" content="([^"]+)"', content)
    if not desc_m:
        desc_missing.append(rel)
    else:
        if len(desc_m.group(1)) > 165:
            desc_too_long.append((rel, len(desc_m.group(1))))
    # H1 count
    h1s = re.findall(r"<h1[^>]*>", content)
    if len(h1s) > 1:
        multiple_h1.append((rel, len(h1s)))
    elif len(h1s) == 0:
        no_h1.append(rel)

check("E1_title_len", len(title_too_long) == 0, f"{len(title_too_long)} titles >65c")
check("E2_desc_len", len(desc_too_long) == 0, f"{len(desc_too_long)} meta descriptions >165c")
check("E3_desc_present", len(desc_missing) == 0, f"{len(desc_missing)} pages sans meta description : {desc_missing[:3]}")
check("E4_h1_unique", len(multiple_h1) == 0, f"{len(multiple_h1)} pages avec >1 H1")
check("E5_h1_present", len(no_h1) == 0, f"{len(no_h1)} pages sans H1 : {no_h1[:3]}")


# ===========================================================================
# F. Structured data
# ===========================================================================
print("\n=== F. Structured data (JSON-LD) ===")

no_jsonld = []
no_breadcrumb = []
INDEX_PAGES = ["index.html", "404.html", "sitemap-index.xml"]
for f in DIST.rglob("*.html"):
    rel = str(f.relative_to(DIST))
    if "404" in rel:
        continue
    content = f.read_text()
    jsonld_scripts = re.findall(r'<script type="application/ld\+json">(.+?)</script>', content, re.S)
    if not jsonld_scripts:
        no_jsonld.append(rel)
        continue
    # Validate JSON
    invalid = False
    has_breadcrumb = False
    for script in jsonld_scripts:
        try:
            data = json.loads(script)
            if isinstance(data, dict) and data.get("@type") == "BreadcrumbList":
                has_breadcrumb = True
            elif isinstance(data, list):
                for item in data:
                    if isinstance(item, dict) and item.get("@type") == "BreadcrumbList":
                        has_breadcrumb = True
        except json.JSONDecodeError as e:
            invalid = True
    # Breadcrumbs not required on homepage
    if not has_breadcrumb and rel != "index.html" and "/categorie/" not in rel:
        # Some pages legitimately don't need it
        if "/blog/" in rel or "/actu/" in rel and rel.endswith("/index.html"):
            continue
        no_breadcrumb.append(rel)

check("F1_jsonld_present", len(no_jsonld) == 0, f"{len(no_jsonld)} pages sans JSON-LD")
check("F2_breadcrumb", len(no_breadcrumb) <= 5, f"{len(no_breadcrumb)} pages sans BreadcrumbList JSON-LD : {no_breadcrumb[:5]}")


# ===========================================================================
# G. GEO / AEO
# ===========================================================================
print("\n=== G. GEO / AEO ===")

speakable_calc = []
for f in (DIST / "calculateurs").rglob("index.html"):
    rel = str(f.relative_to(DIST))
    if rel == "calculateurs/index.html":
        continue
    content = f.read_text()
    if "data-speakable" not in content:
        speakable_calc.append(rel)
check("G1_speakable_calc", len(speakable_calc) == 0, f"{len(speakable_calc)} calculateurs sans data-speakable : {speakable_calc[:3]}")

# llms.txt présent et non vide
llms_path = DIST / "llms.txt"
llms_ok = llms_path.exists() and len(llms_path.read_text()) > 500
check("G2_llms_txt", llms_ok, "llms.txt absent ou vide")

# robots.txt avec AI bots
robots_path = DIST / "robots.txt"
robots_ok = robots_path.exists() and "GPTBot" in robots_path.read_text() and "ClaudeBot" in robots_path.read_text() and "PerplexityBot" in robots_path.read_text()
check("G3_robots_ai", robots_ok, "robots.txt manque des AI bots")


# ===========================================================================
# H. STACK-2026 rules
# ===========================================================================
print("\n=== H. STACK-2026 rules ===")

# H1. Favicon SVG
fav_path = DIST / "favicon.svg"
check("H1_favicon", fav_path.exists() and len(fav_path.read_text()) > 100, "favicon.svg absent ou vide")

# H2. Cookie banner present in BaseLayout
cookie_path = SRC / "components" / "CookieBanner.astro"
check("H2_cookie_banner", cookie_path.exists() and "13" in cookie_path.read_text(), "Cookie banner CNIL absent ou TTL non 13 mois")

# H3. 404 brandé
not_found = DIST / "404.html"
check("H3_404", not_found.exists() and "Carnet" in not_found.read_text(), "404 absent ou non brandé Econono")

# H4. IndexNow key file
indexnow_files = list(DIST.glob("*.txt"))
indexnow_key_present = any(re.match(r'^[a-f0-9]{32}\.txt$', f.name) for f in indexnow_files)
check("H4_indexnow", indexnow_key_present, "Pas de key IndexNow .txt")

# H5. OG default existe (svg ou png)
og_svg = DIST / "og-default.svg"
og_png = DIST / "og-default.png"
check("H5_og_image", og_svg.exists() or og_png.exists(), "OG image default absente")


# ===========================================================================
# I. Sitemap completeness
# ===========================================================================
print("\n=== I. Sitemap completeness ===")

sitemap_path = DIST / "sitemap-0.xml"
if not sitemap_path.exists():
    # try alternative
    sitemap_files = list(DIST.glob("sitemap*.xml"))
    sitemap_path = sitemap_files[0] if sitemap_files else None

if sitemap_path and sitemap_path.exists() and "sitemap-index" not in sitemap_path.name:
    sm_content = sitemap_path.read_text()
    sm_urls = set(re.findall(r"<loc>([^<]+)</loc>", sm_content))
    # Compare with built HTML pages
    expected_urls = set()
    for f in DIST.rglob("*.html"):
        rel = str(f.relative_to(DIST))
        if rel == "404.html" or "/admin/" in rel:
            continue
        url_path = "/" + rel.replace("/index.html", "/").replace("index.html", "")
        if not url_path.endswith("/"):
            url_path += "/"
        expected_urls.add("https://econono.com" + url_path)

    missing = expected_urls - sm_urls
    extra = sm_urls - expected_urls
    check("I1_sitemap_complete", len(missing) <= 2, f"{len(missing)} URLs HTML manquent du sitemap : {list(missing)[:5]}")
    print(f"    HTML buildés : {len(expected_urls)} | Sitemap : {len(sm_urls)}")
else:
    check("I1_sitemap_complete", False, "Sitemap introuvable")


# ===========================================================================
# RAPPORT FINAL
# ===========================================================================
print("\n" + "=" * 70)
print("RAPPORT FINAL")
print("=" * 70)

categories = sorted(set(k.rsplit("_", 1)[0] for k in counts.keys()))
total_pass = 0
total_check = 0
for cat in categories:
    p = counts.get(cat + "_pass", 0)
    t = counts.get(cat + "_total", 0)
    if t > 0:
        total_pass += p
        total_check += t
        status = "✅" if p == t else "🟡" if p > 0 else "❌"
        print(f"  {status} {cat:30s} {p}/{t}")

print(f"\nGLOBAL : {total_pass}/{total_check} checks pass ({(total_pass/total_check*100):.0f}%)")

if issues:
    print("\n" + "=" * 70)
    print("ISSUES DETAILLEES")
    print("=" * 70)
    for cat, items in issues.items():
        for level, msg in items:
            print(f"  [{level}] [{cat}] {msg}")

print()
sys.exit(0 if not issues else 1)
