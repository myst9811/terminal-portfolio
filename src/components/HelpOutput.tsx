const COMMANDS = [
  { name: 'about', desc: 'Learn about me' },
  { name: 'skills', desc: 'View my technical skills' },
  { name: 'projects', desc: 'See my featured projects' },
  { name: 'all-projects', desc: 'View all projects' },
  { name: 'experience', desc: 'My work experience' },
  { name: 'education', desc: 'My educational background' },
  { name: 'contact', desc: 'Get my contact information' },
  { name: 'social', desc: 'View my social media links' },
  { name: 'resume', desc: 'Download my resume' },
  { name: 'achievements', desc: 'View my achievements' },
  { name: 'clear', desc: 'Clear the terminal' },
  { name: 'banner', desc: 'Display welcome banner' },
  { name: 'weather', desc: '...' },
];

export default function HelpOutput({ onCommand }: { onCommand: (cmd: string) => void }) {
  return (
    <div className="font-mono">
      <p className="text-green-400 mb-1">Available Commands:</p>
      <p className="text-green-500/40 mb-3 text-xs">──────────────────────────────────────</p>
      <div className="space-y-1.5">
        {COMMANDS.map(({ name, desc }) => (
          <div key={name} className="flex gap-3">
            <button
              onClick={() => onCommand(name)}
              className="text-cyan-400 hover:text-cyan-200 hover:underline w-28 text-left flex-shrink-0 transition-colors text-xs sm:text-sm"
            >
              {name}
            </button>
            <span className="text-green-300/60 text-xs sm:text-sm">— {desc}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-green-500/40 text-xs">Tab for autocomplete · ↑/↓ for command history</p>
    </div>
  );
}
