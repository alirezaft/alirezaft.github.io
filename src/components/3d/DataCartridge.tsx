import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { Project } from '../../content/projects/types';
import { SHELF_CATEGORIES } from '../../content/projects/categories';
import { createCartridgeLabelTexture } from './cartridgeLabelTexture';
import { useAudio } from '../../audio';
import { useCrosshairInteractable } from './CrosshairInteraction';

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
 * subtle eye-comfort acrylic underglow, and high-visibility 3D typography directly
 * on the top spine and front faceplate.
 */
export const DataCartridge: React.FC<DataCartridgeProps> = ({
  project,
  category,
  accentColor,
  title,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  interactive = true,
  onClick,
  onHover,
}: DataCartridgeProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const accentMeshRef = useRef<THREE.Mesh | null>(null);
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

  // 3. Dynamic procedural label sticker texture (background foil)
  const labelTexture = useMemo(() => {
    return createCartridgeLabelTexture(
      finalTitle,
      categoryName,
      finalAccent,
      finalGenre,
      finalYear
    );
  }, [finalTitle, categoryName, finalAccent, finalGenre, finalYear]);

  // 4. Clone and configure the cartridge hierarchy with subtle, eye-friendly materials
  const clonedObject = useMemo(() => {
    const clone = gltf.scene.clone(true);

    // Matte anthracite shell
    const shellMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141720'),
      roughness: 0.55,
      metalness: 0.15,
    });

    // Subtle, gentle acrylic accent glow (restrained emission for zero eye strain)
    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finalAccent),
      emissive: new THREE.Color(finalAccent),
      emissiveIntensity: 0.65, // Gentle, slight glow
      roughness: 0.25,
      metalness: 0.1,
    });

    // Label backing plate
    const labelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      map: labelTexture,
      roughness: 0.35,
      metalness: 0.1,
    });

    // Gold contacts
    const contactsMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d97706'),
      roughness: 0.28,
      metalness: 0.9,
    });

    // Traverse and assign materials
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

  // Crosshair-driven FPS interaction hook with single-source-of-truth isHovered
  const { isHovered } = useCrosshairInteractable({
    id: project?.id || finalTitle,
    ref: groupRef,
    prompt: 'LMB to grab',
    onInteract: () => {
      audio.playClick();
      audio.playBusPulse();
      onClick?.();
    },
    onHoverStart: () => {
      onHover?.(true);
    },
    onHoverEnd: () => {
      onHover?.(false);
    },
    enabled: interactive,
  });

  // 5. Smooth hover / lift animation & slight emissive accentuation
  const currentLift = useRef(0);
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Safety: Clamp delta to 0.05 to avoid mathematical explosions when returning from background tabs
    const safeDelta = Math.min(delta, 0.05);

    // Only lift when actively focused by the center crosshair
    const targetLift = isHovered ? 0.028 : 0;
    currentLift.current = THREE.MathUtils.damp(
      currentLift.current,
      targetLift,
      12,
      safeDelta
    );

    // Snap to exact 0 to prevent lingering micro-floating drift
    if (!isHovered && currentLift.current < 0.0004) {
      currentLift.current = 0;
    }

    // Nudge upward and slightly forward in local space
    groupRef.current.position.y = position[1] + currentLift.current;
    groupRef.current.position.z = position[2] + currentLift.current * 0.4;

    // Subtle emissive modulation on hover (gentle pulse, no glare)
    if (accentMeshRef.current) {
      const mat = accentMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = isHovered ? 1.15 : 0.65;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* 3D Cartridge Model */}
      <primitive object={clonedObject} />

      {/* =================================================================== */}
      {/* SINGLE PROJECT TITLE ON THE CARTRIDGE FACEPLATE                     */}
      {/* Scaled & positioned to fit cleanly inside the label display window  */}
      {/* Uses UI-matched JetBrains Mono typography                           */}
      {/* =================================================================== */}
      <Text
        font="/fonts/JetBrainsMono-Bold.woff"
        position={[0, 0.056, 0.0074]}
        fontSize={0.0054}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.046}
        textAlign="center"
        lineHeight={1.2}
        letterSpacing={0.02}
        outlineWidth={0.0004}
        outlineColor="#060810"
      >
        {finalTitle.toUpperCase()}
      </Text>
    </group>
  );
};

// Preload asset for zero-stutter first render
useGLTF.preload('/assets/cartridge.glb');
