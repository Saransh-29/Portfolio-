'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── Types ─────────────────────────────────────────────── */
type Filter = 'all' | 'web' | 'mobile' | 'design' | 'oss';

interface Project {
  id:       string;
  title:    string;
  tagline:  string;
  desc:     string;
  tags:     string[];
  filter:   Filter;
  featured: boolean;
  color:    string; // accent glow color
  year:     string;
  live?:    string;
  github?:  string;
  // Replace gradient with image: src: string
}

/* ─── Project data (edit freely) ───────────────────────── */
const PROJECTS: Project[] = [
  {
    id:       'p1',
    title:    'Quantum RNG',
    tagline:  'Quantum computing experiment',
    desc:     'A quantum random number generator leveraging quantum principles to produce truly unpredictable values. Compared quantum-generated output with classical pseudo-random generators for security analysis.',
    tags:     ['Python', 'Quantum Computing', 'Cryptography', 'NumPy'],
    filter:   'oss',
    featured: true,
    color:    '#00d4ff',
    year:     '2024',
    github:   'https://github.com/YOUR_USERNAME/YOUR_REPO',
  },
  {
    id:       'p2',
    title:    'Ilkka Healthcare Website',
    tagline:  'Healthcare brand web presence',
    desc:     'Designed and developed a professional, responsive website for Ilkka Healthcare Pvt Ltd to enhance digital presence. Clean layout with intuitive navigation showcasing company services.',
    tags:     ['HTML', 'CSS', 'JavaScript', 'Figma', 'Responsive Design'],
    filter:   'web',
    featured: false,
    color:    '#10b981',
    year:     '2025',
    live:     'https://YOUR_LIVE_URL',  // replace or remove
  },
  {
    id:       'p3',
    title:    'Threat Detection System',
    tagline:  'Cybersecurity threat scanner',
    desc:     'A cybersecurity threat detection system that scans folders and URLs for malicious files and suspicious links using rule-based and signature-based techniques.',
    tags:     ['Python', 'Cybersecurity', 'Wireshark', 'Signature Detection'],
    filter:   'web',
    featured: false,
    color:    '#f59e0b',
    year:     '2024',
    github:   'https://github.com/YOUR_USERNAME/YOUR_REPO',
  },
  {
    id:       'p4',
    title:    'Keylogger — Security Research',
    tagline:  'Keystroke analysis for security study',
    desc:     'A software-based keylogger for monitoring and recording keystroke events for security analysis and system behaviour study. Includes efficient logging and data handling mechanisms.',
    tags:     ['Python', 'Security Research', 'Linux', 'Data Analysis'],
    filter:   'oss',
    featured: false,
    color:    '#ec4899',
    year:     '2024',
    github:   'https://github.com/YOUR_USERNAME/YOUR_REPO',
  },
];

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',    label: 'All'      },
  { value: 'web',    label: 'Web'      },
  { value: 'mobile', label: 'Mobile'   },
  { value: 'design', label: 'Design'   },
  { value: 'oss',    label: 'Open Source' },
] as const;

