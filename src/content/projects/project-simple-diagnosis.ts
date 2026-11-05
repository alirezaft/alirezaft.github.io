import { Project } from './types';

export const projectSimpleDiagnosis: Project = {
  id: 'a-simple-diagnosis',
  title: 'A Simple Diagnosis',
  subtitle: 'Psychological Analog Horror Game & ScriptableObject Strategy Pattern',
  category: 'indie',
  shelfRow: 3,
  slotIndex: 1,
  year: '2022',
  role: 'Solo Game Designer & Developer',
  company: 'Independent Release',
  statsBadge: 'Available on itch.io',
  overview:
    'Atmospheric psychological analog horror game featuring 2 distinct narrative endings. Set inside a quarantined diagnostic medical center during the outbreak of "Red Fever" — a deadly, incurable virus causing auditory hallucinations and madness — the player undergoes an intense auditory hearing test, analyzing ambiguous sounds and answering multiple-choice queries to prove their sanity before symptoms take hold.',
  responsibilities: [
    'Designed the complete tension curve, auditory diagnostic mechanics, and psychological horror loop — weaponizing subtle audio distortions, misleading hearing tests, and branching narrative outcomes into two distinct endings.',
    'Pioneered a Pluggable Strategy Design Pattern leveraging Unity ScriptableObjects — turning abstract algorithmic strategies and test evaluation behaviors into modular, drag-and-drop Inspector assets rather than hardcoded C# MonoBehaviours.',
    'Decoupled runtime game context from concrete behavior logic, empowering non-technical level designers to swap diagnostic rules, audio triggers, and scoring algorithms directly in the Unity Inspector without writing code.',
    'Authored and published the acclaimed architectural deep-dive "Pluggable Strategy Design Pattern with Scriptable Object" on Medium, breaking down scalable C# pattern implementation for Unity engineers.',
  ],
  techTags: [
    'Unity',
    'C#',
    'ScriptableObjects',
    'Strategy Pattern',
    'Horror Game Design',
    'Audio Systems',
    'Audacity',
    'itch.io',
  ],
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
    {
      label: 'Architecture Breakdown (Medium)',
      url: 'https://alirezaft98.medium.com/pluggable-strategy-design-pattern-with-scriptable-object-c1cdcd427e45',
      type: 'medium',
    },
  ],
};
