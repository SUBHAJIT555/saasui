import type { ReactNode } from "react";
import { assetSrc, cn } from "@/lib/utils";
import { useRef } from "react";
import generaladmission1Svg from "@/assets/img/Learning-Enviorment/generaladmission1.svg";
import generaladmission2Svg from "@/assets/img/Learning-Enviorment/generaladmission2.svg";
import { AnimatedList } from "@/components/ui/animated-list";
import type { AnimatedListItem } from "@/components/ui/animated-list";
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
  landingListRowHoverClass,
  landingListTextHoverClass,
} from "@/components/ui/landing-section";

const iconClass = "h-5 w-5 shrink-0 text-blue-600";

const column1ListItems = [
  {
    text: "Live instructor-led online sessions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10" />
        <path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" />
      </svg>
    ),
  },
  {
    text: "Hands-on labs and simulation-based learning",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 7l5 5l-5 5" /><path d="M12 19l7 0" />
      </svg>
    ),
  },
  {
    text: "Continuous assessments and practical evaluations",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
        <path d="M11 6l9 0" /><path d="M11 12l9 0" /><path d="M11 18l9 0" />
      </svg>
    ),
  },
  {
    text: "Independent practice and investigation work",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
        <path d="M14 17.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /><path d="M18.5 19.5l2.5 2.5" />
      </svg>
    ),
  },
  {
    text: "A professional learning environment with high standards",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
        <path d="M9 12l2 2l4 -4" />
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

const GeneralAdmission = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const column2ListItems: AnimatedListItem[] = [
    {
      text: "Not mandatory",
      rest: "for Full-Stack Cyber Defense & Offensive Security programs",
      icon: (
        <span className={iconClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 9a3 3 0 1 1 -3 3l.005 -.176a3 3 0 0 1 2.995 -2.824" />
            <path d="M16 5a7 7 0 0 1 0 14h-8a7 7 0 0 1 0 -14zm0 2h-8a5 5 0 1 0 0 10h8a5 5 0 0 0 0 -10" />
          </svg>
        </span>
      ),
    },
    {
      text: "Helpful but not compulsory",
      rest: "for advanced investigation and platform programs",
      icon: (
        <span className={iconClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 9h.01" /><path d="M11 12h1v4h1" />
          </svg>
        </span>
      ),
    },
  ];

  const section1Body = (
    <>
      <TimelineContent as="div" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBorderedIconList items={column1ListItems} />
      </TimelineContent>
      <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 border-t border-zinc-200 pt-5 text-sm leading-relaxed text-zinc-700 md:text-base">
        These programs are not passive. They require{" "}
        <span className="font-semibold text-blue-600">focus</span>,{" "}
        <span className="font-semibold text-blue-600">discipline</span>, and{" "}
        <span className="font-semibold text-blue-600">curiosity</span>.
      </TimelineContent>
    </>
  );

  const section2Body = (
    <>
      <TimelineContent as="div" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <AnimatedList
          items={column2ListItems}
          viewportOnce={false}
          viewportAmount={0.5}
          duration={0.6}
          staggerDelay={0.08}
          xOffset={40}
          containerClassName="border-y border-zinc-200"
          contentClassName={cn("text-sm leading-relaxed text-zinc-700 md:text-base", landingListTextHoverClass)}
          itemClassName={cn("flex items-start gap-3 border-b border-zinc-200 py-4 last:border-b-0", landingListRowHoverClass)}
          iconClassName="mt-0.5 shrink-0 flex items-center pt-0.5 text-blue-600"
          boldText={true}
        />
      </TimelineContent>
      <TimelineContent as="p" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 border-t border-zinc-200 pt-5 text-sm leading-relaxed text-zinc-700 md:text-base">
        Readiness and fit are evaluated through the{" "}
        <span className="font-semibold text-blue-600">Request a Call Back</span> process, not automated rejection.
        Every applicant gets a real conversation with our admissions team before decisions are made.
      </TimelineContent>
    </>
  );

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          <div className="py-6 md:py-8">
            <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
              <ShinyText
                text="General Admission Expectations "
                className={landingSectionHeadingClass}
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
              <span className={`${landingSectionHeadingClass} text-blue-600`}>(All Programs)</span>
            </TimelineContent>
          </div>

          {/* 1. Regardless of background — content left, image right */}
          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="order-2 md:order-1 md:px-0 md:pr-8">
                <TimelineContent as="h3" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Regardless of background, applicants should be prepared for:"
                    className="text-lg font-semibold leading-tight text-zinc-900 sm:text-xl md:text-2xl"
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{section1Body}</div>
              </LandingBentoCell>
              <LandingBentoCell className="order-1 flex items-center justify-center md:order-2 md:px-0 md:pl-8">
                <SectionImage src={generaladmission1Svg} />
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{section1Body}</div>
          </MergedBentoBlock>

          {/* 2. Do you need prior experience? — image left, content right */}
          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="order-1 flex items-center justify-center md:px-0 md:pr-8">
                <SectionImage src={generaladmission2Svg} />
              </LandingBentoCell>
              <LandingBentoCell className="order-2 md:px-0 md:pl-8">
                <TimelineContent as="h3" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Do you need prior cybersecurity experience?"
                    className="text-lg font-semibold leading-tight text-zinc-900 sm:text-xl md:text-2xl"
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{section2Body}</div>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{section2Body}</div>
          </MergedBentoBlock>

          {/* 3. Closing statement */}
          <LandingGoalBanner
            className="py-10 text-left md:py-14 md:text-center"
            title={
              <div className="mx-auto max-w-3xl space-y-5 sm:space-y-6">
                <p className="text-sm italic leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                  CYBERLABS programs are designed for learners who want to{" "}
                  <span className="font-semibold text-blue-600 not-italic">think</span>,{" "}
                  <span className="font-semibold text-blue-600 not-italic">investigate</span>, and{" "}
                  <span className="font-semibold text-blue-600 not-italic">operate</span>, not just collect certificates.
                </p>
                <p className="text-sm italic leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                  If you are <span className="font-semibold text-blue-600 not-italic">motivated</span>,{" "}
                  <span className="font-semibold text-blue-600 not-italic">curious</span>, and{" "}
                  <span className="font-semibold text-blue-600 not-italic">serious</span> about building a long-term cybersecurity career,
                  your educational background will not limit you here.
                </p>
              </div>
            }
          />
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default GeneralAdmission;
