"use client";

import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import professionalTranscript from "@/assets/img/ProgramPageImage/performacetranscribe.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingSectionSubheadingClass,
} from "@/components/ui/landing-section";

const tableRows = [
  { category: "Lab Simulations & Technical Exercises", weight: "40%", grade: "A+ (92%)", classification: "Distinction" },
  { category: "Module Deliverables (Maps, Reports, Analysis)", weight: "30%", grade: "A (88%)", classification: "Merit" },
  { category: "Integrated Practical Assessment", weight: "30%", grade: "A+ (95%)", classification: "Distinction" },
  { category: "Overall Final Grade", weight: "100%", grade: "A (91%)", classification: "First Class with Distinction", isBold: true },
];

const PerformanceTranscript = () => {
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
            text="Professional Performance Transcript (India Program)"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <LandingBento className="mt-8 border-y border-zinc-200">
          <LandingBentoRow columns={2}>
            <LandingBentoCell className="px-0 md:px-0 md:pr-8">
              <TimelineContent
                as="div"
                animationNum={1}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="space-y-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                <p>
                  To meet the expectations of Indian enterprises, corporates, and institutional employers,
                  CYBERLABS INDIA provides an additional{" "}
                  <span className="font-semibold text-zinc-900">
                    Professional Performance Transcript
                  </span>{" "}
                  alongside the primary certificate.
                </p>
                <p>
                  This transcript offers a granular, skills-based evaluation of learner performance across
                  technical execution, investigative capability, and analytical decision-making—allowing
                  employers to clearly assess real-world readiness beyond course completion.
                </p>
                <p>
                  The transcript{" "}
                  <span className="font-semibold text-zinc-900">complements</span>{" "}
                  the CYBERLABS USA certificate and does not replace or modify it. Together, they give a
                  complete view of both formal completion and operational performance.
                </p>
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center justify-center px-0 md:px-0 md:pl-8">
              <TimelineContent
                as="div"
                animationNum={2}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
              >
                <img
                  src={assetSrc(professionalTranscript)}
                  alt="Industry Recognition"
                  className="mx-auto h-auto w-full max-w-[280px] object-contain sm:max-w-[320px]"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>

          <LandingBentoCell className="border-t border-zinc-200 px-0 md:px-0">
            <TimelineContent
              as="div"
              animationNum={3}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="space-y-4"
            >
              <p className={`${landingSectionSubheadingClass} text-zinc-900`}>
                Illustration of the Graded Performance Framework (India Segment)
              </p>

              <div className="overflow-x-auto border border-zinc-200">
                <table className="w-full border-collapse bg-white text-left text-sm md:text-base">
                  <thead className="border-b border-zinc-200 bg-zinc-50">
                    <tr>
                      <th className="border-r border-zinc-200 px-4 py-3 font-semibold text-zinc-900">
                        Assessment Category
                      </th>
                      <th className="border-r border-zinc-200 px-4 py-3 text-center font-semibold text-zinc-900">
                        Weightage
                      </th>
                      <th className="border-r border-zinc-200 px-4 py-3 text-center font-semibold text-zinc-900">
                        Grade / Score
                      </th>
                      <th className="px-4 py-3 font-semibold text-zinc-900">
                        Classification
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr
                        key={row.category}
                        className={`border-b border-zinc-200 last:border-b-0 ${row.isBold ? "bg-zinc-50 font-semibold" : ""}`}
                      >
                        <td className="border-r border-zinc-200 px-4 py-3 text-zinc-700">
                          {row.category}
                        </td>
                        <td className="border-r border-zinc-200 px-4 py-3 text-center text-zinc-700">
                          {row.weight}
                        </td>
                        <td className="border-r border-zinc-200 px-4 py-3 text-center text-zinc-700">
                          {row.grade}
                        </td>
                        <td className="px-4 py-3 text-zinc-700">
                          {row.classification}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm italic leading-relaxed text-zinc-600 md:text-base">
                <span className="font-semibold text-zinc-900 not-italic">Note: </span>
                Assessment structure and weightage may vary by program, based on curriculum depth and
                role alignment.
              </p>
            </TimelineContent>
          </LandingBentoCell>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default PerformanceTranscript;
