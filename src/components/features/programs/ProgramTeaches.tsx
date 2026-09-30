import { useRef } from "react";
import { useParams } from "@/lib/react-router";
import { motion, useInView, type Variants } from "framer-motion";
import { useCourses } from "@/hooks/useCourses";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedList } from "@/components/ui/animated-list";
import type { AnimatedListItem } from "@/components/ui/animated-list";

const dashedCenterFadeGridStyle = {
    backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
    `,
    backgroundSize: "10px 10px",
    backgroundPosition: "0 0, 0 0",
    maskImage: `
        repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
        radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
    `,
    WebkitMaskImage: `
        repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
        radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
    `,
    maskComposite: "intersect" as const,
    WebkitMaskComposite: "source-in" as const,
};

const ProgramTeaches = () => {
    const { slug } = useParams();
    const { getCourseProgramTeachesBySlug } = useCourses();
    const containerRef = useRef(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, margin: "-100px" });
    const headingInView = useInView(headingRef, { once: false, margin: "-100px" });

    const programTeaches = getCourseProgramTeachesBySlug(slug as string);

    if (!programTeaches) return null;

    const { whatYouLearn, whatYouLearnNote, readinessIntro, readinessSubheading, readinessPoints, closingStatement } = programTeaches;

    // Animated SVG Icon Components
    const AnimatedBookIcon = ({ isInView }: { isInView: boolean }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    const AnimatedBriefcaseIcon = ({ isInView }: { isInView: boolean }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M12 12l0 .01"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 1.3, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M3 13a20 20 0 0 0 18 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.6, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="w-full text-text-primary py-6 md:py-10"
        >
            <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-25">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 md:space-y-12"
                >
                    {/* Main Heading */}
                    <div ref={headingRef} className="mb-2">
                        <AnimatedHeading
                            inView={headingInView}
                            lines={[
                                { text: "What the Program Teaches You &", className: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary font-montserrat font-semibold tracking-tight leading-tight", as: "h2" },
                                { text: "Your Career Readiness", className: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-montserrat font-semibold tracking-tight leading-tight", as: "h2", startDelay: 0.15 },
                            ]}
                        />
                    </div>

                    {/* Grid Layout */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-36 py-6 md:py-10"
                    >
                        {/* Left Card: What You Learn */}
                        <motion.div variants={itemVariants}>
                            <Card className="relative h-full border border-neutral-200 ring ring-neutral-200 ring-offset-4 md:ring-offset-8 rounded-xl bg-white overflow-hidden">
                                <div className="absolute inset-0 z-0 pointer-events-none" style={dashedCenterFadeGridStyle} />
                                <CardHeader className="relative z-10 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-background/5 backdrop-blur-sm p-2 rounded rotate-10 shadow-md shadow-black/20"><AnimatedBookIcon isInView={isInView} /></span>

                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-montserrat font-semibold tracking-tight text-text-primary bg-white ">
                                            What You Learn
                                        </h3>
                                    </div>
                                    <AnimatedList
                                        items={whatYouLearn.map((item): AnimatedListItem => ({
                                            text: item,
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                                                >
                                                    <path d="M9 12l2 2l4 -4" />
                                                </svg>
                                            ),
                                        }))}
                                        viewportOnce={false}
                                        boldText={false}
                                        containerClassName="space-y-3 sm:space-y-4"
                                        itemClassName="flex items-start gap-2 sm:gap-3"
                                        contentClassName="text-sm sm:text-base md:text-lg font-inter-display font-medium text-text-primary leading-relaxed"
                                        iconClassName="mt-0.5 shrink-0 text-blue-600"
                                    />
                                </CardHeader>
                                {whatYouLearnNote && (
                                    <CardContent className="relative z-10 p-6 md:p-8 pt-0 -mt-2 sm:-mt-3">
                                        <motion.p
                                            className="text-sm sm:text-base md:text-lg font-inter-display font-semibold text-text-primary leading-relaxed italic"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={
                                                isInView
                                                    ? { opacity: 1, y: 0 }
                                                    : { opacity: 0, y: 10 }
                                            }
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.5,
                                                ease: "easeOut",
                                            }}
                                        >
                                            {whatYouLearnNote}
                                        </motion.p>
                                    </CardContent>
                                )}
                            </Card>
                        </motion.div>

                        {/* Right Card: Your Readiness After Completion */}
                        <motion.div variants={itemVariants}>
                            <Card className="relative h-full border border-neutral-200 ring ring-neutral-200 ring-offset-4 md:ring-offset-8 rounded-xl bg-white overflow-hidden">
                                <div className="absolute inset-0 z-0 pointer-events-none" style={dashedCenterFadeGridStyle} />
                                <CardHeader className="relative z-10 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-background/20 backdrop-blur-sm p-2 rounded rotate-10 shadow-md shadow-black/20"><AnimatedBriefcaseIcon isInView={isInView} /></span>
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-montserrat font-semibold tracking-tight text-text-primary">
                                            Your Readiness After Completion
                                        </h3>
                                    </div>
                                    <p className="text-sm sm:text-base md:text-lg font-inter-display font-medium text-text-primary leading-relaxed mb-4">
                                        {readinessIntro}
                                    </p>
                                    <p className="text-base sm:text-lg md:text-xl font-inter-display font-semibold text-text-primary mb-4">
                                        {readinessSubheading}
                                    </p>
                                    <AnimatedList
                                        items={readinessPoints.map((point, index): AnimatedListItem => ({
                                            text: point,
                                            icon: <span className="text-primary font-semibold text-sm sm:text-base tabular-nums">{index + 1}.</span>,
                                        }))}
                                        viewportOnce={false}
                                        boldText={false}
                                        containerClassName="space-y-3 sm:space-y-4"
                                        itemClassName="flex items-start gap-2 sm:gap-3"
                                        contentClassName="text-sm sm:text-base md:text-lg font-inter-display font-medium text-text-primary leading-relaxed"
                                        iconClassName="shrink-0 pt-0.5 text-blue-600"
                                    />
                                </CardHeader>
                                <CardContent className="relative z-10 p-6 md:p-8 pt-0">
                                    <motion.p
                                        className="text-sm sm:text-base md:text-lg font-inter-display font-semibold text-text-primary leading-relaxed pt-4 border-t border-neutral-300 "
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={
                                            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                                        }
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.6,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {closingStatement}
                                    </motion.p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProgramTeaches;
