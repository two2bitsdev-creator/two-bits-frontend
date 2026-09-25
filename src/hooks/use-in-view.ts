"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports once whether the observed element has scrolled into the
 * viewport, then disconnects — a one-shot reveal trigger rather than a
 * continuous visibility tracker.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip the observer entirely if it's unsupported, or already visible
    // (e.g. small screens / above-the-fold content) — reveal immediately.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
