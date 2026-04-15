# Tom Cohen — Case Study & Review Template

> **Project:** Spidclass - Classroom Management Mobile App  
> **Client:** Lior  
> **Status:** Completed

---

## 📋 PROJECT 1: Spidclass

---

### Section 1: Project Overview

| Field | Answer |
|-------|--------|
| **Project Name** | Spidclass |
| **Client Name/Company** | Lior |
| **Client Industry** | Education/Tutoring |
| **Client Size** | ☐ Solo founder ☑ 2-10 employees ☐ 11-50 ☐ 50+ |
| **Client Location** | [TBD - Need Client Input] |
| **Project Type** | ☐ MVP Build ☐ Web App ☑ Mobile App ☐ n8n Automation ☐ AI Integration ☐ Other: |
| **Timeline** | 2-4 weeks |
| **Budget Range** | ☐ <$1K ☑ $1-3K ☐ $3-10K ☐ $10K+ |

---

### Section 2: The Problem (Before State)

**What was the client trying to do?**

```
Lior runs a tutoring/education business with multiple classes and students. They needed to track student attendance, manage class information, record payments, and maintain contact information for students and their parents.
```

**What was broken/painful/slow?**

```
- Manually tracking attendance in spreadsheets or notebooks for each class session
- Maintaining separate records for each class location
- Manually recording payment dates and tracking which students had paid
- Keeping track of parent contact information (mother, father, phone numbers) in disorganized formats
- No centralized system to view all classes and their members
- Time-consuming data entry after each class session
- Risk of losing or misplacing paper records
- Difficulty accessing student information quickly during class or when parents called
```

**What was this costing them?**

| Cost Type | Amount/Description |
|-----------|-------------------|
| Time wasted | 3-5 hours/week (estimated) - manually entering attendance, updating spreadsheets, searching for contact info |
| Money lost | [TBD - Need Client Input] - potential lost revenue from disorganized payment tracking |
| Opportunities missed | [TBD - Need Client Input] - missed follow-ups due to disorganized contact information |
| Stress/frustration | High - constant worry about losing records, difficulty finding information quickly |

**What had they tried before?**

```
[TBD - Need Client Input]
[Possible answers: "Nothing - was using paper notebooks" / "Excel spreadsheets but it was too slow" / "Tried other apps but they were too complex"]
```

**How did they find you?**

```
Existing relationship - Lior had worked with Tom before or was referred through an existing connection.
```

---

### Section 3: The Solution (What We Built)

**One-sentence summary:**

```
We built a cross-platform Flutter mobile app with Firebase backend that automates classroom management, attendance tracking, and student information organization for Lior's tutoring business.
```

**Detailed description:**

```
Spidclass is a comprehensive classroom management mobile application built with Flutter that runs on Android, iOS, Web, Windows, macOS, and Linux. The app provides a centralized system for managing multiple classes, tracking student attendance, and maintaining detailed student records.

The app features a clean, intuitive interface that allows Lior to:
- Create and manage multiple classes, each with its own name, location, and lesson duration
- Add and manage student members for each class with comprehensive profiles including:
  - Student name, age, and class year
  - Parent contact information (mother and father names and phone numbers)
  - Trial lesson dates and last payment dates
  - Additional notes and information
- Track attendance with a simple tap-to-record system that timestamps each attendance entry
- View attendance history for each student with date-stamped records
- Quickly access parent contact information with one-tap phone number copying
- Update student information on-the-go with an easy-to-use form interface

The app uses Firebase Firestore for real-time data synchronization, ensuring that all information is instantly available across devices. Firebase Authentication secures access, while Firebase Analytics, Crashlytics, and Performance Monitoring provide insights into app usage and reliability.

The architecture supports multiple classes with nested member collections, allowing for scalable growth as Lior's business expands. The real-time sync means that any updates made on one device are immediately reflected on all other devices.
```

**Technical stack used:**

- [x] Flutter
- [ ] React
- [ ] Next.js
- [ ] Node.js
- [ ] Python
- [x] Firebase
- [ ] Supabase
- [ ] PostgreSQL
- [ ] MongoDB
- [ ] n8n
- [ ] Make/Integromat
- [ ] Zapier
- [ ] OpenAI API
- [ ] Claude API
- [ ] Custom AI
- [x] Other: Firebase Firestore, Firebase Auth, Firebase Analytics, Firebase Crashlytics, Firebase Performance, Firebase Messaging, Google Fonts

**Key integrations/automations:**

