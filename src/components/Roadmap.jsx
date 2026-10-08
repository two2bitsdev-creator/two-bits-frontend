import Heading from "./Heading";
import Section from "./Section";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CheckSquare, Layers3, Rocket, Sparkles,
  Check, Shield, Zap, Clock, Users,
} from "lucide-react";
import {
  fadeInLeft, fadeInRight, fadeInUp,
  staggerContainer, useScrollAnimation,
} from "../hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 9000;

const steps = [
  {
    id: "01",
    navLabel: "Step 1",
    title: "Discover & Strategize",
    description: "Understand your business and define the right roadmap for success.",
    outcome: "Strategy, roadmap, and project scope.",
    navIcon: CheckSquare,
  },
  {
    id: "02",
    navLabel: "Step 2",
    title: "Design & Develop",
    description: "Transform ideas into secure, scalable digital solutions.",
    outcome: "Production-ready software.",
    navIcon: Layers3,
  },
  {
    id: "03",
    navLabel: "Step 3",
    title: "Test & Deploy",
    description: "Validate performance, security, and reliability before launch.",
    outcome: "A fully tested and deployed solution.",
    navIcon: Rocket,
  },
  {
    id: "04",
    navLabel: "Step 4",
    title: "Support & Optimize",
    description: "Continuously improve your solution to keep it secure, efficient, and future-ready.",
    outcome: "Ongoing maintenance and measurable growth.",
    navIcon: Sparkles,
  },
];

/* ── Shared: terminal chrome ─────────────────────────────────────────── */
const TerminalBar = ({ title }) => (
  <div className="flex items-center gap-1.5 border-b border-[#1a1f2e] bg-[#060810] px-4 py-2.5">
    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
    <span className="size-2.5 rounded-full bg-[#febc2e]" />
    <span className="size-2.5 rounded-full bg-[#28c840]" />
    <span className="ml-3 font-code text-[11px] text-[#4a5068]">{title}</span>
  </div>
);

/* ── Step 01: Discovery terminal ─────────────────────────────────────── */
const discoveryItems = [
  "Understand Business Goals",
  "Analyze Requirements",
  "Define Strategy",
  "Plan & Prioritize",
];

const DiscoverVisual = () => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setVisible(count);
      if (count >= discoveryItems.length) clearInterval(id);
    }, 680);
    return () => clearInterval(id);
  }, []);

  const allDone = visible >= discoveryItems.length;

  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-[#282d3b] bg-[#04060c]">
      <TerminalBar title="project-discovery.sh" />
      <div className="min-h-[13rem] px-5 py-5">
        <p className="mb-4 font-code text-xs text-[#4a5068]">
          $&nbsp;<span className="text-[#00dbaa]">twobits init --discover</span>
        </p>
        <div className="space-y-2.5">
          {discoveryItems.map((item, i) =>
            i < visible ? (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 font-code text-xs"
              >
                <span className="flex size-4 shrink-0 items-center justify-center rounded border border-[#00dbaa]/40 bg-[#00dbaa]/10">
                  <Check className="size-2.5 text-[#00dbaa]" strokeWidth={2.5} />
                </span>
                <span className="text-[#cdd3e8]">{item}</span>
                <span className="ml-auto text-[10px] tracking-wide text-[#3a3f55]">done</span>
              </motion.div>
            ) : null
          )}
        </div>

        {!allDone && (
          <motion.span
            className="mt-3 inline-block h-3.5 w-1.5 rounded-sm bg-[#00dbaa]/70"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}

        {allDone && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-code text-[11px] text-[#00dbaa]"
          >
            ✓ project initialization completed successfully.
          </motion.p>
        )}
      </div>
    </div>
  );
};

/* ── Step 02: Architecture stack ─────────────────────────────────────── */
const archLayers = [
  { label: "React Frontend", tag: "UI Layer", color: "#8a6cff" },
  { label: "Node.js API", tag: "Service Layer", color: "#00dbaa" },
  { label: "PostgreSQL", tag: "Data Layer", color: "#6cb4ff" },
];

