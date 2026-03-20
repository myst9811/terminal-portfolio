interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export default function ExperienceOutput({ experience }: { experience: Experience[] }) {
  return (
    <div className="font-mono">
      <p className="text-green-400/60 text-xs mb-1">Experience</p>
      <p className="text-green-500/25 text-xs mb-4">{'─'.repeat(38)}</p>

      <div className="space-y-5">
        {experience.map((exp, i) => {
          const lines = exp.description.split('\n').filter(l => l.trim());
          const summary = lines[0];
          const bullets = lines.slice(1).filter(l => l.trim());

          return (
            <div key={`${exp.organization}-${i}`} className="border-l-2 border-green-500/20 pl-3">
              {/* Role + org */}
              <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 mb-0.5">
                <span className="text-green-500/35 text-[10px] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-green-400 font-bold text-xs sm:text-sm leading-tight">
                  {exp.role}
                </span>
              </div>
              <p className="text-green-500/45 text-[10px] mb-0.5">
                @ {exp.organization}
              </p>
              <p className="text-green-400/30 text-[10px] mb-2">{exp.period}</p>

              {/* Summary line */}
              <p className="text-green-300/45 text-[11px] italic mb-1.5 leading-relaxed">
                {summary.replace(/:$/, '')}
              </p>

              {/* Bullet points */}
              {bullets.length > 0 && (
                <ul className="space-y-1">
                  {bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-green-300/60 text-[11px] leading-relaxed flex gap-1.5"
                    >
                      <span className="text-green-500/35 flex-shrink-0 mt-0.5">·</span>
                      <span>{bullet.replace(/^[•·]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
