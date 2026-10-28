# Tom Cohen Website

Damn good at building products. We help founders, businesses, and individuals launch faster, scale better, and automate more — from full-scale platforms to small essential apps.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Environment Configuration

### Contact Form Setup

The contact form supports both development and production webhook endpoints for testing and live submissions.

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure the environment:**
   
   Edit `.env.local` and set:
   ```
   VITE_ENVIRONMENT=development  # For testing
   # or
   VITE_ENVIRONMENT=production   # For live submissions
   ```

### Webhook Endpoints

- **Development (Testing):** `https://n8n.yarden-zamir.com/webhook-test/client-contact-form`
- **Production (Live):** `https://n8n.yarden-zamir.com/webhook/client-contact-form`

The form automatically uses the correct endpoint based on the `VITE_ENVIRONMENT` variable.

### Testing the Contact Form

1. Set `VITE_ENVIRONMENT=development` in `.env.local`
2. Restart the dev server
3. Submit the form - it will use the test webhook
4. Check your n8n instance to verify the test webhook received the data

### Going Live

1. Set `VITE_ENVIRONMENT=production` in `.env.local`
2. Build and deploy your application
3. Form submissions will go to the production webhook

## Project Structure

- `/src/pages` - Astro routes: the Hebrew pages, and `index.astro`, which mounts the English app
- `/src/views` - Page components (React)
- `/src/layouts` - `HebrewLayout.astro`: the HTML head of the Hebrew pages
- `/src/components` - Reusable UI components
- `/src/components/ui` - shadcn/ui components
- `/public` - Static assets

## Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Astro (static output; React components as islands)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Routing:** React Router
- **Backend:** n8n + Resend (for email)

## License

© 2025 Tom Cohen. All rights reserved.




## Hebrew pages (`/automation`, `/mobile`)

The plan for the Hebrew site is in [`docs/site-plan.md`](docs/site-plan.md).

- Routes: `src/pages/automation.astro`, `src/pages/mobile.astro` and `src/pages/automation/*.astro`. Each renders its React page (`src/views/`) to HTML at build time and hydrates it in the browser.
- Copy: `src/components/automation/` and `src/components/mobile/` (`content.ts` holds the facts and the open `TODO(tom)` items). `sites.ts` holds what differs between the pages.
- Head: `src/layouts/HebrewLayout.astro` (`lang="he" dir="rtl"`, Open Graph, the Google tag). JSON-LD comes from `src/lib/structuredData.ts`, with the FAQ taken from the same arrays the pages show.
- The English site is still the React Router app (`src/App.tsx`, mounted by `src/pages/index.astro`). Workers Assets serves `dist/index.html` for every path without a file of its own.
- Lead form → `POST /api/automation-lead`, handled by the Worker in `edge/index.ts`:
  - saves the inquiry in D1 (`tomcohendev-leads`, table `automation_leads`, schema in `migrations/`),
  - emails it to tom.cohen99@gmail.com through Cloudflare Email Routing (`send_email` binding, sender `automation@tomcohen.dev`),
  - rate limit 5 requests/minute per IP, origin check, honeypot field. IP addresses are not stored.
- Read leads: `npx wrangler d1 execute tomcohendev-leads --remote --command "SELECT * FROM automation_leads ORDER BY created_at DESC"`
- After changing bindings in `wrangler.jsonc`, run `npm run cf-typegen`.

## Development and deploys

- `npm run dev` (Astro, port 8080) and `npm run dev:api` (the Worker, port 8787) for the lead form.
- `npm run build`, then `node scripts/check-site.mjs`: metadata of the Hebrew pages and internal links.
- Pull requests (`.github/workflows/ci.yml`): lint, type check, build, site check, and a preview version of the Worker with its link in a PR comment. The preview uses the production leads database and email.
- `main` (`.github/workflows/deploy.yml`): build, deploy, then `check-site.mjs --live`. Also runs daily at 04:00 UTC and by hand; to roll back, run it by hand on an earlier commit.
- The workflows need the repository secret `CLOUDFLARE_API_TOKEN` (a Cloudflare API token with the "Edit Cloudflare Workers" template). `npm run deploy` from a computer still works.
