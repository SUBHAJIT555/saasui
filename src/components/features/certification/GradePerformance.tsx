import { useRef } from "react";
import { motion } from "framer-motion";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const TABLE_ROWS = [
  { category: "Lab Simulations & Technical Exercises", weight: "40%", focus: "Hands-on execution and technical accuracy", bold: false },
  { category: "Module Deliverables (Reports & Analysis)", weight: "30%", focus: "Investigation quality and reasoning", bold: false },
  { category: "Integrated Practical Assessment", weight: "30%", focus: "End-to-end operational capability", bold: false },
  { category: "Overall Evaluation", weight: "100%", focus: "Professional readiness", bold: true },
];

const GradePerformance = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          <div className="py-6 md:py-8">
            <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
              <ShinyText
                text="Graded Performance Framework (Indicative)"
                className={landingSectionHeadingClass}
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
            </TimelineContent>
          </div>

          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="w-full overflow-x-auto border border-zinc-200"
          >
            <table className="w-full min-w-[640px] border-collapse bg-white">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="border-b border-zinc-200 px-4 py-4 text-left text-sm font-semibold text-zinc-900 sm:px-5 sm:text-base md:px-6">
                    Assessment Category
                  </th>
                  <th className="border-b border-l border-zinc-200 px-4 py-4 text-center text-sm font-semibold text-zinc-900 sm:px-5 sm:text-base md:px-6">
                    Weightage
                  </th>
                  <th className="border-b border-l border-zinc-200 px-4 py-4 text-left text-sm font-semibold text-zinc-900 sm:px-5 sm:text-base md:px-6">
                    Evaluation Focus
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <motion.tr
                    key={row.category}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}
                  >
                    <td className={`border-b border-zinc-200 px-4 py-4 text-sm text-zinc-700 sm:px-5 sm:text-base md:px-6 ${row.bold ? "font-semibold text-zinc-900" : "font-medium"}`}>
                      {row.category}
                    </td>
                    <td className={`border-b border-l border-zinc-200 px-4 py-4 text-center text-sm text-zinc-700 sm:px-5 sm:text-base md:px-6 ${row.bold ? "font-semibold text-zinc-900" : "font-medium"}`}>
                      {row.weight}
                    </td>
                    <td className={`border-b border-l border-zinc-200 px-4 py-4 text-sm text-zinc-700 sm:px-5 sm:text-base md:px-6 ${row.bold ? "font-semibold text-zinc-900" : "font-medium"}`}>
                      {row.focus}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="border-t border-zinc-200 py-6 md:py-8"
          >
            <p className="text-base leading-relaxed text-zinc-700 sm:text-lg">
              <span className="font-semibold text-zinc-900">Performance classifications may include:</span>{" "}
              <span className="underline decoration-dotted decoration-blue-600 underline-offset-4">Distinction</span> <span className="text-blue-600">|</span> <span className="underline decoration-dotted decoration-blue-600 underline-offset-4">Merit</span> <span className="text-blue-600">|</span> <span className="underline decoration-dotted decoration-blue-600 underline-offset-4">First Class</span>
            </p>
       
            <p className="mt-3 text-sm text-zinc-600 sm:text-base leading-none">
              Assessment structure and weightage may vary by program, based on curriculum depth and role alignment.
            </p>
          </TimelineContent>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default GradePerformance;
