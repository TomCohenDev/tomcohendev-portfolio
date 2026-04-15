#!/bin/bash

# Mobile App Asset Renaming Script for Gomlin Jobs Case Study
# Based on screenshot content review

cd "$(dirname "$0")"

echo "Renaming mobile app screenshots..."
echo ""

# Job Posting Screens
mv "Screenshot_20251228_152358.jpg" "mobile-app-job-posting-detail.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-job-posting-detail.jpg" || echo "✗ Failed: Screenshot_20251228_152358.jpg"
mv "Screenshot_20251228_152407.jpg" "mobile-app-job-posting-card.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-job-posting-card.jpg" || echo "✗ Failed: Screenshot_20251228_152407.jpg"
mv "Screenshot_20251228_152420.jpg" "mobile-app-job-posting-full.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-job-posting-full.jpg" || echo "✗ Failed: Screenshot_20251228_152420.jpg"
mv "Screenshot_20251228_152504.jpg" "mobile-app-job-posting-overlay.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-job-posting-overlay.jpg" || echo "✗ Failed: Screenshot_20251228_152504.jpg"

# Profile & Settings Screens
mv "Screenshot_20251228_152427.jpg" "mobile-app-profile-view.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-profile-view.jpg" || echo "✗ Failed: Screenshot_20251228_152427.jpg"
mv "Screenshot_20251228_152433.jpg" "mobile-app-profile-creation.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-profile-creation.jpg" || echo "✗ Failed: Screenshot_20251228_152433.jpg"
mv "Screenshot_20251228_152439.jpg" "mobile-app-expertise-selection.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-expertise-selection.jpg" || echo "✗ Failed: Screenshot_20251228_152439.jpg"
mv "Screenshot_20251228_152444.jpg" "mobile-app-skills-showcase.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-skills-showcase.jpg" || echo "✗ Failed: Screenshot_20251228_152444.jpg"
mv "Screenshot_20251228_152457.jpg" "mobile-app-profile-boost.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-profile-boost.jpg" || echo "✗ Failed: Screenshot_20251228_152457.jpg"

# Settings & Filters
mv "Screenshot_20251228_152511.jpg" "mobile-app-language-selection.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-language-selection.jpg" || echo "✗ Failed: Screenshot_20251228_152511.jpg"
mv "Screenshot_20251228_152543.jpg" "mobile-app-job-filters.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-job-filters.jpg" || echo "✗ Failed: Screenshot_20251228_152543.jpg"

# Messaging
mv "Screenshot_20251228_153027.jpg" "mobile-app-messages-list.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-messages-list.jpg" || echo "✗ Failed: Screenshot_20251228_153027.jpg"
mv "Screenshot_20251228_153114.jpg" "mobile-app-chat-conversation.jpg" 2>/dev/null && echo "✓ Renamed: mobile-app-chat-conversation.jpg" || echo "✗ Failed: Screenshot_20251228_153114.jpg"

echo ""
echo "Renaming complete!"
echo ""
echo "Renamed files:"
ls -lh mobile-app-*.jpg 2>/dev/null | awk '{print $9, "(" $5 ")"}'

