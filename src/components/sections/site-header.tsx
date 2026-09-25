import Link from "next/link";
import type { CSSProperties } from "react";

import { SiteLogo } from "@/components/brand/site-logo";
import { Blueprint } from "@/components/blueprint/blueprint";
import { ScrambleLink } from "@/components/effects/scramble-text";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/config/site";

function SiteHeader() {
  return (
    <header className="border-border bg-background/88 sticky top-0 z-40 border-b backdrop-blur-md">
      <div
        data-tb-nav
        className="mx-auto flex max-w-[1280px] items-center gap-3 px-[clamp(1rem,3vw,2.5rem)] py-2 sm:gap-4 sm:py-2.5 md:gap-10"
      >
        <Link
          href="#top"
          aria-label="Two Bits home"
          className="mr-auto flex items-center no-underline"
        >
          <SiteLogo
            priority
            className="h-24 w-24 shrink-0 sm:h-28 sm:w-28 md:h-32 md:w-32"
          />
        </Link>

        <nav
          data-tb-navlinks
          className="font-heading text-foreground flex flex-wrap items-center gap-[clamp(0.75rem,2vw,1.75rem)] text-[12px] tracking-wider uppercase sm:text-[13px]"
        >
          {navItems.map((item) => (
            <ScrambleLink
              key={item.href}
              href={item.href}
              className="hover:text-primary text-inherit no-underline transition-colors"
            >
              {item.label}
            </ScrambleLink>
          ))}
        </nav>

        <ThemeToggle />

        <Blueprint data-tb-hidesm="">
          <Button
            size="lg"
            nativeButton={false}
            className="text-[13px] tracking-wide"
            render={<Link href="#contact">START A PROJECT</Link>}
          />
        </Blueprint>
      </div>

      <div
        aria-hidden="true"
        className="animate-tb-prog bg-primary h-0.5 origin-left"
        style={{ animationTimeline: "scroll(root block)" } as CSSProperties}
      />
    </header>
  );
}

export { SiteHeader };
