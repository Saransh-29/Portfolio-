'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app in Lenis smooth scrolling.
 * Uses a RAF loop for buttery 60fps easing.
 */
export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Optional: expose lenis on window for debugging
    if (process.env.NODE_ENV === 'development') {
      (window as unknown as Record<string, unknown>).__lenis = lenis;
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
