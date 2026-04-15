# Tom Cohen Design System

## Overview

The Tom Cohen design system is built on a **Discord-inspired dark theme** that creates a modern, professional, and developer-friendly aesthetic. The design emphasizes clarity, consistency, and a cohesive visual language across all components and pages.

### Design Philosophy

- **Dark-First**: Built for dark mode with carefully selected contrast ratios
- **Discord-Inspired**: Takes visual cues from Discord's clean, modern interface
- **Developer-Focused**: Optimized for technical audiences and product showcases
- **Professional & Approachable**: Balances enterprise credibility with startup energy

---

## Color Palette

### Primary Colors

The Tom design system uses a Discord-inspired color palette with semantic naming.

#### Base Colors

| Color Name          | Hex Code  | HSL           | Usage                                         |
| ------------------- | --------- | ------------- | --------------------------------------------- |
| **Discord Main**    | `#1D201F` | `150 3% 12%`  | Primary background color                      |
| **Discord Dark**    | `#0F0C29` | `150 3% 8%`   | Secondary background, borders, muted elements |
| **Discord Purple**  | `#bf95f9` | `266 88% 79%` | Primary accent, buttons, links, highlights    |
| **Discord White**   | `#E0D0C1` | `29 29% 82%`  | Primary text color, foreground                |
| **Discord Gray**    | `#B9BBBE` | `210 9% 73%`  | Muted text, secondary information             |
| **Discord Success** | `#43B581` | `139 47% 52%` | Success states, positive indicators           |

#### Color Swatches

```
┌─────────────────────────────────────────────────────────┐
│ Discord Main (#1D201F)                                    │
│ Primary background - Main content areas                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Discord Dark (#0F0C29)                                    │
│ Secondary background - Cards, borders, muted sections   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Discord Purple (#bf95f9)                                  │
│ PRIMARY ACCENT - Buttons, links, highlights, CTAs       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Discord White (#E0D0C1)                                   │
│ Primary text - Headings, body text, foreground          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Discord Gray (#B9BBBE)                                    │
│ Muted text - Secondary information, descriptions        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Discord Success (#43B581)                                 │
│ Success states - Confirmations, positive feedback       │
└─────────────────────────────────────────────────────────┘
```

### Semantic Color Tokens

The design system uses semantic tokens that map to the base colors:

| Token                | Maps To                    | Usage                             |
| -------------------- | -------------------------- | --------------------------------- |
| `--background`       | Discord Main (`#1D201F`)   | Main page background              |
| `--foreground`       | Discord White (`#E0D0C1`)  | Primary text color                |
| `--primary`          | Discord Purple (`#bf95f9`) | Primary actions, accents          |
| `--muted`            | Discord Dark (`#0F0C29`)   | Muted backgrounds                 |
| `--muted-foreground` | Discord Gray (`#B9BBBE`)   | Muted text                        |
| `--border`           | Discord Dark (`#0F0C29`)   | Borders, dividers                 |
| `--accent`           | Discord Purple (`#bf95f9`) | Accent elements                   |
| `--destructive`      | `hsl(0 84.2% 60.2%)`       | Error states, destructive actions |

### Usage Guidelines

#### Primary Purple (`#bf95f9`)

- **Use for**: Primary buttons, links, highlights, CTAs, interactive elements
- **Avoid**: Large background areas, body text
- **Opacity variants**:
  - `#bf95f9/20` - Subtle backgrounds
  - `#bf95f9/30` - Borders
  - `#bf95f9/40` - Hover states
  - `#bf95f9/10` - Light backgrounds

#### Background Colors

- **Main Background**: Use `#1D201F` for primary content areas
- **Secondary Background**: Use `#0F0C29` for cards, elevated sections
- **Muted Background**: Use `bg-muted` token for subtle differentiation

#### Text Colors

- **Primary Text**: Use `text-foreground` (Discord White) for main content
- **Muted Text**: Use `text-muted-foreground` (Discord Gray) for secondary information
- **Accent Text**: Use `text-primary` (Discord Purple) for highlights and CTAs

---

## Typography

### Font Families

#### Primary Font: Nunito

- **Usage**: Body text, UI elements, general content
- **Style**: Rounded sans-serif, friendly yet professional
- **Weights**: 200-1000 (variable font)
- **Fallback**: Inter, system fonts

