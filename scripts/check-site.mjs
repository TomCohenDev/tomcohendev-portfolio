#!/usr/bin/env node
/**
 * Site checks.
 *
 *   node scripts/check-site.mjs            checks the build in dist/ (run after `npm run build`)
 *   node scripts/check-site.mjs --live URL checks a deployed site, such as https://tomcohen.dev
 *
 * Build mode: every Hebrew page has lang="he" dir="rtl", a title, a description, a canonical URL and an h1,
 * and every internal link in the Hebrew pages leads to a file in dist/ or a route of the English app (/en/...).
 * Live mode: the same pages answer 200 with the right language, English deep links reach the English app,
 * old English URLs redirect to /en, and an unknown path gets the Hebrew 404 page with status 404.
 * Exits with 1 and a list of problems when a check fails.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SITE = "https://tomcohen.dev";
const HEBREW_PAGES = ["/", "/automation", "/mobile", "/web", "/automation/privacy", "/automation/site-map", "/news", "/news/archive"];
const distFile = (path) => join("dist", path === "/" ? "index.html" : `${path}.html`);
const problems = [];
const fail = (msg) => problems.push(msg);

const checkHebrewHtml = (path, html) => {
  if (!/<html lang="he" dir="rtl"/.test(html)) fail(`${path}: missing <html lang="he" dir="rtl">`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${path}: missing <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail(`${path}: missing description`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== SITE + path) fail(`${path}: canonical is ${canonical}, expected ${SITE + path}`);
  if (!/<h1[\s>]/.test(html)) fail(`${path}: no <h1> in the HTML`);
};

// Routes of the English React Router app (src/App.tsx, basename /en), served by dist/en.html.
const englishRoutes = [...readFileSync("src/App.tsx", "utf8").matchAll(/<Route path="([^"*]+)"/g)].map(
  (m) => new RegExp(`^/en${m[1] === "/" ? "" : m[1].replace(/:[^/]+/g, "[^/]+")}$`)
);

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith(".html") ? [full] : [];
  });

if (process.argv[2] === "--live") {
  const base = (process.argv[3] || SITE).replace(/\/$/, "");
  const get = async (path) => {
    const res = await fetch(base + path, { headers: { accept: "text/html" }, redirect: "follow" });
    return { status: res.status, html: await res.text() };
  };
  for (const path of HEBREW_PAGES) {
    const { status, html } = await get(path);
    if (status !== 200) fail(`${path}: status ${status}`);
    else checkHebrewHtml(path, html);
  }
  for (const path of ["/en", "/en/case-studies/dronebag"]) {
    const { status, html } = await get(path);
    if (status !== 200) fail(`${path}: status ${status}`);
    else if (!/<html lang="en"/.test(html)) fail(`${path}: did not get the English app`);
    else {
      if (!html.includes(`<link rel="canonical" href="${SITE}${path}"`)) fail(`${path}: wrong English canonical`);
      if (!/<h1[\s>]/.test(html)) fail(`${path}: missing pre-rendered content`);
    }
  }
  const sitemap = await fetch(base + "/sitemap.xml");
  if (sitemap.status !== 200 || !(await sitemap.text()).includes("<urlset")) fail("Missing XML sitemap");
  const englishMissing = await get("/en/no-such-page");
  if (englishMissing.status !== 404) fail("Unknown English page must return 404");
  for (const [from, to] of [["/case-studies/dronebag", "/en/case-studies/dronebag"], ["/contact", "/en/contact"]]) {
    const res = await fetch(base + from, { redirect: "manual" });
    const location = res.headers.get("location") || "";
    if (res.status !== 301 || !location.endsWith(to)) fail(`${from}: expected a 301 to ${to}, got ${res.status} ${location}`);
  }
  const missing = await get("/no-such-page");
  if (missing.status !== 404 || !/<html lang="he"/.test(missing.html)) fail(`/no-such-page: expected the Hebrew 404 page, got ${missing.status}`);
  const api = await fetch(base + "/api/automation-lead");
  if (api.status !== 405) fail(`/api/automation-lead: GET answered ${api.status}, expected 405 from the Worker`);
} else {
  if (!existsSync("dist")) {
    console.error("dist/ not found. Run `npm run build` first.");
    process.exit(1);
  }
  for (const path of HEBREW_PAGES) {
    const file = distFile(path);
    if (!existsSync(file)) fail(`${path}: ${file} was not built`);
    else checkHebrewHtml(path, readFileSync(file, "utf8"));
  }
  const resolves = (href) => {
    const path = decodeURI(href.split(/[?#]/)[0]) || "/";
    if (englishRoutes.some((r) => r.test(path))) return true;
    return [path, `${path}.html`, join(path, "index.html")].some((p) => existsSync(join("dist", p)));
  };
  for (const file of htmlFiles("dist")) {
    const html = readFileSync(file, "utf8");
    for (const [, href] of html.matchAll(/href="(\/[^"/][^"]*|\/)"/g)) {
      if (!resolves(href)) fail(`${relative("dist", file)}: broken link ${href}`);
    }
  }
  // Validate the complete generated site, including articles and English deep links.
  const canonicals = new Set();
  const titles = new Set();
  const alternatives = [];
  for (const file of htmlFiles("dist")) {
    const html = readFileSync(file, "utf8");
    const head = html.split("</head>")[0];
    for (const [, value] of head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(value); } catch { fail(`${file}: invalid JSON-LD`); }
    }
    if (/<meta name="robots" content="[^"]*noindex/.test(head)) continue;
    const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!canonical?.startsWith(SITE + "/")) fail(`${file}: missing production canonical`);
    if (canonicals.has(canonical)) fail(`${file}: duplicate canonical ${canonical}`);
    canonicals.add(canonical);
    const title = head.match(/<title>([^<]+)<\/title>/)?.[1];
    if (!title || titles.has(title)) fail(`${file}: missing or duplicate title`);
    titles.add(title);
    if (!/<meta name="description" content="[^"]+"/.test(head)) fail(`${file}: missing description`);
    if (!/<h1[\s>]/.test(html)) fail(`${file}: content needs JavaScript (no h1)`);
    if (canonical !== head.match(/<meta property="og:url" content="([^"]+)"/)?.[1]) fail(`${file}: share URL differs from canonical`);
    const image = head.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    if (!image?.startsWith(SITE + "/") || !existsSync(join("dist", new URL(image).pathname))) fail(`${file}: missing local share image`);
    for (const [, lang, href] of head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
      alternatives.push({ canonical, lang, href });
    }
  }
  for (const { canonical, lang, href } of alternatives) {
    if (!canonicals.has(href)) fail(`${canonical}: hreflang target is not indexable: ${href}`);
    if (lang !== "x-default" && !alternatives.some((a) => a.canonical === href && a.href === canonical)) fail(`${canonical}: non-reciprocal hreflang ${href}`);
  }
  if (!existsSync("dist/sitemap.xml")) fail("Missing XML sitemap");
  else {
    const urls = [...readFileSync("dist/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (urls.length !== new Set(urls).size) fail("Sitemap contains duplicate URLs");
    for (const url of canonicals) if (!urls.includes(url)) fail(`Sitemap missing ${url}`);
    for (const url of urls) if (!canonicals.has(url)) fail(`Sitemap includes a non-indexable page: ${url}`);
  }
  if (!readFileSync("dist/robots.txt", "utf8").includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt must advertise the sitemap");
}

if (problems.length) {
  console.error(`Site check failed (${problems.length}):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(process.argv[2] === "--live" ? "Live site check passed." : "Build check passed.");
