"use client";

import { useEffect, useRef } from "react";

/**
 * Declarative `setInterval`, following Dan Abramov's classic pattern: the
 * callback always sees the latest closure, and the timer itself only
 * resets when `delay` changes. Pass `null` for `delay` to pause.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
