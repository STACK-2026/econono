# STATE · Econono

> Snapshot précis de l'état du projet pour reprise immédiate sans contexte. Dernière update : 23/04/2026 20h CET (post v0.2.0 hardening STACK-2026).

---

## TL;DR · ce qui est en ligne

**Live :** https://econono.com (37 pages HTML, audit 23/23 = 100%, v0.2.0)
**Repo :** https://github.com/STACK-2026/econono (public, ubuntu-latest deploy)
**Dernier commit :** `6bd7fe4` "durcir aux standards STACK-2026 · 16 ajouts + hardening" (23/04/2026 20h)
**Dernier deploy :** Cloudflare Pages · tous URLs 200

**v0.2.0 (23/04 aprem) ajoute :** page `/auteurs/` + 5 Person JSON-LD · favicon.ico + 6 PNG + apple-touch + maskable + mstile · manifest.webmanifest · security.txt + humans.txt + rsl.txt · opensearch.xml · browserconfig.xml · ai-sitemap.xml · og-default.png · NewsMediaOrganization complète · `_headers` durci HSTS 2 ans + X-Frame-Options DENY. Voir `CHANGELOG.md` pour le détail.

---

## IDs critiques

| Service | ID / valeur |
|---|---|
| Cloudflare zone | `03dce5a47d304b0e8754db8bfa5ad148` |
| CF Pages project | `econono` (subdomain `econono.pages.dev`) |
| Supabase project ref | `rxdcejlofnhjicupzikx` (eu-west-3, org KARMASTRO `zksslwveegywirxkznjt`) |
| Resend domain id | `939d3ca1-88ed-42b4-ac41-3e64807ab450` (`send.econono.com`, **status verified**) |
| IndexNow key | `90f1a67bb4a43d0e9f4ffcb19cb9cc9e` (file `/public/{key}.txt`) |
| Intel DB projects.id | `15` (econono.com, gsc=`sc-domain:econono.com`, golive=2026-04-23) |
| Email handover Resend ID | `2cd0b243-b362-40f0-b6e4-267250b03695` (envoyé 23/04 02h) |

---

## Variables env.master ECONONO

```
SUPABASE_ECONONO_PROJECT_REF=rxdcejlofnhjicupzikx
SUPABASE_ECONONO_URL=https://rxdcejlofnhjicupzikx.supabase.co
SUPABASE_ECONONO_ANON_KEY=eyJ... (présent)
SUPABASE_ECONONO_SERVICE_KEY=eyJ... (présent)
SUPABASE_ECONONO_DB_PASS=... (présent)
ECONONO_INDEXNOW_KEY=90f1a67bb4a43d0e9f4ffcb19cb9cc9e
ECONONO_CF_PAGES_PROJECT=econono
ECONONO_CF_ZONE_ID=03dce5a47d304b0e8754db8bfa5ad148
```

13 secrets GH Actions configurés sur le repo (CF, Mistral, Anthropic, Gemini, Supabase, Resend, IndexNow, Bing, Unsplash).

---

## Pages live (37)

+1 nouvelle page v0.2.0 : `/auteurs/` (5 bios + Person JSON-LD)

### Homepage et hubs
- `/` homepage 10 sections (Hero TextMorph, Problem, Features, HowItWorks, Stats, Témoignages composites, Équipe 5 portraits, Newsletter, FAQ, CTA)
- `/calculateurs/`, `/guides/`, `/comparatifs/`, `/actu/`, `/blog/`, `/glossaire/`, `/newsletter/`, `/a-propos/`

