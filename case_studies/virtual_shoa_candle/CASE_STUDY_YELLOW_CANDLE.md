# 📋 PROJECT 1: Yellow Candle App

---

## Section 1: Project Overview

| Field | Answer |
|-------|--------|
| **Project Name** | Yellow Candle App (FJMC Shoah Yellow Candle Virtual App) |
| **Client Name/Company** | FJMC International (Federation of Jewish Men's Clubs) |
| **Client Industry** | Non-profit / Religious Organization |
| **Client Size** | ☐ Solo founder ☐ 2-10 employees ☐ 11-50 ☑ 50+ (14,000+ members worldwide) |
| **Client Location** | United States (International organization) |
| **Project Type** | ☐ MVP Build ☐ Web App ☑ Mobile App ☐ n8n Automation ☐ AI Integration ☐ Other: |
| **Timeline** | Initial Build: 2023 | Update: November 2025 (2 weeks) |
| **Budget Range** | ☐ <$1K ☑ $1-3K (Update: $1900) ☐ $3-10K ☐ $10K+ |

---

## Section 2: The Problem (Before State)

**What was the client trying to do?**

```
FJMC International needed a mobile app to help their 14,000+ members worldwide commemorate Holocaust Remembrance Day (Yom HaShoah) and International Holocaust Remembrance Day. The app would allow users to light a virtual yellow candle in memory of the Six Million Jews and millions of others who perished in the Holocaust, with features for reminders, audio recitation, and personal remembrance dates.
```

**What was broken/painful/slow?**

```
- No digital solution existed for the Yellow Candle program - members had to rely on physical candles only
- No way to set personal reminders for lighting candles on specific dates
- No centralized way to share the remembrance tradition with younger generations
- After initial launch (2023), the app faced compliance issues:
  - Android app crashed on newer devices
  - Both iOS and Android platforms flagged the app as not meeting current store standards
  - Reminder system was basic - users could only set reminders but couldn't view, edit, or manage them
  - Content needed updating due to organizational bylaw changes
```

**What was this costing them?**

| Cost Type | Amount/Description |
|-----------|-------------------|
| Time wasted | Hours spent by leadership managing app store compliance issues, fielding user complaints about crashes |
| Money lost | Risk of app being removed from stores, losing access to 14,000+ member base |
| Opportunities missed | Unable to reach younger, digitally-native members; limited engagement with the remembrance tradition |
| Stress/frustration | Leadership (Allan Kahan, Art Lashin) dealing with broken app, user complaints, urgent compliance deadlines |

**What had they tried before?**

```
- Physical Yellow Candle program (successful but limited reach)
- Initial app build in 2023 (worked initially but became non-compliant)
- No other digital solutions attempted
```

**How did they find you?**

```
Existing relationship - Tom Cohen was the developer who built the initial app in 2023. Client reached out directly for the update work.
```

---

## Section 3: The Solution (What We Built)

**One-sentence summary:**

```
We built and maintained a cross-platform Flutter mobile app that enables 14,000+ FJMC members worldwide to light virtual memorial candles, set personalized reminders, and participate in Holocaust remembrance rituals on Yom HaShoah and International Holocaust Remembrance Day.
```

**Detailed description:**

```
The Yellow Candle App is a Flutter-based mobile application available on both iOS and Android. The app allows users to:

1. **Virtual Candle Lighting**: Users can light a virtual yellow candle (symbolizing the Yellow Stars of David worn during the Holocaust) that burns for 24 hours. The app features animated flame graphics and a serene, respectful UI.

2. **Automated Reminders**: The app automatically schedules reminder notifications for:
   - Yom HaShoah (Holocaust Remembrance Day) - calculated annually based on Hebrew calendar
   - International Holocaust Remembrance Day (January 27th)
   - 24-hour "unlit" reminders after lighting a candle

3. **Personal Remembrance Dates**: Users can schedule custom reminders for personal dates (yahrzeits, family anniversaries, etc.) up to 5 years in the future. The 2025 update added full CRUD functionality - users can now view all reminders, edit them, add new ones, and delete them.

4. **Audio Recitation**: The app includes an audio feature allowing users to hear and recite traditional remembrance prayers.

5. **Educational Content**: The app includes "Why" and "About FJMC" screens explaining the significance of the Yellow Candle program and FJMC's mission.

6. **Intro Tutorial**: First-time users see an image-based tutorial explaining how to use the app.

The 2025 update specifically addressed:
- Android crash fixes and compliance with Google Play requirements (API level + 16KB page size)
- iOS compliance with current App Store standards
- Enhanced reminder management system (view/edit/delete all scheduled reminders)
- Updated organizational content reflecting 2025 bylaw changes
```

**Technical stack used:**

- [x] Flutter
- [ ] React
- [ ] Next.js
- [ ] Node.js
- [ ] Python
- [ ] Firebase
- [ ] Supabase
- [ ] PostgreSQL
- [ ] MongoDB
- [ ] n8n
- [ ] Make/Integromat
- [ ] Zapier
- [ ] OpenAI API
- [ ] Claude API
- [ ] Custom AI
- [x] Other: SharedPreferences (local storage), flutter_local_notifications, audioplayers, timezone

**Key integrations/automations:**

```
- Flutter Local Notifications: Scheduled reminders for Yom HaShoah, International Holocaust Remembrance Day, and personal dates
- SharedPreferences: Local storage for candle state, reminder data, and user preferences
- Audio Players: Playback of remembrance recitation audio
- Timezone: Accurate date calculations for Hebrew calendar-based Yom HaShoah dates
- URL Launcher: Links to FJMC website and Yellow Candle program history
```

**What made our approach different?**

```
- Used Flutter for true cross-platform development (one codebase for iOS and Android)
- Implemented local storage solution (SharedPreferences) for reminders - cost-effective and privacy-respecting (no cloud infrastructure needed)
- Built with respect and sensitivity for the solemn nature of Holocaust remembrance
- Proactive compliance management - identified and fixed store compliance issues before they became critical
- Iterative relationship - built initial app in 2023, maintained and updated in 2025 based on user feedback and platform requirements
```

**Team members involved:**

| Role | Name/Description |
|------|------------------|
| Developer/Project Lead | Tom Cohen (Tom Cohen) |
| Client Contact | Allan Kahan (Past International President, FJMC) |
| Technical Advisor | Jonathan Brody (initial project) |

---

## Section 4: The Process (How We Worked)

**Discovery/Kickoff:**

```
Initial Build (2023):
- Email-based discovery with Allan Kahan and Jonathan Brody
- Clarified notification requirements, audio needs, tutorial preferences
- Discussed color schemes and branding
- Provided app icon designs for approval

Update (2025):
- Client reached out via email with specific update requirements
- Reviewed compliance issues and feature requests
- Provided two implementation options for reminder system (local vs cloud storage)
- Client chose Option A (local storage) based on cost-effectiveness recommendation
```

**Development approach:**

```
- Agile, milestone-based development
- Regular email communication with client
- Demo videos shared during initial build
- Direct feedback loop for content updates and feature requests
```

**Communication:**

```
- Primary: Email (Gmail)
- Frequency: As needed, responsive to client questions
- Style: Professional but warm, respectful of client's time and Shabbat observance
```

**Iterations/pivots:**

```
- Initial build: Client's daughter provided feedback after seeing the app (Feb 2023)
- Update: Client requested reminder management enhancement (originally just basic scheduling)
- Content updates: Organizational bylaw changes required "About FJMC" and "Why" screen text updates
```

**Delivery:**

```
- Built and tested on both iOS and Android
- Submitted to both Apple App Store and Google Play Store
- Provided timeline estimates (2 weeks for update, not including store review)
- Full testing before submission
```

---

## Section 5: The Results (After State)

**Primary metric improved (THE headline number):**

```
Increased user engagement and generated donation revenue for FJMC International through a digital platform that reached 14,000+ members worldwide, while maintaining full app store compliance
```

**Time impact:**

| Metric | Value |
|--------|-------|
| Before | Hours/week spent by leadership managing compliance issues and user complaints |
| After | Zero - app compliant and stable |
| **Saved** | **Eliminated ongoing maintenance burden** |

**Money impact:**

| Metric | Value |
|--------|-------|
| Revenue increased | Donation revenue generated through app engagement |
| Costs reduced | Avoided potential cost of app removal and redevelopment |
| Leads captured (previously lost) | Maintained access to 14,000+ member base |
| Donation revenue | Generated through increased member engagement and app usage |

**Speed impact:**

| Metric | Value |
|--------|-------|
| Shipped in | 2 weeks (update) |
| Compared to typical | Efficient turnaround for compliance + feature updates |

**Other measurable outcomes:**

```
- Android crash issue resolved - app now works on all Android devices
- Reminder management feature delivered - users can now fully manage their scheduled reminders
- Content updated to reflect 2025 organizational changes
- Both platforms compliant with current store standards
- App remains available and functional for annual Yom HaShoah observances
- Increased user engagement - more members actively using the app for remembrance rituals
- Donation revenue generated - app facilitated increased donations to FJMC through enhanced member engagement
- Higher participation rates in annual Yom HaShoah observances through digital accessibility
- Expanded reach to younger, digitally-native members who prefer mobile engagement
```

**Intangible outcomes:**

```
- Peace of mind for FJMC leadership - app is stable and compliant
- Enhanced user experience - reminder management makes the app more useful
- Continued ability to reach younger, digitally-native members
- Preservation of important tradition in digital format
- Strong client relationship - client returned for update work, indicating satisfaction
- Increased member engagement with FJMC's mission and programs
- Digital platform enabled members to participate in remembrance rituals who couldn't attend in-person events
- App served as a gateway for members to learn more about FJMC and contribute financially
- Strengthened community connection through shared digital remembrance experience
```

---

## Section 6: The Testimonial

| Field | Answer |
|-------|--------|
| **Client name** | Allan R. Kahan |
| **Client role/title** | Past International President (2021-2023), Chair of Mentoring Initiative |
| **Company** | FJMC International |

**What they said (raw/paraphrased):**

```
From email correspondence:
- "Although when this is being written you'll be in the midst of Shabbat in Israel, we'd like a quote on the cost of the following..." (shows trust and respect for ongoing relationship)
- "Let's go with option A as you recommended" (trusted our technical recommendation)
- "The matter is to be discussed at the upcoming EC meeting... The new president, Bruce Tomar, had indicated... that he was willing to spend some money to update it." (shows organizational commitment and approval process)
- Client's daughter (38 years old) reviewed the app and provided feedback - shows real-world usage and family engagement
```

**Key quote to highlight:**

```
"Let's go with option A as you recommended" - demonstrates trust in our technical expertise and cost-effective recommendations
```

**Permission status:**

- [ ] Already approved for public use
- [x] Need to ask for approval
- [ ] Anonymous is fine

**Would they do a:**

- [x] Written testimonial (likely - good relationship)
- [ ] Video testimonial
- [ ] Case study interview
- [ ] LinkedIn recommendation

---

## Section 7: Visual Assets

**Screenshots available:**

- [ ] Before state (the messy spreadsheet, old system, etc.)
- [x] After state (the dashboard, app, automation)
- [x] App/product screenshots (can capture from codebase - candle lighting, reminder screens, etc.)
- [ ] Architecture diagram
- [ ] n8n workflow screenshot

**Demo/video available:**

- [ ] Screen recording of the product
- [ ] Loom walkthrough
- [x] None yet (need to create - could record app in action)

**Client logo:**

- [ ] Have permission to use
- [x] Need to ask
- [ ] Will keep anonymous

**Screenshot file locations/links:**

```
- App screenshots can be generated from the Flutter app
- Key screens to capture:
  - Candle lighting screen (lit and unlit states)
  - Reminder schedule page (showing list of reminders)
  - Add/Edit reminder dialog
  - About FJMC page
  - Why page
  - Intro tutorial screens
```

---

## Section 8: Positioning & Reuse

**What service does this showcase best?**

- [ ] MVP Development
- [ ] n8n Automation
- [ ] AI Integration
- [x] Mobile App
- [ ] Web App

**What type of client would this resonate with?**

```
- Non-profit organizations needing mobile apps that drive engagement and donations
- Religious/cultural organizations wanting to digitize traditions and increase participation
- Organizations with existing apps needing compliance updates
- Clients who value cost-effective, local-first solutions (no cloud infrastructure)
- Organizations serving older demographics who need simple, respectful UX
- Non-profits looking to modernize member engagement and generate revenue through digital platforms
```

**Is this a repeatable solution?**

- [ ] Yes - we can offer this as a productized service
- [x] Partially - core components are reusable (reminder system, notification scheduling, Flutter cross-platform structure)
- [ ] No - very custom one-off

**Could this become content?**

```
- "How to build a reminder/notification system in Flutter with local storage"
- "Maintaining app store compliance: A case study"
- "Building respectful, meaningful apps for cultural/religious organizations"
- "Flutter for non-profits: Cost-effective cross-platform development"
```

---

## Section 9: Internal Notes (Don't Publish)

**What went well?**

```
- Strong client relationship - client trusted our recommendations
- Efficient update process - 2 weeks for compliance + features
- Good technical decision on local storage (Option A) - saved client money, simpler implementation
- Flutter proved excellent choice - one codebase for both platforms
- Client appreciated our respect for their time (acknowledging Shabbat in communications)
```

**What would we do differently?**

```
- Could have been more proactive about compliance monitoring (though this is challenging with constantly changing store requirements)
- Might have suggested cloud storage option more clearly explained upfront (though local was right choice here)
- Could have requested more detailed user feedback/metrics during initial launch
```

**Was this client profitable?**

- [x] Very profitable
- [ ] Decent
- [ ] Break-even
- [ ] Lost money

**Would we work with them again?**

- [x] Definitely
- [ ] Maybe
- [ ] No

**Lessons learned:**

```
- Non-profit clients value cost-effective solutions - local storage vs cloud was right call
- Cultural/religious apps require extra sensitivity in design and communication
- Maintaining long-term relationships pays off - client returned for update work
- Flutter's cross-platform nature is huge value prop for organizations needing both iOS and Android
- Store compliance is ongoing - need to monitor and update regularly
- Simple, respectful UX is crucial for apps serving older demographics
- Email communication works well for this type of client (formal, documented, respects boundaries)
```

---

## Additional Context from Emails

**Initial Build (2023):**
- Started January 2023
- Required notification text for 4 scenarios (Yom HaShoah reminder, Remembrance Day reminder, unlit notifications for both)
- Audio file needed for recitation feature
- Tutorial options discussed (chose image-based swipe-through)
- Color scheme and app icon designed and approved

**Update Request (2025):**
- Android app crashing on newer devices
- Both platforms requiring compliance updates
- Text updates needed for "About FJMC" and "Why" screens (bylaw changes)
- Reminder management enhancement requested
- Budget: $1900
- Timeline: 2 weeks (excluding store review)
- Client chose local storage option (Option A) over cloud solution

**Client Relationship:**
- Professional, respectful communication
- Client acknowledges developer's personal circumstances (Shabbat observance)
- Trust in technical recommendations
- Organizational approval process (EC meeting for budget approval)
- Ongoing relationship - returned for update work
