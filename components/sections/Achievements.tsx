'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Count-up hook ─────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

/* ─── Data ──────────────────────────────────────────────── */
interface Stat {
  value:  number;
  suffix: string;
  label:  string;
  color:  string;
}

const STATS: Stat[] = [
  { value: 4,    suffix: '+', label: 'Projects Built',        color: '#00d4ff' },
  { value: 1,    suffix: '',  label: 'Internship Completed',  color: '#7c3aed' },
  { value: 2027, suffix: '',  label: 'Expected Graduation',   color: '#8b5cf6' },
  { value: 8,    suffix: '.0',label: 'Current CGPA',          color: '#f59e0b' },
];

interface Achievement {
  title:    string;
  subtitle: string;
  desc:     string;
  icon:     string;
  color:    string;
  category: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title:    'SIH Round 1 Qualifier',
    subtitle: 'Smart India Hackathon',
    desc:     'Qualified the first round of Smart India Hackathon — one of the largest national-level hackathons in India, competing against thousands of student teams.',
    icon:     '🏆',
    color:    '#f59e0b',
    category: 'Hackathon',
  },
  {
    title:    'Microsoft Azure Static',
    subtitle: 'Microsoft Certification',
    desc:     'Earned a Microsoft Azure certification, demonstrating proficiency in cloud computing fundamentals and static web deployment on the Azure platform.',
    icon:     '☁️',
    color:    '#00d4ff',
    category: 'Certification',
  },
  {
    title:    '2nd Place — Basketball',
    subtitle: 'ByteForce, SOCS',
    desc:     'Secured 2nd position in the Basketball tournament at ByteForce, SOCS — a competitive inter-college sports event, recognised among the best performers.',
    icon:     '🏀',
    color:    '#10b981',
    category: 'Sports',
  },
  {
    title:    'NBA Jr. Camp',
    subtitle: 'Top Performer',
    desc:     'Selected and recognised amongst the best performers at the NBA Jr. Camp — a prestigious basketball development programme.',
    icon:     '⭐',
    color:    '#ec4899',
    category: 'Sports',
  },
];

/* ─── Animated stat counter card ───────────────────────── */
function StatCard({ stat, started }: { stat: Stat; started: boolean }) {
  const count = useCountUp(stat.value, 1600, started);
  return (
    <motion.div
      className="glass-card rounded-2xl p-6 flex flex-col items-center text-center
                 border border-border-subtle transition-all duration-300
                 hover:border-opacity-60 group"
      whileHover={{ y: -4, boxShadow: `0 0 40px ${stat.color}12, 0 8px 32px rgba(0,0,0,0.5)` }}
      style={{ borderColor: `${stat.color}15` }}
    >
      {/* Value */}
      <div
        className="font-display text-4xl sm:text-5xl font-bold mb-2 tabular-nums"
        style={{ color: stat.color }}
      >
        {count}{stat.suffix}
      </div>
      {/* Label */}
      <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-text-muted">
        {stat.label}
      </div>
      {/* Glow line */}
      <div
        className="mt-4 h-px w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: stat.color }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

/* ─── Achievement card ──────────────────────────────────── */
function AchievementCard({ ach, i }: { ach: Achievement; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="glass-card rounded-2xl p-6 border border-border-subtle flex flex-col gap-4
                 transition-all duration-300 group cursor-default"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        borderColor: `${ach.color}30`,
        boxShadow: `0 0 35px ${ach.color}08, 0 8px 32px rgba(0,0,0,0.5)`,
        y: -3,
      }}
    >
      {/* Top row */}
      <div className="flex items-start gap-4">
        {/* Icon bubble */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0
                     transition-all duration-300 group-hover:scale-110"
          style={{ background: `${ach.color}15` }}
        >
          {ach.icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* Category badge */}
          <span
            className="font-mono text-[0.55rem] tracking-[0.2em] uppercase px-2 py-0.5
                       rounded-full mb-1.5 inline-block"
            style={{ background: `${ach.color}15`, color: ach.color }}
          >
            {ach.category}
          </span>
          <h3 className="font-display text-base font-bold text-white/90 leading-tight">
            {ach.title}
          </h3>
          <p
            className="font-mono text-[0.63rem] tracking-wide mt-0.5"
            style={{ color: ach.color }}
          >
            {ach.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-xs leading-relaxed">
        {ach.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="h-px w-0 group-hover:w-full rounded-full transition-all duration-500"
        style={{ background: `linear-gradient(to right, ${ach.color}60, transparent)` }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────── */
export default function Achievements() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = (i = 0) => ({
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    },
  });

  return (
    <section
      id="achievements"
      ref={ref}
      className="relative py-28 md:py-40 section-padding overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.04) 0%, transparent 65%)',
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
          <span className="section-label">06 — Achievements</span>
          <div className="h-px flex-1 max-w-[100px] bg-accent-cyan/30" />
        </motion.div>

        <motion.h2
          variants={fadeUp(1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-heading text-white/90 mb-3"
        >
          Milestones &amp;
          <span className="block gradient-text">recognition</span>
        </motion.h2>

        <motion.p
          variants={fadeUp(2)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-text-secondary text-sm mb-16 max-w-md"
        >
          Certifications, hackathons, and moments that pushed me beyond the keyboard.
        </motion.p>

        {/* ── Animated stat counters ────────────────────── */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {STATS.map(stat => (
            <StatCard key={stat.label} stat={stat} started={inView} />
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeUp(4)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="hr-gradient mb-16"
          aria-hidden="true"
        />

        {/* ── Achievement cards ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ACHIEVEMENTS.map((ach, i) => (
            <AchievementCard key={ach.title} ach={ach} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