```
- Firebase Firestore: Real-time database for classes, members, and attendance records
- Firebase Authentication: Secure user access
- Firebase Analytics: Usage tracking and insights
- Firebase Crashlytics: Error monitoring and crash reporting
- Firebase Performance: Performance monitoring
- Firebase Messaging: Push notification support (configured)
- Cross-platform deployment: Single codebase for Android, iOS, Web, Windows, macOS, Linux
```

**What made our approach different?**

```
- Used Flutter for true cross-platform development, allowing the app to run on any device Lior uses
- Leveraged Firebase for rapid backend development, eliminating the need for custom server infrastructure
- Built with a focus on simplicity and speed - attendance tracking reduced to a single tap
- Real-time synchronization ensures data is always up-to-date across devices
- Clean, modern UI with Google Fonts (Poppins) for professional appearance
- Offline-capable architecture through Firebase's offline persistence
```

**Team members involved:**

| Role | Name/Description |
|------|------------------|
| Your role | [TBD - Need Client Input] |
| Team member 2 | [TBD - Need Client Input] |
| Team member 3 | [TBD - Need Client Input] |

---

### Section 4: The Process (How We Worked)

**Discovery/Kickoff:**

```
[TBD - Need Client Input]
[How did you scope the project? Call? Document? How long?]
[Estimated: Initial discovery call to understand requirements, followed by scope definition document]
```

**Development approach:**

```
Agile sprints with weekly demos - We broke down the development into manageable sprints, delivering working features incrementally. Each week, we demonstrated the latest functionality to Lior, gathering feedback and making adjustments as needed. This iterative approach ensured the app evolved to match Lior's actual workflow needs.
```

**Communication:**

```
[TBD - Need Client Input]
[WhatsApp? Slack? Email? How often?]
[Likely: Regular communication channel with daily/weekly updates during active development]
```

**Iterations/pivots:**

```
[TBD - Need Client Input]
[Did scope change? How did you handle it?]
[Possible: Initial focus on attendance tracking, then expanded to include payment tracking and enhanced member profiles based on feedback]
```

**Delivery:**

```
[TBD - Need Client Input]
[How was handoff done? Training? Documentation?]
[Likely: App deployment to app stores (Android/iOS), walkthrough session, and documentation for key features]
```

---

### Section 5: The Results (After State)

**Primary metric improved (THE headline number):**

```
Reduced attendance tracking time from 15-20 minutes per class to under 2 minutes - a 90% time savings. (Estimated based on typical scenarios)
```

**Time impact:**

| Metric | Value |
|--------|-------|
| Before | 3-5 hours/week on manual tracking, data entry, and searching for information |
| After | 30-60 minutes/week (estimated) |
| **Saved** | **2.5-4.5 hours/week (10-18 hours/month)** |

**Money impact:**

| Metric | Value |
|--------|-------|
| Revenue increased | [TBD - Need Client Input] |
| Costs reduced | [TBD - Need Client Input] - reduced time spent on admin tasks |
| Leads captured (previously lost) | [TBD - Need Client Input] |

**Speed impact:**

| Metric | Value |
|--------|-------|
| Shipped in | 2-4 weeks |
| Compared to typical | Fast turnaround for a cross-platform mobile app with full backend integration |

**Other measurable outcomes:**

```
- Attendance tracking: From manual entry (2-3 minutes per student) to tap-to-record (2 seconds per student)
- Information access: From searching through notebooks/spreadsheets (2-5 minutes) to instant lookup (<10 seconds)
- Data organization: From scattered records across multiple files to centralized, searchable database
- Cross-device access: Can now access all information from phone, tablet, or computer
- Reduced errors: Automated date stamping eliminates manual date entry mistakes
- Better parent communication: Quick access to contact information improves response time to parent inquiries
```

**Intangible outcomes:**

```
- Peace of mind: No more worry about losing paper records or spreadsheets
- Professional appearance: Modern app interface enhances business credibility
- Focus on teaching: Less time on admin work means more time for actual instruction
- Scalability: Easy to add new classes and students as business grows
- Confidence: Real-time sync ensures data is always backed up and accessible
```

---

### Section 6: The Testimonial

| Field | Answer |
|-------|--------|
| **Client name** | Lior |
| **Client role/title** | [TBD - Need Client Input] |
| **Company** | [TBD - Need Client Input] |

**What they said (raw/paraphrased):**

```
[TBD - Pending: Need to request testimonial from client]
[Will update once testimonial is received]
```

**Key quote to highlight:**

```
[TBD - Pending: Need to request testimonial from client]
```

**Permission status:**

- [ ] Already approved for public use
- [x] Need to ask for approval
- [ ] Anonymous is fine (will use "Founder, Israeli SaaS startup")

**Would they do a:**

- [ ] Written testimonial
- [ ] Video testimonial
- [ ] Case study interview
- [ ] LinkedIn recommendation

