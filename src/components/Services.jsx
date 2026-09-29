import Section from "./Section";
import Heading from "./Heading";
import {
  aiSolutionsImage,
  mobileApplicationsImage,
  penetrationTestingImage,
  trainingConsultingImage,
  webDevelopmentImage,
} from "../assets";
import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, Code2, GraduationCap, ShieldCheck, Smartphone } from "lucide-react";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "../hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { surfaceCard } from "@/lib/surface";

const services = [
  {
    title: "Web Development",
    subtitle: "Build a Stronger Online Presence",
    image: webDevelopmentImage,
    icon: Code2,
    points: [
      "Responsive and scalable solutions",
      "Secure, high-performance architecture",
      "Custom development tailored to your needs",
    ],
  },
  {
    title: "Mobile Applications",
    subtitle: "Engage users everywhere",
    image: mobileApplicationsImage,
    icon: Smartphone,
    reverse: true,
    points: [
      "Native and cross-platform development",
      "Modern, user-focused interfaces",
      "Reliable backend integrations",
    ],
  },
  {
    title: "AI Solutions",
    subtitle: "Work smarter with AI",
    image: aiSolutionsImage,
    icon: BrainCircuit,
    points: ["AI assistants and chatbots", "Business process automation", "Custom AI integrations"],
  },
  {
    title: "Penetration Testing",
    subtitle: "Protect what matters most",
    image: penetrationTestingImage,
    icon: ShieldCheck,
    reverse: true,
    points: ["Web and mobile security testing", "Vulnerability assessments", "Actionable security reports"],
  },
  {
    title: "Training & Consulting",
    subtitle: "Empower your team for success",
    image: trainingConsultingImage,
    icon: GraduationCap,
    points: ["Technical training programs", "Technology consulting", "Digital transformation strategy"],
  },
];

const Services = () => {
  return (
    <Section id="services">
      <div className="container">
        <Heading
          tag="Capabilities"
          title="Our Services"
          text="From custom software to AI and cybersecurity, we provide end-to-end technology services designed to solve complex business challenges."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mx-auto flex max-w-[72rem] flex-col gap-8 lg:gap-10"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const imageOrder = service.reverse ? "lg:order-2" : "lg:order-1";
            const contentOrder = service.reverse ? "lg:order-1" : "lg:order-2";

            return (
              <motion.article
                key={service.title}
                variants={fadeInUp}
                className={cn(
                  "group relative overflow-hidden p-4 sm:p-5 lg:p-6",
                  "before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-color-2/35 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
                  surfaceCard
                )}
              >
                <div
                  className={cn(
                    "grid items-center gap-6 lg:grid-cols-[1.08fr_0.92fr]",
                    service.reverse ? "lg:gap-10" : "lg:gap-16 xl:gap-20"
                  )}
                >
                  <motion.div
                    variants={service.reverse ? fadeInRight : fadeInLeft}
                    className={cn("relative min-h-[16rem] overflow-hidden rounded-xl border border-n-6/80 sm:min-h-[22rem]", imageOrder)}
                  >
                    <img
                      src={service.image}
                      alt={`${service.title} service preview`}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-app-black/70 via-app-black/10 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-app-black/70 px-3 py-2 backdrop-blur-md">
                      <Icon className="size-4 text-color-2" />
                      <span className="font-code text-[0.65rem] uppercase tracking-[0.18em] text-n-1">
                        {service.title}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={service.reverse ? fadeInLeft : fadeInRight}
                    className={cn("px-1 py-2 sm:px-3 lg:px-4", contentOrder)}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-color-2/30 bg-color-2/10 text-color-2 shadow-[0_0_24px_rgba(0,240,192,0.08)]">
                        <Icon className="size-5" />
                      </span>
                      <p className="font-code text-xs uppercase tracking-[0.22em] text-color-2">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>

                    <h3 className="h3 mb-3 font-grotesk text-n-1">{service.title}</h3>
                    <p className="body-1 mb-7 max-w-[34rem] text-n-2">{service.subtitle}</p>

                    <ul className="grid gap-3">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 rounded-lg border border-n-6/70 bg-app-black/70 px-4 py-3">
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-color-2" strokeWidth={2.3} />
                          <span className="body-2 text-n-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
};

export default Services;
