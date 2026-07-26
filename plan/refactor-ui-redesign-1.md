---
goal: Full UI/UX Redesign of Wareng Jaya Teknik — "Steelworks" Industrial Design System
version: 1.0
date_created: 2026-07-26
last_updated: 2026-07-26
owner: teggar4ar
status: 'Planned'
tags: [design, refactor, ui, ux, accessibility, tailwind-v4]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

Redesign all 7 pages of the Wareng Jaya Teknik website (React 18 + Vite 7 + Tailwind CSS 4 + framer-motion) from a generic "AI blue SaaS" look into a distinctive **industrial workshop** identity: charcoal steel surfaces, safety-orange accent, bold condensed display typography, photography-led proof sections. The plan also eliminates fabricated content (contradictory stats, fake testimonials, placeholder team), fixes the conflicted dark-mode implementation, and resolves the accessibility failures found in the audit.

**Design DNA (locked — all phases reference this):**

| Token | Light mode | Dark mode |
|---|---|---|
| `--color-paper` | `oklch(96% 0.005 75)` warm steel-white | `oklch(21% 0.01 260)` charcoal |
| `--color-ink` | `oklch(24% 0.01 260)` | `oklch(93% 0.005 75)` |
| `--color-ink-muted` | `oklch(45% 0.01 260)` | `oklch(72% 0.008 260)` |
| `--color-accent` | `oklch(62% 0.19 40)` safety orange (≈ #EA580C) | `oklch(70% 0.18 45)` lifted orange |
| `--color-accent-ink` | `oklch(99% 0 0)` | `oklch(15% 0.01 260)` |
| `--color-surface` | `oklch(99% 0.002 75)` | `oklch(26% 0.012 260)` |
| `--color-line` | `oklch(88% 0.005 75)` | `oklch(32% 0.01 260)` |
| `--color-wa` | `oklch(56% 0.15 150)` WhatsApp green | same |

- Display font: **Oswald** (500/600/700, uppercase headings, tight tracking) — condensed industrial, supports Indonesian text (Bebas Neue rejected: no lowercase).
- Body font: **Inter** (400/500/600/700).
- Label/stat font: **JetBrains Mono** (400/500) — section labels, numbers, breadcrumbs.
- Radius: `2px` (buttons, inputs) / `4px` (cards). No `rounded-full` pills except WhatsApp FAB. No glassmorphism, no gradient text, no emoji icons.
- Signature moves: hairline `1px` borders instead of `shadow-lg`; numbered section labels (`01 — LAYANAN`) in mono; clipped-corner accent on primary CTAs (`clip-path` notch); full-bleed photo strips; safety-stripe divider (repeating 45° accent/transparent linear-gradient, 4px tall) as the only decorative flourish.
- Motion: max 3 primitives — fade-up on scroll (once, 350ms ease-out), hover lift 2px on cards, press scale 0.98 on buttons. All gated behind `prefers-reduced-motion`.
- Nav archetype: N6 masthead (wordmark left, uppercase mono links right, hairline bottom border, solid paper background — no blur). Footer archetype: Ft5 statement (big Oswald wordmark + contact block + service-area list; kills the SVG wave + 4-col + dead newsletter form).

## 1. Requirements & Constraints

- **REQ-001**: All colors and fonts must be consumed via CSS custom properties defined once in `src/index.css` using Tailwind v4 `@theme` syntax. No raw hex/oklch values inside components.
- **REQ-002**: Dark mode must use a single mechanism: Tailwind v4 `@custom-variant dark (&:where(.dark, .dark *))` driven by the existing `ThemeContext` toggling a `.dark` class on `<html>`. All `${isDark ? … : …}` ternaries for colors are removed from JSX.
- **REQ-003**: No fabricated content may ship: remove invented stats (500+/250 projects, 350+/120 clients, 15+/13 years, 15 awards), the 3 fake testimonials, the ISO-9001 timeline claim, and the placeholder team section. Sections that need real data render real project photography instead, or are omitted.
- **REQ-004**: All emoji icons replaced with `react-icons` SVG components (already a dependency).
- **REQ-005**: Every interactive element has visible `:focus-visible` styling; no `focus:outline-none` without replacement.
- **REQ-006**: Gallery lightbox must be keyboard-operable (cards become `<button>` elements).
- **REQ-007**: All framer-motion and CSS animations gated by `prefers-reduced-motion` (use framer-motion `useReducedMotion` or a shared `MotionSection` wrapper).
- **REQ-008**: Text contrast ≥ 4.5:1 in both themes (notably fix `text-gray-600` subtitles rendered on dark backgrounds).
- **REQ-009**: Body text ≥ 16px; touch targets ≥ 44×44px; no horizontal scroll at 320/375/414/768px.
- **REQ-010**: Existing routes, SEO components (`SEO.jsx`, `StructuredData.jsx`, sitemap/blog generation scripts), and analytics remain functionally untouched.
- **SEC-001**: No new third-party scripts. Fonts self-hosted via `@fontsource` packages (no Google Fonts CDN request, better for privacy + performance).
- **CON-001**: Stack is fixed: React 18, Vite 7, Tailwind CSS v4 (CSS-first config), framer-motion, react-icons. No component library added.
- **CON-002**: `src/data/blogPosts.js` is auto-generated — never edit; blog styling changes go in page components only.
- **CON-003**: `tailwind.config.js` is legacy (Tailwind v4 uses CSS config); `darkMode: 'class'` there has no effect on v4 — the `@custom-variant` in CSS is the real mechanism.
- **GUD-001**: One primary CTA per screen (WhatsApp contact); secondary actions visually subordinate (outline/ghost).
- **GUD-002**: Max 2 font families + 1 mono; headings always roman (no italics), uppercase Oswald.
- **GUD-003**: Spacing on a 4px scale; section vertical rhythm `py-16 md:py-24`; container `max-w-6xl`.
- **PAT-001**: Shared UI primitives live in `src/components/ui/` (Button, Card, SectionHeading, Container, Stripe) and are the only place button/card markup is defined — pages compose primitives.
- **PAT-002**: Animation wrapper pattern: a single `Reveal.jsx` component encapsulates `whileInView` fade-up + reduced-motion handling; pages never write raw `motion.div` scroll animations.

## 2. Implementation Steps

### Implementation Phase 1 — Foundation: tokens, fonts, dark mode

- GOAL-001: Establish the Steelworks design system so every later phase consumes tokens, and dark mode works via one mechanism.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Install fonts: `npm i @fontsource/oswald @fontsource/inter @fontsource/jetbrains-mono`. Import weight files (Oswald 500,600,700; Inter 400,500,600,700; JetBrains Mono 400,500) at top of `src/main.jsx`. Used `latin-*` subset imports to avoid shipping cyrillic/greek/vietnamese woff files. | ✅ | 2026-07-26 |
| TASK-002 | Rewrite `src/index.css`: keep `@import "tailwindcss"`, add `@custom-variant dark (&:where(.dark, .dark *));`, add `@theme` block defining all DNA tokens from the table above as `--color-*` plus `--font-display: "Oswald", sans-serif`, `--font-sans: "Inter", sans-serif`, `--font-mono: "JetBrains Mono", monospace`, `--radius-btn: 2px`, `--radius-card: 4px`. Add base layer: `html { overflow-x: clip }`, body defaults (`bg-paper text-ink font-sans antialiased`), global `:focus-visible` ring (2px accent offset 2px), `@media (prefers-reduced-motion: reduce)` kill-switch for CSS animations, and the `.stripe` safety-stripe utility (repeating-linear-gradient 45°, height 4px). Dark mode implemented by re-declaring token values under `.dark` (single token set — components never need `dark:` color variants for the core palette). | ✅ | 2026-07-26 |
| TASK-003 | Delete Vite starter boilerplate `src/App.css` and its import in `src/App.jsx` (verify nothing else imports it). Delete unused `src/assets/react.svg`. Verified: no file imported `App.css` (import already absent from `App.jsx`); both files deleted. | ✅ | 2026-07-26 |
| TASK-004 | Verify `src/contexts/ThemeContext.jsx` toggles the `dark` class on `document.documentElement` (add if missing) and persists to localStorage; remove any duplicated theme state elsewhere. `tailwind.config.js`: leave file in place but note it is inert under v4 (or delete `theme`/`darkMode` keys to avoid confusion). Done: ThemeContext already toggled `.dark` on `<html>` + persisted; refactored to lazy `useState` initializer (reads localStorage synchronously, no light-mode flash, safe try/catch). No duplicated theme state found. `tailwind.config.js`: removed inert `darkMode`/`theme`/`plugins` keys, added comment marking it inert under v4. | ✅ | 2026-07-26 |
| TASK-005 | Create UI primitives in `src/components/ui/`: `Container.jsx` (max-w-6xl px-4 md:px-6), `Button.jsx` (variants: `primary` accent bg + clipped corner + press scale, `outline`, `whatsapp`; sizes md/lg; min-h-11; renders `<a>` or `<button>`), `Card.jsx` (surface bg, 1px line border, radius-card, optional hover-lift), `SectionHeading.jsx` (mono numbered label `01 — LABEL` + Oswald uppercase h2, left-aligned by default, replaces the blue-underline `after:` gimmick), `Reveal.jsx` (framer-motion whileInView fade-up 350ms, `viewport={{ once: true }}`, respects `useReducedMotion`). Button also supports `to` prop (react-router `Link`); press-scale disabled under reduced motion. | ✅ | 2026-07-26 |
| TASK-006 | Add missing fallback assets referenced in code: create `public/images/fallback-hero.jpg` (copy of `hero-new.webp`) or change the two `onError` references (`src/pages/HomePage.jsx:55`, `:429`) to existing `placeholder.svg`. Fix broken `border-primary` class in `src/components/LoadingSpinner.jsx:6` to `border-accent`. Chose the reference fix: both `onError` handlers now point to existing `/images/placeholder.svg`; spinner uses `border-accent`. | ✅ | 2026-07-26 |

### Implementation Phase 2 — Global chrome: Header, Footer, WhatsApp FAB

- GOAL-002: Replace generic chrome with the masthead nav (N6) and statement footer (Ft5), fully tokenized and accessible.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-007 | Rewrite `src/components/Header.jsx`: solid `bg-paper` masthead with hairline `border-b border-line` (no translucent/blur), Oswald uppercase wordmark "WARENG JAYA TEKNIK" left, mono uppercase nav links right with active state = accent text + 2px accent underline (keep existing `aria-current`), ThemeToggle, mobile: full-width slide-down panel with large tap targets (min-h-11), hamburger button gets `aria-expanded` + visible focus ring (remove `focus:outline-none` at Header.jsx:68). Replace all `isDark` ternaries with `dark:` variants. | | |
| TASK-008 | Rewrite `src/components/Footer.jsx` as Ft5 statement footer: remove SVG wave (Footer.jsx:40-50), remove dead newsletter form (Footer.jsx:142-150). New structure: safety-stripe top divider; oversized Oswald wordmark; three columns collapsing to stacked mobile — contact block (address Tajurhalang/Bogor, phone as `tel:` link, WA link, hours), nav links, service-area list ("Melayani: Tajurhalang · Bojonggede · Cibinong · Depok …" from real blog content); mono copyright line. All tokens, `dark:` variants. | | |
| TASK-009 | Restyle `src/components/WhatsAppButton.jsx`: keep fixed FAB (this is the one allowed `rounded-full`), `bg-wa` token, remove infinite pulse animation (replace with one subtle scale-in on mount, reduced-motion aware), ensure 56px size, `aria-label="Chat via WhatsApp"`, focus-visible ring. | | |
| TASK-010 | Restyle `src/components/ThemeToggle.jsx`, `src/components/Breadcrumbs.jsx` (mono font, `/` separators, token colors), and `src/components/LoadingSpinner.jsx` (accent spinner on paper bg) to tokens. | | |

### Implementation Phase 3 — HomePage restructure

- GOAL-003: Rebuild the homepage from the generic "hero → stats → 3-cards → testimonials → CTA band" rhythm into a proof-led industrial structure with honest content.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-011 | Rewrite hero in `src/pages/HomePage.jsx`: split layout (not centered) — left: mono kicker `BENGKEL LAS — TAJURHALANG, BOGOR`, Oswald uppercase headline (2 lines max, e.g. "LAS, KANOPI & KONSTRUKSI BAJA" — real services, no slogans), one short subline, primary WA Button + outline "Lihat Hasil Kerja" → `/gallery`; right: `hero-new.webp` photo, hard-edge crop with thin accent border offset. Remove: glassmorphism card, emoji icons (⏱️🏆✓📅💰 at HomePage.jsx:133-137), scroll-indicator bounce, "sejak 2005" claim, dual-gradient overlay. | | |
| TASK-012 | Replace stats strip (HomePage.jsx:179-219) with a services marquee band: dark `bg-ink` strip listing real services in Oswald uppercase separated by accent dots (Kanopi · Pagar · Teralis · Railing · Konstruksi Baja · Pintu Besi) — static, no invented numbers. | | |
| TASK-013 | Services section: keep 6 real services but render as a 2-col (md:3-col) grid of bordered `Card`s with react-icons (e.g. `GiWeldingMask`-style from `react-icons/gi` or `LuHammer` from `lucide` set in react-icons), mono index number `01`–`06` per card, `SectionHeading` label `01 — LAYANAN`. Each card links to `/services`. | | |
| TASK-014 | Featured-work section: full-bleed 3-up photo strip using real `project-*.webp` images with visible captions (real project type + location where known from blog content), NOT hover-only captions; link to `/gallery`. `SectionHeading` `02 — HASIL KERJA`. | | |
| TASK-015 | Delete testimonials section (HomePage.jsx:379-449) entirely per REQ-003. In its place: "Cara Kerja" 3-step process row (Survei & Ukur → Penawaran → Pengerjaan & Garansi) — real process, numbered in mono, no cards, hairline connectors. | | |
| TASK-016 | Final CTA: replace blue band (HomePage.jsx:452-480) with dark `bg-ink` section, Oswald headline "PUNYA PROYEK? DISKUSIKAN GRATIS.", WA primary button + `tel:` outline button, safety-stripe divider above. Wrap all sections in `Reveal`, remove per-page motion boilerplate. | | |

### Implementation Phase 4 — Inner pages (Services, About, Gallery, Contact)

- GOAL-004: Break the copy-pasted 60vh-gradient-hero template; give each page a distinct but system-consistent structure; purge fake content.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-017 | `src/pages/ServicesPage.jsx`: replace hero with compact page header (mono breadcrumb/kicker + Oswald h1 on paper, no bg image). Services as alternating full-width rows (image left/right zigzag) with real photos per service, spec-sheet style detail list (material options, finish) in mono, per-service WA deep-link button with prefilled message. Delete the `<style jsx global>` IntersectionObserver system (ServicesPage.jsx:95-112, 315-324) — use `Reveal`. | | |
| TASK-018 | `src/pages/AboutUsPage.jsx`: same compact header pattern. Remove: count-up stats hook + invented numbers (AboutUsPage.jsx:8-39), awards claim, ISO timeline entry, placeholder team section with worker.svg + dead social links (AboutUsPage.jsx:213-222). Keep/rewrite: honest workshop story, real photos (`bengkel-bojonggede.webp`, `welding.webp`), "Cara kami bekerja" values list, service-area map/list. Delete its `<style jsx global>` block too. | | |
| TASK-019 | `src/pages/ProjectGalleryPage.jsx`: compact header; filter buttons restyled as mono uppercase tabs with `aria-pressed`; convert clickable card `div`s (ProjectGalleryPage.jsx:254) to `<button>` with focus ring so lightbox is keyboard-operable; masonry-ish 2/3-col grid with visible mono captions; keep yet-another-react-lightbox. Remove "Sample project data" comment and dead data. | | |
| TASK-020 | `src/pages/ContactPage.jsx`: two-column layout — left: contact channels as bordered rows (WA primary, phone, address with embedded map link, hours) replacing the multicolor icon chips (ContactPage.jsx:91-122); right: form restyled with tokens, visible labels, `:focus-visible` rings, inline validation on blur, submit routes to WhatsApp deep link with prefilled message from form fields (replaces dead `console.log`/`alert()` at ContactPage.jsx:23-29) and shows inline success state (`aria-live="polite"`). FAQ accordion gets `aria-expanded`/`aria-controls`. | | |

### Implementation Phase 5 — Blog pages + final QA

- GOAL-005: Align blog with the system, then verify accessibility, responsiveness, and build health across the site.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-021 | `src/pages/BlogPage.jsx`: editorial list layout — featured post large, rest as horizontal rows (thumb + mono date + Oswald title + excerpt); category chips mono uppercase; remove dead newsletter block; tokens + `dark:` variants; search input keeps focus ring. | | |
| TASK-022 | `src/pages/BlogPostPage.jsx`: readable article layout — measure `max-w-[65ch]`, 18px body, `prose`-style headings in Oswald, mono meta row, accent link underlines; replace `alert()` clipboard feedback (BlogPostPage.jsx:510) with inline "Tersalin" state + `aria-live`; related-posts row using Card primitive. | | |
| TASK-023 | Sweep: remove every remaining `isDark`/`theme === 'dark'` color ternary in `src/` (grep `isDark`), remove remaining raw Tailwind palette colors (`blue-600`, `gray-800`, etc.) in favor of tokens, remove all `<style jsx` blocks, ensure decorative icons have `aria-hidden`. | | |
| TASK-024 | QA pass: `npm run lint` clean; `npm run build` + `npm run preview`; manually verify 320/375/414/768/1024px widths (no horizontal scroll, no two-line buttons), both themes (contrast spot-check hero, muted text, borders), keyboard-only walkthrough (nav → gallery lightbox → contact form → FAQ), `prefers-reduced-motion` emulation shows no scroll/infinite animations. | | |
| TASK-025 | Update `README.md` feature list (remove claims no longer true, e.g. testimonials), and check off completed items in `SARAN_PENGEMBANGAN.md` (alt-text audit P2, form labels P3, gallery detail P3). | | |

## 3. Alternatives

- **ALT-001**: Light-first "Trust & Authority" grey/orange corporate look (ui-ux-pro-max engine's default suggestion) — rejected by user in favor of the more distinctive industrial-workshop direction; safety orange is retained from that recommendation.
- **ALT-002**: Keep testimonials/stats as marked placeholders — rejected; Hallmark honest-copy rule and user chose removal, replacing social proof with real project photography.
- **ALT-003**: Google Fonts CDN instead of `@fontsource` — rejected: extra third-party request, FOUT control is worse, self-hosting is trivial with Vite.
- **ALT-004**: Adopt shadcn/ui or another component library — rejected: 7-page marketing site, 5 small primitives suffice; avoids bundle growth and a generic component look.
- **ALT-005**: Migrate dark mode to `prefers-color-scheme` only — rejected: existing ThemeToggle UX is worth keeping; class-strategy via `@custom-variant` preserves it.

## 4. Dependencies

- **DEP-001**: New npm packages: `@fontsource/oswald`, `@fontsource/inter`, `@fontsource/jetbrains-mono` (Phase 1, TASK-001).
- **DEP-002**: Existing: `react-icons` (icon replacement), `framer-motion` (Reveal), `yet-another-react-lightbox` (gallery) — no version changes.
- **DEP-003**: Real content inputs from owner (optional, non-blocking): actual founding year, real project captions/locations, business hours. Sections are designed to render without them.

## 5. Files

- **FILE-001**: `src/index.css` — @theme tokens, dark variant, base styles, stripe utility (TASK-002).
- **FILE-002**: `src/main.jsx` — font imports (TASK-001).
- **FILE-003**: `src/App.jsx` — drop App.css import (TASK-003).
- **FILE-004**: `src/App.css`, `src/assets/react.svg` — deleted (TASK-003). **Deletion requires no further approval; listed here per plan contract.**
- **FILE-005**: `src/components/ui/{Container,Button,Card,SectionHeading,Reveal}.jsx` — new primitives (TASK-005).
- **FILE-006**: `src/components/{Header,Footer,WhatsAppButton,ThemeToggle,Breadcrumbs,LoadingSpinner}.jsx` — rewritten/restyled (Phase 2).
- **FILE-007**: `src/pages/{HomePage,ServicesPage,AboutUsPage,ProjectGalleryPage,ContactPage,BlogPage,BlogPostPage}.jsx` — rewritten (Phases 3–5).
- **FILE-008**: `src/contexts/ThemeContext.jsx` — verify/adjust `.dark` class handling (TASK-004).
- **FILE-009**: `tailwind.config.js` — trim inert v3 keys (TASK-004).
- **FILE-010**: `public/images/fallback-hero.jpg` (or reference fix) (TASK-006).
- **FILE-011**: `README.md`, `SARAN_PENGEMBANGAN.md` — doc updates (TASK-025).
- **FILE-012**: Untouched: `src/data/blogPosts.js` (generated), `scripts/*`, `src/components/{SEO,StructuredData,AnalyticsTracker,ScrollToTop,SchemaDebug}.jsx`, `content/blog/*`.

## 6. Testing

- **TEST-001**: `npm run lint` passes with zero errors after each phase.
- **TEST-002**: `npm run build` succeeds and `npm run preview` renders all 7 routes without console errors (including the removed `<style jsx>` warnings being gone).
- **TEST-003**: Responsive check at 320/375/414/768/1024/1440px: no horizontal scroll, nav usable, no two-line buttons, grids collapse correctly.
- **TEST-004**: Theme check: toggle light/dark on every page; verify muted-text contrast ≥ 4.5:1 (spot-check with devtools contrast inspector); no leftover `isDark` ternaries (`grep -r "isDark" src/` returns only ThemeContext/Toggle logic).
- **TEST-005**: Keyboard walkthrough: Tab order logical; visible focus on nav, buttons, gallery cards, form fields, FAQ; lightbox opens/closes via keyboard; Escape closes mobile menu.
- **TEST-006**: Reduced-motion emulation (devtools): no scroll-reveal translation, no infinite pulse/bounce anywhere.
- **TEST-007**: Content honesty grep: `grep -rE "500\+|350\+|250\+|15\+ [Tt]ahun|ISO|testimoni" src/pages src/components` returns no fabricated claims.
- **TEST-008**: SEO regression: `SEO`/`StructuredData` still render meta tags per page (inspect `<head>` in preview); sitemap script still runs in `npm run build`.

## 7. Risks & Assumptions

- **RISK-001**: Tailwind v4 CSS-first `@theme`/`@custom-variant` syntax differs from v3 habits; a wrong variant definition silently breaks dark mode. Mitigation: TASK-002 verified in isolation before Phase 2 starts.
- **RISK-002**: Removing testimonials/stats may temporarily reduce perceived social proof. Mitigation: proof is transferred to real project photography and process transparency; owner can supply real testimonials later (DEP-003).
- **RISK-003**: Oswald uppercase headlines in Indonesian can run long and wrap badly on 320px. Mitigation: `text-balance`, `overflow-wrap: anywhere` on display headings, headline copy kept ≤ 5 words per line.
- **RISK-004**: Heavy page rewrites risk breaking SEO structured data embedded in pages. Mitigation: TEST-008; SEO components are explicitly out of scope for edits (FILE-012).
- **ASSUMPTION-001**: Existing photos in `public/images` are real project photos owned by the business and sufficient for the proof-led sections.
- **ASSUMPTION-002**: WhatsApp number currently used in `WhatsAppButton.jsx`/pages is correct and remains the primary conversion channel.
- **ASSUMPTION-003**: `ThemeContext` already writes the `dark` class to `<html>` (Breadcrumbs' `dark:` variants currently working suggests it does); TASK-004 verifies.

## 8. Related Specifications / Further Reading

- `SARAN_PENGEMBANGAN.md` — existing improvement backlog (alt-text, internal linking items remain valid alongside this plan)
- `SCHEMA_GUIDE.md` — structured-data rules to preserve during page rewrites
- [Tailwind CSS v4 theme variables](https://tailwindcss.com/docs/theme) · [dark mode `@custom-variant`](https://tailwindcss.com/docs/dark-mode)
- [Fontsource](https://fontsource.org/) — self-hosted font packages