### 12 calculateurs (TOUS interactifs, full)
- `/calculateurs/budget-mensuel/` flagship · 8 inputs, score santé /100, 5 FAQ
- `/calculateurs/reste-a-vivre/` comparaison médiane FR
- `/calculateurs/taux-endettement/` HCSF + capacité d'emprunt
- `/calculateurs/regle-50-30-20/` idéal vs réel
- `/calculateurs/salaire-net/` 4 statuts + détail cotisations
- `/calculateurs/epargne/` intérêts composés + 4 presets
- `/calculateurs/budget-courses/` INSEE foyer × profil × zone
- `/calculateurs/cout-credit/` annuité constante + 3 presets
- `/calculateurs/comparateur-abonnements/` localStorage + détection doublons
- `/calculateurs/budget-etudiant/` ville × logement × statut + aides
- `/calculateurs/budget-couple/` 3 méthodes comparées
- `/calculateurs/budget-bebe/` mode garde + revenus + aides CAF

### Pages éditoriales (4 nouvelles)
- `/comparatifs/` index 7 catégories (vide en attente articles)
- `/a-propos/methodologie/` formules + sources + révision + pipeline IA
- `/a-propos/sources/` catalogue 18 sources publiques
- `/guides/sortir-decouvert-bancaire/` pillar guide plan 30 jours

### Actu (catégories)
- `/actu/categorie/{smic, livret, aide, fiscalite, energie, inflation, logement, alerte}/`

### Légales
- `/mentions-legales/`, `/politique-confidentialite/`, `/politique-cookies/`

---

## Glossaire (56 termes pillar SEO)

Réparti en 6 catégories :
- **Budget** (7) : reste à vivre, règle 50/30/20, méthode kakebo, méthode enveloppes, dépenses contraintes, budget zéro, coût de la vie
- **Crédit** (9) : taux d'endettement, HCSF, TAEG, assurance emprunteur, rachat de crédit, crédit revolving, loi Lemoine, amortissement, surendettement
- **Épargne** (10) : livret A, LEP, LDDS, PEL, intérêts composés, assurance vie, PEA, PER, épargne précaution, DCA
- **Fiscalité** (8) : RFR, prélèvement à la source, quotient familial, TMI, abattement, CSG/CRDS, niches fiscales, plus-value
- **Social** (12) : SMIC, prime d'activité, RSA, APL, ALS, AAH, ASPA, ARE, PAJE, CMG, CSS, chèque énergie
- **Bancaire** (10) : agios, découvert autorisé, commission d'intervention, frais bancaires, IBAN, prélèvement SEPA, virement instantané, interdiction bancaire, FICP, carte débit différé

`AutoGlossaire.astro` scanne les articles blog et linke automatiquement ces termes en tooltips.

---

## Workflows GH Actions

1. **`deploy-site.yml`** (ubuntu-latest)
   - Trigger : push main (paths `site/**`) + `workflow_run` après `blog-auto`/`rebuild-guard` + `workflow_dispatch`
   - Build Astro + wrangler-action@v3 pages deploy
   - Post-deploy : ping IndexNow

2. **`blog-auto.yml`** (ubuntu-latest)
   - Cron 5h05 / 6h05 / 7h05 UTC (= 7h05 / 8h05 / 9h05 Paris été)
   - Random sleep 0-30 min anti-pattern bot
   - Pipeline : SERP brief Gemini → Mistral large draft → Claude Sonnet audit → Mistral fix → push GitHub Contents API → IndexNow + Bing
   - Source : `articles_plan.json` (15 articles 23/04 → 07/05)

3. **`rebuild-guard.yml`** (ubuntu-latest)
   - Cron 6h23 UTC (= 8h23 Paris)
   - Commit marker file `site/src/data/rebuild-marker.json` pour déclencher rebuild CF Pages
   - Important pour articles datés futurs (Astro `getStaticPaths` filtre `date <= now`)

---

## Articles plan (15 scheduled)

`blog-auto/articles_plan.json` :

