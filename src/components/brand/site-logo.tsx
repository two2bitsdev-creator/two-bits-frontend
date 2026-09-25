import Image from "next/image";

import { cn } from "@/lib/utils";

const FRAME =
  "h-full w-full origin-center scale-[1.52] object-contain -translate-y-[1.5%]";

/**
 * Theme-aware brand lockup. Light uses `public/logo.png`; dark uses
 * `public/logo-dark.png` (brighter sky-blue mark + white tagline).
 * Both are 1024² with the lockup in the middle ~540×600 — same scale
 * so "Innovate.Develop.Secure" stays fully in view. Visibility is
 * toggled with Tailwind `dark:` so it tracks the `html.dark` class
 * without waiting on a client theme hook.
 */
function SiteLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <Image
        src="/logo.png"
        alt="Two Bits — Innovate. Develop. Secure"
        width={1024}
        height={1024}
        priority={priority}
        className={cn(FRAME, "dark:hidden")}
      />
      <Image
        src="/logo-dark.png"
        alt=""
        width={1024}
        height={1024}
        priority={priority}
        aria-hidden="true"
        className={cn(FRAME, "absolute inset-0 hidden dark:block")}
      />
    </span>
  );
}

export { SiteLogo };
