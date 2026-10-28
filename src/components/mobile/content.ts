/**
 * Copy for the Hebrew /mobile landing page. Every app here is a real Flutter project of Tom's;
 * each entry names its source. The phone screens are drawn illustrations of those apps, and the page
 * says so. No invented clients, numbers or results.
 */

export type AppId = "gomlin" | "dronebag" | "spidclass" | "luxcal" | "candle" | "launch";

/** Apps whose screens are light at the top, so the phone shows a dark status bar. */
export const LIGHT_TOP: AppId[] = ["candle"];

export type AppStory = {
  id: AppId;
  /** Shown in the handwritten kicker and in the side rail. */
  name: string;
  title: string;
  body: string;
  built: string[];
  tech: string[];
  /** Short handwritten note beside the phone. */
  note: string;
  review?: { quote: string; name: string };
};

export const stories: AppStory[] = [
  // Source: end2end-startup/case_studies/gomlinjobs/GOMLIN_JOBS_CASE_STUDY.md (Flutter app for job seekers,
  // web platform for employers, Stream chat, Apple / Google Play in-app purchases, OpenAI matching).
  {
    id: "gomlin",
    name: "Gomlin Jobs",
    title: "מחליקים ימינה על עבודה",
    body: "אפליקציה למחפשי עבודה: מחליקים על משרות, מקבלים התאמה ומדברים עם המעסיק בצ׳אט. לצידה אתר למעסיקים, התאמה בעזרת AI ותשלומים דרך Apple ו־Google.",
    built: ["החלקה על משרות", "צ׳אט בזמן אמת", "רכישות בתוך האפליקציה", "התאמה עם AI"],
    tech: ["Flutter", "Firebase", "OpenAI"],
    note: "ימינה = מעוניין",
  },
  // Source: end2end-startup/case_studies/dronebag/CASE_STUDY_Dronebag_Roi_Hammer.md and the main site's Dronebag page.
  {
    id: "dronebag",
    name: "Dronebag",
    title: "כל צי הרחפנים בכיס",
    body: "ניהול צי רחפנים לצוותים בשטח: רחפנים וסוללות, רישום טיסות, היסטוריית תחזוקה ודיווח תקלות, עם קבוצות והרשאות לכל צוות.",
    built: ["רישום טיסות", "מעקב סוללות", "דיווח תקלות", "צוותים והרשאות"],
    tech: ["Flutter", "Firebase"],
    note: "כל טיסה נרשמת",
    review: {
      quote:
        "Dronebag הייתה צריכה לעבוד בתנאים אמיתיים, לא בהדגמה. תום הבין את זה מיד. הוא תרגם צרכים מבצעיים לאפליקציה יציבה, שמר על תקשורת צמודה ומסר בזמן. העבודה היומיומית עכשיו מהירה יותר והרבה פחות מבולגנת.",
      name: "Roi",
    },
  },
  // Source: ~/github/spidclass (classes, members, attendance, payments) and end2end-startup/case_studies/spidclass.
  {
    id: "spidclass",
    name: "Spidclass",
    title: "נוכחות ותשלומים בלחיצה",
    body: "אפליקציה לניהול שיעורים פרטיים: כיתות, תלמידים, נוכחות ומי כבר שילם. מה שהיה במחברת וברשימות נמצא עכשיו בטלפון.",
    built: ["רשימת נוכחות", "מעקב תשלומים", "כרטיס תלמיד", "ניהול כיתות"],
    tech: ["Flutter", "Firebase"],
    note: "וי אחד לכל תלמיד",
    review: {
      quote:
        "Spidclass התחיל כתהליך מסובך, ותום פישט אותו כך שמשתמשים הבינו אותו מיד. ההתקדמות הייתה מהירה, העדכונים ברורים, ותמיד ידענו מה הצעד הבא. ביצוע מעולה.",
      name: "Liran",
    },
  },
  // Source: ~/github/luxcal (calendar, events with pictures, news, profiles) and ~/github/luxcal_scripts/create_shabbat.js.
  {
    id: "luxcal",
    name: "Luxcal",
    title: "יומן אירועים עם חדשות ותמונות",
    body: "יומן משותף עם אירועים, חדשות וגלריית תמונות, פרופיל לכל משתמש, ואירועי שבת שנוצרים ביומן לבד כל חודש.",
    built: ["יומן חודשי", "אירועים עם תמונות", "חדשות", "אירועים שנוצרים לבד"],
    tech: ["Flutter", "Firebase", "Node.js"],
    note: "השבתות מתמלאות לבד",
    review: {
      quote:
        "מההתחלה ועד ההשקה תום עבד כמו שותף אמיתי למוצר, לא רק כמפתח. ההתקדמות כל שבוע הייתה ברורה, הפידבק היה מהיר, והוא שיפר את חוויית המשתמש בלי שביקשנו. התוצאה: טובה יותר מההיקף המקורי, ומוכנה לעלייה לאוויר.",
      name: "David",
    },
  },
  // Source: end2end-startup/case_studies/virtual_shoa_candle/CASE_STUDY_YELLOW_CANDLE.md
  // (existing app crashing on newer Android devices, flagged by both stores; crash fixes and store compliance).
  {
    id: "candle",
    name: "Yellow Candle",
    title: "אפליקציה קיימת שחזרה לעבוד",
    body: "אפליקציית הנצחה של הארגון הבינלאומי FJMC, להדלקת נר זיכרון וירטואלי. היא קרסה במכשירי אנדרואיד חדשים ולא עמדה בדרישות החנויות. תיקנתי את הקריסות ועדכנתי אותה לדרישות של Google Play ושל App Store.",
    built: ["תיקון קריסות", "עמידה בדרישות החנויות", "תזכורות", "iOS ואנדרואיד"],
    tech: ["Flutter"],
    note: "נדלק בלחיצה",
  },
  {
    id: "launch",
    name: "השקה",
    title: "גם ההעלאה לחנויות עליי",
    body: "חשבונות מפתח, צילומי מסך ותיאור, הגשה ל־App Store ול־Google Play, מעבר על הבדיקות שלהן, ועדכוני גרסה אחרי ההשקה.",
    built: ["App Store", "Google Play", "גרסאות בדיקה", "עדכונים"],
    tech: [],
    note: "מהקוד לחנות",
  },
];

