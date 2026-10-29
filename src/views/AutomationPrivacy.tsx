import { LegalPage, LegalSection } from "@/components/automation/Legal";
import { CONTACT } from "@/components/automation/content";

/**
 * Hebrew privacy notice for the Hebrew pages (/, /automation and /mobile). It describes only what the pages and
 * the lead form actually do (edge/index.ts, src/layouts/HebrewLayout.astro, src/lib/analytics.ts). Keep it in sync with them.
 */
// Page title and description; src/pages/*.astro puts them in the HTML head.
export const TITLE = "מדיניות פרטיות";
export const DESCRIPTION = "איזה מידע נאסף בעמודים בעברית של תום כהן, למה הוא משמש, איפה הוא נשמר ומה אפשר לבקש לגביו.";

const AutomationPrivacy = () => (
  <LegalPage
    title={TITLE}
    updated="אוקטובר 2026"
  >
    <LegalSection title="על מה המדיניות הזו">
      <p>
        העמוד הזה מסביר איזה מידע נאסף כשאתם גולשים בעמודים בעברית של תום כהן (<bdi>tomcohen.dev</bdi>,{" "}
        <bdi>tomcohen.dev/automation</bdi> ו־<bdi>tomcohen.dev/mobile</bdi>) או משאירים בהם פנייה, למה הוא משמש ומה אפשר
        לבקש לגביו. לאתר באנגלית (<bdi>tomcohen.dev/en</bdi>) יש{" "}
        <a href="/en/privacy-policy">מדיניות פרטיות נפרדת, באנגלית</a>.
      </p>
    </LegalSection>

    <LegalSection title="מה נאסף כשמשאירים פנייה">
      <ul>
        <li>שם מלא</li>
        <li>שם העסק או תחום הפעילות, אם מילאתם</li>
        <li>טלפון או דואר אלקטרוני</li>
        <li>
          מה שכתבתם על הצורך שלכם, אם מילאתם: התהליך שתרצו לשפר או האפליקציה שתרצו לבנות, מה כבר קיים אצלכם, ובעמוד
          האוטומציה גם כמה פעמים התהליך קורה
        </li>
        <li>האישור שלכם לכך שאחזור אליכם</li>
        <li>מועד הפנייה והעמוד שממנו נשלחה</li>
      </ul>
      <p>
        אין צורך לכתוב בטופס מידע רגיש, כמו פרטים של לקוחות שלכם או מידע רפואי או פיננסי. מספיק לתאר את מה שאתם
        צריכים במילים כלליות.
      </p>
    </LegalSection>

    <LegalSection title="למה הפרטים משמשים">
      <p>
        הפרטים משמשים רק כדי לחזור אליכם ולטפל בפנייה. אני לא שולח בעזרתם דיוור שיווקי, ולא מוכר, משכיר או מעביר
        אותם לאחרים לשימוש שלהם.
      </p>
    </LegalSection>

    <LegalSection title="איפה המידע נשמר ומי מעבד אותו">
      <ul>
        <li>
          הפנייה נשמרת במסד נתונים בשירות <bdi>Cloudflare</bdi>, ונשלחת אליי בדואר אלקטרוני דרך שירות המייל של{" "}
          <bdi>Cloudflare</bdi> לתיבת הדואר שלי ב־<bdi>Gmail</bdi>.
        </li>
        <li>
          כתובת ה־<bdi>IP</bdi> שלכם משמשת להגבלת מספר הפניות שאפשר לשלוח בזמן קצר, כדי למנוע ספאם. היא לא נשמרת
          במסד הנתונים יחד עם הפנייה.
        </li>
        <li>מה שכתבתם בטופס לא נשלח לכלי מדידה או פרסום.</li>
      </ul>
    </LegalSection>

    <LegalSection title="מדידה, פרסום ועוגיות">
      <ul>
        <li>
          בעמוד מוטמע תג של <bdi>Google Ads</bdi>, שמודד ביקורים ופעולות כמו לחיצה על כפתור או שליחת הטופס, כדי
          לבדוק אם קמפיינים עובדים. התג עשוי לשמור עוגיות בדפדפן ולשלוח ל־<bdi>Google</bdi> מידע טכני, כמו כתובת{" "}
          <bdi>IP</bdi>, סוג הדפדפן והעמוד שבו ביקרתם.
        </li>
        <li>
          הגופנים בעמוד נטענים מ־<bdi>Google Fonts</bdi>, ולכן הדפדפן שלכם פונה לשרתים של <bdi>Google</bdi> כדי
          להוריד אותם.
        </li>
        <li>
          לחיצה על כפתור הוואטסאפ פותחת את <bdi>WhatsApp</bdi>, שירות של <bdi>Meta</bdi> שכפוף למדיניות הפרטיות
          שלה.
        </li>
      </ul>
      <p>אפשר לחסום או למחוק עוגיות בהגדרות הדפדפן, והעמוד ימשיך לעבוד.</p>
    </LegalSection>

    {/* TODO(tom): confirm the retention wording below (no retention period has been decided yet). */}
    <LegalSection title="כמה זמן המידע נשמר">
      <p>פניות נשמרות כל עוד הן נחוצות לטיפול בפנייה ולמעקב אחריה. אפשר לבקש למחוק פנייה בכל זמן.</p>
    </LegalSection>

    <LegalSection title="מה אפשר לבקש">
      <p>
        אפשר לבקש לראות את המידע ששמור עליכם, לתקן אותו או למחוק אותו. כתבו לי ל־
        <a href={`mailto:${CONTACT.email}`} dir="ltr">
          {CONTACT.email}
        </a>{" "}
        ואטפל בבקשה.
      </p>
    </LegalSection>

    <LegalSection title="אבטחה">
      <p>
        המידע עובר בחיבור מוצפן (<bdi>HTTPS</bdi>), והגישה למסד הנתונים מוגבלת לחשבון שלי. שום שיטה לא מאובטחת
        לחלוטין, ולכן כדאי לא לשלוח בטופס מידע רגיש.
      </p>
    </LegalSection>

    <LegalSection title="שינויים במדיניות">
      <p>אם המדיניות תשתנה, הגרסה החדשה תופיע כאן עם תאריך עדכון חדש.</p>
    </LegalSection>

    <LegalSection title="יצירת קשר">
      <p>
        <strong>תום כהן</strong>
        <br />
        דואר אלקטרוני:{" "}
        <a href={`mailto:${CONTACT.email}`} dir="ltr">
          {CONTACT.email}
        </a>
        <br />
        טלפון:{" "}
        <a href={`tel:${CONTACT.phoneTel}`} dir="ltr">
          {CONTACT.phoneDisplay}
        </a>
      </p>
    </LegalSection>
  </LegalPage>
);

export default AutomationPrivacy;
