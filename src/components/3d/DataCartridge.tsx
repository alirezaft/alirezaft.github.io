import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { Project } from '../../content/projects/types';
import { SHELF_CATEGORIES } from '../../content/projects/categories';
import { createCartridgeLabelTexture } from './cartridgeLabelTexture';
import { useAudio } from '../../audio';

export interface DataCartridgeProps {
  /** Optional project object from content architecture */
  project?: Project;
  /** Category ID fallback or custom */
  category?: string;
  /** Custom accent color (e.g. #ff007f, #00f3ff, #00ff66, #ffb700) */
  accentColor?: string;
  /** Custom title for the cartridge */
  title?: string;
  /** Position [x, y, z] in world space */
  position?: [number, number, number];
  /** Rotation [x, y, z] in radians */
  rotation?: [number, number, number];
  /** Scale */
  scale?: number | [number, number, number];
  /** Whether the cartridge is selected/inserted */
  selected?: boolean;
  /** Interactive hover / click behaviors */
  interactive?: boolean;
  /** Click callback */
  onClick?: () => void;
  /** Hover callback */
  onHover?: (hovered: boolean) => void;
}

/**
 * DataCartridge:
 * Tactical cyberpunk data cartridge with dynamic category coloring,
 * glowing acrylic light guide, and dynamic canvas holographic project label.
 */
export const DataCartridge: React.FC<DataCartridgeProps> = ({
  project,
  category,
  accentColor,
  title,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  selected = false,
  interactive = true,
  onClick,
  onHover,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const accentMeshRef = useRef<THREE.Mesh | null>(null);
  const [hovered, setHovered] = useState(false);
  const audio = useAudio();

  // 1. Resolve content metadata
  const resolvedCategory = project?.category || category || 'shipped-commercial';
  const categoryInfo = SHELF_CATEGORIES.find(
    (c) => c.id === resolvedCategory || c.shelfRow === project?.shelfRow
  );
  const finalAccent =
    accentColor ||
    project?.cartridgeVisual?.accentColor ||
    categoryInfo?.accentColor ||
    '#00f3ff';
  const finalTitle = title || project?.title || 'UNTITLED ROM';
  const categoryName = categoryInfo?.name || 'DATA ROM';
  const finalGenre = project?.subtitle || 'CYBER ROM';
  const finalYear = project?.year || '2026';

  // 2. Load base GLB (contains SM_DataCartridge Group with 4 child meshes)
  const gltf = useGLTF('/assets/cartridge.glb');

  // 3. Dynamic procedural label sticker texture
  const labelTexture = useMemo(() => {
    return createCartridgeLabelTexture(
      finalTitle,
      categoryName,
      finalAccent,
      finalGenre,
      finalYear
    );
  }, [finalTitle, categoryName, finalAccent, finalGenre, finalYear]);

  // 4. Clone and configure the cartridge hierarchy with per-instance materials
  const clonedObject = useMemo(() => {
    // Deep clone the root node
    const clone = gltf.scene.clone(true);

    // Create unique materials for this instance
    const shellMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#12151c'),
      roughness: 0.45,
      metalness: 0.12,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finalAccent),
      emissive: new THREE.Color(finalAccent),
      emissiveIntensity: 3.2,
      roughness: 0.15,
      metalness: 0.05,
      toneMapped: false,
    });

    const labelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      map: labelTexture,
      roughness: 0.28,
      metalness: 0.2,
    });

    const contactsMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#eab308'),
      roughness: 0.22,
      metalness: 0.95,
    });

    // Traverse and assign materials to child meshes based on their original material names
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const origMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
        const matName = origMat?.name || '';

        if (matName.includes('Accent')) {
          mesh.material = accentMat;
          accentMeshRef.current = mesh;
        } else if (matName.includes('Label')) {
          mesh.material = labelMat;
        } else if (matName.includes('Contacts')) {
          mesh.material = contactsMat;
        } else {
          mesh.material = shellMat;
        }
      }
    });

    return clone;
  }, [gltf.scene, finalAccent, labelTexture]);

  // 5. Smooth hover / lift animation
  const currentLift = useRef(0);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetLift = hovered ? 0.03 : selected ? 0.045 : 0;
    currentLift.current = THREE.MathUtils.damp(
      currentLift.current,
      targetLift,
      12,
      delta
    );

    // Nudge upward and slightly forward in local space
    groupRef.current.position.y = position[1] + currentLift.current;
    groupRef.current.position.z = position[2] + currentLift.current * 0.4;

    // Pulse emissive light on hover
    if (accentMeshRef.current) {
      const mat = accentMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = hovered ? 5.0 : 3.2;
      }
    }
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(true);
    onHover?.(true);
    audio.playHover();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    if (!interactive) return;
    setHovered(false);
    onHover?.(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    if (!interactive) return;
    e.stopPropagation();
    audio.playClick();
    audio.playBusPulse();
    onClick?.();
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <primitive object={clonedObject} />
    </group>
  );
};

// Preload asset for zero-stutter first render
useGLTF.preload('/assets/cartridge.glb');