#### Secondary Font: Inter

- **Usage**: Headings, emphasis, technical content
- **Style**: Clean, geometric sans-serif
- **Weights**: 400, 500, 600, 700

#### Display Font: Excalifont

- **Usage**: Page titles, hero headlines, decorative text
- **Style**: Handwritten, playful, distinctive
- **Weight**: Regular (400)
- **Use sparingly**: Only for major page titles

#### Monospace Font

- **Usage**: Code snippets, technical documentation
- **Font Stack**: `SF Mono`, `Monaco`, `Inconsolata`, `Roboto Mono`, `monospace`

### Typography Scale

| Element        | Size              | Weight | Line Height | Usage                 |
| -------------- | ----------------- | ------ | ----------- | --------------------- |
| **H1**         | `4.5rem` (72px)   | 700    | 1.2         | Page titles (desktop) |
| **H1**         | `3.5rem` (56px)   | 700    | 1.2         | Page titles (tablet)  |
| **H1**         | `2.5rem` (40px)   | 700    | 1.2         | Page titles (mobile)  |
| **H2**         | `2.5rem` (40px)   | 600    | 1.3         | Section headings      |
| **H3**         | `1.875rem` (30px) | 600    | 1.4         | Subsection headings   |
| **Body**       | `1rem` (16px)     | 400    | 1.6         | Body text             |
| **Body Large** | `1.125rem` (18px) | 400    | 1.6         | Emphasized body text  |
| **Small**      | `0.875rem` (14px) | 400    | 1.5         | Captions, metadata    |
| **Tiny**       | `0.75rem` (12px)  | 400    | 1.4         | Labels, fine print    |

### Typography Classes

```css
/* Headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Nunito", "Inter", sans-serif;
  font-weight: 600;
  line-height: 1.2;
}

/* Excalifont for page titles */
.excalifont-title {
  font-family: "Excalifont", cursive;
  color: var(--primary);
  font-weight: 700;
}
```

---

## Spacing & Layout

### Spacing Scale

The design system uses a consistent 4px base unit:

| Token      | Value           | Usage                 |
| ---------- | --------------- | --------------------- |
| `space-1`  | `0.25rem` (4px) | Tight spacing         |
| `space-2`  | `0.5rem` (8px)  | Small gaps            |
| `space-4`  | `1rem` (16px)   | Standard spacing      |
| `space-6`  | `1.5rem` (24px) | Medium spacing        |
| `space-8`  | `2rem` (32px)   | Large spacing         |
| `space-12` | `3rem` (48px)   | Section spacing       |
| `space-16` | `4rem` (64px)   | Major section spacing |

### Container & Padding

- **Container Padding**: `2rem` (32px) on all sides
- **Max Width**: `1400px` (2xl breakpoint)
- **Section Padding**: Use `section-padding` utility class
- **Container Padding**: Use `container-padding` utility class

### Border Radius

- **Base Radius**: `0.5rem` (8px)
- **Small**: `calc(var(--radius) - 4px)` = `4px`
- **Medium**: `calc(var(--radius) - 2px)` = `6px`
- **Large**: `var(--radius)` = `8px`
- **XL**: `1rem` (16px) for cards and major elements

---

## Component Patterns

### Buttons

#### Primary Button

```tsx
<button className="group inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-[#bf95f9]/20 text-[#bf95f9] font-semibold rounded-lg hover:bg-[#bf95f9]/10 hover:border-[#bf95f9]/40 transition-colors">
  Button Text
  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
</button>
```

**Characteristics**:

- Background: `bg-white/5` (subtle white overlay)
- Border: `border-[#bf95f9]/20` (purple with 20% opacity)
- Text: `text-[#bf95f9]` (purple)
- Hover: `hover:bg-[#bf95f9]/10` and `hover:border-[#bf95f9]/40`
- Backdrop blur for glassmorphism effect

#### Secondary Button

```tsx
<button className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-primary">
  Secondary Action
</button>
```

### Badges & Tags

```tsx
<div className="inline-block px-4 py-1.5 bg-background border border-border rounded-full text-sm font-medium text-primary mb-4">
  Featured Case Study
</div>
```

