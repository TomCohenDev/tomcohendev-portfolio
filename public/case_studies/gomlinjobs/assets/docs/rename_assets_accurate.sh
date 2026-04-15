#!/bin/bash

# Accurate Asset Renaming Script for Gomlin Jobs Case Study
# Based on actual screenshot content review

cd "$(dirname "$0")"

echo "Renaming Gomlin Jobs case study assets with accurate names..."
echo ""

# Web Platform Screenshots (in chronological order)

# 1. Welcome modal/onboarding screen
mv "Screenshot 2025-12-28 at 15.26.28.png" "web-platform-welcome-modal.png" 2>/dev/null && echo "✓ Renamed: web-platform-welcome-modal.png" || echo "✗ Failed: Screenshot 15.26.28"

# 2. Job posting form - Basic Information
mv "Screenshot 2025-12-28 at 15.26.42.png" "web-platform-job-posting-form.png" 2>/dev/null && echo "✓ Renamed: web-platform-job-posting-form.png" || echo "✗ Failed: Screenshot 15.26.42"

# 3. Landing page - Swipe. Match. Hire.
mv "Screenshot 2025-12-28 at 15.26.55.png" "web-platform-landing-page.png" 2>/dev/null && echo "✓ Renamed: web-platform-landing-page.png" || echo "✗ Failed: Screenshot 15.26.55"

# 4. How it Works page - 3 steps for clients
mv "Screenshot 2025-12-28 at 15.27.07.png" "web-platform-how-it-works.png" 2>/dev/null && echo "✓ Renamed: web-platform-how-it-works.png" || echo "✗ Failed: Screenshot 15.27.07"

# 5. Pricing/Plans page
mv "Screenshot 2025-12-28 at 15.27.20.png" "web-platform-pricing-plans.png" 2>/dev/null && echo "✓ Renamed: web-platform-pricing-plans.png" || echo "✗ Failed: Screenshot 15.27.20"

# 6. Job postings dashboard with listings
mv "Screenshot 2025-12-28 at 15.28.24.png" "web-platform-job-postings-dashboard.png" 2>/dev/null && echo "✓ Renamed: web-platform-job-postings-dashboard.png" || echo "✗ Failed: Screenshot 15.28.24"

# 7. Applicant management with SmartMatch AI
mv "Screenshot 2025-12-28 at 15.29.31.png" "web-platform-applicant-management.png" 2>/dev/null && echo "✓ Renamed: web-platform-applicant-management.png" || echo "✗ Failed: Screenshot 15.29.31"

# 8. AI Analysis/Insights modal
mv "Screenshot 2025-12-28 at 15.29.57.png" "web-platform-smartmatch-ai-analysis.png" 2>/dev/null && echo "✓ Renamed: web-platform-smartmatch-ai-analysis.png" || echo "✗ Failed: Screenshot 15.29.57"

# 9. Chat/messaging interface
mv "Screenshot 2025-12-28 at 15.31.23.png" "web-platform-chat-interface.png" 2>/dev/null && echo "✓ Renamed: web-platform-chat-interface.png" || echo "✗ Failed: Screenshot 15.31.23"

# WebP preview files (keep existing names or rename if needed)
if [ -f "unnamed.webp" ]; then
    mv "unnamed.webp" "app-icon-preview.webp" 2>/dev/null && echo "✓ Renamed: app-icon-preview.webp" || echo "✗ Failed: unnamed.webp"
fi

if [ -f "unnamed (1).webp" ]; then
    mv "unnamed (1).webp" "app-feature-preview.webp" 2>/dev/null && echo "✓ Renamed: app-feature-preview.webp" || echo "✗ Failed: unnamed (1).webp"
fi

echo ""
echo "Renaming complete!"
echo ""
echo "Renamed files:"
ls -lh web-platform-*.png app-*.webp app-*.png app-*.svg 2>/dev/null | awk '{print $9, "(" $5 ")"}'

