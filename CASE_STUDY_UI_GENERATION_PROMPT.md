# AI Prompt: Case Study UI Page Generation

## Context: Tom Cohen

You are creating a React/TypeScript case study page for **Tom Cohen**, a boutique product studio that builds MVPs, n8n automations, and AI integrations for founders and startups.

### Brand Identity
- **Positioning**: Product Studio (not just a dev agency) - we build our own products AND client products
- **Tone**: Confident, direct, pragmatic, partner-oriented
- **Value Props**: Founder-to-founder mindset, end-to-end product journey, speed + quality
- **Target Audience**: Early-stage founders and scale-ups

### Design System: Discord-Inspired Dark Theme

#### Base Colors
- **Background**: `#1D201F` (Discord Main) - Primary background
- **Secondary Background**: `#0F0C29` (Discord Dark) - Cards, borders, muted sections
- **Primary Text**: `#E0D0C1` (Discord White) - Headings, body text
- **Muted Text**: `#B9BBBE` (Discord Gray) - Secondary information
- **Success**: `#43B581` (Discord Success) - Positive indicators

#### Primary Accent Colors (Vary by Case Study)
Each case study uses a **slightly different primary accent color** to create visual distinction:
- **Nightwing**: `#d946ef` (Fuchsia/Pink)
- **Mintkola**: `#14b8a6` (Teal) + `#f97316` (Orange) - Dual accent
- **GomlinJobs**: `#bf95f9` (Purple)
- **AISocialMediaStrategist**: `#6366f1` (Indigo)
- **BlogAutomation**: `#a855f7` (Purple)

**IMPORTANT**: Choose a unique accent color for each new case study that hasn't been used yet. Use this color for:
- Badges/borders
- CTA buttons
- Highlights
- Icon accents
- Gradient overlays

#### Typography
- **Primary Font**: Nunito (body text, UI elements)
- **Secondary Font**: Inter (headings, emphasis)
- **Display Font**: Excalifont (page titles only - use sparingly)
- **Monospace**: For code snippets

#### Spacing
- Use consistent 4px base unit
- Standard spacing: `space-4` (16px), `space-6` (24px), `space-8` (32px)
- Section padding: `section-padding` utility class
- Container padding: `container-padding` utility class

#### Components

**Badge**:
```tsx
<div className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-[PRIMARY_COLOR]/20 rounded-full text-sm font-medium text-[PRIMARY_COLOR] mb-6">
  Featured Case Study
</div>
```

**Primary Button (CTA)**:
```tsx
<button className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg">
  Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
</button>
```

**Animated CTA Border** (Used in all case studies):
```tsx
// Three animated border layers with slight variations
const [borderAnimation, setBorderAnimation] = useState({ scale: 1, x: 2, y: -2, rotate: -0.5 });
// Update every 2 seconds with random variations
// Apply to CTA section with border-[PRIMARY_COLOR]/30, /20, /15 opacity
```

**Card**:
```tsx
<div className="bg-[#1D201F] border border-white/5 rounded-xl p-6 shadow-soft">
  {/* Content */}
</div>
```

**Browser Mockup** (For web app screenshots):
```tsx
<div className="bg-gray-900 rounded-t-lg shadow-2xl overflow-hidden">
  {/* Browser Top Bar */}
  <div className="bg-gray-800/50 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
    {/* Traffic Lights */}
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-red-500/60" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
      <div className="w-3 h-3 rounded-full bg-green-500/60" />
    </div>
    {/* Address Bar */}
    <div className="flex-1 bg-gray-900/50 rounded-md px-3 py-1.5 mx-2 border border-white/5">
      <div className="text-xs text-gray-400 truncate">example.com</div>
    </div>
  </div>
  {/* Screen Content */}
  <div className="bg-[#1D201F]">
    <img src={screenshot} alt="..." className="w-full h-auto" />
  </div>
</div>
```

**Phone Mockup** (For mobile app screenshots):
```tsx
<div className="relative bg-gray-950 rounded-[2.5rem] p-2 shadow-[-30px_30px_80px_rgba(0,0,0,0.8)]">
  {/* Notch */}
  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10"></div>
  {/* Screen */}
  <div className="bg-black rounded-[2rem] overflow-hidden">
    <img src={screenshot} alt="..." className="w-full" />
  </div>
</div>
```

---

## Case Study Page Structure

Each case study page should follow this general structure, but **each must be visually unique**:

### 1. Hero Section
- Badge (Featured Case Study / Internal Project / etc.)
- Headline (large, bold, with accent color highlight)
- Subheadline (value proposition)
- Hero visual (varies by case study - see examples below)
- Optional: Quick metrics bar

