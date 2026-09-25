"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import type { Motion } from "@/types";

interface RainColumn {
  left: number;
  duration: number;
  delay: number;
  digits: string[];
}

const DIGITS_PER_COLUMN = 46;

function makeColumns(count: number, calm: boolean): RainColumn[] {
  return Array.from({ length: count }, (_, i) => ({
    left: +((i + 0.5) * (100 / count)).toFixed(2),
    duration: +((calm ? 26 : 14) + Math.random() * 12).toFixed(1),
    delay: +(-Math.random() * 14).toFixed(1),
    digits: Array.from({ length: DIGITS_PER_COLUMN }, () =>
      Math.random() > 0.5 ? "1" : "0",
    ),
  }));
}

/**
 * The hero's falling-binary background. Columns are generated client-side
 * only (via `useEffect`) since they depend on `Math.random`, avoiding a
 * server/client hydration mismatch.
 */
function MatrixRain({ density, motion }: { density: number; motion: Motion }) {
  const { resolvedTheme } = useTheme();
  const [columns, setColumns] = useState<RainColumn[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // `resolvedTheme` can already differ from the server's default on the
    // very first client render (next-themes reads localStorage before
    // hydration), so opacity is only theme-aware once mounted — matching
    // the server-rendered value on first paint, then updating right after.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    // Columns depend on `Math.random`, so they're generated client-only
    // after mount — computing them during render would either run on the
    // server (non-deterministic HTML) or diverge from it (hydration
    // mismatch).
    if (density <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setColumns([]);
      return;
    }
    setColumns(makeColumns(density, motion === "calm"));
  }, [density, motion]);

  const isDark = mounted && resolvedTheme === "dark";
  const opacity = motion === "calm" ? 0.22 : isDark ? 0.55 : 0.38;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500"
      style={{ opacity }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          className="text-accent-500 animate-tb-fall absolute top-0 flex h-[200%] flex-col font-mono text-xs leading-[2.1]"
          style={{
            left: `${col.left}%`,
            // Overrides the base `animate-tb-fall` duration/delay per column
            // (kept as a real utility class above so Tailwind always emits
            // the underlying `@keyframes tb-fall`).
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        >
          {col.digits.map((digit, j) => (
            <span key={j}>{digit}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export { MatrixRain };
