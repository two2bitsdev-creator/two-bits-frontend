import type { Service } from "@/types";

const PATHS: Record<Service["icon"], React.ReactNode> = {
  web: (
    <>
      <rect x="2" y="4" width="20" height="16" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="5.5" y1="6.5" x2="7" y2="6.5" />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" />
      <line x1="10" y1="19" x2="14" y2="19" />
      <line x1="6" y1="5.5" x2="18" y2="5.5" />
    </>
  ),
  pentest: (
    <>
      <circle cx="12" cy="12" r="7" />
      <line x1="12" y1="1.5" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22.5" y2="12" />
    </>
  ),
  training: (
    <>
      <polyline points="4,7 8,12 4,17" />
      <line x1="12" y1="17" x2="20" y2="17" />
    </>
  ),
};

/** Bespoke line-art icons matching the original design (not a generic icon set). */
function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      className="text-primary"
      aria-hidden="true"
    >
      {PATHS[icon]}
    </svg>
  );
}

export { ServiceIcon };
