import { cn } from "@/lib/utils";
import { surfaceMuted } from "@/lib/surface";

const Notification = ({ className, title }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-n-6/90 p-3 shadow-lg shadow-black/20 sm:flex-row sm:items-center sm:gap-4 sm:p-4 sm:pr-5",
        surfaceMuted,
        className
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-color-1 sm:h-14 sm:w-14">
        <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <h6 className="mb-1 text-sm font-semibold leading-snug text-n-1 sm:text-base">
          {title || "Project completed"}
        </h6>
        <p className="body-2 mb-2 break-words text-n-3">Website development finished successfully</p>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex min-w-0 items-center gap-2">
            <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-color-1" />
            <span className="body-2 truncate text-n-3">Live now</span>
          </div>
          <div className="body-2 shrink-0 text-n-4">2h ago</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
