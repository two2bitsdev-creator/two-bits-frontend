import { pingHeroDashboard } from "../assets";
import Section from "./Section";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp, scaleIn, staggerContainer } from "../hooks/useScrollAnimation";
import TagLine from "./Tagline";
import { EncodedHoverPair } from "@/components/EncodedHoverText";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ctaNavButtonClassName } from "@/lib/ctaNavButton";
import { surfacePanel } from "@/lib/surface";

const heroQuestions = [
  "Need a Website?",
  "Building an App?",
  "Exploring AI?",
  "Strengthening Security?",
];

function HeroQuestionStrip({ active }) {
  return (
    <motion.div
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delayChildren: 0.16, staggerChildren: 0.08 },
        },
      }}
      className="relative z-2 mt-5 overflow-hidden rounded-2xl border border-n-6/80 bg-app-black p-4 shadow-[0_18px_70px_-48px_rgba(0,166,81,0.55)] sm:mt-6 sm:p-5"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-color-1/70 to-transparent" />
      <div className="relative">
        <div className="grid gap-0 md:grid-cols-4">
          {heroQuestions.map((question, index) => (
            <motion.div
              key={question}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={cn(
                "group relative min-h-[4.25rem] px-3 py-3 text-center md:px-5",
                index > 0 && "border-t border-n-6/70 md:border-l md:border-t-0"
              )}
            >
              <p className="font-code text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-n-1 transition-colors group-hover:text-color-1">
                {question}
              </p>
              <motion.div
                className="mx-auto mt-4 h-px w-16 origin-center bg-gradient-to-r from-transparent via-color-1 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.55, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-6 bottom-0 hidden h-px overflow-hidden rounded-full bg-n-6/80 md:block">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-color-1 via-color-5 to-color-1"
            initial={{ scaleX: 0 }}
            animate={active ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            initial={{ x: "-120%" }}
            animate={active ? { x: ["-120%", "520%"] } : { x: "-120%" }}
            transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        className="mt-5 text-center font-grotesk text-lg font-semibold tracking-tight text-n-1 sm:text-xl"
      >
        <span className="text-color-1">PingTech</span> has you covered.
      </motion.p>
    </motion.div>
  );
}

const Hero = () => {
  const parallaxRef = useRef(null);
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation();
  const { ref: imageRef, isInView: imageInView } = useScrollAnimation();

  return (
    <Section
      className="pt-[8.5rem] -mt-[5.75rem] sm:pt-[9rem] sm:-mt-[6rem] md:pt-[10rem] lg:pt-[11rem] lg:-mt-[6.5rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative z-1 mx-auto mb-[3.875rem] max-w-[62rem] text-center md:mb-20 lg:mb-[6.25rem]"
        >
          <motion.div variants={fadeInUp}>
            <TagLine className="mb-4 md:justify-center">Ship quality software</TagLine>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="h1 mb-4 break-words px-0.5 sm:mb-6 sm:px-0">
            Transform Your Business with{" "}
            <span className="gradient-text inline-block px-1">Ping</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="body-1 mx-auto mb-8 max-w-3xl text-n-2 lg:mb-10">
            We design and develop high-performance web applications, mobile apps, AI-powered solutions, and secure
            digital platforms that help businesses innovate, automate, and succeed.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <a
              href="#services"
              className={ctaNavButtonClassName("w-full max-w-[16rem] sm:w-auto")}
            >
              <EncodedHoverPair trailing={<ArrowRight className="h-4 w-4 shrink-0" aria-hidden />}>
                EXPLORE OUR SERVICES
              </EncodedHoverPair>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          ref={imageRef}
          initial="hidden"
          animate={imageInView ? "visible" : "hidden"}
          variants={scaleIn}
          className="relative mx-auto max-w-[72rem] overflow-visible px-0.5 sm:px-2 xl:mb-24"
        >
          <motion.div
            className={cn(
              "relative z-1 overflow-hidden p-1 shadow-[0_28px_90px_-42px_rgba(0,166,81,0.55)]",
              surfacePanel
            )}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,166,81,0.18),transparent_42%)]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-color-1/70 to-transparent" />
            <motion.img
              src={pingHeroDashboard}
              className="relative z-1 aspect-[3/2] w-full rounded-[0.95rem] object-cover object-center"
              width={1536}
              height={1024}
              alt="Ping software dashboard across web and mobile interfaces"
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              animate={
                imageInView
                  ? {
                      opacity: 1,
                      y: [0, -8, 0],
                      scale: [1, 1.008, 1],
                    }
                  : { opacity: 0, y: 28, scale: 0.985 }
              }
              transition={{
                opacity: { duration: 0.7, ease: "easeOut" },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06]" />
          </motion.div>
          <HeroQuestionStrip active={imageInView} />
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
