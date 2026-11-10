import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useUI } from '../../context';
import { SHELF_CATEGORIES } from '../../content/projects/categories';
import { createCartridgeLabelTexture } from './cartridgeLabelTexture';
import { getCartridgeSlotTransform } from './cartridgeSlotHelper';

export interface CartridgeViewmodelProps {
  /** Whether right-click inspect zoom is currently active */
  isZooming?: boolean;
}

/**
 * CartridgeViewmodel:
 * First-person tactile viewmodel system.
 * When a player grabs a data cartridge, it smoothly flies up from the rack into the player's
 * view, held in hand like tools/weapons in FPS games (Cyberpunk 2077, Half-Life).
 *
 * Features:
 * - Fluid world-to-hand trajectory interpolation.
 * - Dynamic viewmodel inertia sway (mouse look lag).
 * - Organic idle breathing / floating harmonic motion.
 * - Tactical close-up Inspect Pose when holding Right-Click zoom.
 * - Dedicated soft sci-fi fill light casting specular rim onto held geometry.
 */
export const CartridgeViewmodel: React.FC<CartridgeViewmodelProps> = ({ isZooming = false }) => {
  const { heldProjectId, heldProject, onReturnFinished } = useUI();
  const { camera } = useThree();

  const rootRef = useRef<THREE.Group>(null);
  const accentMeshRef = useRef<THREE.Mesh | null>(null);

  // Animation & Motion State
  const [activeProject, setActiveProject] = useState(heldProject);
  const flightProgress = useRef(0); // 0 (at shelf slot) -> 1 (held in viewmodel hand)
  const isReturning = useRef(false);
  const [visible, setVisible] = useState(false);

  // Mouse look inertial sway
  const prevYaw = useRef(0);
  const prevPitch = useRef(0);
  const swayX = useRef(0);
  const swayY = useRef(0);
  const inspectBlend = useRef(0); // 0 (hip/rest) -> 1 (ADS / inspect close-up)

  // Track start slot transforms
  const slotTransform = useRef(getCartridgeSlotTransform(''));

  // Load GLTF Model
  const gltf = useGLTF('/assets/cartridge.glb');

  // Trigger flight animations on heldProjectId change
  useEffect(() => {
    if (heldProjectId && heldProject) {
      setActiveProject(heldProject);
      slotTransform.current = getCartridgeSlotTransform(heldProjectId);
      flightProgress.current = 0;
      isReturning.current = false;
      setVisible(true);
    } else if (!heldProjectId && activeProject) {
      // Return to shelf animation
      isReturning.current = true;
    }
  }, [heldProjectId, heldProject, activeProject]);

  // Content Metadata & Materials
  const resolvedCategory = activeProject?.category || 'shipped-commercial';
  const categoryInfo = SHELF_CATEGORIES.find(
    (c) => c.id === resolvedCategory || c.shelfRow === activeProject?.shelfRow
  );
  const finalAccent =
    activeProject?.cartridgeVisual?.accentColor ||
    categoryInfo?.accentColor ||
    '#00f3ff';
  const finalTitle = activeProject?.title || 'UNTITLED ROM';
  const categoryName = categoryInfo?.name || 'DATA ROM';
  const finalGenre = activeProject?.subtitle || 'CYBER ROM';
  const finalYear = activeProject?.year || '2026';

  const labelTexture = useMemo(() => {
    return createCartridgeLabelTexture(
      finalTitle,
      categoryName,
      finalAccent,
      finalGenre,
      finalYear
    );
  }, [finalTitle, categoryName, finalAccent, finalGenre, finalYear]);

  // Cloned cartridge hierarchy
  const clonedObject = useMemo(() => {
    const clone = gltf.scene.clone(true);

    const shellMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141720'),
      roughness: 0.55,
      metalness: 0.15,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finalAccent),
      emissive: new THREE.Color(finalAccent),
      emissiveIntensity: 0.85,
      roughness: 0.22,
      metalness: 0.12,
    });

    const labelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      map: labelTexture,
      roughness: 0.35,
      metalness: 0.1,
    });

    const contactsMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'),
      roughness: 0.25,
      metalness: 0.95,
    });

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = false;

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

  // Frame Loop: Viewmodel positioning, flight lerp, sway & inspect
  useFrame((state, delta) => {
    if (!rootRef.current || !visible || !activeProject) return;

    // 1. Advance flight progress
    const FLIGHT_SPEED = 2.8; // ~0.35 seconds to grab or return
    if (!isReturning.current) {
      flightProgress.current = Math.min(1, flightProgress.current + delta * FLIGHT_SPEED);
    } else {
      flightProgress.current = Math.max(0, flightProgress.current - delta * (FLIGHT_SPEED * 1.1));
      if (flightProgress.current <= 0) {
        setVisible(false);
        setActiveProject(null);
        onReturnFinished();
        return;
      }
    }

    // Cubic ease out
    const easeT = isReturning.current
      ? Math.pow(flightProgress.current, 2)
      : 1 - Math.pow(1 - flightProgress.current, 3);

    // 2. Camera Euler angles & Angular Velocity Tracking (Viewmodel Sway)
    const camEuler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
    const deltaYaw = camEuler.y - prevYaw.current;
    const deltaPitch = camEuler.x - prevPitch.current;
    prevYaw.current = camEuler.y;
    prevPitch.current = camEuler.x;

    // Damp sway lag
    swayX.current = THREE.MathUtils.damp(swayX.current, -deltaYaw * 0.08, 9, delta);
    swayY.current = THREE.MathUtils.damp(swayY.current, deltaPitch * 0.08, 9, delta);

    // 3. Inspect transition blend
    inspectBlend.current = THREE.MathUtils.damp(
      inspectBlend.current,
      isZooming ? 1 : 0,
      10,
      delta
    );

    // 4. Idle breathing & subtle harmonic oscillation
    const time = state.clock.getElapsedTime();
    const bobY = Math.sin(time * 2.0) * 0.0022;
    const bobX = Math.cos(time * 1.0) * 0.0014;
    const bobRot = Math.sin(time * 1.6) * 0.005;

    // 5. Target Viewmodel Camera-Space Offsets
    // Rest Pose (held down in right hand):
    const restPos = new THREE.Vector3(0.17, -0.13, -0.32);
    const restRot = new THREE.Euler(-0.22, -0.38, 0.12, 'YXZ');

    // Inspect Pose (raised close to center for high-detail examination):
    const inspectPos = new THREE.Vector3(0.02, -0.05, -0.22);
    const inspectRot = new THREE.Euler(-0.06, -0.14, 0.02, 'YXZ');

    // Interpolate between Rest and Inspect poses
    const currentCamOffset = new THREE.Vector3().lerpVectors(restPos, inspectPos, inspectBlend.current);
    currentCamOffset.x += bobX + swayX.current;
    currentCamOffset.y += bobY + swayY.current;

    const currentPitchAngle = THREE.MathUtils.lerp(restRot.x, inspectRot.x, inspectBlend.current) + swayY.current * 1.6;
    const currentYawAngle = THREE.MathUtils.lerp(restRot.y, inspectRot.y, inspectBlend.current) + swayX.current * 2.2;
    const currentRollAngle = THREE.MathUtils.lerp(restRot.z, inspectRot.z, inspectBlend.current) + bobRot;

    const localQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(currentPitchAngle, currentYawAngle, currentRollAngle, 'YXZ')
    );

    // Transform from Camera space to World space
    const targetHandWorldPos = currentCamOffset.clone().applyQuaternion(camera.quaternion).add(camera.position);
    const targetHandWorldQuat = camera.quaternion.clone().multiply(localQuat);

    // 6. Interpolate between Shelf Slot and Hand (Flight animation)
    const slotPos = slotTransform.current.position;
    const slotQuat = slotTransform.current.quaternion;

    const finalPos = new THREE.Vector3().lerpVectors(slotPos, targetHandWorldPos, easeT);
    const finalQuat = new THREE.Quaternion().slerpQuaternions(slotQuat, targetHandWorldQuat, easeT);

    rootRef.current.position.copy(finalPos);
    rootRef.current.quaternion.copy(finalQuat);

    // Dynamic emissive boost on inspect
    if (accentMeshRef.current) {
      const mat = accentMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(0.85, 1.35, inspectBlend.current);
      }
    }
  });

  if (!visible || !activeProject) return null;

  return (
    <group ref={rootRef} scale={1.08}>
      {/* 3D Cartridge Model */}
      <primitive object={clonedObject} />

      {/* JetBrains Mono Project Title directly on Faceplate */}
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

      {/* Subtle Soft Fill Light for Viewmodel Hand (Authentic Cyber Specular Highlight) */}
      <pointLight
        position={[0.12, 0.08, 0.06]}
        color={finalAccent}
        intensity={0.4}
        distance={0.8}
        decay={2}
      />
    </group>
  );
};
