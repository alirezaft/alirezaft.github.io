import { Project } from './types';

export const projectUnityBoids: Project = {
  id: 'unity-boids',
  title: 'Unity BOIDS Flocking Simulation',
  subtitle: 'Real-Time Swarm Intelligence & Steering Behaviors in Unity (20+ Stars)',
  category: 'open-source',
  shelfRow: 3,
  slotIndex: 2,
  year: '2024',
  role: 'Creator & Maintainer',
  company: 'Open Source (GitHub)',
  statsBadge: '20+ GitHub Stars',
  overview:
    "A real-time swarm intelligence and flocking physics simulation for Unity implementing Craig Reynolds' Boids algorithm with custom 3D extensions. Features cohesive flock steering, obstacle separation, spherical boundary containment, and low-pass filter direction smoothing across hundreds of autonomous agents.",
  responsibilities: [
    "Implemented Craig Reynolds' foundational Boids flocking model with three core steering vectors: cohesion towards center of mass, spatial separation to prevent collisions, and heading alignment.",
    'Engineered dynamic 3D obstacle avoidance using closest-point distance calculations and spherical border containment to maintain flock density and area boundaries.',
    'Eliminated rapid trajectory flipping and high-frequency steering jitter by designing a tunable temporal low-pass filter (lerp-based directional smoothing) for agent heading.',
    'Authored and published the acclaimed technical breakdown "Boids Algorithm: Simulating Bird Flocks in Unity" on Dev Genius / Medium, detailing vector mathematics and flock manager tuning.',
  ],
  techTags: [
    'Unity',
    'C#',
    'Swarm Intelligence',
    'Boids Algorithm',
    'Steering Behaviors',
    'Vector Mathematics',
    'Autonomous Agents',
    'Physics Simulation',
  ],
  cartridgeVisual: {
    primaryColor: '#0a1d2e',
    accentColor: '#00f3ff',
    glowColor: 'rgba(0, 243, 255, 0.6)',
    serialNumber: 'ROM-BOID-01',
  },
  links: [
    {
      label: 'GitHub Repository',
      url: 'https://github.com/alirezaft/UnityBOIDS',
      type: 'github',
    },
    {
      label: 'Algorithm Breakdown (Medium)',
      url: 'https://blog.devgenius.io/boids-algorithm-simulating-bird-flocks-in-unity-ec733d529a92',
      type: 'medium',
    },
    {
      label: 'LinkedIn Showcase',
      url: 'https://www.linkedin.com/posts/alirezaft_unity-gamedevelpment-gamedev-activity-7203364160867307520-N3U9',
      type: 'external',
    },
  ],
};
