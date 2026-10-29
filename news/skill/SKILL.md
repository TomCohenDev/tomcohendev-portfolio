# Daily news: editorial rules

"חדשות הבוקר" at tomcohen.dev/news: every morning, 4 to 6 stories from the last day that matter to business owners in Israel,
in Hebrew, each with what it means for a business and a link to its source. Tom Cohen builds apps and automations for businesses;
the news follows what he offers.

## Readers

Owners and managers of small and medium businesses in Israel. They are not developers. They want to know what changed,
whether it affects them, and what to do about it.

## What to choose

In order of priority:

1. **Mobile apps** (`mobile`): iOS and Android, Flutter, the App Store and Google Play (rules, fees, reviews), payments in apps, Firebase.
2. **AI** (`ai`): tools and models a business can use now, prices, availability in Israel and in Hebrew, AI in tools they already use (Google, Microsoft, WhatsApp).
3. **Automation** (`automation`): n8n, Zapier, Make, Google Workspace, WhatsApp Business and Meta APIs, connections between systems.
4. **Security** (`security`): threats and fixes that affect small businesses: phishing waves, critical bugs in common software, account protection.
5. **Business** (`business`): Israeli tech news that changes something for local businesses.

Each issue covers at least two of the first three topics when the day has material for them. The lead story (first) is the one most useful to a business owner.

Skip:

- funding rounds, acquisitions, earnings, stock prices, executives' opinions, lawsuits, politics;
- rumours and leaks; anything that is not announced or reported by a named source;
- release notes with only bug fixes; event promotions; listicles and SEO posts ("the 9 best X");
- consumer gadgets and entertainment with no business angle;
- a story already covered in an earlier issue, unless there is a real development: then set `continues`.

## How to write

- Hebrew, plain and short. No hype, no emojis, no exclamation marks, no "מהפכה".
- **headline**: up to 90 characters. States the fact, not a teaser.
- **summary**: two sentences, in your own words, with only facts the source states. Say who gets it, where and when, when the source says
  (for example "בארה\"ב בלבד", "בתצוגה מקדימה"). Never copy sentences from the source and never translate it word for word.
- **forBusiness**: one or two sentences, practical and honest. If there is nothing to do yet, say so.
- Numbers, prices and dates only as the source gives them. Never estimate or round up.
- Product and company names stay in English (Gemini, Flutter, n8n). Before a Latin word, use a maqaf: "ה־AI", "ב־Chrome".
- Read the source page before writing. If the page does not confirm a claim from the feed, leave the claim out.

## Sources

- Prefer the original announcement (the company's own blog or release notes) over a report about it.
- One URL per story, https, the page itself (no tracking parameters such as `utm_`).
- `source.name` is the publication or company: "TechCrunch", "Google", "Apple Developer".
- Images: none for now.

## Tom's updates

Tom may add `news/updates/<date>.json` with `{ "title": "...", "text": "...", "href": "/blog/..." }`.
`publish.mjs` puts it on top of the issue, marked as his. Never write one for him.

## picks.json

`news/desk/<date>/picks.json`:

```json
{
  "stories": [
    {
      "id": "google-connected-apps",
      "topic": "ai",
      "headline": "גוגל פותחת את Gemini והחיפוש לאפליקציות של עסקים",
      "summary": "Two sentences in Hebrew.",
      "forBusiness": "One or two sentences in Hebrew.",
      "source": { "name": "TechCrunch", "url": "https://techcrunch.com/..." },
      "continues": { "date": "2026-10-28", "id": "earlier-story-id" }
    }
  ]
}
```

- `id`: a short English slug, lowercase with dashes, unique in the issue.
- `topic`: `mobile`, `ai`, `automation`, `security` or `business`.
- `continues` is optional. `publish.mjs` checks that the earlier story exists and fills in its headline.

`publish.mjs` stops the issue when a field is missing or not Hebrew, a headline is over 110 characters or a summary over 420,
a source does not answer, a source already appeared, a word from `news/deny.txt` appears, or there are fewer than 3 or more than 6 stories.
