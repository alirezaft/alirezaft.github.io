import { Project } from './types';

export const projectMrBeanSpecialDelivery: Project = {
  id: 'mr-bean-special-delivery',
  title: 'Mr. Bean – Special Delivery',
  subtitle: 'Official Mr. Bean IP Mobile Hit with 50M+ Downloads',
  category: 'shipped-commercial',
  shelfRow: 1,
  slotIndex: 0,
  year: '2021 – 2026',
  role: 'Game Developer & Designer',
  company: 'Unbound Game Studio',
  statsBadge: '50M+ Downloads',
  overview: 'The official Mr. Bean mobile title published globally. Spearheaded game design, legacy codebase refactoring, level design pipelines, and custom in-engine tooling to sustain massive active player engagement.',
  responsibilities: [
    'Conducted full-scale legacy code audit and comprehensive architecture documentation, cutting feature turnaround times by 30%.',
    'Designed, balanced, and iterated core gameplay delivery mechanics and level layouts.',
    'Engineered custom Unity Editor tools for rapid level creation and economy balancing, boosting designer iteration speed by 10%.',
    'Monitored live telemetry via GameAnalytics to identify player drop-off funnels and optimize retention.',
  ],
  techTags: ['Unity', 'C#', 'Editor Tooling', 'Clean Architecture', 'GameAnalytics', 'Mobile Optimization'],
  cartridgeVisual: {
    primaryColor: '#12192c',
    accentColor: '#ff007f',
    glowColor: 'rgba(255, 0, 127, 0.6)',
    serialNumber: 'ROM-BEAN-01',
  },
  links: [
    {
      label: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.unbound.mrbeanspecialdelivery',
      type: 'google-play',
    },
  ],
  featured: true,
};
