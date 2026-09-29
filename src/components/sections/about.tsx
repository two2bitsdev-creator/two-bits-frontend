"use client";

import Image from "next/image";

import { Blueprint } from "@/components/blueprint/blueprint";
import { SiteLogo } from "@/components/brand/site-logo";
import { PingNetwork } from "@/components/effects/ping-network";
import { Reveal } from "@/components/effects/reveal";
import { missionVision, principles } from "@/config/content";
import { siteConfig } from "@/config/site";
import { useScramble } from "@/hooks/use-scramble";
import { cn } from "@/lib/utils";
import type { Principle } from "@/types";

function About() {
  return (
    <section id="about" className="border-border border-t">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-22">
        <Reveal className="mb-9 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <h6 className="mb-3.5 text-[var(--tb-ink-accent)]">04 — About</h6>
            <h2 className="max-w-[20ch] text-[clamp(1.75rem,7vw,2.875rem)] leading-[1.04] tracking-[-0.02em]">
              TECHNOLOGY THAT{" "}
              <span className="text-[var(--tb-ink-accent)]">SOLVES</span> REAL
              BUSINESS CHALLENGES
            </h2>
          </div>
          <p className="text-foreground/75 max-w-[44ch] text-[15px] leading-relaxed sm:text-base">
            We&apos;re more than a software company — we&apos;re your
            technology partner. We work closely with businesses to understand
            their goals, overcome challenges, and deliver solutions that create
            lasting value.
          </p>
        </Reveal>

        <div className="border-border bg-border mb-10 grid grid-cols-1 gap-px border sm:mb-14 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal key={principle.code} delayMs={i * 70} className="bg-background min-w-0">
              <PrincipleCell principle={principle} />
            </Reveal>
          ))}
        </div>

        <div className="mb-10 grid gap-7 sm:mb-14 md:grid-cols-2">
          {missionVision.map((item, i) => (
            <Reveal key={item.label} delayMs={i * 110}>
              <Blueprint className="border-border h-full border p-5 sm:p-7">
                <div
                  className={cn(
                    "mb-5 flex items-baseline gap-3.5 border-b-2 pb-3",
                    item.digit === "1" ? "border-primary" : "border-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "font-heading text-4xl leading-none",
                      item.digit === "1" && "text-primary",
                    )}
                  >
                    {item.digit}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.22em]">
                    {item.label}
                  </span>
                </div>
                <h3 className="mb-3 text-[clamp(1.2rem,4.5vw,1.6rem)] tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="text-foreground/78 max-w-[46ch] text-[14.5px] leading-relaxed sm:text-[15px]">
                  {item.text}
                </p>
              </Blueprint>
            </Reveal>
          ))}
        </div>

        {siteConfig.formerName && <Lineage formerName={siteConfig.formerName} />}
      </div>
    </section>
  );
}

function PrincipleCell({ principle }: { principle: Principle }) {
  const [code, trigger] = useScramble(principle.code);

  return (
    <div
      onMouseEnter={trigger}
      className="group hover:bg-primary/4 flex h-full items-start gap-4 px-4.5 py-5 transition-colors sm:px-6 sm:py-6"
    >
      <span className="text-primary shrink-0 pt-0.5 font-mono text-[12px] tracking-[0.12em]">
        {code}
      </span>
      <span className="text-[15px] leading-snug sm:text-base">{principle.text}</span>
    </div>
  );
}

/**
 * The rename, told the way engineers read history: as a git log. Sits on
 * the Ping network graph — the one visual carried over from the old brand.
 */
function Lineage({ formerName }: { formerName: string }) {
  return (
    <Reveal>
      <Blueprint className="border-border bg-secondary relative overflow-hidden border">
        <PingNetwork className="text-primary opacity-90" />
        <div className="relative grid gap-6 px-4.5 py-7 sm:px-8 sm:py-9 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div className="min-w-0 font-mono text-[12px] leading-[2.1] sm:text-[13px]">
            <div className="text-muted-foreground">
              <span className="text-[var(--tb-ink-accent)]">$</span> git log
              --oneline --follow {siteConfig.name.toLowerCase().replace(" ", "-")}
            </div>
            <div className="truncate">
              <span className="text-[var(--tb-ink-accent)]">0b1011</span>{" "}
              rename → {siteConfig.name} · same team, sharper name
            </div>
            <div className="text-foreground/70 truncate">
              <span className="text-[var(--tb-ink-accent)]">a1f00d</span> ship
              as {formerName} — web, mobile, security
            </div>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-3.5" aria-hidden="true">
              <span className="border-border block size-16 overflow-hidden border bg-white sm:size-20">
                <Image
                  src="/partners/ping.png"
                  alt=""
                  width={160}
                  height={160}
                  className="size-full scale-[1.6] object-contain"
                />
              </span>
              <span className="text-primary font-mono text-lg">→</span>
              <SiteLogo className="size-16 sm:size-20" />
            </div>
            <p className="font-heading max-w-[26ch] text-[clamp(1.25rem,4vw,1.75rem)] leading-tight tracking-[-0.01em] md:text-right">
              FORMERLY {formerName.toUpperCase()}. SAME ENGINEERS,{" "}
              <span className="text-[var(--tb-ink-accent)]">TWO BITS SHARPER.</span>
            </p>
          </div>
        </div>
      </Blueprint>
    </Reveal>
  );
}

export { About };
