"use client";

import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import contactClosingSvg from "@/assets/img/Learning-Enviorment/contactclosing.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  landingRevealVariants,
} from "@/components/ui/landing-section";

const HowReachUs = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento className="border-y border-zinc-200">
          <LandingBentoRow>
            <LandingBentoCell className="flex items-center justify-center">
              <TimelineContent
                as="div"
                animationNum={0}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
              >
                <img
                  src={assetSrc(contactClosingSvg)}
                  alt=""
                  className="mx-auto h-auto w-full max-w-[200px] sm:max-w-[260px] md:max-w-[280px] lg:max-w-[320px]"
                />
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex flex-col justify-center">
              <TimelineContent
                as="div"
                animationNum={1}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
              >
                <h2 className="text-pretty">
                  <ShinyText
                    text="Cybersecurity is global."
                    className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl"
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </h2>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={2}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 sm:mt-5"
              >
                <p className="text-2xl font-bold leading-tight text-blue-600 sm:text-3xl md:text-4xl lg:text-5xl">
                  Your training should be too.
                </p>
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default HowReachUs;
