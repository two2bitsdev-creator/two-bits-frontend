import Link from "next/link";

import { SiteLogo } from "@/components/brand/site-logo";
import { SocialIcon } from "@/components/brand/social-icon";
import { navItems, siteConfig, socials } from "@/config/site";

function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto grid max-w-[1280px] gap-8 px-5 py-8 text-[13px] sm:px-6 sm:py-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="#top"
            aria-label="Two Bits home"
            className="flex shrink-0 items-center no-underline"
          >
            <SiteLogo className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" />
          </Link>
          <p className="text-foreground/75 max-w-[24ch] text-[14px] leading-snug">
            Building secure, intelligent, and future-ready{" "}
            <span className="text-[var(--tb-ink-accent)]">digital solutions.</span>
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="font-heading flex flex-wrap gap-x-6 gap-y-2 text-[12px] tracking-wider uppercase sm:text-[13px]"
        >
          {[...navItems, { label: "Contact", href: "#contact" }].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary no-underline transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className="border-border text-foreground hover:border-primary hover:text-primary flex size-10 items-center justify-center border transition-colors"
            >
              <SocialIcon icon={social.icon} className="size-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-4 font-mono text-[11px] sm:flex-row sm:items-center sm:gap-6 sm:px-6 md:px-10">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
            {siteConfig.formerName && ` · formerly ${siteConfig.formerName}`}
          </span>
          <span className="sm:mr-auto">1 builds · 0 breaks</span>
          <a href={`mailto:${siteConfig.contactEmail}`} className="break-all">
            {siteConfig.contactEmail}
          </a>
          <span>{siteConfig.location.display}</span>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
