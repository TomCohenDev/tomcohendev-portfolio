/**
 * Copy for the Hebrew /web landing page. Every project here is a real one of Tom's, and each entry names its
 * source. Same rule as ../mobile/content.ts: no invented clients, numbers or results. That is why the percentages
 * in case_studies/PORTFOLIO_WEBSITES are left out: they are aggregated and have no single project behind them.
 *
 * TODO(tom): confirm that Rotem Izko and Mintkola may be named here. Both screenshots are already public on /en.
 */
import { testimonials } from "../automation/content";

export const WEB_PATH = "/web";

type Shot = { src: string; alt: string; width: number; height: number };

/** The hero's browser: one tab for each kind of site, each showing a real project. */
export const webTabs: { id: string; label: string; note: string; shots: Shot[] }[] = [
  {
    id: "landing",
    label: "דף נחיתה",
    note: "דף הנחיתה של האוטומציה, כאן באתר",
    shots: [
      { src: "/web/landing-automation.webp", alt: "דף הנחיתה של שירות האוטומציה באתר הזה", width: 1600, height: 900 },
    ],
  },
  {
    // Source: case_studies/PORTFOLIO_WEBSITES (lazy-loaded video portfolio).
    id: "portfolio",
    label: "תיק עבודות",
    note: "תיק עבודות בעריכת וידאו, עם ניווט כמו בעורך",
    shots: [
      {
        src: "/case_studies/PORTFOLIO_WEBSITES/assets/portfolio-website-desktop.webp",
        alt: "תיק העבודות של Rotem Izko, עם סרגל ניווט בסגנון תוכנת עריכה",
        width: 1894,
        height: 902,
      },
    ],
  },
  {
    // Source: case_studies/nightwing-ph. The file names are swapped: "menu-display" is the opening screen.
    id: "business",
    label: "אתר לעסק",
    note: "Nightwing: מזמינים מהטלפון, וההזמנה מגיעה למטבח",
    shots: [
      { src: "/case_studies/nightwing-ph/assets/web-app-menu-display.webp", alt: "מסך הפתיחה של אתר Nightwing בטלפון", width: 500, height: 857 },
      { src: "/case_studies/nightwing-ph/assets/web-app-landing-page-hero.webp", alt: "התפריט של Nightwing בטלפון, עם קומבו וכנפיים", width: 500, height: 857 },
    ],
  },
  {
    // Source: ~/github/mintkola/mintkola-web and case_studies/mintkola.
    id: "saas",
    label: "מערכת SaaS",
    note: "Mintkola: מפת דרך אישית שנבנית בשיחה עם AI",
    shots: [
      {
        src: "/case_studies/mintkola/assets/mintkola-landing-page-3-week-roadmap.webp",
        alt: "מערכת Mintkola: מפת דרך לצד שיחה עם AI",
        width: 1903,
        height: 901,
      },
    ],
  },
];

/** The four kinds of site, compared. `example` points at a project above where Tom built it. */
export const webTypes = [
  {
    title: "דף נחיתה",
    when: "יש לכם שירות, מוצר או קורס אחד, ואתם רוצים שאנשים ישאירו פרטים.",
    includes: ["עמוד אחד עם מסר ברור", "טופס שמגיע אליכם למייל", "מדידה של ביקורים ופניות"],
    // Source: this repo (/automation, /mobile, /courses/business-automation; the form is edge/index.ts).
    example: { text: "דפי האוטומציה, האפליקציות והקורס באתר הזה", href: "/automation", label: "לדף האוטומציה" },
  },
  {
    title: "תיק עבודות",
    when: "העבודות שלכם הן מה שמוכר אתכם, ואתם רוצים שיראו אותן כמו שצריך.",
    includes: ["גלריות ווידאו שנטענים מהר", "עברית ואנגלית", "עדכון תוכן בלי מפתח"],
    // Source: case_studies/PORTFOLIO_WEBSITES, ~/github/adolam-portfolio (Sanity), ~/github/lior-site.
    example: { text: "תיקי עבודות בעריכת וידאו ובאמנות, ואתרים אישיים", href: "/en/case-studies/portfolio-websites", label: "לתיאור המלא (באנגלית)" },
  },
  {
    title: "אתר לעסק",
    when: "לקוחות מחפשים אתכם, או שאפשר לעשות דרך האתר משהו אמיתי: להזמין, לקבוע או לשאול.",
    includes: ["עמודים לעסק ולשירותים", "הזמנות או פניות דרך האתר", "חיבור למערכות שכבר יש לכם"],
    // Source: case_studies/nightwing-ph (menu, cart, combos; orders reach Telegram and Google Sheets).
    example: { text: "Nightwing: תפריט, עגלה והזמנות שמגיעות למטבח לבד", href: "/en/case-studies/nightwing", label: "לתיאור המלא (באנגלית)" },
  },
  {
    title: "מערכת SaaS",
    when: "האתר הוא המוצר: אנשים נרשמים, משלמים ועובדים בתוכו.",
    includes: ["התחברות ומשתמשים", "מנויים ותשלומים", "AI בתוך המוצר"],
    // Source: ~/github/mintkola/mintkola-web (Firebase, Lemon Squeezy subscriptions, AI roadmaps).
    example: { text: "Mintkola: מפת דרך אישית עם AI, משתמשים ומנויים", href: "/en/case-studies/mintkola", label: "לתיאור המלא (באנגלית)" },
  },
] as const;

