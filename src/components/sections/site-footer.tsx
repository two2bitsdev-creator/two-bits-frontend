import Link from "next/link";

import { SiteLogo } from "@/components/brand/site-logo";
import { siteConfig } from "@/config/site";

function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex max-w-[1280px] flex-col items-center gap-5 px-5 py-7 text-[13px] sm:flex-row sm:gap-6 sm:px-6 sm:py-8.5 md:px-10">
        <Link
          href="#top"
          aria-label="Two Bits home"
          className="mr-auto flex items-center no-underline"
        >
          <SiteLogo className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" />
        </Link>
        <span className="font-mono text-xs">1 builds · 0 breaks</span>
        <span className="font-mono text-xs break-all">
          {siteConfig.contactEmail}
        </span>
      </div>
    </footer>
  );
}

export { SiteFooter };
