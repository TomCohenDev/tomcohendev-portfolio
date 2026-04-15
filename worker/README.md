# PostHog Reverse Proxy Worker

This Cloudflare Worker acts as a reverse proxy for PostHog to bypass ad blockers.

## Setup Instructions

### 1. Install Dependencies

```bash
cd worker
npm install
```

### 2. Deploy the Worker

**Important:** Wrangler will detect the Pages project in the root directory. You have two options:

**Option A: Deploy from worker directory (Recommended)**

```bash
cd worker
npx wrangler deploy
```

**Option B: If Option A doesn't work, temporarily rename the root wrangler.jsonc:**

```bash
# From project root
mv wrangler.jsonc wrangler.jsonc.pages
cd worker
npx wrangler deploy
cd ..
mv wrangler.jsonc.pages wrangler.jsonc
```

This will deploy to `posthog-proxy.YOUR_SUBDOMAIN.workers.dev`

**Note:** If wrangler asks you to login, it will open your browser for authentication.

### 3. Add Custom Domain (Recommended)

To avoid ad blockers recognizing `*.workers.dev` patterns:

1. Go to Cloudflare Dashboard → Workers & Pages → posthog-proxy
2. Go to **Settings** → **Triggers** → **Custom Domains**
3. Click **Add Custom Domain**
4. Add a subdomain like:

   - `e.yourdomain.com` (recommended - short and neutral)
   - `ph.yourdomain.com`
   - `ingest.yourdomain.com`

   **Avoid obvious names like:**

   - `analytics.yourdomain.com`
   - `tracking.yourdomain.com`
   - `telemetry.yourdomain.com`
   - `posthog.yourdomain.com`

5. Cloudflare will automatically create the DNS record

### 4. Update Your App Configuration

After deploying and setting up the custom domain:

1. Update `wrangler.jsonc` in the root directory:

   ```jsonc
   "VITE_PUBLIC_POSTHOG_PROXY": "https://e.tomcohendev.com"
   ```

2. Update `.env.local` for local development:

   ```
   VITE_PUBLIC_POSTHOG_PROXY=https://e.tomcohendev.com
   ```

   ✅ **Already configured!** Your domain `e.tomcohendev.com` is set up.

3. Commit and deploy your main app

### 5. Verify It Works

1. Open your site in a browser
2. Open DevTools → Network tab
3. Filter by your proxy domain (e.g., `e.tomcohendev.com`)
4. Navigate around - you should see requests to your proxy
5. Check PostHog dashboard - events should appear

## How It Works

- **Static assets** (`/static/*`) are cached by Cloudflare for performance
- **API requests** are forwarded to PostHog with proper headers
- **User IP** is preserved via `CF-Connecting-IP` header
- **Cookies** are removed for privacy

## Troubleshooting

- **Events not appearing**: Check that your custom domain is properly configured
- **CORS errors**: The worker handles CORS automatically
- **Still blocked**: Make sure you're using a custom domain, not `*.workers.dev`
