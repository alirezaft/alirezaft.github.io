import { Project } from './types';

export const projectKingdomHero: Project = {
  id: 'kingdom-hero-tower-defense',
  title: 'Kingdom Hero: Tower Defense TD',
  subtitle: 'Mobile Strategy & Wave-Based Tower Defense',
  category: 'shipped-commercial',
  shelfRow: 1,
  slotIndex: 2,
  year: '2021 – 2023',
  role: 'Game Designer',
  company: 'Unbound Game Studio',
  statsBadge: 'Shipped Title',
  overview: 'Strategic fantasy tower defense title built for mobile. Designed high-performance wave spawning systems, tower progression upgrades, and combat calculations.',
  responsibilities: [
    'Designed core gameplay systems and wave spawning mechanics and calculations.',
    'Collaborated closely with developers to test and ensure correct implementation of game mechanics, enemy armor curves, and player progression.',
    'Performed market analysis to identify competitors and their strengths to improve game design and KPIs',
  ],
  techTags: ['Game Design', 'Game Balance', 'Market Research', 'Documentation'],
  thumbnailUrl: './assets/projects/kingdom-hero-tower-defense/grid-summon-defense.webp',
  media: [
    {
      id: 'kh-grid-defense',
      type: 'image',
      url: './assets/projects/kingdom-hero-tower-defense/grid-summon-defense.webp',
      title: 'Grid-Based Hero Summoning & Merge Defense',
      caption: 'Dynamic tile placement and hero tier merging with perimeter creep pathfinding around the castle ramparts.',
      alt: 'Tactical grid showing hero summoning and enemy lane pathfinding',
    },
    {
      id: 'kh-pvp-arena',
      type: 'image',
      url: './assets/projects/kingdom-hero-tower-defense/pvp-battle-arena.webp',
      title: 'Real-Time Split-Screen PvP Duels',
      caption: 'Competitive head-to-head multiplayer arenas featuring synchronous creep pressure, hero abilities, and spell counterplays.',
      alt: 'Real-time PvP tower defense duel between two players',
    },
    {
      id: 'kh-hero-deck',
      type: 'image',
      url: './assets/projects/kingdom-hero-tower-defense/hero-deck-collection.webp',
      title: 'Battle Deck Roster & Hero Progression',
      caption: 'Customizable 5-card battle decks featuring collectible fantasy hero classes, level progression, and elemental synergies.',
      alt: 'Battle deck loadout interface and hero army collection',
    },
  ],
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
