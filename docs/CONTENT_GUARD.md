# Content Guard (econono)

Garde-fou de contenu STACK-2026 qui bloque le build local si un article `.md`/`.mdx`
contient un defaut connu de blog-auto.

## Role

`site/scripts/content_guard.py` (copie du guard partage `~/stack-2026/scripts/content_guard.py`)
detecte et, en mode `--fix`, corrige :

1. Artefacts de generation/tool-call (`</content>`, `</invoke>`, `<function_calls>`, fences perdus) — ont deja casse des builds dans le parc.
2. Frontmatter duplique reinjecte dans le corps.
3. Longueur meta : `title` > 65c (flag seul, non bloquant), `description` > 180c (clampe en `--fix`).
4. H1 (`# `) dans le corps => double H1 (le template emet deja le titre en H1).
5. Mojibake (`Ã©`, `â€™`, `Â`, ...).
6. Tiret cadratin / demi-cadratin dans le corps (regle YMYL du parc).

Les accents (francais ASCII-folde) restent delegues a `scripts/check_accents.py` du parc.

## Pourquoi

Ces defauts passaient `seo-guardrails.yml` + `publish.py` et n'etaient vus qu'apres
deploiement. Le guard les arrete AVANT le build.

## Prebuild bloquant

`site/package.json` :

```json
"guard:content": "sh scripts/guard-content.sh",
"prebuild": "npm run guard:content",
```

`scripts/guard-content.sh` verifie les `.md`/`.mdx` du dernier commit
(`git diff HEAD~1 HEAD`), avec repli plein-scan sur `src/content` si besoin, et
sort proprement (exit 0) si `python3` est absent. `npm run build` declenche
automatiquement `prebuild` ; un defaut bloquant => build en echec.

## Re-verifier / corriger

```bash
cd site
# verifier (comme le build) :
npm run guard:content
# verifier un dossier :
python3 scripts/content_guard.py --check src/content
# corriger en place (idempotent, non destructif) :
python3 scripts/content_guard.py --fix src/content
```

## FAQ / FAQPage

L'article `smic-prevu-augmentation-juin-2026-projection-pouvoir-achat` n'emettait pas
de `FAQPage` : sa section FAQ utilisait des questions en `**gras**`. `BlogLayout.astro`
(`extractFaq`) n'extrait que les paires `### Question` sous un H2
`## FAQ` / `## Foire aux questions` / `## Questions frequentes`. Les 5 questions ont ete
converties en `### ` => `FAQPage` JSON-LD desormais emis (mecanisme natif du layout, sans
changement de schema).
