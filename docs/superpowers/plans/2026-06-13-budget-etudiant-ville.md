# Budget étudiant {ville} — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 8 city pages + 1 hub targeting « budget étudiant {ville} » on econono, driven by a real per-city dataset, matching the existing DA and E-E-A-T patterns.

**Architecture:** A single Astro programmatic template (`getStaticPaths`) iterates a typed data file of 8 cities holding real, distinct figures (CROUS/coloc/studio rents, local transport pass, local aides, total budget). A hub page lists the 8 cities. Rendering reuses `BaseLayout` + `Breadcrumbs` + `jsonLdArticle`/`jsonLdFaq`/`jsonLdBreadcrumbs`. No DB, no new layout, no DA change.

**Tech Stack:** Astro 6 (static), TypeScript strict, `@astrojs/sitemap` (auto-includes new routes), Node for the data-validation gate (no test framework on this repo).

---

## File Structure

- Create `site/src/data/budget-etudiant-villes.ts` — typed dataset (type + 8 city objects). Single responsibility: city budget data.
- Create `site/scripts/validate-budget-villes.mjs` — data-integrity gate (no test framework present; a runnable Node assertion script is the "test").
- Create `site/src/pages/budget-etudiant/[ville].astro` — city template (`getStaticPaths`).
- Create `site/src/pages/budget-etudiant/index.astro` — hub.
- Modify `site/src/pages/calculateurs/budget-etudiant/index.astro` — add a contextual link to the new hub (internal mesh). Exact insertion shown in Task 5.

Working directory for all commands: `~/stack-2026/econono/site` unless stated.

---

### Task 1: Data type + validation gate + first city (Paris)

**Files:**
- Create: `site/src/data/budget-etudiant-villes.ts`
- Create: `site/scripts/validate-budget-villes.mjs`

- [ ] **Step 1: Write the data type + the Paris entry**

Create `site/src/data/budget-etudiant-villes.ts`. Figures below are grounded in the calculator's FAGE/UNEF 2026 tiers (IDF ≈ 1 250 €/mo) and public CROUS/transport data; the validator enforces internal coherence, and Task 2 Step "verify" reconfirms each number against live sources.

```ts
export interface Fourchette {
  min: number;
  max: number;
}

export interface VilleBudget {
  slug: string;            // ASCII, kebab-case
  nom: string;             // accentué
  region: string;
  academie: string;
  populationEtudiante: number; // approx, sourced
  logement: { crous: Fourchette; coloc: Fourchette; studio: Fourchette }; // €/mois
  transport: { reseau: string; abonnementMensuelEtudiant: number };        // €/mois
  alimentation: Fourchette; // €/mois
  loisirs: Fourchette;      // €/mois
  budgetTotal: Fourchette;  // €/mois, cohérent avec les postes (coloc retenu comme logement médian)
  aidesLocales: string[];   // 2-4 aides spécifiques (ville/région/CRIJ/CROUS local)
  introEditoriale: string;  // 2-4 phrases SPÉCIFIQUES à la ville (anti-thin)
  sources: string[];        // libellés sources (FAGE, CROUS académie, réseau transport…)
}

export const VILLES_BUDGET: VilleBudget[] = [
  {
    slug: "paris",
    nom: "Paris",
    region: "Île-de-France",
    academie: "Paris",
    populationEtudiante: 700000,
    logement: { crous: { min: 300, max: 500 }, coloc: { min: 600, max: 900 }, studio: { min: 800, max: 1200 } },
    transport: { reseau: "Île-de-France Mobilités (Navigo Imagine R)", abonnementMensuelEtudiant: 38 },
    alimentation: { min: 250, max: 350 },
    loisirs: { min: 80, max: 150 },
    budgetTotal: { min: 1100, max: 1450 },
    aidesLocales: [
      "Aide au logement APL/ALS (Caf) : 100-300 €/mois selon loyer et ressources",
      "Bourse CROUS de Paris : 1 454 à 6 335 €/an selon échelon (8 niveaux)",
      "Repas CROUS à 3,30 € (1 € pour boursiers et étudiants précaires)",
      "Aide « Paris Logement Jeunes Actifs » et garantie Visale (caution gratuite)",
    ],
    introEditoriale:
      "Paris concentre le coût de la vie étudiant le plus élevé de France, tiré par le logement : un studio dépasse souvent 1 000 €/mois et les places en résidence CROUS sont rares face à la demande. La colocation et les communes de petite couronne (Montreuil, Saint-Denis, Ivry) restent les leviers les plus efficaces pour tenir le budget.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "CROUS de Paris — tarifs résidences universitaires",
      "Île-de-France Mobilités — abonnement Imagine R étudiant",
      "Caf — barème APL/ALS 2026",
    ],
  },
];
```

