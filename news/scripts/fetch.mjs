#!/usr/bin/env node
/**
 * Step 1 of the daily news (news/schedule.md): read the feeds in news/sources.json and write the recent items
 * to news/desk/<date>/items.json for the editor to choose from.
 *
 *   node news/scripts/fetch.mjs [YYYY-MM-DD] [--hours 30]
 *
 * The date defaults to today in Israel. Items already linked from an earlier issue are left out.
 * A feed that fails is reported and skipped; the run stops only when every feed fails.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { coveredUrls, israelToday, NEWS } from "./lib.mjs";

const args = process.argv.slice(2);
const date = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) || israelToday();
const hours = args.includes("--hours") ? Number(args[args.indexOf("--hours") + 1]) : 30;
const since = Date.now() - hours * 3600_000;

const { sources } = JSON.parse(readFileSync(join(NEWS, "sources.json"), "utf8"));
const covered = coveredUrls();

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&");
const text = (html) =>
  decode(decode(html || ""))
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const tag = (xml, name) => xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"))?.[1] ?? "";

const parse = (xml) => {
  const entries = [...xml.matchAll(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi)].map((m) => m[0]);
  return entries.map((e) => {
    const atomLink =
      e.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i)?.[1] ||
      e.match(/<link[^>]*href="([^"]+)"[^>]*rel="alternate"/i)?.[1] ||
      e.match(/<link(?![^>]*rel="(?:self|replies|edit)")[^>]*href="([^"]+)"/i)?.[1];
    const link = decode(tag(e, "link").trim() || atomLink || "").trim();
    const when = tag(e, "pubDate") || tag(e, "published") || tag(e, "updated") || tag(e, "dc:date");
    const body = tag(e, "content:encoded") || tag(e, "description") || tag(e, "summary") || tag(e, "content");
    return {
      title: text(tag(e, "title")),
      url: link,
      published: when ? new Date(decode(when).trim()).toISOString() : null,
      summary: text(body).slice(0, 700),
    };
  });
};

const results = await Promise.all(
  sources.map(async (s) => {
    try {
      const res = await fetch(s.url, {
        headers: { "user-agent": "Mozilla/5.0 (compatible; tomcohen.dev news; +https://tomcohen.dev/news)", accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*" },
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const items = parse(await res.text())
        .filter((i) => i.url && i.title && i.published && Date.parse(i.published) >= since && !covered.has(i.url))
        .map((i) => ({ source: s.name, topic: s.topic, ...i }));
      return { name: s.name, ok: true, count: items.length, items };
    } catch (e) {
      return { name: s.name, ok: false, error: String(e.message || e), items: [] };
    }
  })
);

if (results.every((r) => !r.ok)) {
  console.error("Every feed failed:\n" + results.map((r) => `  ${r.name}: ${r.error}`).join("\n"));
  process.exit(1);
}

const items = results.flatMap((r) => r.items).sort((a, b) => b.published.localeCompare(a.published));
const dir = join(NEWS, "desk", date);
mkdirSync(dir, { recursive: true });
writeFileSync(
  join(dir, "items.json"),
  JSON.stringify(
    { date, fetchedAt: new Date().toISOString(), hours, sources: results.map(({ items: _, ...r }) => r), items },
    null,
    2
  ) + "\n"
);

for (const r of results) console.log(`${r.ok ? "ok  " : "FAIL"} ${r.name.padEnd(26)} ${r.ok ? r.count : r.error}`);
console.log(`\n${items.length} items from the last ${hours} hours → news/desk/${date}/items.json`);
