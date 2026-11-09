import type { Post } from "../components/content/mock";

/** Published articles only. Mock posts remain on their existing noindex demo URLs. */
export const publishedPosts: Post[] = [
  {
    slug: "black-october",
    title: "אוקטובר השחור: מפתח ה־API שלכם הפך לתקציב של מישהו אחר",
    description: "שמונה לקחים מאירועי האבטחה בפלטפורמות פיתוח באוקטובר 2026, עם מספרים מדווחים, מקורות ראשוניים ומשמעות מעשית למי שבונה עם AI.",
    date: "2026-11-09",
    readMinutes: 7,
    tags: ["AI", "אבטחת מידע", "בניית מוצרים"],
    cover: "code",
    image: "/blog/black-october-cover.webp",
    body: [],
  },
  {
    slug: "black-october-en",
    title: "Black October: Your AI API Key Became Someone Else’s Budget",
    description: "Eight lessons from the October 2026 attacks on developer platforms, with reported numbers, primary sources, and practical implications for people building with AI.",
    date: "2026-11-09",
    readMinutes: 7,
    tags: ["AI", "Security", "English"],
    cover: "code",
    image: "/blog/black-october-cover.webp",
    body: [],
  },
  {
    slug: "nykma",
    title: "עשיתי אוטומציה למודעות שלי כי רשתות חברתיות מלחיצות אותי",
    description: "אין לי רקע בסושיאל, ולפרסם ברשתות מלחיץ אותי. אז בניתי את Nykma כדי להכין מודעות ולהצליח לשתף את מה שאני בונה.",
    date: "2026-11-09",
    readMinutes: 7,
    tags: ["AI", "אוטומציה", "בניית מוצרים"],
    cover: "flow",
    image: "/blog/nykma-cover.webp",
    body: [],
  },
  {
    slug: "nykma-en",
    title: "I Automated My Ads Because Social Media Stresses Me Out",
    description: "I have no social media background, and posting stresses me out. So I built Nykma to help me make ads and actually share what I'm building.",
    date: "2026-11-09",
    readMinutes: 7,
    tags: ["AI", "Automation", "English"],
    cover: "flow",
    image: "/blog/nykma-cover.webp",
    body: [],
  },
  {
    slug: "ai-security",
    title: "יותר מתקפות ויותר AI יוצרים צרכים חדשים באבטחה",
    description: "מה הנתונים אומרים על העלייה במתקפות, אילו פתרונות אבטחה כבר קיימים ואיפה אני רואה הזדמנות למפתחים ולצוותים קטנים.",
    date: "2026-11-02",
    readMinutes: 6,
    tags: ["AI", "אבטחת מידע", "יזמות"],
    cover: "code",
    image: "/blog/ai-security-cover.webp",
    body: [],
  },
  {
    slug: "ai-security-en",
    title: "More attacks and more AI are creating new security needs",
    description: "What the attack data shows, which security solutions already exist, and where I see opportunities for developers and small teams.",
    date: "2026-11-02",
    readMinutes: 6,
    tags: ["AI", "אבטחת מידע", "English"],
    cover: "code",
    image: "/blog/ai-security-cover.webp",
    body: [],
  },
];

/** English translations are reachable only from their Hebrew article, so they stay out of the index and RSS. */
const translationSlugs = new Set(["ai-security-en", "nykma-en", "black-october-en"]);
export const listedPosts = publishedPosts.filter((post) => !translationSlugs.has(post.slug));

export const blogTags = [...new Set(listedPosts.flatMap((post) => post.tags))];