/** What an app can include. Each item points at an app above where Tom built it. */
export const capabilities = [
  { icon: "users", title: "התחברות ומשתמשים", where: "בכל האפליקציות" },
  { icon: "chat", title: "צ׳אט בזמן אמת", where: "למשל ב־Gomlin Jobs" },
  { icon: "card", title: "תשלומים ומנויים", where: "למשל ב־Gomlin Jobs" },
  { icon: "bell", title: "התראות ותזכורות", where: "למשל ב־Yellow Candle" },
  { icon: "sparkles", title: "AI בתוך האפליקציה", where: "למשל ב־Gomlin Jobs" },
  { icon: "image", title: "תמונות וקבצים", where: "למשל ב־Luxcal" },
  { icon: "database", title: "צד שרת ומסד נתונים", where: "Firebase, בכל האפליקציות" },
  { icon: "store", title: "העלאה לחנויות ועדכונים", where: "למשל ב־Yellow Candle" },
] as const;

export const mobileProcess = [
  { title: "מאפיינים", body: "למי האפליקציה, מה היא צריכה לעשות, ומה נכנס לגרסה הראשונה." },
  { title: "מעצבים", body: "מסכים שאפשר ללחוץ עליהם ולהרגיש את האפליקציה לפני שכותבים קוד." },
  { title: "בונים", body: "Flutter וצד שרת, וגרסה לבדיקה בטלפון שלכם כבר במהלך הפיתוח." },
  { title: "בודקים", body: "על מכשירים אמיתיים, באייפון ובאנדרואיד, עם משתמשים ראשונים." },
  { title: "משיקים", body: "הגשה לחנויות, ואחר כך עדכונים ושיפורים לפי שימוש אמיתי." },
] as const;

// Each answer points at something on the page. src/pages/mobile.astro builds the FAQPage JSON-LD from this list.
export const mobileFaqs = [
  {
    q: "צריך לבנות בנפרד לאייפון ולאנדרואיד?",
    a: "לא. אני עובד ב־Flutter, כך שאותו קוד רץ בשתי הפלטפורמות, ונראה ומתנהג כמו אפליקציה רגילה בכל אחת מהן.",
  },
  {
    q: "כמה זה עולה?",
    a: "שיחת ההיכרות הראשונה בחינם. המחיר נקבע לפי מספר המסכים, צד השרת, תשלומים וחיבורים למערכות אחרות. אחרי אפיון קצר מקבלים הצעה עם היקף ולוח זמנים ברורים.",
  },
  {
    q: "כמה זמן לוקח לבנות אפליקציה?",
    a: "זה תלוי בהיקף. בדרך כלל מתחילים מגרסה ראשונה ממוקדת שאפשר להעלות לחנות ולבדוק עם משתמשים אמיתיים, ומרחיבים משם.",
  },
  {
    q: "גם ההעלאה לחנויות עליך?",
    a: "כן. צילומי המסך והתיאור, ההגשה ל־App Store ול־Google Play, והתיקונים אם הבדיקה שלהן מחזירה הערות.",
  },
  {
    q: "יש לי אפליקציה קיימת שלא עובדת טוב. אפשר לעזור?",
    a: "כן. ב־Yellow Candle, למשל, קיבלתי אפליקציה שקרסה במכשירי אנדרואיד חדשים ולא עמדה בדרישות החנויות, תיקנתי את הקריסות ועדכנתי אותה לדרישות של שתי החנויות.",
  },
  {
    q: "מה קורה אחרי ההשקה?",
    a: "מגדירים מראש עדכונים ותחזוקה: התאמה לגרסאות חדשות של iOS ואנדרואיד, תיקוני באגים ושיפורים לפי מה שהמשתמשים עושים בפועל.",
  },
] as const;

// Reviews are word for word from testimonials in ../automation/content.ts (the main site's reviews, translated).
// Not tied to one project.
export const mobileQuote = {
  text: "בחרתי בתום כי הוא היה היחיד שנתן לי לוח זמנים אמיתי במקום הבטחות מעורפלות. הוא היה בקשר כל הזמן, הציע הצעות חכמות ובאמת הקשיב. כל התהליך הרגיש מסודר ורגוע, וזה הפך פרויקט מלחיץ לפרויקט שאפשר לנהל.",
  name: "Jonathan",
};
