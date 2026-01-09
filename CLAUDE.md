# Cortivo AI Website - Design System

This document provides all design system context for AI-assisted development on this codebase.

## Design Philosophy

**Basement.studio-inspired brutalist design** with industrial aesthetics. The core principles are:

- **Sharp corners everywhere** - No border-radius on any element
- **Solid colors** - No gradients or glassmorphism
- **Industrial feel** - Clean, utilitarian, no unnecessary decoration
- **High contrast** - Dark backgrounds with bright accents

---

## Color Palette

All colors are defined as CSS variables in `src/app/globals.css`:

| Variable | Hex Value | Usage |
|----------|-----------|-------|
| `--accent-primary` | `#FF4D00` | Primary orange accent (CTAs, highlights, active states) |
| `--accent-secondary` | `#FF6B2E` | Secondary orange for hover states |
| `--background` | `#000000` | Page background |
| `--foreground` | `#E6E6E6` | Primary text color |
| `--text-secondary` | `#C4C4C4` | Secondary text |
| `--text-muted` | `#757575` | Muted/tertiary text |
| `--border-light` | `#2E2E2E` | Border color for cards, dividers |

---

## Typography

### Font Families

- **Geist Sans** (`--font-geist-sans`) - Primary font for all text
- **Geist Mono** (`--font-geist-mono`) - Code and monospace elements

### Type Scale

| Class | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `text-f-h1` | 4.5rem (72px) | 1 | -0.04em | 600 |
| `text-f-h1-mobile` | 2.5rem (40px) | 1.1 | -0.04em | 600 |
| `text-f-h2` | 3rem (48px) | 1.1 | -0.04em | 600 |
| `text-f-h2-mobile` | 1.75rem (28px) | 1.2 | -0.02em | 600 |
| `text-f-h3` | 1.5rem (24px) | 1.3 | -0.02em | 600 |
| `text-f-h3-mobile` | 1.125rem (18px) | 1.3 | -0.02em | 600 |
| `text-f-p` | 0.875rem (14px) | 1.6 | 0 | 600 |
| `text-f-p-mobile` | 0.75rem (12px) | 1.6 | 0 | 600 |

### Typography Rules

- Headlines use tight negative letter-spacing (`-0.04em` to `-0.02em`)
- Body text uses normal letter-spacing
- All text is semi-bold (`font-weight: 600`)
- Uppercase text uses `tracking-widest` (0.1em)

---

## Components

### Cards (`.card`)

```css
.card {
  background: transparent;
  border: 1px solid var(--border-light);
  border-radius: 0; /* CRITICAL: Always sharp corners */
  position: relative;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.card:hover {
  border-color: var(--accent-primary);
  background: rgba(255, 77, 0, 0.02);
}
```

Usage: Apply to any container that needs a bordered card appearance.

### Section Labels (`.section-label`)

```css
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
  background: rgba(255, 77, 0, 0.1);
  border-radius: 0; /* CRITICAL: Always sharp corners */
}
```

Usage: Section headers like "OUR SERVICES", "PROCESS", "FAQ", etc.

### Logo Text (`.logo-text`)

```css
.logo-text {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--foreground);
}
```

Usage: "Cortivo AI" text next to logo in navbar and footer.

### Buttons

**Primary CTA:**
```html
<button class="px-6 py-3 bg-[#FF4D00] text-black font-semibold">
  Button Text
</button>
```

**Secondary/Outline:**
```html
<button class="px-4 py-2 border border-[#2E2E2E] hover:border-[#FF4D00] text-[#E6E6E6]">
  Button Text
</button>
```

### Actionable Links (`.actionable`)

```css
.actionable {
  position: relative;
  text-decoration: none;
  transition: color 0.15s ease;
}

.actionable::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.2s ease;
}

.actionable:hover::after {
  transform: scaleX(1);
  transform-origin: left;
  animation: blink 0.3s ease-in-out;
}
```

Usage: Navigation links, text links that should have underline-on-hover effect.

---

## Layout & Spacing

### Container

```html
<div class="max-w-7xl mx-auto px-6 lg:px-10">
  <!-- Content -->
</div>
```

### Section Spacing

- Section padding: `py-24` (96px vertical)
- Mobile section padding: `py-16` (64px vertical)
- Content gaps: `gap-12` to `gap-16`

### Grid Patterns

```html
<!-- 2-column grid -->
<div class="grid md:grid-cols-2 gap-8">

<!-- 3-column grid -->
<div class="grid md:grid-cols-3 gap-8">

<!-- 4-column grid -->
<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
```

---

## Effects & Patterns

### Diagonal Lines Background

```css
.with-diagonal-lines::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 1px,
    rgba(255, 77, 0, 0.03) 1px,
    rgba(255, 77, 0, 0.03) 2px
  );
  background-size: 8px 8px;
  pointer-events: none;
}
```

### Corner Borders

```css
.with-corner-borders::before,
.with-corner-borders::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid var(--accent-primary);
  pointer-events: none;
}
```

### Blink Animation

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

---

## Critical Rules

### NEVER use:

1. **Rounded corners** - All elements must have `border-radius: 0`
2. **Gradient backgrounds** - Use solid colors only
3. **Glassmorphism/blur effects** - No `backdrop-filter` or blur
4. **Box shadows** - Use borders instead
5. **Generic fonts** - Always use Geist Sans/Mono

### ALWAYS:

1. Set `border-radius: 0` explicitly on cards, buttons, inputs
2. Use the defined color variables
3. Apply tight letter-spacing on headlines
4. Use `font-weight: 600` for text
5. Apply hover states that change border color to accent orange

---

## File Structure

```
src/
├── app/
│   ├── globals.css      # All CSS variables and base styles
│   ├── layout.tsx       # Root layout with Geist fonts
│   └── page.tsx         # Main page composition
├── components/
│   ├── Navbar.tsx       # Fixed navigation
│   ├── Hero.tsx         # Hero section with Spline 3D
│   ├── Clients.tsx      # Logo carousel
│   ├── Services.tsx     # Services grid
│   ├── Process.tsx      # Process steps
│   ├── Team.tsx         # Team section
│   ├── Testimonials.tsx # Testimonials carousel
│   ├── FAQ.tsx          # Accordion FAQ
│   ├── CTA.tsx          # Call-to-action section
│   ├── Footer.tsx       # Site footer
│   └── AudioPlayer.tsx  # Background audio control
└── images/              # Static image assets
```

---

## Common Patterns

### Section Structure

```tsx
<section className="py-24 border-t border-[#2E2E2E]">
  <div className="max-w-7xl mx-auto px-6 lg:px-10">
    {/* Section Label */}
    <div className="text-center mb-16">
      <span className="section-label">Section Title</span>
      <h2 className="text-f-h2-mobile md:text-f-h2 mt-6">
        Headline Text
      </h2>
    </div>

    {/* Content Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      {/* Cards */}
    </div>
  </div>
</section>
```

### Card with Hover Effect

```tsx
<div className="card p-6 md:p-8 hover:border-[#FF4D00] transition-colors">
  <h3 className="text-f-h3-mobile md:text-f-h3 mb-4">Title</h3>
  <p className="text-[#757575] text-f-p">Description</p>
</div>
```

### Loading Indicator (Square Spinner)

```tsx
<div className="w-12 h-12 border-2 border-[#2E2E2E] border-t-[#FF4D00] animate-spin" />
```

Note: No `rounded-full` - spinner is square to match design system.

---

## Dependencies

- **Next.js 15** - React framework
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **@splinetool/react-spline** - 3D scene in hero
