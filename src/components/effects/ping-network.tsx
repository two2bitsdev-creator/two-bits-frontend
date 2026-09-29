"use client";

import { memo, useId } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The network graph from the Ping hero, carried into Two Bits as the
 * heritage motif: nodes that "ping" and packets travelling the edges.
 * Strokes and fills use `currentColor`, so the caller tints it with a text
 * color (e.g. `text-primary`) and it follows the active theme.
 */

// 20 nodes spread across a 1440×800 viewBox in three loose rows.
const NODES = [
  { x: 88, y: 72, ping: 0 },
  { x: 310, y: 140 },
  { x: 560, y: 60 },
  { x: 760, y: 175, ping: 3.5 },
  { x: 960, y: 82 },
  { x: 1170, y: 148 },
  { x: 1370, y: 68 },
  { x: 170, y: 320, ping: 7 },
  { x: 440, y: 280 },
  { x: 680, y: 355 },
  { x: 890, y: 265, ping: 1.8 },
  { x: 1090, y: 330 },
  { x: 1310, y: 280 },
  { x: 72, y: 490 },
  { x: 350, y: 455, ping: 5.2 },
  { x: 610, y: 515 },
  { x: 840, y: 470 },
  { x: 1055, y: 525, ping: 9.1 },
  { x: 1265, y: 468 },
  { x: 1430, y: 408 },
] as { x: number; y: number; ping?: number }[];

const EDGES: [number, number][] = [
  // top row
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  // top → middle
  [0, 7], [1, 7], [1, 8], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12],
  // middle row
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  // middle → lower
  [7, 13], [8, 14], [9, 15], [10, 16], [11, 17], [12, 18], [12, 19],
  // lower row
  [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19],
];

// Negative `begin` so packets are already in flight on first paint.
const PULSES = [
  { edge: 1, dur: 11, delay: 0 },
  { edge: 8, dur: 14, delay: 2.5 },
  { edge: 15, dur: 9, delay: 1 },
  { edge: 20, dur: 12, delay: 5 },
  { edge: 26, dur: 10, delay: 3.5 },
  { edge: 31, dur: 13, delay: 7 },
  { edge: 4, dur: 15, delay: 4 },
  { edge: 19, dur: 11, delay: 1.5 },
  { edge: 24, dur: 8, delay: 6 },
];

const PingNetwork = memo(function PingNetwork({
  className,
  align = "center",
}: {
  className?: string;
  align?: "left" | "center" | "right";
}) {
  const reduceMotion = usePrefersReducedMotion();
  const glowId = useId();
  const aspect =
    align === "left"
      ? "xMinYMid slice"
      : align === "right"
        ? "xMaxYMid slice"
        : "xMidYMid slice";

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1440 800"
      preserveAspectRatio={aspect}
      fill="none"
    >
      <defs>
        <filter id={glowId} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a]!.x}
          y1={NODES[a]!.y}
          x2={NODES[b]!.x}
          y2={NODES[b]!.y}
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.28"
        />
      ))}

      {NODES.map((node, i) => (
        <g key={i}>
          {node.ping !== undefined && !reduceMotion && (
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              stroke="currentColor"
              strokeWidth="0.9"
              className="animate-tb-ping"
              style={{ animationDelay: `${node.ping}s` }}
            />
          )}
          <rect
            x={node.x - 3}
            y={node.y - 3}
            width="6"
            height="6"
            fill="currentColor"
            fillOpacity="0.22"
          />
          <rect
            x={node.x - 1.4}
            y={node.y - 1.4}
            width="2.8"
            height="2.8"
            fill="currentColor"
            fillOpacity="0.7"
          />
        </g>
      ))}

      {!reduceMotion &&
        PULSES.map(({ edge, dur, delay }, i) => {
          const [a, b] = EDGES[edge]!;
          const path = `M ${NODES[a]!.x},${NODES[a]!.y} L ${NODES[b]!.x},${NODES[b]!.y}`;
          return (
            <rect
              key={i}
              x="-2.5"
              y="-2.5"
              width="5"
              height="5"
              fill="currentColor"
              filter={`url(#${glowId})`}
            >
              <animateMotion
                path={path}
                dur={`${dur}s`}
                begin={`-${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0;0.9;0.9;0"
                keyTimes="0;0.07;0.93;1"
                dur={`${dur}s`}
                begin={`-${delay}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        })}
    </svg>
  );
});

export { PingNetwork };
