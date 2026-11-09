import React from 'react';
import { ContactShadows } from '@react-three/drei';

export interface CyberLightingProps {
  /** Ground position offset for contact shadow plane (defaults to desk center [0, 0.001, 0.8]) */
  shadowPosition?: [number, number, number];
}

/**
 * 3-point cyberpunk workstation lighting rig + ambient fill + contact shadows.
 * Zero shadow maps on point lights for high-performance rendering.
 */
export const CyberLighting: React.FC<CyberLightingProps> = ({
  shadowPosition = [0, 0.001, 0.8],
}) => {
  return (
    <>
      {/* Ambient Fill: Deep space obsidian blue */}
      <ambientLight intensity={0.2} color="#060c18" />

      {/* Cyan Key Light: High-angle front-right main workstation illumination */}
      <pointLight position={[2.4, 3.0, 1.8]} color="#00f3ff" intensity={26} decay={2} />

      {/* Magenta Rim Light: Rear-left rim/kicker highlights edge silhouette & cabling */}
      <pointLight position={[-2.8, 2.5, -1.2]} color="#ff007f" intensity={20} decay={2} />

      {/* Amber Accent Light: Mid-low accent illuminating workstation tabletop gear */}
      <pointLight position={[0.8, 1.4, 0.6]} color="#ffb700" intensity={15} decay={2} />

      {/* Under-Desk Ground Effect: Soft cyan wash illuminating underframe and floor grid */}
      <pointLight position={[0, 0.35, 0.6]} color="#00f3ff" intensity={6} distance={2.5} decay={2} />

      {/* Contact Shadows beneath desk with crisp foot grounding */}
      <ContactShadows
        position={shadowPosition}
        opacity={0.72}
        scale={10}
        blur={2.2}
        far={3.8}
        resolution={512}
        color="#000000"
      />
    </>
  );
};
