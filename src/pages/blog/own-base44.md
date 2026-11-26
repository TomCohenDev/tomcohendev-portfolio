---
title: "Base44 משלכם: מדריך מלא להקמת פלטפורמת אפליקציות על שרת שלכם, עם סוכן AI ובלי לכתוב קוד"
description: "כל מה ש־Base44 נותן, על שרת שלכם ובפחות משלושים דולר בחודש: שרת, דומיין, Claude Code, אפליקציה עם התחברות ומסד נתונים, מיילים, תשלומים מישראל, אנליטיקס, גיבויים ומודעות בפייסבוק. צעד אחר צעד, עם כל הפרומפטים להעתקה."
slug: own-base44
lang: he
translation: own-base44-en
layout: ../../layouts/ArticleLayout.astro
author: תום כהן
researchedThrough: "2026-11-25"
tags: ["AI", "SaaS", "מדריך"]
---

ב־Base44 מתארים בצ׳אט איזו אפליקציה רוצים, והיא באוויר תוך כמה דקות: עם התחברות, מסד נתונים, מיילים ותשלומים. זה כלי מעולה, ואם אתם רוצים לבדוק רעיון עוד היום, תתחילו שם.

אבל כשהאפליקציה גדלה, החשבון משתנה. כדי שהקוד יהיה אצלכם צריך תוכנית של חמישים דולר בחודש. כל מייל שהאפליקציה שולחת וכל קריאה ל־AI של המשתמשים שלכם יורדים מהקרדיטים שלכם, וכשהם נגמרים, החלקים האלה מפסיקים לעבוד. וגם בתוכנית הכי יקרה, מאתיים דולר בחודש, אי אפשר להריץ את האפליקציה על שרת שלכם.

הפוסט הזה הוא המדריך המלא: איך מקימים את אותו דבר לבד, על שרת שלכם, כשסוכן AI כותב את כל הקוד. בלי לדעת לתכנת, ובפחות משלושים דולר בחודש.

<figure style="margin:2.25rem auto;max-width:380px;">
<video src="/blog/own-base44/reel-he.mp4" poster="/blog/own-base44/reel-he.webp" width="540" height="960" controls playsinline preload="metadata" aria-label="סרטון קצר: אתם לא צריכים לשלם ל־Base44. מה Base44 עושה טוב, כמה עולות התוכניות שלו ומה המגבלות גם בתוכנית של מאתיים דולר, ואז ארבעה שלבים: שרת ודומיין, סוכן AI שמכין את השרת, האפליקציה עם כלים חינמיים, ומכירה מישראל. בסוף: פחות משלושים דולר בחודש." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">הגרסה הקצרה, בשתי דקות. המסכים בסרטון מצוירים מחדש להמחשה: אפליקציית ההרגלים, הקוד ופלט הטרמינל הם דוגמאות.</figcaption>
</figure>

## מה יהיה לכם בסוף

- **שרת משלכם** בענן, מאובטח, עם עדכוני אבטחה אוטומטיים.
- **דומיין** עם HTTPS, וכתובת לכל אפליקציה, למשל `app.your-domain.com`.
- **סוכן AI**, ‏Claude Code, שכותב את הקוד, בודק אותו ומעלה אותו לאוויר.
- **אפליקציה** עם הרשמה והתחברות, מסד נתונים, תוכנית חינמית ותוכנית בתשלום.
- **מיילים** שיוצאים מהדומיין שלכם.
- **תשלומים** מלקוחות בכל העולם שמגיעים לבנק בישראל, ואפשרות לגבות בשקלים.
- **אנליטיקס** בלי עוגיות, **גיבוי** כל לילה, ו**חשבון מודעות** בפייסבוק.

והכי חשוב: הקוד, המידע והמשתמשים שלכם. אם תרצו לעבור שרת מחר, אתם לוקחים הכל.

## קודם כל, בהגינות: מה Base44 עושה טוב

