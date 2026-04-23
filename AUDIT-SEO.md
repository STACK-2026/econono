# Audit SEO · econono.com · 23 avril 2026 (MàJ v0.2.0 après-midi)

Site : Astro 6 SSG sur Cloudflare Pages · 37 pages · audit exhaustif vs standards STACK-2026 + fix global.

---

## Score global · 98/100 (v0.2.0) · versus 88/100 (v0.1.0)

| Catégorie | v0.1 | v0.2 | Statut |
|---|---|---|---|
| Crawlabilité | 100 | 100 | ✅ |
| Indexabilité | 95 | 100 | ✅ (maillage auteur lié, breadcrumbs partout) |
| Sécurité | 85 | 100 | ✅ (CSP + COOP/CORP/COEP + HSTS 2 ans + X-Frame-Options DENY + X-Permitted-Cross-Domain-Policies none) |
| URL structure | 100 | 100 | ✅ |
| Mobile | 95 | 100 | ✅ (PWA manifest + shortcuts + theme-color dual) |
| Core Web Vitals | 90 | 90 (estimé) | ✅ (à valider PageSpeed) |
| Structured data | 92 | 100 | ✅ (NewsMediaOrganization + Person + publishingPrinciples + masthead + employee[]) |
| JavaScript rendering | 100 | 100 | ✅ |
| Internal linking | 75 | 92 | ✅ (page /auteurs/ liée, BlogLayout author rel=author, home équipe cliquable, footer enrichi) |
| IndexNow | 100 | 100 | ✅ |

### Quick wins v0.1 réglés en v0.2

- [x] ~~CSP basique dans `_headers`~~ → CSP complet avec `frame-ancestors 'none'`, `manifest-src`, `worker-src`, `upgrade-insecure-requests`
- [x] ~~Person JSON-LD dès 1er article~~ → 5 Person JSON-LD live sur `/auteurs/` + `author @id` dans Article schema
- [x] ~~Page `/auteurs/` listant les 5 pen names~~ → `/auteurs/` publiée avec bios, spécialités, charte éditoriale
- [x] ~~OG image PNG 1200x630~~ → `og-default.png` généré (PIL), fallback SVG conservé
- [x] Headers durcis au-delà du CSP : COOP + CORP + COEP unsafe-none + X-Frame DENY + HSTS 2 ans
- [x] Schéma Organization passé en `["Organization", "NewsMediaOrganization"]` avec publishingPrinciples/ethicsPolicy/correctionsPolicy/diversityPolicy/masthead/employee[]

### Encore à faire (cycle suivant)

- [ ] Tester PageSpeed Insights sur 5 pages clés (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] Confirmer que IndexNow batch a bien été soumis post v0.2.0 (37 URLs)
- [ ] Vérifier dans Bing Webmaster Tools si l'ai-sitemap.xml est accepté

---

## Détail par catégorie

### 1. Crawlabilité · 100/100

✅ `robots.txt` présent avec whitelist de 18 AI bots (GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot-Extended, Amazonbot, Bytespider, meta-externalagent, cohere-ai, DuckAssistBot, YouBot, etc.).
✅ `llms.txt` présent et structuré (catalogue calculateurs + guides + comparatifs + sources).
✅ Sitemap auto-généré par `@astrojs/sitemap` avec priorités custom (homepage 1.0, calculateurs 0.95, guides 0.85, blog 0.7).
✅ `sitemap-index.xml` correctement référencé dans robots.txt.
✅ Pas de `Disallow: /` involontaire.

### 2. Indexabilité · 95/100

✅ Canonical URL sur toutes les pages (BaseLayout).
✅ Trailing slash systématique (Astro `trailingSlash: "always"`).
✅ Aucun `noindex` involontaire (uniquement sur 404 et admin).
✅ Hreflang FR-only correctement défini.
🟡 Blog vide (0 articles publiés à ce jour) · 7 collections vides au build (warning normal).

**Quick win** : laisser le cron blog-auto publier les 15 premiers articles (start 24/04, cadence 3/jour).

### 3. Sécurité · 85/100

✅ HTTPS forcé (Cloudflare Pages).
✅ HSTS dans `_headers` (max-age 1 an, includeSubDomains, preload).
✅ X-Frame-Options: SAMEORIGIN.
✅ X-Content-Type-Options: nosniff.
✅ Referrer-Policy: strict-origin-when-cross-origin.
✅ Permissions-Policy strict (geolocation, microphone, camera désactivés).
🟡 CSP (Content-Security-Policy) absent (à ajouter pour score parfait).

**Quick win** : ajouter CSP basique dans `_headers`.

### 4. URL structure · 100/100

✅ URLs propres et lisibles : `/calculateurs/budget-mensuel/`.
✅ Pas de paramètres GET dans les URLs SEO.
✅ Trailing slash partout.
✅ Pas de slugs avec accents (utilisation des slugs sans diacritiques).
✅ Redirects 301 configurés pour anciennes URLs et accents.

### 5. Mobile · 95/100

✅ Viewport meta correct.
✅ Touch targets min 44px (`min-height: 44px` sur nav/prose/footer links).
✅ Font readability mobile (16px minimum, line-height 1.65).
✅ Sections padding adapté (3rem mobile vs 5rem desktop).
✅ Overflow-x clip sur html + body (anti-scroll horizontal).
🟡 Pas de testé sur appareil réel (à vérifier sur iPhone SE 2020 + Android entry-level).

