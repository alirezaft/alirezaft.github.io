# Project Handoff & Decision History: Cyberpunk Unity Game Developer Portfolio

> **Target Audience for this Document:** Antigravity AI agents or human developers continuing work on this project across devices. This document captures the entire conversation history, decision tree, architectural rationale, and execution blueprint.

---

## 1. Project Overview & Client Profile

* **Client:** Unity Game Developer (specialized in C#, gameplay systems, shaders, and optimization).
* **Objective:** An interactive 3D web portfolio that showcases game development capabilities while remaining blazing fast, accessible to hiring managers, and easily maintainable.
* **Hosting Platform:** GitHub Pages (`c:\Alirezaftgithubpages`).
* **Key Artifacts in Repository:**
  * [`portfolio_specification.md`](file:///c:/Alirezaftgithubpages/portfolio_specification.md) — Full Product Requirements Document (PRD).
  * [`Handoff.md`](file:///c:/Alirezaftgithubpages/Handoff.md) — This document.

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
* **Visual Direction:** Dark synthwave base palette, glowing cyan/magenta/amber neon accents, CRT scanlines, bloom post-processing, and tactile hardware props.

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
* **Selected Decision:** **React 18/19 + Vite + TypeScript + React Three Fiber + Tailwind CSS**.
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

## 3. Modular Codebase File Tree

The following structure is planned for `C:\Alirezaftgithubpages`:

```
c:\Alirezaftgithubpages\
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD
├── public/
│   ├── assets/
│   │   ├── models/                 # Optimized GLB models (props/desk)
│   │   ├── videos/                 # Gameplay preview videos (.webm / .mp4)
│   │   └── resume.pdf              # Client's Resume / CV
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── Scene.tsx           # Main R3F Canvas and lighting
│   │   │   ├── Desk.tsx            # 3D Cyber-deck base environment
│   │   │   ├── CrtMonitor.tsx      # CRT monitor with dynamic video texture
│   │   │   ├── CartridgeRack.tsx   # Project cartridges with slot-in animation
│   │   │   ├── Datapad.tsx         # Holographic bio pad
│   │   │   ├── ChipsetRack.tsx     # PCB test-bench with bus trace lighting
│   │   │   ├── UsbResumeChip.tsx   # Plug-in USB key for CV download
│   │   │   ├── CyberRobot.tsx      # Byte the companion robot & microchip feeding
│   │   │   └── CommsTerminal.tsx   # Contact transceiver
│   │   ├── ui/
│   │   │   ├── Hud.tsx             # Persistent header: Mute toggle, Recruiter Mode switch
│   │   │   ├── ProjectDrawer.tsx   # Slide-out case study panel
│   │   │   ├── RecruiterGrid.tsx   # Fast 2D project & skills grid view
│   │   │   ├── HologramModal.tsx   # AR telemetry overlay for skills & bio
│   │   │   └── WebGlModal.tsx      # Optional iframe player for Unity WebGL demos
│   │   └── audio/
│   │       └── soundManager.ts     # Web Audio API procedural sound synthesis
│   ├── content/
│   │   ├── config.ts               # Profile metadata & social links
│   │   ├── projects/
│   │   │   ├── types.ts            # Project schema interface
│   │   │   ├── project-01-neon.ts  # Modular project definition
│   │   │   ├── project-02-rogue.ts # Modular project definition
│   │   │   ├── project-03-vfx.ts   # Modular project definition
│   │   │   └── index.ts            # Barrel export of all projects
│   │   ├── skills/
│   │   │   ├── types.ts            # Skill category & chip schema
│   │   │   ├── core-engine.ts      # Unity & C# CPU specs
│   │   │   ├── graphics-vfx.ts     # HLSL, URP, Shader Graph GPU specs
│   │   │   ├── architecture.ts     # DOTS, Memory, Addressables RAM specs
│   │   │   ├── tooling-systems.ts  # AI, Physics, Git, Blender IC specs
│   │   │   └── index.ts            # Barrel export of all chips
│   │   └── companion/
│   │       └── robotLore.ts        # Byte's speech bubbles, dev tips & reactions
│   ├── hooks/
│   │   ├── useAudio.ts             # Audio state & trigger hooks
│   │   └── useCameraFocus.ts       # Smooth camera lerping to focused props
│   ├── App.tsx                     # Root application container & mode switcher
│   ├── main.tsx                    # Vite entry point
│   └── index.css                   # Tailwind CSS & CRT scanline styling
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts                  # Base './' configured for GitHub Pages
├── portfolio_specification.md      # Detailed PRD
└── Handoff.md                      # This handoff file
```

---

## 4. Next Steps for Implementation

When continuing in the next turn or from another Antigravity instance:

1. **Scaffold React + Vite + TypeScript:**
   Initialize Vite in `C:\Alirezaftgithubpages`:
   ```powershell
   npm create vite@latest . -- --template react-ts
   ```
2. **Install Core Dependencies:**
   ```powershell
   npm install three @react-three/fiber @react-three/drei @react-three/postprocessing lucide-react clsx tailwindcss postcss autoprefixer
   ```
3. **Configure Tailwind & Vite:**
   Set `base: './'` in `vite.config.ts` for GitHub Pages compatibility.
4. **Set Up the Modular Content System:**
   Create `src/content/` with realistic sample Unity projects (architecture, shaders, gameplay videos, tech tags).
5. **Implement Web Audio Synthesizer:**
   Build `src/components/audio/soundManager.ts` using native Web Audio API oscillators for procedural cyberpunk clicks, CRT hum, and robot beeps.
6. **Build the 3D Cyber-Deck & Props:**
   Implement procedural Three.js meshes/shaders for the desk, CRT monitor with video texture, cartridges, chipset rack, USB plug-in, and Byte the robot.
7. **Build the Recruiter Dual-Mode HUD:**
   Add the top HUD with instant "Grid View" toggle and slide-out project case studies.
8. **Set Up GitHub Actions Deployment:**
   Create `.github/workflows/deploy.yml` for automated GitHub Pages static deployment.
