import { useState } from "react";
import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import {
  Box,
  ChevronRight,
  Home,
  Menu,
  Send,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";

import { navigation } from "../constants";
import { twoBitsLogo } from "../assets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HEADER_H = "h-[5.5rem] lg:h-[6rem]";
const MOBILE_TOP = "top-[5.5rem]";
const WHATSAPP_URL = "https://wa.me/96170447725";

const navIcons = {
  0: Home,
  1: UserRound,
  2: Box,
  3: SlidersHorizontal,
  4: Send,
};

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16.03 4.75C9.82 4.75 4.78 9.78 4.78 15.97c0 2 .53 3.95 1.54 5.65L4.75 27.25l5.78-1.52a11.2 11.2 0 0 0 5.5 1.44c6.2 0 11.23-5.02 11.23-11.2S22.23 4.75 16.03 4.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.55 10.43c-.25-.55-.52-.57-.76-.58h-.65c-.22 0-.58.08-.88.41-.3.33-1.16 1.13-1.16 2.77 0 1.64 1.19 3.22 1.36 3.45.17.22 2.3 3.68 5.68 5.01 2.8 1.1 3.37.88 3.98.83.61-.06 1.96-.8 2.24-1.57.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.64-.39-.33-.17-1.96-.97-2.27-1.08-.3-.11-.52-.17-.74.17-.22.33-.85 1.08-1.04 1.3-.19.22-.39.25-.72.08-.33-.17-1.41-.52-2.68-1.65-.99-.88-1.66-1.97-1.85-2.3-.19-.33-.02-.51.15-.68.15-.15.33-.39.5-.58.17-.19.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.73-1.82-1.02-2.47Z"
        fill="currentColor"
      />
    </svg>
  );
}

function isActive(item, pathname) {
  return item.url === pathname.hash || (!pathname.hash && item.url === "#hero");
}

function DesktopNavLink({ item, pathname, handleClick }) {
  const active = isActive(item, pathname);
  const Icon = navIcons[item.id] || ChevronRight;

  return (
    <a
      href={item.url}
      onClick={handleClick}
      className={cn(
        "group relative flex min-w-[5.75rem] flex-col items-center justify-center gap-1.5 px-4 py-3 font-code text-[0.72rem] font-semibold uppercase tracking-[0.1em] transition-colors xl:min-w-[6.25rem] xl:px-5",
        active ? "text-color-1" : "text-n-2 hover:text-color-1"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-all duration-300 xl:h-[1.375rem] xl:w-[1.375rem]",
          active ? "drop-shadow-[0_0_12px_rgba(0,255,188,0.65)]" : "text-n-1 group-hover:text-color-1"
        )}
        strokeWidth={1.8}
        aria-hidden
      />
      <span>{item.title}</span>
      <span
        className={cn(
          "absolute bottom-0.5 h-0.5 w-8 rounded-full bg-color-1 transition-all duration-300",
          active ? "opacity-100 shadow-[0_0_18px_rgba(0,255,188,0.85)]" : "opacity-0 group-hover:opacity-70"
        )}
        aria-hidden
      />
    </a>
  );
}

