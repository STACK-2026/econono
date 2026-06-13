# Design — Budget étudiant {ville} : pages programmatiques géo

> Date : 2026-06-13 · Projet : econono (econono.com) · Statut : design validé, en attente plan d'implémentation

## Contexte & problème

econono est un média finance perso FR (50 articles, 12 calculateurs) qui **classe bien (position moyenne ~7) mais reçoit peu d'impressions** (~177/15j) : il n'a pas de pages sur les **termes de tête à fort volume**. Sa propre `ROADMAP.md` identifie le levier #1 (★★★★★) « Programmatic SEO », dont la famille **« Budget étudiant {ville} » ×8 n'a jamais été construite** (seul un calculateur générique existe). C'est le vrai non-traité à fort potentiel : requêtes géo à volume réel (« budget étudiant paris », « budget étudiant lyon »…), longue traîne saine, intention claire.

## Objectif

Construire **8 pages villes + 1 hub** ciblant « budget étudiant {ville} », alimentées par des **données réelles par ville**, conformes à la DA et aux standards E-E-A-T existants, sans cannibaliser le calculateur ni les articles existants.

## Non-objectifs (YAGNI)

- Pas les autres familles roadmap (Vivre avec 3500/4000, SMIC {année}, datasets ouverts) — lots séparés.
- Pas de nouveau composant de DA ni de refonte visuelle.
- Pas de calculateur interactif neuf (on relie celui qui existe).
- Pas de back-office / CMS / DB (T1 statique, données dans le repo).

## Architecture

Pattern programmatique standard Astro, calqué sur l'existant (`pages/guides/[slug].astro`) :

- **`src/data/budget-etudiant-villes.ts`** — source de vérité : un objet par ville avec valeurs réelles (voir « Modèle de données »).
- **`src/pages/budget-etudiant/[ville].astro`** — template unique, `getStaticPaths()` itère le data file → 8 pages.
- **`src/pages/budget-etudiant/index.astro`** — hub : liste les 8 villes (maillage interne) + cible le terme de tête « budget étudiant 2026 ».

Rendu via les briques existantes : `BaseLayout` + `Breadcrumbs` + `jsonLdArticle` + `jsonLdBreadcrumbs` (utils/seo) + **FAQPage** (pattern E-E-A-T déjà utilisé sur le site). Aucun nouveau layout.

## Modèle de données (`budget-etudiant-villes.ts`)

Chaque ville (type TypeScript strict) porte des **valeurs réelles distinctes**, pas des placeholders :

```
{
  slug, nom, region, populationEtudiante,
  logement: { crous: [min,max], coloc: [min,max], studio: [min,max] },
  transport: { reseau, abonnementMensuelEtudiant },   // ex. Paris=Navigo Imagine R, Lyon=TCL, Marseille=RTM, Bordeaux=TBM…
  alimentation, loisirs,                                 // fourchettes mensuelles
  budgetTotal: { min, max },                             // cohérent avec les postes
  aidesLocales: [ ... ],                                 // CROUS local, aides ville/région, CRIJ
  introEditoriale,                                       // 2-4 phrases SPÉCIFIQUES à la ville (anti-thin)
  sources: [ ... ]                                       // FAGE, CROUS académie, réseau transport, INSEE
}
```

## Stratégie anti-thin-content (point critique)

Le risque d'un programmatique mal fait = pages-doublons → pénalité. Unicité garantie par :
1. **Données réelles différentes par ville** (loyers CROUS/coloc/studio, prix exact de l'abonnement transport du réseau local, budget total) — sourcées, pas inventées.
2. **Intro éditoriale spécifique** par ville (tension logement, quartiers étudiants, spécificités locales).
3. **Sources citées** par page (E-E-A-T), `lastReviewed`, byline auteur/`reviewedBy` comme le reste du site.

Fondation existante réutilisée : la FAQ du calculateur porte déjà des données FAGE/UNEF 2026 sourcées (820€ province / 1100€ grandes villes / 1250€ IDF, CROUS 200-450€, coloc 350-900€, bourse 1454-6335€, repas CROUS 3,30€/1€) → cohérence garantie entre calculateur et pages villes.

## Structure de page (ville)

TL;DR chiffré → tableau budget mensuel ventilé (logement / transport / alimentation / loisirs) → comparatif **CROUS vs coloc vs studio** → **aides locales** → comparaison province/IDF → **FAQ** (→ FAQPage JSON-LD) → **CTA vers `/calculateurs/budget-etudiant/`**. Breadcrumbs : Accueil → Budget étudiant → {Ville}.

## URL & routing

- Villes : `/budget-etudiant/{ville-slug}/` (mot-clé en tête de l'URL).
- Hub : `/budget-etudiant/`.
- Slugs ASCII (paris, lyon, marseille, bordeaux, lille, toulouse, rennes, nantes) ; contenu parfaitement accentué (règle CLAUDE.md).

## Anti-cannibalisation

| Surface | Cible | Intention |
|---|---|---|
| Pages villes (neuf) | « budget étudiant {ville} » | longue traîne géo, informationnel |
| Hub (neuf) | « budget étudiant 2026 » | tête, informationnel |
| Calculateur (existant) | usage outil | transactionnel/outil |
| Articles existants | leurs sujets propres | inchangés |

Maillage : hub ↔ 8 villes ↔ calculateur. Aucune cible dupliquée. Le hub renvoie au calculateur ; chaque ville renvoie au calculateur + au hub.

## Conformité (DA, qualité, archi données)

- **DA inchangée** : composants et layouts existants uniquement.
- **Accents** : tout contenu rédactionnel parfaitement accentué ; slugs/URLs en ASCII.
- **T1 statique** : données dans le repo, build statique, pas de Supabase/DB.
- **E-E-A-T** : sources citées, byline, `lastReviewed`, FAQPage.

## Périmètre

8 villes (Paris, Lyon, Marseille, Bordeaux, Lille, Toulouse, Rennes, Nantes) + 1 hub = **9 pages**. Extensible (ajouter une ville = une entrée data).

## Sources de données (réelles)

FAGE « coût de la rentrée » (ventilation par ville/académie), CROUS de l'académie (loyers résidences), réseaux de transport locaux (tarif abonnement étudiant : Navigo Imagine R, TCL, RTM, TBM, Ilévia, Tisséo, STAR, TAN), INSEE (coût de la vie), plafonds CAF (APL/ALS).

## Critères de succès

- 9 pages buildées, 200, FAQPage + Article + Breadcrumbs JSON-LD valides.
- Chaque page ville porte des **valeurs réelles distinctes** + intro unique (zéro placeholder, zéro duplication).
- Maillage interne hub ↔ villes ↔ calculateur en place.
- Accents parfaits (check_accents OK), aucun changement de DA.
- Sitemap + IndexNow incluent les nouvelles URLs.
- Mesure : suivi des impressions « budget étudiant {ville} » en GSC à J+15/J+30.

## Hors périmètre / suites possibles

Autres familles programmatiques de la roadmap, page datasets ouverts, interactivité SVG — lots ultérieurs distincts.
