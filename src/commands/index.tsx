import { portfolioData, asciiArt } from '../data/portfolio';
import type { Command, CommandOutput } from '../types';
import HelpOutput from '../components/HelpOutput';

const projectCard = (project: typeof portfolioData.projects[0], index: number): string => {
  const W = 50;
  const row = (s: string) => `│ ${s.slice(0, W - 2).padEnd(W - 2)} │`;
  const num = String(index + 1).padStart(2, '0');
  const badge = project.link ? '' : ' [PRIVATE]';
  const nameHeader = `${num}  ${project.name}${badge}`;
  const desc = project.description;
  // word-wrap description into lines of W-2 chars
  const maxLineLen = W - 2;
  const words = desc.split(' ');
  const descLines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxLineLen) {
      current = candidate;
    } else {
      if (current) descLines.push(current);
      current = word;
      if (descLines.length >= 2) { current = current + '…'; break; }
    }
  }
  if (current && descLines.length < 3) descLines.push(current);

  const techStr = project.tech.slice(0, 4).join(' · ') + (project.tech.length > 4 ? ` +${project.tech.length - 4}` : '');
  const linkStr = project.link
    ? project.link.replace('https://github.com/', 'github.com/')
    : 'Private — available on request';

  return [
    `┌${'─'.repeat(W)}┐`,
    row(nameHeader),
    `├${'─'.repeat(W)}┤`,
    ...descLines.map(l => row(l)),
    row(''),
    row(`Stack  ${techStr}`),
    row(`Link   ${linkStr}`),
    `└${'─'.repeat(W)}┘`,
  ].join('\n');
};

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Display available commands',
    execute: () => ({
      type: 'component' as const,
      content: (onCommand: (cmd: string) => void) => <HelpOutput onCommand={onCommand} />,
    }),
  },

  banner: {
    name: 'banner',
    description: 'Display welcome banner',
    execute: () => ({
      type: 'text',
      content: asciiArt,
    }),
  },

  about: {
    name: 'about',
    description: 'Learn about me',
    execute: () => ({
      type: 'text',
      content: `
${portfolioData.name}
${portfolioData.title}
${portfolioData.location}

${portfolioData.about}
      `,
    }),
  },

  skills: {
    name: 'skills',
    description: 'View my technical skills',
    execute: () => {
      const { skills } = portfolioData;
      return {
        type: 'text',
        content: `
Technical Skills:
----------------

Programming Languages:
  ${skills.languages.join(', ')}

AI/ML & Data Science:
  ${skills.aiml.join(', ')}

Data Engineering:
  ${skills.dataengineering.join(', ')}

Blockchain & Web3:
  ${skills.blockchain.join(', ')}

Frontend Development:
  ${skills.frontend.join(', ')}

Backend Development:
  ${skills.backend.join(', ')}

Tools & Technologies:
  ${skills.tools.join(', ')}

Mathematics & Algorithms:
  ${skills.mathematics.join(', ')}
        `,
      };
    },
  },

  projects: {
    name: 'projects',
    description: 'See featured projects',
    execute: () => {
      const featuredProjects = portfolioData.projects.filter(p => p.featured);
      const cards = featuredProjects.map((p, i) => projectCard(p, i)).join('\n\n');
      return {
        type: 'text',
        content: `
Featured Projects:
-----------------

${cards}

Type 'all-projects' to see all projects.
        `,
      };
    },
  },

  'all-projects': {
    name: 'all-projects',
    description: 'View all projects',
    execute: () => {
      const cards = portfolioData.projects.map((p, i) => projectCard(p, i)).join('\n\n');
      return {
        type: 'text',
        content: `
All Projects:
------------

${cards}
        `,
      };
    },
  },

  experience: {
    name: 'experience',
    description: 'My work experience',
    execute: () => {
      const expList = portfolioData.experience.map((exp, index) => `
${index + 1}. ${exp.role} at ${exp.organization}
   Period: ${exp.period}
   ${exp.description}
      `).join('\n');

      return {
        type: 'text',
        content: `
Experience:
----------
${expList}
        `,
      };
    },
  },

  education: {
    name: 'education',
    description: 'My educational background',
    execute: () => {
      const eduList = portfolioData.education.map((edu, index) => `
${index + 1}. ${edu.degree}
   ${edu.institution}
   Period: ${edu.period}
   ${edu.description}
      `).join('\n');

      return {
        type: 'text',
        content: `
Education:
---------
${eduList}
        `,
      };
    },
  },

  contact: {
    name: 'contact',
    description: 'Get my contact information',
    execute: () => ({
      type: 'text',
      content: `
Contact Information:
-------------------
  Email:    ${portfolioData.contact.email}
  Phone:    ${portfolioData.contact.phoneNo}
  Location: ${portfolioData.contact.location}
  GitHub:   https://github.com/${portfolioData.contact.github}

Feel free to reach out!
      `,
    }),
  },

  social: {
    name: 'social',
    description: 'View my social media links',
    execute: () => ({
      type: 'text',
      content: `
Social Media:
------------
  GitHub:    ${portfolioData.social.github}
  LinkedIn:  ${portfolioData.social.linkedin}
  Instagram: ${portfolioData.social.instagram}
      `,
    }),
  },

  resume: {
    name: 'resume',
    description: 'Download my resume',
    execute: () => {
      if (portfolioData.resume) {
        if (typeof window !== 'undefined') {
          window.open(portfolioData.resume, '_blank');
        }
        return {
          type: 'text',
          content: `
✓ Opening resume in a new tab...

Resume URL: ${portfolioData.resume}

If the resume didn't open, you can access it directly at the link above.
          `,
        };
      }
      return {
        type: 'text',
        content: `
✗ Resume not available yet.

Please add your resume link in src/data/portfolio.ts
        `,
      };
    },
  },

  achievements: {
    name: 'achievements',
    description: 'View my achievements',
    execute: () => {
      const achievementList = portfolioData.achievements.map((achievement, index) =>
        `  ${index + 1}. ${achievement}`
      ).join('\n');

      return {
        type: 'text',
        content: `
Achievements:
------------
${achievementList}
        `,
      };
    },
  },

  clear: {
    name: 'clear',
    description: 'Clear the terminal',
    execute: () => ({
      type: 'text',
      content: 'CLEAR_COMMAND',
    }),
  },

  // Easter eggs
  sudo: {
    name: 'sudo',
    description: '',
    execute: () => ({
      type: 'error' as const,
      content: `sudo: Permission denied.
This is a portfolio, not a production server.
I've already root-caused your curiosity, though — nice try.

Hint: try 'weather' instead.`,
    }),
  },

  'sudo rm -rf /': {
    name: 'sudo rm -rf /',
    description: '',
    execute: () => ({
      type: 'error' as const,
      content: `[sudo] password for visitor: ************
rm: cannot remove '/': Permission denied
rm: cannot remove '/usr': Permission denied
rm: cannot remove '/home/shannen/projects': Access denied by portfolio administrator
rm: cannot remove '/coffee': File not found (tragic)

Operation failed. System integrity preserved.
Nice try, though. +10 points for audacity.`,
    }),
  },

  weather: {
    name: 'weather',
    description: '',
    execute: () => ({
      type: 'text' as const,
      content: `
Weather Report — Mumbai, India
──────────────────────────────
Condition:    Existentially Humid
Temperature:  35°C (feels like 47°C with deadline sweat)
Humidity:     98% (it's basically soup outside)
Wind:         Rickshaw exhaust, 12 km/h WSW
Visibility:   Low (monsoon + smog combo pack)
Forecast:     Overcast with a chance of power cuts

📡 Data source: my window and general suffering
      `,
    }),
  },
};

export const getCommand = (commandName: string): Command | null => {
  const normalized = commandName.toLowerCase().trim();
  // Exact match first
  if (commands[normalized]) return commands[normalized];
  // Prefix match — only for single-word inputs (avoid matching 'sudo' prefix for 'sudo rm -rf /')
  if (!normalized.includes(' ')) {
    const matches = Object.keys(commands).filter(k => k.startsWith(normalized) && !k.includes(' '));
    if (matches.length === 1) return commands[matches[0]];
  }
  return null;
};

export const getAllCommandNames = (): string[] => {
  // Exclude easter eggs and space-containing keys from autocomplete/help
  return Object.keys(commands).filter(k => !k.includes(' ') && !['sudo', 'weather'].includes(k));
};
