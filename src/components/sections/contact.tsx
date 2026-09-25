"use client";

import { useState, type ReactNode } from "react";

import { Blueprint } from "@/components/blueprint/blueprint";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { contactInfoRows, contactNeeds } from "@/config/content";
import { siteConfig } from "@/config/site";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="border-border bg-secondary border-t">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 px-4 py-12 sm:gap-16 sm:px-6 sm:py-18 md:grid-cols-2 md:gap-18 md:px-10 md:py-21 lg:py-23">
        <div className="min-w-0">
          <h6 className="mb-3.5 text-[var(--tb-ink-accent)]">05 — Contact</h6>
          <h2 className="mb-5 text-[clamp(1.85rem,8vw,3.25rem)] leading-[1.06] tracking-[-0.025em] sm:leading-[0.98]">
            TELL US WHAT
            <br />
            YOU&apos;RE BUILDING.
          </h2>
          <p className="text-foreground/75 mb-8 max-w-[40ch] text-[15px] leading-relaxed sm:text-[17px]">
            Send a few lines about the project. You get a real engineer on the
            reply, not a sales sequence.
          </p>

          <div className="border-border bg-border grid max-w-105 gap-px border font-mono text-[13px]">
            <InfoRow label="email" value={siteConfig.contactEmail} />
            {contactInfoRows.map((row) => (
              <InfoRow key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
        </div>

        <Blueprint className="bg-background w-full min-w-0 p-4.5 pt-5 pb-5.5 sm:p-8 sm:pt-8 sm:pb-8.5">
          {sent ? (
            <div className="flex min-h-100 flex-col justify-center gap-3.5 font-mono text-sm leading-loose">
              <div>
                <span className="text-[var(--tb-ink-accent)]">$</span> twobits
                contact --send
              </div>
              <div className="text-[var(--tb-ink-accent)]">
                ✓ brief received
              </div>
              <div>—— we reply within one working day.</div>
              <Button
                variant="outline"
                className="mt-3 self-start"
                onClick={() => setSent(false)}
              >
                SEND ANOTHER
              </Button>
            </div>
          ) : (
            <form
              className="grid gap-4.5"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="tb-name">
                  <Input id="tb-name" placeholder="Your name" required />
                </Field>
                <Field label="Email" htmlFor="tb-email">
                  <Input
                    id="tb-email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </Field>
              </div>

              <Field label="Company" htmlFor="tb-company">
                <Input id="tb-company" placeholder="Optional" />
              </Field>

              <div>
                <Label className="mb-1">What do you need?</Label>
                <RadioGroup
                  defaultValue={contactNeeds[0]?.value}
                  className="mt-1 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                >
                  {contactNeeds.map((need) => (
                    <div key={need.value} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={need.value}
                        id={`need-${need.value}`}
                      />
                      <Label
                        htmlFor={`need-${need.value}`}
                        className="font-normal"
                      >
                        {need.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Field label="Brief" htmlFor="tb-brief">
                <Textarea
                  id="tb-brief"
                  placeholder="What are you building, and when does it need to be live?"
                />
              </Field>

              <Blueprint>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full py-3.5 text-[15px] tracking-wide"
                >
                  SEND THE BRIEF
                </Button>
              </Blueprint>
            </form>
          )}
        </Blueprint>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary flex flex-wrap items-center justify-between gap-2 px-4 py-3.5 sm:gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right break-all">{value}</span>
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
