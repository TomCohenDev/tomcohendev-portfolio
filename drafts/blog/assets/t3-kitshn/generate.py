"""Rebuild the localized, conceptual SVG figures and interactive draft preview."""
from pathlib import Path
from html import escape

HERE = Path(__file__).resolve().parent
INK = 'var(--foreground, #E0D0C1)'
MUTED = 'var(--muted-foreground, #B9BBBE)'
CARD = 'var(--card, #222524)'
LINE = 'var(--border, #4a4d4b)'
PURPLE = 'var(--chart-1, #BF95F9)'
GOLD = 'var(--chart-2, #F2C46D)'
GREEN = 'var(--success, #43B581)'


def label(x, y, text, size=25, color=INK, bold=False, rtl=False):
    return f'<text x="{x}" y="{y}" text-anchor="middle" fill="{color}" font-size="{size}" font-weight="{650 if bold else 400}" direction="{"rtl" if rtl else "ltr"}" style="unicode-bidi:plaintext">{escape(text)}</text>'


def node(x, y, w, title, sub='', color=PURPLE, h=92, rtl=False):
    return (f'<g class="node"><title>{escape(title+": "+sub)}</title>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{CARD}" stroke="{color}" stroke-width="1.7"/>'
            + label(x+w/2, y+35, title, 27, color, True, rtl)
            + label(x+w/2, y+67, sub, 21, MUTED, rtl=rtl) + '</g>')


def edge(points, color=PURPLE, dashed=False):
    return f'<path d="{points}" fill="none" stroke="{color}" stroke-width="2.3" stroke-linejoin="round" stroke-dasharray="{"7 6" if dashed else "none"}" marker-end="url(#arrow)"/>'


def figure(title, subtitle, content, height, rtl):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 {height}" role="img" aria-labelledby="figure-title figure-desc" font-family="Arial, sans-serif">'
            f'<title id="figure-title">{escape(title)}</title><desc id="figure-desc">{escape(subtitle)}</desc>'
            f'<defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto-start-reverse"><path d="M1 1L8 4.5L1 8" fill="none" stroke="{PURPLE}" stroke-width="1.5"/></marker></defs>'
            + label(360, 38, title, 29, INK, True, rtl)
            + label(360, 73, subtitle, 20, MUTED, rtl=rtl)
            + content
            + label(360, height-17, 'תרשים הסבר • לא נתוני מערכת בזמן אמת' if rtl else 'Conceptual diagram · not live system data', 18, MUTED, rtl=rtl)
            + '</svg>')


CAPTIONS = {
    'en': [
        ('The layers around an agent', 'The harness connects decisions to executable work.', 'A harness gives the model a working environment: tools, context, permissions, and a repository. I still choose the outcome and assess the result.'),
        ('Where the setup comes from', 'Project lineage and integration are different relationships.', 'Solid arrows show the T3 fork lineage. The dashed connection shows Kitshn integration. Yarden Zamir’s Kitshn is a separate project, alongside his work on T3.'),
        ('What a thread holds together', 'One task has a place for context and evidence.', 'The thread connects the conversation to the project and its changes. A separate worktree is available when a task needs an isolated checkout.'),
        ('How a task moves through agents', 'Delegate a bounded question, then use its result.', 'This is an example workflow, not a requirement to parallelize every task. Research can inform implementation; review examines the resulting changes; the main agent resolves the findings.'),
        ('Work across linked machines', 'Access grants define what can cross the boundary.', 'These are example machine roles, not an inventory of my hardware. The linked environment has its own checkout and tools; delegation respects the grant and calling-thread limits.'),
        ('A failure can become a repair task', 'An event starts investigation; checks still matter.', 'Selected workflow failures can route into a repair task in my fork. A repair proposal still needs validation and the applicable review and merge process; this is not a guarantee of automatic recovery.'),
        ('Where the acceleration comes from', 'A workflow comparison, without invented speed metrics.', 'The change is in the handoffs: less context to reconstruct, fewer manual status checks, and a clearer point for my decisions. The lanes are conceptual, not durations or a productivity benchmark.'),
    ],
    'he': [
        ('השכבות שסביב הסוכן', 'הסביבה מחברת החלטות לעבודה שאפשר לבצע.', 'ה־Harness נותן למודל סביבת עבודה: כלים, הקשר, הרשאות ומאגר קוד. אני עדיין בוחר את התוצאה ובודק את מה שנבנה.'),
        ('מאיפה הסטאפ הגיע', 'הקשר בין פורקים שונה משילוב בין פרויקטים.', 'חצים רציפים מציגים את שרשרת הפורקים של T3. הקו המקווקו מציג שילוב עם Kitshn. זהו פרויקט נפרד של ירדן זמיר, לצד העבודה שלו על T3.'),
        ('מה השרשור מחבר', 'מקום אחד להקשר ולראיות של משימה.', 'השרשור מחבר את השיחה לפרויקט ולשינויים. כשמשימה צריכה עותק עבודה מבודד, אפשר להשתמש ב־worktree נפרד.'),
        ('איך משימה עוברת בין סוכנים', 'מאצילים שאלה מוגדרת ומשתמשים בתוצאה.', 'זאת דוגמה לתהליך, ולא דרישה לפצל כל משימה. המחקר יכול להזין את המימוש, הביקורת בודקת את השינויים, והסוכן הראשי מטפל בממצאים.'),
        ('עבודה בין מחשבים מקושרים', 'הרשאות קובעות מה יכול לעבור בין הסביבות.', 'אלה תפקידים לדוגמה, ולא רשימת המחשבים שלי. לסביבה המקושרת יש קוד וכלים משלה; ההאצלה כפופה להרשאות ולמגבלות השרשור.'),
        ('תקלה יכולה להפוך למשימת תיקון', 'אירוע מפעיל חקירה; הבדיקות עדיין חשובות.', 'כשלים בתהליכים מסוימים יכולים להפוך למשימת תיקון בפורק שלי. ההצעה עדיין זקוקה לבדיקה ולתהליך הביקורת והמיזוג המתאים. אין כאן הבטחה להתאוששות אוטומטית.'),
        ('מאיפה מגיעה ההאצה', 'השוואת תהליכים בלי להמציא מדדי מהירות.', 'השינוי נמצא בהעברות: פחות הקשר לשחזר, פחות בדיקות מצב ידניות ומקום ברור להחלטות שלי. המסלולים אינם זמני ביצוע או מדידת פרודוקטיביות.'),
    ],
}


