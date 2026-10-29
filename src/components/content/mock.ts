/**
 * Demo content for the blog, news and courses mockups. Nothing here is real: the posts, stories, sources and
 * dates only show how the pages will look. Phases 4 to 6 replace this file with content files
 * (src/content/blog, news/issues, src/content/courses). Every page that uses it shows the demo banner.
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

// ---------------------------------------------------------------------------------------------- news

export type Story = {
  id: string;
  topic: string;
  headline: string;
  summary: string;
  forBusiness: string;
  source: { name: string; url: string };
  /** The earlier story this one continues: issue date and story id. */
  continues?: { date: string; id: string; headline: string };
};

export type Issue = {
  date: string;
  /** Tom's own update of the day, shown on top. */
  update?: { title: string; text: string; href?: string };
  stories: Story[];
};

const demoSource = (path: string) => ({ name: "מקור לדוגמה", url: `https://example.com/${path}` });

export const issues: Issue[] = [
  {
    date: "2026-10-29",
    update: {
      title: "מתום: פוסט חדש בבלוג",
      text: "כתבתי על ארבע השאלות שכדאי לשאול לפני שמחליטים בין אפליקציה לאתר.",
      href: "/blog/app-or-website",
    },
    stories: [
      {
        id: "ai-memory",
        topic: "AI",
        headline: "עוזרי ה־AI זוכרים יותר: שיחות ארוכות בלי להתחיל מההתחלה",
        summary:
          "כמה מהעוזרים המוכרים הרחיבו את הזיכרון בין שיחות. העוזר יכול לזכור הקשר מפרויקט קודם, וגם למחוק אותו לפי בקשה.",
        forBusiness: "אפשר לתת לעוזר את הנהלים של העסק פעם אחת, במקום להדביק אותם בכל שיחה. כדאי לבדוק מה נשמר ואיפה.",
        source: demoSource("ai-memory"),
        continues: { date: "2026-10-27", id: "ai-agents-office", headline: "סוכני AI נכנסים לכלי המשרד" },
      },
      {
        id: "payments-links",
        topic: "תשלומים",
        headline: "קישורי תשלום בוואטסאפ הופכים לנפוצים יותר בעסקים קטנים",
        summary: "יותר ספקי סליקה מאפשרים לשלוח קישור תשלום ישירות בצ׳אט. הלקוח משלם בלי להיכנס לאתר.",
        forBusiness: "אם אתם שולחים היום מספר חשבון ומחכים להעברה, זה המקום הראשון לקצר את הדרך לתשלום.",
        source: demoSource("payment-links"),
      },
      {
        id: "store-rules",
        topic: "אפליקציות",
        headline: "החנויות מעדכנות את הדרישות לגבי מחיקת חשבון מתוך האפליקציה",
        summary: "אפליקציות שיש בהן הרשמה צריכות לתת דרך ברורה למחוק את החשבון. אפליקציות בלי האפשרות עלולות להידחות בעדכון הבא.",
        forBusiness: "אם יש לכם אפליקציה עם התחברות, כדאי לבדוק שהכפתור קיים לפני העדכון הבא.",
        source: demoSource("store-rules"),
      },
      {
        id: "phishing",
        topic: "אבטחה",
        headline: "גל הודעות מתחזות לחברות שליחויות",
        summary: "הודעות SMS עם קישור ל\"תשלום מכס\" נשלחות שוב. הקישורים מובילים לאתרים שמבקשים פרטי אשראי.",
        forBusiness: "שווה להזכיר לצוות: לא משלמים דרך קישור מהודעה, נכנסים לאתר החברה ישירות.",
        source: demoSource("phishing"),
      },
      {
        id: "sheets-ai",
        topic: "כלים",
        headline: "גיליונות אלקטרוניים מקבלים פקודות בשפה רגילה",
        summary: "כלי הגיליונות הגדולים מאפשרים לכתוב \"סכם לי את המכירות לפי חודש\" ולקבל טבלה. הנוסחה עדיין נשארת גלויה לבדיקה.",
        forBusiness: "דוחות שלקחו שעה יכולים לקחת דקה. רק לבדוק את הנוסחה לפני ששולחים הלאה.",
        source: demoSource("sheets-ai"),
      },
    ],
  },
  {
    date: "2026-10-28",
    stories: [
      {
        id: "invoices",
        topic: "כספים",
        headline: "חשבוניות דיגיטליות: עוד מערכות מתחברות אוטומטית להנהלת החשבונות",
        summary: "תוכנות הנהלת חשבונות מוסיפות חיבורים לחנויות אונליין. כל מכירה יוצרת חשבונית בלי הקלדה.",
        forBusiness: "אם אתם מקלידים מכירות ידנית, בדקו אם התוכנה שלכם כבר יודעת להתחבר.",
        source: demoSource("invoices"),
      },
      {
        id: "maps-reviews",
        topic: "שיווק",
        headline: "ביקורות במפות: תשובה מהירה של העסק משפיעה על הדירוג",
        summary: "פלטפורמות המפות מדגישות עסקים שעונים לביקורות. תשובה קצרה ואישית עדיפה על תבנית.",
        forBusiness: "הקדישו עשר דקות בשבוע לתשובות. אפשר גם לקבל התראה על כל ביקורת חדשה.",
        source: demoSource("maps-reviews"),
      },
      {
        id: "voice-notes",
        topic: "AI",
        headline: "תמלול הודעות קוליות בעברית משתפר",
        summary: "כלי התמלול מתמודדים טוב יותר עם עברית מדוברת וסלנג. הודעה קולית ארוכה הופכת לטקסט קצר לקריאה.",
        forBusiness: "לקוחות ששולחים הודעות קוליות יכולים לקבל מענה מהיר יותר, גם כשאין זמן להקשיב.",
        source: demoSource("voice-notes"),
      },
      {
        id: "passkeys",
        topic: "אבטחה",
        headline: "יותר אתרים עוברים לכניסה עם מפתח גישה במקום סיסמה",
        summary: "מפתחות גישה מאפשרים להתחבר עם טביעת אצבע או זיהוי פנים. אין סיסמה שאפשר לגנוב.",
        forBusiness: "אם יש לכם אזור לקוחות, זו דרך לצמצם פניות של \"שכחתי סיסמה\".",
        source: demoSource("passkeys"),
      },
    ],
  },
  {
    date: "2026-10-27",
    stories: [
      {
        id: "ai-agents-office",
        topic: "AI",
        headline: "סוכני AI נכנסים לכלי המשרד",
        summary: "כלי המייל והמסמכים מוסיפים סוכנים שמבצעים משימות של כמה שלבים. הם מבקשים אישור לפני פעולות חשובות.",
        forBusiness: "התחילו ממשימה אחת שחוזרת, כמו מיון מיילים, ובדקו את התוצאה שבוע לפני שמרחיבים.",
        source: demoSource("ai-agents-office"),
      },
      {
        id: "delivery-api",
        topic: "לוגיסטיקה",
        headline: "חברות השליחויות פותחות חיבור ישיר לחנויות",
        summary: "חנויות יכולות להזמין שליח ולקבל מספר מעקב ישירות מהמערכת. הלקוח מקבל עדכון בלי שמישהו ישלח אותו.",
        forBusiness: "פחות טלפונים של \"איפה ההזמנה שלי\", וכל המשלוחים במקום אחד.",
        source: demoSource("delivery-api"),
      },
      {
        id: "pwa",
        topic: "אפליקציות",
        headline: "אתרים שמתנהגים כמו אפליקציה מקבלים יותר יכולות באייפון",
        summary: "דפדפנים בנייד תומכים ביותר יכולות של אפליקציה, כמו התראות. ההבדל בין אתר לאפליקציה מצטמצם.",
        forBusiness: "לפני שבונים אפליקציה, שווה לבדוק אם אתר כזה מספיק לשלב הראשון.",
        source: demoSource("pwa"),
      },
    ],
  },
];

export const issueByDate = (date: string) => issues.find((i) => i.date === date);
export const latestIssue = issues[0];

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

// ---------------------------------------------------------------------------------------------- dates

const he = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", ...opts });
const at = (iso: string) => new Date(`${iso}T12:00:00Z`);

export const formatDate = (iso: string) => he({ day: "numeric", month: "long", year: "numeric" }).format(at(iso));
export const formatDay = (iso: string) => he({ weekday: "long", day: "numeric", month: "long" }).format(at(iso));
export const dayNumber = (iso: string) => he({ day: "numeric" }).format(at(iso));
export const monthShort = (iso: string) => he({ month: "short" }).format(at(iso));
