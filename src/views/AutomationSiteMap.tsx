import { LegalPage, LegalSection } from "@/components/automation/Legal";
import { CONTACT } from "@/components/automation/content";

const HOME_SECTIONS = [
  { href: "/", label: "פתיחה: אני בונה אפליקציות ואוטומציות" },
  { href: "/#services", label: "השירותים שלי" },
  { href: "/#work", label: "עבודות והמלצות" },
  { href: "/#about", label: "קצת עליי" },
  { href: "/#contact", label: "יצירת קשר" },
];

const PAGE_SECTIONS = [
  { href: "/automation", label: "פתיחה: מה אפשר לחבר לעסק שלכם" },
  { href: "/automation#problem", label: "איפה הזמן נעלם?" },
  { href: "/automation#work", label: "עבודות והמלצות" },
  { href: "/automation#process", label: "איך עובדים" },
  { href: "/automation#contact", label: "יצירת קשר וטופס פנייה" },
  { href: "/automation#faq", label: "שאלות נפוצות" },
];

const MOBILE_SECTIONS = [
  { href: "/mobile", label: "פתיחה: האפליקציה שלכם באייפון ובאנדרואיד" },
  { href: "/mobile#apps", label: "אפליקציות שבניתי" },
  { href: "/mobile#process", label: "איך עובדים" },
  { href: "/mobile#contact", label: "יצירת קשר וטופס פנייה" },
  { href: "/mobile#faq", label: "שאלות נפוצות" },
];

const CASE_STUDIES = [
  { to: "/en/case-studies/nightwing", label: "Nightwing: הזמנות שמגיעות למטבח לבד" },
  { to: "/en/case-studies/ai-social-media-strategist", label: "סוכן תוכן לרשתות" },
  { to: "/en/case-studies/blog-automation", label: "מהודעה לטיוטת מאמר" },
  { to: "/en/case-studies/gomlin-jobs", label: "Gomlin: נתונים שמגיעים לוואטסאפ" },
  { to: "/en/case-studies/dronebag", label: "Dronebag: ניהול צי רחפנים" },
  { to: "/en/case-studies/spidclass", label: "Spidclass: נוכחות ותשלומים" },
  { to: "/en/case-studies/yellow-candle", label: "Yellow Candle: אפליקציית הנצחה" },
];

const MAIN_SITE = [
  { to: "/en", label: "דף הבית" },
  { to: "/en/services", label: "שירותים" },
  { to: "/en/contact", label: "יצירת קשר" },
];

// Page title and description; src/pages/*.astro puts them in the HTML head.
export const TITLE = "מפת האתר";
export const DESCRIPTION = "כל העמודים והחלקים בעמודים בעברית של תום כהן, במקום אחד.";

const AutomationSiteMap = () => (
  <LegalPage title={TITLE}>
    <LegalSection title="עמוד הבית">
      <ul>
        {HOME_SECTIONS.map((s) => (
          <li key={s.href}>
            <a href={s.href}>{s.label}</a>
          </li>
        ))}
      </ul>
    </LegalSection>

    <LegalSection title="עמוד האוטומציה">
      <ul>
        {PAGE_SECTIONS.map((s) => (
          <li key={s.href}>
            <a href={s.href}>{s.label}</a>
          </li>
        ))}
      </ul>
    </LegalSection>

    <LegalSection title="עמוד פיתוח האפליקציות">
      <ul>
        {MOBILE_SECTIONS.map((s) => (
          <li key={s.href}>
            <a href={s.href}>{s.label}</a>
          </li>
        ))}
      </ul>
    </LegalSection>

    <LegalSection title="תיאורים מלאים של פרויקטים (באנגלית)">
      <ul>
        {CASE_STUDIES.map((c) => (
          <li key={c.to}>
            <a href={c.to}>
              <bdi>{c.label}</bdi>
            </a>
          </li>
        ))}
      </ul>
    </LegalSection>

    <LegalSection title="האתר באנגלית">
      <ul>
        {MAIN_SITE.map((m) => (
          <li key={m.to}>
            <a href={m.to}>{m.label}</a>
          </li>
        ))}
      </ul>
    </LegalSection>

    <LegalSection title="מסמכים">
      <ul>
        <li>
          <a href="/automation/privacy">מדיניות פרטיות</a>
        </li>
        <li>
          <a href="/en/privacy-policy">מדיניות הפרטיות של האתר באנגלית</a>
        </li>
      </ul>
    </LegalSection>

    <LegalSection title="ניווט ונגישות">
      <p>
        אפשר לנווט בעמודים עם מקלדת: הקישור הראשון בכל עמוד מדלג ישר לתוכן, וכל כפתור וקישור מסומן בבירור כשעוברים
        עליו. אם משהו לא עובד לכם, כתבו לי ל־
        <a href={`mailto:${CONTACT.email}`} dir="ltr">
          {CONTACT.email}
        </a>{" "}
        ואתקן.
      </p>
    </LegalSection>
  </LegalPage>
);

export default AutomationSiteMap;
