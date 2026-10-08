import { memo } from "react";

/**
 * SVG overlay placed on top of two-bits-hero-dashboard.png.
 * Traces the six dotted connection lines baked into the raster with
 * animated stroke-dashoffset (flowing teal dots) and pulsing glow dots
 * at all eight endpoint/mid-point positions.
 *
 * ViewBox 1500×1000 matches the image's 3:2 aspect ratio.
 * All animation is pure SMIL — zero extra CSS or dependencies.
 */

// Six paths tracing the dotted lines visible in the raster image.
// Left paths flow card → laptop; right paths flow laptop/phone → card.
const FLOW_PATHS = [
  // Left — AI-Powered card to laptop (top arc)
  { d: "M 242,178 C 310,178 362,205 392,228", dur: "3s",   begin: "0s"    },
  // Left — Cloud Ready card to laptop (flat horizontal)
  { d: "M 238,304 L 310,300 C 358,298 388,294 408,290",   dur: "2.6s", begin: "-0.8s"  },
  // Left — Secure by Design card to laptop (lower arc)
  { d: "M 242,447 C 312,447 364,480 398,512",              dur: "3.4s", begin: "-1.5s"  },
  // Right — laptop edge to Modern Development card (top arc)
  { d: "M 958,182 C 1055,168 1158,148 1252,142",           dur: "3.1s", begin: "-0.5s"  },
  // Right — phone edge to Seamless Integration (flat)
  { d: "M 958,302 L 1110,302 C 1188,302 1224,306 1252,310", dur: "2.8s", begin: "-1.2s" },
  // Right — phone to Data-Driven card (lower arc)
  { d: "M 958,478 C 1055,468 1158,466 1252,468",           dur: "4s",   begin: "-0.3s"  },
];

// Eight glow dots: three left-card endpoints, two mid-path connectors,
// three right-card endpoints.
const GLOW_DOTS = [
  { cx: 242,  cy: 178, dur: "2.2s", begin: "0s"    },
  { cx: 238,  cy: 304, dur: "2.6s", begin: "0.4s"  },
  { cx: 242,  cy: 447, dur: "2.4s", begin: "0.8s"  },
  { cx: 392,  cy: 228, dur: "2.9s", begin: "1.4s"  }, // mid — top left
  { cx: 958,  cy: 290, dur: "2.5s", begin: "1.0s"  }, // mid — right
  { cx: 1252, cy: 142, dur: "2.3s", begin: "0.2s"  },
  { cx: 1252, cy: 310, dur: "2.7s", begin: "0.6s"  },
  { cx: 1252, cy: 468, dur: "2.5s", begin: "1.1s"  },
];

const HeroDashboardOverlay = memo(() => (
  <svg
    className="absolute inset-0 h-full w-full"
    viewBox="0 0 1500 1000"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* ── Flowing dotted paths ── */}
    {FLOW_PATHS.map(({ d, dur, begin }, i) => (
      <path
        key={i}
        d={d}
        stroke="#00dbaa"
        strokeWidth="1.8"
        strokeDasharray="3 13"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.65"
      >
        {/* Move dots along the path: period = dasharray total = 16px */}
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-16"
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
        />
        {/* Subtle breathing on the whole path */}
        <animate
          attributeName="stroke-opacity"
          values="0.45;0.70;0.45"
          dur={`${(parseFloat(dur) * 2.2).toFixed(1)}s`}
          begin={begin}
          repeatCount="indefinite"
        />
      </path>
    ))}

    {/* ── Pulsing glow dots at endpoints ── */}
    {GLOW_DOTS.map(({ cx, cy, dur, begin }, i) => (
      <g key={i}>
        {/* Expanding halo ring */}
        <circle cx={cx} cy={cy} r="5" fill="#00dbaa">
          <animate
            attributeName="r"
            values="4;9;4"
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="0.18;0.04;0.18"
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
        </circle>
        {/* Bright core */}
        <circle cx={cx} cy={cy} r="2.5" fill="#00dbaa">
          <animate
            attributeName="fill-opacity"
            values="0.6;1;0.6"
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
  </svg>
));

HeroDashboardOverlay.displayName = "HeroDashboardOverlay";
export default HeroDashboardOverlay;
