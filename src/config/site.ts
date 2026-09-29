import { env } from "@/lib/env";
import type { Motion, NavItem, Social, Theme } from "@/types";

export const siteConfig = {
  name: "Two Bits",
  /** The studio's previous name — kept for continuity with existing clients. */
  formerName: "PingTech",
  title: "Two Bits — We build the 1. We break the 0.",
  description:
    "Two Bits is a product studio with a security team attached. We ship web and mobile software fast, then attack it ourselves before anyone else gets the chance.",
  url: env.NEXT_PUBLIC_SITE_URL,
  contactEmail: env.NEXT_PUBLIC_CONTACT_EMAIL,
  apiBase: env.NEXT_PUBLIC_API_BASE,
  defaultTheme: env.NEXT_PUBLIC_DEFAULT_THEME satisfies Theme,
  motion: env.NEXT_PUBLIC_MOTION satisfies Motion,
  rainDensity: env.NEXT_PUBLIC_RAIN_DENSITY,
  phone: { display: "+961 70 447 725", tel: "+96170447725" },
  whatsapp: "https://wa.me/96170447725",
  location: {
    display: "Beirut, Lebanon",
    href: "https://maps.google.com/?q=Beirut%2C%20Lebanon",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
];

export const socials: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ping-tech-3bb388384/",
    icon: "linkedin",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61580149907498",
    icon: "facebook",
  },
  { label: "WhatsApp", href: siteConfig.whatsapp, icon: "whatsapp" },
];
