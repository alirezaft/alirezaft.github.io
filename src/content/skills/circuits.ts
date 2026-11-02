import { SkillChip } from './types';

export const SKILL_CIRCUIT_COMPONENTS: SkillChip[] = [
  // TIER 1: VITAL MAIN PROCESSOR (Central Core)
  {
    id: 'unity-engine-core',
    name: 'Unity Engine & C# Architecture',
    componentRole: 'main-cpu',
    importanceLevel: 1,
    category: 'engine-core',
    summary: 'Deep expertise in full-cycle game development, custom editor tooling, modern C# paradigms, UI Toolkit, ECS, and Job System.',
    realWorldImpact: 'Powered 50M+ active users across commercial mobile & WebGL releases.',
    linkedProjectIds: ['mr-bean-special-delivery', 'mr-bean-solitaire-adventure', 'kingdom-hero-tower-defense', 'vr-interactive-applications'],
    specs: {
      frequencyOrRating: 'Unity 6 & C# 12 / Multi-Threaded',
      footprint: 'BGA-2048 Core CPU',
      pinCount: 2048,
      status: 'boosted',
    },
    circuitColor: '#00f3ff', // Cyan
  },

  // TIER 2: HEAVY INTEGRATED CIRCUITS (Major Pillars)
  {
    id: 'clean-architecture-solid',
    name: 'Clean Code & SOLID Design Patterns',
    componentRole: 'heavy-ic',
    importanceLevel: 2,
    category: 'architecture',
    summary: 'Rigorous application of SOLID, decoupled event buses, state machines, and modular ScriptableObject architectures.',
    realWorldImpact: 'Cut legacy engineering task turnaround times by 30% across studio codebases.',
    linkedProjectIds: ['mr-bean-special-delivery', 'kingdom-hero-tower-defense'],
    specs: {
      frequencyOrRating: 'Zero-Coupling Bus Architecture',
      footprint: 'QFP-144 High-Density IC',
      pinCount: 144,
      status: 'active',
    },
    circuitColor: '#ff007f', // Magenta
  },
  {
    id: 'custom-editor-ui-toolkit',
    name: 'Custom Editor Tooling & UI Toolkit',
    componentRole: 'heavy-ic',
    importanceLevel: 2,
    category: 'tooling-sdks',
    summary: 'Designing modern editor utilities, UXML/USS panels, property drawers, and automated pipeline tooling for game designers.',
    realWorldImpact: 'Streamlined designer workflows and reduced level production time by 10%.',
    linkedProjectIds: ['prefab-palette', 'unity-chart', 'mr-bean-special-delivery'],
    specs: {
      frequencyOrRating: 'Reactive UXML Data Binding',
      footprint: 'QFP-128 Dedicated Controller',
      pinCount: 128,
      status: 'active',
    },
    circuitColor: '#ffb700', // Amber
  },
  {
    id: 'performance-profiling-optimization',
    name: 'Memory Profiling & Crash/ANR Optimization',
    componentRole: 'heavy-ic',
    importanceLevel: 2,
    category: 'optimization',
    summary: 'Deep profiling via Unity Memory Profiler, Deep Profiler, and Android logcat to eliminate GC spikes, leaks, and draw call bottlenecks.',
    realWorldImpact: 'Reduced crash/ANR rates by 30% and improved 30-day player retention by 5.1%.',
    linkedProjectIds: ['mr-bean-special-delivery', 'kingdom-hero-tower-defense'],
    specs: {
      frequencyOrRating: 'Zero-Allocation Hot Loops / 60-90 FPS',
      footprint: 'QFP-100 Profiling DSP',
      pinCount: 100,
      status: 'active',
    },
    circuitColor: '#00ff66', // Green
  },

  // TIER 3: MEDIUM ICS (Platforms, Integrations & Systems)
  {
    id: 'webgl-porting-js-wrappers',
    name: 'WebGL Porting & JavaScript Wrappers',
    componentRole: 'medium-ic',
    importanceLevel: 3,
    category: 'engine-core',
    summary: 'Porting high-end mobile titles to browser canvas, writing custom JS library plugins, and managing web audio/memory constraints.',
    realWorldImpact: 'Captured 20K+ new browser players for live mobile IP.',
    linkedProjectIds: ['mr-bean-special-delivery'],
    specs: {
      frequencyOrRating: 'WASM WebGL Bridge / Low-Memory',
      footprint: 'SOIC-28 Bridge Controller',
      pinCount: 28,
      status: 'active',
    },
    circuitColor: '#38bdf8', // Sky Blue
  },
  {
    id: 'mobile-sdks-analytics',
    name: 'SDK Integration (GameAnalytics, Firebase, Ads)',
    componentRole: 'medium-ic',
    importanceLevel: 3,
    category: 'tooling-sdks',
    summary: 'Seamless integration of monetization and analytics stacks: GameAnalytics, Firebase, AppLovin MAX, CrazyGames SDK across Android & WebGL.',
    realWorldImpact: 'Accurate live telemetry tracking across millions of daily active sessions.',
    linkedProjectIds: ['mr-bean-special-delivery', 'mr-bean-solitaire-adventure'],
    specs: {
      frequencyOrRating: 'Async Telemetry Ingestion Pipeline',
      footprint: 'SOIC-24 Telemetry IC',
      pinCount: 24,
      status: 'active',
    },
    circuitColor: '#a855f7', // Purple
  },
  {
    id: 'telemetry-game-design',
    name: 'Telemetry Analysis & Economy Balancing',
    componentRole: 'medium-ic',
    importanceLevel: 3,
    category: 'design-analytics',
    summary: 'Bridging engineering with game design: analyzing in-game drop-off funnels, balancing virtual economies (IAA & IAP), and authoring GDDs.',
    realWorldImpact: 'Directly reduced player churn by 10% through data-driven balance passes.',
    linkedProjectIds: ['mr-bean-solitaire-adventure', 'mr-bean-special-delivery'],
    specs: {
      frequencyOrRating: 'Cohort Funnel & Churn Analysis',
      footprint: 'SOIC-20 Analytics Chip',
      pinCount: 20,
      status: 'active',
    },
    circuitColor: '#f43f5e', // Rose
  },
  {
    id: 'physics-verlet-sim',
    name: 'Physics Algorithms & Numerical Methods',
    componentRole: 'medium-ic',
    importanceLevel: 3,
    category: 'engine-core',
    summary: 'Developing custom physics solvers, Verlet numerical integration, spring relaxation, and procedural mesh generation in Unity.',
    realWorldImpact: 'Created top-rated open-source simulation package with 65+ GitHub stars.',
    linkedProjectIds: ['unity-verlet-rope'],
    specs: {
      frequencyOrRating: 'Verlet Position-Based Dynamics',
      footprint: 'SOIC-16 Physics Math Coprocessor',
      pinCount: 16,
      status: 'active',
    },
    circuitColor: '#10b981', // Emerald
  },
  {
    id: 'agentic-ai-llm-workflows',
    name: 'LLM & Agentic Software Development',
    componentRole: 'medium-ic',
    importanceLevel: 3,
    category: 'workflow',
    summary: 'Integrating cutting-edge Agentic AI workflows and LLMs into daily development to accelerate prototyping, code review, and tooling.',
    realWorldImpact: 'Boosted engineering team productivity by 1.5x at Manshoor Fanavari Arya.',
    linkedProjectIds: ['vr-interactive-applications'],
    specs: {
      frequencyOrRating: 'Autonomous Coding Agents & Automation',
      footprint: 'DIP-14 Neural Coprocessor',
      pinCount: 14,
      status: 'boosted',
    },
    circuitColor: '#ec4899', // Hot Pink
  },
  {
    id: 'git-version-control',
    name: 'Git Version Control & CI/CD Pipelines',
    componentRole: 'medium-ic',
    importanceLevel: 3,
    category: 'workflow',
    summary: 'Proficient with complex Git branching workflows (GitFlow, trunk-based), CLI, SourceTree, SmartGit, and LFS asset management.',
    realWorldImpact: 'Smooth multi-developer merges across multi-gigabyte project repos.',
    linkedProjectIds: ['mr-bean-special-delivery', 'prefab-palette', 'unity-verlet-rope'],
    specs: {
      frequencyOrRating: 'Git LFS / Multi-Branch Integrity',
      footprint: 'SOIC-16 Version Bus',
      pinCount: 16,
      status: 'active',
    },
    circuitColor: '#e2e8f0', // Silver
  },

  // TIER 4: PASSIVE / SUPPORTING MODULES
  {
    id: 'agile-scrum-leadership',
    name: 'Agile / Scrum & Cross-Discipline Collaboration',
    componentRole: 'passive-module',
    importanceLevel: 4,
    category: 'workflow',
    summary: 'Cross-functional communication between engineering, art, and management to maintain sprint velocity and consistently deliver on time.',
    realWorldImpact: 'Shortened cross-team alignment meetings through dual technical-design fluency.',
    linkedProjectIds: ['mr-bean-special-delivery', 'vr-interactive-applications'],
    specs: {
      frequencyOrRating: 'Sprint Clock Synchronizer',
      footprint: 'Crystal Oscillator 32.768kHz',
      pinCount: 4,
      status: 'online',
    },
    circuitColor: '#94a3b8', // Slate
  },
  {
    id: 'mentoring-workshops',
    name: 'Technical Teaching & Candidate Onboarding',
    componentRole: 'passive-module',
    importanceLevel: 4,
    category: 'workflow',
    summary: 'Instructed university game design workshops, evaluated technical candidates, and mentored junior programmers in team conventions.',
    realWorldImpact: 'Onboarded 3 engineering/design hires and taught university lab courses.',
    linkedProjectIds: ['kinect-interactive-vision'],
    specs: {
      frequencyOrRating: 'Knowledge Transfer Bus',
      footprint: 'SMD Voltage Regulator',
      pinCount: 3,
      status: 'online',
    },
    circuitColor: '#cbd5e1', // Light Gray
  },
];

export function getChipsByRole(role: SkillChip['componentRole']): SkillChip[] {
  return SKILL_CIRCUIT_COMPONENTS.filter((c) => c.componentRole === role);
}

export function getChipsByImportance(level: SkillChip['importanceLevel']): SkillChip[] {
  return SKILL_CIRCUIT_COMPONENTS.filter((c) => c.importanceLevel === level);
}

export function getChipById(id: string): SkillChip | undefined {
  return SKILL_CIRCUIT_COMPONENTS.find((c) => c.id === id);
}
