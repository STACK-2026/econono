# Roadmap · Econono · V1.5 et au-delà

> Améliorations possibles après Phase 0. Liste priorisée par impact estimé.
>
> **Note v0.2.0 (23/04/2026 après-midi)** : les items "Page authors avec vrais portraits", "OG image PNG", "headers durcis (CSP/HSTS/X-Frame)", "favicon multi-size + PWA", "schema NewsMediaOrganization + Person", "ai-sitemap", "security.txt/humans.txt/rsl.txt" sont **faits** dans v0.2.0 (voir CHANGELOG).

---

## V1.5 · Court terme (semaines 1-4)

### 1. Programmatic SEO (volume URLs × longue traîne) · Impact ★★★★★

Génération automatique de pages templates à fort volume de recherche.

**Pages "Vivre avec X € par mois"** (8 pages × 5-15k volume/mois)
- 1500, 1800, 2000, 2200, 2500, 3000, 3500, 4000 €
- Template : intro factuelle, budget type ventilé, comparaison médiane FR par CSP, leviers d'optimisation par poste, aides activables, CTA calculateur reste à vivre
- Source : INSEE Consommation des ménages + DREES Revenus

**Pages "Budget étudiant {ville}"** (8 pages × 1-3k volume)
- Paris, Lyon, Marseille, Bordeaux, Lille, Toulouse, Rennes, Nantes
- Template : budget type étudiant pour cette ville (logement CROUS vs coloc vs studio, transport, alimentation, loisirs), aides locales, comparaison province
- Source : FAGE indicateur coût étudiant

**Pages "SMIC net {année}"** (4 pages, retro + prospective)
- 2024, 2025, 2026, 2027
- Template : SMIC brut + net + charges, comparaison annuelle, pouvoir d'achat
- Source : Service-Public, INSEE

**Total** : ~20-30 pages programmatic en 1 batch. Implémentation via Astro `getStaticPaths` + un fichier `data/programmatic.ts`.

### 2. Comparatifs commerciaux (lead gen affiliate) · Impact ★★★★

Articles à fort potentiel commercial (CPL 50-150€/lead pour banques, 5-30€ pour assurances).

