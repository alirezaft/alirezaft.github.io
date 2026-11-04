import { Cpu, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';
import { SKILL_CIRCUIT_COMPONENTS, type SkillChip } from '../../../content/skills';
import { useUI } from '../../../context';
import { useAudio } from '../../../audio';
import { getProjectById } from '../../../content/projects';

export default function RecruiterSkillsView() {
  const { openSkill, openProject } = useUI();
  const { playHover } = useAudio();

  const getTierLabel = (level: number) => {
    switch (level) {
      case 1:
        return 'TIER 1 // CORE CENTRAL PROCESSOR';
      case 2:
        return 'TIER 2 // MAJOR ENGINEERING ICs';
      case 3:
        return 'TIER 3 // PLATFORMS & SPECIALIZATIONS';
      default:
        return 'TIER 4 // WORKFLOW & INFRASTRUCTURE';
    }
  };

  const tiers = [1, 2, 3, 4];

  return (
    <div className="space-y-8">
      {tiers.map((tierLevel) => {
        const chips = SKILL_CIRCUIT_COMPONENTS.filter((c) => c.importanceLevel === tierLevel);
        if (chips.length === 0) return null;

        return (
          <div key={tierLevel}>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
              <Zap className="w-4 h-4 text-[#ffb700]" />
              <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-300">
                {getTierLabel(tierLevel)}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chips.map((chip: SkillChip) => (
                <div
                  key={chip.id}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#0b1120]/80 border border-[#1e293b] hover:border-[#00f3ff]/50 shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Header: Socket Footprint & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                        {chip.specs.footprint}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                        style={{
                          backgroundColor: `${chip.circuitColor}15`,
                          color: chip.circuitColor,
                          borderColor: `${chip.circuitColor}30`,
                          borderWidth: '1px',
                        }}
                      >
                        {chip.specs.status}
                      </span>
                    </div>

                    {/* Chip Name */}
                    <h3 className="text-base font-bold font-mono text-white group-hover:text-[#00f3ff] transition-colors mb-1.5 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#00f3ff] shrink-0" />
                      <span>{chip.name}</span>
                    </h3>

                    {/* Summary */}
                    <p className="text-xs font-mono text-slate-300 leading-relaxed mb-3">
                      {chip.summary}
                    </p>

                    {/* Real-World Impact Metric */}
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 mb-4">
                      <div className="flex items-start gap-1.5 text-[11px] font-mono text-[#00ff66]">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#00ff66]" />
                        <span className="font-medium">{chip.realWorldImpact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cross-Linked Projects */}
                  <div>
                    {chip.linkedProjectIds.length > 0 && (
                      <div className="pt-3 border-t border-slate-800/80">
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                          Deployed In Shipped Games:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {chip.linkedProjectIds.map((projId) => {
                            const project = getProjectById(projId);
                            if (!project) return null;

                            return (
                              <button
                                key={projId}
                                type="button"
                                onClick={() => openProject(projId)}
                                onMouseEnter={playHover}
                                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono text-[#00f3ff] bg-cyan-950/30 hover:bg-cyan-950/70 border border-cyan-500/30 hover:border-[#00f3ff] transition"
                              >
                                <span>{project.title}</span>
                                <ArrowUpRight className="w-2.5 h-2.5" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Inspect Telemetry Button */}
                    <button
                      type="button"
                      onClick={() => openSkill(chip.id)}
                      onMouseEnter={playHover}
                      className="w-full mt-3 py-1.5 rounded-lg text-center font-mono text-[11px] font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition"
                    >
                      INSPECT TELEMETRY &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
