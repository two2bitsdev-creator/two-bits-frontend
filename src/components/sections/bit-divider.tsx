function BitDivider() {
  return (
    <div className="mx-auto flex max-w-[1280px] items-center gap-5 px-6 md:px-10">
      <div className="bg-border h-px flex-1" />
      <div className="font-heading text-primary relative h-15.5 w-5.5 text-center text-[44px] leading-[62px]">
        <span aria-hidden="true" className="animate-tb-flip absolute inset-0">
          1
        </span>
        <span aria-hidden="true" className="animate-tb-flop absolute inset-0">
          0
        </span>
      </div>
      <div className="bg-border h-px flex-1" />
    </div>
  );
}

export { BitDivider };
