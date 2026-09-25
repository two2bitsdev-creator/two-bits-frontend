export type Theme = "light" | "dark";

export type Motion = "showpiece" | "calm";

export type ServiceTrack = "all" | "build" | "secure";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  /** Two-digit binary index shown on the card, e.g. "00". */
  code: string;
  title: string;
  description: string;
  tags: string[];
  icon: "web" | "mobile" | "pentest" | "training";
}

export interface ServiceGroup {
  track: Exclude<ServiceTrack, "all">;
  digit: "1" | "0";
  label: string;
  sublabel: string;
  services: Service[];
}

export interface ProcessStep {
  /** Two-digit binary state, e.g. "00". */
  state: string;
  code: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface StackColumn {
  label: string;
  tools: string[];
  filled: boolean;
}

export interface ContactNeed {
  value: string;
  label: string;
}

export interface ContactInfoRow {
  label: string;
  value: string;
}

export type TrustKind = "partner" | "client" | "research";

export interface TrustLogo {
  name: string;
  src: string;
  kind: TrustKind;
}
