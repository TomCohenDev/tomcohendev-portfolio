/**
 * Content of the about pages (/about in Hebrew, /about-en in English). Strings may use two bits of inline markup:
 * [text](url) for links and **text** for emphasis. AboutPage.astro renders them; nothing else is interpreted.
 */
export type Lang = "he" | "en";

export type SketchKey = "mathbook" | "gomlin" | "locket" | "nykma" | "agents";

export interface Product {
  name: string;
  href?: string;
  sketch: SketchKey;
  summary: string;
  points: string[];
  stack?: string[];
  links?: { label: string; href: string }[];
}

export interface Client {
  name: string;
  href?: string;
  image?: { src: string; alt: string };
  role?: string;
  points: string[];
}

export interface AboutCopy {
  meta: { title: string; heading: string; description: string; path: string; translation: string };
  nav: { home: string; homeHref: string; other: string };
  hero: {
    hello: string;
    intro: string;
    doodleAlt: string;
    principles: { title: string; body: string }[];
    contact: string;
  };
  products: { heading: string; lead: string; items: Product[]; stackLabel: string };
  agents: {
    heading: string;
    lead: string;
    dayHeading: string;
    day: string[];
    toolsHeading: string;
    tools: { name: string; body: string; sub?: string[] }[];
    timeHeading: string;
    timeNote: string;
    days: { label: string; days: number; extra?: string }[];
    dayUnit: (n: number) => string;
    rulesHeading: string;
    rules: string[];
  };
  cicd: {
    heading: string;
    lead: string;
    pipeline: string[];
    pipelineNote: string;
    lanes: { name: string; items: { title: string; points: string[] }[] }[];
    fork: { heading: string; steps: string[] };
  };
  oss: {
    heading: string;
    lead: string;
    projects: { name: string; href: string; by: string; body: string; points: string[] }[];
    moreHeading: string;
    more: string[];
  };
  clients: { heading: string; lead: string; featured: Client[]; others: Client[] };
  teaching: { heading: string; body: string };
  tools: { heading: string; groups: { name: string; items: string[] }[] };
  cta: { heading: string; body: string; email: string; linkedin: string; github: string };
}

const EMAIL = "contact@tomcohen.dev";
const LINKEDIN = "https://www.linkedin.com/in/tom-cohen-07778585/";
const GITHUB = "https://github.com/TomCohenDev";
export const CONTACT_LINKS = { email: `mailto:${EMAIL}`, linkedin: LINKEDIN, github: GITHUB };

const TOOL_GROUPS = (l: Record<string, string>) => [
  { name: l.languages, items: ["TypeScript", "Python", "Dart", "SQL", "C#", "C++", "Kotlin", "Swift", "Bash"] },
  { name: l.mobile, items: ["Flutter (BLoC, GetX)", "Firebase", "Supabase", l.iap, "Codemagic", "TestFlight", "Capacitor"] },
  { name: l.web, items: ["React", "Next.js", "Astro", "Vite", "Tailwind", "three.js"] },
  { name: l.backend, items: ["FastAPI", "Flask", "Fastify", "Hono", "Bun", "Node"] },
  { name: l.data, items: ["Postgres", "Supabase (RLS)", "pgvector", "SQLite", "Firestore"] },
  { name: "AI", items: ["OpenAI", "Gemini", "Claude (SDK, Agent SDK, Claude Code)", "MCP", "RAG", l.evals, l.ondevice, "ElevenLabs", "Whisper"] },
  { name: l.automation, items: ["n8n", "Playwright", l.bots, "cron", "webhooks"] },
  { name: l.infra, items: ["Docker", "GitHub Actions", "GHCR", "Cloudflare (Workers, Pages, D1, Access, Tunnel)", "nginx", "Kitshn", "T3 Code"] },
];

const MATHBOOK_STACK = ["React", "TypeScript", "Excalidraw fork", "Pyodide + SymPy", "Bun + Hono", "Gemini", "MyScript + OCR", "Supabase", "Lemon Squeezy"];

