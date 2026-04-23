# Changelog · Econono

## 0.1.0 · 2026-04-23 · Phase 0 livrée

Initial release. Site complet en ligne, audit 23/23 (100%).

### Ajouté

#### Infra
- GitHub repo public `STACK-2026/econono`
- Cloudflare Pages project `econono` + custom domains econono.com et www
- Cloudflare zone `03dce5a47d304b0e8754db8bfa5ad148` avec DNS apex + www CNAME proxied
- Supabase project `rxdcejlofnhjicupzikx` (eu-west-3, org KARMASTRO) avec migration initiale (newsletter_subscribers, page_views, calculateur_uses, 4 vues admin)
- Resend domaine `send.econono.com` vérifié (DKIM + MX + SPF) + DMARC strict apex
- CF Email Routing : `hello@econono.com` → augustin.foucheres@gmail.com
- IndexNow key `90f1a67bb4a43d0e9f4ffcb19cb9cc9e`
- 13 GH Actions secrets configurés
- 3 workflows : `deploy-site` (push main + workflow_run), `blog-auto` (cron 7-9h Paris × 3/jour), `rebuild-guard` (cron daily 8h23 Paris)
- Intel DB augustinfoucheres : Econono inséré (id=15)

#### Site (Astro 6 SSG)
- 36 pages HTML buildées
- Brand "Le Carnet" : palette vert forêt + jaune doré + crème, fonts Fraunces + Figtree + Caveat + JetBrains Mono
- Homepage 10 sections (Hero TextMorph, Problem, Features, HowItWorks, Stats, Témoignages composites, Équipe 5 portraits, Newsletter, FAQ, CTA)
- 12 calculateurs interactifs complets (formules officielles HCSF, INSEE, CAF) :
  - Budget mensuel (flagship · score santé /100)
  - Reste à vivre · Taux d'endettement · Règle 50/30/20 · Salaire brut/net
  - Épargne intérêts composés · Budget courses · Coût total crédit
  - Comparateur abonnements · Budget étudiant · Budget couple · Budget bébé
- Glossaire 56 termes (vs 8 initial) avec AutoGlossaire scan automatique
- 4 pages éditoriales : `/comparatifs/`, `/a-propos/methodologie/`, `/a-propos/sources/`, `/guides/sortir-decouvert-bancaire/`
- Pages légales CNIL-compliant : mentions, confidentialité, cookies
- 404 brandé "Carnet"
- Cookie banner CNIL TTL 13 mois
- Favicon SVG animé (tirelire avec pièce qui tombe)
- robots.txt avec 18 AI bots whitelistés
- llms.txt structuré pour citation LLMs
- Sitemap auto-généré + sitemap-index

#### Micro-interactions vivantes (UI/UX)
- Scroll progress bar dorée
- TextMorph cycling sur Hero h1 italic + CTA principal (pattern adapte-toi)
- Coin-rain en arrière-plan Hero/Stats/CTA
- Cursor trail subtle desktop (8 dots dorés)
- Tilt-on-scroll wax-seals
- Page-corner peel sur tickets cards
- Pull-quote avec underline animé au scroll
- Drop-cap reveal en spring
- Marginalia "écrite à la volée" (clip-path)
- Breathe sur les chiffres stats
- Glow-pulse sur CTA principal
- Pulse-signal sur eyebrows
- Background gradient animé Hero (or → vert → terracotta)
- 56 termes glossaire avec AutoGlossaire
- Salutation contextuelle dans masthead Hero (Bonjour matin, Bonsoir, etc.)
- Section "L'équipe" avec 5 portraits

#### Pipeline blog-auto
- `publish.py` avec push GitHub Contents API atomique
- `mistral_pipeline.py` local (Mistral large + Claude Sonnet audit + Mistral fix)
- `serp_brief.py` Gemini 2.5 Pro grounding
- IndexNow + Bing URL submission post-publication
- Random sleep 0-30 min anti-pattern bot
- `today_str()` zoneinfo Europe/Paris (fix runner UTC)
- 15 articles scheduled dans `articles_plan.json` (23/04 → 07/05)

#### Documentation
- README.md
- CLAUDE.md (guide complet pour Claude Code)
- STATE.md (snapshot pour reprise)
- CHANGELOG.md (ce fichier)
- ROADMAP.md (V1.5 améliorations)
- AUDIT-SEO.md (88/100 + 10 quick wins)
- AUDIT-GEO.md (86/100 + 10 wins + table 10 requêtes LLM)
- SEO-CLUSTER-ARCHITECTURE.md (6 pillars + 60+ spokes)

#### Audit
- Script `scripts/full_audit.py` : 23 critères vérifiés (em-dashes, vouvoiement, accents, slugs, liens internes, SEO on-page, structured data, GEO, STACK-2026, sitemap completeness)
- Score : 23/23 (100%)
- Email handover envoyé via Resend (id `2cd0b243-b362-40f0-b6e4-267250b03695`)

### Bugs résolus pendant le build
- Tailwind 4.2.4 cassait `@tailwindcss/vite` → pinned 4.1.4 exact
- `**markdown bold**` invisible dans pages Astro non-`.md` → `<strong>` HTML
- Blog-auto runner UTC vs scheduled_date Paris → `zoneinfo("Europe/Paris")`
- Git push race condition → GitHub Contents API atomique
- Resend `addperiod` weird records → `send.send.econono.com` correct (relatif au root)

### Modifié
- Description homepage raccourcie 298c → 138c
- Tous les titles ≤49c, toutes les meta ≤146c
- 12 stubs calculateurs convertis en calculateurs interactifs complets
- Newsletter wired Supabase (form qui envoie vraiment)
- 4 emojis Hero trust bar remplacés par SVG Heroicons (règle ui-ux-pro-max)
- Glossaire 8 → 56 termes

### Sécurité
- HTTPS forcé Cloudflare Pages
- HSTS max-age 1 an
- X-Frame-Options SAMEORIGIN
- X-Content-Type-Options nosniff
- Referrer-Policy strict-origin-when-cross-origin
- Permissions-Policy strict (geolocation, microphone, camera désactivés)
