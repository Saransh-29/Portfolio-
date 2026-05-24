'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Data (edit to personalise) ───────────────────────── */
const TRAITS = [
  'Python',
  'Clean Codes',
  'Cyber Security',
  'QKD',
  'Figma',
  'Linux',
  'SQL',
  'TypeScript',
  'UI Polish',
  'Team Player',
] as const;

const BIO_LINES = [
  `I'm Saransh Singh, a Computer Science undergrad at the University of Petroleum and Energy Studies (UPES), Dehradun, graduating in 2027.`,
  `I've built projects spanning cybersecurity tools, quantum computing experiments, and healthcare web design — and interned at Ilkka Healthcare Pvt Ltd.`,
  `Outside of code, I play basketball competitively — placed 2nd at ByteForce SOCS and attended the NBA Jr. Camp.`,
];

/* ─── Animation variants ────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const lineReveal = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Component ─────────────────────────────────────────── */
export default function About() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-40 section-padding overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section label ─────────────────────────────── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="section-label">01 — About Me</span>
          <motion.div
            variants={lineReveal}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="h-px flex-1 max-w-[120px] bg-accent-cyan/30 origin-left"
          />
        </motion.div>

        {/* ── Two-column grid ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

          {/* LEFT — photo card */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Photo placeholder — replace src with your actual photo */}
            <div className="relative aspect-[4/5] max-w-xs mx-auto lg:mx-0 rounded-2xl overflow-hidden
                            glass-card border border-border-subtle group">

              {/* Gradient placeholder (remove when adding real photo) */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.12) 60%, rgba(5,5,8,0.9) 100%)',
                }}
              />

              {/* Avatar initials placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-7xl font-bold gradient-text select-none opacity-30">
                  SS
                </span>
              </div>

              {/* Replace the two divs above with this when you have a photo:
              <Image
                src="/photo.jpg"
                alt="Your Name"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 80vw, 320px"
                priority
              />
              */}

              {/* Bottom name plate */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,5,8,0.95), transparent)',
                }}
              >
                <p className="font-display text-lg font-bold text-white/90">Saransh Singh</p>
                <p className="font-mono text-[0.65rem] tracking-widest uppercase text-accent-cyan">
                  CS Student &amp; Developer
                </p>
              </div>

              {/* Hover glow border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                           transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(0,212,255,0.2)' }}
                aria-hidden="true"
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -right-4 top-8 glass-card border border-border-subtle
                         rounded-xl px-4 py-3 text-center hidden sm:block"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-2xl font-bold gradient-text">5+</p>
              <p className="font-mono text-[0.58rem] tracking-widest uppercase text-text-muted mt-0.5">
                Projects
              </p>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-8 glass-card border border-border-subtle
                         rounded-xl px-4 py-3 text-center hidden sm:block"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-2xl font-bold gradient-text">7.1</p>
              <p className="font-mono text-[0.58rem] tracking-widest uppercase text-text-muted mt-0.5">
                CGPA
              </p>
            </motion.div>


            {/* Decorative corner accent */}
            <div
              className="absolute -bottom-3 -left-3 w-16 h-16 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
              aria-hidden="true"
            />
          </motion.div>

          {/* RIGHT — bio + traits */}
          <div className="flex flex-col gap-7">

            {/* Heading */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <h2 className="section-heading text-white/90 mb-1">
                Turning ideas into
                <span className="block gradient-text">reality</span>
              </h2>
            </motion.div>

            {/* Bio paragraphs */}
            {BIO_LINES.map((line, i) => (
              <motion.p
                key={i}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="text-text-secondary leading-relaxed text-[0.97rem]"
              >
                {line}
              </motion.p>
            ))}

            {/* Personality / interest tags */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-2 mt-2"
            >
              {TRAITS.map(trait => (
                <span
                  key={trait}
                  className="font-mono text-[0.62rem] tracking-[0.18em] uppercase
                             border border-border-subtle text-text-muted
                             px-3 py-1.5 rounded-full
                             hover:border-border-glow hover:text-accent-cyan
                             transition-all duration-300 cursor-default"
                >
                  {trait}
                </span>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              custom={7}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-4 mt-2"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-widest uppercase
                           bg-accent-cyan text-black font-bold px-6 py-3 rounded-full
                           hover:shadow-glow-cyan hover:scale-[1.03] transition-all duration-300"
              >
                Let&apos;s Talk
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-widest uppercase
                           border border-border-subtle text-text-secondary px-6 py-3 rounded-full
                           hover:border-border-glow hover:text-white transition-all duration-300"
              >
                Resume ↗
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
