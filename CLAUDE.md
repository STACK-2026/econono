# Econono · Guide Claude Code

Le média Econono : 12 calculateurs budget interactifs + guides + comparatifs + actu pouvoir d'achat. Astro 6 + CF Pages + Supabase. **Avant toute modif lourde** : `git pull origin main` + lire ce fichier + lire `STATE.md` (état précis) + lire `SEO-CLUSTER-ARCHITECTURE.md`.

## Identité brand

- Nom : Econono
- Tagline : "Dépense moins, vis mieux."
- Domaine : econono.com (zone CF `03dce5a47d304b0e8754db8bfa5ad148`)
- Voice : tutoiement chaleureux, anti-banque, anti-jargon, "humain"
- Univers : "Le Carnet" · ledger artisan · cream paper aesthetic
- Palette : vert forêt #1a3d2e · jaune doré #f4c430 · crème #faf7f2 · terracotta #c2410c
- Fonts : Fraunces (display) + Figtree (body) + Caveat (manuscrit) + JetBrains Mono (chiffres)

## Stack

- Astro 6.1.5 + Tailwind 4.1.4 (**PINNED EXACT, sans caret** · sinon casse `@tailwindcss/vite`)
- Cloudflare Pages
- Supabase `rxdcejlofnhjicupzikx` (eu-west-3) sous org KARMASTRO `zksslwveegywirxkznjt`
- Resend domaine `send.econono.com` (id `939d3ca1-88ed-42b4-ac41-3e64807ab450`, **verified**)
- CF Email Routing : `hello@econono.com` → augustin.foucheres@gmail.com (catch-all)

## Règles strictes (héritées des règles globales user)

