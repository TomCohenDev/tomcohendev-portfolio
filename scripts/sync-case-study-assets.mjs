#!/usr/bin/env node
/**
 * Syncs case study assets from case_studies/<name>/assets/ to public/case_studies/<name>/assets/
 * so they are included in the Vite build and work in production.
 */
import { cpSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const caseStudiesDir = join(root, "case_studies");
const publicDir = join(root, "public", "case_studies");

if (!existsSync(caseStudiesDir)) process.exit(0);

const names = readdirSync(caseStudiesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const name of names) {
  const srcAssets = join(caseStudiesDir, name, "assets");
  if (!existsSync(srcAssets)) continue;
  const destDir = join(publicDir, name, "assets");
  mkdirSync(destDir, { recursive: true });
  cpSync(srcAssets, destDir, { recursive: true });
  console.log(`Synced case_studies/${name}/assets → public/case_studies/${name}/assets`);
}
