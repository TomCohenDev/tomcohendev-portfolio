Tom Cohen — Case Study & Review Template
Instructions: Copy this template for each project. Fill in the blanks with raw data—don't worry about polish. You'll paste the completed version into AI to generate website-ready content.

Goal: Capture 3-5 case studies to establish credibility and attract similar clients.


📋 PROJECT 1: GOMLIN JOBS

Section 1: Project Overview
Field
Answer
Project Name
Gomlin (Gomlin Jobs)
Client Name/Company
Tom Cohen privately owned product
Client Industry
Job Matching / Freelance Platform / HR Tech
Client Size
 Solo founder 
Client Location
Israel (based on legal documents mentioning Tel Aviv, Israeli Consumer Protection Law)
Project Type
☐ MVP Build ☑ Web App ☑ Mobile App ☑ n8n Automation ☑ AI Integration ☐ Other:
Timeline
[Need to fill - initial commit Dec 9, 2024
Last commit Aug 8, 2025]
Budget Range
$1-3K 



Section 2: The Problem (Before State)
What was the client trying to do?

Create a modern job matching platform that revolutionizes how employers find freelancers and how freelancers discover opportunities. The goal was to transform the traditional, slow, and inefficient hiring process into a fast, swipe-based matching experience similar to dating apps but for job opportunities.

What was broken/painful/slow?

Traditional hiring processes are slow and inefficient. Employers spend hours wading through endless résumés, while freelancers waste time on cold outreach and sales pitches. Traditional job boards overwhelm with information but underwhelm with results. The process of finding a job or a gig was a day-long ordeal instead of a quick, efficient experience.

What was this costing them?

Cost Type
Amount/Description
Time wasted
Hours per week spent on manual résumé review and candidate screening
Money lost
$/month - [Need to fill - specific metrics]
Opportunities missed
Quality candidates lost in the noise, missed matches due to inefficient processes
Stress/frustration
High - dealing with overwhelming information and underwhelming results


What had they tried before?

This is Tom Cohen's internal product

How did they find you?

This is Tom Cohen's internal product



Section 3: The Solution (What We Built)
One-sentence summary:

We built a dual-platform job matching ecosystem with AI-powered SmartMatch™ technology, featuring a web platform for employers and a Tinder-style mobile app for job seekers, complete with automated job scraping, WhatsApp analytics bot, and comprehensive payment processing.

Detailed description:

Gomlin is a comprehensive job matching platform that reimagines the hiring process through a focused, dual-platform approach. The solution consists of:

**Web Platform (gomlinjobs.com):** Employers use the web platform to post jobs with AI-assisted job descriptions, access SmartMatch™ AI for instant candidate analysis, review matched applicants, and manage their hiring pipeline. All features are free for clients, including unlimited job posts, email notifications, SmartMatch™ AI, and AI job helper.

**Mobile App (iOS & Android):** Job seekers use the mobile app to swipe through personalized job opportunities in a Tinder-style interface. They build comprehensive profiles showcasing skills, experience, and resumes. When both parties swipe right, it's a match and they can connect directly.

**AI-Powered Matching:** The SmartMatch™ technology uses AI to analyze candidate profiles against job requirements, going beyond keywords to understand skills, experience, and potential. The system provides fit scores, detailed analysis, and recommendations for both single applicant analysis and multi-applicant smart matching.

**Automation & Analytics:** Built n8n workflows for automated job scraping and parsing from external sources, plus a sophisticated AI chatbot that allows natural language queries of Firebase Analytics data through BigQuery integration.

**Payment Infrastructure:** Integrated LemonSqueezy for web payments, Apple IAP and Google Play IAP for mobile subscriptions, with a 7% platform commission on client-to-freelancer transactions. Built dedicated IAP validation server for production-ready purchase verification.

**Real-time Communication:** Integrated Stream Chat for seamless messaging between clients and applicants directly within the platform.

The entire system is built with production-ready infrastructure including Docker containers, Gunicorn servers, Firebase Cloud Functions, and comprehensive analytics tracking.

Technical stack used:

Flutter
React
Next.js
Node.js
Python
Firebase
Supabase
PostgreSQL
MongoDB
n8n
Make/Integromat
Zapier
OpenAI API
Claude API
Custom AI
Other: Stream Chat, Stripe, BigQuery, Docker, Gunicorn, Firebase Cloud Functions

Key integrations/automations:

