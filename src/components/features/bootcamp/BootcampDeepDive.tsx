"use client";

import { useRef } from "react";
import { usePageDetail } from "@/hooks/useProgramDetail";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingSectionSubheadingClass,
} from "@/components/ui/landing-section";
import { crosshatchBgStyle } from "@/config/constants/bootcampStyles";
import { stripLeadingNumber } from "@/lib/utils";

const BootcampDeepDive = () => {
  const detail = usePageDetail();
  const deepDive = detail?.deepDive;
  const timelineRef = useRef<HTMLDivElement>(null);

  if (!deepDive) return null;

  const accordionItems = deepDive.sections.map((section) => ({
    question: section.title,
    answer: (
      <div className="space-y-4 sm:space-y-6">
        {section.paragraphs?.map((paragraph, paraIdx) => (
          <p
            key={paraIdx}
            className="text-sm leading-relaxed whitespace-pre-line text-zinc-700 md:text-base lg:text-lg"
          >
            {paragraph}
          </p>
        ))}
        {section.points && section.points.length > 0 && (
          <ul className="list-none space-y-2 sm:space-y-3 md:space-y-4">
            {section.points.map((point, pointIdx) => (
              <li key={pointIdx} className="flex items-start gap-2 sm:gap-3">
                <span className="mt-1 shrink-0 text-xs text-blue-600 sm:text-sm">•</span>
                <span className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}
        {section.closingParagraphs?.map((paragraph, paraIdx) => (
          <p
            key={`closing-${paraIdx}`}
            className="text-sm leading-relaxed whitespace-pre-line text-zinc-700 md:text-base lg:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
    ),
  }));

  return (
    <LandingSectionShell id="bootcamp-deep-dive">
      <div ref={timelineRef}>
        <TimelineContent
          as="h3"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text={stripLeadingNumber(deepDive.title)}
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <LandingBento className="mt-8 border-y border-zinc-200">
          <LandingBentoCell className="px-0 md:px-0">
            <TimelineContent
              as="div"
              animationNum={1}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="relative overflow-hidden  bg-white"
            >
              <div className="pointer-events-none absolute inset-0 z-0" style={crosshatchBgStyle} />
              <div className="relative z-10 p-4 sm:p-5 md:p-6">
                <h4 className={`mb-6 flex items-center gap-2 sm:mb-8 ${landingSectionSubheadingClass} text-zinc-900`}>
                  <div className="rounded-md border border-zinc-200 bg-white p-2 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-blue-600"
                      aria-hidden
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </div>
                  {deepDive.subtitle}
                </h4>

                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {deepDive.introParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm font-medium leading-relaxed text-zinc-700 md:text-base lg:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </TimelineContent>
          </LandingBentoCell>

          <LandingBentoCell className="border-t border-zinc-200 px-0 md:px-0">
            <TimelineContent
              as="div"
              animationNum={2}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
            >
              <FaqAccordion
                items={accordionItems}
                defaultOpenIndex={0}
                className="max-w-none"
                answerClassName="text-zinc-700"
              />
            </TimelineContent>
          </LandingBentoCell>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default BootcampDeepDive;
