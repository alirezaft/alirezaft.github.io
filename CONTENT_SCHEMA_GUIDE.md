# Cyberpunk Unity Portfolio: Content Architecture & Schema Guide

> **Document Purpose:** Definitive reference and authoring guide for the modular data schemas powering the 3D Cyber-Deck portfolio. Any developer or AI agent adding new projects, hardware skills, timeline logs, or companion dialogues must follow the contracts defined here.

---

## 1. Architectural Philosophy

The portfolio separates **data contracts** entirely from **3D rendering logic**. All content lives as type-safe TypeScript files under `src/content/` rather than in hardcoded JSX, monolithic JSON, or remote CMS dependencies:

```
src/content/
├── projects/      # Cartridges & Shelf categorization (4 rows)
├── skills/        # Hardware circuit components & IC specs
├── profile/       # Holographic Datapad: bio, career timeline, transmissions, socials
├── companion/     # "Byte" desk robot dialogues & reaction triggers
└── index.ts       # Master barrel export
```

### Golden Rules:
1. **Never create a monolithic content dump.** Each game or major project gets its own file (`project-[name].ts`).
2. **Every project maps to a physical desk object.** Projects are physical cartridges on a 4-row shelf; skills are IC chips on a motherboard test-bench; career items are holographic datapad logs.
3. **Keep data contracts strictly typed.** Always conform to the exported interfaces in each module's `types.ts`.

---

## 2. Project Cartridge Schema (`src/content/projects/`)

### 2.1 The Concept & 4-Shelf Rows
Projects in the 3D Cyber-Deck sit on a physical multi-tier cartridge shelf. When clicked, a cartridge moves into the deck reader, triggering the CRT monitor video reel and opening the slide-out technical breakdown panel.

The shelf has **4 standardized category rows**:

| Row | Category ID (`ProjectCategory`) | Name | Accent Color | Intended Content |
|:---:|:---|:---|:---|:---|
| **1** | `'shipped-commercial'` | Shipped Commercial Games | `#ff007f` (Magenta) | Commercial titles shipped on stores (e.g. Mr. Bean, Kingdom Hero). |
| **2** | `'vr-applications'` | VR Games & Applications | `#00f3ff` (Cyan) | VR/XR experiences, simulations, computer vision games. |
| **3** | `'open-source'` | Open Source Experiments | `#00ff66` (Green) | Community repos, physics simulations, indie game jams. |
| **4** | `'tools'` | Tools & Editor Extensions | `#ffb700` (Amber) | Unity Editor utilities, UI Toolkit extensions, pipelines. |

---

### 2.2 `Project` Interface Specification

```typescript
export type ProjectCategory = 
  | 'shipped-commercial' 
  | 'vr-applications' 
  | 'open-source' 
  | 'tools';

export type ProjectLinkType = 
  | 'google-play' 
  | 'github' 
  | 'itch' 
  | 'medium' 
  | 'webgl' 
  | 'external';

export interface ProjectLink {
  label: string;       // Button text, e.g. "GitHub Repository"
  url: string;         // Direct URL (https://...)
  type: ProjectLinkType;
}

export interface ProjectCartridgeVisual {
  primaryColor: string; // Dark base body color (hex, e.g. '#12192c')
  accentColor: string;  // Bright neon highlight (hex, e.g. '#ff007f')
  glowColor: string;    // Emissive glow (rgba string)
  stripeColor?: string; // Optional decorative PCB stripe
  serialNumber: string; // Stylized ROM ID, e.g. 'ROM-BEAN-01'
}

export interface Project {
  id: string;               // Unique kebab-case slug (e.g. 'unity-chart')
  title: string;            // Primary title
  subtitle: string;         // One-line punchy subtitle
  category: ProjectCategory;
  shelfRow: number;         // 1 to 4 (matches category.shelfRow)
  slotIndex: number;        // Position in that row (0, 1, 2...)
  year: string;             // Release year or range (e.g. '2023 – Present')
  role: string;             // Author role (e.g. 'Creator & Maintainer')
  company: string;          // Studio, organization, or 'Open Source (GitHub)'
  statsBadge: string;       // Highlight metric, e.g. '50M+ Downloads', '65+ Stars'
  overview: string;         // 2-3 sentence executive summary
  responsibilities: string[]; // 3-4 concise bullet points detailing technical work
  techTags: string[];       // Tags: ['Unity', 'C#', 'UI Toolkit', ...]
  videoPreviewUrl?: string; // Video URL for the 3D CRT monitor (optional)
  thumbnailUrl?: string;    // Poster image fallback
  cartridgeVisual: ProjectCartridgeVisual;
  links: ProjectLink[];     // Direct external links
  featured?: boolean;       // Set true to highlight in Recruiter Quick-View
}
```

---

### 2.3 How to Add a New Project Cartridge

