'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });


      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5 - 0.3,
          size: Math.random() * 2 + 0.5,
          life: 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;

        // Fade out
        if (particle.life <= 0) return false;

        // Draw particle with fading effect
        const opacity = particle.life * 0.4;
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Very subtle animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.15, 0.25],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Canvas for hover particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.8 }}
      />

      {/* Very subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </>
  );
}