def build(lang):
    he = lang == 'he'
    def t(en, heb): return heb if he else en
    def n(x, y, w, title, sub='', **kw): return node(x,y,w,title,sub,rtl=he,**kw)
    diagrams = []
    # 1. Layers: human, control surface, runtime, concrete working environment.
    c = ''
    layers = [(t('Me: outcome + decisions','אני: תוצאה והחלטות'),t('Brief · constraints · review','בריף · אילוצים · ביקורת'),GOLD),
              ('T3 Code',t('Projects · threads · work coordination','פרויקטים · שרשורים · תיאום עבודה'),PURPLE),
              (t('Agent runtime + model','סביבת הרצה ומודל'),t('Reasoning · tool calls · implementation','חשיבה · הפעלת כלים · מימוש'),PURPLE),
              (t('Repository + tools','מאגר קוד וכלים'),t('Files · commands · tests · permissions','קבצים · פקודות · בדיקות · הרשאות'),GREEN)]
    for i,(a,b,col) in enumerate(layers):
        y=110+i*128
        if i: c += edge(f'M360 {y-36}V{y-7}')
        c+=n(60,y,600,a,b,color=col)
    diagrams.append((c,640))
    # 2. Fork lineage and a distinct integration.
    c=n(120,110,480,'pingdotgg / t3code',t('Upstream T3 Code','פרויקט T3 Code המקורי'))
    c+=edge('M360 202V234')+n(120,242,480,'Yarden-zamir / t3code',t('Yarden Zamir’s T3 fork','הפורק של ירדן זמיר'))
    c+=edge('M360 334V370')+n(120,378,480,'TomCohenDev / t3code',t('My adaptations on that foundation','ההתאמות שלי על הבסיס הזה'),color=GOLD)
    c+=edge('M360 510V477',dashed=True)
    c+=n(120,520,480,'Yarden-zamir / kitshn',t('Separate project · linked integration','פרויקט נפרד · שילוב עם T3'),color=GREEN)
    diagrams.append((c,665))
    # 3. Context graph.
    c=edge('M185 202V254H360V280')+edge('M535 202V254H360V280')+edge('M360 378V410H185V447')+edge('M360 378V410H535V447')
    c+=n(30,110,310,t('Conversation','שיחה'),t('Decisions + constraints','החלטות ואילוצים'))
    c+=n(380,110,310,t('Project + branch','פרויקט וענף'),t('Where the work belongs','איפה העבודה מתבצעת'))
    c+=n(130,284,460,t('Task thread','שרשור משימה'),t('Context stays connected','ההקשר נשאר מחובר'),color=GOLD)
    c+=n(30,455,310,t('Diff + checks','שינויים ובדיקות'),t('Evidence to inspect','ראיות שאפשר לבדוק'))
    c+=n(380,455,310,t('Optional worktree','Worktree לפי הצורך'),t('An isolated checkout','עותק עבודה מבודד'))
    diagrams.append((c,600))
    # 4. Explicitly sequenced example: research informs implementation, review follows.
    c=n(100,110,520,t('Main agent receives the brief','הסוכן הראשי מקבל בריף'),t('Outcome + constraints','תוצאה רצויה ואילוצים'),color=GOLD)
    for i,(a,b) in enumerate([(t('Bounded research','מחקר מוגדר'),t('Return findings to the main agent','מחזירים ממצאים לסוכן הראשי')),(t('Implementation','מימוש'),t('Use the findings · change the code','משתמשים בממצאים ומשנים את הקוד')),(t('Independent review','ביקורת עצמאית'),t('Inspect the resulting diff + checks','בודקים את השינויים והבדיקות')),(t('Main agent resolves findings','הסוכן הראשי מטפל בממצאים'),t('Revise · verify · hand back for a decision','מתקנים · מאמתים · מחזירים להחלטה'))]):
        y=242+i*128
        c+=edge(f'M360 {y-40}V{y-7}')+n(100,y,520,a,b,color=GREEN if i==3 else PURPLE)
    diagrams.append((c,780))
    # 5. Two illustrative machine roles, not real hostnames or machine counts.
    c=n(95,110,530,t('Machine A: parent thread','מחשב א׳: השרשור הראשי'),t('Local project + task context','פרויקט מקומי והקשר המשימה'),color=GOLD)
    c+=edge('M360 202V241')+n(95,249,530,t('Kitshn access boundary','גבול הגישה של Kitshn'),t('Shared card · grant · thread limits','כרטיס משותף · הרשאה · מגבלות'))
    c+=edge('M360 341V380')+n(95,388,530,t('Machine B: delegated work','מחשב ב׳: עבודה מואצלת'),t('Its own checkout + installed tools','עותק הקוד והכלים של אותה סביבה'))
    c+=edge('M360 480V519')+n(95,527,530,t('Completion reaches the parent','עדכון סיום מגיע לשרשור הראשי'),t('Continue with the returned result','ממשיכים עם התוצאה שחזרה'),color=GREEN)
    diagrams.append((c,675))
    # 6. A routed failure is not an automatic successful repair or automatic merge.
    c=n(90,110,540,t('Selected workflow fails','תהליך נתמך נכשל'),t('CI or release event in my fork','אירוע CI או שחרור בפורק שלי'),color=GOLD)
    rows=[(t('Webhook creates a repair task','Webhook יוצר משימת תיקון'),t('Failure context travels with the task','הקשר התקלה מגיע עם המשימה')),(t('Agent investigates + proposes a fix','הסוכן חוקר ומציע תיקון'),t('Concrete changes, ready to inspect','שינויים ממשיים שאפשר לבדוק')),(t('Run checks again','מריצים בדיקות שוב'),t('If they fail, revise the proposal','אם נכשלו, מתקנים את ההצעה')),(t('Review + merge process','תהליך ביקורת ומיזוג'),t('Follow the repository’s approval rules','פועלים לפי כללי האישור של המאגר'))]
    for i,(a,b) in enumerate(rows):
        y=242+i*128
        c+=edge(f'M360 {y-40}V{y-7}')+n(90,y,540,a,b,color=GREEN if i==3 else PURPLE)
    c+=edge('M630 544H686V416H639',dashed=True)
    diagrams.append((c,780))
    # 7. Qualitative process comparison; no duration, axis, or invented multiplier.
    c=label(360,125,t('MANUAL COORDINATION','תיאום ידני'),23,GOLD,True,he)
    c+=n(65,151,590,t('Rebuild context → pass work along','משחזרים הקשר ומעבירים עבודה'),t('Repeat the brief and current state','חוזרים על הבריף ועל המצב הנוכחי'),color=GOLD)
    c+=edge('M360 243V274')+n(65,282,590,t('Check status → decide what is next','בודקים מצב ומחליטים מה הלאה'),t('I move each handoff forward','אני מקדם כל העברה ידנית'),color=GOLD)
    c+=label(360,433,t('WITH A HARNESS + ORCHESTRATION','עם Harness ואורקסטרציה'),23,PURPLE,True,he)
    c+=n(65,461,590,t('Persistent task → bounded handoff','משימה עם הקשר והאצלה מוגדרת'),t('Context travels with the work','ההקשר עובר יחד עם העבודה'))
    c+=edge('M360 553V584')+n(65,592,590,t('Event returns → I assess the result','האירוע חוזר ואני בודק תוצאה'),t('Attention goes to the next decision','הקשב עובר להחלטה הבאה'),color=GREEN)
    diagrams.append((c,740))
    paths=[]
    for i,((content,height),(title,subtitle,caption)) in enumerate(zip(diagrams,CAPTIONS[lang]),1):
        path=HERE/f'{i:02d}-{lang}.svg'
        path.write_text(figure(title,subtitle,content,height,he))
        paths.append((path,title,caption))
    return paths


