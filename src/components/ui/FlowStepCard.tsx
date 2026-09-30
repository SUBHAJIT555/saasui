import React from "react";
import { cn } from "@/lib/utils";
import { GridPattern, genRandomPattern } from "./grid-pattern";

type FlowStepCardProps = React.ComponentProps<"div"> & {
  stepNumber?: number;
  label: string;
  sub?: string;
};

export function FlowStepCard({
  stepNumber,
  label,
  sub,
  className,
  ...props
}: FlowStepCardProps) {
  const [squares, setSquares] = React.useState<number[][] | null>(null);

  React.useEffect(() => {
    setSquares(genRandomPattern());
  }, []);

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden border border-neutral-200 border-dashed bg-white p-4 md:p-6 transition-colors hover:border-primary/40",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full mask-[linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-linear-to-r from-zinc-900/5 to-zinc-900/1 opacity-100 mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={squares ?? undefined}
            className="absolute inset-0 h-full w-full fill-zinc-900/4 stroke-zinc-900/15 mix-blend-overlay"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        {stepNumber != null && (
          <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-[#4b5563] bg-[radial-gradient(95%_60%_at_50%_75%,#111827_0%,#374151_100%)] text-white font-inter-display font-bold text-base transition duration-300 group-hover:brightness-110 after:absolute after:right-[10%] after:top-px after:h-px after:w-[60%] after:bg-linear-to-r after:from-transparent after:via-white/40 after:to-transparent">
            {stepNumber}
          </span>
        )}

        <p
          className={cn(
            "relative z-20 font-inter-display font-semibold text-text-primary text-sm md:text-base lg:text-lg",
            stepNumber != null && "mt-6 md:mt-8",
          )}
        >
          {label}
        </p>
        {sub ? (
          <p className="text-neutral-500 text-xs sm:text-sm md:text-base font-inter-display mt-0.5">
            {sub}
          </p>
        ) : null}
      </div>
    </div>
  );
}