export const webProcess = [
  { title: "מאפיינים", body: "למי האתר, מה הוא צריך לעשות, ומה נכנס לגרסה הראשונה." },
  { title: "מעצבים", body: "רואים איך זה ייראה ומתאימים, לפני שבונים את הכול." },
  { title: "בונים", body: "ממשק, צד שרת וחיבורים, עם קישור שאתם בודקים לאורך הדרך." },
  { title: "בודקים", body: "בטלפון ובמחשב, בדפדפנים שונים ועם התוכן האמיתי." },
  { title: "עולים לאוויר", body: "דומיין ומדידה, ואחר כך כל שינוי שתאשרו עולה לאתר לבד." },
] as const;

// Each answer stays with what the page shows. src/pages/web.astro builds the FAQPage JSON-LD from this list.
export const webFaqs = [
  {
    q: "איזה סוג אתר מתאים לי?",
    a: "זה תלוי במה שהאתר צריך לעשות, לא בכמה הוא גדול. אם אתם לא בטוחים, ספרו לי מה אתם רוצים שיקרה אחרי שמישהו נכנס לאתר, ונחליט יחד.",
  },
  {
    q: "כמה זה עולה?",
    a: "המחיר נקבע לפי מספר העמודים, העיצוב, ניהול התוכן, תשלומים וחיבורים למערכות אחרות. אחרי אפיון קצר מקבלים הצעה עם היקף ולוח זמנים ברורים.",
  },
  {
    q: "כמה זמן זה לוקח?",
    a: "זה תלוי בהיקף: דף נחיתה קצר יותר ממערכת עם משתמשים ותשלומים. אחרי האפיון מקבלים לוח זמנים ברור, ואפשר להתחיל מגרסה ראשונה ממוקדת ולהרחיב משם.",
  },
  {
    q: "אוכל לעדכן את התוכן בעצמי?",
    a: "כן, אם זה חשוב לכם. מחברים לאתר מערכת ניהול תוכן, כך שאפשר לעדכן טקסטים ותמונות בלי מפתח.",
  },
  {
    q: "יש לי אתר קיים. אפשר לשפר אותו?",
    a: "כן. קודם בודקים מה עובד ומה לא, ואז מחליטים יחד אם נכון לשפר את הקיים או לבנות מחדש.",
  },
  {
    q: "האתר יעבוד בעברית ובאנגלית?",
    a: "כן. האתר נבנה מימין לשמאל מההתחלה, ואפשר להוסיף לו אנגלית או שפות נוספות.",
  },
  {
    q: "מה קורה אחרי שהאתר עולה?",
    a: "מגדירים מראש עדכונים ותחזוקה: תיקונים, שינויים בתוכן ושיפורים לפי מה שקורה באתר בפועל.",
  },
] as const;

const review = (name: string) => testimonials.find((t) => t.name === name)!;

/** The one quote beside the form, and two more about web work. Word for word from automation/content.ts. */
export const webQuote = (() => {
  const { quote, name, source } = review("Lior");
  return { text: quote, name, source };
})();
export const webReviews = [review("Gal Ashiri"), review("Noam")];
