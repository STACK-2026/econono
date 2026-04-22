# Econono · Guide Claude Code

Le média Econono : calculateurs budget + guides + actu pouvoir d'achat. Astro 6 + CF Pages + Supabase. Avant toute modif lourde : pull origin main, lire ce fichier, lire `SEO-CLUSTER-ARCHITECTURE.md`.

## Identité brand

- Nom : Econono
- Tagline : "Dépense moins, vis mieux."
- Domaine : econono.com (zone CF `03dce5a47d304b0e8754db8bfa5ad148`)
- Voice : tutoiement chaleureux, anti-banque, anti-jargon, "humain"
- Univers : "Le Carnet" · ledger artisan · cream paper aesthetic
- Palette : vert forêt #1a3d2e · jaune doré #f4c430 · crème #faf7f2

## Stack

- Astro 6.1.5 + Tailwind 4.1.4 (pinned exact, pas de caret , casse `@tailwindcss/vite` sinon, voir mémoire)
- Cloudflare Pages
- Supabase `rxdcejlofnhjicupzikx` (eu-west-3) sous org KARMASTRO
- Resend domaine `send.econono.com`

## Règles strictes (héritées des règles globales user)

1. **Tutoiement partout** (pas de vouvoiement sauf pages légales)
2. **Zéro tiret cadratin** : pas de `—` (em U+2014) ni `–` (en U+2013). Remplacer par `·`, `:`, `,` ou `-` simple.
3. **Accents français OBLIGATOIRES** : é, è, ê, à, ç, î, ô, û. UTF-8 direct, pas `\u00XX`.
4. **Pas de tableau répété** dans les articles
5. **Sources datées sous chaque chiffre**
6. **TL;DR speakable** sur pages piliers : `<aside data-speakable>` 50-90 mots avec terme-clé en `<strong>`
7. **BreadcrumbList JSON-LD** sur toute page non-hub (dans tableau jsonLd du BaseLayout)
8. **JSON-LD jamais en doublon** : injecté UNE FOIS au niveau page
9. **JAMAIS importer depuis ~/stack-2026/scripts/** dans blog-auto : chaque blog-auto a son `mistral_pipeline.py` local
10. **Push via GitHub Contents API** dans publish.py (pas `git push`, voir mémoire `feedback_blog_auto_github_api_push.md`)

## Architecture des pages

```
/                              homepage
/calculateurs/                 index 12 calculateurs
/calculateurs/{slug}/          fiche calculateur
/guides/                       index guides
/guides/{slug}/                guide
/comparatifs/                  index comparatifs apps/banques/livrets
/comparatifs/{slug}/           comparatif
/actu/                         index actu pouvoir d'achat
/actu/{slug}/                  article actu
/blog/                         le carnet (articles divers)
/blog/{slug}/                  article blog
/glossaire/                    glossaire termes finance/budget
/newsletter/                   landing newsletter Le Carnet
/a-propos/                     manifesto + équipe + méthode
/mentions-legales/, /politique-confidentialite/, /politique-cookies/
/admin/                        analytics dashboard (noindex, password)
```

## Calculateurs

12 calculateurs. Le flagship (`budget-mensuel`) est complet et interactif. Les 11 autres sont des stubs SEO avec contenu et CTA "à venir + newsletter pour être prévenu·e".

À implémenter en V1.5 :
- reste-à-vivre (déjà commencé)
- taux-endettement (formule HCSF)
- règle 50/30/20
- salaire brut/net (barèmes 2026)
- épargne (intérêts composés)
- budget courses (par foyer)
- coût total crédit
- comparateur abonnements
- budget étudiant / couple / bébé

## Pipeline blog-auto

`blog-auto/publish.py` :
- Mistral large 2 pour le draft
- Claude Sonnet 4.6 pour l'audit grounding
- Mistral pour le fix
- Gemini 2.5 Pro pour le SERP brief AVANT génération
- IndexNow + Bing URL submission après publication
- Push via GitHub Contents API (atomique, zéro race)

Cron : `.github/workflows/blog-auto.yml` à heure aléatoire 7h-9h Paris (memory rule).

Standards article :
- 3500+ mots
- TL;DR data-speakable
- FAQ 5 questions
- Sources 5+
- 10+ liens internes vers pillars/calculateurs
- 5+ liens externes autorité (vérifiés au curl)
- Author pen name + lastReviewed + reviewedBy
- Frontmatter complet (image, imageAlt, keywords, etc.)

## Déploiement

`.github/workflows/deploy-site.yml` :
- Runner : `ubuntu-latest` (pas self-hosted, repo public + quota OK)
- `wrangler pages deploy site/dist --project-name=econono`
- Trigger : push main + workflow_run après blog-auto + cron daily rebuild-guard

Secrets requis :
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `MISTRAL_API_KEY`
- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY` (= GOOGLE_API_KEY)
- `SUPABASE_ECONONO_URL`
- `SUPABASE_ECONONO_SERVICE_KEY`
- `RESEND_API_KEY`
- `INDEXNOW_KEY` (généré par projet)
- `BING_URL_SUBMISSION_KEY`

## Commandes utiles

```bash
# Site dev
cd site && npm run dev

# Site build
cd site && npm run build

# Blog-auto manuel (depuis racine repo)
cd blog-auto && python publish.py --dry-run

# Validate liens internes avant push
python ~/stack-2026/scripts/validate_internal_links.py econono
```

## Contact

hello@econono.com (boîte forwarded vers gmail via Resend)