1. **n8n Workflows:**

   - WhatsApp AI Chatbot: OpenAI (GPT-4o) → BigQuery → WhatsApp (natural language analytics queries)

   - Job Parser from Scraper: External job sources → OpenAI parsing → Firestore (automated job posting)

   - Analytics Reporting: Scheduled BigQuery queries → WhatsApp (daily analytics reports)

2. **Payment Flow:**

   - Web: Stripe → Flask Server → Firestore (payment records)

   - Mobile iOS: Apple IAP → IAP Validation Server → Firestore

   - Mobile Android: Google Play IAP → IAP Validation Server → Firestore

   - Commission: 7% platform fee automatically deducted via Stripe

3. **AI Matching:**

   - Flutter App → gomlin-ai-server (Flask) → OpenAI API (GPT-4o-mini) → Analysis Results → Flutter App

   - Supports single applicant analysis and multi-applicant smart matching

   - Returns fit scores, detailed analysis, and recommendations

4. **Real-time Chat:**

   - Flutter App ↔ Stream Chat API ↔ gomlin_flask_server (chat token management)

5. **Analytics:**

   - Flutter App → Firebase Analytics → BigQuery → n8n Workflows → WhatsApp/Reports

6. **Authentication:**

   - Google Sign-In, Apple Sign-In → Firebase Auth → Firestore (user profiles)

7. **Job Posting:**

   - Web Platform → Firestore → Mobile App (real-time job feed)

   - AI Job Helper assists in crafting job descriptions

What made our approach different?

1. **Dual-Platform Architecture:** Separated concerns with web for employers and mobile for job seekers, optimizing each platform for its specific user journey.

2. **AI-First Matching:** Built dedicated AI matching service using AI, not just keyword matching. The SmartMatch™ technology understands context, skills, and potential beyond simple keyword searches.

3. **Production-Ready Infrastructure:** Built three separate Flask servers (main, AI, IAP) with Docker, Gunicorn, and proper deployment configurations from day one.

4. **Comprehensive Automation:** Integrated n8n for complex workflows including natural language analytics queries via WhatsApp, automated job scraping, and scheduled reporting.

5. **Multi-Payment Gateway:** Seamlessly integrated Stripe, Apple IAP, and Google Play IAP with a unified subscription management system.

6. **Real-time Everything:** Used Firebase for real-time data sync, Stream Chat for messaging, ensuring instant updates across all platforms.

Team members involved:

Role
Name/Description
Your role
Over and developer











Section 4: The Process (How We Worked)
Discovery/Kickoff:

[Need to fill - market search via google treats, reddit postsm linkedin posts, quarry of key works in social platforms]

Development approach:

Based on codebase structure, the project appears to have been developed with:

- Modular architecture (separate services for main backend, AI, and IAP)

- Flutter for cross-platform mobile development

- Firebase for backend infrastructure

- Docker containerization for deployment

- CI/CD via Codemagic (codemagic.yaml found)

- Version control and dependency management (pubspec.yaml, pyproject.toml, uv.lock files)

Communication:

[Need to fill - Communication methods not documented in codebase]

Iterations/pivots:

[Need to fill - Iteration history not documented in codebase]

Delivery:

[Need to fill - Delivery process not documented in codebase]


Section 5: The Results (After State)
Primary metric improved (THE headline number):

[Need to fill - Specific metrics not found in codebase. However, based on the solution: Reduced hiring time from "day-long ordeal" to "5 minute swipe-and-match experience" as stated in app mission]

Time impact:

Metric
Value
Before
Day-long process to find a job or gig
After
5 minute swipe-and-match experience (per app mission statement)
Saved
Hours per day (transformation from day-long to 5-minute process)


Money impact:

Metric
Value
Revenue increased
$ [Need to fill - metrics not found]
Costs reduced
$ [Need to fill - metrics not found]
Leads captured (previously lost)
$ [Need to fill - metrics not found]


Speed impact:

Metric
Value
Shipped in
[Need to fill - timeline not found]
Compared to typical
[Need to fill]


Other measurable outcomes:

- Platform supports dual-platform architecture (web + mobile)

- Multi-language support (English and Hebrew)

- Automated job scraping and parsing from external sources

- AI-powered matching with detailed fit analysis

- Real-time chat integration

- Comprehensive payment processing (Stripe + IAP)

- Production-ready infrastructure with Docker deployment

- WhatsApp analytics bot for natural language queries

Intangible outcomes:

- Transformed hiring from slow, inefficient process to fast, engaging experience

- Created "reciprocity by design" - platform where both sides win

