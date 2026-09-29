import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[120px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-n-3 placeholder:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";
