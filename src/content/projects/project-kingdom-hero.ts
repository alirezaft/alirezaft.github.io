import { Project } from './types';

export const projectKingdomHero: Project = {
  id: 'kingdom-hero-tower-defense',
  title: 'Kingdom Hero: Tower Defense TD',
  subtitle: 'Tactical Mobile Strategy & Wave-Based Tower Defense',
  category: 'shipped-commercial',
  shelfRow: 1,
  slotIndex: 2,
  year: '2021 – 2023',
  role: 'Game Designer',
  company: 'Unbound Game Studio',
  statsBadge: 'Shipped Title',
  overview: 'Strategic fantasy tower defense title built for mobile. Architected high-performance wave spawning systems, pathfinding logic, tower progression upgrades, and combat calculations.',
  responsibilities: [
    'Engineered core gameplay systems, tower targeting heuristics, and wave spawning state machines.',
    'Optimized unit physics and pathfinding queries to sustain high FPS during massive enemy swarms.',
    'Collaborated closely with game designers to balance tower DPS, enemy armor curves, and player progression.',
    'Implemented clean decoupled event architectures for audio triggers, VFX spawning, and UI synchronization.',
  ],
  techTags: ['Unity', 'C#', 'Tower Defense', 'AI Pathfinding', 'State Machines', 'Performance Profiling'],
  cartridgeVisual: {
    primaryColor: '#12192c',
    accentColor: '#e01a4f',
    glowColor: 'rgba(224, 26, 79, 0.5)',
    serialNumber: 'ROM-KH-03',
  },
  links: [
    {
      label: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.Artronics.TowerMania&hl=en_US',
      type: 'google-play',
    },
  ],
};
