import {
  Code2,
  Boxes,
  Globe,
  Wrench,
  LineChart,
  Bot,
  Plug,
  GitBranch,
  GraduationCap,
  Users,
  Gamepad2,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { SKILL_CIRCUIT_COMPONENTS, type SkillChip } from '../../../content/skills';
import { useUI } from '../../../context';
import { useAudio } from '../../../audio';
import { getProjectById } from '../../../content/projects';

interface SkillGroup {
  title: string;
  subtitle: string;
  icon: typeof Code2;
  skillIds: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Core Game Engine & Architecture',
    subtitle: 'Production C#, game loop architecture, and multi-platform deployment',
    icon: Code2,
    skillIds: ['unity-engine-core', 'clean-architecture-solid', 'webgl-porting-js-wrappers'],
  },
  {
    title: 'Editor Tooling & Game Design',
    subtitle: 'Workflow optimization, custom designer tools, and data-driven game balancing',
    icon: Wrench,
    skillIds: ['game-design', 'custom-editor-ui-toolkit', 'telemetry-game-design'],
  },
  {
    title: 'AI Engineering, SDKs & Infrastructure',
    subtitle: 'Agentic development pipelines, analytics telemetry, and source control',
    icon: Bot,
    skillIds: ['agentic-ai-llm-workflows', 'mobile-sdks-analytics', 'git-version-control'],
  },
  {
    title: 'Teaching, Mentorship & Collaboration',
    subtitle: 'University workshops, candidate technical evaluation, and sprint velocity',
    icon: GraduationCap,
    skillIds: ['mentoring-workshops', 'agile-scrum-leadership'],
  },
];

export default function RecruiterSkillsView() {
  const { openProject } = useUI();
  const { playHover, playClick } = useAudio();

  const getSkillIcon = (id: string) => {
    switch (id) {
      case 'unity-engine-core':
        return <Code2 className="w-4 h-4 text-[#00f3ff]" />;
      case 'clean-architecture-solid':
        return <Boxes className="w-4 h-4 text-[#ff007f]" />;
      case 'custom-editor-ui-toolkit':
        return <Wrench className="w-4 h-4 text-[#ffb700]" />;
      case 'game-design':
        return <Gamepad2 className="w-4 h-4 text-[#10b981]" />;
      case 'agentic-ai-llm-workflows':
        return <Bot className="w-4 h-4 text-[#ec4899]" />;
      case 'webgl-porting-js-wrappers':
        return <Globe className="w-4 h-4 text-[#38bdf8]" />;
      case 'mobile-sdks-analytics':
        return <Plug className="w-4 h-4 text-[#a855f7]" />;
      case 'telemetry-game-design':
        return <LineChart className="w-4 h-4 text-[#f43f5e]" />;
      case 'git-version-control':
        return <GitBranch className="w-4 h-4 text-slate-300" />;
      case 'mentoring-workshops':
        return <GraduationCap className="w-4 h-4 text-[#ffb700]" />;
      case 'agile-scrum-leadership':
        return <Users className="w-4 h-4 text-[#94a3b8]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#00f3ff]" />;
    }
  };

  return (
    <div className="space-y-10">
      {SKILL_GROUPS.map((group) => {
        const skills = group.skillIds
          .map((id) => SKILL_CIRCUIT_COMPONENTS.find((s) => s.id === id))
          .filter((s): s is SkillChip => Boolean(s));

        if (skills.length === 0) return null;

        const GroupIcon = group.icon;

        return (
          <div key={group.title} className="space-y-4">
            {/* Group Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <GroupIcon className="w-4 h-4 text-[#00f3ff]" />
                <h2 className="text-sm font-mono font-bold tracking-wider uppercase text-white">
                  {group.title}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {group.subtitle}
              </span>
            </div>

            {/* Skills Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#0b1120]/90 border border-[#1e293b] hover:border-cyan-500/50 shadow-md hover:shadow-[0_8px_30px_rgba(0,243,255,0.08)] transition-[border-color,box-shadow] duration-300"
                >
                  <div>
                    {/* Header: Skill Name & Icon */}
                    <div className="flex items-start gap-2.5 mb-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                        {getSkillIcon(skill.id)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold font-mono text-white group-hover:text-[#00f3ff] transition-colors leading-snug">
                          {skill.name}
                        </h3>
                      </div>
                    </div>

                    {/* Detailed Explanation / Summary */}
                    <p className="text-xs font-mono text-slate-300 leading-relaxed mb-4">
                      {skill.summary}
                    </p>

                    {/* Key Production Impact */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-4">
                      <div className="flex items-start gap-2 text-xs font-mono text-[#00ff66]">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#00ff66]" />
                        <span className="font-medium leading-snug">{skill.realWorldImpact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipped Titles & Projects Cross-Links */}
                  {skill.linkedProjectIds.length > 0 && (
                    <div className="pt-3 border-t border-slate-800/80">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                        Demonstrated In Projects:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.linkedProjectIds.map((projId) => {
                          const project = getProjectById(projId);
                          if (!project) return null;

                          return (
                            <button
                              key={projId}
                              type="button"
                              onClick={() => {
                                openProject(projId);
                                playClick();
                              }}
                              onMouseEnter={playHover}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#00f3ff] bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-500/30 hover:border-[#00f3ff] transition-all"
                            >
                              <span>{project.title}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
