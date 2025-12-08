'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }}
      className="relative group"
    >
      {/* Animated border glow */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(34, 197, 94, 0.3)',
            '0 0 40px rgba(34, 197, 94, 0.5)',
            '0 0 20px rgba(34, 197, 94, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full blur-md"
      />

      {/* Avatar container */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-green-500/50 shadow-2xl"
      >
        <Image
          src="/Developer programmer-Программист-разработчик.jpeg"
          alt="Developer Avatar"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay effect on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-linear-to-t from-green-500/20 to-transparent"
        />
      </motion.div>

      {/* Floating particles around avatar */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-300 rounded-full blur-sm"
      />
    </motion.div>
  );
}
