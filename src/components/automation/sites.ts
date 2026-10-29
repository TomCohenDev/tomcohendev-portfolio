/**
 * The Hebrew landing pages share one look (header, footer, lead form, process, FAQ).
 * This holds what differs between them. `event` prefixes the analytics event names, so the
 * existing automation_* events keep their names.
 */
export type SiteKey = "automation" | "mobile";

type FormCopy = {
  processLabel: string;
  processHint: string;
  toolsLabel: string;
  toolsHint: string;
  /** The "how often does it happen" choice only makes sense for processes. */
  showFrequency: boolean;
};

type Site = {
  path: string;
  label: string;
  event: string;
  nav: { href: string; label: string }[];
  blurb: string;
  other: { to: string; label: string };
  form: FormCopy;
};

export const SITES: Record<SiteKey, Site> = {
  automation: {
    path: "/automation",
    label: "אוטומציה",
    event: "automation",
    nav: [
      { href: "#work", label: "עבודות והמלצות" },
      { href: "#process", label: "איך עובדים" },
      { href: "#faq", label: "שאלות" },
    ],
    blurb: "אפיון ובנייה של אוטומציות, חיבורים בין מערכות וכלים פנימיים לעסקים ולאנשים פרטיים.",
    other: { to: "/mobile", label: "פיתוח אפליקציות" },
    form: {
      processLabel: "איזה תהליך הייתם רוצים לשפר?",
      processHint:
        'מה קורה היום ואיפה זה נתקע. למשל: "כל ליד מהאתר אני מעתיק ידנית לגיליון ושולח לו הודעה". אין צורך לפרט שמות של לקוחות, מידע רפואי או פיננסי.',
      toolsLabel: "באילו כלים או מערכות אתם משתמשים היום?",
      toolsHint: 'למשל: גיליון אקסל, וואטסאפ, Gmail, מערכת הנהלת חשבונות. גם "לא בטוח" זו תשובה טובה.',
      showFrequency: true,
    },
  },
  mobile: {
    path: "/mobile",
    label: "מובייל",
    event: "mobile",
    nav: [
      { href: "#apps", label: "אפליקציות שבניתי" },
      { href: "#process", label: "איך עובדים" },
      { href: "#faq", label: "שאלות" },
    ],
    blurb: "פיתוח אפליקציות לאייפון ולאנדרואיד ב־Flutter, מהרעיון ועד החנויות.",
    other: { to: "/automation", label: "אוטומציה לעסקים" },
    form: {
      processLabel: "מה האפליקציה צריכה לעשות?",
      processHint:
        'למי היא מיועדת ומה הדבר הראשון שהיא צריכה לעשות. למשל: "לקוחות קובעים תור ומקבלים תזכורת יום לפני". אין צורך לפרט מידע רגיש.',
      toolsLabel: "מה כבר קיים?",
      toolsHint: "למשל: רק רעיון, עיצוב ב־Figma, אתר, או אפליקציה קיימת שצריך לתקן. כל תשובה טובה.",
      showFrequency: false,
    },
  },
};
