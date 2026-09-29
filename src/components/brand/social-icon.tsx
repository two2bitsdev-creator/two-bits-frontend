import { MessageCircle } from "lucide-react";

import type { Social } from "@/types";

/**
 * Brand glyphs for the footer socials. lucide-react 1.x no longer ships
 * brand icons, so LinkedIn/Facebook use the paths from the Ping asset set
 * (recolored to `currentColor`); WhatsApp uses lucide's chat bubble.
 */
function SocialIcon({
  icon,
  className,
}: {
  icon: Social["icon"];
  className?: string;
}) {
  if (icon === "whatsapp") {
    return (
      <MessageCircle className={className} strokeWidth={1.75} aria-hidden="true" />
    );
  }

  return (
    <svg
      viewBox={icon === "linkedin" ? "0 0 16 16" : "0 0 18 18"}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {icon === "linkedin" ? (
        <path d="M14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.636c.652 0 1.184-.516 1.184-1.153V1.153C16 .516 15.468 0 14.816 0zM4.744 13.636H2.371V5.996h2.373v7.64zM3.557 4.955c-.762 0-1.376-.617-1.376-1.377 0-.759.614-1.376 1.376-1.376.76 0 1.376.617 1.376 1.376 0 .76-.616 1.377-1.376 1.377zm10.079 8.681h-2.37V9.921c0-.884-.015-2.02-1.23-2.02-1.231 0-1.42.961-1.42 1.956v3.779H6.266V5.996h2.274v1.05h.031c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.186z" />
      ) : (
        <path d="M7.103 17.036V10.072H4.713V6.858h2.39V4.613c0-2.445 1.548-3.648 3.73-3.648 1.044 0 1.942.078 2.204.113v2.555l-1.513.001c-1.186 0-1.454.563-1.454 1.39v1.834h3.214l-1.071 3.214H10.07v6.964H7.103z" />
      )}
    </svg>
  );
}

export { SocialIcon };
