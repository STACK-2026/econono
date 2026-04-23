# Econono

> Le média qui aide les Français à reprendre la main sur leur budget. 12 calculateurs gratuits, guides honnêtes, comparatifs sans pub déguisée, actu pouvoir d'achat.

**Live :** https://econono.com
**État :** Phase 0 livrée le 23/04/2026 · Audit 23/23 (100%)

---

## Documentation

| Fichier | Pour quoi |
|---|---|
| [STATE.md](STATE.md) | **Snapshot précis pour reprise immédiate** (IDs, état, bugs résolus) |
| [CLAUDE.md](CLAUDE.md) | Guide complet pour Claude Code (règles, architecture, commandes) |
| [CHANGELOG.md](CHANGELOG.md) | Historique des versions |
| [ROADMAP.md](ROADMAP.md) | V1.5 améliorations possibles |
| [AUDIT-SEO.md](AUDIT-SEO.md) | Audit SEO complet (88/100 + quick wins) |
| [AUDIT-GEO.md](AUDIT-GEO.md) | Audit GEO/AI complet (86/100 + 10 requêtes LLM cibles) |
| [SEO-CLUSTER-ARCHITECTURE.md](SEO-CLUSTER-ARCHITECTURE.md) | Plan content cluster (6 pillars + 60+ spokes) |

---

## Stack

- **Astro 6.1.5** (SSG) + **Tailwind 4.1.4** (PINNED EXACT, sans caret)
- **Cloudflare Pages** pour le déploiement
- **Supabase dédié** `rxdcejlofnhjicupzikx` (eu-west-3) pour l'analytics tracker custom + newsletter
- **Resend** sur le domaine `send.econono.com` pour les emails transactionnels
- **CF Email Routing** : `hello@econono.com` → augustin.foucheres@gmail.com
- **Pipeline blog-auto** : Mistral large + Claude Sonnet audit + Gemini SERP brief
- **Cron** : 3 articles/jour à heure aléatoire 7h-9h Paris

---

## Structure

```
econono/
├── site/                              Astro 6 SSG
│   ├── src/
│   │   ├── components/                26 composants (UX kit + sections + 5 text-effects)
│   │   ├── content/                   blog, guides, calculateurs, comparatifs, actu, pages
│   │   ├── data/glossaire.ts          56 termes finance vulgarisés
│   │   ├── layouts/                   BaseLayout, BlogLayout, PageLayout, ActuLayout
│   │   ├── pages/                     routes (calculateurs/, blog/, etc.)
│   │   ├── styles/global.css          design tokens "Le Carnet" + 30+ animations
│   │   └── utils/                     config, seo, glossaire, week
│   ├── public/                        favicon SVG, og-default, robots.txt, llms.txt, IndexNow key
│   ├── astro.config.mjs
│   ├── site.config.ts                 config brand + nav + FAQ + manifeste
│   └── package.json
├── blog-auto/                         Pipeline Mistral+Claude+Gemini SERP
│   ├── publish.py                     Push via GitHub Contents API atomique
│   ├── mistral_pipeline.py            Local (pas d'import depuis ~/stack-2026/scripts)
│   ├── articles_plan.json             15 articles scheduled 23/04 → 07/05
│   ├── prompts/article-seo.md
│   └── requirements.txt
├── scripts/
│   ├── full_audit.py                  Audit 23 critères (run any time)
│   ├── serp_brief.py                  Gemini grounding
│   └── bing_submit.py
├── supabase/migrations/
│   └── 20260423000001_init.sql        newsletter + page_views + calculateur_uses + 4 vues
├── .github/workflows/
│   ├── deploy-site.yml                ubuntu-latest, wrangler-action, IndexNow ping
│   ├── blog-auto.yml                  cron 7-9h Paris × 3
│   └── rebuild-guard.yml              cron daily 8h23 Paris
├── README.md
├── CLAUDE.md, STATE.md, CHANGELOG.md, ROADMAP.md
└── AUDIT-SEO.md, AUDIT-GEO.md, SEO-CLUSTER-ARCHITECTURE.md
```

---

## Design system "Le Carnet"

Univers brand : carnet d'argent artisan vintage-modern, anti-fintech.

- **Palette** : vert forêt #1a3d2e + jaune doré #f4c430 + crème #faf7f2 + terracotta #c2410c
- **Fonts** : Fraunces (display serif éditorial) + Figtree (body humanist) + Caveat (notes manuscrites) + JetBrains Mono (chiffres)
- **Signatures** : sceaux de cire pour dates · tickets perforés pour calculateurs · marginalia handwritten · ledger lines · drop caps · pull quotes
- **Animations vivantes** : `coin-glint`, `coin-drop`, `snowball-roll`, `progress-fill`, `coin-rain`, `pulse-signal`, `glow-pulse`, `breathe`, `tilt-on-scroll`, scroll progress bar, cursor trail, pull-quote underline, marginalia handwritten reveal, ticket peel
- **TextMorph** cycling sur Hero h1 italic et CTA principal (pattern adapte-toi)

---

## Brand voice

Tutoiement chaleureux, anti-leçons-de-morale, anti-jargon. L'ennemi déclaré : opacité bancaire + conseils financiers vagues + apps qui prennent tes données.

**Règles strictes** :
- Tutoiement partout (sauf pages légales et `/calculateurs/budget-couple/`+`budget-bebe/` où "vous" est pluriel grammatical)
- Zéro tiret cadratin (`—` interdit, utiliser middle dot `·` ou virgule)
- Accents français corrects (UTF-8)
- Chiffres datés et sourcés
- Aucune recommandation sans justification

---

## Commandes

```bash
# Site dev
cd site && npm install && npm run dev   # localhost:4321

# Site build
cd site && npm run build                 # → dist/

# Audit complet (23 critères)
python3 scripts/full_audit.py            # doit pass 23/23

# Deploy manuel preview
cd site && set -a; source ~/stack-2026/.env.master; set +a
npx wrangler@latest pages deploy dist --project-name=econono --branch=main --commit-dirty=true

# Blog-auto local (dry-run)
cd blog-auto && DRY_RUN=true python3 publish.py

# Trigger workflow blog-auto
curl -X POST -H "Authorization: Bearer $GITHUB_TOKEN" \
  "https://api.github.com/repos/STACK-2026/econono/actions/workflows/blog-auto.yml/dispatches" \
  -d '{"ref":"main","inputs":{"dry_run":"false"}}'
```

---

## Liens utiles

- **Live** : https://econono.com
- **Pages preview** : https://econono.pages.dev
- **GH Actions** : https://github.com/STACK-2026/econono/actions
- **Supabase dashboard** : https://supabase.com/dashboard/project/rxdcejlofnhjicupzikx
- **Resend domaine** : https://resend.com/domains/939d3ca1-88ed-42b4-ac41-3e64807ab450
- **Admin portfolio** : https://augustinfoucheres.com/admin (Econono visible après prochain ingest)
