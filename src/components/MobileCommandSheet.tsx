'use client';

import { motion, AnimatePresence } from 'framer-motion';

const QUICK_COMMANDS = [
  { label: 'projects', cmd: 'projects' },
  { label: 'about', cmd: 'about' },
  { label: 'skills', cmd: 'skills' },
  { label: 'experience', cmd: 'experience' },
  { label: 'resume', cmd: 'resume' },
  { label: 'contact', cmd: 'contact' },
];

interface MobileCommandSheetProps {
  open: boolean;
  onClose: () => void;
  onCommand: (cmd: string) => void;
}

export default function MobileCommandSheet({ open, onClose, onCommand }: MobileCommandSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-green-500/30 rounded-t-xl p-5 sm:hidden"
            style={{ zIndex: 60 }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="w-10 h-1 bg-green-500/30 rounded mx-auto mb-4" />
            <p className="text-green-400/50 text-xs font-mono mb-4 text-center tracking-widest uppercase">
              Quick Commands
            </p>
            <div className="grid grid-cols-3 gap-2">
              {QUICK_COMMANDS.map(({ label, cmd }) => (
                <button
                  key={cmd}
                  onClick={() => { onCommand(cmd); onClose(); }}
                  className="py-3 bg-green-500/10 hover:bg-green-500/20 active:bg-green-500/30 border border-green-500/25 rounded-lg text-green-300 text-sm font-mono transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
