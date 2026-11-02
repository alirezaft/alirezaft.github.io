import { Project } from './types';

export const projectPrefabPalette: Project = {
  id: 'prefab-palette',
  title: 'Prefab Palette',
  subtitle: 'Modern Unity Editor Tool Built with UI Toolkit (23 GitHub Stars)',
  category: 'tools',
  shelfRow: 4,
  slotIndex: 0,
  year: '2023',
  role: 'Creator & Maintainer',
  company: 'Open Source (GitHub)',
  statsBadge: '23+ GitHub Stars',
  overview: 'An open-source production utility for Unity level designers built using modern UI Toolkit (UXML/USS). Provides instant visual asset categorization, search indexing, and drag-and-drop placement directly into scene view.',
  responsibilities: [
    'Engineered visual drag-and-drop workflow using Unity UI Toolkit and reactive data binding.',
    'Integrated quick tag filtering, search indexing, and favorite presets for rapid scene dressing.',
    'Adopted by commercial studio teams to streamline level dressing and environment composition.',
  ],
  techTags: ['Unity', 'C#', 'UI Toolkit', 'UXML / USS', 'Editor Scripting', 'Level Design Tools'],
  cartridgeVisual: {
    primaryColor: '#2b2108',
    accentColor: '#ffb700',
    glowColor: 'rgba(255, 183, 0, 0.6)',
    serialNumber: 'ROM-TOOL-01',
  },
  links: [
    {
      label: 'GitHub Repository',
      url: 'https://github.com/alirezaft/Prefab-Palette',
      type: 'github',
    },
  ],
  featured: true,
};
