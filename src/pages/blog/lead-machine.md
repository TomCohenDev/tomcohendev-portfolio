---
title: "לקוחות חדשים כל בוקר: מכונת לידים עם Claude וגוגל שיטס, בלי קוד"
description: "מדריך מלא: גיליון גוגל, חיבור ל־Claude ומשימה מתוזמנת שמוצאת כל בוקר עשרה עסקים חדשים, נותנת להם ציון, וכותבת לכל אחד הודעת ווטסאפ אישית שאתם שולחים בעצמכם."
slug: lead-machine
lang: he
translation: lead-machine-en
layout: ../../layouts/ArticleLayout.astro
author: תום כהן
researchedThrough: "2026-11-22"
tags: ["אוטומציה", "AI", "מדריך"]
---

יש כלים שגובים תשלום חודשי כדי לתת לכם רשימה של עסקים וטלפונים. לפני כמה חודשים בניתי לעצמי מערכת שעושה את זה בשבילי: כל בוקר היא מוצאת עסקים חדשים בכפר סבא ובהוד השרון, נותנת לכל אחד ציון לפי כמה הוא צריך את מה שאני עושה, וכותבת לי הודעה אישית. אני רק עובר על הרשימה ולוחץ שלח.

המערכת שלי בנויה בקוד. בפוסט הזה אני מראה גרסה שכל אחד יכול להרים בלי שורת קוד, עם מנוי Claude וגיליון של גוגל. זה לוקח בערך רבע שעה.

<figure style="margin:2.25rem auto;max-width:380px;">
<video src="/blog/lead-machine/reel-he.mp4" poster="/blog/lead-machine/reel-he.webp" width="540" height="960" controls playsinline preload="metadata" aria-label="סרטון קצר: תום מסביר את שלושת השלבים. גיליון גוגל בשם Leads, חיבור Google Sheets ב־Claude, ומשימה מתוזמנת שרצה כל בוקר וממלאת את הגיליון בעסקים, ציון והודעת ווטסאפ." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">הגרסה הקצרה, בדקה. המסכים בסרטון משוחזרים ומפושטים. העסקים בגיליון מומצאים.</figcaption>
</figure>

## מה יהיה לכם בסוף

- **גיליון בשם Leads שמתמלא לבד כל בוקר** בעשרה עסקים חדשים, מהסוג ומהעיר שבחרתם.
- **לכל עסק:** שם, טלפון, קישור לגוגל מפות, אתר אם יש, דירוג ומספר ביקורות.
- **ציון מ־1 עד 10** לכמה העסק צריך את מה שאתם מוכרים, ומשפט אחד שמסביר למה.
- **הודעת ווטסאפ קצרה בעברית** לכל עסק עם ציון 7 ומעלה, וקישור שפותח את הצ'אט עם ההודעה כבר מוקלדת.
- **בלי כפולים.** לפני שהמשימה מחפשת, היא קוראת את הגיליון ומדלגת על עסקים שכבר נמצאים בו.

ההודעות לא נשלחות לבד. אתם קוראים, מתקנים אם צריך, ולוחצים שלח. בהמשך אסביר למה זה חשוב.

## מה צריך

- **מנוי Claude בתשלום.** משימות מתוזמנות [זמינות בתוכניות בתשלום](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork) (Pro, ‏Max, ‏Ultra, ‏Team ו־Enterprise). בחינם זה לא עובד.
- **חשבון גוגל.**
- **רבע שעה,** ועוד כמה דקות בבוקר שאחרי כדי לבדוק את ההרצה הראשונה.

Anthropic מעדכנים את הממשק של Claude לעיתים קרובות, אז השמות של הכפתורים אצלכם יכולים להיות קצת שונים ממה שכתוב כאן. המבנה נשאר אותו מבנה.

## שלב 1: הגיליון

