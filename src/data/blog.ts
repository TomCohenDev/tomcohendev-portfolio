import type { Post } from "../components/content/mock";

/** Published articles only. Mock posts remain on their existing noindex demo URLs. */
export const publishedPosts: Post[] = [
  {
    slug: "ai-security",
    title: "יותר מתקפות ויותר AI יוצרים צרכים חדשים באבטחה",
    description: "מה הנתונים אומרים על העלייה במתקפות, אילו פתרונות אבטחה כבר קיימים ואיפה אני רואה הזדמנות למפתחים ולצוותים קטנים.",
    date: "2026-11-02",
    readMinutes: 6,
    tags: ["AI", "אבטחת מידע", "יזמות"],
    cover: "code",
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
    body: [],
  },
];

export const blogTags = [...new Set(publishedPosts.flatMap((post) => post.tags))];
