'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor — only renders on fine-pointer (desktop) devices.
 *
 * Inner dot:  follows mouse exactly, instant
 * Outer ring: lags behind with lerp easing
 *
 * Scales up when hovering interactive elements.
 */
export default function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const pos       = useRef({ x: 0, y: 0 });
  const ring      = useRef({ x: 0, y: 0 });
  const rafRef    = useRef<number>(0);
  const hovering  = useRef(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only mount custom cursor on pointer:fine devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterPage  = () => setVisible(true);
    const onLeavePage  = () => setVisible(false);

    const onEnterHover = () => { hovering.current = true; };
    const onLeaveHover = () => { hovering.current = false; };

    /* Attach hover detection to all interactive elements */
    const addHoverListeners = () => {
      document
        .querySelectorAll('a, button, [role="button"], input, textarea, label, select')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnterHover);
          el.addEventListener('mouseleave', onLeaveHover);
        });
    };

    /* RAF loop for ring lag */
    const tick = () => {
      const lerp = 0.14;
      ring.current.x += (pos.current.x - ring.current.x) * lerp;
      ring.current.y += (pos.current.y - ring.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      if (ringRef.current) {
        const scale = hovering.current ? 1.7 : 1;
        ringRef.current.style.transform =
          `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px) scale(${scale})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove',  onMove, { passive: true });
    document.addEventListener('mouseenter', onEnterPage);
    document.addEventListener('mouseleave', onLeavePage);

    addHoverListeners();

    // Re-scan after any dynamic content loads
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseenter', onEnterPage);
      document.removeEventListener('mouseleave', onLeavePage);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-[6px] h-[6px] rounded-full bg-accent-cyan"
        style={{
          willChange: 'transform',
          boxShadow: '0 0 8px rgba(0,212,255,0.8)',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-9 h-9 rounded-full
                   border border-accent-cyan/30 transition-[transform] duration-100"
        style={{
          willChange: 'transform',
          transitionProperty: 'transform',
          transitionTimingFunction: 'ease-out',
          transitionDuration: '80ms',
        }}
      />
    </>
  );
}