1. פותחים [sheets.new](https://sheets.new). זה יוצר גיליון ריק חדש.
2. משנים את השם שלו ל־**Leads**. המשימה תחפש את הגיליון לפי השם הזה.
3. מדביקים בתא A1 את שורת הכותרות:

```
Name,Phone,Score,Why,WhatsApp message,WhatsApp link,Google Maps,Website,Rating,Reviews,Status,Found on
```

4. השורה נכנסת כולה לתא אחד. גוגל שיטס בדרך כלל מציע מיד **Split text to columns**. אם לא, בוחרים בתפריט **Data ← Split text to columns**. עכשיו כל כותרת יושבת בעמודה משלה, A עד L.

עוד שלושה דברים שלא חובה, אבל עושים את הגיליון נוח הרבה יותר:

- **מקפיאים את השורה הראשונה:** View ← Freeze ← 1 row. הכותרות נשארות למעלה כשגוללים.
- **צבע לפי ציון:** מסמנים את עמודה C ובוחרים Format ← Conditional formatting ← Color scale. הציונים הגבוהים יבלטו.
- **סטטוס עם רשימה נפתחת:** מסמנים את עמודה K ובוחרים Insert ← Dropdown עם New, ‏Asked, ‏Said yes, ‏Not interested.

הסדר של העמודות חשוב. המשימה תכתוב כל שורה לפי הסדר הזה. אם תשנו אותו, תשנו גם את הפרומפט.

## שלב 2: מחברים את Google Sheets ל־Claude

Claude לא רואה את הגוגל שלכם עד שמחברים אותו. עושים את זה פעם אחת:

1. ב־Claude נכנסים ל־**Customize ← Connectors** (הכתובת הישירה: [claude.ai/customize/connectors](https://claude.ai/customize/connectors)).
2. לוחצים על **+** ליד Connectors, ומחפשים את **Google Sheets**. הוא שייך לחבילה של Google Docs, ‏Sheets ו־Slides.
3. לוחצים **Connect**, נכנסים עם חשבון הגוגל שבו נמצא הגיליון, ומאשרים.

שימו לב: Google Sheets הוא [מחבר נפרד מ־Google Drive](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors). המחבר של Drive קורא קבצים. המחבר של Sheets הוא זה שיודע לערוך אותם, ובזה המשימה צריכה.

**בדיקה של דקה:** פותחים צ'אט רגיל, מדליקים את המחבר דרך **+ ← Connectors**, וכותבים:

```
Open my Google Sheet "Leads" and write "test" in cell A2.
```

אם "test" הופיע בגיליון, החיבור עובד. מוחקים את התא וממשיכים.

## שלב 3: המשימה המתוזמנת

1. בתפריט הצד של Claude לוחצים על **Scheduled**.
2. לוחצים **New task** ובוחרים **Set up manually**.
3. **Name:** משהו כמו `Daily leads`.
4. **הפרומפט:** מדביקים את הטקסט הבא, ומחליפים את שלושת הדברים שבסוגריים המרובעים:

```
I [what you do, e.g. build websites for small businesses].

Every time you run:
1. Open my Google Sheet named "Leads" and read every business already in it.
2. Search Google Maps and the web for 10 new [type of business, e.g. barbershops] in [city] that have a reason to need me: [e.g. no website, an outdated website, or few reviews]. Skip any business already in the sheet (match by name or phone).
3. For each business, find: name, phone, Google Maps link, website (if any), rating, number of reviews. Only real businesses you found in your search. If you can't find a detail, leave it blank. Never make anything up.
4. Give each one a 1–10 score for how much they need me, and one sentence on why.
5. For every business scoring 7 or higher, write a short WhatsApp message in Hebrew (2–3 lines, casual and friendly). It only asks whether they'd like to hear more: no prices, no links, no pressure. Mention one specific detail about their business so it's clearly not copy-paste.
6. Add a WhatsApp link in this format: https://wa.me/972[phone without the leading 0]?text=[the message, URL-encoded].
7. Add one row per business at the bottom of the sheet, in the existing column order, with Status = "New" and today's date in "Found on". Never change or delete existing rows.

Never contact, message or email any business yourself.
```

הפרומפט באנגלית כי ככה Claude הכי מדויק בהוראות. ההודעות עצמן ייכתבו בעברית, כי זה מה שכתוב בסעיף 5.

שלושת הדברים שמחליפים הם מה שעושה את זה שלכם:

- **מה אתם עושים.** "I build websites for small businesses", ‏"I'm a bookkeeper for freelancers", ‏"I run Instagram ads for restaurants".
- **איזה עסקים ואיפה.** "barbershops in Kfar Saba", ‏"dental clinics in Ra'anana", ‏"pilates studios in Tel Aviv". עיר אחת וסוג עסק אחד נותנים תוצאות הכי טובות.
- **מה הופך עסק לליד טוב בשבילכם.** בשבילי זה עסק בלי אתר. בשביל רואה חשבון זה אולי עסק חדש. ככל שזה ספציפי יותר, הציונים מדויקים יותר.

5. **Approval mode:** בוחרים מצב שמאפשר למשימה לפעול בלי לחכות לאישור שלכם. לפי Anthropic, [משימה שמשתמשת בכלי שמוגדר "Always ask" עלולה לחכות לתשובה או להסתיים בלי הכלי](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork). כלומר בלי לכתוב לגיליון.
6. **תדירות:** **Daily**. אם אפשר לבחור שעה, 8:00 בבוקר. אפשר גם **Weekdays**, אם אתם לא רוצים לידים בסוף שבוע.
7. **Folder:** משאירים ריק. ככה המשימה רצה בענן, גם כשהמחשב כבוי או סגור. אם בוחרים תיקייה, היא רצה רק כשהמחשב דולק ו־Claude פתוח.
8. **Save.**

## שלב 4: הרצה ראשונה, ובדיקה

לא מחכים למחר. בעמוד **Scheduled** מריצים את המשימה עכשיו, ידנית. כל הרצה נפתחת כשיחה משלה, אז אפשר לפתוח אותה ולראות מה היא עשתה: מה חיפשה, מה מצאה ומה כתבה.

אחרי שהיא מסתיימת, עוברים על הגיליון:

- **השורות נכנסו מתחת לכותרות, כל ערך בעמודה הנכונה?** אם העמודות זזו, בדקו ששורת הכותרות בגיליון זהה לזו שבפרומפט.
- **פותחים שניים־שלושה קישורים לגוגל מפות.** העסקים קיימים? הטלפון נכון? המשימה מחפשת ברשת, לא במאגר מסודר. הפרומפט מבקש להשאיר ריק ולא להמציא, ובכל זאת שווה לבדוק, בעיקר בשבוע הראשון.
- **לוחצים על קישור ווטסאפ אחד.** הצ'אט נפתח עם ההודעה מוקלדת? אם העברית יצאה מבולגנת, בקשו בפרומפט "URL-encode the Hebrew text".

**אם שום דבר לא נכתב לגיליון:**

- בדקו שהמחבר של Google Sheets מחובר ב־Customize ← Connectors. אם הוא מחובר ועדיין לא עובד, Anthropic ממליצים לנתק ולחבר מחדש.
- בדקו את ה־Approval mode של המשימה, כמו בשלב 3.
- במקום שם הגיליון, הדביקו בפרומפט את הקישור המלא שלו.

## שלב 5: מה עושים כל בוקר

1. פותחים את הגיליון. בטלפון עדיף באפליקציה של Google Sheets.
2. ממיינים לפי עמודה C, הציון, מהגבוה לנמוך.
3. קוראים את ה־Why. אם זה נשמע נכון, לוחצים על ה־WhatsApp link.
4. ווטסאפ נפתח עם ההודעה מוקלדת. קוראים, משנים מילה אם צריך, ולוחצים שלח בעצמכם.
5. מעדכנים את ה־Status, כדי שמחר תדעו מי כבר קיבל הודעה.

## למה ההודעות לא נשלחות לבד

אפשר היה לבקש מ־Claude לשלוח את ההודעות בעצמו. זה רעיון רע, משתי סיבות.

**הראשונה: החוק.** סעיף 30א בחוק התקשורת (בזק ושידורים), שנקרא "חוק הספאם", מאפשר לבית משפט לפסוק פיצוי של עד ₪1,000 על כל הודעה פרסומית שנשלחה בלי הסכמה, בלי שצריך להוכיח נזק. לפי הסעיף מותר לפנות לבית עסק פעם אחת ולבקש את ההסכמה שלו. לכן ההודעה שהפרומפט כותב רק שואלת אם מעניין אותם לשמוע עוד: בלי מחירים, בלי קישורים ובלי הצעה. ואם לא ענו, מתקשרים. לא שולחים הודעה שנייה. זה לא ייעוץ משפטי. אם אתם מתכננים לפנות להרבה עסקים, שווה לשאול עורך דין.

**השנייה: איכות.** אתם מכירים את התחום שלכם יותר טוב מכל מודל. עשר שניות של קריאה לפני שליחה הן ההבדל בין הודעה שנראית כמו ספאם להודעה שמישהו עונה לה.

## התאמות שכדאי לנסות

- **כמות.** עשרה ליום זה מספר שאפשר באמת לעבור עליו. אם אתם מספיקים יותר, שנו את המספר בסעיף 2.
- **כמה תחומים.** משימה לכל סוג עסק, או רשימה בתוך הפרומפט: "barbershops, nail salons and beauty clinics".
- **אימייל במקום ווטסאפ.** מוסיפים עמודת Email, ומבקשים מהמשימה למצוא אימייל אם הוא מופיע באתר.
- **רק בימי עבודה.** תדירות Weekdays במקום Daily.

כל הרצה משתמשת במכסת השימוש של המנוי שלכם, אז הרצה יומית אחת עם עשרה עסקים לא אמורה להרגיש. עשר משימות בשעה כבר כן.

## מה זה לא

- **זה לא מאגר נתונים.** המשימה מחפשת ברשת כמו שאתם הייתם מחפשים, רק מהר יותר. חלק מהפרטים יהיו חסרים, וחלק לא מעודכנים.
- **זה לא מכירות.** זה נותן לכם רשימה טובה יותר והודעה ראשונה טובה יותר. את השיחה עדיין אתם עושים.
- **זה לא המערכת שלי.** המערכת שאני משתמש בה בנויה בקוד: היא מושכת עסקים מ־Google Places, שומרת היסטוריה של שיחות ופגישות, ובונה לכל עסק אתר דמו כשאני מבקש. אבל ברוב הימים, מה שאני באמת צריך ממנה זה בדיוק מה שהגיליון הזה נותן: עשרה עסקים טובים והודעה אחת טובה לכל אחד.

אם הרמתם את זה ויש לכם שאלה, או שהמשימה עושה משהו מוזר, תכתבו לי.
