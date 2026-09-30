"use client";

import { cn } from "@/lib/utils";

type FloatingRequestCallbackButtonProps = {
  onClick: () => void;
  className?: string;
};

export function FloatingRequestCallbackButton({
  onClick,
  className,
}: FloatingRequestCallbackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex w-max min-w-[170px] items-center justify-center overflow-hidden whitespace-nowrap rounded-2xl border border-zinc-800",
        "bg-zinc-900 px-6 py-3 text-xs leading-none font-semibold text-white shadow-lg sm:px-10 sm:py-3.5 sm:text-sm",
        "transition-transform duration-200 ease-out hover:brightness-110 active:scale-[0.98]",
        "after:pointer-events-none after:absolute after:inset-x-[10%] after:top-px after:h-px",
        "after:bg-linear-to-r after:from-transparent after:via-white/40 after:to-transparent",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[38%]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "7px 7px",
          WebkitMaskImage: "linear-gradient(to left, #000 0%, transparent 100%)",
          maskImage: "linear-gradient(to left, #000 0%, transparent 100%)",
        }}
      />
      <span className="relative z-10">Request Callback</span>
    </button>
  );
}

export default FloatingRequestCallbackButton;
