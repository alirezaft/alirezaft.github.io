import React, { useEffect, useState, useMemo } from 'react';
import { Html } from '@react-three/drei';
import { useUI } from '../../context';
import { useAudio } from '../../audio';

export interface CrtScreenProps {
  /** Screen quad position [x, y, z] */
  position?: [number, number, number];
  /** Screen rotation [x, y, z] */
  rotation?: [number, number, number];
  /** Scale factor for the Html container */
  scale?: number;
}

/**
 * High-fidelity retro-futuristic CRT screen rendered via <Html transform>.
 * Provides 100% vector-sharp typography, native CSS scanlines, authentic phosphor bloom,
 * and zero-content-drift data binding to the active or held project.
 */
export const CrtScreen: React.FC<CrtScreenProps> = ({
  position = [0, 1.13, 0.73],
  rotation = [-0.08, 0, 0],
  scale = 0.00048,
}) => {
  const { heldProject, heldProjectId, openProject, returnCartridge } = useUI();
  const audio = useAudio();

  const [bootTime, setBootTime] = useState(0);
  const [blink, setBlink] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Play CRT phosphor hum when a cartridge mounts or unmounts
  useEffect(() => {
    if (heldProject) {
      audio.playCrtPowerOn();
      setActiveMediaIndex(0);
    }
  }, [heldProjectId]);

  // Terminal clock / uptime ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setBootTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Blinking terminal prompt cursor
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setBlink((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  const activeMedia = useMemo(() => {
    if (!heldProject?.media || heldProject.media.length === 0) return null;
    return heldProject.media[activeMediaIndex] || heldProject.media[0];
  }, [heldProject, activeMediaIndex]);

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Html
      transform
      wrapperClass="crt-screen-wrapper"
      distanceFactor={1.2}
      position={position}
      rotation={rotation}
      scale={scale}
      zIndexRange={[10, 0]}
      style={{
        pointerEvents: 'auto',
      }}
    >
      <div
        className="relative w-[720px] h-[540px] bg-[#04080e] text-[#00f3ff] font-mono overflow-hidden select-none border-2 border-[#00f3ff]/40 rounded-[28px] shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.95), 0 0 25px rgba(0, 243, 255, 0.25)',
        }}
      >
        {/* CRT Scanline & Phosphor Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))',
            backgroundSize: '100% 3px, 6px 100%',
          }}
        />

        {/* Subtle CRT Glass Barrel Reflection / Vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.03) 0%, rgba(0, 0, 0, 0.45) 80%, rgba(0, 0, 0, 0.9) 100%)',
          }}
        />

        {/* Animated Horizontal Scan Sweep Beam */}
        <div className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#00f3ff]/10 to-transparent animate-scanline z-25" />

        {/* Screen Content Wrapper */}
        <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between text-xs leading-relaxed">
          {/* Top Status Telemetry Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#00f3ff]/30 text-[11px] text-[#00f3ff]/80">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
              <span className="font-bold tracking-widest text-[#00ff66]">
                FORGHANI SYSTEMS // CYBER-DECK KERNEL v4.2
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <span>UPTIME: {formatUptime(bootTime)}</span>
              <span>BUS: 64-BIT PCI</span>
              <span className="text-[#ffb700]">SYS_OK</span>
            </div>
          </div>

          {/* Main Display Area (Dynamic Mode Switch) */}
          {heldProject ? (
            /* ============================================================= */
            /* MODE B: MOUNTED PROJECT DOSSIER & LIVE MEDIA VIEW             */
            /* ============================================================= */
            <div className="flex-1 py-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/50 rounded">
                      {heldProject.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      YEAR: {heldProject.year || '2026'}
                    </span>
                    {heldProject.subtitle && (
                      <span className="text-[10px] text-[#ffb700] truncate max-w-[260px]">
                        // {heldProject.subtitle}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-slate-100 tracking-wide uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]">
                    {heldProject.title}
                  </h2>
                </div>

                {/* Impact Metric Badge */}
                {heldProject.statsBadge && (
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#ff007f] drop-shadow-[0_0_8px_rgba(255,0,127,0.5)]">
                      {heldProject.statsBadge}
                    </div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">
                      VERIFIED IMPACT
                    </div>
                  </div>
                )}
              </div>

              {/* Middle Section: Media Preview & Technical Summary */}
              <div className="grid grid-cols-12 gap-4 my-2 h-[240px]">
                {/* Media Preview Box */}
                <div className="col-span-6 relative bg-black/60 border border-[#00f3ff]/40 rounded-lg overflow-hidden flex items-center justify-center">
                  {activeMedia ? (
                    activeMedia.type === 'video' ? (
                      <video
                        src={activeMedia.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={activeMedia.url}
                        alt={activeMedia.title || heldProject.title}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : heldProject.thumbnailUrl ? (
                    <img
                      src={heldProject.thumbnailUrl}
                      alt={heldProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <div className="text-[#00f3ff]/40 text-2xl mb-1">📼</div>
                      <div className="text-[10px] text-slate-400">TELEMETRY FEED ACTIVE</div>
                    </div>
                  )}

                  {/* Media Indicator Pills */}
                  {heldProject.media && heldProject.media.length > 1 && (
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 bg-black/80 backdrop-blur rounded text-[9px] border border-slate-700">
                      <span className="text-slate-300">
                        FEED {activeMediaIndex + 1}/{heldProject.media.length}
                      </span>
                      <div className="flex gap-1">
                        {heldProject.media.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              audio.playClick();
                              setActiveMediaIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full cursor-pointer transition ${
                              idx === activeMediaIndex ? 'bg-[#00f3ff]' : 'bg-slate-600 hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Technical Overview & Architecture Bullets */}
                <div className="col-span-6 flex flex-col justify-between overflow-y-auto pr-1 text-[11px] text-slate-300">
                  <p className="line-clamp-4 leading-normal text-slate-300/90 mb-2">
                    {heldProject.overview}
                  </p>

                  {/* Architecture & Engineering Highlights */}
                  {heldProject.responsibilities && heldProject.responsibilities.length > 0 && (
                    <div className="space-y-1 mb-2">
                      <div className="text-[9px] text-[#00f3ff] uppercase tracking-wider font-bold">
                        KEY HIGHLIGHTS:
                      </div>
                      {heldProject.responsibilities.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-[#ffb700]">▸</span>
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {heldProject.techTags.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 bg-slate-800/90 border border-slate-700 text-slate-300 text-[9px] rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive CRT Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-[#00f3ff]/30 text-[11px]">
                <div className="text-[10px] text-slate-400">
                  <span>MOUNTED: DRIVE 0 // ROM-LOCKED</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      audio.playClick();
                      openProject(heldProject.id);
                    }}
                    className="px-4 py-1.5 bg-[#00f3ff]/20 hover:bg-[#00f3ff]/30 text-[#00f3ff] border border-[#00f3ff]/60 hover:border-[#00f3ff] rounded font-bold text-[11px] tracking-wider transition cursor-pointer flex items-center gap-2 shadow-[0_0_12px_rgba(0,243,255,0.3)]"
                  >
                    <span>OPEN FULL DOSSIER</span>
                    <span className="text-[9px] text-[#00f3ff]/80">[LMB]</span>
                  </button>
                  <button
                    onClick={() => {
                      audio.playClick();
                      returnCartridge();
                    }}
                    className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded text-[11px] transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>EJECT</span>
                    <span className="text-[9px] text-slate-400">[ESC]</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================= */
            /* MODE A: IDLE BOOT TERMINAL CLI (AWAITING MEDIA)              */
            /* ============================================================= */
            <div className="flex-1 py-4 flex flex-col justify-between">
              {/* ASCII Header Banner */}
              <div className="space-y-1">
                <pre className="text-[9px] text-[#00f3ff]/70 leading-none font-mono">
{`   _____ ____  ____  ______ _____ _   _ _____     ______     ______  ______ _____  _  __
  |  ___/ __ \\|  _ \\|  ____/ ____| \\ | |_   _|   |  ____|   |  ____|/ ____|  __ \\| |/ /
  | |_ | |  | | |_) | |__ | |  __|  \\| | | |     | |__ _____| |__  | |    | |__) | ' / 
  |  _|| |  | |  _ <|  __|| | |_ | . \` | | |     |  __|_____|  __| | |    |  ___/|  <  
  | |  | |__| | |_) | |___| |__| | |\\  |_| |_    | |____    | |____| |____| |    | . \\ 
  \\_|   \\____/|____/|______\\_____|_| \\_|_____|   |______|   |______|\_____/|_|    |_|\\_\\`}
                </pre>
                <div className="text-[10px] text-slate-400 tracking-wider">
                  SYSTEM INITIALIZED · MEMORY: 64 MB RAM · ALL SUBSYSTEMS NOMINAL
                </div>
              </div>

              {/* Diagnostic Terminal Output */}
              <div className="my-2 p-3 bg-black/40 border border-[#00f3ff]/20 rounded-lg space-y-1.5 text-[11px] text-slate-300">
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>[KERNEL]: HARDWARE BUS READY</span>
                  <span className="text-[#00ff66]">ONLINE</span>
                </div>
                <div>▸ CARTRIDGE DRIVE 0: [EMPTY // AWAITING MEDIA]</div>
                <div>▸ CRYPTOGRAPHIC USB BUS A: [UNAUTHENTICATED]</div>
                <div>▸ LOGIC DIAGNOSTIC PROBE: [STANDBY // READY ON BENCH]</div>
                <div>▸ COMPANION DRONE "BYTE": [SYNCHRONIZED // IDLE]</div>
              </div>

              {/* Interactive Call-To-Action Box */}
              <div className="p-3 bg-[#00f3ff]/5 border border-[#00f3ff]/30 rounded-lg text-slate-200">
                <div className="text-[#ffb700] font-bold text-xs mb-1 flex items-center gap-2">
                  <span className="animate-ping w-1.5 h-1.5 rounded-full bg-[#ffb700]" />
                  <span>&gt; AWAITING INPUT // CHOOSE A TASK:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-[#00f3ff] font-bold">1. INSPECT PROJECTS:</span>
                    <p className="text-slate-400 mt-0.5">
                      Aim crosshair at the 4-tier rack on your left and Left-Click any data cartridge.
                    </p>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-[#00ff66] font-bold">2. RECRUITER MODE:</span>
                    <p className="text-slate-400 mt-0.5">
                      Toggle to the 2D Executive Dashboard anytime using the top Cyber HUD.
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Terminal Command Prompt */}
              <div className="flex items-center gap-2 text-[#00f3ff] text-xs pt-2 border-t border-[#00f3ff]/20 font-bold">
                <span>root@cyberdeck:~$</span>
                <span className="text-slate-300 font-normal">awaiting_media_rom</span>
                <span
                  className={`inline-block w-2.5 h-4 bg-[#00f3ff] ml-1 transition-opacity ${
                    blink ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Bottom Peripheral & Frequency Telemetry Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#00f3ff]/30 text-[10px] text-slate-500">
            <div className="flex items-center gap-3">
              <span>SCAN FREQ: 15.75 kHz</span>
              <span>REFRESH: 60 Hz</span>
              <span>PHOSPHOR: P22-CYAN</span>
            </div>
            <div className="text-slate-400">
              {heldProject ? 'PRESS [LMB] FOR FULL CASE STUDY' : 'SELECT CARTRIDGE ON LEFT SHELF'}
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};
