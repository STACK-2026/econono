# Architecture SEO Hub-and-Spoke · econono.com
> Statut : V1 · Avril 2026 · FR-only · Grand public budget/finances perso

---

## 0. Logique générale

econono.com occupe un trou de marché réel : aucun acteur FR ne combine un média
indépendant avec une suite de calculateurs modernes et un calendrier éditorial
dense. LaFinancePourTous a les calculateurs mais pas le rythme, Finary a les
outils mais cible les investisseurs, MesQuestionsdArgent est institutionnel (Banque
de France), Radins.com est vieillissant.

L'architecture choisie est 6 pillars + 1 hub calculateurs transversal. Chaque
pillar est une page de 2500-4000 mots qui centralise le cluster. Chaque spoke
est 1200-1800 mots, linke vers son pillar ET vers 2 spokes connexes ET vers 1
calculateur pertinent.

---

## 1. Les 6 Pillar Pages (hubs principaux)

### P1 · Comment gérer son budget mensuel (hub central)
- **Keyword pillar** : `comment gérer son budget mensuel`
- **Intent** : Informationnel + Commercial
- **Volume estimé** : 18 000-25 000 recherches/mois (très concurrentiel, mais
  pillar obligatoire, incontournable pour le maillage)
- **Concurrence** : ToutSurMesFinances, MesQuestionsdArgent, ABC Portage
- **Avantage differentiateur** : article 3500 mots + embed calculateur budget
  mensuel interactif + liens directs vers tous les spokes du cluster
- **Calculateur associé** : Calculateur Budget Mensuel (C1)
- **Template** : Hub informatif avec CTA calculateur en sticky sidebar

---

### P2 · Comment épargner sur un petit salaire
- **Keyword pillar** : `comment épargner avec un petit salaire`
- **Intent** : Informationnel
- **Volume estimé** : 8 000-12 000 recherches/mois
- **Concurrence** : Linxea, Pretto, La France Mutualiste (concurrence modérée)
- **Avantage differentiateur** : guide pratique + tableau par tranche de revenu
  + calculateur épargne interactive avec projection à 5/10 ans
- **Calculateur associé** : Calculateur Épargne (C4)
- **Template** : Guide complet avec tableaux + calculateur embed

---

### P3 · Comment sortir du découvert bancaire
- **Keyword pillar** : `comment sortir du découvert bancaire`
- **Intent** : Informationnel + Transactionnel (urgence)
- **Volume estimé** : 5 000-8 000 recherches/mois
- **Concurrence** : Solutis, Empruntis, Goldy (domaines financiers, DA élevé
  mais contenu générique)
- **Avantage differentiateur** : approche "plan de bataille 30 jours" + plan
  de désendettement chiffré + reste à vivre calculé
- **Calculateur associé** : Calculateur Reste à Vivre (C3) + Taux Endettement (C2)
- **Template** : Guide actionnable avec étapes numérotées + calculateurs intégrés

---

### P4 · Calculateurs budget : tous nos outils gratuits
- **Keyword pillar** : `calculateur budget gratuit en ligne`
- **Intent** : Transactionnel / Navigational-intent
- **Volume estimé** : 6 000-10 000 recherches/mois (longue traîne agrégée)
- **Concurrence** : LaFinancePourTous (DA très élevé), Finary, N26
- **Avantage differentiateur** : 12 calculateurs dans une suite cohérente, UX
  moderne, résultats instantanés sans inscription, mobile-first
- **Calculateurs associés** : tous les 12 (C1 à C12)
- **Template** : Hub listing avec cards calculateurs + description courte + CTA

---

### P5 · Comparatif applications budget : lesquelles valent le coup en 2026
- **Keyword pillar** : `meilleure application budget 2026`
- **Intent** : Commercial
- **Volume estimé** : 4 000-7 000 recherches/mois
- **Concurrence** : Finary (blog), Clubic, Empruntis (contenu daté)
- **Avantage differentiateur** : grille comparative actualisée chaque trimestre
  + test terrain par profil (étudiant, famille, indépendant) + notation
  transparente par critères
- **Calculateur associé** : Comparateur Abonnements (C12)
- **Template** : Comparatif avec tableau de notation + fiches individuelles

---

