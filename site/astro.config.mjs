// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { siteConfig } from "./site.config.ts";

export default defineConfig({
  site: siteConfig.url,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: "weekly",
      priority: 0.7,
      filter: (page) =>
        !page.includes("/admin") &&
        !page.includes("/api/") &&
        !page.endsWith("/404"),
      serialize(item) {
        if (item.url === siteConfig.url + "/") {
          item.priority = 1.0;
          item.changefreq = "daily";
        }
        if (item.url.includes("/calculateurs/")) {
          item.priority = 0.95;
          item.changefreq = "monthly";
        }
        if (item.url.includes("/guides/")) {
          item.priority = 0.85;
          item.changefreq = "monthly";
        }
        if (item.url.includes("/comparatifs/")) {
          item.priority = 0.85;
          item.changefreq = "monthly";
        }
        if (item.url.includes("/actu/")) {
          item.priority = 0.8;
          item.changefreq = "weekly";
        }
        if (item.url.includes("/blog/")) {
          item.priority = 0.7;
          item.changefreq = "weekly";
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    smartypants: false,
    shikiConfig: {
      theme: "github-light",
    },
  },
});
