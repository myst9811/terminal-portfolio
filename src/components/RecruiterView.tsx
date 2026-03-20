'use client';

import { portfolioData } from '../data/portfolio';

interface RecruiterViewProps {
  onSwitchToCLI: () => void;
}

export default function RecruiterView({ onSwitchToCLI }: RecruiterViewProps) {
  const featuredProjects = portfolioData.projects.filter(p => p.featured);

  return (
    <div className="text-green-300 text-xs sm:text-sm font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-green-400 text-base sm:text-lg font-bold">{portfolioData.name}</h2>
          <p className="text-green-300/50 text-[11px] mt-0.5 leading-relaxed">{portfolioData.title}</p>
        </div>
        <button
          onClick={onSwitchToCLI}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-green-500/30 hover:border-green-500/60 rounded text-green-400/70 hover:text-green-400 transition-colors text-xs flex-shrink-0 ml-4"
        >
          ← CLI
        </button>
      </div>

      {/* Projects */}
      <section className="mb-8">
        <h3 className="text-green-400/60 text-[10px] uppercase tracking-widest mb-3 border-b border-green-500/20 pb-2">
          Featured Projects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featuredProjects.map((project) => (
            <div
              key={project.name}
              className="border border-green-500/20 rounded-lg p-3 bg-green-500/5 hover:bg-green-500/8 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="text-green-300 font-bold text-xs sm:text-sm leading-tight">{project.name}</h4>
                {!project.link && (
                  <span className="text-purple-400/70 text-[10px] border border-purple-500/30 rounded px-1 flex-shrink-0">
                    PRIVATE
                  </span>
                )}
              </div>
              <p className="text-green-300/50 text-[11px] leading-relaxed mb-2 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.tech.slice(0, 4).map(t => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-green-400/70">
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-[10px] text-green-500/40 self-center">+{project.tech.length - 4}</span>
                )}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-cyan-400/70 hover:text-cyan-300 text-[10px] hover:underline transition-colors"
                >
                  View on GitHub →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h3 className="text-green-400/60 text-[10px] uppercase tracking-widest mb-3 border-b border-green-500/20 pb-2">
          Experience
        </h3>
        <div className="space-y-3">
          {portfolioData.experience.map((exp) => (
            <div key={exp.organization} className="border-l-2 border-green-500/25 pl-3">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-green-300 font-bold text-xs sm:text-sm">{exp.role}</span>
                <span className="text-green-500/50 text-[10px]">@ {exp.organization}</span>
              </div>
              <p className="text-green-400/40 text-[10px] mb-1">{exp.period}</p>
              <p className="text-green-300/50 text-[11px] leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center border-t border-green-500/20 pt-4">
        <p className="text-green-500/30 text-[10px]">
          Switch to CLI mode to explore commands interactively
        </p>
      </div>
    </div>
  );
}
