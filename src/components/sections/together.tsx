import Image from "next/image";

import { Reveal } from "@/components/effects/reveal";
import { trustGroups } from "@/config/content";
import { cn } from "@/lib/utils";
import type { TrustLogo } from "@/types";

function Together() {
  return (
    <section id="together" className="pt-14 pb-8 sm:pt-20 sm:pb-12 md:pt-22">
      <Reveal className="mx-auto mb-10 flex max-w-[1280px] flex-col gap-6 px-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-12 sm:px-6 md:px-10">
        <div>
          <h6 className="mb-3.5 text-[var(--tb-ink-accent)]">04 — Together</h6>
          <h2 className="max-w-[18ch] text-[clamp(1.75rem,7vw,2.875rem)] tracking-[-0.02em]">
            PARTNERS, CLIENTS, AND PROGRAMS
          </h2>
        </div>
        <p className="text-muted-foreground max-w-[42ch] text-[15px] leading-relaxed sm:text-base">
          Three different relationships. Partners we work alongside. Teams we
          build for. Public bounty programs we report into — not the same
          claim.
        </p>
      </Reveal>

      <div className="grid gap-10 sm:gap-14">
        {trustGroups.map((group, groupIndex) => (
          <Reveal key={group.kind} delayMs={groupIndex * 80}>
            <div className="mx-auto mb-5 flex max-w-[1280px] flex-wrap items-baseline gap-x-3.5 gap-y-1 px-4 sm:px-6 md:px-10">
              <span
                className={cn(
                  "size-2.5 shrink-0",
                  group.kind === "research"
                    ? "border-foreground border"
                    : "bg-primary",
                )}
              />
              <h3 className="font-heading text-lg tracking-[0.08em] uppercase sm:text-xl">
                {group.label}
              </h3>
              <span className="text-muted-foreground ml-auto font-mono text-[11px] tracking-[0.14em]">
                {group.sublabel}
              </span>
            </div>

            <LogoMarquee
              logos={group.logos}
              reverse={groupIndex === 1}
              durationSec={28 + group.logos.length * 6}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LogoMarquee({
  logos,
  reverse = false,
  durationSec,
}: {
  logos: TrustLogo[];
  reverse?: boolean;
  durationSec: number;
}) {
  const set = padLogos(logos);

  return (
    <div className="group/marquee overflow-hidden">
      <div
        className="animate-tb-marquee flex w-max items-center hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <LogoStrip logos={set} />
        <LogoStrip logos={set} ariaHidden />
      </div>
    </div>
  );
}

function LogoStrip({
  logos,
  ariaHidden = false,
}: {
  logos: TrustLogo[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-12 pr-12 sm:gap-16 sm:pr-16 md:gap-20 md:pr-20"
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((logo, i) => (
        <Image
          key={`${logo.src}-${i}`}
          src={logo.src}
          alt={ariaHidden ? "" : logo.name}
          width={360}
          height={160}
          sizes="280px"
          className="h-24 w-auto max-h-24 max-w-[240px] object-contain sm:h-28 sm:max-h-28 sm:max-w-[280px] md:h-32 md:max-h-32 md:max-w-[320px]"
        />
      ))}
    </div>
  );
}

/** Repeat a short list so the marquee strip is always wider than the viewport. */
function padLogos(logos: TrustLogo[]) {
  const out: TrustLogo[] = [...logos];
  while (out.length < 8) {
    out.push(...logos);
  }
  return out;
}

export { Together };
