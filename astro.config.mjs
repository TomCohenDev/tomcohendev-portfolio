import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Static site. Hebrew pages are pre-rendered HTML (src/pages/*.astro). The English site is still the
// React Router app: dist/index.html, which Workers Assets also serves for every unknown path
// (not_found_handling in wrangler.jsonc). The Worker (edge/index.ts) only handles /api/*.
// Dev only: like not_found_handling in production, send English deep links (/services, /case-studies/...)
// to the English app at "/". Hebrew pages, files and Vite's own paths pass through.
const HEBREW_PAGES = ["/automation", "/mobile"];
const englishFallback = {
  name: "english-spa-fallback",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const path = (req.url || "/").split("?")[0];
      const isPage = req.method === "GET" && (req.headers.accept || "").includes("text/html") && !path.includes(".");
      const internal = path.startsWith("/@") || path.startsWith("/_") || path.startsWith("/src/") || path.startsWith("/node_modules/");
      const hebrew = HEBREW_PAGES.some((p) => path === p || path.startsWith(`${p}/`));
      if (isPage && !internal && !hebrew && path !== "/") req.url = "/";
      next();
    });
  },
};

export default defineConfig({
  site: "https://tomcohen.dev",
  output: "static",
  // automation.astro → dist/automation.html, so /automation keeps its URL without a trailing slash.
  build: { format: "file" },
  trailingSlash: "never",
  integrations: [react()],
  devToolbar: { enabled: false },
  server: { port: 8080, host: true },
  vite: {
    // The existing VITE_PUBLIC_* variables keep working.
    envPrefix: ["PUBLIC_", "VITE_"],
    plugins: [englishFallback],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
    // Dev only: scan the React code at startup. The English app is client:only, so otherwise Vite finds its
    // packages (posthog-js, react-router, ...) on the first page load, rebuilds its cache, and the page
    // fails with "Failed to fetch dynamically imported module" (504 Outdated Optimize Dep).
    optimizeDeps: { entries: ["src/**/*.tsx"], include: ["posthog-js", "posthog-js/react"] },
    // The lead form posts to the Worker; run `npm run dev:api` alongside `npm run dev`.
    server: { proxy: { "/api": "http://127.0.0.1:8787" } },
  },
});
