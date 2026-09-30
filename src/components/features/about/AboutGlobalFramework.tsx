import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import oneGlobal from "@/assets/img/AboutPageImages/oneGlobal.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingFramedTwoCol,
  LandingBentoCell,
  LandingBorderedIconList,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const LayersIntersectIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layers-intersect h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M8 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8" />
      <path d="M4 10a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8" />
    </svg>
);

const ClipboardCheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-check h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" />
      <path d="M9 14l2 2l4 -4" />
    </svg>
);

const Radar2Icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-radar-2 h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15.51 15.56a5 5 0 1 0 -3.51 1.44" />
      <path d="M18.832 17.86a9 9 0 1 0 -6.832 3.14" />
      <path d="M12 12v9" />
    </svg>
);

const ShieldLockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shield-lock h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12l0 2.5" />
    </svg>
);

const listItems = [
  { text: "Curriculum depth and learning progression.", icon: LayersIntersectIcon },
  { text: "Assessment and evaluation standards.", icon: ClipboardCheckIcon },
  { text: "Simulation-driven, investigation-focused training methodology.", icon: Radar2Icon },
  { text: "Alignment with real cybersecurity roles and industry expectations.", icon: ShieldLockIcon },
];

const AboutGlobalFramework = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <ShinyText
            text="One Global Framework, Delivered Locally"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <LandingBento className="mt-8">
          <LandingFramedTwoCol>
            <LandingBentoCell className="flex items-center justify-center md:px-0 md:pr-8">
              <TimelineContent as="div" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <img
                  src={assetSrc(oneGlobal)}
                  alt="One Global Framework"
                  className="mx-auto h-auto w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px]"
                />
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="md:px-0 md:pl-8">
              <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                CYBERLABS operates under a unified global training framework
                governed by CYBERLABS USA.
              </TimelineContent>
              <TimelineContent as="p" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-blue-600 md:text-base">
                This framework defines:
              </TimelineContent>
              <TimelineContent as="div" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
                <LandingBorderedIconList items={listItems} />
              </TimelineContent>
              <TimelineContent as="p" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-medium leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                Programs delivered in India follow this same framework - without
                dilution — while being adapted for local learners through Cyveritas
                Technologies LLP.
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default AboutGlobalFramework;
