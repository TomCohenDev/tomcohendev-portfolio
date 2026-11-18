#!/usr/bin/env node
// Renders the "recorded" clips for the teach-site post: every clip is an HTML page (CSS, SVG, three.js) that
// draws the state for a given time. We step the time frame by frame in headless Chromium, screenshot each
// frame, and pipe the frames into ffmpeg. Nothing is screen-recorded; it only looks that way.
//
//   node drafts/blog/assets/teach-site/generate.mjs [clip-name ...] [--lang he|en] [--fps 30]
//
// Needs (not project dependencies): playwright-core and ffmpeg-static, resolvable from RENDER_DEPS
// (a folder with node_modules), plus a Chromium binary in CHROME (headless shell is fine).
// Output: public/blog/teach-site/<clip>-<lang>.mp4 and <clip>-<lang>.webp (poster).
import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = resolve(here, "../../../../public/blog/teach-site");
const deps = createRequire(join(process.env.RENDER_DEPS ?? here, "noop.js"));
const { chromium } = deps("playwright-core");
const ffmpeg = deps("ffmpeg-static");

const CLIPS = ["01-brief", "02-press", "03-engine", "04-print", "05-deploy"];
const argv = process.argv.slice(2);
const flag = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const fps = Number(flag("--fps", 30));
const langs = flag("--lang") ? [flag("--lang")] : ["en", "he"];
const only = argv.filter((a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--"));
const clips = only.length ? CLIPS.filter((c) => only.includes(c)) : CLIPS;

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
const server = createServer((req, res) => {
  const file = join(here, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!file.startsWith(here) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--force-color-profile=srgb"],
});

function encoder(file) {
  const p = spawn(ffmpeg, [
    "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
    "-vf", "scale=1280:720:flags=lanczos", "-movflags", "+faststart", "-an", file,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((ok, fail) => p.on("close", (c) => (c === 0 ? ok() : fail(new Error(`ffmpeg ${c}`)))));
  return { write: (buf) => new Promise((r) => (p.stdin.write(buf) ? r() : p.stdin.once("drain", r))), end: () => (p.stdin.end(), done) };
}

for (const name of clips) {
  for (const lang of langs) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
    page.on("pageerror", (e) => console.error(`[${name}/${lang}]`, e.message));
    await page.goto(`${base}/${name}.html?lang=${lang}`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.clipReady !== undefined);
    await page.evaluate(() => window.clipReady);
    const { duration, poster } = await page.evaluate(() => ({ duration: window.clipDuration, poster: window.clipPoster }));
    const mp4 = join(out, `${name}-${lang}.mp4`);
    const enc = encoder(mp4);
    const frames = Math.round(duration * fps);
    for (let f = 0; f < frames; f++) {
      await page.evaluate((t) => window.seek(t), f / fps);
      await enc.write(await page.screenshot({ type: "png" }));
    }
    await enc.end();
    await page.evaluate((t) => window.seek(t), poster);
    const png = await page.screenshot({ type: "png" });
    await new Promise((ok, fail) => {
      const p = spawn(ffmpeg, ["-y", "-loglevel", "error", "-f", "png_pipe", "-i", "-", "-c:v", "libwebp", "-quality", "82", join(out, `${name}-${lang}.webp`)]);
      p.on("close", (c) => (c === 0 ? ok() : fail(new Error(`webp ${c}`))));
      p.stdin.end(png);
    });
    console.log(`${name}-${lang}: ${frames} frames, ${(statSync(mp4).size / 1024).toFixed(0)} KB`);
    await page.close();
  }
}
// Covers: cover.html composes two clip frames; one still per language at 1600x840.
if (!only.length || only.includes("cover")) {
  for (const lang of langs) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 840 }, deviceScaleFactor: 1 });
    await page.goto(`${base}/cover.html?lang=${lang}`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.clipReady !== undefined);
    await page.evaluate(() => window.clipReady);
    const png = await page.screenshot({ type: "png" });
    const file = resolve(out, "..", `teach-site-cover${lang === "he" ? "" : "-en"}.webp`);
    await new Promise((ok, fail) => {
      const p = spawn(ffmpeg, ["-y", "-loglevel", "error", "-f", "png_pipe", "-i", "-", "-c:v", "libwebp", "-quality", "84", file]);
      p.on("close", (c) => (c === 0 ? ok() : fail(new Error(`webp ${c}`))));
      p.stdin.end(png);
    });
    console.log(`cover-${lang}: ${file}`);
    await page.close();
  }
}

await browser.close();
server.close();