export const ABOUT: Record<Lang, AboutCopy> = {
  en: {
    meta: {
      title: "About | Tom Cohen, full-stack developer, AI and automation",
      heading: "I design, build and ship complete software products: mobile apps, web platforms, back ends and AI systems.",
      description: "Tom Cohen, full-stack developer: the products I have built, how I develop with AI agents, the CI/CD pipelines I run for mobile, web and servers, and my open-source work.",
      path: "/about-en",
      translation: "/about",
    },
    nav: { home: "Home (Hebrew)", homeHref: "/", other: "לקריאה בעברית" },
    hero: {
      hello: "Tom Cohen, full-stack developer",
      intro: "Founder and lecturer with five years of end-to-end product development. I take products from the initial requirements to production, the App Store and Google Play, and stay on to maintain and extend them. I develop with a team of AI agents and automated release pipelines, which lets me deliver complete, tested products quickly.",
      doodleAlt: "Illustration of Tom Cohen waving",
      principles: [
        { title: "Development with AI agents", body: "I plan the work, distribute it across specialised agents, review their output and own every release decision. With this setup, a complete working product can be built in one to two days." },
        { title: "Automated, verified releases", body: "Every project ships through CI/CD: merging is releasing, every change gets a preview, and nothing reaches users before the automated checks pass." },
      ],
      contact: "Contact me",
    },
    products: {
      heading: "Products",
      lead: "Five products I designed and built on my own, from architecture to launch.",
      stackLabel: "Stack",
      items: [
        {
          name: "MathbookLM", href: "https://mathbooklm.com", sketch: "mathbook",
          summary: "A handwriting-based math notebook. Users write on an infinite canvas and select a region; the system recognises the handwriting, solves or verifies it with SymPy running in the browser, and writes the result back onto the canvas.",
          points: ["Reliable results: the language model handles reasoning and orchestration, while all arithmetic is computed deterministically.", "Interactive simulations generated by the model.", "A paid subscription tier and a pilot program for tutors."],
          stack: MATHBOOK_STACK,
          links: [{ label: "mathbooklm.com", href: "https://mathbooklm.com" }],
        },
        {
          name: "Gomlin Jobs", sketch: "gomlin",
          summary: "A swipe-to-apply job search app, available on the App Store and Google Play. I designed and built the entire system on my own.",
          points: ["A Flutter mobile app backed by a FastAPI server.", "Scrapers that collect listings from about 46 sources and classify each one with AI.", "Automated applications to common applicant tracking systems, using Playwright.", "An email relay that forwards recruiter replies to each user's own inbox.", "Per-source capability flags in Supabase, so application sources can be enabled or disabled without an app release."],
          links: [{ label: "App Store", href: "https://apps.apple.com/us/app/gomlin-jobs/id6744745540" }, { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.gomlinjobs.gomlin" }],
        },
        {
          name: "Locket AI", sketch: "locket",
          summary: "A mobile AI app that runs entirely on the device, with no cloud dependency.",
          points: ["Chat powered by Gemma.", "Image understanding with FastVLM, through a Kotlin bridge to LiteRT-LM on Android and Swift with MLX on iOS.", "Image generation with stable-diffusion.cpp, through C++ and FFI on Vulkan.", "A memory-aware orchestration layer that swaps models, so the app runs on low-end devices."],
        },
        {
          name: "nykma", sketch: "nykma",
          summary: "A local tool for producing ads and videos. An agent proposes a concept, builds the video in code with a rendering engine I wrote, and delivers MP4 files and copy for each platform.",
          points: ["Nothing is published without my approval."],
          links: [{ label: "Read the write-up", href: "/blog/nykma-en" }],
        },
        {
          name: "agents.tomcohen.dev", sketch: "agents",
          summary: "A workflow automation platform in which AI agents act as workflow steps. Similar to n8n, except that workflows are edited by instructing an agent.",
          points: ["Each workflow is stored as a folder of plain files.", "Code steps run at no cost; agent steps run as T3 Code sessions on my server, using the most cost-effective model for each step.", "Every external action requires my approval and is protected by an idempotency key and a daily limit."],
        },
      ],
    },
    agents: {
      heading: "How I work with AI agents",
      lead: "The quality of an agent's output depends on the environment it works in. I focus on two parts of that environment: the **harness**, meaning the files, tools, instructions and permissions an agent can use, and **orchestration**, meaning how work is divided, who reviews whom and what counts as finished. I cover this in more depth in [my article on T3 Code and Kitshn](/blog/t3-kitshn-en).",
      dayHeading: "A typical workflow",
      day: [
        "A lead agent receives the goal and the constraints.",
        "It delegates well-defined tasks to sub-agents for research, implementation and independent review. Each agent that changes code works in its own git worktree.",
        "Results return to the lead agent, and disagreements between agents are resolved.",
        "All work is verified against real behaviour: a diff, a test run or a reproducible result.",
        "Waiting is automated: pull-request monitoring resumes the agent when CI results or review comments arrive.",
      ],
      toolsHeading: "Tooling I build and maintain",
      tools: [
        { name: "My T3 Code fork", body: "Continues a conversation from another machine even when the original machine is off, backs up conversations to a second machine, updates its Android app automatically, and supports voice dictation." },
        { name: "Helix", body: "A creative production studio with eight sub-agents and model routing: Opus-class models for brand analysis, Sonnet-class for copy and scenes, Haiku-class for schema repair. It includes a spending gate, provenance for every asset, and an isolated renderer with no network access and no secrets." },
        { name: "nykma, Helix's successor", body: "A measured comparison showed that a single agent with a short prompt and a library of reusable components outperformed the eight-agent pipeline, and the findings are documented. It includes prompt evaluations: 14 fixed briefs, frozen prompt versions and blind comparison of cost and quality." },
        { name: "Agents inside products", body: "Running in production:", sub: ["a demo-site builder that captures each site on four devices and fixes the issues it finds;", "agents that write, publish and verify a news issue every morning;", "a marketing agent that prepares ads for approval."] },
        { name: "MCP servers", body: "Give agents structured access to data: a [vulnerability registry](https://github.com/TomCohenDev/vulnerability-registry-mcp) and Gomlin's usage analytics." },
      ],
      timeHeading: "Delivery times",
      timeNote: "Measured from the commit history. Each square represents one day.",
      days: [
        { label: "Lead-generation system with a dashboard", days: 1 },
        { label: "Workflow automation platform", days: 1 },
        { label: "Teaching site with tests and Google Classroom integration", days: 1 },
        { label: "Scraping service with an API, a dashboard and backups, replacing a legacy n8n workflow", days: 2 },
        { label: "Helix", days: 12, extra: "342 commits" },
      ],
      dayUnit: (n) => (n === 1 ? "1 day" : `${n} days`),
      rulesHeading: "Operating principles",
      rules: [
        "Any external action (a post, an email, a publication or a payment) requires human approval.",
        "Credentials are never accessible to agents.",
        "External content is treated as data, never as instructions.",
        "Every action has a defined limit.",
        "No task is complete until it has been verified.",
      ],
    },
    cicd: {
      heading: "CI/CD: every merge is a release",
      lead: "I design the release pipeline for every product I ship. Deployments are never manual, every change can be reviewed before it goes live, and a faulty change cannot reach users unnoticed.",
      pipeline: ["push", "checks", "preview", "merge", "live", "verified"],
      pipelineNote: "The same release flow on every project.",
      lanes: [
        {
          name: "Mobile",
          items: [
            { title: "Gomlin on Codemagic", points: ["The staging branch publishes to TestFlight and Google Play Internal; the main branch publishes to the stores.", "Build numbers increment automatically, and signing keys come from CI secrets.", "Separate dev, staging and production flavors, with obfuscated store builds."] },
            { title: "tick3d iOS on GitHub Actions", points: ["CI generates the Xcode project, archives and signs it with an App Store Connect key, and uploads it to TestFlight.", "Each build is distributed to external testers through the App Store Connect API. The script is idempotent, so a re-run never submits twice.", "Every pull request validates the iOS pipeline itself, so pipeline failures surface in review rather than on release day."] },
            { title: "My T3 Code fork", points: ["CI builds a signed Android APK that updates itself.", "Nightly builds for the desktop apps."] },
          ],
        },
        {
          name: "Web",
          items: [
            { title: "Cloudflare Workers and Pages", points: ["Used for most of my sites: every push to main is deployed to production.", "Every pull request gets its own preview URL."] },
            { title: "Verified deployments", points: ["For MathbookLM, the pipeline waits until the live site reports the new commit in `/version.json`, so a deployment counts only once users can see it.", "On this site, every change passes linting, type checks, a build and a site audit, and a separate workflow checks the live site after each deployment."] },
            { title: "Firebase Hosting", points: ["A preview channel for every pull request."] },
            { title: "OpenNext on Workers", points: ["Next.js sites with Sanity CMS, running on Cloudflare Workers."] },
          ],
        },
        {
          name: "Servers",
          items: [
            { title: "GHCR and SSH", points: ["Each push runs the test suite, builds a Docker image and publishes it to GHCR.", "The server pulls the new image and restarts with Docker Compose.", "The server's SSH host key is pinned, and staging and production run separately behind nginx."] },
            { title: "Kitshn on my own server", points: ["Deployments run from GitHub Actions with OIDC, so no deploy keys are stored.", "Rootless Docker, with health checks that route traffic only to healthy instances.", "The first deployment of any repository requires my approval.", "Daily data backups, and every private app sits behind Cloudflare Access."] },
            { title: "Safe restarts", points: ["The deploy script will not restart while a job is running, and interrupted jobs resume when the server starts."] },
            { title: "Security scanning in CI", points: ["Dependabot, pip-audit, Trivy and OSV."] },
          ],
        },
      ],
      fork: {
        heading: "A self-maintaining fork",
        steps: ["A scheduled workflow merges upstream T3 Code changes every three hours.", "If the merge conflicts or tests fail, it opens an issue and triggers a repair agent on my server.", "The agent opens a pull request with the fix and merges it only after CI passes."],
      },
    },
    oss: {
      heading: "Open source",
      lead: "I use both of these projects by Yarden Zamir daily and contribute to them.",
      projects: [
        {
          name: "Kitshn", href: "https://github.com/Yarden-zamir/kitshn", by: "by Yarden Zamir",
          body: "A platform for deploying apps from GitHub to Cloudflare and to your own machines, with an access map that controls who can open each app. I run my own instance and deploy my apps through it. In daily use, an agent proposes a change to the map, I approve it, and the agent deploys.",
          points: ["About 28 commits in [my fork](https://github.com/TomCohenDev/kitshn):", "the map interface: a flat design, light and dark modes, and a demo map of a small company;", "the kitshn.com website: the home, enterprise, How it works and install pages;", "an explainer video produced with Remotion and ElevenLabs."],
        },
        {
          name: "tick3d", href: "https://github.com/Yarden-zamir/tick3d", by: "by Yarden Zamir",
          body: "A 3D tic-tac-toe game played on a 4×4×4 cube. My contributions:",
          points: ["a neo-brutalist interface with 12 themes;", "drag-to-rotate controls for the tower;", "real-time chat between players;", "an iOS app built as a Capacitor shell, with CI that builds it, uploads it to TestFlight and distributes it to testers automatically;", "tick3d Factory (in progress): visualises a repository as an animated 3D factory, where imports are conveyor belts, HTTP calls are pneumatic tubes and deployments are trains."],
        },
      ],
      moreHeading: "Other contributions",
      more: ["[My T3 Code fork](https://github.com/TomCohenDev/t3code): 74 commits and 25 merged pull requests.", "[Vulnerability registry MCP server](https://github.com/TomCohenDev/vulnerability-registry-mcp): converts a legacy plain-text registry into structured tools for Claude."],
    },
    clients: {
      heading: "Client work",
      lead: "Mobile apps, websites and automations built for clients, from the first version to long-term maintenance.",
      featured: [
        { name: "Dronebag", href: "/en/case-studies/dronebag", image: { src: "/case_studies/dronebag/assets/dronebag-home-screen.webp", alt: "Dronebag home screen" }, points: ["Drone fleet management for field units, built offline-first with data sync."] },
        { name: "Yellow Candle", href: "/en/case-studies/yellow-candle", image: { src: "/case_studies/virtual_shoa_candle/assets/mobile-app-candle-lighting.webp", alt: "Yellow Candle candle-lighting screen" }, points: ["A Holocaust remembrance app for FJMC. I prevented its removal from the app stores and brought it up to current store requirements."] },
        { name: "Nightwing", href: "/en/case-studies/nightwing", image: { src: "/case_studies/nightwing-ph/assets/web-app-landing-page-hero.webp", alt: "Nightwing ordering site" }, points: ["A bilingual restaurant ordering site. An n8n workflow numbers each order, logs it to a spreadsheet and sends it to the kitchen via Telegram."] },
      ],
      others: [
        { name: "AI-powered virtual fitting app", role: "Technical lead, 2022 to present", points: ["Real-time body-measurement analysis with Flutter and Google ML Kit.", "A BLoC architecture that reduced instability by about 50%.", "A CI/CD pipeline that shortened time to market by about 40%.", "A/B testing of the onboarding flows."] },
        { name: "ITA", points: ["A teaching assistant that sends a screenshot to GPT-5 and draws the answer directly on screen. Built with WPF, React, n8n and Supabase."] },
        { name: "LuxCal and Spidclass", points: ["Flutter apps with scheduled cloud functions, attendance tracking and payment tracking."] },
        { name: "Websites", points: ["Video-rich portfolios with a CMS, bilingual business websites, and site templates for coaches."] },
      ],
    },
    teaching: {
      heading: "Teaching and writing",
      body: "I lecture on programming and engineering, supervise final-year projects, and develop and teach hands-on courses in AI and automation. I also write a [blog](/blog) on AI security and agent tooling, and publish a daily [Hebrew tech news issue](/news) compiled by an agent.",
    },
    tools: {
      heading: "Technical skills",
      groups: TOOL_GROUPS({ languages: "Languages", mobile: "Mobile", web: "Web", backend: "Back end", data: "Data", automation: "Automation", infra: "Infrastructure", iap: "in-app purchases", evals: "evals and benchmarks", ondevice: "on-device models", bots: "Telegram and WhatsApp bots" }),
    },
    cta: {
      heading: "Get in touch",
      body: "Interested in building a product together, or in how I could contribute to your team? Reach me by email or on LinkedIn.",
      email: EMAIL,
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },

  he: {
    meta: {
      title: "אודות | תום כהן, מפתח Full-stack, AI ואוטומציה",
      heading: "אני מתכנן, בונה ומשיק מוצרי תוכנה שלמים: אפליקציות מובייל, פלטפורמות ווב, צד שרת ומערכות AI.",
      description: "תום כהן, מפתח Full-stack: המוצרים שבניתי, איך אני מפתח עם סוכני AI, צנרות ה־CI/CD שאני מפעיל לאפליקציות, לאתרים ולשרתים, והתרומות שלי לקוד פתוח.",
      path: "/about",
      translation: "/about-en",
    },
    nav: { home: "לעמוד הבית", homeHref: "/", other: "Read in English" },
    hero: {
      hello: "תום כהן, מפתח Full-stack",
      intro: "יזם ומרצה עם חמש שנות ניסיון בפיתוח מוצרים מקצה לקצה. אני מוביל מוצרים מאפיון הדרישות ועד פרודקשן, App Store ו־Google Play, וממשיך לתחזק ולהרחיב אותם. אני מפתח עם צוות של סוכני AI וצנרות שחרור אוטומטיות, וכך מספק מוצרים שלמים ובדוקים בזמן קצר.",
      doodleAlt: "איור של תום כהן מנופף לשלום",
      principles: [
        { title: "פיתוח עם סוכני AI", body: "אני מתכנן את העבודה, מחלק אותה בין סוכנים ייעודיים, בודק את התוצרים ואחראי על כל החלטת שחרור. כך אפשר לבנות מוצר שלם ועובד ביום עד יומיים." },
        { title: "שחרור אוטומטי ובדוק", body: "כל פרויקט עולה לאוויר דרך CI/CD: מיזוג הוא שחרור, לכל שינוי יש תצוגה מקדימה, ושום דבר לא מגיע למשתמשים לפני שהבדיקות האוטומטיות עוברות." },
      ],
      contact: "ליצירת קשר",
    },
    products: {
      heading: "מוצרים",
      lead: "חמישה מוצרים שתכננתי ובניתי בעצמי, מהארכיטקטורה ועד ההשקה.",
      stackLabel: "טכנולוגיות",
      items: [
        {
          name: "MathbookLM", href: "https://mathbooklm.com", sketch: "mathbook",
          summary: "מחברת מתמטיקה מבוססת כתב יד. המשתמש כותב על קנבס אינסופי ומסמן אזור, והמערכת מזהה את הכתב, פותרת או בודקת אותו עם SymPy שרץ בדפדפן, וכותבת את התוצאה בחזרה על הקנבס.",
          points: ["תוצאות אמינות: מודל השפה אחראי על ההסקה והתזמור, וכל החישובים מתבצעים באופן דטרמיניסטי.", "סימולציות אינטראקטיביות שהמודל מייצר.", "מסלול מנוי בתשלום ותוכנית פיילוט למורים."],
          stack: MATHBOOK_STACK,
          links: [{ label: "mathbooklm.com", href: "https://mathbooklm.com" }],
        },
        {
          name: "Gomlin Jobs", sketch: "gomlin",
          summary: "אפליקציית חיפוש עבודה בהחלקה, זמינה ב־App Store וב־Google Play. תכננתי ובניתי את המערכת כולה בעצמי.",
          points: ["אפליקציית Flutter מול שרת FastAPI.", "סורקים שאוספים משרות מכ־46 מקורות ומסווגים כל משרה עם AI.", "הגשת מועמדות אוטומטית למערכות גיוס נפוצות באמצעות Playwright.", "ממסר מיילים שמעביר תשובות של מגייסים לתיבת הדואר של המשתמש.", "דגלי יכולות לכל מקור ב־Supabase, שמאפשרים להפעיל או להשבית מקורות הגשה בלי לשחרר גרסה."],
          links: [{ label: "App Store", href: "https://apps.apple.com/us/app/gomlin-jobs/id6744745540" }, { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.gomlinjobs.gomlin" }],
        },
        {
          name: "Locket AI", sketch: "locket",
          summary: "אפליקציית AI לנייד שרצה כולה על המכשיר, ללא תלות בענן.",
          points: ["צ'אט מבוסס Gemma.", "ניתוח תמונות עם FastVLM, דרך גשר Kotlin ל־LiteRT-LM באנדרואיד ו־Swift עם MLX ב־iOS.", "יצירת תמונות עם stable-diffusion.cpp, דרך C++ ו־FFI על Vulkan.", "שכבת תזמור שמודעת לזיכרון ומחליפה בין מודלים, כך שהאפליקציה רצה גם על מכשירים חלשים."],
        },
        {
          name: "nykma", sketch: "nykma",
          summary: "כלי מקומי להפקת מודעות וסרטונים. סוכן מציע קונספט, בונה את הסרטון בקוד עם מנוע רינדור שפיתחתי, ומספק קבצי MP4 וטקסטים לכל פלטפורמה.",
          points: ["שום דבר לא מתפרסם ללא אישור שלי."],
          links: [{ label: "למאמר המלא", href: "/blog/nykma" }],
        },
        {
          name: "agents.tomcohen.dev", sketch: "agents",
          summary: "פלטפורמת אוטומציה שבה סוכני AI משמשים כשלבים בתהליך. בדומה ל־n8n, אבל עריכת התהליכים נעשית באמצעות הנחיה לסוכן.",
          points: ["כל Workflow נשמר כתיקייה של קבצים פשוטים.", "שלבי קוד רצים ללא עלות; שלבי סוכן רצים כסשנים של T3 Code על השרת שלי, עם המודל המשתלם ביותר לכל שלב.", "כל פעולה חיצונית דורשת את האישור שלי, ומוגנת במפתח אידמפוטנטיות ובמגבלה יומית."],
        },
      ],
    },
    agents: {
      heading: "איך אני עובד עם סוכני AI",
      lead: "איכות העבודה של סוכן תלויה בסביבה שבה הוא פועל. אני מתמקד בשני רכיבים שלה: ה־**Harness**, כלומר הקבצים, הכלים, ההוראות וההרשאות שהסוכן יכול להשתמש בהם, וה**אורקסטרציה**, כלומר איך העבודה מתחלקת, מי בודק את מי ומתי משימה נחשבת גמורה. הרחבתי על כך [במאמר על T3 Code ו־Kitshn](/blog/t3-kitshn).",
      dayHeading: "תהליך עבודה טיפוסי",
      day: [
        "סוכן מוביל מקבל את המטרה ואת המגבלות.",
        "הוא מאציל משימות מוגדרות לסוכני משנה: מחקר, מימוש וביקורת בלתי תלויה. כל סוכן שמשנה קוד עובד ב־git worktree נפרד.",
        "התוצאות חוזרות לסוכן המוביל, ומחלוקות בין סוכנים מוכרעות.",
        "כל תוצר נבדק מול התנהגות בפועל: diff, הרצת בדיקות או תוצאה שאפשר לשחזר.",
        "ההמתנה אוטומטית: מעקב אחרי Pull Requests מחזיר את הסוכן לעבודה כשתוצאות ה־CI או הערות הביקורת מגיעות.",
      ],
      toolsHeading: "כלים שאני מפתח ומתחזק",
      tools: [
        { name: "הפורק שלי של T3 Code", body: "מאפשר להמשיך שיחה ממחשב אחר גם כשהמחשב המקורי כבוי, מגבה שיחות למחשב נוסף, מעדכן את אפליקציית האנדרואיד שלו אוטומטית ותומך בהכתבה קולית." },
        { name: "Helix", body: "סטודיו להפקת תוכן קריאייטיב עם שמונה סוכני משנה וניתוב מודלים: מודלים בדרגת Opus לניתוח מותג, Sonnet לקופי ולסצנות ו־Haiku לתיקון סכמות. כולל שער הוצאות, תיעוד מקור לכל נכס ורנדרר מבודד ללא גישה לרשת וללא סודות." },
        { name: "nykma, הדור הבא של Helix", body: "השוואה מדודה הראתה שסוכן יחיד עם פרומפט קצר וספריית רכיבים לשימוש חוזר עדיף על צנרת של שמונה סוכנים, והממצאים מתועדים. כולל הערכות פרומפטים: 14 בריפים קבועים, גרסאות פרומפט קפואות והשוואה עיוורת של עלות ואיכות." },
        { name: "סוכנים בתוך מוצרים", body: "פועלים בפרודקשן:", sub: ["מערכת שבונה אתר דמו לעסק, מצלמת אותו בארבעה מכשירים ומתקנת את הבעיות שנמצאו;", "סוכנים שכותבים, מפרסמים ובודקים גיליון חדשות בכל בוקר;", "סוכן שיווק שמכין מודעות לאישור."] },
        { name: "שרתי MCP", body: "מעניקים לסוכנים גישה מובנית לנתונים: [מאגר חולשות אבטחה](https://github.com/TomCohenDev/vulnerability-registry-mcp) ונתוני השימוש של Gomlin." },
      ],
      timeHeading: "זמני פיתוח",
      timeNote: "לפי היסטוריית ה־commits. כל ריבוע מייצג יום אחד.",
      days: [
        { label: "מערכת לידים מלאה עם דשבורד", days: 1 },
        { label: "פלטפורמת האוטומציה (Workflows)", days: 1 },
        { label: "אתר הוראה עם מבחנים ואינטגרציה ל־Google Classroom", days: 1 },
        { label: "שירות סריקה עם API, דשבורד וגיבויים, במקום תהליך n8n ישן", days: 2 },
        { label: "Helix", days: 12, extra: "342 commits" },
      ],
      dayUnit: (n) => (n === 1 ? "יום אחד" : n === 2 ? "יומיים" : `${n} ימים`),
      rulesHeading: "עקרונות עבודה",
      rules: [
        "כל פעולה חיצונית (פוסט, מייל, פרסום או תשלום) דורשת אישור אנושי.",
        "לסוכנים אין גישה למפתחות ולסודות.",
        "תוכן חיצוני מטופל כמידע, ולעולם לא כהוראות.",
        "לכל פעולה מוגדרת תקרה.",
        "משימה נחשבת גמורה רק אחרי שנבדקה.",
      ],
    },
    cicd: {
      heading: "CI/CD: כל מיזוג הוא שחרור",
      lead: "אני מתכנן את צנרת השחרור של כל מוצר שאני משיק. אין דיפלוי ידני, כל שינוי אפשר לבדוק לפני שהוא עולה לאוויר, ושינוי שגוי לא מגיע למשתמשים בלי שזה יתגלה.",
      pipeline: ["push", "בדיקות", "תצוגה מקדימה", "מיזוג", "באוויר", "נבדק"],
      pipelineNote: "אותו תהליך שחרור בכל פרויקט.",
      lanes: [
        {
          name: "מובייל",
          items: [
            { title: "Gomlin עם Codemagic", points: ["ענף staging מפרסם ל־TestFlight ול־Google Play Internal, וענף main מפרסם לחנויות.", "מספרי build מתעדכנים אוטומטית, ומפתחות החתימה מגיעים מסודות ה־CI.", "flavors נפרדים ל־dev, staging ו־production, ובניות חנות עם obfuscation."] },
            { title: "tick3d לאייפון עם GitHub Actions", points: ["ה־CI מייצר את פרויקט ה־Xcode, בונה וחותם עם מפתח App Store Connect ומעלה ל־TestFlight.", "כל build מופץ לבודקים חיצוניים דרך ה־API של App Store Connect. הסקריפט אידמפוטנטי, כך שהרצה חוזרת לא שולחת פעמיים.", "כל Pull Request בודק גם את צנרת ה־iOS עצמה, כך שתקלות בצנרת מתגלות בשלב הביקורת ולא ביום השחרור."] },
            { title: "הפורק של T3 Code", points: ["ה־CI בונה APK חתום לאנדרואיד שמתעדכן אוטומטית.", "בניות לילה לאפליקציות הדסקטופ."] },
          ],
        },
        {
          name: "אתרים",
          items: [
            { title: "Cloudflare Workers ו־Pages", points: ["משמש את רוב האתרים שלי: כל push ל־main עולה לפרודקשן.", "לכל Pull Request יש כתובת תצוגה מקדימה משלו."] },
            { title: "אימות אחרי דיפלוי", points: ["ב־MathbookLM הצנרת ממתינה עד שהאתר החי מחזיר את ה־commit החדש ב־`/version.json`, כך שדיפלוי נחשב גמור רק כשהמשתמשים באמת רואים אותו.", "באתר הזה כל שינוי עובר lint, בדיקת טיפוסים, build ובדיקת אתר, ו־workflow נפרד בודק את האתר החי אחרי כל דיפלוי."] },
            { title: "Firebase Hosting", points: ["ערוץ תצוגה מקדימה לכל Pull Request."] },
            { title: "OpenNext על Workers", points: ["אתרי Next.js עם Sanity CMS, שרצים על Cloudflare Workers."] },
          ],
        },
        {
          name: "שרתים",
          items: [
            { title: "GHCR ו־SSH", points: ["כל push מריץ את הבדיקות, בונה תמונת Docker ומפרסם אותה ל־GHCR.", "השרת מושך את התמונה החדשה ועולה מחדש עם Docker Compose.", "מפתח ה־SSH של השרת מקובע, ו־staging ו־production רצים בנפרד מאחורי nginx."] },
            { title: "Kitshn על השרת שלי", points: ["דיפלוי מ־GitHub Actions עם OIDC, בלי מפתחות דיפלוי שמורים.", "Docker בלי הרשאות root, עם בדיקות בריאות שמנתבות תנועה רק למופעים תקינים.", "הדיפלוי הראשון של כל ריפו דורש את האישור שלי.", "גיבוי יומי של הנתונים, וכל אפליקציה פרטית מוגנת ב־Cloudflare Access."] },
            { title: "הפעלה מחדש בטוחה", points: ["סקריפט הדיפלוי לא מפעיל מחדש בזמן שעבודה רצה, ועבודות שנקטעו ממשיכות כשהשרת עולה."] },
            { title: "סריקות אבטחה ב־CI", points: ["Dependabot, pip-audit, Trivy ו־OSV."] },
          ],
        },
      ],
      fork: {
        heading: "פורק שמתחזק את עצמו",
        steps: ["workflow מתוזמן ממזג שינויים מ־T3 Code המקורי כל שלוש שעות.", "אם המיזוג מתנגש או שבדיקות נכשלות, נפתח issue ומופעל סוכן תיקון שרץ על השרת שלי.", "הסוכן פותח Pull Request עם התיקון וממזג אותו רק אחרי שה־CI עובר."],
      },
    },
    oss: {
      heading: "קוד פתוח",
      lead: "אני משתמש בשני הפרויקטים האלה של ירדן זמיר באופן יומיומי ותורם להם.",
      projects: [
        {
          name: "Kitshn", href: "https://github.com/Yarden-zamir/kitshn", by: "של ירדן זמיר",
          body: "פלטפורמה לפריסת אפליקציות מ־GitHub ל־Cloudflare ולמכונות שלך, עם מפת גישה שקובעת מי יכול לפתוח כל אפליקציה. אני מריץ מופע משלי ופורס דרכו את האפליקציות שלי. בשימוש היומיומי, סוכן מציע שינוי במפה, אני מאשר, והסוכן פורס.",
          points: ["כ־28 commits [בפורק שלי](https://github.com/TomCohenDev/kitshn):", "ממשק המפה: עיצוב שטוח, מצב בהיר וכהה ומפת דמו של חברה קטנה;", "האתר kitshn.com: עמוד הבית ועמודי enterprise, How it works ו־install;", "סרטון הסבר שהופק עם Remotion ו־ElevenLabs."],
        },
        {
          name: "tick3d", href: "https://github.com/Yarden-zamir/tick3d", by: "של ירדן זמיר",
          body: "משחק איקס־עיגול תלת־ממדי על קובייה בגודל 4×4×4. התרומות שלי:",
          points: ["ממשק נאו־ברוטליסטי עם 12 ערכות נושא;", "סיבוב המגדל בגרירה;", "צ'אט בזמן אמת בין שחקנים;", "אפליקציית iOS כמעטפת Capacitor, עם CI שבונה אותה, מעלה ל־TestFlight ומפיץ לבודקים אוטומטית;", "tick3d Factory (בפיתוח): מציג ריפו כמפעל תלת־ממדי מונפש, שבו imports הם מסועים, קריאות HTTP הן צינורות ודיפלוי הוא רכבת."],
        },
      ],
      moreHeading: "תרומות נוספות",
      more: ["[הפורק שלי של T3 Code](https://github.com/TomCohenDev/t3code): 74 commits ו־25 Pull Requests שמוזגו.", "[שרת MCP למאגר חולשות](https://github.com/TomCohenDev/vulnerability-registry-mcp): הופך מאגר טקסט ישן לכלים מובנים עבור Claude."],
    },
    clients: {
      heading: "עבודה עם לקוחות",
      lead: "אפליקציות, אתרים ואוטומציות שפיתחתי ללקוחות, מהגרסה הראשונה ועד תחזוקה לטווח ארוך.",
      featured: [
        { name: "Dronebag", href: "/en/case-studies/dronebag", image: { src: "/case_studies/dronebag/assets/dronebag-home-screen.webp", alt: "מסך הבית של Dronebag" }, points: ["ניהול צי רחפנים ליחידות שטח, בארכיטקטורת Offline-first עם סנכרון נתונים."] },
        { name: "Yellow Candle", href: "/en/case-studies/yellow-candle", image: { src: "/case_studies/virtual_shoa_candle/assets/mobile-app-candle-lighting.webp", alt: "מסך הדלקת הנר ב־Yellow Candle" }, points: ["אפליקציית זיכרון לשואה עבור FJMC. מנעתי את הסרתה מחנויות האפליקציות והתאמתי אותה לדרישות העדכניות."] },
        { name: "Nightwing", href: "/en/case-studies/nightwing", image: { src: "/case_studies/nightwing-ph/assets/web-app-landing-page-hero.webp", alt: "אתר ההזמנות של Nightwing" }, points: ["אתר הזמנות דו־לשוני למסעדה. תהליך n8n ממספר כל הזמנה, רושם אותה בגיליון ושולח אותה למטבח בטלגרם."] },
      ],
      others: [
        { name: "אפליקציית מדידה וקנייה וירטואלית מבוססת AI", role: "מוביל טכני, מ־2022 ועד היום", points: ["ניתוח מידות גוף בזמן אמת עם Flutter ו־Google ML Kit.", "ארכיטקטורת BLoC שהפחיתה את חוסר היציבות בכ־50%.", "צנרת CI/CD שקיצרה את הזמן לשוק בכ־40%.", "בדיקות A/B לתהליכי ההרשמה."] },
        { name: "ITA", points: ["עוזר הוראה ששולח צילום מסך ל־GPT-5 ומצייר את התשובה ישירות על המסך. נבנה עם WPF, React, n8n ו־Supabase."] },
        { name: "LuxCal ו־Spidclass", points: ["אפליקציות Flutter עם פונקציות ענן מתוזמנות, מעקב נוכחות ומעקב תשלומים."] },
        { name: "אתרים", points: ["תיקי עבודות עשירים בווידאו עם CMS, אתרי עסקים דו־לשוניים ותבניות אתרים למאמנים. לצפייה [בעמוד האתרים](/web)."] },
      ],
    },
    teaching: {
      heading: "הוראה ותוכן",
      body: "אני מרצה בתחומי התכנות וההנדסה, מנחה פרויקטי גמר, ומפתח ומעביר קורסים מעשיים ב־AI ובאוטומציה. בנוסף אני כותב [בלוג](/blog) על אבטחת AI ועל כלים לעבודה עם סוכנים, ומפרסם בכל בוקר [גיליון חדשות טכנולוגיה בעברית](/news) שסוכן מרכיב.",
    },
    tools: {
      heading: "יכולות טכניות",
      groups: TOOL_GROUPS({ languages: "שפות", mobile: "מובייל", web: "ווב", backend: "שרת", data: "נתונים", automation: "אוטומציה", infra: "תשתית", iap: "רכישות בתוך האפליקציה", evals: "הערכות ובנצ'מרקים", ondevice: "מודלים על המכשיר", bots: "בוטים לטלגרם ולוואטסאפ" }),
    },
    cta: {
      heading: "יצירת קשר",
      body: "מעוניינים לפתח מוצר יחד, או לבדוק איך אוכל לתרום לצוות שלכם? אפשר לפנות אליי במייל או ב־LinkedIn.",
      email: EMAIL,
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },
};
