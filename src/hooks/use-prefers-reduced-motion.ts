"use client";

import { useEffect, useState } from "react";

/** Subscribes to `prefers-reduced-motion` so motion-heavy UI can no-op. */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}

export { usePrefersReducedMotion };
