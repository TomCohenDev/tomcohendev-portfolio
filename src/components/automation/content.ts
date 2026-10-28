/**
 * Copy and proof for /automation (Hebrew, RTL).
 *
 * Fact rules for this file: every case below is backed by a source in the repo or in Tom's
 * other repositories (noted next to each entry). No client, quote, metric or result is
 * invented. Self-reported numbers from the case-study drafts (hours saved, % more orders,
 * salary savings) are deliberately NOT shown because no baseline was measured.
 */

export const CONTACT = {
  phoneDisplay: "054-555-2149",
  phoneTel: "+972545552149",
  email: "tom.cohen99@gmail.com",
  // TODO(tom): confirm whether WhatsApp on this number is an approved contact channel; if so add a wa.me link.
};

export const LEAD_ENDPOINT = "/api/automation-lead";

export const SITE_URL = "https://tomcohen.dev";

export const pains = [
  { id: "leads", text: "לידים שמגיעים מטפסים, הודעות או קמפיינים וצריכים להיכנס למקום אחד" },
  { id: "reminders", text: "תזכורות, משימות ועדכוני סטטוס שנשלחים ידנית" },
  { id: "copying", text: "העתקת נתונים בין גיליונות, מערכת לקוחות, דואר אלקטרוני וכלי ניהול" },
  { id: "documents", text: "הצעות מחיר, סיכומים, דוחות או מסמכים שמופקים ידנית מאותה תבנית" },
  { id: "sorting", text: "מיון, תיוג וסיכום של הרבה מידע לפני שמישהו מקבל החלטה" },
  { id: "visibility", text: "תהליך פנימי שאין בו תמונת מצב אחת ברורה" },
  { id: "personal", text: "משימה אישית או מקצועית שחוזרת שוב ושוב וגוזלת זמן" },
] as const;

export const capabilities = [
  {
    id: "connect",
    title: "חיבור בין מערכות",
    body: "מידע שעובר לבד ממקום למקום: פתיחת משימות, עדכון רשומות, התראות וסנכרון בין הכלים שכבר עובדים אצלכם.",
  },
  {
    id: "leads",
    title: "טיפול בלידים ובלקוחות",
    body: "קליטת פנייה, תיוג, ניתוב לאדם הנכון, תזכורות ומעקב, והכנת ההקשר כך שמי שחוזר ללקוח יודע במה מדובר.",
  },
  {
    id: "docs",
    title: "מסמכים ודוחות",
    body: "הפקת מסמכים מתבנית, ריכוז נתונים מכמה מקורות, דוחות קבועים ועדכוני מצב שנשלחים בזמן.",
  },
  {
    id: "tools",
    title: "כלים פנימיים קטנים",
    body: "ממשק ממוקד לצוות, טופס חכם, לוח מצב או כלי עזר שמחליף רצף ארוך של פעולות ידניות.",
  },
  {
    id: "ai",
    title: "בינה מלאכותית, במקום שבו היא עוזרת",
    body: "סיכום, מיון, חילוץ מידע מטקסט או הכנת טיוטה, עם בדיקה אנושית שמתאימה לרמת הסיכון.",
  },
  {
    id: "personal",
    title: "אוטומציות אישיות",
    body: "סידור מידע, מעקב, תזכורות, חיבור בין שירותים או כלי קטן לתהליך שחוזר אצלכם שוב ושוב.",
  },
] as const;

export type CaseKind = "client" | "own" | "own-product" | "in-development";

export const caseKindLabel: Record<CaseKind, string> = {
  client: "פרויקט ללקוח",
  own: "כלי שבניתי לעצמי",
  "own-product": "חלק ממוצר שפיתחתי",
  "in-development": "בפיתוח",
};

