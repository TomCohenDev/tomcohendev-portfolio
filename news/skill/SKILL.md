# Daily news: editorial rules

"חדשות הבוקר" at tomcohen.dev/news: every morning, 4 to 6 stories from the last day that matter to business owners in Israel,
in Hebrew, each with what it means for a business and a link to its source, and up to 12 flashes (מבזקים): one-line facts. Tom Cohen builds apps and automations for businesses;
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
6. **Research** (`research`): studies and data on how AI and automation change work in businesses: productivity, costs, what works and
   what does not. Only published research or data (a paper, a survey, an experiment), not opinion pieces.

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
- Image: optional. Use the image the source page itself shares (its `og:image`), only when it shows the story: a product screen,
  a chart, a photo from the announcement. Skip logos, generic stock photos and pages without one. `alt` is one short Hebrew sentence
  on what the image shows. The site credits the image to `source.name`.

## Flashes

Flashes are the facts that are worth a line but not a story: a release, a price change, a number from a study, a fix to install.
They run in a carousel on the home page and in a list on /news.

- 6 to 12 a day when the feeds have them; fewer is fine. Never pad.
- Same choice rules as the stories (the Skip list applies), but the bar is lower: useful to know, even if there is nothing to do yet.
- **text**: one sentence in Hebrew, up to 160 characters, the fact itself with its number or name. No "מה זה אומר לעסק" part.
- Each flash has its own source, and that source is not a story in the same issue or in an earlier one.
- Read the source page before writing, as with stories. Same rules for names, numbers and maqaf.
- Image: optional, same rules as for stories.

## Releases

New tools and apps that launched in the last day, from the feeds with topic `releases` (Product Hunt, BetaList, Show HN, Launch HN).
They run in a row under the stories on the home page and in a list on /news.

- 6 to 8 a day when the feeds have them; fewer is fine.
- Choose what a developer or a small business could use: AI tools, developer tools, automation, apps for work. Skip games,
  crypto and tokens, dating, adult, and launches with nothing but a waitlist.
- **name**: the product's own name, as it writes it. **text**: one Hebrew sentence on what it does, up to 140 characters. Describe,
  do not praise: no "מהפכני", no "הכי טוב".
- `source` is the launch page (the Product Hunt or BetaList page, or the Hacker News thread). Open it before writing.
- Image: optional, the launch page's `og:image` when it shows the product (a screen or the app icon), with a Hebrew `alt`.
- Icon: always look for one; the home page row shows releases with their icon, name and text on one line. `icon` is a plain
  https URL to the product's square logo: on Product Hunt, the logo next to the product name on its page; on BetaList, the
  startup's logo in the list on betalist.com; otherwise the `apple-touch-icon` of the product's own site (check it is the same
  product). Look at it: a wide text logo does not work at 36px. No icon is fine; the row then shows the text only.

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
      "image": { "url": "https://techcrunch.com/wp-content/uploads/...", "alt": "One sentence in Hebrew." },
      "continues": { "date": "2026-10-28", "id": "earlier-story-id" }
    }
  ],
  "flashes": [
    {
      "id": "n8n-2-5",
      "topic": "automation",
      "text": "One sentence in Hebrew, up to 160 characters.",
      "source": { "name": "n8n releases", "url": "https://github.com/n8n-io/n8n/releases/..." },
      "image": { "url": "https://...", "alt": "One sentence in Hebrew." }
    }
  ],
  "releases": [
    {
      "id": "some-tool",
      "name": "Some Tool",
      "text": "What it does, in one Hebrew sentence, up to 140 characters.",
      "source": { "name": "Product Hunt", "url": "https://www.producthunt.com/products/..." },
      "image": { "url": "https://...", "alt": "One sentence in Hebrew." },
      "icon": "https://some-tool.com/apple-touch-icon.png"
    }
  ]
}
```

- `id`: a short English slug, lowercase with dashes, unique in the issue (stories, flashes and releases together).
- `topic`: `mobile`, `ai`, `automation`, `security`, `business` or `research`.
- `image` is optional; `publish.mjs` checks that the URL answers with an image.
- `continues` is optional. `publish.mjs` checks that the earlier story exists and fills in its headline.

`publish.mjs` stops the issue when a field is missing or not Hebrew, a headline is over 110 characters or a summary over 420,
a source does not answer, a source already appeared, a word from `news/deny.txt` appears, or there are fewer than 3 or more than 6 stories, more than 12 flashes or more than 12 releases.
