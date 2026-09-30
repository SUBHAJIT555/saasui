import type { ReactNode, RefObject } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingGoalBanner,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingListRowHoverClass,
  landingListTextHoverClass,
} from "@/components/ui/landing-section";

const TerminalIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-terminal h-5 w-5 shrink-0">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 7l5 5l-5 5" />
    <path d="M12 19l7 0" />
  </svg>
);

const RouteIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-route h-5 w-5 shrink-0">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" />
    <path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" />
  </svg>
);

const RosetteDiscountCheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check h-5 w-5 shrink-0">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
    <path d="M9 12l2 2l4 -4" />
  </svg>
);

const AffiliateIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-affiliate h-5 w-5 shrink-0">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5.931 6.936l1.275 4.249m5.607 5.609l4.251 1.275" />
    <path d="M11.683 12.317l5.759 -5.759" />
    <path d="M4 5.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
    <path d="M17 5.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
    <path d="M17 18.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
    <path d="M4 15.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0" />
  </svg>
);

const BugIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bug h-5 w-5 shrink-0">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 9v-1a3 3 0 0 1 6 0v1" />
    <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" />
    <path d="M3 13l4 0" />
    <path d="M17 13l4 0" />
    <path d="M12 20l0 -6" />
    <path d="M4 19l3.35 -2" />
    <path d="M20 19l-3.35 -2" />
    <path d="M4 7l3.75 2.4" />
    <path d="M20 7l-3.75 2.4" />
  </svg>
);

const FileSearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-search h-5 w-5 shrink-0">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
    <path d="M14 17.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
    <path d="M18.5 19.5l2.5 2.5" />
  </svg>
);

const BrainIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brain h-5 w-5 shrink-0">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
    <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
    <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
    <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
    <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
    <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
  </svg>
);

type ListItem = { text: string; icon: ReactNode };

const mostProgramsList: ListItem[] = [
  { text: "Tool demonstrations.", icon: TerminalIcon },
  { text: "Predefined lab paths.", icon: RouteIcon },
  { text: "Exam-oriented learning.", icon: RosetteDiscountCheckIcon },
];

const cyberlabsFocusesList: ListItem[] = [
  { text: "System architecture and trust models.", icon: AffiliateIcon },
  { text: "Failure analysis and attack behavior.", icon: BugIcon },
  { text: "Investigation methodology.", icon: FileSearchIcon },
  { text: "Decision-making under real-world constraints.", icon: BrainIcon },
];

const cardRevealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
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

type TopicCardProps = {
  title: string;
  items: ListItem[];
  featured?: boolean;
  animationNum: number;
  timelineRef: RefObject<HTMLDivElement | null>;
};

function TopicCard({
  title,
  items,
  featured = false,
  animationNum,
  timelineRef,
}: TopicCardProps) {
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
          : "border-neutral-200 bg-neutral-50 shadow-sm hover:shadow-md",
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

      <div
        className={cn(
          "relative z-10 my-6 h-px w-full",
          featured ? "bg-zinc-800" : "bg-zinc-200",
        )}
      />

      <ul className="relative z-10 flex-1 space-y-3">
        {items.map((item) => (
          <li key={item.text} className={cn("flex items-start gap-3", landingListRowHoverClass)}>
            <span
              className={cn(
                "mt-0.5 flex shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-6 sm:[&_svg]:w-6",
                featured ? "text-blue-400" : "text-blue-600",
              )}
            >
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

const AboutHowDifferent = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <ShinyText
            text="How CYBERLABS Is Different"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 text-sm leading-relaxed text-blue-600 font-semibold md:text-base lg:text-lg"
        >
          CYBERLABS does not follow the traditional cybersecurity training model.
        </TimelineContent>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <TopicCard
            title="Where most programs focus on:"
            items={mostProgramsList}
            animationNum={2}
            timelineRef={timelineRef}
          />
          <TopicCard
            title="CYBERLABS focuses on:"
            items={cyberlabsFocusesList}
            featured
            animationNum={3}
            timelineRef={timelineRef}
          />
        </div>

        <TimelineContent as="div" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-12">
          <LandingGoalBanner
            title={
              <span className="capitalize">
                The difference is how professionals are trained to think.
              </span>
            }
          />
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
};

export default AboutHowDifferent;