export type CaseStudy = {
  id: string;
  name: string;
  kind: CaseKind;
  context: string;
  audience: string;
  challenge: string;
  solution: string;
  systems: string[];
  human: string;
  result: string;
  status?: string;
  images?: { src: string; alt: string; caption: string; width: number; height: number; wide?: boolean }[];
  link?: { href: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  // Source: case_studies/nightwing-ph/*.md + ~/github/nightwing_ph/nightwing_ph/nightwing-api.json
  // (webhook → read sheet for order IDs → parse/expand combos → Telegram → Sheets + backup sheet → error alert).
  // Client permission to use the name is recorded in the case-study draft.
  {
    id: "nightwing",
    name: "Nightwing",
    kind: "client",
    context: "מסעדת כנפיים בפרדס חנה",
    audience: "בעלי המסעדה והצוות במטבח",
    challenge:
      "הזמנות התקבלו בטלפון ונרשמו ביד. הזמנה עם קומבו, שני רטבים ושתייה נרשמה בלחץ, תוך כדי עבודה במטבח, וקל היה לפספס פרט. לא היה מקום אחד שבו רואים את כל ההזמנות.",
    solution:
      "אתר הזמנות בעברית ובאנגלית שמחובר לתהליך אוטומטי ב־n8n. כל הזמנה מקבלת מספר מזהה, הקומבו מפורק לרכיבים שהמטבח צריך להכין, הודעה מסודרת נשלחת לצוות בטלגרם וההזמנה נרשמת בגיליון Google Sheets ובגיליון גיבוי. אם שלב נכשל, נשלחת התראת שגיאה.",
    systems: ["אתר ההזמנות", "n8n", "Google Sheets", "Telegram"],
    human: "הכנת ההזמנה, קבלת התשלום (מזומן או PayBox) ומעקב אחרי ההזמנות בגיליון.",
    result:
      "ההזמנות כבר לא מוקלדות ביד. כל הזמנה מגיעה למטבח כהודעה אחידה ונשמרת בגיליון אחד, עם עותק גיבוי.",
    status: "לא הצגתי כאן נתונים כמו שעות שנחסכו או שינוי בהיקף ההזמנות, כי לפני ההטמעה לא נמדד מצב בסיס מסודר.",
    // NOTE: the Nightwing asset file names are shuffled. web-app-combo-builder-modal.webp is the
    // Google Sheets order log; automation-telegram-notification.webp is the combo builder screen.
    images: [
      {
        src: "/case_studies/nightwing-ph/assets/automation-telegram-notification.webp",
        alt: "מסך בחירת ארוחת קומבו באתר ההזמנות של Nightwing: בחירת כנפיים או טנדרס, שני רטבים ושתייה",
        caption: "כאן ההזמנה מתחילה: מסך בחירת הקומבו באתר.",
        width: 500,
        height: 857,
      },
      {
        // TODO(tom): this crop shows per-order totals. Confirm with Nightwing that it may stay public.
        src: "/case_studies/nightwing-ph/assets/web-app-combo-builder-modal.webp",
        alt: "קטע מגיליון ההזמנות של Nightwing. כל שורה היא הזמנה שנרשמה אוטומטית, עם כמות הקומבו, השתייה, הרטבים והסכום. אין בו פרטים מזהים של לקוחות",
        caption: "וכאן היא נגמרת: קטע מגיליון ההזמנות שמתמלא אוטומטית. כל שורה היא הזמנה, בלי פרטים מזהים של לקוחות.",
        width: 1695,
        height: 597,
        wide: true,
      },
    ],
    link: { href: "/case-studies/nightwing", label: "לתיאור המלא של הפרויקט (באנגלית)" },
  },
  // Source: src/pages/case-studies/AISocialMediaStrategist.tsx (Tom's own tool, Telegram approval step).
  {
    id: "social",
    name: "סוכן תוכן לרשתות",
    kind: "own",
    context: "תוכן מקצועי ל־X ול־LinkedIn",
    audience: "אני, כמי שמפרסם תוכן מקצועי ברשתות",
    challenge:
      "איסוף חדשות מהתחום, סינון הרעש וכתיבת פוסטים שנשמעים כמוני לקחו זמן רב, ולכן הפרסום לא היה עקבי.",
    solution:
      "תהליך שרץ ברקע: אוסף חדשות, מסנן, ומכין טיוטות בסגנון שלי על בסיס פוסטים קודמים ששמורים בגיליון. כל טיוטה מגיעה אליי לבוט בטלגרם, ותשובה קצרה קובעת אם לפרסם ובאיזו רשת.",
    systems: ["מקורות חדשות", "Google Sheets", "Claude", "Telegram"],
    human: "שום פוסט לא מתפרסם בלי אישור שלי בטלגרם.",
    result: "הכתיבה הפכה לעריכה: אני מקבל טיוטה מוכנה ומחליט מה לעשות איתה, במקום להתחיל מדף ריק.",
    link: { href: "/case-studies/ai-social-media-strategist", label: "לתיאור המלא (באנגלית)" },
  },
  // Source: src/pages/case-studies/BlogAutomation.tsx (Tom's own n8n pipeline).
  // TODO(tom): confirm drafts are reviewed before publishing (the source page also shows post.publish()).
  {
    id: "blog",
    name: "מהודעה לטיוטת מאמר",
    kind: "own",
    context: "בלוג מקצועי",
    audience: "אני, ככותב מאמרים לאתר",
    challenge:
      "עיצוב הפוסט, חיפוש תמונה ועבודה מול מערכת ניהול התוכן לקחו יותר זמן מהכתיבה עצמה.",
    solution:
      "שולחים רעיון או טקסט גולמי בהודעת טלגרם. תהליך ב־n8n מחזיר טיוטת מאמר מובנית עם כותרת, תגיות ונתוני עמוד, בודק שהמבנה תקין ומתקן אותו לפני שמירה, ומכין הנחיה ליצירת תמונת כותרת.",
    systems: ["Telegram", "n8n", "מודל שפה", "מערכת התוכן"],
    human: "עריכה ואישור של הטקסט לפני פרסום.",
    result: "העבודה הטכנית סביב המאמר נעשית לבד, והזמן שלי הולך לתוכן עצמו.",
    link: { href: "/case-studies/blog-automation", label: "לתיאור המלא (באנגלית)" },
  },
  // Source: ~/github/ai-ad-and-video-maker (Helix: AGENTS.md non-negotiables, README campaign flow).
  {
    id: "helix",
    name: "Helix: מודעות וקמפיינים מתוך המוצר",
    kind: "in-development",
    context: "חומרי שיווק למוצרים דיגיטליים",
    audience: "בעלי מוצרים דיגיטליים שצריכים מודעות, סרטונים ותמונות לחנויות אפליקציות",
    challenge:
      "כדי להכין קמפיין צריך לאסוף מה המוצר באמת עושה, צילומי מסך, נוסחים, ועוד גרסה לכל פלטפורמה, מידה ושפה.",
    solution:
      "מערכת שקוראת את קוד המוצר, מסכמת את המאפיינים והמיתוג שלו, ומפיקה טיוטות קריאייטיב לקמפיין: סרטונים ותמונות במידות של סטורי, פיד ומסך רחב, ובכמה שפות, כולל בדיקת איכות אוטומטית לפני שהן מגיעות לאדם.",
    systems: ["קוד המוצר", "צילומי מסך אמיתיים", "מודלי שפה", "מנוע וידאו"],
    human:
      "שום דבר לא מתפרסם, לא נשלח ולא מוציא כסף בלי אישור מפורש. מספרים בנוסח מסומנים לבדיקה, ותקרות תקציב נאכפות בקוד ולא בהנחיה למודל.",
    result: "מתוך תיאור קצר של הקמפיין מתקבלות טיוטות במידות ובשפות שונות, מוכנות לבדיקה ולאישור.",
    status: "בפיתוח פעיל. עדיין לא בשימוש של לקוחות.",
  },
  // Source: case_studies/gomlinjobs/GOMLIN_JOBS_CASE_STUDY.md ("n8n Workflows" section). Gomlin is Tom's own product.
  {
    id: "gomlin",
    name: "Gomlin: נתונים שמגיעים לוואטסאפ",
    kind: "own-product",
    context: "פלטפורמת התאמה בין מעסיקים לפרילנסרים",
    audience: "אני, כמי שמנהל את המוצר",
    challenge:
      "נתוני השימוש היו במערכת אנליטיקה, משרות חדשות הגיעו ממקורות חיצוניים בפורמטים שונים, וכדי לדעת מה קורה היה צריך להיכנס ללוחות בקרה ולהריץ שאילתות.",
    solution:
      "שלושה תהליכים ב־n8n: דוח יומי שנשלח בוואטסאפ, בוט שעונה בוואטסאפ על שאלות בשפה חופשית מתוך נתוני השימוש, וקליטה של משרות ממקורות חיצוניים, פירוקן לשדות מסודרים בעזרת AI והכנסתן למאגר.",
    systems: ["WhatsApp", "BigQuery", "OpenAI", "Firestore", "n8n"],
    human: "ההחלטות שמתקבלות על סמך הנתונים, וכל מה שנוגע למשתמשים עצמם.",
    result: "תמונת מצב יומית מגיעה לבד לטלפון, ושאלה על הנתונים לא דורשת לפתוח מערכת.",
    link: { href: "/case-studies/gomlin-jobs", label: "לתיאור המוצר המלא (באנגלית)" },
  },
  // Source: ~/github/mintkola/mintkola-web/n8n-workflows/*.json (webhook handler: verify signature → event type → Firestore).
  // TODO(tom): Mintkola's client/owner is still "[NEEDS INPUT]" in the case-study draft. Confirm it may be shown.
  {
    id: "mintkola",
    name: "סנכרון תשלומים ומנויים",
    kind: "own-product",
    context: "פלטפורמת Mintkola",
    audience: "מנהלי הפלטפורמה ולקוחות שמשלמים על מנוי",
    challenge:
      "כל רכישה, חידוש או ביטול מנוי צריכים להתעדכן במערכת. אחרת לקוח שילם ולא קיבל גישה, או להפך.",
    solution:
      "תהליך שמקבל את אירועי התשלום מספק הסליקה, מוודא שההודעה באמת הגיעה ממנו (אימות חתימה), ומעדכן את רשומות ההזמנה, המנוי והלקוח. אירוע לא מוכר לא משנה נתונים ומחזיר שגיאה.",
    systems: ["Lemon Squeezy", "n8n", "Firestore"],
    human: "בירורים מול לקוחות ומקרים חריגים.",
    result: "מצב המנוי במערכת מתעדכן לפי אירוע התשלום, בלי העתקה ידנית בין לוח הסליקה לבסיס הנתונים.",
  },
];

export const scenarios = [
  {
    id: "inquiry",
    title: "פנייה חדשה מהאתר",
    steps: ["טופס באתר", "תיוג לפי סוג הפנייה", "פתיחת משימה", "אישור קבלה ללקוח"],
    human: "מי שחוזר ללקוח",
  },
  {
    id: "document",
    title: "מסמך מתוך טופס",
    steps: ["טופס מובנה", "מסמך מתבנית", "שליחה לאישור", "שמירה בתיקייה"],
    human: "אישור המסמך לפני שליחה",
  },
  {
    id: "report",
    title: "דוח מצב אחד",
    steps: ["גיליון", "מערכת לקוחות", "דואר נכנס", "דוח שבועי מרוכז"],
    human: "קריאת הדוח וההחלטות",
  },
  {
    id: "triage",
    title: "מיון ראשוני של טקסט",
    steps: ["הודעות נכנסות", "סיכום ותיוג בעזרת AI", "תור לבדיקה", "החלטה"],
    human: "ההחלטה עצמה",
  },
] as const;

export const processSteps = [
  { title: "ממפים", body: "מבינים מי עושה מה היום, כמה פעמים, איפה נוצר עיכוב ומה ייחשב שיפור." },
  { title: "מגדירים", body: "בוחרים תהליך ממוקד, גבולות ברורים, את הנתונים הנדרשים ומדד הצלחה." },
  { title: "בונים פיילוט", body: "גרסה קטנה שעובדת, עם נתוני דוגמה או בסביבה מוגבלת כשצריך." },
  { title: "בודקים", body: "מריצים תרחישים אמיתיים ובודקים שגיאות, הרשאות, חריגים ועלויות שוטפות." },
  { title: "מטמיעים ומוסרים", body: "מחברים לעבודה היומיומית, מתעדים, מגדירים מי אחראי למה ואיך מתחזקים." },
] as const;

export const principles = [
  {
    title: "קודם הבעיה, אחר כך הכלי",
    body: "מתחילים מהתוצאה שאתם צריכים, לא מהכלי שמדברים עליו השבוע.",
  },
  {
    title: "לא כל תהליך צריך AI",
    body: "לפעמים חיבור פשוט עם כללים ברורים אמין וזול יותר. הטופס בתחתית העמוד הזה, למשל, עובד בלי AI בכלל.",
  },
  {
    title: "פיילוט לפני הרחבה",
    body: "גרסה קטנה שאפשר לבדוק בתנאים אמיתיים, ורק אז מחליטים אם להרחיב.",
  },
  {
    title: "גמור זה לא רק הדגמה",
    body: "בדיקות, טיפול בתקלות, הרשאות, עלויות שוטפות, תיעוד ומסירה הם חלק מהעבודה.",
  },
  {
    title: "אתם מבינים מה נבנה",
    body: "הסבר ברור, גם בלי רקע טכני: מה הפתרון עושה, איפה הגבולות שלו ומה הוא צריך כדי להמשיך לעבוד.",
  },
  {
    title: "בלי הבטחות לפני מדידה",
    body: "לא מבטיחים חיסכון או הכנסות לפני שמבינים את התהליך ומודדים איך הוא עובד היום.",
  },
] as const;

// Each claim points at something that exists in the work above.
export const evidence = [
  { claim: "התראת שגיאה וגיליון גיבוי, כדי שהזמנה לא תלך לאיבוד", where: "Nightwing" },
  { claim: "אימות שהודעת תשלום הגיעה באמת מספק הסליקה", where: "סנכרון תשלומים" },
  { claim: "שום פרסום או הוצאה כספית בלי אישור אנושי מפורש", where: "Helix" },
  { claim: "טיוטות שמחכות לאישור לפני שהן יוצאות", where: "סוכן התוכן" },
] as const;

export const faqs = [
  {
    q: "צריך להחליף את המערכות שכבר יש לי?",
    a: "בדרך כלל לא. מתחילים מהכלים הקיימים ובודקים אם אפשר לחבר ביניהם. אם כלי מסוים מגביל את התהליך, אציג חלופות ואת המשמעות שלהן לפני שמחליטים משהו.",
  },
  {
    q: "כל אוטומציה חייבת להשתמש בבינה מלאכותית?",
    a: "לא. בהרבה תהליכים חיבור פשוט וכללים ברורים יהיו אמינים וזולים יותר. משלבים AI רק כשהוא מוסיף ערך, ובאופן שמתאים לרמת הסיכון ולצורך בבקרה אנושית.",
  },
  {
    q: "כמה זמן לוקח לבנות פתרון?",
    a: "זה תלוי במספר המערכות, באיכות הנתונים ובחריגים בתהליך. אחרי מיפוי קצר אפשר להגדיר פיילוט, לוח זמנים והיקף עבודה ברורים.",
  },
  {
    q: "כמה זה עולה?",
    a: "המחיר נקבע לפי היקף התהליך, מספר החיבורים, רמת הבדיקה והתחזוקה הנדרשת. לפני הצעה מלאה מגדירים יחד מה בונים, מה נחשב הצלחה ומה העלויות השוטפות הצפויות, למשל מנויים לכלים או שימוש במודלים.",
  },
  {
    q: "מה קורה אחרי שהאוטומציה עולה לאוויר?",
    a: "מגדירים מראש תיעוד, אחריות, ניטור, טיפול בתקלות והיקף תמיכה. המטרה היא שלא תישארו עם מערכת שאף אחד לא מבין ולא יודע לתחזק.",
  },
  {
    q: "אפשר להתחיל בקטן?",
    a: "כן, ובדרך כלל עדיף. מתחילים מתהליך אחד מוגדר, בודקים אותו בתנאים אמיתיים ורק אחר כך מרחיבים.",
  },
  {
    q: "השירות מתאים גם לאדם פרטי?",
    a: "כן, כשיש תהליך חוזר וברור שהחיסכון או הנוחות מצדיקים פתרון מותאם. בשיחה קצרה נבדוק קודם אם יש דרך פשוטה וזולה יותר לפני שבונים משהו חדש.",
  },
  {
    q: "מה עם מידע רגיש?",
    a: "כבר באפיון בודקים אילו נתונים עוברים ולמי יש הרשאה. כשמדובר במידע אישי, רפואי או פיננסי מתחילים בהיקף מצומצם ובנתוני דוגמה, וחלק מהגדרת הפרויקט הוא בדיקה משפטית ואבטחתית מתאימה.",
  },
] as const;

// Public research. Different surveys and populations; never combined into one figure.
export const marketStats = [
  {
    value: "39%",
    srValue: "39 אחוז",
    label: "מהעסקים בישראל השתמשו בבינה מלאכותית במרץ 2026, לעומת 28% ביוני 2025",
    population: "עסקים עם 10 משרות שכיר ומעלה",
    source: "הלשכה המרכזית לסטטיסטיקה, אפריל 2026",
    href: "https://www.cbs.gov.il/he/mediarelease/DocLib/2026/125/31_26_125b.pdf",
  },
  {
    value: "63%",
    srValue: "63 אחוז",
    label: "מהעסקים שמשתמשים בבינה מלאכותית דיווחו שהיא חוסכת להם זמן",
    population: "עסקים עד 100 עובדים שמשתמשים ב־AI, דיווח עצמי",
    source: "הסוכנות לעסקים קטנים ובינוניים, 2025",
    href: "https://www.sba.org.il/hb/PolicyAndInformation/Researches/Documents/The%20use%20of%20artificial%20intelligence%20among%20businesses%20-%20mungash.pdf",
  },
  {
    value: "70%",
    srValue: "70 אחוז",
    label: "מהם משתמשים בה בעיקר לכתיבת טקסטים. אוטומציה ובוטים עדיין פחות נפוצים",
    population: "עסקים עד 100 עובדים שמשתמשים ב־AI",
    source: "הסוכנות לעסקים קטנים ובינוניים, 2025",
    href: "https://www.sba.org.il/hb/PolicyAndInformation/Researches/Documents/The%20use%20of%20artificial%20intelligence%20among%20businesses%20-%20mungash.pdf",
  },
] as const;

export const frequencyOptions = [
  { value: "daily", label: "כמה פעמים ביום" },
  { value: "weekly", label: "כמה פעמים בשבוע" },
  { value: "monthly", label: "כמה פעמים בחודש" },
  { value: "rarely", label: "לעיתים רחוקות" },
  { value: "unsure", label: "לא בטוח/ה" },
] as const;
