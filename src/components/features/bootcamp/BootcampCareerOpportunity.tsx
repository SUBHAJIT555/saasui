"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { usePageDetail } from "@/hooks/useProgramDetail";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const BootcampCareerOpportunity = () => {
  const detail = usePageDetail();
  const careerChart = detail?.careerChart;
  const timelineRef = useRef<HTMLDivElement>(null);

  if (!careerChart || careerChart.length === 0) return null;

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent
          as="h3"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className={landingSectionHeadingClass}
        >
          <ShinyText
            text="Career Opportunities & Hiring Landscape"
            className="inline"
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />{" "}
          <span className="text-blue-600">(2026+)</span>
        </TimelineContent>

        {detail?.careerIntro && (
          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-3 max-w-3xl text-sm font-medium text-zinc-700 md:text-base lg:text-lg"
          >
            {detail.careerIntro}
          </TimelineContent>
        )}

        <LandingBento className="mt-8 border-y border-zinc-200">
          <LandingBentoCell className="px-0 md:px-0">
            <TimelineContent
              as="div"
              animationNum={2}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
            >
              <div className="overflow-x-auto border border-zinc-200">
                <table className="w-full min-w-[640px] table-fixed border-collapse bg-white text-left text-sm md:text-base">
                  <thead className="border-b border-zinc-200 bg-zinc-50">
                    <tr>
                      <th className="w-[24%] min-w-26 border-r border-zinc-200 px-3 py-3 font-semibold text-zinc-900 sm:px-4 md:w-[26%] lg:w-[28%]">
                        Job Role
                      </th>
                      <th className="w-[32%] border-r border-zinc-200 px-3 py-3 font-semibold text-zinc-900 sm:px-4 md:w-[34%] lg:w-[34%]">
                        What You&apos;ll Do
                      </th>
                      <th className="w-[44%] px-3 py-3 font-semibold text-zinc-900 sm:px-4 md:w-[40%] lg:w-[38%]">
                        Example Employers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {careerChart.map((row, index) => (
                      <motion.tr
                        key={row.jobRole}
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                          duration: 0.45,
                          ease: "easeOut",
                          delay: index * 0.06,
                        }}
                        className="border-b border-zinc-200 last:border-b-0"
                      >
                        <td className="wrap-break-words border-r border-zinc-200 px-3 py-3 align-top font-medium whitespace-normal text-zinc-700 sm:px-4">
                          {row.jobRole}
                        </td>
                        <td className="wrap-break-words border-r border-zinc-200 px-3 py-3 align-top font-medium leading-relaxed whitespace-normal text-zinc-700 sm:px-4">
                          {row.whatYouDo}
                        </td>
                        <td className="wrap-break-words px-3 py-3 align-top font-medium leading-relaxed whitespace-normal text-zinc-700 sm:px-4">
                          {row.exampleEmployers}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TimelineContent>
          </LandingBentoCell>

          {detail?.careerClosing && (
            <LandingBentoCell className="border-t border-zinc-200 px-0 md:px-0">
              <TimelineContent
                as="p"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="max-w-4xl text-sm font-medium leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                {detail.careerClosing}
              </TimelineContent>
            </LandingBentoCell>
          )}
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default BootcampCareerOpportunity;
