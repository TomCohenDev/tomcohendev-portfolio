#!/usr/bin/env node
/**
 * Waits for the Cloudflare Workers Builds check of a commit (it reports to GitHub as a check run named
 * "Workers Builds: <worker>") and prints its preview link, if it has one, as `url` for GitHub Actions.
 *
 *   GH_TOKEN=... node scripts/wait-for-cloudflare-build.mjs <commit sha> [--optional]
 *
 * Fails when the build fails, or when no build shows up within 15 minutes. With --optional, a missing
 * build is only a notice: branch previews can be switched off in the Cloudflare dashboard.
 */
import { appendFileSync } from "node:fs";

const [sha, flag] = process.argv.slice(2);
const repo = process.env.GITHUB_REPOSITORY || "TomCohenDev/tomcohendev-portfolio";
const optional = flag === "--optional";
const deadline = Date.now() + 15 * 60_000;

const checkRun = async () => {
  const res = await fetch(`https://api.github.com/repos/${repo}/commits/${sha}/check-runs?per_page=100`, {
    headers: { authorization: `Bearer ${process.env.GH_TOKEN}`, accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const { check_runs } = await res.json();
  return check_runs.find((run) => run.name.startsWith("Workers Builds"));
};

let run;
while (Date.now() < deadline) {
  run = await checkRun();
  if (run?.status === "completed") break;
  console.log(run ? `Workers Builds: ${run.status}…` : "Waiting for Workers Builds to start…");
  await new Promise((r) => setTimeout(r, 20_000));
}

if (!run || run.status !== "completed") {
  const msg = run ? "Workers Builds did not finish within 15 minutes." : "No Workers Builds check appeared within 15 minutes.";
  if (optional && !run) {
    console.log(`::notice::${msg} Skipping the preview check.`);
    process.exit(0);
  }
  console.error(`::error::${msg}`);
  process.exit(1);
}
if (run.conclusion !== "success") {
  console.error(`::error::Workers Builds ${run.conclusion}: ${run.details_url}`);
  process.exit(1);
}

const url = `${run.output?.summary ?? ""} ${run.output?.text ?? ""}`.match(/https:\/\/[^\s)\]]+\.workers\.dev/)?.[0] ?? "";
console.log(`Workers Builds succeeded: ${run.details_url}${url ? `\nPreview: ${url}` : ""}`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `url=${url}\n`);
