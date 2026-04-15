# Asset Names Mapping - Quick Reference

## Current Name → Suggested Name

### ✅ Already Named (Keep)
- `app_icon.png` → **Keep as is**
- `app_icon.svg` → **Keep as is**

### 📱 Mobile App Screenshots

| Current Name | Suggested Name | Notes |
|-------------|----------------|-------|
| `Screenshot 2025-12-20 at 23.17.47.png` | `mobile-app-onboarding.png` | Small file (136KB) - likely detail view |
| `Screenshot 2025-12-28 at 15.26.28.png` | `mobile-app-swipe-interface.png` | Medium (864KB) - swipe UI |
| `Screenshot 2025-12-28 at 15.26.42.png` | `mobile-app-job-detail.png` | Medium (858KB) - job card detail |
| `Screenshot 2025-12-28 at 15.26.55.png` | `mobile-app-main-feed.png` | Large (5.9MB) - full screen feed |
| `Screenshot 2025-12-28 at 15.27.07.png` | `mobile-app-swipe-full.png` | Largest (6.3MB) - full swipe view |
| `Screenshot 2025-12-28 at 15.27.20.png` | `mobile-app-chat-interface.png` | Large (5.9MB) - Stream Chat UI |
| `Screenshot 2025-12-28 at 15.28.24.png` | `mobile-app-profile-view.png` | Medium (984KB) - profile/settings |
| `Screenshot 2025-12-28 at 15.29.31.png` | `mobile-app-payment-subscription.png` | Medium (1.1MB) - IAP/payment |
| `Screenshot 2025-12-28 at 15.29.57.png` | `mobile-app-match-notification.png` | Small (397KB) - match/notification |
| `Screenshot 2025-12-28 at 15.31.23.png` | `mobile-app-settings.png` | Medium (551KB) - settings menu |

### 🌐 Web Platform Screenshots (If Applicable)
*Note: If any of the above are actually web platform screenshots, use:*
- `web-platform-smartmatch-ai.png`
- `web-platform-job-posting.png`
- `web-platform-candidate-analysis.png`
- `web-platform-dashboard.png`

### 🖼️ Preview/Icon Assets

| Current Name | Suggested Name | Notes |
|-------------|----------------|-------|
| `unnamed.webp` | `app-icon-preview.webp` | Medium (128KB) - icon preview |
| `unnamed (1).webp` | `app-feature-preview.webp` | Small (55KB) - feature highlight |

---

## Quick Rename Commands

Copy and paste these commands one by one (review each screenshot first):

```bash
cd /Users/tomcohen/github/end2end-startup/case_studies/gomlinjobs/assets

# Mobile App
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

## Alternative: Use the Rename Script

Make the script executable and run it:
```bash
chmod +x rename_assets.sh
./rename_assets.sh
```

---

## Naming Convention Used

**Format:** `[platform]-[feature]-[optional-descriptor].[ext]`

- **Platform:** `mobile-app-`, `web-platform-`, `n8n-workflow-`
- **Feature:** `swipe-interface`, `chat-interface`, `profile-view`, `payment-subscription`, etc.
- **Descriptor:** `full`, `detail`, `overview` (when needed)

---

**⚠️ Remember:** Review each screenshot first to confirm the suggested name matches the content!