### P6 · Pouvoir d'achat 2026 : comprendre et agir
- **Keyword pillar** : `pouvoir d'achat 2026 France`
- **Intent** : Informationnel / Actu
- **Volume estimé** : 15 000-30 000 (pics saisonniers : budget, inflation,
  revalorisation SMIC)
- **Concurrence** : FranceInfo, OFCE, LePatrimoscope (autorité élevée mais
  contenu institutionnel sans outils)
- **Avantage differentiateur** : actu + chiffres INSEE/OFCE sourcés + angle
  "que faire concrètement" + calculateur salaire net/brut
- **Calculateur associé** : Calculateur Salaire Net (C5)
- **Template** : Article d'actu mis à jour + encarts chiffres + call-to-action
  vers outils

---

## 2. Spokes par cluster (8-15 par pillar)

### Cluster P1 · Budget mensuel (14 spokes)

| ID | Keyword spoke | Intent | Calculateur lié |
|----|--------------|--------|----------------|
| S1-01 | comment faire un budget familial | Informationnel | C1 |
| S1-02 | méthode des enveloppes budgétaires | Informationnel | C1 |
| S1-03 | règle 50 30 20 budget | Informationnel | C6 (règle 50/30/20) |
| S1-04 | budget mensuel couple | Informationnel | C10 (budget couple) |
| S1-05 | budget mensuel étudiant | Informationnel | C9 (budget étudiant) |
| S1-06 | budget mensuel pour 1500 euros | Informationnel | C1 |
| S1-07 | budget mensuel pour 2000 euros | Informationnel | C1 |
| S1-08 | comment faire un budget avec Excel | Informationnel | C1 |
| S1-09 | dépenses contraintes ménages France 2026 | Informationnel | C1 |
| S1-10 | comment réduire ses dépenses fixes | Informationnel | C1 |
| S1-11 | budget courses par semaine France | Informationnel | C7 (budget courses) |
| S1-12 | budget bébé premier enfant | Informationnel | C11 (budget bébé) |
| S1-13 | application pour suivre ses dépenses | Commercial | (lien P5) |
| S1-14 | combien dépenser par poste budget | Informationnel | C6 |

### Cluster P2 · Épargne (10 spokes)

| ID | Keyword spoke | Intent | Calculateur lié |
|----|--------------|--------|----------------|
| S2-01 | combien épargner par mois selon salaire | Informationnel | C4 |
| S2-02 | épargne de précaution combien | Informationnel | C4 |
| S2-03 | livret A ou assurance vie 2026 | Commercial | C4 |
| S2-04 | PEL ou livret A quelle différence | Informationnel | C4 |
| S2-05 | épargner quand on est au SMIC | Informationnel | C4 |
| S2-06 | comment automatiser son épargne | Informationnel | C4 |
| S2-07 | combien mettre de côté pour les vacances | Informationnel | C4 |
| S2-08 | épargner pour acheter un logement | Informationnel | C4 |
| S2-09 | taux livret A 2026 | Informationnel/Actu | C4 |
| S2-10 | épargner quand on a des dettes | Informationnel | C2 (taux endettement) |

### Cluster P3 · Découvert bancaire (9 spokes)

| ID | Keyword spoke | Intent | Calculateur lié |
|----|--------------|--------|----------------|
| S3-01 | taux endettement maximum recommandé | Informationnel | C2 |
| S3-02 | reste à vivre minimum France 2026 | Informationnel | C3 |
| S3-03 | frais de découvert bancaire combien | Informationnel | C3 |
| S3-04 | agios bancaires comment les éviter | Informationnel | C3 |
| S3-05 | découvert non autorisé conséquences | Informationnel | C3 |
| S3-06 | que faire quand on est à découvert fin de mois | Informationnel | C3 |
| S3-07 | points conseil budget gratuits France | Informationnel | C3 |
| S3-08 | rachat de crédit pour sortir du découvert | Commercial | C8 (coût crédit) |
| S3-09 | microcrédit social France conditions | Informationnel | C2 |

### Cluster P4 · Calculateurs hub (8 spokes - pages dédiées aux 12 calculateurs)

Note : les calculateurs sont eux-mêmes des spokes de ce hub. Chaque page
calculateur est optimisée sur un keyword transactionnel précis.

