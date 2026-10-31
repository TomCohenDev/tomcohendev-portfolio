/**
 * The Hebrew landing pages share one look (header, footer, lead form, process, FAQ).
 * This holds what differs between them. `event` prefixes the analytics event names, so the
 * existing automation_* events keep their names.
 */
export type SiteKey = "automation" | "mobile" | "course";

type FormCopy = {
  processLabel: string;
  processHint: string;
  toolsLabel: string;
  toolsHint: string;
  /** The "how often does it happen" choice only makes sense for processes. */
  showFrequency: boolean;
  businessLabel?: string;
  submitLabel?: string;
  /**
   * Asks only for name, phone and email, all required. The phone goes in `contact` and the email in `tools`,
   * so the lead worker and its table need no new column.
   */
  contactOnly?: boolean;
};

type Site = {
  path: string;
  label: string;
  event: string;
  nav: { href: string; label: string }[];
  blurb: string;
  /** The button in the header. */
  cta: string;
  other: { to: string; label: string };
  form: FormCopy;
  /** Keeps the phone number, WhatsApp and email address off the page. */
  hideContact?: boolean;
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
    cta: "לשיחת היכרות",
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
    cta: "לשיחת היכרות",
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
  course: {
    path: "/courses/business-automation",
    label: "קורס אוטומציה",
    event: "course",
    nav: [
      { href: "#outcome", label: "על הקורס" },
      { href: "#syllabus", label: "סילבוס" },
      { href: "#lecturer", label: "המרצה" },
      { href: "#faq", label: "שאלות" },
    ],
    blurb: "קורס מעשי בן 10 מפגשים: בונים תהליך אוטומטי אמיתי לעסק, גם בלי רקע בתכנות.",
    cta: "לפרטים",
    other: { to: "/courses", label: "קורסים ומפגשים" },
    hideContact: true,
    form: {
      contactOnly: true,
      processLabel: "מהו התהליך החוזר שתרצו לייעל?",
      processHint: "מה קורה היום ואיפה זה נתקע. אין צורך לפרט שמות של לקוחות, מידע רפואי או פיננסי.",
      toolsLabel: "מעדיפים כיתה או Zoom?",
      toolsHint: 'למשל: כיתה, Zoom, או "שניהם מתאימים".',
      showFrequency: false,
      businessLabel: "תפקיד וסוג העסק",
      submitLabel: "השארת פרטים",
    },
  },
};
