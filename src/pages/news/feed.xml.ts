import type { APIRoute } from "astro";
import { feed } from "../../components/content/feed";
import { formatDate } from "../../lib/dates";
import { issueHref, issues } from "../../lib/news";

export const GET: APIRoute = () =>
  feed({
    title: "חדשות הבוקר של תום כהן",
    description: "מה קרה בטכנולוגיה וב־AI, ומה זה אומר לעסק שלכם.",
    path: "/news",
    items: issues.map((i) => ({
      title: `חדשות הבוקר, ${formatDate(i.date)}`,
      description: i.stories.map((s) => s.headline).join(" · "),
      // The newest issue moves from /news to /news/<date> the next day, so the feed links the dated page.
      path: `/news/${i.date}`,
      date: i.date,
    })),
  });