| ID | Page calculateur | Keyword principal | Intent |
|----|-----------------|-----------------|--------|
| C1 | Calculateur Budget Mensuel | `calculateur budget mensuel gratuit` | Transactionnel |
| C2 | Calculateur Taux Endettement | `calcul taux endettement` | Transactionnel |
| C3 | Calculateur Reste à Vivre | `calculateur reste à vivre` | Transactionnel |
| C4 | Calculateur Épargne | `simulateur épargne mensuelle` | Transactionnel |
| C5 | Calculateur Salaire Net | `calculateur salaire net brut 2026` | Transactionnel |
| C6 | Calculateur Règle 50/30/20 | `calculateur règle 50 30 20` | Transactionnel |
| C7 | Calculateur Budget Courses | `calculateur budget courses famille` | Transactionnel |
| C8 | Calculateur Coût Crédit | `calculateur coût total crédit` | Transactionnel |
| C9 | Calculateur Budget Étudiant | `calculateur budget étudiant` | Transactionnel |
| C10 | Calculateur Budget Couple | `calculateur budget couple` | Transactionnel |
| C11 | Calculateur Budget Bébé | `calculateur coût bébé premier enfant` | Transactionnel |
| C12 | Comparateur Abonnements | `comparateur abonnements streaming télécom` | Commercial |

Spokes informationnels autour du hub calculateurs :
| ID | Keyword spoke | Intent |
|----|--------------|--------|
| S4-01 | comment calculer son taux d'endettement | Informationnel |
| S4-02 | comment calculer son reste à vivre | Informationnel |
| S4-03 | calculer son budget mensuel étape par étape | Informationnel |
| S4-04 | simulateur salaire net 2026 fonctionnement | Informationnel |

### Cluster P5 · Comparatifs apps (10 spokes)

| ID | Keyword spoke | Intent | Calculateur lié |
|----|--------------|--------|----------------|
| S5-01 | Finary avis 2026 | Commercial | C12 |
| S5-02 | Bankin avis 2026 | Commercial | C12 |
| S5-03 | Linxo vs Finary comparaison | Commercial | C12 |
| S5-04 | meilleure appli budget gratuite 2026 | Commercial | C12 |
| S5-05 | appli budget famille 2026 | Commercial | C12 |
| S5-06 | alternatives à Bankin gratuites | Commercial | C12 |
| S5-07 | Mon Petit Budget avis | Commercial | C12 |
| S5-08 | appli pour partager les dépenses couple | Commercial | C10 |
| S5-09 | Tricount alternatives 2026 | Commercial | C10 |
| S5-10 | meilleures applis économies abonnements 2026 | Commercial | C12 |

### Cluster P6 · Pouvoir d'achat / Actu (12 spokes)

| ID | Keyword spoke | Intent | Calculateur lié |
|----|--------------|--------|----------------|
| S6-01 | SMIC net 2026 montant exact | Informationnel/Actu | C5 |
| S6-02 | augmentation SMIC 2026 date montant | Informationnel/Actu | C5 |
| S6-03 | salaire médian France 2026 | Informationnel | C5 |
| S6-04 | inflation France 2026 prévisions INSEE | Informationnel/Actu | C1 |
| S6-05 | dépenses contraintes ménages 2026 | Informationnel | C1 |
| S6-06 | taux livret A 2026 évolution | Informationnel/Actu | C4 |
| S6-07 | prix carburant impact budget ménage | Informationnel | C1 |
| S6-08 | factures énergie France 2026 hausse | Informationnel/Actu | C1 |
| S6-09 | gel loyers 2026 quelles règles | Informationnel | C3 |
| S6-10 | comment négocier son loyer en 2026 | Informationnel | C3 |
| S6-11 | aides sociales méconnues France 2026 | Informationnel | C3 |
| S6-12 | coût de la vie par ville France comparatif | Informationnel | C1 |

---

## 3. Mapping calculateur-pillar (synthèse)

| Calculateur | Pillar principal | Clusters secondaires |
|-------------|-----------------|---------------------|
| C1 · Budget Mensuel | P1 + P4 | P3, P6 |
| C2 · Taux Endettement | P3 + P4 | P2 |
| C3 · Reste à Vivre | P3 + P4 | P1, P6 |
| C4 · Épargne | P2 + P4 | P1 |
| C5 · Salaire Net | P6 + P4 | P1, P2 |
| C6 · Règle 50/30/20 | P1 + P4 | P2 |
| C7 · Budget Courses | P1 + P4 | P6 |
| C8 · Coût Crédit | P3 + P4 | P2 |
| C9 · Budget Étudiant | P1 + P4 | P6 |
| C10 · Budget Couple | P1 + P4 | P5 |
| C11 · Budget Bébé | P1 + P4 | P6 |
| C12 · Comparateur Abonnements | P5 + P4 | P1 |

