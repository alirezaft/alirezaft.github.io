import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBox, Cylinder, Box, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CrtScreen } from './CrtScreen';
import { useUI } from '../../context';
import { useAudio } from '../../audio';
import { useCrosshairInteractable } from './CrosshairInteraction';

export interface CrtWorkstationProps {
  /** Base position [x, y, z] of the workstation group on the desk */
  position?: [number, number, number];
  /** Rotation [x, y, z] in radians */
  rotation?: [number, number, number];
}

/**
 * Procedural Retro-Futuristic Cyber-Deck Workstation:
 * - Horizontal Desktop Computer Case (housing Cartridge Slot, USB Port, Eject Button, LEDs, Louvers)
 * - Swivel Riser Pedestal Neck
 * - Curved CRT Monitor Housing with Beveled Bezel, Rotary Dials, and Status LEDs
 * - Embedded <Html transform> CrtScreen displaying Boot CLI and dynamic Project Dossier
 */
export const CrtWorkstation: React.FC<CrtWorkstationProps> = ({
  position = [0, 0.76, 0.65],
  rotation = [0, 0, 0],
}) => {
  const {
    heldProject,
    heldProjectId,
    insertedProject,
    insertedProjectId,
    cartridgeDriveState,
    insertCartridge,
    ejectCartridge,
    openProject,
  } = useUI();
  const audio = useAudio();

  const driveSlotRef = useRef<THREE.Group>(null);
  const ejectBtnRef = useRef<THREE.Group>(null);
  const usbPortRef = useRef<THREE.Group>(null);

  // Dynamic LED pulse and activity simulation
  const readLedMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const busLedMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Read LED: rapid blips when media is mounted or inserting, faint periodic check when idle
    if (readLedMatRef.current) {
      if (cartridgeDriveState === 'inserted' || cartridgeDriveState === 'inserting') {
        const pulse = Math.sin(t * 18) * 0.5 + Math.sin(t * 7) * 0.5;
        readLedMatRef.current.emissiveIntensity = pulse > 0.1 ? 2.8 : 0.6;
      } else {
        const idlePulse = Math.sin(t * 2) > 0.85 ? 1.5 : 0.2;
        readLedMatRef.current.emissiveIntensity = idlePulse;
      }
    }

    // Bus LED: rhythmic data heartbeat
    if (busLedMatRef.current) {
      const busPulse = Math.sin(t * 4) > 0.5 ? 2.2 : 0.4;
      busLedMatRef.current.emissiveIntensity = busPulse;
    }
  });

  // Crosshair interaction for Drive Bay
  const { isHovered: isDriveHovered } = useCrosshairInteractable({
    id: 'workstation_drive_slot',
    ref: driveSlotRef,
    prompt:
      cartridgeDriveState === 'inserting'
        ? ''
        : cartridgeDriveState === 'inserted' && insertedProject
        ? 'LMB to view'
        : heldProject
        ? 'LMB to insert'
        : '',
    enabled: !!heldProject || (cartridgeDriveState === 'inserted' && !!insertedProject),
    onInteract: () => {
      if (cartridgeDriveState === 'idle' && heldProjectId) {
        insertCartridge();
      } else if (cartridgeDriveState === 'inserted' && insertedProjectId) {
        audio.playClick();
        openProject(insertedProjectId);
      } else {
        audio.playClick();
      }
    },
  });

  // Crosshair interaction for Eject Button
  const { isHovered: isEjectHovered } = useCrosshairInteractable({
    id: 'workstation_eject_button',
    ref: ejectBtnRef,
    prompt:
      cartridgeDriveState === 'inserted' && insertedProject
        ? 'LMB to eject'
        : '',
    enabled: cartridgeDriveState === 'inserted' && !!insertedProject,
    onInteract: () => {
      if (cartridgeDriveState === 'inserted') {
        ejectCartridge();
      } else {
        audio.playClick();
      }
    },
  });

  // Crosshair interaction for USB Port
  const { isHovered: isUsbHovered } = useCrosshairInteractable({
    id: 'workstation_usb_port',
    ref: usbPortRef,
    prompt: 'LMB to connect',
    onInteract: () => {
      audio.playClick();
      audio.playBusPulse();
    },
  });

  // ---------------------------------------------------------------------------
  // Materials Cache (Shared to maintain low draw calls)
  // ---------------------------------------------------------------------------
  const materials = useMemo(() => {
    // 1. Computer case chassis: matte dark anthracite polymer/metal
    const chassisMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141720'),
      roughness: 0.52,
      metalness: 0.25,
    });

    // 2. Bezel & faceplate: dark matte carbon/polycarbonate
    const faceplateMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0c0f16'),
      roughness: 0.65,
      metalness: 0.15,
    });

    // 3. Monitor casing: retro industrial off-white/graphite polymer
    const monitorCaseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#232833'),
      roughness: 0.55,
      metalness: 0.12,
    });

    // 4. Anodized steel pedestal and hardware
    const hardwareMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2d3342'),
      roughness: 0.35,
      metalness: 0.85,
    });

    // 5. Gold terminal contacts
    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d97706'),
      roughness: 0.25,
      metalness: 0.95,
    });

    // 6. Glowing Cyan guide rails & accents
    const cyanGuideMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00f3ff'),
      emissive: new THREE.Color('#00f3ff'),
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.1,
    });

    // 7. Amber Eject Halo
    const amberHaloMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffb700'),
      emissive: new THREE.Color('#ffb700'),
      emissiveIntensity: 2.2,
      roughness: 0.2,
      metalness: 0.1,
    });

    // 8. Screen Glass Faceplate (Dark cathode backing plate behind the HTML screen)
    const screenGlassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#03060a'),
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });

    return {
      chassisMat,
      faceplateMat,
      monitorCaseMat,
      hardwareMat,
      goldMat,
      cyanGuideMat,
      amberHaloMat,
      screenGlassMat,
    };
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {/* =================================================================== */}
      {/* 1. HORIZONTAL DESKTOP COMPUTER CHASSIS (Under the CRT)              */}
      {/* Dimensions: 0.54m (W) x 0.13m (H) x 0.44m (D)                       */}
      {/* Base resting on desk at y = 0, top surface at y = 0.13m             */}
      {/* =================================================================== */}
      <group position={[0, 0.065, 0]}>
        {/* Main Casing */}
        <RoundedBox
          args={[0.54, 0.13, 0.44]}
          radius={0.008}
          smoothness={4}
          material={materials.chassisMat}
          castShadow
          receiveShadow
        />

        {/* Front Inset Faceplate Bezel */}
        <RoundedBox
          position={[0, 0, 0.221]}
          args={[0.52, 0.114, 0.006]}
          radius={0.004}
          smoothness={4}
          material={materials.faceplateMat}
          receiveShadow
        />

        {/* Top/Side Cooling Louvers (Recessed vents) */}
        {[-0.18, -0.06, 0.06, 0.18].map((x, i) => (
          <Box
            key={`vent-${i}`}
            position={[x, 0.066, -0.05]}
            args={[0.07, 0.002, 0.2]}
            material={materials.faceplateMat}
          />
        ))}

        {/* Corner Dark Chrome Fastener Bolts */}
        {[
          [-0.25, 0.045, 0.223],
          [0.25, 0.045, 0.223],
          [-0.25, -0.045, 0.223],
          [0.25, -0.045, 0.223],
        ].map(([bx, by, bz], i) => (
          <Cylinder
            key={`bolt-${i}`}
            position={[bx, by, bz]}
            rotation={[Math.PI / 2, 0, 0]}
            args={[0.004, 0.004, 0.003, 6]}
            material={materials.hardwareMat}
          />
        ))}

        {/* Brand Silkscreen Typography */}
        <Text
          position={[0.13, 0.038, 0.225]}
          fontSize={0.006}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.08}
        >
          CYBER-DECK KERNEL v4.2 // SYS_IO
        </Text>

        {/* ================================================================= */}
        {/* FRONT PANEL: CARTRIDGE DRIVE BAY (DRIVE 0)                        */}
        {/* ================================================================= */}
        <group
          ref={driveSlotRef}
          position={[-0.12, 0, 0.222]}
        >
          {/* Drive Slot Aperture Frame (Bezel with actual opening) */}
          <Box
            position={[0, 0.0145, 0.002]}
            args={[0.12, 0.007, 0.006]}
            material={materials.chassisMat}
          />
          <Box
            position={[0, -0.0145, 0.002]}
            args={[0.12, 0.007, 0.006]}
            material={materials.chassisMat}
          />
          <Box
            position={[-0.0555, 0, 0.002]}
            args={[0.009, 0.022, 0.006]}
            material={materials.chassisMat}
          />
          <Box
            position={[0.0555, 0, 0.002]}
            args={[0.009, 0.022, 0.006]}
            material={materials.chassisMat}
          />

          {/* Internal Slot Cavity Walls (Dark recessed interior) */}
          <Box
            position={[0, 0.011, -0.04]}
            args={[0.102, 0.002, 0.08]}
            material={materials.faceplateMat}
          />
          <Box
            position={[0, -0.011, -0.04]}
            args={[0.102, 0.002, 0.08]}
            material={materials.faceplateMat}
          />
          <Box
            position={[-0.051, 0, -0.04]}
            args={[0.002, 0.022, 0.08]}
            material={materials.faceplateMat}
          />
          <Box
            position={[0.051, 0, -0.04]}
            args={[0.002, 0.022, 0.08]}
            material={materials.faceplateMat}
          />
          <Box
            position={[0, 0, -0.08]}
            args={[0.102, 0.022, 0.002]}
            material={materials.faceplateMat}
          />

          {/* Internal Glowing Cyan Guide Rails */}
          <Box
            position={[-0.049, 0, -0.03]}
            args={[0.003, 0.014, 0.06]}
            material={materials.cyanGuideMat}
          />
          <Box
            position={[0.049, 0, -0.03]}
            args={[0.003, 0.014, 0.06]}
            material={materials.cyanGuideMat}
          />

          {/* Gold Terminal Contact Pins at rear */}
          {[-0.03, -0.015, 0, 0.015, 0.03].map((px, idx) => (
            <Box
              key={`pin-${idx}`}
              position={[px, -0.006, -0.078]}
              args={[0.005, 0.002, 0.008]}
              material={materials.goldMat}
            />
          ))}
          {/* Drive Stencil Label */}
          <Text
            position={[-0.05, 0.023, 0.005]}
            fontSize={0.0048}
            color={isDriveHovered ? '#00f3ff' : '#64748b'}
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.05}
          >
            DRIVE 0 // ROM
          </Text>

          {/* Activity LED */}
          <Cylinder
            position={[0.046, 0.023, 0.005]}
            rotation={[Math.PI / 2, 0, 0]}
            args={[0.002, 0.002, 0.002, 12]}
          >
            <meshStandardMaterial
              ref={readLedMatRef}
              color="#00f3ff"
              emissive="#00f3ff"
              emissiveIntensity={1.8}
            />
          </Cylinder>
        </group>

        {/* ================================================================= */}
        {/* FRONT PANEL: MECHANICAL EJECT BUTTON                              */}
        {/* ================================================================= */}
        <group
          ref={ejectBtnRef}
          position={[-0.03, 0, 0.222]}
        >
          {/* Beveled Collar with Amber Halo */}
          <Cylinder
            rotation={[Math.PI / 2, 0, 0]}
            args={[0.014, 0.014, 0.004, 24]}
            material={materials.faceplateMat}
          />
          <Cylinder
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, 0.002]}
            args={[0.0125, 0.0125, 0.002, 24]}
            material={materials.amberHaloMat}
          />
          {/* Plunger Button */}
          <Cylinder
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, isEjectHovered ? 0.003 : 0.005]}
            args={[0.01, 0.01, 0.006, 24]}
            material={materials.hardwareMat}
          />
          <Text
            position={[0, -0.021, 0.004]}
            fontSize={0.0045}
            color={isEjectHovered ? '#ffb700' : '#64748b'}
            anchorX="center"
            anchorY="middle"
          >
            EJECT
          </Text>
        </group>

        {/* ================================================================= */}
        {/* FRONT PANEL: ENCRYPTED USB-A PORT                                 */}
        {/* ================================================================= */}
        <group
          ref={usbPortRef}
          position={[0.045, 0, 0.222]}
        >
          {/* Shielded Metal Port Cavity */}
          <RoundedBox
            args={[0.026, 0.018, 0.008]}
            radius={0.002}
            smoothness={3}
            material={materials.chassisMat}
          />
          <Box
            position={[0, 0, -0.004]}
            args={[0.017, 0.009, 0.018]}
            material={materials.hardwareMat}
          />
          {/* Interior Plastic Connector Tongue & Gold Pins */}
          <Box
            position={[0, 0.0015, -0.006]}
            args={[0.014, 0.0025, 0.01]}
            material={materials.faceplateMat}
          />
          {[-0.0045, -0.0015, 0.0015, 0.0045].map((gx, idx) => (
            <Box
              key={`usb-pin-${idx}`}
              position={[gx, 0.0002, -0.005]}
              args={[0.001, 0.0006, 0.006]}
              material={materials.goldMat}
            />
          ))}
          <Text
            position={[0, -0.021, 0.004]}
            fontSize={0.0045}
            color={isUsbHovered ? '#00f3ff' : '#64748b'}
            anchorX="center"
            anchorY="middle"
          >
            BUS A // USB
          </Text>
        </group>

        {/* ================================================================= */}
        {/* FRONT PANEL: DIAGNOSTIC LEDS & POWER TOGGLE                       */}
        {/* ================================================================= */}
        <group position={[0.20, 0, 0.222]}>
          {/* LED Cluster (PWR: Green, READ: Cyan, BUS: Amber) */}
          <group position={[-0.025, 0, 0]}>
            {/* PWR LED */}
            <group position={[0, 0.02, 0]}>
              <Cylinder rotation={[Math.PI / 2, 0, 0]} args={[0.0022, 0.0022, 0.003, 12]}>
                <meshStandardMaterial
                  color="#00ff66"
                  emissive="#00ff66"
                  emissiveIntensity={2.2}
                />
              </Cylinder>
              <Text position={[0.008, 0, 0.002]} fontSize={0.004} color="#64748b" anchorX="left" anchorY="middle">
                PWR
              </Text>
            </group>

            {/* READ LED */}
            <group position={[0, 0, 0]}>
              <Cylinder rotation={[Math.PI / 2, 0, 0]} args={[0.0022, 0.0022, 0.003, 12]}>
                <meshStandardMaterial
                  ref={readLedMatRef}
                  color="#00f3ff"
                  emissive="#00f3ff"
                  emissiveIntensity={1.8}
                />
              </Cylinder>
              <Text position={[0.008, 0, 0.002]} fontSize={0.004} color="#64748b" anchorX="left" anchorY="middle">
                READ
              </Text>
            </group>

            {/* BUS LED */}
            <group position={[0, -0.02, 0]}>
              <Cylinder rotation={[Math.PI / 2, 0, 0]} args={[0.0022, 0.0022, 0.003, 12]}>
                <meshStandardMaterial
                  ref={busLedMatRef}
                  color="#ffb700"
                  emissive="#ffb700"
                  emissiveIntensity={1.5}
                />
              </Cylinder>
              <Text position={[0.008, 0, 0.002]} fontSize={0.004} color="#64748b" anchorX="left" anchorY="middle">
                BUS
              </Text>
            </group>
          </group>

          {/* Heavy-Duty Industrial Toggle Switch */}
          <group position={[0.025, 0, 0]}>
            <Cylinder rotation={[Math.PI / 2, 0, 0]} args={[0.008, 0.008, 0.004, 16]} material={materials.faceplateMat} />
            <Cylinder rotation={[Math.PI / 4, 0, 0]} position={[0, 0.004, 0.006]} args={[0.0025, 0.003, 0.014, 12]} material={materials.hardwareMat} />
          </group>
        </group>

        {/* Front Intake Louver Grilles */}
        <group position={[-0.20, -0.032, 0.222]}>
          {[-0.012, 0, 0.012].map((gy, idx) => (
            <Box
              key={`louver-${idx}`}
              position={[0, gy, 0]}
              args={[0.05, 0.003, 0.002]}
              material={materials.faceplateMat}
            />
          ))}
        </group>
      </group>

      {/* =================================================================== */}
      {/* 2. SWIVEL RISER PEDESTAL / BASE NECK                                */}
      {/* Height: ~0.035m, connects top of chassis (0.13m) to CRT (0.165m)     */}
      {/* =================================================================== */}
      <group position={[0, 0.145, 0]}>
        <Cylinder
          args={[0.08, 0.09, 0.03, 24]}
          material={materials.hardwareMat}
          castShadow
          receiveShadow
        />
        {/* Swivel Pivot Ball */}
        <Cylinder
          position={[0, 0.02, 0]}
          args={[0.045, 0.045, 0.015, 16]}
          material={materials.chassisMat}
        />
      </group>

      {/* =================================================================== */}
      {/* 3. RETRO CURVED CRT MONITOR HOUSING                                 */}
      {/* Tilted upward by ~4.6° (-0.08 rad around X) to face seated camera   */}
      {/* =================================================================== */}
      <group position={[0, 0.35, 0]} rotation={[-0.08, 0, 0]}>
        {/* Main CRT Bell Housing (Rounded wedge tapering back) */}
        <RoundedBox
          position={[0, 0, -0.06]}
          args={[0.44, 0.36, 0.32]}
          radius={0.025}
          smoothness={4}
          material={materials.monitorCaseMat}
          castShadow
          receiveShadow
        />

        {/* Rear Taper Housing */}
        <RoundedBox
          position={[0, 0, -0.19]}
          args={[0.26, 0.22, 0.12]}
          radius={0.018}
          smoothness={4}
          material={materials.monitorCaseMat}
        />

        {/* Top Ventilation Grilles */}
        {[-0.12, -0.04, 0.04, 0.12].map((vx, idx) => (
          <Box
            key={`mon-vent-${idx}`}
            position={[vx, 0.181, -0.06]}
            args={[0.045, 0.002, 0.16]}
            material={materials.faceplateMat}
          />
        ))}

        {/* Front Screen Bezel (Frames the phosphor screen) */}
        <RoundedBox
          position={[0, 0, 0.10]}
          args={[0.42, 0.34, 0.024]}
          radius={0.02}
          smoothness={4}
          material={materials.faceplateMat}
          receiveShadow
        />

        {/* Inner Curved Phosphor Glass Faceplate (Slightly convex) */}
        <RoundedBox
          position={[0, 0.015, 0.11]}
          args={[0.35, 0.265, 0.006]}
          radius={0.014}
          smoothness={4}
          material={materials.screenGlassMat}
        />

        {/* ================================================================= */}
        {/* MONITOR FRONT HARDWARE CONTROLS (Under the screen aperture)       */}
        {/* ================================================================= */}
        <group position={[0, -0.14, 0.114]}>
          {/* Rotary Brightness Dial */}
          <group position={[-0.10, 0, 0]}>
            <Cylinder rotation={[Math.PI / 2, 0, 0]} args={[0.006, 0.006, 0.004, 16]} material={materials.hardwareMat} />
            <Box position={[0, 0.003, 0.002]} args={[0.0015, 0.005, 0.002]} material={materials.faceplateMat} />
          </group>

          {/* Rotary Contrast Dial */}
          <group position={[-0.07, 0, 0]}>
            <Cylinder rotation={[Math.PI / 2, 0, 0]} args={[0.006, 0.006, 0.004, 16]} material={materials.hardwareMat} />
            <Box position={[0, 0.003, 0.002]} args={[0.0015, 0.005, 0.002]} material={materials.faceplateMat} />
          </group>

          {/* Center Manufacturer Badge */}
          <Text
            position={[0, 0, 0.002]}
            fontSize={0.005}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.06}
          >
            PHOSPHOR-900 // HI-RES
          </Text>

          {/* Power Push Button & Green Status LED */}
          <group position={[0.10, 0, 0]}>
            <Cylinder rotation={[Math.PI / 2, 0, 0]} args={[0.007, 0.007, 0.004, 16]} material={materials.hardwareMat} />
            {/* Monitor Power LED */}
            <Cylinder position={[0.018, 0, 0]} rotation={[Math.PI / 2, 0, 0]} args={[0.002, 0.002, 0.002, 12]}>
              <meshStandardMaterial
                color="#00ff66"
                emissive="#00ff66"
                emissiveIntensity={2.5}
              />
            </Cylinder>
          </group>
        </group>

        {/* ================================================================= */}
        {/* 4. EMBEDDED REAL-TIME CRT SCREEN (<Html transform>)               */}
        {/* Aligned flush with the inner phosphor faceplate aperture          */}
        {/* ================================================================= */}
        <CrtScreen position={[0, 0.015, 0.118]} rotation={[0, 0, 0]} scale={0.0188} />
      </group>
    </group>
  );
};