- Level playing field for freelancers based on merit, not connections

- AI-driven insights replace gut feelings about résumés

- Platform respects user time and intelligence


Section 6: The Testimonial
Field
Answer
Client name
[Need to ask]
Client role/title
[Need to ask]
Company
Gomlin Ltd. (based on legal documents)


What they said (raw/paraphrased):

[Need to ask - Testimonial not found in codebase]

Key quote to highlight:

[Need to ask]

Permission status:

Already approved for public use
Need to ask for approval
Anonymous is fine (will use "Founder, Israeli SaaS startup")

Would they do a:

Written testimonial
Video testimonial
Case study interview
LinkedIn recommendation


Section 7: Visual Assets
Screenshots available:

Before state (the messy spreadsheet, old system, etc.)
After state (the dashboard, app, automation)
App/product screenshots (app icon found: oats_for_brains/assets/icons/app_icon.png)
Architecture diagram
n8n workflow screenshot

Demo/video available:

Screen recording of the product
Loom walkthrough
None yet (need to create)

Client logo:

Have permission to use
Need to ask
Will keep anonymous

Screenshot file locations/links:

- App Icon: oats_for_brains/assets/icons/app_icon.png

- App Icon SVG: oats_for_brains/assets/icons/app_icon.svg

- Images: oats_for_brains/assets/images/ (frosted_glass.jpg, linkedin_profile_how_to.png, new_job_auth_card.png)

- n8n Workflows: n8n-workflows/*.json (can be imported to n8n for visualization)


Section 8: Positioning & Reuse
What service does this showcase best?

MVP Development
n8n Automation
AI Integration
Mobile App
Web App

What type of client would this resonate with?

- Startups building dual-platform products (web + mobile)

- Companies needing AI-powered matching/recommendation systems

- Businesses requiring complex automation workflows (n8n)

- Platforms needing multi-payment gateway integration (Stripe + IAP)

- Companies building marketplace platforms with commission models

- Startups needing production-ready infrastructure from day one

- Businesses requiring real-time features (chat, notifications, data sync)

- Companies serving multiple languages/markets

Is this a repeatable solution?

Yes - we can offer this as a productized service
Partially - core components are reusable
No - very custom one-off

Reusable Components:

Dual-platform architecture pattern (web + mobile)
AI matching service architecture
n8n automation workflows (WhatsApp bot, job scraping patterns)
Multi-payment gateway integration (Stripe + IAP)
Firebase + Flutter stack
Docker deployment configurations
IAP validation server pattern

Could this become content?

Yes, multiple content opportunities:

1. "How to Build a Tinder-Style Job Matching App with Flutter and AI"

2. "Building a WhatsApp Analytics Bot with n8n, OpenAI, and BigQuery"

3. "Multi-Payment Gateway Integration: Stripe + Apple IAP + Google Play IAP"

4. "Dual-Platform Architecture: Web for Employers, Mobile for Job Seekers"

5. "Production-Ready Flask Services: AI Matching, IAP Validation, Chat Server"

6. "Automated Job Scraping and Parsing with n8n and OpenAI"

7. "Building SmartMatch™: AI-Powered Candidate Matching with OpenAI"


Section 9: Internal Notes (Don't Publish)
What went well?

- Comprehensive technical stack covering all aspects (mobile, web, backend, AI, automation, payments)

- Production-ready infrastructure from the start (Docker, Gunicorn, proper server separation)

- Well-organized codebase with clear separation of concerns

- Multi-language support (English and Hebrew)

- Comprehensive legal documentation (payment policy, EULA, privacy policy, terms)

- Real-time features properly implemented (Firebase, Stream Chat)

- Automated workflows for job scraping and analytics

What would we do differently?

[Need to fill - Internal reflection not available]

Was this client profitable?

Very profitable
Decent
Break-even
Lost money
Unknown (financial data not in codebase)

Would we work with them again?

Definitely
Maybe
No
Unknown (relationship status not documented)

Lessons learned:

1. Dual-platform architecture requires careful consideration of shared data models and real-time sync

2. AI matching services benefit from dedicated microservices for scalability

3. Multi-payment gateway integration requires careful handling of different validation flows

4. n8n workflows are powerful for complex automation but require good error handling

5. Firebase provides excellent real-time capabilities but BigQuery integration needed for advanced analytics

6. Production-ready infrastructure (Docker, Gunicorn) should be set up early, not as an afterthought

7. Comprehensive legal documentation (payment policies, EULA) is essential for marketplace platforms



