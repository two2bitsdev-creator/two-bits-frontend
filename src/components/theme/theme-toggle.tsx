"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Blueprint } from "@/components/blueprint/blueprint";
import { cn } from "@/lib/utils";

/**
 * The "flip a bit" theme switch: a blueprint-framed toggle showing 1/0
 * labels with a sliding knob, instead of a generic sun/moon switch.
 */
function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Hydration guard: `resolvedTheme` is unknown on the server, so we only
    // trust it once mounted client-side, avoiding a light/dark mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Blueprint
      className={cn(
        "border-border hover:border-primary relative h-7 w-14 flex-none border transition-colors",
        className,
      )}
    >
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="text-muted-foreground absolute inset-0 flex items-center justify-between px-2 font-mono text-xs"
      >
        <span>1</span>
        <span>0</span>
        <span
          aria-hidden="true"
          className="bg-primary absolute top-0.5 left-0.5 h-[22px] w-6 transition-transform duration-200 ease-out"
          style={{ transform: isDark ? "translateX(26px)" : "translateX(0px)" }}
        />
      </button>
    </Blueprint>
  );
}

export { ThemeToggle };