| Date | Slug | Type |
|---|---|---|
| 23/04 | smic-net-2026-combien-touche-on-vraiment | quick win |
| 24/04 | livret-a-2026-taux-fonctionnement-strategie | quick win |
| 25/04 | vivre-avec-1500-euros-par-mois-budget-realiste | quick win |
| 26/04 | vivre-avec-2000-euros-par-mois-classe-moyenne-france | quick win |
| 27/04 | regle-50-30-20-budget-explication-france-2026 | guide |
| 28/04 | sortir-decouvert-bancaire-plan-30-jours | guide |
| 29/04 | comparatif-applications-budget-2026-bankin-linxo-finary-ynab | comparatif |
| 30/04 | meilleurs-coachs-budget-france-2026-influenceurs-finance-perso | comparatif (demandé user) |
| 01/05 | calculer-reste-a-vivre-formule-officielle-vs-realite | guide |
| 02/05 | smic-2026-revalorisation-janvier-pourcentage-pouvoir-achat | actu |
| 03/05 | lep-livret-epargne-populaire-eligible-comment-ouvrir | guide |
| 04/05 | taux-endettement-35-pourcent-comment-calculer-banque | guide |
| 05/05 | budget-courses-couple-france-2026-combien-depenser | guide |
| 06/05 | budget-bebe-premiere-annee-cout-aides-caf-2026 | guide |
| 07/05 | comparateur-abonnements-streaming-telecom-recuperer-50-euros | astuce |

---

## Audit standards STACK-2026 (23/23 = 100%)

`scripts/full_audit.py` vérifie :

| Catégorie | Critère | Statut |
|---|---|---|
| A. Brand voice | Em-dashes source | ✅ 0 |
| | Em-dashes HTML | ✅ 0 |
| | Vouvoiement (hors couple/bébé) | ✅ 0 |
| | Accents UTF-8 (pas \uXXXX) | ✅ |
| B. Slugs | Sans accents | ✅ |
| | Lowercase | ✅ |
| C. Liens internes | Tous résolvent | ✅ 0 broken |
| E. SEO on-page | Title ≤65c | ✅ |
| | Meta ≤165c | ✅ |
| | Meta présent | ✅ |
| | 1 H1 par page | ✅ |
| | H1 présent | ✅ |
| F. Structured data | JSON-LD présent | ✅ |
| | BreadcrumbList | ✅ |
| G. GEO | data-speakable calc | ✅ 12/12 |
| | llms.txt OK | ✅ |
| | robots.txt AI bots | ✅ 18 |
| H. STACK-2026 | Favicon SVG | ✅ |
| | Cookie banner CNIL 13 mois | ✅ |
| | 404 brandé | ✅ |
| | IndexNow key | ✅ |
| | OG image | ✅ |
| I. Sitemap | Complet (35/35) | ✅ |

Run : `cd site && npm run build && python3 ../scripts/full_audit.py`

---

## Bugs résolus pendant le build (mémoire pour reprise)

