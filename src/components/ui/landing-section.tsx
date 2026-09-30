import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/utils";
import GradientText from "@/components/ui/GradientText";
import { TimelineContent } from "@/components/ui/timeline-animation";

export const landingListIconClass =
  "h-5 w-5 shrink-0 text-blue-600";

export const landingListIconWrapperClass =
  "mt-0.5 flex shrink-0 items-center text-blue-600 [&_svg]:h-5 [&_svg]:w-5";

/** Shared easing for interactive list rows / chips */
export const landingListEaseClass =
  "duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]";

export const landingListRowHoverClass = cn(
  "group transition-[color,font-weight]",
  landingListEaseClass,
);

export const landingListTextHoverClass = cn(
  "transition-[color,font-weight]",
  landingListEaseClass,
  "group-hover:font-medium group-hover:text-zinc-900",
);

export const LANDING_GRADIENT_COLORS = [
  "#52525b",
  "#2563eb",
  "#3f3f46",
  "#1d4ed8",
  "#52525b",
] as const;

/** Section h2 scale — matches About "What is CYBERLABS" */
export const landingSectionHeadingClass =
  "text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl";

/** In-section column / comparison titles */
export const landingSectionSubheadingClass =
  "text-lg font-semibold leading-tight sm:text-xl md:text-2xl";

export const landingRevealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-dotted border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      <GradientText
        className="text-xs font-semibold uppercase tracking-[0.14em]"
        colors={[...LANDING_GRADIENT_COLORS]}
        animationSpeed={4}
        direction="horizontal"
        showBorder={false}
        pauseOnHover={false}
      >
        {children}
      </GradientText>
    </span>
  );
}

export const landingSectionClass = "relative overflow-hidden bg-white px-4 py-10 md:py-14";
/** Tighter vertical rhythm — matches home page section stack */
export const homeSectionSpacingClass = "py-10 md:py-14";
export const landingInnerClass = "relative z-10 mx-auto w-full max-w-7xl";

export function LandingSectionShell({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn(landingSectionClass, className)}>
      <div className={landingInnerClass}>{children}</div>
    </section>
  );
}

/** Bento container — horizontal rules between rows */
export function LandingBento({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("divide-y divide-zinc-200", className)}>{children}</div>
  );
}

/** Bento row — optional vertical split on md+ */
export function LandingBentoRow({
  className,
  children,
  columns = 2,
}: {
  className?: string;
  children: ReactNode;
  columns?: 1 | 2;
}) {
  return (
    <div
      className={cn(
        columns === 2 &&
          "grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Bento cell padding */
export function LandingBentoCell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("px-0 py-6 md:px-8 md:py-8", className)}>{children}</div>
  );
}

/** Framed two-column block with top/bottom border */
export function LandingFramedTwoCol({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("border-y border-zinc-200", className)}>
      <LandingBentoRow>{children}</LandingBentoRow>
    </div>
  );
}

