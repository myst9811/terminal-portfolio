import { portfolioData, asciiArt } from '../data/portfolio';
import type { Command, CommandOutput } from '../types';
import HelpOutput from '../components/HelpOutput';
import ProjectsOutput from '../components/ProjectsOutput';
import ExperienceOutput from '../components/ExperienceOutput';

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
    execute: () => ({
      type: 'component' as const,
      content: <ProjectsOutput projects={portfolioData.projects.filter(p => p.featured)} showAll={false} />,
    }),
  },

  'all-projects': {
    name: 'all-projects',
    description: 'View all projects',
    execute: () => ({
      type: 'component' as const,
      content: <ProjectsOutput projects={portfolioData.projects} showAll={true} />,
    }),
  },

  experience: {
    name: 'experience',
    description: 'My work experience',
    execute: () => ({
      type: 'component' as const,
      content: <ExperienceOutput experience={portfolioData.experience} />,
    }),
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
