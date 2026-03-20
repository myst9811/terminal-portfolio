interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
  featured: boolean;
}

export default function ProjectsOutput({
  projects,
  showAll = false,
}: {
  projects: Project[];
  showAll?: boolean;
}) {
  return (
    <div className="font-mono">
      <p className="text-green-400/60 text-xs mb-1">
        {showAll ? 'All Projects' : 'Featured Projects'}
      </p>
      <p className="text-green-500/25 text-xs mb-4">{'─'.repeat(38)}</p>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <div key={project.name} className="group">
            {/* Header row */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-green-500/35 text-[11px] tabular-nums w-5 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-green-400 font-bold text-xs sm:text-sm leading-tight">
                {project.name}
              </span>
              {!project.link && (
                <span className="text-purple-400/55 text-[9px] border border-purple-500/25 rounded px-1 flex-shrink-0">
                  PRIVATE
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-green-300/55 text-[11px] leading-relaxed ml-7 mb-1.5">
              {project.description.length > 130
                ? project.description.slice(0, 127) + '…'
                : project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-x-2 gap-y-0.5 ml-7 mb-1">
              {project.tech.slice(0, 6).map(t => (
                <span key={t} className="text-green-500/45 text-[10px]">
                  #{t.replace(/[\s/]+/g, '')}
                </span>
              ))}
              {project.tech.length > 6 && (
                <span className="text-green-500/25 text-[10px]">
                  +{project.tech.length - 6}
                </span>
              )}
            </div>

            {/* Link */}
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-cyan-400/55 hover:text-cyan-300 text-[10px] ml-7 hover:underline transition-colors"
              >
                ↗ {project.link.replace('https://github.com/', 'github/')}
              </a>
            ) : (
              <span className="text-green-500/25 text-[10px] ml-7">
                available on request
              </span>
            )}

            {/* Separator (not after last) */}
            {i < projects.length - 1 && (
              <div className="mt-3 border-b border-green-500/10" />
            )}
          </div>
        ))}
      </div>

      {!showAll && (
        <p className="text-green-500/30 text-[10px] mt-4">
          Type <span className="text-green-400/50">all-projects</span> to see all projects
        </p>
      )}
    </div>
  );
}
