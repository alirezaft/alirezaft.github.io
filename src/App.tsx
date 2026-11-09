import { useCallback, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';
import AudioTestPage from './AudioTestPage';
import { Hud, ProjectDrawer, RecruiterGrid } from './components/ui';
import { DeskCameraControls, ReticleOverlay } from './components/3d';
import { useUI } from './context';

// ---------------------------------------------------------------------------
// DEV-ONLY: show audio test page when URL hash is #audio-test
// This block is tree-shaken in production builds (import.meta.env.DEV)
// ---------------------------------------------------------------------------
const IS_AUDIO_TEST =
  import.meta.env.DEV && window.location.hash === '#audio-test';

// ---------------------------------------------------------------------------
// 3D scene helpers (Placeholder test element before full desk load)
// ---------------------------------------------------------------------------

function RotatingCyberCube({ onHover }: { onHover: (hovered: boolean) => void }) {
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
      position={[0, 1.2, 0]}
      onPointerOver={() => {
        setHover(true);
        onHover(true);
      }}
      onPointerOut={() => {
        setHover(false);
        onHover(false);
      }}
      scale={hovered ? 0.75 : 0.65}
    >
      <boxGeometry args={[1, 1, 1]} />
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
  const [isLocked, setIsLocked] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [hoverPrompt, setHoverPrompt] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }, []);

  const handleRequestLock = useCallback(() => {
    const canvas = canvasContainerRef.current?.querySelector('canvas');
    if (canvas && !isTouchDevice) {
      canvas.requestPointerLock?.();
    }
  }, [isTouchDevice]);

  const handleToggleZoom = useCallback(() => {
    setIsZooming((prev) => !prev);
  }, []);

  // Redirect to audio test harness in dev mode
  if (IS_AUDIO_TEST) return <AudioTestPage />;

  return (
    <div className="relative w-full h-screen bg-[#050811] overflow-hidden select-none">
      {/* Sleek Top Cyber HUD (Mode Switcher & Media Audio Controller) */}
      <Hud />

      {/* Recruiter Quick-View Grid Mode */}
      {viewMode === 'recruiter' && <RecruiterGrid />}

      {/* Slide-out Technical Case Study Drawer (shared across 3D & 2D) */}
      <ProjectDrawer />

      {/* 3D Reticle & Overlay (Visible in 3D ViewMode) */}
      {viewMode === '3d' && (
        <ReticleOverlay
          isLocked={isLocked}
          isZooming={isZooming}
          hoverText={hoverPrompt}
          onRequestLock={handleRequestLock}
          onToggleZoom={handleToggleZoom}
          isTouchDevice={isTouchDevice}
        />
      )}

      {/* 3D Scene Viewport — hidden (not unmounted) when in recruiter mode to halt the render loop */}
      <div
        ref={canvasContainerRef}
        onClick={handleRequestLock}
        className={`w-full h-full cursor-crosshair ${
          viewMode === 'recruiter' ? 'invisible' : ''
        }`}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 1.55, 2.1], fov: 45 }}
          frameloop={viewMode === 'recruiter' ? 'never' : 'always'}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
        >
          <color attach="background" args={['#050811']} />

          {/* First-Person Seated Camera Controller */}
          <DeskCameraControls
            basePosition={[0, 1.55, 2.1]}
            normalFov={45}
            zoomFov={22}
            zoomNudgeDistance={0.35}
            onLockChange={setIsLocked}
            onZoomChange={setIsZooming}
          />

          {/* Ambient & Directional Cyber Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 4, 3]} color="#00f3ff" intensity={30} />
          <pointLight position={[-3, 3, -2]} color="#ff007f" intensity={25} />
          <pointLight position={[0, 1, 1]} color="#ffb700" intensity={15} />

          {/* Interactive Test Element */}
          <RotatingCyberCube
            onHover={(h) =>
              setHoverPrompt(h ? 'CYBER DATA CORE // RETICLE ACTIVE' : null)
            }
          />

          {/* Cyberpunk Ground Grid */}
          <Grid
            position={[0, 0, 0]}
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
            position={[0, 0.2, 0]}
            fontSize={0.2}
            color="#00f3ff"
            anchorX="center"
            anchorY="middle"
          >
            CYBER-DECK CONTROLLER: ACTIVE
          </Text>
        </Canvas>
      </div>

      {/* Bottom Status Banner */}
      <footer className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-between text-xs text-slate-500 pointer-events-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>Seated 1st-Person WebGL2 Cyber-Deck Engine</span>
        </div>
        <div className="font-mono text-[11px] text-slate-400">
          <span>Look: Mouse · Zoom: Hold Right-Click · Pick Up: Left-Click</span>
        </div>
      </footer>
    </div>
  );
}
