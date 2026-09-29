import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Centralized, validated environment configuration.
 *
 * Every value the app reads from `process.env` is declared and parsed here,
 * so misconfiguration fails fast at startup instead of surfacing as a silent
 * `undefined` deep inside a component.
 */
export const env = createEnv({
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_CONTACT_EMAIL: z.string().email(),
    NEXT_PUBLIC_DEFAULT_THEME: z.enum(["light", "dark"]).default("light"),
    NEXT_PUBLIC_MOTION: z.enum(["showpiece", "calm"]).default("showpiece"),
    NEXT_PUBLIC_RAIN_DENSITY: z.coerce
      .number()
      .int()
      .min(0)
      .max(24)
      .default(14),
    // Origin of the contact/inbox backend (inherited from the Ping stack).
    // Optional: when unset, the contact form falls back to a prefilled
    // mailto: and the /wp inbox shows a "not configured" notice.
    NEXT_PUBLIC_API_BASE: z
      .string()
      .url()
      .transform((url) => url.replace(/\/$/, ""))
      .optional(),
  },
  // Treat `NEXT_PUBLIC_API_BASE=` (empty) the same as unset.
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_DEFAULT_THEME: process.env.NEXT_PUBLIC_DEFAULT_THEME,
    NEXT_PUBLIC_MOTION: process.env.NEXT_PUBLIC_MOTION,
    NEXT_PUBLIC_RAIN_DENSITY: process.env.NEXT_PUBLIC_RAIN_DENSITY,
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
  },
});
