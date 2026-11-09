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

6. **Knowledge Graph Codebase Intelligence (graphify):**
   - **Dedicated Graph Artifacts:** The project maintains an audited, persistent knowledge graph in `graphify-out/` (`graph.json`, `graph.html`, and `GRAPH_REPORT.md`).
   - **Inspection & Exploration Decision:** All subsequent AI agents and developers will use this knowledge graph as the primary mechanism for inspecting and exploring code, tracing dependencies, understanding cross-community flows (e.g., between the 3D cyber-deck, audio synthesis, and modular project content), and diagnosing architectural impact before making modifications.
   - **Efficiency & Token Savings:** Delivers ~229x token reduction per query versus naive full-corpus reading across ~276k words, grouping 309 nodes and 598 edges into 21 cohesive functional communities with verified god-node bridges.
   - **Query & Update Workflow:** Query directly via `/graphify query "<question>"` or `/graphify path "<from>" "<to>"`, and refresh incrementally when adding new components using `/graphify . --update`.

---


7. **Phase 4 Seated 1st-Person Cyber-Deck & Hybrid Asset Architecture:**
   - **Locomotion & Viewport Model:** Seated developer chair first-person perspective. Mouse look with Pointer Lock (document.requestPointerLock()) and center reticle dot; clamped pitch (-40 deg .. +50 deg) and yaw (-75 deg .. +75 deg) to keep the player naturally within reach of the desk.
   - **Right-Click Inspection Zoom:** Holding Right-Click smoothly interpolates Camera FOV from 45 deg to 22 deg with a gentle camera nudge forward toward the aiming target.
   - **Mobile / Touch Fallback:** Single touch drag for camera orientation, tap to interact/pick up, and dedicated on-screen zoom toggle button.
   - **Zero-Content Drift Guarantee:** All 3D props and CRT interfaces bind directly to modular data contracts in src/content/ (projects, skillChips, profile, companionBot). No duplicate or stale data.
   - **Interactive CRT Monitor (<Html transform>):** Embedded 3D-transformed HTML screen within a retro curved CRT bezel. Default state renders a Cyberpunk Boot Terminal CLI (CYBER-DECK KERNEL v4.2 // AWAITING MEDIA). Supports native mouse wheel scrolling and clickable DOM buttons.
   - **Data Cartridge Deck System:** Left-click hold smoothly lerps cartridges into hand; releasing near the computer drive magnetically snaps the cartridge into the slot with mechanical latch SFX, powering on the CRT and rendering the project's tech spec card. Computer features a physical EJECT button to release cartridges.
   - **PCB Motherboard & Multimeter Logic Probe:** Handheld diagnostic probe connected via flexible coiled cable to a benchtop multimeter unit. Probing IC pins triggers spark/electric SFX, illuminates glowing copper bus traces to the CPU, and syncs live telemetry to both the benchtop meter LCD and the CRT monitor.
   - **Encrypted USB Key & Resume Decryption:** Tactile USB drive on desk. Plugging into the computer's USB port plays a power-surge SFX, triggers CRT decryption terminal animation, and initiates authentic download of Alireza_Forghani_Toosi_Resume.pdf.
   - **Byte the Companion Pet Robot:** Articulated desktop pet with head tracking player reticle, dynamic pixel emoticon screen face (( ^ _ ^ ), ( > ᗢ < ), etc.), petting interactions, microchip snack feeding dish with crunch SFX, and contextual developer trivia speech bubbles.
   - **Hybrid 3D Asset Strategy:** Four dedicated hero props (cartridge.glb, byte.glb, probe.glb, usb.glb) located in public/assets/models/, generated via automated Blender 5.2 headless Python scripts and fully editable in Blender 5.2. Environmental desk, housing, and substrate constructed with high-performance Three.js primitives.

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

### Phase 3.6: Codebase Knowledge Graph Integration [COMPLETED]
* **Date:** 2026-11-09
* Built complete semantic and structural knowledge graph using `graphify`.
* Mapped 309 nodes and 598 edges across 21 functional communities with 0 token extraction overhead.
* Generated interactive visualizer (`graphify-out/graph.html`), GraphRAG data schema (`graphify-out/graph.json`), and comprehensive architectural audit (`graphify-out/GRAPH_REPORT.md`).
* Established project policy to query and traverse this knowledge graph for future code inspection and feature expansion.


### Phase 4: Seated 1st-Person Cyber-Deck Experience [IN PROGRESS]
* **Date:** 2026-11-09
* Finalized /grill-me architectural specifications and blindspot resolution:
  - Seated 1st-person controller with Pointer Lock, center reticle, and Right-Click FOV zoom (45° -> 22°).
  - Mobile touch drag and on-screen zoom toggle fallback.
  - Interactive CRT Monitor with <Html transform>, default Boot Terminal CLI state, and native wheel scroll.
  - Cartridge pickup, magnetic slot snapping, and physical computer Eject button.
  - PCB Motherboard and Multimeter Logic Probe tool with dual LCD + CRT diagnostics readout.
  - Tactile Encrypted USB Key triggering power-surge SFX, decryption animation, and direct resume PDF download.
  - Desktop companion pet robot 'Byte' with emoticon face screen, reticle head tracking, petting, microchip feeding dish, and reactive commentary.
  - Hybrid 3D asset architecture leveraging Blender 5.2 headless generation for hero props (cartridge.glb, byte.glb, probe.glb, usb.glb) in public/assets/models/.

---

## 4. Current File Tree

```
c:\Projects\Personal\alirezaft.github.io\
├── .github/
│   └── workflows/
│       └── deploy.yml              # GITHUB ACTIONS CI/CD DEPLOYMENT
??? graphify-out/                   # KNOWLEDGE GRAPH & ARCHITECTURAL INTELLIGENCE
?   ??? graph.html                  # Interactive visualizer (open in browser)
?   ??? graph.json                  # GraphRAG knowledge graph data
?   ??? GRAPH_REPORT.md             # Graph audit & community breakdown
?   ??? cost.json                   # Token cost tracking
?   ??? manifest.json               # Incremental update manifest
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

1. **Step 4.1: First-Person Desk Camera & Pointer Lock Controller:**
   - Implement DeskCameraControls.tsx (Pointer Lock, reticle dot, clamped pitch/yaw, Right-Click FOV zoom lerp, touch fallback).
2. **Step 4.2: Cyber-Deck Workstation & 3-Point Neon Lighting:**
   - Implement CyberDeskStation.tsx (desk surface, casing, drive bays, post-processing bloom, ambient fill).
3. **Step 4.3: Hero 3D Models Generation via Blender 5.2:**
   - Generate cartridge.glb, yte.glb, probe.glb, and usb.glb in public/assets/models/.
4. **Step 4.4: Interactive CRT Monitor Screen (<Html transform>):**
   - Implement CrtMonitor.tsx with Boot Terminal default state, native wheel scroll, and zero-drift project card renderer.
5. **Step 4.5: Cartridge Physics & USB Resume Decryption:**
   - Implement CartridgeRack.tsx, ComputerDeck.tsx, and UsbKey.tsx with lerp grab, snap insertion, and CV download.
6. **Step 4.6: PCB Motherboard & Multimeter Logic Probe Tool:**
   - Implement CircuitTestBench.tsx and MultimeterProbe.tsx with spark SFX, bus pulses, and CRT telemetry sync.
7. **Step 4.7: Byte Companion Pet Behaviors:**
   - Implement ByteCompanion.tsx with pixel emoticon face canvas, reticle head tracking, microchip feeding, and speech bubbles.
