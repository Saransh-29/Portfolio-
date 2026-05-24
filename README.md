# 🚀 Portfolio — Phase 1 Complete

Futuristic, cinematic personal portfolio built with Next.js 14, Framer Motion, and Tailwind CSS.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:3000
```

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          ← Design tokens, animations, base styles
│   ├── layout.tsx           ← Root layout (fonts + providers)
│   └── page.tsx             ← Main page
│
├── components/
│   ├── canvas/
│   │   └── ParticleBackground.tsx  ← Mouse-reactive canvas particles
│   ├── layout/
│   │   └── Navbar.tsx              ← Floating glassmorphism nav
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx ← Lenis smooth scroll
│   ├── sections/
│   │   └── Hero.tsx                ← Hero section (Phase 1)
│   └── ui/
│       ├── CustomCursor.tsx        ← Magnetic cursor
│       └── GlowButton.tsx          ← Reusable CTA button
│
├── lib/
│   └── utils.ts                    ← cn(), lerp, easing helpers
│
├── types/
│   └── index.ts                    ← Shared TypeScript interfaces
│
├── public/
│   └── resume.pdf                  ← Add your resume here!
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

---

## Personalisation Checklist

| Item | Location |
|------|----------|
| Your name | `components/sections/Hero.tsx` → hero-name |
| Your roles | `components/sections/Hero.tsx` → ROLES array |
| Your tagline | `components/sections/Hero.tsx` → `<p>` element |
| Your stats | `components/sections/Hero.tsx` → STATS array |
| Nav initials | `components/layout/Navbar.tsx` → `YN.` |
| Resume PDF | `public/resume.pdf` |
| Page title | `app/layout.tsx` → metadata |

---

## Tech Stack

| Package | Purpose |
|---------|---------|
| Next.js 14 | App Router, SSR |
| Framer Motion | Animations & transitions |
| Lenis | Smooth scrolling |
| Tailwind CSS | Utility styling |
| TypeScript | Type safety |
| Three.js / R3F | 3D elements (Phase 2) |
| GSAP | Complex animations (Phase 3+) |

---

## Phase Roadmap

- [x] **Phase 1** — Foundation, Hero, Navbar, Particles, Cursor
- [ ] **Phase 2** — About, Tech Stack, 3D scene (Three.js)
- [ ] **Phase 3** — Skills grid, interactive cards
- [ ] **Phase 4** — Projects showcase with filters
- [ ] **Phase 5** — Experience timeline, Achievements
- [ ] **Phase 6** — Contact form, social links
- [ ] **Phase 7** — Performance, SEO, deployment

---

## Performance Notes

- Particle count auto-scales with screen size
- Canvas uses `requestAnimationFrame` with cleanup
- Lenis smooth scroll is RAF-driven
- All heavy components are client-only (`'use client'`)
- Fonts loaded via `next/font` (zero CLS)
