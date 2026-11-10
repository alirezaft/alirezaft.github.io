import * as THREE from 'three';
import { ALL_PROJECTS } from '../../content/projects';

export interface CartridgeSlotTransform {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  quaternion: THREE.Quaternion;
}

/**
 * Calculates the exact world-space position and rotation of any project's
 * docking slot on the desk rack.
 */
export function getCartridgeSlotTransform(projectId: string): CartridgeSlotTransform {
  const rackPos = new THREE.Vector3(-0.62, 0.76, 0.86);
  const rackYaw = 0.48;

  const project = ALL_PROJECTS.find((p) => p.id === projectId);
  if (!project) {
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rackYaw, 0, 'YXZ'));
    return {
      position: rackPos.clone(),
      rotation: new THREE.Euler(0, rackYaw, 0, 'YXZ'),
      quaternion: q,
    };
  }

  const tierConfig = [
    { row: 1, y: 0.02, z: 0.11 },
    { row: 2, y: 0.06, z: 0.035 },
    { row: 3, y: 0.10, z: -0.04 },
    { row: 4, y: 0.14, z: -0.115 },
  ];

  const tier = tierConfig.find((t) => t.row === project.shelfRow) || tierConfig[0];
  const rowProjects = ALL_PROJECTS.filter((p) => p.shelfRow === project.shelfRow);
  const indexInRow = rowProjects.indexOf(project);
  const totalInRow = rowProjects.length;

  let xPos = 0;
  if (totalInRow === 1) {
    xPos = 0;
  } else if (totalInRow === 2) {
    xPos = indexInRow === 0 ? -0.075 : 0.075;
  } else {
    xPos = -0.11 + indexInRow * 0.11;
  }

  // Local position on rack
  const localPos = new THREE.Vector3(xPos, tier.y + 0.01, tier.z);

  // Apply rack rotation around Y
  localPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), rackYaw);
  // Add rack world position
  const worldPos = localPos.add(rackPos);

  // World rotation (rack yaw + tilt back 15 degrees)
  const euler = new THREE.Euler(-0.26, rackYaw, 0, 'YXZ');
  const quaternion = new THREE.Quaternion().setFromEuler(euler);

  return {
    position: worldPos,
    rotation: euler,
    quaternion,
  };
}