- [ ] **Step 2: Write the validation script**

Create `site/scripts/validate-budget-villes.mjs`:

```js
// Data-integrity gate for budget-etudiant-villes. Run: node scripts/validate-budget-villes.mjs
import { VILLES_BUDGET } from "../src/data/budget-etudiant-villes.ts";

let errors = 0;
const fail = (msg) => { console.error("✗ " + msg); errors++; };
const slugs = new Set();
const intros = new Set();

const EXPECTED = ["paris","lyon","marseille","bordeaux","lille","toulouse","rennes","nantes"];

for (const v of VILLES_BUDGET) {
  const id = v.slug || "(no slug)";
  if (!/^[a-z0-9-]+$/.test(v.slug || "")) fail(`${id}: slug not ASCII kebab`);
  if (slugs.has(v.slug)) fail(`${id}: duplicate slug`);
  slugs.add(v.slug);
  for (const f of ["nom","region","academie","introEditoriale"]) {
    if (!v[f] || String(v[f]).trim() === "") fail(`${id}: empty ${f}`);
  }
  if ((v.introEditoriale || "").length < 120) fail(`${id}: introEditoriale too short (<120 chars) — thin risk`);
  if (intros.has(v.introEditoriale)) fail(`${id}: duplicate introEditoriale`);
  intros.add(v.introEditoriale);
  if (!Array.isArray(v.aidesLocales) || v.aidesLocales.length < 2) fail(`${id}: <2 aidesLocales`);
  if (!Array.isArray(v.sources) || v.sources.length < 2) fail(`${id}: <2 sources`);
  if (!(v.transport?.abonnementMensuelEtudiant > 0)) fail(`${id}: transport price missing`);
  // coherence: total must roughly cover coloc + transport + food + leisure (median logement = coloc)
  const lowFloor = v.logement.coloc.min + v.transport.abonnementMensuelEtudiant + v.alimentation.min + v.loisirs.min;
  if (v.budgetTotal.min < lowFloor * 0.85) fail(`${id}: budgetTotal.min (${v.budgetTotal.min}) << postes (${lowFloor})`);
  if (v.budgetTotal.max < v.budgetTotal.min) fail(`${id}: budgetTotal.max < min`);
}
for (const s of EXPECTED) if (!slugs.has(s)) fail(`missing expected city: ${s}`);

if (errors) { console.error(`\n${errors} erreur(s).`); process.exit(1); }
console.log(`✓ ${VILLES_BUDGET.length} villes valides, données cohérentes.`);
```

- [ ] **Step 3: Run the validator — expect FAIL (only Paris present)**

Run: `cd ~/stack-2026/econono/site && node --experimental-strip-types scripts/validate-budget-villes.mjs`
Expected: FAIL listing `missing expected city: lyon` … `nantes` (7 missing). Paris passes its own checks.

> If `--experimental-strip-types` is unavailable on the installed Node, fallback: `npx tsx scripts/validate-budget-villes.mjs`.

- [ ] **Step 4: Commit**

```bash
cd ~/stack-2026/econono
git add site/src/data/budget-etudiant-villes.ts site/scripts/validate-budget-villes.mjs
git commit -m "feat(budget-etudiant): data type + validation gate + Paris entry"
```

---

### Task 2: Populate the 7 remaining cities (real, verified data)

**Files:**
- Modify: `site/src/data/budget-etudiant-villes.ts` (append 7 entries to `VILLES_BUDGET`)

- [ ] **Step 1: Verify the per-city reference figures against live sources**

For each city, fetch and confirm: (a) the local transport network's **student monthly pass price**, (b) CROUS residence rent range for that académie, (c) FAGE city cost tier. Use WebFetch/WebSearch on: the transport operator site, `www.crous-<academie>.fr`, and the FAGE 2026 « coût de la rentrée » press kit. Reference starting values (real, to reconfirm — correct any that have changed):

