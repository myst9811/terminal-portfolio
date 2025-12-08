import { portfolioData, asciiArt } from '../data/portfolio';
import type { Command, CommandOutput } from '../types';

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Display available commands',
    execute: () => ({
      type: 'text',
      content: `
Available Commands:
------------------
  help         - Show this help message
  about        - Learn about me
  skills       - View my technical skills
  projects     - See my featured projects
  all-projects - View all projects
  experience   - My work experience
  education    - My educational background
  contact      - Get my contact information
  social       - View my social media links
  resume       - Download my resume
  achievements - View my achievements
  clear        - Clear the terminal
  banner       - Display welcome banner

Tip: Use Tab for auto-complete and ↑/↓ arrows for command history
      `,
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
      const projectList = featuredProjects.map((project, index) => `
${index + 1}. ${project.name}
   ${project.description}
   Tech: ${project.tech.join(', ')}
   Link: ${project.link}
      `).join('\n');

      return {
        type: 'text',
        content: `
Featured Projects:
-----------------
${projectList}

Type 'all-projects' to see all projects.
        `,
      };
    },
  },

  'all-projects': {
    name: 'all-projects',
    description: 'View all projects',
    execute: () => {
      const projectList = portfolioData.projects.map((project, index) => `
${index + 1}. ${project.name}
   ${project.description}
   Tech: ${project.tech.join(', ')}
   Link: ${project.link}
      `).join('\n');

      return {
        type: 'text',
        content: `
All Projects:
------------
${projectList}
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
      // Open resume in new tab if it exists
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
};

export const getCommand = (commandName: string): Command | null => {
  const cmd = commands[commandName.toLowerCase()];
  return cmd || null;
};

export const getAllCommandNames = (): string[] => {
  return Object.keys(commands);
};
