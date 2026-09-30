import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingSplitChecklist,
  landingRevealVariants,
  homeSectionSpacingClass,
} from "@/components/ui/landing-section";
import cyberDefenseTraining from "@/assets/img/HomePageImages/cybredefensetraining.svg";
import whoourtraining from "@/assets/img/HomePageImages/whoourtraining.svg";

const programs = [
  "Realistic attack and defense simulations",
  "SOC-style workflows and investigation-driven labs",
  "Incident response and threat analysis exercises",
  "Identity, platform, cloud, and infrastructure abuse analysis",
  "Decision-making under real-world pressure",
];

const trainingServes = [
  "Individuals and families",
  "Global enterprises and technology platforms",
  "Banks and financial institutions",
  "Healthcare, education, and critical infrastructure",
  "Government and public-sector systems",
];

const PracticalHome = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell className={homeSectionSpacingClass}>
      <div ref={timelineRef}>
        

        <TimelineContent as="div" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 space-y-2">
          <ShinyText
            text="Practical. Operational. Real."
            className="text-2xl font-semibold  leading-tight sm:text-3xl md:text-4xl"
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
          <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
            <span className="text-blue-600">Israeli Cyber Defense Training</span>
            <span className="text-zinc-900">, Delivered Hands-On</span>
          </h2>
        </TimelineContent>

        <LandingBento className="mt-10">
          <LandingBentoRow>
            <LandingBentoCell>
              <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-sm leading-relaxed text-zinc-600 md:text-base">
                CYBERLABS INDIA training mirrors{" "}
                <span className="font-extrabold text-zinc-900">how cyber defense actually works in Israel and global organizations.</span>
              </TimelineContent>
              <TimelineContent as="h4" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 text-base font-semibold text-zinc-900 md:text-lg">
                Programs include:
              </TimelineContent>
              <div className="mt-6">
                <LandingSplitChecklist items={programs} timelineRef={timelineRef} animationStart={4} />
              </div>
              <TimelineContent as="p" animationNum={10} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 text-sm font-semibold capitalize text-zinc-700 md:text-base">
                Graduates are trained to operate in real cybersecurity roles from day one.
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center justify-center">
              <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <img
                  src={assetSrc(cyberDefenseTraining)}
                  alt="Cyber defense training - programs"
                  className="mx-auto h-auto w-full max-w-[480px]"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>

          <LandingBentoCell>
            <TimelineContent as="h4" animationNum={11} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-xl font-semibold  text-zinc-900 md:text-2xl lg:text-3xl">
              Who our training serves
            </TimelineContent>
            <TimelineContent as="p" animationNum={12} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-2 text-lg font-semibold text-blue-600 md:text-xl lg:text-2xl">
              Cyber Defenders the World Can Rely On.
            </TimelineContent>
          </LandingBentoCell>

          <LandingBentoRow>
            <LandingBentoCell className="flex items-center justify-center">
              <TimelineContent as="div" animationNum={13} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <img
                  src={assetSrc(whoourtraining)}
                  alt="Who our training serves"
                  className="mx-auto h-auto w-full max-w-[480px]"
                />
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell>
              <TimelineContent as="h4" animationNum={14} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-base font-semibold text-zinc-900 md:text-lg">
                CYBERLABS INDIA trains professionals capable of protecting:
              </TimelineContent>
              <div className="mt-6">
                <LandingSplitChecklist items={trainingServes} timelineRef={timelineRef} animationStart={15} />
              </div>
              <TimelineContent as="p" animationNum={20} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 text-sm font-medium capitalize text-zinc-700 md:text-base">
                Our graduates carry forward the{" "}
                <span className="font-bold text-zinc-900">Israeli cyber defense standard of responsibility, discipline, and trust.</span>
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default PracticalHome;
