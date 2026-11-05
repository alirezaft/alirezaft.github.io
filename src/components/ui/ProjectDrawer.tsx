import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Play,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Cpu,
  Building2,
  Sparkles,
  ArrowUpRight,
  Layers,
  BookOpen,
} from 'lucide-react';
import { GithubIcon } from './recruiter/icons';
import { useUI } from '../../context';
import { useAudio } from '../../audio';

export default function ProjectDrawer() {
  const { isProjectDrawerOpen, selectedProject, closeProject } = useUI();
  const { playHover, playClick } = useAudio();

  if (!selectedProject) return null;

  const project = selectedProject;
  const accentColor = project.cartridgeVisual?.accentColor || '#00f3ff';
  const glowColor = project.cartridgeVisual?.glowColor || 'rgba(0, 243, 255, 0.4)';

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'google-play':
        return <Play className="w-4 h-4 text-[#00ff66]" />;
      case 'github':
        return <GithubIcon className="w-4 h-4 text-slate-300" />;
      case 'itch':
        return <ExternalLink className="w-4 h-4 text-[#ff007f]" />;
      case 'medium':
        return <BookOpen className="w-4 h-4 text-[#ffb700]" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-[#00f3ff]" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'shipped-commercial':
        return 'SHIPPED COMMERCIAL';
      case 'vr-applications':
        return 'VR & SPATIAL APPS';
      case 'open-source':
        return 'OPEN SOURCE';
      case 'tools':
        return 'TOOLS & PLUGINS';
      default:
        return category.toUpperCase();
    }
  };

  return (
    <AnimatePresence>
      {isProjectDrawerOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeProject}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            aria-label={`Case Study: ${project.title}`}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[580px] lg:w-[640px] max-w-full bg-[#070b16]/95 backdrop-blur-2xl border-l border-[#1e293b] shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-slate-200"
          >
            {/* Top Emissive Glow Accent Bar */}
            <div
              className="h-1 w-full shrink-0 transition-colors"
              style={{
                background: `linear-gradient(90deg, ${accentColor}, #ff007f, ${accentColor})`,
                boxShadow: `0 0 16px ${glowColor}`,
              }}
            />

            {/* Decorative Cyber Corners - Uniform Magenta */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ff007f] rounded-tl-sm pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ff007f] rounded-tr-sm pointer-events-none" />

            {/* Drawer Header (Sticky) */}
            <div className="p-6 pb-4 border-b border-[#1e293b]/80 shrink-0">
              <div className="flex items-center justify-between gap-3 mb-3">
                {/* Category & Badge */}
                <div className="flex items-center gap-2">
                  {project.id !== 'a-simple-diagnosis' && (
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-950/60 text-[#00f3ff] border border-cyan-500/30">
                      {getCategoryLabel(project.category)}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-[#ffb700] border border-amber-500/30">
                    {project.statsBadge}
                  </span>
                </div>

                {/* Dismiss Button */}
                <button
                  type="button"
                  onClick={closeProject}
                  onMouseEnter={playHover}
                  aria-label="Close Case Study (Escape)"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition focus:outline-none focus:border-[#ff007f]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight leading-snug">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                {project.subtitle}
              </p>

              {/* Role & Studio Metadata */}
              <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-800/60 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00f3ff]" />
                  <span className="font-semibold text-white">{project.role}</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-300">{project.company}</span>
                </div>
              </div>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Media Preview Monitor */}
              <div className="relative rounded-2xl overflow-hidden bg-[#050811] border border-[#1e293b] shadow-inner p-4">
                {/* Scanline CRT overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />

                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                ) : (
                  /* Cyberpunk Terminal HUD Screen */
                  <div
                    className="relative w-full h-44 rounded-xl flex flex-col justify-between p-4 overflow-hidden"
                    style={{
                      background: `radial-gradient(circle at center, ${project.cartridgeVisual?.primaryColor || '#0a1d2e'}, #050811)`,
                    }}
                  >
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
                      <div className="text-2xl font-black font-mono tracking-wider text-white/90 drop-shadow-[0_0_12px_rgba(0,243,255,0.4)]">
                        {project.title.toUpperCase()}
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-1">
                        {project.company} &bull; Unity Engine
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
                      <span>CORE ENGINE: UNITY & C#</span>
                      <span>STATUS: DEPLOYED</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 1: Executive Overview */}
              <div>
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-800">
                  <Sparkles className="w-4 h-4 text-[#00f3ff]" />
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                    EXECUTIVE OVERVIEW
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Section 2: Key Responsibilities & Shipped Impact (Verified CV) */}
              <div>
                <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff66]" />
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                    RESPONSIBILITIES & ENGINEERING IMPACT
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {project.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start gap-2.5"
                    >
                      <span className="text-[#00f3ff] text-base leading-none mt-0.5">&rsaquo;</span>
                      <p className="text-xs font-mono text-slate-200 leading-relaxed">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Architecture & Tech Stack */}
              <div>
                <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-800">
                  <Layers className="w-4 h-4 text-[#ffb700]" />
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                    TECHNOLOGIES & TOOLING APPLIED
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions (Sticky at bottom) */}
            <div className="p-5 border-t border-[#1e293b] bg-[#070b16]/95 backdrop-blur-xl shrink-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">Verified Project Case Study &bull; </span>
                  <span className="text-[#00ff66]">Direct Link Access</span>
                </div>

                <div className="flex items-center gap-2">
                  {project.links.length > 0 ? (
                    project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        onMouseEnter={playHover}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold text-white bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/50 hover:border-[#00f3ff] shadow-[0_0_14px_rgba(0,243,255,0.25)] hover:shadow-[0_0_20px_rgba(0,243,255,0.45)] transition-all duration-200"
                      >
                        {getLinkIcon(link.type)}
                        <span>{link.label.toUpperCase()}</span>
                      </a>
                    ))
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800">
                      Delisted from Google Play (Archived Title)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
