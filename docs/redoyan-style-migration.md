# Architecture & Design Specification: Redoyan-Style Portfolio Migration

**Reference Source:** [https://www.redoyanulhaque.me/](https://www.redoyanulhaque.me/)  
**Target Project:** `duch-panhathun-portfolio` (Duch Panhathun)  
**Status:** Specification Complete for T2 (Architecture), T3 (UI Design), and T4 (QA Verification)  

---

## 1. Executive Summary & Reference Analysis

An extensive reverse-engineering audit of `https://www.redoyanulhaque.me/` was conducted across its production bundles (`index-DOsxpt_m.js`, `MainContainer-CNANTDSP.js`, `Navbar-CBrEUVVF.js`, `config-DAcyC9gd.js`, `MyWorks-D-9Nr59e.js`, `Play-xPN_xUXd.js`, `MainContainer-HGT2vxzP.css`, and `react-three-BdgxNMf0.js`).

The reference website embodies a **dark, high-craft creative-developer aesthetic** characterized by:
1. **Deep Obsidian & Soft Lavender Visual Identity:** A pitch-black/dark violet base (`#0b080c`) illuminated by a signature soft electric lavender accent (`#c2a4ff`), secondary violet glow (`#a87cff`), and delicate off-white text (`#eae5ec`).
2. **Kinetic Typography:** Split-character and split-line staggered animations powered by GSAP and SplitType, using uppercase tracking, giant display headings (80px), and alternating rolling titles in the hero.
3. **Smooth Scroll & Pinned Layout Dynamics:** Integrated Lenis smooth-scrolling engine coupled with GSAP ScrollTrigger for horizontal pinned card scrolling in the Work section.
4. **Interactive Micro-Interactions:** Custom fluid magnetic cursor follower (`cursor-main`) with magnetic snapping on interactive elements, magnetic floating social icons bar, and interactive dashed-border skill exploration panels.
5. **Atmospheric Depth:** Background video overlays (`techstack-video`), radial ambient glowing orbs behind the navigation bar, and decorative dashed SVG framing (`strokeDasharray: 7,7`).
6. **Dedicated Multi-Route Architecture:** Main landing page (`/`), an all-inclusive project catalog page (`/myworks`), and an interactive showcase sandbox (`/play`).

---

## 2. Design Tokens & Styling System

### 2.1 Color Palette

| Token Name | Hex / Value | Usage in Target UI |
| :--- | :--- | :--- |
| `--color-bg` / `--backgroundColor` | `#0b080c` | Primary canvas background (deep obsidian purple-black) |
| `--color-surface` | `#120e16` | Card backgrounds, panel backgrounds |
| `--color-surface-hover` | `#18131d` | Card hover state, interactive highlights |
| `--color-accent` / `--accentColor` | `#c2a4ff` | Primary brand accent (soft electric lavender) |
| `--color-accent-vibrant` | `#a87cff` | Secondary vibrant violet for glows, active states, ball bounce |
| `--color-ink` | `#eae5ec` | Primary typography color (soft lavender white) |
| `--color-ink-muted` | `#8e8794` | Subtitles, metadata, secondary descriptions |
| `--color-border` | `rgba(194, 164, 255, 0.12)` | Subtle container borders and dividers |
| `--color-border-strong` | `rgba(194, 164, 255, 0.28)` | Hover borders, active outlines |
| `--color-accent-glow` | `rgba(194, 164, 255, 0.10)` | Radial gradient lighting, backdrop bloom |

### 2.2 Typography & Sizing

- **Font Family:** `Geist, sans-serif` for primary sans-serif display and body, with `Geist_Mono` for mono accents.
- **Font Weights:** `300` (light accent details), `400` (body copy, subtitles), `500` / `600` (headings, badges), `700` (display titles).
- **Display Typography:**
  - Hero H1: `clamp(2.75rem, 8vw, 6.5rem)` with uppercase letter spacing and line breaks.
  - Section Titles (`h2`): `80px` on desktop (scale down to `40px` on mobile `<= 900px`), uppercase tracking.
  - Card Headings (`h3`, `h4`): `18px` to `24px` uppercase with `2px` to `4px` letter spacing.
- **Rendering Optimizations:** `font-kerning: normal`, `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`.

### 2.3 Containers & Layout Grid

- `--cWidth`: `94%` on desktop (`>= 768px`), `calc(100% - 30px)` on mobile.
- `--cMaxWidth`: `1920px`.
- `.section-container` stepped widths:
  - `> 1600px`: `1300px`
  - `1400px - 1600px`: `1200px` (max-width `calc(100% - 160px)`)
  - `900px - 1400px`: `900px`
  - `<= 900px`: `500px` / `var(--cWidth)`
- Responsive Viewport Unit: `--vh: 100svh`.

### 2.4 Decorative & Atmospheric Accents

- **Dashed SVG Borders:** `strokeDasharray: "7,7"` (vertical) and `strokeDasharray: "6,6"` (horizontal) with subtle opacity `rgba(255,255,255,0.2)`.
- **What Corner Crosshairs:** 10x10px corner markers (`what-corner`) with absolute positioning on card boundaries.
- **Ambient Glowing Orbs:** Fixed blurred circles (`landing-circle1` at `top: -150px, left: -150px`, `landing-circle2` at `top: 20%, right: -100px`) with `filter: blur(60px)`.
- **Top Navigation Fade:** Fixed linear gradient (`linear-gradient(180deg, #0b080c 0%, transparent 100%)`) over the top 80px.

---

## 3. Component Hierarchy & Architectural Mappings

### 3.1 Layout Shell (`src/app/layout.tsx` & Layout Components)

| Reference Component | Current Codebase | Target Redoyan-Style Implementation |
| :--- | :--- | :--- |
| `header.header` | `src/components/layout/Header.tsx` | Fixed minimalist header (`h-20`, max-width `var(--cMaxWidth)`, width `var(--cWidth)`):<br/>- Left: Initials logo (`DP`) linking to `/#`<br/>- Center: Mailto direct link (`duchpanhathun@gmail.com`)<br/>- Right: Links (`ABOUT`, `WORK`, `EXPERIENCE`, `CONTACT`) with `HoverLink` vertical slide reveal animation. |
| `cursor-main` | *(None)* | `src/components/ui/CustomCursor.tsx`: Smooth RAF-interpolated cursor follower. Listens to `[data-cursor="disable"]` (fades out) and `[data-cursor="icons"]` (snaps and expands). Disabled on touch devices. |
| `icons-section` | *(None)* | `src/components/ui/SocialBar.tsx`: Floating left/right dock containing GitHub, LinkedIn, Twitter, Email icons with mouse proximity magnetic pull (`--siLeft`, `--siTop`) + floating pill `RESUME` button. |
| `loading-screen` | *(None)* | `src/components/ui/LoadingScreen.tsx`: Initial interactive loading gate with bouncing ball physics (`loaderGame`), percentage indicator, and seamless cubic-bezier scale expansion reveal. |
| `SmoothScroll` (Lenis) | Native CSS smooth scroll | Implement smooth scrolling wrapper (using `@studio-freight/lenis` or vanilla Lenis) connected to requestAnimationFrame and ScrollTrigger. |

---

### 3.2 Page Sections & Content Mappings (`src/app/page.tsx`)

#### 1. Hero / Landing Section (`#landingDiv`)
- **Reference Design:** `landing-section` with `landing-intro` ("Hello! I'm" + "DUCH <br/> <span>PANHATHUN</span>"), `landing-info` with rotating vertical titles ("AI / ML Engineer" <-> "Full-Stack Developer"), mobile photo container, and desktop 3D/particle interactive background canvas.
- **Current Section:** `src/components/sections/Hero.tsx` (static text with amber tags).
- **Target Migration:** Rewrite `Hero.tsx` to output the exact Redoyan layout: large uppercase typography, kinetic title roll, location badge, and mobile photo avatar (`/images/mypicnbg.png` or fallback portrait).

#### 2. About Me Section (`#about`)
- **Reference Design:** `about-section` with uppercase `h3.title` ("ABOUT ME") and large editorial paragraph `p.para` with SplitType line & word animation on scroll.
- **Current Section:** `src/components/sections/About.tsx` (4 long body paragraphs in prose style).
- **Target Migration:** Feature the strong opening summary in high-kerning typography (`text-2xl sm:text-3xl font-semibold leading-snug`), with expandable secondary detail or narrative accordions preserving Duch Panhathun's complete background and credentials.

#### 3. What I Do Section (`whatIDO`)
- **Reference Design:** Two interactive high-tech cards framed by dashed SVG lines (`what-border1`, `what-border2`) and corner accents (`what-corner`). Clicking/hovering expands one discipline while slightly dimming the sibling card (`what-content-active`, `what-sibling`).
  - Card 1: Primary Discipline: **AI & MACHINE LEARNING** (PyTorch, TensorFlow, LLMs, Computer Vision, Feature Engineering, Vector Search).
  - Card 2: Secondary Discipline: **FULL-STACK & PRODUCTION SYSTEMS** (Next.js, FastAPI, NestJS, TypeScript, AWS, Docker, Microservices, Payment Rails).
- **Current Section:** `src/components/sections/Skills.tsx` (static 6-category list).
- **Target Migration:** Build `src/components/sections/WhatIDo.tsx` to replicate this signature interactive component, mapping skills from `src/content/skills.ts` into the two specialized discipline cards.

#### 4. Career & Experience Section (`career-section`)
- **Reference Design:** `career-section` with header "My career <span>&</span><br/> experience", vertical glowing timeline rail (`career-timeline`), moving illuminated marker (`career-dot`), and `career-info-box` items displaying Role (`h4`), Company (`h5`), Year/Status (`h3`, e.g. "NOW", "2025"), and description.
- **Current Section:** `src/components/sections/Experience.tsx` (card grid backed by `DetailModal`).
- **Target Migration:** Redesign the visual layout of `Experience.tsx` into the Redoyan timeline rail aesthetic while retaining the click-to-open `DetailModal` interaction so users can still read in-depth architectural achievements and tech stacks.

#### 5. Work / Featured Projects Section (`#work`)
- **Reference Design:** Horizontal pinned scroll section using GSAP ScrollTrigger pinning (`work-section`). As user scrolls down, the cards slide horizontally (`work-flex`).
  - 5 Featured Project Cards (`work-box`):
    - Project index counter (`01`, `02`, ...)
    - Title and Category
    - "Tools and features" tech stack description
    - Large preview image (`work-image`) with hover-to-video / interaction preview
    - External link icon
  - Final Card (`work-box work-box-cta`):
    - "Want to see more? Explore all of my projects and creations" with "See All Works →" CTA button leading to `/myworks`.
- **Current Section:** `src/components/sections/Projects.tsx` and `OpenSource.tsx`.
- **Target Migration:** Build `src/components/sections/WorkSection.tsx` implementing the pinned horizontal scroll showcase for the top 5 featured projects (combining flagship professional work and open-source milestones like `thun-murex`), plus the CTA card linking to `/myworks`.

#### 6. Tech Stack Section (`techstack-new`)
- **Reference Design:** Dedicated dark atmospheric section with video background (`/video/video.webm` or dynamic particle canvas), `h2` "Tech Stack", and an **Inverted Pyramid Grid** (`techstack-pyramid`) descending in row count:
  - Row 1 (10-12 items): Languages & Core Web (Python, TypeScript, JavaScript, C++, Bash, HTML, CSS, React, Next.js, etc.)
  - Row 2 (8-10 items): Frameworks & ML (FastAPI, NestJS, PyTorch, TensorFlow, Scikit-learn, OpenCV, Node.js, Tailwind)
  - Row 3 (6-8 items): Cloud & Databases (AWS, Docker, PostgreSQL, MongoDB, Redis, Firebase)
  - Row 4 (4-6 items): Tooling & DevOps (Git, GitHub, Linux, Vercel, VS Code)
  - Row 5 (2-4 items): AI & Design (Hugging Face, OpenAI, Figma, Postman)
- **Current Section:** Simple text tags in `Skills.tsx`.
- **Target Migration:** Build `src/components/sections/TechStack.tsx` utilizing Devicon SVG icons in the inverted pyramid rows with hover tooltips and glow effects.

#### 7. Call To Action Section (`cta-section`)
- **Reference Design:** Centered action bar with two pill buttons: "Play With Me →" (`/play`) and "Hire Me →" (LinkedIn / Contact).
- **Target Migration:** Adapt to "Explore Projects / Play →" (`/myworks`) and "Hire Me / Get in Touch →" (`#contact`).

#### 8. Contact & Footer Section (`#contact`)
- **Reference Design:** `contact-section` with Developer's full name in giant typography, 3-column contact grid:
  - Column 1: Direct Email & City Location
  - Column 2: Social media links (GitHub, LinkedIn, Twitter, Telegram) with diagonal arrow icons
  - Column 3: "Designed and Developed by [Name]" and copyright year
- **Current Section:** `src/components/sections/Contact.tsx` & `Footer.tsx`.
- **Target Migration:** Align `Contact.tsx` with the clean 3-column editorial layout and subtle fade-in ScrollTrigger animation.

---

### 3.3 New Dedicated Route: `/myworks` (`src/app/myworks/page.tsx`)

In the reference site, clicking "See All Works" routes to `/myworks`, which features:
1. Header with "← Back to Home" button, `h1` "All Works", and subtitle.
2. Responsive multi-column card grid (`myworks-grid`):
   - Card number badge (`01`, `02`, ...)
   - Project preview image (`myworks-card-image`)
   - Title, Category (`myworks-card-category`), description, and tech stack tag line.
   - Click opens direct link or launches `DetailModal`.
3. Content sourcing: Combines both `projects` (CV client/company projects) and `openSourceProjects` (Thun Murex, 3D Preview Extension, etc.) from `src/content/`.

---

## 4. Content Schema Extensions (`src/content/types.ts` & Data Modules)

To power the Redoyan visual patterns without hardcoding, the following extensions to `src/content/` are specified:

### 4.1 Profile Extension (`profile.ts`)
- `displayRoles`: Array of rotating titles for the rolling hero text, e.g. `["AI / ML Engineer", "Full-Stack Developer", "Systems Architect"]`.
- `avatarImage`: Path to portrait photo (`/images/mypicnbg.png` or `/images/avatar.png`).
- `resumeUrl`: Link to CV/Resume for the floating resume button (`/cv.pdf`).

### 4.2 Projects Extension (`projects.ts` & `open-source.ts`)
- `category`: String classification (e.g. `"AI / Machine Learning"`, `"Production Web & ERP"`, `"Systems & Developer Tools"`).
- `featuredOrder`: Numerical order (`1..5`) for the horizontal scroll showcase.
- `video`: Optional preview clip for card hover playback.

### 4.3 Skills Pyramid Data (`skills.ts`)
- Export `techStackPyramid`: Array of rows where each item contains `{ name: string, icon: string, url: string }` utilizing Devicon CDN SVG assets to render the exact visual pyramid.

---

## 5. Technology Stack & Dependency Roadmap

### Current Project Stack:
- `next`: `16.3.0`
- `react`: `19.2.8`
- `tailwindcss`: `^4` (with `@tailwindcss/postcss`)
- `typescript`: `^5`

### Recommended Dependencies for Target Style:
1. **GSAP & ScrollTrigger:** `gsap` (for horizontal scroll pinning, text reveals, and timeline sequencing).
2. **Lenis:** `lenis` or `@studio-freight/lenis` (lightweight 3KB smooth scrolling library).
3. **Framer Motion / Lucide Icons:** `framer-motion` (for modal spring physics and gesture cards) and `lucide-react` (for crisp SVG icons: ExternalLink, ArrowUpRight, Github, Mail, MapPin).

*Note on Next.js 16 & React 19 Compatibility:* All GSAP and Lenis initialization must be safely wrapped inside `'use client'` hooks (`useEffect` / `useLayoutEffect`) with proper teardown/kill methods to prevent SSR hydration mismatches or memory leaks.

---

## 6. Detailed Migration Blueprint by Agent Role

### Phase 1: Architecture & Foundations (Assignee: `architect` - Task T2)
1. **Design Tokens in `globals.css`:**
   - Set CSS variables: `--color-bg: #0b080c`, `--color-accent: #c2a4ff`, `--color-accent-vibrant: #a87cff`, `--color-ink: #eae5ec`.
   - Configure stepped `.section-container` widths and responsive `--cWidth`.
   - Add utility classes for `.split-line`, `.hover-link`, `.cursor-main`, and dashed SVG borders.
2. **Layout Shell Refactor:**
   - Rebuild `Header.tsx` to match the floating Redoyan navbar (`DP` initials, center email link, right hover links).
   - Create `src/components/ui/CustomCursor.tsx` for the magnetic follower.
   - Create `src/components/ui/SocialBar.tsx` for the floating social and resume pill.
   - Set up smooth scrolling foundation (`LenisProvider` or effect).
3. **Content Schema & Route Setup:**
   - Update `src/content/types.ts` with `category`, `displayRoles`, and pyramid tech items.
   - Create `src/app/myworks/page.tsx` scaffold for the complete works catalog.

### Phase 2: UI Components & Sections (Assignee: `ui_designer` - Task T3)
1. **Hero Section (`Hero.tsx`):**
   - Implement kinetic split typography "DUCH PANHATHUN".
   - Implement rolling dual-title animation ("AI / ML Engineer" & "Full-Stack Developer").
   - Position mobile photo container and ambient gradient circles.
2. **What I Do Section (`WhatIDo.tsx`):**
   - Implement two expandable interactive cards with SVG dashed borders (`strokeDasharray: 6,6` / `7,7`) and corner crosshairs.
   - Connect active card expansion with sibling dimming.
3. **Career Timeline Section (`Experience.tsx`):**
   - Replace card grid with vertical glowing timeline rail and animated dot marker.
   - Connect each career item to open `DetailModal` on click.
4. **Horizontal Work Showcase (`WorkSection.tsx`):**
   - Build GSAP ScrollTrigger horizontal pinning for top 5 projects + "See All Works" card.
   - Implement card layout with number, category, tools, and hover image preview.
5. **Tech Stack Section (`TechStack.tsx`):**
   - Build inverted pyramid grid with Devicon SVGs and dark video/gradient overlay.
6. **Contact & Footer Section (`Contact.tsx` & `Footer.tsx`):**
   - Implement 3-column contact layout with large name heading and arrow links.
7. **All Works Page (`src/app/myworks/page.tsx`):**
   - Implement `/myworks` grid with project cards, filter categories, and back button.

### Phase 3: QA & Production Verification (Assignee: `qa_engineer` - Task T4)
1. **Type Checking:** Run `npm run typecheck` to ensure all content schemas and component props are strictly typed.
2. **Linting:** Run `npm run lint` with zero ESLint warnings/errors.
3. **Production Build:** Run `npm run build` to verify static generation, server components, and dynamic client boundaries.
4. **Responsive & Interaction Audit:** Verify behavior on mobile (`< 768px`), tablet (`768px - 1024px`), and desktop (`> 1024px`), confirming cursor fallback, horizontal scroll touch fallback, and modal accessibility.

---

## 7. Verification & Deliverable Sign-off

- [x] Reference website `https://www.redoyanulhaque.me/` scraped and reverse-engineered.
- [x] JS bundle chunks and CSS design tokens analyzed.
- [x] Current repository structure in `src/` audited against reference components.
- [x] Comprehensive migration blueprint written to `docs/redoyan-style-migration.md`.
- [x] Actionable task handoffs prepared for `architect` (T2), `ui_designer` (T3), and `qa_engineer` (T4).
