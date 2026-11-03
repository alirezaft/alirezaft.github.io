# Project Handoff & Decision History: Cyberpunk Unity Game Developer Portfolio

> **Target Audience for this Document:** Antigravity AI agents or human developers continuing work on this project across devices. This document captures the entire conversation history, decision tree, architectural rationale, implementation progress, and execution blueprint.

---

## 1. Project Overview & Client Profile

* **Client:** Unity Game Developer (specialized in C#, gameplay systems, shaders, and optimization).
* **Objective:** An interactive 3D web portfolio that showcases game development capabilities while remaining blazing fast, accessible to hiring managers, and easily maintainable.
* **Hosting Platform:** GitHub Pages (`c:\Alirezaftgithubpages`).
* **Key Artifacts in Repository:**
  * [`portfolio_specification.md`](file:///c:/Alirezaftgithubpages/portfolio_specification.md) — Full Product Requirements Document (PRD).
  * [`EXECUTION_PLAN.md`](file:///c:/Alirezaftgithubpages/EXECUTION_PLAN.md) — 9-Phase Step-by-Step Execution Plan.
  * [`Handoff.md`](file:///c:/Alirezaftgithubpages/Handoff.md) — This living handoff document.

---

## 2. Decision-Making History & Requirements Gathering

The project was shaped through a collaborative `/grill-me` architectural interview exploring each branch of the design tree. Below is the full chronological record of decisions and their rationale:

### Decision 1: Core Interactive Format & Technical Medium
* **Problem:** Unity developers often consider compiling their entire portfolio as a Unity WebGL build. However, Unity WebGL suffers from large initial downloads (20–60MB+), poor mobile compatibility, long first-paint latency, and friction for recruiters.
* **Options Considered:**
  1. Full Unity WebGL build.
  2. 2D/2.5D canvas game HUD.
  3. Hybrid minimal case-study site.
  4. Lightweight 3D Web Experience (Three.js / React Three Fiber).
* **Selected Decision:** **Lightweight 3D Web Experience (Three.js / React Three Fiber)** with external/modal Unity WebGL links.
* **Rationale:** Instant initial load (< 3s), 60fps on mobile and desktop, zero asset bloat, full DOM accessibility.

### Decision 2: Theme & Visual Metaphor
* **Selected Decision:** **Cyberpunk / Neon Game Lab (Developer Desk Station)**.
* **Visual Direction:** Dark synthwave base palette (`#050811`), glowing cyan (`#00f3ff`), magenta (`#ff007f`), and amber (`#ffb700`) neon accents, CRT scanlines, bloom post-processing, and tactile hardware props.

### Decision 3: Recruiter Accessibility (The 3D Portfolio Dilemma)
* **Problem:** Hiring managers and recruiters spend an average of 30 seconds scanning a portfolio and may not want to navigate 3D spatial controls.
* **Selected Decision:** **Hybrid Dual-Mode UX**.
  * **3D Cyber-Deck:** The hero interactive playground for gamers and developers.
  * **Recruiter Quick-View:** A persistent top HUD button that toggles an instant, clean 2D card grid of all projects, technical skills, bio, and resume download.

### Decision 4: Project Showcase & Playback
* **Selected Decision:** **Interactive Desk CRT Monitor Playback + Slide-out Case Study Panel**.
* **Mechanics:** Clicking/inserting a project cartridge boots up the 3D desk's CRT monitor, streaming gameplay reel/video texture directly onto the 3D curved screen. Simultaneously, a high-tech slide-out drawer reveals the technical breakdown (architecture, C# patterns, shaders, performance metrics) and links (Steam, Itch.io, GitHub, Play WebGL Demo).

### Decision 5: Sound Design & Web Audio
* **Selected Decision:** **Tactile Sci-Fi SFX with Opt-In / Persistent Mute Switch**.
* **Audio Strategy:** Uses the **Web Audio API** for synthesized procedural sound effects (zero audio file downloads). Sounds include: CRT turn-on click/buzz, PCB electrical hum, USB insertion power surge, and robot chimes. Starts muted (respecting browser autoplay policies), with state saved in `localStorage`.

### Decision 6: Physical Desk Props & Content Mapping
* **Selected Decision:** Tangible props representing all key sections:
  1. **Data Cartridges:** Project showcases (slot into deck to play).
  2. **Holographic Datapad:** Bio, game dev philosophy, experience timeline.
  3. **Cyber Chipset Rack:** Hardware diagnostic test-bench for technical skills.
  4. **Comms Terminal:** Contact form and social links (GitHub, LinkedIn, Itch.io, etc.).
  5. **Encrypted USB Chip (Resume):** Physical USB key on the desk. Clicking/plugging it into the cyber-deck triggers a power-surge animation and downloads the Resume PDF!

### Decision 7: Mini-Game & Easter Egg
* **Selected Decision:** **"Byte" the Desk Robot Companion + Microchip Feeding Mechanic**.
* **Mechanics:** A small, cute cyberpunk desktop robot with an expressive digital screen face (blinking, happy, curious). Visitors can pet/click it or drag microchips to feed it. Upon feeding, it does a joyful spin, makes a cute chirp, and displays speech bubbles with game-dev trivia and project commentary.

### Decision 8: Technical Skills Architecture (Cyber Chipset Rack Deep Dive)
* **Visual:** An angled matte-black motherboard test-bench with illuminated copper bus traces.
* **Component Breakdown:**
  * **Central CPU:** Unity Engine & C# (large chip with glowing Unity emblem).
  * **GPU Coprocessor:** Shaders, HLSL, URP/HDRP, VFX Graph (pink/magenta with heat pipes).
  * **RAM Modules:** DOTS/ECS, Memory Profiling, Addressables (vertical DIMMs with blinking LEDs).
  * **Expansion ICs:** Physics, NavMesh AI, Multiplayer, Git CI/CD, Blender.
* **Telemetry Overlay:** Floating AR holographic schematic displaying genuine engineering metrics (State Machines, Draw Call Reduction, Zero-allocation GC loops) and cross-linking to shipped games.
* **Easter Egg Switch:** `[OVERCLOCK TEST]` toggle switch that surges all traces and revs fans.

### Decision 9: Engineering Stack & Hosting Requirements
* **Selected Decision:** **React 19 + Vite 6 + TypeScript 5.7 + React Three Fiber v9 + Drei v10 + Tailwind CSS v3 + Framer Motion v12**.
* **Hosting:** Configured for GitHub Pages (`base: './'`).
* **Performance Guarantees:**
  * Dynamic Pixel Ratio clamped to `[1, 1.5]` to prevent mobile overheating.
  * Low-poly procedural geometry (< 3MB total bundle).
  * Frameloop on-demand when static.
  * Graceful low-power fallback on low-end mobile devices.

### Decision 10: Content Architecture Strategy
* **Client Mandate:** **Never bundle content into a single monolithic file.**
* **Directory Structure:** Dedicated, modular folder structure (`src/content/projects/`, `src/content/skills/`, etc.) where each game project is an independent TypeScript file. Adding a project in the future only requires dropping in a new `.ts` file and exporting it in the index.

---

## 3. Implementation Progress & Activity Log

### Phase 0: Environment Setup & Scaffolding [COMPLETED]
* **Date:** 2026-11-02
* **Actions Taken:**
  1. Configured [`package.json`](file:///c:/Alirezaftgithubpages/package.json) with core packages:
     - `three` (`^0.174.0`), `@types/three` (`^0.174.0`)
     - `@react-three/fiber` (`^9.1.2`), `@react-three/drei` (`^10.0.7`), `@react-three/postprocessing` (`^3.0.4`)
     - `tailwindcss` (`^3.4.17`), `postcss` (`^8.5.3`), `autoprefixer` (`^10.4.20`)
     - `lucide-react` (`^1.16.0`), `framer-motion` (`^12.4.7`), `clsx` (`^2.1.1`), `tailwind-merge` (`^3.0.2`), `canvas-confetti` (`^1.9.4`)
  2. Configured [`vite.config.ts`](file:///c:/Alirezaftgithubpages/vite.config.ts) with `base: './'` for proper static asset resolution on GitHub Pages.
  3. Configured strict TypeScript build via `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`.
  4. Configured [`tailwind.config.js`](file:///c:/Alirezaftgithubpages/tailwind.config.js) with cyberpunk theme tokens (`cyber-bg: #050811`, `cyber-cyan: #00f3ff`, `cyber-magenta: #ff007f`, `cyber-amber: #ffb700`, `cyber-green: #00ff66`, `cyber-border: #1e293b`).
  5. Created directory structure for static assets:
     - `public/assets/videos/`
     - `public/assets/models/`
     - `public/assets/textures/`
     - `public/assets/icons/`
     - `public/vite.svg` (custom cyberpunk hex icon)
  6. Configured [`.gitignore`](file:///c:/Alirezaftgithubpages/.gitignore) ignoring `node_modules`, `dist`, logs, and `*.tsbuildinfo`.
  7. Built smoke-test in [`src/App.tsx`](file:///c:/Alirezaftgithubpages/src/App.tsx):
     - Working R3F `<Canvas>` with `dpr={[1, 1.5]}` clamping.
     - Responsive OrbitControls, cyberpunk Grid, lighting, 3D text, and rotating emissive cube.
     - 2D HUD header with status badges and test buttons.
  8. Verified production build: `npm run build` completed with code `0`, outputting strictly relative asset paths (`./assets/...`) in `dist/index.html`.

---

### Phase 1: Modular Content Architecture & Data Contracts [COMPLETED]
* **Date:** 2026-11-02
* **Actions Taken:**
  1. Ran `/grill-me` architectural interview to resolve data structure and classification dependencies:
     - 4 Shelf Categories: Shipped commercial games, VR games & applications, Open Source experiments, Tools.
     - Concise Portfolio Card contract with overview, key responsibilities, tech tags, metrics, and direct links.
     - Tiered Skill Circuit Component schema: Main CPU (Vital), Heavy ICs (Major), Medium ICs (Platforms/Integrations), Passive Modules (Supporting/Workflow).
     - Holographic Datapad 3-tab layout: Career Log, Operator Bio & Philosophy, Transmissions & Publications.
     - Playful & tech-savvy 'Byte' companion robot dialogue & microchip feeding lore.
  2. Built modular projects package (`src/content/projects/`):
     - `types.ts`, `categories.ts`, `index.ts`
     - Individual project files: `project-mr-bean-special-delivery.ts`, `project-mr-bean-solitaire.ts`, `project-kingdom-hero.ts`, `project-vr-production.ts`, `project-kinect-vision.ts`, `project-unity-verlet-rope.ts`, `project-simple-diagnosis.ts`, `project-prefab-palette.ts`, `project-editor-balancing-tools.ts` (UnityChart).
  3. Built modular skills circuit package (`src/content/skills/`):
     - `types.ts`, `circuits.ts`, `index.ts`
     - 12 real-world components with hardware specs (BGA, QFP, SOIC, SMD), pin counts, real metrics (50M+ users, 30% crash reduction), and cross-linked project IDs.
  4. Built profile & career log package (`src/content/profile/`):
     - `types.ts`, `bio.ts`, `experience.ts`, `transmissions.ts`, `socials.ts`, `index.ts`.
  5. Built companion lore package (`src/content/companion/`):
     - `types.ts`, `robotLore.ts`, `index.ts` with idle quotes, feeding reactions, project commentary, and navigation hints.
  6. Created master re-export barrel `src/content/index.ts`.
  7. Verified production build: `npm run build` passed with code `0`.

---

## 4. Current File Tree

```
c:\Alirezaftgithubpages\
├── public/
│   ├── assets/
│   │   ├── icons/
│   │   ├── models/
│   │   ├── textures/
│   │   └── videos/
│   └── vite.svg                    # Cyberpunk SVG favicon
├── src/
│   ├── content/                    # MODULAR DATA ARCHITECTURE
│   │   ├── companion/
│   │   │   ├── index.ts
│   │   │   ├── robotLore.ts
│   │   │   └── types.ts
│   │   ├── profile/
│   │   │   ├── bio.ts
│   │   │   ├── experience.ts
│   │   │   ├── index.ts
│   │   │   ├── socials.ts
│   │   │   ├── transmissions.ts
│   │   │   └── types.ts
│   │   ├── projects/
│   │   │   ├── categories.ts
│   │   │   ├── index.ts
│   │   │   ├── project-editor-balancing-tools.ts
│   │   │   ├── project-kinect-vision.ts
│   │   │   ├── project-kingdom-hero.ts
│   │   │   ├── project-mr-bean-solitaire.ts
│   │   │   ├── project-mr-bean-special-delivery.ts
│   │   │   ├── project-prefab-palette.ts
│   │   │   ├── project-simple-diagnosis.ts
│   │   │   ├── project-unity-verlet-rope.ts
│   │   │   ├── project-vr-production.ts
│   │   │   └── types.ts
│   │   ├── skills/
│   │   │   ├── circuits.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   └── index.ts                # Master content barrel
│   ├── App.tsx                     # Verified R3F test canvas & HUD scaffold
│   ├── index.css                   # Tailwind base & custom scrollbar styles
│   └── main.tsx                    # React 19 root entry point
├── .gitignore                      # Configured ignore rules
├── EXECUTION_PLAN.md               # 9-Phase detailed plan
├── Handoff.md                      # This handoff file
├── index.html                      # HTML entry with JetBrains Mono font & viewport setup
├── package.json                    # Dependencies & build scripts
├── package-lock.json
├── postcss.config.js
├── portfolio_specification.md      # Detailed PRD
├── tailwind.config.js              # Cyberpunk color extensions
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts                  # base: './' for GitHub Pages
```

---

## 5. Immediate Next Steps: Phase 2 (Procedural Web Audio Engine)

1. **Phase 2: Procedural Web Audio Engine:**
   - Implement `src/audio/soundManager.ts` using native Web Audio API oscillators and gain nodes (clicks, hums, power-surges, chirps).
   - Implement global `useAudio` hook with mute toggle and `localStorage` persistence.
   - Wire sound cues into HUD test controls.


---

## Phase 2: Procedural Web Audio Engine [COMPLETED]
* **Date:** 2026-11-03
* **Tech Stack:** Tone.js (wrapping Web Audio API, ~50KB)
* **Architecture:** Single `useAudio` React context/hook (no separate singleton)
* **Sonic Aesthetic:** Sharp, punchy digital — Tron / Mirror's Edge. Dry, polyphonic. ±5–10 semitone pitch micro-variation.
* **Startup:** Unmuted by default; AudioContext resumed on first user gesture.
* **Persistence:** `localStorage` for mute state + volume.
* **Files Created:**
  - `src/audio/soundEngine.ts` — 16 synthesized sound functions + ambient hum
  - `src/audio/useAudio.tsx` — AudioProvider + useAudio hook
  - `src/audio/index.ts` — barrel export
  - `src/AudioTestPage.tsx` — dev-only test harness
  - `src/vite-env.d.ts` — Vite type reference
* **Test Harness:** `http://localhost:3000/#audio-test` — all 16 sounds with play buttons, polyphony stress test, mute/volume.

**Next: Phase 3 — 2D HUD, Recruiter Grid & Slide-out Drawers.**
