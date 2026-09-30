import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import cyberlabsIndiaImage from "@/assets/img/AboutPageImages/cyberlabsIndia.svg";
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

const BriefcaseIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
      <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
      <path d="M12 12l0 .01" />
      <path d="M3 13a20 20 0 0 0 18 0" />
    </svg>
);

const UserScanIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-scan h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
      <path d="M4 16v2a2 2 0 0 0 2 2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
      <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
    </svg>
);

const SearchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
);

const TrendingUpIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trending-up h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 17l6 -6l4 4l8 -8" />
      <path d="M14 7l7 0l0 7" />
    </svg>
);

const listItems = [
  { text: "Enterprise cybersecurity roles.", icon: BriefcaseIcon },
  { text: "Cybercrime and investigation functions.", icon: UserScanIcon },
  { text: "Platform, identity, and abuse defense teams.", icon: SearchIcon },
  { text: "India's rapidly expanding digital and regulatory environment.", icon: TrendingUpIcon },
];

const AboutIndiaSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <ShinyText
            text="CYBERLABS INDIA"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <LandingBento className="mt-8">
          <LandingFramedTwoCol>
            <LandingBentoCell className="md:px-0 md:pr-8">
              <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                CYBERLABS India brings this operational training philosophy to the
                Indian market through Cyveritas Technologies LLP.
              </TimelineContent>
              <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                The objective of CYBERLABS India is not mass training.
              </TimelineContent>
              <TimelineContent as="p" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-blue-600 md:text-base">
                It is capability development aligned with:
              </TimelineContent>
              <TimelineContent as="div" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
                <LandingBorderedIconList items={listItems} />
              </TimelineContent>
              <TimelineContent as="p" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-medium leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                CYBERLABS India focuses on long-term professional readiness, not
                short-term certification outcomes.
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
              <TimelineContent as="div" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <img
                  src={assetSrc(cyberlabsIndiaImage)}
                  alt="About CYBERLABS INDIA"
                  className="mx-auto h-auto w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px]"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default AboutIndiaSection;
