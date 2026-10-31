import type { APIRoute } from "astro";
import { feed } from "../../components/content/feed";
import { posts } from "../../components/content/mock";

export const GET: APIRoute = () =>
  feed({
    title: "הבלוג של תום כהן",
    description: "מה למדתי מבניית אפליקציות ואוטומציות לעסקים.",
    path: "/blog",
    items: posts.map((p) => ({ title: p.title, description: p.description, path: `/blog/${p.slug}`, date: p.date })),
  });
