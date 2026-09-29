import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely (shadcn pattern).
 * @param  {...any} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