1. **Tailwind 4.2.4 cassait `@tailwindcss/vite`** (erreur `tsconfigPaths missing`). Fix : pinned 4.1.4 exact, sans caret. Si réinstallation : `rm -rf node_modules package-lock.json && npm install` puis vérifier `node_modules/@tailwindcss/vite/package.json` version.
2. **`**markdown bold**` invisible dans pages Astro non-`.md`** : Astro ne process pas le markdown dans les `.astro`. Fix : `<strong>HTML</strong>` ou `<p set:html={\`...\`}>`.
3. **Blog-auto runner UTC vs scheduled_date Paris** : `date.today()` retourne la date UTC sur le runner GH Actions (typiquement J-1 quand le cron 7h Paris se déclenche). Fix : `today_str()` utilise `zoneinfo("Europe/Paris")` dans publish.py.
4. **Git push race condition** : commits user pendant les 10-15 min de Mistral+Claude → push échoue. Fix : publish.py utilise GitHub Contents API atomique (PUT /repos/.../contents/...).
5. **Resend addperiod records weird** : `send.send.econono.com` est correct (relatif au root domain pas au subdomain).
6. **Astro Write errors** : toujours Read avant Write si fichier existe (rsync l'a copié depuis adapte-toi).
7. **Glossaire `**markdown**` dans `<p>`** : utiliser `<strong>` HTML inline pour rendre dans Astro (idem calculateurs).

---

## Action manuelle restante côté user

- [ ] Vérifier propriété GSC `sc-domain:econono.com` (validation DNS TXT déjà OK via CF, juste valider dans Search Console)
- [ ] Soumettre sitemap GSC + Bing Webmaster Tools (https://econono.com/sitemap-index.xml)
- [ ] Tester réception mail vers `hello@econono.com` (CF Email Routing → ton gmail)
- [x] ~~OG image PNG 1200x630~~ · fait v0.2.0 (23/04 aprem)
- [x] ~~Page /auteurs/ + Person JSON-LD~~ · fait v0.2.0
- [x] ~~Favicon multi-size + apple-touch + manifest PWA~~ · fait v0.2.0
- [x] ~~security.txt + humans.txt + rsl.txt~~ · fait v0.2.0

### Décisions utilisateur actées

- **Pas de réseaux sociaux Econono** (confirmé 23/04 après-midi). `Organization.sameAs` volontairement absent. Ne pas en créer ni en suggérer dans le JSON-LD.

---

## Roadmap V1.5 (à faire bientôt)

Par ordre d'impact estimé :

### 1. Programmatic SEO (volume URLs × longue traîne)
- Pages "Vivre avec X €" : 1500, 1800, 2000, 2200, 2500, 3000, 3500, 4000 (8 pages)
- Pages "Budget étudiant {ville}" : Paris, Lyon, Marseille, Bordeaux, Lille, Toulouse, Rennes, Nantes (8 pages)
- Pages "SMIC net {année}" : 2024, 2025, 2026, 2027 (4 pages)
- Total : ~20-30 pages programmatic en 1 batch

### 2. Comparatifs commerciaux (lead gen affilié)
- Apps budget : Bankin vs Linxo vs Finary vs YNAB
- Banques en ligne : Boursorama vs Fortuneo vs Revolut vs N26 (50-150€/lead)
- Livrets : Livret A vs LEP vs LDDS vs PEL (tableau visuel)
- Coachs budget FR : déjà dans articles_plan (cron 30/04)

### 3. Interactivité visuelle
- Carte de France SVG cliquable coût de la vie par ville (INSEE)
- Donut SVG animé règle 50/30/20 (au lieu de barre)
- Graphique historique livret A (Chart.js)
- Comparateur côte à côte mon budget vs moyenne FR

### 4. Datasets ouverts (signal autorité GEO)
- Page `/donnees-ouvertes/` avec CSV/JSON téléchargeables
- SMIC histo, livret A histo, médianes INSEE par foyer, plafonds CAF par année
- Backlink magnet (chercheurs, journalistes, étudiants)

### 5. Branding humain
- Page authors avec vrais portraits SVG (5 pen names)
- Newsletter archive Carnets passés
- Témoignages réels (à collecter via newsletter)

### 6. Functionnalités
- Quiz "santé budgétaire" 10 questions → score
- Outil challenge "30 jours pour économiser 100€"
- Espace lecteur (sauvegarde locale calculs, exports PDF)

---

## Liens utiles

- Live : https://econono.com
- Pages preview : https://econono.pages.dev
- GH Actions : https://github.com/STACK-2026/econono/actions
- Supabase dashboard : https://supabase.com/dashboard/project/rxdcejlofnhjicupzikx
- Resend domaine : https://resend.com/domains/939d3ca1-88ed-42b4-ac41-3e64807ab450
- Admin portfolio : https://augustinfoucheres.com/admin (Econono visible après prochain ingest)

---

## Pour reprise immédiate

```bash
# Toujours commencer par
cd ~/stack-2026/econono
git pull origin main
cat STATE.md  # ce fichier
cat CLAUDE.md
cat SEO-CLUSTER-ARCHITECTURE.md  # plan content cluster

# État audit
cd site && npm install --silent
npm run build
python3 ../scripts/full_audit.py  # doit pass 23/23

# Voir le live
curl -sL https://econono.com | head -20
```

Tout est documenté. Les fichiers `AUDIT-SEO.md`, `AUDIT-GEO.md`, `SEO-CLUSTER-ARCHITECTURE.md` complètent.
