import { Blueprint } from "@/components/blueprint/blueprint";

const panelBorder = "border-white/18";

function ConsultPanel() {
  return (
    <Blueprint
      className={`min-h-64 border p-4.5 pb-5 sm:min-h-80 sm:p-6.5 sm:pb-7 ${panelBorder}`}
    >
      <div className="mb-5 flex items-center gap-3 font-mono text-[12px] sm:mb-6.5 sm:text-[13px]">
        <span className="animate-tb-spin border-accent-400 size-3.75 rounded-full border-[1.5px] border-t-transparent" />
        <span className="text-accent-300">Analyzing</span>
        <span className="text-white/70">current workflows…</span>
      </div>
      <div className="mb-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3.5">
        {["Process map", "Systems audit"].map((label, i) => (
          <div
            key={label}
            className={`animate-tb-pop flex items-center gap-3 border ${panelBorder} px-4 py-3.75`}
            style={{ animationDelay: `${0.55 * (i + 1)}s` }}
          >
            <span className="text-accent-400 font-mono text-sm">✓</span>
            <span className="text-[13.5px]">{label}</span>
          </div>
        ))}
      </div>
      <div
        className={`animate-tb-pop flex items-center justify-between gap-4 border ${panelBorder} px-4 py-3.75`}
        style={{ animationDelay: "1.8s" }}
      >
        <span className="flex items-center gap-3">
          <span className="text-accent-400 font-mono text-sm">✓</span>
          <span className="text-[13.5px]">Automation roadmap</span>
        </span>
        <span className="bg-primary text-accent-900 px-2.5 py-0.75 font-mono text-[11px] tracking-[0.1em]">
          READY
        </span>
      </div>
    </Blueprint>
  );
}

const BUILD_LINES = [
  { delay: 0.2, steps: 26, text: "export async function POST(req: Request) {" },
  {
    delay: 0.9,
    steps: 28,
    indent: true,
    text: "const body = schema.parse(await req.json());",
  },
  { delay: 1.6, steps: 22, indent: true, text: "await runWorkflow(body);" },
  {
    delay: 2.2,
    steps: 30,
    indent: true,
    text: "const job = await db.job.create({ data: body });",
  },
  {
    delay: 2.9,
    steps: 24,
    indent: true,
    text: "return Response.json(job, { status: 201 });",
  },
  { delay: 3.5, steps: 2, text: "}" },
];

function BuildPanel() {
  return (
    <Blueprint className={`min-h-64 overflow-hidden border sm:min-h-80 ${panelBorder}`}>
      <div
        className={`flex items-center gap-2 border-b ${panelBorder} px-3 py-2.5 sm:px-4.5 sm:py-3`}
      >
        <span className="bg-accent-400 size-2" />
        <span className="border-accent-400 size-2 border" />
        <span className="text-accent-300 ml-2 truncate font-mono text-[11px] tracking-wide sm:text-[11.5px]">
          app/api/workflows/route.ts
        </span>
      </div>
      <div className="relative overflow-x-auto px-3 py-4 pb-5 font-mono text-[11.5px] leading-loose text-[#e9eef4] sm:px-4.5 sm:py-5 sm:pb-6 sm:text-[12.5px]">
        <div
          aria-hidden="true"
          className="animate-tb-sweep from-accent-300/26 absolute inset-x-0 top-0 h-3.5 bg-gradient-to-b to-transparent"
        />
        {BUILD_LINES.map((line, i) => (
          <div
            key={i}
            className="animate-tb-type whitespace-nowrap"
            style={{
              animationDuration: `${line.steps * 0.023}s`,
              animationTimingFunction: `steps(${line.steps})`,
              animationDelay: `${line.delay}s`,
            }}
          >
            {line.indent && "\u00A0\u00A0"}
            {line.text}
          </div>
        ))}
        <div
          className="animate-tb-pop mt-3.5 flex flex-wrap items-center gap-2.5"
          style={{ animationDelay: "3.9s" }}
        >
          <span className="text-accent-300">✓ workflow live</span>
          <span className="text-white/55">staging deployed</span>
          <span
            className="animate-tb-blink bg-accent-300 inline-block h-3.5 w-1.75"
            style={{ animationDelay: "4.4s" }}
          />
        </div>
      </div>
    </Blueprint>
  );
}

const REFINE_METRICS = [
  { label: "checkout p95", before: "1.8s", after: "240ms", width: "86%" },
  { label: "invoice cycle", before: "12 steps", after: "2", width: "72%" },
  { label: "report job", before: "manual", after: "auto", width: "100%" },
];

const REFINE_LOG = [
  { delay: 0.35, text: "$ sample --flows checkout,invoice,report", tone: "cmd" },
  { delay: 1.05, text: "✓ 7 flows instrumented", tone: "ok" },
  { delay: 1.7, text: "$ tune --index idx_orders_created", tone: "cmd" },
  { delay: 2.4, text: "✓ cache warmed · p95 1.8s → 240ms", tone: "ok" },
] as const;

