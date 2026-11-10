import React from 'react';
import { Box } from '@react-three/drei';
import { ALL_PROJECTS } from '../../content/projects';
import { DataCartridge } from './DataCartridge';
import { useUI } from '../../context';

export interface CartridgeRackProps {
  /**
   * Base position [x, y, z] of the rack on the desk.
   * Default position [-0.62, 0.76, 0.86] places it on the desk tabletop.
   */
  position?: [number, number, number];
  /**
   * Rotation [x, y, z] in radians.
   * Default [0, 0.48, 0] angles it inward toward the seated player's line of sight.
   */
  rotation?: [number, number, number];
}

/**
 * CartridgeRack:
 * High-visibility 4-Tier tactical workstation cartridge shelf sitting directly
 * on the cyber desk tabletop.
 * Features subtle, eye-comfortable ambient lighting and clear top-mounted category headers.
 */
export const CartridgeRack: React.FC<CartridgeRackProps> = ({
  position = [-0.62, 0.76, 0.86],
  rotation = [0, 0.48, 0],
}) => {
  const { grabCartridge, heldProjectId, returningProjectId, insertedProjectId } = useUI();

  // Tier stepped offsets (Front to back: Row 1 is closest and lowest, Row 4 is highest at rear)
  const tierConfig = [
    { row: 1, y: 0.02, z: 0.11, color: '#ff007f', title: 'COMMERCIAL GAMES' },
    { row: 2, y: 0.06, z: 0.035, color: '#00f3ff', title: 'VR // APPLICATIONS' },
    { row: 3, y: 0.10, z: -0.04, color: '#00ff66', title: 'OPEN SOURCE' },
    { row: 4, y: 0.14, z: -0.115, color: '#ffb700', title: 'DEV TOOLS' },
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* =================================================================== */}
      {/* Gentle, Subtle Desk Accent Fill (Soft low-power lighting, no glare) */}
      {/* =================================================================== */}
      <pointLight
        position={[0, 0.38, 0.05]}
        color="#e2e8f0"
        intensity={1.0}
        distance={1.4}
        decay={2}
      />

      {/* =================================================================== */}
      {/* 1. INDUSTRIAL RACK CHASSIS (Resting on desk surface y = 0)          */}
      {/* =================================================================== */}
      {/* Main Base Plate */}
      <Box args={[0.38, 0.02, 0.36]} position={[0, 0.01, 0]}>
        <meshStandardMaterial
          color="#0d1017"
          roughness={0.5}
          metalness={0.8}
        />
      </Box>

      {/* Heavy-Duty Chamfered Side Endplates */}
      {[-0.195, 0.195].map((xOffset, idx) => (
        <group key={`side-plate-${idx}`} position={[xOffset, 0.095, 0]}>
          <Box args={[0.014, 0.19, 0.38]}>
            <meshStandardMaterial
              color="#0a0c12"
              roughness={0.4}
              metalness={0.85}
            />
          </Box>
        </group>
      ))}

      {/* Rear Bracing Backplane */}
      <Box args={[0.38, 0.19, 0.012]} position={[0, 0.095, -0.185]}>
        <meshStandardMaterial
          color="#0b0e16"
          roughness={0.5}
          metalness={0.75}
        />
      </Box>

      {/* Top Header Marquee Bar */}
      <group position={[0, 0.198, -0.185]}>
        <Box args={[0.38, 0.022, 0.014]}>
          <meshStandardMaterial
            color="#141824"
            roughness={0.35}
            metalness={0.85}
          />
        </Box>
        {/* Subtle Top Header Glow Runner */}
        <mesh position={[0, 0.012, 0.005]}>
          <boxGeometry args={[0.36, 0.002, 0.004]} />
          <meshStandardMaterial
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 2. STEPPED TIERS WITH SUBTLE RUNNERS & ELEVATED CATEGORY LABELS     */}
      {/* =================================================================== */}
      {tierConfig.map((tier) => (
        <group key={`tier-step-${tier.row}`} position={[0, tier.y, tier.z]}>
          {/* Shelf Step Riser Bar */}
          <Box args={[0.36, 0.018, 0.075]}>
            <meshStandardMaterial
              color="#131722"
              roughness={0.45}
              metalness={0.75}
            />
          </Box>

          {/* Gentle, Restrained Category Glow Runner */}
          <mesh position={[0, 0.009, 0.038]}>
            <boxGeometry args={[0.35, 0.003, 0.003]} />
            <meshStandardMaterial
              color={tier.color}
              emissive={tier.color}
              emissiveIntensity={0.55} // Soft and subtle
            />
          </mesh>
        </group>
      ))}

      {/* =================================================================== */}
      {/* 3. PHYSICAL DATA CARTRIDGES POPULATED ACROSS THE TIERS              */}
      {/* =================================================================== */}
      {ALL_PROJECTS.map((project) => {
        const tier = tierConfig.find((t) => t.row === project.shelfRow) || tierConfig[0];
        const rowProjects = ALL_PROJECTS.filter((p) => p.shelfRow === project.shelfRow);
        const indexInRow = rowProjects.indexOf(project);
        const totalInRow = rowProjects.length;

        // Spread cartridges evenly across the tier width (~0.30m)
        let xPos = 0;
        if (totalInRow === 1) {
          xPos = 0;
        } else if (totalInRow === 2) {
          xPos = indexInRow === 0 ? -0.075 : 0.075;
        } else {
          // 3 projects: -0.11, 0, +0.11
          xPos = -0.11 + indexInRow * 0.11;
        }

        const isExtracted =
          heldProjectId === project.id ||
          returningProjectId === project.id ||
          insertedProjectId === project.id;

        // When extracted & held or slotted in drive, nothing is left behind on the shelf
        if (isExtracted) {
          return null;
        }

        return (
          <DataCartridge
            key={project.id}
            project={project}
            position={[xPos, tier.y + 0.01, tier.z]}
            // Tilted back 15 degrees so the top spine and faceplate are legible
            rotation={[-0.26, 0, 0]}
            scale={1.05}
            onClick={() => grabCartridge(project.id)}
          />
        );
      })}
    </group>
  );
};
