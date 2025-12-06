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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl"
      >
        {/* Terminal Window */}
        <div
          className="bg-black/90 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 overflow-hidden"
          onClick={handleTerminalClick}
        >
          {/* Terminal Header/Title Bar */}
          <div className="bg-gray-800/50 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors"></div>
              </div>
              <span className="text-xs text-gray-400 ml-4 hidden sm:inline">
                visitor@shannen-portfolio:~$
              </span>
            </div>
            <div className="text-xs text-gray-500 font-semibold">
              Terminal - Portfolio
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="bg-black/95 text-green-400 font-mono p-6 sm:p-8 h-[70vh] overflow-y-auto cursor-text custom-scrollbar"
          >
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
                        <span className="text-green-500 font-bold">$</span>
                        <span className="text-green-300">{entry.command}</span>
                      </div>
                    )}
                    <div
                      className={`mt-2 whitespace-pre-wrap text-sm sm:text-base ${
                        entry.output.type === 'error'
                          ? 'text-red-400'
                          : 'text-green-300/90'
                      }`}
                      style={{ fontSize: entry.command === '' && index === 0 ? '0.7rem' : undefined }}
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
            <div className="flex items-center gap-2 mt-4">
              <span className="text-green-500 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-400 caret-green-400 text-sm sm:text-base"
                spellCheck={false}
                autoComplete="off"
                autoFocus
                placeholder="Type a command..."
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

        {/* Hint Text */}
        <div className="mt-4 text-center text-gray-500 text-xs sm:text-sm">
          <p>Press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300">Tab</kbd> for autocomplete •
          <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300 mx-1">↑/↓</kbd> for history •
          Type <span className="text-green-400">help</span> to start</p>
        </div>
      </motion.div>
    </div>
  );
}
