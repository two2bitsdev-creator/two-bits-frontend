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
  /** One-line promise, carried over from the Ping services page. */
  subtitle: string;
  /** Scene artwork from the Ping site (`public/services/*`). */
  image: string;
  /** What's included — the Ping checklist for this service. */
  points: string[];
}

/** A capability that runs across both tracks rather than owning a bit. */
export interface Capability {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  points: string[];
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
  /** What the client holds at the end of this phase. */
  outcome: string;
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
  href?: string;
}

export interface HeroQuestion {
  /** Matches a `heroIndex` code so the ticker can light up its cell. */
  code: string;
  text: string;
}

export interface Principle {
  /** Three-bit index, e.g. "000". */
  code: string;
  text: string;
}

export interface Social {
  label: string;
  href: string;
  icon: "linkedin" | "facebook" | "whatsapp";
}

/** A submission from the public contact form, as stored by the backend. */
export interface ContactRequest {
  id: string;
  fullName: string;
  email: string;
  companyName?: string | null;
  phone?: string | null;
  message?: string | null;
  createdAt: string;
}

export type TrustKind = "partner" | "client" | "research";

export interface TrustLogo {
  name: string;
  src: string;
  kind: TrustKind;
}
