import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import seoIntegration from "./scripts/seo-integration.mjs";

export default defineConfig({
  site: "https://tomcohen.dev",
  output: "static",
  // automation.astro → dist/automation.html, so /automation keeps its URL without a trailing slash.
  build: { format: "file" },
  trailingSlash: "never",
  integrations: [react(), seoIntegration()],
  devToolbar: { enabled: false },
  server: { port: 8080, host: true },
  vite: {
    // The existing VITE_PUBLIC_* variables keep working.
    envPrefix: ["PUBLIC_", "VITE_"],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
    // Dev only: scan the React code at startup. The English app is client:only, so otherwise Vite finds its
    // packages (posthog-js, react-router, ...) on the first page load, rebuilds its cache, and the page
    // fails with "Failed to fetch dynamically imported module" (504 Outdated Optimize Dep).
    optimizeDeps: { entries: ["src/**/*.tsx"], include: ["posthog-js", "posthog-js/react"] },
    // The lead form posts to the Worker; run `npm run dev:api` alongside `npm run dev`.
    server: { proxy: { "/api": "http://127.0.0.1:8787" } },
  },
});