**Characteristics**:

- Rounded full (pill shape)
- Subtle border
- Uses design tokens (`bg-background`, `border-border`, `text-primary`)

### Cards

```tsx
<div className="bg-background border border-border rounded-xl p-6 shadow-soft">
  Card Content
</div>
```

**Characteristics**:

- Background: `bg-background` (Discord Main)
- Border: `border-border` (Discord Dark)
- Shadow: `shadow-soft` for subtle elevation
- Padding: `p-6` (24px)

### Tech Stack Tags

```tsx
<span className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground">
  React
</span>
```

**Characteristics**:

- Semi-transparent background
- Subtle border
- Muted text color
- Compact padding

---

## Shadows & Effects

### Shadow Tokens

| Token           | Value                                         | Usage              |
| --------------- | --------------------------------------------- | ------------------ |
| `shadow-soft`   | `0 4px 20px hsl(var(--discord-dark) / 0.5)`   | Subtle elevation   |
| `shadow-purple` | `0 4px 20px hsl(var(--discord-purple) / 0.2)` | Purple glow effect |
| `shadow-2xl`    | Tailwind default                              | Major elevation    |

### Glow Effects

**Purple Glow** (for interactive elements):

```css
shadow-[0_0_50px_rgba(191,149,249,0.15)]
```

**Usage**: Browser frames, highlighted elements, focus states

### Backdrop Blur

Use `backdrop-blur-sm` or `backdrop-blur-md` for glassmorphism effects:

- Buttons: `backdrop-blur-sm`
- Overlays: `backdrop-blur-md`

---

## Gradients

### Hero Gradient

```css
background: linear-gradient(
  135deg,
  hsl(var(--discord-main)),
  hsl(var(--discord-dark))
);
```

**Usage**: Hero sections, major backgrounds

### Purple Gradient

```css
background: linear-gradient(
  135deg,
  hsl(var(--discord-purple) / 0.1),
  hsl(var(--discord-purple) / 0.05)
);
```

**Usage**: Subtle accent backgrounds, hover states

---

## Animations

### Keyframe Animations

| Animation        | Duration | Easing        | Usage                        |
| ---------------- | -------- | ------------- | ---------------------------- |
| `fade-in`        | `0.3s`   | `ease-out`    | Page load, content reveal    |
| `slide-up`       | `0.4s`   | `ease-out`    | Modal entry, card appearance |
| `bounce-slow`    | `3s`     | `ease-in-out` | Decorative elements          |
| `accordion-down` | `0.2s`   | `ease-out`    | Accordion expansion          |

### Transitions

**Standard Transition**:

```css
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Button Hover**:

```css
transition-colors
```

**Transform on Hover**:

```css
transform group-hover:translate-x-1 transition-transform
```

---

## Browser Mockup Styling

For case study showcases and product demos:

### Browser Frame

```tsx
<div className="bg-gray-900 rounded-t-lg shadow-2xl overflow-hidden">
  {/* Browser Top Bar */}
  <div className="bg-gray-800/50 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
    {/* Traffic Lights */}
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
      <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
    </div>
    {/* Address Bar */}
    <div className="flex-1 bg-gray-900/50 rounded-md px-3 py-1.5 mx-2 border border-white/5">
      <div className="text-xs text-gray-400 truncate">example.com</div>
    </div>
  </div>
  {/* Screen Content */}
  <div className="bg-[#1D201F]">{/* Content */}</div>
