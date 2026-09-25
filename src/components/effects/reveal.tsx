"use client";

import type { ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Fades + slides children in the first time they scroll into view.
 * Purely a presentational wrapper — layout/spacing stays on the caller.
 */
function Reveal({
  children,
  className,
  delayMs = 0,
  threshold = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(threshold);
  const reduceMotion = usePrefersReducedMotion();
  const shown = inView || reduceMotion;

  return (
    <div
      ref={ref}
      className={cn(
        !reduceMotion && "transition-all duration-700 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className,
      )}
      style={{ transitionDelay: shown && !reduceMotion ? `${delayMs}ms` : undefined }}
    >
      {children}
    </div>
  );
}

export { Reveal };
