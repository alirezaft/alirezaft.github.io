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

8. **Dev-Only Performance Telemetry Monitor ([src/components/dev/DevPerfMonitor.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/dev/DevPerfMonitor.tsx)):**
   - **Purpose & Scope:** Real-time in-engine telemetry overlay to audit 3D scene performance and verify adherence to strict budget ceilings defined in [ASSET_SPECIFICATION_AND_PERFORMANCE_GUIDE.md](file:///c:/Projects/Personal/alirezaft.github.io/ASSET_SPECIFICATION_AND_PERFORMANCE_GUIDE.md) (< 35 draw calls, 60 FPS / 16.6ms frame time, < 85 MB JS heap).
   - **Telemetry Metrics Tracked:**
     * **Triangles (Tris):** Real-time rendered triangles per frame (`gl.info.render.triangles`) + total scene triangles across all meshes.
     * **Vertices:** Rendered vertices (`renderedTris * 3 + lines * 2 + points`) + total geometry vertices in the scene.
     * **Draw Calls:** Active WebGL draw calls per frame (`gl.info.render.calls`) with color-coded budget status (`< 35 calls` nominal).
     * **Framerate & Latency:** Smoothed rolling FPS, frame time in milliseconds, and min/max FPS tracking with reset capability.
     * **Memory & Assets:** GPU textures in VRAM (`gl.info.memory.textures`), geometry buffers (`gl.info.memory.geometries`), compiled shader programs (`gl.info.programs.length`), and browser JS heap footprint (`performance.memory.usedJSHeapSize`).
     * **Hardware & Viewport:** Canvas viewport resolution, Device Pixel Ratio (DPR), and unmasked GPU hardware renderer (`WEBGL_debug_renderer_info`).
   - **Zero-Intrusion Architecture:**
     * Sits inside `<Canvas>` to access R3F hooks (`useThree`, `useFrame`) without polling overhead.
     * Decoupled from the 3D render loop: mounts an isolated React DOM root (`createRoot`) into `document.body` and throttles HUD updates to ~150ms. No state updates are dispatched inside the R3F reconciler tree, avoiding any Heisenberg rendering distortions.
     * Pointer lock safety: All pointer, mouse, and touch events on the panel call `e.stopPropagation()`, ensuring telemetry interaction never locks the mouse pointer or disrupts camera orientation.
   - **Dual UI Modes:**
     * **Compact Pill (Default):** Floating cyber chip in top-right (`60 FPS · 18 DC · 14.2k Δ · 42.6k V`) that leaves the 3D workspace unobstructed.
     * **Expanded Dashboard:** Full telemetry HUD with category cards, performance budgets, and diagnostic detail.
     * **Controls:** Toggle visibility with `~` (Tilde / Backquote) or `F3`; switch between Left/Right docking; collapse/expand with one click.
   - **Effortless Production Removal:** Gated strictly via `{import.meta.env.DEV && <DevPerfMonitor hidden={viewMode === 'recruiter'} />}` in `src/App.tsx`. Can be completely eliminated for release by deleting that single line in `src/App.tsx` and removing `src/components/dev/DevPerfMonitor.tsx`.

9. **First-Person 3D Data Cartridge Asset Architecture & Procedural Foil Synthesis:**
   - **Blender 5.2 Asset Generation ([public/assets/cartridge.glb](file:///c:/Projects/Personal/alirezaft.github.io/public/assets/cartridge.glb)):**
     * Built as a 100% watertight, single-mesh hero asset (`SM_DataCartridge`) adhering strictly to [ASSET_SPECIFICATION_AND_PERFORMANCE_GUIDE.md](file:///c:/Projects/Personal/alirezaft.github.io/ASSET_SPECIFICATION_AND_PERFORMANCE_GUIDE.md).
     * Geometry: **256 triangles** (well under the 950-triangle budget ceiling), 136 vertices, zero non-manifold edges, zero degenerate faces, and fully uniform normals verified via Blender automated `qa_check.py` profile `game` (0 errors, 0 warnings).
     * Multi-Material Slots: (1) `M_Cartridge_Shell` (Matte anthracite polycarbonate, roughness 0.55, metalness 0.15), (2) `M_Cartridge_Accent` (Subtle acrylic light guide, roughness 0.22, metalness 0.12, emissive 0.65–0.85 intensity), (3) `M_Cartridge_Label` (Foil sticker backing with canvas UVs), (4) `M_Cartridge_Contacts` (Gold terminal connectors, roughness 0.25, metalness 0.95).
     * File Size & Master Source: Exported as an ultra-compact **18.9 KB** GLB binary (`public/assets/cartridge.glb` and `public/cartridge.glb`); master procedural `.blend` saved at `src/assets/3d/cartridge.blend`.
   - **Procedural Label Texture Synthesis ([src/components/3d/cartridgeLabelTexture.ts](file:///c:/Projects/Personal/alirezaft.github.io/src/components/3d/cartridgeLabelTexture.ts)):**
     * 100% in-memory HTML5 canvas procedural texture (0 KB network transfer).
     * Renders holographic grid patterns, category accent banners, dynamic Code-128 barcode strips, hardware revision hashes, and warning badges.
   - **High-Visibility Typography & Visual Cleanliness ([src/components/3d/DataCartridge.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/3d/DataCartridge.tsx)):**
     * Single project title rendered directly on the faceplate using UI-matched `JetBrains Mono` (`/fonts/JetBrainsMono-Bold.woff`), precisely scaled (`fontSize: 0.0054` at `[0, 0.056, 0.0074]`) for legibility inside the label window with no text clutter.
     * All distracting redundant texts (category names, top spine marquee headers, side rack guides) removed to ensure visual comfort.
     * Eye-comfort lighting: Emissive and rack point lighting calibrated to restrained values (`emissiveIntensity: 0.65`, point light `intensity: 1.0`), eliminating eye strain and bloom blowout.
   - **Tabletop 4-Tier Rack Assembly ([src/components/3d/CartridgeRack.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/3d/CartridgeRack.tsx)):**
     * Resting directly on desk surface at `[-0.62, 0.76, 0.86]` and angled `0.48 rad` (~27.5°) toward seated player.
     * Populates all 9 showcase projects color-coded across 4 tiers: Row 1 (Commercial Games, Magenta `#ff007f`), Row 2 (VR & Spatial Apps, Cyan `#00f3ff`), Row 3 (Open Source, Green `#00ff66`), Row 4 (Dev Tools, Amber `#ffb700`).

10. **First-Person Center-Crosshair Raycaster & Interaction Framework ([src/components/3d/CrosshairInteraction.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/3d/CrosshairInteraction.tsx)):**
    - **Architectural Motivation:** In a seated first-person workstation with pointer lock, the mouse cursor is locked and hidden. Traditional R3F cursor mouse events (`onPointerOver`/`onClick`) fail to align with the camera crosshair.
    - **Continuous Center-Screen Raycasting (`CrosshairRaycaster`):** Every frame, casts an analytical ray from camera viewport center `(0, 0)` in NDC across all registered 3D interactables within a 3.5m reach radius.
    - **Single Source of Truth (SSOT) Hover State (`useCrosshairInteractable`):**
      * Eliminates fragile local `useState` hover tracking in individual 3D components. Instead, `useCrosshairInteractable` returns a reactive `{ isHovered }` boolean derived strictly from `activeId === config.id`.
      * Guarantees that in the entire 3D universe, **at most one interactable can ever be hovered at any given millisecond**, completely preventing multiple items from floating simultaneously or desyncing.
    - **Window Blur, Visibility & Pointer Lock Lifecycle Guard:**
      * Attached listeners for `window.onblur`, `document.onvisibilitychange`, and `document.onpointerlockchange` immediately trigger `clearFocus()`.
      * Suspends raycasting whenever the tab is hidden or `isProjectDrawerOpen` is true.
      * When leaving the window or pressing Escape, all interactables immediately drop back to baseline resting elevation ($0\text{ cm}$), completely curing the "phantom floating cartridge" bug.
      * Frame animation loops clamp delta (`Math.min(delta, 0.05)`) and snap to exact 0 when within $0.0004\text{m}$, preventing floating drift when returning from background throttled tabs.
    - **Tactical Reticle HUD ([src/components/3d/ReticleOverlay.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/3d/ReticleOverlay.tsx)):**
      * Reticle outer ring expands and glows amber when an interactable is focused.
      * Displays contextual prompt under crosshair (e.g., `GRAB // KINGDOM HERO`).
      * Plays subtle synthesized audio hover chime and click feedback.
    - **Strict Isolation:** Affects only the 3D environment; Recruiter Quick-View mode remains 100% untouched.

11. **First-Person Weapon/Tool Viewmodel Engine & In-Hand Cartridge Inspection:**
    - **Tactile Weapon/Tool Viewmodel ([src/components/3d/CartridgeViewmodel.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/3d/CartridgeViewmodel.tsx)):**
      * Designed to mirror first-person weapon and item handling from AAA games (*Cyberpunk 2077*, *Half-Life*, *Prey*).
      * **Flight Trajectory Interpolation ([src/components/3d/cartridgeSlotHelper.ts](file:///c:/Projects/Personal/alirezaft.github.io/src/components/3d/cartridgeSlotHelper.ts)):** Clicking any cartridge lifts it smoothly from its exact rack world position and orientation into the player's viewmodel hand over ~0.35s (cubic ease-out).
      * **Rest Pose:** Held in the lower-right viewport quadrant (`[0.17, -0.13, -0.32]` camera space), angled toward the player's eyes so faceplate typography and gold contacts are clearly readable.
      * **Inertial Mouse Look Sway:** Tracks camera angular velocity (`deltaYaw`, `deltaPitch`), causing the held cartridge to lag behind and roll into camera turns with spring damping (`THREE.MathUtils.damp`).
      * **Organic Idle Breathing:** Harmonic oscillation (`Math.sin(time * 2.0) * 0.0022`) keeps the held cartridge feeling alive in hand.
      * **Tactical Inspect Pose (Right-Click Zoom):** Holding Right-Click smoothly brings the cartridge to the center of the viewport (`[0.02, -0.05, -0.22]`) for extreme close-up inspection, simultaneously boosting acrylic emissive intensity (up to 1.35).
      * **Dedicated Specular Fill Light:** Attached point light (`intensity: 0.4`, `distance: 0.8`) matches category accent color, casting subtle specular highlights across the held cartridge.
    - **Complete Extraction & Shelf Emptiness ([src/components/3d/CartridgeRack.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/components/3d/CartridgeRack.tsx)):**
      * When a cartridge is picked up, the entire cartridge model is transferred to the player's hand and nothing is left behind on the shelf (the slot is completely vacated).
      * When returned, the whole cartridge model is smoothly returned into the shelf slot without any premature pop-in or duplicate geometry.
    - **In-Hand Controls & Auto Pointer-Lock Release ([src/context/UIContext.tsx](file:///c:/Projects/Personal/alirezaft.github.io/src/context/UIContext.tsx)):**
      * **Left-Click (LMB):** Inserts cartridge when targeting Drive 0 (dossier pop-up on click removed per ergonomics review).
      * **Return to Rack (`[E]` / `[Esc]`):** Smoothly flies the cartridge back into its shelf slot.
      * **Auto Cursor Release:** Opening the project drawer automatically calls `document.exitPointerLock()` so the mouse cursor is immediately freed to scroll, read, and click links in the 2D case study.
      * **Cartridge Swapping:** Aiming and clicking another cartridge on the shelf automatically returns the currently held cartridge and grabs the new one.
      * **Tactical Bottom HUD Card:** Displays active held status (`HELD // [TITLE]`), with instructions to aim at Drive 0 and return button `RETURN TO SHELF [E / ESC]`.

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
* **Architectural Decisions & Milestone Execution:**
  - **Asset Specification & Performance Guide Authored ([ASSET_SPECIFICATION_AND_PERFORMANCE_GUIDE.md](file:///c:/Projects/Personal/alirezaft.github.io/ASSET_SPECIFICATION_AND_PERFORMANCE_GUIDE.md)):**
    * Photorealistic generative AI visual prompts for all 9 workstation assets.
    * Strict performance ceilings: < 3,500 tris per asset, draw call ceiling < 35 calls/frame, clamped DPR [1, 1.5], zero shadow-casting point lights, zero-cost emissive PBR shaders.
  - **Step 4.1: First-Person Desk Camera & Pointer Lock Controller [COMPLETED]:**
    * Implemented DeskCameraControls.tsx: Pointer Lock API with clamped seated pitch (-40° to +50°) and yaw (-75° to +75°); smooth Right-Click FOV zoom lerp (45° -> 22°) with camera forward nudge; touch drag look and mobile zoom button fallback.
    * Implemented ReticleOverlay.tsx: Minimalist glowing cyan center reticle dot with dynamic hover focus rings and desktop click-to-engage prompt.
  - **Step 4.2: Cyber-Deck Desk & 3-Point Neon Lighting Rig [COMPLETED]:**
    * Implemented CyberDesk.tsx: True seated scale (2.4m x 1.1m at y=0.76m), chamfered edges, recessed neon cyan strip (#00f3ff, emissiveIntensity: 2.6), tubular steel legs, crossbars, cable grommets, and chrome hex hardware bolts.
    * Implemented cyberTextures.ts: 100% in-memory procedural canvas texture engine (0 KB network payload) generating analytical carbon-fiber weave normal & roughness maps, 45° caution hazard striping, and brushed technical inlays.
    * Implemented CyberLighting.tsx: 3-Point forward lighting rig (Cyan Key at [2.4, 3.0, 1.8], Magenta Rim at [-2.8, 2.5, -1.2], Amber Accent at [0.8, 1.4, 0.6], and Under-Desk Ground Glow) with ContactShadows (opacity: 0.72) and zero shadow-cubemap overhead.
    * Implemented CyberPostProcessing.tsx: Hardware Mipmap Bloom (luminanceThreshold: 0.82, intensity: 1.2) and cinematic Vignette.
    * Replaced temporary cube demo in App.tsx with full live desk and lighting rig.
    * Multi-agent execution: desk-3d-engineer (geometry/lighting) + art-director-texture (PBR materials & procedural textures, Grade A+ artistic sign-off).
    * Build status verified with `npm run build` (Exit code 0).
  - **Step 4.2.5: Developer Performance Telemetry Monitor [COMPLETED]:**
    * Implemented DevPerfMonitor.tsx in `src/components/dev/`: real-time in-engine diagnostic HUD measuring draw calls, rendered triangles, total scene geometry triangles, rendered vertices, total scene vertices, FPS, frame time (ms), min/max FPS, textures, geometries, shader programs, JS heap memory, resolution, DPR, and unmasked GPU renderer.
    * Decoupled architecture: mounted into `document.body` via isolated React DOM root (`createRoot`) with throttled 150ms state updates to completely avoid R3F reconciler re-renders and measurement distortion.
    * Integrated dual UI modes (compact status chip and expanded diagnostic dashboard) with `~` / `F3` keyboard shortcuts, Left/Right docking, and pointer lock isolation (`stopPropagation`).
    * Gated by `{import.meta.env.DEV && <DevPerfMonitor hidden={viewMode === 'recruiter'} />}` in `src/App.tsx` for automatic tree-shaking and single-line removal before release.
    * Resolved shelf cartridge respawn & CRT screen visibility bugs:
      - **Shelf Extraction State:** Updated `CartridgeRack.tsx` to check `insertedProjectId === project.id` alongside `heldProjectId` and `returningProjectId`, preventing cartridges from premature respawn on the shelf while slotted in the drive.
      - **CRT Transform Dimensions & Visibility:** Re-engineered `<Html transform>` scaling and positioning in `CrtScreen.tsx` and `CrtWorkstation.tsx`: removed compounding `scale=0.00048` and `distanceFactor=1.2` which had shrunk the DOM container to 1mm; calibrated to `scale=0.0188` (matching the 0.35m × 0.265m bezel opening) with default Drei z-index ordering and `0.005m` clearance in front of the cathode faceplate. Added `e.stopPropagation()` to screen buttons to isolate DOM interactions from the WebGL pointer lock.
      - **Simplified, Uncluttered Default Screen Hub:** Redesigned Mode A into a clean, legible developer terminal hub replacing the noisy ASCII block and dummy registers with 3 clear high-signal cards: (1) Insert a Cartridge → View Projects, (2) Probe an IC Chip → Inspect Skills, (3) Recruiter Quick-View → Verified CV (with a direct `[SWITCH MODE]` button).
      - **CSS Stacking Context & HUD Occlusion Fix:** Isolated the entire 3D canvas viewport using `relative z-0 isolate` on the canvas container and elevated `Hud.tsx` to `z-40`, guaranteeing that 3D-transformed CRT screen elements never leak out of the canvas stacking context to overlap or occlude the site header, tabs, or modal drawers when looking down.
    * Verified production build with `npm run build` (Exit code 0).
  - **Step 4.3: Hero 3D Data Cartridge Asset & 4-Tier Workstation Rack [COMPLETED]:**
    * Modeled watertight, single-mesh `SM_DataCartridge` (256 tris, 136 verts) in Blender 5.2 via MCP server connection. Validated through automated `qa_check.py` with 0 errors/warnings.
    * Assigned 4 standard materials: Shell (anthracite matte), Accent (emissive acrylic light guide), Label (foil backing with canvas UVs), Contacts (gold terminals).
    * Procedural label generator (`cartridgeLabelTexture.ts`) renders high-res foil background with barcode and category branding.
    * Scaled & positioned single title on faceplate using UI-matched `JetBrains Mono` (`/fonts/JetBrainsMono-Bold.woff`).
    * Built 4-Tier stepped rack (`CartridgeRack.tsx`) sitting on desk tabletop at `[-0.62, 0.76, 0.86]`, populated with all 9 projects.
    * Calibrated lighting to eye-comfortable ambient levels, eliminating bloom blowout.
  - **Step 4.3.5: Center Crosshair FPS Interaction System [COMPLETED]:**
    * Implemented `CrosshairInteraction.tsx` (`CrosshairProvider`, `CrosshairRaycaster`, `useCrosshairInteractable`).
    * Center NDC `(0, 0)` continuous camera raycasting drives hover focus, lifts targeted cartridge by $+2.8\text{cm}$, pulses light guide, and shows HUD prompt.
    * Zero impact on recruiter quick-view mode.
  - **Step 4.3.6: First-Person Weapon/Tool Viewmodel & Inspection System [COMPLETED]:**
    * Implemented `CartridgeViewmodel.tsx` and `cartridgeSlotHelper.ts`: clicking a cartridge smoothly glides it from the shelf into the player's viewmodel hand (~0.35s cubic ease).
    * Integrated inertial mouse look sway and organic idle breathing.
    * Implemented Inspect Pose: holding Right-Click zoom brings the cartridge to center-screen for detailed visual inspection with boosted acrylic glow.
    * Whole cartridge is transferred to player with nothing left behind on the shelf slot; returns seamlessly upon release.
    * Left-Click opens dossier; `[E]`/`[Esc]` returns cartridge to shelf; pointer lock auto-exits on drawer open.
    * Resolved shelf cartridge respawn & CRT screen visibility bugs:
      - **Shelf Extraction State:** Updated `CartridgeRack.tsx` to check `insertedProjectId === project.id` alongside `heldProjectId` and `returningProjectId`, preventing cartridges from premature respawn on the shelf while slotted in the drive.
      - **CRT Transform Dimensions & Visibility:** Re-engineered `<Html transform>` scaling and positioning in `CrtScreen.tsx` and `CrtWorkstation.tsx`: removed compounding `scale=0.00048` and `distanceFactor=1.2` which had shrunk the DOM container to 1mm; calibrated to `scale=0.0188` (matching the 0.35m × 0.265m bezel opening) with default Drei z-index ordering and `0.005m` clearance in front of the cathode faceplate. Added `e.stopPropagation()` to screen buttons to isolate DOM interactions from the WebGL pointer lock.
      - **Simplified, Uncluttered Default Screen Hub:** Redesigned Mode A into a clean, legible developer terminal hub replacing the noisy ASCII block and dummy registers with 3 clear high-signal cards: (1) Insert a Cartridge → View Projects, (2) Probe an IC Chip → Inspect Skills, (3) Recruiter Quick-View → Verified CV (with a direct `[SWITCH MODE]` button).
      - **CSS Stacking Context & HUD Occlusion Fix:** Isolated the entire 3D canvas viewport using `relative z-0 isolate` on the canvas container and elevated `Hud.tsx` to `z-40`, guaranteeing that 3D-transformed CRT screen elements never leak out of the canvas stacking context to overlap or occlude the site header, tabs, or modal drawers when looking down.
    * Verified production build with `npm run build` (Exit code 0).
  - **Step 4.4: Integrated Procedural CRT Workstation & Computer Chassis [COMPLETED]:**
    * Designed and implemented unified procedural `CrtWorkstation.tsx` in `src/components/3d/`:
      - **Horizontal Desktop Computer Chassis:** 90s industrial form factor resting directly on the desk surface at `y = 0.76m` (width 0.54m, height 0.13m, depth 0.44m) in matte dark obsidian-black polymer/anodized aluminum.
      - **Drive 0 Cartridge Slot:** Front aperture lined with glowing cyan internal guide rails (`#00f3ff`), rear gold contact bus pins, drive activity LED, and reticle crosshair integration.
      - **Mechanical EJECT Button:** Tactile round plunger button with illuminated amber status ring (`#ffb700`) and audio click trigger that returns the held cartridge to the shelf.
      - **Metal-Shielded Cyber USB-A Port:** Exposed gold pin prongs and silkscreen label `BUS A // USB`.
      - **Diagnostic Telemetry LEDs:** Surface-mount `PWR` (Green `#00ff66`), `READ` (Cyan `#00f3ff`, dynamic read pulse when project is mounted), and `BUS` (Amber `#ffb700`).
      - **Swivel Riser Pedestal:** Connects the chassis top (`y = 0.89m`) to the monitor base (`y = 0.925m`).
      - **Curved CRT Monitor Housing:** Tapered bell housing with heat dissipation louvers, beveled front bezel, rotary brightness/contrast dials, and green phosphor power LED. Tilted upward by ~4.6° (`-0.08 rad`) to face the seated player's camera at eye level (`y = 1.15m`).
    * Implemented vector-sharp `<Html transform>` `CrtScreen.tsx`:
      - CRT horizontal scanlines, barrel vignette, and phosphor bloom overlay.
      - **Mode A (Idle Boot CLI):** Displays ASCII system banner, 64MB memory test, kernel telemetry, uptime ticker, and interactive task guidance.
      - **Mode B (Mounted Dossier):** Zero-content-drift data binding to `heldProject` from `src/content/projects/`, showing category badge, impact metrics (e.g. 50M+ downloads), technical highlights, embedded looping video/GIF media carousel, and `[OPEN FULL DOSSIER]` action trigger.
    * Resolved shelf cartridge respawn & CRT screen visibility bugs:
      - **Shelf Extraction State:** Updated `CartridgeRack.tsx` to check `insertedProjectId === project.id` alongside `heldProjectId` and `returningProjectId`, preventing cartridges from premature respawn on the shelf while slotted in the drive.
      - **CRT Transform Dimensions & Visibility:** Re-engineered `<Html transform>` scaling and positioning in `CrtScreen.tsx` and `CrtWorkstation.tsx`: removed compounding `scale=0.00048` and `distanceFactor=1.2` which had shrunk the DOM container to 1mm; calibrated to `scale=0.0188` (matching the 0.35m × 0.265m bezel opening) with default Drei z-index ordering and `0.005m` clearance in front of the cathode faceplate. Added `e.stopPropagation()` to screen buttons to isolate DOM interactions from the WebGL pointer lock.
      - **Simplified, Uncluttered Default Screen Hub:** Redesigned Mode A into a clean, legible developer terminal hub replacing the noisy ASCII block and dummy registers with 3 clear high-signal cards: (1) Insert a Cartridge → View Projects, (2) Probe an IC Chip → Inspect Skills, (3) Recruiter Quick-View → Verified CV (with a direct `[SWITCH MODE]` button).
      - **CSS Stacking Context & HUD Occlusion Fix:** Isolated the entire 3D canvas viewport using `relative z-0 isolate` on the canvas container and elevated `Hud.tsx` to `z-40`, guaranteeing that 3D-transformed CRT screen elements never leak out of the canvas stacking context to overlap or occlude the site header, tabs, or modal drawers when looking down.
    * Verified production build with `npm run build` (Exit code 0).
  - **Step 4.4.5: Interactive Cartridge Slotting, Multi-Stage Insertion & CRT Mount [COMPLETED]:**
    * Implemented full tactile docking loop across `CartridgeViewmodel.tsx`, `CrtWorkstation.tsx`, `CrtScreen.tsx`, and `UIContext.tsx`:
      - **Flow Execution:**
        1. Player picks up cartridge from 4-tier rack into viewmodel hand.
        2. Reticle raycaster aims at Drive 0 aperture on computer chassis (`INSERT // [TITLE] [CLICK]`).
        3. Left-Click initiates insertion: cartridge glides smoothly to the drive mouth (`0.42s`, cubic ease), reorienting horizontally (`-90°` pitch) so gold pins face into the aperture and the holographic title label faces upward.
        4. Cartridge slides slowly straight into the slot (`0.58s`, gentle deceleration) until seated with `~3cm` of the acrylic light guide protruding from the aperture.
        5. Mechanical latching trigger plays `playClick()` and `playCrtPowerOn()`; CRT monitor displays dynamic mounting telemetry, switches to Mode B dossier with video/GIF preview, and pulses the front panel Read LED (`#00f3ff`).
        6. Clicking physical EJECT button on chassis or pressing `[E]` / `[Esc]` smoothly slides the cartridge out of the slot and returns it to hand with CRT power-down sound (`playCrtPowerOff()`).
    * Resolved shelf cartridge respawn & CRT screen visibility bugs:
      - **Shelf Extraction State:** Updated `CartridgeRack.tsx` to check `insertedProjectId === project.id` alongside `heldProjectId` and `returningProjectId`, preventing cartridges from premature respawn on the shelf while slotted in the drive.
      - **CRT Transform Dimensions & Visibility:** Re-engineered `<Html transform>` scaling and positioning in `CrtScreen.tsx` and `CrtWorkstation.tsx`: removed compounding `scale=0.00048` and `distanceFactor=1.2` which had shrunk the DOM container to 1mm; calibrated to `scale=0.0188` (matching the 0.35m × 0.265m bezel opening) with default Drei z-index ordering and `0.005m` clearance in front of the cathode faceplate. Added `e.stopPropagation()` to screen buttons to isolate DOM interactions from the WebGL pointer lock.
      - **Simplified, Uncluttered Default Screen Hub:** Redesigned Mode A into a clean, legible developer terminal hub replacing the noisy ASCII block and dummy registers with 3 clear high-signal cards: (1) Insert a Cartridge → View Projects, (2) Probe an IC Chip → Inspect Skills, (3) Recruiter Quick-View → Verified CV (with a direct `[SWITCH MODE]` button).
      - **CSS Stacking Context & HUD Occlusion Fix:** Isolated the entire 3D canvas viewport using `relative z-0 isolate` on the canvas container and elevated `Hud.tsx` to `z-40`, guaranteeing that 3D-transformed CRT screen elements never leak out of the canvas stacking context to overlap or occlude the site header, tabs, or modal drawers when looking down.
    * Verified production build with `npm run build` (Exit code 0).
  - **Step 4.4.6: Viewmodel Overlay Canvas & Reticle Ergonomics Polish [COMPLETED]:**
    * **Viewmodel Overlay Canvas (CRT Depth Fix):** Rendered `CartridgeViewmodel` inside a dedicated, transparent foreground `<Canvas>` (z-index 110, `pointer-events-none`) with synchronous camera broadcasting (`MainCameraBroadcaster` -> `OverlayCameraReceiver`). Physically guarantees that the CRT monitor HTML screen content is rendered BEHIND the data cartridge the user is holding in hand.
    * **Removed Click-to-Open Tech Specs Feature on Held Cartridge:** Removed automatic dossier popup when clicking in viewport with a held cartridge (`handleEmptyClick`), and removed the redundant `ACCESS DOSSIER [LMB]` button from the bottom held HUD card.
    * **Streamlined Reticle Interaction Prompts:** Stripped out verbose, multi-action reticle text and titles. Prompts now exclusively show concise action-oriented instructions (`LMB to grab`, `LMB to insert`, `LMB to eject`, `LMB to connect`, `LMB to view`). Reticle remains completely clean with no text clutter when looking at non-interactable surfaces.
    * Production build verified passing with `npm run build` (Exit code 0).
  - **Step 4.4.7: Cartridge Insertion Disappearance & Slot-to-Hand Eject Trajectory [COMPLETED]:**
    * **Inserted Cartridge Disappearance:** Fixed state where the inserted cartridge remained rendered and floating over the drive bay after insertion completed. `CartridgeViewmodel` now sets `visible = false` and returns `null` when `cartridgeDriveState === 'inserted'`.
    * **Slot-to-Hand Eject Flight:** Fixed bug where ejecting a cartridge caused it to suddenly fly into hand from the shelf. Added `isFromEject` tracking flag so when eject animation completes (`ejectProgress >= 1`), `flightProgress` remains at `1` (held in hand), preventing the grab-from-shelf flight animation from triggering. The cartridge now cleanly slides out of the Drive 0 slot aperture and flies directly into the player's viewmodel hand from the slot.
    * Production build verified passing with `npm run build` (Exit code 0).
  - **Step 4.4.8: Dual-Pipeline Cartridge Rendering & Hollow Drive Cavity Occlusion [COMPLETED]:**
    * **Root Cause Confirmation:** The user's diagnosis was 100% accurate. Because `CartridgeViewmodel` was previously moved to the foreground overlay `<Canvas>` (z-index 110) to fix the CRT monitor depth issue, it was rendering on top of the background canvas with zero depth testing against the computer chassis. This caused the cartridge to render in front of the entire computer casing during insertion. Furthermore, an earlier workaround had set `visible = false` on insertion completion, causing the cartridge to abruptly vanish.
    * **Dual-Pipeline Viewmodel Architecture (`renderMode`):**
      - `renderMode="hand"` (Overlay Canvas): Renders the cartridge ONLY while held in the player's viewmodel hand (`cartridgeDriveState === 'idle'` and inspect zoom). Ensures the CRT monitor's HTML screen content is rendered BEHIND the held cartridge.
      - `renderMode="docked"` (Main Canvas): Renders the cartridge during `inserting`, `inserted`, and `ejecting` directly inside the main 3D scene. The computer chassis physically depth-tests against the cartridge, naturally hiding the portion inserted inside the computer.
    * **Physical Hollow Drive Bay Aperture (`CrtWorkstation.tsx`):**
      - Replaced the solid `RoundedBox` faceplate covering the drive bay with an authentic 4-piece chamfered bezel aperture (10.2cm × 2.2cm opening).
      - Built a hollow interior slot cavity (cavity ceiling, floor, side walls, rear wall, elongated cyan guide rails, and recessed gold terminal pins).
      - When inserted, the cartridge slides into the cavity; the top chassis and front bezel hide the inserted ~7.5cm, leaving the rear ~3.5cm grip naturally and authentically visible protruding from the slot aperture.
    * Verified production build with `npm run build` (Exit code 0).
  - **Step 4.4.9: Insertion Step 1 Trajectory & Full Insertion Disappearance [COMPLETED]:**
    * **Root Cause for Invisible Step 1:** In `renderMode="docked"`, the docked viewmodel previously returned `null` while `idle`, meaning `<group ref={rootRef}>` mounted only when `cartridgeDriveState` changed to `'inserting'`. In `useEffect`, `rootRef.current.position.clone()` was capturing its initial unpositioned `(0, 0, 0)` default origin on the floor under the desk. In Step 1 (`p < 0.42`), the cartridge interpolated from under the desk up to the slot mouth, hiding it completely under the desk surface until Step 2 (`p >= 0.42`).
    * **Hand-to-Slot Flight Continuity:** Removed `(0, 0, 0)` origin capture from `useEffect`. On the first frame of `inserting` inside `useFrame`, `insertStartPos` and `insertStartQuat` are dynamically initialized to the exact current camera viewmodel hand transform (`targetHandWorldPos` and `targetHandWorldQuat`). The cartridge now smoothly and visibly glides from the player's hand across the screen to in front of the drive slot mouth (Step 1).
    * **Full Insertion Disappearance (Step 3):** Preserved Step 2 sliding into the hollow cavity, and restored `setVisible(false)` and `return null` upon full insertion (`insertProgress >= 1`). The cartridge disappears cleanly into the PC drive bay once seated, and CRT monitor powers on with the dossier.
    * Verified production build with `npm run build` (Exit code 0).
  - **Step 4.4.10: Layout-Independent Keyboard Controls (Multi-Language Physical Key Mapping) [COMPLETED]:**
    * **Root Cause:** Key listeners across the application previously relied on `e.key.toLowerCase() === 'e'`. When the user's OS keyboard was set to a non-English layout (e.g. Persian, Arabic, Russian, French, German), pressing the physical 'E' key yielded localized characters (such as `'ث'` or `'у'`), preventing `[E]` return/eject actions from firing.
    * **Universal Physical Key Mapping (`e.code`):** Updated `UIContext.tsx`, `DevPerfMonitor.tsx`, `ProjectMediaCarousel.tsx`, `Hud.tsx`, and `AudioTestPage.tsx` to bind to `e.code` (e.g. `'KeyE'`, `'Escape'`, `'Backquote'`, `'F3'`, `'ArrowLeft'`, `'ArrowRight'`, `'Enter'`, `'Space'`). Physical keys now trigger their respective controls universally regardless of the active keyboard input language or layout.
    * **Input Protection:** Added explicit guards ignoring shortcuts when the user is typing into text inputs, search boxes, or textareas, while preserving `Escape` to blur/dismiss.
    * Verified production build with `npm run build` (Exit code 0).



---

## 4. Current File Tree

```
c:\Projects\Personal\alirezaft.github.io\
├── .github/
│   └── workflows/
│       └── deploy.yml              # GITHUB ACTIONS CI/CD DEPLOYMENT
├── graphify-out/                   # KNOWLEDGE GRAPH & ARCHITECTURAL INTELLIGENCE
│   ├── graph.html                  # Interactive visualizer (open in browser)
│   ├── graph.json                  # GraphRAG knowledge graph data
│   ├── GRAPH_REPORT.md             # Graph audit & community breakdown
│   ├── cost.json                   # Token cost tracking
│   └── manifest.json               # Incremental update manifest
├── public/
│   ├── assets/
│   │   ├── cyberdeck_station_preview.jpg # 16:9 3D WORKSTATION CONCEPT RENDER
│   │   ├── cartridge.glb           # 18.9 KB 256-TRI HERO DATA CARTRIDGE (ROOT MIRROR)
│   │   ├── models/                 # TARGET DIRECTORY FOR HERO GLB PROPS
│   │   │   ├── byte.glb            # [PLANNED] COMPANION PET ROBOT
│   │   │   ├── cartridge.glb       # 18.9 KB 256-TRI HERO DATA CARTRIDGE
│   │   │   ├── probe.glb           # [PLANNED] MULTIMETER LOGIC PROBE
│   │   │   └── usb.glb             # [PLANNED] ENCRYPTED RESUME USB KEY
│   │   ├── fonts/
│   │   │   └── JetBrainsMono-Bold.woff # TYPOGRAPHY FOR 3D CARTRIDGE LABELS
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
│   │   ├── dev/                    # DEV-ONLY PERFORMANCE TELEMETRY
│   │   │   └── DevPerfMonitor.tsx  # TRIS, VERTS, DRAW CALLS, FPS & VRAM MONITOR
│   │   ├── 3d/                     # SEATED 1ST-PERSON 3D CYBER-DECK SYSTEM
│   │   │   ├── CyberDesk.tsx       # PROCEDURAL DESK, STRUTS, CABLES & GROMMETS
│   │   │   ├── CyberLighting.tsx   # 3-POINT NEON RIG + UNDERGLOW + CONTACT SHADOWS
│   │   │   ├── CyberPostProcessing.tsx # HARDWARE MIPMAP BLOOM & VIGNETTE
│   │   │   ├── cyberTextures.ts    # PROCEDURAL CARBON-FIBER, HAZARD & INLAY MAPS
│   │   │   ├── DeskCameraControls.tsx # POINTER LOCK, SEATED CLAMPED LOOK & ZOOM
│   │   │   ├── ReticleOverlay.tsx  # CENTER CYBER RETICLE & HOVER PROMPTS
│   │   │   ├── cartridgeLabelTexture.ts # PROCEDURAL CANVAS FOIL LABEL ENGINE
│   │   │   ├── cartridgeSlotHelper.ts  # WORLD DOCKING BAY TRANSFORM CALCULATOR
│   │   │   ├── CrosshairInteraction.tsx # CENTER-SCREEN NDC (0,0) FPS RAYCASTER
│   │   │   ├── DataCartridge.tsx   # 3D CARTRIDGE PROP WITH DYNAMIC ACRYLIC GLOW
│   │   │   ├── CartridgeRack.tsx   # 4-TIER TABLETOP SHELF & EMPTY BAY DOCKING
│   │   │   ├── CartridgeViewmodel.tsx # FIRST-PERSON WEAPON/TOOL VIEWMODEL SYSTEM
│   │   │   └── index.ts
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

1. **Step 4.1: First-Person Desk Camera & Pointer Lock Controller [COMPLETED]**
   - Implemented DeskCameraControls.tsx (Pointer Lock, reticle dot, clamped pitch/yaw, Right-Click FOV zoom lerp, touch fallback).
2. **Step 4.2: Cyber-Deck Workstation & 3-Point Neon Lighting [COMPLETED]**
   - Implemented CyberDesk.tsx, CyberLighting.tsx, CyberPostProcessing.tsx, and cyberTextures.ts (procedural carbon-fiber weave normal/roughness, hazard striping, hex bolts, contact shadows).
   - Wired procedural ambient PCB hum audio loop into the 3D scene: continuous background hum (pink noise + 60 Hz fundamental + 120 Hz 2nd harmonic for mobile/laptop speakers) active in 3D Cyber-Deck mode, seamlessly pausing in Recruiter Quick-View and respecting master volume/mute. Autoplay unlock listeners ensure immediate playback on first interaction without console warnings.
3. **Step 4.2.5: In-Engine Performance Telemetry Monitor [COMPLETED]**
   - Implemented DevPerfMonitor.tsx (Tris, Verts, Draw Calls vs <35 budget, FPS/Frame Time, VRAM textures/geometries, JS Heap vs <85MB target, isolated DOM root, instant removal).
4. **Step 4.3: Hero 3D Models Generation via Blender 5.2:**
   - Execute headless Python scripts in Blender 5.2 (C:\Program Files\Blender Foundation\Blender 5.2\blender.exe) to generate initial stylized, optimized .glb models into public/assets/models/:
     * cartridge.glb (Cyberpunk game data cartridge with dynamic artwork label recess and gold contact pins)
     * yte.glb (Pet companion robot with body, runner pads, and articulated neck node for reticle tracking)
     * probe.glb (Knurled logic probe with needle tip and cable strain relief)
     * usb.glb (Encrypted cyber USB key with lanyard loop and metal plug)
4. **Step 4.4: Interactive CRT Workstation & Computer Chassis [COMPLETED]:**
   - Implemented CrtWorkstation.tsx (horizontal chassis, cartridge slot, USB port, eject button, LEDs) and CrtScreen.tsx (<Html transform> boot terminal CLI + dynamic project dossier).
5. **Step 4.5: Cartridge Physics & USB Resume Decryption [NEXT]:**
   - Implement CartridgeRack.tsx, ComputerDeck.tsx, and UsbKey.tsx with Left-Click lerp grab, magnetic drive snapping, mechanical eject button, and auto-downloading Alireza_Forghani_Toosi_Resume.pdf.
6. **Step 4.6: PCB Motherboard & Multimeter Logic Probe Tool:**
   - Implement CircuitTestBench.tsx and MultimeterProbe.tsx with spark SFX, bus pulses, and CRT telemetry sync.
7. **Step 4.7: Byte Companion Pet Behaviors:**
   - Implement ByteCompanion.tsx with pixel emoticon face canvas (( ^ _ ^ ), ( > ᗢ < ), etc.), reticle head tracking, microchip feeding dish, and contextual speech bubbles.
