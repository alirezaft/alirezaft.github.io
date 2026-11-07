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
  thumbnailUrl: './assets/projects/vr-interactive-applications/industrial-plant-simulation.png',
  media: [
    {
      id: 'vr-industrial-plant',
      type: 'image',
      url: './assets/projects/vr-interactive-applications/industrial-plant-simulation.png',
      title: 'Industrial Heavy Manufacturing VR Simulation',
      caption: 'Large-scale steel smelting and foundry simulation featuring molten metal rail transport, gantry operations, and hazardous procedure training.',
      alt: 'Virtual reality industrial steel manufacturing facility with smelting ladles and machinery',
    },
    {
      id: 'vr-laboratory-simulation',
      type: 'image',
      url: './assets/projects/vr-interactive-applications/laboratory-simulation.png',
      title: 'Precision Chemical & Laboratory VR Simulation',
      caption: 'Interactive cleanroom laboratory environment with high-precision glassware physics, chemical compound testing, and hot plate apparatus.',
      alt: 'Virtual reality chemistry laboratory workbench with beakers, test tubes, and heating equipment',
    },
  ],
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
