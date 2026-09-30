"use client";

import { useRef } from "react";
import { TypingKeyboard } from "@/components/ui/typing-keyboard";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingFramedTwoCol,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const ProgramPageOpening = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text="Train Beyond the Tools. Think Like a Cyber Operator."
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
              <TimelineContent
                as="p"
                animationNum={1}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                The future of cybersecurity belongs to professionals who can{" "}
                <span className="font-semibold text-zinc-900">
                  investigate, analyze, detect, defend, and make decisions under pressure.
                </span>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={2}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                <span className="font-semibold text-blue-600">CYBERLABS</span> Elite Boot Camps and Flagship Programs are built to develop operational capability across{" "}
                <span className="font-semibold text-zinc-900">
                  cyber defense, threat intelligence, platform security, cybercrime investigations, AI security, and modern security operations.
                </span>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-base font-semibold leading-snug text-zinc-900 sm:text-lg md:text-xl lg:text-2xl"
              >
                This is not about learning tools. It&apos;s about{" "}
                <span className="text-blue-600">mastering how cyber defense actually works.</span>
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mx-auto flex h-[230px] w-full max-w-[min(100%,420px)] items-center justify-center overflow-visible sm:h-[300px] sm:overflow-hidden lg:h-[320px] lg:max-w-[450px]"
              >
                <TypingKeyboard
                  autoTypeText="Threat hunting. Incident response. Malware analysis. Detection engineering. Cyber defense operations.       "
                  typingSpeed={[45, 125]}
                  scale={0.54}
                  mobileScale={0.46}
                  className="h-full w-full"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default ProgramPageOpening;