function RefinePanel() {
  return (
    <Blueprint
      className={`min-h-64 overflow-hidden border p-4.5 pb-5 sm:min-h-80 sm:p-6.5 sm:pb-7 ${panelBorder}`}
    >
      <div className="text-accent-300 mb-5 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] sm:text-xs">
        <span className="flex items-center gap-2.5">
          <span className="animate-tb-blink bg-primary size-2" />
          insights — live.flow
        </span>
        <span className="text-white/55">sampling</span>
      </div>

      <div className="relative mb-5 grid gap-3.5">
        {REFINE_METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className="animate-tb-pop"
            style={{ animationDelay: `${0.25 + i * 0.45}s` }}
          >
            <div className="mb-1.5 flex items-baseline justify-between gap-3 font-mono text-[11.5px]">
              <span className="text-white/80">{metric.label}</span>
              <span className="text-white/45">
                {metric.before}
                <span className="text-accent-300 mx-1.5">→</span>
                <span className="text-accent-300">{metric.after}</span>
              </span>
            </div>
            <div className="h-1.5 bg-white/14">
              <span
                className="animate-tb-bar bg-primary block h-full origin-left"
                style={{
                  width: metric.width,
                  animationDelay: `${0.55 + i * 0.45}s`,
                  animationDuration: "0.9s",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-1.5 font-mono text-[12px] leading-relaxed">
        {REFINE_LOG.map((line) => (
          <div
            key={line.text}
            className="animate-tb-pop"
            style={{ animationDelay: `${line.delay}s` }}
          >
            <span
              className={line.tone === "ok" ? "text-accent-300" : "text-white/70"}
            >
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </Blueprint>
  );
}

const OPTIMIZE_JOBS = [
  {
    title: "Invoice cycle 12 steps → 2",
    status: "SHIPPED",
    action: "collapsing manual review",
  },
  {
    title: "Checkout p95 1.8s → 240ms",
    status: "TUNED",
    action: "rewriting hot query",
  },
  {
    title: "Nightly report: manual → auto",
    status: "LIVE",
    action: "scheduling the job",
  },
];

function OptimizePanel() {
  return (
    <Blueprint
      className={`min-h-64 overflow-hidden border p-4 sm:min-h-80 sm:p-6 ${panelBorder}`}
    >
      <div className="text-accent-300 mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] sm:mb-5 sm:text-xs">
        <span className="flex items-center gap-2.5">
          <span className="animate-tb-spin border-accent-400 size-3 rounded-full border-[1.5px] border-t-transparent" />
          optimize — this quarter
        </span>
        <span className="text-white/55">3 jobs</span>
      </div>

      <div className="grid gap-3.5">
        {OPTIMIZE_JOBS.map((job, i) => {
          const start = 0.2 + i * 0.85;
          return (
            <div
              key={job.title}
              className={`animate-tb-pop border ${panelBorder} px-3 py-3 sm:px-4 sm:py-3.75`}
              style={{ animationDelay: `${start}s` }}
            >
              <div className="mb-2.5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3.5">
                <span className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px]">
                  <span className="relative size-3.5 shrink-0">
                    <span
                      className="border-accent-400 absolute inset-0 rounded-full border-[1.5px] border-t-transparent"
                      style={{
                        animation: `tb-spin 0.7s linear infinite, tb-pop 0.2s ease-out ${start + 0.85}s reverse forwards`,
                      }}
                    />
                    <span
                      className="animate-tb-pop text-accent-400 absolute inset-0 flex items-center justify-center bg-[var(--tb-field)] font-mono text-[11px]"
                      style={{ animationDelay: `${start + 0.9}s` }}
                    >
                      ✓
                    </span>
                  </span>
                  {job.title}
                </span>
                <span
                  className="animate-tb-pop text-accent-300 font-mono text-[10px] tracking-[0.1em] sm:text-[11px]"
                  style={{ animationDelay: `${start + 1.05}s` }}
                >
                  {job.status}
                </span>
              </div>
              <div className="text-white/45 mb-2.5 font-mono text-[11px]">
                {job.action}…
              </div>
              <div className="h-1.5 bg-white/14">
                <span
                  className="animate-tb-bar bg-primary block h-full w-full origin-left"
                  style={{
                    animationDelay: `${start + 0.25}s`,
                    animationDuration: "1.15s",
                  }}
                />
              </div>
            </div>
          );
        })}
        <div
          className="animate-tb-pop text-accent-300 flex items-center gap-2.5 font-mono text-xs"
          style={{ animationDelay: "3.1s" }}
        >
          <span className="bg-primary size-2" />
          <span>automation compounding — next cycle queued</span>
          <span className="animate-tb-blink bg-accent-300 inline-block h-3 w-1.5" />
        </div>
      </div>
    </Blueprint>
  );
}

const PROCESS_PANELS = [ConsultPanel, BuildPanel, RefinePanel, OptimizePanel];

export { PROCESS_PANELS };