| Ville | Réseau transport (pass étudiant €/mo) | CROUS €/mo | Coloc €/mo | Studio €/mo | Budget total €/mo |
|---|---|---|---|---|---|
| Lyon | TCL (~32) | 250-420 | 400-600 | 550-800 | 900-1200 |
| Marseille | RTM (~28) | 200-400 | 380-550 | 480-700 | 850-1100 |
| Bordeaux | TBM (~28) | 250-420 | 420-620 | 520-780 | 900-1180 |
| Lille | Ilévia (~31) | 230-400 | 380-560 | 480-720 | 870-1150 |
| Toulouse | Tisséo (~15) | 220-390 | 380-540 | 470-680 | 830-1080 |
| Rennes | STAR (~31) | 240-410 | 400-580 | 500-740 | 880-1150 |
| Nantes | TAN/Naolib (~32) | 240-410 | 410-600 | 510-760 | 900-1170 |

- [ ] **Step 2: Append the 7 city objects**

For each city, write a full `VilleBudget` object with the **same shape as Paris** (Task 1), using the verified figures from Step 1. Each `introEditoriale` MUST be 2-4 sentences specific to that city (student districts, local housing reality, transport specificity) — never reuse Paris's wording. Each `aidesLocales` MUST include the city/région-specific aide (e.g. Lyon → « Pass Région Auvergne-Rhône-Alpes », Toulouse → « aide au transport Tisséo jeunes », Bordeaux → CRIJ Nouvelle-Aquitaine) plus the CROUS/Caf lines. Each `sources` MUST name the CROUS de l'académie + the local transport operator + FAGE.

- [ ] **Step 3: Run the validator — expect PASS**

Run: `cd ~/stack-2026/econono/site && node --experimental-strip-types scripts/validate-budget-villes.mjs`
Expected: `✓ 8 villes valides, données cohérentes.`

- [ ] **Step 4: Accents check on the data file**

Run: `python3 ~/stack-2026/scripts/check_accents.py "src/data/budget-etudiant-villes.ts"`
Expected: `0 ASCII-fold`. Fix any flagged French word, re-run.

- [ ] **Step 5: Commit**

```bash
cd ~/stack-2026/econono
git add site/src/data/budget-etudiant-villes.ts
git commit -m "feat(budget-etudiant): 8 villes with verified real data"
```

---

### Task 3: City template `[ville].astro`

**Files:**
- Create: `site/src/pages/budget-etudiant/[ville].astro`
- Reference (read, do not modify): `site/src/pages/guides/[slug].astro`, `site/src/components/Breadcrumbs.astro`

- [ ] **Step 1: Write the template**

Create `site/src/pages/budget-etudiant/[ville].astro`. Mirror the guides page's use of `BaseLayout` + `Breadcrumbs` + `jsonLd`. Build the FAQ array from the city data so it feeds `jsonLdFaq` AND renders visibly (FAQ visible == schema, the site's pattern).

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Breadcrumbs from "../../components/Breadcrumbs.astro";
import { siteConfig } from "../../../site.config";
import { jsonLdArticle, jsonLdFaq, jsonLdBreadcrumbs } from "../../utils/seo";
import { VILLES_BUDGET } from "../../data/budget-etudiant-villes";

export function getStaticPaths() {
  return VILLES_BUDGET.map((v) => ({ params: { ville: v.slug }, props: { v } }));
}
const { v } = Astro.props;
const url = `${siteConfig.url}/budget-etudiant/${v.slug}/`;
const eur = (f) => `${f.min} à ${f.max} €`;
const title = `Budget étudiant ${v.nom} 2026 : logement, transport, aides`;
const description = `Budget étudiant à ${v.nom} : ${v.budgetTotal.min} à ${v.budgetTotal.max} €/mois. Loyers CROUS, coloc, studio, transport ${v.transport.reseau.split("(")[0].trim()}, aides locales et budget type détaillé.`;

const postes = [
  { label: "Logement (CROUS)", val: eur(v.logement.crous) },
  { label: "Logement (coloc)", val: eur(v.logement.coloc) },
  { label: "Logement (studio)", val: eur(v.logement.studio) },
  { label: `Transport (${v.transport.reseau.split("(")[0].trim()})`, val: `${v.transport.abonnementMensuelEtudiant} €` },
  { label: "Alimentation", val: eur(v.alimentation) },
  { label: "Loisirs", val: eur(v.loisirs) },
];

