'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Tech data (add / remove freely) ──────────────────── */
interface Tech {
  name:  string;
  color: string; // accent on hover
  icon:  string; // SVG path or emoji fallback
}


const ROW_1: Tech[] = [
  { name: 'Python',      color: '#3776ab', icon: '🐍' },
  { name: 'JavaScript',  color: '#f7df1e', icon: 'JS' },
  { name: 'React.js',    color: '#61dafb', icon: '⚛'  },
  { name: 'HTML / CSS',  color: '#e44d26', icon: '◈'  },
  { name: 'SQL',         color: '#336791', icon: '🐘' },
  { name: 'MySQL',       color: '#00758f', icon: '⬡'  },
];


const ROW_2: Tech[] = [
  { name: 'Figma',       color: '#f24e1e', icon: '✦'  },
  { name: 'GitHub',      color: '#ffffff', icon: '⎇'  },
  { name: 'Jira',        color: '#0052cc', icon: '◉'  },
  { name: 'Notion',      color: '#ffffff', icon: '▣'  },
  { name: 'Wireshark',   color: '#1679a7', icon: '⟁'  },
  { name: 'Linux',       color: '#f59e0b', icon: '🐧' },
];

/* ─── Single marquee row ────────────────────────────────── */
interface MarqueeRowProps {
  items:    Tech[];
  reverse?: boolean;
  speed?:   number; // seconds per full cycle
}

function MarqueeRow({ items, reverse = false, speed = 32 }: MarqueeRowProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
    >
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        {doubled.map((tech, i) => (
          <TechPill key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Individual pill ───────────────────────────────────── */
function TechPill({ tech }: { tech: Tech }) {
  return (
    <div
      className="group flex items-center gap-2.5 glass-card border border-border-subtle
                 px-5 py-2.5 rounded-full whitespace-nowrap
                 transition-all duration-300
                 hover:border-border-glow hover:scale-105"
      style={
        {
          '--pill-color': tech.color,
          transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        } as React.CSSProperties
      }
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 0 20px ${tech.color}22, 0 0 0 1px ${tech.color}33`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '';
      }}
    >
      {/* Icon */}
      <span
        className="text-sm w-5 text-center select-none
                   text-text-muted group-hover:text-[var(--pill-color)] transition-colors duration-300"
        aria-hidden="true"
      >
        {tech.icon}
      </span>

      {/* Name */}
      <span
        className="font-mono text-[0.65rem] tracking-[0.14em] uppercase
                   text-text-secondary group-hover:text-white transition-colors duration-300"
      >
        {tech.name}
      </span>
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────── */
export default function TechStack() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      id="tech"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient bleed */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.025) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-5"
        >
          <span className="section-label">02 — Tech Stack</span>
          <div className="h-px flex-1 max-w-[100px] bg-accent-cyan/30" />
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-heading text-white/90 mb-3"
        >
          Tools I work with
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-text-secondary text-sm mb-14 max-w-md"
        >
          A curated selection of technologies I use to build fast, scalable, and beautiful products.
        </motion.p>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex flex-col gap-3"
      >
        <MarqueeRow items={ROW_1} reverse={false} speed={38} />
        <MarqueeRow items={ROW_2} reverse={true}  speed={44} />
      </motion.div>
    </section>
  );
}
