import { memo } from "react";

/**
 * Decorative side panel for the hero section.
 * Renders a vertical spine with five pulsing diamond nodes, offset horizontal
 * branch lines at each node, and flowing dot animation down the spine.
 *
 * ViewBox 200×900 with preserveAspectRatio="none" so it stretches to fill
 * any panel height while keeping horizontal proportions predictable.
 *
 * side="left"  — spine at x=120, branches go left  (toward outer edge)
 * side="right" — spine at x=80,  branches go right (mirror)
 */

const LEFT_NODES = [
  { x: 120, y: 90,  branchEnd: 44  },
  { x: 120, y: 272, branchEnd: 72  },
  { x: 120, y: 454, branchEnd: 52  },
  { x: 120, y: 636, branchEnd: 80  },
  { x: 120, y: 815, branchEnd: 48  },
];

// Mirror by flipping x around the 200px viewBox centre
const RIGHT_NODES = LEFT_NODES.map(({ x, y, branchEnd }) => ({
  x: 200 - x,
  y,
  branchEnd: 200 - branchEnd,
}));

// Midpoint accent dots between each pair of nodes
const MID_Y = [181, 363, 545, 725];

const diamond = (cx, cy, r) =>
  `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;

const HeroSideDecor = memo(({ side = "left" }) => {
  const nodes  = side === "left" ? LEFT_NODES  : RIGHT_NODES;
  const spineX = side === "left" ? 120         : 80;
  const y1     = nodes[0].y;
  const y2     = nodes[nodes.length - 1].y;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 200 900"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Spine ── */}

      {/* Solid faint backbone */}
      <line
        x1={spineX} y1={y1}
        x2={spineX} y2={y2}
        stroke="#00dbaa"
        strokeWidth="0.65"
        strokeOpacity="0.14"
      />

      {/* Flowing dot layer on spine */}
      <line
        x1={spineX} y1={y1}
        x2={spineX} y2={y2}
        stroke="#00dbaa"
        strokeWidth="1.6"
        strokeDasharray="3 21"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0" to="-24"
          dur="2.9s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          values="0.38;0.62;0.38"
          dur="5.8s"
          repeatCount="indefinite"
        />
      </line>

      {/* ── Midpoint accent dots ── */}
      {MID_Y.map((y, i) => (
        <circle
          key={i}
          cx={spineX} cy={y} r="1.5"
          fill="#00dbaa" fillOpacity="0.18"
        />
      ))}

      {/* ── Diamond nodes ── */}
      {nodes.map(({ x, y, branchEnd }, i) => {
        const dur   = `${2.5 + i * 0.38}s`;
        const begin = `-${(i * 0.42).toFixed(2)}s`;
        return (
          <g key={i}>
            {/* Branch line */}
            <line
              x1={x} y1={y}
              x2={branchEnd} y2={y}
              stroke="#00dbaa"
              strokeWidth="0.65"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.10;0.28;0.10"
                dur={`${3.0 + i * 0.42}s`}
                begin={begin}
                repeatCount="indefinite"
              />
            </line>

            {/* Outer diamond ring */}
            <polygon
              points={diamond(x, y, 7)}
              stroke="#00dbaa"
              strokeWidth="0.9"
              fill="#00dbaa"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.20;0.52;0.20"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0.04;0.15;0.04"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
              />
            </polygon>

            {/* Inner diamond core */}
            <polygon points={diamond(x, y, 3)} fill="#00dbaa">
              <animate
                attributeName="fill-opacity"
                values="0.45;0.88;0.45"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
              />
            </polygon>
          </g>
        );
      })}
    </svg>
  );
});

HeroSideDecor.displayName = "HeroSideDecor";
export default HeroSideDecor;
