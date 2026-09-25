"use client";

import type { ComponentProps, ElementType, MouseEvent } from "react";

import { useScramble } from "@/hooks/use-scramble";

interface ScrambleLinkProps extends Omit<ComponentProps<"a">, "children"> {
  children: string;
}

/** A nav link whose label "decodes" from binary/hex noise on hover. */
function ScrambleLink({ children, onMouseEnter, ...props }: ScrambleLinkProps) {
  const [display, trigger] = useScramble(children);

  return (
    <a
      {...props}
      onMouseEnter={(event) => {
        trigger();
        onMouseEnter?.(event);
      }}
    >
      {display}
    </a>
  );
}

type ScrambleTextProps<T extends ElementType> = {
  text: string;
  as?: T;
} & Omit<ComponentProps<T>, "as" | "children">;

/**
 * Non-link version of the same "decode" hover effect, for plain text —
 * service titles, process tabs, stack chips, etc. Put border/padding on
 * this element so the whole chip/title is the hover target.
 */
function ScrambleText<T extends ElementType = "span">({
  text,
  as,
  onMouseEnter,
  ...props
}: ScrambleTextProps<T>) {
  const [display, trigger] = useScramble(text);
  const Tag = (as ?? "span") as ElementType;

  return (
    <Tag
      {...props}
      onMouseEnter={(event: MouseEvent<HTMLElement>) => {
        trigger();
        (onMouseEnter as ((event: MouseEvent<HTMLElement>) => void) | undefined)?.(
          event,
        );
      }}
    >
      {display}
    </Tag>
  );
}

export { ScrambleLink, ScrambleText };
