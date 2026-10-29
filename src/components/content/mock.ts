/**
 * Demo content for the blog and courses mockups. Nothing here is real: the posts, meetings and dates only show
 * how the pages will look. Phases 4 and 6 replace this file with content files (src/content/blog,
 * src/content/courses). Every page that uses it shows the demo banner. The news is real: src/lib/news.ts.
 */

export const DEMO = true;

// ---------------------------------------------------------------------------------------------- blog

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "note"; title: string; text: string }
  | { type: "code"; lang: string; code: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  tags: string[];
  /** Picks the drawing on the cover. */
  cover: "phone" | "flow" | "spark" | "store" | "code";
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "app-or-website",
    title: "אפליקציה או אתר? איך מחליטים לפני שמשקיעים",
    description: "ארבע שאלות שכדאי לשאול לפני שמתחילים לבנות, ולמה לפעמים התשובה היא בכלל לא אפליקציה.",
    date: "2026-10-20",
    readMinutes: 6,
    tags: ["אפליקציות", "תכנון"],
    cover: "phone",
    body: [
      {
        type: "p",
        text: "כמעט כל שיחת היכרות על אפליקציה מתחילה באותה שאלה: \"צריך אפליקציה, או שמספיק אתר?\". זו שאלה טובה, והתשובה לא תמיד זו שמצפים לה.",
      },
      { type: "h2", text: "1. כמה פעמים בשבוע ישתמשו בזה?" },
      {
        type: "p",
        text: "אפליקציה טובה למשהו שחוזרים אליו: הזמנה קבועה, מעקב, צ׳אט. אם הלקוח נכנס פעם בחודש כדי לבדוק מחיר, אתר מהיר יעשה את העבודה, בלי להוריד כלום.",
      },
      { type: "h2", text: "2. האם צריך משהו שרק טלפון יודע לעשות?" },
      {
        type: "list",
        items: [
          "התראות שמגיעות גם כשהאפליקציה סגורה",
          "מצלמה, מיקום או סריקה של ברקוד",
          "עבודה בלי חיבור לאינטרנט",
          "תשלום מהיר עם Apple Pay או Google Pay",
        ],
      },
      {
        type: "p",
        text: "אם אף אחד מאלה לא נמצא ברשימה שלכם, שווה לעצור ולחשוב שוב. אתר טוב בנייד יכול לעשות היום הרבה מאוד.",
      },
      {
        type: "note",
        title: "טיפ",
        text: "אפשר להתחיל באתר, לראות מה הלקוחות באמת עושים, ורק אז לבנות אפליקציה סביב החלק שהם חוזרים אליו.",
      },
      { type: "h2", text: "3. מי יתחזק את זה?" },
      {
        type: "p",
        text: "אפליקציה צריכה עדכונים: גרסאות חדשות של iOS ושל אנדרואיד, דרישות חדשות של החנויות, ותיקונים. כדאי לתכנן את זה מראש, ולא לגלות את זה אחרי ההשקה.",
      },
      { type: "quote", text: "השאלה היא לא \"מה הכי מרשים\", אלא \"מה הלקוחות שלכם יפתחו גם בעוד חצי שנה\"." },
      { type: "h2", text: "4. מה כבר קיים?" },
      {
        type: "p",
        text: "אם יש לכם מערכת, CRM או גיליון שכל העסק רץ עליו, האפליקציה צריכה להתחבר אליו. זה משפיע על הזמן ועל העלות יותר מכל מסך יפה.",
      },
      {
        type: "p",
        text: "אם עניתם על ארבע השאלות ועדיין לא בטוחים, זה בדיוק הדבר שעושים בשיחת ההיכרות.",
      },
    ],
  },
  {
    slug: "first-automation",
    title: "התהליך הראשון שכדאי לאטמט בעסק",
    description: "לא הכי מסובך ולא הכי מרשים: איך בוחרים את האוטומציה הראשונה כך שתחזיר את הזמן מהר.",
    date: "2026-10-08",
    readMinutes: 5,
    tags: ["אוטומציה"],
    cover: "flow",
    body: [
      {
        type: "p",
        text: "הטעות הנפוצה היא להתחיל מהתהליך הכי גדול. עדיף להתחיל ממשהו קטן שחוזר כל יום, כמו העתקה של פרטי לקוח מטופס לגיליון.",
      },
      { type: "h2", text: "איך מזהים מועמד טוב" },
      {
        type: "list",
        items: ["קורה הרבה פעמים בשבוע", "תמיד באותם שלבים", "טעות בו עולה כסף או לקוח", "אף אחד לא אוהב לעשות אותו"],
      },
      {
        type: "p",
        text: "תהליך שעונה על שלושה מתוך ארבעה הוא נקודת התחלה מצוינת. את השאר בונים אחר כך, על אותו בסיס.",
      },
    ],
  },
  {
    slug: "app-store-launch",
    title: "מה קורה בין \"האפליקציה מוכנה\" ל\"האפליקציה בחנות\"",
    description: "חשבונות מפתח, צילומי מסך, מדיניות פרטיות ובדיקות: מה צריך להכין כדי שההשקה לא תתעכב.",
    date: "2026-09-24",
    readMinutes: 7,
    tags: ["אפליקציות", "חנויות"],
    cover: "store",
    body: [
      {
        type: "p",
        text: "הקוד מוכן, האפליקציה עובדת בטלפון. עכשיו מתחיל חלק שהרבה אנשים לא מתכננים: ההעלאה ל־App Store ול־Google Play.",
      },
      { type: "h2", text: "מה להכין מראש" },
      {
        type: "list",
        items: [
          "חשבון מפתח בכל חנות, על שם העסק",
          "שם, תיאור וצילומי מסך בכל הגדלים",
          "קישור למדיניות פרטיות",
          "משתמש לבדיקה, אם יש התחברות",
        ],
      },
      {
        type: "note",
        title: "שווה לדעת",
        text: "ב־Google Play, לחשבון אישי חדש יש תקופת בדיקה סגורה לפני שאפשר לפרסם לכולם. כדאי להתחיל אותה מוקדם.",
      },
    ],
  },
  {
    slug: "ai-agent-limits",
    title: "סוכן AI לעסק: מה הוא עושה טוב, ואיפה הוא צריך בן אדם",
    description: "איפה סוכן חוסך שעות, איפה הוא מסוכן, ואיך בונים אותו כך שבן אדם מאשר את מה שחשוב.",
    date: "2026-09-10",
    readMinutes: 8,
    tags: ["AI", "אוטומציה"],
    cover: "spark",
    body: [
      {
        type: "p",
        text: "סוכן AI מצוין במשימות שיש בהן הרבה טקסט וקצת שיקול דעת: לסכם פנייה, לנסח טיוטה, למיין מיילים. הוא פחות טוב בדברים שאסור לטעות בהם.",
      },
      { type: "h2", text: "הכלל שלי" },
      {
        type: "p",
        text: "כל פעולה שיוצאת החוצה, כמו מייל ללקוח או שינוי במחיר, עוברת אישור של בן אדם. הסוכן מכין, בן אדם מאשר בלחיצה.",
      },
      {
        type: "code",
        lang: "text",
        code: "פנייה חדשה → הסוכן מסכם ומנסח תשובה → הודעה בוואטסאפ לבעל העסק → אישור → נשלח ללקוח",
      },
    ],
  },
  {
    slug: "why-flutter",
    title: "למה אני בונה אפליקציות ב־Flutter",
    description: "קוד אחד לאייפון ולאנדרואיד, ומה זה אומר בפועל על הזמן, העלות והתחזוקה.",
    date: "2026-08-27",
    readMinutes: 4,
    tags: ["אפליקציות", "טכנולוגיה"],
    cover: "code",
    body: [
      {
        type: "p",
        text: "Flutter מאפשר לכתוב את האפליקציה פעם אחת ולהריץ אותה גם באייפון וגם באנדרואיד. לעסק זה אומר צוות אחד, קוד אחד ותיקון אחד לכל באג.",
      },
      {
        type: "p",
        text: "זה לא מתאים לכל דבר: יש מקרים שבהם עדיף לבנות לכל מערכת בנפרד. בשיחת ההיכרות אני אומר מראש אם זה המקרה.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const blogTags = [...new Set(posts.flatMap((p) => p.tags))];

// ---------------------------------------------------------------------------------------------- courses

export type CourseType = "paid" | "free" | "oneOnOne" | "workshop";

export const courseTypes: Record<CourseType, { label: string; color: string }> = {
  paid: { label: "קורס בתשלום", color: "#bf95f9" },
  free: { label: "מפגש חינמי", color: "#43b581" },
  oneOnOne: { label: "אחד על אחד", color: "#f2c46d" },
  workshop: { label: "סדנה לצוות", color: "#f49ac1" },
};

export type Course = {
  slug: string;
  type: CourseType;
  title: string;
  description: string;
  /** ISO date of the first meeting; absent when it is set per person. */
  date?: string;
  time?: string;
  when: string;
  where: string;
  length: string;
  price: string;
  status: "open" | "soon" | "past";
  audience: string[];
  learn: string[];
  plan?: { title: string; text: string }[];
};

export const courses: Course[] = [
  {
    slug: "automation-basics",
    type: "paid",
    title: "אוטומציה לעסק קטן: מהתהליך הראשון ועד שהוא רץ לבד",
    description: "ארבעה מפגשים מעשיים. בסוף כל אחד יוצא עם תהליך אמיתי מהעסק שלו שעובד.",
    date: "2026-12-01",
    time: "19:00",
    when: "ארבעה מפגשים, בימי שלישי",
    where: "אונליין, בזום",
    length: "4 מפגשים של שעתיים",
    price: "המחיר יפורסם עם פתיחת ההרשמה",
    status: "soon",
    audience: ["בעלי עסקים קטנים ועצמאים", "מי שמעביר פרטים בין מערכות ביד", "בלי ידע בתכנות"],
    learn: [
      "לזהות איזה תהליך שווה לאטמט קודם",
      "לחבר טופס, גיליון ווואטסאפ",
      "להוסיף שלב של AI עם אישור של בן אדם",
      "לבדוק שהתהליך לא נשבר בשקט",
    ],
    plan: [
      { title: "מפגש 1: למצוא את התהליך", text: "ממפים את השבוע שלכם ובוחרים תהליך אחד." },
      { title: "מפגש 2: החיבור הראשון", text: "בונים יחד את החיבור בין שתי מערכות." },
      { title: "מפגש 3: AI באמצע", text: "מוסיפים סיכום או ניסוח, עם שלב אישור." },
      { title: "מפגש 4: שזה ירוץ לבד", text: "התראות על תקלות, ומה עושים כשמשהו משתנה." },
    ],
  },
  {
    slug: "open-qa-apps",
    type: "free",
    title: "מפגש פתוח: שאלות על בניית אפליקציה",
    description: "שעה של שאלות ותשובות על אפליקציות: עלויות, זמנים, חנויות ומה כדאי לבנות קודם.",
    date: "2026-11-18",
    time: "20:00",
    when: "יום רביעי",
    where: "אונליין, בזום",
    length: "שעה",
    price: "חינם",
    status: "open",
    audience: ["מי שיש לו רעיון לאפליקציה", "עסקים שחושבים על אפליקציה ללקוחות"],
    learn: ["מה משפיע על הזמן והעלות", "מה צריך כדי להעלות לחנויות", "שאלות שלכם, בשידור חי"],
  },
  {
    slug: "one-on-one",
    type: "oneOnOne",
    title: "שעה אחד על אחד: עוברים על הרעיון שלכם",
    description: "שיחה אישית על הרעיון או התהליך שלכם. יוצאים עם תוכנית ברורה לשלב הבא.",
    when: "בתיאום אישי",
    where: "אונליין או פגישה",
    length: "שעה",
    price: "פרטים בוואטסאפ",
    status: "open",
    audience: ["מי שרוצה לבדוק רעיון לפני שמשקיעים", "עסקים שרוצים סדר עדיפויות לאוטומציה"],
    learn: ["מה לבנות קודם ומה לדחות", "הערכה גסה של זמן", "רשימת שאלות לספקים"],
  },
  {
    slug: "team-workshop",
    type: "workshop",
    title: "סדנה לצוות: AI בעבודה היומיומית",
    description: "סדנה מעשית לצוות שלכם, על הכלים שאתם כבר משתמשים בהם.",
    when: "בתיאום עם הצוות",
    where: "אצלכם במשרד או אונליין",
    length: "חצי יום",
    price: "לפי גודל הצוות",
    status: "open",
    audience: ["צוותים של 5 עד 20 אנשים", "משרדים שרוצים להתחיל עם AI בצורה מסודרת"],
    learn: ["איפה AI חוסך זמן בעבודה שלכם", "כללים פשוטים לשימוש בטוח", "תרגול על משימות אמיתיות"],
  },
  {
    slug: "intro-n8n",
    type: "free",
    title: "מפגש פתוח: היכרות עם n8n",
    description: "הדגמה חיה של בניית תהליך אוטומטי ראשון ב־n8n.",
    date: "2026-09-15",
    time: "20:00",
    when: "יום שלישי",
    where: "אונליין, בזום",
    length: "שעה",
    price: "חינם",
    status: "past",
    audience: ["מי שרוצה לראות איך זה נראה מבפנים"],
    learn: ["מה זה n8n", "בניית תהליך ראשון", "שאלות"],
  },
];

export const courseBySlug = (slug: string) => courses.find((c) => c.slug === slug);

export { dayNumber, formatDate, formatDay, monthShort } from "@/lib/dates";
