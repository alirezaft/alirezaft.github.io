import { ExperienceItem, EducationItem } from './types';

export const CAREER_TIMELINE: ExperienceItem[] = [
  {
    id: 'manshoor-fanavari-arya',
    role: 'Mid-Level Unity Developer',
    company: 'Manshoor Fanavari Arya',
    location: 'Mashhad, Iran',
    period: 'Sep 2026 – Present',
    isCurrent: true,
    keyMetricHighlight: 'Delivered 4+ VR Projects & 1.5x AI Productivity Gain',
    bulletPoints: [
      'Developed and delivered 4+ Virtual Reality (VR) projects and interactive applications using the Unity engine.',
      'Extended capabilities of proprietary internal tools utilized across production pipelines.',
      'Leveraged LLMs and Agentic software development workflows to boost team productivity by 1.5x.',
      'Communicated proactively with cross-functional teams and management to consistently ensure on-time delivery.',
      'Designed a documentations system to maintain and write technical and project specific documentation to boost productivity, reduce turn-over, and improve communiation.',
      'Incorporated documentation system into agentic software development workflows to improve productivity and AI agent output quality.'
    ],
    technologies: ['Unity', 'XR Interaction Toolkit', 'C#', 'Agentic Workflows', 'Internal Tools', 'Profiling', 'Technical Documentation'],
  },
  {
    id: 'unbound-game-studio',
    role: 'Game Developer & Designer',
    company: 'Unbound Game Studio',
    location: 'Remote',
    period: 'Jul 2021 – Sep 2026',
    isCurrent: false,
    keyMetricHighlight: '50M+ Downloads, 30% Crash Cut, 5.1% Retention Boost',
    bulletPoints: [
      'Implemented core gameplay mechanics for 10+ hyper-casual, casual, and hybrid-casual titles using Unity and C# for global markets, adhering to Clean Code, Design Patterns, and scalable architecture.',
      'Developed custom Unity editor tools for level design and economy balancing, streamlining designer iteration workflows and reducing production time by 10%.',
      'Debugged and profiled live titles, cutting crash/ANR rates by 30% and improving player retention by 5.1%.',
      'Ported Android Unity titles to WebGL and wrote custom JavaScript integration wrappers for browser-specific feature support, capturing 20K+ new players.',
      'Integrated ad networks and analytics SDKs (GameAnalytics, Firebase, AppLovin, CrazyGames) across Android and WebGL games.',
      'Refactored legacy codebases and extracted technical & game design documentation, decreasing engineering and design task turnaround times by 30%.',
      'Collaborated closely with game designers, bridging technical and design disciplines through dual-domain expertise to accelerate iteration speed and shorten meetings.',
      'Collected and analyzed in-game telemetry data to drive game design decisions, identify drop-off funnels, and reduce player churn by 10%.',
      'Authored Game Design Documents (GDD) and user stories for mechanics and updates, ensuring smooth handoff to engineering.',
      'Interviewed 3 technical and design candidates, onboarded and mentored new hires, and evaluated performance against team conventions.',
    ],
    technologies: ['Unity', 'C#', 'GameAnalytics', 'Firebase', 'AppLovin', 'CrazyGames', 'WebGL', 'Editor Scripting', 'Clean Architecture'],
  },
  {
    id: 'lodaroon-game-studio',
    role: 'Co-founder, Programmer & Game Designer',
    company: 'Lodaroon Game Studio',
    location: 'Mashhad, Iran',
    period: 'May 2020 – Mar 2021',
    isCurrent: false,
    keyMetricHighlight: 'Co-Founded Studio & Modular ScriptableObject Architecture',
    bulletPoints: [
      'Managed and scheduled project roadmaps to deliver high-quality releases within deadlines.',
      'Architected and implemented game mechanics using a modular architecture based on ScriptableObjects in Unity.',
      'Designed and documented mobile game concepts and mechanics, utilizing prototyping tools for seamless team communication.',
    ],
    technologies: ['Unity', 'C#', 'ScriptableObjects', 'Roadmap Planning', 'Game Design'],
  },
];

export const EDUCATION_DATA: EducationItem = {
  degree: 'B.Sc. in Computer Engineering',
  field: 'Software Engineering & Computer Networks',
  institution: 'Ferdowsi University of Mashhad',
  period: 'Sep 2016 – Sep 2021',
  highlights: [
    'Specialized in Software Engineering, Computer Networks, and Object-Oriented System Architecture.',
    'Served as Teaching Assistant (TA) for Computer Lab courses.',
    'Instructed university workshops on Game Design and Unity Engine fundamentals.',
    'Built an interactive motion-capture game powered by Microsoft Kinect to teach students computer vision and game loops.',
  ],
};
