---
title: "About | Tom Cohen, full-stack developer, AI and automation"
heading: "Tom Cohen: end-to-end products, built with AI agents and shipped through clean deploys"
description: "What I have built, how I work with AI agents, the CI/CD I build for mobile, web and servers, and my open-source contributions."
lang: en
path: /about-en
translation: /about
layout: ../layouts/ProfileLayout.astro
---

I'm a full-stack developer, founder and lecturer, and I've been building digital products end to end for five years:
iPhone and Android apps, web systems, back ends, automation and AI systems. I take an idea from the first conversation
to live in production and in the app stores, and then I keep maintaining and improving it.

Two things define how I work today:

1. **I work with AI agents as a team, not as autocomplete.** I plan the work, split it across agents, check what comes
   back and decide what ships. That's how a whole working product can be built in a day or two.
2. **Every project ships through a clean, automated pipeline.** Merging is releasing, every change has a preview, and
   nothing reaches users without checks.

## Products I built myself

**[MathbookLM](https://mathbooklm.com)** is a handwriting-first math notebook. You write by hand on an infinite canvas
and lasso a region. It recognizes the handwriting, solves or checks it with SymPy running in the browser, and writes
the result back onto the canvas. The model only reasons and orchestrates; the arithmetic is always deterministic. It
has LLM-built interactive simulations, a paid tier and a pilot program for tutors.
- Stack: React and TypeScript, my Excalidraw fork, Pyodide, a Bun and Hono server, Gemini with tool calling and SSE,
  handwriting recognition (MyScript and my own OCR service), Supabase, Lemon Squeezy.

**Gomlin Jobs** is a swipe-to-apply job app, on the
[App Store](https://apps.apple.com/us/app/gomlin-jobs/id6744745540) and
[Google Play](https://play.google.com/store/apps/details?id=com.gomlinjobs.gomlin). I built the whole system alone:
- the Flutter app;
- a FastAPI server;
- scrapers that collect jobs from about 46 sources and classify each one with AI;
- Playwright-based applications to common applicant tracking systems;
- an email relay that forwards recruiter replies to the user's real inbox.

A Supabase table of capabilities per source lets me switch an application source on or off without an app release.

**Locket AI** is an on-device AI app with no cloud at all:
- chat with Gemma;
- image understanding with FastVLM, through a Kotlin bridge to LiteRT-LM on Android and Swift with MLX on iOS;
- image generation with stable-diffusion.cpp through C++ and FFI on Vulkan.

A memory-aware orchestration layer swaps between the models, so the app runs on low-end phones.

**nykma** is a local ad and video maker. An agent pitches an idea, builds the video in code with a render engine I
wrote, and returns MP4s and copy for each platform. Nothing is published without my approval.
[I wrote about it here](/blog/nykma-en).

**agents.tomcohen.dev** is a workflow platform where agents are steps: like n8n, but you edit workflows by asking an
agent.
- Each workflow is a folder of plain files.
- Code steps are free. Agent steps run as T3 Code sessions on my server, using the cheapest model that fits each step.
- Every outward action waits for my approval in the app and has an idempotency key and a daily cap.

## How I work with AI agents

An agent can write good code, but the real value comes from the environment around it:
- **Harness:** the files, tools, instructions and permissions the agent works with.
- **Orchestration:** how the work is split, who reviews whom, and what counts as done.

I go deeper on this in [my article on T3 Code and Kitshn](/blog/t3-kitshn-en).

A normal day looks like this:

1. A lead agent gets the outcome and the constraints.
2. It delegates bounded tasks to subagents: research, implementation, independent review. Every agent that touches
   code works in its own git worktree.
3. Findings come back and disagreements between agents are resolved.
4. Everything is checked against real behaviour: a diff, a test run, a reproducible result.
5. Waiting is automated: pull-request monitoring wakes the agent when CI or review feedback arrives.

I build and maintain the tooling for this myself:
- **My T3 Code fork.** It can continue a thread from another machine even while the original machine is off, back up
  threads to a peer machine, and update its Android app by itself. It also has voice dictation.
- **Helix.** A creative studio with eight sub-agents, using model routing: Opus-class models for brand analysis,
  Sonnet-class for copy and scenes, Haiku-class for schema repair. It has a spend gate, provenance on every asset,
  and an isolated renderer with no network and no secrets.
- **nykma, which followed Helix.** I measured that "one agent, a short prompt and a box of reusable parts" beat an
  eight-agent pipeline, and documented why. It has prompt evals: 14 fixed briefs, frozen prompt versions and blind
  comparison of cost and quality.
- **Agents inside products:**
  - a demo-site builder that screenshots each site on four devices and fixes what's wrong;
  - agents that write, publish and live-check a news issue every morning;
  - a marketing agent that drafts ads for approval.
- **MCP servers** that give agents structured access to data: a
  [vulnerability registry](https://github.com/TomCohenDev/vulnerability-registry-mcp) and Gomlin's usage analytics.

**How much time it saves, according to the commit history:**
- A full lead-generation system with a dashboard was built in one day.
- The workflow platform was built in one day.
- A teaching site with tests and Google Classroom connectors was built in one day.
- A scraping service with an API, a dashboard and backups, which replaced an old n8n workflow, took two days.
- Helix reached 342 commits in 12 days.

**My rules:**
- Anything outward-facing (a post, an email, publishing, spending money) waits for human approval.
- Credentials stay out of the agent's reach.
- External text is data, not instructions.
- Every action has a cap.
- Nothing counts as done until it's verified.

## CI/CD: merging is releasing

I design the release pipeline of everything I ship. The goal is always the same: nobody deploys by hand, every change
can be seen before it goes live, and a broken change never reaches users quietly.

### Mobile
- **Gomlin on Codemagic:**
  - The staging branch goes to TestFlight and Google Play Internal; main goes to the stores.
  - Build numbers bump themselves, and signing comes from CI secrets.
  - There are dev, staging and prod flavors, and store builds are obfuscated.
- **tick3d iOS on GitHub Actions:**
  - CI generates the Xcode project, archives it, signs it with an App Store Connect key and uploads it to TestFlight.
  - Every build is distributed to external testers automatically through the App Store Connect API. The script is
    idempotent, so a re-run never double-submits.
  - Every pull request lints the iOS pipeline itself, so a broken release pipeline fails in review, not on release
    day.
- **My T3 Code fork:**
  - A signed Android APK is built in CI and updates itself.
  - Desktop apps get nightly builds.

### Web
- **Cloudflare Workers and Pages** for almost all my sites. Every push to main goes live, and every pull request gets
  a preview link.
- **Verified deploys:**
  - For MathbookLM, the pipeline waits until the live site serves the new commit in `/version.json`. "Deployed" means
    users actually see it.
  - On this site, every change passes lint, type checks, a build and a site check, and a separate workflow checks the
    live site after each deploy.
- **Firebase Hosting** with a preview channel for every pull request.
- **OpenNext on Workers** for Next.js sites with Sanity CMS.

### Servers and VPS
- **GHCR and SSH:**
  - Each push runs the tests, builds a Docker image and pushes it to GHCR.
  - The server pulls the image and restarts with Docker Compose.
  - The server's SSH host key is pinned, and staging and production run separately behind nginx.
- **Kitshn on my own server:**
  - Deploys come from GitHub Actions with OIDC, so no deploy keys are stored.
  - Docker runs rootless, and health checks make sure traffic only reaches a healthy app.
  - A repo's first deploy needs my approval.
  - Data is backed up daily, and every private app sits behind Cloudflare Access.
- **Safe restarts:** one deploy script refuses to restart while a job is running, and interrupted jobs resume on
  startup.
- **Security scans in CI:** Dependabot, pip-audit, Trivy and OSV.

### A fork that maintains itself
- In T3 Code, a scheduled workflow merges upstream every three hours.
- When the merge conflicts or tests fail, it opens an issue and calls a repair agent running on my server.
- The agent opens a pull request with the fix and merges it only once CI passes.

## Open source and collaboration

### Kitshn
[Kitshn](https://github.com/Yarden-zamir/kitshn) is Yarden Zamir's project for deploying apps from GitHub to
Cloudflare and to your own machines, with a map that decides who can open each app.
- I run my own instance and deploy my apps through it.
- In my fork, [TomCohenDev/kitshn](https://github.com/TomCohenDev/kitshn), I contributed about 28 commits:
  - the map UI: a flat look, light and dark modes, and a demo map of a small company;
  - the kitshn.com site: home, enterprise, How it works and install;
  - an explainer video made with Remotion and ElevenLabs.
- I use it every day with agents: an agent proposes a map change, I approve it, and the agent deploys.

### tick3d
[tick3d](https://github.com/Yarden-zamir/tick3d) is Yarden Zamir's 3D tic-tac-toe on a 4×4×4 cube. My contributions:
- a neo-brutalist UI with 12 themes;
- drag to turn the tower;
- real-time chat between players;
- an iOS app as a Capacitor shell, built and uploaded to TestFlight by CI with automatic tester distribution;
- "tick3d Factory" (in progress), which scans the repo and renders it as an animated 3D factory: imports are belts,
  HTTP calls are pneumatic tubes, and deploys are trains.

### More
- [My T3 Code fork](https://github.com/TomCohenDev/t3code): 74 commits and 25 merged pull requests.
- [Vulnerability registry MCP server](https://github.com/TomCohenDev/vulnerability-registry-mcp): turns a legacy
  plain-text registry into structured tools for Claude.

## Client work

- **AI-powered virtual fitting app** (2022 to now, technical lead):
  - Flutter and Google ML Kit for real-time body-measurement analysis.
  - A BLoC architecture that cut instability by about 50%.
  - CI/CD that shortened time to market by about 40%.
  - A/B tests on the onboarding flows.
- **[Dronebag](/en/case-studies/dronebag)**: drone fleet management for field units, offline-first with sync.
- **[Yellow Candle](/en/case-studies/yellow-candle)**: a Holocaust remembrance app for FJMC. I saved it from removal
  from the stores and updated it to current store requirements.
- **[Nightwing](/en/case-studies/nightwing)**: a bilingual ordering site for a restaurant, with n8n numbering each
  order, logging it to a sheet and sending it to the kitchen on Telegram.
- **ITA**: a teaching assistant that sends a screenshot to GPT-5 and draws the answer on the screen, using WPF, React,
  n8n and Supabase.
- **LuxCal and Spidclass**: Flutter apps with scheduled cloud functions, and attendance and payment tracking.
- **Websites**: video-heavy portfolios with a CMS, bilingual business sites, and templates for coaches' sites.

## Teaching and writing

I lecture on programming and engineering, supervise final-year projects, and build and teach practical AI and
automation courses. I write a [blog](/blog) on AI security and agent tooling, and publish a daily
[Hebrew tech news issue](/news) put together by an agent.

## Tools

- **Languages:** TypeScript, Python, Dart, SQL, C#, C++, Kotlin, Swift, Bash.
- **Mobile:** Flutter (BLoC, GetX), Firebase, Supabase, in-app purchases, Codemagic, TestFlight, Capacitor.
- **Web:** React, Next.js, Astro, Vite, Tailwind, three.js.
- **Back end:** FastAPI, Flask, Fastify, Hono, Bun, Node.
- **Data:** Postgres and Supabase (RLS), pgvector, SQLite, Firestore.
- **AI:** OpenAI, Gemini, Claude (SDK, Agent SDK, Claude Code), MCP, RAG, evals and benchmarks, on-device models,
  ElevenLabs, Whisper.
- **Automation:** n8n, Playwright, Telegram and WhatsApp bots, cron, webhooks.
- **Infrastructure:** Docker, GitHub Actions, GHCR, Cloudflare (Workers, Pages, D1, Access, Tunnel), nginx, Kitshn,
  T3 Code.

## Let's talk

Want to build something, or see how I'd fit on your team? Write to
[contact@tomcohen.dev](mailto:contact@tomcohen.dev) or find me on
[LinkedIn](https://www.linkedin.com/in/tom-cohen-07778585/). My code is on [GitHub](https://github.com/TomCohenDev).
