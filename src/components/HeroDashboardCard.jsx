import { memo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// ── static data ───────────────────────────────────────────────────────────────

const STATS = [
  { label: "Total Projects",  val: 24,   sfx: "",  trend: "+12%" },
  { label: "Tasks Completed", val: 156,  sfx: "",  trend: "+18%" },
  { label: "Active Users",    val: 2540, sfx: "",  trend: "+24%" },
  { label: "System Uptime",   val: 99.9, sfx: "%", trend: "+0.3%" },
];

const PROJECTS = [
  { name: "E-commerce Platform", pct: 75, color: "#00dbaa" },
  { name: "Mobile Banking App",  pct: 60, color: "#00dbaa" },
  { name: "AI Customer Support", pct: 40, color: "#8b5cf6" },
];

const LEFT_CARDS = [
  { glyph: "AI",  bg: "#7c3aed22", border: "#7c3aed55", fg: "#a78bfa", title: "AI-Powered",       desc: "Intelligent solutions that learn and adapt"   },
  { glyph: "☁",   bg: "#0ea5e922", border: "#0ea5e955", fg: "#38bdf8", title: "Cloud Ready",      desc: "Scalable, secure and built for the cloud"     },
  { glyph: "✓",   bg: "#10b98122", border: "#10b98155", fg: "#34d399", title: "Secure by Design", desc: "Advanced security to protect what matters"    },
];

const RIGHT_CARDS = [
  { glyph: "</>", bg: "#6366f122", border: "#6366f155", fg: "#818cf8", title: "Modern Development",   desc: "Clean code. Best practices. Great performance." },
  { glyph: "API", bg: "#0ea5e922", border: "#0ea5e955", fg: "#38bdf8", title: "Seamless Integration", desc: "Powerful APIs that connect your ecosystem"       },
  { glyph: "↗",   bg: "#f59e0b22", border: "#f59e0b55", fg: "#fbbf24", title: "Data-Driven",           desc: "Insights that help you make better decisions"   },
];

// Y-values for the sparkline (0–100, higher = taller bar)
const CHART_Y = [58, 40, 55, 36, 68, 46, 78, 55, 72, 60, 86, 70];

// ── animated counter ──────────────────────────────────────────────────────────

function Counter({ val, sfx, active }) {
  const el = useRef(null);
  useEffect(() => {
    if (!active || !el.current) return;
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - (1 - t) ** 3;
      const v = val * ease;
      if (el.current)
        el.current.textContent =
          (val % 1 !== 0 ? v.toFixed(1) : Math.round(v).toLocaleString()) + sfx;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, val, sfx]);
  return <span ref={el}>0{sfx}</span>;
}

// ── sparkline chart ───────────────────────────────────────────────────────────

function SparkLine({ active }) {
  const pathRef = useRef(null);
  const W = 220, H = 50;
  const mn = Math.min(...CHART_Y), mx = Math.max(...CHART_Y);
  const pts = CHART_Y.map((y, i) => [
    (i / (CHART_Y.length - 1)) * W,
    H - ((y - mn) / (mx - mn)) * (H - 10) - 5,
  ]);
  const curve = pts.reduce((s, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    return `${s} C${px + (x - px) / 3},${py} ${x - (x - px) / 3},${y} ${x},${y}`;
  }, "");

  useEffect(() => {
    const p = pathRef.current;
    if (!active || !p) return;
    const len = p.getTotalLength?.() ?? 320;
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    const a = p.animate(
      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration: 1500, delay: 500, fill: "forwards", easing: "ease-out" },
    );
    return () => a.cancel();
  }, [active]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sgFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00dbaa" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#00dbaa" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={`${curve} L${W},${H} L0,${H}Z`} fill="url(#sgFill)" />
      <path
        ref={pathRef}
        d={curve}
        fill="none"
        stroke="#00dbaa"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── task donut ────────────────────────────────────────────────────────────────

function Donut({ active }) {
  const r = 20, c = 2 * Math.PI * r;
  const segs = [
    { pct: 0.62, stroke: "#00dbaa", label: "Completed" },
    { pct: 0.25, stroke: "#8b5cf6", label: "In Progress" },
    { pct: 0.13, stroke: "#1e2535", label: "Pending" },
  ];
  let cum = 0;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative size-12">
        <svg viewBox="0 0 50 50" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="25" cy="25" r={r} fill="none" stroke="#0e1422" strokeWidth="5" />
          {segs.map(({ pct, stroke }, i) => {
            const off = -(cum * c);
            const dash = pct * c;
            cum += pct;
            return (
              <motion.circle
                key={i}
                cx="25" cy="25" r={r}
                fill="none"
                stroke={stroke}
                strokeWidth="5"
                strokeDasharray={`${dash} ${c}`}
                strokeDashoffset={off}
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[0.6rem] font-bold text-white">62%</span>
        </div>
      </div>
      <div className="w-full space-y-0.5">
        {segs.map(({ pct, stroke, label }) => (
          <div key={label} className="flex items-center gap-1">
            <div className="size-1.5 shrink-0 rounded-full" style={{ background: stroke }} />
            <span className="flex-1 text-[0.46rem] text-[#3d4560]">{label}</span>
            <span className="text-[0.46rem] text-[#4b5575]">{Math.round(pct * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── progress bar ──────────────────────────────────────────────────────────────

function PBar({ name, pct, color, active, delay }) {
  return (
    <div>
      <div className="flex justify-between">
        <span className="truncate text-[0.46rem] text-[#3d4560]">{name}</span>
        <span className="ml-1 shrink-0 text-[0.46rem] text-[#4b5575]">{pct}%</span>
      </div>
      <div className="mt-0.5 h-[3px] overflow-hidden rounded-full bg-[#0e1422]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={active ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ── feature card ──────────────────────────────────────────────────────────────

function FCard({ card, side, i, active }) {
  return (
    <motion.div
      className="relative flex items-center gap-1.5 rounded-xl border bg-[#040710]/95 p-2 shadow-lg"
      style={{ borderColor: card.border }}
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.25 + i * 0.15, ease: "easeOut" }}
    >
      {/* glowing connection dot on the inner edge */}
      <motion.span
        className={`absolute top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-[#00dbaa] ${
          side === "left" ? "right-1.5" : "left-1.5"
        }`}
        animate={
          active
            ? {
                boxShadow: [
                  "0 0 2px rgba(0,219,170,0.4)",
                  "0 0 7px rgba(0,219,170,0.8)",
                  "0 0 2px rgba(0,219,170,0.4)",
                ],
              }
            : {}
        }
        transition={{ duration: 2.4, delay: 0.5 + i * 0.2, repeat: Infinity }}
      />
      <div
        className="flex size-7 shrink-0 items-center justify-center rounded-lg font-mono text-[0.56rem] font-bold leading-none"
        style={{ background: card.bg, color: card.fg, border: `1px solid ${card.border}` }}
      >
        {card.glyph}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[0.6rem] font-semibold leading-tight text-white">
          {card.title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[0.52rem] leading-tight text-[#3d4560]">
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

const HeroDashboardCard = memo(() => {
  const root = useRef(null);
  const active = useInView(root, { once: true, margin: "-80px" });

  return (
    <div
      ref={root}
      className="relative flex aspect-[3/2] w-full items-stretch gap-2 overflow-hidden rounded-[0.95rem]"
    >
      {/* dark background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#040609] via-[#050810] to-[#070d18]" />

      {/* ambient top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,166,81,0.10),transparent_60%)]" />

      {/* ── left feature cards ── */}
      <div className="relative z-10 flex w-[18%] shrink-0 flex-col justify-center gap-2 pl-1">
        {LEFT_CARDS.map((card, i) => (
          <FCard key={card.title} card={card} side="left" i={i} active={active} />
        ))}
      </div>

      {/* ── laptop frame ── */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col py-2">
        <div className="flex flex-1 overflow-hidden rounded-[0.7rem] border border-[#1a2035] bg-[#030609] shadow-[0_16px_48px_rgba(0,0,0,0.65)]">

          {/* sidebar */}
          <div className="flex w-[20%] shrink-0 flex-col border-r border-[#0c0f1e] bg-[#020408] px-1.5 py-2">
            <div className="mb-3 flex items-center gap-1 px-0.5">
              <motion.div
                className="size-3 rounded-full bg-[#00A651]"
                animate={active ? { boxShadow: ["0 0 4px #00A65150", "0 0 9px #00A65180", "0 0 4px #00A65150"] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="text-[0.54rem] font-bold text-white">PingTech</span>
            </div>
            {["Dashboard","Analytics","Projects","Tasks","Team","AI Assistant","Settings"].map((item, i) => (
              <div
                key={item}
                className={`mb-0.5 flex items-center gap-1 rounded px-1 py-0.5 text-[0.48rem] ${
                  i === 0 ? "bg-[#00A651]/15 text-[#00A651]" : "text-[#272e44]"
                }`}
              >
                <div className={`size-1 shrink-0 rounded-sm ${i === 0 ? "bg-[#00A651]" : "bg-[#141a28]"}`} />
                {item}
              </div>
            ))}
          </div>

          {/* main content */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 overflow-hidden bg-[#030508] p-1.5">

            {/* header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.6rem] font-bold text-white">Good morning, Alex</p>
                <p className="text-[0.46rem] text-[#252d42]">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="rounded border border-[#111828] px-1 py-0.5 text-[0.42rem] text-[#252d42]">
                  May 12 – 18 ▾
                </div>
                <motion.div
                  className="size-4 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700"
                  animate={active ? { boxShadow: ["0 0 4px #7c3aed40", "0 0 10px #7c3aed70", "0 0 4px #7c3aed40"] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>
            </div>

            {/* stats row */}
            <div className="flex gap-1">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex min-w-0 flex-1 flex-col rounded-lg border border-[#0e1320] bg-[#020407] px-1.5 py-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={active ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <span className="truncate text-[0.44rem] uppercase tracking-wide text-[#252d42]">
                    {s.label}
                  </span>
                  <span className="mt-0.5 text-[0.78rem] font-bold leading-none text-white">
                    <Counter val={s.val} sfx={s.sfx} active={active} />
                  </span>
                  <span className="mt-0.5 text-[0.44rem] text-[#00dbaa]">{s.trend}</span>
                </motion.div>
              ))}
            </div>

            {/* chart + donut */}
            <div className="flex min-h-0 flex-1 gap-1.5">

              {/* activity chart */}
              <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-[#0e1320] bg-[#020407] p-1.5">
                <p className="mb-1 text-[0.44rem] text-[#252d42]">Project Activity</p>
                <div className="min-h-0 flex-1">
                  <SparkLine active={active} />
                </div>
                <div className="mt-1 space-y-1">
                  {PROJECTS.map((p, i) => (
                    <PBar key={p.name} {...p} active={active} delay={0.8 + i * 0.2} />
                  ))}
                </div>
              </div>

              {/* tasks donut */}
              <div className="flex w-[36%] shrink-0 flex-col rounded-lg border border-[#0e1320] bg-[#020407] p-1.5">
                <p className="mb-1 text-[0.44rem] text-[#252d42]">Tasks Overview</p>
                <div className="flex flex-1 items-center justify-center">
                  <Donut active={active} />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* laptop base strip */}
        <div className="mx-6 h-1.5 rounded-b-lg bg-[#0a0d1c]" />
      </div>

      {/* ── right feature cards ── */}
      <div className="relative z-10 flex w-[16%] shrink-0 flex-col justify-center gap-2 pr-1">
        {RIGHT_CARDS.map((card, i) => (
          <FCard key={card.title} card={card} side="right" i={i} active={active} />
        ))}
      </div>
    </div>
  );
});

HeroDashboardCard.displayName = "HeroDashboardCard";
export default HeroDashboardCard;
