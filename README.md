# Econono

> Le média qui aide les Français à reprendre la main sur leur budget. Calculateurs gratuits, guides honnêtes, comparatifs sans pub déguisée, actu pouvoir d'achat.

**Live** : https://econono.com

---

## Stack

- **Astro 6** (SSG) + **Tailwind 4** (pinned 4.1.4 exact)
- **Cloudflare Pages** pour le déploiement
- **Supabase** dédié (`rxdcejlofnhjicupzikx`, eu-west-3) pour l'analytics tracker custom + newsletter
- **Resend** sur le domaine `send.econono.com` pour les emails transactionnels
- **Pipeline blog-auto** Mistral large + Claude Sonnet audit + Gemini SERP brief
- **Cron** : 3 articles/jour à heure aléatoire 7h-9h Paris

## Structure

```
econono/
├── site/                     # Astro site
│   ├── src/
│   │   ├── components/       # 26 composants Astro (UX kit + sections)
│   │   ├── content/          # blog, guides, calculateurs, comparatifs, actu, pages
│   │   ├── data/             # glossaire, affiliates, brands
│   │   ├── layouts/          # BaseLayout, BlogLayout, PageLayout, ActuLayout
│   │   ├── pages/            # routes (calculateurs/, blog/, actu/, etc.)
│   │   ├── styles/           # global.css avec utilities "Le Carnet"
│   │   └── utils/            # config, seo, glossaire, week
│   ├── public/               # static (favicon SVG, og-default, robots.txt, llms.txt)
│   ├── astro.config.mjs
│   ├── site.config.ts        # config brand + nav + FAQ + manifeste
│   └── package.json
├── blog-auto/                # pipeline de génération + publication
│   ├── publish.py
│   ├── articles_plan.json
│   └── requirements.txt
├── scripts/                  # utilitaires (sync, validation)
├── supabase/                 # migrations + edge functions
├── SEO-CLUSTER-ARCHITECTURE.md   # plan content cluster (6 pillars + 60+ spokes)
└── CLAUDE.md                 # guide pour Claude Code
```

## Design system "Le Carnet"

Univers brand : carnet d'argent artisan, anti-fintech.

- **Palette** : vert forêt #1a3d2e + jaune doré #f4c430 + crème #faf7f2
- **Fonts** : Fraunces (display serif éditorial) + Figtree (body humanist) + Caveat (notes manuscrites) + JetBrains Mono (chiffres tabulaires)
- **Signatures** : sceaux de cire pour dates · tickets perforés pour calculateurs · marginalia handwritten · ledger lines · drop caps · pull quotes
- **Animations** : `coin-glint`, `coin-drop`, `snowball-roll`, `progress-fill` (CSS pure, respecte reduced-motion)

## Brand voice

Tutoiement chaleureux, anti-leçons-de-morale, anti-jargon. L'ennemi déclaré : opacité bancaire + conseils financiers vagues + apps qui prennent tes données.

**Règles strictes** :
- Tutoiement partout
- Zéro tiret cadratin (`—` interdit, utiliser middle dot `·` ou virgule)
- Accents français corrects (UTF-8)
- Chiffres datés et sourcés
- Aucune recommandation sans justification

## Commandes

```bash
# Site
cd site
npm install
npm run dev          # localhost:4321
npm run build        # → dist/
npm run preview

# Blog-auto (manuel ou via cron GH Actions)
cd blog-auto
python publish.py
```

## Déploiement

GH Actions `deploy-site.yml` sur `ubuntu-latest`, `wrangler pages deploy site/dist`.

Trigger : push sur `main` ou `workflow_run` après les workflows blog-auto.

## Architecture content

Voir [SEO-CLUSTER-ARCHITECTURE.md](SEO-CLUSTER-ARCHITECTURE.md). 6 pillars + 60+ spokes :
1. Comment gérer son budget mensuel
2. Comment épargner avec un petit salaire
3. Comment sortir du découvert bancaire
4. Hub calculateurs
5. Comparatif applications budget 2026
6. Pouvoir d'achat 2026

## Liens utiles

- Site live : https://econono.com
- Supabase : https://supabase.com/dashboard/project/rxdcejlofnhjicupzikx
- Cloudflare zone : `econono.com` (id `03dce5a47d304b0e8754db8bfa5ad148`)