export function LandingTagPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-dotted border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-[color,font-weight,border-color] hover:border-zinc-300 hover:font-semibold hover:text-zinc-900 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm",
        landingListEaseClass,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function LandingNumberedList({
  items,
  startIndex = 0,
}: {
  items: string[];
  startIndex?: number;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item}
          className="flex gap-3 border-b border-zinc-200 py-3 text-sm text-zinc-700 last:border-b-0 md:text-base"
        >
          <span className="font-semibold text-zinc-400">
            {String(startIndex + index + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** 2×2 numbered grid — items flow top-to-bottom in each column (01/02 left, 03/04 right) */
export function LandingSplitNumberedList({
  items,
  startIndex = 0,
}: {
  items: string[];
  startIndex?: number;
}) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <div className="border-y border-zinc-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-zinc-200">
        {columns.map((column, colIndex) => (
          <ul key={colIndex} className={cn(colIndex === 0 ? "sm:pr-8" : "sm:pl-8")}>
            {column.map((item, rowIndex) => {
              const globalIndex =
                (colIndex === 0 ? startIndex : startIndex + half) + rowIndex;
              const isLastInColumn = rowIndex === column.length - 1;
              const isLastOverall =
                colIndex === columns.length - 1 && isLastInColumn;

              return (
                <li
                  key={item}
                  className={cn(
                    "flex gap-3 py-3 text-sm text-zinc-700 md:py-4 md:text-base",
                    !isLastOverall && "border-b border-zinc-200",
                    isLastInColumn && colIndex === 0 && "sm:border-b-0",
                    rowIndex !== column.length - 1 &&
                      "sm:border-b sm:border-zinc-200",
                  )}
                >
                  <span className="shrink-0 font-semibold text-zinc-400">
                    {String(globalIndex + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

function ArrowNarrowRightDashedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12h.5m3 0h1.5m3 0h6" />
      <path d="M15 16l4 -4" />
      <path d="M15 8l4 4" />
    </svg>
  );
}

export function LandingSplitChecklist({
  items,
  timelineRef,
  animationStart = 0,
}: {
  items: string[];
  timelineRef: RefObject<HTMLDivElement | null>;
  animationStart?: number;
}) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <div className="border-y border-zinc-200">
      <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
        {columns.map((column, colIndex) => (
          <ul key={colIndex} className={cn(colIndex === 0 ? "md:pr-10" : "md:pl-10")}>
            {column.map((item, rowIndex) => {
              const isLastInColumn = rowIndex === column.length - 1;
              const isLastOverall =
                colIndex === columns.length - 1 && isLastInColumn;

              return (
              <TimelineContent
                key={item}
                as="li"
                animationNum={animationStart + colIndex * half + rowIndex}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className={cn(
                  "group flex items-start gap-3 py-4",
                  "transition-[color,font-weight]",
                  landingListEaseClass,
                  // Mobile: continuous dividers through the full stacked list
                  !isLastOverall && "border-b border-zinc-200",
                  // Desktop: per-column dividers (no line under last item in left column)
                  isLastInColumn && colIndex === 0 && "md:border-b-0",
                  rowIndex !== column.length - 1 &&
                    "md:border-b md:border-zinc-200",
                )}
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-blue-600"
                >
                  <ArrowNarrowRightDashedIcon />
                </span>
                <span
                  className={cn(
                    "text-sm leading-relaxed text-zinc-700 md:text-base [&_strong]:text-blue-600",
                    landingListTextHoverClass,
                  )}
                >
                  {item}
                </span>
              </TimelineContent>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function LandingGoalBanner({
  eyebrow,
  title,
  className,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-dashed border-zinc-200 bg-white px-6 py-10 text-center md:py-14 mt-4",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, white 0%, white 50%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at 50% 120%, #a1a1aa 0%, white 80%)",
          opacity: 0.75,
        }}
      >
        <div
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 70%)",
            backgroundImage:
              "repeating-conic-gradient(from 0deg at 50% 100%, #71717a 0deg, #71717a 2deg, transparent 2deg, transparent 10deg)",
            bottom: "-20%",
            height: "100%",
            left: "50%",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
            opacity: 0.2,
            pointerEvents: "none",
            position: "absolute",
            transform: "translateX(-50%)",
            width: "200%",
          }}
        />
      </div>
      <div className="relative z-10">
        {eyebrow ? <div className="mb-3">{eyebrow}</div> : null}
        <div className="text-2xl font-semibold text-zinc-900 md:text-4xl">{title}</div>
        {children}
      </div>
    </div>
  );
}

export function LandingIconList({
  items,
}: {
  items: { text: string; icon: ReactNode }[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.text} className={cn("flex items-start gap-3", landingListRowHoverClass)}>
          <span
            aria-hidden
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-blue-600 [&_svg]:h-5 [&_svg]:w-5"
          >
            {item.icon}
          </span>
          <span
            className={cn(
              "text-sm leading-relaxed text-zinc-700 md:text-base",
              landingListTextHoverClass,
            )}
          >
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Icon chips in a flex-wrap brick layout */
export function LandingBrickIconChips({
  items,
}: {
  items: { text: string; icon: ReactNode }[];
}) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-2.5">
      {items.map((item) => (
        <span
          key={item.text}
          className={cn(
            "group inline-flex items-center gap-1.5 rounded-lg border border-dotted border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-[color,font-weight,border-color] hover:border-zinc-300 hover:font-semibold sm:gap-2 sm:px-4 sm:py-2 sm:text-sm",
            landingListEaseClass,
          )}
        >
          <span aria-hidden className={landingListIconWrapperClass}>
            {item.icon}
          </span>
          <span className={cn("leading-snug", landingListTextHoverClass)}>
            {item.text.trim()}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Bordered list rows with custom icons (preserves existing icon markup) */
export function LandingBorderedIconList({
  items,
}: {
  items: { text: string; icon: ReactNode }[];
}) {
  return (
    <ul className="border-y border-zinc-200">
      {items.map((item, index) => (
        <li
          key={item.text}
          className={cn(
            "flex items-start gap-3 py-4",
            landingListRowHoverClass,
            index < items.length - 1 && "border-b border-zinc-200",
          )}
        >
          <span className={landingListIconWrapperClass}>{item.icon}</span>
          <span
            className={cn(
              "text-sm leading-relaxed text-zinc-700 md:text-base [&_strong]:font-semibold [&_strong]:text-blue-600",
              landingListTextHoverClass,
            )}
          >
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