def preview(paths, lang='en', standalone=False):
    def t(en, he): return he if lang == 'he' else en
    buttons=''.join(f'<button type="button" role="tab" id="tab-{i}" aria-controls="panel-{i}" aria-selected="{str(i==0).lower()}" tabindex="{0 if i==0 else -1}" data-index="{i}">{i+1}. {escape(title)}</button>' for i,(_,title,_) in enumerate(paths))
    sections=''
    for i,(path,_,caption) in enumerate(paths):
        svg=path.read_text().replace('figure-title',f'figure-{i}-title').replace('figure-desc',f'figure-{i}-desc').replace('id="arrow"',f'id="arrow-{i}"').replace('url(#arrow)',f'url(#arrow-{i})')
        sections+=f'<section class="panel" role="tabpanel" id="panel-{i}" aria-labelledby="tab-{i}" {"hidden" if i else ""}>{svg}<p>{escape(caption)}</p></section>'
    css='''
    :root{color-scheme:dark light;font-family:var(--font-sans,system-ui);color:var(--foreground)}
    body{margin:0}*{box-sizing:border-box}[hidden]{display:none!important}
    nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0 0 18px}
    button{font:inherit;text-align:start;border:1px solid var(--border);border-radius:var(--radius,10px);padding:11px 12px;background:var(--card);color:var(--foreground);cursor:pointer;font-size:13px;line-height:1.4}
    button[aria-selected=true]{border-color:var(--primary);background:var(--accent);color:var(--accent-foreground)}
    button:focus-visible{outline:2px solid var(--ring);outline-offset:3px}
    .panel{border:1px solid var(--border);border-radius:var(--radius,12px);background:var(--card);padding:16px}
    svg{display:block;width:100%;height:auto}p{font-size:14px;line-height:1.7;color:var(--muted-foreground);margin:14px 0 0}
    .node.active rect{stroke:var(--primary);stroke-width:4}.node.active{filter:drop-shadow(0 0 3px var(--primary))}
    .actions{display:flex;gap:8px;align-items:center;margin-top:12px}.actions span{font-size:13px;color:var(--muted-foreground)}
    @media(max-width:430px){nav{grid-template-columns:1fr}.panel{padding:8px}button{font-size:13px}p{padding:8px}}
    '''
    js='''
    const tabs=[...document.querySelectorAll('[role=tab]')];let active=0,step=-1;
    function choose(index){active=index;step=-1;tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;document.getElementById('panel-'+i).hidden=i!==index;});document.querySelectorAll('.node.active').forEach(n=>n.classList.remove('active'));document.getElementById('step-status').textContent='Select a diagram, then trace its nodes.';}
    tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>choose(i));tab.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(active+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;choose(next);tabs[next].focus();}});});
    document.getElementById('trace').addEventListener('click',()=>{const nodes=[...document.querySelectorAll('#panel-'+active+' .node')];nodes.forEach(n=>n.classList.remove('active'));step=(step+1)%nodes.length;nodes[step].classList.add('active');document.getElementById('step-status').textContent=nodes[step].querySelector('title').textContent;});
    '''
    status=t('Select a diagram, then trace its nodes.','בחרו תרשים ועברו בין הצמתים שלו.')
    js=js.replace('Select a diagram, then trace its nodes.',status)
    if standalone:
        css+=':root{--foreground:#E0D0C1;--muted-foreground:#B9BBBE;--card:#222524;--border:#454845;--primary:#BF95F9;--accent:#3c2f50;--accent-foreground:#E0D0C1;--chart-1:#BF95F9;--chart-2:#F2C46D;--success:#43B581;--ring:#BF95F9;--radius:12px;--font-sans:Arial,sans-serif}body{background:#1D201F;padding:20px;max-width:1000px;margin:auto}'
    robots='<meta name="robots" content="noindex,follow">' if standalone else ''
    back=f'<p style="margin:0 0 20px"><a style="color:var(--primary)" href="/blog/{"t3-kitshn" if lang=="he" else "t3-kitshn-en"}">{t("Back to the article","חזרה למאמר")}</a></p>' if standalone else ''
    return f'<!doctype html><html lang="{lang}" dir="{"rtl" if lang=="he" else "ltr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">{robots}<title>{t("T3 Code and Kitshn visual guide","מדריך חזותי ל־T3 Code ו־Kitshn")}</title><style>{css}</style></head><body>{back}<nav role="tablist" aria-label="{t("Explore the seven diagrams","סיור בשבעת התרשימים")}">{buttons}</nav>{sections}<div class="actions"><button id="trace" type="button">{t("Trace next node","לצומת הבא")}</button><span id="step-status" role="status">{status}</span></div><script>{js}</script></body></html>'


if __name__ == '__main__':
    en=build('en')
    build('he')
    (HERE/'preview.html').write_text(preview(en))
    print('Wrote 14 localized SVG figures and the interactive preview.')
