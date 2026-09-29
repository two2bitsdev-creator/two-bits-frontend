"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Blueprint } from "@/components/blueprint/blueprint";
import { MatrixRain } from "@/components/effects/matrix-rain";
import { RainDensityControl } from "@/components/effects/rain-density-control";
import { Terminal } from "@/components/effects/terminal";
import { Button } from "@/components/ui/button";
import { heroIndex, heroQuestions } from "@/config/content";
import { siteConfig } from "@/config/site";
import { useInterval } from "@/hooks/use-interval";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useRainDensity } from "@/hooks/use-rain-density";
import { useScramble } from "@/hooks/use-scramble";
import { cn } from "@/lib/utils";

const QUESTION_MS = 3200;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const },
  },
};

function Hero() {
  const { density } = useRainDensity();
  const reduceMotion = usePrefersReducedMotion();
  // `initial={false}` skips the entrance animation entirely (renders already
  // at the "visible" values) instead of playing it — matching the site's
  // existing prefers-reduced-motion handling elsewhere.
  const initial = reduceMotion ? false : "hidden";

  // Which service the question ticker is pointing at. Hovering an index
  // cell pins it there; leaving resumes the cycle.
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  useInterval(
    () => setActive((i) => (i + 1) % heroQuestions.length),
    pinned ? null : QUESTION_MS,
  );
  const activeCode = heroQuestions[active]?.code;

  return (
    <section
      id="top"
      className="border-border relative overflow-hidden border-b"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 5%, transparent) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <MatrixRain density={density} motion={siteConfig.motion} />

      <div
        aria-hidden="true"
        className="font-heading text-primary pointer-events-none absolute right-[-1.5vw] bottom-[-6vw] text-[clamp(5rem,28vw,16rem)] leading-[0.78] font-semibold opacity-[0.07] select-none"
        style={{ letterSpacing: "-0.04em" }}
      >
        10
      </div>

      <RainDensityControl className="absolute top-3 right-3 z-10 hidden sm:top-6 sm:right-6 sm:flex" />

      <motion.div
        initial={initial}
        animate="visible"
        variants={stagger}
        className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-12 pb-12 sm:gap-12 sm:px-6 sm:py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-10 md:py-24 md:pb-18"
      >
        <motion.div variants={stagger} className="min-w-0">
          <motion.div
            variants={fadeUp}
            className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6.5"
          >
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-[var(--tb-ink-accent)] uppercase sm:text-[11px] sm:tracking-[0.22em]">
              <span className="bg-primary h-px w-8 sm:w-10" />
              <span>Two bits · four states · one team</span>
            </div>
            <RainDensityControl className="flex sm:hidden" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mb-5 text-[clamp(2.15rem,11vw,6rem)] leading-[0.96] font-semibold tracking-[-0.025em] text-balance sm:mb-6 sm:leading-[0.92]"
          >
            <span className="block">
              WE BUILD THE{" "}
              <span className="relative inline-block text-[var(--tb-ink-accent)]">
                1
                <span className="bg-primary absolute inset-x-0 bottom-[0.1em] h-1.5" />
              </span>
              .
            </span>
            <span className="block">
              WE BREAK THE{" "}
              <span className="relative inline-block text-[var(--tb-ink-accent)]">
                0
                <span className="bg-primary absolute inset-x-0 bottom-[0.1em] h-1.5" />
              </span>
              .
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-foreground/78 mb-6 max-w-[46ch] text-[16px] leading-relaxed sm:mb-8.5 sm:text-[19px]"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-col items-stretch gap-3 sm:mb-11 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Blueprint className="w-full sm:w-auto">
                <Button
                  size="lg"
                  nativeButton={false}
                  className="w-full px-5.5 py-3.5 text-[14px] tracking-wide sm:w-auto sm:px-6.5 sm:text-[15px]"
                  render={<Link href="#contact">START A PROJECT</Link>}
                />
              </Blueprint>
            </motion.div>
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                className="w-full px-4.5 py-3.5 text-[14px] tracking-wide sm:w-auto sm:px-5.5 sm:text-[15px]"
                render={<Link href="#services">SEE THE FOUR SERVICES</Link>}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-[560px]">
            <QuestionTicker text={heroQuestions[active]?.text ?? ""} />
            <div
              className="border-border bg-border grid grid-cols-2 gap-px border sm:grid-cols-4"
              onMouseLeave={() => setPinned(false)}
            >
              {heroIndex.map((item) => {
                const lit = item.code === activeCode;
                return (
                  <div
                    key={item.code}
                    onMouseEnter={() => {
                      const i = heroQuestions.findIndex(
                        (q) => q.code === item.code,
                      );
                      if (i >= 0) setActive(i);
                      setPinned(true);
                    }}
                    className={cn(
                      "bg-background relative min-w-0 px-3 py-3 transition-colors duration-300 sm:px-4 sm:py-3.5",
                      lit && "bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "bg-primary absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-500",
                        lit ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                    <div className="mb-1 font-mono text-[10px] text-[var(--tb-ink-accent)]">
                      {item.code}
                    </div>
                    <div className="font-heading text-[13px] sm:text-[15px]">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="min-w-0">
          <Terminal />
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * One line of the ticker: the current visitor question, decoded from noise
 * each time it changes. Decorative (the index grid carries the meaning),
 * so it's hidden from assistive tech rather than announced every 3s.
 */
function QuestionTicker({ text }: { text: string }) {
  const [display, trigger] = useScramble(text);

  useEffect(() => {
    trigger();
  }, [text, trigger]);

  return (
    <div
      aria-hidden="true"
      className="mb-2.5 flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1 font-mono text-[12px] sm:text-[13px]"
    >
      <span className="text-[var(--tb-ink-accent)]">?</span>
      <span className="text-foreground">{display}</span>
      <span className="animate-tb-blink bg-primary inline-block h-3 w-1.5 self-center" />
      <span className="text-muted-foreground ml-auto">
        {siteConfig.name.toLowerCase()} has it covered ↓
      </span>
    </div>
  );
}

export { Hero };
