"use client";

import { useRef } from "react";
import { cn, stripLeadingNumber } from "@/lib/utils";
import { usePageDetail } from "@/hooks/useProgramDetail";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingListEaseClass,
  landingListTextHoverClass,
} from "@/components/ui/landing-section";

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

type WhatsNewItem = {
  title: string;
  text: string;
};

function SplitWhatsNewList({
  items,
  timelineRef,
  animationStart = 1,
}: {
  items: WhatsNewItem[];
  timelineRef: React.RefObject<HTMLDivElement | null>;
  animationStart?: number;
}) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
        {columns.map((column, colIndex) => (
          <ul key={colIndex} className={cn(colIndex === 0 ? "md:pr-8" : "md:pl-8")}>
            {column.map((item, rowIndex) => {
              const globalIndex = colIndex === 0 ? rowIndex : half + rowIndex;
              const isLastInColumn = rowIndex === column.length - 1;
              const isLastOverall =
                colIndex === columns.length - 1 && isLastInColumn;

              return (
                <TimelineContent
                  key={`${item.title}-${globalIndex}`}
                  as="li"
                  animationNum={animationStart + globalIndex}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className={cn(
                    "group flex items-start gap-3 py-4",
                    "transition-[color,font-weight]",
                    landingListEaseClass,
                    !isLastOverall && "border-b border-zinc-200",
                    isLastInColumn && colIndex === 0 && "md:border-b-0",
                    rowIndex !== column.length - 1 && "md:border-b md:border-zinc-200",
                  )}
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-emerald-600"
                  >
                    <ArrowNarrowRightDashedIcon />
                  </span>
                  <div className="min-w-0 flex-1">
                    {item.title && (
                      <p
                        className={cn(
                          "text-sm font-semibold leading-snug text-zinc-900 md:text-base",
                          landingListTextHoverClass,
                        )}
                      >
                        {globalIndex + 1}. {item.title}
                      </p>
                    )}
                    {item.text &&
                      item.text.split("\n").map((line, lineIdx) => (
                        <p
                          key={lineIdx}
                          className={cn(
                            "mt-1.5 text-sm leading-relaxed text-zinc-700 md:text-base",
                            landingListTextHoverClass,
                          )}
                        >
                          {line}
                        </p>
                      ))}
                  </div>
                </TimelineContent>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

const BootcampWhatsNew = () => {
  const whatsNew = usePageDetail()?.whatsNew;
  const timelineRef = useRef<HTMLDivElement>(null);

  if (!whatsNew) return null;

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent
          as="h3"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text={stripLeadingNumber(whatsNew.heading)}
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <LandingBento className="mt-8 border-y border-zinc-200">
          <LandingBentoCell className="px-0 py-6 md:px-0 md:py-6">
            <SplitWhatsNewList
              items={whatsNew.items}
              timelineRef={timelineRef}
              animationStart={1}
            />
          </LandingBentoCell>

          {whatsNew.closingParagraph && (
            <LandingBentoCell className="px-0 py-6 md:px-0 md:py-6">
              <TimelineContent
                as="p"
                animationNum={whatsNew.items.length + 1}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                {whatsNew.closingParagraph}
              </TimelineContent>
            </LandingBentoCell>
          )}
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default BootcampWhatsNew;
