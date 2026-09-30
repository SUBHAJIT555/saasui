"use client";

import { assetSrc, stripLeadingNumber } from "@/lib/utils";
import { useRef } from "react";
import { usePageDetail } from "@/hooks/useProgramDetail";
import laymansStoryImage from "@/assets/img/ProgramPageImage/LaymansStory.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const BootcampLaymanStory = () => {
  const layman = usePageDetail()?.laymanExplanation;
  const timelineRef = useRef<HTMLDivElement>(null);

  if (!layman) return null;

  const heading = stripLeadingNumber(layman.heading);
  const words = heading.split(" ");
  const lastWord = words.length > 1 ? words[words.length - 1] : "";
  const restOfHeading = words.length > 1 ? words.slice(0, words.length - 1).join(" ") : heading;

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento className="border-y border-zinc-200">
          <LandingBentoRow columns={2}>
            <LandingBentoCell className="order-2 px-0 md:order-1 md:px-0 md:pr-8">
              <TimelineContent
                as="h3"
                animationNum={0}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className={landingSectionHeadingClass}
              >
                {words.length <= 1 ? (
                  <ShinyText
                    text={heading}
                    className="inline"
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                ) : (
                  <>
                    <span className="text-zinc-800">{restOfHeading}</span>{" "}
                    <span className="text-blue-600">{lastWord}</span>
                  </>
                )}
              </TimelineContent>

              <div className="my-4 border-t border-zinc-200" />

              <TimelineContent
                as="div"
                animationNum={1}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="space-y-5 sm:space-y-6 md:space-y-7"
              >
                {layman.lines.map((line, index) => (
                  <p
                    key={index}
                    className="text-sm font-medium leading-relaxed text-zinc-700 md:text-base lg:text-lg"
                  >
                    {line}
                  </p>
                ))}
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="order-1 flex items-center justify-center px-0 md:order-2 md:px-0 md:pl-8">
              <TimelineContent
                as="div"
                animationNum={2}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
              >
                <img
                  src={assetSrc(laymansStoryImage)}
                  alt="Layman's explanation illustration"
                  className="mx-auto h-auto w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px]"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default BootcampLaymanStory;
