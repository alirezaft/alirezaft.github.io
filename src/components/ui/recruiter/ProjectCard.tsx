import { ArrowUpRight, Play, ExternalLink, Code2 } from 'lucide-react';
import { GithubIcon } from './icons';
import { type Project } from '../../../content/projects';
import { useUI } from '../../../context';
import { useAudio } from '../../../audio';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { openProject } = useUI();
  const { playHover } = useAudio();

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'google-play':
        return <Play className="w-3.5 h-3.5 text-[#00ff66]" />;
      case 'github':
        return <GithubIcon className="w-3.5 h-3.5 text-slate-300" />;
      case 'itch':
        return <ExternalLink className="w-3.5 h-3.5 text-[#ff007f]" />;
      default:
        return <ArrowUpRight className="w-3.5 h-3.5 text-[#00f3ff]" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#0b1120]/90 border border-[#1e293b] hover:border-cyan-500/50 shadow-lg hover:shadow-[0_8px_30px_rgba(0,243,255,0.12)] transition-all duration-300 backdrop-blur-md">
      {/* Top Cyber Emissive Accent Line */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] transition-opacity duration-300 opacity-60 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.cartridgeVisual.glowColor}, transparent)`,
        }}
      />

      {/* Card Content Top */}
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400">
            {project.cartridgeVisual.serialNumber}
          </span>

          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-[#ffb700] border border-amber-500/30">
            {project.statsBadge}
          </span>
        </div>

        {/* Project Title & Role */}
        <h3 className="text-lg font-bold font-mono text-white group-hover:text-[#00f3ff] transition-colors mb-1">
          {project.title}
        </h3>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <span className="text-slate-300">{project.role}</span>
          <span>&bull;</span>
          <span className="text-slate-400">{project.company}</span>
          <span>&bull;</span>
          <span className="text-slate-500">{project.year}</span>
        </div>

        {/* Overview snippet */}
        <p className="text-xs font-mono text-slate-300 line-clamp-2 leading-relaxed mb-3">
          {project.overview}
        </p>

        {/* Key Responsibilities / Production Impact */}
        <div className="space-y-1 mb-4 pt-2 border-t border-slate-800/80">
          {project.responsibilities.slice(0, 2).map((resp, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] font-mono text-slate-400 leading-snug">
              <span className="text-[#00f3ff] mt-0.5">&rsaquo;</span>
              <span className="line-clamp-1">{resp}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techTags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 text-slate-300 border border-slate-800"
            >
              {tag}
            </span>
          ))}
          {project.techTags.length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-500">
              +{project.techTags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800">
        {/* Main Details Button */}
        <button
          type="button"
          onClick={() => openProject(project.id)}
          onMouseEnter={playHover}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold text-[#00f3ff] bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-500/40 hover:border-[#00f3ff] transition-all duration-200"
        >
          <Code2 className="w-3.5 h-3.5 text-[#00f3ff]" />
          <span>TECH SPECS</span>
          <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* External Links */}
        <div className="flex items-center gap-1.5">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              title={`${link.label}: ${link.url}`}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
            >
              {getLinkIcon(link.type)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