1. Create `src/content/projects/project-[your-project-slug].ts`:
   ```typescript
   import { Project } from './types';

   export const projectMyAwesomeTool: Project = {
     id: 'my-awesome-tool',
     title: 'My Awesome Tool',
     subtitle: 'Real-Time Shader Optimization for Unity URP',
     category: 'tools',
     shelfRow: 4,
     slotIndex: 2,
     year: '2025',
     role: 'Solo Developer',
     company: 'Open Source (GitHub)',
     statsBadge: '100+ GitHub Stars',
     overview: 'A lightweight Unity editor tool that profiles and visualizes draw calls and overdraw directly inside the Scene view.',
     responsibilities: [
       'Engineered custom render pass hooks in Universal Render Pipeline (URP).',
       'Designed modern UI Toolkit inspector controls with reactive property bindings.',
       'Reduced frame rendering bottlenecks by 20% on mobile target devices.',
     ],
     techTags: ['Unity', 'URP', 'C#', 'Shaders', 'UI Toolkit'],
     cartridgeVisual: {
       primaryColor: '#2b2108',
       accentColor: '#ffb700',
       glowColor: 'rgba(255, 183, 0, 0.6)',
       serialNumber: 'ROM-SHAD-03',
     },
     links: [
       { label: 'GitHub Repository', url: 'https://github.com/alirezaft/...', type: 'github' },
     ],
     featured: true,
   };
   ```
2. Open `src/content/projects/index.ts`, import `projectMyAwesomeTool`, add it to `ALL_PROJECTS`, and export it.
3. (Optional) Add a custom dialogue in `src/content/companion/robotLore.ts` referencing `relatedProjectId: 'my-awesome-tool'`.

---

## 3. Skills Hardware Circuit Schema (`src/content/skills/`)

### 3.1 The Circuit Board Metaphor
Skills are not presented as boring percentage bars. Instead, they form an **interactive motherboard test-bench** with illuminated copper bus traces. 

The importance and criticality of each skill is directly reflected by its **hardware form factor**:

```
[Main Central CPU: BGA-2048]  --->  Core Engine & C# (Vital Level 1)
   │
   ├── [Heavy IC: QFP-144]   --->  Clean Architecture & SOLID (Level 2)
   ├── [Heavy IC: QFP-128]   --->  Custom Editor Tooling & UI Toolkit (Level 2)
   ├── [Heavy IC: QFP-100]   --->  Memory Profiling & Crash/ANR (Level 2)
   │
   ├── [Medium IC: SOIC-28]  --->  WebGL Porting & JS Wrappers (Level 3)
   ├── [Medium IC: SOIC-24]  --->  Mobile SDKs & Telemetry (Level 3)
   ├── [Medium IC: SOIC-16]  --->  Verlet Physics & Git CI/CD (Level 3)
   │
   └── [Passive Modules]     --->  Crystal Oscillators, Regulators (Level 4: Agile, Mentoring)
```

---

### 3.2 `SkillChip` Interface Specification

```typescript
export type ComponentRole = 
  | 'main-cpu'        // Huge central processor: core engine & language
  | 'heavy-ic'        // Large QFP: architectural pillars & heavy tooling
  | 'medium-ic'       // SOIC/DIP package: platforms, SDKs, telemetry, math
  | 'passive-module'; // Crystal oscillator, regulator, capacitor: workflows

export type SkillImportanceLevel = 1 | 2 | 3 | 4; // 1: Vital, 4: Supporting

export type SkillCategory = 
  | 'engine-core'
  | 'architecture'
  | 'optimization'
  | 'tooling-sdks'
  | 'design-analytics'
  | 'workflow';

export interface HardwareSpecs {
  frequencyOrRating: string; // e.g. "Unity 6 & C# 12 / Multi-Threaded", "Zero-Coupling"
  footprint: string;         // e.g. "BGA-2048", "QFP-144", "SOIC-28", "SMD-0805"
  pinCount: number;          // Pin count for 3D procedural socket generation
  status: 'active' | 'boosted' | 'online';
}

export interface SkillChip {
  id: string;                       // Unique slug (e.g. 'unity-engine-core')
  name: string;                     // Human-readable title
  componentRole: ComponentRole;
  importanceLevel: SkillImportanceLevel;
  category: SkillCategory;
  summary: string;                  // Technical capability description
  realWorldImpact: string;          // Concrete proof (e.g. '50M+ active users')
  linkedProjectIds: string[];       // Cross-links to Project IDs where used
  specs: HardwareSpecs;             // Circuit board hardware telemetry
  circuitColor: string;             // LED/Trace highlight hex color
}
```

---

### 3.3 How to Add or Modify a Skill Component

