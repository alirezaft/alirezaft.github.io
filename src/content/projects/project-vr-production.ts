import { Project } from './types';

export const projectVrProduction: Project = {
  id: 'vr-interactive-applications',
  title: 'Enterprise VR & Interactive Simulations',
  subtitle: '4+ Immersive Virtual Reality Projects & Enterprise Solutions',
  category: 'vr-applications',
  shelfRow: 2,
  slotIndex: 0,
  year: '2026 – Present',
  role: 'Mid-Level Unity Developer',
  company: 'Manshoor Fanavari Arya',
  statsBadge: '4+ VR Projects Delivered',
  overview: 'Engineered and shipped four bespoke Virtual Reality applications and spatial interactive experiences. Developed custom spatial interaction toolkits, immersive physics feedback, and internal production tools.',
  responsibilities: [
    'Developed and delivered 4+ high-immersion Virtual Reality (VR) projects using Unity XR Interaction Toolkit and custom spatial mechanics.',
    'Extended internal proprietary tools and pipelines, boosting team asset ingestion and test turnaround.',
    'Integrated LLM and Agentic AI software workflows into the production pipeline, increasing engineering velocity by 1.5x.',
    'Maintained strict 90fps stereo rendering budgets through aggressive draw call batching and shader optimizations.',
  ],
  techTags: ['Unity VR', 'XR Interaction Toolkit', 'C#', 'Spatial Audio', 'LLM Agentic Workflows', 'Performance Optimization'],
  cartridgeVisual: {
    primaryColor: '#0a1d2e',
    accentColor: '#00f3ff',
    glowColor: 'rgba(0, 243, 255, 0.6)',
    serialNumber: 'ROM-VR-01',
  },
  links: [
    {
      label: 'Products & Portfolio',
      url: 'https://manshourfanavari.com/en/products',
      type: 'external',
    },
  ],
  featured: true,
};
