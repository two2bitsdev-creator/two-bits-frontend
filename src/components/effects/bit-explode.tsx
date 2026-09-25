"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

import { serviceGroups } from "@/config/content";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * The four service cards flattened into the four binary states, in explode
 * order (top-left, top-right, bottom-left, bottom-right) — mirrors the
 * `heroIndex` codes in the Hero so this section reads as "the hero's index,
 * exploded open."
 */
const FRAGMENTS = [
  { ...serviceGroups[0]!.services[0]!, originX: -1, originY: -1 },
  { ...serviceGroups[0]!.services[1]!, originX: 1, originY: -1 },
  { ...serviceGroups[1]!.services[0]!, originX: -1, originY: 1 },
  { ...serviceGroups[1]!.services[1]!, originX: 1, originY: 1 },
];

/** [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] for the i-th of `count` evenly-spaced bands across [0.06, 0.9]. */
function bandFor(i: number, count: number): [number, number, number, number] {
  const start = 0.06;
  const span = (0.9 - start) / count;
  const bandStart = start + i * span;
  return [
    bandStart,
    bandStart + span * 0.18,
    bandStart + span * 0.82,
    bandStart + span,
  ];
}

function drawCorners(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  half: number,
  len: number,
  color: string,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const corners: [number, number, number, number][] = [
    [x - half, y - half, 1, 1],
    [x + half, y - half, -1, 1],
    [x - half, y + half, 1, -1],
    [x + half, y + half, -1, -1],
  ];
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * len);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * len, cy);
    ctx.stroke();
  }
}

function BitExplode() {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) return <StaticFourUp />;
  return <ScrollExplode />;
}

function ScrollExplode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const explode = useTransform(
    progress,
    [0.04, 0.3, 0.6, 0.92],
    [0, 0.35, 0.75, 1],
  );

  const introOpacity = useTransform(progress, [0, 0.08], [1, 0]);
  const finalOpacity = useTransform(progress, [0.9, 0.96], [0, 1]);

  const [b0, b1, b2, b3] = FRAGMENTS.map((_, i) => bandFor(i, FRAGMENTS.length));
  const capOpacity = [
    useTransform(progress, b0, [0, 1, 1, 0.35]),
    useTransform(progress, b1, [0, 1, 1, 0.35]),
    useTransform(progress, b2, [0, 1, 1, 0.35]),
    useTransform(progress, b3, [0, 1, 1, 0.35]),
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";
    const dimColor = isDark
      ? "rgba(234, 238, 242, 0.35)"
      : "rgba(29, 31, 32, 0.3)";
    const primary = "#5980a6";
    const fontColor = isDark ? "#eaeef2" : "#1d1f20";

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const base = Math.min(w, h);
      const half = base * 0.1;
      const spread = base * 0.19;
      const corner = half * 0.32;

      const t = explode.get();

      // Fracture seams from center, fading out as fragments separate.
      ctx.globalAlpha = (1 - t) * 0.5;
      ctx.strokeStyle = dimColor;
      ctx.lineWidth = 1;
      for (const frag of FRAGMENTS) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + frag.originX * spread * t, cy + frag.originY * spread * t);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      FRAGMENTS.forEach((frag, i) => {
        const fx = cx + frag.originX * spread * t;
        const fy = cy + frag.originY * spread * t;
        const rotation = frag.originX * frag.originY * (1 - t) * 0.35;
        const highlight = capOpacity[i]!.get();

        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(rotation);

        ctx.strokeStyle = dimColor;
        ctx.strokeRect(-half, -half, half * 2, half * 2);
        drawCorners(ctx, 0, 0, half, corner, dimColor);

        if (highlight > 0.36) {
          const alpha = (highlight - 0.36) / 0.64;
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = primary;
          ctx.strokeRect(-half, -half, half * 2, half * 2);
          drawCorners(ctx, 0, 0, half, corner, primary);
          ctx.globalAlpha = 1;
        }

        ctx.fillStyle = highlight > 0.36 ? primary : fontColor;
        ctx.globalAlpha = highlight > 0.36 ? 1 : 0.55;
        ctx.font = `600 ${Math.round(half * 0.5)}px "IBM Plex Mono", ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(frag.code, 0, 0);
        ctx.globalAlpha = 1;

        ctx.restore();
      });
    };

    render();
    const unsubscribe = explode.on("change", render);
    const unsubCap = capOpacity.map((mv) => mv.on("change", render));
    window.addEventListener("resize", render);
    return () => {
      unsubscribe();
      unsubCap.forEach((u) => u());
      window.removeEventListener("resize", render);
    };
    // capOpacity is a fixed-length array of MotionValues recreated each render;
    // only progress/theme identity should re-trigger the subscription.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explode, resolvedTheme]);

  return (
    <section
      id="index"
      aria-label="Our four services, exploded from the hero index"
      className="relative"
    >
      <div ref={containerRef} className="relative h-[280vh]">
        <div className="border-border bg-background sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden border-y">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in srgb, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 5%, transparent) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <canvas
            ref={canvasRef}
            className="relative h-[min(64vw,440px)] w-[min(64vw,440px)]"
          />

          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-16 text-center sm:pt-20"
              style={{ opacity: introOpacity }}
            >
              <p className="mb-3 font-mono text-[10px] tracking-[0.4em] text-[var(--tb-ink-accent)] uppercase">
                heroIndex --explode
              </p>
              <h2 className="max-w-[16ch] text-[clamp(1.75rem,6vw,3rem)] tracking-[-0.02em]">
                ONE INDEX. FOUR SERVICES.
              </h2>
              <div className="mt-8 flex items-center gap-3">
                <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">
                  Scroll
                </span>
                <motion.span
                  className="text-muted-foreground"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ↓
                </motion.span>
              </div>
            </motion.div>

            {FRAGMENTS.map((frag, i) => (
              <motion.div
                key={frag.code}
                className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-12 sm:pb-16"
                style={{ opacity: capOpacity[i] }}
              >
                <div className="bg-background/85 mx-auto max-w-[46ch] border-t border-[var(--border)] pt-4 text-center backdrop-blur-sm">
                  <p className="text-primary mb-1.5 font-mono text-[11px] tracking-[0.3em]">
                    {frag.code}
                  </p>
                  <h3 className="mb-1.5 text-[clamp(1.1rem,4vw,1.5rem)] tracking-[-0.01em]">
                    {frag.title}
                  </h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed sm:text-sm">
                    {frag.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-14 text-center sm:pb-16"
              style={{ opacity: finalOpacity }}
            >
              <p className="mb-4 text-[clamp(1.25rem,4.5vw,1.875rem)] tracking-[-0.01em]">
                FOUR SERVICES. ONE TEAM.
              </p>
              <Link
                href="#services"
                className="pointer-events-auto text-primary font-mono text-[12px] tracking-[0.2em] uppercase no-underline hover:underline"
              >
                See the four services ↓
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Non-scroll-jacking fallback for `prefers-reduced-motion: reduce`. */
function StaticFourUp() {
  return (
    <section
      id="index"
      aria-label="Our four services"
      className="border-border border-y"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {FRAGMENTS.map((frag) => (
          <div key={frag.code} className="border-border bg-background border p-6">
            <p className="text-primary mb-2 font-mono text-[11px] tracking-[0.3em]">
              {frag.code}
            </p>
            <h3 className="mb-2 text-[1.15rem] tracking-[-0.01em]">
              {frag.title}
            </h3>
            <p className="text-muted-foreground text-[13px] leading-relaxed">
              {frag.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export { BitExplode };
