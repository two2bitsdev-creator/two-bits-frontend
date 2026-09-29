import type { Metadata } from "next";
import Link from "next/link";

import { SiteLogo } from "@/components/brand/site-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { isApiConfigured } from "@/lib/api";

export const metadata: Metadata = {
  title: "Inbox — Two Bits",
  robots: { index: false, follow: false },
};

export default function InboxLayout({ children }: LayoutProps<"/wp">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border bg-background/88 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-2 sm:px-6 md:px-10">
          <Link
            href="/"
            aria-label="Back to site"
            className="mr-auto flex items-center gap-3 no-underline"
          >
            <SiteLogo className="h-16 w-16 shrink-0" />
            <span className="text-muted-foreground hidden font-mono text-[11px] tracking-[0.18em] uppercase sm:inline">
              ← site
            </span>
          </Link>
          <span className="text-muted-foreground font-mono text-[11px] tracking-[0.18em] uppercase">
            operator inbox
          </span>
          <ThemeToggle />
        </div>
        <div className="bg-primary h-0.5" aria-hidden="true" />
      </header>

      <main className="flex flex-1 flex-col">
        {isApiConfigured ? (
          children
        ) : (
          <div className="m-auto max-w-[46ch] px-6 py-20 font-mono text-[13px] leading-loose">
            <div>
              <span className="text-[var(--tb-ink-accent)]">$</span> inbox
              --connect
            </div>
            <div className="text-destructive">✗ NEXT_PUBLIC_API_BASE is not set</div>
            <div className="text-muted-foreground">
              Point it at the contact backend and rebuild to enable the inbox.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
