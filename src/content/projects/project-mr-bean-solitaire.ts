import { Project } from './types';

export const projectMrBeanSolitaire: Project = {
  id: 'mr-bean-solitaire-adventure',
  title: 'Mr. Bean – Solitaire Adventure',
  subtitle: 'Official Mr. Bean Puzzle Card Game (50K+ Shipped · Delisted from Google Play)',
  category: 'shipped-commercial',
  shelfRow: 1,
  slotIndex: 1,
  year: '2022 – 2026',
  role: 'Game Developer & Level Designer',
  company: 'Unbound Game Studio',
  statsBadge: '50K+ Shipped (Archived)',
  overview: 'Official Mr. Bean puzzle card game combining classic solitaire progression with narrative puzzle stages. Successfully shipped to over 50,000 players globally (now retired and removed from Google Play). Focused on mathematically sound puzzle balancing, difficulty scaling curves, and live player retention.',
  responsibilities: [
    'Designed and balanced hundreds of solitaire card puzzle levels with progressive difficulty curves.',
    'Formulated dynamic level tuning spreadsheets and automated game balance import tools in Unity.',
    'Conducted telemetry-driven churn analysis, reducing player drop-off through tailored level adjustments.',
    'Maintained high framerates and memory safety across broad ranges of low-end mobile hardware.',
  ],
  techTags: ['Unity', 'C#', 'Puzzle Design', 'Game Balancing', 'Telemetry', 'Retention Optimization'],
  cartridgeVisual: {
    primaryColor: '#12192c',
    accentColor: '#ff2a5f',
    glowColor: 'rgba(255, 42, 95, 0.5)',
    serialNumber: 'ROM-BEAN-02',
  },
  links: [],
  featured: true,
};
