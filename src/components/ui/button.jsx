import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium font-code uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        outline:
          "border border-input bg-transparent text-foreground hover:bg-white/[0.06] hover:border-primary/40",
        ghost: "hover:bg-white/[0.06] hover:text-foreground",
        destructive: "bg-red-600 text-white hover:bg-red-600/90",
        link: "text-primary underline-offset-4 hover:underline normal-case tracking-normal",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = ({ className, variant, size, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
};
