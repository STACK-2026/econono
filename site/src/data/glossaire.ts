/**
 * Glossaire Econono · termes finance/budget vulgarisés.
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
  "reste à vivre": {
    definition: "Ce qu'il te reste chaque mois après avoir payé toutes tes charges fixes (loyer, charges, assurances, transports, crédits). C'est l'argent dont tu disposes vraiment pour manger, te distraire, et épargner.",
    example: "Avec 2 100 € net et 1 320 € de charges fixes, ton reste à vivre est de 780 €. La médiane française est à 1 196 €/mois.",
    internalLink: { href: "/calculateurs/reste-a-vivre/", label: "Calculer ton reste à vivre" },
    externalSource: { url: "https://www.insee.fr/fr/statistiques", label: "INSEE · Niveau de vie" },
    category: "budget",
    aliases: ["raviv", "rav"],
  },
  "taux d'endettement": {
    definition: "La part de tes revenus mensuels qui part dans les mensualités de crédit. Formule officielle : (mensualités) ÷ (revenus nets) × 100. Plafonné à 35% par le HCSF depuis janvier 2022.",
    example: "Si tu gagnes 2 500 € net et que tes mensualités de crédit font 700 €, ton taux d'endettement est de 28%. En dessous du plafond légal de 35%.",
    internalLink: { href: "/calculateurs/taux-endettement/", label: "Calculer ton taux d'endettement" },
    externalSource: { url: "https://www.banque-france.fr/", label: "Banque de France · HCSF" },
    category: "credit",
    aliases: ["endettement"],
  },
  "règle 50/30/20": {
    definition: "Méthode de répartition du budget : 50% des revenus aux besoins (logement, courses, transport), 30% aux envies (loisirs, restos), 20% à l'épargne. Popularisée par la sénatrice américaine Elizabeth Warren.",
    example: "Avec 2 000 € net : 1 000 € pour les besoins, 600 € pour les envies, 400 € d'épargne. Difficile à appliquer en grande ville française où le loyer prend déjà 40%+.",
    internalLink: { href: "/calculateurs/regle-50-30-20/", label: "Simulateur règle 50/30/20" },
    externalSource: { url: "https://en.wikipedia.org/wiki/Elizabeth_Warren", label: "Elizabeth Warren" },
    category: "budget",
    aliases: ["50 30 20", "règle 503020"],
  },
  "livret a": {
    definition: "Livret d'épargne réglementé français, défiscalisé, plafonné à 22 950 €. Le taux est fixé par l'État, révisé deux fois par an. À 2,4% en 2026.",
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
  "smic": {
    definition: "Salaire Minimum Interprofessionnel de Croissance. Salaire horaire en dessous duquel un employeur ne peut pas rémunérer un salarié. Brut mensuel 2026 : 1 823,03 € (35h). Net mensuel : ~1 443 €.",
    example: "Au SMIC à temps plein, tu touches environ 1 443 € net par mois. Sur l'année : ~17 300 € net.",
    internalLink: { href: "/calculateurs/salaire-net/", label: "Convertisseur brut/net" },
    externalSource: { url: "https://www.service-public.fr/particuliers/vosdroits/F2300", label: "Service-Public.fr · SMIC" },
    category: "social",
  },
  "hcsf": {
    definition: "Haut Conseil de Stabilité Financière. Autorité française qui fixe les règles d'octroi des crédits immobiliers. Depuis janvier 2022 : taux d'endettement max 35%, durée max 25 ans (27 pour neuf).",
    example: "Si tes mensualités de crédit représentent 36% de tes revenus, le HCSF interdit à ta banque de t'accorder un nouveau prêt (sauf 20% de dérogations).",
    internalLink: { href: "/calculateurs/taux-endettement/", label: "Calcul taux d'endettement" },
    externalSource: { url: "https://www.banque-france.fr/", label: "Banque de France" },
    category: "credit",
    aliases: ["haut conseil de stabilité financière"],
  },
  "intérêts composés": {
    definition: "Mécanisme par lequel les intérêts d'une épargne génèrent eux-mêmes des intérêts l'année suivante. Plus la durée est longue, plus l'effet est puissant. C'est ce qui fait la différence entre épargner à 25 ans ou à 45 ans.",
    example: "100 €/mois pendant 30 ans à 4% = 69 000 € (dont 33 000 € d'intérêts cumulés). Sur 10 ans seulement, ce serait 14 700 € (dont 2 700 € d'intérêts).",
    internalLink: { href: "/calculateurs/epargne/", label: "Simulateur épargne avec intérêts composés" },
    externalSource: { url: "https://www.lafinancepourtous.com/decryptages/marches-financiers/produits-financiers/livrets/", label: "La Finance pour Tous" },
    category: "epargne",
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

export const glossaireCategories: Array<{ id: GlossaireEntry["category"]; label: string; emoji: string }> = [
  { id: "budget", label: "Budget", emoji: "📒" },
  { id: "credit", label: "Crédit & endettement", emoji: "🏦" },
  { id: "epargne", label: "Épargne", emoji: "🪙" },
  { id: "fiscalite", label: "Fiscalité", emoji: "📑" },
  { id: "social", label: "Social", emoji: "🤝" },
  { id: "bancaire", label: "Bancaire", emoji: "💳" },
];
