'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const NAV = [
  { label: 'Home',         href: '#home'         },
  { label: 'About',        href: '#about'        },
  { label: 'Tech',         href: '#tech'         },
  { label: 'Skills',       href: '#skills'       },
  { label: 'Projects',     href: '#projects'     },
  { label: 'Experience',   href: '#experience'   },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact'      },
];

const SOCIALS = [
  { label: 'GH',  href: 'https://github.com/YOUR_USERNAME'        },
  { label: 'LI',  href: 'https://linkedin.com/in/YOUR_PROFILE'    },
  { label: 'TW',  href: 'https://twitter.com/YOUR_HANDLE'         },
  { label: 'ML',  href: 'mailto:saranshsingh@example.com'         },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="#home" className="font-display text-2xl font-bold tracking-tight">
              <span className="gradient-text">SS.</span>
            </Link>
            <p className="text-white/30 text-xs font-mono max-w-[200px] text-center md:text-left leading-relaxed">
              CS undergrad. Developer. Designer. Basketball player.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {NAV.map(n => (
              <Link
                key={n.label}
                href={n.href}
                className="text-white/30 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors duration-200"
              >
                {n.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-200 text-xs font-mono"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/[0.06]" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs font-mono">
            © {year} Saransh Singh. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-mono">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}