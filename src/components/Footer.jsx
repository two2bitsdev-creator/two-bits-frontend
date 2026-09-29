import Section from "./Section";
import { Facebook, Linkedin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { surfacePanel } from "@/lib/surface";
import { pingLogoPng } from "@/assets";

const footerLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ping-tech-3bb388384/",
    Icon: Linkedin,
    accent: "text-[#1da1f2]",
    border: "border-[#1da1f2]/45",
    glow: "shadow-[0_0_18px_rgba(29,161,242,0.12)] hover:shadow-[0_0_24px_rgba(29,161,242,0.22)]",
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61580149907498",
    Icon: Facebook,
    accent: "text-[#3b82f6]",
    border: "border-[#3b82f6]/45",
    glow: "shadow-[0_0_18px_rgba(59,130,246,0.12)] hover:shadow-[0_0_24px_rgba(59,130,246,0.22)]",
  },
  {
    title: "WhatsApp",
    href: "https://wa.me/96170447725",
    Icon: MessageCircle,
    accent: "text-[#22c55e]",
    border: "border-[#22c55e]/45",
    glow: "shadow-[0_0_18px_rgba(34,197,94,0.12)] hover:shadow-[0_0_24px_rgba(34,197,94,0.22)]",
  },
];

const Footer = () => {
  return (
    <Section className="!px-0 !py-10">
      <div className="container">
        <footer
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] border border-[#2f3340] px-5 pt-5 shadow-[0_0_40px_rgba(0,240,192,0.06)] sm:px-6 lg:px-8",
            surfacePanel
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,240,192,0.06),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(172,106,255,0.06),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.75rem-1px)] border border-white/[0.03]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8a6cff]/45 to-transparent" />

          <div className="relative mx-auto grid max-w-[70rem] gap-6 pb-4 lg:grid-cols-[1.08fr_0.94fr_0.72fr] lg:items-center lg:gap-6">
            <div className="max-w-[19rem]">
              <img
                src={pingLogoPng}
                alt="PingTech"
                className="h-auto w-[6.9rem] object-contain"
              />
              <p className="mt-3 max-w-[17rem] font-grotesk text-[1rem] leading-[1.6] text-n-2 sm:text-[1.08rem]">
                Building secure, intelligent, and future-ready <span className="text-color-2">digital solutions.</span>
              </p>
            </div>

            <div className="relative flex flex-wrap items-start justify-center gap-x-7 gap-y-3 lg:justify-center lg:pr-6">
              <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[3.8rem] w-px -translate-y-1/2 bg-white/[0.08] lg:block" />
              {footerLinks.map(({ title, href, Icon, accent, border, glow }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-[4.8rem] flex-col items-center gap-1 text-center"
                >
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-[0.85rem] border bg-app-black transition-all duration-300 group-hover:-translate-y-0.5",
                      accent,
                      border,
                      glow
                    )}
                  >
                    <Icon className="size-4.5" strokeWidth={2} />
                  </span>
                  <span className="text-[0.84rem] text-n-2 transition-colors duration-300 group-hover:text-n-1">
                    {title}
                  </span>
                </a>
              ))}
            </div>

            <div className="lg:justify-self-end">
              <p className="mb-3 text-center font-code text-[0.8rem] uppercase tracking-[0.2em] text-[#39ff6a] sm:text-left">
                SYSTEM STATUS
              </p>
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <span className="size-3.5 rounded-full bg-[#39ff6a] shadow-[0_0_16px_rgba(57,255,106,0.9)]" />
                <div className="rounded-full border border-[#22c55e]/80 px-4 py-1 font-code text-[0.82rem] uppercase tracking-[0.14em] text-[#39ff6a] shadow-[0_0_16px_rgba(34,197,94,0.1)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,197,94,0.18)]">
                  ONLINE
                </div>
              </div>
              <p className="mt-3 text-center text-[0.84rem] leading-relaxed text-n-3 sm:text-left">
                Ready for new projects.
              </p>
            </div>
          </div>

          <div className="relative border-t border-white/[0.08] px-2 py-3.5 text-[0.82rem] text-n-4">
            <div className="mx-auto max-w-[70rem] text-left">
              &copy; 2026 <span className="text-color-2">PingTech.</span> All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Section>
  );
};

export default Footer;
