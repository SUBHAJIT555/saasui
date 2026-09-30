import { useRef, ReactNode } from "react";
import { useParams } from "@/lib/react-router";
import { motion, useInView } from "framer-motion";
import { useCourses } from "@/hooks/useCourses";

const dashedGridStyle = {
    backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
    `,
    backgroundSize: "1px 1px",
    backgroundPosition: "0 0, 0 0",
    maskImage: `
        repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
        radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 80%)
    `,
    WebkitMaskImage: `
        repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
        radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 80%)
    `,
    maskComposite: "intersect" as const,
    WebkitMaskComposite: "source-in" as const,
};

const ProgramDeepDive = () => {
    const { slug } = useParams();
    const { getCourseProgramDeepDiveBySlug } = useCourses();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const programDeepDive = getCourseProgramDeepDiveBySlug(slug as string);

    if (!programDeepDive) return null;

    const { subtitle, paragraphs } = programDeepDive;

    // Helper function to parse formatted text (bold **, italic *, arrows →)
    const parseFormattedText = (text: string) => {
        const elements: (string | ReactNode)[] = [];
        let key = 0;
        let remaining = text;

        // Process text character by character to handle nested formatting
        while (remaining.length > 0) {
            // Check for bold (**text**)
            const boldMatch = remaining.match(/^\*\*(.*?)\*\*/);
            if (boldMatch) {
                elements.push(
                    <strong key={key++} className="font-semibold text-text-primary">
                        {boldMatch[1]}
                    </strong>
                );
                remaining = remaining.slice(boldMatch[0].length);
                continue;
            }

            // Check for italic (*text*) - but not if it's part of **
            const italicMatch = remaining.match(/^\*([^*]+?)\*/);
            if (italicMatch) {
                elements.push(
                    <em key={key++} className="italic text-text-primary">
                        {italicMatch[1]}
                    </em>
                );
                remaining = remaining.slice(italicMatch[0].length);
                continue;
            }

            // Check for arrow (→)
            if (remaining.startsWith("→")) {
                elements.push(
                    <span key={key++} className="mx-2 text-primary">
                        →
                    </span>
                );
                remaining = remaining.slice(1);
                continue;
            }

            // Take one character as plain text
            const nextBold = remaining.indexOf("**");
            const nextItalic = remaining.indexOf("*");
            const nextArrow = remaining.indexOf("→");

            const nextSpecial = Math.min(
                nextBold >= 0 ? nextBold : Infinity,
                nextItalic >= 0 ? nextItalic : Infinity,
                nextArrow >= 0 ? nextArrow : Infinity
            );

            if (nextSpecial === Infinity) {
                // No more special characters, add rest as plain text
                if (remaining) elements.push(remaining);
                break;
            } else {
                // Add text up to next special character
                if (nextSpecial > 0) {
                    elements.push(remaining.slice(0, nextSpecial));
                }
                remaining = remaining.slice(nextSpecial);
            }
        }

        return elements;
    };

    return (
        <section
            ref={containerRef}
            className="w-full bg-background text-text-primary mb-6 md:mb-10"
        >
            {/* Bordered Content Container */}
            <motion.div
                className="relative border border-neutral-200 ring ring-neutral-200 ring-offset-4 md:ring-offset-8 rounded-xl w-full overflow-hidden bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="absolute inset-0 z-0 pointer-events-none" style={dashedGridStyle} />
                {/* Content Padding */}
                <div className="relative z-10 p-3 sm:p-4 md:p-4 lg:p-5">
                    {/* Main Title */}
                    {/* <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl text-text-primary font-montserrat font-semibold tracking-tight leading-tight mb-3 sm:mb-4 md:mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    >
                        {title}
                    </motion.h2> */}

                    {/* Subtitle */}
                    <motion.h3
                        className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-primary font-inter-display font-bold tracking-tight leading-tight mb-6 sm:mb-8 md:mb-10"
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >  <div className="bg-background shadow-sm rounded-md p-2">
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary shrink-0"
                            >
                                <motion.path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                />
                                <motion.path
                                    d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"
                                    initial={{ pathLength: 0 }}
                                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.5,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                    }}
                                />
                                <motion.path
                                    d="M12 7v5l3 3"
                                    initial={{ pathLength: 0 }}
                                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                    }}
                                />
                            </motion.svg>
                        </div>

                        {subtitle}
                    </motion.h3>

                    {/* Paragraphs */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        {paragraphs.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary font-medium leading-relaxed"
                                initial={{ opacity: 0, y: 15 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: 0.3 + index * 0.1,
                                }}
                            >
                                {parseFormattedText(paragraph)}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ProgramDeepDive;
