import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../../site.config";

const ACTU_CATEGORY_LABELS: Record<string, string> = {
  smic: "SMIC",
  livret: "Livrets épargne",
  aide: "Aides sociales",
  fiscalite: "Fiscalité",
  energie: "Énergie",
  inflation: "Inflation",
  logement: "Logement",
  alerte: "Alerte",
};

const BLOG_CATEGORY_LABELS: Record<string, string> = {
  guide: "Guide",
  astuce: "Astuce",
  comparatif: "Comparatif",
  temoignage: "Témoignage",
  actu: "Actualité",
  decryptage: "Décryptage",
};

export async function GET(context: { site?: URL }) {
  const site = context.site?.toString() ?? siteConfig.url;

  let actu: Awaited<ReturnType<typeof getCollection>> = [];
  let blog: Awaited<ReturnType<typeof getCollection>> = [];
  try {
    actu = (await getCollection("actu", ({ data }) => !data.draft))
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .slice(0, 50);
  } catch {}
  try {
    blog = (await getCollection("blog", ({ data }) => !data.draft))
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .slice(0, 50);
  } catch {}

  const items = [
    ...actu.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/actu/${p.id}/`,
      categories: [ACTU_CATEGORY_LABELS[p.data.category as string] ?? "Actualité"],
      author: p.data.author ?? "Rédaction Econono",
    })),
    ...blog.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/blog/${p.id}/`,
      categories: [BLOG_CATEGORY_LABELS[p.data.category as string] ?? "Blog"],
      author: p.data.author ?? "Rédaction Econono",
    })),
  ]
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())
    .slice(0, 50);

  return rss({
    title: "Econono · Le Carnet · budget et pouvoir d'achat",
    description:
      "Le carnet hebdomadaire d'Econono : actu pouvoir d'achat décryptée, astuces budget, comparatifs honnêtes d'apps et de banques. Sources officielles, ton humain, zéro pub déguisée.",
    site,
    items,
    customData: "<language>fr-FR</language>",
    stylesheet: false,
  });
}
