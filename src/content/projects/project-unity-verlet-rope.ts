import { Project } from './types';

export const projectUnityVerletRope: Project = {
  id: 'unity-verlet-rope',
  title: 'Unity Verlet Rope Physics',
  subtitle: 'Open-Source Real-Time Verlet Integration Rope Simulation (70+ Stars)',
  category: 'open-source',
  shelfRow: 3,
  slotIndex: 0,
  year: '2023',
  role: 'Creator & Maintainer',
  company: 'Open Source (GitHub)',
  statsBadge: '70+ GitHub Stars',
  overview: 'A lightweight, numerically stable rope and cable physics simulation for Unity utilizing Verlet integration and distance constraints. Solves spring instability issues common in classic hinge-joint setups.',
  responsibilities: [
    'Implemented iterative Verlet integration with relaxation solver for realistic rope droop and tension.',
    'Implemented Sweep Collision Detection and resolving collisions effectively.',
    'Engineered custom procedural mesh generation that wraps cylinder topology along simulation nodes.',
    'Packaged with intuitive inspector gizmos, collision handling, and performance benchmark test scenes.',
    'Adopted by indie game developers worldwide with 70+ GitHub stars and active forks.',
  ],
  techTags: ['Unity', 'C#', 'Physics Simulation', 'Verlet Integration', 'Procedural Mesh', 'Math & Algorithms'],
  thumbnailUrl: './assets/projects/unity-verlet-rope/demo.gif',
  media: [
    {
      id: 'verlet-demo-gif',
      type: 'gif',
      url: './assets/projects/unity-verlet-rope/demo.gif',
      title: 'Real-Time Verlet Integration Simulation',
      caption: 'Iterative relaxation solver preventing spring explosion glitches in Unity.',
      alt: 'Demonstration of Verlet rope physics simulation in Unity',
    },
    {
      id: 'verlet-rope-inspector',
      type: 'image',
      url: './assets/projects/unity-verlet-rope/verlet-rope-inspector.png',
      title: 'Verlet Rope Component Inspector',
      caption: 'Tunable simulation parameters: length, node density, constraint iterations, and substeps.',
      alt: 'Unity inspector view for VerletRope component',
    },
    {
      id: 'rope-renderer-inspector',
      type: 'image',
      url: './assets/projects/unity-verlet-rope/rope-renderer-inspector.png',
      title: 'Procedural Mesh Extrusion Inspector',
      caption: 'Procedural cylinder mesh generator wrapping dynamic simulation nodes.',
      alt: 'Unity inspector view for RopeRenderer component',
    },
  ],
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
    {
      label: 'Physics Breakdown (Medium)',
      url: 'https://alirezaft98.medium.com/verlet-integration-simulating-rope-physics-in-unity-b4f0ffde38fb',
      type: 'medium',
    },
  ],
  featured: true,
};
