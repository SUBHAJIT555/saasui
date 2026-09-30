import { useRef } from "react";
import { useParams } from "@/lib/react-router";
import { motion, useInView } from "framer-motion";
import { useCourses } from "@/hooks/useCourses";
import { AnimatedHeading } from "@/components/ui/animated-heading";

const ModuleChart = () => {
    const { slug } = useParams();
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: false, margin: "-80px" });
    const { getCourseModuleChartBySlug } = useCourses();
    const moduleChart = getCourseModuleChartBySlug(slug as string);

    if (!moduleChart || moduleChart.length === 0) return null;

    // For the full-stack program (id: 3), the table should show:
    // Week(s) | Module | Hours | Key Content Highlights
    const isPhaseBasedProgram =
        slug === "full-stack-cyber-defense-offensive-security";

    const firstColLabel = isPhaseBasedProgram ? "Week(s)" : "Module";
    const secondColLabel = isPhaseBasedProgram ? "Topic/Module" : "Focus Area";
    const thirdColLabel = isPhaseBasedProgram ? "Key Content Highlights" : "Key Content Highlights";

    // Check if hours column should be shown
    const hasHours = moduleChart.some(row => row.hours);

    const descriptionText = isPhaseBasedProgram
        ? "A phase-by-phase breakdown of where you focus and what you learn."
        : "A module-by-module breakdown of where you focus and what you learn.";

    return (
        <section className="w-full  text-text-primary py-10 md:py-14">
            <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-26">
                <div ref={headingRef} className="mb-8 md:mb-10">
                    <AnimatedHeading
                        inView={headingInView}
                        lines={[
                            { text: "Program Structure & Modules", className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-semibold tracking-tight leading-tight", as: "h3" },
                        ]}
                    />
                    <p className="mt-3 text-sm sm:text-base md:text-lg font-inter-display text-neutral-600 max-w-3xl">
                        {descriptionText}
                    </p>
                </div>

                {/* Table container styled like GradePerformance */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-fixed border-collapse border border-neutral-300 bg-white">
                        <thead
                            className="bg-white"
                            style={{
                                background:
                                    "repeating-linear-gradient(135deg, #f9fafb 0px, #f9fafb 1px, transparent 1px, transparent 4px), white",
                            }}
                        >
                            <tr>
                                {/* On mobile, first two columns are narrow, last column wider */}
                                <th className="border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-montserrat font-bold text-text-primary w-[20%] md:w-[16%] lg:w-[14%] min-w-26">
                                    {firstColLabel}
                                </th>
                                <th className="border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-montserrat font-bold text-text-primary w-[20%] md:w-[22%] lg:w-[24%]">
                                    {secondColLabel}
                                </th>
                                {hasHours && (
                                    <th className="border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-montserrat font-bold text-text-primary w-[12%] md:w-[12%] lg:w-[10%]">
                                        Hours
                                    </th>
                                )}
                                <th className="border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-montserrat font-bold text-text-primary w-[53%] md:w-[54%] lg:w-[56%]">
                                    {thirdColLabel}
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
                                    transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
                                >
                                    <td className="align-top border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-inter-display font-medium text-text-primary whitespace-normal wrap-break-words">
                                        {row.module}
                                    </td>
                                    <td className="align-top border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-inter-display font-medium text-text-primary whitespace-normal wrap-break-words">
                                        {row.focusArea}
                                    </td>
                                    {hasHours && (
                                        <td className="align-top border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-inter-display font-medium text-text-primary whitespace-nowrap">
                                            {row.hours || "-"}
                                        </td>
                                    )}
                                    <td className="align-top border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-inter-display font-medium text-text-primary leading-relaxed whitespace-normal wrap-break-words">
                                        {row.whatYouLearn}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ModuleChart;