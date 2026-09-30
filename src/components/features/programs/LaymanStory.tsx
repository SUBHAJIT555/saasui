import { assetSrc, stripLeadingNumber } from "@/lib/utils";
import { useRef } from "react";
import { useParams } from "@/lib/react-router";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

import { useCourses } from "@/hooks/useCourses";
import laymansStoryImage from "@/assets/img/ProgramPageImage/LaymansStory.svg";
// import { FallingPattern } from "@/components/ui/falling-pattern";

// Helper function to highlight the last word(s) in the heading
const getHighlightedHeading = (heading: string) => {
    const text = stripLeadingNumber(heading);
    const words = text.split(" ");
    if (words.length <= 1) {
        return <span className="text-text-primary">{text}</span>;
    }
    // Highlight the last word
    const lastWord = words[words.length - 1];
    const restOfHeading = words.slice(0, words.length - 1).join(" ");

    return (
        <>
            <span className="text-text-primary">{restOfHeading}</span>{" "}
            <span className="text-primary">{lastWord}</span>
        </>
    );
};

const LaymanStory = () => {
    const { slug } = useParams();
    const { getCourses } = useCourses();

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const course = getCourses().find((c) => c.slug === slug);
    const layman = course?.laymanExplanation;

    if (!layman) return null;

    return (
        <motion.section
            ref={containerRef}
            className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-8 md:py-10 overflow-hidden"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* Grid Layout: Content left, Image right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                {/* Left: Content */}
                <motion.div
                    variants={itemVariants}
                    className="relative z-10 order-2 lg:order-1"
                >
                    {/* Clean, simple container */}
                    <div className="relative">
                        {/* Title */}
                        <motion.h3
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold tracking-tight leading-tight mb-4 sm:mb-6 md:mb-8 text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        >
                            {getHighlightedHeading(layman.heading)}
                        </motion.h3>
                        <div className="botder-t border border-neutral-300  my-4"></div>

                        {/* Story lines */}
                        <div className="space-y-5 sm:space-y-6 md:space-y-7">
                            {layman.lines.map((line, index) => (
                                <motion.p
                                    key={index}
                                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-inter-display font-semibold text-text-primary leading-relaxed text-left bg-background/30 backdrop-blur-sm w-fit"
                                    style={{
                                        textShadow: "0 1px 8px rgba(255,255,255,0.92), 0 0px 2px #fff",
                                    }}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={
                                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                                    }
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.3 + index * 0.1,
                                        ease: "easeOut",
                                    }}
                                >
                                    {line}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right: Sticky Image */}
                <motion.div
                    variants={itemVariants}
                    className="lg:sticky lg:top-24 order-1 lg:order-2 relative flex items-center justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                    <div className="flex items-center justify-center">
                        <img
                            src={assetSrc(laymansStoryImage)}
                            alt="Layman's Story"
                            className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px] h-auto"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default LaymanStory;