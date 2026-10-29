import type { APIRoute } from "astro";
import { feed } from "../../components/content/feed";
import { formatDate, issues } from "../../components/content/mock";

export const GET: APIRoute = () =>
  feed({
    title: "חדשות הבוקר של תום כהן",
    description: "מה קרה בטכנולוגיה וב־AI, ומה זה אומר לעסק שלכם.",
    path: "/news",
    items: issues.map((i, n) => ({
      title: `חדשות הבוקר, ${formatDate(i.date)}`,
      description: i.stories.map((s) => s.headline).join(" · "),
      path: n === 0 ? "/news" : `/news/${i.date}`,
      date: i.date,
    })),
  });
