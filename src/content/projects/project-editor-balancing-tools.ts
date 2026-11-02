import { Project } from './types';

export const projectUnityChart: Project = {
  id: 'unity-chart',
  title: 'UnityChart',
  subtitle: 'Vector-Based UI Toolkit Charting Library for Unity Editor Tools',
  category: 'tools',
  shelfRow: 4,
  slotIndex: 1,
  year: '2023 – Present',
  role: 'Creator & Maintainer',
  company: 'Open Source (GitHub / UPM)',
  statsBadge: 'UI Toolkit / Vector Charting',
  overview: 'A lightweight vector-based charting library for Unity Editor tools, fully integrated with UI Toolkit (UXML/USS). Enables game designers and programmers to visualize real-time data directly inside custom editor windows, inspectors, and economy balancing interfaces.',
  responsibilities: [
    'Engineered vector-based chart rendering for high-DPI custom Unity Editor windows and inspectors.',
    'Integrated natively with modern UI Toolkit, providing custom UXML tags (<chart:LineChart>) and USS styling support.',
    'Designed reactive DataProvider architecture enabling real-time play-mode data streaming for AI telemetry and variable monitoring.',
    'Published complete API documentation and interactive samples for custom inspector and window integration.',
  ],
  techTags: ['Unity', 'C#', 'UI Toolkit', 'UXML / USS', 'Data Visualization', 'Editor Scripting', 'Vector Graphics'],
  cartridgeVisual: {
    primaryColor: '#2b2108',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    serialNumber: 'ROM-CHART-02',
  },
  links: [
    {
      label: 'GitHub Repository',
      url: 'https://github.com/alirezaft/UnityChart',
      type: 'github',
    },
    {
      label: 'Documentation',
      url: 'https://alirezaft.github.io/UnityChart/',
      type: 'external',
    },
  ],
  featured: true,
};

// Backward-compatible alias
export const projectEditorBalancingTools = projectUnityChart;
