import type { ReactNode, RefObject } from "react";
import { assetSrc, cn } from "@/lib/utils";
import { useRef } from "react";
import closingSvg from "@/assets/img/Learning-Enviorment/reqcallback.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
  LANDING_GRADIENT_COLORS,
} from "@/components/ui/landing-section";

const textWideRowClass = "md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]";
const iconClass = "h-5 w-5 shrink-0 text-blue-600";

const steps = [
  "Understand which program best fits your current experience",
  "Assess readiness for advanced, simulation-driven learning",
  "Clarify learning structure, time commitment, and expectations",
  "Understand certification, assessments, and career pathways",
  "Address questions from professionals, parents, or sponsors",
];

const whoShouldCallListItems = [
  {
    text: "Aspiring cybersecurity professionals and career switchers",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 16l2 -6l6 -2l-2 6l-6 2" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 2" /><path d="M12 19l0 2" /><path d="M3 12l2 0" /><path d="M19 12l2 0" />
      </svg>
    ),
  },
  {
    text: "Working IT, engineering, or security professionals",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -10" />
        <path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" />
        <path d="M9 12v-4" /><path d="M12 12v-1" /><path d="M15 12v-2" />
      </svg>
    ),
  },
  {
    text: "Individuals considering advanced investigation or platform security roles",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
        <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12l0 2.5" />
      </svg>
    ),
  },
  {
    text: "Parents or sponsors evaluating program rigor and outcomes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
        <path d="M14 19l2 2l4 -4" /><path d="M9 8h4" /><path d="M9 12h2" />
      </svg>
    ),
  },
  {
    text: "Enterprises or institutions exploring structured cyber training",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21l18 0" /><path d="M5 21v-14l8 -4v18" /><path d="M19 21v-10l-6 -4" />
        <path d="M9 9l0 .01" /><path d="M9 12l0 .01" /><path d="M9 15l0 .01" /><path d="M9 18l0 .01" />
      </svg>
    ),
  },
];

function MergedBentoBlock({ children }: { children: ReactNode }) {
  return <div className="max-md:divide-y max-md:divide-zinc-200">{children}</div>;
}

function SectionImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <img
      src={assetSrc(src)}
      alt={alt}
      className="mx-auto h-auto w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px]"
    />
  );
}