const BuildVisual = () => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setVisible(count);
      if (count >= archLayers.length) clearInterval(id);
    }, 750);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-[#282d3b] bg-[#04060c]">
      <TerminalBar title="architecture.diagram" />
      <div className="min-h-[13rem] px-5 py-5">
        <p className="mb-5 font-code text-[11px] uppercase tracking-[0.22em] text-[#4a5068]">
          Stack Architecture
        </p>
        <div className="space-y-0">
          {archLayers.map((layer, i) => (
            <div key={layer.label}>
              {i < visible ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38 }}
                  className="flex items-center justify-between rounded-xl border px-4 py-3"
                  style={{
                    borderColor: `${layer.color}35`,
                    backgroundColor: `${layer.color}0d`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-2 rounded-full" style={{ backgroundColor: layer.color }} />
                    <span className="font-code text-xs text-[#cdd3e8]">{layer.label}</span>
                  </div>
                  <span
                    className="font-code text-[10px] uppercase tracking-widest"
                    style={{ color: layer.color }}
                  >
                    {layer.tag}
                  </span>
                </motion.div>
              ) : (
                <div className="rounded-xl border border-[#1a1f2e] px-4 py-3 opacity-20">
                  <div className="h-3 w-28 rounded bg-[#1a1f2e]" />
                </div>
              )}

              {i < archLayers.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={i < visible - 1 ? { scaleY: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.25 }}
                    className="h-5 w-px"
                    style={{
                      background: `linear-gradient(to bottom, ${archLayers[i].color}80, ${archLayers[i + 1].color}80)`,
                      transformOrigin: "top",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {visible >= archLayers.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-code text-[11px] text-[#00dbaa]"
          >
            ✓ architecture scaffold ready.
          </motion.p>
        )}
      </div>
    </div>
  );
};

/* ── Step 03: CI/CD pipeline ─────────────────────────────────────────── */
const pipelineStages = [
  { label: "Build", detail: "Compiled & bundled", color: "#8a6cff" },
  { label: "Test", detail: "47 / 47 passed", color: "#00dbaa" },
  { label: "Scan", detail: "0 vulnerabilities", color: "#6cb4ff" },
  { label: "Deploy", detail: "Production live", color: "#28c840" },
];

const DeployVisual = () => {
  const [done, setDone] = useState(0);

  useEffect(() => {
    setDone(0);
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setDone(count);
      if (count >= pipelineStages.length) clearInterval(id);
    }, 780);
    return () => clearInterval(id);
  }, []);

  const allDone = done >= pipelineStages.length;

  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-[#282d3b] bg-[#04060c]">
      <TerminalBar title="ci-cd-pipeline.yml" />
      <div className="min-h-[13rem] px-5 py-5">
        {/* Stage pill row */}
        <div className="mb-5 flex flex-wrap items-center gap-1.5">
          {pipelineStages.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-1.5">
              <motion.div
                className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5"
                animate={
                  i < done
                    ? { borderColor: `${stage.color}55`, backgroundColor: `${stage.color}10` }
                    : { borderColor: "#1a1f2e", backgroundColor: "transparent" }
                }
                transition={{ duration: 0.3 }}
              >
                {i < done ? (
                  <Check className="size-3 shrink-0" style={{ color: stage.color }} strokeWidth={2.5} />
                ) : (
                  <span className="size-3 rounded-full border border-[#2a2f40]" />
                )}
                <span
                  className="font-code text-[10px] uppercase tracking-wider transition-colors duration-300"
                  style={{ color: i < done ? stage.color : "#3a3f55" }}
                >
                  {stage.label}
                </span>
              </motion.div>
              {i < pipelineStages.length - 1 && (
                <span className="h-px w-2.5 bg-[#1a1f2e]" />
              )}
            </div>
          ))}
        </div>

        {/* Log lines */}
        <div className="space-y-2">
          {pipelineStages.map((stage, i) =>
            i < done ? (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2.5 font-code text-[11px]"
              >
                <Check className="size-3.5 shrink-0" style={{ color: stage.color }} strokeWidth={2.5} />
                <span className="text-[#6a7090]">{stage.label.toLowerCase()}:</span>
                <span className="text-[#cdd3e8]">{stage.detail}</span>
              </motion.div>
            ) : null
          )}
        </div>

        {/* Deploy progress bar */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <div className="mb-1.5 flex justify-between font-code text-[10px] text-[#4a5068]">
              <span>Deploying to production…</span>
              <motion.span
                className="text-[#00dbaa]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                100%
              </motion.span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#1a1f2e]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#00dbaa] to-[#8a6cff]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ── Step 04: Live metrics dashboard ─────────────────────────────────── */
const metricCards = [
  { label: "Uptime", value: "99.9%", Icon: Clock, color: "#00dbaa" },
  { label: "Response", value: "118ms", Icon: Zap, color: "#8a6cff" },
  { label: "Security", value: "A+", Icon: Shield, color: "#6cb4ff" },
  { label: "Sessions", value: "247", Icon: Users, color: "#f472b6" },
];

const sparkData = [0.38, 0.52, 0.44, 0.68, 0.58, 0.75, 0.63, 0.88, 0.72, 0.84, 0.79, 0.94];
const SPARK_W = 8;
const SPARK_H = 28;

const SupportVisual = () => {
  const [visible, setVisible] = useState(0);
  const [sparkFill, setSparkFill] = useState(0);

  useEffect(() => {
    setVisible(0);
    setSparkFill(0);
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setVisible(count);
      if (count >= metricCards.length) clearInterval(id);
    }, 560);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (visible < metricCards.length) return;
    let f = 0;
    const id = setInterval(() => {
      f += 1;
      setSparkFill(f);
      if (f >= sparkData.length) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-[#282d3b] bg-[#04060c]">
      <div className="flex items-center justify-between border-b border-[#1a1f2e] bg-[#060810] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-code text-[11px] text-[#4a5068]">live-metrics.dashboard</span>
        </div>
        <span className="flex items-center gap-1.5 font-code text-[10px] text-[#00dbaa]">
          <motion.span
            className="size-1.5 rounded-full bg-[#00dbaa]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          LIVE
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-2.5">
          {metricCards.map(({ label, value, Icon, color }, i) =>
            i < visible ? (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl border px-3 py-3"
                style={{ borderColor: `${color}2e`, backgroundColor: `${color}0a` }}
              >
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Icon className="size-3.5 shrink-0" style={{ color }} strokeWidth={1.8} />
                  <span
                    className="font-code text-[10px] uppercase tracking-wider"
                    style={{ color: `${color}b0` }}
                  >
                    {label}
                  </span>
                </div>
                <p className="font-grotesk text-xl font-semibold text-n-1">{value}</p>
              </motion.div>
            ) : (
              <div key={label} className="rounded-xl border border-[#1a1f2e] px-3 py-3 opacity-20">
                <div className="mb-2 h-2 w-10 rounded bg-[#1a1f2e]" />
                <div className="h-5 w-14 rounded bg-[#1a1f2e]" />
              </div>
            )
          )}
        </div>

        {/* Sparkline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visible >= metricCards.length ? 1 : 0 }}
          className="mt-3.5 flex items-end gap-[3px] px-0.5"
          style={{ height: SPARK_H + 4 }}
        >
          {sparkData.map((v, i) =>
            i < sparkFill ? (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.14 }}
                style={{
                  width: SPARK_W,
                  height: Math.round(v * SPARK_H),
                  background: "linear-gradient(to top, #00dbaa80, #8a6cff80)",
                  borderRadius: 2,
                  transformOrigin: "bottom",
                }}
              />
            ) : (
              <div
                key={i}
                style={{
                  width: SPARK_W,
                  height: Math.round(v * SPARK_H),
                  backgroundColor: "#1a1f2e",
                  borderRadius: 2,
                }}
              />
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

/* ── Visual dispatcher ───────────────────────────────────────────────── */
const STEP_VISUALS = {
  "01": DiscoverVisual,
  "02": BuildVisual,
  "03": DeployVisual,
  "04": SupportVisual,
};

const ProcessVisual = ({ step }) => {
  const Visual = STEP_VISUALS[step.id];

  return (
    <motion.div
      key={`visual-${step.id}`}
      variants={fadeInRight}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-[38rem] justify-self-center lg:mx-0 lg:justify-self-end"
    >
      <div className="pointer-events-none absolute inset-[12%_7%] rounded-[1.6rem] bg-[radial-gradient(circle,rgba(0,222,170,0.12),transparent_56%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-[18%_18%_10%] rounded-[1.6rem] bg-[radial-gradient(circle,rgba(159,115,255,0.12),transparent_58%)] blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.6rem] border border-[#3d4155] bg-[#05070d] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.42)] sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%,transparent_78%,rgba(0,222,170,0.03))]" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.6rem-1px)] border border-white/[0.05]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8a6cff]/45 to-transparent" />
        <Visual />
      </div>
    </motion.div>
  );
};

/* ── Main section ────────────────────────────────────────────────────── */
const Roadmap = () => {
  const { ref: processRef, isInView: processInView } = useScrollAnimation();
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!processInView || isPaused) return undefined;

    const id = window.setInterval(() => {
      setActiveStep((index) => (index + 1) % steps.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [processInView, isPaused]);

  const active = steps[activeStep];

  return (
    <Section id="process">
      <div className="container relative z-2">
        <Heading
          tag="Our Process"
          title="Our Process"
          text="Our proven process ensures every solution is carefully planned, expertly developed, and continuously improved to deliver lasting business value."
        />

        <motion.div
          ref={processRef}
          initial="hidden"
          animate={processInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mx-auto mt-8 max-w-[74rem]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#313546] bg-[#04060d]/95 shadow-[0_0_42px_rgba(0,0,0,0.42)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,222,170,0.06),transparent_26%),radial-gradient(circle_at_88%_82%,rgba(156,117,255,0.07),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.75rem-1px)] border border-white/[0.03]" />
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#8a6cff]/50 to-transparent" />

            {/* Step navigation tabs */}
            <motion.div
              variants={fadeInUp}
              className="relative flex flex-wrap justify-center gap-3 border-b border-[#272d3d] px-5 py-5 sm:px-7 lg:px-8"
            >
              {steps.map((step, index) => {
                const Icon = step.navIcon;
                const isActive = activeStep === index;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-4 py-2.5 font-code text-xs uppercase tracking-[0.18em] transition-all duration-300",
                      isActive
                        ? "border-[#8a6cff]/45 bg-[#0c0b15] text-n-1 shadow-[0_0_24px_rgba(138,108,255,0.16)]"
                        : "border-transparent text-[#9297ad] hover:border-[#2e3444] hover:bg-[#090c14] hover:text-n-1"
                    )}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <Icon className="size-4 text-[#00dbaa]" strokeWidth={1.8} />
                    {step.navLabel}
                  </button>
                );
              })}
            </motion.div>

            {/* Content + visual */}
            <div className="relative grid items-start gap-8 px-5 py-8 sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8">
              <motion.div
                key={`copy-${active.id}`}
                variants={fadeInLeft}
                initial="hidden"
                animate="visible"
                className="max-w-[34rem] pt-1 lg:pt-5"
              >
                <p className="mb-5 font-code text-sm uppercase tracking-[0.22em] text-[#00dbaa]">
                  Step {active.id}
                </p>
                <h3 className="mb-4 font-grotesk text-3xl leading-tight text-n-1 md:text-4xl">
                  {active.title}
                </h3>
                <p className="body-2 mb-5 text-[#b3b7cb]">{active.description}</p>
                <div className="group rounded-xl border border-[#00dbaa]/35 bg-[#071015]/72 px-4 py-3 shadow-[0_0_18px_rgba(0,0,0,0.22)] ring-1 ring-[#00dbaa]/10 transition-all duration-300 hover:border-[#8a6cff]/55 hover:shadow-[0_0_30px_rgba(138,108,255,0.16)] hover:ring-[#8a6cff]/18">
                  <p className="font-code text-xs uppercase tracking-[0.22em] text-[#00dbaa]">Outcome</p>
                  <p className="body-2 mt-2 text-n-1">{active.outcome}</p>
                </div>
              </motion.div>

              <ProcessVisual step={active} />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Roadmap;