/* ─── Featured project card (full-width hero) ───────────── */
function FeaturedCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-full relative rounded-3xl overflow-hidden glass-card border border-border-subtle
                 min-h-[320px] md:min-h-[380px] flex flex-col md:flex-row group cursor-default"
      style={{
        borderColor: hovered ? `${project.color}30` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? `0 0 60px ${project.color}12, 0 8px 40px rgba(0,0,0,0.5)`
          : '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left — gradient visual */}
      <div
        className="md:w-[45%] relative overflow-hidden min-h-[180px] md:min-h-0 shrink-0"
        style={{
          background: `linear-gradient(135deg, ${project.color}18 0%, rgba(5,5,8,0.6) 60%, rgba(5,5,8,0.95) 100%)`,
        }}
      >
        {/* Animated geometric accent */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-20"
          aria-hidden="true"
        >
          <div
            className="w-48 h-48 rounded-full border"
            style={{
              borderColor: project.color,
              boxShadow: `0 0 60px ${project.color}40`,
              animation: 'spin 18s linear infinite',
            }}
          />
          <div
            className="absolute w-32 h-32 rounded-full border"
            style={{
              borderColor: project.color,
              animation: 'spin 12s linear infinite reverse',
            }}
          />
        </div>
        {/* Year badge */}
        <span
          className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-widest uppercase
                     border rounded-full px-3 py-1"
          style={{ borderColor: `${project.color}40`, color: project.color }}
        >
          {project.year}
        </span>
        {/* Featured badge */}
        <span
          className="absolute top-4 right-4 font-mono text-[0.6rem] tracking-widest uppercase
                     px-3 py-1 rounded-full"
          style={{ background: `${project.color}20`, color: project.color }}
        >
          Featured
        </span>
      </div>

      {/* Right — content */}
      <div className="flex flex-col justify-between p-7 md:p-10 flex-1">
        <div>
          <p
            className="font-mono text-[0.62rem] tracking-[0.2em] uppercase mb-3"
            style={{ color: project.color }}
          >
            {project.tagline}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white/90 mb-4">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed max-w-md">
            {project.desc}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[0.6rem] tracking-widest uppercase
                           border border-border-subtle text-text-muted px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Links */}
          <div className="flex gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest uppercase
                           px-5 py-2.5 rounded-full font-bold transition-all duration-300"
                style={{
                  background: project.color,
                  color: '#000',
                  boxShadow: hovered ? `0 0 24px ${project.color}40` : 'none',
                }}
              >
                Live ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest uppercase
                           border border-border-subtle text-text-secondary px-5 py-2.5 rounded-full
                           hover:border-border-glow hover:text-white transition-all duration-300"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Regular project card ──────────────────────────────── */
function ProjectCard({ project, i }: { project: Project; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      key={project.id}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden glass-card border border-border-subtle
                 flex flex-col cursor-default group min-h-[300px]"
      style={{
        borderColor: hovered ? `${project.color}28` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? `0 0 40px ${project.color}10, 0 8px 32px rgba(0,0,0,0.5)`
          : '0 4px 20px rgba(0,0,0,0.35)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.35s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top gradient banner */}
      <div
        className="h-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.color}14 0%, rgba(5,5,8,0.8) 100%)`,
        }}
      >
        {/* Abstract decorative ring */}
        <div
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full border opacity-20 transition-opacity
                     duration-500 group-hover:opacity-40"
          style={{ borderColor: project.color }}
          aria-hidden="true"
        />
        {/* Year */}
        <span
          className="absolute bottom-3 left-4 font-mono text-[0.58rem] tracking-widest uppercase"
          style={{ color: project.color }}
        >
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <p
          className="font-mono text-[0.58rem] tracking-[0.2em] uppercase"
          style={{ color: project.color }}
        >
          {project.tagline}
        </p>
        <h3 className="font-display text-lg font-bold text-white/90 leading-tight">
          {project.title}
        </h3>
        <p className="text-text-secondary text-xs leading-relaxed flex-1 line-clamp-3">
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="font-mono text-[0.56rem] tracking-wider uppercase
                         border border-border-subtle text-text-muted px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="font-mono text-[0.56rem] text-text-muted px-2 py-1">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.6rem] tracking-widest uppercase px-3 py-1.5
                         rounded-full font-bold transition-all duration-300 hover:scale-105"
              style={{ background: `${project.color}20`, color: project.color }}
            >
              Live ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.6rem] tracking-widest uppercase px-3 py-1.5
                         rounded-full border border-border-subtle text-text-muted
                         hover:border-border-glow hover:text-white transition-all duration-300"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────── */
export default function Projects() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Filter>('all');

  const filtered = active === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.filter === active);

  const featured = filtered.filter(p => p.featured);
  const regular  = filtered.filter(p => !p.featured);

  const fadeUp = (i = 0) => ({
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    },
  });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-28 md:py-40 section-padding overflow-hidden"
    >
      {/* Background accent orb */}
      <div
        className="absolute left-0 top-1/3 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.035) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
          <span className="section-label">04 — Projects</span>
          <div className="h-px flex-1 max-w-[100px] bg-accent-cyan/30" />
        </motion.div>

        <motion.h2
          variants={fadeUp(1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-heading text-white/90 mb-3"
        >
          Things I&apos;ve
          <span className="block gradient-text">shipped</span>
        </motion.h2>

        <motion.p
          variants={fadeUp(2)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-text-secondary text-sm mb-10 max-w-md"
        >
          A selection of projects ranging from production SaaS apps to open-source tools and experimental side projects.
        </motion.p>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-2 mb-12"
          role="tablist"
        >
          {FILTERS.map(f => (
            <button
              key={f.value}
              role="tab"
              aria-selected={active === f.value}
              onClick={() => setActive(f.value)}
              className={`font-mono text-[0.62rem] tracking-widest uppercase
                          px-4 py-2 rounded-full border transition-all duration-300
                          ${active === f.value
                            ? 'bg-accent-cyan text-black border-accent-cyan font-bold'
                            : 'border-border-subtle text-text-muted hover:border-border-glow hover:text-white'
                          }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {/* Featured card spans full width */}
            {featured.map(p => <FeaturedCard key={p.id} project={p} />)}
            {/* Regular cards */}
            {regular.map((p, i) => <ProjectCard key={p.id} project={p} i={i} />)}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp(5)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/Saransh-29"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-widest uppercase
                       border border-border-subtle text-text-secondary px-7 py-3 rounded-full
                       hover:border-border-glow hover:text-white transition-all duration-300"
          >
            View all on GitHub ↗
          </a>
        </motion.div>

      </div>
    </section>
  );
}
