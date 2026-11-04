import { Layers, Cpu, Briefcase, BookOpen } from 'lucide-react';
import { useUI, type RecruiterTab } from '../../../context';
import { useAudio } from '../../../audio';
import { ALL_PROJECTS } from '../../../content/projects';
import { SKILL_CIRCUIT_COMPONENTS } from '../../../content/skills';

interface TabItem {
  id: RecruiterTab;
  label: string;
  badge?: number | string;
  icon: typeof Layers;
}

const TABS: TabItem[] = [
  {
    id: 'projects',
    label: 'PROJECTS',
    badge: ALL_PROJECTS.length,
    icon: Layers,
  },
  {
    id: 'skills',
    label: 'SKILL CIRCUITS',
    badge: SKILL_CIRCUIT_COMPONENTS.length,
    icon: Cpu,
  },
  {
    id: 'experience',
    label: 'CAREER LOG',
    icon: Briefcase,
  },
  {
    id: 'transmissions',
    label: 'PUBLICATIONS',
    icon: BookOpen,
  },
];

export default function RecruiterTabs() {
  const { activeRecruiterTab, setActiveRecruiterTab } = useUI();
  const { playHover } = useAudio();

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0b1120]/80 border border-[#1e293b] backdrop-blur-md overflow-x-auto no-scrollbar mb-4">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeRecruiterTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveRecruiterTab(tab.id)}
            onMouseEnter={playHover}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-medium whitespace-nowrap transition-all duration-200 select-none ${
              isActive
                ? 'bg-cyan-950/60 text-[#00f3ff] border border-[#00f3ff] shadow-[0_0_12px_rgba(0,243,255,0.25)]'
                : 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-800/40'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00f3ff]' : 'text-slate-500'}`} />
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isActive
                    ? 'bg-cyan-500/20 text-[#00f3ff]'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
