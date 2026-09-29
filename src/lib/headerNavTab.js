import { cn } from "@/lib/utils";

/** Shared chip style for header desktop nav links and matching UI (e.g. process steps). */
export const headerNavTabBase =
  "relative inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 font-code text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-4 focus-visible:ring-offset-0 focus-visible:ring-offset-[#000000] sm:px-4 sm:text-xs";

export const headerNavTabActive =
  "bg-[#000000] text-n-1 ring-1 ring-inset ring-n-4/80 shadow-none hover:text-color-1 hover:ring-color-1/35";

export const headerNavTabInactive =
  "bg-[#000000] text-n-3 shadow-none hover:bg-[#000000] hover:text-color-1 hover:ring-1 hover:ring-inset hover:ring-color-1/35";

export function headerNavTabClassName(active) {
  return cn(headerNavTabBase, active ? headerNavTabActive : headerNavTabInactive);
}
