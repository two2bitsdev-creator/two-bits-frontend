import { memo } from "react";

// 20 nodes spread across a 1440×800 viewBox in three loose rows
const NODES = [
  { id: 0,  x: 88,   y: 72,  ping: true,  pingDelay: 0   },
  { id: 1,  x: 310,  y: 140                               },
  { id: 2,  x: 560,  y: 60                                },
  { id: 3,  x: 760,  y: 175, ping: true,  pingDelay: 3.5  },
  { id: 4,  x: 960,  y: 82                                },
  { id: 5,  x: 1170, y: 148                               },
  { id: 6,  x: 1370, y: 68                                },
  { id: 7,  x: 170,  y: 320, ping: true,  pingDelay: 7    },
  { id: 8,  x: 440,  y: 280                               },
  { id: 9,  x: 680,  y: 355                               },
  { id: 10, x: 890,  y: 265, ping: true,  pingDelay: 1.8  },
  { id: 11, x: 1090, y: 330                               },
  { id: 12, x: 1310, y: 280                               },
  { id: 13, x: 72,   y: 490                               },
  { id: 14, x: 350,  y: 455, ping: true,  pingDelay: 5.2  },
  { id: 15, x: 610,  y: 515                               },
  { id: 16, x: 840,  y: 470                               },
  { id: 17, x: 1055, y: 525, ping: true,  pingDelay: 9.1  },
  { id: 18, x: 1265, y: 468                               },
  { id: 19, x: 1430, y: 408                               },
];

// 32 edges — indices 0-31
const EDGES = [
  // top row
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
  // top → middle diagonals
  [0,7],[1,7],[1,8],[2,8],[3,9],[4,10],[5,11],[6,12],
  // middle row
  [7,8],[8,9],[9,10],[10,11],[11,12],
  // middle → lower diagonals
  [7,13],[8,14],[9,15],[10,16],[11,17],[12,18],[12,19],
  // lower row
  [13,14],[14,15],[15,16],[16,17],[17,18],[18,19],
];

// Nine traveling pulses spread across the graph
// begin is negative so they're already in flight on first paint
const PULSES = [
  { edge: 1,  dur: 11, delay: 0   },
  { edge: 8,  dur: 14, delay: 2.5 },
  { edge: 15, dur: 9,  delay: 1   },
  { edge: 20, dur: 12, delay: 5   },
  { edge: 26, dur: 10, delay: 3.5 },
  { edge: 31, dur: 13, delay: 7   },
  { edge: 4,  dur: 15, delay: 4   },
  { edge: 19, dur: 11, delay: 1.5 },
  { edge: 24, dur: 8,  delay: 6   },
];

// side="left"  → xMinYMid slice  (shows the left portion of the graph)
// side="right" → xMaxYMid slice  (shows the right portion of the graph)
const HeroBg = memo(({ side = "center" }) => {
  const par =
    side === "left"  ? "xMinYMid slice" :
    side === "right" ? "xMaxYMid slice" :
                       "xMidYMid slice";
  return (
  <svg
    className="absolute inset-0 h-full w-full"
    viewBox="0 0 1440 800"
    preserveAspectRatio={par}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      {/* soft glow behind pulse dots */}
      <filter id="hbg-glow" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* ── Edges ── */}
    {EDGES.map(([a, b], i) => (
      <line
        key={i}
        x1={NODES[a].x} y1={NODES[a].y}
        x2={NODES[b].x} y2={NODES[b].y}
        stroke="#00dbaa"
        strokeWidth="0.65"
        strokeOpacity="0.13"
      />
    ))}

    {/* ── Nodes ── */}
    {NODES.map((node) => (
      <g key={node.id}>
        {node.ping && (
          <circle
            cx={node.x} cy={node.y} r="4"
            stroke="#00dbaa"
            strokeWidth="0.85"
            fill="none"
            className="hero-node-ping"
            style={{ animationDelay: `${node.pingDelay}s` }}
          />
        )}
        {/* outer halo */}
        <circle cx={node.x} cy={node.y} r="2.8" fill="#00dbaa" fillOpacity="0.18" />
        {/* bright core */}
        <circle cx={node.x} cy={node.y} r="1.3" fill="#00dbaa" fillOpacity="0.52" />
      </g>
    ))}

    {/* ── Traveling pulses ── */}
    {PULSES.map(({ edge, dur, delay }, i) => {
      const [a, b] = EDGES[edge];
      const na = NODES[a];
      const nb = NODES[b];
      const path = `M ${na.x},${na.y} L ${nb.x},${nb.y}`;
      return (
        <circle key={i} r="2.5" fill="#00dbaa" filter="url(#hbg-glow)">
          <animateMotion
            path={path}
            dur={`${dur}s`}
            begin={`-${delay}s`}
            repeatCount="indefinite"
            rotate="none"
          />
          <animate
            attributeName="fill-opacity"
            values="0;0.88;0.88;0"
            keyTimes="0;0.07;0.93;1"
            dur={`${dur}s`}
            begin={`-${delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      );
    })}
  </svg>
  );
});

HeroBg.displayName = "HeroBg";
export default HeroBg;
