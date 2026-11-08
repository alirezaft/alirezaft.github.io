import { BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { TRANSMISSIONS } from '../../../content/profile/transmissions';
import { useAudio } from '../../../audio';

export default function RecruiterTransmissionsView() {
  const { playHover, playClick } = useAudio();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-800">
        <BookOpen className="w-4 h-4 text-[#ffb700]" />
        <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-white">
          TECHNICAL WRITING & KNOWLEDGE SHARING
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TRANSMISSIONS.map((item) => (
          <div
            key={item.id}
            onMouseEnter={playHover}
            className="p-6 rounded-2xl bg-[#0b1120]/80 border border-[#1e293b] hover:border-amber-500/40 shadow-md flex flex-col justify-between transition-[border-color] duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-[#ffb700] border border-amber-500/30">
                  {item.platform}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </span>
              </div>

              <h3 className="text-base font-bold font-mono text-white mb-2">
                {item.title}
              </h3>

              <p className="text-xs font-mono text-slate-300 leading-relaxed mb-4">
                {item.summary}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold text-[#ffb700] bg-amber-950/30 hover:bg-amber-950/70 border border-amber-500/40 hover:border-[#ffb700] transition"
                >
                  <span>READ ON {item.platform.toUpperCase()}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