### 2. The Problem / Challenge
- Clear problem statement
- Visual representation (before state, pain points)
- Optional: Comparison visuals

### 3. The Solution / Visual Journey
- **THIS IS WHERE EACH CASE STUDY DIFFERS MOST**
- Unique layout showcasing the product/solution
- Could be: zigzag flow, bento grid, timeline, workflow diagram, etc.

### 4. Technical Deep Dive / How We Built It
- Architecture explanation
- Tech stack showcase
- Key features/innovations
- Optional: Code snippets, diagrams

### 5. Results / Impact
- Metrics (time saved, money saved, etc.)
- Visual representation of results
- Before/after comparison

### 6. Testimonial (if available)
- Client quote
- Client name/role
- Styled quote card

### 7. CTA Section
- Animated border effect (consistent across all)
- Call to action
- Link to contact page
- Link to other case studies

---

## Existing Case Study Variations (Reference)

### Nightwing Case Study
**Primary Color**: `#d946ef` (Fuchsia)
**Unique Elements**:
- Zigzag flow with SVG arrows connecting screenshots
- Automation hub visual (center web app, side Google Sheets + Telegram)
- "The Logic Layer" section with 3-step cards
- Results section with metrics grid
- Purple accent throughout

**Layout Style**: Horizontal zigzag flow, automation visualization

### Mintkola Case Study
**Primary Colors**: `#14b8a6` (Teal) + `#f97316` (Orange)
**Unique Elements**:
- Dual-mascot system (Kola orange, Mint teal)
- Roadmap node visualization with connecting lines
- Gradient text effects
- Bento grid for features
- Teal/orange color scheme throughout

**Layout Style**: Vertical roadmap flow, dual-personality theme

### GomlinJobs Case Study
**Primary Color**: `#bf95f9` (Purple)
**Unique Elements**:
- Dual-platform showcase (web browser + phone mockup stacked)
- Bento grid for employer dashboard
- Phone cascade (3 phones at angles)
- Project specs bar
- Article + sidebar layout for technical details

**Layout Style**: Dual-platform hero, bento grid, article layout

### AISocialMediaStrategist Case Study
**Primary Color**: `#6366f1` (Indigo)
**Unique Elements**:
- Telegram interface mockup (CSS-built, not image)
- Floating destination badges (X, LinkedIn, Instagram, Discord)
- Horizontal workflow nodes (4-step pipeline)
- Sticky sidebar with tech stack
- Code snippet visualization

**Layout Style**: Telegram-first, workflow nodes, sticky sidebar

### BlogAutomation Case Study
**Primary Color**: `#a855f7` (Purple)
**Unique Elements**:
- Telegram chat simulator (animated)
- Horizontal 4-step tech nodes
- Code snippet with syntax highlighting
- Comparison stats (old vs new process)
- Purple gradient accents

**Layout Style**: Chat-first, horizontal flow, code-focused

---

## How to Make Each Case Study Unique

### 1. Choose a Unique Primary Accent Color
- Don't reuse colors from existing case studies
- Pick a color that fits the project theme
- Use consistently throughout the page

### 2. Create a Unique Visual Journey Layout
- **Don't copy** the exact layout from existing case studies
- Consider the project type:
  - **Mobile apps**: Phone mockups, swipe animations, mobile-first layouts
  - **Web apps**: Browser mockups, dashboard grids, desktop-first
  - **Automation**: Workflow diagrams, pipeline visualizations, node-based flows
  - **AI products**: Chat interfaces, agent visualizations, reasoning flows
  - **Full-stack**: Architecture diagrams, multi-platform showcases

### 3. Vary the Hero Section
- Some use split-screen (text + visual)
- Some use centered hero with floating elements
- Some use full-width visual with overlay text
- Some use stacked elements (web + mobile)

### 4. Unique Section Arrangements
- Some use bento grids
- Some use zigzag flows
- Some use vertical timelines
- Some use article + sidebar layouts
- Some use card grids

### 5. Custom Components for Each
- Create project-specific components (e.g., Telegram chat, roadmap nodes, workflow steps)
- Use animations that fit the project theme
- Add floating elements, badges, or annotations

---

## Case Study Markdown Structure

You will receive a case study markdown file with this structure:

