'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ─── Data (edit freely) ────────────────────────────────── */
interface Experience {
  company:     string;
  role:        string;
  duration:    string;
  type:        string; // e.g. "Full-time" | "Contract" | "Freelance"
  location:    string;
  description: string;
  highlights:  string[];
  tech:        string[];
  current:     boolean;
  color:       string;
}

const EXPERIENCES: Experience[] = [
  {
    company:     'Ilkka Healthcare Pvt Ltd',
    role:        'HR Intern',
    duration:    'Jun 2025 — Jul 2025',
    type:        'Internship',
    location:    'Lucknow, India',
    description: 'Supported the HR team at Ilkka Healthcare Pvt Ltd across recruitment, onboarding, and employee engagement during a 2-month internship.',
    highlights: [
      'Screened resumes and scheduled interviews as part of the recruitment process',
      'Supported new employee onboarding through orientation preparation and document management',
      'Conducted employee surveys to gather feedback on workplace culture and satisfaction',
      'Maintained HR databases to ensure accurate records and regulatory compliance',
    ],
    tech:    ['Recruitment', 'HR Operations', 'Onboarding', 'Employee Surveys', 'Documentation'],
    current: false,
    color:   '#00d4ff',
  },
];

/* ─── Single timeline entry ─────────────────────────────── */
function TimelineEntry({
  exp,
  index,
  total,
}: {
  exp: Experience;
  index: number;
  total: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0; // alternating sides on desktop

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0
                  md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0`}
    >
      {/* ── LEFT column (desktop) ─────────────────────────── */}
      <div className={`hidden md:flex ${isLeft ? 'flex-col items-end pr-10' : 'flex-col'}`}>
        {isLeft && (
          <ExperienceCard exp={exp} inView={inView} delay={0} />
        )}
      </div>

      {/* ── Centre spine ──────────────────────────────────── */}
      <div className="flex flex-col items-center shrink-0 mx-4 md:mx-0">
        {/* Dot */}
        <motion.div
          className="relative z-10 w-4 h-4 rounded-full border-2 shrink-0 mt-1"
          style={{ borderColor: exp.color, background: '#050508' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          {/* Pulse ring for current role */}
          {exp.current && (
            <span
              className="absolute inset-[-5px] rounded-full border animate-ping"
              style={{ borderColor: `${exp.color}60` }}
              aria-hidden="true"
            />
          )}
          {exp.current && (
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: exp.color, opacity: 0.25 }}
              aria-hidden="true"
            />
          )}
        </motion.div>

        {/* Connecting line (not shown below last item) */}
        {index < total - 1 && (
          <div className="w-px flex-1 mt-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
        )}
      </div>

      {/* ── RIGHT column (desktop) / sole column (mobile) ─── */}
      <div className={`flex flex-col md:${isLeft ? '' : 'pl-10'} flex-1`}>
        {/* Mobile: always show card on the right */}
        <div className="md:hidden pb-12">
          <ExperienceCard exp={exp} inView={inView} delay={0} />
        </div>

        {/* Desktop: only on right side */}
        <div className={`hidden md:flex flex-col ${isLeft ? '' : 'items-start pl-10'} pb-16`}>
          {!isLeft && <ExperienceCard exp={exp} inView={inView} delay={0} />}
        </div>
      </div>
    </div>
  );
}

/* ─── Experience card ───────────────────────────────────── */
function ExperienceCard({
  exp,
  inView,
  delay,
}: {
  exp: Experience;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-6 max-w-md w-full border border-border-subtle
                 transition-all duration-300 hover:border-opacity-60"
      style={{
        borderColor: inView ? `${exp.color}18` : 'rgba(255,255,255,0.06)',
        boxShadow: exp.current
          ? `0 0 40px ${exp.color}08, 0 4px 24px rgba(0,0,0,0.4)`
          : '0 4px 20px rgba(0,0,0,0.35)',
      }}
      initial={{ opacity: 0, y: 24, x: 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p
              className="font-display text-lg font-bold text-white/90 leading-tight"
            >
              {exp.role}
            </p>
            {exp.current && (
              <span
                className="font-mono text-[0.55rem] tracking-widest uppercase
                           px-2 py-0.5 rounded-full shrink-0"
                style={{ background: `${exp.color}20`, color: exp.color }}
              >
                Current
              </span>
            )}
          </div>
          <p
            className="font-mono text-[0.7rem] tracking-wide font-semibold"
            style={{ color: exp.color }}
          >
            {exp.company}
          </p>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
        <span className="font-mono text-[0.6rem] tracking-widest uppercase text-text-muted">
          {exp.duration}
        </span>
        <span className="font-mono text-[0.6rem] tracking-widest uppercase text-text-muted">
          {exp.type}
        </span>
        <span className="font-mono text-[0.6rem] tracking-widest uppercase text-text-muted">
          {exp.location}
        </span>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-xs leading-relaxed mb-4">
        {exp.description}
      </p>

      {/* Highlights */}
      <ul className="flex flex-col gap-2 mb-5">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
            <span
              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
              style={{ background: exp.color }}
              aria-hidden="true"
            />
            {h}
          </li>
        ))}
      </ul>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {exp.tech.map(t => (
          <span
            key={t}
            className="font-mono text-[0.57rem] tracking-wider uppercase
                       border border-border-subtle text-text-muted px-2.5 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Animated spine line (scroll-driven) ───────────────── */
function AnimatedSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px
                 hidden md:block pointer-events-none"
      style={{ background: 'rgba(255,255,255,0.04)' }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          background: 'linear-gradient(to bottom, #00d4ff, #7c3aed)',
          height: '100%',
          opacity: 0.6,
        }}
      />
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────── */
export default function Experience() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = (i = 0) => ({
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    },
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-28 md:py-40 section-padding overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute right-0 bottom-1/4 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-5"
        >
          <span className="section-label">05 — Experience</span>
          <div className="h-px flex-1 max-w-[100px] bg-accent-cyan/30" />
        </motion.div>

        <motion.h2
          variants={fadeUp(1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-heading text-white/90 mb-3"
        >
          Where I&apos;ve
          <span className="block gradient-text">worked</span>
        </motion.h2>

        <motion.p
          variants={fadeUp(2)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-text-secondary text-sm mb-20 max-w-md"
        >
          My professional journey — from freelance roots to senior engineering roles.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          <AnimatedSpine />
          <div className="flex flex-col">
            {EXPERIENCES.map((exp, i) => (
              <TimelineEntry
                key={exp.company + exp.duration}
                exp={exp}
                index={i}
                total={EXPERIENCES.length}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
