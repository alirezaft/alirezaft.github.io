# Graph Report - alirezaft.github.io  (2026-11-09)

## Corpus Check
- 90 files · ~276,868 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 309 nodes · 598 edges · 21 communities (12 shown, 9 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 46 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Procedural Audio Engine & Sound Synthesis
- Core App & UI Layout
- Interactive Cyber-Deck Props & 3D Assets
- Project Catalog & Shelf Registry
- Package Configuration & Build Scripts
- Recruiter View & Navigation Tabs
- TypeScript App Compiler Configuration
- Career History & Developer Profile
- Node TypeScript Compiler Configuration
- Frontend Production Dependencies
- Build Tooling & Styling DevDependencies
- Companion Robot Dialogue & Lore System
- Project TypeScript References

## God Nodes (most connected - your core abstractions)
1. `AudioProvider()` - 27 edges
2. `useAudio()` - 27 edges
3. `Game Cartridge Rack System` - 27 edges
4. `useUI()` - 21 edges
5. `compilerOptions` - 16 edges
6. `Project` - 15 edges
7. `lucide-react` - 13 edges
8. `compilerOptions` - 13 edges
9. `RecruiterGrid()` - 10 edges
10. `react` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Alireza Forghani Toosi Resume` --conceptually_related_to--> `3D Cyber-Deck Station`  [INFERRED]
  public/assets/resume/Alireza_Forghani_Toosi_Resume.pdf → portfolio_specification.md
- `a-simple-diagnosis: chapter-briefing` --conceptually_related_to--> `Game Cartridge Rack System`  [INFERRED]
  public/assets/projects/a-simple-diagnosis/chapter-briefing.jpg → portfolio_specification.md
- `a-simple-diagnosis: hearing-test` --conceptually_related_to--> `Game Cartridge Rack System`  [INFERRED]
  public/assets/projects/a-simple-diagnosis/hearing-test.jpg → portfolio_specification.md
- `a-simple-diagnosis: title-screen` --conceptually_related_to--> `Game Cartridge Rack System`  [INFERRED]
  public/assets/projects/a-simple-diagnosis/title-screen.jpg → portfolio_specification.md
- `kingdom-hero-tower-defense: grid-summon-defense` --conceptually_related_to--> `Game Cartridge Rack System`  [INFERRED]
  public/assets/projects/kingdom-hero-tower-defense/grid-summon-defense.webp → portfolio_specification.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cyber-Deck Interactive Subsystems** — portfolio_specification_cyber_deck_station, portfolio_specification_interactive_crt_monitor, portfolio_specification_cyber_chipset_rack, portfolio_specification_cartridge_rack, portfolio_specification_cyber_companion_robot [EXTRACTED 1.00]

## Communities (21 total, 9 thin omitted)

### Community 0 - "Procedural Audio Engine & Sound Synthesis"
Cohesion: 0.11
Nodes (39): blip(), CHIRP_PATTERNS, FED_HAPPY_CHIRPS, IDLE_SHAPES, masterGain, playBusPulse(), playCameraWhoosh(), playClick() (+31 more)

### Community 1 - "Core App & UI Layout"
Cohesion: 0.15
Nodes (27): lucide-react, react, react-dom, App(), RotatingCyberCube(), AudioContextValue, useAudio(), Hud() (+19 more)

### Community 2 - "Interactive Cyber-Deck Props & 3D Assets"
Cohesion: 0.06
Nodes (33): Game Cartridge Rack System, Cyber Chipset Diagnostic Rack, Cyber Companion Robot, 3D Cyber-Deck Station, Interactive CRT Monitor, Recruiter Quick-View Mode, a-simple-diagnosis: chapter-briefing, a-simple-diagnosis: hearing-test (+25 more)

### Community 3 - "Project Catalog & Shelf Registry"
Cohesion: 0.12
Nodes (18): ProjectCardProps, SHELF_CATEGORIES, projectEditorBalancingTools, projectUnityChart, projectKingdomHero, projectMrBeanSolitaire, projectMrBeanSpecialDelivery, projectPrefabPalette (+10 more)

### Community 4 - "Package Configuration & Build Scripts"
Cohesion: 0.07
Nodes (27): name, private, scripts, build, dev, preview, type, version (+19 more)

### Community 5 - "Recruiter View & Navigation Tabs"
Cohesion: 0.11
Nodes (19): CategoryOption, TabItem, TABS, ALL_PROJECTS, ProjectCategory, getChipById(), SKILL_CIRCUIT_COMPONENTS, ComponentRole (+11 more)

### Community 6 - "TypeScript App Compiler Configuration"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+9 more)

### Community 7 - "Career History & Developer Profile"
Cohesion: 0.20
Nodes (10): PROFILE_BIO, CAREER_TIMELINE, EDUCATION_DATA, SOCIAL_LINKS, TRANSMISSIONS, EducationItem, ExperienceItem, ProfileBio (+2 more)

### Community 8 - "Node TypeScript Compiler Configuration"
Cohesion: 0.13
Nodes (14): compilerOptions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit, noFallthroughCasesInSwitch (+6 more)

### Community 9 - "Frontend Production Dependencies"
Cohesion: 0.15
Nodes (13): dependencies, canvas-confetti, clsx, framer-motion, lucide-react, react, react-dom, @react-three/drei (+5 more)

### Community 10 - "Build Tooling & Styling DevDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, postcss, tailwindcss, @types/canvas-confetti, @types/react, @types/react-dom, @types/three (+3 more)

### Community 11 - "Companion Robot Dialogue & Lore System"
Cohesion: 0.28
Nodes (4): ROBOT_DIALOGUES, DialogueCategory, RobotDialogueItem, RobotMood

## Knowledge Gaps
- **42 isolated node(s):** `@react-three/postprocessing`, `canvas-confetti`, `clsx`, `tailwind-merge`, `@types/canvas-confetti` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 149 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `3D Cyber-Deck Station` connect `Interactive Cyber-Deck Props & 3D Assets` to `Procedural Audio Engine & Sound Synthesis`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Are the 17 inferred relationships involving `AudioProvider()` (e.g. with `playBusPulse()` and `playCameraWhoosh()`) actually correct?**
  _`AudioProvider()` has 17 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@react-three/postprocessing`, `canvas-confetti`, `clsx` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Procedural Audio Engine & Sound Synthesis` be split into smaller, more focused modules?**
  _Cohesion score 0.10917874396135266 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Core App & UI Layout` to `Package Configuration & Build Scripts`, `Recruiter View & Navigation Tabs`, `Career History & Developer Profile`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Are the 26 inferred relationships involving `Game Cartridge Rack System` (e.g. with `a-simple-diagnosis: chapter-briefing` and `a-simple-diagnosis: hearing-test`) actually correct?**
  _`Game Cartridge Rack System` has 26 INFERRED edges - model-reasoned connections that need verification._
- **Should `Interactive Cyber-Deck Props & 3D Assets` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._