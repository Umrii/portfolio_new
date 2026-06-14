"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `target` (ease-out cubic) once the ref'd element
 * scrolls into view. Respects prefers-reduced-motion by snapping to
 * the final value.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  durationMs = 1400
) {
  const ref = useRef<T | null>(null);
  const started = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const start = () => {
      if (started.current) return;
      started.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(target);
        return;
      }

      const t0 = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - t0) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, durationMs]);

  return { ref, value };
}
