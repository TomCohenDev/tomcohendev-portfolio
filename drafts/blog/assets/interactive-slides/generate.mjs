#!/usr/bin/env node
// Renders the how-to clips for the interactive-slides post. Same method as ../teach-site/generate.mjs:
// every clip is an HTML page that draws the state for a given time; we step the time frame by frame in
// headless Chromium, screenshot each frame, and pipe the frames into ffmpeg. Nothing is screen-recorded.
//
//   node drafts/blog/assets/interactive-slides/generate.mjs [clip-name ...] [--lang he|en] [--fps 30]
//
// Needs playwright-core (resolved from RENDER_DEPS, or from this repo's node_modules), a Chromium binary
// in CHROME (a headless shell is fine; optional if playwright finds its own), and ffmpeg on PATH or in FFMPEG.
// Output: public/blog/interactive-slides/<clip>-<lang>.mp4 and .webp (poster), and the covers in public/blog/.
import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const repo = resolve(here, "../../../..");
const out = join(repo, "public/blog/interactive-slides");
const deps = createRequire(join(process.env.RENDER_DEPS ?? repo, "noop.js"));
const { chromium } = deps("playwright-core");
const ffmpeg = process.env.FFMPEG ?? "ffmpeg";

const CLIPS = ["01-start", "02-trace", "03-python", "04-phone", "05-organize"];
const argv = process.argv.slice(2);
const flag = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const fps = Number(flag("--fps", 30));
const langs = flag("--lang") ? [flag("--lang")] : ["he", "en"];
const only = argv.filter((a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--"));
const clips = only.length ? CLIPS.filter((c) => only.includes(c)) : CLIPS;

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp" };
const server = createServer((req, res) => {
  // /out/... serves the rendered posters, so the cover can be composed from real frames.
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const root = path.startsWith("/out/") ? out : here;
  const file = join(root, path.startsWith("/out/") ? path.slice(5) : path);
  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
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

function run(args, input) {
  return new Promise((ok, fail) => {
    const p = spawn(ffmpeg, args, { stdio: ["pipe", "inherit", "inherit"] });
    p.on("close", (c) => (c === 0 ? ok() : fail(new Error(`ffmpeg ${c}`))));
    if (input) p.stdin.end(input);
  });
}

function encoder(file) {
  const p = spawn(ffmpeg, [
    "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
    "-vf", "scale=1280:720:flags=lanczos", "-movflags", "+faststart", "-an", file,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((ok, fail) => p.on("close", (c) => (c === 0 ? ok() : fail(new Error(`ffmpeg ${c}`)))));
  return { write: (buf) => new Promise((r) => (p.stdin.write(buf) ? r() : p.stdin.once("drain", r))), end: () => (p.stdin.end(), done) };
}

async function open(path, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => console.error(`[${path}]`, e.message));
  await page.goto(`${base}/${path}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.clipReady !== undefined);
  await page.evaluate(() => window.clipReady);
  return page;
}

for (const name of clips) {
  for (const lang of langs) {
    const page = await open(`${name}.html?lang=${lang}`, 1280, 720);
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
    await run(["-y", "-loglevel", "error", "-f", "png_pipe", "-i", "-", "-c:v", "libwebp", "-quality", "82", join(out, `${name}-${lang}.webp`)], await page.screenshot({ type: "png" }));
    console.log(`${name}-${lang}: ${frames} frames, ${(statSync(mp4).size / 1024).toFixed(0)} KB`);
    await page.close();
  }
}

if (!only.length || only.includes("cover")) {
  for (const lang of langs) {
    const page = await open(`cover.html?lang=${lang}`, 1600, 840);
    const file = join(repo, "public/blog", `interactive-slides-cover${lang === "he" ? "" : "-en"}.webp`);
    await run(["-y", "-loglevel", "error", "-f", "png_pipe", "-i", "-", "-c:v", "libwebp", "-quality", "84", file], await page.screenshot({ type: "png" }));
    console.log(`cover-${lang}: ${file}`);
    await page.close();
  }
}

await browser.close();
server.close();