function CardGridBackground({ variant = "light" }: { variant?: "light" | "dark" }) {
  const lineColor = variant === "dark" ? "#52525b" : "#e5e5e5";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${lineColor} 0, ${lineColor} 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, ${lineColor} 0, ${lineColor} 1px, transparent 0, transparent 50%)`,
        backgroundSize: "6px 6px",
        opacity: variant === "dark" ? 0.35 : 0.4,
      }}
    />
  );
}

type TopicCardProps = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  items?: string[];
  iconItems?: { text: string; icon: ReactNode }[];
  footer?: string;
  featured?: boolean;
  animationNum: number;
  timelineRef: RefObject<HTMLDivElement | null>;
};

function TopicCard({
  eyebrow,
  title,
  intro,
  items,
  iconItems,
  footer,
  featured = false,
  animationNum,
  timelineRef,
}: TopicCardProps) {
  return (
    <TimelineContent
      as="article"
      animationNum={animationNum}
      timelineRef={timelineRef}
      customVariants={landingRevealVariants}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-dashed p-7 transition-shadow duration-300 md:p-8",
        featured
          ? "border-zinc-700 bg-zinc-900 text-white shadow-xl shadow-zinc-900/15"
          : "border-zinc-200 bg-zinc-50 shadow-sm hover:shadow-md",
      )}
    >
      <CardGridBackground variant={featured ? "dark" : "light"} />

      <div className="relative z-10">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
            featured
              ? "border-zinc-700 bg-zinc-800/80"
              : "border-dotted border-zinc-200 bg-zinc-50",
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", featured ? "bg-blue-400" : "bg-blue-500")} />
          <GradientText
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            colors={
              featured
                ? ["#a1a1aa", "#60a5fa", "#d4d4d8", "#3b82f6", "#a1a1aa"]
                : [...LANDING_GRADIENT_COLORS]
            }
            animationSpeed={4}
            direction="horizontal"
            showBorder={false}
            pauseOnHover={false}
          >
            {eyebrow}
          </GradientText>
        </span>

        <h2 className="mt-5 text-pretty">
          <ShinyText
            text={title}
            className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl"
            color={featured ? "#e4e4e7" : "#3f3f46"}
            shineColor={featured ? "#ffffff" : "#18181b"}
            speed={3}
            spread={120}
          />
        </h2>

        {intro ? (
          <div
            className={cn(
              "mt-4 text-sm leading-relaxed md:text-base",
              featured ? "text-zinc-400" : "text-zinc-600",
            )}
          >
            {intro}
          </div>
        ) : null}
      </div>

      <div className={cn("relative z-10 my-6 h-px w-full", featured ? "bg-zinc-800" : "bg-zinc-200")} />

      <ul className="relative z-10 flex-1 space-y-3">
        {items?.map((item, index) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={cn(
                "shrink-0 font-semibold",
                featured ? "text-zinc-500" : "text-zinc-400",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "text-sm leading-relaxed md:text-base",
                featured ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              {item}
            </span>
          </li>
        ))}
        {iconItems?.map((item) => (
          <li key={item.text} className="flex items-start gap-3">
            <span className="mt-0.5 flex shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5">
              {item.icon}
            </span>
            <span
              className={cn(
                "text-sm leading-relaxed md:text-base",
                featured ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>

      {footer ? (
        <div
          className={cn(
            "relative z-10 mt-8 rounded-2xl border px-4 py-3.5 text-center text-sm font-medium leading-relaxed md:text-base",
            featured
              ? "border-zinc-700 bg-zinc-800/80 text-zinc-200"
              : "border-dashed border-zinc-200 bg-zinc-50 text-zinc-800",
          )}
        >
          {footer}
        </div>
      ) : null}
    </TimelineContent>
  );
}

const WhatThisCall = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const introBody = (
    <>
      <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold leading-snug text-zinc-900 sm:text-base md:text-lg lg:text-xl">
        <span className="block">Choosing the right cybersecurity program is a serious decision.</span>
      </TimelineContent>
      <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
        Our programs are <span className="font-semibold text-blue-600">rigorous, time-intensive, and designed to prepare you for real-world cybersecurity roles.</span> Before you enroll, we want to ensure the program you choose aligns with your background, goals, and career direction.
      </TimelineContent>
      <TimelineContent as="p" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        Request a call back to speak with a CYBERLABS admissions advisor and receive a guided, one-to-one consultation.
      </TimelineContent>
    </>
  );

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          <MergedBentoBlock>
            <LandingBentoRow className={textWideRowClass}>
              <LandingBentoCell className="md:px-0 md:pr-8">
                <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Speak With a CYBERLABS"
                    className={cn(landingSectionHeadingClass, "block")}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                  <span className={cn(landingSectionHeadingClass, "mt-1 block text-blue-600")}>Admissions Advisor</span>
                </TimelineContent>
                <div className="hidden md:block">{introBody}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex items-center justify-center py-6 md:px-0 md:py-0 md:pl-6 lg:pl-8">
                <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={closingSvg} />
                </TimelineContent>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 pb-6 md:hidden">{introBody}</div>
          </MergedBentoBlock>

          <div className="border-t border-zinc-200 py-6 md:py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <TopicCard
                eyebrow="Purpose"
                title="What This Call is For"
                intro={
                  <>
                    <p>
                      This is <span className="font-semibold text-blue-600">not a sales call.</span>
                    </p>
                    <p className="mt-3 font-semibold text-zinc-900">
                      During the conversation, we will help you:
                    </p>
                  </>
                }
                items={steps}
                footer="Our goal is to ensure mutual fit, not just enrollment."
                animationNum={4}
                timelineRef={timelineRef}
              />

              <TopicCard
                eyebrow="Audience"
                title="Who Should Request a Call Back"
                iconItems={whoShouldCallListItems}
                footer="If you are serious about building real cybersecurity capability, this call is for you."
                featured
                animationNum={5}
                timelineRef={timelineRef}
              />
            </div>
          </div>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default WhatThisCall;
