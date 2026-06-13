import { VILLES_BUDGET } from "../src/data/budget-etudiant-villes.ts";
let errors = 0;
const fail = (msg) => { console.error("✗ " + msg); errors++; };
const slugs = new Set(); const intros = new Set();
const EXPECTED = ["paris","lyon","marseille","bordeaux","lille","toulouse","rennes","nantes"];
for (const v of VILLES_BUDGET) {
  const id = v.slug || "(no slug)";
  if (!/^[a-z0-9-]+$/.test(v.slug || "")) fail(`${id}: slug not ASCII kebab`);
  if (slugs.has(v.slug)) fail(`${id}: duplicate slug`); slugs.add(v.slug);
  for (const f of ["nom","region","academie","introEditoriale"]) if (!v[f] || String(v[f]).trim()==="") fail(`${id}: empty ${f}`);
  if ((v.introEditoriale||"").length < 120) fail(`${id}: introEditoriale too short (<120) — thin risk`);
  if (intros.has(v.introEditoriale)) fail(`${id}: duplicate introEditoriale`); intros.add(v.introEditoriale);
  if (!Array.isArray(v.aidesLocales)||v.aidesLocales.length<2) fail(`${id}: <2 aidesLocales`);
  if (!Array.isArray(v.sources)||v.sources.length<2) fail(`${id}: <2 sources`);
  if (!(v.transport?.abonnementMensuelEtudiant>0)) fail(`${id}: transport price missing`);
  const lowFloor = v.logement.coloc.min + v.transport.abonnementMensuelEtudiant + v.alimentation.min + v.loisirs.min;
  if (v.budgetTotal.min < lowFloor*0.85) fail(`${id}: budgetTotal.min (${v.budgetTotal.min}) << postes (${lowFloor})`);
  if (v.budgetTotal.max < v.budgetTotal.min) fail(`${id}: budgetTotal.max < min`);
}
for (const s of EXPECTED) if (!slugs.has(s)) fail(`missing expected city: ${s}`);
if (errors) { console.error(`\n${errors} erreur(s).`); process.exit(1); }
console.log(`✓ ${VILLES_BUDGET.length} villes valides, données cohérentes.`);
