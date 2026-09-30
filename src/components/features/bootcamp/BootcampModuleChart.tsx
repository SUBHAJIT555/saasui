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

const BootcampModuleChart = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const detail = usePageDetail();
  const moduleChart = detail?.moduleChart;

  if (!moduleChart || moduleChart.length === 0) return null;

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent
          as="h3"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text="Program Structure & Modules"
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
            >
              <div className="overflow-x-auto border border-zinc-200">
                <table className="w-full min-w-[640px] table-fixed border-collapse bg-white text-left text-sm md:text-base">
                  <thead className="border-b border-zinc-200 bg-zinc-50">
                    <tr>
                      <th className="w-[20%] min-w-26 border-r border-zinc-200 px-3 py-3 font-semibold text-zinc-900 sm:px-4 md:w-[16%] lg:w-[14%]">
                        Module
                      </th>
                      <th className="w-[26%] border-r border-zinc-200 px-3 py-3 font-semibold text-zinc-900 sm:px-4 md:w-[28%] lg:w-[30%]">
                        Focus Area
                      </th>
                      <th className="w-[54%] px-3 py-3 font-semibold text-zinc-900 sm:px-4 md:w-[56%] lg:w-[56%]">
                        What You Learn
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {moduleChart.map((row, index) => (
                      <motion.tr
                        key={row.module + row.focusArea}
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
                          {row.module}
                        </td>
                        <td className="wrap-break-words border-r border-zinc-200 px-3 py-3 align-top font-medium whitespace-normal text-zinc-700 sm:px-4">
                          {row.focusArea}
                        </td>
                        <td className="wrap-break-words px-3 py-3 align-top font-medium leading-relaxed whitespace-normal text-zinc-700 sm:px-4">
                          {row.whatYouLearn}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TimelineContent>
          </LandingBentoCell>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default BootcampModuleChart;