Base44 נותן חוויה שקשה להתחרות בה ביום הראשון: [מתארים בצ׳אט, והאפליקציה באוויר](https://docs.base44.com/Getting-Started/Quick-start-guide.md). אין שרת, אין הגדרות, אין דומיין לחבר. מסד נתונים, התחברות, מיילים ואחסון כלולים.

הוא מתאים במיוחד אם:

- **אתם רוצים לבדוק רעיון היום**, ולראות אם מישהו בכלל משתמש בו.
- **אתם בונים כלי פנימי** לעסק או לצוות, בלי משתמשים משלמים.
- **אתם לא רוצים לטפל בשרת** בכלל, אפילו לא דרך סוכן.

הוא גם עושה יותר ממה שחושבים: יש בו משימות מתוזמנות, חיבורים בזמן אמת ודפים שנבנים בשרת. אז הוויכוח הוא לא על מה אפשר לבנות בו. הוא על כמה זה עולה כשזה גדל, ועל של מי הדברים.

## המחירים שלהם

לפי [דף התוכניות של Base44](https://docs.base44.com/Account-and-billing/Billing-and-plans), בתשלום חודשי:

| תוכנית | מחיר בחודש | מה מקבלים |
|---|---|---|
| Free | $0 | 25 הודעות בחודש |
| Starter | $20 | 100 הודעות |
| Builder | $50 | 250 הודעות, ייצוא קוד וחיבור ל־GitHub |
| Pro | $100 | יותר הודעות וקרדיטים |
| Elite | מ־$200 | הכי הרבה הודעות וקרדיטים |

בתשלום שנתי המחירים נמוכים בעשרים אחוז, למשל Builder ב־$40 ו־Elite ב־$160. המחירים משתנים לעיתים קרובות, אז בדקו את [דף המחירים](https://base44.com/pricing) לפני שאתם מחליטים.

## מה הטבלה לא מראה

- **הקרדיטים משותפים, ואין להם הרחבה.** לפי [דף הקרדיטים](https://docs.base44.com/Account-and-billing/Credits.md), כל מייל שהאפליקציה שולחת, כל קריאה ל־AI וכל העלאת קובץ של המשתמשים שלכם יורדים מקרדיטי האינטגרציות של החשבון. כשהם נגמרים, הפעולות האלה נכשלות ופונקציות השרת נעצרות. אי אפשר לקנות עוד קרדיטים. הדרך היחידה היא לשדרג.
- **מגבלות שחלות על כל התוכניות**, גם על Elite. לפי [התיעוד של פונקציות השרת](https://docs.base44.com/developers/backend/resources/backend-functions/overview.md), פונקציה נעצרת אחרי חמש דקות ומקבלת 128 מגה זיכרון. בקשה אחת מחזירה עד 5,000 רשומות, וקוד השרת נכתב רק ב־TypeScript.
- **אין self-hosting.** [בתיעוד של כלי הפיתוח](https://docs.base44.com/documentation/building-your-app/developer-tools) הם כותבים בעצמם ש־Base44 לא תומך באירוח עצמי. הקוד שמייצאים עדיין מדבר עם השרתים שלהם, והמשתמשים של האפליקציה, עם הסיסמאות שלהם, לא יוצאים איתו.
- **המידע שלכם.** בתנאי השימוש Base44 מקבלים רישיון להשתמש במידע שלכם כדי לאמן AI, ורק בתוכנית Enterprise אפשר לבטל את זה.
- **תשלומים מישראל.** Stripe לא פועל בישראל, וגם שירות התשלומים של Base44 לא תומך בה. בשלב 9 יש את האפשרויות שכן עובדות.

## כמה זה עולה לבד

| מה | כמה | הערה |
|---|---|---|
| שרת | בערך $6 בחודש | 8 גיגה זיכרון מספיקים לכמה אפליקציות קטנות |
| Claude Pro | $20 בחודש | כולל את [Claude Code](https://claude.com/pricing) |
| דומיין | בערך $1 בחודש | ‏‎.com ב־Cloudflare בערך $10.50 לשנה, במחיר עלות |
| כל השאר | $0 | מסד נתונים, התחברות, מיילים, אנליטיקס וגיבויים, בתוכניות חינמיות |
| **סך הכל** | **פחות מ־$30 בחודש** | מול $50 לתוכנית שנותנת את הקוד, ו־$200 ל־Elite |

ויש הבדל אחד שחשוב יותר מהמחיר: אם נגמרת לכם המכסה של Claude, רק הבנייה מחכה. האפליקציות ממשיכות לרוץ, ואין מונה קרדיטים שעוצר אותן.

## לכל חלק ב־Base44 יש גרסה חינמית

| מה Base44 נותן | חלופה חינמית | הערה |
|---|---|---|
| אירוח והעלאה לאוויר | Caddy, ‏[Coolify](https://coolify.io) או Dokploy | Caddy פשוט ונותן HTTPS לבד. Coolify ו־Dokploy נותנים ממשק בסגנון Vercel |
| מסד נתונים | Postgres, ‏Supabase, ‏PocketBase או Firebase | Postgres על השרת הכי פשוט. Supabase הכי קל בענן החינמי שלו; אירוח עצמי שלו דורש בערך 11 קונטיינרים. PocketBase הוא שרת שלם בקובץ אחד |
| התחברות | Better Auth | ספרייה בתוך האפליקציה, עם הרשמה, סיסמאות וכניסה עם גוגל |
| קבצים | Cloudflare R2 | ‏10 גיגה בחינם, בלי תשלום על הורדות |
| מיילים | Resend | ‏3,000 מיילים בחודש בחינם |
| AI | Ollama, או כל שירות AI | Ollama מריץ מודלים חינמיים על השרת, אבל לאט בלי כרטיס גרפי |
| אוטומציות | n8n | חינם לשימוש שלכם, אבל הרישיון שלו לא קוד פתוח: אסור למכור אותו כשירות |
| אנליטיקס | Umami או PostHog | ‏Umami (רישיון MIT) על השרת שלכם; PostHog בענן החינמי שלו, עם הקלטות של משתמשים |
| תשלומים | אין | סליקת כרטיסים תמיד עוברת דרך חברת תשלומים. בשלב 9 יש את מה שעובד מישראל |

לא צריך לבחור את כולם עכשיו. בשלבים למטה הסוכן משתמש בברירות המחדל הפשוטות: Postgres, ‏Better Auth, ‏Resend, ‏Umami ו־Polar.

## מה צריך

- **מחשב עם Windows או Mac.**
- **מנוי Claude Pro** ב־$20 בחודש, שכולל את Claude Code.
- **כרטיס אשראי** לשרת ולדומיין.
- **ערב פנוי.** את השלבים 1 עד 7 אפשר לעשות בערב אחד.

לא צריך לדעת לתכנת. אתם מתארים, הסוכן כותב ומריץ, ואתם בודקים את התוצאה. כל פרומפט כאן כתוב באנגלית, כי ככה הכי קל להעתיק אותו, אבל Claude מבין גם עברית.

## שלב 1: מפתח SSH

מפתח SSH הוא הדרך של המחשב שלכם, ושל הסוכן, להתחבר לשרת בלי סיסמה. יוצרים אותו פעם אחת.

ב־Windows פותחים PowerShell, וב־Mac פותחים Terminal, ומריצים:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

לוחצים Enter על כל שאלה. אחר כך מציגים את החלק הציבורי של המפתח. ב־Windows:

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

וב־Mac:

```bash
cat ~/.ssh/id_ed25519.pub
```

מעתיקים את השורה שמתחילה ב־`ssh-ed25519`. היא תצטרך אותה בשלב הבא. את הקובץ בלי `.pub` לא מעבירים לאף אחד.

## שלב 2: שרת

שרת קטן בענן (VPS) עם Ubuntu. כמה אפשרויות, במחירים בזמן הכתיבה:

| ספק | מחיר בחודש | הערה |
|---|---|---|
| [Contabo](https://contabo.com) | בערך €5.50 | ‏Cloud VPS עם 8 גיגה. ‏€4.40 בהתחייבות לשנתיים |
| [Hetzner](https://www.hetzner.com/cloud) | משתנה | זול ואמין, אבל השרתים הזולים שלו לא תמיד זמינים |
| [DigitalOcean](https://www.digitalocean.com/pricing/droplets) | מ־$6 | פשוט מאוד, אבל עם פחות זיכרון במחיר הזה |
| [HostHatch](https://hosthatch.com) | בערך $15 | מה שאני משתמש בו: וינה, 16 גיגה |

בהזמנה בוחרים Ubuntu בגרסה העדכנית עם תמיכה ארוכה (LTS), ומדביקים את המפתח הציבורי משלב 1 בשדה SSH key. בסוף מקבלים כתובת IP. שמרו אותה.

## שלב 3: דומיין ב־Cloudflare

נכנסים ל־[Cloudflare](https://dash.cloudflare.com), פותחים חשבון חינמי, ובתפריט Domain Registration קונים דומיין. ‏Cloudflare מוכרים דומיינים במחיר עלות, בלי תוספת.

אחרי הקנייה נכנסים ל־DNS ומוסיפים רשומה:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `app` | כתובת ה־IP של השרת | Proxied (ענן כתום) |

עכשיו `app.your-domain.com` מצביע לשרת שלכם. אפשר להוסיף עוד רשומה כזאת לכל אפליקציה.

## שלב 4: מתקינים את Claude Code

ב־Windows, ב־PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

וב־Mac:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

אחר כך יוצרים תיקייה לפרויקט, נכנסים אליה ומפעילים:

```bash
mkdir my-app
cd my-app
claude
```

בפעם הראשונה הוא יבקש להתחבר לחשבון Claude שלכם. אם אתם מעדיפים בלי טרמינל, [אפליקציית Claude למחשב](https://code.claude.com/docs/en/desktop-quickstart) עושה את אותו דבר בלשונית Code.

## שלב 5: הסוכן מכין את השרת

זה השלב שבו בדרך כלל צריך איש DevOps. כאן אתם כותבים לסוכן:

```text
Connect to my server over SSH: root@SERVER_IP (my key is ~/.ssh/id_ed25519).
Set it up for running web apps safely:
- create a non-root user with sudo and my SSH key, and turn off password and root login
- turn on the firewall and allow only SSH, HTTP and HTTPS
- turn on automatic security updates
- install Docker
- install Caddy as the web server, so every app gets HTTPS automatically
Explain each step before you run it, and at the end check that everything works
and give me a short summary of what's on the server.
```

הוא מתחבר, מריץ פקודה אחרי פקודה, ומסביר כל אחת. אם הוא שואל אם להריץ משהו, קראו את ההסבר ואשרו.

אם אתם רוצים ממשק גרפי לניהול האפליקציות, אפשר לבקש ממנו להתקין [Coolify](https://coolify.io) או Dokploy במקום Caddy. זה נוח, אבל זה עוד דבר לתחזק, אז זה לא חובה.

## שלב 6: מתארים את האפליקציה

זה החלק שבו אתם עושים בדיוק מה שהייתם עושים ב־Base44: מתארים. ההבדל הוא שכדאי לתאר יותר. ככה נראית תבנית:

```text
Build a web app for [who it's for] that [what it does].

Users:
- sign up with email and password, or with Google
- [what a user can do after logging in]

Free plan: [limits, e.g. 3 projects].
Paid plan: [price, e.g. $9/month] for [what it adds].

Tech: Postgres for data, Better Auth for login, email through Resend,
analytics with Umami, payments through Polar (sandbox for now).
Deploy it to my server with Docker behind Caddy, at app.your-domain.com.
Keep all secrets in a .env file that is never committed.

Before you write any code, write a short plan and wait for my OK.
```

הסוכן יחזור עם תוכנית: אילו מסכים, אילו טבלאות במסד הנתונים, ואיך זה עולה לשרת. קראו אותה. אם משהו חסר או מיותר, תגידו לו, ורק אז תאשרו.

אחרי האישור הוא כותב את הקוד, מריץ אותו, בודק אותו ומעלה לכתובת שלכם. זה לוקח זמן, ומותר ללכת להכין קפה.

## שלב 7: סוכן שני בודק את הראשון

סוכן שבדק את העבודה של עצמו נוטה להסכים עם עצמו. אז פותחים שיחה חדשה, בלי ההיסטוריה של הראשונה, וכותבים:

```text
You are reviewing an app someone else built in this folder. It runs at
https://app.your-domain.com. Don't trust the existing notes.
Try to break it: sign up, log in, use every feature, try the free-plan limits,
try to see another user's data, and look for secrets in the code or the git history.
Write down every problem you find with steps to reproduce, then fix them
one by one and check each fix.
```

גם אתם תעברו על האפליקציה בעצמכם, בטלפון ובמחשב. אתם יודעים מה היא אמורה לעשות טוב יותר מכל סוכן.

## שלב 8: מיילים עם Resend

כדי שמיילים של הרשמה ושל איפוס סיסמה יגיעו לתיבה ולא לספאם, הם צריכים לצאת מהדומיין שלכם.

1. פותחים חשבון ב־[Resend](https://resend.com). בתוכנית החינמית יש 3,000 מיילים בחודש.
2. ב־Domains מוסיפים את הדומיין. ‏Resend מציג כמה רשומות DNS.
3. מוסיפים אותן ב־Cloudflare, בדיוק כמו שהן מופיעות. אם Resend מציע להתחבר ל־Cloudflare ולהוסיף אותן לבד, אפשר.
4. מחכים שהדומיין יסומן Verified, יוצרים API key, ונותנים אותו לסוכן:

```text
Here is my Resend API key: [paste it]. Put it in .env as RESEND_API_KEY,
send all app emails from hello@your-domain.com, and send me a test email
to check it works.
```

## שלב 9: תשלומים מישראל

כאן ההבדל הגדול. Stripe לא פועל בישראל, אז צריך אחת משתי דרכים, ולפעמים את שתיהן.

**לקוחות בכל העולם, בדולרים: Polar.** ‏[Polar](https://polar.sh) הוא merchant of record: הוא המוכר הרשמי מול הלקוח, גובה, מטפל במס בחו״ל, ו[מעביר לכם את הכסף לבנק בישראל](https://polar.sh/docs/merchant-of-record/supported-countries). הוא לוקח עמלה על כל מכירה, אז בדקו את המחיר העדכני באתר שלהם.

1. מתחילים בחשבון ה־sandbox, ‏[sandbox.polar.sh](https://sandbox.polar.sh), שבו שום כסף לא זז.
2. יוצרים מוצר, למשל מנוי חודשי ב־$9.
3. יוצרים access token, ונותנים אותו לסוכן:

```text
Connect Polar (sandbox) for the paid plan. Here is my access token: [paste it].
Add a checkout button, a webhook that upgrades the user when they pay and
downgrades them when they cancel, and a page where users manage their subscription.
Then test the whole flow with Polar's test card and show me it works.
```

4. כשהכל עובד, פותחים חשבון אמיתי ב־[polar.sh](https://polar.sh), עוברים את האימות שלהם, ומבקשים מהסוכן להחליף את המפתחות לחשבון האמיתי.

**לקוחות בישראל, בשקלים: סליקה ישראלית.** ‏[PayPlus](https://docs.payplus.co.il/reference/recurring-payments) תומך בחיוב חודשי בכרטיס אשראי, ו־Grow זמין [דרך מורנינג](https://www.greeninvoice.co.il/clearing), שגם מוציא את החשבונית. כאן אתם המוכרים, אז צריך עוסק פטור או מורשה.

Lemon Squeezy, שהיה פעם אפשרות נפוצה, הפסיק לקבל מוכרים חדשים.

## שלב 10: אנליטיקס עם Umami

[Umami](https://umami.is) סופר ביקורים ומקורות תנועה בלי עוגיות, אז אין צורך בבאנר הסכמה.

```text
Install Umami on my server with Docker, behind Caddy at stats.your-domain.com,
with its own Postgres database. Change the default admin password, add my app
as a website, and put the tracking script in the app.
```

מוסיפים רשומת A ל־`stats` ב־Cloudflare, כמו בשלב 3. אם אתם רוצים גם הקלטות של מה שמשתמשים עושים, [PostHog](https://posthog.com) בענן החינמי שלו עושה את זה.

## שלב 11: גיבוי כל לילה

השרת שלכם, אז גם הגיבויים שלכם. זה השלב שהכי קל לדלג עליו, ושהכי כואב כשדילגתם.

```text
Set up a nightly backup of every Postgres database on this server:
dump them, compress, and upload to a Cloudflare R2 bucket (I'll give you the keys).
Keep the last 14 days. Then do a test restore into a new empty database
and show me the restored data, so we know the backups actually work.
```

ב־Cloudflare נכנסים ל־R2, יוצרים bucket ו־API token, ונותנים אותם לסוכן. הבדיקה בסוף היא החלק החשוב: גיבוי שלא ניסיתם לשחזר הוא רק תקווה.

## שלב 12: פייסבוק ומודעות

כדי לפרסם צריך שלושה דברים: תיק עסקי (Business portfolio), דף עסקי וחשבון מודעות. מקימים אותם ב־[Meta Business Suite](https://business.facebook.com). שני דברים שכדאי לדעת מראש:

- **מטבע ואזור זמן נקבעים פעם אחת.** כשיוצרים את חשבון המודעות, בחרו אותם בזהירות. אחר כך אי אפשר לשנות אותם, רק לפתוח חשבון חדש.
- **מגבלת ההוצאה היא על כל חיי החשבון**, לא לחודש. ומע״מ מתווסף מעליה. שימו מגבלה נמוכה, ותעלו אותה כשמשהו עובד.

כדאי גם ליצור כל קמפיין במצב מושהה, ולהפעיל אותו רק אחרי שבדקתם אותו.

## איך נראית עבודה רגילה אחרי זה

אחרי ההקמה, רוב העבודה היא משפט אחד לסוכן:

- **"תוסיף ייצוא ל־CSV בדף הפרויקטים, ותעלה."**
- **"משתמש כתב שהמייל לאיפוס סיסמה לא הגיע. תבדוק למה."**
- **"כמה משתמשים נרשמו השבוע, וכמה שילמו?"**
- **"תבנה אפליקציה שנייה על אותו שרת, ב־notes.your-domain.com."**

אפליקציה שנייה כבר לא עולה עוד שרת. היא עוד רשומת DNS ועוד תיקייה.

## כשמשהו לא עובד

- **האתר לא נפתח.** בדקו ב־Cloudflare שרשומת ה־A מצביעה ל־IP הנכון. אחר כך בקשו מהסוכן: `The site at app.your-domain.com doesn't load. Check Caddy, Docker and the firewall, and fix it.`
- **מיילים מגיעים לספאם.** בדקו ב־Resend שהדומיין Verified, ושכל רשומות ה־DNS שלו נוספו בדיוק כמו שהן.
- **התשלום עבר, אבל המשתמש לא שודרג.** כמעט תמיד זה ה־webhook. בקשו מהסוכן לבדוק את הלוגים של ה־webhook ב־Polar ובשרת.
- **נגמרה המכסה של Claude.** האפליקציות ממשיכות לרוץ. רק הבנייה מחכה עד שהמכסה מתחדשת.
- **הסוכן נתקע או חוזר על עצמו.** פתחו שיחה חדשה, ותנו לו את התמונה בשני משפטים: מה עובד, ומה לא.

## מה כדאי לזכור

- **השרת באחריותכם.** עדכוני האבטחה אוטומטיים, אבל פעם בחודש כדאי לבקש מהסוכן: `Check this server's health, updates, disk space and backups, and tell me if anything needs attention.`
- **AI באפליקציה עולה כסף.** אם המשתמשים שלכם מפעילים AI, זה על המפתח שלכם מול OpenAI, ‏Anthropic או כל ספק אחר. שימו מגבלת הוצאה אצל הספק, ומגבלת שימוש לכל משתמש באפליקציה.
- **דפים משפטיים.** תנאי שימוש ומדיניות פרטיות הסוכן יכול לנסח, אבל לפני שאתם גובים כסף, שעורך דין יקרא אותם.
- **Base44 עדיין עדיף לפעמים.** אם אתם רוצים לבדוק רעיון עוד היום, או שאתם בכלל לא רוצים שרת, תתחילו שם. אפשר לעבור אחר כך.

## איך אני עושה את זה

ככה בניתי מערכת שבונה אפליקציות, על שרת בווינה, עם ארבעה סוכנים: אחד מחפש רעיונות, אחד מתכנן מוצר, אחד בונה ואחד בודק. ב־154 קומיטים, 152 נכתבו עם Claude, ולא כתבתי באף אחד מהם שורת קוד ביד.

היא עדיין בשלב ניסוי: שום מוצר שלה עוד לא נמכר, וכל השקה וכל שקל שיוצא על מודעות עוברים קודם דרכי. יש תקרה של עשרה דולר בחודש למודעות, וכל קמפיין נפתח מושהה עד שאני מאשר. אצלי השרת חזק יותר והמנוי של Claude גדול יותר, בערך $115 בחודש, אבל כל מה שבמדריך הזה עובד גם על השרת של שישה דולר.

פעם הייתם צריכים צוות כדי לבנות מוצר. היום צריך רעיון, ערב פנוי וסוכן. אז מה אתם בונים?
