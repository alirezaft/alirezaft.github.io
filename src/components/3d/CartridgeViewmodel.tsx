import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useUI } from '../../context';
import { SHELF_CATEGORIES } from '../../content/projects/categories';
import { createCartridgeLabelTexture } from './cartridgeLabelTexture';
import { getCartridgeSlotTransform, getDriveSlotTransforms } from './cartridgeSlotHelper';

export interface CartridgeViewmodelProps {
  /** Whether right-click inspect zoom is currently active */
  isZooming?: boolean;
  renderMode?: 'hand' | 'docked' | 'all';
}

/**
 * CartridgeViewmodel:
 * Tactile first-person viewmodel and docking animation engine.
 *
 * Supported Flow:
 * 1. Rack -> Viewmodel Hand (grab animation).
 * 2. In-Hand FPS Tool (inertial mouse look sway, harmonic breathing, inspect zoom).
 * 3. Hand -> Drive Slot Mouth (approaches aperture and aligns horizontally).
 * 4. Slot Mouth -> Drive Bay Interior (slides slowly into the slot until latched).
 * 5. Seated in Drive Bay (rests in slot with acrylic light guide protruding).
 * 6. Eject Animation (slides out slowly and returns to hand).
 * 7. Hand -> Rack (return flight).
 */
export const CartridgeViewmodel: React.FC<CartridgeViewmodelProps> = ({
  isZooming = false,
  renderMode = 'all',
}) => {
  const {
    heldProjectId,
    heldProject,
    insertedProjectId,
    insertedProject,
    cartridgeDriveState,
    onReturnFinished,
    onInsertFinished,
    onEjectFinished,
  } = useUI();
  const { camera } = useThree();

  const rootRef = useRef<THREE.Group>(null);
  const accentMeshRef = useRef<THREE.Mesh | null>(null);

  // Active Project (either currently held or inserted in drive)
  const [activeProject, setActiveProject] = useState(heldProject || insertedProject);
  const [visible, setVisible] = useState(false);

  // Motion & Animation Progress Trackers
  const flightProgress = useRef(0); // 0 (shelf slot) -> 1 (held in viewmodel hand)
  const isReturning = useRef(false);
  const isFromEject = useRef(false);

  // Insertion & Eject Animators
  const insertProgress = useRef(0);
  const ejectProgress = useRef(0);
  const insertStartPos = useRef<THREE.Vector3 | null>(null);
  const insertStartQuat = useRef<THREE.Quaternion | null>(null);
  const prevDriveState = useRef(cartridgeDriveState);

  // Mouse look inertial sway
  const prevYaw = useRef(0);
  const prevPitch = useRef(0);
  const swayX = useRef(0);
  const swayY = useRef(0);
  const inspectBlend = useRef(0); // 0 (hip/rest) -> 1 (ADS / inspect close-up)

  // Track start shelf slot transforms
  const slotTransform = useRef(getCartridgeSlotTransform(''));

  // Load GLTF Model
  const gltf = useGLTF('/assets/cartridge.glb');

  // Sync active project and handle mount/unmount triggers
  useEffect(() => {
    if (heldProjectId && heldProject) {
      setActiveProject(heldProject);
      slotTransform.current = getCartridgeSlotTransform(heldProjectId);
      if (!isFromEject.current) {
        flightProgress.current = 0;
      } else {
        flightProgress.current = 1;
        isFromEject.current = false;
      }
      isReturning.current = false;
      setVisible(true);
    } else if (insertedProjectId && insertedProject) {
      setActiveProject(insertedProject);
      // Step 3: Inserted cartridge disappears after full insertion
      setVisible(false);
      isReturning.current = false;
    } else if (!heldProjectId && !insertedProjectId && activeProject) {
      // Return to shelf animation
      isReturning.current = true;
    }
  }, [heldProjectId, heldProject, insertedProjectId, insertedProject, activeProject]);

  // Track Drive State Transitions
  useEffect(() => {
    if (cartridgeDriveState === 'inserting' && prevDriveState.current !== 'inserting') {
      insertStartPos.current = null;
      insertStartQuat.current = null;
      insertProgress.current = 0;
      setVisible(true);
    }

    if (cartridgeDriveState === 'ejecting' && prevDriveState.current !== 'ejecting') {
      ejectProgress.current = 0;
      isFromEject.current = true;
      if (insertedProject) {
        setActiveProject(insertedProject);
      }
      setVisible(true);
    }

    if (cartridgeDriveState === 'inserted') {
      // Step 3: Inserted cartridge disappears after full insertion
      setVisible(false);
    }

    prevDriveState.current = cartridgeDriveState;
  }, [cartridgeDriveState, insertedProject]);

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

  // Frame Loop: Viewmodel positioning, flight lerp, insertion, eject, and inspect
    useFrame((state, delta) => {
    if (!rootRef.current || !visible || !activeProject) return;

    const isDockedState =
      cartridgeDriveState === 'inserting' ||
      cartridgeDriveState === 'inserted' ||
      cartridgeDriveState === 'ejecting';

    if (renderMode === 'hand' && isDockedState) return;
    if (renderMode === 'docked' && !isDockedState) return;

    const safeDelta = Math.min(delta, 0.05);
    const driveTransforms = getDriveSlotTransforms();

    // 1. Camera Euler angles & Angular Velocity Tracking (Viewmodel Sway)
    const camEuler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
    const deltaYaw = camEuler.y - prevYaw.current;
    const deltaPitch = camEuler.x - prevPitch.current;
    prevYaw.current = camEuler.y;
    prevPitch.current = camEuler.x;

    // Damp sway lag
    swayX.current = THREE.MathUtils.damp(swayX.current, -deltaYaw * 0.08, 9, safeDelta);
    swayY.current = THREE.MathUtils.damp(swayY.current, deltaPitch * 0.08, 9, safeDelta);

    // Inspect transition blend
    inspectBlend.current = THREE.MathUtils.damp(
      inspectBlend.current,
      isZooming ? 1 : 0,
      10,
      safeDelta
    );

    // Idle breathing & subtle harmonic oscillation
    const time = state.clock.getElapsedTime();
    const bobY = Math.sin(time * 2.0) * 0.0022;
    const bobX = Math.cos(time * 1.0) * 0.0014;
    const bobRot = Math.sin(time * 1.6) * 0.005;

    // Target Viewmodel Camera-Space Offsets
    const restPos = new THREE.Vector3(0.17, -0.13, -0.32);
    const restRot = new THREE.Euler(-0.22, -0.38, 0.12, 'YXZ');

    const inspectPos = new THREE.Vector3(0.02, -0.05, -0.22);
    const inspectRot = new THREE.Euler(-0.06, -0.14, 0.02, 'YXZ');

    const currentCamOffset = new THREE.Vector3().lerpVectors(restPos, inspectPos, inspectBlend.current);
    currentCamOffset.x += bobX + swayX.current;
    currentCamOffset.y += bobY + swayY.current;

    const currentPitchAngle =
      THREE.MathUtils.lerp(restRot.x, inspectRot.x, inspectBlend.current) + swayY.current * 1.6;
    const currentYawAngle =
      THREE.MathUtils.lerp(restRot.y, inspectRot.y, inspectBlend.current) + swayX.current * 2.2;
    const currentRollAngle =
      THREE.MathUtils.lerp(restRot.z, inspectRot.z, inspectBlend.current) + bobRot;

    const localQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(currentPitchAngle, currentYawAngle, currentRollAngle, 'YXZ')
    );

    // Transform from Camera space to World space
    const targetHandWorldPos = currentCamOffset.clone().applyQuaternion(camera.quaternion).add(camera.position);
    const targetHandWorldQuat = camera.quaternion.clone().multiply(localQuat);

    // =========================================================================
    // STATE A: INSERTING INTO DRIVE 0 (Moves to Mouth -> Slides in Slowly)
    // =========================================================================
    if (cartridgeDriveState === 'inserting') {
      const INSERT_SPEED = 1.15; // ~0.85s total insertion
      insertProgress.current = Math.min(1, insertProgress.current + safeDelta * INSERT_SPEED);

      if (!insertStartPos.current) {
        insertStartPos.current = targetHandWorldPos.clone();
        insertStartQuat.current = targetHandWorldQuat.clone();
      }

      const p = insertProgress.current;
      const startPos = insertStartPos.current ?? targetHandWorldPos;
      const startQuat = insertStartQuat.current ?? targetHandWorldQuat;

      const pos = new THREE.Vector3();
      const quat = new THREE.Quaternion();
      let curScale = 1.08;

      if (p < 0.42) {
        // Stage 4 / Step 1: Moves towards the slot's mouth in horizontal orientation (Visible)
        const t1 = p / 0.42;
        const ease1 = t1 * t1 * (3 - 2 * t1); // smooth cubic ease-in-out
        pos.lerpVectors(startPos, driveTransforms.mouthPosition, ease1);
        quat.slerpQuaternions(startQuat, driveTransforms.mouthQuaternion, ease1);
        curScale = THREE.MathUtils.lerp(1.08, 1.0, ease1);
      } else {
        // Stage 5 / Step 2: Cartridge goes in slowly into the slot aperture
        const t2 = (p - 0.42) / 0.58;
        const ease2 = 1 - Math.pow(1 - t2, 2); // gentle deceleration into contacts
        pos.lerpVectors(driveTransforms.mouthPosition, driveTransforms.slottedPosition, ease2);
        quat.copy(driveTransforms.slottedQuaternion);
        curScale = 1.0;
      }

      rootRef.current.position.copy(pos);
      rootRef.current.quaternion.copy(quat);
      rootRef.current.scale.setScalar(curScale);

      if (insertProgress.current >= 1) {
        // Step 3: After full insertion cartridge disappears and data is shown on CRT monitor
        setVisible(false);
        onInsertFinished();
      }
      return;
    }

    // =========================================================================
    // STATE B: SEATED IN DRIVE BAY (Cartridge disappears inside PC)
    // =========================================================================
    if (cartridgeDriveState === 'inserted') {
      if (visible) {
        setVisible(false);
      }
      return;
    }
    // =========================================================================
    // STATE C: EJECTING FROM DRIVE BAY (Slides out -> Hand)
    // =========================================================================
    if (cartridgeDriveState === 'ejecting') {
      const EJECT_SPEED = 1.35; // ~0.75s total eject sequence
      ejectProgress.current = Math.min(1, ejectProgress.current + safeDelta * EJECT_SPEED);

      const p = ejectProgress.current;
      const pos = new THREE.Vector3();
      const quat = new THREE.Quaternion();
      let curScale = 1.0;

      if (p < 0.40) {
        // Stage A: Slides out slowly from slot aperture -> mouth
        const t1 = p / 0.40;
        const ease1 = t1 * t1 * (3 - 2 * t1);
        pos.lerpVectors(driveTransforms.slottedPosition, driveTransforms.mouthPosition, ease1);
        quat.copy(driveTransforms.mouthQuaternion);
        curScale = 1.0;
      } else {
        // Stage B: Mouth -> Hands back to player's viewmodel hand
        const t2 = (p - 0.40) / 0.60;
        const ease2 = 1 - Math.pow(1 - t2, 3);
        pos.lerpVectors(driveTransforms.mouthPosition, targetHandWorldPos, ease2);
        quat.slerpQuaternions(driveTransforms.mouthQuaternion, targetHandWorldQuat, ease2);
        curScale = THREE.MathUtils.lerp(1.0, 1.08, ease2);
      }

      rootRef.current.position.copy(pos);
      rootRef.current.quaternion.copy(quat);
      rootRef.current.scale.setScalar(curScale);

      if (ejectProgress.current >= 1) {
        // Bug 2 Fix: Cartridge arrived in hand from slot, flag isFromEject so it stays in hand
        isFromEject.current = true;
        flightProgress.current = 1;
        onEjectFinished();
      }
      return;
    }

    // =========================================================================
    // STATE D: NORMAL SHELF <-> HAND FLIGHT
    // =========================================================================
    const FLIGHT_SPEED = 2.8;
    if (!isReturning.current) {
      flightProgress.current = Math.min(1, flightProgress.current + safeDelta * FLIGHT_SPEED);
    } else {
      flightProgress.current = Math.max(0, flightProgress.current - safeDelta * (FLIGHT_SPEED * 1.1));
      if (flightProgress.current <= 0) {
        setVisible(false);
        setActiveProject(null);
        onReturnFinished();
        return;
      }
    }

    const easeT = isReturning.current
      ? Math.pow(flightProgress.current, 2)
      : 1 - Math.pow(1 - flightProgress.current, 3);

    const slotPos = slotTransform.current.position;
    const slotQuat = slotTransform.current.quaternion;

    const finalPos = new THREE.Vector3().lerpVectors(slotPos, targetHandWorldPos, easeT);
    const finalQuat = new THREE.Quaternion().slerpQuaternions(slotQuat, targetHandWorldQuat, easeT);

    rootRef.current.position.copy(finalPos);
    rootRef.current.quaternion.copy(finalQuat);
    rootRef.current.scale.setScalar(1.08);

    // Dynamic emissive boost on inspect
    if (accentMeshRef.current) {
      const mat = accentMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(0.85, 1.35, inspectBlend.current);
      }
    }
  });

  const isDockedState =
    cartridgeDriveState === 'inserting' ||
    cartridgeDriveState === 'inserted' ||
    cartridgeDriveState === 'ejecting';

  if (!visible || !activeProject || cartridgeDriveState === 'inserted') return null;
  if (renderMode === 'hand' && isDockedState) return null;
  if (renderMode === 'docked' && !isDockedState) return null;

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

      {/* Subtle Soft Fill Light for Viewmodel Hand (Active only when held in hand) */}
      {cartridgeDriveState === 'idle' && (
        <pointLight
          position={[0.12, 0.08, 0.06]}
          color={finalAccent}
          intensity={0.4}
          distance={0.8}
          decay={2}
        />
      )}
    </group>
  );
};
