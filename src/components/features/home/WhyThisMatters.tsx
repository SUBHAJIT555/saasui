import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import { StackOrbit } from "@/components/ui/StackOrbit";
import {
  LandingSectionShell,
  LandingBento,
  LandingFramedTwoCol,
  LandingBentoCell,
  LandingBorderedIconList,
  LandingGoalBanner,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const RosetteCheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
    <path d="M9 12l2 2l4 -4" />
  </svg>
);

const listItems = [
  { text: "Operated inside realistic cyber environments", icon: RosetteCheckIcon },
  { text: "Completed structured hands-on labs", icon: RosetteCheckIcon },
  { text: "Practiced end-to-end investigations", icon: RosetteCheckIcon },
  { text: "Developed confidence before entering live systems", icon: RosetteCheckIcon },
];

const WhyThisMatters = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          <div className="py-6 md:py-8">
            <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
              <ShinyText
                text="Why This Matters"
                className={landingSectionHeadingClass}
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
            </TimelineContent>
          </div>

          <LandingFramedTwoCol>
            <LandingBentoCell className="py-6 md:py-8">
              <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
                Cybersecurity roles demand{" "}
                <span className="font-semibold text-zinc-900">confidence, judgment, and experience.</span>
              </TimelineContent>

              <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-5 text-sm font-medium text-zinc-800 sm:text-base md:text-lg">
                By the time learners complete a CYBERLABS India program, they have already:
              </TimelineContent>

              <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-5">
                <LandingBorderedIconList items={listItems} />
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center py-6 md:py-8">
              <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="relative min-h-[280px] w-full md:min-h-[320px] lg:min-h-[380px]">
                <StackOrbit />
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>

          <LandingGoalBanner
            title={
              <span>
                This is the difference between{" "}
                <span className="font-semibold text-blue-600">learning cybersecurity</span> and{" "}
                <span className="font-semibold text-blue-600">being ready to practice it.</span>
              </span>
            }
          />
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default WhyThisMatters;
