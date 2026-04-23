import { siteConfig, fullUrl } from "./config";

/** JSON-LD for NewsMediaOrganization + WebSite (homepage) */
export function jsonLdHomepage() {
  const orgId = `${siteConfig.url}/#organization`;
  const siteId = `${siteConfig.url}/#website`;
  const authorIds = [
    "lea-dubreuil",
    "marc-henrion",
    "sophie-vallet",
    "antoine-berger",
    "camille-pellier",
  ].map((s) => ({ "@id": `${siteConfig.url}/auteurs/#${s}` }));
  return [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "NewsMediaOrganization"],
      "@id": orgId,
      name: siteConfig.name,
      alternateName: "Econono.com",
      url: siteConfig.url,
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      foundingDate: "2026-04",
      foundingLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: "FR" },
      },
      areaServed: { "@type": "Country", name: "France" },
      knowsAbout: [
        "gestion de budget personnel",
        "pouvoir d'achat",
        "calcul de reste à vivre",
        "taux d'endettement",
        "règle 50/30/20",
        "livret A",
        "LEP",
        "épargne de précaution",
        "SMIC net",
        "aides CAF",
        "crédit immobilier",
        "budget famille",
      ],
      knowsLanguage: ["fr-FR"],
      logo: {
        "@type": "ImageObject",
        "@id": `${siteConfig.url}/#logo`,
        url: `${siteConfig.url}/favicon-512.png`,
        contentUrl: `${siteConfig.url}/favicon-512.png`,
        width: 512,
        height: 512,
        caption: siteConfig.name,
      },
      image: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/og-default.png`,
        width: 1200,
        height: 630,
      },
      publishingPrinciples: `${siteConfig.url}/a-propos/methodologie/`,
      actionableFeedbackPolicy: `${siteConfig.url}/a-propos/`,
      ethicsPolicy: `${siteConfig.url}/a-propos/methodologie/`,
      ownershipFundingInfo: `${siteConfig.url}/a-propos/`,
      correctionsPolicy: `${siteConfig.url}/a-propos/methodologie/`,
      missionCoveragePrioritiesPolicy: `${siteConfig.url}/a-propos/`,
      unnamedSourcesPolicy: `${siteConfig.url}/a-propos/methodologie/`,
      verificationFactCheckingPolicy: `${siteConfig.url}/a-propos/methodologie/`,
      diversityPolicy: `${siteConfig.url}/a-propos/`,
      masthead: `${siteConfig.url}/auteurs/`,
      employee: authorIds,
      member: authorIds,
      ...(siteConfig.legal.email && {
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.legal.email,
          contactType: "customer service",
          availableLanguage: "French",
          areaServed: "FR",
        },
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": siteId,
      name: siteConfig.name,
      alternateName: siteConfig.tagline,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: siteConfig.locale,
      publisher: { "@id": orgId },
      copyrightHolder: { "@id": orgId },
      copyrightYear: 2026,
      license: `${siteConfig.url}/rsl.txt`,
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        {
          "@type": "SubscribeAction",
          target: `${siteConfig.url}/newsletter/`,
          name: "S'abonner à la newsletter Le Carnet",
        },
      ],
    },
  ];
}

/** JSON-LD for Article */
const AUTHOR_SLUG_MAP: Record<string, string> = {
  "Léa Dubreuil": "lea-dubreuil",
  "Marc Henrion": "marc-henrion",
  "Sophie Vallet": "sophie-vallet",
  "Antoine Berger": "antoine-berger",
  "Camille Pellier": "camille-pellier",
};

export function jsonLdArticle(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
  keywords?: string[];
}) {
  const authorName = article.author || siteConfig.blog.defaultAuthor;
  const slug = AUTHOR_SLUG_MAP[authorName];
  const authorBlock = slug
    ? {
        "@type": "Person",
        "@id": `${siteConfig.url}/auteurs/#${slug}`,
        name: authorName,
        url: `${siteConfig.url}/auteurs/#${slug}`,
      }
    : {
        "@type": "Person",
        name: authorName,
      };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image
      ? article.image.startsWith("http")
        ? article.image
        : fullUrl(article.image)
      : `${siteConfig.url}/og-default.png`,
    author: authorBlock,
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url },
    keywords: article.keywords?.join(", "),
    inLanguage: siteConfig.locale,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
  };
}

/** JSON-LD for FAQPage */
export function jsonLdFaq(
  faq: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** JSON-LD for BreadcrumbList */
export function jsonLdBreadcrumbs(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
