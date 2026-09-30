import React from "react";
import { cn } from "@/lib/utils";
import { GridPattern, genRandomPattern } from "./grid-pattern";

type FeatureType = {
  title: React.ReactNode;
  icon: React.ReactNode;
  description?: string;
};

type FeatureCardProps = React.ComponentProps<"div"> & {
  feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const [squares, setSquares] = React.useState<number[][] | null>(null);

  React.useEffect(() => {
    setSquares(genRandomPattern());
  }, []);

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden border border-zinc-200 border-dashed bg-white p-4 md:p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-800/10",
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

      <div className="relative z-10 flex flex-1 flex-col items-start text-left">
        <span
          aria-hidden
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-blue-600 [&_svg]:h-8 [&_svg]:w-8"
        >
          {feature.icon}
        </span>

        <h3 className="relative z-20 mt-4 w-full text-left text-sm font-semibold leading-snug text-zinc-900 md:mt-6 md:text-base lg:text-lg">
          {feature.title}
        </h3>
        {feature.description ? (
          <p className="relative z-20 mt-2 text-left text-xs leading-relaxed text-zinc-600 md:text-sm">
            {feature.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
