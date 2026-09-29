"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { Reveal } from "@/components/effects/reveal";
import { PROCESS_PANELS } from "@/components/sections/process-panels";
import { processSteps, processTabLabels } from "@/config/content";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScramble } from "@/hooks/use-scramble";
import { cn } from "@/lib/utils";

const STEP_DURATION_MS = 7000;
const STEP_COUNT = processSteps.length;

function Process() {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-scrubbing needs room to pin a tall section, which doesn't suit
  // small screens — mobile keeps the original timer-driven auto-advance.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = usePrefersReducedMotion();
  const scrollDriven = isDesktop && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Timer auto-advance — restarts on every step change (manual or automatic),
  // mirroring the original `startSteps()` restart-on-select behavior. Only
  // runs when scroll isn't driving `step`.
  useEffect(() => {
    if (scrollDriven) return;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % STEP_COUNT);
    }, STEP_DURATION_MS);
    return () => window.clearInterval(id);
  }, [step, scrollDriven]);

  // Scroll-driven stepping — ties `step` to how far the pinned container has
  // scrolled instead of a timer.
  useEffect(() => {
    if (!scrollDriven) return;
    const unsubscribe = smoothProgress.on("change", (value) => {
      setStep(Math.min(STEP_COUNT - 1, Math.floor(value * STEP_COUNT)));
    });
    return unsubscribe;
  }, [scrollDriven, smoothProgress]);

  const handleSelect = (i: number) => {
    if (!scrollDriven || !containerRef.current) {
      setStep(i);
      return;
    }
    // Scroll the pinned container so its progress lands inside step `i`'s
    // band — a manual tab click still "restarts" at that state.
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableRange = containerRef.current.offsetHeight - window.innerHeight;
    const targetTop =
      rect.top + window.scrollY + (i / STEP_COUNT) * scrollableRange + 1;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const ActivePanel = PROCESS_PANELS[step];
  const activeContent = processSteps[step];

  const body = (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-22">
      <Reveal className="mb-9 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
        <div>
          <h6 className="text-accent-300 mb-3.5">02 — Process</h6>
          <h2 className="text-[clamp(1.75rem,7vw,2.875rem)] tracking-[-0.02em] text-white">
            TWO BITS HOLD FOUR STATES
          </h2>
        </div>
        <p className="text-accent-300 max-w-[34ch] font-mono text-[12px] leading-loose sm:text-[13px]">
          00 → 01 → 10 → 11. Consult, build, refine, optimize — every
          engagement runs the same four phases, in the same order.
        </p>
      </Reveal>

      <Reveal
        delayMs={120}
        className="mb-8 grid grid-cols-2 gap-2 sm:mb-13 sm:flex sm:flex-wrap sm:justify-center sm:gap-3.5"
      >
        {processSteps.map((processStep, i) => (
          <ProcessTab
            key={processStep.state}
            code={processStep.code}
            label={processTabLabels[i] ?? processStep.title}
            active={i === step}
            timed={!scrollDriven}
            onSelect={() => handleSelect(i)}
          />
        ))}
      </Reveal>

      <div className="grid min-h-0 min-w-0 items-center gap-10 md:grid-cols-[1fr_1.15fr] md:min-h-95 md:gap-16">
        <div key={`copy-${step}`} className="animate-tb-pop min-w-0">
          <div className="text-accent-400 mb-5.5 font-mono text-xs tracking-[0.2em]">
            state {activeContent.state}
          </div>
          <h3 className="mb-4.5 text-[clamp(1.5rem,6vw,2.75rem)] leading-[1.08] tracking-[-0.02em] text-white sm:leading-[1.02]">
            {activeContent.title}
          </h3>
          <p className="mb-6.5 max-w-[42ch] text-[15px] leading-relaxed text-white/78 sm:text-base">
            {activeContent.description}
          </p>
          <div className="grid gap-2.25 text-[13.5px] text-white/82 sm:text-sm">
            {activeContent.bullets.map((bullet) => (
              <div key={bullet} className="flex gap-2.5">
                <span className="text-accent-400">+</span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
          <div className="mt-6.5 flex max-w-[46ch] flex-col gap-1.5 border-t border-white/16 pt-4 font-mono text-[12px] sm:flex-row sm:gap-3.5 sm:text-[12.5px]">
            <span className="text-accent-400 shrink-0 tracking-[0.2em]">
              OUTCOME →
            </span>
            <span className="text-white/85">{activeContent.outcome}</span>
          </div>
        </div>

        <div key={`panel-${step}`} className="animate-tb-pop min-w-0">
          <ActivePanel />
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="process"
      className="border-border border-y bg-[var(--tb-field)] text-[#eef2f6]"
    >
      {scrollDriven ? (
        <div ref={containerRef} className="relative h-[320vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            {body}
          </div>
        </div>
      ) : (
        <div ref={containerRef}>{body}</div>
      )}
    </section>
  );
}

function ProcessTab({
  code,
  label,
  active,
  timed,
  onSelect,
}: {
  code: string;
  label: string;
  active: boolean;
  timed: boolean;
  onSelect: () => void;
}) {
  const [display, trigger] = useScramble(label);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={trigger}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      className={cn(
        "hover:border-accent-400 relative flex w-full items-center justify-center gap-1.5 border border-white/16 px-3 py-2.5 font-mono text-[10px] tracking-[0.12em] text-[#eef2f6] transition-opacity sm:w-auto sm:gap-2.5 sm:px-5.5 sm:py-3.25 sm:text-xs sm:tracking-[0.16em]",
        active ? "opacity-100" : "opacity-50",
      )}
    >
      <span className="text-accent-400 text-[12px] sm:text-[15px]">{code}</span>
      <span>{display}</span>
      {active && (
        <>
          <span
            aria-hidden="true"
            className="border-primary pointer-events-none absolute -inset-px border"
          />
          {timed ? (
            <span
              aria-hidden="true"
              className="animate-tb-bar bg-primary absolute inset-x-0 bottom-0 h-0.5 origin-left"
              style={{ animationDuration: `${STEP_DURATION_MS}ms` }}
            />
          ) : (
            // Scroll-driven mode has no timer to count down — a static bar
            // just marks the active tab instead of implying one.
            <span
              aria-hidden="true"
              className="bg-primary absolute inset-x-0 bottom-0 h-0.5"
            />
          )}
        </>
      )}
    </motion.button>
  );
}

export { Process };
