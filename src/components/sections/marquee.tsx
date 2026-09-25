import { marqueeItems } from "@/config/content";

function MarqueeRow() {
  return (
    <span className="flex gap-6.5 pr-6.5">
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i} className="flex gap-6.5">
          <span>{item.label}</span>
          <span className="text-primary">{item.bit}</span>
        </span>
      ))}
    </span>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden pt-6.5">
      <div className="animate-tb-marquee font-heading text-foreground/30 flex w-max pb-5.5 text-[22px] tracking-wide sm:text-[30px]">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}

export { Marquee };
