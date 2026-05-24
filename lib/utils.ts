import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names without conflicts.
 * Usage: cn('text-white', condition && 'font-bold', 'px-4')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * Ease out exponential — same curve used by Lenis
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
