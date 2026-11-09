import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { RoundedBox, Cylinder, Box } from '@react-three/drei';
import {
  createCarbonFiberTextures,
  createHazardStripeTexture,
  createCyberInlayTexture,
} from './cyberTextures';

export interface CyberDeskProps {
  /** Base position [x, y, z] of the desk group (defaults to [0, 0, 0.8]) */
  position?: [number, number, number];
  /** Rotation [x, y, z] in radians */
  rotation?: [number, number, number];
  /** Uniform or axis scale */
  scale?: number | [number, number, number];
}

/**
 * Seated first-person cyberpunk workstation desk.
 * Dimensions: width ~2.4m, depth ~1.1m, height ~0.76m.
 * Grounded at y = 0, tabletop surface at y = 0.76m.
 */
export const CyberDesk: React.FC<CyberDeskProps> = ({
  position = [0, 0, 0.8],
  rotation = [0, 0, 0],
  scale = 1,
}) => {
  // ---------------------------------------------------------------------------
  // Procedural Textures (Carbon-Fiber Weave, Industrial Hazard & Cyber Inlays)
  // ---------------------------------------------------------------------------
  const carbonFiber = useMemo(() => createCarbonFiberTextures(48, 22), []);
  const hazardTexture = useMemo(() => createHazardStripeTexture(24), []);
  const inlayTexture = useMemo(() => createCyberInlayTexture(), []);

  // Cleanup WebGL textures on component unmount
  useEffect(() => {
    return () => {
      carbonFiber.diffuseMap.dispose();
      carbonFiber.normalMap.dispose();
      carbonFiber.roughnessMap.dispose();
      hazardTexture.dispose();
      inlayTexture.dispose();
    };
  }, [carbonFiber, hazardTexture, inlayTexture]);
  // ---------------------------------------------------------------------------
  // Procedural Cable Curves (Rear edge draped harness)
  // ---------------------------------------------------------------------------

  // Cyber Cyan Data Conduit
  const cyanCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.05, 0.71, -0.52),
      new THREE.Vector3(-0.65, 0.63, -0.56),
      new THREE.Vector3(-0.15, 0.60, -0.57),
      new THREE.Vector3(0.35, 0.62, -0.56),
      new THREE.Vector3(0.75, 0.66, -0.54),
      new THREE.Vector3(1.08, 0.71, -0.52),
    ]);
  }, []);

  // Neon Magenta High-Voltage Bus
  const magentaCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.98, 0.70, -0.54),
      new THREE.Vector3(-0.55, 0.58, -0.58),
      new THREE.Vector3(-0.05, 0.55, -0.59),
      new THREE.Vector3(0.48, 0.59, -0.57),
      new THREE.Vector3(0.92, 0.67, -0.54),
    ]);
  }, []);

  // Yellow-Black Hazard Power Cable (Drapes down to underframe / ground)
  const hazardCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.85, 0.69, -0.53),
      new THREE.Vector3(-0.35, 0.52, -0.57),
      new THREE.Vector3(0.12, 0.46, -0.58),
      new THREE.Vector3(0.55, 0.40, -0.56),
      new THREE.Vector3(0.88, 0.26, -0.52),
      new THREE.Vector3(0.98, 0.05, -0.46),
    ]);
  }, []);

  // Hazard cable segment ties along its path
  const hazardTiePositions: [number, number, number][] = useMemo(() => [
    [-0.55, 0.59, -0.55],
    [-0.05, 0.49, -0.58],
    [0.35, 0.43, -0.57],
    [0.72, 0.33, -0.54],
  ], []);

  // Common materials definitions for reusability & draw-call hygiene
  const legPositions: [number, number, number][] = [
    [-1.04, 0.36, 0.42],  // front left
    [1.04, 0.36, 0.42],   // front right
    [-1.04, 0.36, -0.42], // rear left
    [1.04, 0.36, -0.42],  // rear right
  ];

  const footPositions: [number, number, number][] = [
    [-1.04, 0.015, 0.42],
    [1.04, 0.015, 0.42],
    [-1.04, 0.015, -0.42],
    [1.04, 0.015, -0.42],
  ];

  // Precision corner hardware bolts for cyber inlay utility plates
  const boltPositions: [number, number, number][] = useMemo(() => [
    // Left plate bolts
    [-1.06, 0.7625, -0.38],
    [-0.78, 0.7625, -0.38],
    [-1.06, 0.7625, 0.38],
    [-0.78, 0.7625, 0.38],
    // Right plate bolts
    [0.78, 0.7625, -0.38],
    [1.06, 0.7625, -0.38],
    [0.78, 0.7625, 0.38],
    [1.06, 0.7625, 0.38],
  ], []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* ===================================================================== */}
      {/* 1. TABLETOP (Procedural Carbon-Fiber Weave with Anisotropic Specular)  */}
      {/* Dimensions: 2.4m width x 0.04m thickness x 1.1m depth                 */}
      {/* Center y = 0.74 => top surface at y = 0.76                            */}
      {/* ===================================================================== */}
      <RoundedBox
        args={[2.4, 0.04, 1.1]}
        radius={0.015}
        smoothness={4}
        position={[0, 0.74, 0]}
      >
        <meshStandardMaterial
          color="#151822"
          map={carbonFiber.diffuseMap}
          normalMap={carbonFiber.normalMap}
          normalScale={new THREE.Vector2(0.65, 0.65)}
          roughnessMap={carbonFiber.roughnessMap}
          roughness={0.65}
          metalness={0.35}
        />
      </RoundedBox>

      {/* Surface Inset Detail: Left & Right Brushed Cyber Inlay Utility Plates */}
      <RoundedBox
        args={[0.35, 0.002, 0.85]}
        radius={0.006}
        smoothness={2}
        position={[-0.92, 0.761, 0]}
      >
        <meshStandardMaterial
          map={inlayTexture}
          roughness={0.45}
          metalness={0.75}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.35, 0.002, 0.85]}
        radius={0.006}
        smoothness={2}
        position={[0.92, 0.761, 0]}
      >
        <meshStandardMaterial
          map={inlayTexture}
          roughness={0.45}
          metalness={0.75}
        />
      </RoundedBox>

      {/* Corner Hex Hardware Bolts on Inlay Utility Plates */}
      {boltPositions.map((pos, idx) => (
        <Cylinder
          key={`inlay-bolt-${idx}`}
          args={[0.006, 0.006, 0.003, 6]}
          position={pos}
        >
          <meshStandardMaterial
            color="#384152"
            roughness={0.25}
            metalness={0.9}
          />
        </Cylinder>
      ))}

      {/* Rear Cable Grommet Pass-Throughs with Cyber Core Accent */}
      {[-0.85, 0.85].map((x) => (
        <group key={`grommet-${x}`} position={[x, 0.7615, -0.42]}>
          <Cylinder args={[0.038, 0.038, 0.004, 24]}>
            <meshStandardMaterial
              color="#0c0e14"
              roughness={0.35}
              metalness={0.85}
            />
          </Cylinder>
          <Cylinder args={[0.024, 0.024, 0.005, 24]}>
            <meshStandardMaterial
              color="#00f3ff"
              emissive="#00f3ff"
              emissiveIntensity={1.4}
              roughness={0.2}
              toneMapped={false}
            />
          </Cylinder>
          <Cylinder args={[0.019, 0.019, 0.006, 24]}>
            <meshBasicMaterial color="#050811" />
          </Cylinder>
        </group>
      ))}

      {/* ===================================================================== */}
      {/* 2. FRONT EDGE GUARD & RECESSED NEON CYAN LIGHT STRIP                 */}
      {/* Front edge is at z = +0.55 (facing seated user)                       */}
      {/* ===================================================================== */}
      {/* Chamfered front edge guard */}
      <RoundedBox
        args={[2.36, 0.038, 0.04]}
        radius={0.008}
        smoothness={4}
        position={[0, 0.74, 0.555]}
      >
        <meshStandardMaterial
          color="#0d1117"
          roughness={0.7}
          metalness={0.4}
        />
      </RoundedBox>

      {/* Left/Right Edge Guard End-Caps */}
      <RoundedBox
        args={[0.02, 0.042, 0.046]}
        radius={0.004}
        smoothness={2}
        position={[-1.185, 0.74, 0.555]}
      >
        <meshStandardMaterial
          color="#080a0f"
          roughness={0.5}
          metalness={0.8}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.02, 0.042, 0.046]}
        radius={0.004}
        smoothness={2}
        position={[1.185, 0.74, 0.555]}
      >
        <meshStandardMaterial
          color="#080a0f"
          roughness={0.5}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Recessed Neon Cyan Light Strip (#00f3ff, emissive: #00f3ff, emissiveIntensity: 2.2) */}
      <mesh position={[0, 0.738, 0.576]}>
        <boxGeometry args={[2.26, 0.008, 0.008]} />
        <meshStandardMaterial
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={2.2}
          roughness={0.2}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* ===================================================================== */}
      {/* 3. UNDERFRAME STRUCTURE: Matte black tubular steel legs & struts      */}
      {/* ===================================================================== */}
      {/* 4 Sturdy Tubular Steel Legs */}
      {legPositions.map((pos, idx) => (
        <Cylinder
          key={`leg-${idx}`}
          args={[0.035, 0.035, 0.72, 24]}
          position={pos}
        >
          <meshStandardMaterial
            color="#12151c"
            roughness={0.6}
            metalness={0.8}
          />
        </Cylinder>
      ))}

      {/* 4 Heavy Leveling Feet Grounding the Desk */}
      {footPositions.map((pos, idx) => (
        <Cylinder
          key={`foot-${idx}`}
          args={[0.048, 0.052, 0.03, 24]}
          position={pos}
        >
          <meshStandardMaterial
            color="#090b10"
            roughness={0.5}
            metalness={0.9}
          />
        </Cylinder>
      ))}

      {/* Left Side Tubular Cross-Support (connecting front & rear legs) */}
      <Cylinder
        args={[0.022, 0.022, 0.84, 16]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[-1.04, 0.18, 0]}
      >
        <meshStandardMaterial
          color="#12151c"
          roughness={0.6}
          metalness={0.8}
        />
      </Cylinder>

      {/* Right Side Tubular Cross-Support */}
      <Cylinder
        args={[0.022, 0.022, 0.84, 16]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[1.04, 0.18, 0]}
      >
        <meshStandardMaterial
          color="#12151c"
          roughness={0.6}
          metalness={0.8}
        />
      </Cylinder>

      {/* Rear Heavy Industrial Cross-Support Strut */}
      <Cylinder
        args={[0.026, 0.026, 2.08, 16]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, 0.22, -0.42]}
      >
        <meshStandardMaterial
          color="#12151c"
          roughness={0.6}
          metalness={0.8}
        />
      </Cylinder>

      {/* Under-Desk Longitudinal Support Beams */}
      <Box args={[2.08, 0.035, 0.035]} position={[0, 0.702, 0.32]}>
        <meshStandardMaterial
          color="#12151c"
          roughness={0.6}
          metalness={0.8}
        />
      </Box>
      <Box args={[2.08, 0.035, 0.035]} position={[0, 0.702, -0.32]}>
        <meshStandardMaterial
          color="#12151c"
          roughness={0.6}
          metalness={0.8}
        />
      </Box>

      {/* Under-Desk Recessed Cyber-Cyan LED Runner Strip (Casts atmospheric underglow) */}
      <mesh position={[0, 0.696, 0.33]}>
        <boxGeometry args={[1.9, 0.006, 0.01]} />
        <meshStandardMaterial
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={2.0}
          roughness={0.2}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Rear Cable Management Tray Running Under the Deck */}
      <Box args={[1.5, 0.028, 0.12]} position={[0, 0.67, -0.38]}>
        <meshStandardMaterial
          color="#0f1118"
          roughness={0.7}
          metalness={0.6}
        />
      </Box>

      {/* ===================================================================== */}
      {/* 4. PROCEDURAL REAR CABLE BUNDLES (TubeGeometry / CatmullRomCurve3)    */}
      {/* ===================================================================== */}
      {/* Cyber Cyan Data Conduit */}
      <mesh>
        <tubeGeometry args={[cyanCurve, 48, 0.007, 8, false]} />
        <meshStandardMaterial
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={1.8}
          roughness={0.25}
          metalness={0.15}
          toneMapped={false}
        />
      </mesh>

      {/* Neon Magenta High-Voltage Feeder */}
      <mesh>
        <tubeGeometry args={[magentaCurve, 48, 0.006, 8, false]} />
        <meshStandardMaterial
          color="#ff007f"
          emissive="#ff007f"
          emissiveIntensity={1.5}
          roughness={0.25}
          metalness={0.15}
          toneMapped={false}
        />
      </mesh>

      {/* Yellow-Black Hazard Power Cable with Procedural Diagonal Warning Stripes */}
      <mesh>
        <tubeGeometry args={[hazardCurve, 56, 0.011, 8, false]} />
        <meshStandardMaterial
          map={hazardTexture}
          emissive="#d97706"
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Black Hazard Wire Bands / Cable Clamps */}
      {hazardTiePositions.map((pos, idx) => (
        <mesh key={`hazard-tie-${idx}`} position={pos}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial
            color="#08090d"
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Cable Mounting Brackets along the Rear Edge */}
      {[-0.65, 0, 0.65].map((xOffset) => (
        <Box
          key={`cable-bracket-${xOffset}`}
          args={[0.028, 0.045, 0.04]}
          position={[xOffset, 0.71, -0.54]}
        >
          <meshStandardMaterial
            color="#08090d"
            roughness={0.4}
            metalness={0.85}
          />
        </Box>
      ))}
    </group>
  );
};
