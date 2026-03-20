'use client';

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCommand, getAllCommandNames } from '../commands';
import { asciiArt, portfolioData } from '../data/portfolio';
import type { HistoryEntry } from '../types';
import Avatar from './Avatar';
import InteractiveBackground from './InteractiveBackground';
import { linkify } from '../utils/linkify';
import RecruiterView from './RecruiterView';
import MobileCommandSheet from './MobileCommandSheet';

const PILL_COMMANDS: Record<string, string> = {
  'CS Engineering': 'about',
  'AI / ML': 'skills',
  'Blockchain': 'projects',
};

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  // Live clock
  useEffect(() => {
    const update = () => setCurrentTime(
      new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const handleCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const command = getCommand(trimmedCmd);

    if (command) {
      const output = command.execute([]);

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
  }, []);

  // Mount and mobile detection
  useEffect(() => {
    setMounted(true);
    inputRef.current?.focus();

    const welcomeEntry: HistoryEntry = {
      command: '',
      output: { type: 'text', content: asciiArt },
      timestamp: new Date(),
    };
    setHistory([welcomeEntry]);

    // Mobile detection
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (mounted) {
      outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, mounted]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
      return;
    }

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

    if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) return;
      const allCommands = getAllCommandNames();
      const matches = allCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
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

    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    }

    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-900 via-[#080f08] to-gray-900 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <InteractiveBackground />

      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col md:flex-row items-stretch gap-4 sm:gap-6 p-4">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-green-400/70">Available for opportunities</span>
            </div>
            <div className="mt-5 w-full">
              <p className="text-[10px] text-green-500/25 font-mono uppercase tracking-widest mb-2 text-left px-1">
                Focus Areas
              </p>
              <div className="space-y-0.5">
                {[
                  { label: 'CS Engineering', borderCls: 'border-green-500/30 hover:border-green-400/80', textCls: 'text-green-400/40 hover:text-green-300' },
                  { label: 'AI / ML', borderCls: 'border-blue-500/30 hover:border-blue-400/80', textCls: 'text-blue-400/40 hover:text-blue-300' },
                  { label: 'Blockchain', borderCls: 'border-purple-500/30 hover:border-purple-400/80', textCls: 'text-purple-400/40 hover:text-purple-300' },
                ].map(({ label, borderCls, textCls }) => (
                  <motion.button
                    key={label}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 2, scale: 0.98 }}
                    onClick={() => handleCommand(PILL_COMMANDS[label])}
                    className={`w-full flex items-center pl-3 py-1.5 font-mono text-xs border-l-2 transition-all text-left ${borderCls} ${textCls}`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 flex flex-col min-h-0 max-h-full"
        >
          <div
            className="bg-[#0a1209]/95 backdrop-blur-sm rounded-lg shadow-2xl border border-green-500/20 terminal-glow flex flex-col h-full overflow-hidden"
            onClick={handleTerminalClick}
          >
            {/* Title Bar */}
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
              <div className="flex items-center gap-3 text-xs font-mono">
                <button
                  onClick={(e) => { e.stopPropagation(); setRecruiterMode(m => !m); }}
                  className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded border border-green-500/30 hover:border-green-500/60 transition-colors"
                >
                  <span className={recruiterMode ? 'text-gray-500' : 'text-green-400'}>CLI</span>
                  <span className="text-gray-600 mx-0.5">|</span>
                  <span className={recruiterMode ? 'text-green-400' : 'text-gray-500'}>GUI</span>
                </button>
                <span className="text-green-400/50 hidden sm:inline">Terminal — Portfolio</span>
                <span className="text-green-400/80 tabular-nums">{currentTime}</span>
              </div>
            </motion.div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="bg-[#080f08] text-green-400 font-mono p-4 sm:p-6 flex-1 overflow-y-scroll cursor-text custom-scrollbar min-h-0"
            >
              {recruiterMode ? (
                <RecruiterView onSwitchToCLI={() => setRecruiterMode(false)} />
              ) : (
                <>
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
                            ease: 'easeOut',
                            delay: mounted ? index * 0.05 : 0,
                          }}
                        >
                          {entry.command && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="flex items-start gap-2 text-green-400"
                            >
                              <span className="flex items-center gap-0.5 flex-shrink-0 font-mono">
                                <span className="text-cyan-400/70 hidden sm:inline">visitor@shannen</span>
                                <span className="text-gray-600 hidden sm:inline">:</span>
                                <span className="text-blue-400/70 hidden sm:inline">~</span>
                                <motion.span
                                  animate={{
                                    textShadow: [
                                      '0 0 4px rgba(24, 224, 0, 0.5)',
                                      '0 0 8px rgba(115, 250, 145, 0.8)',
                                      '0 0 4px rgba(24, 224, 0, 0.5)',
                                    ],
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="text-green-500 font-bold"
                                >
                                  $
                                </motion.span>
                              </span>
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
                            {(() => {
                              const content = entry.output.content;
                              if (typeof content === 'function') return content(handleCommand);
                              if (typeof content === 'string') return linkify(content);
                              return content;
                            })()}
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={outputEndRef} />
                  </div>

                  {/* Input Line */}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="flex items-center gap-0.5 flex-shrink-0 font-mono">
                      <span className="text-cyan-400/70 hidden sm:inline">visitor@shannen</span>
                      <span className="text-gray-600 hidden sm:inline">:</span>
                      <span className="text-blue-400/70 hidden sm:inline">~</span>
                      <span className="text-green-500 font-bold">$</span>
                    </span>
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
                    {isMobile && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSheetOpen(true); }}
                        className="sm:hidden text-green-400/60 border border-green-500/20 rounded px-2 py-1 text-xs flex-shrink-0"
                      >
                        ⌘
                      </button>
                    )}
                  </div>
                </>
              )}
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

      {/* Sticky Resume Button */}
      {mounted && (
        <motion.a
          href={portfolioData.resume}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-300 text-sm font-mono transition-colors"
        >
          ↓ Resume
        </motion.a>
      )}

      {/* Mobile Command Sheet */}
      <MobileCommandSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onCommand={(cmd) => { handleCommand(cmd); setInput(''); }}
      />
    </div>
  );
}
