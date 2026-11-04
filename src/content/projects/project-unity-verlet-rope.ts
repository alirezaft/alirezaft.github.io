import { Project } from './types';

export const projectUnityVerletRope: Project = {
  id: 'unity-verlet-rope',
  title: 'Unity Verlet Rope Physics',
  subtitle: 'Open-Source Real-Time Verlet Integration Rope Simulation (65+ Stars)',
  category: 'open-source',
  shelfRow: 3,
  slotIndex: 0,
  year: '2023',
  role: 'Creator & Maintainer',
  company: 'Open Source (GitHub)',
  statsBadge: '65+ GitHub Stars',
  overview: 'A lightweight, numerically stable rope and cable physics simulation for Unity utilizing Verlet integration and distance constraints. Solves spring instability issues common in classic hinge-joint setups.',
  responsibilities: [
    'Implemented iterative Verlet integration with relaxation solver for realistic rope droop and tension.',
    'Engineered custom procedural mesh generation that wraps cylinder topology along simulation nodes.',
    'Packaged with intuitive inspector gizmos, collision handling, and performance benchmark test scenes.',
    'Adopted by indie game developers worldwide with 65+ GitHub stars and active forks.',
  ],
  techTags: ['Unity', 'C#', 'Physics Simulation', 'Verlet Integration', 'Procedural Mesh', 'Math & Algorithms'],
  cartridgeVisual: {
    primaryColor: '#0c2419',
    accentColor: '#00ff66',
    glowColor: 'rgba(0, 255, 102, 0.6)',
    serialNumber: 'ROM-ROPE-01',
  },
  links: [
    {
      label: 'GitHub Repository',
      url: 'https://github.com/alirezaft/UnityVerletRope',
      type: 'github',
    },
  ],
  featured: true,
};