</div>
```

**Characteristics**:

- Frame: `bg-gray-900`
- Top bar: `bg-gray-800/50` with `border-white/5`
- Traffic lights: Use `/60` opacity
- Address bar: `bg-gray-900/50` with subtle border
- Screen: `bg-[#1D201F]` (matches Tom background)

---

## Design Tokens Reference

### CSS Variables

All design tokens are defined as CSS variables in `src/index.css`:

```css
:root {
  /* Base Colors */
  --discord-main: 150 3% 12%; /* #1D201F */
  --discord-dark: 150 3% 8%; /* #0F0C29 */
  --discord-purple: 266 88% 79%; /* #bf95f9 */
  --discord-white: 29 29% 82%; /* #E0D0C1 */
  --discord-gray: 210 9% 73%; /* #B9BBBE */
  --discord-success: 139 47% 52%; /* #43B581 */

  /* Semantic Tokens */
  --background: var(--discord-main);
  --foreground: var(--discord-white);
  --primary: var(--discord-purple);
  --muted: var(--discord-dark);
  --muted-foreground: var(--discord-gray);
  --border: var(--discord-dark);
  --radius: 0.5rem;
}
```

### Tailwind Usage

```tsx
// Backgrounds
className = "bg-background"; // Main background
className = "bg-muted"; // Muted background
className = "bg-primary"; // Purple accent

// Text
className = "text-foreground"; // Primary text
className = "text-muted-foreground"; // Muted text
className = "text-primary"; // Purple accent text

// Borders
className = "border-border"; // Standard border
className = "border-primary"; // Accent border

// Direct Discord Colors
className = "bg-discord-main";
className = "text-discord-purple";
```

---

## Best Practices

### Do's ✅

- **Use design tokens** instead of hardcoded colors
- **Maintain consistency** with spacing and typography scales
- **Use semantic colors** (`text-primary` vs `text-[#bf95f9]`)
- **Apply backdrop blur** for glassmorphism effects
- **Use opacity variants** for subtle effects (`/10`, `/20`, `/30`)
- **Follow button patterns** for interactive elements
- **Use rounded corners** consistently (8px base radius)

### Don'ts ❌

- **Don't use bright colors** outside the palette
- **Don't use pure white** (`#FFFFFF`) - use Discord White (`#E0D0C1`)
- **Don't use pure black** (`#000000`) - use Discord Main (`#1D201F`)
- **Don't create custom colors** without adding to the design system
- **Don't mix opacity styles** inconsistently
- **Don't use Excalifont** for body text or UI elements
- **Don't skip design tokens** in favor of hardcoded values

---

## Accessibility

### Contrast Ratios

- **Primary Text** (Discord White on Discord Main): WCAG AAA compliant
- **Muted Text** (Discord Gray on Discord Main): WCAG AA compliant
- **Purple Accent** (Discord Purple on Discord Main): WCAG AA compliant

### Focus States

Always include visible focus states for interactive elements:

```css
focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
```

---

## Examples

### Case Study Section

```tsx
<section className="bg-muted section-padding">
  <div className="container-padding">
    <div className="max-w-7xl mx-auto">
      {/* Badge */}
      <div className="inline-block px-4 py-1.5 bg-background border border-border rounded-full text-sm font-medium text-primary mb-4">
        Featured Case Study
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
        Headline with <span className="text-primary">Accent</span>
      </h2>

      {/* Button */}
      <button className="group inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-[#bf95f9]/20 text-[#bf95f9] font-semibold rounded-lg hover:bg-[#bf95f9]/10 hover:border-[#bf95f9]/40 transition-colors">
        View Full Case Study
        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</section>
```

---

## Quick Reference

### Color Cheat Sheet

| Use Case             | Token/Value                          |
| -------------------- | ------------------------------------ |
| Primary background   | `bg-background` or `#1D201F`         |
| Secondary background | `bg-muted` or `#0F0C29`              |
| Primary text         | `text-foreground` or `#E0D0C1`       |
| Muted text           | `text-muted-foreground` or `#B9BBBE` |
| Accent/CTA           | `text-primary` or `#bf95f9`          |
| Borders              | `border-border` or `#0F0C29`         |
| Buttons              | `border-[#bf95f9]/20 text-[#bf95f9]` |

### Spacing Cheat Sheet

| Use Case         | Value             |
| ---------------- | ----------------- |
| Tight spacing    | `space-2` (8px)   |
| Standard spacing | `space-4` (16px)  |
| Medium spacing   | `space-6` (24px)  |
| Large spacing    | `space-8` (32px)  |
| Section spacing  | `space-12` (48px) |

---

## Version History

- **v1.0** - Initial design system based on Discord-inspired palette
- Current implementation uses Tailwind CSS with custom design tokens

---

## Resources

- **Design System File**: `src/index.css`
- **Tailwind Config**: `tailwind.config.ts`
- **Copywriting Context**: `COPYWRITING_CONTEXT.md`

---

_Last Updated: 2024_
