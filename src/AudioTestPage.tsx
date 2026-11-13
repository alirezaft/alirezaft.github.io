/**
 * AudioTestPage — Phase 2 sound engine test harness.
 * NOT included in the final production build.
 * Access via the route: /#/audio-test (or conditionally rendered in App.tsx during dev)
 */

import { useState, useCallback, useRef } from 'react';
import { AudioProvider, useAudio } from './audio/useAudio';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SoundDef {
  id: string;
  label: string;
  description: string;
  category: 'ui' | 'hardware' | 'robot' | 'camera' | 'ambient';
  hasVariations: boolean;
  fn: (audio: ReturnType<typeof useAudio>) => void;
  duration: string; // human readable
}

// ---------------------------------------------------------------------------
// Sound catalog
// ---------------------------------------------------------------------------

const SOUNDS: SoundDef[] = [
  {
    id: 'click',
    label: 'Click',
    description: 'Crisp cyber tick — any UI button. Pitch varies each press.',
    category: 'ui',
    hasVariations: true,
    duration: '~15ms',
    fn: (a) => a.playClick(),
  },
  {
    id: 'hover',
    label: 'Hover',
    description: 'Softer sine blip — cartridge or chip hover. Quieter than click.',
    category: 'ui',
    hasVariations: true,
    duration: '~25ms',
    fn: (a) => a.playHover(),
  },
  {
    id: 'hud-switch',
    label: 'HUD Mode Switch',
    description: '3-note ascending (→ 3D) or descending (→ Grid). Alternates on repeat.',
    category: 'ui',
    hasVariations: true,
    duration: '~150ms',
    fn: (a) => a.playHudModeSwitch(),
  },
  {
    id: 'comms',
    label: 'Comms Terminal Click',
    description: 'Radio-textured bandpass noise + carrier tone.',
    category: 'ui',
    hasVariations: true,
    duration: '~40ms',
    fn: (a) => a.playCommsTerminalClick(),
  },
  {
    id: 'crt-on',
    label: 'CRT Power ON',
    description: 'Sawtooth sweep rising + phosphor buzz + static burst.',
    category: 'hardware',
    hasVariations: false,
    duration: '~800ms',
    fn: (a) => a.playCrtPowerOn(),
  },
  {
    id: 'crt-off',
    label: 'CRT Power OFF',
    description: 'Short de-energizing sweep pop.',
    category: 'hardware',
    hasVariations: false,
    duration: '~150ms',
    fn: (a) => a.playCrtPowerOff(),
  },
  {
    id: 'bus-pulse',
    label: 'Bus Pulse',
    description: 'Electrical data blip — chipset trace hover. Center freq varies.',
    category: 'hardware',
    hasVariations: true,
    duration: '~45ms',
    fn: (a) => a.playBusPulse(),
  },
  {
    id: 'overclock',
    label: 'Overclock Surge',
    description: 'Rising distorted sweep + crackle noise + LFO pulse. The big one.',
    category: 'hardware',
    hasVariations: false,
    duration: '~1.2s',
    fn: (a) => a.playOverclockSurge(),
  },
  {
    id: 'usb',
    label: 'USB Plug',
    description: 'Mechanical snap transient + power-surge frequency sweep.',
    category: 'hardware',
    hasVariations: false,
    duration: '~450ms',
    fn: (a) => a.playUsbPlug(),
  },
  {
    id: 'chirp',
    label: 'Robot Chirp',
    description: 'Double/triple harmonic sine blips — R2-D2 style. 3 melodic shapes.',
    category: 'robot',
    hasVariations: true,
    duration: '~240ms',
    fn: (a) => a.playRobotChirp(),
  },
  {
    id: 'crunch',
    label: 'Robot Fed Crunch',
    description: 'Bandlimited crunch + ascending celebration glissando.',
    category: 'robot',
    hasVariations: false,
    duration: '~600ms',
    fn: (a) => a.playRobotFedCrunch(),
  },
  {
    id: 'purr',
    label: 'Robot Purr',
    description: 'Low vibrato held tone — petting / contentment.',
    category: 'robot',
    hasVariations: false,
    duration: '~1.2s',
    fn: (a) => a.playRobotPurr(),
  },
  {
    id: 'idle',
    label: 'Robot Idle',
    description: '3 curious shapes cycling: rising question, two-note wobble, single blip.',
    category: 'robot',
    hasVariations: true,
    duration: '~150ms',
    fn: (a) => a.playRobotIdle(),
  },
  {
    id: 'overclock-react',
    label: 'Robot Overclock React',
    description: 'Excited ascending glissando + chirp — Byte reacting to the surge.',
    category: 'robot',
    hasVariations: false,
    duration: '~500ms',
    fn: (a) => a.playRobotOverclockReact(),
  },
  {
    id: 'whoosh',
    label: 'Camera Whoosh',
    description: 'Airy filtered noise + descending sine — camera state transition.',
    category: 'camera',
    hasVariations: false,
    duration: '~300ms',
    fn: (a) => a.playCameraWhoosh(),
  },
];

