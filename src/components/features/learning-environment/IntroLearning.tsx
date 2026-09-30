import type { ReactNode } from "react";
import { useRef } from "react";
import { assetSrc, cn } from "@/lib/utils";
import openingSvg from "@/assets/img/Learning-Enviorment/opening.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingBorderedIconList,
  LandingGoalBanner,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingSectionSubheadingClass,
} from "@/components/ui/landing-section";

const DeviceIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -10" />
    <path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" />
    <path d="M9 12v-4" /><path d="M12 12v-1" /><path d="M15 12v-2" />
  </svg>
);

const TerminalIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" />
    <path d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12" />
  </svg>
);

const SearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M11 15a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M18.5 18.5l2.5 2.5" /><path d="M4 6h16" /><path d="M4 12h4" /><path d="M4 18h4" />
  </svg>
);

const UserCheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
    <path d="M20 21l2 -2l-2 -2" /><path d="M17 17l-2 2l2 2" />
  </svg>
);

const approachListItems = [
  { text: "Live instructor-led online sessions", icon: DeviceIcon },
  { text: "Hands-on execution inside a virtual environment", icon: TerminalIcon },
  { text: "Investigation-driven analysis", icon: SearchIcon },
  { text: "Guided exercises and independent self-practice", icon: UserCheckIcon },
];

function MergedBentoBlock({ children }: { children: ReactNode }) {
  return <div className="max-md:divide-y max-md:divide-zinc-200">{children}</div>;
}

function SectionImage({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={assetSrc(src)}
      alt={alt}
      className={cn(
        "mx-auto h-auto w-full max-w-[180px] sm:max-w-[200px] md:max-w-[200px] lg:max-w-[220px]",
        className,
      )}
    />
  );
}

const IntroLearning = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const openingBody = (
    <>
      <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
        Real cyber professionals are built by operating inside realistic systems, analyzing failures, investigating attacks, and making decisions under controlled but authentic conditions.
      </TimelineContent>
      <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
        At CYBERLABS India, learning happens inside a structured cyber learning environment that combines live instructor-led online learning with a comprehensive virtual simulator — designed to reflect how cybersecurity works in real organizations.
      </TimelineContent>
    </>
  );

  const approachBody = (
    <>
      <TimelineContent as="p" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
        Our learning approach is based on the following principles:{" "}
        <span className="font-semibold text-zinc-900">Every concept must be experienced, tested, and applied.</span>{" "}
        Instead of separating theory from practice, CYBERLABS INDIA integrates:
      </TimelineContent>
      <TimelineContent as="div" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBorderedIconList items={approachListItems} />
      </TimelineContent>
    </>
  );

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="md:px-0 md:pr-8">
                <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Cybersecurity Cannot Be Mastered Through Theory Alone"
                    className={landingSectionHeadingClass}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{openingBody}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
                <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={openingSvg} />
                </TimelineContent>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{openingBody}</div>
          </MergedBentoBlock>

          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="md:px-0 md:pr-8">
                <TimelineContent as="h2" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="The CYBERLABS Learning Approach"
                    className={landingSectionHeadingClass}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{approachBody}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex flex-col justify-center md:px-0 md:pl-8">
                <TimelineContent
                  as="div"
                  animationNum={3}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className={`${landingSectionSubheadingClass} text-zinc-900 text-xl sm:text-2xl md:text-3xl font-semibold`}
                >
                  <span className="block">Experience.</span>
                  <span className="block">Test.</span>
                  <span className="block">Apply.</span>
                </TimelineContent>
           
                <TimelineContent
                  as="p"
                  animationNum={4}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className="mt-3 text-xl leading-relaxed text-blue-600 font-semibold md:text-3xl"
                >
                  Every program integrates live instruction with hands-on simulator work so learners build judgment — not just knowledge.
                </TimelineContent>
           
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{approachBody}</div>
          </MergedBentoBlock>

          <LandingGoalBanner
            title={
              <span>
                This ensures learners develop{" "}
                <span className="font-semibold text-blue-600">real operational capability</span>, not just academic understanding.
              </span>
            }
          />
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default IntroLearning;
