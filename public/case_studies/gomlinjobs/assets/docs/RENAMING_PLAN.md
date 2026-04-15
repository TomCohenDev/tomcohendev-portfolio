# Asset Renaming Plan for Gomlin Jobs Case Study

## Current Files → Suggested Names

### App Icons (Already Named - Keep As Is)
- ✅ `app_icon.png` - **Keep** (already properly named)
- ✅ `app_icon.svg` - **Keep** (already properly named)

### Screenshots (Chronological Order - Dec 20 & Dec 28, 2025)

#### Mobile App Screenshots (Likely)
Based on file sizes and case study context, these are likely mobile app screenshots:

1. `Screenshot 2025-12-20 at 23.17.47.png` (136KB - smaller, might be detail view)
   → **`mobile-app-onboarding.png`** or **`mobile-app-profile-setup.png`**

2. `Screenshot 2025-12-28 at 15.26.28.png` (864KB)
   → **`mobile-app-swipe-interface.png`** or **`mobile-app-job-card.png`**

3. `Screenshot 2025-12-28 at 15.26.42.png` (858KB)
   → **`mobile-app-job-detail.png`** or **`mobile-app-match-screen.png`**

4. `Screenshot 2025-12-28 at 15.26.55.png` (5.9MB - large, full screen)
   → **`mobile-app-full-screen.png`** or **`mobile-app-main-feed.png`**

5. `Screenshot 2025-12-28 at 15.27.07.png` (6.3MB - largest, full screen)
   → **`mobile-app-swipe-interface-full.png`** or **`mobile-app-job-swipe.png`**

6. `Screenshot 2025-12-28 at 15.27.20.png` (5.9MB - large, full screen)
   → **`mobile-app-chat-interface.png`** or **`mobile-app-messaging.png`**

7. `Screenshot 2025-12-28 at 15.28.24.png` (984KB)
   → **`mobile-app-settings.png`** or **`mobile-app-profile-view.png`**

8. `Screenshot 2025-12-28 at 15.29.31.png` (1.1MB)
   → **`mobile-app-payment-subscription.png`** or **`mobile-app-iap-screen.png`**

9. `Screenshot 2025-12-28 at 15.29.57.png` (397KB - smaller)
   → **`mobile-app-match-notification.png`** or **`mobile-app-detail-view.png`**

10. `Screenshot 2025-12-28 at 15.31.23.png` (551KB)
    → **`mobile-app-language-toggle.png`** or **`mobile-app-settings-menu.png`**

#### Web Platform Screenshots (Likely)
Based on case study mentioning web platform features:

- Could be any of the above, but likely the medium-sized ones:
  → **`web-platform-smartmatch-ai.png`**
  → **`web-platform-job-posting.png`**
  → **`web-platform-candidate-analysis.png`**
  → **`web-platform-dashboard.png`**

#### Unnamed WebP Files
1. `unnamed.webp` (128KB)
   → **`mobile-app-icon-preview.webp`** or **`app-store-preview.webp`**

2. `unnamed (1).webp` (55KB - smaller)
   → **`mobile-app-feature-highlight.webp`** or **`app-icon-variant.webp`**

---

## Recommended Naming Convention

### Format: `[platform]-[feature]-[view].png`

**Platforms:**
- `mobile-app-` for Flutter mobile app screenshots
- `web-platform-` for React/Next.js web platform screenshots
- `n8n-workflow-` for automation workflow screenshots
- `architecture-` for system diagrams

**Features:**
- `swipe-interface` - Tinder-style job swiping
- `match-screen` - When both parties match
- `chat-interface` - Stream Chat messaging
- `profile-setup` - User profile creation
- `job-detail` - Expanded job information
- `smartmatch-ai` - AI candidate analysis
- `job-posting` - Employer job creation
- `dashboard` - Main management view
- `payment-subscription` - IAP/Stripe payment flow
- `onboarding` - First-time user experience

**Views:**
- `full-screen` - Complete app view
- `detail` - Close-up of specific feature
- `overview` - High-level view

---

## Suggested Final Names (To Be Confirmed After Review)

### Mobile App Assets
1. `mobile-app-onboarding.png` (from Screenshot 2025-12-20)
2. `mobile-app-swipe-interface.png` (from Screenshot 2025-12-28 15.26.28)
3. `mobile-app-job-detail.png` (from Screenshot 2025-12-28 15.26.42)
4. `mobile-app-main-feed.png` (from Screenshot 2025-12-28 15.26.55)
5. `mobile-app-swipe-full.png` (from Screenshot 2025-12-28 15.27.07)
6. `mobile-app-chat-interface.png` (from Screenshot 2025-12-28 15.27.20)
7. `mobile-app-profile-view.png` (from Screenshot 2025-12-28 15.28.24)
8. `mobile-app-payment-subscription.png` (from Screenshot 2025-12-28 15.29.31)
9. `mobile-app-match-notification.png` (from Screenshot 2025-12-28 15.29.57)
10. `mobile-app-settings.png` (from Screenshot 2025-12-28 15.31.23)

### Web Platform Assets (If applicable)
- `web-platform-smartmatch-ai.png`
- `web-platform-job-posting.png`
- `web-platform-dashboard.png`

### Other Assets
- `app-icon-preview.webp` (from unnamed.webp)
- `app-feature-preview.webp` (from unnamed (1).webp)

---

## Next Steps

1. **Review each screenshot** to confirm what it shows
2. **Update names** based on actual content
3. **Organize into subfolders**:
   ```
   assets/
   ├── mobile-app/
   ├── web-platform/
   ├── icons/
   └── previews/
   ```

## Renaming Script (Bash)

Once you've confirmed the names, you can use this script template:

```bash
cd /Users/tomcohen/github/Tom-startup/case_studies/gomlinjobs/assets

# Mobile App Screenshots
mv "Screenshot 2025-12-20 at 23.17.47.png" "mobile-app-onboarding.png"
mv "Screenshot 2025-12-28 at 15.26.28.png" "mobile-app-swipe-interface.png"
mv "Screenshot 2025-12-28 at 15.26.42.png" "mobile-app-job-detail.png"
mv "Screenshot 2025-12-28 at 15.26.55.png" "mobile-app-main-feed.png"
mv "Screenshot 2025-12-28 at 15.27.07.png" "mobile-app-swipe-full.png"
mv "Screenshot 2025-12-28 at 15.27.20.png" "mobile-app-chat-interface.png"
mv "Screenshot 2025-12-28 at 15.28.24.png" "mobile-app-profile-view.png"
mv "Screenshot 2025-12-28 at 15.29.31.png" "mobile-app-payment-subscription.png"
mv "Screenshot 2025-12-28 at 15.29.57.png" "mobile-app-match-notification.png"
mv "Screenshot 2025-12-28 at 15.31.23.png" "mobile-app-settings.png"

# WebP Files
mv "unnamed.webp" "app-icon-preview.webp"
mv "unnamed (1).webp" "app-feature-preview.webp"
```

---

**Note:** Please review each screenshot first to confirm the suggested names match the actual content before renaming.