---

## 4. Internal Linking Matrix (règles de maillage)

### Règles obligatoires (tous spokes)
1. **Spoke vers Pillar** : chaque spoke inclut 1 lien hypertexte vers son pillar
   en corps d'article (pas juste dans le fil d'ariane). Ancre descriptive.
2. **Pillar vers tous ses spokes** : chaque pillar liste tous ses spokes avec
   ancre naturelle dans le corps (section "Aller plus loin" ou inline).
3. **Spoke vers calculateur** : 1 CTA avec lien vers le calculateur pertinent
   intégré en milieu d'article (pas juste en bas). Texte d'ancre : "utilise
   notre calculateur [X]".

### Règles recommandées (within cluster)
- Chaque spoke linke vers 2 spokes connexes du même cluster.
- Les articles d'actu (cluster P6) linkent systématiquement vers C5 (salaire) ou C1 (budget).
- Les spokes commerciaux (cluster P5) linkent vers l'article comparatif pillar P5 ET vers C12.

### Règles optionnelles (cross-cluster)
- S1-13 (applications) linke vers P5 (cross-cluster)
- S2-10 (épargner avec dettes) linke vers P3 et C2 (cross-cluster)
- S3-08 (rachat crédit) linke vers C8 (calculateur coût crédit) et vers S4-01
- Tout spoke mentionnant le SMIC linke vers S6-01 et C5

### Matrice de liens prioritaires (top 20 liaisons)

```
P1 <-> C1, C6, C7, C9, C10, C11, S1-01..S1-14
P2 <-> C4, C8, S2-01..S2-10
P3 <-> C2, C3, C8, S3-01..S3-09
P4 <-> C1..C12, S4-01..S4-04
P5 <-> C12, S5-01..S5-10
P6 <-> C5, C4, S6-01..S6-12

S1-03 (règle 50/30/20) -> C6, P1
S1-04 (budget couple) -> C10, P1, P5 (apps partage dépenses)
S1-12 (budget bébé) -> C11, P1, P6
S2-09 (livret A 2026) -> C4, P2, S6-06 (taux livret A)
S3-08 (rachat crédit) -> C8, P3, P2
S6-01 (SMIC net 2026) -> C5, P6, S6-02
```

---

## 5. Priorité de lancement des 50 premiers contenus

### Principe de priorité
1. Pillar en premier (masse critique pour le maillage)
2. Calculateurs juste après (différentiateur concurrentiel immédiat)
3. Spokes quick-win (faible concurrence, fort volume relatif)
4. Spokes long-tail (soutien sémantique, indexation progressive)
5. Articles d'actu (SMIC, inflation) dès que les hubs sont en place

---

### Phase 1 · Semaines 1-2 : fondation (12 contenus)

Écrire les 6 pillars + lancer 6 calculateurs prioritaires.

| # | Type | Contenu | Cluster |
|---|------|---------|---------|
| 1 | Pillar | Comment gérer son budget mensuel (guide complet) | P1 |
| 2 | Pillar | Calculateurs budget : tous nos outils gratuits | P4 |
| 3 | Calculateur | Calculateur Budget Mensuel | C1 |
| 4 | Calculateur | Calculateur Salaire Net Brut 2026 | C5 |
| 5 | Calculateur | Calculateur Règle 50/30/20 | C6 |
| 6 | Calculateur | Calculateur Épargne Mensuelle | C4 |
| 7 | Pillar | Comment épargner avec un petit salaire | P2 |
| 8 | Pillar | Pouvoir d'achat 2026 : comprendre et agir | P6 |
| 9 | Spoke actu | SMIC net 2026 : montant exact après revalorisation | S6-01 |
| 10 | Spoke actu | Taux livret A 2026 : évolution et perspectives | S6-06 |
| 11 | Calculateur | Calculateur Taux Endettement | C2 |
| 12 | Calculateur | Calculateur Reste à Vivre | C3 |

---

### Phase 2 · Semaines 3-4 : cluster P1 + P3 + calculateurs restants (14 contenus)