1. **Tutoiement partout** (pas de vouvoiement sauf pages légales). Exception : `/calculateurs/budget-couple/` et `/budget-bebe/` utilisent "vous" pluriel grammatical (couple/parents adressés collectivement, pas du vouvoiement de respect). Whitelistés dans `scripts/full_audit.py`.
2. **Zéro tiret cadratin** : pas de `—` (em U+2014) ni `–` (en U+2013). Remplacer par `·`, `:`, `,` ou `-` simple.
3. **Accents français OBLIGATOIRES** : é, è, ê, à, ç, î, ô, û. UTF-8 direct, pas `\u00XX` (sauf ` ` non-breaking space dans le JS).
4. **Sources datées sous chaque chiffre** : "X selon Y (date)".
5. **TL;DR speakable** sur pages piliers : `<aside data-speakable>` 50-90 mots avec terme-clé en `<strong>`.
6. **BreadcrumbList JSON-LD** sur toute page non-hub (dans tableau jsonLd du BaseLayout).
7. **JSON-LD jamais en doublon** : injecté UNE FOIS au niveau page.
8. **JAMAIS importer depuis ~/stack-2026/scripts/** dans blog-auto : chaque blog-auto a son `mistral_pipeline.py` local.
9. **Push via GitHub Contents API** dans publish.py (pas `git push`).
10. **`<strong>HTML</strong>` au lieu de `**markdown**`** dans les pages Astro non-`.md`.

## État actuel (23/04/2026 02h, audit 23/23)

**Live** https://econono.com · 36 pages HTML · Phase 0 clôturée.

- 12 calculateurs **TOUS interactifs** (full implementation, formules officielles)
- 56 termes glossaire (vs 8 initial)
- 4 pages éditoriales spécifiques : `/comparatifs/`, `/a-propos/methodologie/`, `/a-propos/sources/`, `/guides/sortir-decouvert-bancaire/`
- 3 workflows GH Actions : `deploy-site` (push main + workflow_run), `blog-auto` (cron 7-9h Paris × 3/jour), `rebuild-guard` (cron daily 8h23 Paris)
- 13 GH secrets configurés
- Intel DB augustinfoucheres : Econono inséré (id=15)
- Audit script `scripts/full_audit.py` : 23/23 pass
- Email handover envoyé via Resend (id `2cd0b243-b362-40f0-b6e4-267250b03695`)

## Architecture des pages

```
/                                  homepage 10 sections
/calculateurs/                     index 12 calculateurs
/calculateurs/{12 slugs}/          fiches interactives (TOUS fonctionnels)
/guides/                           index guides
/guides/sortir-decouvert-bancaire/ pillar guide plan 30 jours
/guides/{slug}/                    futurs guides via blog-auto
/comparatifs/                      index 7 catégories
/comparatifs/{slug}/               futurs comparatifs (Bankin, Linxo, etc.)
/actu/                             index actu pouvoir d'achat
/actu/categorie/{8 cats}/          smic, livret, aide, fiscalite, energie, inflation, logement, alerte
/blog/                             le carnet (articles divers)
/glossaire/                        56 termes (pillar SEO + DefinedTermSet JSON-LD)
/newsletter/                       landing newsletter
/a-propos/                         manifesto + équipe + méthode
/a-propos/methodologie/            formules + sources + révision
/a-propos/sources/                 catalogue 18 sources publiques
/mentions-legales/, /politique-confidentialite/, /politique-cookies/
```

## Pipeline blog-auto

`blog-auto/publish.py` :
- Mistral large 2 pour le draft
- Claude Sonnet 4.6 pour l'audit grounding
- Mistral pour le fix
- Gemini 2.5 Pro pour le SERP brief AVANT génération
- IndexNow + Bing URL submission après publication
- Push via GitHub Contents API (atomique, zéro race)
- `today_str()` utilise `zoneinfo("Europe/Paris")` (sinon le runner UTC voit J-1)

Cron : `.github/workflows/blog-auto.yml` à heures aléatoires 7h-9h Paris (random sleep 0-30 min).

`articles_plan.json` : 15 articles scheduled 23/04 → 07/05 (incl. comparatif coachs budget FR demandé par user).

## Standards article

- 3500+ mots si pillar, 1800-2500 si spoke
- TL;DR data-speakable en tête
- FAQ 5 questions minimum
- Sources 5+ liens externes autorité (vérifiés au curl)
- 10+ liens internes vers calculateurs/guides/comparatifs
- Author pen name (rotation MD5 sur 5 : Léa Dubreuil, Marc Henrion, Sophie Vallet, Antoine Berger, Camille Pellier)
- Frontmatter complet (image, imageAlt, keywords, lastReviewed, reviewedBy)

## Déploiement

`.github/workflows/deploy-site.yml` :
- Runner : `ubuntu-latest` (pas self-hosted, repo public + quota OK)
- `wrangler-action@v3 pages deploy site/dist --project-name=econono`
- Trigger : push main (paths site/**) + workflow_run après blog-auto/rebuild-guard + workflow_dispatch
- Post-deploy : ping IndexNow

## Secrets GH Actions (13)

CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, MISTRAL_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, GOOGLE_API_KEY, SUPABASE_ECONONO_URL, SUPABASE_ECONONO_ANON_KEY, SUPABASE_ECONONO_SERVICE_KEY, RESEND_API_KEY, INDEXNOW_KEY, BING_URL_SUBMISSION_KEY, UNSPLASH_ACCESS_KEY

## Commandes utiles

```bash
# Site dev
cd site && npm run dev

# Site build
cd site && npm run build

# Audit complet (23 critères)
python3 scripts/full_audit.py

# Deploy manuel (preview)
cd site && set -a; source ~/stack-2026/.env.master; set +a
npx wrangler@latest pages deploy dist --project-name=econono --branch=main --commit-dirty=true

# Blog-auto local (dry-run)
cd blog-auto && DRY_RUN=true python3 publish.py

# Trigger workflow blog-auto manuel
curl -X POST -H "Authorization: Bearer $GITHUB_TOKEN" \
  "https://api.github.com/repos/STACK-2026/econono/actions/workflows/blog-auto.yml/dispatches" \
  -d '{"ref":"main","inputs":{"dry_run":"false"}}'
```

## Améliorations possibles (V1.5)

Voir `STATE.md` section "Roadmap V1.5" :
1. Programmatic SEO (pages "Vivre avec X €", "Budget étudiant {ville}")
2. Comparatifs commerciaux (Bankin/Linxo/Finary/YNAB, banques en ligne, livrets)
3. Carte interactive coût de la vie par ville
4. Datasets ouverts CSV/JSON
5. Page authors avec vrais portraits SVG

## Contact

hello@econono.com (CF Email Routing → augustin.foucheres@gmail.com)