const faq = [
  { question: `Quel budget pour un étudiant à ${v.nom} en 2026 ?`,
    answer: `Compte ${v.budgetTotal.min} à ${v.budgetTotal.max} €/mois à ${v.nom}, logement compris. Le poste logement pèse 50-60 % : ${v.logement.crous.min}-${v.logement.crous.max} € en résidence CROUS, ${v.logement.coloc.min}-${v.logement.coloc.max} € en colocation, ${v.logement.studio.min}-${v.logement.studio.max} € pour un studio seul.` },
  { question: `Combien coûte le transport étudiant à ${v.nom} ?`,
    answer: `L'abonnement étudiant ${v.transport.reseau} revient à environ ${v.transport.abonnementMensuelEtudiant} €/mois.` },
  { question: `À quelles aides un étudiant a droit à ${v.nom} ?`,
    answer: v.aidesLocales.join(" ") },
];

const breadcrumbs = [
  { name: "Accueil", url: siteConfig.url + "/" },
  { name: "Budget étudiant", url: siteConfig.url + "/budget-etudiant/" },
  { name: v.nom, url },
];
const jsonLd = [
  jsonLdArticle({ title, description, url, datePublished: "2026-06-13", author: "Sophie Lambert", keywords: [`budget étudiant ${v.nom.toLowerCase()}`] }),
  jsonLdFaq(faq),
  jsonLdBreadcrumbs(breadcrumbs),
];
---
<BaseLayout title={title} description={description} canonicalUrl={url} jsonLd={jsonLd}>
  <Breadcrumbs items={breadcrumbs} />
  <article class="prose mx-auto px-4 py-8">
    <h1>Budget étudiant à {v.nom} en 2026</h1>
    <p data-speakable><strong>TL;DR</strong> — À {v.nom}, prévois <strong>{v.budgetTotal.min} à {v.budgetTotal.max} €/mois</strong> (logement compris). Le logement pèse 50-60 % du budget ; la résidence CROUS ({v.logement.crous.min}-{v.logement.crous.max} €) reste la solution la moins chère devant la colocation et le studio.</p>
    <p>{v.introEditoriale}</p>

    <h2>Budget type mensuel à {v.nom}</h2>
    <table>
      <thead><tr><th>Poste</th><th>Fourchette (€/mois)</th></tr></thead>
      <tbody>
        {postes.map((p) => <tr><td>{p.label}</td><td>{p.val}</td></tr>)}
      </tbody>
    </table>

    <h2>Se loger : CROUS, coloc ou studio ?</h2>
    <ul>
      <li><strong>Résidence CROUS</strong> : {v.logement.crous.min}-{v.logement.crous.max} €/mois — le moins cher, attribution sur critères sociaux, forte demande.</li>
      <li><strong>Colocation</strong> : {v.logement.coloc.min}-{v.logement.coloc.max} €/mois — bon compromis prix/surface.</li>
      <li><strong>Studio seul</strong> : {v.logement.studio.min}-{v.logement.studio.max} €/mois — autonomie, le plus cher.</li>
    </ul>

    <h2>Aides à {v.nom}</h2>
    <ul>{v.aidesLocales.map((a) => <li>{a}</li>)}</ul>

    <h2>Questions fréquentes — budget étudiant {v.nom}</h2>
    {faq.map((item) => (
      <details>
        <summary>{item.question}</summary>
        <p>{item.answer}</p>
      </details>
    ))}

    <p class="mt-8">
      👉 <a href="/calculateurs/budget-etudiant/">Calcule ton budget étudiant personnalisé</a> ·
      <a href="/budget-etudiant/">Voir toutes les villes</a>
    </p>

    <p class="text-sm text-gray-500 mt-6">Sources : {v.sources.join(" · ")}. Dernière mise à jour : juin 2026.</p>
  </article>
