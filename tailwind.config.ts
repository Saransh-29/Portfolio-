import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Font Families ──────────────────────────────────
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'Menlo', 'monospace'],
      },

      // ─── Colors ─────────────────────────────────────────
      colors: {
        background: '#050508',
        surface:    '#0b0b12',
        'surface-2': '#111118',
        accent: {
          cyan:   '#00d4ff',
          blue:   '#2563eb',
          purple: '#7c3aed',
          violet: '#8b5cf6',
          glow:   'rgba(0,212,255,0.15)',
        },
        text: {
          primary:   'rgba(255,255,255,0.92)',
          secondary: 'rgba(255,255,255,0.50)',
          muted:     'rgba(255,255,255,0.25)',
          disabled:  'rgba(255,255,255,0.12)',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          glow:   'rgba(0,212,255,0.18)',
        },
      },

      // ─── Spacing ─────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },

      // ─── Screens ─────────────────────────────────────────
      screens: {
        xs:  '480px',
        sm:  '640px',
        md:  '768px',
        lg:  '1024px',
        xl:  '1280px',
        '2xl': '1536px',
      },

      // ─── Animations ──────────────────────────────────────
      animation: {
        'blink':        'blink 1s step-end infinite',
        'float-slow':   'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'slide-up':     'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':      'fadeIn 0.8s ease forwards',
        'scan-line':    'scanLine 3s linear infinite',
      },

      // ─── Keyframes ───────────────────────────────────────
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.2)' },
          '50%':      { boxShadow: '0 0 50px rgba(0,212,255,0.5)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scanLine: {
          '0%':   { top: '0%' },
          '100%': { top: '100%' },
        },
      },

      // ─── Background Images ───────────────────────────────
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh':
          'radial-gradient(at 20% 20%, rgba(0,212,255,0.05) 0%, transparent 50%), radial-gradient(at 80% 80%, rgba(124,58,237,0.05) 0%, transparent 50%)',
      },

      // ─── Box Shadows ─────────────────────────────────────
      boxShadow: {
        'glow-cyan':   '0 0 30px rgba(0,212,255,0.25), 0 0 80px rgba(0,212,255,0.08)',
        'glow-purple': '0 0 30px rgba(124,58,237,0.25), 0 0 80px rgba(124,58,237,0.08)',
        'glow-sm':     '0 0 15px rgba(0,212,255,0.15)',
        'card':        '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card-hover':  '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.15)',
        'nav':         '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },

      // ─── Backdrop Blur ───────────────────────────────────
      backdropBlur: {
        xs:  '4px',
        sm:  '8px',
        md:  '16px',
        lg:  '24px',
        xl:  '40px',
      },
    },
  },
  plugins: [],
};

export default config;
