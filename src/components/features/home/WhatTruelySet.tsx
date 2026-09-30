import type { ReactNode, RefObject } from "react";
import { useRef } from "react";
import { assetSrc, parseBoldText } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import closingSvg from "@/assets/img/TeamMemberImages/closing.svg";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingListRowHoverClass,
  landingListTextHoverClass,
} from "@/components/ui/landing-section";

type ListItem = { text: string; icon: ReactNode };

const XIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-red-500">
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const CheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-400">
    <path d="M20 6L9 17l-5 -5" />
  </svg>
);

const mostInstitutesList: ListItem[] = [
  { text: "Trainers with certification-only backgrounds", icon: XIcon },
  { text: "Academic instructors disconnected from live threats", icon: XIcon },
  { text: "Static syllabi updated once every few years", icon: XIcon },
];

const cyberlabsList: ListItem[] = [
  { text: "Cyber commanders and intelligence officers", icon: CheckIcon },
  { text: "CISOs and incident responders", icon: CheckIcon },
  { text: "Architects of real cyber systems and national training frameworks", icon: CheckIcon },
];

const cardRevealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.45 },
  }),
  hidden: { filter: "blur(10px)", y: 16, opacity: 0 },
};

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

function TopicCard({
  title,
  items,
  featured = false,
  animationNum,
  timelineRef,
}: {
  title: string;
  items: ListItem[];
  featured?: boolean;
  animationNum: number;
  timelineRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <TimelineContent
      as="article"
      animationNum={animationNum}
      timelineRef={timelineRef}
      customVariants={cardRevealVariants}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-dashed p-7 transition-shadow duration-300 md:p-8",
        featured
          ? "border-zinc-700 bg-zinc-900 text-white shadow-xl shadow-zinc-900/15"
          : "border-zinc-200 bg-neutral-50 shadow-sm hover:shadow-md",
      )}
    >
      <CardGridBackground variant={featured ? "dark" : "light"} />

      <div className="relative z-10">
        <h3 className="text-pretty">
          <ShinyText
            text={title}
            className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl"
            color={featured ? "#e4e4e7" : "#3f3f46"}
            shineColor={featured ? "#ffffff" : "#18181b"}
            speed={3}
            spread={120}
          />
        </h3>
      </div>

      <div className={cn("relative z-10 my-6 h-px w-full", featured ? "bg-zinc-800" : "bg-zinc-200")} />

      <ul className="relative z-10 flex-1 space-y-3">
        {items.map((item) => (
          <li key={item.text} className={cn("flex items-start gap-3", landingListRowHoverClass)}>
            <span className={cn("mt-0.5 flex shrink-0 items-center justify-center", featured ? "text-blue-400" : "")}>
              {item.icon}
            </span>
            <span
              className={cn(
                "pt-1 text-sm leading-relaxed md:text-base",
                featured ? "text-zinc-300" : "text-zinc-700",
                landingListTextHoverClass,
                featured && "group-hover:text-zinc-100",
              )}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </TimelineContent>
  );
}

const WhatTruelySet = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <ShinyText
            text="What Truly Sets CYBERLABS Apart"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <TopicCard
            title="Most institutes are led by:"
            items={mostInstitutesList}
            animationNum={1}
            timelineRef={timelineRef}
          />
          <TopicCard
            title="CYBERLABS is led by:"
            items={cyberlabsList}
            featured
            animationNum={2}
            timelineRef={timelineRef}
          />
        </div>

        <LandingBento className="mt-12">
          <LandingBentoRow>
            <LandingBentoCell className="flex items-center justify-center md:px-0 md:pr-8">
              <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <img
                  src={assetSrc(closingSvg)}
                  alt=""
                  className="mx-auto h-auto w-full max-w-[200px] rounded-lg object-cover sm:max-w-[240px] md:w-[200px] md:max-w-none lg:w-[260px]"
                />
              </TimelineContent>
            </LandingBentoCell>
            <LandingBentoCell className="md:px-0 md:pl-8">
              <TimelineContent as="div" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <p className="text-xl font-semibold leading-snug text-zinc-900 sm:text-2xl md:text-3xl">
                  <span className="block">We don&apos;t teach cybersecurity as a subject.</span>
                  <span className="mt-2 block text-2xl font-bold text-blue-600 sm:mt-3 sm:text-3xl md:text-4xl">
                    We teach it as a profession.
                  </span>
                </p>
              </TimelineContent>
              <TimelineContent as="p" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 text-sm leading-relaxed text-zinc-700 md:text-base">
                {parseBoldText(
                  "**CYBERLABS** was built by people who have **lived cybersecurity**, not just studied it.",
                )}
              </TimelineContent>
              <TimelineContent as="p" animationNum={6} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
                With Israel-founded roots, leadership drawn from real cyber operations, and instructors actively engaged in the field,{" "}
                <span className="font-semibold text-blue-600">CYBERLABS</span> delivers cybersecurity education that is{" "}
                <span className="font-semibold text-zinc-900">serious, operational, and trusted</span>.
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default WhatTruelySet;
