import { loading } from "../assets";
import { cn } from "@/lib/utils";

const Generating = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-[3.5rem] items-center rounded-2xl border border-n-6/90 bg-app-black px-6 text-base text-n-2 shadow-inner",
        className
      )}
    >
      <img className="mr-4 h-5 w-5" src={loading} alt="" />
      <span className="font-code text-sm uppercase tracking-wide text-n-3">Processing…</span>
    </div>
  );
};

export default Generating;
