import { Download, Mail, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { useUI } from '../../../context';
import { useAudio } from '../../../audio';
import { PROFILE_BIO } from '../../../content/profile/bio';

export default function RecruiterHeader() {
  const { triggerResumeDownload, isResumeDownloading } = useUI();
  const { playHover, playClick } = useAudio();

  return (
    <div className="relative p-5 sm:p-7 rounded-2xl bg-[#0b1120]/90 border border-[#1e293b] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md mb-6">
      {/* Decorative Cyber Corner Accents - Uniform Magenta */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff007f] rounded-tl-sm pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff007f] rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff007f] rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff007f] rounded-br-sm pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Developer Identity & Core Value Prop */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
              {PROFILE_BIO.fullName}
            </h1>
          </div>

          <p className="text-sm sm:text-base font-mono text-[#00f3ff] font-semibold flex items-center gap-2">
            <span>{PROFILE_BIO.headline}</span>
          </p>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <Award className="w-3.5 h-3.5 text-[#ffb700]" />
              <span className="font-semibold text-[#ffb700]">50M+</span>
              <span className="text-slate-400">Shipped Players</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#00ff66]" />
              <span className="font-semibold text-white">5+ Years</span>
              <span className="text-slate-400">Unity & C#</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-300">Mashhad, Iran (Open to Remote)</span>
            </div>
          </div>

          {/* Quick Social & Contact Channels */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono">
            <a
              href="https://github.com/alirezaft"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-[#00f3ff] hover:border-cyan-500/40 transition"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>alirezaft</span>
            </a>

            <a
              href="https://linkedin.com/in/alirezaft"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-[#00f3ff] hover:border-cyan-500/40 transition"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:alirezaft98@gmail.com"
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-[#00f3ff] hover:border-cyan-500/40 transition"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>alirezaft98@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Right Column: Prominent 1-Click Resume Download Button */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2">
          <button
            type="button"
            onClick={triggerResumeDownload}
            onMouseEnter={playHover}
            title="Download verified Alireza Forghani Toosi Resume PDF"
            className={`group relative flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition-all duration-300 select-none ${
              isResumeDownloading
                ? 'bg-cyan-500 text-black border-2 border-[#00f3ff] shadow-[0_0_30px_rgba(0,243,255,0.8)] scale-[1.02]'
                : 'bg-cyan-950/60 hover:bg-cyan-900/50 text-[#00f3ff] hover:text-white border border-[#00f3ff] hover:border-cyan-400 shadow-[0_0_16px_rgba(0,243,255,0.3)] hover:shadow-[0_0_24px_rgba(0,243,255,0.5)] active:scale-[0.98]'
            }`}
          >
            <Download
              className={`w-4 h-4 transition-transform duration-200 ${
                isResumeDownloading ? 'animate-bounce text-black' : 'group-hover:-translate-y-0.5 text-[#00f3ff]'
              }`}
            />
            <span>
              {isResumeDownloading ? 'FETCHING RESUME...' : 'DOWNLOAD RESUME (PDF)'}
            </span>
          </button>

          <div className="flex items-center justify-center lg:justify-end gap-1.5 text-[11px] font-mono text-slate-400">
            <CheckCircle2 className="w-3 h-3 text-[#00ff66]" />
            <span>Updated 2026 &bull; Direct 1-Click Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
