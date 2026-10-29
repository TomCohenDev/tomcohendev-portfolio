/**
 * The daily news issues, read from news/issues/<date>.json at build time. The daily run writes them
 * (news/schedule.md); news/scripts/publish.mjs checks every issue before it is saved.
 */

export type Story = {
  id: string;
  topic: keyof typeof topics;
  headline: string;
  summary: string;
  forBusiness: string;
  source: { name: string; url: string };
  /** The image the source page shares (og:image), credited to the source. */
  image?: { url: string; alt: string };
  /** The earlier story this one continues. */
  continues?: { date: string; id: string; headline: string };
};

/** A one-line item ("מבזק"): a fact worth knowing that does not need a full story. */
export type Flash = {
  id: string;
  topic: keyof typeof topics;
  text: string;
  source: { name: string; url: string };
  image?: { url: string; alt: string };
};

/** A new tool or app that launched (Product Hunt, BetaList, Show HN): its name, what it does, and its page. */
export type Release = {
  id: string;
  name: string;
  text: string;
  source: { name: string; url: string };
  image?: { url: string; alt: string };
  /** The product's square logo: in the home page strip, and on /news when there is no image. */
  icon?: string;
};

export type Issue = {
  date: string;
  /** Tom's own update of the day, shown on top (news/updates/<date>.json). */
  update?: { title: string; text: string; href?: string };
  stories: Story[];
  /** Short items next to the stories. Issues before 2026-10-29 have none. */
  flashes?: Flash[];
  /** New tools and apps of the day. Issues before 2026-10-29 have none. */
  releases?: Release[];
};

/** Same keys as TOPICS in news/scripts/publish.mjs. */
export const topics = {
  mobile: "אפליקציות",
  ai: "AI",
  automation: "אוטומציה",
  security: "אבטחה",
  business: "עסקים",
  research: "מחקר",
} as const;

const files = import.meta.glob<Issue>("/news/issues/*.json", { eager: true, import: "default" });

/** A color per topic, for the tags. */
export const topicColors: Record<keyof typeof topics, string> = {
  mobile: "#7cc4fa",
  ai: "var(--a-accent)",
  automation: "var(--a-ok)",
  security: "#f28b82",
  business: "var(--a-human)",
  research: "#f0a6ca",
};

type Source = { name: string; url: string; topic: keyof typeof topics | "releases" };
const sourceFiles = import.meta.glob<{ sources: Source[] }>("/news/sources.json", { eager: true, import: "default" });

/** The feeds the daily run reads (news/sources.json), for the list on /news. */
export const sources: Source[] = Object.values(sourceFiles)[0]?.sources ?? [];

/** Newest first. */
export const issues: Issue[] = Object.values(files).sort((a, b) => b.date.localeCompare(a.date));
export const latestIssue: Issue | undefined = issues[0];

/** /news for the newest issue, /news/<date> for the others. */
export const issueHref = (issue: Issue) => (issue === issues[0] ? "/news" : `/news/${issue.date}`);
export const storyHref = (date: string, id: string) => `${issues[0]?.date === date ? "/news" : `/news/${date}`}#${id}`;