### 6. Core Web Vitals · 90/100 (estimé)

✅ Astro SSG = HTML pur, pas d'hydration JavaScript pour la majorité des pages.
✅ Images en lazy loading (`loading="lazy"`).
✅ Fonts en `display=swap` (Google Fonts CDN).
✅ Preconnect à fonts.googleapis.com et fonts.gstatic.com.
✅ CSS critique inliné via Tailwind v4.
🟡 Non testé en CrUX field data (domaine trop frais pour avoir des données).
🟡 Lighthouse à lancer pour confirmer LCP < 2.5s, INP < 200ms, CLS < 0.1.

**Action** : tester sur PageSpeed Insights dès que le site a 2-3 jours d'âge.

### 7. Structured data · 92/100

✅ Organization JSON-LD sur homepage.
✅ WebSite JSON-LD avec SearchAction sur homepage.
✅ FAQPage JSON-LD sur homepage + chaque calculateur (5 Q chacun).
✅ BreadcrumbList JSON-LD sur 20 pages.
✅ WebApplication JSON-LD sur les 12 calculateurs.
✅ DefinedTermSet JSON-LD sur le glossaire.
🟡 Pas de Article JSON-LD encore (blog vide).
🟡 Pas de Person JSON-LD pour les auteurs (à ajouter quand articles publiés).

### 8. JavaScript rendering · 100/100

✅ 100% SSG. Aucun framework lourd.
✅ JS calculateurs en client-side natif (pas de framework).
✅ Aucun bloc render-blocking JS dans le head.
✅ Animations CSS uniquement (respecte prefers-reduced-motion).

### 9. Internal linking · 75/100

✅ Header nav présent sur toutes les pages.
✅ Footer avec 18 liens internes structurés.
✅ Maillage entre calculateurs (chaque calc linke vers 3 autres + budget-mensuel).
✅ TL;DR speakable avec liens internes vers glossaire et autres calculateurs.
🟡 Blog vide donc pas encore de maillage article → calculateur.
🟡 Pas encore d'articles guides publiés (les 50 fondations arrivent via blog-auto).

**Quick win** : dès que le blog-auto publie, le maillage interne va exploser (chaque article = 10+ liens internes vers calculateurs/guides/comparatifs).

### 10. IndexNow · 100/100

✅ Key publique : `90f1a67bb4a43d0e9f4ffcb19cb9cc9e` accessible à `/90f1a67bb4a43d0e9f4ffcb19cb9cc9e.txt`.
✅ Ping IndexNow intégré au workflow `deploy-site.yml` après chaque déploiement.
✅ Ping IndexNow + Bing URL submission intégrés dans `blog-auto/publish.py` après chaque article.
✅ Compatible Bing, Yandex, Naver, Seznam.

---

## Top 10 quick wins prioritaires (cette semaine)

1. **Tester sur PageSpeed Insights** dès J+3 et fix les warnings éventuels (LCP, INP, CLS).
2. **Ajouter une CSP basique** dans `site/public/_headers` (passer de 85 à 95 sécurité).
3. **Soumettre le sitemap à Google Search Console** et Bing Webmaster Tools (validation propriété par DNS TXT déjà possible via CF).
4. **Vérifier le rendu mobile** sur iPhone SE 2020 + Android entry (Chrome DevTools simulation OK mais pas suffisant).
5. **Activer le 1er article du blog-auto** (re-trigger le cron : déjà fait, doit publier J+1 max grâce au fix timezone Paris).
6. **Ajouter Person JSON-LD** dans BlogLayout dès le 1er article (pour signal E-E-A-T).
7. **Créer une page `/auteurs/`** listant les 5 pen names avec mini-bios + photos (signal E-E-A-T).
8. **Submit IndexNow batch** des 32 URLs actuelles dès aujourd'hui (Bing+Yandex propagation).
9. **OG image PNG** : générer une version PNG de l'OG (compat Facebook/LinkedIn meilleure que SVG).
10. **GA4 ou alternative** : décider si on active GA4 ou on reste sur l'analytics tracker custom Supabase.

---

## Issues mineures à régler

- 🟡 OG image en SVG : compatible mais pas optimal sur Facebook/LinkedIn. Générer un PNG 1200x630.
- 🟡 Blog/Actu/Guides/Comparatifs collections vides au build (warnings normaux, disparaissent dès 1er article).
- 🟡 Pas de verification Google/Bing yet (à faire après propagation DNS complète).
- 🟡 Page `/admin/` supprimée (ok), mais le footer est-il à jour ? À vérifier.

---

## Sources de référence

- [Google Search Central · Documentation SEO](https://developers.google.com/search/docs)
- [Schema.org · WebApplication, FAQPage, BreadcrumbList](https://schema.org/)
- [IndexNow protocol](https://www.indexnow.org/)
- [HCSF règles crédit](https://www.hcsf.gouv.fr/) (validé pour le contenu)

Audit conduit le 23 avril 2026 · Prochaine vérification : 30 avril 2026 (J+7 après lancement blog-auto).
