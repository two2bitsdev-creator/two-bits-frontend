"use client";

import { useCallback, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const SCRAMBLE_POOL = "0123456789abcdef01";
const SCRAMBLE_FRAMES = 12;
const SCRAMBLE_FRAME_MS = 30;

/**
 * Reveals `text` character-by-character behind scrambled binary/hex noise
 * when `trigger()` is called (e.g. on hover) — the nav-link "decoding"
 * effect from the original design. Returns the text currently being
 * displayed, and the function that starts the effect.
 */
export function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const [syncedText, setSyncedText] = useState(text);
  const runningRef = useRef(false);
  const reduceMotion = usePrefersReducedMotion();

  // Keep `display` in sync with `text` if the prop changes — adjusted
  // during render (React's recommended pattern for derived state) rather
  // than in an effect, avoiding an extra post-commit render.
  if (text !== syncedText) {
    setSyncedText(text);
    setDisplay(text);
  }

  const trigger = useCallback(() => {
    if (reduceMotion || runningRef.current) return;
    runningRef.current = true;

    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const keep = Math.floor((text.length * frame) / SCRAMBLE_FRAMES);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        next +=
          i < keep || char === " "
            ? char
            : SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
      }
      setDisplay(next);

      if (frame >= SCRAMBLE_FRAMES) {
        window.clearInterval(id);
        setDisplay(text);
        runningRef.current = false;
      }
    }, SCRAMBLE_FRAME_MS);
  }, [text, reduceMotion]);

  return [display, trigger] as const;
}
