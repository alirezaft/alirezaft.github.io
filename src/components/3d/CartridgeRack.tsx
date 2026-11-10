import React from 'react';
import { Box, Text } from '@react-three/drei';
import { ALL_PROJECTS } from '../../content/projects';
import { DataCartridge } from './DataCartridge';
import { useUI } from '../../context';

export interface CartridgeRackProps {
  /**
   * Base position [x, y, z] of the rack on the desk.
   * Desk tabletop is at y = 0.76, desk center z = 0.8.
   * Default position [-0.62, 0.76, 0.86] places it prominently on the left side of the desk.
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
 * Houses the 9 portfolio data cartridges organized by row and category color.
 */
export const CartridgeRack: React.FC<CartridgeRackProps> = ({
  position = [-0.62, 0.76, 0.86],
  rotation = [0, 0.48, 0],
}) => {
  const { openProject, selectedProjectId } = useUI();

  // Tier stepped offsets (Front to back: Row 1 is closest and lowest, Row 4 is highest at rear)
  const tierConfig = [
    { row: 1, y: 0.02, z: 0.11, color: '#ff007f', title: 'COMMERCIAL GAMES' },
    { row: 2, y: 0.06, z: 0.035, color: '#00f3ff', title: 'VR // APPLICATIONS' },
    { row: 3, y: 0.10, z: -0.04, color: '#00ff66', title: 'OPEN SOURCE LABS' },
    { row: 4, y: 0.14, z: -0.115, color: '#ffb700', title: 'UNITY TOOLS & PIPELINE' },
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* =================================================================== */}
      {/* Local Downlight to ensure brilliant visibility of all cartridges   */}
      {/* =================================================================== */}
      <pointLight
        position={[0, 0.45, 0.05]}
        color="#ffffff"
        intensity={14}
        distance={1.6}
        decay={2}
      />

      {/* =================================================================== */}
      {/* 1. INDUSTRIAL RACK CHASSIS (Resting firmly on desk surface y = 0)   */}
      {/* =================================================================== */}
      {/* Main Base Plate */}
      <Box args={[0.38, 0.02, 0.36]} position={[0, 0.01, 0]}>
        <meshStandardMaterial
          color="#0c0f16"
          roughness={0.4}
          metalness={0.85}
        />
      </Box>

      {/* Heavy-Duty Chamfered Side Endplates */}
      {[-0.195, 0.195].map((xOffset, idx) => (
        <group key={`side-plate-${idx}`} position={[xOffset, 0.09, 0]}>
          <Box args={[0.014, 0.18, 0.38]}>
            <meshStandardMaterial
              color="#090c12"
              roughness={0.3}
              metalness={0.9}
            />
          </Box>
          {/* Vertical Cyan Accent Light Pipe along the side edge */}
          <mesh position={[xOffset > 0 ? 0.008 : -0.008, 0, 0.185]}>
            <boxGeometry args={[0.004, 0.16, 0.004]} />
            <meshStandardMaterial
              color="#00f3ff"
              emissive="#00f3ff"
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Rear Bracing Backplane */}
      <Box args={[0.38, 0.18, 0.012]} position={[0, 0.09, -0.185]}>
        <meshStandardMaterial
          color="#0a0d14"
          roughness={0.5}
          metalness={0.8}
        />
      </Box>

      {/* =================================================================== */}
      {/* 2. STEPPED TIERS WITH NEON CATEGORY LIGHT RUNNERS                   */}
      {/* =================================================================== */}
      {tierConfig.map((tier) => (
        <group key={`tier-step-${tier.row}`} position={[0, tier.y, tier.z]}>
          {/* Shelf Step Riser Bar */}
          <Box args={[0.36, 0.018, 0.075]}>
            <meshStandardMaterial
              color="#131722"
              roughness={0.35}
              metalness={0.85}
            />
          </Box>

          {/* Glowing Front Edge Neon Category Strip */}
          <mesh position={[0, 0.009, 0.038]}>
            <boxGeometry args={[0.35, 0.004, 0.004]} />
            <meshStandardMaterial
              color={tier.color}
              emissive={tier.color}
              emissiveIntensity={3.0}
              toneMapped={false}
            />
          </mesh>

          {/* Category Text Label on Front Face of Step */}
          <Text
            position={[-0.17, -0.004, 0.041]}
            fontSize={0.011}
            color={tier.color}
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.05}
          >
            {`ROW ${tier.row} // ${tier.title}`}
          </Text>
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

        const isSelected = selectedProjectId === project.id;

        return (
          <DataCartridge
            key={project.id}
            project={project}
            position={[xPos, tier.y + 0.01, tier.z]}
            // Tilted back 15 degrees so faceplate and holographic label look straight into seated camera
            rotation={[-0.26, 0, 0]}
            scale={1.05}
            selected={isSelected}
            onClick={() => openProject(project.id)}
          />
        );
      })}
    </group>
  );
};
