import React, { useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Activity, ChevronDown, ChevronUp, Cpu, EyeOff, Layers, RefreshCw, X } from 'lucide-react';

// ============================================================================
// PERFORMANCE DATA INTERFACE
// ============================================================================
interface PerfMetrics {
  // Timing
  fps: number;
  frameTimeMs: number;
  minFps: number;
  maxFps: number;
  
  // Render primitives
  drawCalls: number;
  renderedTris: number;
  renderedVerts: number;
  renderedPoints: number;
  renderedLines: number;

  // Scene totals
  sceneTris: number;
  sceneVerts: number;
  meshCount: number;

  // VRAM & Shaders
  texturesCount: number;
  geometriesCount: number;
  programsCount: number;
  jsHeapMb: number | null;

  // Display & Viewport
  resolution: string;
  dpr: number;
  gpuName: string;
}

const DEFAULT_METRICS: PerfMetrics = {
  fps: 0,
  frameTimeMs: 0,
  minFps: 999,
  maxFps: 0,
  drawCalls: 0,
  renderedTris: 0,
  renderedVerts: 0,
  renderedPoints: 0,
  renderedLines: 0,
  sceneTris: 0,
  sceneVerts: 0,
  meshCount: 0,
  texturesCount: 0,
  geometriesCount: 0,
  programsCount: 0,
  jsHeapMb: null,
  resolution: '0 × 0',
  dpr: 1,
  gpuName: 'Detecting GPU...',
};

// ============================================================================
// FORMATTING HELPERS
// ============================================================================
function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'k';
  }
  return num.toLocaleString();
}

function getFpsColor(fps: number): string {
  if (fps >= 55) return 'text-[#00ff66] border-[#00ff66]/40 bg-[#00ff66]/10';
  if (fps >= 30) return 'text-[#ffb700] border-[#ffb700]/40 bg-[#ffb700]/10';
  return 'text-[#ff007f] border-[#ff007f]/40 bg-[#ff007f]/10';
}

function getDrawCallsColor(calls: number): string {
  if (calls <= 35) return 'text-[#00f3ff] border-[#00f3ff]/40 bg-[#00f3ff]/10';
  if (calls <= 50) return 'text-[#ffb700] border-[#ffb700]/40 bg-[#ffb700]/10';
  return 'text-[#ff007f] border-[#ff007f]/40 bg-[#ff007f]/10';
}

// ============================================================================
// REACT DOM OVERLAY COMPONENT
// ============================================================================
interface PerfOverlayProps {
  metricsRef: React.MutableRefObject<PerfMetrics>;
  onResetMinMax: () => void;
  hidden?: boolean;
}

