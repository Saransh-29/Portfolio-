'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import GlowButton from '@/components/ui/GlowButton';

// Load Three.js scene only on client — prevents SSR issues
const HeroScene = dynamic(() => import('@/components/canvas/HeroScene'), {
  ssr: false,
});

/* ─── Typewriter roles ──────────────────────────────────── */
const ROLES = [
  'CS Student & Developer',
  'Web Designer',
  'Cybersecurity Enthusiast',
  'Python Developer',
  'UI/UX Designer',
] as const;

/* ─── Stats ─────────────────────────────────────────────── */
const STATS = [
  { value: '1',    label: 'Internship(s)' },
  { value: '4+',   label: 'Projects'      },
  { value: '2027', label: 'Grad Year'     },
] as const;

/* ─── Framer Motion variants ────────────────────────────── */
const containerVars = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const itemVars = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Component ─────────────────────────────────────────── */
export default function Hero() {
  /* Typewriter state */
  const [roleIdx,     setRoleIdx]     = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting,  setIsDeleting]  = useState(false);
  const [isPaused,    setIsPaused]    = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const role  = ROLES[roleIdx];
    const speed = isDeleting ? 28 : 72;

    const t = setTimeout(() => {
      if (!isDeleting && displayText === role) {
        setIsPaused(true);
        setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2200);
        return;
      }
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIdx(prev => (prev + 1) % ROLES.length);
        return;
      }
      setDisplayText(prev =>
        isDeleting ? prev.slice(0, -1) : role.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIdx, isPaused]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background: grid ──────────────────────────────── */}
      <div
        className="absolute inset-0 grid-bg pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Background: ambient orbs ──────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* ── Background: radial vignette ───────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,5,8,0.7) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── 3D Scene: right half on desktop, bg on mobile ─── */}
      <div
        className="absolute inset-0 lg:left-[48%] pointer-events-none z-0 opacity-80 lg:opacity-100"
        aria-hidden="true"
      >
        <HeroScene />
      </div>

      {/* ── Availability badge — absolute top-left ────────── */}
      {/*    Sits OUTSIDE the stagger container so it can      */}
      {/*    be positioned freely without affecting layout.    */}
      <motion.div
        className="absolute top-24 left-5 sm:left-8 lg:left-10 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="tag">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle"
            style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }}
          />
          Open to internships &amp; projects
        </span>
      </motion.div>

      {/* ── Hero content — stagger container ─────────────── */}
      {/*    Separate from the badge. Left-aligned on desktop. */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-6
                   flex flex-col items-center text-center pb-10
                   lg:items-start lg:text-left lg:max-w-[52%]"
        variants={containerVars}
        initial="hidden"
        animate="visible"
      >
        {/* Name */}
        <motion.h1
          variants={itemVars}
          className="hero-name mb-6 select-none"
          aria-label="Saransh Singh"
        >
          <span className="block text-white/90 leading-none">Saransh</span>
          <span
            className="block gradient-text leading-none"
            style={{ WebkitTextStroke: '0px' }}
          >
            Singh
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          variants={itemVars}
          className="flex items-center justify-center lg:justify-start gap-0 mb-8 h-10"
          aria-label={`Role: ${displayText}`}
        >
          <span className="font-mono text-sm sm:text-base md:text-lg text-text-muted select-none">
            {'‹ '}
          </span>
          <span className="font-mono text-sm sm:text-base md:text-lg text-accent-cyan min-w-[1ch]">
            {displayText}
          </span>
          <span
            className="inline-block w-0.5 h-5 bg-accent-cyan ml-0.5 animate-blink"
            aria-hidden="true"
          />
          <span className="font-mono text-sm sm:text-base md:text-lg text-text-muted select-none">
            {' /›'}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVars}
          className="max-w-lg lg:mx-0 mx-auto text-text-secondary text-base md:text-lg
                     leading-relaxed mb-12"
        >
          I build, secure &amp; design digital experiences. CS undergrad at UPES
          building real-world projects in cybersecurity, quantum computing, and web design.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVars}
          className="flex flex-wrap gap-4 justify-center lg:justify-start mb-4"
        >
          <GlowButton href="#projects" variant="primary">
            View My Work
          </GlowButton>
          <GlowButton href="#contact" variant="secondary">
            Get In Touch
          </GlowButton>
        </motion.div>

      </motion.div>
      {/* ── End hero content ────────────────────────────── */}

      {/* ── Stats bar — full viewport width, pinned bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-5 sm:px-10 lg:px-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top divider */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 20%, rgba(124,58,237,0.15) 80%, transparent)',
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-3 w-full">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center py-2 ${
                i !== STATS.length - 1
                  ? 'border-r border-white/5'
                  : ''
              }`}
            >
              <div
                className="font-display text-3xl sm:text-4xl font-bold gradient-text"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </div>
              <div className="font-mono text-[0.58rem] tracking-[0.24em] uppercase text-text-muted mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-text-muted/50">
          scroll
        </span>
        <div className="scroll-indicator" />
      </motion.div>

      {/* ── Decorative corner lines ───────────────────────── */}
      <CornerAccents />
    </section>
  );
}

/* Subtle corner bracket accents — purely decorative */
function CornerAccents() {
  const lineStyle = 'absolute pointer-events-none border-accent-cyan/10';
  return (
    <>
      <div className={`${lineStyle} top-6 left-6 sm:top-10 sm:left-10 w-10 h-10 border-t border-l`} aria-hidden="true" />
      <div className={`${lineStyle} top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 border-t border-r`} aria-hidden="true" />
      <div className={`${lineStyle} bottom-6 left-6 sm:bottom-10 sm:left-10 w-10 h-10 border-b border-l`} aria-hidden="true" />
      <div className={`${lineStyle} bottom-6 right-6 sm:bottom-10 sm:right-10 w-10 h-10 border-b border-r`} aria-hidden="true" />
    </>
  );
}