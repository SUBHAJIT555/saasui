import type { ReactNode } from "react";
import { assetSrc, cn } from "@/lib/utils";
import { useRef } from "react";
import officialCertSvg from "@/assets/img/Official certification/officialcertification.svg";
import performanceTranscriptSvg from "@/assets/img/Official certification/performancetranscript.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import { FeatureCard } from "@/components/ui/FeatureCard";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingSplitNumberedList,
  LandingNumberedList,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingSectionSubheadingClass,
} from "@/components/ui/landing-section";

const textWideRowClass = "md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]";
const imageLeftTextWideRowClass = "md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]";

const iconClass = "h-8 w-8 shrink-0 text-blue-600";

const emphasisItems = [
  "Practical Execution",
  "Investigation & Analytical Thinking",
  "Operational Decision Making",
  "Real-world Cyber Scenarios",
];

const completionItems = [
  "Structured Academic Instruction",
  "Extensive Hands-on Labs and Simulations",
  "Formal Assessments Aligned with CYBERLABS USA Standards",
];

const transcriptCoverageFeatures = [
  {
    title: "Practical lab execution",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 9l3 3l-3 3" />
        <path d="M13 15h3" />
        <path d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12" />
      </svg>
    ),
  },
  {
    title: "Investigation and analytical work",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M11 15a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M18.5 18.5l2.5 2.5" />
        <path d="M4 6h16" />
        <path d="M4 12h4" />
        <path d="M4 18h4" />
      </svg>
    ),
  },
  {
    title: "Scenario-based assessments",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
        <path d="M9 12l2 2l4 -4" />
      </svg>
    ),
  },
  {
    title: "Professional reporting and documentation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
        <path d="M9 9h1" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
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
      className="mx-auto h-auto w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px]"
    />
  );
}

function BorderedNumberedList({ items, startIndex = 0 }: { items: string[]; startIndex?: number }) {
  return (
    <div className="border-y border-zinc-200">
      <LandingNumberedList items={items} startIndex={startIndex} />
    </div>
  );
}

const OfficialCertificate = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const section1Body = (
    <>
      <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        Upon successful completion of a program, learners are awarded an{" "}
        <span className="font-semibold text-blue-600">official internal certificate issued by CYBERLABS USA.</span>
      </TimelineContent>
      <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        These certificates are issued under{" "}
        <span className="font-semibold text-blue-600">CYBERLABS USA&apos;s global training and evaluation framework</span>{" "}
        and represent a rigorous standard of cybersecurity competence, with strong emphasis on:
      </TimelineContent>
      <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingSplitNumberedList items={emphasisItems} />
      </TimelineContent>
      <TimelineContent as="p" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-zinc-900 md:text-base">
        The certification confirms that the learner has successfully completed:
      </TimelineContent>
      <TimelineContent as="div" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <BorderedNumberedList items={completionItems} />
      </TimelineContent>
    </>
  );

  const section2IntroBody = (
    <>
      <TimelineContent as="p" animationNum={6} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        In addition to the primary certificate, CYBERLABS INDIA provides a{" "}
        <span className="font-semibold text-blue-600">Professional Performance Transcript</span> for programs delivered in India.
      </TimelineContent>
      <TimelineContent as="p" animationNum={7} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        This transcript is designed to meet the expectations of{" "}
        <span className="font-semibold text-zinc-900">Global enterprises, multinational employers, and institutional stakeholders</span>, offering a{" "}
        <span className="font-semibold text-blue-600">clear, skills-based view of learner performance</span> beyond course completion.
      </TimelineContent>
      <TimelineContent as="p" animationNum={8} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        The transcript complements the <span className="font-semibold text-blue-600">CYBERLABS USA certificate</span> and does not replace or modify it.
      </TimelineContent>
    </>
  );

  const section2CoverageBody = (
    <>
      <TimelineContent as="h3" animationNum={9} timelineRef={timelineRef} customVariants={landingRevealVariants}>
        <span className={landingSectionSubheadingClass}>What the Performance Transcript Covers</span>
      </TimelineContent>
      <TimelineContent as="p" animationNum={10} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        The Professional Performance Transcript provides granular insight into performance across:
      </TimelineContent>
      <TimelineContent as="div" animationNum={11} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 border-t border-dashed border-zinc-200 pt-6 md:pt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {transcriptCoverageFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={{
                title: feature.title,
                icon: feature.icon,
              }}
              className="h-full text-left shadow-sm"
            />
          ))}
        </div>
      </TimelineContent>
      <TimelineContent as="p" animationNum={12} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 border-t border-zinc-200 pt-5 text-sm leading-relaxed text-zinc-700 md:text-base">
        This enables employers to evaluate{" "}
        <span className="font-semibold text-blue-600">capability, depth, and readiness</span>, not just attendance or exam results.
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
                    text="Official Certification Issued"
                    className={cn(landingSectionHeadingClass, "block")}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                  <span className={cn(landingSectionHeadingClass, "mt-1 block")}>
                    <span className="whitespace-nowrap">
                      <span className="text-zinc-900">by </span>
                      <span className="text-blue-600">CYBERLABS USA</span>
                    </span>
                  </span>
                </TimelineContent>
                <div className="hidden md:block">{section1Body}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex items-center justify-center py-6 md:px-0 md:py-0 md:pl-6 lg:pl-8">
                <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={officialCertSvg} />
                </TimelineContent>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 pb-6 md:hidden">{section1Body}</div>
          </MergedBentoBlock>

          <MergedBentoBlock>
            <LandingBentoRow className={imageLeftTextWideRowClass}>
              <LandingBentoCell className="order-2 flex items-center justify-center py-6 md:order-0 md:px-0 md:py-0 md:pr-6 lg:pr-8">
                <TimelineContent as="div" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={performanceTranscriptSvg} />
                </TimelineContent>
              </LandingBentoCell>
              <LandingBentoCell className="order-1 md:order-0 md:px-0 md:pl-8">
                <TimelineContent as="h2" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Professional Performance Transcript"
                    className={cn(landingSectionHeadingClass, "block")}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                  <span className={cn(landingSectionHeadingClass, "mt-1 block text-blue-600")}>(India Programs)</span>
                </TimelineContent>
                <div className="hidden md:block">{section2IntroBody}</div>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 pb-6 md:hidden">{section2IntroBody}</div>
            <div className="border-t border-zinc-200 px-0 py-6 md:py-8">{section2CoverageBody}</div>
          </MergedBentoBlock>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default OfficialCertificate;