- **Apps budget** : Bankin vs Linxo vs Finary vs YNAB vs Plan & Multiply (déjà en plan articles_plan)
- **Banques en ligne** : Boursorama vs Fortuneo vs Revolut vs N26 (CPL élevé)
- **Livrets épargne** : Livret A vs LEP vs LDDS vs PEL (tableau visuel + pour qui c'est fait)
- **Mutuelles santé** : comparatif type tableau pour qui choisir
- **Assurances habitation** : low cost vs traditionnel
- **Forfaits mobile** : Free vs RED vs Sosh vs B&You (5-15€ vs traditionnel)

Affiliate programs à connecter : Awin, TimeOne, Rakuten, programmes directs banques.

### 3. Interactivité visuelle · Impact ★★★

- **Carte de France SVG cliquable** coût de la vie par ville (INSEE)
- **Donut SVG animé** pour règle 50/30/20 (au lieu de la barre actuelle)
- **Graphique historique livret A** depuis 2000 (Chart.js minimal ou SVG natif)
- **Comparateur côte à côte** "ton budget vs moyenne FR similaire" (utilise les valeurs INSEE par CSP)
- **Slider interactif** sur calculateur épargne pour voir l'effet de la durée

### 4. Datasets ouverts (signal autorité GEO) · Impact ★★★★

Page `/donnees-ouvertes/` avec datasets téléchargeables CSV/JSON :
- SMIC histo 2000-2026 (mensuel)
- Livret A taux histo 2000-2026 (semestriel)
- LEP taux histo
- Médianes INSEE consommation par taille de foyer
- Plafonds CAF par année (APL, prime activité, RSA)
- HCSF règles d'évolution

→ Signal d'autorité massif pour les LLMs (page citée comme source).
→ Backlink magnet (chercheurs, journalistes, étudiants).

### 5. Page authors avec portraits · Impact ★★

- Page `/auteurs/` listant les 5 pen names (Léa, Marc, Sophie, Antoine, Camille)
- Mini-portrait SVG unique pour chacun (avatar généré, pas photo)
- Bio courte (3-4 lignes) avec spécialité éditoriale
- Liens vers leurs articles (filtre frontmatter author)
- Schema.org Person JSON-LD (signal E-E-A-T fort)

---

## V2 · Moyen terme (mois 2-3)

### 6. Functionnalités d'engagement
- **Quiz "santé budgétaire"** 10 questions → score + recommandations + email opt-in
- **Outil challenge** "30 jours pour économiser 100 €" (calendrier interactif + emails quotidiens)
- **Espace lecteur** : sauvegarde locale calculs, exports PDF (sans inscription serveur)

### 7. App SaaS budget léger (si traction)
- Saisie manuelle dépenses (pas de connexion bancaire = 0 friction réglementaire)
- Méthode enveloppes
- Dashboard mensuel avec graphique
- Score santé budgétaire mensuel
- Premium 4,99 €/mois : enveloppes illimitées, historique, mode couple, alertes
- Référence : Plan & Multiply (12k+ avis sans connexion bancaire)

### 8. Newsletter Carnet
- Archive publique des Carnets passés (page dédiée)
- Inscription incentive : "Le guide PDF des 30 aides oubliées"
- Format Carnet : chiffre de la semaine + astuce testée + calculateur recommandé + actu pouvoir d'achat (4 sections)

### 9. Témoignages réels
- Collecter via newsletter (formulaire opt-in)
- Section témoignages homepage avec vraies citations + photos floues si pas d'accord pour identité

---

## V3 · Long terme (mois 4-6)

### 10. International (ENG)
- Si traction FR confirmée, considérer version EN pour marché belge/luxembourgeois/canadien francophone d'abord
- Hreflang FR-FR + FR-BE + FR-LU + FR-CA
- Adapter calculateurs aux barèmes locaux

### 11. Partenariats éditoriaux
- Échanges avec La Finance pour Tous (IEFP), Mes-Allocs, Service-Public (open data)
- Articles invités sur médias finance perso établis
- Podcasts (Heu?reka, Karma & Compagnie, etc.)

### 12. Marque vivante
- Profil X (@econono_fr) + LinkedIn page Econono
- Threads éducatifs (signal autorité knowledge graph)
- Wikidata entity Econono

---

## Améliorations techniques continues

### Performance
- Lighthouse audits réguliers (cible 95+ sur tous les axes)
- Optimisation images (WebP automatique)
- Service Worker pour offline reading

### SEO/GEO
- Mises à jour trimestrielles SMIC/livret A/barèmes (auto via cron)
- Verification GSC + Bing Webmaster (action manuelle initiale)
- Submit sitemap après chaque batch programmatic SEO
- Audit `scripts/full_audit.py` en CI sur chaque PR

### Brand
- Plus de micro-interactions selon retour utilisateur
- A/B testing sur CTA (TextMorph cycling vs static)
- OG image PNG dynamique par calculateur (Vercel OG ou Satori)

---

## Hors scope explicite

Ce qu'on n'a PAS prévu de faire :
- ❌ App mobile native (web responsive suffit)
- ❌ Connexion bancaire (DSP2/ACPR = trop de friction réglementaire pour le V1)
- ❌ Conseils financiers personnalisés (pas dans nos compétences, on reste informatif)
- ❌ Vente de produits financiers (on reste indépendant)
- ❌ Crypto / trading (hors sujet)
- ❌ Marché entreprise / B2B

---

## Décisions stratégiques à valider

À trancher quand le moment sera opportun :

1. **GA4 ou pas ?** : actuellement on a un analytics tracker custom Supabase. Suffit pour usage perso. GA4 utile si on veut affichage Google Looker Studio ou intégrations tierces.
2. **Stripe pour newsletter premium ?** : si on lance un produit payant (Carnet+, Premium calc). Pas urgent.
3. **Open source du repo ?** : actuellement public. Open source explicite (LICENSE.md) pourrait attirer contributors.
4. **Domaine .com vs .fr** : actuellement on est sur .com. Si on veut rester FR-only à long terme, .fr peut renforcer signal local. Mais .com mieux pour international.

---

## Comment proposer une nouvelle improvement

Ouvre une issue dans `STACK-2026/econono` avec :
- Pourquoi (problème utilisateur ou opportunité SEO/GEO)
- Quoi (description fonctionnelle)
- Estimation impact (★ à ★★★★★)
- Estimation effort (XS, S, M, L, XL)
