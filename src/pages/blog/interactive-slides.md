---
title: "מצגות שעושות דברים: מדריך מלא לבניית שיעורים אינטראקטיביים עם Claude Code"
description: "הפסקתי להכין את הקורסים שלי ב־Gamma, ב־Google Slides וב־Canva. מדריך צעד אחר צעד, מתיקייה ריקה ועד קורס באוויר: לולאה שמריצה את עצמה, Python בתוך השקף, סימולציה עם מחוונים, הערות לסטודנטים בטלפון, PDF, וסוכן AI שמסדר את הקורס."
slug: interactive-slides
lang: he
translation: interactive-slides-en
layout: ../../layouts/ArticleLayout.astro
author: תום כהן
researchedThrough: "2026-11-24"
tags: ["הוראה", "AI", "מדריך"]
---

הפסקתי להכין את הקורסים שלי ב־Gamma, ב־Google Slides וב־Canva. היום אני בונה אותם עם Claude Code: שקפים ב־HTML, ‏CSS ו־JavaScript, שבאמת עושים דברים. לולאה שמריצה את עצמה צעד אחרי צעד, Python שהסטודנטים עורכים ומריצים בתוך השקף, מכבש הידראולי שגוררים בו מחוון ורואים את הכוח משתנה.

כבר יש לי 58 מצגות כאלה ב־[teach.tom-cohen.com](https://teach.tom-cohen.com). בפוסט [החלפתי את המצגות בקוד](/blog/teach-site) סיפרתי למה עברתי ומה זה שינה בכיתה. הפוסט הזה הוא המדריך: איך בונים את זה בעצמכם, צעד אחר צעד, גם אם מעולם לא פתחתם טרמינל.

<figure style="margin:2.25rem auto;max-width:380px;">
<video src="/blog/interactive-slides/reel-he.mp4" poster="/blog/interactive-slides/reel-he.webp" width="540" height="960" controls playsinline preload="metadata" aria-label="סרטון קצר: למה הפסקתי להכין מצגות ב־Gamma, ב־Google Slides וב־Canva. המצגת הישנה שלי לעומת אותו נושא בקוד, לולאה שרצה צעד אחרי צעד, Python בתוך השקף, מכבש הידראולי עם מחוונים, מצוף בתלת־ממד, שיעור בטלפון, PDF, וסוכן AI שמסדר את הקורס." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">הגרסה הקצרה, בשתי דקות. המצגת הישנה והחדשה מוקלטות מהמסך שלי, ושאר השקפים מ־teach.tom-cohen.com; מסכי הטרמינל, העורך ושקף הלולאה ב־Google Slides משוחזרים.</figcaption>
</figure>

## מה יהיה לכם בסוף

- **תיקייה אחת לקורס**, עם קובץ כללים ש־Claude קורא בכל פעם, כך שלא צריך להסביר לו מחדש איך אתם מלמדים.
- **שיעור על לולאות** עם שקף שמריץ את הלולאה בעצמו: השורה הנוכחית מודגשת, ו־i ו־sum מתמלאים בטבלת מעקב בכל לחיצה על חץ.
- **Python שרץ בתוך השקף.** הסטודנטים משנים מספר, לוחצים הרצה, ורואים את התוצאה.
- **סימולציה עם מחוונים**, שבה כל מספר על המסך מחושב, ויש לו בדיקה.
- **הערה לסטודנט מתחת לכל שקף**, ושיעור שנפתח בטלפון כדף שגוללים בו.
- **PDF** למי שלומד מנייר.
- **קורס מסודר ביחידות** עם דף ראשי, וקובץ כללים שכל סוכן AI יכול לעבוד לפיו.
- **כתובת באוויר**, בחינם, בלי לקנות דומיין.

## למה זה שווה את המעבר

בשבילי ההבדל הגדול הוא לא האנימציה. זה שהשקף הוא קוד:

- **דוגמה אחת, בלי עותקים.** הקוד על השקף הוא אותו קוד שהסטודנטים מריצים. מתקנים פעם אחת, וזה מתוקן בכל מקום.
- **שינוי לפני השיעור הוא שתי שורות.** רוצים שהדוגמה תהיה על ציונים ולא על מחירים? משנים שתי שורות, או מבקשים מ־Claude.
- **היסטוריה.** עם git אני רואה מה שיניתי מסמסטר לסמסטר, ולמה.
- **גישה טובה יותר לחומר.** הסטודנטים פותחים כל שיעור בטלפון, עם ההסבר מתחת לכל שקף, ומדפיסים כשהם צריכים.
- **סוכן AI יכול לעבוד על הקורס.** הכול קבצי טקסט, אז Claude, או כל סוכן אחר, יכול לסדר יחידות, לקשר שיעורים ולבנות דפים.

השקף הראשון לוקח קצת זמן. אחרי שיש תבנית וכללים, זה חוסך לי שעות.

## מה צריך

- **מנוי Claude בתשלום.** ‏Claude Code [כלול בתוכניות Pro, ‏Max, ‏Team ו־Enterprise](https://code.claude.com/docs/en/setup). בתוכנית החינמית הוא לא כלול.
- **מחשב עם Windows או Mac,** ודפדפן.
- **לא צריך לדעת לתכנת.** אתם מתארים את השיעור, Claude כותב את הקוד, ואתם בודקים.

Anthropic מעדכנים את Claude לעיתים קרובות, אז ייתכן שחלק מהשמות אצלכם יהיו קצת שונים ממה שכתוב כאן. הדרך נשארת אותה דרך.

## שלב 1: פותחים תיקייה ומפעילים את Claude Code

יש שתי דרכים, ושתיהן עובדות באותה תיקייה.

**בלי טרמינל: אפליקציית Claude למחשב.** מורידים את [אפליקציית Claude](https://code.claude.com/docs/en/desktop-quickstart) ל־Windows או ל־Mac ונכנסים ללשונית **Code**. בוחרים סביבה מקומית (Local), לוחצים על בחירת התיקייה, **Open folder…**, ויוצרים תיקייה חדשה בשם `my-course`. אם אתם רוצים לאשר כל שינוי בעצמכם, בחרו מצב הרשאות ידני.

**עם טרמינל.** מתקינים בפקודה אחת. ב־Windows, ב־PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

וב־Mac:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

ואז יוצרים תיקייה ומפעילים בה את Claude:

```bash
mkdir my-course
cd my-course
claude
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/01-start-he.mp4" poster="/blog/interactive-slides/01-start-he.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="טרמינל: יוצרים תיקייה בשם my-course, נכנסים אליה ומפעילים claude. מקלידים בקשה ליצור CLAUDE.md לקורס תכנות בשפת C לשנה א׳, בעברית ומימין לשמאל. Claude כותב את הקובץ, והוא נפתח לידו עם הכללים: שיעור אחד בקובץ HTML, שקפים ביחס 16:9, הערה לסטודנט מתחת לכל שקף, קוד תמיד משמאל לימין." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">תיקייה, Claude Code, ובקשה אחת שכותבת את קובץ הכללים של הקורס. השלבים מקוצרים.</figcaption>
</figure>

## שלב 2: מסבירים ל־Claude איך אתם מלמדים

Claude קורא את הקובץ `CLAUDE.md` [בתחילת כל שיחה](https://code.claude.com/docs/en/memory). כל מה שתכתבו בו פעם אחת, לא תצטרכו לחזור עליו בכל בקשה. אפשר לבקש מ־Claude לכתוב אותו:

```text
Create CLAUDE.md for my course: C programming for first-year students. Hebrew, right to left, code left to right. One HTML file per lesson in lessons/. Under every scene, a note for the student.
```

וזה בערך מה שיוצא. אפשר לערוך אותו כמו כל קובץ טקסט, וגם לכתוב בו בעברית:

```markdown
# My course: C programming

First-year students. Hebrew, right to left.

- One lesson = one HTML file in lessons/
- A lesson is a list of 16:9 scenes, one idea each
- Arrow keys reveal the steps
- Under every scene: a note written for the student
- Code always left to right, in a monospace font
- Every number on screen is computed, never typed by hand
- Check the lesson on a phone before you finish
```

השורה החשובה ביותר היא "every number on screen is computed". היא מה שמונע ממספר שגוי להגיע לכיתה: Claude מחשב, לא מקליד.

## שלב 3: השקף הראשון, לולאה שמריצה את עצמה

ב־Google Slides, כדי להראות איך `i` משתנה בלולאה, הייתי משכפל שקף לכל סיבוב ומזיז כל מספר ביד. ככה זה נראה כשהשקף הוא קוד:

```text
Build lessons/loops.html: a slide that traces this for-loop step by step, with a trace table for i and sum. Each arrow key press is one step. Compute the table by running the loop in JavaScript, so changing the numbers changes the table.

int sum = 0;
for (int i = 1; i <= 3; i++) {
    sum += i;
}
printf("%d", sum);
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/02-trace-he.mp4" poster="/blog/interactive-slides/02-trace-he.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="Claude קורא את CLAUDE.md, כותב את lessons/loops.html, בודק שהסכום יוצא 6 ופותח את השיעור. בדפדפן: שקף עם הקוד של הלולאה ועם טבלת מעקב. בכל לחיצה על חץ השורה הנוכחית מודגשת וטבלת המעקב מתמלאת: i שווה 1, 2, 3 והתנאי אמת, sum שווה 1, 3, 6. כש־i שווה 4 התנאי שקרי, והפלט הוא 6." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">בקשה אחת, ושקף אחד שמחליף תשעה עותקים. בכל לחיצה על חץ הלולאה מתקדמת צעד. שחזור מפושט; השקף האמיתי נמצא ב־<a href="https://teach.tom-cohen.com/p/c-u6-for">teach.tom-cohen.com</a>.</figcaption>
</figure>

פותחים את הקובץ בדפדפן (לחיצה כפולה על `lessons/loops.html`), עוברים על כל הצעדים, ובודקים. לא מרוצים? אומרים במילים פשוטות: "הטבלה קטנה מדי", "תוסיף עמודה לתנאי", "תתחיל מ־i = 0". Claude מתקן.

ועכשיו החלק שבגללו עברתי: רוצים עשרה סיבובים במקום שלושה? משנים `3` ל־`10`. הטבלה מחושבת מהלולאה עצמה, אז היא גדלה לבד. ב־Google Slides זה היה עוד שקפים.

## שלב 4: Python שרץ בתוך השקף

הדפדפן יכול להריץ Python בעזרת [Pyodide](https://pyodide.org), בלי שום התקנה אצל הסטודנטים. זה מה שמאפשר לסטודנט לשנות מספר וללחוץ הרצה בזמן השיעור:

```text
Add a scene to lessons/lists.html with editable Python that runs in the browser with Pyodide (loaded from jsDelivr on the first Run). A Run button, a Reset button and an output box. Hebrew labels.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/03-python-he.mp4" poster="/blog/interactive-slides/03-python-he.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="שקף בשם כמה עולה הסל. עורך קוד עם רשימת מחירים 12, 30 ו־8 ולולאה שמחברת אותם. הסמן לוחץ הרצה, Python נטען בדפדפן והפלט הוא 50. אחר כך הסמן משנה את 8 ל־20, לוחץ שוב הרצה, והפלט הוא 62." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">ההרצה הראשונה טוענת את Python לדפדפן, וזה לוקח כמה שניות. מהשנייה והלאה זה מיידי. שחזור; הגרסה החיה נמצאת ב־<a href="https://teach.tom-cohen.com/p/intro-variables">שיעור המשתנים</a>.</figcaption>
</figure>

שני דברים שכדאי לדעת: בפעם הראשונה הדפדפן מוריד את Python, אז צריך אינטרנט בכיתה. ואם משהו לא נטען כשפותחים את הקובץ בלחיצה כפולה, בקשו מ־Claude: `Start a local preview server for this folder`.

## שלב 5: סימולציה עם מחוונים

כאן הקוד מתחיל להחליף את הלוח. בהידראוליקה, למשל, סטודנט שואל "מה אם הבוכנה גדולה יותר?", ובמקום לצייר מחדש, גוררים:

```text
Add a scene: a hydraulic press with sliders for the small piston diameter d1, the large piston diameter d2 and the input force F1. Show the pressure, the output force and the stroke. Compute everything in physics.js, and write checks for it that run with node.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/teach-site/02-press-he.mp4" poster="/blog/teach-site/02-press-he.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="סימולציה של מכבש הידראולי. הסמן גורר את הכוח בכניסה מ־200 ל־400 ניוטון ואת קוטר הבוכנה הקטנה מ־20 ל־10 מילימטר. הלחץ, הכוח ביציאה והמהלך מתעדכנים יחד." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">גוררים את הכוח או את הקוטר, והלחץ, הכוח ביציאה והמהלך מתעדכנים יחד. שחזור של <a href="https://teach.tom-cohen.com/p/hyd-pascal">סצנת המכבש</a> מהקורס.</figcaption>
</figure>

החלק החשוב בבקשה הוא `physics.js` עם בדיקות. כל מספר על המסך מגיע מקובץ אחד, ולקובץ יש בדיקות שרצות לפני שאתם מלמדים. כשהעברתי את השיעור הזה, Claude מצא שבמצגת הישנה שלי שטח הבוכנה הופיע כ־πd² במקום πd²/4. שקף שהועתק ידנית לא היה תופס את זה.

עוד רעיונות שעובדים יפה באותה שיטה, כולם מהקורסים שלי: [מצוף בתלת־ממד](https://teach.tom-cohen.com/p/buoy-3d) שמחליפים לו נוזל וחומרים, ו[מחזור קרנו](https://teach.tom-cohen.com/p/carnot-cycle) עם מחוונים למקור החם ולמקור הקר.

## שלב 6: הערות לסטודנטים, ושיעור שנפתח בטלפון

שקף ביחס 16:9 קטן מדי בטלפון. הפתרון: הערה כתובה לסטודנט מתחת לכל שקף, ובטלפון השיעור הופך לדף שגוללים בו:

```text
In loops.html, add a note for the student under every scene. On a phone, show the lesson as one scrolling page: each scene, then its note.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/04-phone-he.mp4" poster="/blog/interactive-slides/04-phone-he.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="Claude מוסיף הערות לשיעור ומתאים אותו לטלפון. במחשב: השקף עם הלולאה ומתחתיו הערה לסטודנט. לידו טלפון שמציג את אותו שיעור כדף אחד: שקף, ההערה שלו, טבלת המעקב, ושקף ה־Python, והאצבע גוללת." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">אותו שיעור: במחשב כשקפים עם הערה, ובטלפון כדף אחד שגוללים בו.</figcaption>
</figure>

כתבו את ההערות בשביל הסטודנט ולא בשבילכם. סטודנט שפספס שיעור קורא את אותו ההסבר שהכיתה שמעה, וזה מה ששינה אצלי את הגישה לחומר.

## שלב 7: PDF למי שלומד מנייר

אין צורך בשרת או בספרייה. כפתור שפותח את חלון ההדפסה, וגיליון סגנונות להדפסה:

```text
Add a PDF button that opens the browser's print dialog, and a print stylesheet: one scene per page at 16:9, no buttons on paper, notes printed under each scene.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/teach-site/04-print-he.mp4" poster="/blog/teach-site/04-print-he.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="דף מבחן. הסמן לוחץ על כפתור PDF, חלון ההדפסה נפתח עם שמירה כ־PDF, הסמן לוחץ על שמירה, ומופיעה הורדה של קובץ PDF." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">כפתור PDF שפותח את חלון ההדפסה של הדפדפן. הקורא בוחר "שמירה כ־PDF".</figcaption>
</figure>

## שלב 8: נותנים לסוכן AI לסדר את הקורס

אחרי כמה שיעורים, התיקייה מתמלאת. כאן נכנס היתרון השני של קבצי טקסט: סוכן AI יכול לעבוד על כל הקורס, לא רק על שקף אחד.

```text
Organize my lessons into units, build index.html as the course page, and move the rules to AGENTS.md so any AI agent follows them.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/05-organize-he.mp4" poster="/blog/interactive-slides/05-organize-he.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="עץ קבצים עם שבעה שיעורים בתיקייה אחת. Claude קורא אותם, יוצר חמש יחידות ומעביר אליהן את השיעורים, כותב AGENTS.md ו־course.json, ובונה דף ראשי. העץ מתסדר מחדש ביחידות, והדף הראשי של הקורס נפתח עם חמש כרטיסיות: יסודות, תנאים, לולאות, פונקציות ומערכים." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">שבעה קבצים בתיקייה אחת הופכים לחמש יחידות עם דף ראשי. השלבים מקוצרים.</figcaption>
</figure>

למה `AGENTS.md`? זה קובץ הכללים שרוב סוכני הקוד מחפשים, למשל Codex. ‏Claude Code [קורא אותו כשאין `CLAUDE.md`](https://code.claude.com/docs/en/memory#agents-md), ולכן ההמלצה היא להשאיר `CLAUDE.md` עם שורה אחת שמייבאת אותו:

```markdown
@AGENTS.md
```

ככה כל סוכן שתפתחו בתיקייה עובד לפי אותם כללים. מכאן אפשר לבקש דברים כמו "תוסיף לכל יחידה דף תרגול", "תמצא שיעורים בלי הערות", או "תבדוק שכל קישור בדף הראשי עובד".

כשיש משהו שאתם חוזרים עליו בכל שיעור, הפכו אותו ל־[skill](https://code.claude.com/docs/en/skills): קובץ `.claude/skills/new-lesson/SKILL.md` עם השלבים, ש־Claude טוען לבד כשמשימה מתאימה. בפוסט [החלפתי את המצגות בקוד](/blog/teach-site) יש דוגמה מלאה.

## שלב 9: מפרסמים, בחינם

כדי שהסטודנטים יגיעו לשיעור, צריך כתובת. אפשר לארח קבצים כאלה בחינם, בלי לקנות דומיין:

```text
Publish this folder for free on Cloudflare Workers static assets, and tell me the address.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/teach-site/05-deploy-he.mp4" poster="/blog/teach-site/05-deploy-he.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="טרמינל מציג תיקיית site, קובץ wrangler.jsonc של שלוש שורות, ומריץ npx wrangler deploy. הקבצים עולים ומודפסת כתובת workers.dev. טלפון פותח את הכתובת וגולל בין שיעורים במצב קריאה." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">תיקיית שיעורים שעולה לאוויר בפקודה אחת ונפתחת בטלפון בכתובת workers.dev חינמית. הכתובת היא דוגמה.</figcaption>
</figure>

בפעם הראשונה Claude יבקש שתתחברו לחשבון Cloudflare בדפדפן. אם אתם מעדיפים GitHub, בקשו `Publish this folder with GitHub Pages`. כל הפרטים, כולל קובץ ההגדרות, נמצאים ב[פוסט הקודם](/blog/teach-site).

## ביום־יום: שינוי לפני שיעור

ככה נראית עבודה רגילה אחרי שהכול מוכן:

- **"תחליף את הדוגמה בשיעור הלולאות ממחירים לציונים."** שתי שורות, ו־Claude מעדכן גם את ההערה.
- **"מה שיניתי בשיעור הזה מאז הסמסטר הקודם?"** אם אתם עובדים עם git, ‏Claude קורא את ההיסטוריה ומסכם.
- **"תבדוק שכל השקפים בשיעור נראים טוב בטלפון."** הוא פותח, בודק ומתקן גלישות וטקסט קטן מדי.

## כשמשהו לא עובד

- **Claude טעה במספר.** זה קורה. בגלל זה כל מספר מחושב בקובץ אחד עם בדיקות. בקשו: `Add checks for every formula in physics.js and run them`. ובכל מקרה, עברו על השיעור לפני שאתם מלמדים ממנו.
- **עברית וקוד מתערבבים.** קוד, נוסחאות וכתובות צריכים להיות משמאל לימין גם בתוך דף עברי. אם משהו מתהפך, תארו מה רואים: "הסוגריים בקוד הפוכים", ו־Claude יעטוף אותו ב־`dir="ltr"`.
- **Python לא נטען.** בדקו שיש אינטרנט, ונסו דרך שרת תצוגה מקומי (שלב 4).
- **השקף צפוף מדי.** בקשו "רעיון אחד לכל שקף". זה כלל שכדאי להוסיף ל־`CLAUDE.md`.
- **לא כל שקף צריך להיות אינטראקטיבי.** לפעמים תמונה עם חץ היא בדיוק מה שצריך, וזה בסדר לבקש בדיוק את זה.

## איפה רואים את זה באמת

כל הדוגמאות בפוסט מבוססות על שיעורים אמיתיים ב־[teach.tom-cohen.com](https://teach.tom-cohen.com):

- [לולאות for ו־do…while](https://teach.tom-cohen.com/p/c-u6-for): טבלת המעקב, צעד אחרי צעד.
- [משתנים](https://teach.tom-cohen.com/p/intro-variables): Python שרץ בתוך השקף.
- [חוק פסקל](https://teach.tom-cohen.com/p/hyd-pascal): המכבש ההידראולי עם המחוונים.
- [מצוף בתלת־ממד](https://teach.tom-cohen.com/p/buoy-3d) ו[מחזור קרנו](https://teach.tom-cohen.com/p/carnot-cycle).
- [קורס התכנות בשפת C](https://teach.tom-cohen.com/courses/c-programming): קורס שלם, מסודר ביחידות.

תתחילו משיעור אחד, הזה שהכי מתסכל להעביר במצגת. אם הוא עובד, השני כבר הולך הרבה יותר מהר.
