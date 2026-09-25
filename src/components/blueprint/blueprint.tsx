import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The recurring "wireframe object" treatment used across the Two Bits
 * design: a square, hairline-bordered box with four corner registration
 * marks. Renders its children plus the corner marks; pass any element type
 * via `asChild`-style composition by wrapping your own tag if needed.
 */
function Blueprint({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="blueprint"
      className={cn("tb-blueprint", className)}
      {...props}
    >
      <BlueprintCorners />
      {children}
    </div>
  );
}

function BlueprintCorners() {
  return (
    <>
      <i className="tb-corner tb-corner-tl" aria-hidden="true" />
      <i className="tb-corner tb-corner-tr" aria-hidden="true" />
      <i className="tb-corner tb-corner-bl" aria-hidden="true" />
      <i className="tb-corner tb-corner-br" aria-hidden="true" />
    </>
  );
}

export { Blueprint, BlueprintCorners };
