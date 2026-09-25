import { env } from "@/lib/env";
import type { Motion, NavItem, Theme } from "@/types";

export const siteConfig = {
  name: "Two Bits",
  title: "Two Bits — We build the 1. We break the 0.",
  description:
    "Two Bits is a product studio with a security team attached. We ship web and mobile software fast, then attack it ourselves before anyone else gets the chance.",
  url: env.NEXT_PUBLIC_SITE_URL,
  contactEmail: env.NEXT_PUBLIC_CONTACT_EMAIL,
  defaultTheme: env.NEXT_PUBLIC_DEFAULT_THEME satisfies Theme,
  motion: env.NEXT_PUBLIC_MOTION satisfies Motion,
  rainDensity: env.NEXT_PUBLIC_RAIN_DENSITY,
} as const;

export const navItems: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Stack", href: "#stack" },
];
