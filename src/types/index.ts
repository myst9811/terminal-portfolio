export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => CommandOutput;
}

export interface CommandOutput {
  type: 'text' | 'component' | 'error';
  content: string | React.ReactNode;
}

export interface HistoryEntry {
  command: string;
  output: CommandOutput;
  timestamp: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  ascii?: string;
}