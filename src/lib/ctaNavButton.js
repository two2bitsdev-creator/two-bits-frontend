import { cn } from "@/lib/utils";

/**
 * Primary CTAs styled like header nav chips: black + inset ring, then hover →
 * WhatsApp green (color-1), slightly larger radius + scale.
 */
export function ctaNavButtonClassName(extra) {
  return cn(
    "relative inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#000000] px-6 font-code text-[11px] font-semibold uppercase tracking-[0.12em] text-n-3",
    "ring-1 ring-inset ring-n-5/50 shadow-none transition-all duration-300 ease-out",
    "hover:scale-[1.03] hover:rounded-xl hover:bg-color-1 hover:text-n-1 hover:ring-2 hover:ring-inset hover:ring-color-1 hover:shadow-lg hover:shadow-color-1/20",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-4 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]",
    "disabled:pointer-events-none disabled:opacity-45 disabled:hover:scale-100 disabled:hover:rounded-md disabled:hover:bg-[#000000] disabled:hover:text-n-3 disabled:hover:ring-1 disabled:hover:ring-n-5/50",
    extra
  );
}