function MobileNavRow({ item, index, pathname, handleClick }) {
  const active = isActive(item, pathname);
  const Icon = navIcons[item.id] || ChevronRight;

  return (
    <li>
      <a
        href={item.url}
        onClick={handleClick}
        className={cn(
          "relative flex min-h-[3.25rem] w-full items-center gap-3 border-b border-n-6/50 px-4 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-n-4 sm:min-h-[3.5rem] sm:px-5",
          "active:bg-[#000000]",
          active
            ? "bg-[#000000] before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-color-1"
            : ""
        )}
      >
        <span className="w-8 shrink-0 font-code text-[10px] tabular-nums tracking-wider text-color-2 sm:text-[11px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Icon className={cn("h-5 w-5 shrink-0", active ? "text-color-1" : "text-n-3")} strokeWidth={1.8} aria-hidden />
        <span
          className={cn(
            "min-w-0 flex-1 font-code text-[0.8rem] font-semibold uppercase leading-snug tracking-[0.12em] sm:text-sm",
            active ? "text-n-1" : "text-n-2 hover:text-color-1"
          )}
        >
          {item.title}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-n-5 opacity-70" aria-hidden />
      </a>
    </li>
  );
}

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <header className="pointer-events-none fixed left-0 top-0 z-50 w-full supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div
        className={cn(
          "relative px-3 py-2 sm:px-5 lg:px-8 lg:py-3",
          HEADER_H,
          openNavigation && "max-xl:bg-[#000000] max-xl:shadow-none"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto relative z-10 mx-auto flex h-full w-full max-w-[88rem] items-center gap-3 rounded-[1.2rem] border border-n-6/75 bg-[#000000]/95 px-4 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.025),0_0_42px_rgba(0,166,81,0.08),0_18px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-md sm:px-5 lg:px-6"
          )}
        >
          <a
            href="#hero"
            onClick={handleClick}
            className="group flex min-w-0 shrink-0 flex-col items-start justify-center gap-0.5 pr-3 sm:min-w-[12rem] md:min-w-[14rem] lg:pr-6 xl:min-w-[17rem]"
          >
            <img
              src={twoBitsLogo}
              width={604}
              height={110}
              alt="Two Bits"
              className="block h-7 w-auto max-w-[8rem] object-contain object-left opacity-95 transition-opacity group-hover:opacity-100 sm:h-8 sm:max-w-[11rem] md:max-w-[12.5rem]"
            />
            <span className="hidden pl-0.5 font-code text-[0.62rem] uppercase leading-none tracking-[0.16em] text-n-2 transition-colors group-hover:text-color-1 sm:block">
              Software<span className="text-n-5">.</span><span className="text-color-1">AI</span><span className="text-n-5">.</span>Security
            </span>
          </a>

          <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-stretch justify-center xl:flex">
            <div className="flex min-w-0 items-stretch justify-center">
              {navigation.map((item, index) => (
                <div key={item.id} className="flex items-stretch">
                  <span className="my-2 w-px bg-n-6/85" aria-hidden />
                  <DesktopNavLink item={item} pathname={pathname} handleClick={handleClick} />
                  {index === navigation.length - 1 ? <span className="my-2 w-px bg-n-6/85" aria-hidden /> : null}
                </div>
              ))}
            </div>
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-4 xl:flex">
            <a
              href="#contact"
              className="group inline-flex h-10 items-center gap-3 rounded-[0.8rem] border border-color-1/45 bg-[#000906] px-4 font-code text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-color-1 shadow-[0_0_18px_rgba(0,166,81,0.26),inset_0_0_14px_rgba(0,166,81,0.08)] transition-all hover:-translate-y-0.5 hover:border-color-1 hover:bg-[#00140d] hover:shadow-[0_0_26px_rgba(0,166,81,0.38),inset_0_0_16px_rgba(0,166,81,0.1)] xl:px-5"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-color-1/50 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-color-1" />
              </span>
              Open for projects
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-color-1/45 bg-[#000906] text-color-1 shadow-[0_0_18px_rgba(0,166,81,0.22),inset_0_0_14px_rgba(0,166,81,0.07)] transition-all hover:-translate-y-0.5 hover:border-color-1 hover:bg-[#00140d] hover:shadow-[0_0_26px_rgba(0,166,81,0.34),inset_0_0_16px_rgba(0,166,81,0.1)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "ml-auto h-10 w-10 shrink-0 rounded-lg border border-n-6 bg-[#000000] text-n-1 shadow-sm transition-all hover:border-color-1 hover:bg-[#000000] hover:text-color-1 xl:hidden",
              openNavigation && "border-color-1 bg-[#000000] text-color-1"
            )}
            onClick={toggleNavigation}
            aria-expanded={openNavigation}
            aria-controls="site-mobile-nav"
            aria-label={openNavigation ? "Close navigation" : "Open navigation"}
          >
            {openNavigation ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </Button>
        </div>
      </div>

      <nav
        id="site-mobile-nav"
        aria-label="Primary mobile"
        className={cn(
          openNavigation ? "flex max-xl:flex-col" : "max-xl:hidden",
          "pointer-events-auto fixed inset-x-0 bottom-0 z-[45] bg-[#000000] xl:hidden",
          MOBILE_TOP,
          "overflow-y-auto overscroll-contain border-t border-n-6/40 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3"
        )}
      >
        <div className="relative flex w-full flex-col">
          <div className="border-b border-n-6/70 px-4 pb-3 pt-1 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-color-1 shadow-[0_0_14px_rgba(0,255,188,0.85)]" aria-hidden />
              <p className="font-code text-[10px] font-semibold uppercase tracking-[0.22em] text-color-3/90">
                Open for projects
              </p>
            </div>
            <p className="mt-2 font-grotesk text-sm text-n-2 sm:text-base">Software, AI, and security delivery.</p>
          </div>
          <ul className="w-full">
            {navigation.map((item, index) => (
              <MobileNavRow
                key={item.id}
                item={item}
                index={index}
                pathname={pathname}
                handleClick={handleClick}
              />
            ))}
          </ul>
          <div className="grid gap-3 px-4 py-5 sm:px-5">
            <a
              href="#contact"
              onClick={handleClick}
              className="inline-flex h-11 items-center justify-center gap-3 rounded-[0.8rem] border border-color-1/45 bg-[#000906] font-code text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-color-1 shadow-[0_0_18px_rgba(0,166,81,0.22),inset_0_0_14px_rgba(0,166,81,0.08)]"
            >
              <span className="h-2 w-2 rounded-full bg-color-1" aria-hidden />
              Open for projects
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[0.8rem] border border-color-1/45 bg-[#000906] font-code text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-color-1 shadow-[0_0_18px_rgba(0,166,81,0.22),inset_0_0_14px_rgba(0,166,81,0.08)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
