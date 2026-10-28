#!/usr/bin/env node
/**
 * Site checks.
 *
 *   node scripts/check-site.mjs            checks the build in dist/ (run after `npm run build`)
 *   node scripts/check-site.mjs --live URL checks a deployed site, such as https://tomcohen.dev
 *
 * Build mode: every Hebrew page has lang="he" dir="rtl", a title, a description, a canonical URL and an h1,
 * and every internal link in the Hebrew pages leads to a file in dist/ or a route of the English app.
 * Live mode: the same pages answer 200 with the right language, and an English deep link reaches the English app.
 * Exits with 1 and a list of problems when a check fails.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SITE = "https://tomcohen.dev";
const HEBREW_PAGES = ["/automation", "/mobile", "/automation/privacy", "/automation/site-map"];
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

// Routes of the English React Router app (src/App.tsx), served by dist/index.html.
const englishRoutes = [...readFileSync("src/App.tsx", "utf8").matchAll(/<Route path="([^"*]+)"/g)].map(
  (m) => new RegExp(`^${m[1].replace(/:[^/]+/g, "[^/]+")}$`)
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
  for (const path of ["/", "/case-studies/dronebag"]) {
    const { status, html } = await get(path);
    if (status !== 200) fail(`${path}: status ${status}`);
    else if (!/<html lang="en"/.test(html)) fail(`${path}: did not get the English app`);
  }
  const api = await fetch(base + "/api/automation-lead");
  if (api.status !== 405) fail(`/api/automation-lead: GET answered ${api.status}, expected 405 from the Worker`);
} else {
  if (!existsSync("dist")) {
    console.error("dist/ not found. Run `npm run build` first.");
    process.exit(1);
  }
  for (const path of HEBREW_PAGES) {
    const file = join("dist", `${path}.html`);
    if (!existsSync(file)) fail(`${path}: ${file} was not built`);
    else checkHebrewHtml(path, readFileSync(file, "utf8"));
  }
  const resolves = (href) => {
    const path = decodeURI(href.split(/[?#]/)[0]) || "/";
    if (path === "/" || englishRoutes.some((r) => r.test(path))) return true;
    return [path, `${path}.html`, join(path, "index.html")].some((p) => existsSync(join("dist", p)));
  };
  for (const file of htmlFiles("dist")) {
    if (file === join("dist", "index.html")) continue;
    const html = readFileSync(file, "utf8");
    for (const [, href] of html.matchAll(/href="(\/[^"/][^"]*|\/)"/g)) {
      if (!resolves(href)) fail(`${relative("dist", file)}: broken link ${href}`);
    }
  }
}

if (problems.length) {
  console.error(`Site check failed (${problems.length}):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(process.argv[2] === "--live" ? "Live site check passed." : "Build check passed.");
