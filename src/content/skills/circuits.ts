import { SkillChip } from './types';

export const SKILL_CIRCUIT_COMPONENTS: SkillChip[] = [
  // 1. Core Engine
  {
    id: 'unity-engine-core',
    name: 'Unity Engine & C#',
    componentRole: 'main-cpu',
    importanceLevel: 1,
    category: 'engine-core',
    summary: 'Deep expertise in full-cycle game development, custom editor tooling, modern C# paradigms, UI Toolkit, ECS, and Job System.',
    realWorldImpact: 'Powered 50M+ active users across commercial mobile & WebGL releases.',
    linkedProjectIds: ['mr-bean-special-delivery', 'mr-bean-solitaire-adventure', 'kingdom-hero-tower-defense', 'vr-interactive-applications'],
    specs: {
      frequencyOrRating: 'Unity 6 & C# 12 / Multi-Threaded',
      footprint: 'Core Engine & Systems',
      pinCount: 2048,
      status: 'boosted',
    },
    circuitColor: '#00f3ff', // Cyan
  },

  // 2. Clean Architecture
  {
    id: 'clean-architecture-solid',
    name: 'Clean Code & SOLID Design Patterns',
    componentRole: 'heavy-ic',
    importanceLevel: 1,
    category: 'architecture',
    summary: 'Rigorous application of SOLID, decoupled event buses, state machines, and modular ScriptableObject architectures.',
    realWorldImpact: 'Cut legacy engineering task turnaround times by 30% across studio codebases.',
    linkedProjectIds: ['mr-bean-special-delivery', 'a-simple-diagnosis', 'kingdom-hero-tower-defense'],
    specs: {
      frequencyOrRating: 'Decoupled Systems Architecture',
      footprint: 'Clean Architecture & SOLID',
      pinCount: 144,
      status: 'active',
    },
    circuitColor: '#ff007f', // Magenta
  },

  // 3. Custom Editor Tooling
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
      footprint: 'Editor Scripting & Tools',
      pinCount: 128,
      status: 'active',
    },
    circuitColor: '#ffb700', // Amber
  },

  // 4. Agentic Software Development & Game Design
  {
    id: 'agentic-ai-llm-workflows',
    name: 'Agentic Software Development',
    componentRole: 'medium-ic',
    importanceLevel: 2,
    category: 'workflow',
    summary: 'Integrating cutting-edge Agentic AI workflows and LLMs into daily development to accelerate prototyping, code review, and tooling. Actively applying AI agents and LLMs in game design for narrative ideation, economy balancing, and design documentation.',
    realWorldImpact: 'Boosted engineering team productivity by 1.5x at Manshoor Fanavari Arya and streamlined live title features.',
    linkedProjectIds: ['mr-bean-special-delivery', 'vr-interactive-applications'],
    specs: {
      frequencyOrRating: 'Autonomous Coding Agents & Automation',
      footprint: 'Agentic AI & LLMs',
      pinCount: 14,
      status: 'boosted',
    },
    circuitColor: '#ec4899', // Hot Pink
  },

  // 5. WebGL Porting
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
      footprint: 'WebGL & Web Platforms',
      pinCount: 28,
      status: 'active',
    },
    circuitColor: '#38bdf8', // Sky Blue
  },

  // 6. Mobile SDKs & Analytics
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
      footprint: 'Analytics & Monetization SDKs',
      pinCount: 24,
      status: 'active',
    },
    circuitColor: '#a855f7', // Purple
  },

  // 7. Telemetry & Economy Balancing
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
      footprint: 'Game Design & Balancing',
      pinCount: 20,
      status: 'active',
    },
    circuitColor: '#f43f5e', // Rose
  },

  // 8. Git Version Control
  {
    id: 'git-version-control',
    name: 'Git Version Control & CI/CD Pipelines',
    componentRole: 'medium-ic',
    importanceLevel: 3,
    category: 'workflow',
    summary: 'Proficient with complex Git branching workflows (GitFlow, trunk-based), CLI, SourceTree, SmartGit, and LFS asset management.',
    realWorldImpact: 'Smooth multi-developer merges across multi-gigabyte project repos.',
    linkedProjectIds: ['mr-bean-special-delivery', 'prefab-palette', 'unity-chart'],
    specs: {
      frequencyOrRating: 'Git LFS / Multi-Branch Integrity',
      footprint: 'Version Control & DevOps',
      pinCount: 16,
      status: 'active',
    },
    circuitColor: '#e2e8f0', // Silver
  },

  // 9. Technical Teaching, Onboarding & University Workshops
  {
    id: 'mentoring-workshops',
    name: 'Technical Teaching, Candidate Onboarding & University Workshops',
    componentRole: 'passive-module',
    importanceLevel: 4,
    category: 'workflow',
    summary: 'Conducted hands-on university workshops at Ferdowsi University instructing students on game architecture and loop design. Evaluated technical candidates and mentored junior programmers in team conventions.',
    realWorldImpact: 'Onboarded 3 engineering/design hires and instructed 50+ students in university workshops.',
    linkedProjectIds: [],
    specs: {
      frequencyOrRating: 'Knowledge Transfer & Workshops',
      footprint: 'Mentoring & Teaching',
      pinCount: 3,
      status: 'online',
    },
    circuitColor: '#cbd5e1', // Light Gray
  },

  // 10. Agile / Scrum
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
      frequencyOrRating: 'Sprint Velocity & Sync',
      footprint: 'Agile & Team Collaboration',
      pinCount: 4,
      status: 'online',
    },
    circuitColor: '#94a3b8', // Slate
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
