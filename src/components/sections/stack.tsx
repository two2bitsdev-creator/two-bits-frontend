import { Reveal } from "@/components/effects/reveal";
import { ScrambleText } from "@/components/effects/scramble-text";
import { stackColumns } from "@/config/content";

function Stack() {
  return (
    <section
      id="stack"
      className="mx-auto max-w-[1280px] px-4 pt-14 pb-8 sm:px-6 sm:pt-20 sm:pb-10 md:px-10 md:pt-22"
    >
      <Reveal>
        <h6 className="mb-3.5 text-[var(--tb-ink-accent)]">03 — Stack</h6>
        <h2 className="mb-8 text-[clamp(1.75rem,7vw,2.875rem)] tracking-[-0.02em] sm:mb-10">
          TOOLS WE ACTUALLY USE
        </h2>
      </Reveal>

      <div className="border-border bg-border grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-4">
        {stackColumns.map((column, columnIndex) => (
          <Reveal
            key={column.label}
            delayMs={columnIndex * 100}
            className="bg-background min-w-0 px-4 py-5.5 pb-6 sm:px-6 sm:py-7 sm:pb-7.5"
          >
            <div className="mb-4.5 flex items-center gap-2.5">
              <span
                className={
                  column.filled
                    ? "bg-primary size-2.5"
                    : "border-foreground size-2.5 border"
                }
              />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
                {column.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-[12px] sm:text-[13px]">
              {column.tools.map((tool) => (
                <ScrambleText
                  key={tool}
                  text={tool}
                  className="border-border hover:border-primary hover:text-primary cursor-default border px-2.5 py-1.25 transition-colors"
                />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export { Stack };
