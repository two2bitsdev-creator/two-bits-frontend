import Section from "./Section";
import Heading from "./Heading";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useScrollAnimation, fadeInUp, staggerContainer } from "../hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { surfaceCard, surfacePanel } from "@/lib/surface";

const About = () => {
  const { ref: aboutRef, isInView: aboutInView } = useScrollAnimation();
  const { ref: pointsRef, isInView: pointsInView } = useScrollAnimation();

  const aboutPoints = [
    "Expert Software Engineers",
    "Modern Tech Stack & AI Integration",
    "Solutions Tailored to Your Business",
    "Reliable Project Delivery",
    "Long-Term Support & Maintenance",
    "Fast, Agile Development",
  ];

  return (
    <Section id="about">
      <div className="container">
        <motion.div
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative z-1"
        >
          <Heading
            tag="About Ping"
            className="mb-12 lg:mb-14"
            titleNode={
              <>
                Technology That <span className="gradient-text">Solves</span> Real Business Challenges
              </>
            }
            text="At PING, we're more than a software company - we're your technology partner. We work closely with businesses to understand their goals, overcome challenges, and deliver solutions that create lasting value."
          />

          <div className="relative mx-auto mb-12 max-w-[68rem] lg:mb-14">
            <motion.div
              ref={pointsRef}
              initial="hidden"
              animate={pointsInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {aboutPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -4,
                    transition: { type: "spring", stiffness: 320, damping: 22 },
                  }}
                  className={cn(
                    "group flex min-h-[3.25rem] items-center gap-3 px-4 py-3 text-left",
                    "hover:border-color-2/55 hover:shadow-[0_0_28px_rgba(0,240,192,0.08)]",
                    surfaceCard
                  )}
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-color-2/10 text-color-2 transition-colors duration-300 group-hover:bg-color-2/20">
                    <CheckCircle2 className="size-4" strokeWidth={2.4} />
                  </span>
                  <p className="font-grotesk text-sm leading-5 text-n-1 sm:text-[0.95rem]">{point}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className={cn(
              "mx-auto grid max-w-[68rem] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-10",
              surfacePanel
            )}
          >
            <div>
              <p className="mb-4 font-code text-sm uppercase tracking-[0.28em] text-color-2 sm:text-base">Mission</p>
              <h3 className="mb-5 font-grotesk text-xl leading-tight text-n-1 md:text-2xl">
                Technology That Empowers
              </h3>
              <p className="body-2 max-w-[28rem] text-n-3">
                To help businesses thrive by combining software engineering, artificial intelligence, and cybersecurity
                to deliver innovative, reliable, and future-ready digital solutions.
              </p>
            </div>

            <div>
              <p className="mb-4 font-code text-sm uppercase tracking-[0.28em] text-color-3 sm:text-base">Vision</p>
              <h3 className="mb-5 font-grotesk text-xl leading-tight text-n-1 md:text-2xl">
                Trusted for Tomorrow
              </h3>
              <p className="body-2 max-w-[28rem] text-n-3">
                To become a trusted global technology partner that empowers businesses worldwide through innovative,
                intelligent, and secure digital solutions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