// ---------------------------------------------------------------------------
// Category styling
// ---------------------------------------------------------------------------

const CAT_STYLE: Record<string, { badge: string; glow: string }> = {
  ui:       { badge: 'bg-sky-900/60 text-sky-300 border-sky-600/40',       glow: 'hover:border-sky-400/60 hover:shadow-sky-500/20' },
  hardware: { badge: 'bg-amber-900/60 text-amber-300 border-amber-600/40', glow: 'hover:border-amber-400/60 hover:shadow-amber-500/20' },
  robot:    { badge: 'bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-600/40', glow: 'hover:border-fuchsia-400/60 hover:shadow-fuchsia-500/20' },
  camera:   { badge: 'bg-emerald-900/60 text-emerald-300 border-emerald-600/40', glow: 'hover:border-emerald-400/60 hover:shadow-emerald-500/20' },
  ambient:  { badge: 'bg-violet-900/60 text-violet-300 border-violet-600/40', glow: 'hover:border-violet-400/60 hover:shadow-violet-500/20' },
};

// ---------------------------------------------------------------------------
// Single sound button
// ---------------------------------------------------------------------------

function SoundButton({ def, audio }: { def: SoundDef; audio: ReturnType<typeof useAudio> }) {
  const [playCount, setPlayCount] = useState(0);
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePlay = useCallback(() => {
    def.fn(audio);
    setPlayCount(c => c + 1);
    setActive(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(false), 200);
  }, [def, audio]);

  const cat = CAT_STYLE[def.category];

  return (
    <div
      className={`
        group relative flex flex-col gap-2 p-4 rounded-lg border
        bg-slate-900/70 border-slate-700/60
        transition-all duration-150 cursor-pointer select-none
        hover:shadow-lg ${cat.glow}
        ${active ? 'scale-[0.97] brightness-125' : 'scale-100'}
      `}
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === 'Enter' ||
        e.code === 'Enter' ||
        e.code === 'NumpadEnter' ||
        e.key === ' ' ||
        e.code === 'Space'
          ? handlePlay()
          : null
      }
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded border font-mono uppercase tracking-wider ${cat.badge}`}>
            {def.category}
          </span>
          {def.hasVariations && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-600/40 font-mono">
              variations
            </span>
          )}
        </div>
        <span className="text-xs text-slate-600 font-mono shrink-0">{def.duration}</span>
      </div>

      {/* Name */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-100 font-mono tracking-wide">
          {def.label}
        </h3>
        {/* Play count badge */}
        {playCount > 0 && (
          <span className="text-xs font-mono text-slate-500">
            ×{playCount}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed">
        {def.description}
      </p>

      {/* Play indicator */}
      <div className={`
        absolute inset-0 rounded-lg pointer-events-none
        border-2 transition-opacity duration-100
        ${active ? 'opacity-100 border-white/20' : 'opacity-0 border-transparent'}
      `} />

      {/* Play button hint */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-30 transition-opacity text-slate-300 text-xs font-mono">
        ▶
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stress-test: rapid fire all sounds
// ---------------------------------------------------------------------------

function StressTest({ audio }: { audio: ReturnType<typeof useAudio> }) {
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggle = () => {
    if (running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRunning(false);
    } else {
      setRunning(true);
      const fns = SOUNDS.filter(s => s.category !== 'ambient').map(s => () => s.fn(audio));
      let i = 0;
      intervalRef.current = setInterval(() => {
        fns[i % fns.length]();
        i++;
      }, 180);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`
        px-4 py-2 rounded text-xs font-mono font-bold border transition-all
        ${running
          ? 'bg-red-900/50 border-red-500/60 text-red-300 hover:bg-red-900/70'
          : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-400'}
      `}
    >
      {running ? '⏹ STOP STRESS TEST' : '⚡ POLYPHONY STRESS TEST'}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main test panel (consumes useAudio)
// ---------------------------------------------------------------------------

function TestPanel() {
  const audio = useAudio();

  const categories = ['ui', 'hardware', 'robot', 'camera'] as const;
  const catLabels: Record<string, string> = {
    ui: 'UI / Navigation',
    hardware: 'Hardware Props',
    robot: 'Byte the Robot',
    camera: 'Camera',
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-200 font-mono">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#080c14]/95 backdrop-blur border-b border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-sm font-bold text-slate-100 tracking-widest uppercase">
              🎵 Audio Engine Test — Phase 2
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Tone.js procedural synthesis · polyphonic · click any card to play
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Mute toggle */}
            <button
              onClick={audio.toggleMute}
              className={`
                px-3 py-1.5 rounded text-xs border font-bold transition-all
                ${audio.muted
                  ? 'bg-red-900/40 border-red-600/50 text-red-300'
                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-400'}
              `}
            >
              {audio.muted ? '🔇 MUTED' : '🔊 SOUND ON'}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>VOL</span>
              <input
                type="range"
                min={0} max={1} step={0.05}
                value={audio.volume}
                onChange={(e) => audio.setVolume(parseFloat(e.target.value))}
                className="w-24 accent-sky-400"
              />
              <span className="w-8 text-right">{Math.round(audio.volume * 100)}%</span>
            </div>

            {/* Ambient toggle */}
            <button
              onClick={audio.toggleAmbient}
              className={`
                px-3 py-1.5 rounded text-xs border font-bold transition-all
                ${audio.ambientOn
                  ? 'bg-violet-900/50 border-violet-500/60 text-violet-300'
                  : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400'}
              `}
            >
              {audio.ambientOn ? '〰 AMBIENT ON' : '〰 AMBIENT OFF'}
            </button>

            {/* Stress test */}
            <StressTest audio={audio} />
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        {/* Ambient callout */}
        <div className="p-4 rounded-lg border border-violet-700/40 bg-violet-950/20 text-xs text-violet-300">
          <strong className="text-violet-200">Ambient PCB Hum</strong> — Toggle above to start the background loop
          (pink noise + 60 Hz hum at 5% volume). Stops automatically in recruiter mode.
          This runs independently of the one-shot sounds.
        </div>

        {categories.map(cat => (
          <section key={cat}>
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4 pb-2 border-b border-slate-800">
              {catLabels[cat]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SOUNDS.filter(s => s.category === cat).map(def => (
                <SoundButton key={def.id} def={def} audio={audio} />
              ))}
            </div>
          </section>
        ))}

        {/* Legend */}
        <section className="pt-4 border-t border-slate-800">
          <h2 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">Legend</h2>
          <div className="flex flex-wrap gap-3 text-xs">
            {Object.entries(CAT_STYLE).filter(([k]) => k !== 'ambient').map(([cat, style]) => (
              <span key={cat} className={`px-2 py-0.5 rounded border ${style.badge}`}>
                {cat}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded border bg-slate-800 text-slate-400 border-slate-600/40">
              variations = pitch/shape changes on repeat clicks
            </span>
          </div>
        </section>

        {/* Engine info */}
        <section className="text-xs text-slate-600 space-y-1 pb-8">
          <p>Engine: Tone.js (Web Audio API) · Zero audio file downloads · All synthesized in real-time</p>
          <p>Aesthetic: Tron / Mirror's Edge — sharp, punchy, digital, dry &lt;100ms transients</p>
          <p>Polyphony: fully polyphonic — all 16 sounds can overlap simultaneously</p>
          <p>Pitch jitter: ±5–10 semitones per call on applicable sounds</p>
        </section>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exported page — wraps its own AudioProvider
// ---------------------------------------------------------------------------

export default function AudioTestPage() {
  return (
    <AudioProvider>
      <TestPanel />
    </AudioProvider>
  );
}
