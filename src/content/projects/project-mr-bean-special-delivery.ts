import { Project } from './types';

export const projectMrBeanSpecialDelivery: Project = {
  id: 'mr-bean-special-delivery',
  title: 'Mr. Bean – Special Delivery',
  subtitle: 'Official Mr. Bean IP Mobile Hit with 50M+ Downloads',
  category: 'shipped-commercial',
  shelfRow: 1,
  slotIndex: 0,
  year: '2024 – 2026',
  role: 'Game Designer',
  company: 'Unbound Game Studio',
  statsBadge: '50M+ Downloads',
  overview: 'The official Mr. Bean mobile title published globally. Spearheaded game design, legacy codebase documentation, level design pipelines, and data analysis and telemetry',
  responsibilities: [
    'Conducted full-scale legacy code audit and comprehensive documentation, cutting feature turnaround times by 30%.',
    'Designed, balanced, and iterated core gameplay delivery mechanics and level layouts.',
    'Contributed on custom Unity Editor tools for rapid level creation and economy balancing, boosting designer iteration speed by 10%.',
    'Monitored live telemetry via GameAnalytics to identify player drop-off funnels and optimize retention.',
  ],
  techTags: ['Unity', 'C#', 'Editor Tooling', 'GameAnalytics', 'Game Design', 'Level Design'],
  thumbnailUrl: './assets/projects/mr-bean-special-delivery/delivery-finish-line.webp',
  media: [
    {
      id: 'bean-delivery-finish-line',
      type: 'image',
      url: './assets/projects/mr-bean-special-delivery/delivery-finish-line.webp',
      title: 'High-Stakes Delivery & Physics Racing',
      caption: 'Physics-based hill climb delivery racing with precarious rooftop cargo balancing, speed controls, and countdown timers.',
      alt: 'Mr. Bean crossing the finish line with packages on roof and timer countdown',
    },
    {
      id: 'bean-delivery-world-biomes',
      type: 'image',
      url: './assets/projects/mr-bean-special-delivery/world-biomes.webp',
      title: 'Global Delivery Biomes & Level Environments',
      caption: 'Diverse worldwide delivery zones including city streets, countryside hills, icy winter mountain bridges, and desert canyons.',
      alt: 'Four game biomes: city, countryside, snowy mountains, and desert canyon',
    },
    {
      id: 'bean-delivery-vehicle-boosts',
      type: 'image',
      url: './assets/projects/mr-bean-special-delivery/vehicle-boosts.webp',
      title: 'Hilarious Vehicle Boosts & Power-Ups',
      caption: 'Dynamic vehicle upgrades including scissor-lift suspension wheels, parachute gliders, rocket turbos, and fragile cargo modifiers.',
      alt: 'Vehicle boosts showing scissor wheels, parachute, rocket boosters, and glass cargo',
    },
  ],
  cartridgeVisual: {
    primaryColor: '#12192c',
    accentColor: '#ff007f',
    glowColor: 'rgba(255, 0, 127, 0.6)',
    serialNumber: 'ROM-BEAN-01',
  },
  links: [
    {
      label: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.goodcatchgames.mrbeanhillclimb&hl=en_US',
      type: 'google-play',
    },
  ],
  featured: true,
};
