import { useRef } from "react";
import { useParams } from "@/lib/react-router";
import { motion, useInView } from "framer-motion";
import { useCourses } from "@/hooks/useCourses";
import { AnimatedHeading } from "@/components/ui/animated-heading";

const CareerOpertunity = () => {
    const { slug } = useParams();
    const { getCourseCareerChartBySlug } = useCourses();
    const careerChart = getCourseCareerChartBySlug(slug as string);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: false, margin: "-80px" });

    if (!careerChart || careerChart.length === 0) return null;

    return (
        <section className="w-full  text-text-primary py-10 md:py-14">
            <div className="mx-auto px-4 md:px-12 xl:px-25">
                <div ref={headingRef} className="mb-8 md:mb-10">
                    <AnimatedHeading
                        inView={headingInView}
                        lines={[
                            { text: "Career Opportunities & Hiring Landscape", className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-semibold tracking-tight leading-tight", as: "h3" },
                            { text: "for 2026 and beyond.", className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-montserrat font-medium tracking-tight leading-tight", as: "h3", startDelay: 0.12 },
                        ]}
                    />
                    <p className="mt-3 text-sm sm:text-base md:text-lg font-inter-display text-text-primary font-medium max-w-3xl">
                        As organizations move from pure prevention to active investigation and response,
                        demand for cyber investigators and crypto-financial crime specialists is at an
                        all-time high.
                    </p>
                </div>

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
                                <th className="border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-montserrat font-bold text-text-primary w-[24%] md:w-[26%] lg:w-[28%] min-w-26">
                                    Job Role
                                </th>
                                <th className="border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-montserrat font-bold text-text-primary w-[32%] md:w-[34%] lg:w-[34%]">
                                    What You&apos;ll Do
                                </th>
                                <th className="border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-montserrat font-bold text-text-primary w-[44%] md:w-[40%] lg:w-[38%]">
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
                                    transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
                                >
                                    <td className="align-top border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-inter-display font-medium text-text-primary whitespace-normal wrap-break-words">
                                        {row.jobRole}
                                    </td>
                                    <td className="align-top border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-inter-display font-medium text-text-primary whitespace-normal wrap-break-words leading-relaxed">
                                        {row.whatYouDo}
                                    </td>
                                    <td className="align-top border border-neutral-300 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-inter-display font-medium text-text-primary whitespace-normal wrap-break-words leading-relaxed">
                                        {row.exampleEmployers}
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

export default CareerOpertunity;
