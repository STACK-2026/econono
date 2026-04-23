# Changelog · Econono

## 0.2.0 · 2026-04-23 (après-midi) · Hardening standards STACK-2026

Audit exhaustif vs standards STACK-2026 (karmastro / decryptebot / expert-menuiserie) + fix de tous les gaps identifiés. 4 commits push : `54f09c6` `ffe2efe` `ff75c9b` `6bd7fe4`.

### Ajouté · 10 assets web standards

- `favicon.ico` multi-résolution (16/32/48) + `favicon-{16,32,48,96,192,512}.png`
- `apple-touch-icon.png` 180×180 (fond crème)
- `maskable-icon-512.png` (PWA Android adaptive icon)
- `mstile-144x144.png` (Windows tiles)
- `og-default.png` 1200×630 (remplace le SVG, meilleure compat Facebook/LinkedIn)
- `manifest.webmanifest` (PWA complet + 3 shortcuts calculateurs)
- `browserconfig.xml` (Microsoft tiles)
- `opensearch.xml` (moteur de recherche navigateur)
- `security.txt` + `.well-known/security.txt` (RFC 9116)
- `humans.txt` (signal équipe/tech)
- `rsl.txt` (Robots Signaling Language 1.0, conditions de réutilisation AI)
- `ai-sitemap.xml` (25 URLs enrichies `ai:summary` + `ai:entity` + `ai:type`)

### Ajouté · page `/auteurs/`

- 5 bios détaillées (Léa Dubreuil, Marc Henrion, Sophie Vallet, Antoine Berger, Camille Pellier)
- 5 `Person` JSON-LD avec `@id` `knowsAbout` `jobTitle` `worksFor`
- 1 `CollectionPage` JSON-LD + `BreadcrumbList`
- TL;DR speakable
- Charte éditoriale (sources officielles, relecture croisée, cycle révision, zéro placement caché)
- Lien depuis grid équipe home (HOME TOUT CLICKABLE) + footer + BlogLayout auteur cliquable `rel=author`

### Ajouté · BaseLayout head tags

- `theme-color` dual (`prefers-color-scheme: light|dark`)
- `color-scheme`, `generator`, `format-detection`, `application-name`
- `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`
- `msapplication-TileColor`, `msapplication-config`
- `og:image:width=1200`, `og:image:height=630`, `og:image:alt`, `og:image:type`
- `article:modified_time`, `article:author`, `article:section`, `article:tag` (via BlogLayout)
- `twitter:image:alt`
- `rel=alternate icon` multi-sizes (16/32/192)
- `rel=apple-touch-icon sizes=180x180`
- `rel=mask-icon` (Safari pinned tab)
- `rel=manifest`
- `rel=alternate` sitemap + ai-sitemap + RSS
- `rel=search` opensearch
- `rel=license` rsl.txt

### Ajouté · enrichissements JSON-LD

Organization → `["Organization", "NewsMediaOrganization"]` avec :
- `@id` stable, `alternateName`, `slogan`, `foundingDate`, `foundingLocation`, `areaServed`
- `knowsAbout` (12 sujets), `knowsLanguage`
- `logo` ImageObject 512×512 + `image` 1200×630 (ImageObject)
- `publishingPrinciples`, `actionableFeedbackPolicy`, `ethicsPolicy`
- `ownershipFundingInfo`, `correctionsPolicy`, `missionCoveragePrioritiesPolicy`
- `unnamedSourcesPolicy`, `verificationFactCheckingPolicy`, `diversityPolicy`
- `masthead` → `/auteurs/`
- `employee[]` + `member[]` → 5 Person `@id` des pen names
- `contactPoint` avec `areaServed`

WebSite : `@id`, `publisher @id`, `copyrightHolder @id`, `copyrightYear`, `license` rsl.txt, `SubscribeAction` vers newsletter + SearchAction.

Article (BlogLayout) : `author @id` lié au Person de `/auteurs/`, `publisher @id` + `logo`, `isPartOf` WebSite, fallback image `og-default.png`.

### Modifié · `_headers` durci

- HSTS `max-age` passé à 2 ans (63072000)
- `X-Frame-Options: DENY` (était SAMEORIGIN)
- CSP `frame-ancestors 'none'` + `manifest-src 'self'` + `worker-src 'self'`
- `Permissions-Policy` étendue (+payment, usb, magnetometer, gyroscope, accelerometer)
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: unsafe-none`
- `X-Permitted-Cross-Domain-Policies: none`
- `X-Robots-Tag` global `index, follow, max-image-preview:large, max-snippet:-1`
- `Content-Type` explicite pour manifest/security/humans/rsl/llms/ai-sitemap/opensearch/browserconfig
- Cache long-term pour `.ico` et `.png`

### Modifié · `llms.txt` enrichi

+15 Q/R factuelles citables : SMIC net 2026, livret A 2026, LEP 2026, taux d'endettement HCSF, règle 50/30/20, reste à vivre, budget bébé, budget courses famille, plafond endettement, sortir du découvert, coût crédit, modèle éco Econono, fréquence MAJ chiffres, équipe éditoriale, fiabilité calculateurs.

### Modifié · `robots.txt`

Remplacement `Sitemap: /sitemap.xml` par `Sitemap: /ai-sitemap.xml` (le standard sitemap reste sous `/sitemap-index.xml`, `/sitemap.xml` redirect 301 via `_redirects`). Ajout directive `License: https://econono.com/rsl.txt`.

### Modifié · `_redirects`

Nettoyage résidus projet autre (métiers/témoignages). Ajout :
- `/sitemap.xml` → `/sitemap-index.xml` 301
- `/feed` + `/feed.xml` → `/rss.xml` 301

### Fixes

- `/guides/[slug].astro` : maillage interne "Pour aller plus loin" totalement refait (résidu copier-coller d'un autre projet : "25 fiches métier IA", "20 outils IA", `/guides/se-former-ia-gratuitement` remplacé par calculateurs/comparatifs/glossaire/newsletter Econono)
- `/guides/index.astro` : `/newsletter` → `/newsletter/` + "S'abonner au Signal" → "S'abonner au Carnet" (résidu)
- `utils/glossaire.ts` + `AutoGlossaire.astro` : `/glossaire#slug` → `/glossaire/#slug` (cohérent `trailingSlash: always`)
- Nouvelle page `/auteurs/` ajoutée au nav footer

### Résultats vérifiés live

- 16/16 URLs strategies live en 200 avec Content-Type correct
- 0 lien interne cassé sur 40 URLs crawlées
- `full_audit.py` : 23/23 pass (100%)
- 10 `Person` JSON-LD live sur `/auteurs/`
- NewsMediaOrganization live sur `/`
- manifest.webmanifest JSON valide

### Décisions confirmées user

- **Pas de réseaux sociaux Econono** (confirmé 23/04 après-midi) : `Organization.sameAs` volontairement absent. Aligné règle memory `feedback_sameas_owned_only.md`.

---

## 0.1.0 · 2026-04-23 (nuit) · Phase 0 livrée

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
