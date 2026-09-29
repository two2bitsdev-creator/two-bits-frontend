import Section from "./Section";
import Heading from "./Heading";
import { edtechsLogo, ietLogo, arcLogo, kalimatLogo, client1Logo, client2Logo } from "../assets";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp } from "../hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { surfaceCard } from "@/lib/surface";

const Clients = () => {
  const { ref: clientsRef, isInView: clientsInView } = useScrollAnimation();
  const { ref: gridRef } = useScrollAnimation();

  const clientLogos = [
    {
      name: "EdTechS",
      description: "Syndicate of Educational Technology in Lebanon",
      logo: edtechsLogo,
    },
    {
      name: "IET",
      description: "Interactive Education Technology",
      logo: ietLogo,
    },
    {
      name: "ARC",
      description: "Advanced Research Center",
      logo: arcLogo,
    },
    {
      name: "Kalimat",
      description: "Educational Services",
      logo: kalimatLogo,
    },
    {
      name: "Client 1",
      description: "Partner Organization",
      logo: client1Logo,
    },
    {
      name: "Client 2",
      description: "Partner Organization",
      logo: client2Logo,
    },
  ];

  return (
    <Section id="clients" crosses>
      <div className="container">
        <motion.div
          ref={clientsRef}
          initial="hidden"
          animate={clientsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <Heading tag="Partners" title="Trusted by" text="Leading organizations across various industries" />
        </motion.div>

        <div className={cn("overflow-hidden px-2 py-6 sm:px-4 sm:py-10", surfaceCard)}>
          <div className="relative overflow-hidden">
            <motion.div
              ref={gridRef}
              className="flex gap-6 sm:gap-8 md:gap-12"
              initial={{ x: 0 }}
              animate={{
                x: [0, -2000],
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.12,
                    y: -8,
                    transition: { type: "spring", stiffness: 300, damping: 15 },
                  }}
                  className="flex-shrink-0"
                >
                  {client.logo && (
                    <motion.img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={160}
                      height={160}
                      loading="lazy"
                      className="h-24 w-24 object-contain sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-[10rem] lg:w-[10rem]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Clients;
