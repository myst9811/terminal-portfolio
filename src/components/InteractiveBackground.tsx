'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      const vpX = w / 2;
      const vpY = h / 2;

      const GREEN = 'rgba(115, 250, 145, ';
      ctx.lineWidth = 0.6;
      ctx.shadowColor = '#73fa91';
      ctx.shadowBlur = 5;

      const NUM_RADIAL = 14;
      const NUM_CROSS = 10;

      const line = (x1: number, y1: number, x2: number, y2: number, opacity: number) => {
        ctx.strokeStyle = GREEN + Math.min(Math.max(opacity, 0), 0.5) + ')';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };

      // Floor — radial lines from VP to bottom edge
      for (let i = 0; i <= NUM_RADIAL; i++) {
        const t = i / NUM_RADIAL;
        const endX = t * w;
        const edgeDist = Math.abs(t - 0.5) * 2;
        line(vpX, vpY, endX, h, 0.08 + 0.38 * edgeDist);
      }
      // Floor — horizontal cross lines (perspective-spaced)
      for (let i = 1; i <= NUM_CROSS; i++) {
        const tY = Math.pow(i / NUM_CROSS, 0.5);
        const y = vpY + (h - vpY) * tY;
        const clipT = (y - vpY) / (h - vpY);
        const leftX = vpX * (1 - clipT);
        const rightX = vpX + (w - vpX) * clipT;
        line(leftX, y, rightX, y, 0.08 + 0.32 * clipT);
      }

      // Ceiling — radial lines from VP to top edge
      for (let i = 0; i <= NUM_RADIAL; i++) {
        const t = i / NUM_RADIAL;
        const endX = t * w;
        const edgeDist = Math.abs(t - 0.5) * 2;
        line(vpX, vpY, endX, 0, 0.08 + 0.38 * edgeDist);
      }
      // Ceiling — horizontal cross lines
      for (let i = 1; i <= NUM_CROSS; i++) {
        const tY = Math.pow(i / NUM_CROSS, 0.5);
        const y = vpY - vpY * tY;
        const clipT = (vpY - y) / vpY;
        const leftX = vpX * (1 - clipT);
        const rightX = vpX + (w - vpX) * clipT;
        line(leftX, y, rightX, y, 0.08 + 0.32 * clipT);
      }

      // Left wall — radial lines from VP to left edge
      for (let i = 0; i <= NUM_RADIAL; i++) {
        const t = i / NUM_RADIAL;
        const endY = t * h;
        const edgeDist = Math.abs(t - 0.5) * 2;
        line(vpX, vpY, 0, endY, 0.08 + 0.38 * edgeDist);
      }
      // Left wall — vertical cross lines
      for (let i = 1; i <= NUM_CROSS; i++) {
        const tX = Math.pow(i / NUM_CROSS, 0.5);
        const x = vpX - vpX * tX;
        const clipT = (vpX - x) / vpX;
        const topY = vpY * (1 - clipT);
        const botY = vpY + (h - vpY) * clipT;
        line(x, topY, x, botY, 0.08 + 0.32 * clipT);
      }

      // Right wall — radial lines from VP to right edge
      for (let i = 0; i <= NUM_RADIAL; i++) {
        const t = i / NUM_RADIAL;
        const endY = t * h;
        const edgeDist = Math.abs(t - 0.5) * 2;
        line(vpX, vpY, w, endY, 0.08 + 0.38 * edgeDist);
      }
      // Right wall — vertical cross lines
      for (let i = 1; i <= NUM_CROSS; i++) {
        const tX = Math.pow(i / NUM_CROSS, 0.5);
        const x = vpX + (w - vpX) * tX;
        const clipT = (x - vpX) / (w - vpX);
        const topY = vpY * (1 - clipT);
        const botY = vpY + (h - vpY) * clipT;
        line(x, topY, x, botY, 0.08 + 0.32 * clipT);
      }
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
