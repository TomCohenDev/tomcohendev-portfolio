import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const NEWS = join(dirname(fileURLToPath(import.meta.url)), "..");
export const ISSUES = join(NEWS, "issues");

/** Today's date in Israel, as YYYY-MM-DD. */
export const israelToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jerusalem" }).format(new Date());

/** Every published issue, oldest first. */
export const readIssues = () =>
  existsSync(ISSUES)
    ? readdirSync(ISSUES)
        .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
        .sort()
        .map((f) => JSON.parse(readFileSync(join(ISSUES, f), "utf8")))
    : [];

/** Source URLs of every story already published, so no story appears twice. */
export const coveredUrls = (except) =>
  new Set(readIssues().filter((i) => i.date !== except).flatMap((i) => i.stories.map((s) => s.source.url)));
