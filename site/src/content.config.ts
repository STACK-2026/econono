import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    author: z.string().optional(),
    category: z
      .enum(["guide", "astuce", "comparatif", "temoignage", "actu", "decryptage"])
      .default("guide"),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
    keywords: z.string().optional(),
    lastReviewed: z.coerce.date().optional(),
    reviewedBy: z.string().optional(),
    readingTime: z.string().optional(),
    tldr: z.array(z.string()).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

const calculateurs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/calculateurs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    slug: z.string(),
    category: z.enum(["budget", "credit", "epargne", "salaire", "situation", "comparatif"]),
    pillar: z.boolean().default(false),
    duration: z.string().default("2 min"),
    inputs: z.array(z.string()).default([]),
    output: z.string(),
    date: z.coerce.date(),
    lastReviewed: z.coerce.date().optional(),
    author: z.string().optional(),
    keywords: z.string().optional(),
    relatedCalculateurs: z.array(z.string()).default([]),
    relatedGuides: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tldr: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    lastReviewed: z.coerce.date().optional(),
    author: z.string().optional(),
    category: z
      .enum(["debuter", "epargner", "rembourser", "negocier", "famille", "situation"])
      .default("debuter"),
    readingTime: z.string().optional(),
    keywords: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tldr: z.array(z.string()).optional(),
    relatedCalculateurs: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const comparatifs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/comparatifs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    produit: z.string(),
    category: z.enum(["app-budget", "banque", "livret", "assurance", "credit", "energie", "telecom"]),
    pricing: z.string().optional(),
    website: z.string().url().optional(),
    rating: z.number().min(1).max(10).optional(),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    affiliateLink: z.string().url().optional(),
    date: z.coerce.date(),
    lastReviewed: z.coerce.date().optional(),
    author: z.string().optional(),
    keywords: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const actu = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/actu" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(260),
    date: z.coerce.date(),
    category: z.enum([
      "smic",
      "livret",
      "aide",
      "fiscalite",
      "energie",
      "inflation",
      "logement",
      "alerte",
    ]),
    impactLevel: z.number().min(1).max(5),
    author: z.string().default("Econono Décrypte"),
    keyQuote: z
      .object({
        text: z.string(),
        author: z.string(),
        context: z.string().optional(),
      })
      .optional(),
    tldr: z.array(z.string()).min(2).max(5),
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          outlet: z.string(),
          date: z.coerce.date().optional(),
        })
      )
      .min(1),
    relatedCalculateurs: z.array(z.string()).default([]),
    relatedGuides: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    keywords: z.string().optional(),
    lastReviewed: z.coerce.date().optional(),
    reviewedBy: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, pages, calculateurs, guides, comparatifs, actu };
