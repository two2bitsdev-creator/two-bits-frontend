"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { Blueprint } from "@/components/blueprint/blueprint";
import { PingNetwork } from "@/components/effects/ping-network";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { contactInfoRows, contactNeeds } from "@/config/content";
import { siteConfig } from "@/config/site";
import { isApiConfigured, submitContactRequest } from "@/lib/api";
import type { ContactInfoRow } from "@/types";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; via: "api" | "mail" }
  | { kind: "error"; message: string };

const CHANNELS = [
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: siteConfig.whatsapp,
    Icon: MessageCircle,
  },
  {
    label: "Phone",
    value: siteConfig.phone.display,
    href: `tel:${siteConfig.phone.tel}`,
    Icon: Phone,
  },
  {
    label: "Location",
    value: siteConfig.location.display,
    href: siteConfig.location.href,
    Icon: MapPin,
  },
];

const INFO_ROWS: ContactInfoRow[] = [
  {
    label: "email",
    value: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
  },
  ...contactInfoRows,
];

function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [need, setNeed] = useState(contactNeeds[0]?.value ?? "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const field = (key: string) => String(form.get(key) ?? "").trim();

    const needLabel =
      contactNeeds.find((n) => n.value === need)?.label ?? need;
    const brief = field("brief");
    const payload = {
      fullName: field("name"),
      email: field("email"),
      companyName: field("company") || undefined,
      phone: field("phone") || undefined,
      // The backend has no "service" column, so the selected need leads
      // the message where the inbox will show it.
      message: `[${needLabel}]${brief ? `\n\n${brief}` : ""}`,
    };

    if (!isApiConfigured) {
      const body = [
        payload.message,
        "",
        `— ${payload.fullName}${payload.companyName ? `, ${payload.companyName}` : ""}`,
        payload.phone ?? "",
      ].join("\n");
      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
        `Project brief — ${needLabel}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "sent", via: "mail" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      await submitContactRequest(payload);
      setStatus({ kind: "sent", via: "api" });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  return (
    <section
      id="contact"
      className="border-border bg-secondary relative overflow-hidden border-t"
    >
      <PingNetwork
        align="left"
        className="text-primary opacity-35 [mask-image:linear-gradient(to_right,black,transparent_60%)] dark:opacity-50"
      />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 px-4 py-12 sm:gap-16 sm:px-6 sm:py-18 md:grid-cols-2 md:gap-18 md:px-10 md:py-21 lg:py-23">
        <div className="min-w-0">
          <h6 className="mb-3.5 text-[var(--tb-ink-accent)]">06 — Contact</h6>
          <h2 className="mb-5 text-[clamp(1.85rem,8vw,3.25rem)] leading-[1.06] tracking-[-0.025em] sm:leading-[0.98]">
            TELL US WHAT
            <br />
            YOU&apos;RE BUILDING.
          </h2>
          <p className="text-foreground/75 mb-4 max-w-[44ch] text-[15px] leading-relaxed sm:text-[17px]">
            Whether you&apos;re launching a new product, modernizing your
            business, or exploring AI opportunities, we&apos;re here to turn
            your ideas into secure, scalable, and future-ready digital
            solutions.
          </p>
          <p className="text-muted-foreground mb-8 max-w-[44ch] font-mono text-[12px] leading-relaxed sm:text-[13px]">
            {"// "}send a few lines — a real engineer replies, not a sales
            sequence.
          </p>

          <div className="border-border bg-border mb-6 grid max-w-105 gap-px border font-mono text-[13px]">
            {INFO_ROWS.map((row) => (
              <InfoRow key={row.label} row={row} />
            ))}
          </div>

          <div className="grid max-w-105 grid-cols-1 gap-2.5 sm:grid-cols-3">
            {CHANNELS.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group border-border bg-background text-foreground hover:border-primary hover:text-foreground flex items-center gap-3.5 border px-3.5 py-3 no-underline transition-colors sm:flex-col sm:items-stretch sm:gap-2"
              >
                <span className="flex shrink-0 items-center justify-between">
                  <Icon className="text-primary size-4" strokeWidth={1.75} />
                  <ArrowUpRight className="text-muted-foreground group-hover:text-primary hidden size-3.5 transition-colors sm:block" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-muted-foreground block font-mono text-[10px] tracking-[0.18em] uppercase">
                    {label}
                  </span>
                  <span className="block truncate text-[13px]">{value}</span>
                </span>
                <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-3.5 shrink-0 transition-colors sm:hidden" />
              </a>
            ))}
          </div>
        </div>

        <Blueprint className="bg-background w-full min-w-0 p-4.5 pt-5 pb-5.5 sm:p-8 sm:pt-8 sm:pb-8.5">
          {status.kind === "sent" ? (
            <div
              role="status"
              className="flex min-h-100 flex-col justify-center gap-3.5 font-mono text-sm leading-loose"
            >
              <div>
                <span className="text-[var(--tb-ink-accent)]">$</span> twobits
                contact --send
              </div>
              <div className="text-[var(--tb-ink-accent)]">
                {status.via === "api"
                  ? "✓ brief received"
                  : "✓ brief drafted in your mail app"}
              </div>
              <div>
                {status.via === "api"
                  ? "—— we reply within one working day."
                  : "—— hit send there and we reply within one working day."}
              </div>
              <Button
                variant="outline"
                className="mt-3 self-start"
                onClick={() => setStatus({ kind: "idle" })}
              >
                SEND ANOTHER
              </Button>
            </div>
          ) : (
            <form className="grid gap-4.5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="tb-name">
                  <Input
                    id="tb-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </Field>
                <Field label="Email" htmlFor="tb-email">
                  <Input
                    id="tb-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Company" htmlFor="tb-company">
                  <Input
                    id="tb-company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Optional"
                  />
                </Field>
                <Field label="Phone" htmlFor="tb-phone">
                  <Input
                    id="tb-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Optional"
                  />
                </Field>
              </div>

              <div>
                <Label className="mb-1">What do you need?</Label>
                <RadioGroup
                  value={need}
                  onValueChange={(value) => setNeed(String(value))}
                  className="mt-1 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                >
                  {contactNeeds.map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={option.value}
                        id={`need-${option.value}`}
                      />
                      <Label
                        htmlFor={`need-${option.value}`}
                        className="font-normal"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Field label="Brief" htmlFor="tb-brief">
                <Textarea
                  id="tb-brief"
                  name="brief"
                  maxLength={4000}
                  placeholder="What are you building, and when does it need to be live?"
                />
              </Field>

              {status.kind === "error" && (
                <p
                  role="alert"
                  className="border-destructive/50 text-destructive border px-3.5 py-2.5 font-mono text-[12px]"
                >
                  ✗ {status.message}. Try again, or write to{" "}
                  <a href={`mailto:${siteConfig.contactEmail}`}>
                    {siteConfig.contactEmail}
                  </a>
                  .
                </p>
              )}

              <Blueprint>
                <Button
                  type="submit"
                  size="lg"
                  disabled={status.kind === "sending"}
                  className="w-full py-3.5 text-[15px] tracking-wide"
                >
                  {status.kind === "sending" ? (
                    <span className="flex items-center gap-2.5">
                      <span className="animate-tb-spin size-3.5 rounded-full border-[1.5px] border-current border-t-transparent" />
                      SENDING…
                    </span>
                  ) : (
                    "SEND THE BRIEF"
                  )}
                </Button>
              </Blueprint>
            </form>
          )}
        </Blueprint>
      </div>
    </section>
  );
}

function InfoRow({ row }: { row: ContactInfoRow }) {
  return (
    <div className="bg-secondary flex flex-wrap items-center justify-between gap-2 px-4 py-3.5 sm:gap-4">
      <span className="text-muted-foreground">{row.label}</span>
      {row.href ? (
        <a href={row.href} className="text-right break-all">
          {row.value}
        </a>
      ) : (
        <span className="text-right break-all">{row.value}</span>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

export { Contact };
