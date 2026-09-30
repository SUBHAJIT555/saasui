import { useRef, type ReactNode } from "react";
import { parseBoldText, assetSrc } from "@/lib/utils";
import whatcyberlabsSvg from "@/assets/img/AboutPageImages/whatcyberlabs.svg";
import foundationSvg from "@/assets/img/AboutPageImages/foundation.svg";
import whySvg from "@/assets/img/AboutPageImages/why.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingBorderedIconList,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";
import { cn } from "@/lib/utils";

const AlertOctagonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-octagon h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
);

const RadarIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-radar h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M21 12h-8a1 1 0 1 0 -1 1v8a9 9 0 0 0 9 -9" />
      <path d="M16 9a5 5 0 1 0 -7 7" />
      <path d="M20.486 9a9 9 0 1 0 -11.482 11.495" />
    </svg>
);

const FingerprintIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-fingerprint h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
      <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
      <path d="M12 11v2a14 14 0 0 0 2.5 8" />
      <path d="M8 15a18 18 0 0 0 1.8 6" />
      <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
    </svg>
);

const RosetteDiscountCheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
);

const ListNumbersIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-list-numbers h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M11 6h9" />
      <path d="M11 12h9" />
      <path d="M12 18h8" />
      <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
      <path d="M6 10v-6l-2 2" />
    </svg>
);

const MessageQuestionIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-question h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M8 9h8" />
      <path d="M8 13h6" />
      <path d="M14 18h-1l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" />
      <path d="M19 22v.01" />
      <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
    </svg>
);

const TargetIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-target h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    </svg>
);

const foundationListItems = [
  { text: "Constant exposure to sophisticated cyber threats.", icon: AlertOctagonIcon },
  { text: "Intelligence-driven cyber defense operations.", icon: RadarIcon },
  { text: "Deep focus on attribution, investigation, and response.", icon: FingerprintIcon },
  { text: "Accountability at national, enterprise, and institutional levels.", icon: RosetteDiscountCheckIcon },
];

const whyBuiltListItems = [
  { text: "There are no step-by-step labs.", icon: ListNumbersIcon },
  { text: "There are no predefined answers.", icon: MessageQuestionIcon },
  { text: "There are no exam objectives to follow.", icon: TargetIcon },
];

function MergedBentoBlock({ children }: { children: ReactNode }) {
  return <div className="max-md:divide-y max-md:divide-zinc-200">{children}</div>;
}

function SectionImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <img
      src={assetSrc(src)}
      alt={alt}
      className="mx-auto h-auto w-full max-w-[420px] sm:max-w-[480px] md:max-w-none lg:max-w-md"
    />
  );
}

const AboutMerged = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const whatIsBody = (
    <>
      <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
        CYBERLABS is a global cybersecurity training and capability-building
        organization founded in Israel and built by professionals with
        real-world experience in cyber defense, investigations, and platform
        security.
      </TimelineContent>
      <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
        {parseBoldText(
          "CYBERLABS exists to prepare individuals and organizations to **operate inside real cyber environments**, where incidents are complex, information is incomplete, and decisions carry real consequences.",
        )}
      </TimelineContent>
    </>
  );

  const foundationBody = (
    <>
      <TimelineContent as="p" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        {parseBoldText(
          "CYBERLABS was founded in **Israel**, one of the world's most operationally advanced cybersecurity ecosystems.",
        )}
      </TimelineContent>
      <TimelineContent as="p" animationNum={6} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-blue-600 md:text-base">
        This ecosystem is shaped by:
      </TimelineContent>
      <TimelineContent as="div" animationNum={7} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBorderedIconList items={foundationListItems} />
      </TimelineContent>
      <TimelineContent as="p" animationNum={8} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm italic leading-relaxed text-zinc-700 md:text-base">
        CYBERLABS is built on this operational reality - not on academic
        models or certification-driven training.
      </TimelineContent>
    </>
  );

  const whyBuiltBody = (
    <>
      <TimelineContent as="p" animationNum={10} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        CYBERLABS was created to address a hard reality in cybersecurity
        education:
      </TimelineContent>
      <TimelineContent as="p" animationNum={11} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
        Most programs teach tools and techniques.
      </TimelineContent>
      <TimelineContent as="p" animationNum={12} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
        {parseBoldText(
          "Real cybersecurity work demands **judgment, investigation, and decision-making under pressure**.",
        )}
      </TimelineContent>
      <TimelineContent as="p" animationNum={13} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-blue-600 md:text-base">
        In real-world cyber incidents:
      </TimelineContent>
      <TimelineContent as="div" animationNum={14} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBorderedIconList items={whyBuiltListItems} />
      </TimelineContent>
      <TimelineContent as="p" animationNum={15} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        {parseBoldText(
          "Professionals are expected to **analyze unfamiliar systems, understand attacker intent, assess impact, and act with accountability**.",
        )}
      </TimelineContent>
      <TimelineContent as="p" animationNum={16} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold italic leading-relaxed text-blue-600 md:text-base">
        CYBERLABS exists to train professionals for that reality.
      </TimelineContent>
    </>
  );

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          {/* What is CYBERLABS — mobile: heading → image → content; desktop: text | image */}
          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="md:px-0 md:pr-8">
                <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="What is CYBERLABS ?"
                    className={landingSectionHeadingClass}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{whatIsBody}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
                <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={whatcyberlabsSvg} />
                </TimelineContent>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{whatIsBody}</div>
          </MergedBentoBlock>

          {/* Our Foundation — mobile: heading → image → content; desktop: image | text */}
          <MergedBentoBlock>
            <LandingBentoRow className="md:divide-x-0">
              <LandingBentoCell className="order-2 flex items-center justify-center md:order-0 md:px-0 md:pr-8">
                <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={foundationSvg} />
                </TimelineContent>
              </LandingBentoCell>
              <LandingBentoCell className="order-1 md:order-0 md:px-0 md:pl-8">
                <TimelineContent as="h2" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Our Foundation."
                    className={cn(landingSectionHeadingClass)}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{foundationBody}</div>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{foundationBody}</div>
          </MergedBentoBlock>

          {/* Why CYBERLABS Was Built — mobile: heading → image → content; desktop: text | image */}
          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="md:px-0 md:pr-8">
                <TimelineContent as="h2" animationNum={9} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Why CYBERLABS Was Built ?"
                    className={cn(landingSectionHeadingClass)}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{whyBuiltBody}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
                <TimelineContent as="div" animationNum={9} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={whySvg} />
                </TimelineContent>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{whyBuiltBody}</div>
          </MergedBentoBlock>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default AboutMerged;
