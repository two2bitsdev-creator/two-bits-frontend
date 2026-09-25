"use client";

import { useEffect, useState } from "react";

import { Blueprint } from "@/components/blueprint/blueprint";
import { useRainDensity } from "@/hooks/use-rain-density";
import { cn } from "@/lib/utils";

const HOLD_MS = 160;

/**
 * −/+ rain-density stepper. Density changes on hover (and repeats while
 * the pointer stays on the button); click is not used.
 */
function RainDensityControl({ className }: { className?: string }) {
  const { density, min, max, step, increment, decrement } = useRainDensity();
  const segments = (max - min) / step;
  const filled = Math.round((density - min) / step);

  return (
    <Blueprint
      className={cn(
        "bg-background/85 border-border flex items-center gap-2 border px-2.5 py-2 backdrop-blur-sm sm:gap-3 sm:px-3.5 sm:py-2.5",
        className,
      )}
    >
      <span className="text-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase">
        Rain
      </span>

      <HoldButton
        label="Decrease rain density"
        disabled={density <= min}
        onHold={decrement}
      >
        −
      </HoldButton>

      <span
        className="flex items-center gap-0.5"
        role="meter"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={density}
        aria-label="Rain density level"
      >
        {Array.from({ length: segments }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-2.5 w-0.75 sm:h-3 sm:w-1",
              i < filled ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </span>

      <HoldButton
        label="Increase rain density"
        disabled={density >= max}
        onHold={increment}
      >
        +
      </HoldButton>
    </Blueprint>
  );
}

function HoldButton({
  label,
  disabled,
  onHold,
  children,
}: {
  label: string;
  disabled: boolean;
  onHold: () => void;
  children: string;
}) {
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    if (!holding || disabled) return;
    onHold();
    const id = window.setInterval(onHold, HOLD_MS);
    return () => window.clearInterval(id);
  }, [holding, disabled, onHold]);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onPointerEnter={() => setHolding(true)}
      onPointerLeave={() => setHolding(false)}
      onPointerCancel={() => setHolding(false)}
      onBlur={() => setHolding(false)}
      className="border-border hover:border-primary hover:text-primary flex size-6 items-center justify-center border font-mono text-sm leading-none transition-colors disabled:opacity-30 disabled:hover:border-border disabled:hover:text-inherit"
    >
      {children}
    </button>
  );
}

export { RainDensityControl };
