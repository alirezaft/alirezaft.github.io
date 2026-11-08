# Cyberpunk Unity Developer Portfolio – Living Handoff & Developer Guide

* **Project:** Alireza Forghani Toosi – Portfolio & Interactive 3D Showcase
* **Repository:** https://github.com/alirezaft/alirezaft.github.io
* **Target Audience:** Technical Recruiters, Lead Engine Programmers, Studio Technical Directors
* **Production Build:** Vite + React 19 + TypeScript + Tailwind CSS + Three.js / React Three Fiber + Tone.js
* **Deployment Target:** GitHub Pages (base: './') via automated GitHub Actions CI/CD (.github/workflows/deploy.yml)

---

## 1. Overview & Architectural Philosophy

This portfolio serves as both an ultra-fast, high-signal **Recruiter Quick-View Mode** (2D executive dashboard) and an immersive **3D Cyber-Deck Experience** (Three.js/R3F interactive terminal room). The codebase is designed around strict separation of concerns, modular typed data contracts, procedural audio synthesis, and reactive UI state management.

Recruiters can immediately review verified titles (50M+ downloads), review code architectures (SOLID, ScriptableObject Pluggable Strategy, Verlet Integration, Boids Swarm Intelligence), inspect engineering impact metrics, watch real-time video/GIF gameplay captures, and download an authentic, verified 2-page CV with a single click.

---

## 2. Key Architectural Decisions (ADRs)

1. **Dual-Mode Shell Architecture ([src/context/UIContext.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/context/UIContext.tsx)):**
   - Single reactive context stores `viewMode` ('3d' ⟷ 'recruiter'), active project drawer state, active skill chip state, recruiter category filters, search queries, and audio state.
   - Zero routing overhead; state transitions are handled seamlessly via Framer Motion without page reloads.

