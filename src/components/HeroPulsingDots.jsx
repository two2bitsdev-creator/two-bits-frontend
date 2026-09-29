import { memo } from "react";
import { motion } from "framer-motion";

/**
 * Pulsing status-indicator dots placed in the far-left / far-right margins of
 * the hero section — outside the max-w-[62rem] text block and max-w-[72rem]
 * image block at every breakpoint where they are visible (xl+).
 *
 * Each dot has three concentric layers:
 *   1. Outer ring  — expands the farthest and fades out (radar pulse)
 *   2. Middle ring — expands to a moderate distance, offset by 0.65 s
 *   3. Inner dot   — stationary solid core with a gentle brightness pulse
 */

const DOTS = [
  // left column
  { top: "10%", left: "2.8%",  delay: 0    },
  { top: "38%", left: "1.8%",  delay: 1.6  },
  { top: "68%", left: "3.2%",  delay: 0.8  },
  // right column
  { top: "18%", right: "2.4%", delay: 0.5  },
  { top: "50%", right: "1.6%", delay: 2.0  },
  { top: "76%", right: "2.9%", delay: 1.2  },
];

function PulsingDot({ style, delay }) {
  return (
    <div
      className="pointer-events-none absolute hidden xl:block"
      style={style}
      aria-hidden="true"
    >
      {/* 12 px anchor — all child layers use inset-based sizing from here */}
      <div className="relative size-3">

        {/* ── Layer 1: outer ring ── */}
        {/* Starts at 12 px, expands ~4× and fully fades → radar sweep */}
        <motion.span
          className="absolute inset-0 rounded-full border border-[#00dbaa]/35"
          animate={{ scale: [1, 4.2], opacity: [0.4, 0] }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* ── Layer 2: middle ring ── */}
        {/* Starts at 12 px, expands ~2.6× — slightly delayed to stagger the pulse */}
        <motion.span
          className="absolute inset-0 rounded-full border border-[#00dbaa]/50"
          animate={{ scale: [1, 2.6], opacity: [0.52, 0] }}
          transition={{
            duration: 3,
            delay: delay + 0.65,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* ── Layer 3: inner dot ── */}
        {/* inset-[3px] → 6 px solid core, gently breathes in opacity */}
        <motion.span
          className="absolute inset-[3px] rounded-full bg-[#00dbaa]"
          animate={{ opacity: [0.5, 0.88, 0.5] }}
          transition={{
            duration: 2.6,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      </div>
    </div>
  );
}

const HeroPulsingDots = memo(() => (
  <>
    {DOTS.map((dot, i) => {
      const { delay, ...style } = dot;
      return <PulsingDot key={i} style={style} delay={delay} />;
    })}
  </>
));

HeroPulsingDots.displayName = "HeroPulsingDots";
export default HeroPulsingDots;
