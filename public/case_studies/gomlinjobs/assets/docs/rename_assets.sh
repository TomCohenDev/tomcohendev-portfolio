#!/bin/bash

# Asset Renaming Script for Gomlin Jobs Case Study
# Run this script from the assets directory
# Review the RENAMING_PLAN.md first to confirm names

cd "$(dirname "$0")"

echo "Renaming Gomlin Jobs case study assets..."
echo ""

# Mobile App Screenshots (based on chronological order and file sizes)
# Adjust these names after reviewing the actual screenshots

# Smallest file - likely detail/notification view
mv "Screenshot 2025-12-20 at 23.17.47.png" "mobile-app-onboarding.png" 2>/dev/null && echo "✓ Renamed: mobile-app-onboarding.png" || echo "✗ Failed: Screenshot 2025-12-20"

# Medium-sized screenshots - likely interface views
mv "Screenshot 2025-12-28 at 15.26.28.png" "mobile-app-swipe-interface.png" 2>/dev/null && echo "✓ Renamed: mobile-app-swipe-interface.png" || echo "✗ Failed: Screenshot 15.26.28"
mv "Screenshot 2025-12-28 at 15.26.42.png" "mobile-app-job-detail.png" 2>/dev/null && echo "✓ Renamed: mobile-app-job-detail.png" || echo "✗ Failed: Screenshot 15.26.42"

# Large screenshots - likely full screen views
mv "Screenshot 2025-12-28 at 15.26.55.png" "mobile-app-main-feed.png" 2>/dev/null && echo "✓ Renamed: mobile-app-main-feed.png" || echo "✗ Failed: Screenshot 15.26.55"
mv "Screenshot 2025-12-28 at 15.27.07.png" "mobile-app-swipe-full.png" 2>/dev/null && echo "✓ Renamed: mobile-app-swipe-full.png" || echo "✗ Failed: Screenshot 15.27.07"
mv "Screenshot 2025-12-28 at 15.27.20.png" "mobile-app-chat-interface.png" 2>/dev/null && echo "✓ Renamed: mobile-app-chat-interface.png" || echo "✗ Failed: Screenshot 15.27.20"

# Medium screenshots - likely profile/settings views
mv "Screenshot 2025-12-28 at 15.28.24.png" "mobile-app-profile-view.png" 2>/dev/null && echo "✓ Renamed: mobile-app-profile-view.png" || echo "✗ Failed: Screenshot 15.28.24"
mv "Screenshot 2025-12-28 at 15.29.31.png" "mobile-app-payment-subscription.png" 2>/dev/null && echo "✓ Renamed: mobile-app-payment-subscription.png" || echo "✗ Failed: Screenshot 15.29.31"
mv "Screenshot 2025-12-28 at 15.29.57.png" "mobile-app-match-notification.png" 2>/dev/null && echo "✓ Renamed: mobile-app-match-notification.png" || echo "✗ Failed: Screenshot 15.29.57"
mv "Screenshot 2025-12-28 at 15.31.23.png" "mobile-app-settings.png" 2>/dev/null && echo "✓ Renamed: mobile-app-settings.png" || echo "✗ Failed: Screenshot 15.31.23"

# WebP preview files
mv "unnamed.webp" "app-icon-preview.webp" 2>/dev/null && echo "✓ Renamed: app-icon-preview.webp" || echo "✗ Failed: unnamed.webp"
mv "unnamed (1).webp" "app-feature-preview.webp" 2>/dev/null && echo "✓ Renamed: app-feature-preview.webp" || echo "✗ Failed: unnamed (1).webp"

echo ""
echo "Renaming complete!"
echo ""
echo "⚠️  IMPORTANT: Please review each renamed file to confirm the names are accurate."
echo "   Update the names in this script if needed, then re-run to fix any mistakes."
echo ""
echo "Current files:"
ls -lh *.png *.webp *.svg 2>/dev/null | awk '{print $9, "(" $5 ")"}'

