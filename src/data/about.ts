/**
 * Content of the about pages (/about in Hebrew, /about-en in English). Strings may use three bits of inline
 * markup: [text](url) for links, **text** for emphasis and `code`. AboutPage.astro renders them; nothing else is
 * interpreted. Everything here is sourced from Tom's own material (this site, his blog posts and his repos).
 */
export type Lang = "he" | "en";

export type SketchKey = "mathbook" | "gomlin" | "locket" | "nykma" | "agents";

export interface Product {
  name: string;
  href?: string;
  sketch: SketchKey;
  summary: string;
  points: string[];
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
    intro: string[];
    doodleAlt: string;
    principles: { title: string; body: string }[];
    contact: string;
  };
  products: { heading: string; lead: string; items: Product[] };
  journey: { heading: string; lead: string; actionLabel: string; items: { title: string; problem: string; action: string }[] };
  agents: { heading: string; lead: string; dayHeading: string; day: string[]; rulesHeading: string; rules: string[] };
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
  goals: { heading: string; lead: string; items: { title: string; body: string }[] };
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

export const ABOUT: Record<Lang, AboutCopy> = {
  en: {
    meta: {
      title: "About | Tom Cohen, full-stack developer, AI and automation",
      heading: "I've spent five years taking products from an idea to something people actually use.",
      description: "Tom Cohen, full-stack developer, founder and lecturer: what I've built, the problems I ran into along the way, how I work today and where I'm heading.",
      path: "/about-en",
      translation: "/about",
    },
    nav: { home: "Home (Hebrew)", homeHref: "/", other: "לקריאה בעברית" },
    hero: {
      hello: "Tom Cohen, full-stack developer",
      intro: [
        "I'm a developer, founder and lecturer. Over five years I've built iPhone and Android apps, web systems, back ends, automation and AI systems, for private clients, businesses and startups, and as independent products of my own.",
        "Building my own products taught me to think about everything at once: what the user needs, how the interface should feel, how the system works, and what it will take to keep developing and maintaining it. That's the approach I bring to every project.",
      ],
      doodleAlt: "Illustration of Tom Cohen waving",
      principles: [
        { title: "I work with AI agents as a team", body: "I plan the work, split it between agents, check what comes back and decide what ships. That's how a whole working product can now be built in a day or two." },
        { title: "I ship through automated releases", body: "On every project, merging is releasing, every change gets a preview, and nothing reaches users before the checks pass." },
      ],
      contact: "Contact me",
    },
    products: {
      heading: "What I've built",
      lead: "Products I designed and built on my own, from the first idea to launch.",
      items: [
        {
          name: "MathbookLM", href: "https://mathbooklm.com", sketch: "mathbook",
          summary: "A math notebook that works with handwriting. You write on an infinite canvas, select a region, and it recognises what you wrote, solves or checks it in the browser, and writes the result back onto the canvas.",
          points: ["To keep the results trustworthy, the language model only reasons and orchestrates; the arithmetic itself is always computed deterministically.", "I added interactive simulations that the model builds on the fly.", "It has a paid tier, and I'm running a pilot program with tutors."],
          links: [{ label: "mathbooklm.com", href: "https://mathbooklm.com" }],
        },
        {
          name: "Gomlin Jobs", sketch: "gomlin",
          summary: "A swipe-to-apply job app on the App Store and Google Play. I built the whole system alone: the mobile app, the server, the job collection and the application automation.",
          points: ["Jobs are collected from about 46 sources, and every listing is classified with AI.", "Applications are submitted automatically to common applicant tracking systems.", "Recruiter replies are relayed to each user's real inbox.", "I can switch any application source on or off without releasing a new version of the app."],
          links: [{ label: "App Store", href: "https://apps.apple.com/us/app/gomlin-jobs/id6744745540" }, { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.gomlinjobs.gomlin" }],
        },
        {
          name: "Locket AI", sketch: "locket",
          summary: "An AI app that runs entirely on the phone, with no cloud at all: chat, image understanding and image generation.",
          points: ["To make it run on low-end phones, I built a layer that swaps models in and out to fit the available memory.", "I connected the models natively on each platform: Kotlin on Android, Swift on iPhone, and C++ for image generation."],
        },
        {
          name: "nykma", sketch: "nykma",
          summary: "A local tool that turns a short brief into finished videos and post copy. An agent proposes an idea, builds the video in code with a render engine I wrote, and hands me files for each platform.",
          points: ["It started as Helix, a much heavier creative studio with eight sub-agents.", "I compare prompt versions on 14 fixed briefs, judging cost and quality blind.", "Nothing is published without my approval."],
          links: [{ label: "The story behind it", href: "/blog/nykma-en" }],
        },
        {
          name: "agents.tomcohen.dev", sketch: "agents",
          summary: "A workflow platform where AI agents are steps in the process. It works like n8n, but you change a workflow by asking an agent instead of editing it by hand.",
          points: ["Each workflow is a folder of plain files.", "Code steps cost nothing, and agent steps run on my own server with the cheapest model that can do the job.", "Anything that reaches the outside world waits for my approval and has a daily limit."],
        },
      ],
    },
    journey: {
      heading: "Problems I ran into",
      lead: "Some of the harder lessons from the last few years, and what I did about them.",
      actionLabel: "What I did",
      items: [
        {
          title: "Nobody knew about my apps",
          problem: "I'm a developer with no social media background, and posting stressed me out. I kept improving my products and putting off telling anyone about them.",
          action: "I built nykma to get from finished work to a video and a caption I can actually publish. Since then I've been sharing my work far more reliably. [I wrote about it here](/blog/nykma-en).",
        },
        {
          title: "More agents wasn't better",
          problem: "My first attempt, Helix, was a creative studio with eight sub-agents, model routing and a spending gate. It grew into a heavy system.",
          action: "I measured it against one agent with a short prompt and a set of reusable parts. The simpler setup won, so I rebuilt the tool that way as nykma and documented why.",
        },
        {
          title: "The handoffs took the time",
          problem: "Agents could write useful code, and I still spent a lot of attention getting the work to the next step: which project it belonged to, what had been tried, whether the tests had finished, how to continue from another device.",
          action: "I built my setup on T3 Code and Yarden Zamir's Kitshn, with forks of my own, so work keeps moving between my decisions. [The full story](/blog/t3-kitshn-en).",
        },
        {
          title: "An app about to disappear",
          problem: "Yellow Candle, a Holocaust remembrance app for FJMC, was about to be removed from the app stores.",
          action: "I updated it to current store requirements and kept it available. [The case study](/en/case-studies/yellow-candle).",
        },
      ],
    },
    agents: {
      heading: "How I work today",
      lead: "An agent can write good code, but most of the value comes from the environment around it: the files, tools, instructions and permissions it works with, and how the work is split, who reviews whom and what counts as done.",
      dayHeading: "A typical piece of work",
      day: [
        "A lead agent gets the outcome and the constraints from me.",
        "It hands bounded tasks to other agents: research, implementation and an independent review. Each agent that touches code works in its own copy of the repository.",
        "Findings come back, and disagreements between agents get resolved.",
        "Everything is checked against real behaviour: a diff, a test run or a result I can reproduce.",
        "When the work waits for CI or a review, it picks up again by itself as soon as the result arrives.",
      ],
      rulesHeading: "Rules I don't bend",
      rules: [
        "Anything that leaves the system (a post, an email, a publication or a payment) waits for a human to approve it.",
        "Agents never get access to credentials.",
        "Text from the outside is data, never instructions.",
        "Every action has a limit.",
        "Nothing is done until it's verified.",
      ],
    },
    cicd: {
      heading: "Releasing without the drama",
      lead: "I design the release process of everything I ship. Nobody deploys by hand, every change can be seen before it goes live, and a broken change doesn't reach users quietly.",
      pipeline: ["push", "checks", "preview", "merge", "live", "verified"],
      pipelineNote: "The same flow on every project.",
      lanes: [
        {
          name: "Mobile",
          items: [
            { title: "Gomlin", points: ["The staging build goes to testers and the main build goes to the stores, with no manual steps.", "Build numbers and signing are handled by the pipeline, with separate development, staging and production versions."] },
            { title: "tick3d for iPhone", points: ["Every build reaches external testers automatically, and a re-run never submits twice.", "Every pull request also checks the release pipeline itself, so a broken pipeline shows up in review instead of on release day."] },
            { title: "My T3 Code fork", points: ["The Android app is built, signed and updated automatically, and the desktop apps get nightly builds."] },
          ],
        },
        {
          name: "Web",
          items: [
            { title: "Most of my sites", points: ["Every push to main goes live, and every pull request gets its own preview link."] },
            { title: "Deployed means visible", points: ["On MathbookLM, a deploy only counts once the live site actually serves the new version.", "On this site, every change is linted, type-checked, built and audited, and the live site is checked again after each deploy."] },
          ],
        },
        {
          name: "Servers",
          items: [
            { title: "Container deploys", points: ["Each push runs the tests and builds a new image; the server pulls it and restarts, with staging and production kept apart."] },
            { title: "My own server", points: ["Deploys need no stored keys, traffic only reaches healthy apps, and a repository's first deploy needs my approval.", "Data is backed up daily, and private apps sit behind access control."] },
            { title: "Safe restarts", points: ["A deploy never restarts the server in the middle of a running job, and interrupted jobs resume on startup."] },
          ],
        },
      ],
      fork: {
        heading: "A fork that maintains itself",
        steps: ["Every three hours, my T3 Code fork pulls in the latest upstream changes.", "If the merge conflicts or the tests fail, an issue opens and a repair agent on my server takes it.", "The agent opens a fix and merges it only once all the checks pass."],
      },
    },
    oss: {
      heading: "Open source",
      lead: "I use both of these projects by Yarden Zamir every day, and contribute to them.",
      projects: [
        {
          name: "Kitshn", href: "https://github.com/Yarden-zamir/kitshn", by: "by Yarden Zamir",
          body: "Deploys apps from GitHub to Cloudflare and to your own machines, with a map that decides who can open each app. I run my own instance and deploy my apps through it: an agent proposes a change to the map, I approve it, and the agent deploys.",
          points: ["About 28 commits in [my fork](https://github.com/TomCohenDev/kitshn):", "the map interface, with a flat look, light and dark modes and a demo map of a small company;", "the kitshn.com website: the home, enterprise, How it works and install pages;", "an explainer video."],
        },
        {
          name: "tick3d", href: "https://github.com/Yarden-zamir/tick3d", by: "by Yarden Zamir",
          body: "3D tic-tac-toe on a 4×4×4 cube. What I added:",
          points: ["a neo-brutalist interface with 12 themes;", "turning the tower by dragging;", "real-time chat between players;", "an iOS app that's built and sent to testers automatically;", "tick3d Factory (in progress), which shows a repository as an animated 3D factory: imports are conveyor belts, HTTP calls are pneumatic tubes and deploys are trains."],
        },
      ],
      moreHeading: "Other contributions",
      more: ["[My T3 Code fork](https://github.com/TomCohenDev/t3code): 74 commits and 25 merged pull requests. It can continue a conversation from another machine even when the original one is off, back conversations up to a second machine, and update its Android app by itself.", "[A vulnerability registry for AI agents](https://github.com/TomCohenDev/vulnerability-registry-mcp): turns a legacy plain-text registry into structured tools Claude can use."],
    },
    clients: {
      heading: "Client work",
      lead: "Apps, websites and automations I built for clients, from the first version to long-term maintenance.",
      featured: [
        { name: "Dronebag", href: "/en/case-studies/dronebag", image: { src: "/case_studies/dronebag/assets/dronebag-home-screen.webp", alt: "Dronebag home screen" }, points: ["Drone fleet management for field units, built to keep working offline and sync later."] },
        { name: "Yellow Candle", href: "/en/case-studies/yellow-candle", image: { src: "/case_studies/virtual_shoa_candle/assets/mobile-app-candle-lighting.webp", alt: "Yellow Candle candle-lighting screen" }, points: ["A Holocaust remembrance app for FJMC that I saved from removal from the app stores."] },
        { name: "Nightwing", href: "/en/case-studies/nightwing", image: { src: "/case_studies/nightwing-ph/assets/web-app-landing-page-hero.webp", alt: "Nightwing ordering site" }, points: ["A bilingual restaurant ordering site. Each order is numbered, logged to a sheet and sent to the kitchen on Telegram automatically."] },
      ],
      others: [
        { name: "AI-powered virtual fitting app", role: "Technical lead, 2022 to present", points: ["Real-time body-measurement analysis on the phone.", "An architecture change that cut instability by about 50%.", "A release pipeline that shortened time to market by about 40%.", "A/B tests on the onboarding flows."] },
        { name: "ITA", points: ["A teaching assistant that sends a screenshot to GPT-5 and draws the answer right on the screen."] },
        { name: "LuxCal and Spidclass", points: ["Mobile apps with scheduled background jobs, attendance tracking and payment tracking."] },
        { name: "Websites", points: ["Video-heavy portfolios with a CMS, bilingual business sites, and templates for coaches' sites."] },
      ],
    },
    goals: {
      heading: "Where I'm heading",
      lead: "What I'm working toward next.",
      items: [
        { title: "Less friction in how I build", body: "I keep improving my setup wherever work still stalls: a handoff I keep repeating, context that gets lost, or something I keep checking by hand." },
        { title: "Sharing what I build", body: "In nykma, I want to test creative directions before building a full video, and get feedback from the actual render on readability, timing, Hebrew layout and product accuracy." },
        { title: "Helping others build", body: "Through teaching and writing, I want to break complex topics into clear parts and help people get to the point where they can build and solve problems on their own." },
      ],
    },
    teaching: {
      heading: "Teaching and writing",
      body: "I lecture on programming and engineering, supervise final-year projects, and build and teach practical courses in AI and automation. I write a [blog](/blog) on AI security and working with agents, and publish a daily [Hebrew tech news issue](/news) put together by an agent.",
    },
    tools: {
      heading: "Technical skills",
      groups: TOOL_GROUPS({ languages: "Languages", mobile: "Mobile", web: "Web", backend: "Back end", data: "Data", automation: "Automation", infra: "Infrastructure", iap: "in-app purchases", evals: "evals and benchmarks", ondevice: "on-device models", bots: "Telegram and WhatsApp bots" }),
    },
    cta: {
      heading: "Get in touch",
      body: "Want to build something together, or see how I'd fit on your team? Reach me by email or on LinkedIn.",
      email: EMAIL,
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },

  he: {
    meta: {
      title: "אודות | תום כהן, מפתח Full-stack, AI ואוטומציה",
      heading: "כבר חמש שנים אני לוקח מוצרים מרעיון ועד משהו שאנשים באמת משתמשים בו.",
      description: "תום כהן, מפתח Full-stack, יזם ומרצה: מה בניתי, באילו קשיים נתקלתי בדרך, איך אני עובד היום ולאן אני הולך.",
      path: "/about",
      translation: "/about-en",
    },
    nav: { home: "לעמוד הבית", homeHref: "/", other: "Read in English" },
    hero: {
      hello: "תום כהן, מפתח Full-stack",
      intro: [
        "אני מפתח, יזם ומרצה. בחמש השנים האחרונות בניתי אפליקציות לאייפון ולאנדרואיד, מערכות ווב, צד שרת, אוטומציות ומערכות AI, עבור אנשים פרטיים, עסקים וסטארטאפים, וגם מוצרים עצמאיים משלי.",
        "כשבונים מוצר משלך, צריך לחשוב על הכול: מה המשתמש צריך, איך הממשק ירגיש, איך המערכת תעבוד ומה יידרש כדי להמשיך לפתח ולתחזק אותה. זו הגישה שאני מביא לכל פרויקט.",
      ],
      doodleAlt: "איור של תום כהן מנופף לשלום",
      principles: [
        { title: "אני עובד עם סוכני AI כצוות", body: "אני מתכנן את העבודה, מחלק אותה בין סוכנים, בודק את מה שחוזר ומחליט מה עולה לאוויר. ככה מוצר שלם ועובד יכול היום להיבנות ביום או ביומיים." },
        { title: "אני משחרר בצורה אוטומטית", body: "בכל פרויקט מיזוג הוא שחרור, לכל שינוי יש תצוגה מקדימה, ושום דבר לא מגיע למשתמשים לפני שהבדיקות עוברות." },
      ],
      contact: "ליצירת קשר",
    },
    products: {
      heading: "מה בניתי",
      lead: "מוצרים שתכננתי ובניתי בעצמי, מהרעיון הראשון ועד ההשקה.",
      items: [
        {
          name: "MathbookLM", href: "https://mathbooklm.com", sketch: "mathbook",
          summary: "מחברת מתמטיקה שעובדת עם כתב יד. כותבים על קנבס אינסופי, מסמנים אזור, והמערכת מזהה את מה שנכתב, פותרת או בודקת אותו בתוך הדפדפן, וכותבת את התוצאה בחזרה על הקנבס.",
          points: ["כדי שאפשר יהיה לסמוך על התוצאות, מודל השפה רק מסיק ומתזמר, והחישוב עצמו תמיד דטרמיניסטי.", "הוספתי סימולציות אינטראקטיביות שהמודל בונה בזמן אמת.", "יש בה מנוי בתשלום, ואני מריץ תוכנית פיילוט עם מורים."],
          links: [{ label: "mathbooklm.com", href: "https://mathbooklm.com" }],
        },
        {
          name: "Gomlin Jobs", sketch: "gomlin",
          summary: "אפליקציית חיפוש עבודה בהחלקה, ב־App Store וב־Google Play. בניתי לבד את כל המערכת: האפליקציה, השרת, איסוף המשרות ואוטומציית ההגשה.",
          points: ["משרות נאספות מכ־46 מקורות, וכל משרה מסווגת עם AI.", "המועמדות מוגשת אוטומטית למערכות גיוס נפוצות.", "תשובות של מגייסים מועברות לתיבת המייל האמיתית של המשתמש.", "אני יכול להפעיל או לכבות כל מקור הגשה בלי לשחרר גרסה חדשה של האפליקציה."],
          links: [{ label: "App Store", href: "https://apps.apple.com/us/app/gomlin-jobs/id6744745540" }, { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.gomlinjobs.gomlin" }],
        },
        {
          name: "Locket AI", sketch: "locket",
          summary: "אפליקציית AI שרצה כולה על הטלפון, בלי ענן בכלל: צ'אט, הבנת תמונות ויצירת תמונות.",
          points: ["כדי שתרוץ גם על טלפונים חלשים, בניתי שכבה שמחליפה בין המודלים לפי הזיכרון הפנוי.", "חיברתי את המודלים באופן טבעי לכל פלטפורמה: Kotlin באנדרואיד, Swift באייפון ו־C++ ליצירת תמונות."],
        },
        {
          name: "nykma", sketch: "nykma",
          summary: "כלי מקומי שהופך בריף קצר לסרטונים וטקסטים מוכנים לפרסום. סוכן מציע רעיון, בונה את הסרטון בקוד עם מנוע רינדור שכתבתי, ומחזיר לי קבצים לכל פלטפורמה.",
          points: ["הוא התחיל כ־Helix, סטודיו כבד בהרבה עם שמונה סוכני משנה.", "אני משווה גרסאות פרומפט על 14 בריפים קבועים, בהשוואה עיוורת של עלות ואיכות.", "שום דבר לא מתפרסם בלי האישור שלי."],
          links: [{ label: "הסיפור מאחוריו", href: "/blog/nykma" }],
        },
        {
          name: "agents.tomcohen.dev", sketch: "agents",
          summary: "פלטפורמת Workflows שבה סוכני AI הם שלבים בתהליך. היא עובדת כמו n8n, אבל משנים תהליך בבקשה מסוכן במקום לערוך אותו ידנית.",
          points: ["כל Workflow הוא תיקייה של קבצים פשוטים.", "שלבי קוד לא עולים כלום, ושלבי סוכן רצים על השרת שלי עם המודל הזול ביותר שיכול לעשות את העבודה.", "כל דבר שיוצא החוצה מחכה לאישור שלי ויש לו תקרה יומית."],
        },
      ],
    },
    journey: {
      heading: "קשיים שנתקלתי בהם",
      lead: "חלק מהשיעורים הקשים של השנים האחרונות, ומה עשיתי איתם.",
      actionLabel: "מה עשיתי",
      items: [
        {
          title: "אף אחד לא הכיר את האפליקציות שלי",
          problem: "אני מפתח בלי רקע בסושיאל, ולפרסם ברשתות הלחיץ אותי. המשכתי לשפר את המוצרים ודחיתי את הרגע שבו אספר עליהם למישהו.",
          action: "בניתי את nykma כדי להגיע מעבודה גמורה לסרטון ולטקסט שאני באמת יכול לפרסם. מאז אני משתף את העבודה שלי הרבה יותר בעקביות. [כתבתי על זה כאן](/blog/nykma).",
        },
        {
          title: "יותר סוכנים לא היה טוב יותר",
          problem: "הניסיון הראשון שלי, Helix, היה סטודיו קריאייטיב עם שמונה סוכני משנה, ניתוב מודלים ושער הוצאות. הוא הפך למערכת כבדה.",
          action: "מדדתי אותו מול סוכן אחד עם פרומפט קצר וסט של חלקים לשימוש חוזר. הגרסה הפשוטה ניצחה, אז בניתי את הכלי מחדש בצורה הזו בתור nykma, ותיעדתי למה.",
        },
        {
          title: "ההעברות בין השלבים לקחו את הזמן",
          problem: "סוכנים ידעו לכתוב קוד שימושי, ועדיין השקעתי הרבה קשב כדי להביא את העבודה לשלב הבא: לאיזה פרויקט היא שייכת, מה כבר נוסה, אם הבדיקות הסתיימו, ואיך ממשיכים ממכשיר אחר.",
          action: "בניתי את הסביבה שלי על T3 Code ועל Kitshn של ירדן זמיר, עם פורקים משלי, כך שהעבודה ממשיכה להתקדם בין ההחלטות שלי. [הסיפור המלא](/blog/t3-kitshn).",
        },
        {
          title: "אפליקציה שעמדה להיעלם",
          problem: "Yellow Candle, אפליקציית זיכרון לשואה עבור FJMC, עמדה להיות מוסרת מחנויות האפליקציות.",
          action: "עדכנתי אותה לדרישות העדכניות של החנויות ושמרתי אותה זמינה. [לסיפור המלא](/en/case-studies/yellow-candle).",
        },
      ],
    },
    agents: {
      heading: "איך אני עובד היום",
      lead: "סוכן יכול לכתוב קוד טוב, אבל רוב הערך מגיע מהסביבה שסביבו: הקבצים, הכלים, ההוראות וההרשאות שהוא עובד איתם, ואיך העבודה מתחלקת, מי בודק את מי ומה נחשב גמור.",
      dayHeading: "ככה נראית משימה רגילה",
      day: [
        "סוכן ראשי מקבל ממני את המטרה ואת המגבלות.",
        "הוא מעביר משימות מוגדרות לסוכנים אחרים: מחקר, מימוש וביקורת בלתי תלויה. כל סוכן שנוגע בקוד עובד בעותק נפרד של הריפו.",
        "הממצאים חוזרים, ומחלוקות בין הסוכנים מוכרעות.",
        "הכול נבדק מול התנהגות אמיתית: diff, הרצת בדיקות או תוצאה שאני יכול לשחזר.",
        "כשהעבודה מחכה ל־CI או לביקורת, היא ממשיכה לבד ברגע שהתוצאה מגיעה.",
      ],
      rulesHeading: "כללים שאני לא מתפשר עליהם",
      rules: [
        "כל דבר שיוצא מהמערכת (פוסט, מייל, פרסום או תשלום) מחכה לאישור של אדם.",
        "לסוכנים אין גישה למפתחות.",
        "טקסט שמגיע מבחוץ הוא מידע, אף פעם לא הוראות.",
        "לכל פעולה יש תקרה.",
        "שום דבר לא גמור לפני שנבדק.",
      ],
    },
    cicd: {
      heading: "שחרור בלי דרמה",
      lead: "את תהליך השחרור של כל מה שאני בונה אני מתכנן בעצמי. אף אחד לא מעלה לאוויר ביד, כל שינוי אפשר לראות לפני שהוא עולה, ושינוי שבור לא מגיע בשקט למשתמשים.",
      pipeline: ["push", "בדיקות", "תצוגה מקדימה", "מיזוג", "באוויר", "נבדק"],
      pipelineNote: "אותו תהליך בכל פרויקט.",
      lanes: [
        {
          name: "מובייל",
          items: [
            { title: "Gomlin", points: ["גרסת ה־staging מגיעה לבודקים וגרסת ה־main מגיעה לחנויות, בלי שום צעד ידני.", "מספרי הגרסה והחתימה מנוהלים בצנרת, עם גרסאות נפרדות לפיתוח, ל־staging ולפרודקשן."] },
            { title: "tick3d לאייפון", points: ["כל build מגיע לבודקים חיצוניים אוטומטית, והרצה חוזרת אף פעם לא שולחת פעמיים.", "כל Pull Request בודק גם את צנרת השחרור עצמה, כך ששבר בצנרת מתגלה בביקורת ולא ביום השחרור."] },
            { title: "הפורק שלי של T3 Code", points: ["אפליקציית האנדרואיד נבנית, נחתמת ומתעדכנת אוטומטית, ואפליקציות המחשב מקבלות בניות לילה."] },
          ],
        },
        {
          name: "אתרים",
          items: [
            { title: "רוב האתרים שלי", points: ["כל push ל־main עולה לאוויר, ולכל Pull Request יש קישור תצוגה מקדימה משלו."] },
            { title: "עלה זה אומר שרואים", points: ["ב־MathbookLM דיפלוי נחשב גמור רק כשהאתר החי באמת מגיש את הגרסה החדשה.", "באתר הזה כל שינוי עובר lint, בדיקת טיפוסים, build ובדיקת אתר, והאתר החי נבדק שוב אחרי כל דיפלוי."] },
          ],
        },
        {
          name: "שרתים",
          items: [
            { title: "דיפלוי בקונטיינרים", points: ["כל push מריץ את הבדיקות ובונה תמונה חדשה; השרת מושך אותה ועולה מחדש, ו־staging ו־production נשמרים נפרדים."] },
            { title: "השרת שלי", points: ["הדיפלוי לא צריך מפתחות שמורים, תנועה מגיעה רק לאפליקציות תקינות, והדיפלוי הראשון של כל ריפו דורש את האישור שלי.", "יש גיבוי יומי לנתונים, ואפליקציות פרטיות מוגנות בבקרת גישה."] },
            { title: "הפעלה מחדש בטוחה", points: ["דיפלוי אף פעם לא מפעיל מחדש את השרת באמצע עבודה שרצה, ועבודות שנקטעו ממשיכות כשהוא עולה."] },
          ],
        },
      ],
      fork: {
        heading: "פורק שמתחזק את עצמו",
        steps: ["כל שלוש שעות הפורק שלי של T3 Code מושך את השינויים האחרונים מהמקור.", "אם המיזוג מתנגש או שהבדיקות נכשלות, נפתח issue וסוכן תיקון שרץ על השרת שלי לוקח אותו.", "הסוכן מציע תיקון וממזג אותו רק אחרי שכל הבדיקות עוברות."],
      },
    },
    oss: {
      heading: "קוד פתוח",
      lead: "אני משתמש בשני הפרויקטים האלה של ירדן זמיר כל יום, ותורם להם.",
      projects: [
        {
          name: "Kitshn", href: "https://github.com/Yarden-zamir/kitshn", by: "של ירדן זמיר",
          body: "פריסת אפליקציות מ־GitHub ל־Cloudflare ולמכונות שלך, עם מפה שקובעת מי יכול לפתוח כל אפליקציה. אני מריץ מופע משלי ופורס דרכו את האפליקציות שלי: סוכן מציע שינוי במפה, אני מאשר, והסוכן פורס.",
          points: ["כ־28 commits [בפורק שלי](https://github.com/TomCohenDev/kitshn):", "ממשק המפה, עם מראה שטוח, מצב בהיר וכהה ומפת דמו של חברה קטנה;", "האתר kitshn.com: עמוד הבית ועמודי enterprise, How it works ו־install;", "סרטון הסבר."],
        },
        {
          name: "tick3d", href: "https://github.com/Yarden-zamir/tick3d", by: "של ירדן זמיר",
          body: "איקס־עיגול תלת־ממדי על קובייה של 4×4×4. מה שהוספתי:",
          points: ["ממשק נאו־ברוטליסטי עם 12 ערכות נושא;", "סיבוב המגדל בגרירה;", "צ'אט בזמן אמת בין שחקנים;", "אפליקציית iOS שנבנית ונשלחת לבודקים אוטומטית;", "tick3d Factory (בפיתוח), שמציג ריפו כמפעל תלת־ממדי מונפש: imports הם מסועים, קריאות HTTP הן צינורות ודיפלוי הוא רכבת."],
        },
      ],
      moreHeading: "תרומות נוספות",
      more: ["[הפורק שלי של T3 Code](https://github.com/TomCohenDev/t3code): 74 commits ו־25 Pull Requests שמוזגו. הוא יודע להמשיך שיחה ממחשב אחר גם כשהמחשב המקורי כבוי, לגבות שיחות למחשב נוסף ולעדכן את אפליקציית האנדרואיד שלו לבד.", "[מאגר חולשות לסוכני AI](https://github.com/TomCohenDev/vulnerability-registry-mcp): הופך מאגר טקסט ישן לכלים מובנים ש־Claude יכול להשתמש בהם."],
    },
    clients: {
      heading: "עבודה עם לקוחות",
      lead: "אפליקציות, אתרים ואוטומציות שבניתי ללקוחות, מהגרסה הראשונה ועד תחזוקה לאורך זמן.",
      featured: [
        { name: "Dronebag", href: "/en/case-studies/dronebag", image: { src: "/case_studies/dronebag/assets/dronebag-home-screen.webp", alt: "מסך הבית של Dronebag" }, points: ["ניהול צי רחפנים ליחידות בשטח, שממשיך לעבוד גם בלי חיבור ומסתנכרן אחר כך."] },
        { name: "Yellow Candle", href: "/en/case-studies/yellow-candle", image: { src: "/case_studies/virtual_shoa_candle/assets/mobile-app-candle-lighting.webp", alt: "מסך הדלקת הנר ב־Yellow Candle" }, points: ["אפליקציית זיכרון לשואה עבור FJMC, שהצלתי מהסרה מהחנויות."] },
        { name: "Nightwing", href: "/en/case-studies/nightwing", image: { src: "/case_studies/nightwing-ph/assets/web-app-landing-page-hero.webp", alt: "אתר ההזמנות של Nightwing" }, points: ["אתר הזמנות דו־לשוני למסעדה. כל הזמנה ממוספרת, נרשמת בגיליון ונשלחת למטבח בטלגרם אוטומטית."] },
      ],
      others: [
        { name: "אפליקציית מדידה וקנייה וירטואלית מבוססת AI", role: "מוביל טכני, מ־2022 ועד היום", points: ["ניתוח מידות גוף בזמן אמת על הטלפון.", "שינוי ארכיטקטורה שהוריד את חוסר היציבות בכ־50%.", "תהליך שחרור שקיצר את הזמן לשוק בכ־40%.", "בדיקות A/B למסכי ההרשמה."] },
        { name: "ITA", points: ["עוזר הוראה ששולח צילום מסך ל־GPT-5 ומצייר את התשובה ישירות על המסך."] },
        { name: "LuxCal ו־Spidclass", points: ["אפליקציות מובייל עם משימות רקע מתוזמנות, מעקב נוכחות ומעקב תשלומים."] },
        { name: "אתרים", points: ["תיקי עבודות עם הרבה וידאו ו־CMS, אתרי עסקים דו־לשוניים ותבניות לאתרי מאמנים. אפשר לראות אותם [בעמוד האתרים](/web)."] },
      ],
    },
    goals: {
      heading: "לאן אני הולך",
      lead: "על מה אני עובד מכאן והלאה.",
      items: [
        { title: "פחות חיכוך בדרך שבה אני בונה", body: "אני ממשיך לשפר את הסביבה שלי בכל מקום שבו העבודה עדיין נתקעת: העברה שאני חוזר עליה, הקשר שהולך לאיבוד או משהו שאני בודק ידנית שוב ושוב." },
        { title: "לשתף את מה שאני בונה", body: "ב־nykma אני רוצה לבדוק כיוונים קריאייטיביים לפני שבונים סרטון שלם, ולקבל משוב מהרינדור עצמו על קריאות, תזמון, עימוד בעברית ודיוק לגבי המוצר." },
        { title: "לעזור לאחרים לבנות", body: "דרך הוראה וכתיבה אני רוצה לפרק נושאים מורכבים לחלקים ברורים ולעזור לאנשים להגיע לשלב שבו הם יכולים לבנות ולפתור בעצמם." },
      ],
    },
    teaching: {
      heading: "הוראה ותוכן",
      body: "אני מרצה בתחומי התכנות וההנדסה, מלווה פרויקטי גמר, ובונה ומעביר קורסים מעשיים ב־AI ובאוטומציה. אני כותב [בלוג](/blog) על אבטחת AI ועבודה עם סוכנים, ומפרסם כל בוקר [גיליון חדשות טכנולוגיה בעברית](/news) שסוכן מרכיב.",
    },
    tools: {
      heading: "יכולות טכניות",
      groups: TOOL_GROUPS({ languages: "שפות", mobile: "מובייל", web: "ווב", backend: "שרת", data: "נתונים", automation: "אוטומציה", infra: "תשתית", iap: "רכישות בתוך האפליקציה", evals: "הערכות ובנצ'מרקים", ondevice: "מודלים על המכשיר", bots: "בוטים לטלגרם ולוואטסאפ" }),
    },
    cta: {
      heading: "יצירת קשר",
      body: "רוצים לבנות משהו יחד, או לשמוע איך אני יכול להשתלב בצוות שלכם? אפשר לפנות אליי במייל או ב־LinkedIn.",
      email: EMAIL,
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },
};
