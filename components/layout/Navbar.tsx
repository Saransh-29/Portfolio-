'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Config ───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
] as const;

/* ─── Component ────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState('');

  /* Scroll handler */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);

    // Active section detection
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) {
        setActiveLink(`#${id}`);
        return;
      }
    }
    setActiveLink('');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Close mobile menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Nav link shared style */
  const linkClass = (href: string) =>
    `relative font-mono text-[0.7rem] tracking-[0.14em] uppercase transition-colors duration-300 py-1 ${
      activeLink === href
        ? 'text-accent-cyan'
        : 'text-text-secondary hover:text-white'
    }`;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-5 pointer-events-none"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Pill nav ─────────────────────────────────────── */}
      <nav
        className={`pointer-events-auto glass-nav flex items-center gap-6 md:gap-8 px-6 py-3 rounded-full
          transition-all duration-500 ${scrolled ? 'shadow-glow' : ''}`}
      >
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-base tracking-wider text-white shrink-0"
          aria-label="Home"
        >
          SS<span className="text-accent-cyan">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className={linkClass(href)}>
              {label}
              {/* Active underline */}
              {activeLink === href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent-cyan rounded-full"
                />
              )}
            </a>
          ))}
        </div>

        {/* Resume CTA */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 font-mono text-[0.65rem] tracking-widest uppercase
                     bg-accent-cyan text-black px-4 py-2 rounded-full font-bold
                     hover:bg-white transition-colors duration-300 shrink-0"
        >
          Resume
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-white transition-colors p-1"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <div className="flex flex-col gap-[5px] w-5">
            <motion.span
              className="h-px bg-current origin-center block"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="h-px bg-current block"
              animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="h-px bg-current origin-center block"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </button>
      </nav>

      {/* ── Mobile dropdown ──────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="pointer-events-auto absolute top-[calc(100%-8px)] right-5 w-56 glass-card rounded-2xl p-5
                       flex flex-col gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: -12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{    opacity: 0, y: -12, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 py-1
                  ${activeLink === href
                    ? 'text-accent-cyan'
                    : 'text-text-secondary hover:text-white'
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
            <hr className="hr-gradient my-1" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase text-center
                         border border-border-glow text-accent-cyan px-4 py-2 rounded-full
                         hover:bg-accent-glow transition-colors duration-300"
              onClick={() => setMobileOpen(false)}
            >
              Resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
