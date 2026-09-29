import { cn } from "@/lib/utils";
import { useEncodedHover } from "@/hooks/useEncodedHover";

/** Single-line label; hover the element to scramble. */
export function EncodedHoverText({ children, className, as: Tag = "span" }) {
  const text = typeof children === "string" ? children : "";
  const { display, bind } = useEncodedHover(text);

  if (!text) {
    return null;
  }

  return (
    <Tag className={cn("inline", className)} {...bind}>
      {display}
    </Tag>
  );
}

/**
 * Label + optional icon(s); hover anywhere on the row (including icons) to scramble the text.
 */
export function EncodedHoverPair({ children, trailing = null, className }) {
  const text = typeof children === "string" ? children : "";
  const { display, bind } = useEncodedHover(text);

  if (!text) {
    return trailing;
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)} {...bind}>
      <span className="inline min-w-0">{display}</span>
      {trailing}
    </span>
  );
}
