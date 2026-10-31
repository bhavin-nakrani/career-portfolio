// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages project site: https://bhavin-nakrani.github.io/career-portfolio/
// When moving to a custom domain (or a username.github.io repo), set SITE_URL and BASE_PATH="/".
const site = process.env.SITE_URL ?? "https://bhavin-nakrani.github.io";
const base = process.env.BASE_PATH ?? "/career-portfolio";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  output: "static",
  integrations: [
    sitemap({
      // Utility pages used only to render the PDF resume and social card.
      filter: (page) => !page.includes("/resume/print") && !page.includes("/og-card"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
