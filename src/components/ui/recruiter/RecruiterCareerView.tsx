import { Briefcase, Calendar, MapPin, GraduationCap, CheckCircle2 } from 'lucide-react';
import { CAREER_TIMELINE, EDUCATION_DATA } from '../../../content/profile/experience';
import { useAudio } from '../../../audio';

export default function RecruiterCareerView() {
  const { playHover } = useAudio();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Work Experience Timeline */}
      <div>
        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-800">
          <Briefcase className="w-4 h-4 text-[#00f3ff]" />
          <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-white">
            PRODUCTION WORK EXPERIENCE
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#00f3ff] before:via-[#ff007f] before:to-slate-800">
          {CAREER_TIMELINE.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={playHover}
              className="relative p-6 rounded-2xl bg-[#0b1120]/80 border border-[#1e293b] hover:border-slate-700 shadow-md transition-all duration-200"
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full border-2 ${
                  exp.isCurrent
                    ? 'bg-[#00f3ff] border-cyan-400 shadow-[0_0_12px_rgba(0,243,255,0.8)] animate-pulse'
                    : 'bg-[#0b1120] border-slate-600'
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-mono text-[#00f3ff] font-medium">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Key Metric Highlight */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[#ffb700] text-xs font-mono font-semibold mb-4">
                <span>⚡ {exp.keyMetricHighlight}</span>
              </div>

              {/* Detailed Responsibilities Bullets */}
              <ul className="space-y-2 mb-5">
                {exp.bulletPoints.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300 leading-relaxed">
                    <span className="text-[#00f3ff] mt-0.5 shrink-0">&rsaquo;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-800">
          <GraduationCap className="w-4 h-4 text-[#ff007f]" />
          <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-white">
            FORMAL EDUCATION
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b1120]/80 border border-[#1e293b]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h3 className="text-base font-bold font-mono text-white">
                {EDUCATION_DATA.degree}
              </h3>
              <div className="text-xs font-mono text-[#ff007f] font-medium">
                Field: {EDUCATION_DATA.field}
              </div>
              <div className="text-sm font-mono text-slate-300 mt-1">
                {EDUCATION_DATA.institution}
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{EDUCATION_DATA.period}</span>
              </div>
              <div className="text-slate-500">Mashhad, Iran</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-800 text-xs font-mono text-[#00ff66]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Graduated with focus on Computer Networks, Algorithms, and Software Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
}