function PerfOverlay({ metricsRef, onResetMinMax, hidden }: PerfOverlayProps) {
  const [metrics, setMetrics] = useState<PerfMetrics>(metricsRef.current);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [positionRight, setPositionRight] = useState<boolean>(true);

  // Poll metricsRef every ~150ms to avoid re-rendering R3F scene while keeping UI responsive
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics({ ...metricsRef.current });
    }, 150);
    return () => clearInterval(timer);
  }, [metricsRef]);

  // Keyboard shortcut: [~] (Backquote) or [F3] to toggle visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === '`' || e.key === '~' || e.key === 'F3') {
        e.preventDefault();
        setIsVisible((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (hidden || !isVisible) {
    return (
      <div
        className="fixed bottom-4 right-4 z-50 pointer-events-auto"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          title="Show Performance Telemetry (~ or F3)"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#050811]/90 border border-cyan-500/40 text-cyan-400 hover:text-cyan-200 text-xs font-mono shadow-[0_0_12px_rgba(0,243,255,0.25)] transition backdrop-blur-md"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse text-[#00f3ff]" />
          <span>PERF [{metrics.fps || '--'} FPS]</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-16 z-50 pointer-events-auto select-none transition-all duration-200 font-mono text-xs ${
        positionRight ? 'right-6' : 'left-6'
      }`}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ------------------------------------------------------------- */}
      {/* COMPACT PILL MODE                                              */}
      {/* ------------------------------------------------------------- */}
      {!isExpanded ? (
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#050811]/92 backdrop-blur-md border border-[#1e293b] hover:border-cyan-500/40 shadow-[0_4px_24px_rgba(0,0,0,0.7)] text-slate-300">
          {/* FPS Badge */}
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border font-bold ${getFpsColor(
              metrics.fps
            )}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span>{metrics.fps} FPS</span>
          </div>

          {/* Draw Calls */}
          <div
            className={`px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${getDrawCallsColor(
              metrics.drawCalls
            )}`}
            title="Active Draw Calls (Budget: <35)"
          >
            <span>{metrics.drawCalls} DC</span>
          </div>

          {/* Triangles */}
          <div className="px-2 py-0.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-[11px] text-cyan-300" title="Rendered Triangles">
            <span>{formatNumber(metrics.renderedTris)} Δ</span>
          </div>

          {/* Vertices */}
          <div className="hidden sm:block px-2 py-0.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-[11px] text-slate-300" title="Rendered Vertices">
            <span>{formatNumber(metrics.renderedVerts)} V</span>
          </div>

          {/* Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            title="Expand Full Performance Telemetry"
            className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Hide Button */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            title="Hide Monitor (~ or F3 to restore)"
            className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800/60 transition"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* ----------------------------------------------------------- */
        /* EXPANDED FULL TELEMETRY DASHBOARD                           */
        /* ----------------------------------------------------------- */
        <div className="w-80 sm:w-96 rounded-2xl bg-[#050811]/95 backdrop-blur-xl border border-cyan-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(0,243,255,0.12)] p-4 text-slate-300">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#1e293b]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff] animate-pulse" />
              <span className="font-bold tracking-wider text-cyan-400 text-[11px] uppercase">
                ENGINE TELEMETRY // DEV
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onResetMinMax}
                title="Reset Min / Max FPS"
                className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPositionRight((p) => !p)}
                title="Switch Side (Left / Right)"
                className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition text-[10px]"
              >
                {positionRight ? '«' : '»'}
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                title="Collapse to Mini Pill"
                className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                title="Hide Monitor (~ or F3 to restore)"
                className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800/60 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Section 1: Frame Timing & FPS */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {/* FPS Card */}
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>Framerate</span>
                <span className="text-[9px] text-slate-500">Target 60</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl font-bold font-mono ${getFpsColor(metrics.fps).split(' ')[0]}`}>
                  {metrics.fps}
                </span>
                <span className="text-[11px] text-slate-400">FPS</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1 pt-1 border-t border-slate-800">
                <span>Min: {metrics.minFps === 999 ? '--' : metrics.minFps}</span>
                <span>Max: {metrics.maxFps || '--'}</span>
              </div>
            </div>

            {/* Frame Time Card */}
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>Frame Time</span>
                <span className="text-[9px] text-slate-500">Target 16.6ms</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold font-mono text-cyan-300">
                  {metrics.frameTimeMs.toFixed(1)}
                </span>
                <span className="text-[11px] text-slate-400">ms</span>
              </div>
              <div className="text-[9px] text-slate-400 mt-1 pt-1 border-t border-slate-800 flex justify-between">
                <span>Delta</span>
                <span className={metrics.frameTimeMs <= 17.5 ? 'text-green-400' : 'text-amber-400'}>
                  {metrics.frameTimeMs <= 17.5 ? 'NOMINAL' : 'HEAVY'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Render Pipeline (Draw Calls, Tris, Verts) */}
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>Render Pipeline</span>
              </div>
              <span className="text-[9px] text-cyan-400">Target &lt;35 Calls</span>
            </div>

            {/* Draw Calls Row */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Draw Calls:</span>
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getDrawCallsColor(metrics.drawCalls)}`}>
                  {metrics.drawCalls} / 35 max
                </span>
              </div>
            </div>

            {/* Triangles Row */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Triangles (Tris):</span>
              <div className="text-right">
                <span className="text-cyan-300 font-semibold">{formatNumber(metrics.renderedTris)}</span>
                <span className="text-slate-500 text-[10px] ml-1.5">
                  ({metrics.renderedTris.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Vertices Row */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Vertices:</span>
              <div className="text-right">
                <span className="text-slate-200 font-semibold">{formatNumber(metrics.renderedVerts)}</span>
                <span className="text-slate-500 text-[10px] ml-1.5">
                  ({metrics.renderedVerts.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Total Scene Geometries */}
            <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>Scene Total Geometry:</span>
              <span>
                {formatNumber(metrics.sceneTris)} tris · {metrics.meshCount} meshes
              </span>
            </div>
          </div>

          {/* Section 3: VRAM, Memory & Shaders */}
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-pink-400" />
                <span>Memory &amp; Assets</span>
              </div>
              <span className="text-[9px] text-pink-400">Target &lt;85MB</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
              <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[9px] text-slate-500">TEXTURES</div>
                <div className="font-bold text-cyan-300 text-[11px]">{metrics.texturesCount}</div>
              </div>
              <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[9px] text-slate-500">GEOMETRIES</div>
                <div className="font-bold text-cyan-300 text-[11px]">{metrics.geometriesCount}</div>
              </div>
              <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[9px] text-slate-500">SHADERS</div>
                <div className="font-bold text-cyan-300 text-[11px]">{metrics.programsCount}</div>
              </div>
            </div>

            {metrics.jsHeapMb !== null && (
              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                <span>JS Heap Footprint:</span>
                <span className={metrics.jsHeapMb <= 85 ? 'text-green-400 font-semibold' : 'text-amber-400 font-semibold'}>
                  {metrics.jsHeapMb.toFixed(1)} MB / 85 MB
                </span>
              </div>
            )}
          </div>

          {/* Section 4: Display Hardware & Resolution */}
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[10px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between">
              <span>Canvas Viewport:</span>
              <span className="text-slate-300">{metrics.resolution} (DPR: {metrics.dpr}x)</span>
            </div>
            <div className="flex items-center justify-between truncate" title={metrics.gpuName}>
              <span>GPU:</span>
              <span className="text-slate-300 truncate max-w-[180px]">{metrics.gpuName}</span>
            </div>
          </div>

          {/* Footer Dev Note */}
          <div className="mt-2.5 pt-2 border-t border-slate-800 text-[9px] text-slate-500 flex items-center justify-between">
            <span>Toggle: [~] or [F3]</span>
            <span className="text-cyan-500/80">DEV COMPONENT ONLY</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// DEV PERFORMANCE MONITOR COMPONENT (Sits inside <Canvas>)
// ============================================================================
export interface DevPerfMonitorProps {
  /** Optional flag to hide overlay (e.g. when recruiter mode is active) */
  hidden?: boolean;
}

/**
 * High-performance developer telemetry monitor for Three.js / React Three Fiber.
 * Tracks live draw calls, rendered triangles, rendered vertices, frame rate (FPS),
 * frame time (ms), GPU geometries/textures, and memory against project targets.
 * 
 * TO REMOVE FOR PRODUCTION:
 * Simply delete `<DevPerfMonitor />` from `App.tsx` and delete this file.
 */
export const DevPerfMonitor: React.FC<DevPerfMonitorProps> = ({ hidden = false }) => {
  const { gl, scene } = useThree();

  const metricsRef = useRef<PerfMetrics>({ ...DEFAULT_METRICS });
  const rootRef = useRef<Root | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // FPS calculation variables
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);
  const frameTimesRef = useRef<number[]>([]);
  const lastSceneScanRef = useRef<number>(0);

  // Initialize GPU name once
  useEffect(() => {
    try {
      const glContext = gl.getContext();
      const debugInfo = glContext.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const unmasked = glContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (unmasked) {
          metricsRef.current.gpuName = unmasked.replace(/Direct3D.*vs_\d+_\d+/, '').trim();
        }
      }
    } catch {
      metricsRef.current.gpuName = 'Standard WebGL2';
    }
  }, [gl]);

  // Reset Min/Max FPS callback
  const handleResetMinMax = () => {
    metricsRef.current.minFps = 999;
    metricsRef.current.maxFps = 0;
  };

  // Mount HTML Overlay into document.body using an isolated React DOM Root
  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'dev-perf-monitor-mount';
    document.body.appendChild(container);
    containerRef.current = container;

    const root = createRoot(container);
    rootRef.current = root;
    root.render(
      <PerfOverlay
        metricsRef={metricsRef}
        onResetMinMax={handleResetMinMax}
        hidden={hidden}
      />
    );

    return () => {
      root.unmount();
      if (container.parentElement) {
        container.parentElement.removeChild(container);
      }
      rootRef.current = null;
      containerRef.current = null;
    };
  }, []);

  // Update overlay if `hidden` prop changes
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.render(
        <PerfOverlay
          metricsRef={metricsRef}
          onResetMinMax={handleResetMinMax}
          hidden={hidden}
        />
      );
    }
  }, [hidden]);

  // Main per-frame sampling loop
  useFrame((_, delta) => {
    frameCountRef.current++;
    const now = performance.now();
    const frameTimeMs = delta * 1000;
    frameTimesRef.current.push(frameTimeMs);
    if (frameTimesRef.current.length > 40) {
      frameTimesRef.current.shift();
    }

    // Update FPS calculation every 200ms
    const elapsed = now - lastTimeRef.current;
    if (elapsed >= 200) {
      const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
      const avgFrameTime =
        frameTimesRef.current.reduce((a, b) => a + b, 0) / (frameTimesRef.current.length || 1);

      metricsRef.current.fps = currentFps;
      metricsRef.current.frameTimeMs = avgFrameTime;

      if (currentFps > 0) {
        if (currentFps < metricsRef.current.minFps) metricsRef.current.minFps = currentFps;
        if (currentFps > metricsRef.current.maxFps) metricsRef.current.maxFps = currentFps;
      }

      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }

    // Extract Three.js WebGLRenderer live stats
    const renderInfo = gl.info.render;
    metricsRef.current.drawCalls = renderInfo.calls;
    metricsRef.current.renderedTris = renderInfo.triangles;
    metricsRef.current.renderedPoints = renderInfo.points;
    metricsRef.current.renderedLines = renderInfo.lines;
    metricsRef.current.renderedVerts =
      renderInfo.triangles * 3 + renderInfo.lines * 2 + renderInfo.points;

    // Memory stats
    metricsRef.current.texturesCount = gl.info.memory.textures;
    metricsRef.current.geometriesCount = gl.info.memory.geometries;
    metricsRef.current.programsCount = gl.info.programs?.length ?? 0;

    // Viewport resolution and DPR
    metricsRef.current.resolution = `${gl.domElement.clientWidth} × ${gl.domElement.clientHeight}`;
    metricsRef.current.dpr = Number(window.devicePixelRatio.toFixed(2));

    // JS Heap (Chromium browsers)
    const perfMemory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory;
    if (perfMemory?.usedJSHeapSize) {
      metricsRef.current.jsHeapMb = perfMemory.usedJSHeapSize / (1024 * 1024);
    }

    // Periodic scene geometry scan (every 1.5 seconds)
    if (now - lastSceneScanRef.current > 1500) {
      lastSceneScanRef.current = now;
      let totalTris = 0;
      let totalVerts = 0;
      let totalMeshes = 0;

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          totalMeshes++;
          const geom = (obj as THREE.Mesh).geometry;
          if (geom) {
            if (geom.index) {
              totalTris += geom.index.count / 3;
            } else if (geom.attributes?.position) {
              totalTris += geom.attributes.position.count / 3;
            }
            if (geom.attributes?.position) {
              totalVerts += geom.attributes.position.count;
            }
          }
        }
      });

      metricsRef.current.sceneTris = Math.round(totalTris);
      metricsRef.current.sceneVerts = totalVerts;
      metricsRef.current.meshCount = totalMeshes;
    }
  });

  return null;
};

export default DevPerfMonitor;
