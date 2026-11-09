import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export interface CyberPostProcessingProps {
  /** Optional multisampling sample count (defaults to 0 for performance) */
  multisampling?: number;
  /** Bloom intensity multiplier */
  bloomIntensity?: number;
  /** Vignette darkness factor */
  vignetteDarkness?: number;
}

/**
 * Cyberpunk post-processing pipeline featuring selective neon bloom
 * and cinematic vignette.
 */
export const CyberPostProcessing: React.FC<CyberPostProcessingProps> = ({
  multisampling = 0,
  bloomIntensity = 1.2,
  vignetteDarkness = 0.8,
}) => {
  return (
    <EffectComposer multisampling={multisampling}>
      <Bloom
        mipmapBlur
        intensity={bloomIntensity}
        luminanceThreshold={0.82}
        luminanceSmoothing={0.2}
      />
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={vignetteDarkness}
      />
    </EffectComposer>
  );
};
