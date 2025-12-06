'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCommand, getAllCommandNames } from '../commands';
import { asciiArt } from '../data/portfolio';
import type { HistoryEntry } from '../types';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  // Auto-focus input on mount and when clicking terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom when history updates
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Display welcome banner on mount
  useEffect(() => {
    const welcomeEntry: HistoryEntry = {
      command: '',
      output: { type: 'text', content: asciiArt },
      timestamp: new Date(),
    };
    setHistory([welcomeEntry]);
  }, []);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const command = getCommand(trimmedCmd);

    if (command) {
      const output = command.execute([]);

      // Handle clear command specially
      if (output.content === 'CLEAR_COMMAND') {
        setHistory([]);
        return;
      }

      const newEntry: HistoryEntry = {
        command: trimmedCmd,
        output,
        timestamp: new Date(),
      };

      setHistory(prev => [...prev, newEntry]);
    } else {
      const errorEntry: HistoryEntry = {
        command: trimmedCmd,
        output: {
          type: 'error',
          content: `Command not found: ${trimmedCmd}\nType 'help' to see available commands.`,
        },
        timestamp: new Date(),
      };

      setHistory(prev => [...prev, errorEntry]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle command submission
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
      return;
    }

    // Handle command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex = historyIndex === -1
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
      return;
    }

    // Handle tab auto-complete
    if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) return;

      const allCommands = getAllCommandNames();
      const matches = allCommands.filter(cmd =>
        cmd.startsWith(input.toLowerCase())
      );

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        const suggestion = `\nAvailable commands: ${matches.join(', ')}`;
        const suggestionEntry: HistoryEntry = {
          command: input,
          output: { type: 'text', content: suggestion },
          timestamp: new Date(),
        };
        setHistory(prev => [...prev, suggestionEntry]);
      }
    }

    // Handle Ctrl+L to clear
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    }

    // Handle Ctrl+C to clear current input
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="min-h-screen bg-black text-green-400 p-4 sm:p-8 font-mono cursor-text"
      onClick={handleTerminalClick}
    >
      <div
        ref={terminalRef}
        className="max-w-4xl mx-auto"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-green-400/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-green-400/60 ml-4">
            visitor@shannen-portfolio:~$
          </span>
        </div>

        {/* Output History */}
        <div className="space-y-4 mb-4">
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={`${entry.timestamp.getTime()}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {entry.command && (
                  <div className="flex items-start gap-2 text-green-400">
                    <span className="text-green-500">$</span>
                    <span>{entry.command}</span>
                  </div>
                )}
                <div
                  className={`mt-2 whitespace-pre-wrap ${
                    entry.output.type === 'error'
                      ? 'text-red-400'
                      : 'text-green-300'
                  }`}
                >
                  {typeof entry.output.content === 'string'
                    ? entry.output.content
                    : entry.output.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={outputEndRef} />
        </div>

        {/* Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-green-500">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="text-green-400"
          >
            ▊
          </motion.span>
        </div>
      </div>
    </div>
  );
}
