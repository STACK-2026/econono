/**
 * Glossaire Econono · 50+ termes finance/budget vulgarisés.
 * Utilisé par : Glossaire.astro (inline), AutoGlossaire.astro (auto-wrap articles), /glossaire (pillar SEO).
 * Clé = terme en minuscules.
 */

export interface GlossaireEntry {
  definition: string;
  example: string;
  internalLink: { href: string; label: string };
  externalSource: { url: string; label: string };
  category: "budget" | "credit" | "epargne" | "fiscalite" | "social" | "bancaire";
  aliases?: string[];
}

export const glossaire: Record<string, GlossaireEntry> = {
  // =========================================================================
  // BUDGET (méthodes et concepts de gestion)
  // =========================================================================
  "reste à vivre": {
    definition: "Ce qu'il te reste chaque mois après avoir payé toutes tes charges fixes (loyer, charges, assurances, transports, crédits). C'est l'argent dont tu disposes vraiment pour manger, te distraire, et épargner.",
    example: "Avec 2 100 € net et 1 320 € de charges fixes, ton reste à vivre est de 780 €. La médiane française est à 1 196 €/mois.",
    internalLink: { href: "/calculateurs/reste-a-vivre/", label: "Calculer ton reste à vivre" },
    externalSource: { url: "https://www.insee.fr/fr/statistiques", label: "INSEE · Niveau de vie" },
    category: "budget",
    aliases: ["raviv", "rav", "reste vivre"],
  },
  "règle 50/30/20": {
    definition: "Méthode de répartition du budget popularisée par Elizabeth Warren : 50% aux besoins (logement, alimentation, transport), 30% aux envies (loisirs, restos), 20% à l'épargne.",
    example: "Avec 2 000 € net : 1 000 € pour les besoins, 600 € pour les envies, 400 € d'épargne. Difficile à appliquer en grande ville où le loyer prend 40%+.",
    internalLink: { href: "/calculateurs/regle-50-30-20/", label: "Simulateur règle 50/30/20" },
    externalSource: { url: "https://en.wikipedia.org/wiki/Elizabeth_Warren", label: "Elizabeth Warren" },
    category: "budget",
    aliases: ["50 30 20", "règle 503020", "warren rule"],
  },
  "méthode kakebo": {
    definition: "Méthode japonaise de gestion de budget par carnet papier : on note chaque dépense et on la classe en 4 catégories (essentiel, plaisir, culture, imprévu). Inventée en 1904 par Hani Motoko.",
    example: "Tu as un cahier dédié, tu remplis chaque soir tes dépenses du jour. Au bout du mois, tu vois où ton argent est passé sans aucune appli.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget mensuel" },
    externalSource: { url: "https://fr.wikipedia.org/wiki/Kakeibo", label: "Kakeibo · Wikipedia" },
    category: "budget",
    aliases: ["kakeibo"],
  },
  "méthode des enveloppes": {
    definition: "Système de gestion budgétaire physique : tu retires en cash le budget de chaque catégorie au début du mois, tu le mets dans une enveloppe nommée. Quand l'enveloppe est vide, c'est fini. Popularisée par Dave Ramsey.",
    example: "Enveloppe 'restos' : 100 €/mois. À la 4e sortie de la semaine 3, tu vois que tu n'as plus que 15 € : tu cuisines à la maison.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget mensuel" },
    externalSource: { url: "https://www.lafinancepourtous.com/", label: "La Finance pour Tous" },
    category: "budget",
    aliases: ["système enveloppes", "ramsey"],
  },
  "dépenses contraintes": {
    definition: "Dépenses incompressibles auxquelles tu ne peux pas échapper sans changer radicalement ta vie : loyer, charges, assurances obligatoires, télécom basique, transport vers le travail, mensualités de crédit.",
    example: "Selon La Finance pour Tous, les dépenses contraintes des Français pèsent en moyenne 1 186 €/mois en 2026, soit plus de 50% du revenu pour la moitié des ménages.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://www.lafinancepourtous.com/2026/03/16/budget-les-depenses-contraintes-des-francais-continuent-daugmenter-en-2026/", label: "La Finance pour Tous" },
    category: "budget",
    aliases: ["charges contraintes", "depenses incompressibles"],
  },
  "budget zéro": {
    definition: "Méthode de gestion où chaque euro de revenu est attribué à une catégorie avant d'arriver sur ton compte. À la fin du processus, total revenu - total dépenses + épargne = 0. Inventée par Jesse Mecham (créateur de YNAB).",
    example: "2 000 € de revenu : 800 € loyer, 350 € courses, 100 € transport, 200 € loisirs, 350 € épargne, 200 € imprévus. Total = 2 000. Pas un euro 'libre'.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://www.youneedabudget.com/", label: "YNAB · You Need A Budget" },
    category: "budget",
    aliases: ["zero based budget", "ynab method"],
  },
  "coût de la vie": {
    definition: "Montant moyen nécessaire pour vivre dans une zone géographique donnée. Varie significativement entre Paris, grandes villes et province (jusqu'à +30% à Paris vs province pour les mêmes biens).",
    example: "Le coût de la vie à Paris est en moyenne 28% supérieur à Toulouse selon l'INSEE 2024 : surtout porté par le logement (+50%) et la restauration (+15%).",
    internalLink: { href: "/calculateurs/budget-courses/", label: "Budget courses par foyer" },
    externalSource: { url: "https://www.insee.fr/fr/statistiques", label: "INSEE · Indices prix" },
    category: "budget",
  },

  // =========================================================================
  // CRÉDIT
  // =========================================================================
  "taux d'endettement": {
    definition: "La part de tes revenus qui part dans les mensualités de crédit. Formule : (mensualités) ÷ (revenus nets) × 100. Plafonné à 35% par le HCSF depuis janvier 2022.",
    example: "Si tu gagnes 2 500 € net et que tes mensualités de crédit font 700 €, ton taux d'endettement est de 28%. En dessous du plafond légal de 35%.",
    internalLink: { href: "/calculateurs/taux-endettement/", label: "Calculer ton taux d'endettement" },
    externalSource: { url: "https://www.banque-france.fr/", label: "Banque de France · HCSF" },
    category: "credit",
    aliases: ["endettement", "ratio endettement"],
  },
  "hcsf": {
    definition: "Haut Conseil de Stabilité Financière. Autorité française qui fixe les règles d'octroi des crédits immobiliers. Depuis janvier 2022 : taux d'endettement max 35%, durée max 25 ans (27 pour neuf).",
    example: "Si tes mensualités représentent 36% de tes revenus, le HCSF interdit à ta banque de t'accorder un nouveau prêt (sauf 20% de dérogations).",
    internalLink: { href: "/calculateurs/taux-endettement/", label: "Calcul taux d'endettement" },
    externalSource: { url: "https://www.hcsf.gouv.fr/", label: "HCSF officiel" },
    category: "credit",
    aliases: ["haut conseil de stabilité financière"],
  },
  "taeg": {
    definition: "Taux Annuel Effectif Global. Inclut le taux d'intérêt nominal + les frais de dossier + l'assurance emprunteur + les frais de garantie. Le seul indicateur officiel pour comparer 2 offres de crédit.",
    example: "Si une banque te propose 3,4% nominal mais 4,1% TAEG, c'est ce dernier qui compte vraiment. La différence : 0,7 point sur 200 000 € sur 20 ans = ~17 000 € de coût total.",
    internalLink: { href: "/calculateurs/cout-credit/", label: "Coût total d'un crédit" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F2456", label: "Service-Public · TAEG" },
    category: "credit",
    aliases: ["taux annuel effectif global"],
  },
  "assurance emprunteur": {
    definition: "Assurance obligatoire en pratique pour tout crédit immobilier. Couvre décès, invalidité, perte d'emploi. Représente 30 à 50% du coût total d'un crédit immo. Loi Lemoine 2022 : changeable à tout moment.",
    example: "Sur un crédit de 200 000 € sur 20 ans, l'assurance emprunteur coûte 8 000 à 18 000 € selon âge et état de santé. Délégation externe = économie 5 000-15 000 €.",
    internalLink: { href: "/calculateurs/cout-credit/", label: "Coût total d'un crédit" },
    externalSource: { url: "https://www.economie.gouv.fr/cedef/loi-lemoine-assurance-emprunteur", label: "Loi Lemoine 2022" },
    category: "credit",
    aliases: ["assurance crédit"],
  },
  "rachat de crédit": {
    definition: "Opération qui consiste à regrouper plusieurs crédits en un seul, avec une nouvelle durée et un nouveau taux. Avantage : mensualité plus basse. Inconvénient : coût total qui explose.",
    example: "3 crédits cumulés à 800 €/mois sur 5 ans → rachat sur 12 ans à 450 €/mois. Mensualité divisée par 1,8, mais coût total +35%.",
    internalLink: { href: "/calculateurs/taux-endettement/", label: "Calcul taux d'endettement" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F1855", label: "Service-Public · rachat" },
    category: "credit",
    aliases: ["regroupement de crédit"],
  },
  "crédit revolving": {
    definition: "Crédit renouvelable à taux d'intérêt très élevé (souvent 12-21%). Réserve d'argent disponible que tu peux utiliser et rembourser à ta guise. Le pire crédit possible pour ton budget.",
    example: "5 000 € en revolving à 18% remboursé sur 5 ans : tu paieras ~7 700 € au total, soit 2 700 € d'intérêts. Pour comparer, un crédit conso classique : ~5 600 €.",
    internalLink: { href: "/guides/sortir-decouvert-bancaire/", label: "Sortir des crédits coûteux" },
    externalSource: { url: "https://www.lafinancepourtous.com/decryptages/banque-et-credit/credits/credit-renouvelable/", label: "La Finance pour Tous" },
    category: "credit",
    aliases: ["crédit renouvelable", "revolving"],
  },
  "loi lemoine": {
    definition: "Loi de février 2022 qui permet de changer son assurance emprunteur à tout moment, sans justification, sans frais, et sans questionnaire de santé pour les crédits inférieurs à 200 000 €.",
    example: "Tu as souscrit un crédit immo en 2018 avec l'assurance groupe à 0,40%. Avec Lemoine, tu passes à une assurance externe à 0,18% : économie 12 000 € sur 15 ans restants.",
    internalLink: { href: "/calculateurs/cout-credit/", label: "Coût total d'un crédit" },
    externalSource: { url: "https://www.economie.gouv.fr/cedef/loi-lemoine-assurance-emprunteur", label: "Loi Lemoine officiel" },
    category: "credit",
    aliases: ["lemoine"],
  },
  "amortissement": {
    definition: "Modalité de remboursement d'un crédit. Le plus courant en France : annuité constante (mensualités égales avec une part capital qui augmente et une part intérêts qui diminue avec le temps).",
    example: "Crédit de 200 000 € à 3,5% sur 20 ans : la 1ère mensualité contient ~580 € d'intérêts et ~580 € de capital. La 240e contient ~3 € d'intérêts et ~1 157 € de capital.",
    internalLink: { href: "/calculateurs/cout-credit/", label: "Calculateur coût crédit" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F1875", label: "Service-Public · prêt immo" },
    category: "credit",
  },
  "surendettement": {
    definition: "Situation où tu ne peux plus faire face à l'ensemble de tes dettes (crédits + factures non réglées + impôts). Possibilité de saisir la Banque de France pour ouvrir une procédure de surendettement (effacement partiel possible).",
    example: "Si la somme des mensualités + impayés + retards dépasse durablement tes capacités de remboursement, dépose un dossier à la Banque de France (gratuit, anonyme).",
    internalLink: { href: "/guides/sortir-decouvert-bancaire/", label: "Plan sortir du découvert" },
    externalSource: { url: "https://www.banque-france.fr/fr/particuliers/surendettement", label: "Banque de France · surendettement" },
    category: "credit",
  },

  // =========================================================================
  // ÉPARGNE
  // =========================================================================
  "livret a": {
    definition: "Livret d'épargne réglementé français, défiscalisé, plafonné à 22 950 €. Taux fixé par l'État, révisé deux fois par an. À 2,4% en 2026.",
    example: "100 € versés sur le livret A en début d'année, sans aucun retrait, te rapportent 2,40 € d'intérêts à la fin de l'année. Disponible immédiatement, sans risque.",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F2365", label: "Service-Public.fr" },
    category: "epargne",
  },
  "lep": {
    definition: "Livret d'Épargne Populaire. Variante du livret A réservée aux foyers à revenus modestes (sous un plafond fiscal). Taux préférentiel : 3,5% en 2026. Plafond 10 000 €.",
    example: "Si tu gagnes moins de ~22 000 €/an (personne seule), tu peux ouvrir un LEP. Sur 10 000 € à 3,5%, ça fait 350 €/an défiscalisés. Un quart des éligibles n'y souscrivent pas.",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F2367", label: "Service-Public.fr" },
    category: "epargne",
    aliases: ["livret épargne populaire"],
  },
  "ldds": {
    definition: "Livret de Développement Durable et Solidaire. Livret réglementé défiscalisé, taux identique au livret A (2,4% en 2026), plafond 12 000 €. Cumulable avec le livret A.",
    example: "Tu as déjà ton livret A plein (22 950 €). Tu peux ouvrir un LDDS et y mettre 12 000 € de plus, toujours à 2,4% et toujours défiscalisés.",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F2368", label: "Service-Public · LDDS" },
    category: "epargne",
    aliases: ["livret développement durable"],
  },
  "pel": {
    definition: "Plan Épargne Logement. Compte d'épargne bloqué 4 ans minimum, qui ouvre droit à un prêt immo à taux préférentiel. PEL ouvert en 2026 : taux 1,75%, plafond 61 200 €.",
    example: "Tu ouvres un PEL en 2026 à 1,75%. Après 4 ans, tu peux demander un prêt PEL jusqu'à 92 000 € à un taux fixé contractuellement à l'ouverture.",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F2378", label: "Service-Public · PEL" },
    category: "epargne",
    aliases: ["plan épargne logement"],
  },
  "intérêts composés": {
    definition: "Mécanisme par lequel les intérêts d'une épargne génèrent eux-mêmes des intérêts l'année suivante. Plus la durée est longue, plus l'effet est puissant. Différence entre épargner à 25 ans et à 45 ans.",
    example: "100 €/mois pendant 30 ans à 4% = 69 000 € (dont 33 000 € d'intérêts cumulés). Sur 10 ans seulement, ce serait 14 700 € (dont 2 700 € d'intérêts).",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur épargne avec intérêts composés" },
    externalSource: { url: "https://www.lafinancepourtous.com/decryptages/marches-financiers/produits-financiers/livrets/", label: "La Finance pour Tous" },
    category: "epargne",
  },
  "assurance vie": {
    definition: "Enveloppe d'épargne fiscalement avantageuse après 8 ans de détention. Mix possible entre fonds euros (sécurisés, ~2,5-3,5% en 2026) et unités de compte (plus risquées, plus rentables long terme).",
    example: "Tu ouvres une assurance vie à 25 ans avec 100 €/mois. Après 30 ans, tu peux retirer jusqu'à 4 600 €/an d'intérêts sans impôt (9 200 € pour un couple).",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F18648", label: "Service-Public · assurance vie" },
    category: "epargne",
  },
  "pea": {
    definition: "Plan Épargne en Actions. Enveloppe permettant d'investir en actions européennes avec fiscalité avantageuse après 5 ans (17,2% au lieu de 30% flat tax). Plafond 150 000 €.",
    example: "Tu mets 100 €/mois en ETF Europe sur PEA pendant 20 ans à ~7% en moyenne historique : ~52 000 €. Tu retires après 5 ans : 17,2% de prélèvements sociaux uniquement.",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F22361", label: "Service-Public · PEA" },
    category: "epargne",
    aliases: ["plan épargne actions"],
  },
  "per": {
    definition: "Plan Épargne Retraite. Produit d'épargne long terme avec déductions fiscales sur les versements (réduction d'impôt). Sortie possible en capital ou en rente à la retraite.",
    example: "Tu verses 2 000 €/an sur PER avec une TMI à 30% : tu réduis ton impôt de 600 €/an. À 65 ans, tu récupères le capital + plus-values.",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F34982", label: "Service-Public · PER" },
    category: "epargne",
    aliases: ["plan épargne retraite"],
  },
  "épargne de précaution": {
    definition: "Réserve d'argent disponible immédiatement pour absorber les imprévus (panne voiture, dentiste, perte d'emploi). Recommandé : 3 à 6 mois de charges fixes, sur livret A ou LEP.",
    example: "Tes charges fixes : 1 500 €/mois. Épargne précaution cible : 4 500 € à 9 000 €. À placer en livret A pour disponibilité immédiate.",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://www.lafinancepourtous.com/", label: "La Finance pour Tous" },
    category: "epargne",
    aliases: ["réserve d'urgence", "epargne urgence"],
  },
  "dca": {
    definition: "Dollar Cost Averaging. Méthode d'investissement consistant à placer la même somme à intervalles réguliers (mensuel) plutôt qu'en une fois. Lisse le risque de timing.",
    example: "Au lieu d'investir 12 000 € d'un coup en bourse en janvier, tu investis 1 000 €/mois pendant 12 mois. Si le marché baisse, tu achètes plus d'unités à bas prix.",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur d'épargne" },
    externalSource: { url: "https://en.wikipedia.org/wiki/Dollar_cost_averaging", label: "Wikipedia · DCA" },
    category: "epargne",
    aliases: ["dollar cost averaging", "investissement programmé"],
  },

  // =========================================================================
  // FISCALITÉ
  // =========================================================================
  "rfr": {
    definition: "Revenu Fiscal de Référence. Montant calculé par l'administration fiscale à partir de tes revenus annuels imposables. Sert de base pour l'éligibilité à de nombreuses aides (LEP, APL, exonérations).",
    example: "Ton RFR pour 2024 est de 22 000 € : tu es éligible au LEP (plafond 22 419 € pour personne seule). Tu retrouves ton RFR sur ton avis d'imposition.",
    internalLink: { href: "/glossaire/#lep", label: "Le LEP" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F32027", label: "Service-Public · RFR" },
    category: "fiscalite",
    aliases: ["revenu fiscal de référence"],
  },
  "prélèvement à la source": {
    definition: "Système d'imposition en place depuis 2019 : ton impôt sur le revenu est prélevé directement sur ton salaire chaque mois par ton employeur, sur la base d'un taux personnalisé.",
    example: "Tu gagnes 2 000 € net imposable et ton taux PAS est de 8% : 160 € sont prélevés directement par ton employeur. Tu touches 1 840 € sur ton compte.",
    internalLink: { href: "/calculateurs/salaire-net/", label: "Convertisseur brut/net" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F34009", label: "Service-Public · PAS" },
    category: "fiscalite",
    aliases: ["pas", "prelevement source"],
  },
  "quotient familial": {
    definition: "Mécanisme fiscal qui divise tes revenus par un nombre de parts dépendant de ta situation (célibataire, marié, enfants). Plus tu as de parts, plus tu payes peu d'impôt.",
    example: "Couple marié 2 enfants = 3 parts (2 + 0,5 + 0,5). Revenu fiscal 60 000 € → revenu par part = 20 000 €, soumis à un barème plus avantageux.",
    internalLink: { href: "/calculateurs/budget-couple/", label: "Calculateur budget couple" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F2702", label: "Service-Public · quotient familial" },
    category: "fiscalite",
  },
  "tmi": {
    definition: "Tranche Marginale d'Imposition. Le taux d'impôt qui s'applique à la dernière tranche de tes revenus (la plus haute). En 2026 : 0%, 11%, 30%, 41%, 45%.",
    example: "Tu gagnes 35 000 € imposable. Tu es imposé à 0% jusqu'à 11 294 €, à 11% entre 11 294 et 28 797 €, à 30% au-delà. Ta TMI est 30%.",
    internalLink: { href: "/calculateurs/salaire-net/", label: "Convertisseur brut/net" },
    externalSource: { url: "https://www.economie.gouv.fr/", label: "Ministère de l'Économie" },
    category: "fiscalite",
    aliases: ["tranche marginale imposition"],
  },
  "abattement": {
    definition: "Réduction forfaitaire ou en pourcentage appliquée à tes revenus avant calcul de l'impôt. L'abattement de 10% sur les salaires (au lieu de la déduction des frais réels) est le plus connu.",
    example: "Tu gagnes 30 000 € de salaire imposable. L'abattement automatique de 10% (3 000 €) est appliqué : tu es imposé sur 27 000 €.",
    internalLink: { href: "/calculateurs/salaire-net/", label: "Convertisseur brut/net" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F1989", label: "Service-Public · abattements" },
    category: "fiscalite",
  },
  "csg crds": {
    definition: "Contribution Sociale Généralisée + Contribution au Remboursement de la Dette Sociale. Cotisations sociales prélevées sur tous les revenus français : 9,7% au total sur les salaires, dont 6,8% déductibles de l'IR.",
    example: "Sur 1 000 € de brut, ~97 € partent en CSG/CRDS. C'est inclus dans le calcul brut → net.",
    internalLink: { href: "/calculateurs/salaire-net/", label: "Convertisseur brut/net" },
    externalSource: { url: "https://www.urssaf.fr/", label: "URSSAF" },
    category: "fiscalite",
    aliases: ["csg", "crds", "contribution sociale"],
  },
  "niches fiscales": {
    definition: "Dispositifs légaux qui permettent de réduire son impôt en investissant ou en consommant dans certains secteurs (immobilier locatif Pinel, dons associations, emploi domicile, FCPI/FIP).",
    example: "Tu donnes 200 € à une association reconnue d'utilité publique : réduction d'impôt de 66% = 132 € en moins sur ton IR.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://www.economie.gouv.fr/particuliers/reductions-credits-impot", label: "Bercy · réductions d'impôt" },
    category: "fiscalite",
    aliases: ["niche fiscale", "défiscalisation"],
  },
  "plus value": {
    definition: "Gain réalisé lors de la revente d'un bien (immobilier, actions) à un prix supérieur à son prix d'achat. Soumis à l'impôt selon le bien et la durée de détention.",
    example: "Tu achètes des actions 5 000 €, tu les revends 8 000 € : plus-value de 3 000 €. Sur PEA après 5 ans : 17,2% de prélèvements sociaux uniquement (515 €). Sans PEA : 30% flat tax (900 €).",
    internalLink: { href: "/glossaire/#pea", label: "Le PEA" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/N287", label: "Service-Public · plus-values" },
    category: "fiscalite",
    aliases: ["plus-value", "moins value"],
  },

  // =========================================================================
  // SOCIAL (aides, salaires, cotisations)
  // =========================================================================
  "smic": {
    definition: "Salaire Minimum Interprofessionnel de Croissance. Plancher légal en dessous duquel un employeur ne peut pas rémunérer. Brut mensuel 2026 : 1 823,03 € (35h). Net mensuel : ~1 443 €.",
    example: "Au SMIC à temps plein, tu touches environ 1 443 € net par mois. Sur l'année : ~17 300 € net.",
    internalLink: { href: "/calculateurs/salaire-net/", label: "Convertisseur brut/net" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F2300", label: "Service-Public · SMIC" },
    category: "social",
  },
  "prime d'activité": {
    definition: "Aide mensuelle versée par la CAF pour compléter les revenus des travailleurs modestes (salariés, indépendants, alternants). Demande à faire (pas automatique). Calcul selon revenu + composition du foyer.",
    example: "Tu travailles au SMIC célibataire sans enfant : prime d'activité ~270 €/mois. Couple, 2 enfants, 1 SMIC + 1 mi-temps : ~470 €/mois.",
    internalLink: { href: "/guides/sortir-decouvert-bancaire/", label: "Activer toutes ses aides" },
    externalSource: { url: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-quotidienne/la-prime-d-activite", label: "CAF · prime d'activité" },
    category: "social",
    aliases: ["prime activité"],
  },
  "rsa": {
    definition: "Revenu de Solidarité Active. Allocation versée par la CAF aux personnes sans ou avec très peu de revenus. Montant en 2026 : ~635 €/mois personne seule, ~952 € couple, +254 €/enfant.",
    example: "Au chômage en fin de droits, célibataire sans enfant : RSA ~635 €/mois. Cumulable avec un emploi à très bas salaire (déduction progressive).",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/N19775", label: "Service-Public · RSA" },
    category: "social",
    aliases: ["revenu de solidarité active"],
  },
  "apl": {
    definition: "Aide Personnalisée au Logement. Aide CAF pour locataires (et certains accédants à la propriété). Calcul selon loyer + revenus + zone géographique. 100 à 300 €/mois pour la majorité des étudiants et bas revenus.",
    example: "Étudiant à Lyon en colocation, loyer 380 € : APL ~150-200 €/mois selon revenus parents. À Paris en studio CROUS 300 € : APL ~100-150 €/mois.",
    internalLink: { href: "/calculateurs/budget-etudiant/", label: "Calculateur budget étudiant" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F12006", label: "Service-Public · APL" },
    category: "social",
    aliases: ["aide personnalisée logement"],
  },
  "als": {
    definition: "Allocation de Logement Sociale. Variante de l'APL pour les locataires non éligibles à l'APL (logement non conventionné). Calcul similaire mais barèmes différents.",
    example: "Tu loues un studio dans le privé non conventionné : tu auras de l'ALS, pas de l'APL. Montants généralement proches de l'APL.",
    internalLink: { href: "/glossaire/#apl", label: "L'APL" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F12007", label: "Service-Public · ALS" },
    category: "social",
    aliases: ["allocation logement sociale"],
  },
  "aah": {
    definition: "Allocation Adulte Handicapé. Aide mensuelle versée par la CAF aux personnes en situation de handicap (taux d'incapacité ≥ 50%). Montant maximum 2026 : ~1 016 €/mois.",
    example: "Avec un handicap reconnu MDPH à 80%, sans revenu : AAH ~1 016 €/mois. Cumulable partiellement avec un emploi.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F12242", label: "Service-Public · AAH" },
    category: "social",
    aliases: ["allocation adulte handicapé"],
  },
  "aspa": {
    definition: "Allocation de Solidarité aux Personnes Âgées (ex-minimum vieillesse). Garantit un revenu minimal aux retraités à faibles revenus : ~1 034 €/mois personne seule, ~1 605 € couple en 2026.",
    example: "Retraite de base à 600 €/mois, célibataire : tu peux demander l'ASPA pour atteindre 1 034 €/mois. À demander à la CARSAT.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F16871", label: "Service-Public · ASPA" },
    category: "social",
    aliases: ["minimum vieillesse"],
  },
  "are": {
    definition: "Allocation de Retour à l'Emploi (chômage). Versée par France Travail (ex-Pôle emploi) pendant une durée variable selon la durée de cotisation. Montant : ~57% du salaire brut antérieur en moyenne.",
    example: "Salaire 2 500 € net (3 250 € brut), tu perds ton emploi après 24 mois cotisés : ARE ~1 500 €/mois pendant 18 mois max (sous 53 ans).",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://www.francetravail.fr/", label: "France Travail · ARE" },
    category: "social",
    aliases: ["chomage", "allocation retour emploi"],
  },
  "paje": {
    definition: "Prestation d'Accueil du Jeune Enfant. Ensemble d'aides CAF pour les parents : prime à la naissance ~1 010 €, allocation de base ~190 €/mois jusqu'à 3 ans, complément libre choix mode de garde (CMG).",
    example: "Tu attends un bébé : tu touches la prime à la naissance au 7e mois (~1 010 €). Sous conditions de ressources : allocation de base 190 €/mois pendant 3 ans.",
    internalLink: { href: "/calculateurs/budget-bebe/", label: "Calculateur budget bébé" },
    externalSource: { url: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/petite-enfance", label: "CAF · PAJE" },
    category: "social",
    aliases: ["prestation accueil jeune enfant"],
  },
  "cmg": {
    definition: "Complément libre Choix de Mode de Garde. Aide CAF pour financer la garde d'un enfant de moins de 6 ans (assistante maternelle, garde à domicile). 200 à 700 €/mois selon revenus + âge enfant.",
    example: "Couple, 1 enfant 2 ans, revenu fiscal 35 000 € : CMG ~450 €/mois pour une assistante maternelle agréée à 600 €/mois (reste à charge 150 €).",
    internalLink: { href: "/calculateurs/budget-bebe/", label: "Calculateur budget bébé" },
    externalSource: { url: "https://monenfant.fr/", label: "monenfant.fr · CMG" },
    category: "social",
    aliases: ["complément mode garde"],
  },
  "css": {
    definition: "Complémentaire Santé Solidaire (ex-CMU-C et ACS). Aide pour bénéficier d'une mutuelle gratuite ou à très faible coût. Sous conditions de revenus : ~< 9 720 €/an personne seule.",
    example: "Au RSA célibataire, tu as droit à la CSS gratuite : tu n'as plus à payer ta mutuelle (économie ~50 €/mois). Demande à ta CPAM.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://www.complementaire-sante-solidaire.gouv.fr/", label: "CSS officiel" },
    category: "social",
    aliases: ["complémentaire santé solidaire", "cmu c"],
  },
  "chèque énergie": {
    definition: "Aide annuelle de l'État pour payer factures d'énergie (électricité, gaz, fioul) ou travaux de rénovation. Versement automatique en avril selon revenu fiscal. 48 à 277 €/an selon revenus + composition foyer.",
    example: "RFR 12 000 €, célibataire : chèque énergie ~194 €/an. Reçu fin avril, utilisable jusqu'à fin mars de l'année suivante.",
    internalLink: { href: "/calculateurs/budget-mensuel/", label: "Calculateur budget" },
    externalSource: { url: "https://chequeenergie.gouv.fr/", label: "Chèque énergie officiel" },
    category: "social",
    aliases: ["cheque energie"],
  },

  // =========================================================================
  // BANCAIRE
  // =========================================================================
  "agios": {
    definition: "Intérêts facturés par la banque quand ton compte est en découvert. Calculés au prorata du temps + montant en négatif. Plafonnés légalement mais souvent élevés (15-20% annuel).",
    example: "Découvert de 200 € pendant 10 jours à 17% annuel : 200 × 17% × 10/365 = 0,93 € d'agios. Sur l'année cumulée, ça peut faire 50-150 €/an.",
    internalLink: { href: "/guides/sortir-decouvert-bancaire/", label: "Sortir du découvert" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F31794", label: "Service-Public · agios" },
    category: "bancaire",
    aliases: ["agio", "intérêts débiteurs"],
  },
  "découvert autorisé": {
    definition: "Montant maximum en négatif que la banque accepte sur ton compte sans déclencher de frais d'incident. Négocié avec ton conseiller. Souvent 200 à 500 € selon profil.",
    example: "Découvert autorisé 300 € : tu peux avoir un solde -300 € sans frais d'incident, mais avec agios. À -301 €, c'est un découvert non autorisé : commission d'intervention 8 €.",
    internalLink: { href: "/guides/sortir-decouvert-bancaire/", label: "Sortir du découvert" },
    externalSource: { url: "https://www.banque-france.fr/", label: "Banque de France" },
    category: "bancaire",
    aliases: ["facilité de caisse"],
  },
  "commission d'intervention": {
    definition: "Frais facturés par la banque à chaque opération qui aggrave un découvert non autorisé. Plafonnée légalement à 8 € par opération et 80 € par mois (article L312-1-3 du Code monétaire).",
    example: "Tu es à -301 € (au-delà de ton découvert autorisé). 4 prélèvements passent : 4 × 8 € = 32 € de commissions. Plafond mensuel 80 €.",
    internalLink: { href: "/guides/sortir-decouvert-bancaire/", label: "Sortir du découvert" },
    externalSource: { url: "https://www.legifrance.gouv.fr/", label: "Code monétaire" },
    category: "bancaire",
    aliases: ["frais d'incident"],
  },
  "frais bancaires": {
    definition: "Ensemble des frais facturés par ta banque : tenue de compte, carte bancaire, virements, retraits, agios, commissions d'intervention. Comparable d'une banque à l'autre via la 'plaquette tarifaire'.",
    example: "Banque traditionnelle : 80 à 200 €/an de frais. Banque en ligne (Boursorama, Fortuneo) : 0 à 30 €/an. Économie potentielle 100-170 €/an.",
    internalLink: { href: "/comparatifs/", label: "Comparatif banques" },
    externalSource: { url: "https://www.lesclesdelabanque.com/", label: "Les Clés de la Banque" },
    category: "bancaire",
  },
  "iban": {
    definition: "International Bank Account Number. Identifiant unique d'un compte bancaire en Europe, commençant par 2 lettres pays + 2 chiffres clé + numéro de compte. 27 caractères en France (FR76...).",
    example: "FR76 1234 5678 9012 3456 7890 123 = ton IBAN. Tu le donnes pour recevoir un virement (salaire, remboursement). Pas pour payer (utilise carte ou prélèvement SEPA).",
    internalLink: { href: "/glossaire/#prelevement-sepa", label: "Prélèvement SEPA" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F31898", label: "Service-Public · IBAN" },
    category: "bancaire",
  },
  "prélèvement sepa": {
    definition: "Système européen de prélèvement automatique. Tu autorises un créancier (EDF, Free, ton bailleur) à prélever sur ton compte un montant à dates régulières. Annulable à tout moment.",
    example: "Tu signes un mandat SEPA avec EDF : ils prélèvent ~80 €/mois automatiquement. Tu peux à tout moment résilier le mandat ou contester un prélèvement (8 semaines).",
    internalLink: { href: "/calculateurs/comparateur-abonnements/", label: "Comparateur d'abonnements" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F1714", label: "Service-Public · SEPA" },
    category: "bancaire",
    aliases: ["sepa", "prelevement"],
  },
  "virement instantané": {
    definition: "Virement bancaire reçu en moins de 10 secondes (vs 1-3 jours pour un virement classique). Disponible 24/7. Souvent gratuit dans les banques en ligne, payant (~1 €) en banque traditionnelle.",
    example: "Tu as oublié de payer ton loyer le 5 du mois, ton bailleur menace le bail : tu fais un virement instantané, il reçoit dans la minute.",
    internalLink: { href: "/comparatifs/", label: "Comparatif banques" },
    externalSource: { url: "https://www.banque-france.fr/", label: "Banque de France" },
    category: "bancaire",
    aliases: ["instantané", "vir instant"],
  },
  "interdiction bancaire": {
    definition: "Sanction de la Banque de France suite à un chèque sans provision non régularisé. Empêche d'émettre des chèques pendant 5 ans. Inscription au FCC (Fichier Central des Chèques).",
    example: "Tu émets un chèque de 200 € sans provision, tu ne régularises pas dans le mois : interdiction bancaire 5 ans. Possibilité d'avoir un compte mais pas de chéquier ni de carte (sauf carte à autorisation systématique).",
    internalLink: { href: "/guides/sortir-decouvert-bancaire/", label: "Plan sortir du découvert" },
    externalSource: { url: "https://www.banque-france.fr/", label: "Banque de France · FCC" },
    category: "bancaire",
    aliases: ["fcc", "fichage banque"],
  },
  "ficp": {
    definition: "Fichier national des Incidents de remboursement des Crédits aux Particuliers. Géré par la Banque de France. Te fiche en cas de défaut de paiement sur un crédit (>60 jours d'impayé). Inscription 5 ans max.",
    example: "Tu as 3 mois d'impayés sur ton crédit auto : la banque déclare l'incident à la Banque de France, tu es fiché FICP. Pendant 5 ans, plus aucune banque ne t'accordera de crédit.",
    internalLink: { href: "/glossaire/#surendettement", label: "Le surendettement" },
    externalSource: { url: "https://www.banque-france.fr/fr/particuliers/fichiers-incidents-bancaires", label: "Banque de France · FICP" },
    category: "bancaire",
    aliases: ["fichier incidents crédits"],
  },
  "carte à débit différé": {
    definition: "Carte bancaire qui regroupe tes paiements du mois en un seul prélèvement à date fixe (ex: le 30). Permet de fluidifier le budget et profiter d'une trésorerie temporaire.",
    example: "Tu paies 800 € en achats du 1er au 30 avril avec ta CB à débit différé : prélèvement de 800 € le 30 avril (ou 1er mai selon banque). Pas de prélèvements quotidiens.",
    internalLink: { href: "/comparatifs/", label: "Comparatif banques" },
    externalSource: { url: "https://www.lesclesdelabanque.com/", label: "Les Clés de la Banque" },
    category: "bancaire",
    aliases: ["débit différé"],
  },
};

export const glossaireAliases: Record<string, string> = Object.entries(glossaire).reduce((acc, [key, entry]) => {
  acc[key] = key;
  if (entry.aliases) {
    entry.aliases.forEach((alias) => {
      acc[alias.toLowerCase()] = key;
    });
  }
  return acc;
}, {} as Record<string, string>);

export const glossaireCategories: Array<{ id: GlossaireEntry["category"]; label: string; emoji: string; description: string }> = [
  { id: "budget", label: "Budget", emoji: "📒", description: "Tout ce qui touche à la gestion mensuelle : reste à vivre, méthodes de répartition, dépenses contraintes." },
  { id: "credit", label: "Crédit & endettement", emoji: "🏦", description: "Les notions à connaître quand on emprunte ou qu'on cherche à éviter le découvert : taux, plafonds, formules officielles." },
  { id: "epargne", label: "Épargne", emoji: "🪙", description: "Les produits d'épargne réglementés français et les mécanismes utiles : livrets, intérêts composés, plafonds." },
  { id: "fiscalite", label: "Fiscalité", emoji: "📑", description: "Les notions fiscales utiles pour comprendre ta feuille de paie, ta déclaration et tes droits." },
  { id: "social", label: "Social", emoji: "🤝", description: "Les aides sociales et minima auxquels tu as droit : SMIC, prime d'activité, RSA, APL, AAH, ASPA, PAJE." },
  { id: "bancaire", label: "Bancaire", emoji: "💳", description: "Les pratiques bancaires : agios, frais, conventions, droits du consommateur, IBAN, fichage." },
];