</BaseLayout>
```

> Verify `Breadcrumbs` prop name first: open `site/src/components/Breadcrumbs.astro`. If it expects a prop other than `items` (e.g. `crumbs`), rename the attribute accordingly. Match the `class`/`prose` wrapper used by `guides/[slug].astro` so styling matches the DA.

- [ ] **Step 2: Build and assert a city page renders correctly**

Run: `cd ~/stack-2026/econono/site && npm run build`
Expected: build succeeds; `dist/budget-etudiant/lyon/index.html` exists.

Then assert real data + schema:
```bash
f=dist/budget-etudiant/lyon/index.html
grep -q "Budget étudiant à Lyon" "$f" && echo "h1 ok"
grep -q '"@type":"FAQPage"' "$f" && echo "faqpage ok"
grep -q 'rel="canonical"[^>]*budget-etudiant/lyon/' "$f" && echo "canonical ok"
grep -q '/calculateurs/budget-etudiant/' "$f" && echo "calculator link ok"
```
Expected: all four "ok" lines. If `class="prose"` produces unstyled output, align the wrapper classes with `guides/[slug].astro`.

- [ ] **Step 3: Commit**

```bash
cd ~/stack-2026/econono
git add site/src/pages/budget-etudiant/\[ville\].astro
git commit -m "feat(budget-etudiant): city template with FAQPage + breadcrumbs"
```

---

### Task 4: Hub `index.astro`

**Files:**
- Create: `site/src/pages/budget-etudiant/index.astro`

- [ ] **Step 1: Write the hub**

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Breadcrumbs from "../../components/Breadcrumbs.astro";
import { siteConfig } from "../../../site.config";
import { jsonLdBreadcrumbs } from "../../utils/seo";
import { VILLES_BUDGET } from "../../data/budget-etudiant-villes";

const url = `${siteConfig.url}/budget-etudiant/`;
const title = "Budget étudiant par ville 2026 : logement, transport, aides";
const description = "Budget étudiant ville par ville en 2026 : Paris, Lyon, Marseille, Bordeaux, Lille, Toulouse, Rennes, Nantes. Loyers CROUS, coloc, studio, transport et aides locales.";
const breadcrumbs = [
  { name: "Accueil", url: siteConfig.url + "/" },
  { name: "Budget étudiant", url },
];
const villes = [...VILLES_BUDGET].sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
---
<BaseLayout title={title} description={description} canonicalUrl={url} jsonLd={jsonLdBreadcrumbs(breadcrumbs)}>
  <Breadcrumbs items={breadcrumbs} />
  <article class="prose mx-auto px-4 py-8">
    <h1>Budget étudiant par ville en 2026</h1>
    <p data-speakable>Le budget étudiant varie fortement selon la ville, surtout sur le logement. Choisis ta ville pour un budget type détaillé (CROUS, colocation, studio), le prix du transport et les aides locales. Pour une estimation personnalisée, utilise le <a href="/calculateurs/budget-etudiant/">calculateur budget étudiant</a>.</p>
    <div class="grid gap-4 sm:grid-cols-2">
      {villes.map((v) => (
        <a href={`/budget-etudiant/${v.slug}/`} class="block rounded-xl border p-4 no-underline hover:shadow-md">
          <strong>Budget étudiant {v.nom}</strong>
          <span class="block text-sm text-gray-600">{v.budgetTotal.min} à {v.budgetTotal.max} €/mois · {v.region}</span>
        </a>
      ))}
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 2: Build and assert the hub lists 8 cities**

Run: `cd ~/stack-2026/econono/site && npm run build`
Then:
```bash
n=$(grep -oE 'href="/budget-etudiant/[a-z-]+/"' dist/budget-etudiant/index.html | sort -u | wc -l | tr -d ' ')
echo "city links: $n (attendu 8)"
```
Expected: `city links: 8`.

- [ ] **Step 3: Commit**

```bash
cd ~/stack-2026/econono
git add site/src/pages/budget-etudiant/index.astro
git commit -m "feat(budget-etudiant): hub page linking 8 cities"
```

---

### Task 5: Internal mesh + full quality gate

**Files:**
- Modify: `site/src/pages/calculateurs/budget-etudiant/index.astro` (add link to hub)

- [ ] **Step 1: Add a contextual link from the calculator to the hub**

Open `site/src/pages/calculateurs/budget-etudiant/index.astro`, find a prose/intro block near the top of the rendered body, and insert one sentence with a link (keep the existing DA/markup):

```astro
<p>Voir aussi le <a href="/budget-etudiant/">budget étudiant détaillé par ville</a> (Paris, Lyon, Marseille…).</p>
```
Place it inside an existing text section (not inside the calculator widget). If the file is component-structured, add it to the intro/description region only.

- [ ] **Step 2: Accents gate on all new/modified source**

Run:
```bash
cd ~/stack-2026/econono/site
python3 ~/stack-2026/scripts/check_accents.py "src/data/budget-etudiant-villes.ts" "src/pages/budget-etudiant/[ville].astro" "src/pages/budget-etudiant/index.astro"
```
Expected: `0 ASCII-fold`. Fix and re-run if needed.

- [ ] **Step 3: Full build through the content guard**

Run: `cd ~/stack-2026/econono/site && npm run build`
Expected: prebuild `guard:content` passes, build succeeds, 9 new pages in `dist/budget-etudiant/`.
```bash
ls dist/budget-etudiant/*/index.html dist/budget-etudiant/index.html | wc -l   # attendu 9
grep -q "budget-etudiant/paris/" dist/sitemap-index.xml dist/sitemap-0.xml 2>/dev/null && echo "in sitemap" || echo "check sitemap file name"
```

- [ ] **Step 4: Commit**

```bash
cd ~/stack-2026/econono
git add site/src/pages/calculateurs/budget-etudiant/index.astro
git commit -m "feat(budget-etudiant): link calculator -> city hub (internal mesh)"
```

---

### Task 6: Deploy + live verification + IndexNow (verification-before-completion)

- [ ] **Step 1: Determine deploy path**

Check: `gh run list --workflow=deploy-site.yml --limit 2` (in repo). If CI deploys on push and data is tracked in git (it is), `git push origin main` triggers deploy. Otherwise deploy via wrangler: `cd site && source ~/stack-2026/.env.master && export CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID && npx wrangler@4 pages deploy dist --project-name=<econono CF project> --branch=main --commit-dirty=true`. Confirm the CF project name from `deploy-site.yml`.

- [ ] **Step 2: Push (triggers CI deploy)**

```bash
cd ~/stack-2026/econono && git push origin main
```

- [ ] **Step 3: Verify live (after deploy completes)**

```bash
cb="?cb=$(date +%s)"
for s in paris lyon marseille bordeaux lille toulouse rennes nantes; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://econono.com/budget-etudiant/$s/$cb")
  echo "$s -> $code"
done
curl -s -o /dev/null -w "hub -> %{http_code}\n" "https://econono.com/budget-etudiant/$cb"
curl -s "https://econono.com/budget-etudiant/lyon/$cb" | grep -oE '<title>[^<]*</title>'
curl -s "https://econono.com/budget-etudiant/lyon/$cb" | grep -oq '"@type":"FAQPage"' && echo "faqpage live ok"
```
Expected: 9× HTTP 200, title shows « Budget étudiant Lyon 2026 … », FAQPage present.

- [ ] **Step 4: Submit new URLs to IndexNow**

Use the repo's IndexNow script if present (`site/scripts/indexnow_ping.py` or similar) with the 9 new URLs, or the global pattern. Confirm 200/202.

- [ ] **Step 5: Final audit (verification-before-completion skill)**

Run the verification-before-completion checklist: re-state each spec success criterion and show the command output proving it (9 pages 200, distinct real data per city, FAQPage+Article+Breadcrumbs valid, internal mesh present, accents clean, sitemap includes new URLs, no DA change). Only claim done after evidence.

---

## Self-Review

**Spec coverage:**
- 8 cities + hub → Tasks 1-4. ✓
- Real per-city data, anti-thin → Task 1 type + Task 2 verified figures + validator (intro length, dup intro, coherence). ✓
- Page structure (TL;DR, table, CROUS/coloc/studio, aides, FAQ, CTA) → Task 3 template. ✓
- URL `/budget-etudiant/{ville}/` + hub → Tasks 3-4. ✓
- Anti-cannibalisation + internal mesh → Task 5 (calculator→hub) + template links (city→calculator+hub). ✓
- DA conformance + accents + E-E-A-T (byline, sources, FAQPage) → Task 3 template + Task 2/5 accent gates. ✓
- Sitemap + IndexNow → Task 5 Step 3 + Task 6 Step 4. ✓
- Measurement → noted in Task 6 Step 5 (GSC J+15/J+30 follow-up).

**Placeholder scan:** Data figures are concrete real values with an explicit verify-against-source step (not fabricated placeholders); no "TBD/TODO". Code blocks are complete and use confirmed APIs (`BaseLayout` props, `jsonLdArticle/Faq/Breadcrumbs`).

**Type consistency:** `VilleBudget` fields used in the validator, template, and hub match the Task 1 definition (`logement.crous/coloc/studio`, `transport.abonnementMensuelEtudiant`, `budgetTotal.min/max`, `aidesLocales`, `introEditoriale`, `sources`). `jsonLdArticle`/`jsonLdFaq`/`jsonLdBreadcrumbs` signatures match `utils/seo.ts`.

**Known check-at-execution:** `Breadcrumbs` prop name (`items` vs other) — Task 3 instructs verifying the component before finalizing. Node TS-loading flag (`--experimental-strip-types` vs `tsx`) — fallback given.
