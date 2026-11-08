import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Film, Terminal } from 'lucide-react';
import { type ProjectMediaItem } from '../../content/projects';
import { useAudio } from '../../audio';

interface ProjectMediaCarouselProps {
  media?: ProjectMediaItem[];
  thumbnailUrl?: string;
  projectTitle: string;
  company?: string;
  primaryColor?: string;
  mode?: 'card' | 'drawer';
  className?: string;
  onMediaClick?: (index: number) => void;
}

export default function ProjectMediaCarousel({
  media,
  thumbnailUrl,
  projectTitle,
  company,
  primaryColor = '#0a1d2e',
  mode = 'drawer',
  className = '',
  onMediaClick,
}: ProjectMediaCarouselProps) {
  const { playHover, playClick } = useAudio();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize media items: if media array exists and has items use it;
  // otherwise if thumbnailUrl exists, create a single fallback media item.
  const items: ProjectMediaItem[] =
    media && media.length > 0
      ? media
      : thumbnailUrl
      ? [
          {
            id: 'primary-thumbnail',
            type: thumbnailUrl.endsWith('.gif') ? 'gif' : 'image',
            url: thumbnailUrl,
            title: projectTitle,
            alt: `${projectTitle} preview`,
          },
        ]
      : [];

  const total = items.length;
  const hasMultiple = total > 1;

  // Clamp index if total changes
  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, total]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      playClick();
      setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    },
    [total, playClick]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      playClick();
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    },
    [total, playClick]
  );

  const handleSelect = useCallback(
    (index: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      playClick();
      setCurrentIndex(index);
    },
    [playClick]
  );

  // Keyboard navigation when in drawer mode
  useEffect(() => {
    if (mode !== 'drawer' || !hasMultiple) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, hasMultiple, handlePrev, handleNext]);

  // ---------------------------------------------------------------------------
  // FALLBACK: Cyberpunk Terminal HUD Screen when no media or thumbnail exists
  // ---------------------------------------------------------------------------
  if (total === 0) {
    if (mode === 'card') {
      return (
        <div
          className={`relative w-full h-36 rounded-xl flex flex-col justify-between p-3.5 overflow-hidden border border-[#1e293b] mb-4 ${className}`}
          style={{
            background: `radial-gradient(circle at center, ${primaryColor}, #050811)`,
          }}
        >
          {/* Subtle Scanlines */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-[#00f3ff]">
              <Terminal className="w-3 h-3" />
              <span className="font-bold tracking-widest uppercase">TELEMETRY</span>
            </div>
            <span className="text-emerald-400 uppercase text-[9px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="text-center my-auto">
            <div className="text-sm font-bold font-mono tracking-wider text-white/90 line-clamp-1">
              {projectTitle.toUpperCase()}
            </div>
            {company && (
              <div className="text-[10px] font-mono text-slate-400 mt-0.5 line-clamp-1">
                {company}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 border-t border-slate-800/80 pt-1.5">
            <span>ENGINE: UNITY</span>
            <span>STATUS: DEPLOYED</span>
          </div>
        </div>
      );
    }

    // Drawer mode terminal HUD
    return (
      <div
        className={`relative w-full h-48 rounded-xl flex flex-col justify-between p-4 overflow-hidden border border-[#1e293b] ${className}`}
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}, #050811)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#00f3ff]" />
            <span className="text-[#00f3ff] font-bold tracking-widest uppercase">
              TELEMETRY VIEW
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
            <span className="text-[#00ff66] uppercase text-[10px]">VERIFIED ASSET</span>
          </div>
        </div>

        <div className="text-center my-auto">
          <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white/90 drop-shadow-[0_0_12px_rgba(0,243,255,0.4)]">
            {projectTitle.toUpperCase()}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-1">
            {company || 'Independent Project'} &bull; Unity Engine
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
          <span>CORE ENGINE: UNITY & C#</span>
          <span>STATUS: DEPLOYED</span>
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex] || items[0];

  // ---------------------------------------------------------------------------
  // CARD MODE: Compact preview with quick inline navigation controls
  // ---------------------------------------------------------------------------
  if (mode === 'card') {
    return (
      <div
        className={`relative group/carousel w-full h-44 rounded-xl overflow-hidden bg-[#050811] border border-[#1e293b] hover:border-cyan-500/40 transition-colors mb-4 ${className}`}
        onClick={() => onMediaClick?.(currentIndex)}
      >
        {/* Subtle Scanlines Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none z-10" />

        {/* Media Container */}
        <div className="w-full h-full relative flex items-center justify-center bg-black/40">
          {currentItem.type === 'video' ? (
            <video
              key={currentItem.url}
              src={currentItem.url}
              poster={currentItem.thumbnailUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={currentItem.url}
              src={currentItem.url}
              alt={currentItem.alt || currentItem.title || projectTitle}
              loading="lazy"
              className="w-full h-full object-cover will-change-transform"
            />
          )}
        </div>

        {/* Counter & Format Pill (Top Right) */}
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300">
          {currentItem.type === 'gif' ? (
            <Film className="w-3 h-3 text-[#00f3ff]" />
          ) : currentItem.type === 'video' ? (
            <Film className="w-3 h-3 text-[#ff007f]" />
          ) : (
            <ImageIcon className="w-3 h-3 text-slate-400" />
          )}
          {hasMultiple && (
            <span className="font-semibold text-white">
              {currentIndex + 1}/{total}
            </span>
          )}
        </div>

        {/* Mini Navigation Arrows (Visible on Card Hover) */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={playHover}
              aria-label="Previous Slide"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-slate-950/70 hover:bg-cyan-950/90 text-slate-400 hover:text-[#00f3ff] border border-slate-800 hover:border-cyan-500/50 opacity-0 group-hover/carousel:opacity-100 transition-all duration-200"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={playHover}
              aria-label="Next Slide"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-slate-950/70 hover:bg-cyan-950/90 text-slate-400 hover:text-[#00f3ff] border border-slate-800 hover:border-cyan-500/50 opacity-0 group-hover/carousel:opacity-100 transition-all duration-200"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Bottom Dots Indicator */}
            <div className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleSelect(idx, e)}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className={`pointer-events-auto h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-4 bg-[#00f3ff] shadow-[0_0_8px_rgba(0,243,255,0.6)]'
                      : 'w-1.5 bg-slate-600/70 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // DRAWER MODE: Expanded high-res monitor with filmstrip
  // ---------------------------------------------------------------------------
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main CRT Telemetry Monitor */}
      <div className="relative rounded-2xl overflow-hidden bg-[#050811] border border-[#1e293b] shadow-2xl">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.025] to-transparent pointer-events-none z-10" />

        {/* Top Monitor Status Bar */}
        <div className="relative z-20 flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-950/70 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
            <span className="text-[#00f3ff] font-bold tracking-widest uppercase">
              FEED {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-400 uppercase text-[10px] font-semibold">
              {currentItem.type.toUpperCase()} CAPTURE
            </span>
          </div>

          {currentItem.title && (
            <span className="text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-xs text-right">
              {currentItem.title}
            </span>
          )}
        </div>

        {/* Main Display Viewport */}
        <div className="relative w-full h-60 sm:h-72 flex items-center justify-center bg-black/60 overflow-hidden">
          {currentItem.type === 'video' ? (
            <video
              key={currentItem.url}
              src={currentItem.url}
              poster={currentItem.thumbnailUrl}
              autoPlay
              loop
              muted
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              key={currentItem.url}
              src={currentItem.url}
              alt={currentItem.alt || currentItem.title || projectTitle}
              className="w-full h-full object-contain select-none"
            />
          )}

          {/* Navigation Arrows */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                onMouseEnter={playHover}
                aria-label="Previous Slide (Left Arrow)"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl bg-slate-950/80 hover:bg-cyan-950/90 text-slate-300 hover:text-[#00f3ff] border border-slate-800 hover:border-cyan-500/60 shadow-lg backdrop-blur-md transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                onMouseEnter={playHover}
                aria-label="Next Slide (Right Arrow)"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl bg-slate-950/80 hover:bg-cyan-950/90 text-slate-300 hover:text-[#00f3ff] border border-slate-800 hover:border-cyan-500/60 shadow-lg backdrop-blur-md transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Caption Bar (Bottom) - Hidden from UI for now, preserved in data files */}
      </div>

      {/* Filmstrip Mini Thumbnails (Only when multiple items exist) */}
      {hasMultiple && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {items.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={item.id || idx}
                type="button"
                onClick={(e) => handleSelect(idx, e)}
                onMouseEnter={playHover}
                aria-label={`View ${item.title || `Asset ${idx + 1}`}`}
                className={`group relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border transition-all duration-200 ${
                  isSelected
                    ? 'border-[#00f3ff] shadow-[0_0_12px_rgba(0,243,255,0.4)] ring-1 ring-[#00f3ff]'
                    : 'border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                }`}
              >
                {item.type === 'video' && !item.thumbnailUrl ? (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-400">
                    <Film className="w-5 h-5 text-[#ff007f]" />
                  </div>
                ) : (
                  <img
                    src={item.thumbnailUrl || item.url}
                    alt={item.title || `Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <span className="absolute bottom-0.5 right-1 px-1 rounded text-[9px] font-mono bg-black/80 text-slate-300 uppercase">
                  {item.type}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
