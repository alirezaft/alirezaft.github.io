import { Search } from 'lucide-react';
import { useUI } from '../../../context';
import RecruiterFilterBar from './RecruiterFilterBar';
import ProjectCard from './ProjectCard';

export default function RecruiterProjectsView() {
  const { filteredProjects, setRecruiterSearchQuery, setRecruiterCategory } = useUI();

  return (
    <div>
      <RecruiterFilterBar />

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#0b1120]/60 border border-[#1e293b]">
          <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-mono font-bold text-white mb-1">
            No projects matched your criteria
          </h3>
          <p className="text-xs font-mono text-slate-400 mb-4">
            Try adjusting your search query or reset your category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setRecruiterSearchQuery('');
              setRecruiterCategory('all');
            }}
            className="px-4 py-2 rounded-lg font-mono text-xs text-[#00f3ff] bg-cyan-950/40 border border-cyan-500/40 hover:border-[#00f3ff] transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
