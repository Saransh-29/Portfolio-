import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Navbar from '@/components/layout/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';

/* ─── Font Definitions ──────────────────────────────────── */

// Display font — geometric, futuristic, high contrast
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

// Body font — clean, readable, modern
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

// Mono font — techy, code aesthetic
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
});

/* ─── Metadata ──────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'Saransh Singh — Developer & Designer',
    template: '%s | Saransh Singh',
  },
  description:
    'CS student at UPES building projects in cybersecurity, healthcare web, and quantum computing.',
  keywords: [
    'developer',
    'designer',
    'portfolio',
    'fullstack',
    'react',
    'nextjs',
    'typescript',
    'ui/ux',
  ],
  authors: [{ name: 'Saransh Singh' }],
  creator: 'Saransh Singh',
  openGraph: {
    type: 'website',
    title: 'Saransh Singh — Developer & Designer',
    description:
      'CS student at UPES — developer, designer, and cybersecurity enthusiast.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saransh Singh — Developer & Designer',
    description: 'CS student, Developer & Designer.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#050508',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/* ─── Root Layout ───────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body className="font-body bg-background text-text-primary antialiased overflow-x-hidden">
        {/* Noise texture overlay for premium feel */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Smooth scroll wrapper */}
        <SmoothScrollProvider>
          {/* Custom mouse cursor */}
          <CustomCursor />

          {/* Navigation */}
          <Navbar />

          {/* Page content */}
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