| # | Type | Contenu | Cluster |
|---|------|---------|---------|
| 13 | Pillar | Comment sortir du découvert bancaire | P3 |
| 14 | Calculateur | Calculateur Budget Courses Famille | C7 |
| 15 | Calculateur | Calculateur Budget Étudiant | C9 |
| 16 | Calculateur | Calculateur Budget Couple | C10 |
| 17 | Calculateur | Calculateur Budget Bébé | C11 |
| 18 | Calculateur | Calculateur Coût Crédit | C8 |
| 19 | Calculateur | Comparateur Abonnements | C12 |
| 20 | Spoke | Méthode des enveloppes budgétaires expliquée | S1-02 |
| 21 | Spoke | Règle 50/30/20 : comment l'appliquer en France | S1-03 |
| 22 | Spoke | Budget mensuel pour 1 500 euros | S1-06 |
| 23 | Spoke | Budget mensuel pour 2 000 euros | S1-07 |
| 24 | Spoke | Reste à vivre minimum France 2026 | S3-02 |
| 25 | Spoke | Frais de découvert : combien ça coûte vraiment | S3-03 |
| 26 | Spoke | Taux d'endettement maximum recommandé | S3-01 |

---

### Phase 3 · Semaines 5-6 : cluster P2 + P5 + actu P6 (14 contenus)

| # | Type | Contenu | Cluster |
|---|------|---------|---------|
| 27 | Pillar | Comparatif applications budget 2026 | P5 |
| 28 | Spoke | Combien épargner par mois selon son salaire | S2-01 |
| 29 | Spoke | Épargne de précaution : combien garder de côté | S2-02 |
| 30 | Spoke | Épargner quand on est au SMIC : guide pratique | S2-05 |
| 31 | Spoke | Livret A ou assurance-vie en 2026 | S2-03 |
| 32 | Spoke | Finary avis 2026 : test complet | S5-01 |
| 33 | Spoke | Bankin avis 2026 : test complet | S5-02 |
| 34 | Spoke | Meilleure appli budget gratuite 2026 | S5-04 |
| 35 | Spoke | Salaire médian France 2026 (chiffres INSEE) | S6-03 |
| 36 | Spoke | Inflation France 2026 : prévisions et impact ménages | S6-04 |
| 37 | Spoke | Dépenses contraintes des ménages 2026 | S6-05 |
| 38 | Spoke | Budget étudiant mensuel 2026 : tout prévoir | S1-05 |
| 39 | Spoke | Budget couple : comment gérer l'argent à deux | S1-04 |
| 40 | Spoke | Agios : comment les éviter et les négocier | S3-04 |

---

### Phase 4 · Semaines 7-8 : longue traîne + complétion clusters (10 contenus)

| # | Type | Contenu | Cluster |
|---|------|---------|---------|
| 41 | Spoke | Budget bébé : coût du premier enfant en France 2026 | S1-12 |
| 42 | Spoke | Budget courses pour 4 personnes par mois 2026 | S1-11 |
| 43 | Spoke | Comment faire un budget avec Excel (template) | S1-08 |
| 44 | Spoke | Comment automatiser son épargne | S2-06 |
| 45 | Spoke | Points Conseil Budget : comment en bénéficier | S3-07 |
| 46 | Spoke | Coût de la vie par ville France 2026 | S6-12 |
| 47 | Spoke | Aides sociales méconnues France 2026 | S6-11 |
| 48 | Spoke | Linxo vs Finary : comparaison détaillée | S5-03 |
| 49 | Spoke | Appli budget famille : top 5 en 2026 | S5-05 |
| 50 | Spoke | Découvert non autorisé : conséquences et recours | S3-05 |

---

## 6. Quick Wins SEO (fort volume / faible difficulté)

Ces mots-clés ont un profil de compétition faible à moyen avec des résultats
SERP encore occupés par du contenu générique ou daté.

