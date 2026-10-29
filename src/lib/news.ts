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
  /** The earlier story this one continues. */
  continues?: { date: string; id: string; headline: string };
};

export type Issue = {
  date: string;
  /** Tom's own update of the day, shown on top (news/updates/<date>.json). */
  update?: { title: string; text: string; href?: string };
  stories: Story[];
};

/** Same keys as TOPICS in news/scripts/publish.mjs. */
export const topics = {
  mobile: "אפליקציות",
  ai: "AI",
  automation: "אוטומציה",
  security: "אבטחה",
  business: "עסקים",
} as const;

const files = import.meta.glob<Issue>("/news/issues/*.json", { eager: true, import: "default" });

/** Newest first. */
export const issues: Issue[] = Object.values(files).sort((a, b) => b.date.localeCompare(a.date));
export const latestIssue: Issue | undefined = issues[0];

/** /news for the newest issue, /news/<date> for the others. */
export const issueHref = (issue: Issue) => (issue === issues[0] ? "/news" : `/news/${issue.date}`);
export const storyHref = (date: string, id: string) => `${issues[0]?.date === date ? "/news" : `/news/${date}`}#${id}`;
