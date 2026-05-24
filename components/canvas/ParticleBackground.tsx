'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  colorIdx: number;
}

/* Palette — RGBA components for fast mixing */
const COLORS = [
  [0, 212, 255],   // cyan
  [124, 58, 237],  // purple
  [139, 92, 246],  // violet
  [37, 99, 235],   // blue
] as const;

const MAX_CONNECT_DIST = 110;
const MOUSE_REPEL_DIST = 130;
const MOUSE_FORCE      = 0.0012;
const MAX_SPEED        = 0.8;

/**
 * Full-screen, mouse-reactive particle network.
 * Fixed-position so it stays behind all content.
 * Performance budget: ~60 particles on desktop, fewer on mobile.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -999, y: -999 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];

    /* ── Initialise / reinitialise on resize ──────────── */
    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;

      const density = window.innerWidth < 768 ? 22000 : 14000;
      const count   = Math.min(
        Math.floor((canvas.width * canvas.height) / density),
        window.innerWidth < 768 ? 40 : 80
      );

      particles = Array.from({ length: count }, () => ({
        x:         Math.random() * canvas.width,
        y:         Math.random() * canvas.height,
        vx:        (Math.random() - 0.5) * 0.35,
        vy:        (Math.random() - 0.5) * 0.35,
        size:      Math.random() * 1.4 + 0.4,
        opacity:   Math.random() * 0.45 + 0.1,
        colorIdx:  Math.floor(Math.random() * COLORS.length),
      }));
    };

    /* ── Main draw loop ────────────────────────────────── */
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        /* Mouse repulsion */
        const dx = mx - p.x;
        const dy = my - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_REPEL_DIST * MOUSE_REPEL_DIST) {
          const d    = Math.sqrt(d2);
          const force = (MOUSE_REPEL_DIST - d) / MOUSE_REPEL_DIST * MOUSE_FORCE;
          p.vx -= dx * force;
          p.vy -= dy * force;
        }

        /* Velocity clamp */
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        /* Move */
        p.x += p.vx;
        p.y += p.vy;

        /* Wrap at edges */
        if (p.x < -10)                  p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10)   p.x = -10;
        if (p.y < -10)                  p.y = canvas.height + 10;
        if (p.y > canvas.height + 10)   p.y = -10;

        /* Draw particle */
        const [r, g, b] = COLORS[p.colorIdx];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();

        /* Draw connections — only forward pairs to halve work */
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const ex = p.x - p2.x;
          const ey = p.y - p2.y;
          const ed = Math.hypot(ex, ey);

          if (ed < MAX_CONNECT_DIST) {
            const alpha = (1 - ed / MAX_CONNECT_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    /* ── Event listeners ───────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };

    window.addEventListener('mousemove',   onMouseMove,  { passive: true });
    window.addEventListener('mouseleave',  onMouseLeave, { passive: true });
    window.addEventListener('resize',      onResize,     { passive: true });

    init();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize',     onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none"
      style={{ opacity: 0.85 }}
    />
  );
}
