// Hebrew dates for the content pages. ISO dates (YYYY-MM-DD) are read at noon UTC so the day never shifts.
const he = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", ...opts });
const at = (iso: string) => new Date(`${iso}T12:00:00Z`);

export const formatDate = (iso: string) => he({ day: "numeric", month: "long", year: "numeric" }).format(at(iso));
export const formatDay = (iso: string) => he({ weekday: "long", day: "numeric", month: "long" }).format(at(iso));
export const formatMonth = (iso: string) => he({ month: "long", year: "numeric" }).format(at(iso));
export const dayNumber = (iso: string) => he({ day: "numeric" }).format(at(iso));
export const monthShort = (iso: string) => he({ month: "short" }).format(at(iso));
/** "29.10", for links between issues. */
export const shortDate = (iso: string) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}`;
/** Today in Israel, as YYYY-MM-DD. */
export const israelToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jerusalem" }).format(new Date());
