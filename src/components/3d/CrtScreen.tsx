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
 * and zero-content-drift data binding to the active or inserted project.
 */
export const CrtScreen: React.FC<CrtScreenProps> = ({
  position = [0, 0.015, 0.118],
  rotation = [0, 0, 0],
  scale = 0.0188,
}) => {
  const {
    heldProject,
    insertedProject,
    cartridgeDriveState,
    openProject,
    ejectCartridge,
    setViewMode,
  } = useUI();
  const audio = useAudio();

  const [bootTime, setBootTime] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Terminal clock / uptime ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setBootTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reset media index whenever inserted project changes
  useEffect(() => {
    if (insertedProject) {
      setActiveMediaIndex(0);
    }
  }, [insertedProject]);

  const activeMedia = useMemo(() => {
    if (!insertedProject?.media || insertedProject.media.length === 0) return null;
    return insertedProject.media[activeMediaIndex] || insertedProject.media[0];
  }, [insertedProject, activeMediaIndex]);

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isMounted = cartridgeDriveState === 'inserted' && !!insertedProject;

  return (
    <Html
      transform
      position={position}
      rotation={rotation}
      scale={scale}
      zIndexRange={[100, 0]}
      style={{
        pointerEvents: 'auto',
      }}
    >
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[700px] h-[525px] bg-[#04080e] text-[#00f3ff] font-mono overflow-hidden select-none border-2 border-[#00f3ff]/40 rounded-[24px]"
        style={{
          boxShadow: isMounted
            ? 'inset 0 0 100px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 243, 255, 0.4)'
            : 'inset 0 0 100px rgba(0, 0, 0, 0.95), 0 0 18px rgba(0, 243, 255, 0.15)',
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
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  isMounted ? 'bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]' : 'bg-[#00ff66] shadow-[0_0_8px_#00ff66]'
                } animate-pulse`}
              />
              <span className="font-bold tracking-widest text-[#00ff66]">
                FORGHANI SYSTEMS // CYBER-DECK KERNEL v4.2
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <span>UPTIME: {formatUptime(bootTime)}</span>
              <span>BUS: 64-BIT PCI</span>
              <span className={isMounted ? 'text-[#00f3ff] font-bold' : 'text-[#ffb700]'}>
                {isMounted ? 'ROM_MOUNTED' : 'SYS_OK'}
              </span>
            </div>
          </div>

          {/* Main Display Area (Dynamic Mode Switch) */}
          {cartridgeDriveState === 'inserting' ? (
            /* ============================================================= */
            /* MODE B-1: INSERTING & READING ROM SEQUENCE                    */
            /* ============================================================= */
            <div className="flex-1 py-8 flex flex-col justify-center items-center text-center space-y-4">
              <div className="text-4xl text-[#00f3ff] animate-pulse">💾</div>
              <div className="text-sm font-bold tracking-widest text-slate-100 uppercase">
                ENGAGING DRIVE 0 GUIDE RAILS...
              </div>
              <div className="space-y-1 text-[11px] text-[#00f3ff]/80">
                <div>▸ READING SECTORS & BUS DESCRIPTORS...</div>
                <div>▸ VERIFYING CRYPTOGRAPHIC CHECKSUM...</div>
                <div>▸ MOUNTING VIRTUAL FILE SYSTEM...</div>
              </div>
              <div className="w-64 h-2 bg-slate-900 border border-[#00f3ff]/50 rounded-full overflow-hidden p-0.5">
                <div className="w-full h-full bg-[#00f3ff] rounded-full animate-pulse" />
              </div>
            </div>
          ) : isMounted && insertedProject ? (
            /* ============================================================= */
            /* MODE B-2: MOUNTED PROJECT DOSSIER & LIVE MEDIA VIEW           */
            /* ============================================================= */
            <div className="flex-1 py-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/50 rounded">
                      {insertedProject.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      YEAR: {insertedProject.year || '2026'}
                    </span>
                    {insertedProject.subtitle && (
                      <span className="text-[10px] text-[#ffb700] truncate max-w-[260px]">
                        // {insertedProject.subtitle}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-slate-100 tracking-wide uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]">
                    {insertedProject.title}
                  </h2>
                </div>

                {/* Impact Metric Badge */}
                {insertedProject.statsBadge && (
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#ff007f] drop-shadow-[0_0_8px_rgba(255,0,127,0.5)]">
                      {insertedProject.statsBadge}
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
                        alt={activeMedia.title || insertedProject.title}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : insertedProject.thumbnailUrl ? (
                    <img
                      src={insertedProject.thumbnailUrl}
                      alt={insertedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <div className="text-[#00f3ff]/40 text-2xl mb-1">📼</div>
                      <div className="text-[10px] text-slate-400">TELEMETRY FEED ACTIVE</div>
                    </div>
                  )}

                  {/* Media Indicator Pills */}
                  {insertedProject.media && insertedProject.media.length > 1 && (
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 bg-black/80 backdrop-blur rounded text-[9px] border border-slate-700">
                      <span className="text-slate-300">
                        FEED {activeMediaIndex + 1}/{insertedProject.media.length}
                      </span>
                      <div className="flex gap-1">
                        {insertedProject.media.map((_, idx) => (
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

                {/* Technical Overview & Responsibilities */}
                <div className="col-span-6 flex flex-col justify-between overflow-y-auto pr-1 text-[11px] text-slate-300">
                  <p className="line-clamp-4 leading-normal text-slate-300/90 mb-2">
                    {insertedProject.overview}
                  </p>

                  {/* Engineering Highlights */}
                  {insertedProject.responsibilities && insertedProject.responsibilities.length > 0 && (
                    <div className="space-y-1 mb-2">
                      <div className="text-[9px] text-[#00f3ff] uppercase tracking-wider font-bold">
                        KEY HIGHLIGHTS:
                      </div>
                      {insertedProject.responsibilities.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-[#ffb700]">▸</span>
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {insertedProject.techTags.slice(0, 5).map((tech) => (
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
                <div className="text-[10px] text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping" />
                  <span>MOUNTED: DRIVE 0 // ROM-LOCKED</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audio.playClick();
                      openProject(insertedProject.id);
                    }}
                    className="px-4 py-1.5 bg-[#00f3ff]/20 hover:bg-[#00f3ff]/30 text-[#00f3ff] border border-[#00f3ff]/60 hover:border-[#00f3ff] rounded font-bold text-[11px] tracking-wider transition cursor-pointer flex items-center gap-2 shadow-[0_0_12px_rgba(0,243,255,0.3)]"
                  >
                    <span>OPEN FULL DOSSIER</span>
                    <span className="text-[9px] text-[#00f3ff]/80">[LMB]</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audio.playClick();
                      ejectCartridge();
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
            /* MODE A: CLEAN DEFAULT WORKSTATION HUB                         */
            /* ============================================================= */
            <div className="flex-1 py-3 flex flex-col justify-between">
              {/* Clean Welcome Header */}
              <div>
                <div className="flex items-center gap-2 mb-1 text-[11px] font-bold tracking-widest text-[#00f3ff]">
                  <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping" />
                  <span>CYBER-DECK TERMINAL // READY</span>
                </div>
                <h1 className="text-xl font-black text-slate-100 tracking-wide">
                  ALIREZA FORGHANI TOOSI
                </h1>
                <p className="text-[11px] text-slate-400 tracking-wide mt-0.5">
                  Lead Game Engine Programmer · Systems Architect · 50M+ Verified Downloads
                </p>
              </div>

              {/* In-Hand Callout (if player grabbed a cartridge) */}
              {heldProject && (
                <div className="px-4 py-2.5 bg-[#00f3ff]/10 border border-[#00f3ff]/50 rounded-lg flex items-center justify-between shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💾</span>
                    <div>
                      <div className="text-[10px] text-[#00f3ff] font-bold uppercase tracking-wider">
                        CARTRIDGE IN HAND: {heldProject.title}
                      </div>
                      <div className="text-[11px] text-slate-200">
                        Aim at <strong className="text-white">DRIVE 0 (below screen)</strong> and Left-Click to insert.
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#00f3ff]/90 font-bold bg-[#00f3ff]/20 px-2.5 py-1 rounded border border-[#00f3ff]/40">
                    [LMB] TO INSERT
                  </span>
                </div>
              )}

              {/* 3 Clear, High-Signal Action Cards */}
              <div className="grid grid-cols-1 gap-2.5">
                {/* 1. Projects / Cartridge Slot */}
                <div className="p-3 bg-black/40 border border-slate-800 hover:border-[#00f3ff]/40 rounded-xl transition flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00f3ff]/15 border border-[#00f3ff]/40 flex items-center justify-center text-xs text-[#00f3ff] shrink-0 font-bold font-mono">
                    01
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                        INSERT A CARTRIDGE → VIEW PROJECTS
                      </span>
                      <span className="text-[10px] text-[#00f3ff] font-mono">LEFT SHELF</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                      Pick up any project cartridge from the 4-tier rack on the left and slot it into <strong>Drive 0</strong> below to review architectural case studies, playable clips, and metrics.
                    </p>
                  </div>
                </div>

                {/* 2. Skills / Test Bench Probe */}
                <div className="p-3 bg-black/40 border border-slate-800 hover:border-[#ffb700]/40 rounded-xl transition flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ffb700]/15 border border-[#ffb700]/40 flex items-center justify-center text-xs text-[#ffb700] shrink-0 font-bold font-mono">
                    02
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                        PROBE AN IC CHIP → INSPECT SKILLS
                      </span>
                      <span className="text-[10px] text-[#ffb700] font-mono">TEST BENCH</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                      Grab the multimeter logic probe on the circuit bench to inspect microchips and reveal real-time engineering telemetry, SOLID patterns, and shader skills.
                    </p>
                  </div>
                </div>

                {/* 3. Recruiter Quick-View / Resume */}
                <div className="p-3 bg-black/40 border border-slate-800 hover:border-[#00ff66]/40 rounded-xl transition flex items-center justify-between gap-3.5">
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-[#00ff66]/15 border border-[#00ff66]/40 flex items-center justify-center text-xs text-[#00ff66] shrink-0 font-bold font-mono">
                      03
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                          RECRUITER QUICK-VIEW → VERIFIED CV
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-[#00ff66]/20 text-[#00ff66] rounded font-bold font-mono">
                          FAST
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        Prefer a 2D dashboard? Switch to Recruiter View on the top HUD to review verified titles and download the 2-page PDF resume with one click.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audio.playClick();
                      setViewMode('recruiter');
                    }}
                    className="px-3 py-1.5 bg-[#00ff66]/20 hover:bg-[#00ff66]/30 border border-[#00ff66]/60 hover:border-[#00ff66] text-[#00ff66] text-[10px] font-bold rounded-lg transition cursor-pointer shrink-0 shadow-[0_0_10px_rgba(0,255,102,0.2)] font-mono"
                  >
                    SWITCH MODE
                  </button>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-[#00f3ff]/20 text-[10px] text-slate-400">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[#00f3ff]">STATUS:</span>
                  <span className="text-slate-300">AWAITING INPUT</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[9px] text-slate-400">
                  <span>LOOK: Mouse · INTERACT: [LMB] · ZOOM: Hold [RMB]</span>
                </div>
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
              {isMounted
                ? 'CLICK [OPEN FULL DOSSIER] OR PRESS [ESC] TO EJECT'
                : heldProject
                ? 'AIM AT DRIVE 0 AND CLICK TO INSERT'
                : 'SELECT CARTRIDGE ON LEFT SHELF'}
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};
