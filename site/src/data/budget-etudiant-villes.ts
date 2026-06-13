/**
 * Budget étudiant par ville · jeu de données typé pour les pages programmatiques
 * "Budget étudiant {ville}". Chiffres réels vérifiés (FAGE 2026, CROUS, réseaux
 * de transport, Caf). Cohérent avec le calculateur de budget du site.
 * Clé = slug ASCII kebab-case.
 */

export interface Fourchette {
  min: number;
  max: number;
}

export interface VilleBudget {
  slug: string; // ASCII, kebab-case
  nom: string; // accentué
  region: string;
  academie: string;
  populationEtudiante: number;
  logement: { crous: Fourchette; coloc: Fourchette; studio: Fourchette }; // €/mois
  transport: { reseau: string; abonnementMensuelEtudiant: number }; // €/mois
  alimentation: Fourchette; // €/mois
  loisirs: Fourchette; // €/mois
  budgetTotal: Fourchette; // €/mois, cohérent avec les postes (coloc = logement médian)
  aidesLocales: string[]; // 2-4 aides spécifiques (ville/région/CRIJ/CROUS local)
  introEditoriale: string; // 2-4 phrases SPÉCIFIQUES à la ville (anti-thin, >=120 chars)
  sources: string[]; // libellés sources
}

