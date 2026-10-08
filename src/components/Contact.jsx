import Section from "./Section";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";

import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer, useScrollAnimation } from "../hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { surfaceCard, surfacePanel } from "@/lib/surface";

const contactChannels = [
  {
    title: "Email",
    detail: "hello@two-bits.dev",
    href: "mailto:hello@two-bits.dev",
    Icon: Mail,
  },
  {
    title: "Phone",
    detail: "+961 70 447 725",
    href: "tel:+96170447725",
    Icon: Phone,
  },
  {
    title: "Location",
    detail: "Beirut, Lebanon",
    href: "https://maps.google.com/?q=Beirut%2C%20Lebanon",
    Icon: MapPin,
  },
];

const Contact = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation();

  return (
    <Section id="contact">
      <div className="container">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className={cn(
            "relative overflow-hidden px-5 py-10 sm:px-8 lg:px-10 lg:py-12",
            surfacePanel
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,240,192,0.14),transparent_34%),radial-gradient(circle_at_78%_70%,rgba(172,106,255,0.12),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-color-2/60 to-transparent" />

          <div className="relative grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-12">
            <motion.div variants={fadeInLeft}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-color-2/25 bg-color-2/10 px-4 py-2">
                <Sparkles className="size-4 text-color-2" strokeWidth={1.8} />
                <span className="font-code text-xs uppercase tracking-[0.22em] text-color-2">Let&apos;s build together</span>
              </div>

              <h2 className="h2 mb-5 max-w-[44rem] text-n-1">
                Ready to Build Something <span className="gradient-text">Exceptional?</span>
              </h2>
              <p className="body-1 max-w-[45rem] text-n-2">
                Whether you&apos;re launching a new product, modernizing your business, or exploring AI opportunities,
                Two Bits is here to help turn your ideas into secure, scalable, and future-ready digital solutions.
              </p>

              <motion.a
                variants={fadeInUp}
                href="https://wa.me/96170447725"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-xl border border-color-2/55 bg-color-2/10 px-5 py-4 font-code text-sm font-semibold uppercase tracking-[0.14em] text-color-2 shadow-[0_0_28px_rgba(0,240,192,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-color-2 hover:bg-color-2/15 hover:shadow-[0_0_38px_rgba(0,240,192,0.24)]"
              >
                <MessageCircle className="size-5" strokeWidth={1.9} />
                Chat on WhatsApp
                <ArrowUpRight className="size-4 transition-transform duration-300 hover:rotate-12" strokeWidth={2} />
              </motion.a>
            </motion.div>

            <motion.div variants={fadeInRight} className="grid gap-4">
              {contactChannels.map(({ title, detail, href, Icon, primary }) => (
                <motion.a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className={cn(
                    "group flex items-center gap-4 p-4",
                    primary && "border-color-2/45 shadow-[0_0_24px_rgba(0,240,192,0.08)]",
                    surfaceCard
                  )}
                >
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                      primary
                        ? "border-color-2/45 bg-color-2/10 text-color-2"
                        : "border-n-6 bg-app-black text-n-3 group-hover:border-color-2/45 group-hover:text-color-2"
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.85} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-code text-xs uppercase tracking-[0.22em] text-n-4">{title}</span>
                    <span className="mt-1 block break-words font-grotesk text-lg text-n-1">{detail}</span>
                  </span>

                  <ArrowUpRight className="size-5 shrink-0 text-n-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12 group-hover:text-color-2" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
