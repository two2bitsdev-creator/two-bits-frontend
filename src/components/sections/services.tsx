"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { ServiceIcon } from "@/components/sections/service-icon";
import { Blueprint } from "@/components/blueprint/blueprint";
import { Reveal } from "@/components/effects/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScramble } from "@/hooks/use-scramble";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { serviceGroups } from "@/config/content";
import { cn } from "@/lib/utils";
import type { Service, ServiceTrack } from "@/types";

function Services() {
  const [track, setTrack] = useState<ServiceTrack>("all");

  const visibleGroups = serviceGroups.filter(
    (group) => track === "all" || group.track === track,
  );

  return (
    <section
      id="services"
      className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24"
    >
      <Reveal className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-11 sm:flex-row sm:items-end sm:gap-10">
        <div>
          <h6 className="mb-3.5 text-[var(--tb-ink-accent)]">01 — Services</h6>
          <h2 className="max-w-[22ch] text-[clamp(1.75rem,7vw,2.875rem)] tracking-[-0.02em]">
            FOUR SERVICES, TWO INSTINCTS
          </h2>
        </div>

        <div className="flex w-full flex-col items-start gap-2.5 sm:w-auto sm:items-end">
          <span className="text-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase">
            Flip a bit
          </span>
          <ToggleGroup
            value={[track]}
            onValueChange={(values) => {
              const next = values[0] as ServiceTrack | undefined;
              if (next) setTrack(next);
            }}
            variant="outline"
            spacing={0}
            aria-label="Filter services"
            className="w-full sm:w-fit"
          >
            <ToggleGroupItem
              value="all"
              className="data-[pressed]:bg-primary data-[pressed]:text-primary-foreground flex-1 rounded-none text-[11px] sm:flex-none sm:text-xs"
            >
              ALL
            </ToggleGroupItem>
            <ToggleGroupItem
              value="build"
              className="data-[pressed]:bg-primary data-[pressed]:text-primary-foreground flex-1 rounded-none text-[11px] sm:flex-none sm:text-xs"
            >
              1 · BUILD
            </ToggleGroupItem>
            <ToggleGroupItem
              value="secure"
              className="data-[pressed]:bg-primary data-[pressed]:text-primary-foreground flex-1 rounded-none text-[11px] sm:flex-none sm:text-xs"
            >
              0 · SECURE
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Reveal>

      <div
        className={cn(
          "grid min-w-0 items-start gap-7",
          track === "all" ? "md:grid-cols-2" : "mx-auto max-w-180 grid-cols-1",
        )}
      >
        {visibleGroups.map((group, groupIndex) => (
          <div key={group.track} className="min-w-0">
            <div
              className={cn(
                "mb-6 flex flex-wrap items-baseline gap-x-3.5 gap-y-1 border-b-2 pb-3",
                group.track === "build"
                  ? "border-primary"
                  : "border-foreground",
              )}
            >
              <span
                className={cn(
                  "font-heading text-4xl leading-none",
                  group.track === "build" && "text-primary",
                )}
              >
                {group.digit}
              </span>
              <span className="font-heading text-lg tracking-[0.1em] sm:text-xl">
                {group.label}
              </span>
              <span className="text-muted-foreground ml-auto font-mono text-[11px]">
                {group.sublabel}
              </span>
            </div>

            <div className="grid gap-5">
              {group.services.map((service, serviceIndex) => (
                <ServiceCard
                  key={service.code}
                  service={service}
                  delayMs={(groupIndex * 2 + serviceIndex) * 90}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  delayMs,
}: {
  service: Service;
  delayMs: number;
}) {
  const [title, trigger] = useScramble(service.title);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Reveal delayMs={delayMs}>
      <motion.div
        whileHover={reduceMotion ? undefined : { y: -3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      >
        <Blueprint
          onMouseEnter={trigger}
          className="border-border hover:border-primary hover:bg-primary/4 group min-w-0 border p-4.5 transition-colors sm:p-6.5"
        >
          <div className="mb-3.5 flex items-start justify-between gap-5">
            <ServiceIcon icon={service.icon} />
            <span className="text-foreground/45 font-mono text-[11px]">
              {service.code}
            </span>
          </div>
          <h3 className="mb-2 text-[clamp(1.2rem,4.5vw,1.7rem)]">{title}</h3>
          <p className="mb-3.5 text-[14px] leading-relaxed opacity-[0.82] sm:text-[14.5px]">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="border-primary text-primary border px-2.5 py-0.75 text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </Blueprint>
      </motion.div>
    </Reveal>
  );
}

export { Services };