| # | Keyword | Volume estimé/mois | Difficulté | Pourquoi c'est atteignable |
|---|---------|-------------------|-----------|--------------------------|
| 1 | `calculateur règle 50 30 20` | 1 500-3 000 | Faible | Peu d'outils FR modernes sur ce terme exact |
| 2 | `SMIC net 2026 montant` | 20 000-50 000 (saisonnier jan.) | Moyen | Contenu daté chez la concurrence, mise à jour rapide |
| 3 | `reste à vivre calculateur` | 2 000-4 000 | Faible | Surtout des banques et crédit immobilier, angle budget manquant |
| 4 | `budget mensuel 1500 euros` | 2 500-5 000 | Faible | Quasi-aucun article dédié avec calculateur intégré |
| 5 | `budget mensuel 2000 euros` | 2 000-4 000 | Faible | Idem, longue traîne très peu travaillée |
| 6 | `épargner quand on est au SMIC` | 1 500-3 000 | Faible | Sujet émotionnel fort, peu de guides vraiment pratiques |
| 7 | `taux livret A 2026` | 8 000-15 000 (saisonnier fév.) | Moyen | Mise à jour de contenu rapide = levier actu |
| 8 | `budget bébé premier enfant 2026` | 3 000-6 000 | Faible | Résultats SERP très fragmentés et génériques |
| 9 | `frais de découvert bancaire combien` | 1 500-3 000 | Faible | Question très précise, résultats SERP génériques |
| 10 | `comparateur abonnements streaming France` | 2 000-5 000 | Moyen | Trou : comparateurs telecom existent, mais pas angle "budget perso économies" |

**Tactique quick-win** : publier les articles SMIC + livret A + budget 1500/2000€
dans les 10 premiers jours. Ces mots-clés ont une intention très claire et des
résultats souvent périmés chez la concurrence.

---

## 7. GEO Opportunities (citations ChatGPT / Perplexity / AI Overviews)

Ces requêtes ont un profil idéal pour les réponses IA : question factuelle,
chiffre précis attendu, date récente. L'objectif est d'être la source citée.

### Stratégie GEO econono.com
- Structurer la réponse dès le premier paragraphe (verdict + chiffre + source)
- Ajouter `<aside data-speakable>` avec 50-90 mots résumant le chiffre clé
- JSON-LD FAQPage sur toutes ces pages
- Citer systématiquement INSEE, OFCE, Banque de France, Service-Public.fr

| # | Requête GEO | Réponse type à optimiser | Source à citer |
|---|------------|------------------------|---------------|
| 1 | "Quel est le montant du SMIC net en 2026 ?" | 1 443 euros nets/mois depuis le 1er janvier 2026 (SMIC brut : 1 823 euros pour 35h) | travail-emploi.gouv.fr |
| 2 | "Quel est le reste à vivre minimum en France en 2026 ?" | Pas de seuil légal national uniforme, mais le HCSF retient 35 % max de taux d'endettement, laissant en moyenne 65 % du revenu net | HCSF |
| 3 | "Quelle est l'inflation prévue en France en 2026 ?" | L'OFCE prévoit +1,2 % en 2026 selon la Commission Européenne, avec un recul du pouvoir d'achat par UC de 0,7 % | OFCE avril 2026 |
| 4 | "Combien un étudiant dépense-t-il par mois en France ?" | Entre 850 et 1 200 euros/mois selon la FAGE (loyer 300-500, nourriture 200-300, transport 15-50) | FAGE 2026 |
| 5 | "Quel est le budget moyen d'une famille de 4 personnes pour les courses en 2026 ?" | Entre 500 et 700 euros/mois selon les habitudes et la localisation (contre 95-100 euros/semaine en moyenne) | Moneyvox / meslistesdecourses.fr 2026 |
| 6 | "Quelle est la règle des 50/30/20 pour gérer son budget ?" | 50 % pour les besoins essentiels, 30 % pour les loisirs, 20 % pour l'épargne, calculé sur le revenu net disponible | Référence popularisée par Elizabeth Warren |
| 7 | "Combien les dépenses contraintes coûtent-elles aux ménages français en 2026 ?" | 1 186 euros/mois en moyenne en 2026 (loyer, transport, énergie, assurances, téléphone), soit +43 euros vs 2025 | LaFinancePourTous mars 2026 |
| 8 | "Quel est le taux d'endettement maximum autorisé en France ?" | Le HCSF recommande un taux d'endettement maximal de 35 % (assurance comprise) pour l'octroi d'un crédit | HCSF 2026 |
| 9 | "Combien un bébé coûte-t-il la première année en France ?" | Entre 8 000 et 12 000 euros la première année (garde, équipement, couches, alimentation, vêtements) | Estimations UNAF 2026 |
| 10 | "Quel est le taux du livret A en 2026 ?" | 2,4 % depuis le 1er février 2026 (plafond 22 950 euros) | Banque de France |

