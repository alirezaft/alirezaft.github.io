# Project Handoff & Decision History: Cyberpunk Unity Game Developer Portfolio

> **Target Audience for this Document:** Antigravity AI agents or human developers continuing work on this project across devices. This document captures the entire conversation history, decision tree, architectural rationale, implementation progress, and execution blueprint.

---

## 1. Project Overview & Client Profile

* **Client:** Alireza Forghani Toosi (Unity Developer and Game Designer).
* **Location & Availability:** Mashhad, Iran (Open to Remote).
* **Core Credentials (from verified CV):**
  * 5+ years production experience in mobile game development, VR, and interactive systems.
  * 50M+ active users reached across commercial mobile titles (*Mr. Bean: Special Delivery*).
  * Shipped VR projects, custom Unity editor tools (UI Toolkit, IMGUI), and agentic AI workflows.
  * B.Sc. in Computer Engineering from Ferdowsi University of Mashhad.
* **Objective:** An interactive 3D web portfolio that showcases game development capabilities while remaining blazing fast, accessible to hiring managers, and easily maintainable.
* **Hosting Platform:** GitHub Pages (`https://alirezaft.github.io/`).
* **Key Artifacts in Repository:**
  * [`portfolio_specification.md`](file:///c:/Projects/Personal/alirezaft.github.io/portfolio_specification.md) — Full Product Requirements Document (PRD).
  * [`EXECUTION_PLAN.md`](file:///c:/Projects/Personal/alirezaft.github.io/EXECUTION_PLAN.md) — 9-Phase Step-by-Step Execution Plan.
  * [`Handoff.md`](file:///c:/Projects/Personal/alirezaft.github.io/Handoff.md) — This living handoff document.

---

## 2. Decision-Making History & Requirements Gathering

The project was shaped through collaborative architectural planning and client review. Below is the full chronological record of decisions and their rationale:

### Decision 1: Core Interactive Format & Technical Medium
* **Problem:** Full Unity WebGL builds suffer from large initial downloads (20–60MB+), poor mobile compatibility, long first-paint latency, and friction for recruiters.
* **Selected Decision:** **Lightweight 3D Web Experience (Three.js / React Three Fiber)** with external/modal Unity WebGL links.
* **Rationale:** Instant initial load (< 3s), 60fps on mobile and desktop, zero asset bloat, full DOM accessibility.

### Decision 2: Theme & Visual Metaphor
* **Selected Decision:** **Cyberpunk / Neon Game Lab (Developer Desk Station)**.
* **Visual Direction:** Dark synthwave base palette (`#050811`), glowing cyan (`#00f3ff`), magenta (`#ff007f`), amber (`#ffb700`), and matrix green (`#00ff66`), CRT scanlines, bloom post-processing, and tactile hardware props.

### Decision 3: Recruiter Accessibility (The 3D Portfolio Dilemma)
* **Problem:** Hiring managers and recruiters spend an average of 30 seconds scanning a portfolio and may not want to navigate 3D spatial controls.
* **Selected Decision:** **Hybrid Dual-Mode UX**.
  * **3D Cyber-Deck:** The hero interactive playground for gamers and developers.
  * **Recruiter Quick-View:** A persistent top HUD button that toggles an instant, clean 2D card grid of all projects, technical skills, career timeline, and 1-click resume download.

### Decision 4: Project Showcase & Playback
* **Selected Decision:** **Interactive Desk CRT Monitor Playback + Slide-out Case Study Panel**.
* **Mechanics:** Clicking/inserting a project cartridge boots up the 3D desk's CRT monitor, streaming gameplay reel/video texture directly onto the 3D curved screen. Simultaneously, a high-tech slide-out drawer reveals the technical breakdown (architecture, C# patterns, shaders, performance metrics) and links (Google Play, Itch.io, GitHub).

### Decision 5: Sound Design & Web Audio
* **Selected Decision:** **Tactile Sci-Fi SFX via Tone.js (Web Audio API)**.
* **Audio Strategy:** Uses Tone.js for synthesized procedural sound effects (zero audio file downloads). 16 polyphonic synthesized sounds with micro-tonal pitch jitter (±5–10 semitones). Volume and mute state persisted in `localStorage`.

### Decision 6: Physical Desk Props & Content Mapping
* **Selected Decision:** Tangible props representing all key sections:
  1. **Data Cartridges:** Project showcases (slot into deck to play).
  2. **Holographic Datapad:** Bio, game dev philosophy, experience timeline.
  3. **Cyber Chipset Rack:** Hardware diagnostic test-bench for technical skills.
  4. **Comms Terminal:** Contact form and social links.
  5. **Encrypted USB Chip (Resume):** Physical USB key on the desk. Clicking/plugging it into the cyber-deck triggers a power-surge animation and downloads the Resume PDF.

### Decision 7: Mini-Game & Easter Egg
* **Selected Decision:** **"Byte" the Desk Robot Companion + Microchip Feeding Mechanic**.
* **Mechanics:** A compact desktop robot with an expressive digital screen face. Visitors can pet/click it or drag microchips to feed it. Upon feeding, it spins, chirps, and displays speech bubbles with game-dev trivia.

### Decision 8: Technical Skills Architecture
* **Visual:** An angled matte-black PCB test-bench with illuminated copper bus traces in 3D, paired with an accessible, domain-categorized card view in the Recruiter Quick-View.
* **Component Breakdown:**
  * **Core Game Engine & Architecture:** Unity Engine & C#, Clean Code & SOLID Design Patterns, WebGL Porting & JS Wrappers.
  * **Editor Tooling & Game Design:** Custom Editor Tooling & UI Toolkit, Telemetry Analysis & Economy Balancing.
  * **AI Engineering, SDKs & Infrastructure:** Agentic Software Development (software + game design application), Mobile SDK Integration & Analytics, Git Version Control & CI/CD.
  * **Teaching, Mentorship & Collaboration:** Technical Teaching, Candidate Onboarding & University Workshops, Agile / Scrum & Cross-Discipline Collaboration.

### Decision 9: Engineering Stack & Hosting Requirements
* **Selected Decision:** **React 19 + Vite 6 + TypeScript 5.7 + React Three Fiber v9 + Drei v10 + Tailwind CSS v3 + Framer Motion v12 + Tone.js v15**.
* **Hosting:** Configured for GitHub Pages (`base: './'`) via automated GitHub Actions CI/CD (`.github/workflows/deploy.yml`).

### Decision 10: Content Architecture Strategy
* **Client Mandate:** **Never bundle content into a single monolithic file.**
* **Directory Structure:** Dedicated modular folders (`src/content/projects/`, `src/content/skills/`, `src/content/profile/`, `src/content/companion/`).

---

### Phase 3 Specific Client Directives & Decisions (Detailed History)

1. **Top Cyber HUD Bar Background & Layout:**
   - **Background Added for Scroll Clarity:** HUD header features `bg-[#050811]/90 backdrop-blur-md border-b border-[#1e293b]/80 shadow-[0_4px_24px_rgba(0,0,0,0.6)]` so it remains sharply distinct and prevents cards and text from visually colliding with the navigation pills when scrolling.
   - **Omit Title & Beacon:** Kept top bar floating; minimal `SYS_READY` indicator on the left.
   - **Text-Only Mode Buttons:** Removed decorative icons and "FAST" badge for a sleek, minimal look (`3D CYBER-DECK` ⟷ `RECRUITER VIEW`).
2. **Media-Player Style Volume Controller:**
   - Redesigned into an inline media player widget with dynamic speaker icon (`Volume2`, `Volume1`, `VolumeX`).
   - Horizontal volume track with Matrix Green (`#00ff66`) progress fill and percentage text (`0%` to `100%`).
   - Audio feedback rules: instant click on track vs drag-and-release upon `pointerup`.
3. **Recruiter Quick-View Cleanups & Adjustments:**
   - **Uniform Magenta Header Corners:** Header card corners updated to uniform Magenta (`#ff007f`) accents (`border-[#ff007f]`).
   - **Simplified Search Input:** Search bar placeholder simplified to `Search...`.
   - **Auditory Feedback on External Links:** Added `playClick()` sound trigger to LinkedIn, GitHub, Email, and Project Card external links upon click.
   - **Removed Badges & Affiliations:** Removed "AVAILABLE FOR HIRE" pill and removed "Manshoor Fanavari Arya • Ex-Unbound" affiliation line next to headline.
   - **Location Tag:** Updated to `"Mashhad, Iran (Open to Remote)"` (removed `/ Relo`).
   - **Updated Job Title:** Changed headline to `"Unity Developer and Game Designer"`.
   - **Left-Aligned Accomplishment Badges:** Moved amber badges to the left (`justify-start`) on all project cards to balance negative space.
   - **Removed Time Ranges & ROM Serial Numbers:** Project cards display role, studio, and accomplishment badge without year date ranges or cartridge serial codes (`ROM-...`).
   - **Curated 8-Project Showcase:** Removed Kinect academic project from standalone project showcase (retaining the story naturally in Career/Teaching log as a university computer vision teaching aid).
   - **Mr. Bean: Solitaire Adventure Delisted Handling:** Removed dead Google Play URL; card clearly displays `50K+ Shipped (Archived)` badge and `Delisted from Google Play` store note.
   - **Verified PDF Resume:** Installed authentic, verified 2-page CV in `public/assets/resume/Alireza_Forghani_Toosi_Resume.pdf` (55,228 bytes).
   - **Recruiter Technical Skills Section:** Replaced synthetic IC jargon and "Inspect Telemetry" modals with four intuitive engineering domains (*Core Game Engine & Architecture*, *Editor Tooling & Game Design*, *AI Engineering, SDKs & Infrastructure*, *Teaching, Mentorship & Collaboration*) showing comprehensive explanations, production impact metrics, and linked project buttons directly.
   - **Medium Profile Conformance:** Updated all Medium publication and social profile URLs to `https://alirezaft98.medium.com/`.
   - **Curated Skill Refinements:**
     - Simplified title to **"Unity Engine & C#"** (removed "Architecture").
     - Renamed to **"Agentic Software Development"** (removed "LLM"), cross-linked *Mr. Bean: Special Delivery*, and highlighted application of agentic workflows and LLMs to game design (economy balancing, narrative ideation, design docs).
     - Expanded **"Technical Teaching, Candidate Onboarding & University Workshops"** to highlight hands-on university workshops.
     - Removed non-specialist and internal profiling items: **"Physics Algorithms & Numerical Methods"** and **"Memory Profiling & Crash Optimization"**.
   - **Verified Live Links:**
     - Special Delivery: `https://play.google.com/store/apps/details?id=com.goodcatchgames.mrbeanhillclimb&hl=en_US`
     - Verlet Rope (GitHub): `https://github.com/alirezaft/UnityVerletRope`
     - Verlet Rope Physics (Medium): `https://alirezaft98.medium.com/verlet-integration-simulating-rope-physics-in-unity-b4f0ffde38fb`
     - Unity BOIDS (GitHub): https://github.com/alirezaft/UnityBOIDS
     - Unity BOIDS Flocking (Medium): https://blog.devgenius.io/boids-algorithm-simulating-bird-flocks-in-unity-ec733d529a92
     - Prefab Palette: `https://github.com/alirezaft/PrefabPalette`
     - Kingdom Hero: `https://play.google.com/store/apps/details?id=com.Artronics.TowerMania&hl=en_US`
     - Enterprise VR: `https://manshourfanavari.com/en/products`
      - A Simple Diagnosis (itch.io): `https://alirezaft.itch.io/a-simple-diagnosis`
      - Pluggable Strategy Pattern (Medium): `https://alirezaft98.medium.com/pluggable-strategy-design-pattern-with-scriptable-object-c1cdcd427e45`
    - **"A Simple Diagnosis" Authentic Alignment & Technical Synthesis:**
      - Corrected narrative and game design: Atmospheric psychological analog horror game revolving around "Red Fever", auditory hallucinations, diagnostic hearing tests, and branching endings.
      - Integrated architectural innovation: Pluggable Strategy Design Pattern leveraging Unity `ScriptableObject` assets (`[CreateAssetMenu]`) to decouple algorithms from MonoBehaviours and empower non-technical designers to swap evaluation logic in the Inspector.
      - Added direct links to both the itch.io playable build and the published Medium architectural deep dive in both project drawer/card and transmissions list.
      - Refined Recruiter Quick View badges & short description: Removed `OPEN SOURCE` category tag, cleaned amber badge to `Available on itch.io`, and elevated the 2 distinct endings directly to the front of the short description for immediate recruiter visibility.

---

## 3. Implementation Progress & Activity Log

### Phase 0: Environment Setup & Scaffolding [COMPLETED]
* **Date:** 2026-11-02
* Scaffolded Vite + React 19 + TypeScript + Tailwind + R3F + GitHub Pages relative base path.
* Verified build code 0.

### Phase 1: Modular Content Architecture & Data Contracts [COMPLETED]
* **Date:** 2026-11-02
* Built modular schemas in `src/content/`:
  - 8 Projects across 4 shelf categories (`src/content/projects/`)
  - 10 Curated Skill Chips across 4 engineering domains (`src/content/skills/`)
  - Profile bio, career timeline, education, transmissions, and socials (`src/content/profile/`)
  - Companion robot lore & trivia (`src/content/companion/`)
* Verified build code 0.

### Phase 2: Procedural Web Audio Engine [COMPLETED]
* **Date:** 2026-11-03
* Built real-time synthesized procedural sound engine in `src/audio/soundEngine.ts` using Tone.js.
* Single `useAudio` React context/hook with `localStorage` persistence.
* Dev test harness at `/#audio-test` with polyphony and pitch variation.
* Verified build code 0.

### Phase 3: 2D HUD, Recruiter Grid & Slide-out Drawers [COMPLETED]
* **Date:** 2026-11-04 – 2026-11-05
* **Completed in Phase 3:**
  1. **UI State & Store Architecture ([`src/context/UIContext.tsx`](file:///c:/Projects/Personal/alirezaft.github.io/src/context/UIContext.tsx)):**
     - Managed `viewMode` (`'3d'` ⟷ `'recruiter'`).
     - Selected project and drawer state (`openProject`, `closeProject`, `selectedProject`).
     - Selected skill chip state (`openSkill`, `closeSkill`, `selectedSkill`).
     - Recruiter search query, category filtering (`filteredProjects` with instant `useMemo`).
     - Resume download triggering (`triggerResumeDownload`, `isResumeDownloading`).
     - Automatic audio synchronization and global `Escape` key listener.
  2. **Top Cyber HUD Component ([`src/components/ui/Hud.tsx`](file:///c:/Projects/Personal/alirezaft.github.io/src/components/ui/Hud.tsx)):**
     - Floating header with dark glassmorphic background to separate from scrolling content.
     - Minimal `SYS_READY` pulse dot.
     - Clean text-only mode switcher (`3D CYBER-DECK` ⟷ `RECRUITER VIEW`).
     - Media-player style compact volume widget with dynamic speaker icon and horizontal slider.
     - Dev-only link to `SFX_LAB`.
  3. **Recruiter Quick-View Grid ([`src/components/ui/recruiter/`](file:///c:/Projects/Personal/alirezaft.github.io/src/components/ui/recruiter/)):**
     - `RecruiterHeader.tsx`: Magenta corner accents, developer identity ("Unity Developer and Game Designer"), 50M+ badge, location (`Mashhad, Iran (Open to Remote)`), contact links with `playClick()`, and 1-click verified Resume download.
     - `RecruiterTabs.tsx`: Tabs for Projects (8), Technical Skills (10), Career Log, and Publications.
     - `RecruiterFilterBar.tsx`: Category pills with live project counts + simplified `Search...` bar.
     - `ProjectCard.tsx`: Left-aligned accomplishment badges, clean cards without time ranges or ROM serials, and external action links with click SFX.
     - `RecruiterProjectsView.tsx`: Responsive card catalog with empty search state.
     - `RecruiterSkillsView.tsx`: Grouped by 4 engineering domains with direct summaries, impact metrics, and project cross-links.
     - `RecruiterCareerView.tsx`: Work experience timeline and education matching CV.
     - `RecruiterTransmissionsView.tsx`: Articles and university teaching with click SFX.
     - `RecruiterGrid.tsx`: Master animated container using Framer Motion.
     - `icons.tsx`: Custom SVG icons for GitHub and LinkedIn.
  4. **Slide-out Project Case Study Drawer ([`src/components/ui/ProjectDrawer.tsx`](file:///c:/Projects/Personal/alirezaft.github.io/src/components/ui/ProjectDrawer.tsx)):**
     - Built responsive slide-in case study panel powered by Framer Motion (`x: '100%'` ⟷ `0%`).
     - Dark glassmorphic backdrop (`bg-[#070b16]/95 backdrop-blur-2xl`) with emissive top accent bar keyed to project cartridge colors.
     - Uniform Magenta (`#ff007f`) corner brackets.
     - Telemetry preview HUD terminal for gameplay media/render fallback.
     - Executive overview, structured engineering impact bullets with CV accomplishments, and tooling badges.
     - Sticky footer with verified store/repo links (`playClick()` audio feedback) or archived delisted indicator for *Mr. Bean: Solitaire Adventure*.
     - Dismissable via backdrop click, top-right `X` button, or global `Escape` key.
  5. **CI/CD Deployment Automation ([`.github/workflows/deploy.yml`](file:///c:/Projects/Personal/alirezaft.github.io/.github/workflows/deploy.yml)):**
     - Automated GitHub Actions workflow on `master` branch.
     - Node 20 runner runs `npm ci` and `npm run build`, uploading `dist/` directly to GitHub Pages.
  6. **App Integration ([`src/App.tsx`](file:///c:/Projects/Personal/alirezaft.github.io/src/App.tsx)):**
     - Wrapped with `<AudioProvider>` and `<UIProvider>`.
     - Seamless mode transition between 3D Canvas, Recruiter Quick-View, and `<ProjectDrawer />`.
     - Clean compilation: `npm run build` passing with code 0.

---

## 4. Current File Tree

```
c:\Projects\Personal\alirezaft.github.io\
├── .github/
│   └── workflows/
│       └── deploy.yml              # GITHUB ACTIONS CI/CD DEPLOYMENT
├── public/
│   ├── assets/
│   │   ├── icons/
│   │   ├── models/
│   │   ├── resume/
│   │   │   └── Alireza_Forghani_Toosi_Resume.pdf  # AUTHENTIC 2-PAGE RESUME
│   │   ├── textures/
│   │   └── videos/
│   └── vite.svg
├── src/
│   ├── audio/                      # PROCEDURAL SOUND ENGINE (Tone.js)
│   │   ├── index.ts
│   │   ├── soundEngine.ts
│   │   └── useAudio.tsx
│   ├── components/
│   │   └── ui/                     # 2D PRESENTATION LAYER
│   │       ├── recruiter/          # RECRUITER QUICK-VIEW SYSTEM
│   │       │   ├── icons.tsx
│   │       │   ├── index.ts
│   │       │   ├── ProjectCard.tsx
│   │       │   ├── RecruiterCareerView.tsx
│   │       │   ├── RecruiterFilterBar.tsx
│   │       │   ├── RecruiterGrid.tsx
│   │       │   ├── RecruiterHeader.tsx
│   │       │   ├── RecruiterProjectsView.tsx
│   │       │   ├── RecruiterSkillsView.tsx
│   │       │   ├── RecruiterTabs.tsx
│   │       │   └── RecruiterTransmissionsView.tsx
│   │       ├── Hud.tsx             # TOP CYBER HUD WITH SCROLL BACKDROP
│   │       ├── ProjectDrawer.tsx   # SLIDE-OUT CASE STUDY DRAWER
│   │       └── index.ts            # UI EXPORTS
│   ├── content/                    # MODULAR DATA ARCHITECTURE
│   │   ├── companion/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── skills/
│   │   └── index.ts
│   ├── context/                    # UI INTERACTION STATE
│   │   ├── index.ts
│   │   └── UIContext.tsx
│   ├── App.tsx                     # Master Root & Dual-Mode Shell
│   ├── AudioTestPage.tsx           # Dev audio harness (/ #audio-test)
│   ├── index.css                   # Custom scrollbars & Tailwind base
│   ├── main.tsx                    # Root React 19 entry
│   └── vite-env.d.ts
├── EXECUTION_PLAN.md
├── Handoff.md                      # This living handoff document
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 5. Immediate Next Steps

1. **Phase 4: 3D Scene Base, Lighting & Post-Processing:**
   - Build cyber-deck desk surface geometry and cable bundles (`DeskStation.tsx`).
   - Cyan/Magenta/Amber three-point lighting rig with ambient fill.
   - Post-processing pipeline with selective bloom and CRT scanlines using `@react-three/postprocessing`.
2. **Phase 5: Interactive 3D CRT Monitor & Hologram:**
   - 3D CRT Monitor running Canvas/video texture for project showcase.
   - Hologram datapad for bio & career timeline.
3. **Phase 6: 3D Cartridge System, Skills Rack & Resume USB Key:**
   - 3D project cartridges that plug into the cyber-deck reader to trigger project drawer & CRT playback.
   - Interactive PCB skills rack with illuminated copper bus traces.
   - Tactile USB drive with power-surge click animation triggering direct resume download.
