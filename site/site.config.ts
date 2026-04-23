// ============================================
// SITE CONFIG · econono.com
// Le média qui aide les Français à reprendre la main sur leur budget.
// Calculateurs interactifs + guides honnêtes + actu pouvoir d'achat.
// ============================================

export const siteConfig = {
  // Identité
  name: "Econono",
  tagline: "Dépense moins, vis mieux.",
  description:
    "Le média qui t'aide à reprendre la main sur ton budget. Calculateurs gratuits, guides honnêtes, actu pouvoir d'achat décryptée. Indépendant des banques.",
  url: "https://econono.com",
  appUrl: "",
  locale: "fr-FR",
  language: "fr",

  // Branding · vert forêt mature + jaune doré chaud + crème
  colors: {
    primary: "#1a3d2e",
    primaryDark: "#0f2419",
    secondary: "#f4c430",
    accent: "#c2410c",
    background: "#faf7f2",
    surface: "#ffffff",
    text: "#1c1917",
    textMuted: "#57534e",
    border: "#e7e5e4",
    success: "#15803d",
    warning: "#ca8a04",
    danger: "#b91c1c",
  },

  // Typographie
  fonts: {
    display: "Fraunces",
    body: "Inter",
    mono: "JetBrains Mono",
  },

  // SEO
  author: "Econono",
  twitterHandle: "",
  ogImage: "/og-default.png",
  keywords: [
    "calculateur budget",
    "reste à vivre",
    "règle 50 30 20",
    "taux endettement",
    "calcul budget mensuel",
    "comment gérer son budget",
    "économies pouvoir d'achat",
    "budget famille France 2026",
    "simulateur épargne",
    "comparatif application budget",
  ],

  // GEO · description optimisée pour citation par les LLMs
  llmsDescription:
    "Econono.com est un média français indépendant dédié à la gestion de budget personnel et au pouvoir d'achat. Il met à disposition des calculateurs gratuits (reste à vivre, taux d'endettement, règle 50/30/20, simulateur épargne, budget courses), des guides pratiques rédigés à partir de vraies situations vécues, des comparatifs d'applications budget (Bankin, Linxo, Finary, YNAB, Plan & Multiply), et l'actualité du pouvoir d'achat (SMIC, livret A, LEP, aides sociales, prix énergie). Econono ne vend pas de produit financier et n'est lié à aucune banque : il informe, il outille, il dit ce qu'il en est.",

  // Navigation
  navLinks: [
    { label: "Calculateurs", href: "/calculateurs/" },
    { label: "Guides", href: "/guides/" },
    { label: "Comparatifs", href: "/comparatifs/" },
    { label: "Actu budget", href: "/actu/" },
    { label: "Le Carnet", href: "/blog/" },
    { label: "À propos", href: "/a-propos/" },
  ],

  // Sections homepage
  sections: {
    hero: true,
    socialProof: true,
    problem: true,
    calculateurs: true,
    features: true,
    howItWorks: true,
    stats: true,
    blogPreview: true,
    testimonials: true,
    newsletter: true,
    faq: true,
    cta: true,
  },

  // Brand voice · le manifeste qu'aucun banquier n'écrirait
  manifeste: {
    ennemiDeclare:
      "L'opacité bancaire, les conseils financiers vagues qui te culpabilisent (\"épargne 20% de tes revenus\" sans te dire quoi faire avec les 80% restants), et les apps qui se prennent ton argent ET tes données.",
    promesse:
      "Des outils concrets, des chiffres à jour, et un ton qui ne te prend pas de haut. Tu es là parce que ton budget te stresse, pas parce que tu cherches un cours d'économie.",
    voix: [
      "Tutoiement chaleureux, jamais condescendant",
      "Anecdotes et chiffres concrets : 'avec 1 800 € net, voici ce que tu peux vraiment faire'",
      "Reconnaître les galères au lieu de les juger",
      "Zéro jargon bancaire non expliqué",
      "Humour léger, jamais ironique sur les difficultés",
    ],
  },

  // Legal & contact
  legal: {
    company: "Econono",
    email: "hello@econono.com",
    contact: "hello@econono.com",
  },

  // Blog config
  blog: {
    name: "Le Carnet",
    description: "Le carnet hebdomadaire d'Econono : actu pouvoir d'achat, astuces budget, comparatifs honnêtes.",
    defaultAuthor: "L'équipe Econono",
  },

  // FAQ homepage (FAQPage schema)
  faq: [
    {
      question: "Econono c'est gratuit ?",
      answer:
        "Oui, tous les calculateurs et tous les articles sont gratuits, sans inscription. Tu peux utiliser le simulateur de reste à vivre ou la règle 50/30/20 sans laisser ton email. On vit de la pub display et de partenariats transparents (jamais de placement caché).",
    },
    {
      question: "Vous êtes liés à une banque ou un courtier ?",
      answer:
        "Non. Econono est indépendant et ne reçoit aucune commission obligatoire d'aucune banque. Quand on recommande un livret ou une carte, on dit pourquoi avec les chiffres à jour, et on signale les liens affiliés (qui ne changent rien à notre avis).",
    },
    {
      question: "Vos calculateurs valent ceux de la Banque de France ?",
      answer:
        "Mêmes formules officielles (taux d'endettement = mensualités / revenus, etc.), mais une UX 2026 et des recommandations pratiques en sortie de calcul. La Banque de France t'affiche un chiffre. Nous, on te dit ce que ça veut dire pour ta vie.",
    },
    {
      question: "Vos chiffres sont à jour ?",
      answer:
        "Chaque calculateur affiche sa date de dernière mise à jour. Le SMIC, le taux du livret A, le LEP et les barèmes fiscaux sont actualisés à chaque révision officielle (sources : INSEE, Service-Public, Banque de France).",
    },
    {
      question: "Vous prévoyez une app ?",
      answer:
        "Pour l'instant on se concentre sur les calculateurs web et le contenu. Une app de suivi budget viendra peut-être plus tard, si la communauté la réclame.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