**Optimisation speakable pour chaque article GEO :**
```html
<aside data-speakable aria-label="Réponse rapide">
  <strong>[Terme clé]</strong> : [Réponse factuelle directe en 1-2 phrases
  avec chiffre précis et source entre parenthèses].
</aside>
```

---

## 8. Architecture de fichiers recommandée (Astro)

```
src/
  pages/
    guides/
      comment-gerer-son-budget-mensuel.astro        -- P1
      comment-epargner-petit-salaire.astro           -- P2
      sortir-du-decouvert-bancaire.astro             -- P3
      pouvoir-achat-2026.astro                       -- P6
    calculateurs/
      index.astro                                    -- P4 hub
      budget-mensuel.astro                           -- C1
      taux-endettement.astro                         -- C2
      reste-a-vivre.astro                            -- C3
      epargne-mensuelle.astro                        -- C4
      salaire-net-brut.astro                         -- C5
      regle-50-30-20.astro                           -- C6
      budget-courses.astro                           -- C7
      cout-credit.astro                              -- C8
      budget-etudiant.astro                          -- C9
      budget-couple.astro                            -- C10
      budget-bebe.astro                              -- C11
      comparateur-abonnements.astro                  -- C12
    comparatifs/
      meilleures-applications-budget-2026.astro      -- P5
      finary-avis-2026.astro                         -- S5-01
      bankin-avis-2026.astro                         -- S5-02
      [...]
  content/
    blog/                                            -- spokes éditoriaux
      smic-net-2026-montant.md                       -- S6-01
      taux-livret-a-2026.md                          -- S6-06
      methode-enveloppes-budgetaires.md              -- S1-02
      [...]
```

---

## 9. Checklist anti-cannibalisation

Vérifications à faire avant chaque publication :

- `comment gérer son budget mensuel` (P1) NE doit PAS avoir de spoke avec le
  même titre générique. Les spokes sont tous des angles précis (par profil,
  par montant, par méthode).
- `calculateur budget mensuel` (C1) vs pillar P4 vs pillar P1 : le calculateur
  est une page outil, pas un article ; URL dans /calculateurs/ et non /guides/.
- `règle 50/30/20` apparaît comme spoke de P1 (S1-03) ET comme calculateur (C6) :
  pas de cannibalisation car S1-03 est l'article explicatif, C6 est l'outil
  interactif. Les deux se lient mutuellement.
- `meilleure application budget 2026` (P5) vs `meilleure appli budget gratuite
  2026` (S5-04) : suffit de différencier les angles (P5 est le comparatif
  complet toutes applications, S5-04 se concentre sur le segment gratuit).
- `taux livret A 2026` (S2-09 + S6-06) : ces deux spokes SONT le même sujet.
  Fusionner en un seul article dans le cluster P6, avec lien vers P2.
  **Action : supprimer S2-09 et pointer depuis P2 vers S6-06.**

---

## 10. Résumé opérationnel

```
6 pillars
├── P1 · Budget mensuel        (14 spokes + C1 + C6 + C7 + C9 + C10 + C11)
├── P2 · Épargne               (9 spokes après fusion + C4 + C8)
├── P3 · Découvert bancaire    (9 spokes + C2 + C3 + C8)
├── P4 · Hub calculateurs      (12 calculateurs + 4 spokes support)
├── P5 · Comparatifs apps      (10 spokes + C12)
└── P6 · Pouvoir d'achat       (12 spokes + C5 + C1)

12 calculateurs (différentiateur principal vs concurrence)
63 spokes éditoriaux identifiés
50 premiers contenus priorisés sur 8 semaines (fondation manuelle)
Pipeline Mistral+Claude+Gemini prend le relais en longue traîne à partir de la semaine 9

Quick wins prioritaires (semaines 1-2) :
SMIC net 2026 / taux livret A / budget 1500€ / budget 2000€ / reste à vivre calculateur

GEO targets : 10 requêtes avec chiffres datés et sources officielles
```

---

*Sources de référence utilisées pour ce document :*
- LaFinancePourTous.com · calculateurs et données dépenses contraintes 2026
- OFCE prévisions ménages avril 2026
- Banque de France · SMIC et livret A
- Moneyvox · budget courses couple 2026
- Finary, Bankin, Linxo · comparatif apps
- HCSF · seuil taux endettement 35 %
- FAGE · budget étudiant 2026
