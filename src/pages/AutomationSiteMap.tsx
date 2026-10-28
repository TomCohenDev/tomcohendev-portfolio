import { Link } from "react-router-dom";
import { LegalPage, LegalSection } from "@/components/automation/Legal";
import { CONTACT } from "@/components/automation/content";

const PAGE_SECTIONS = [
  { href: "/automation", label: "פתיחה: מה אפשר לחבר לעסק שלכם" },
  { href: "/automation#problem", label: "איפה הזמן נעלם?" },
  { href: "/automation#work", label: "עבודות והמלצות" },
  { href: "/automation#process", label: "איך עובדים" },
  { href: "/automation#contact", label: "יצירת קשר וטופס פנייה" },
  { href: "/automation#faq", label: "שאלות נפוצות" },
];

const CASE_STUDIES = [
  { to: "/case-studies/nightwing", label: "Nightwing: הזמנות שמגיעות למטבח לבד" },
  { to: "/case-studies/ai-social-media-strategist", label: "סוכן תוכן לרשתות" },
  { to: "/case-studies/blog-automation", label: "מהודעה לטיוטת מאמר" },
  { to: "/case-studies/gomlin-jobs", label: "Gomlin: נתונים שמגיעים לוואטסאפ" },
];

const MAIN_SITE = [
  { to: "/", label: "דף הבית" },
  { to: "/services", label: "שירותים" },
  { to: "/contact", label: "יצירת קשר" },
];

const AutomationSiteMap = () => (
  <LegalPage title="מפת האתר" description="כל העמודים והחלקים בעמודי האוטומציה של תום כהן, במקום אחד.">
    <LegalSection title="עמוד האוטומציה">
      <ul>
        {PAGE_SECTIONS.map((s) => (
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
            <Link to={c.to}>
              <bdi>{c.label}</bdi>
            </Link>
          </li>
        ))}
      </ul>
    </LegalSection>

    <LegalSection title="האתר הראשי (באנגלית)">
      <ul>
        {MAIN_SITE.map((m) => (
          <li key={m.to}>
            <Link to={m.to}>{m.label}</Link>
          </li>
        ))}
      </ul>
    </LegalSection>

    <LegalSection title="מסמכים">
      <ul>
        <li>
          <Link to="/automation/privacy">מדיניות פרטיות</Link>
        </li>
        <li>
          <Link to="/privacy-policy">מדיניות הפרטיות של האתר הראשי (באנגלית)</Link>
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
