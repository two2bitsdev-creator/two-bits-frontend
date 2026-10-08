import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { motion } from "framer-motion";
import { useScrollAnimation, scaleIn, staggerContainer } from "../hooks/useScrollAnimation";

const Benefits = () => {
  const { ref: benefitsRef, isInView: benefitsInView } = useScrollAnimation();

  const getCustomIcon = (iconType) => {
    const iconProps = { className: "w-16 h-16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
    
    switch(iconType) {
      case "web":
        return (
          <svg {...iconProps}>
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="#AC6AFF" strokeWidth="2" fill="#AC6AFF" fillOpacity="0.1"/>
            <path d="M2 12H22M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22M12 2C9.5 4.5 8 8 8 12C8 16 9.5 19.5 12 22" stroke="#AC6AFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case "mobile":
        return (
          <svg {...iconProps}>
            <rect x="6" y="2" width="12" height="20" rx="2" stroke="#FFC876" strokeWidth="2" fill="#FFC876" fillOpacity="0.1"/>
            <path d="M10 19H14" stroke="#FFC876" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case "security":
        return (
          <svg {...iconProps}>
            <path d="M12 2L4 6V11C4 16 7.5 20.5 12 22C16.5 20.5 20 16 20 11V6L12 2Z" stroke="#FF776F" strokeWidth="2" fill="#FF776F" fillOpacity="0.1"/>
            <path d="M9 12L11 14L15 10" stroke="#FF776F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "training":
        return (
          <svg {...iconProps}>
            <path d="M12 14L21 9L12 4L3 9L12 14Z" stroke="#7ADB78" strokeWidth="2" strokeLinejoin="round" fill="#7ADB78" fillOpacity="0.1"/>
            <path d="M12 14V22M7 11.5V16.5C7 16.5 9 19 12 19C15 19 17 16.5 17 16.5V11.5" stroke="#7ADB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "support":
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="10" stroke="#858DFF" strokeWidth="2" fill="#858DFF" fillOpacity="0.1"/>
            <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01" stroke="#858DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "agile":
        return (
          <svg {...iconProps}>
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FF98E2" strokeWidth="2" strokeLinejoin="round" fill="#FF98E2" fillOpacity="0.1"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          tag="Expertise"
          title="Why choose Two Bits for your technology needs"
          text="We deliver exceptional results through innovative solutions and expert expertise"
        />

        <motion.div 
          ref={benefitsRef}
          initial="hidden"
          animate={benefitsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-wrap gap-10 mb-10"
        >
          {benefits.map((item) => (
            <motion.div
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] hover:shadow-2xl transition-shadow duration-500"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <motion.h5 
                  className="h5 mb-5"
                  whileHover={{ color: "#00A651" }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.15, y: -5 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                  >
                    {getCustomIcon(item.customIcon)}
                  </motion.div>
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Arrow />
                  </motion.div>
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-app-black"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default Benefits;
