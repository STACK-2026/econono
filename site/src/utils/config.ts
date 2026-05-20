import { siteConfig } from "../../site.config";

export { siteConfig };

/** Full URL for a path (always with trailing slash to match Astro trailingSlash: "always") */
export function fullUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return `${base}${withSlash}`;
}

// fontsUrl() removed: fonts are now self-hosted via @fontsource (see BaseLayout.astro imports)
