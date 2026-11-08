import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';
import AudioTestPage from './AudioTestPage';
import { Hud, ProjectDrawer, RecruiterGrid } from './components/ui';
import { useUI } from './context';

// ---------------------------------------------------------------------------
// DEV-ONLY: show audio test page when URL hash is #audio-test
// This block is tree-shaken in production builds (import.meta.env.DEV)
// ---------------------------------------------------------------------------
const IS_AUDIO_TEST =
  import.meta.env.DEV && window.location.hash === '#audio-test';

// ---------------------------------------------------------------------------
// 3D scene helpers (Phase 0 smoke-test)
// ---------------------------------------------------------------------------

function RotatingCyberCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.15 : 1}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color={hovered ? '#00f3ff' : '#ff007f'}
        emissive={hovered ? '#00f3ff' : '#ff007f'}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------

export default function App() {
  const { viewMode } = useUI();

  // Redirect to audio test harness in dev mode
  if (IS_AUDIO_TEST) return <AudioTestPage />;

  return (
    <div className="relative w-full h-screen bg-[#050811] overflow-hidden">
      {/* Sleek Top Cyber HUD (Mode Switcher & Media Audio Controller) */}
      <Hud />

      {/* Recruiter Quick-View Grid Mode */}
      {viewMode === 'recruiter' && <RecruiterGrid />}

      {/* Slide-out Technical Case Study Drawer (shared across 3D & 2D) */}
      <ProjectDrawer />

      {/* 3D Scene Viewport — hidden (not unmounted) when in recruiter mode to halt the render loop */}
      <div className={`w-full h-full ${viewMode === 'recruiter' ? 'invisible' : ''}`}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [3, 3, 5], fov: 45 }}
          frameloop={viewMode === 'recruiter' ? 'never' : 'always'}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#050811']} />

          {/* Ambient & Directional Cyber Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} color="#00f3ff" intensity={30} />
          <pointLight position={[-5, 3, -5]} color="#ff007f" intensity={25} />
          <pointLight position={[0, -3, 2]} color="#ffb700" intensity={15} />

          {/* Interactive Test Element */}
          <RotatingCyberCube />

          {/* Cyberpunk Ground Grid */}
          <Grid
            position={[0, -1.5, 0]}
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.6}
            cellColor="#1e293b"
            sectionSize={2.5}
            sectionThickness={1.2}
            sectionColor="#00f3ff"
            fadeDistance={25}
            fadeStrength={1.5}
          />

          <Text
            position={[0, -1.2, 2]}
            fontSize={0.25}
            color="#00f3ff"
            anchorX="center"
            anchorY="middle"
          >
            SYSTEM READY: PHASE 0 VERIFIED
          </Text>

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>
      </div>

      {/* Bottom Status Banner */}
      <footer className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-between text-xs text-slate-500 pointer-events-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>Interactive 3D Engine initialized with WebGL2</span>
        </div>
        <div>
          <span>Drag to orbit · Scroll to zoom</span>
        </div>
      </footer>
    </div>
  );
}
