import { CategoryShelfInfo } from './types';

export const SHELF_CATEGORIES: CategoryShelfInfo[] = [
  {
    id: 'shipped-commercial',
    name: 'Shipped Commercial Games',
    shelfRow: 1,
    description: 'Global hit titles shipped across mobile and web platforms reaching 50M+ players.',
    accentColor: '#ff007f', // Neon Magenta
    glowColor: 'rgba(255, 0, 127, 0.4)',
  },
  {
    id: 'vr-applications',
    name: 'VR Games & Applications',
    shelfRow: 2,
    description: 'Immersive Virtual Reality simulations, computer vision games, and interactive applications.',
    accentColor: '#00f3ff', // Neon Cyan
    glowColor: 'rgba(0, 243, 255, 0.4)',
  },
  {
    id: 'open-source',
    name: 'Open Source Experiments',
    shelfRow: 3,
    description: 'Community-acclaimed physics simulations and developer packages on GitHub.',
    accentColor: '#00ff66', // Cyber Green
    glowColor: 'rgba(0, 255, 102, 0.4)',
  },
  {
    id: 'tools',
    name: 'Tools & Editor Extensions',
    shelfRow: 4,
    description: 'Custom Unity editor utilities, UI Toolkit extensions, and production pipeline toolsets.',
    accentColor: '#ffb700', // Amber
    glowColor: 'rgba(255, 183, 0, 0.4)',
  },
];