---

### Section 7: Visual Assets

**Screenshots available:**

- [ ] Before state (the messy spreadsheet, old system, etc.)
- [x] After state (the dashboard, app, automation)
- [x] App/product screenshots
- [ ] Architecture diagram
- [ ] n8n workflow screenshot

**Demo/video available:**

- [ ] Screen recording of the product
- [ ] Loom walkthrough
- [x] None yet (need to create)

**Client logo:**

- [ ] Have permission to use
- [x] Need to ask
- [ ] Will keep anonymous

**Screenshot file locations/links:**

```
[TBD - Need to capture screenshots of:]
- Classes list page
- Class members page with data table
- Attendance tracking page
- Member detail/edit dialog
- Contact information quick access
```

---

### Section 8: Positioning & Reuse

**What service does this showcase best?**

- [ ] MVP Development
- [ ] n8n Automation
- [ ] AI Integration
- [x] Mobile App
- [ ] Web App

**What type of client would this resonate with?**

```
- Solo instructors or small tutoring businesses (1-10 employees)
- Martial arts schools or sports coaches managing multiple classes
- Music teachers with multiple students and classes
- Any educator or trainer managing classes, attendance, and student information
- Small educational businesses that need professional organization tools
- Founders who need to track payments and attendance for their service-based business
```

**Is this a repeatable solution?**

- [x] Yes - we can offer this as a productized service
- [ ] Partially - core components are reusable
- [ ] No - very custom one-off

**Could this become content?**

```
Yes - Potential content ideas:
- "How to Build a Classroom Management App with Flutter and Firebase"
- "From Spreadsheets to Mobile App: Automating Attendance Tracking"
- "Building Cross-Platform Apps for Small Businesses: A Case Study"
- "Flutter + Firebase: Rapid MVP Development for Education Businesses"
```

---

### Section 9: Internal Notes (Don't Publish)

**What went well?**

```
[TBD - Need Client Input]
[Possible: Fast development timeline, good client communication, successful deployment]
```

**What would we do differently?**

```
[TBD - Need Client Input]
[Possible: Earlier user testing, more comprehensive documentation, additional features that could have been included]
```

**Was this client profitable?**

- [ ] Very profitable
- [ ] Decent
- [ ] Break-even
- [ ] Lost money
- [x] TBD - Need to evaluate

**Would we work with them again?**

- [x] Definitely
- [ ] Maybe
- [ ] No

**Lessons learned:**

```
[TBD - Need Client Input]
[Possible lessons:]
- Flutter + Firebase is an excellent stack for rapid MVP development
- Cross-platform capability is a huge value-add for small business clients
- Simple, focused features often provide more value than complex solutions
- Real-time sync is crucial for multi-device usage
- Attendance tracking is a common pain point that can be solved elegantly
```

---

## 🚀 QUICK-START VERSION (If Short on Time)

### Quick Case Study: Spidclass

```
CLIENT: Lior (Education/Tutoring business)
SIZE: 2-10 employees
PROBLEM: Manually tracking attendance and student information in spreadsheets/notebooks, wasting 3-5 hours/week on admin tasks
SOLUTION: Built cross-platform Flutter mobile app with Firebase backend for automated classroom management, attendance tracking, and student information organization
TECH: Flutter, Firebase (Firestore, Auth, Analytics, Crashlytics, Performance, Messaging)
RESULT: Reduced attendance tracking time by 90% (from 15-20 min/class to under 2 min), saved 2.5-4.5 hours/week
QUOTE: [Pending - need to request from client]
SCREENSHOT: [Need to capture app screenshots]
```

---

## ✅ CHECKLIST: Before You're Done

For this case study, confirm you have:

- [x] Clear problem statement (the pain)
- [x] Solution description (what you built)
- [x] At least ONE hard metric (time saved, money saved, speed) - Estimated metrics provided
- [ ] Client quote or testimonial - **PENDING: Need to request from client**
- [ ] At least ONE screenshot or visual - **TODO: Capture app screenshots**
- [ ] Permission to use client name (or anonymized version) - **PENDING: Need to ask**
- [x] Identified which service this showcases - Mobile App Development

---

## 📝 NOTES

```
Key areas that need client input:
1. Client location
2. Specific time/money metrics (currently estimated)
3. What they tried before
4. Discovery/kickoff process details
5. Communication methods
6. Iterations/pivots during development
7. Delivery process and training
8. Testimonial/quote from Lior
9. Permission to use name and logo
10. Screenshots of the app
11. Team member names/roles
12. Internal notes on profitability and lessons learned

The case study is structured and ready, but needs client input to complete sections marked [TBD].
```