2. **Standardized Project Media Asset Architecture:**
   - **Directory Structure:** All project media assets reside under `public/assets/projects/<project-id>/`.
   - **Relative Path Compatibility:** URLs are stored as `./assets/projects/<project-id>/<filename>`, guaranteeing 100% resolution across both local dev (localhost:3000) and GitHub Pages deployment subpaths.
   - **Supported Media Formats:** `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.mp4`, `.webm`.
   - **TypeScript Data Contracts ([src/content/projects/types.ts](file:///c:/Projects/Personal/alirezaft.github.io/src/content/projects/types.ts)):**
     - `ProjectMediaType`: `'image' | 'video' | 'gif'`
     - `ProjectMediaItem`: `{ id, type, url, thumbnailUrl?, title?, caption?, alt?, aspectRatio? }`
     - Extended `Project` interface with `thumbnailUrl?: string` and `media?: ProjectMediaItem[]`.

3. **Dual-Mode Interactive Project Media Carousel ([src/components/ui/ProjectMediaCarousel.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/ui/ProjectMediaCarousel.tsx)):**
   - **Card Mode:** Compact monitor preview (`h-44`) with CRT scanline effect.
     - Displays current active media (supports animated GIFs, autolooping muted videos, and screenshots).
     - Multiple assets show slide counter badge (e.g. `1/3`), media type icon (`GIF`, `VIDEO`, `IMG`), hover navigation arrows (`stopPropagation` ensures clicks cycle media without opening modal), and clickable bottom indicator dots.
     - Direct media click triggers `openProject(project.id)`.
   - **Drawer Mode:** Expanded high-res monitor viewport (`h-60 sm:h-72`).
     - Real-time telemetry header showing feed number (`FEED 01 / 03`) and capture type.
     - Audio-reactive Next/Prev controls + global keyboard navigation (`←` / `→`).
     - Mini thumbnail filmstrip underneath for one-click jump across screenshots/videos.
     - Caption banner hidden on UI for clean, unobstructed graphics viewing while keeping descriptions preserved in data files.
   - **Graceful Zero-Media Fallback:**
     - When a project lacks media/thumbnails, renders a sleek Cyberpunk Terminal HUD banner keyed to the cartridge visual's primary color.
     - Ensures all cards in the recruiter catalog maintain consistent height, alignment, and aesthetic balance without empty holes.

4. **Authentic Project Reclassifications & Data Refinements:**
   - **Enterprise VR & Interactive Simulations:**
     - Ingested 2 high-fidelity simulation captures in `public/assets/projects/vr-interactive-applications/`:
       - `industrial-plant-simulation.png`: Large-scale steel smelting and foundry simulation featuring molten metal rail transport, gantry operations, and hazardous procedure training. Assigned as primary card thumbnail.
       - `laboratory-simulation.png`: Precision chemical cleanroom laboratory workbench with glassware physics, chemical compound testing, and hot plate apparatus.
   - **Kingdom Hero: Tower Defense TD:**
     - Ingested 3 authentic gameplay captures in `public/assets/projects/kingdom-hero-tower-defense/`:
       - `grid-summon-defense.webp`: Grid-based hero summoning & merge defense mechanics with lane pathfinding around castle ramparts. Assigned as primary card thumbnail.
       - `pvp-battle-arena.webp`: Real-time split-screen PvP duel mode ("PVP PLAY") with lane defenses, spell barrages, hero summons, and health tug-of-war.
       - `hero-deck-collection.webp`: Battle deck roster builder and hero army collection screen ("YOUR ARMY") displaying elemental synergies and card progression.
   - **Mr. Bean – Special Delivery:**
     - Ingested 3 authentic gameplay captures in `public/assets/projects/mr-bean-special-delivery/`:
       - `delivery-finish-line.webp`: Physics-based delivery racing crossing the finish line with precarious rooftop cargo and timer countdown. Assigned as primary card thumbnail.
       - `world-biomes.webp`: Diverse worldwide delivery environments (city, countryside, snowy mountain bridge, desert canyon).
       - `vehicle-boosts.webp`: Dynamic upgrades and power-ups (scissor wheels, parachute gliders, rocket turbos, fragile glass stacks).
   - **Mr. Bean – Solitaire Adventure:**
     - Ingested 3 authentic gameplay & metagame captures in `public/assets/projects/mr-bean-solitaire-adventure/`:
       - `travel-progression.webp`: City journey & level progression showing Mr. Bean in his green Mini Cooper in NYC (Level 1, Piggy Bank). Assigned as primary card thumbnail.
       - `solitaire-gameplay.webp`: Solitaire card mechanics with custom illustrated face cards (Teddy as Jack, Irma Gobb as Queen, Mr. Bean as King) with streak multipliers and wild cards.
       - `puzzle-mechanics-obstacles.webp`: Dynamic puzzle mechanics showing lock-and-key gate obstacles, golden breaking blocks, and progressive difficulty balancing.
   - **A Simple Diagnosis:**
     - Re-classified category from `'open-source'` to `'indie'` in data contracts.
     - Removed hardcoded component exclusions (`project.id !== 'a-simple-diagnosis'`) so category badges render dynamically (`INDIE GAME`).
     - Added dedicated `INDIE GAMES` filter tab in `RecruiterFilterBar.tsx`.
     - Cleaned amber badge from `'Available on itch.io • 2 Endings'` to `'Available on itch.io'`.
     - Elevated the 2 branching endings to the opening sentence of overview for immediate visibility in 2-line clamped recruiter cards.
     - Populated with 3 authentic CRT screenshots (`title-screen.jpg`, `hearing-test.jpg`, `chapter-briefing.jpg`).
   - **Unity Verlet Rope Physics:**
     - Upgraded star count to 70+ GitHub Stars across subtitle, badge, CV impact bullets, and companion lore.
     - Linked published Medium architectural breakdown (`/verlet-integration-simulating-rope-physics-in-unity-b4f0ffde38fb`) with BookOpen icon.
     - Populated with real-time simulation GIF and 2 inspector captures.
   - **Unity BOIDS Flocking Simulation:**
     - Ingested as a 9th showcase project (`project-unity-boids.ts`, Shelf Row 3, Slot 2, `open-source`, 20+ GitHub Stars).
     - Linked GitHub repository and published Dev Genius / Medium breakdown (`/boids-algorithm-simulating-bird-flocks-in-unity-ec733d529a92`).
     - Intentionally omitted temporary LinkedIn post URL from public recruiter cards per client directive.
     - Populated with 500-agent flocking demo GIF and 2 component inspector captures.
   - **Prefab Palette:**
     - Populated with drag-and-drop workflow GIF, instant search indexing GIF, corner menu capture, and context menu capture.
   - **UnityChart:**
     - Integrated user-uploaded `demo.mp4` video (real-time play-mode vector charting) + repository `chart-overview.png` interface capture.

5. **Verified Live Links Directory:**
   - *Mr. Bean: Special Delivery:* https://play.google.com/store/apps/details?id=com.goodcatchgames.mrbeanhillclimb&hl=en_US
   - *Mr. Bean: Solitaire Adventure:* Delisted from Google Play (Archived Title indicator)
   - *Kingdom Hero: Tower Defense:* https://play.google.com/store/apps/details?id=com.Artronics.TowerMania&hl=en_US
   - *Enterprise VR Production:* https://manshourfanavari.com/en/products
   - *Unity Verlet Rope Physics (GitHub):* https://github.com/alirezaft/UnityVerletRope
   - *Verlet Rope Physics (Medium):* https://alirezaft98.medium.com/verlet-integration-simulating-rope-physics-in-unity-b4f0ffde38fb
   - *Unity BOIDS Flocking (GitHub):* https://github.com/alirezaft/UnityBOIDS
   - *Unity BOIDS Flocking (Medium / Dev Genius):* https://blog.devgenius.io/boids-algorithm-simulating-bird-flocks-in-unity-ec733d529a92
   - *Prefab Palette (GitHub):* https://github.com/alirezaft/PrefabPalette
   - *UnityChart (GitHub):* https://github.com/alirezaft/UnityChart
   - *UnityChart Documentation:* https://alirezaft.github.io/UnityChart/
   - *A Simple Diagnosis (itch.io):* https://alirezaft.itch.io/a-simple-diagnosis
   - *Pluggable Strategy Pattern (Medium):* https://alirezaft98.medium.com/pluggable-strategy-design-pattern-with-scriptable-object-c1cdcd427e45

---

## 3. Implementation Progress & Activity Log

### Phase 0: Environment Setup & Scaffolding [COMPLETED]
* **Date:** 2026-11-02
* Scaffolded Vite + React 19 + TypeScript + Tailwind + R3F + GitHub Pages relative base path.

### Phase 1: Modular Content Architecture & Data Contracts [COMPLETED]
* **Date:** 2026-11-02
* Built modular schemas in src/content/:
  - 8 Initial Projects across 4 shelf categories (`src/content/projects/`)
  - 10 Curated Skill Chips across 4 engineering domains (`src/content/skills/`)
  - Profile bio, career timeline, education, transmissions, and socials (`src/content/profile/`)
  - Companion robot lore & trivia (`src/content/companion/`)

### Phase 2: Procedural Web Audio Engine [COMPLETED]
* **Date:** 2026-11-03
* Built real-time synthesized procedural sound engine in `src/audio/soundEngine.ts` using Tone.js.
* Single `useAudio` React hook with localStorage persistence and dev harness at `/#audio-test`.

### Phase 3: Recruiter Quick View Mode & Project Drawer [COMPLETED]
* **Date:** 2026-11-04 – 2026-11-05
* Implemented Recruiter 2D dashboard, top floating cyber HUD with volume slider and mode switcher, responsive skill domains, career timeline, verified 2-page PDF resume download, and Framer Motion slide-out project case study drawer.
* Configured automated GitHub Actions workflow (`.github/workflows/deploy.yml`) deploying production builds to GitHub Pages.

### Phase 3.5: Project Media Architecture, Video Integration & Content Enhancements [COMPLETED]
* **Date:** 2026-11-06 – 2026-11-07
* **Standardized Media Folder Architecture:**
  - Created `public/assets/projects/<project-id>/` hierarchy.
  - Ingested authentic media assets for all 9 projects (`vr-interactive-applications`, `kingdom-hero-tower-defense`, `mr-bean-special-delivery`, `mr-bean-solitaire-adventure`, `unity-boids`, `unity-verlet-rope`, `prefab-palette`, `unity-chart`, `a-simple-diagnosis`).
* **Interactive Media Carousel Component ([ProjectMediaCarousel.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/ui/ProjectMediaCarousel.tsx)):**
  - Integrated into both `ProjectCard.tsx` (compact card preview with inline flip controls) and `ProjectDrawer.tsx` (expanded monitor with captions and filmstrip).
  - Handles images, animated GIFs, and HTML5 video playback seamlessly with CRT scanline overlays.
  - Provides uniform fallback terminal HUD for projects awaiting visual media.
* **Content & Narrative Alignments:**
  - Added *Enterprise VR & Interactive Simulations* media suite (Industrial smelting plant foundry simulation and precision chemistry laboratory cleanroom).
  - Added *Kingdom Hero: Tower Defense TD* media suite (Tactical grid summoning & merge defense, split-screen PvP duels, hero battle deck army).
  - Added *Mr. Bean – Special Delivery* media suite (High-stakes delivery racing, world biomes, and hilarious vehicle boosts).
  - Added *Mr. Bean – Solitaire Adventure* media suite (Travel progression in NYC, Solitaire face cards, and dynamic puzzle obstacles).
  - Added *Unity BOIDS* (`project-unity-boids.ts`) with Medium breakdown link and transmission entry.
  - Updated *Verlet Rope* to 70+ GitHub stars with Medium breakdown link and transmission entry.
  - Reclassified *A Simple Diagnosis* to `category: 'indie'` with dedicated filter tab and elevated 2-ending short description.
  - Added video demo and overview capture for *UnityChart*.
* **UI Streamlining:**
  - Hidden the bottom caption bar overlay (`currentItem.caption`) from `ProjectMediaCarousel.tsx` across all project media viewers so screenshots, GIFs, and video captures are displayed cleanly and unobstructed.
  - All `caption` and `overview` metadata are 100% preserved in the data files (`src/content/projects/*.ts`).
* **Build Verification:**
  - `npm run build` passing with code 0.

---

## 4. Current File Tree

```
c:\Projects\Personal\alirezaft.github.io\
├── .github/
│   └── workflows/
│       └── deploy.yml              # GITHUB ACTIONS CI/CD DEPLOYMENT
├── public/
│   ├── assets/
│   │   ├── projects/               # STANDARDIZED PROJECT MEDIA REPOSITORY
│   │   │   ├── a-simple-diagnosis/
│   │   │   │   ├── chapter-briefing.jpg
│   │   │   │   ├── hearing-test.jpg
│   │   │   │   └── title-screen.jpg
│   │   │   ├── kingdom-hero-tower-defense/
│   │   │   │   ├── grid-summon-defense.webp
│   │   │   │   ├── hero-deck-collection.webp
│   │   │   │   └── pvp-battle-arena.webp
│   │   │   ├── mr-bean-solitaire-adventure/
│   │   │   │   ├── puzzle-mechanics-obstacles.webp
│   │   │   │   ├── solitaire-gameplay.webp
│   │   │   │   └── travel-progression.webp
│   │   │   ├── mr-bean-special-delivery/
│   │   │   │   ├── delivery-finish-line.webp
│   │   │   │   ├── vehicle-boosts.webp
│   │   │   │   └── world-biomes.webp
│   │   │   ├── prefab-palette/
│   │   │   │   ├── context-menu.png
│   │   │   │   ├── corner-menu.png
│   │   │   │   ├── demo.gif
│   │   │   │   └── search-demo.gif
│   │   │   ├── unity-boids/
│   │   │   │   ├── demo.gif
│   │   │   │   ├── drone-inspector.png
│   │   │   │   └── flock-inspector.png
│   │   │   ├── unity-chart/
│   │   │   │   ├── chart-overview.png
│   │   │   │   └── demo.mp4        # PLAY-MODE VECTOR CHARTING VIDEO
│   │   │   ├── unity-verlet-rope/
│   │   │   │   ├── demo.gif
│   │   │   │   ├── rope-renderer-inspector.png
│   │   │   │   └── verlet-rope-inspector.png
│   │   │   └── vr-interactive-applications/
│   │   │       ├── industrial-plant-simulation.png
│   │   │       └── laboratory-simulation.png
│   │   └── resume/
│   │       └── Alireza_Forghani_Toosi_Resume.pdf  # AUTHENTIC 2-PAGE RESUME
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
│   │       │   ├── ProjectCard.tsx # INCLUDES INLINE MEDIA CAROUSEL
│   │       │   ├── RecruiterCareerView.tsx
│   │       │   ├── RecruiterFilterBar.tsx
│   │       │   ├── RecruiterGrid.tsx
│   │       │   ├── RecruiterHeader.tsx
│   │       │   ├── RecruiterProjectsView.tsx
│   │       │   ├── RecruiterSkillsView.tsx
│   │       │   ├── RecruiterTabs.tsx
│   │       │   └── RecruiterTransmissionsView.tsx
│   │       ├── Hud.tsx             # TOP CYBER HUD WITH SCROLL BACKDROP
│   │       ├── ProjectDrawer.tsx   # CASE STUDY DRAWER WITH EXPANDED CAROUSEL
│   │       ├── ProjectMediaCarousel.tsx # REUSABLE DUAL-MODE MEDIA CAROUSEL
│   │       └── index.ts            # UI EXPORTS
│   ├── content/                    # MODULAR DATA ARCHITECTURE
│   │   ├── companion/              # COMPANION BOT LORE & DIALOGUES
│   │   ├── profile/                # BIO, WORK HISTORY, SOCIALS, TRANSMISSIONS
│   │   ├── projects/               # 9 SHOWCASE PROJECTS & CONTRACTS
│   │   ├── skills/                 # 10 CURATED SKILL CIRCUITS
│   │   └── index.ts
│   ├── context/                    # UI INTERACTION STATE
│   │   ├── index.ts
│   │   └── UIContext.tsx
│   ├── App.tsx                     # Master Root & Dual-Mode Shell
│   ├── AudioTestPage.tsx           # Dev audio harness (/#audio-test)
│   ├── index.css                   # Custom scrollbars & Tailwind base
│   ├── main.tsx                    # Root React 19 entry
│   └── vite-env.d.ts
├── EXECUTION_PLAN.md
├── handoff.md                      # This living handoff document
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
