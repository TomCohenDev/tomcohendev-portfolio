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
  nav: { home: string; homeHref: string; other: string; sections: string };
  hero: {
    hello: string;
    intro: string;
    notes: { decide: string; agents: string; ship: string };
    doodleAlt: string;
    principles: { title: string; body: string }[];
    contact: string;
  };
  sections: { id: string; label: string }[];
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
      heading: "I build whole products with a team of AI agents, and ship them through clean deploys.",
      description: "What I have built, how I work with AI agents, the CI/CD I build for mobile, web and servers, and my open-source contributions.",
      path: "/about-en",
      translation: "/about",
    },
    nav: { home: "Home (Hebrew)", homeHref: "/", other: "לקריאה בעברית", sections: "Sections on this page" },
    hero: {
      hello: "Hi, I'm Tom",
      intro: "Full-stack developer, founder and lecturer. For five years I've built digital products end to end: iPhone and Android apps, web systems, back ends, automation and AI. I take an idea from the first conversation to production and the app stores, then keep improving it.",
      notes: { decide: "I plan, and I decide\nwhat ships", agents: "agents build\nin parallel", ship: "merging is releasing" },
      doodleAlt: "Illustration of Tom Cohen waving",
      principles: [
        { title: "AI agents as a team, not autocomplete", body: "I plan the work, split it across agents, check what comes back and decide what ships. That's how a whole working product can be built in a day or two." },
        { title: "Every project ships through a clean pipeline", body: "Merging is releasing, every change has a preview, and nothing reaches users without checks." },
      ],
      contact: "Get in touch",
    },
    sections: [
      { id: "products", label: "Products" },
      { id: "agents", label: "AI agents" },
      { id: "cicd", label: "CI/CD" },
      { id: "open-source", label: "Open source" },
      { id: "clients", label: "Client work" },
      { id: "tools", label: "Tools" },
    ],
    products: {
      heading: "Products I built myself",
      lead: "Each one built alone, from the first commit to the store listing.",
      stackLabel: "Stack",
      items: [
        {
          name: "MathbookLM", href: "https://mathbooklm.com", sketch: "mathbook",
          summary: "A handwriting-first math notebook. Write on an infinite canvas, lasso a region, and it recognizes the handwriting, solves or checks it with SymPy running in the browser, and writes the result back onto the canvas.",
          points: ["The model only reasons and orchestrates; the arithmetic is always deterministic.", "Interactive simulations built by the model.", "A paid tier and a pilot program for tutors."],
          stack: MATHBOOK_STACK,
          links: [{ label: "mathbooklm.com", href: "https://mathbooklm.com" }],
        },
        {
          name: "Gomlin Jobs", sketch: "gomlin",
          summary: "A swipe-to-apply job app. I built the whole system alone.",
          points: ["The Flutter app and a FastAPI server.", "Scrapers that collect jobs from about 46 sources and classify each with AI.", "Playwright-based applications to common applicant tracking systems.", "An email relay that forwards recruiter replies to the user's real inbox.", "A Supabase table of capabilities per source switches sources on or off without an app release."],
          links: [{ label: "App Store", href: "https://apps.apple.com/us/app/gomlin-jobs/id6744745540" }, { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.gomlinjobs.gomlin" }],
        },
        {
          name: "Locket AI", sketch: "locket",
          summary: "An on-device AI app with no cloud at all.",
          points: ["Chat with Gemma.", "Image understanding with FastVLM: Kotlin to LiteRT-LM on Android, Swift with MLX on iOS.", "Image generation with stable-diffusion.cpp through C++ and FFI on Vulkan.", "A memory-aware layer swaps models, so it runs on low-end phones."],
        },
        {
          name: "nykma", sketch: "nykma",
          summary: "A local ad and video maker. An agent pitches an idea, builds the video in code with a render engine I wrote, and returns MP4s and copy for each platform.",
          points: ["Nothing is published without my approval."],
          links: [{ label: "I wrote about it", href: "/blog/nykma-en" }],
        },
        {
          name: "agents.tomcohen.dev", sketch: "agents",
          summary: "A workflow platform where agents are steps: like n8n, but you edit workflows by asking an agent.",
          points: ["Each workflow is a folder of plain files.", "Code steps are free. Agent steps run as T3 Code sessions on my server, on the cheapest model that fits.", "Every outward action waits for my approval, with an idempotency key and a daily cap."],
        },
      ],
    },
    agents: {
      heading: "How I work with AI agents",
      lead: "An agent can write good code, but the value comes from the environment around it. The **harness** is the files, tools, instructions and permissions it works with. **Orchestration** is how the work is split, who reviews whom, and what counts as done. I go deeper in [my article on T3 Code and Kitshn](/blog/t3-kitshn-en).",
      dayHeading: "A normal day",
      day: [
        "A lead agent gets the outcome and the constraints.",
        "It delegates bounded tasks to subagents: research, implementation, independent review. Every agent that touches code works in its own git worktree.",
        "Findings come back and disagreements between agents are resolved.",
        "Everything is checked against real behaviour: a diff, a test run, a reproducible result.",
        "Waiting is automated: pull-request monitoring wakes the agent when CI or review feedback arrives.",
      ],
      toolsHeading: "Tooling I build and maintain",
      tools: [
        { name: "My T3 Code fork", body: "Continues a thread from another machine even while the original is off, backs up threads to a peer machine, updates its Android app by itself, and has voice dictation." },
        { name: "Helix", body: "A creative studio with eight sub-agents and model routing: Opus-class for brand analysis, Sonnet-class for copy and scenes, Haiku-class for schema repair. A spend gate, provenance on every asset, and an isolated renderer with no network and no secrets." },
        { name: "nykma, after Helix", body: "I measured that one agent, a short prompt and a box of reusable parts beat the eight-agent pipeline, and documented why. Prompt evals: 14 fixed briefs, frozen prompt versions, blind comparison of cost and quality." },
        { name: "Agents inside products", body: "Running in production, not just in my editor:", sub: ["a demo-site builder that screenshots each site on four devices and fixes what's wrong;", "agents that write, publish and live-check a news issue every morning;", "a marketing agent that drafts ads for approval."] },
        { name: "MCP servers", body: "Structured access to data for agents: a [vulnerability registry](https://github.com/TomCohenDev/vulnerability-registry-mcp) and Gomlin's usage analytics." },
      ],
      timeHeading: "How long things took",
      timeNote: "According to the commit history. Each square is one day.",
      days: [
        { label: "Lead-generation system with a dashboard", days: 1 },
        { label: "The workflow platform", days: 1 },
        { label: "Teaching site with tests and Google Classroom connectors", days: 1 },
        { label: "Scraping service with an API, dashboard and backups, replacing an old n8n workflow", days: 2 },
        { label: "Helix", days: 12, extra: "342 commits" },
      ],
      dayUnit: (n) => (n === 1 ? "1 day" : `${n} days`),
      rulesHeading: "My rules",
      rules: [
        "Anything outward-facing (a post, an email, publishing, spending money) waits for human approval.",
        "Credentials stay out of the agent's reach.",
        "External text is data, not instructions.",
        "Every action has a cap.",
        "Nothing counts as done until it's verified.",
      ],
    },
    cicd: {
      heading: "CI/CD: merging is releasing",
      lead: "I design the release pipeline of everything I ship. Nobody deploys by hand, every change can be seen before it goes live, and a broken change never reaches users quietly.",
      pipeline: ["push", "checks", "preview", "merge", "live", "verified"],
      pipelineNote: "The same shape on every project.",
      lanes: [
        {
          name: "Mobile",
          items: [
            { title: "Gomlin on Codemagic", points: ["Staging goes to TestFlight and Google Play Internal; main goes to the stores.", "Build numbers bump themselves, and signing comes from CI secrets.", "Dev, staging and prod flavors; store builds are obfuscated."] },
            { title: "tick3d iOS on GitHub Actions", points: ["CI generates the Xcode project, archives, signs with an App Store Connect key and uploads to TestFlight.", "Every build reaches external testers through the App Store Connect API. The script is idempotent, so a re-run never double-submits.", "Every pull request lints the iOS pipeline itself, so a broken pipeline fails in review, not on release day."] },
            { title: "My T3 Code fork", points: ["A signed Android APK is built in CI and updates itself.", "Desktop apps get nightly builds."] },
          ],
        },
        {
          name: "Web",
          items: [
            { title: "Cloudflare Workers and Pages", points: ["Almost all my sites. Every push to main goes live.", "Every pull request gets a preview link."] },
            { title: "Verified deploys", points: ["For MathbookLM, the pipeline waits until the live site serves the new commit in `/version.json`. Deployed means users actually see it.", "On this site, every change passes lint, type checks, a build and a site check, and a separate workflow checks the live site after each deploy."] },
            { title: "Firebase Hosting", points: ["A preview channel for every pull request."] },
            { title: "OpenNext on Workers", points: ["Next.js sites with Sanity CMS."] },
          ],
        },
        {
          name: "Servers",
          items: [
            { title: "GHCR and SSH", points: ["Each push runs the tests, builds a Docker image and pushes it to GHCR.", "The server pulls the image and restarts with Docker Compose.", "The SSH host key is pinned; staging and production run separately behind nginx."] },
            { title: "Kitshn on my own server", points: ["Deploys from GitHub Actions with OIDC, so no deploy keys are stored.", "Rootless Docker, and health checks so traffic only reaches a healthy app.", "A repo's first deploy needs my approval.", "Daily backups, and every private app sits behind Cloudflare Access."] },
            { title: "Safe restarts", points: ["A deploy script refuses to restart while a job is running, and interrupted jobs resume on startup."] },
            { title: "Security scans in CI", points: ["Dependabot, pip-audit, Trivy and OSV."] },
          ],
        },
      ],
      fork: {
        heading: "A fork that maintains itself",
        steps: ["A scheduled workflow merges upstream T3 Code every three hours.", "A conflict or failing test opens an issue and calls a repair agent on my server.", "The agent opens a pull request and merges it only once CI passes."],
      },
    },
    oss: {
      heading: "Open source and collaboration",
      lead: "Two projects by Yarden Zamir that I use every day and contribute to.",
      projects: [
        {
          name: "Kitshn", href: "https://github.com/Yarden-zamir/kitshn", by: "by Yarden Zamir",
          body: "Deploys apps from GitHub to Cloudflare and to your own machines, with a map that decides who can open each app. I run my own instance and deploy my apps through it. Every day, an agent proposes a map change, I approve it, and the agent deploys.",
          points: ["About 28 commits in [my fork](https://github.com/TomCohenDev/kitshn):", "the map UI: a flat look, light and dark modes, and a demo map of a small company;", "the kitshn.com site: home, enterprise, How it works and install;", "an explainer video made with Remotion and ElevenLabs."],
        },
        {
          name: "tick3d", href: "https://github.com/Yarden-zamir/tick3d", by: "by Yarden Zamir",
          body: "3D tic-tac-toe on a 4×4×4 cube. My contributions:",
          points: ["a neo-brutalist UI with 12 themes;", "drag to turn the tower;", "real-time chat between players;", "an iOS app as a Capacitor shell, built and uploaded to TestFlight by CI with automatic tester distribution;", "tick3d Factory (in progress): renders the repo as an animated 3D factory, where imports are belts, HTTP calls are pneumatic tubes and deploys are trains."],
        },
      ],
      moreHeading: "More",
      more: ["[My T3 Code fork](https://github.com/TomCohenDev/t3code): 74 commits and 25 merged pull requests.", "[Vulnerability registry MCP server](https://github.com/TomCohenDev/vulnerability-registry-mcp): turns a legacy plain-text registry into structured tools for Claude."],
    },
    clients: {
      heading: "Client work",
      lead: "Apps, sites and automations for clients, several of them still running years later.",
      featured: [
        { name: "Dronebag", href: "/en/case-studies/dronebag", image: { src: "/case_studies/dronebag/assets/dronebag-home-screen.webp", alt: "Dronebag home screen" }, points: ["Drone fleet management for field units, offline-first with sync."] },
        { name: "Yellow Candle", href: "/en/case-studies/yellow-candle", image: { src: "/case_studies/virtual_shoa_candle/assets/mobile-app-candle-lighting.webp", alt: "Yellow Candle candle-lighting screen" }, points: ["A Holocaust remembrance app for FJMC. I saved it from removal from the stores and updated it to current requirements."] },
        { name: "Nightwing", href: "/en/case-studies/nightwing", image: { src: "/case_studies/nightwing-ph/assets/web-app-landing-page-hero.webp", alt: "Nightwing ordering site" }, points: ["A bilingual ordering site for a restaurant. n8n numbers each order, logs it to a sheet and sends it to the kitchen on Telegram."] },
      ],
      others: [
        { name: "AI-powered virtual fitting app", role: "2022 to now, technical lead", points: ["Flutter and Google ML Kit for real-time body-measurement analysis.", "A BLoC architecture that cut instability by about 50%.", "CI/CD that shortened time to market by about 40%.", "A/B tests on the onboarding flows."] },
        { name: "ITA", points: ["A teaching assistant that sends a screenshot to GPT-5 and draws the answer on the screen, using WPF, React, n8n and Supabase."] },
        { name: "LuxCal and Spidclass", points: ["Flutter apps with scheduled cloud functions, and attendance and payment tracking."] },
        { name: "Websites", points: ["Video-heavy portfolios with a CMS, bilingual business sites, and templates for coaches' sites."] },
      ],
    },
    teaching: {
      heading: "Teaching and writing",
      body: "I lecture on programming and engineering, supervise final-year projects, and build and teach practical AI and automation courses. I write a [blog](/blog) on AI security and agent tooling, and publish a daily [Hebrew tech news issue](/news) put together by an agent.",
    },
    tools: {
      heading: "Tools",
      groups: TOOL_GROUPS({ languages: "Languages", mobile: "Mobile", web: "Web", backend: "Back end", data: "Data", automation: "Automation", infra: "Infrastructure", iap: "in-app purchases", evals: "evals and benchmarks", ondevice: "on-device models", bots: "Telegram and WhatsApp bots" }),
    },
    cta: {
      heading: "Let's talk",
      body: "Want to build something, or see how I'd fit on your team?",
      email: EMAIL,
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },

  he: {
    meta: {
      title: "אודות | תום כהן, מפתח Full-stack, AI ואוטומציה",
      heading: "אני בונה מוצרים שלמים עם צוות של סוכני AI, ומעלה אותם לאוויר בדיפלוי נקי.",
      description: "המוצרים שבניתי, איך אני עובד עם סוכני AI, ה־CI/CD שאני בונה לאפליקציות, לאתרים ולשרתים, והתרומות שלי לקוד פתוח.",
      path: "/about",
      translation: "/about-en",
    },
    nav: { home: "לעמוד הבית", homeHref: "/", other: "Read in English", sections: "חלקי העמוד" },
    hero: {
      hello: "היי, אני תום",
      intro: "מפתח Full-stack, יזם ומרצה. כבר חמש שנים אני בונה מוצרים דיגיטליים מקצה לקצה: אפליקציות לאייפון ולאנדרואיד, מערכות ווב, צד שרת, אוטומציות ו־AI. אני מלווה רעיון מהשיחה הראשונה ועד שהוא באוויר ובחנויות, וממשיך לשפר אותו.",
      notes: { decide: "אני מתכנן ומחליט\nמה עולה לאוויר", agents: "סוכנים בונים\nבמקביל", ship: "מיזוג הוא שחרור" },
      doodleAlt: "איור של תום כהן מנופף לשלום",
      principles: [
        { title: "סוכני AI כצוות, לא ככלי השלמה", body: "אני מתכנן את העבודה, מחלק אותה בין סוכנים, בודק את מה שחוזר ומחליט מה עולה לאוויר. ככה מוצר שלם עובד יכול להיבנות ביום או ביומיים." },
        { title: "כל פרויקט עולה בצנרת נקייה", body: "מיזוג הוא שחרור, לכל שינוי יש תצוגה מקדימה, ושום דבר לא מגיע למשתמשים בלי בדיקות." },
      ],
      contact: "לדבר איתי",
    },
    sections: [
      { id: "products", label: "מוצרים" },
      { id: "agents", label: "סוכני AI" },
      { id: "cicd", label: "CI/CD" },
      { id: "open-source", label: "קוד פתוח" },
      { id: "clients", label: "לקוחות" },
      { id: "tools", label: "כלים" },
    ],
    products: {
      heading: "מוצרים שבניתי בעצמי",
      lead: "כל אחד מהם נבנה לבד, מה־commit הראשון ועד הדף בחנות.",
      stackLabel: "טכנולוגיות",
      items: [
        {
          name: "MathbookLM", href: "https://mathbooklm.com", sketch: "mathbook",
          summary: "מחברת מתמטיקה שעובדת עם כתב יד. כותבים על קנבס אינסופי, מסמנים אזור, והמערכת מזהה את הכתב, פותרת או בודקת עם SymPy שרץ בתוך הדפדפן, וכותבת את התוצאה בחזרה על הקנבס.",
          points: ["המודל רק מסיק ומתזמר, והחישוב עצמו תמיד דטרמיניסטי.", "סימולציות אינטראקטיביות שהמודל בונה.", "מנוי בתשלום ותוכנית פיילוט למורים."],
          stack: MATHBOOK_STACK,
          links: [{ label: "mathbooklm.com", href: "https://mathbooklm.com" }],
        },
        {
          name: "Gomlin Jobs", sketch: "gomlin",
          summary: "אפליקציית חיפוש עבודה בסגנון החלקה. בניתי לבד את כל המערכת.",
          points: ["אפליקציית Flutter ושרת FastAPI.", "סורקים שאוספים משרות מכ־46 מקורות ומסווגים כל משרה עם AI.", "הגשת מועמדות אוטומטית למערכות גיוס נפוצות עם Playwright.", "ממסר מיילים שמחזיר תשובות של מגייסים לתיבה האמיתית של המשתמש.", "טבלת יכולות לכל מקור ב־Supabase מדליקה ומכבה מקורות בלי לשחרר גרסה."],
          links: [{ label: "App Store", href: "https://apps.apple.com/us/app/gomlin-jobs/id6744745540" }, { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.gomlinjobs.gomlin" }],
        },
        {
          name: "Locket AI", sketch: "locket",
          summary: "אפליקציית AI שעובדת על המכשיר בלבד, בלי ענן.",
          points: ["צ'אט עם Gemma.", "ניתוח תמונות עם FastVLM: גשר Kotlin ל־LiteRT-LM באנדרואיד ו־Swift עם MLX באייפון.", "יצירת תמונות עם stable-diffusion.cpp דרך C++ ו־FFI עם Vulkan.", "שכבת תזמור שמחליפה מודלים כדי לחסוך בזיכרון, כך שהיא רצה גם על מכשירים חלשים."],
        },
        {
          name: "nykma", sketch: "nykma",
          summary: "כלי מקומי שמפיק סרטונים ומודעות. סוכן מציע רעיון, בונה את הסרטון בקוד עם מנוע רינדור שכתבתי, ומחזיר קבצי MP4 וטקסטים לכל פלטפורמה.",
          points: ["שום דבר לא מתפרסם בלי האישור שלי."],
          links: [{ label: "כתבתי עליו", href: "/blog/nykma" }],
        },
        {
          name: "agents.tomcohen.dev", sketch: "agents",
          summary: "פלטפורמת Workflows שבה סוכנים הם שלב בתהליך: כמו n8n, אבל עורכים את התהליך דרך סוכן.",
          points: ["כל Workflow הוא תיקייה של קבצים פשוטים.", "שלבי קוד חינמיים, ושלבי סוכן רצים כסשנים של T3 Code על השרת שלי, עם המודל הזול ביותר שמתאים.", "כל פעולה כלפי חוץ מחכה לאישור שלי, עם מפתח אידמפוטנטיות ותקרה יומית."],
        },
      ],
    },
    agents: {
      heading: "איך אני עובד עם סוכני AI",
      lead: "סוכן יכול לכתוב קוד טוב, אבל הערך האמיתי מגיע מהסביבה שסביבו. ה־**Harness** הוא הקבצים, הכלים, ההוראות וההרשאות שהסוכן עובד איתם. ה**אורקסטרציה** היא איך מחלקים את העבודה, מי בודק את מי ומה נחשב גמור. הרחבתי על זה [במאמר על T3 Code ו־Kitshn](/blog/t3-kitshn).",
      dayHeading: "ככה נראית עבודה רגילה",
      day: [
        "סוכן ראשי מקבל את המטרה ואת המגבלות.",
        "הוא מאציל משימות מוגדרות לסוכני משנה: מחקר, מימוש או ביקורת בלתי תלויה. כל סוכן שנוגע בקוד עובד ב־git worktree משלו.",
        "הממצאים חוזרים, ומחלוקות בין סוכנים מוכרעות.",
        "כל דבר נבדק מול התנהגות אמיתית: diff, הרצת בדיקות או תוצאה שאפשר לשחזר.",
        "ההמתנה אוטומטית: מעקב אחרי Pull Request מעיר את הסוכן כשה־CI או ההערות מגיעים.",
      ],
      toolsHeading: "הכלים שאני בונה ומתחזק",
      tools: [
        { name: "הפורק שלי של T3 Code", body: "המשך שיחה ממחשב אחר גם כשהמחשב המקורי כבוי, גיבוי שיחות למכונה אחרת, אפליקציית אנדרואיד שמתעדכנת לבד והכתבה קולית." },
        { name: "Helix", body: "סטודיו קריאייטיב עם שמונה סוכני משנה וניתוב מודלים: Opus לניתוח מותג, Sonnet לקופי וסצנות ו־Haiku לתיקון סכמות. שער הוצאות, תיעוד מקור לכל נכס, ורנדרר מבודד בלי רשת ובלי סודות." },
        { name: "nykma, שבא אחרי Helix", body: "מדדתי שסוכן אחד, פרומפט קצר וארגז חלקים לשימוש חוזר מנצחים צנרת של שמונה סוכנים, ותיעדתי למה. הערכות לפרומפטים: 14 בריפים קבועים, גרסאות פרומפט קפואות והשוואה עיוורת של עלות ואיכות." },
        { name: "סוכנים בתוך מוצרים", body: "רצים בפרודקשן, לא רק בעורך שלי:", sub: ["מערכת שבונה אתר דמו לעסק, מצלמת אותו בארבעה מכשירים ומתקנת את הבעיות;", "סוכנים שכותבים ומפרסמים כל בוקר גיליון חדשות ובודקים את הדף החי;", "סוכן שיווק שמכין מודעות לאישור."] },
        { name: "שרתי MCP", body: "גישה מובנית לנתונים עבור סוכנים: [מאגר חולשות אבטחה](https://github.com/TomCohenDev/vulnerability-registry-mcp) ונתוני השימוש של Gomlin." },
      ],
      timeHeading: "כמה זמן זה לקח",
      timeNote: "לפי היסטוריית ה־commits. כל ריבוע הוא יום.",
      days: [
        { label: "מערכת לידים שלמה עם דשבורד", days: 1 },
        { label: "פלטפורמת ה־Workflows", days: 1 },
        { label: "אתר הוראה עם מבחנים וחיבורים ל־Google Classroom", days: 1 },
        { label: "שירות סריקה עם API, דשבורד וגיבויים, שהחליף תהליך n8n ישן", days: 2 },
        { label: "Helix", days: 12, extra: "342 commits" },
      ],
      dayUnit: (n) => (n === 1 ? "יום אחד" : n === 2 ? "יומיים" : `${n} ימים`),
      rulesHeading: "הכללים שלי",
      rules: [
        "כל דבר שיוצא החוצה (פוסט, מייל, פרסום, הוצאה כספית) מחכה לאישור אדם.",
        "מפתחות לא נמצאים בהישג יד של הסוכן.",
        "טקסט חיצוני הוא מידע ולא הוראות.",
        "לכל פעולה יש תקרה.",
        "שום דבר לא נחשב גמור לפני שנבדק.",
      ],
    },
    cicd: {
      heading: "CI/CD: כל מיזוג הוא שחרור",
      lead: "את צנרת השחרור של כל מה שאני בונה אני מתכנן בעצמי. אף אחד לא מריץ דיפלוי ביד, כל שינוי אפשר לראות לפני שהוא עולה, ושינוי שבור לא מגיע בשקט למשתמשים.",
      pipeline: ["push", "בדיקות", "תצוגה מקדימה", "מיזוג", "באוויר", "נבדק"],
      pipelineNote: "אותה צורה בכל פרויקט.",
      lanes: [
        {
          name: "מובייל",
          items: [
            { title: "Gomlin עם Codemagic", points: ["ענף staging עולה ל־TestFlight ול־Google Play Internal, וענף main עולה לחנויות.", "מספרי build מתעדכנים לבד, והחתימה מגיעה מסודות ב־CI.", "flavors נפרדים ל־dev, staging ו־prod, ובניות חנות עם obfuscation."] },
            { title: "tick3d לאייפון עם GitHub Actions", points: ["ה־CI מייצר את פרויקט ה־Xcode, בונה, חותם עם מפתח App Store Connect ומעלה ל־TestFlight.", "כל build עובר אוטומטית לבודקים חיצוניים דרך ה־API של App Store Connect. הסקריפט אידמפוטנטי, כך שהרצה חוזרת לא שולחת פעמיים.", "כל Pull Request בודק גם את צנרת ה־iOS עצמה, כדי ששבר יתגלה בביקורת ולא ביום השחרור."] },
            { title: "הפורק של T3 Code", points: ["APK חתום לאנדרואיד נבנה ב־CI ומתעדכן לבד.", "בניות לילה לאפליקציות המחשב."] },
          ],
        },
        {
          name: "אתרים",
          items: [
            { title: "Cloudflare Workers ו־Pages", points: ["כמעט כל האתרים שלי. כל push ל־main עולה לאוויר.", "לכל Pull Request יש קישור תצוגה מקדימה."] },
            { title: "בדיקה אחרי דיפלוי", points: ["ב־MathbookLM הצנרת מחכה עד שהאתר החי מחזיר את ה־commit החדש ב־`/version.json`. עלה אומר שהמשתמשים באמת רואים אותו.", "באתר הזה כל שינוי עובר lint, בדיקת טיפוסים, build ובדיקת אתר, ואחרי כל דיפלוי workflow נפרד בודק את האתר החי."] },
            { title: "Firebase Hosting", points: ["ערוץ תצוגה מקדימה לכל Pull Request."] },
            { title: "OpenNext על Workers", points: ["אתרי Next.js עם Sanity CMS."] },
          ],
        },
        {
          name: "שרתים",
          items: [
            { title: "GHCR ו־SSH", points: ["בכל push רצות הבדיקות ונבנית תמונת Docker שעולה ל־GHCR.", "השרת מושך אותה ועולה מחדש עם Docker Compose.", "מפתח ה־SSH של השרת מקובע, ו־staging ו־production רצים בנפרד מאחורי nginx."] },
            { title: "Kitshn על השרת שלי", points: ["דיפלוי מ־GitHub Actions עם OIDC, בלי מפתחות דיפלוי שמורים.", "Docker בלי root, ובדיקות בריאות שמוודאות שתנועה מגיעה רק לאפליקציה תקינה.", "הדיפלוי הראשון של כל ריפו דורש את האישור שלי.", "גיבוי יומי, וכל אפליקציה פרטית מאחורי Cloudflare Access."] },
            { title: "הפעלה מחדש בטוחה", points: ["סקריפט דיפלוי שמסרב להפעיל מחדש באמצע עבודה, ועבודות שנקטעו ממשיכות כשהשרת עולה."] },
            { title: "סריקות אבטחה ב־CI", points: ["Dependabot, pip-audit, Trivy ו־OSV."] },
          ],
        },
      ],
      fork: {
        heading: "פורק שמתחזק את עצמו",
        steps: ["workflow מתוזמן ממזג את T3 Code מהמקור כל שלוש שעות.", "התנגשות או בדיקה שנכשלת פותחות issue וקוראות לסוכן תיקון שרץ על השרת שלי.", "הסוכן פותח Pull Request וממזג אותו רק כשה־CI עובר."],
      },
    },
    oss: {
      heading: "קוד פתוח ושיתופי פעולה",
      lead: "שני פרויקטים של ירדן זמיר שאני משתמש בהם כל יום ותורם להם.",
      projects: [
        {
          name: "Kitshn", href: "https://github.com/Yarden-zamir/kitshn", by: "של ירדן זמיר",
          body: "פריסת אפליקציות מ־GitHub ל־Cloudflare ולמכונות שלך, עם מפה שקובעת מי יכול לפתוח כל אפליקציה. אני מריץ מופע משלי ופורס דרכו את האפליקציות שלי. כל יום הסוכן מציע שינוי במפה, אני מאשר, והוא פורס.",
          points: ["כ־28 commits [בפורק שלי](https://github.com/TomCohenDev/kitshn):", "ממשק המפה: מראה שטוח, מצב בהיר וכהה, ומפת דמו של חברה קטנה;", "האתר kitshn.com: עמוד הבית, enterprise, How it works ו־install;", "סרטון הסבר עם Remotion ו־ElevenLabs."],
        },
        {
          name: "tick3d", href: "https://github.com/Yarden-zamir/tick3d", by: "של ירדן זמיר",
          body: "איקס־עיגול תלת־ממדי על קובייה של 4×4×4. מה שתרמתי:",
          points: ["ממשק נאו־ברוטליסטי עם 12 ערכות נושא;", "סיבוב של המגדל בגרירה;", "צ'אט בזמן אמת בין שחקנים;", "אפליקציית iOS ב־Capacitor שנבנית ועולה ל־TestFlight מה־CI, עם הפצה אוטומטית לבודקים;", "tick3d Factory (בפיתוח): מציג את הריפו כמפעל תלת־ממדי מונפש, שבו imports הם מסועים, קריאות HTTP הן צינורות ודיפלוי הוא רכבת."],
        },
      ],
      moreHeading: "עוד",
      more: ["[הפורק שלי של T3 Code](https://github.com/TomCohenDev/t3code): 74 commits ו־25 Pull Requests שמוזגו.", "[שרת MCP למאגר חולשות](https://github.com/TomCohenDev/vulnerability-registry-mcp): הופך מאגר טקסט ישן לכלים מובנים עבור Claude."],
    },
    clients: {
      heading: "עבודה עם לקוחות",
      lead: "אפליקציות, אתרים ואוטומציות ללקוחות, חלקם עדיין רצים שנים אחרי.",
      featured: [
        { name: "Dronebag", href: "/en/case-studies/dronebag", image: { src: "/case_studies/dronebag/assets/dronebag-home-screen.webp", alt: "מסך הבית של Dronebag" }, points: ["ניהול צי רחפנים ליחידות בשטח, עם עבודה Offline-first וסנכרון."] },
        { name: "Yellow Candle", href: "/en/case-studies/yellow-candle", image: { src: "/case_studies/virtual_shoa_candle/assets/mobile-app-candle-lighting.webp", alt: "מסך הדלקת הנר ב־Yellow Candle" }, points: ["אפליקציית זיכרון לשואה עבור FJMC. הצלתי אותה מהסרה מהחנויות ועדכנתי אותה לדרישות החדשות."] },
        { name: "Nightwing", href: "/en/case-studies/nightwing", image: { src: "/case_studies/nightwing-ph/assets/web-app-landing-page-hero.webp", alt: "אתר ההזמנות של Nightwing" }, points: ["אתר הזמנות דו־לשוני למסעדה. n8n ממספר כל הזמנה, רושם אותה בגיליון ושולח אותה למטבח בטלגרם."] },
      ],
      others: [
        { name: "אפליקציית מדידה וקנייה וירטואלית מבוססת AI", role: "מ־2022 ועד היום, מוביל טכני", points: ["Flutter ו־Google ML Kit לניתוח מידות גוף בזמן אמת.", "ארכיטקטורת BLoC שהורידה את חוסר היציבות בכ־50%.", "CI/CD שקיצר את הזמן לשוק בכ־40%.", "בדיקות A/B למסכי ההרשמה."] },
        { name: "ITA", points: ["עוזר הוראה ששולח צילום מסך ל־GPT-5 ומצייר את התשובה על המסך, עם WPF, React, n8n ו־Supabase."] },
        { name: "LuxCal ו־Spidclass", points: ["אפליקציות Flutter עם פונקציות ענן מתוזמנות ומעקב נוכחות ותשלומים."] },
        { name: "אתרים", points: ["תיקי עבודות עם וידאו כבד ו־CMS, אתרי עסקים דו־לשוניים ותבניות לאתרי מאמנים. אפשר לראות אותם [בעמוד האתרים](/web)."] },
      ],
    },
    teaching: {
      heading: "הוראה ותוכן",
      body: "אני מרצה בתחומי התכנות וההנדסה, מלווה פרויקטי גמר ומפתח ומעביר קורסים לשימוש מעשי ב־AI ובאוטומציה. אני כותב [בלוג](/blog) על אבטחת AI ועל כלי עבודה עם סוכנים, ומפרסם כל בוקר [חדשות טכנולוגיה בעברית](/news) שסוכן מרכיב.",
    },
    tools: {
      heading: "הכלים שלי",
      groups: TOOL_GROUPS({ languages: "שפות", mobile: "מובייל", web: "ווב", backend: "שרת", data: "נתונים", automation: "אוטומציה", infra: "תשתית", iap: "רכישות בתוך האפליקציה", evals: "הערכות ובנצ'מרקים", ondevice: "מודלים על המכשיר", bots: "בוטים לטלגרם ולוואטסאפ" }),
    },
    cta: {
      heading: "בואו נדבר",
      body: "רוצים לבנות משהו, או לשמוע איך אני יכול להשתלב בצוות?",
      email: EMAIL,
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },
};
