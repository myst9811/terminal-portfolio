'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCommand, getAllCommandNames } from '../commands';
import { asciiArt } from '../data/portfolio';
import type { HistoryEntry } from '../types';
import Avatar from './Avatar';
import InteractiveBackground from './InteractiveBackground';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);
  const entryCounterRef = useRef(0);

  // Mount and setup
  useEffect(() => {
    setMounted(true);
    inputRef.current?.focus();

    const welcomeEntry: HistoryEntry = {
      command: '',
      output: { type: 'text', content: asciiArt },
      timestamp: new Date(),
    };
    setHistory([welcomeEntry]);
  }, []);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (mounted) {
      outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, mounted]);

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
    <div className="relative h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />

      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col md:flex-row items-stretch gap-4 sm:gap-6 p-4">
        {/* Avatar Section - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 flex-shrink-0 md:w-64"
        >
          <Avatar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-green-400 tracking-wider glow-text">
              SHANNEN SAIKIA
            </h1>
            <p className="text-xs sm:text-sm text-green-300/80 mt-2">
              Engineering Student @ VIT
            </p>
            <div className="mt-4 flex flex-col gap-2 text-xs text-green-300/70">
              <p>🎓 Computer Science</p>
              <p>🤖 AI/ML Enthusiast</p>
              <p>⛓️ Blockchain Developer</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal Window - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 flex flex-col min-h-0 max-h-full"
        >
          {/* Terminal Window */}
          <div
            className="bg-black/90 backdrop-blur-sm rounded-lg shadow-2xl border border-green-500/20 terminal-glow flex flex-col h-full overflow-hidden"
            onClick={handleTerminalClick}
          >
            {/* Terminal Header/Title Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gray-800/50 px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between border-b border-green-500/20 flex-shrink-0"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.2, boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)' }}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2, boxShadow: '0 0 8px rgba(234, 179, 8, 0.5)' }}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2, boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors"
                  />
                </div>
                <span className="text-xs text-gray-400 ml-4 hidden sm:inline">
                  visitor@shannen-portfolio:~$
                </span>
              </div>
              <div className="text-xs text-green-400/70 font-semibold">
                Terminal - Portfolio
              </div>
            </motion.div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="bg-black/95 text-green-400 font-mono p-4 sm:p-6 flex-1 overflow-y-scroll cursor-text custom-scrollbar min-h-0"
          >
            {/* Output History */}
            <div className="space-y-4 mb-4">
              <AnimatePresence mode="popLayout">
                {history.map((entry, index) => (
                  <motion.div
                    key={`entry-${index}`}
                    initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      delay: mounted ? index * 0.05 : 0
                    }}
                  >
                    {entry.command && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-start gap-2 text-green-400"
                      >
                        <motion.span
                          animate={{
                            textShadow: [
                              '0 0 4px rgba(34, 197, 94, 0.5)',
                              '0 0 8px rgba(34, 197, 94, 0.8)',
                              '0 0 4px rgba(34, 197, 94, 0.5)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-green-500 font-bold"
                        >
                          $
                        </motion.span>
                        <span className="text-green-300">{entry.command}</span>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className={`mt-2 whitespace-pre-wrap overflow-x-auto ${
                        entry.output.type === 'error'
                          ? 'text-red-400 glow-text-red'
                          : entry.command === '' && index === 0
                          ? 'text-green-400 text-xs sm:text-sm glow-text'
                          : 'text-green-300/90 text-xs sm:text-sm'
                      }`}
                    >
                      {typeof entry.output.content === 'string'
                        ? entry.output.content
                        : entry.output.content}
                    </motion.div>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-2 text-center text-gray-500 text-xs flex-shrink-0"
          >
            <p>
              Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-300 border border-green-500/20 text-[10px]">Tab</kbd> for autocomplete •
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-300 mx-1 border border-green-500/20 text-[10px]">↑/↓</kbd> for history •
              Type <span className="text-green-400 glow-text">help</span> to start
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
