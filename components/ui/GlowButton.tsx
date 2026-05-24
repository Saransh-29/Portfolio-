'use client';

import { motion } from 'framer-motion';

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
  className?: string;
}

/**
 * Reusable animated button with glow effect.
 *
 * Primary  — filled cyan, glowing on hover
 * Secondary — ghost/border with glass hover
 */
export default function GlowButton({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
}: GlowButtonProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a href={href} {...linkProps} className={`inline-block ${className}`}>
      <motion.span
        className={`
          relative inline-flex items-center gap-2
          font-mono text-[0.7rem] tracking-[0.14em] uppercase font-bold
          px-7 py-3.5 rounded-full
          transition-all duration-300
          select-none overflow-hidden group
          ${
            variant === 'primary'
              ? `bg-accent-cyan text-black
                 hover:shadow-[0_0_40px_rgba(0,212,255,0.45),0_0_80px_rgba(0,212,255,0.15)]
                 hover:scale-[1.03]`
              : `border border-border-subtle text-text-secondary
                 hover:border-border-glow hover:text-white
                 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]`
          }
        `}
        whileHover={{ scale: variant === 'primary' ? 1.04 : 1.02 }}
        whileTap={  { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Shimmer layer for secondary */}
        {variant === 'secondary' && (
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                       transition-opacity duration-400 pointer-events-none"
            style={{ background: 'rgba(0,212,255,0.04)' }}
            aria-hidden="true"
          />
        )}

        {children}

        {/* Arrow icon for primary */}
        {variant === 'primary' && (
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        )}

        {/* External link icon */}
        {variant === 'secondary' && external && (
          <svg
            className="w-3 h-3 opacity-50 group-hover:opacity-80 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </motion.span>
    </a>
  );
}
