import { useCallback, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Grid, Text } from '@react-three/drei';
import { Sparkles } from 'lucide-react';
import AudioTestPage from './AudioTestPage';
import { Hud, ProjectDrawer, RecruiterGrid } from './components/ui';
import {
  DeskCameraControls,
  ReticleOverlay,
  CyberDesk,
  CyberLighting,
  CyberPostProcessing,
  CartridgeRack,
  CartridgeViewmodel,
  CrosshairProvider,
  CrosshairRaycaster,
  CrtWorkstation,
} from './components/3d';
import { useUI } from './context';
import { useAudio } from './audio';
import DevPerfMonitor from './components/dev/DevPerfMonitor';

// ---------------------------------------------------------------------------
// DEV-ONLY: show audio test page when URL hash is #audio-test
// This block is tree-shaken in production builds (import.meta.env.DEV)
// ---------------------------------------------------------------------------
const IS_AUDIO_TEST =
  import.meta.env.DEV && window.location.hash === '#audio-test';

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------

interface SharedCameraState {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  fov: number;
}

const MainCameraBroadcaster: React.FC<{
  cameraStateRef: React.MutableRefObject<SharedCameraState>;
}> = ({ cameraStateRef }) => {
  const { camera } = useThree();
  useFrame(() => {
    cameraStateRef.current.position.copy(camera.position);
    cameraStateRef.current.quaternion.copy(camera.quaternion);
    const persp = camera as THREE.PerspectiveCamera;
    if (persp.isPerspectiveCamera) {
      cameraStateRef.current.fov = persp.fov;
    }
  });
  return null;
};

const OverlayCameraReceiver: React.FC<{
  cameraStateRef: React.MutableRefObject<SharedCameraState>;
}> = ({ cameraStateRef }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.copy(cameraStateRef.current.position);
    camera.quaternion.copy(cameraStateRef.current.quaternion);
    const persp = camera as THREE.PerspectiveCamera;
    if (persp.isPerspectiveCamera && persp.fov !== cameraStateRef.current.fov) {
      persp.fov = cameraStateRef.current.fov;
      persp.updateProjectionMatrix();
    }
  });
  return null;
};

