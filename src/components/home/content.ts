/**
 * Copy for the Hebrew homepage (/). Same fact rules as ../automation/content.ts: projects and reviews
 * come from the existing pages' data, nothing is invented. Reviews are the ones Tom confirmed for
 * /mobile on 2026-10-28 (Roi, Liran, David, Jonathan).
 */
import { caseStudies } from "../automation/content";
import { mobileQuote, stories } from "../mobile/content";

/**
 * The words the hero writes, one after another. `visual` is the state of DynamicVisual that goes with
 * the word: 0 timeline, 1 app icons, 2 browser, 3 dashboard, 4 workflow, 5 network.
 */
export const heroWords = [
  { text: "אפליקציות", visual: 1 },
  { text: "אוטומציות", visual: 4 },
  { text: "מערכות", visual: 2 },
  { text: "דשבורדים", visual: 3 },
  { text: "סוכני AI", visual: 5 },
  { text: "מוצרים", visual: 0 },
] as const;

export const HOME_WHATSAPP = `https://wa.me/972545552149?text=${encodeURIComponent("היי תום, הגעתי מהאתר ואשמח לדבר")}`;

/** The two services, as branches of the map. `leaves` repeat what each page already says. */
export const branches = [
  {
    id: "mobile",
    href: "/mobile",
    title: "פיתוח אפליקציות",
    line: "אפליקציה אחת לאייפון ולאנדרואיד, מהרעיון ועד החנויות.",
    leaves: ["אייפון ואנדרואיד", "תשלומים ומנויים", "צ׳אט והתראות", "העלאה לחנויות"],
  },
  {
    id: "automation",
    href: "/automation",
    title: "אוטומציה לעסקים",
    line: "פחות עבודה ידנית: חיבור בין מערכות, תהליכים וכלים פנימיים.",
    leaves: ["חיבור בין מערכות", "סוכני AI", "דוחות והתראות", "כלים פנימיים"],
  },
] as const;

const app = (id: string) => {
  const s = stories.find((story) => story.id === id)!;
  return { key: `app-${id}`, kind: "אפליקציה", name: s.name, title: s.title, body: s.body, href: "/mobile#apps" };
};
const flow = (id: string) => {
  const c = caseStudies.find((study) => study.id === id)!;
  return { key: `flow-${id}`, kind: "אוטומציה", name: c.name, title: c.context, body: c.result, href: "/automation#work" };
};

/** A few projects from each page. The full stories are on /mobile and /automation. */
export const work = [app("dronebag"), flow("gomlin"), app("spidclass"), flow("ita"), app("luxcal"), flow("cicd")];

export const reviews = [
  ...["dronebag", "spidclass", "luxcal"].map((id) => {
    const s = stories.find((story) => story.id === id)!;
    return { quote: s.review!.quote, name: s.review!.name, source: s.name };
  }),
  { quote: mobileQuote.text, name: mobileQuote.name, source: undefined },
];

/** Experience as Tom stated it (the same facts as on /automation and /mobile). */
export const aboutFacts = [
  { value: "5 שנים", label: "של בניית מוצרים, מערכות ואוטומציות" },
  { value: "4 שנים", label: "של פיתוח אפליקציות ב־Flutter" },
  { value: "מקצה לקצה", label: "מהאפיון, דרך הקוד, ועד שזה עובד אצלכם" },
] as const;
