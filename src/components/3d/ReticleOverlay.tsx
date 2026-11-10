import React from 'react';
import { Eye, MousePointerClick, ZoomIn } from 'lucide-react';
import { useOptionalCrosshair } from './CrosshairInteraction';

export interface ReticleOverlayProps {
  isLocked: boolean;
  isZooming: boolean;
  hoverText?: string | null;
  onRequestLock: () => void;
  onToggleZoom?: () => void;
  isTouchDevice?: boolean;
}

export const ReticleOverlay: React.FC<ReticleOverlayProps> = ({
  isLocked,
  isZooming,
  hoverText: propHoverText,
  onRequestLock,
  onToggleZoom,
  isTouchDevice = false,
}) => {
  const crosshair = useOptionalCrosshair();
  const hoverText = propHoverText !== undefined ? propHoverText : crosshair?.hoverPrompt;

  return (
    <>
      {/* Center Reticle (Always active during 3D session) */}
      <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Outer focus ring when zooming or hovering an interactable */}
          <div
            className={`absolute rounded-full border border-cyber-cyan/50 transition-all duration-200 ${
              isZooming
                ? 'w-8 h-8 scale-110 opacity-90 border-cyber-cyan animate-pulse'
                : hoverText
                ? 'w-6 h-6 scale-105 opacity-80 border-cyber-amber'
                : 'w-4 h-4 scale-90 opacity-0'
            }`}
          />

          {/* Core Reticle Dot */}
          <div
            className={`rounded-full transition-all duration-150 ${
              hoverText
                ? 'w-2 h-2 bg-cyber-amber shadow-[0_0_10px_#ffb700]'
                : isZooming
                ? 'w-2 h-2 bg-cyber-pink shadow-[0_0_10px_#ff007f]'
                : 'w-1.5 h-1.5 bg-cyber-cyan shadow-[0_0_8px_#00f3ff]'
            }`}
          />

          {/* Dynamic contextual hover prompt underneath reticle */}
          {hoverText && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/80 border border-cyber-amber/60 text-[10px] font-mono tracking-wider text-cyber-amber uppercase backdrop-blur shadow-lg animate-fade-in">
              {hoverText}
            </div>
          )}
        </div>
      </div>

      {/* Unlocked Click-to-Engage Prompt (Desktop only) */}
      {!isLocked && !isTouchDevice && (
        <div
          onClick={onRequestLock}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer pointer-events-auto group"
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-950/85 border border-cyber-cyan/40 shadow-[0_0_20px_rgba(0,243,255,0.2)] backdrop-blur transition-all duration-200 group-hover:border-cyber-cyan group-hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] group-hover:scale-105">
            <MousePointerClick className="w-4 h-4 text-cyber-cyan animate-bounce" />
            <div className="text-xs font-mono text-slate-200 flex items-center gap-2">
              <span className="font-semibold text-cyber-cyan">CLICK VIEWPORT</span>
              <span className="text-slate-500">·</span>
              <span>Mouse Look</span>
              <span className="text-slate-500">·</span>
              <span>Right-Click Zoom</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Esc to release</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile / Touch Fallback Controls */}
      {isTouchDevice && (
        <div className="fixed bottom-16 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
          {onToggleZoom && (
            <button
              onClick={onToggleZoom}
              aria-label="Toggle Zoom"
              className={`p-3 rounded-full border backdrop-blur transition-all ${
                isZooming
                  ? 'bg-cyber-pink/20 border-cyber-pink text-cyber-pink shadow-[0_0_15px_#ff007f]'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan'
              }`}
            >
              {isZooming ? <Eye className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
          )}
        </div>
      )}
    </>
  );
};