1. Open `src/content/skills/circuits.ts`.
2. Add an item to `SKILL_CIRCUIT_COMPONENTS`:
   ```typescript
   {
     id: 'dots-ecs-system',
     name: 'Unity DOTS / ECS & Job System',
     componentRole: 'heavy-ic',
     importanceLevel: 2,
     category: 'optimization',
     summary: 'Data-Oriented Technology Stack (DOTS), Burst Compiler SIMD code generation, and multi-threaded C# Job System.',
     realWorldImpact: 'Simulated 10,000+ autonomous game entities at consistent 60 FPS.',
     linkedProjectIds: ['kingdom-hero-tower-defense'],
     specs: {
       frequencyOrRating: 'SIMD Burst Compiler / Multi-Threaded',
       footprint: 'QFP-100 High-Speed Coprocessor',
       pinCount: 100,
       status: 'active',
     },
     circuitColor: '#00f3ff',
   }
   ```
3. The component automatically appears in the motherboard test-bench telemetry and links to any listed project cartridges.

---

## 4. Holographic Datapad Schema (`src/content/profile/`)

The Holographic Datapad on the desk acts as Alireza's personal cyber-log. It organizes career data into **3 distinct tabs**:

```
[ Holographic Datapad ]
├── Tab 1: [ CAREER LOG ]       ---> Interactive chronological timeline
├── Tab 2: [ OPERATOR BIO ]     ---> Philosophy, 4 pillars, education, contact
└── Tab 3: [ TRANSMISSIONS ]    ---> Medium post-mortems, workshops & university teaching
```

### 4.1 Schema Contracts

* **`ProfileBio` (`src/content/profile/bio.ts`):** Full name, callsign, headline, executive summary, and 4 core pillars (`title` + `description`).
* **`CAREER_TIMELINE` (`src/content/profile/experience.ts`):** Array of `ExperienceItem` objects:
  ```typescript
  export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    location: string;
    period: string;
    isCurrent: boolean;
    keyMetricHighlight?: string; // e.g. '50M+ Downloads, 30% Crash Cut'
    bulletPoints: string[];
    technologies: string[];
  }
  ```
* **`EDUCATION_DATA` (`src/content/profile/experience.ts`):** Degree, institution, period, field, and notable highlights.
* **`TRANSMISSIONS` (`src/content/profile/transmissions.ts`):** Array of `TransmissionItem` (Medium articles, workshops, talks).
* **`SOCIAL_LINKS` (`src/content/profile/socials.ts`):** Platforms, URLs, and handles including the physical Resume USB download link.

---

## 5. "Byte" Desk Robot Companion Schema (`src/content/companion/`)

### 5.1 Concept & Mechanics
"Byte" is the cybernetic companion sitting on the desk next to the CRT monitor. It features an animated digital screen face and responds to user interactions:
- **Idle chatter:** Occasional thought bubbles while browsing.
- **Microchip Feeding:** Users can click or drag microchips to feed Byte, triggering celebratory audio and high-energy lore.
- **Project Commentary:** When a cartridge is inserted into the deck, Byte displays contextual commentary about that specific game.
- **Navigation Hints & Easter Eggs:** Guides recruiters to the USB resume or warns about overclocking switches.

---

### 5.2 `RobotDialogueItem` Interface Specification

```typescript
export type RobotMood = 
  | 'idle' 
  | 'happy' 
  | 'thinking' 
  | 'fed' 
  | 'curious' 
  | 'surprised' 
  | 'overclocked';

export type DialogueCategory = 
  | 'idle' 
  | 'feeding' 
  | 'project-commentary' 
  | 'nav-hint' 
  | 'easter-egg';

export interface RobotDialogueItem {
  id: string;
  category: DialogueCategory;
  text: string;
  mood: RobotMood;
  soundCue?: 'chirp' | 'crunch' | 'cheer' | 'glitch' | 'scan';
  relatedProjectId?: string; // When category === 'project-commentary'
}
```

---

### 5.3 How to Add Dialogues
Open `src/content/companion/robotLore.ts` and add items to `ROBOT_DIALOGUES`. For example:
```typescript
{
  id: 'proj-my-tool',
  category: 'project-commentary',
  text: 'Zero overdraw detected! My visual sensors thank you.',
  mood: 'happy',
  soundCue: 'chirp',
  relatedProjectId: 'my-awesome-tool',
}
```

---

## 6. Verification & Type Checking Checklist

Whenever you modify any content file:

1. **Verify TypeScript Compilation:**
   ```bash
   npm run build
   ```
   Ensures zero unused imports, correct type contracts, and valid enum values.

2. **Check Shelf & Slot Indexing:**
   - In `src/content/projects/`, ensure `shelfRow` (1–4) matches the project category.
   - Ensure `slotIndex` within the row is sequential (`0, 1, 2...`).

3. **Check Cross-Linked IDs:**
   - Any `linkedProjectIds` in `src/content/skills/circuits.ts` must match an actual `id` in `src/content/projects/`.
   - Any `relatedProjectId` in `src/content/companion/robotLore.ts` must match an existing project `id`.

---

*Authored for the **Cyberpunk Unity Game Developer Portfolio** (`c:\Alirezaftgithubpages`).*
