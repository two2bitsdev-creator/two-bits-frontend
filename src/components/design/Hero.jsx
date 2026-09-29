import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import PlusSvg from "../../assets/svg/PlusSvg";

export const Gradient = () => {
  return (
    <>
      <div className="relative z-1 mx-2.5 h-6 rounded-b-[1.25rem] bg-app-black shadow-xl lg:mx-8 lg:h-6" />
      <div className="relative z-1 mx-6 h-6 rounded-b-[1.25rem] bg-app-black shadow-xl lg:mx-20 lg:h-6" />
    </>
  );
};

export const BottomLine = () => {
  return (
    <>
      <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block" />

      <PlusSvg className="hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block" />

      <PlusSvg className="hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block" />
    </>
  );
};

const Rings = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 w-[65.875rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};

export const BackgroundCircles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]">
      <Rings />

      {/* Moving background colored circle balls */}
      <motion.div
        className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`-ml-1 -mt-36 h-2 w-2 rounded-full bg-[#DD734F] transition-transform duration-500 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`-ml-1 -mt-32 h-4 w-4 rounded-full bg-[#DD734F] transition-transform duration-500 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`-ml-1 mt-[12.9rem] hidden h-4 w-4 rounded-full bg-[#B9AEDF] transition-transform duration-500 ease-out xl:block ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`-ml-1.5 mt-52 h-3 w-3 rounded-full bg-[#B9AEDF] transition-transform duration-500 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`-ml-3 -mt-3 h-6 w-6 rounded-full bg-[#88E5BE] transition-transform duration-500 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`-ml-3 -mt-3 h-6 w-6 rounded-full bg-[#88E5BE] transition-transform duration-500 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        />
      </motion.div>
    </div>
  );
};
