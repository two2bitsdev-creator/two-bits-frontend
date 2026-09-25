import { Blueprint } from "@/components/blueprint/blueprint";
import { terminalLines } from "@/config/content";
import { cn } from "@/lib/utils";

const TONE_CLASS = {
  muted: "text-accent-300",
  warn: "text-[#f0d9a8]",
} as const;

/**
 * The hero's animated terminal panel: lines type themselves in, in
 * sequence, then a caret blinks. Timing (steps/delay) is per-line data
 * from the original design, so `animate-tb-type`'s base keyframe is
 * combined with an inline duration/delay override per line.
 */
function Terminal() {
  return (
    <Blueprint className="bg-accent-900 max-w-full shadow-[var(--tb-shadow-lg)]">
      <div className="flex items-center gap-2 border-b border-white/18 px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="bg-accent-400 size-2.25" />
        <span className="border-accent-400 size-2.25 border" />
        <span className="text-accent-300 ml-2 font-mono text-[11px] tracking-wider">
          two-bits — zsh
        </span>
      </div>
      <div className="relative overflow-x-auto px-3 py-4 pb-5 font-mono text-[12px] leading-[2.05] text-[#e9eef4] sm:overflow-hidden sm:px-5 sm:py-5.5 sm:pb-6.5 sm:text-[13px]">
        <div
          aria-hidden="true"
          className="animate-tb-sweep from-accent-300/26 absolute inset-x-0 top-0 h-3.5 bg-gradient-to-b to-transparent"
        />
        {terminalLines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "animate-tb-type flex gap-2 whitespace-nowrap",
              line.tone && TONE_CLASS[line.tone],
            )}
            style={{
              animationDuration: `${line.steps * 0.026}s`,
              animationTimingFunction: `steps(${line.steps})`,
              animationDelay: `${line.delay}s`,
            }}
          >
            {line.prompt && <span className="text-accent-400">$</span>}
            <span>{line.text}</span>
            {line.cursorDelay !== undefined && (
              <span
                aria-hidden="true"
                className="animate-tb-blink bg-accent-300 inline-block h-3.75 w-2"
                style={{ animationDelay: `${line.cursorDelay}s` }}
              />
            )}
          </div>
        ))}
      </div>
    </Blueprint>
  );
}

export { Terminal };
