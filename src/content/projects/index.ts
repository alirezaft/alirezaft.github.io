import { Project, ProjectCategory } from './types';
import { projectMrBeanSpecialDelivery } from './project-mr-bean-special-delivery';
import { projectMrBeanSolitaire } from './project-mr-bean-solitaire';
import { projectKingdomHero } from './project-kingdom-hero';
import { projectVrProduction } from './project-vr-production';
import { projectUnityVerletRope } from './project-unity-verlet-rope';
import { projectSimpleDiagnosis } from './project-simple-diagnosis';
import { projectUnityBoids } from './project-unity-boids';
import { projectPrefabPalette } from './project-prefab-palette';
import { projectEditorBalancingTools, projectUnityChart } from './project-editor-balancing-tools';

export * from './types';
export * from './categories';
export { projectUnityChart };

export const ALL_PROJECTS: Project[] = [
  // Shelf Row 1: Shipped Commercial Games
  projectMrBeanSpecialDelivery,
  projectMrBeanSolitaire,
  projectKingdomHero,

  // Shelf Row 2: VR Games & Applications
  projectVrProduction,

  // Shelf Row 3: Open Source & Indie Games
  projectUnityVerletRope,
  projectSimpleDiagnosis,
  projectUnityBoids,

  // Shelf Row 4: Tools & Editor Extensions
  projectPrefabPalette,
  projectEditorBalancingTools,
];

export function getProjectsByShelfRow(row: number): Project[] {
  return ALL_PROJECTS.filter((p) => p.shelfRow === row).sort((a, b) => a.slotIndex - b.slotIndex);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return ALL_PROJECTS.filter((p) => p.category === category);
}

export function getProjectById(id: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return ALL_PROJECTS.filter((p) => p.featured);
}
