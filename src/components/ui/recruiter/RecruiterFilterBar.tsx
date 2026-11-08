import { Search, X } from 'lucide-react';
import { useUI } from '../../../context';
import { useAudio } from '../../../audio';
import { ALL_PROJECTS, type ProjectCategory } from '../../../content/projects';

interface CategoryOption {
  id: ProjectCategory | 'all';
  label: string;
  count: number;
}

export default function RecruiterFilterBar() {
  const {
    recruiterCategory,
    setRecruiterCategory,
    recruiterSearchQuery,
    setRecruiterSearchQuery,
  } = useUI();
  const { playHover, playClick } = useAudio();

  const categories: CategoryOption[] = [
    {
      id: 'all',
      label: 'ALL',
      count: ALL_PROJECTS.length,
    },
    {
      id: 'shipped-commercial',
      label: 'SHIPPED COMMERCIAL',
      count: ALL_PROJECTS.filter((p) => p.category === 'shipped-commercial').length,
    },
    {
      id: 'indie',
      label: 'INDIE GAMES',
      count: ALL_PROJECTS.filter((p) => p.category === 'indie').length,
    },
    {
      id: 'vr-applications',
      label: 'VR & SPATIAL',
      count: ALL_PROJECTS.filter((p) => p.category === 'vr-applications').length,
    },
    {
      id: 'open-source',
      label: 'OPEN SOURCE',
      count: ALL_PROJECTS.filter((p) => p.category === 'open-source').length,
    },
    {
      id: 'tools',
      label: 'TOOLS & PLUGINS',
      count: ALL_PROJECTS.filter((p) => p.category === 'tools').length,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 mb-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
        {categories.map((cat) => {
          const isSelected = recruiterCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setRecruiterCategory(cat.id);
                playClick();
              }}
              onMouseEnter={playHover}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-medium whitespace-nowrap transition-[color,border-color,box-shadow,background-color] duration-200 select-none ${
                isSelected
                  ? 'bg-pink-950/50 text-[#ff007f] border border-[#ff007f] shadow-[0_0_12px_rgba(255,0,127,0.3)]'
                  : 'bg-[#0b1120]/70 text-slate-400 hover:text-slate-200 border border-[#1e293b] hover:border-slate-700'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isSelected
                    ? 'bg-pink-500/20 text-[#ff007f]'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Text Search Input */}
      <div className="relative w-full lg:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={recruiterSearchQuery}
          onChange={(e) => setRecruiterSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#0b1120]/80 border border-[#1e293b] text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00f3ff] focus:shadow-[0_0_12px_rgba(0,243,255,0.25)] transition"
        />
        {recruiterSearchQuery && (
          <button
            type="button"
            onClick={() => {
              setRecruiterSearchQuery('');
              playClick();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