export const VILLES_BUDGET: VilleBudget[] = [
  {
    slug: "paris", nom: "Paris", region: "Île-de-France", academie: "Paris", populationEtudiante: 700000,
    logement: { crous: { min: 300, max: 500 }, coloc: { min: 600, max: 900 }, studio: { min: 800, max: 1200 } },
    transport: { reseau: "Île-de-France Mobilités (Navigo Imagine R)", abonnementMensuelEtudiant: 38 },
    alimentation: { min: 250, max: 350 }, loisirs: { min: 80, max: 150 }, budgetTotal: { min: 1100, max: 1450 },
    aidesLocales: [
      "Aide au logement APL/ALS (Caf) : 100-300 €/mois selon loyer et ressources",
      "Bourse CROUS de Paris : 1 454 à 6 335 €/an selon échelon (8 niveaux)",
      "Repas CROUS à 3,30 € (1 € pour boursiers et étudiants précaires)",
      "Garantie Visale (caution locative gratuite de l'État) et aide Mobili-Jeune",
    ],
    introEditoriale: "Paris concentre le coût de la vie étudiant le plus élevé de France, tiré par le logement : un studio dépasse souvent 1 000 €/mois et les places en résidence CROUS sont rares face à la demande. La colocation et les communes de petite couronne (Montreuil, Saint-Denis, Ivry) restent les leviers les plus efficaces pour tenir le budget.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "CROUS de Paris — tarifs résidences universitaires",
      "Île-de-France Mobilités — abonnement Imagine R étudiant",
      "Caf — barème APL/ALS 2026",
    ],
  },
  {
    slug: "lyon", nom: "Lyon", region: "Auvergne-Rhône-Alpes", academie: "Lyon", populationEtudiante: 190000,
    logement: { crous: { min: 220, max: 450 }, coloc: { min: 420, max: 600 }, studio: { min: 500, max: 750 } },
    transport: { reseau: "TCL (abonnement 18-25 ans)", abonnementMensuelEtudiant: 25 },
    alimentation: { min: 230, max: 320 }, loisirs: { min: 70, max: 130 }, budgetTotal: { min: 900, max: 1200 },
    aidesLocales: [
      "PASS'Région jeunes (Auvergne-Rhône-Alpes) : carte gratuite, avantages cumulables (sport, permis, équipement)",
      "Tarif TCL solidaire boursiers : 10,50 €/mois sur présentation de la notification CROUS",
      "Bourse CROUS de Lyon : 1 454 à 6 335 €/an selon échelon, repas universitaire à 3,30 € (1 € boursiers)",
      "Garantie Visale et APL/ALS de la Caf (100-300 €/mois selon loyer)",
    ],
    introEditoriale: "Deuxième ville étudiante de France, Lyon offre un compromis recherché entre dynamisme et coût maîtrisé : la Guillotière, Villeurbanne et le 7e arrondissement concentrent les colocations abordables proches des campus de la Doua et des Berges du Rhône. Le réseau TCL, dense et bon marché pour les 18-25 ans, allège nettement le poste transport par rapport à Paris.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "TCL — abonnement 18-25 ans illimité",
      "CROUS de Lyon — tarifs résidences universitaires",
      "Région Auvergne-Rhône-Alpes — PASS'Région jeunes",
    ],
  },
  {
    slug: "marseille", nom: "Marseille", region: "Provence-Alpes-Côte d'Azur", academie: "Aix-Marseille", populationEtudiante: 104000,
    logement: { crous: { min: 165, max: 395 }, coloc: { min: 380, max: 560 }, studio: { min: 470, max: 700 } },
    transport: { reseau: "RTM (Pass étudiant métropole)", abonnementMensuelEtudiant: 36 },
    alimentation: { min: 220, max: 310 }, loisirs: { min: 70, max: 130 }, budgetTotal: { min: 850, max: 1100 },
    aidesLocales: [
      "Pass ZOU! Études (Région Sud) : 90 €/an (45 € tarif réduit) pour les TER et cars régionaux illimités",
      "Pass RTM jeune zone Marseille à 13,20 €/mois pour les moins de 26 ans résidant dans la métropole",
      "Bourse CROUS Aix-Marseille : 1 454 à 6 335 €/an selon échelon, repas CROUS à 3,30 € (1 € boursiers)",
      "Garantie Visale et APL/ALS de la Caf selon le montant du loyer et les ressources",
    ],
    introEditoriale: "Marseille reste l'une des grandes métropoles étudiantes les plus accessibles du pays côté logement : les quartiers de la Plaine, Notre-Dame-du-Mont, Saint-Charles et le 5e arrondissement proposent des loyers nettement inférieurs à ceux de Lyon ou Bordeaux. Le poste transport pèse davantage dès qu'on couvre toute la métropole avec le pass RTM étudiant, mais le tarif jeune local reste très avantageux.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "RTM — Pass 30 jours étudiant métropole",
      "CROUS Aix-Marseille-Avignon — tarifs résidences universitaires",
      "Région Sud — Pass ZOU! Études",
    ],
  },
  {
    slug: "bordeaux", nom: "Bordeaux", region: "Nouvelle-Aquitaine", academie: "Bordeaux", populationEtudiante: 92000,
    logement: { crous: { min: 250, max: 400 }, coloc: { min: 400, max: 600 }, studio: { min: 500, max: 760 } },
    transport: { reseau: "TBM (Pass Jeune Mensuel 11-27 ans)", abonnementMensuelEtudiant: 21 },
    alimentation: { min: 230, max: 320 }, loisirs: { min: 70, max: 130 }, budgetTotal: { min: 900, max: 1180 },
    aidesLocales: [
      "Info Jeunes Nouvelle-Aquitaine : fonds social formation de 100 à 1 000 €/an pour imprévus logement et transport",
      "Pass Jeune TBM à tarif réduit (11-27 ans) pour le tram, le bus et le BatCub illimités",
      "Bourse CROUS de Bordeaux-Aquitaine : 1 454 à 6 335 €/an, repas universitaire à 3,30 € (1 € boursiers)",
      "Garantie Visale (caution gratuite de l'État) et APL/ALS de la Caf",
    ],
    introEditoriale: "Bordeaux a vu ses loyers grimper avec son attractivité : la tension locative pousse les étudiants vers la rive droite (La Bastide), Talence, Pessac et Bègles, à proximité directe du campus universitaire desservi par le tram B. Le réseau TBM compense partiellement avec un Pass Jeune parmi les moins chers des grandes métropoles françaises.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "TBM — Pass Jeune Mensuel 11-27 ans",
      "CROUS de Bordeaux-Aquitaine — tarif des logements",
      "Info Jeunes Nouvelle-Aquitaine — bourses et aides",
    ],
  },
  {
    slug: "lille", nom: "Lille", region: "Hauts-de-France", academie: "Lille", populationEtudiante: 120000,
    logement: { crous: { min: 250, max: 500 }, coloc: { min: 380, max: 560 }, studio: { min: 470, max: 700 } },
    transport: { reseau: "Ilévia (abonnement 4-25 ans)", abonnementMensuelEtudiant: 32 },
    alimentation: { min: 220, max: 310 }, loisirs: { min: 70, max: 130 }, budgetTotal: { min: 870, max: 1150 },
    aidesLocales: [
      "Mon Abo Étudiant TER Hauts-de-France : jusqu'à 88 % de réduction, gratuit pour les boursiers",
      "Tarification Ilévia au quotient familial : l'abonnement jeune descend bien en dessous de 32 €/mois selon les ressources",
      "Bourse CROUS de Lille : 1 454 à 6 335 €/an selon échelon, repas CROUS à 3,30 € (1 € boursiers)",
      "Garantie Visale et APL/ALS de la Caf selon le loyer et les ressources",
    ],
    introEditoriale: "Troisième ville étudiante de France, Lille séduit par sa vie nocturne et des loyers contenus dans le Vieux-Lille populaire, à Wazemmes, Moulins et autour du campus de Villeneuve-d'Ascq relié par le métro. La proximité de la Belgique et un réseau Ilévia au tarif modulé selon les revenus permettent de boucler un budget mesuré pour une grande métropole.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "Ilévia — grille tarifaire 4-25 ans",
      "CROUS de Lille — tarifs résidences universitaires",
      "CRIJ / Info Jeunes Hauts-de-France — aides au transport",
    ],
  },
  {
    slug: "toulouse", nom: "Toulouse", region: "Occitanie", academie: "Toulouse", populationEtudiante: 125000,
    logement: { crous: { min: 217, max: 400 }, coloc: { min: 380, max: 560 }, studio: { min: 470, max: 700 } },
    transport: { reseau: "Tisséo (pass étudiant 20-25 ans)", abonnementMensuelEtudiant: 15 },
    alimentation: { min: 220, max: 310 }, loisirs: { min: 70, max: 130 }, budgetTotal: { min: 830, max: 1080 },
    aidesLocales: [
      "Pass étudiant Tisséo à 15,50 €/mois (12,40 € pour les boursiers, gratuit échelon 7) sur carte Pastel",
      "Carte Jeune Région Occitanie et dispositif loRdi (ordinateur portable subventionné)",
      "Bourse CROUS Toulouse-Occitanie : 1 454 à 6 335 €/an, loyers CROUS à partir de 217 €/mois charges comprises",
      "Garantie Visale et APL/ALS de la Caf selon le loyer et les ressources",
    ],
    introEditoriale: "Première ville étudiante de France, Toulouse combine un coût de la vie modéré et le pass de transport étudiant le moins cher des grandes métropoles, à 15,50 €/mois sur le réseau Tisséo. Les quartiers Saint-Cyprien, des Carmes, de Rangueil et l'écosystème aéronautique près de l'université Paul-Sabatier concentrent les logements étudiants accessibles.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "Tisséo — pass étudiant 20-25 ans",
      "CROUS Toulouse-Occitanie — tarifs résidences universitaires",
      "Région Occitanie — Carte Jeune et loRdi",
    ],
  },
  {
    slug: "rennes", nom: "Rennes", region: "Bretagne", academie: "Rennes", populationEtudiante: 75000,
    logement: { crous: { min: 286, max: 467 }, coloc: { min: 380, max: 560 }, studio: { min: 470, max: 680 } },
    transport: { reseau: "STAR (abonnement jeune 18-26 ans)", abonnementMensuelEtudiant: 25 },
    alimentation: { min: 220, max: 310 }, loisirs: { min: 70, max: 130 }, budgetTotal: { min: 880, max: 1150 },
    aidesLocales: [
      "Tarif TER Jeunes BreizhGo : trajets plafonnés à 4, 8 ou 15 € pour les moins de 26 ans en Bretagne",
      "BreizhGo Solidaire : déplacements gratuits l'été pour les étudiants à faibles ressources",
      "Bourse CROUS de Rennes-Bretagne : 1 454 à 6 335 €/an, repas universitaire à 3,30 € (1 € boursiers)",
      "Garantie Visale et APL/ALS de la Caf selon le loyer et les ressources",
    ],
    introEditoriale: "Ville à taille humaine et fortement étudiante, Rennes offre un campus de Beaulieu bien relié par le métro et des quartiers vivants comme Sainte-Anne, Villejean ou le centre historique. Les loyers y restent plus doux que dans les très grandes métropoles, mais la forte demande locative impose d'anticiper sa recherche dès le printemps.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "STAR — abonnement jeune 18-26 ans",
      "CROUS de Rennes-Bretagne — tarifs studios 2025-2026",
      "Région Bretagne — BreizhGo Jeunes",
    ],
  },
  {
    slug: "nantes", nom: "Nantes", region: "Pays de la Loire", academie: "Nantes", populationEtudiante: 67000,
    logement: { crous: { min: 220, max: 450 }, coloc: { min: 380, max: 560 }, studio: { min: 470, max: 700 } },
    transport: { reseau: "Naolib / TAN (Formule illimitée moins de 26 ans)", abonnementMensuelEtudiant: 32 },
    alimentation: { min: 220, max: 310 }, loisirs: { min: 70, max: 130 }, budgetTotal: { min: 900, max: 1170 },
    aidesLocales: [
      "Prime Job Étudiant de 200 € (Région Pays de la Loire) via le dispositif e.pass jeunes",
      "Tarification solidaire Naolib pour les moins de 26 ans (2,55 à 17,85 €/mois selon les ressources)",
      "Bourse CROUS de Nantes-Pays de la Loire : 1 454 à 6 335 €/an, repas CROUS à 3,30 € (1 € boursiers)",
      "Garantie Visale et APL/ALS de la Caf selon le loyer et les ressources",
    ],
    introEditoriale: "Nantes attire toujours plus d'étudiants avec son campus du Tertre et de l'île de Nantes, mais cette popularité tend le marché du logement autour de Chantenay, Doulon et du centre. Le réseau Naolib (ex-TAN), tramway et busway, structure les déplacements quotidiens, avec une tarification solidaire qui allège fortement la facture des étudiants les plus modestes.",
    sources: [
      "FAGE — Indicateur du coût de la rentrée 2026",
      "Naolib (TAN) — formule illimitée moins de 26 ans",
      "CROUS de Nantes-Pays de la Loire — résidences universitaires",
      "Région Pays de la Loire — e.pass jeunes",
    ],
  },
];
