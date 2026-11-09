import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const escapeXml = (value) => value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);

/** Derive the sitemap from actual built, indexable pages, including dynamic routes.
 * Demo pages and 404s keep their noindex settings and never enter the sitemap.
 */
export default function seoIntegration() {
  return {
    name: "site-seo",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const root = fileURLToPath(dir);
        const walk = async (folder) => (await Promise.all((await readdir(folder, { withFileTypes: true })).map(async (entry) => {
          const path = join(folder, entry.name);
          return entry.isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
        }))).flat();
        const entries = new Map();
        for (const file of await walk(root)) {
          const html = await readFile(file, "utf8");
          const head = html.split("</head>")[0];
          if (/<meta name="robots" content="[^"]*noindex/.test(head)) continue;
          const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
          if (!canonical) throw new Error(`Indexable page lacks a canonical: ${file}`);
          const alternates = [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
            .map(([, lang, href]) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`).join("\n");
          entries.set(canonical, `  <url>\n    <loc>${escapeXml(canonical)}</loc>${alternates ? `\n${alternates}` : ""}\n  </url>`);
        }
        await writeFile(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${[...entries].sort(([a], [b]) => a.localeCompare(b)).map(([, value]) => value).join("\n")}\n</urlset>\n`);
      },
    },
  };
}
