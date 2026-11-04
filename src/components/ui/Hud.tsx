import { useRef } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { useUI } from '../../context';
import { useAudio } from '../../audio';

export default function Hud() {
  const { viewMode, setViewMode } = useUI();
  const { muted, toggleMute, volume, setVolume, playClick, playHover } = useAudio();

  // Slider interaction tracking: instant click vs drag release
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const clickSoundPlayedRef = useRef(false);

  const isDev = import.meta.env.DEV;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none px-4 py-3 sm:px-6 sm:py-3.5 bg-[#050811]/90 backdrop-blur-md border-b border-[#1e293b]/80 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Subtle minimal status dot indicating scene engine live */}
        <div className="flex-1 pointer-events-auto flex items-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0b1120]/80 backdrop-blur-md border border-[#1e293b]/70 text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
            <span className="tracking-widest uppercase font-mono text-[10px] text-slate-300">
              SYS_READY
            </span>
          </div>
        </div>

        {/* Center: Clean Text-Only Mode Switcher (Icons & Fast label removed) */}
        <nav
          aria-label="Navigation Mode"
          className="pointer-events-auto flex items-center p-1 rounded-xl bg-[#0b1120]/85 backdrop-blur-md border border-[#1e293b] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          {/* 3D Cyber-Deck Pill */}
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            onMouseEnter={playHover}
            className={`relative px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg text-xs font-mono font-medium tracking-wider transition-all duration-200 select-none ${
              viewMode === '3d'
                ? 'bg-cyan-950/60 text-[#00f3ff] border border-[#00f3ff] shadow-[0_0_14px_rgba(0,243,255,0.35)]'
                : 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-800/40'
            }`}
          >
            3D CYBER-DECK
          </button>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-[#1e293b] mx-1" />

          {/* Recruiter Quick-View Pill */}
          <button
            type="button"
            onClick={() => setViewMode('recruiter')}
            onMouseEnter={playHover}
            className={`relative px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg text-xs font-mono font-medium tracking-wider transition-all duration-200 select-none ${
              viewMode === 'recruiter'
                ? 'bg-pink-950/60 text-[#ff007f] border border-[#ff007f] shadow-[0_0_14px_rgba(255,0,127,0.35)]'
                : 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-800/40'
            }`}
          >
            RECRUITER VIEW
          </button>
        </nav>

        {/* Right Side: Media-Player Style Compact Volume Control */}
        <div className="flex-1 pointer-events-auto flex items-center justify-end gap-2.5">
          {/* Compact Media Player Volume Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b1120]/85 backdrop-blur-md border border-[#1e293b] shadow-lg">
            {/* Speaker Icon (Click to toggle mute) */}
            <button
              type="button"
              onClick={toggleMute}
              onMouseEnter={playHover}
              title={muted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label={muted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-0.5 text-slate-400 hover:text-slate-200 transition focus:outline-none"
            >
              {muted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-4 h-4 text-[#00ff66]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#00ff66]" />
              )}
            </button>

            {/* Horizontal Volume Bar */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={muted ? 0 : volume}
              onPointerDown={(e) => {
                isPointerDownRef.current = true;
                startXRef.current = e.clientX;
                hasDraggedRef.current = false;
                clickSoundPlayedRef.current = false;

                // Set initial volume on click
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newVol = Math.max(0, Math.min(1, clickX / rect.width));
                setVolume(newVol);
              }}
              onPointerMove={(e) => {
                if (!isPointerDownRef.current) return;
                const deltaX = Math.abs(e.clientX - startXRef.current);
                if (deltaX > 3) {
                  hasDraggedRef.current = true;
                }
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newVol = Math.max(0, Math.min(1, clickX / rect.width));
                setVolume(newVol);
              }}
              onPointerUp={() => {
                if (!isPointerDownRef.current) return;
                isPointerDownRef.current = false;

                // If user dragged, play click on release
                if (hasDraggedRef.current) {
                  playClick();
                } else if (!clickSoundPlayedRef.current) {
                  // If it was a stationary click that hasn't fired yet
                  playClick();
                }
                hasDraggedRef.current = false;
                clickSoundPlayedRef.current = false;
              }}
              onChange={(e) => {
                const newVol = parseFloat(e.target.value);
                setVolume(newVol);
                // For direct input changes without drag (fallback)
                if (!isPointerDownRef.current && !clickSoundPlayedRef.current) {
                  playClick();
                  clickSoundPlayedRef.current = true;
                }
              }}
              onKeyDown={(e) => {
                // Keyboard arrow adjustments play click instantly
                if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                  playClick();
                }
              }}
              title={`Volume: ${Math.round((muted ? 0 : volume) * 100)}%`}
              aria-label="Audio Volume"
              className="w-16 sm:w-20 h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-[#00ff66] focus:outline-none"
            />

            {/* Volume Percentage */}
            <span className="text-[10px] font-mono text-slate-400 w-7 text-right select-none">
              {muted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>

          {/* Dev-only SFX Lab Button */}
          {isDev && (
            <a
              href="#audio-test"
              onClick={() => window.location.reload()}
              onMouseEnter={playHover}
              title="Open Tone.js Procedural Audio Test Suite"
              className="hidden lg:flex items-center px-2.5 py-1.5 rounded-xl bg-[#0b1120]/80 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 text-[#00f3ff] text-[11px] font-mono transition"
            >
              <span>SFX_LAB</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