```markdown
## Section 1: Project Overview
- Project Name
- Client Name/Company
- Client Industry
- Project Type (MVP Build, Web App, Mobile App, n8n Automation, AI Integration)
- Timeline
- Budget Range

## Section 2: The Problem (Before State)
- What was the client trying to do?
- What was broken/painful/slow?
- What was this costing them?
- What had they tried before?

## Section 3: The Solution (What We Built)
- One-sentence summary
- Detailed description
- Technical stack used
- Key integrations/automations
- What made our approach different?

## Section 4: The Process (How We Worked)
- Discovery/Kickoff
- Development approach
- Communication
- Iterations/pivots
- Delivery

## Section 5: The Results (After State)
- Primary metric improved
- Time impact
- Money impact
- Speed impact
- Other measurable outcomes
- Intangible outcomes

## Section 6: The Testimonial
- Client name
- Client role/title
- What they said
- Key quote to highlight

## Section 7: Visual Assets
- Screenshots available
- Demo/video available
- Client logo
- Screenshot file locations/links

## Section 8: Positioning & Reuse
- What service does this showcase best?
- What type of client would this resonate with?
- Is this a repeatable solution?

## Section 9: Internal Notes (Don't Publish)
```

---

## Technical Implementation Requirements

### File Structure
- Create file: `src/pages/case-studies/[CaseStudyName].tsx`
- Import Header and Footer components
- Use React Router's `useNavigate` for navigation
- Use Framer Motion for animations

### Required Imports
```tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, [other icons] } from "lucide-react";
```

### Asset Paths
- Use: `const BASE_PATH = "/case_studies/[project-name]/assets";`
- Reference images: `${BASE_PATH}/screenshot-name.webp`

### Animation Patterns
- Use Framer Motion for scroll-based animations
- Use `useScroll` and `useTransform` for parallax effects
- Animate borders on CTA section (consistent pattern)
- Add hover effects on interactive elements

### Responsive Design
- Mobile-first approach
- Use Tailwind breakpoints: `md:`, `lg:`
- Hide/show elements based on screen size
- Stack layouts on mobile, side-by-side on desktop

---

## Your Task

Given a case study markdown file, create a **unique, visually distinct** React/TypeScript page that:

1. **Follows the design system** (colors, typography, spacing)
2. **Uses a unique primary accent color** (not used in existing case studies)
3. **Creates a unique visual journey layout** (don't copy existing layouts)
4. **Implements all required sections** (Hero, Problem, Solution, Technical, Results, Testimonial, CTA)
5. **Uses appropriate visualizations** based on project type:
   - Mobile apps → Phone mockups
   - Web apps → Browser mockups
   - Automation → Workflow diagrams
   - AI products → Chat interfaces, agent flows
   - Full-stack → Multi-platform showcases
6. **Includes custom components** that fit the project theme
7. **Maintains brand consistency** (same Header/Footer, same CTA pattern, same overall feel)
8. **Is fully responsive** (mobile, tablet, desktop)

### Output Format
- Complete React/TypeScript component
- All imports included
- All custom components defined
- Proper TypeScript types
- Comments for complex sections
- Asset paths properly configured

---

## Example: How to Approach a New Case Study

**Given**: A case study about a Flutter mobile app for fleet management

**Step 1**: Choose unique accent color (e.g., `#10b981` - Emerald green - not used yet)

**Step 2**: Determine unique layout:
- Mobile app → Use phone mockups
- Fleet management → Show map/dashboard visualization
- Multiple devices → Show device cascade or grid
- Real-time tracking → Use animated connection lines

**Step 3**: Create custom components:
- Fleet map visualization
- Device status cards
- Real-time sync indicator
- Feature showcase cards

**Step 4**: Structure sections:
- Hero: Split screen with phone mockup + headline
- Problem: Before/after comparison (spreadsheet vs app)
- Solution: Device showcase with feature highlights
- Technical: Architecture diagram + tech stack
- Results: Metrics grid with before/after
- Testimonial: Quote card
- CTA: Animated border section

**Step 5**: Apply emerald green accent throughout:
- Badges, borders, highlights, buttons, icons

---

## Important Notes

- **Background is always**: `bg-[#1D201F]`
- **Primary text is always**: `text-[#E0D0C1]`
- **Muted text is always**: `text-[#B9BBBE]`
- **CTA button style is consistent** (btn-hero class)
- **Animated border pattern is consistent** (3 layers, random animation)
- **Header and Footer are always the same**
- **Each case study must feel unique** while maintaining brand consistency
- **Don't reuse exact layouts** - create new arrangements
- **Use the primary accent color** for all interactive/highlight elements
- **Make it visually interesting** - use animations, gradients, floating elements

---

## Ready to Generate

When you receive a case study markdown file:
1. Read through all sections carefully
2. Identify the project type and key differentiators
3. Choose a unique primary accent color
4. Design a unique visual journey layout
5. Create custom components as needed
6. Implement all sections with proper styling
7. Ensure responsiveness
8. Test that it feels distinct from existing case studies while maintaining brand consistency

Generate the complete React/TypeScript component code.
