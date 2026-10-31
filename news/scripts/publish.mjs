#!/usr/bin/env node
/**
 * Step 4 of the daily news (news/schedule.md): check the editor's picks and turn them into an issue.
 *
 *   node news/scripts/publish.mjs [YYYY-MM-DD] [--offline]
 *
 * Reads news/desk/<date>/picks.json (and Tom's update in news/updates/<date>.json, if there is one) and writes
 * news/issues/<date>.json, which the site builds into /news. Nothing is written when a check fails:
 * a missing field, text that is not Hebrew, a source that does not answer, a word from news/deny.txt,
 * a story that already appeared, or a "continues" link to a story that does not exist.
 * --offline skips the source URL check (for tests without a network).
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { coveredUrls, israelToday, ISSUES, NEWS, readIssues } from "./lib.mjs";

export const TOPICS = ["mobile", "ai", "automation", "security", "business"];

const args = process.argv.slice(2);
const date = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) || israelToday();
const offline = args.includes("--offline");

const problems = [];
const fail = (msg) => problems.push(msg);
const hebrew = (s) => typeof s === "string" && /[֐-׿]/.test(s);

const picksFile = join(NEWS, "desk", date, "picks.json");
if (!existsSync(picksFile)) {
  console.error(`${picksFile} not found. Write the picks first (news/skill/SKILL.md).`);
  process.exit(1);
}
const picks = JSON.parse(readFileSync(picksFile, "utf8"));
const updateFile = join(NEWS, "updates", `${date}.json`);
const update = existsSync(updateFile) ? JSON.parse(readFileSync(updateFile, "utf8")) : picks.update;

const earlier = readIssues().filter((i) => i.date < date);
const covered = coveredUrls(date);
const deny = existsSync(join(NEWS, "deny.txt"))
  ? readFileSync(join(NEWS, "deny.txt"), "utf8").split(/\r?\n/).map((w) => w.trim().toLowerCase()).filter((w) => w && !w.startsWith("#"))
  : [];

const stories = picks.stories || [];
if (stories.length < 3 || stories.length > 6) fail(`${stories.length} stories; an issue has 3 to 6`);

const ids = new Set();
for (const [n, s] of stories.entries()) {
  const at = `story ${n + 1} (${s.id || "no id"})`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.id || "")) fail(`${at}: id must be lowercase-with-dashes`);
  if (ids.has(s.id)) fail(`${at}: id appears twice`);
  ids.add(s.id);
  if (!TOPICS.includes(s.topic)) fail(`${at}: topic must be one of ${TOPICS.join(", ")}`);
  for (const field of ["headline", "summary", "forBusiness"]) if (!hebrew(s[field])) fail(`${at}: ${field} is missing or not in Hebrew`);
  if ((s.headline || "").length > 110) fail(`${at}: headline is longer than 110 characters`);
  if ((s.summary || "").length > 420) fail(`${at}: summary is longer than 420 characters`);
  if (!s.source?.name) fail(`${at}: source.name is missing`);
  if (!/^https:\/\//.test(s.source?.url || "")) fail(`${at}: source.url must be an https URL`);
  if (covered.has(s.source?.url)) fail(`${at}: ${s.source.url} already appeared in an earlier issue`);
  if (s.continues) {
    const issue = earlier.find((i) => i.date === s.continues.date);
    const prev = issue?.stories.find((p) => p.id === s.continues.id);
    if (!prev) fail(`${at}: continues ${s.continues.date}#${s.continues.id}, which does not exist`);
    else s.continues = { date: issue.date, id: prev.id, headline: prev.headline };
  }
}

const allText = JSON.stringify({ update, stories }).toLowerCase();
for (const w of deny) if (allText.includes(w)) fail(`a word from deny.txt appears: "${w}"`);

if (update && (!hebrew(update.title) || !hebrew(update.text))) fail("update: title and text must be in Hebrew");

if (!offline) {
  await Promise.all(
    stories.map(async (s) => {
      if (!s.source?.url) return;
      try {
        const res = await fetch(s.source.url, {
          headers: { "user-agent": "Mozilla/5.0 (compatible; tomcohen.dev news; +https://tomcohen.dev/news)" },
          redirect: "follow",
          signal: AbortSignal.timeout(20_000),
        });
        // 401, 403 and 429 mean the site answered but keeps bots out; a reader can still open the link.
        if (res.status >= 400 && ![401, 403, 429].includes(res.status)) fail(`${s.id}: ${s.source.url} answered ${res.status}`);
      } catch (e) {
        fail(`${s.id}: ${s.source.url} did not answer (${e.message})`);
      }
    })
  );
}

if (problems.length) {
  console.error(`Not published. ${problems.length} problem(s):\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}

const issue = {
  date,
  ...(update ? { update } : {}),
  stories: stories.map(({ id, topic, headline, summary, forBusiness, source, continues }) => ({
    id,
    topic,
    headline: headline.trim(),
    summary: summary.trim(),
    forBusiness: forBusiness.trim(),
    source: { name: source.name, url: source.url },
    ...(continues ? { continues } : {}),
  })),
};
writeFileSync(join(ISSUES, `${date}.json`), JSON.stringify(issue, null, 2) + "\n");
console.log(`Published news/issues/${date}.json with ${issue.stories.length} stories.`);
