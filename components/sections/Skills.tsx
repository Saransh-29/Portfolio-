'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── Data ──────────────────────────────────────────────── */
type Category = 'all' | 'frontend' | 'backend' | 'design' | 'devops';

interface Skill {
  name:     string;
  level:    number; // 0-100
  category: Exclude<Category, 'all'>;
  icon:     string;
  color:    string;
}

const SKILLS: Skill[] = [
  // Frontend
  { name: 'React.js',    level: 75, category: 'frontend', icon: '⚛', color: '#61dafb' },
  { name: 'JavaScript',  level: 78, category: 'frontend', icon: 'JS', color: '#f7df1e' },
  { name: 'HTML / CSS',  level: 85, category: 'frontend', icon: '◈', color: '#e44d26' },
  // Design
  { name: 'Figma',       level: 80, category: 'design',   icon: '✦', color: '#f24e1e' },
  { name: 'UI/UX Design',level: 75, category: 'design',   icon: '◎', color: '#a78bfa' },
  // Backend
  { name: 'Python',      level: 82, category: 'backend',  icon: '🐍', color: '#3776ab' },
  { name: 'SQL / MySQL', level: 70, category: 'backend',  icon: '🐘', color: '#336791' },
  // DevOps / Tools
  { name: 'Cybersecurity',level:72, category: 'devops',   icon: '🛡', color: '#10b981' },
  { name: 'Linux',       level: 68, category: 'devops',   icon: '🐧', color: '#f59e0b' },
  { name: 'GitHub',      level: 78, category: 'devops',   icon: '⎇', color: '#ffffff' },
];

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all',      label: 'All'      },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend',  label: 'Backend'  },
  { value: 'design',   label: 'Design'   },
];

/* ─── Skill Card ────────────────────────────────────────── */
function SkillCard({ skill, i }: { skill: Skill; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{    opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card rounded-2xl p-5 flex flex-col gap-4 cursor-default
                 transition-all duration-300"
      style={{
        borderColor: hovered ? `${skill.color}33` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? `0 0 30px ${skill.color}10, 0 4px 24px rgba(0,0,0,0.4)`
          : '0 4px 24px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Top row: icon + name */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm
                     transition-all duration-300 shrink-0"
          style={{
            background: `${skill.color}14`,
            boxShadow: hovered ? `0 0 16px ${skill.color}30` : 'none',
            color: skill.color,
          }}
          aria-hidden="true"
        >
          {skill.icon}
        </div>
        <div>
          <p
            className="font-mono text-xs tracking-wide transition-colors duration-300"
            style={{ color: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)' }}
          >
            {skill.name}
          </p>
          <p className="font-mono text-[0.58rem] tracking-widest uppercase text-text-muted capitalize mt-0.5">
            {skill.category}
          </p>
        </div>
        {/* Level % top-right */}
        <span
          className="ml-auto font-display font-bold text-base transition-colors duration-300"
          style={{ color: hovered ? skill.color : 'rgba(255,255,255,0.3)' }}
          aria-label={`${skill.level}% proficiency`}
        >
          {skill.level}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-px w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${skill.color}aa, ${skill.color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.1, delay: i * 0.06 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────── */
export default function Skills() {
  const ref       = useRef<HTMLElement>(null);
  const inView    = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all'
    ? SKILLS
    : SKILLS.filter(s => s.category === active);

  const fadeUp = (i: number) => ({
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    },
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 md:py-40 section-padding overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-5"
        >
          <span className="section-label">03 — Skills</span>
          <div className="h-px flex-1 max-w-[100px] bg-accent-cyan/30" />
        </motion.div>

        <motion.h2
          variants={fadeUp(1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-heading text-white/90 mb-3"
        >
          What I bring
          <span className="block gradient-text">to the table</span>
        </motion.h2>

        <motion.p
          variants={fadeUp(2)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-text-secondary text-sm mb-10 max-w-md"
        >
          Skills honed across production projects, open source, and obsessive side-project building.
        </motion.p>

        {/* Category filter */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={active === cat.value}
              onClick={() => setActive(cat.value)}
              className={`font-mono text-[0.62rem] tracking-widest uppercase
                          px-4 py-2 rounded-full border transition-all duration-300
                          ${active === cat.value
                            ? 'bg-accent-cyan text-black border-accent-cyan font-bold shadow-glow-sm'
                            : 'border-border-subtle text-text-muted hover:border-border-glow hover:text-white'
                          }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
