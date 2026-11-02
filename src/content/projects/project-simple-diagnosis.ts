import { Project } from './types';

export const projectSimpleDiagnosis: Project = {
  id: 'a-simple-diagnosis',
  title: 'A Simple Diagnosis',
  subtitle: 'Atmospheric Indie Title with Bespoke Audio & UI Architecture',
  category: 'open-source',
  shelfRow: 3,
  slotIndex: 1,
  year: '2022',
  role: 'Solo Developer & Sound Designer',
  company: 'Independent Release',
  statsBadge: 'Available on itch.io',
  overview: 'A solo-developed narrative medical mystery game. Focused deeply on immersive diegetic UI, decoupled audio event architectures, and emotional ambient soundscapes.',
  responsibilities: [
    'Designed and implemented complete gameplay loop, diagnostic mechanics, and interactive patient records.',
    'Engineered an event-driven audio routing engine to handle dynamic stems, tension swells, and stethoscope audio cues.',
    'Crafted an intuitive, tactile diegetic UI system minimizing screen clutter and heightening atmosphere.',
  ],
  techTags: ['Unity', 'C#', 'UI/UX Architecture', 'Audio Engineering', 'Game Design', 'itch.io'],
  cartridgeVisual: {
    primaryColor: '#0c2419',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    serialNumber: 'ROM-DIAG-02',
  },
  links: [
    {
      label: 'Play on itch.io',
      url: 'https://alirezaft.itch.io/a-simple-diagnosis',
      type: 'itch',
    },
  ],
};