export default function App() {
  const {
    viewMode,
    heldProject,

    insertedProject,

    cartridgeDriveState,
    returnCartridge,
    ejectCartridge,
    openProject,
    isProjectDrawerOpen,
  } = useUI();
  const { startAmbient, stopAmbient } = useAudio();
  const [isLocked, setIsLocked] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sharedCameraRef = useRef<SharedCameraState>({
    position: new THREE.Vector3(0, 1.55, 2.1),
    quaternion: new THREE.Quaternion(),
    fov: 45,
  });

  // Constantly play the ambient PCB sound when the 3D scene is active
  useEffect(() => {
    if (viewMode === '3d') {
      startAmbient();
    } else {
      stopAmbient();
    }
    return () => {
      stopAmbient();
    };
  }, [viewMode, startAmbient, stopAmbient]);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }, []);

  const handleRequestLock = useCallback(() => {
    startAmbient();
    const canvas = canvasContainerRef.current?.querySelector('canvas');
    if (canvas && !isTouchDevice) {
      canvas.requestPointerLock?.();
    }
  }, [isTouchDevice, startAmbient]);

  const handleToggleZoom = useCallback(() => {
    setIsZooming((prev) => !prev);
  }, []);

  // When holding or having slotted a cartridge, clicking viewport opens dossier
  const handleEmptyClick = useCallback(() => {
    // Feature removed: clicking while holding cartridge no longer opens tech specs card
  }, []);

  // Redirect to audio test harness in dev mode
  if (IS_AUDIO_TEST) return <AudioTestPage />;

  return (
    <CrosshairProvider>
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
            onRequestLock={handleRequestLock}
            onToggleZoom={handleToggleZoom}
            isTouchDevice={isTouchDevice}
          />
        )}

        {/* First-Person Held Cartridge Weapon/Tool HUD Controls */}
        {heldProject && viewMode === '3d' && !isProjectDrawerOpen && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-3 px-4 py-2 bg-[#080d1a]/95 border border-cyber-cyan/50 shadow-[0_0_30px_rgba(0,243,255,0.25)] rounded-full backdrop-blur transition-all duration-200">
            <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: heldProject.cartridgeVisual?.accentColor || '#00f3ff' }}
              />
              <span className="font-mono text-xs font-bold text-slate-100 uppercase tracking-wider">
                HELD // {heldProject.title}
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyber-cyan/90 hidden sm:inline">
              AIM AT DRIVE 0 & CLICK TO INSERT
            </span>
            
            <button
              onClick={returnCartridge}
              className="px-3 py-1 bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-mono rounded-full hover:bg-slate-700 hover:text-white transition cursor-pointer flex items-center gap-1.5"
            >
              <span>RETURN TO SHELF</span>
              <span className="text-[10px] text-slate-400">[E / ESC]</span>
            </button>
          </div>
        )}

        {/* First-Person Slotted Cartridge HUD Controls */}
        {insertedProject && cartridgeDriveState === 'inserted' && viewMode === '3d' && !isProjectDrawerOpen && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-3 px-4 py-2 bg-[#080d1a]/95 border border-emerald-400/50 shadow-[0_0_30px_rgba(0,255,102,0.25)] rounded-full backdrop-blur transition-all duration-200">
            <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: insertedProject.cartridgeVisual?.accentColor || '#00ff66' }}
              />
              <span className="font-mono text-xs font-bold text-slate-100 uppercase tracking-wider">
                MOUNTED // {insertedProject.title}
              </span>
            </div>
            <button
              onClick={() => openProject(insertedProject.id)}
              className="px-3 py-1 bg-cyber-cyan/20 border border-cyber-cyan/60 hover:border-cyber-cyan text-cyber-cyan text-xs font-mono font-bold rounded-full hover:bg-cyber-cyan/30 hover:shadow-[0_0_12px_rgba(0,243,255,0.4)] transition cursor-pointer flex items-center gap-1.5"
            >
              <span>ACCESS DOSSIER</span>
              <span className="text-[10px] text-cyber-cyan/80">[LMB]</span>
            </button>
            <button
              onClick={ejectCartridge}
              className="px-3 py-1 bg-amber-500/20 border border-amber-500/60 hover:border-amber-400 text-amber-400 text-xs font-mono rounded-full hover:bg-amber-500/30 transition cursor-pointer flex items-center gap-1.5"
            >
              <span>EJECT DRIVE 0</span>
              <span className="text-[10px] text-amber-300">[E / ESC]</span>
            </button>
          </div>
        )}

        {/* 3D Scene Viewport — hidden (not unmounted) when in recruiter mode to halt the render loop */}
        <div
          ref={canvasContainerRef}
          onClick={handleRequestLock}
          className={`relative z-0 isolate w-full h-full cursor-crosshair ${
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

            {/* FPS Center-Screen Crosshair Raycaster & Targeting */}
            <CrosshairRaycaster onEmptyClick={handleEmptyClick} />

            {/* Broadcast main camera transform to overlay canvas */}
            <MainCameraBroadcaster cameraStateRef={sharedCameraRef} />

            {/* 3-Point Cyber Lighting Rig & Ground Contact Shadows */}
            <CyberLighting />

          {/* Seated Cyberpunk Workstation Desk */}
          <CyberDesk />

          {/* Retro-Futuristic CRT Workstation (Horizontal Chassis + CRT Monitor + Screen) */}
          <CrtWorkstation position={[0, 0.76, 0.65]} rotation={[0, 0, 0]} />

          {/* 4-Tier Interactive Project Cartridges Rack (Resting on Desk Tabletop) */}
          <CartridgeRack position={[-0.62, 0.76, 0.86]} rotation={[0, 0.48, 0]} />

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
            position={[0, 0.2, -1.0]}
            fontSize={0.2}
            color="#00f3ff"
            anchorX="center"
            anchorY="middle"
          >
            CYBER-DECK CONTROLLER: ACTIVE
          </Text>

          {/* Post-Processing: Bloom and Vignette */}
          <CyberPostProcessing />

          {/* Dev-only Performance Monitor (Triangles, Vertices, Draw Calls, FPS) */}
          {/* TO REMOVE: Simply delete this block and the import at the top */}
          {import.meta.env.DEV && (
            <DevPerfMonitor hidden={viewMode === 'recruiter'} />
          )}
        </Canvas>
        {/* First-Person Viewmodel Overlay Canvas (Guarantees held cartridge renders in front of CRT screen) */}
        {viewMode === '3d' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 110 }}
          >
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 1.55, 2.1], fov: 45 }}
              frameloop="always"
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
              }}
            >
              <OverlayCameraReceiver cameraStateRef={sharedCameraRef} />
              <ambientLight intensity={1.4} />
              <directionalLight position={[2, 3, 2]} intensity={0.9} />
              <directionalLight position={[-2, 2, -1]} intensity={0.6} />
              <CartridgeViewmodel isZooming={isZooming} />
            </Canvas>
          </div>
        )}

      </div>

      {/* Bottom Status Banner */}
      <footer className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-between text-xs text-slate-500 pointer-events-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>Seated 1st-Person WebGL2 Cyber-Deck Engine</span>
        </div>
        <div className="font-mono text-[11px] text-slate-400">
          <span>Look: Mouse · Grab / Read: Left-Click · Inspect Zoom: Hold Right-Click · Return: E / Esc</span>
        </div>
      </footer>
    </div>
  </CrosshairProvider>
);
}
