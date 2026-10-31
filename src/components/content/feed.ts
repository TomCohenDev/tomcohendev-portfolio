const SITE = "https://tomcohen.dev";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** A small RSS 2.0 feed, so the blog and the news need no feed package. */
export const feed = ({
  title,
  description,
  path,
  items,
}: {
  title: string;
  description: string;
  path: string;
  items: { title: string; description: string; path: string; date: string }[];
}) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(title)}</title>
    <link>${SITE}${path}</link>
    <description>${esc(description)}</description>
    <language>he</language>
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${SITE}${i.path}</link>
      <guid>${SITE}${i.path}</guid>
      <description>${esc(i.description)}</description>
      <pubDate>${new Date(`${i.date}T05:00:00Z`).toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
