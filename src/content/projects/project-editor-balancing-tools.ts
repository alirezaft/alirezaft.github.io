import { Project } from './types';

export const projectEditorBalancingTools: Project = {
  id: 'custom-editor-balancing-tools',
  title: 'Studio Level & Economy Balancing Tools',
  subtitle: 'Internal Unity Editor Extensions & Data Importers',
  category: 'tools',
  shelfRow: 4,
  slotIndex: 1,
  year: '2021 – 2026',
  role: 'Tools & Pipeline Developer',
  company: 'Unbound Game Studio',
  statsBadge: '10% Faster Iteration',
  overview: 'Suite of custom Unity Editor tools created to automate level progression balancing, economy formula validation, and live configuration sync, cutting production turnaround by 10%.',
  responsibilities: [
    'Built custom Odin/UI Toolkit property drawers, live curve previews, and economy balance validators.',
    'Automated ingestion of designer balancing spreadsheets into serialized ScriptableObjects.',
    'Empowered game designers to tweak and preview level parameters in play mode without programmer intervention.',
  ],
  techTags: ['Unity', 'C#', 'Editor Scripting', 'ScriptableObjects', 'Pipeline Automation', 'Workflow Optimization'],
  cartridgeVisual: {
    primaryColor: '#2b2108',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    serialNumber: 'ROM-TOOL-02',
  },
  links: [
    {
      label: 'LinkedIn Case Notes',
      url: 'https://linkedin.com/in/alirezaft',
      type: 'external',
    },
  ],
};
