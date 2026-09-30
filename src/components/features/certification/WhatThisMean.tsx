import { assetSrc, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { AnimatedList } from "@/components/ui/animated-list";
import type { AnimatedListItem } from "@/components/ui/animated-list";
import employeemeanSvg from "@/assets/img/Official certification/employeemean.svg";
import learnermeanSvg from "@/assets/img/Official certification/learnermean.svg";
import intrigitySvg from "@/assets/img/Official certification/intrigity.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingGoalBanner,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingListRowHoverClass,
  landingListTextHoverClass,
} from "@/components/ui/landing-section";

function MergedBentoBlock({ children }: { children: ReactNode }) {
  return <div className="max-md:divide-y max-md:divide-zinc-200">{children}</div>;
}

function SectionImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <img
      src={assetSrc(src)}
      alt={alt}
      className="mx-auto h-auto w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px]"
    />
  );
}

const WhatThisMean = () => {
    const timelineRef = useRef<HTMLDivElement>(null);

    // Animated SVG Icon Components (always visible)
    const AnimatedNetworkIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M6 9h12"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M3 20h7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M14 20h7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.7, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M12 15v3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.3, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    // Icon 2: Analyze - Conduct structured investigations and technical analysis
    const AnimatedAnalyzeIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M20 11a8.1 8.1 0 0 0 -6.986 -6.918a8.095 8.095 0 0 0 -8.019 3.918"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M4 13a8.1 8.1 0 0 0 15 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M18 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M4 8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.3, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    // Icon 3: Checklist - Execute tasks under formal assessment conditions
    const AnimatedChecklistIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M14 19l2 2l4 -4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M9 8h4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M9 12h2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    // Icon 4: File Text Shield - Produce professional-grade reports and documentation
    const AnimatedFileTextShieldIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M13 3v4a.997 .997 0 0 0 1 1h4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M11 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v3.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M8 9h1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M8 12.994l3 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.3, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M8 16.997l2 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.6, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M21 15.994c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.9, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    // Icon 5: Briefcase - Demonstrate judgment aligned with real cybersecurity roles
    const AnimatedBriefcaseIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M12 12l0 .01"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.3, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M3 13a20 20 0 0 0 18 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    // Icon 6: Shield Check - Verified, assessed cybersecurity capability
    const AnimatedShieldCheckIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M15 19l2 2l4 -4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    // Icon 7: Chart Bubble - Clear performance differentiation
    const AnimatedChartBubbleIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M3 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M14 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M10 7.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    // Icon 8: User Shield - Confidence entering professional cyber roles
    const AnimatedUserShieldIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M6 21v-2a4 4 0 0 1 4 -4h2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    // Icon 9: File Certificate - Credentials backed by real evaluation, not attendance
    const AnimatedFileCertificateIcon = () => (
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
            className="h-5 w-5 shrink-0 text-blue-600"
        >
            <motion.path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M14 3v4a1 1 0 0 0 1 1h4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M3 14a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    const employersListItems: AnimatedListItem[] = [
        { text: "Operate inside realistic cyber environments", icon: <AnimatedNetworkIcon /> },
        { text: "Conduct structured investigations and technical analysis", icon: <AnimatedAnalyzeIcon /> },
        { text: "Execute tasks under formal assessment conditions", icon: <AnimatedChecklistIcon /> },
        { text: "Produce professional-grade reports and documentation", icon: <AnimatedFileTextShieldIcon /> },
        { text: "Demonstrate judgment aligned with real cybersecurity roles", icon: <AnimatedBriefcaseIcon /> },
    ];

    const learnersListItems: AnimatedListItem[] = [
        { text: "Verified, assessed cybersecurity capability", icon: <AnimatedShieldCheckIcon /> },
        { text: "Clear performance differentiation", icon: <AnimatedChartBubbleIcon /> },
        { text: "Confidence entering professional cyber roles", icon: <AnimatedUserShieldIcon /> },
        { text: "Credentials backed by real evaluation, not attendance", icon: <AnimatedFileCertificateIcon /> },
    ];

    const listProps = {
        viewportOnce: false as const,
        viewportAmount: 0.5,
        duration: 0.6,
        staggerDelay: 0.1,
        xOffset: 50,
        iconClassName: "mt-0.5 shrink-0 flex items-center pt-0.5 text-blue-600",
        boldText: false,
    };

    const employersBody = (
        <>
            <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-zinc-900 md:text-base lg:text-lg">
                CYBERLABS-certified professionals are comprehensively evaluated on their ability to:
            </TimelineContent>
            <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
                <AnimatedList
                    items={employersListItems}
                    {...listProps}
                    containerClassName="border-y border-zinc-200"
                    contentClassName={cn("text-sm text-zinc-700 md:text-base leading-relaxed", landingListTextHoverClass)}
                    itemClassName={cn("flex items-start gap-3 border-b border-zinc-200 py-4 last:border-b-0", landingListRowHoverClass)}
                />
            </TimelineContent>
            <TimelineContent as="p" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 border-t border-zinc-200 pt-5 text-sm text-zinc-700 md:text-base">
                For employers, this provides transparent, skills-based validation, not just certificate issuance.
            </TimelineContent>
        </>
    );

    const learnersBody = (
        <>
            <TimelineContent as="p" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm text-zinc-700 md:text-base font-semibold">
                For learners, certification represents:
            </TimelineContent>
            <TimelineContent as="div" animationNum={6} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
                <AnimatedList
                    items={learnersListItems}
                    {...listProps}
                    containerClassName="border-y border-zinc-200"
                    contentClassName={cn("text-sm text-zinc-700 md:text-base leading-relaxed", landingListTextHoverClass)}
                    itemClassName={cn("flex items-start gap-3 border-b border-zinc-200 py-4 last:border-b-0", landingListRowHoverClass)}
                />
            </TimelineContent>
            <TimelineContent as="p" animationNum={7} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 border-t border-zinc-200 pt-5 text-sm text-zinc-700 md:text-base">
                This framework supports <span className="font-semibold text-blue-600">long-term career credibility</span>, not short-term certification goals.
            </TimelineContent>
        </>
    );

    const integrityBody = (
        <>
            <TimelineContent as="p" animationNum={9} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-medium text-blue-600 md:text-base">
                CYBERLABS does not issue certificates for mere participation.
            </TimelineContent>
            <TimelineContent as="p" animationNum={10} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm text-zinc-700 md:text-base">
                Certification is awarded <span className="font-semibold text-zinc-900 underline decoration-dotted decoration-blue-600 underline-offset-4">only upon successful completion of assessments and practical</span> requirements, ensuring fairness, credibility, and trust for learners, employers, and institutions alike.
            </TimelineContent>
        </>
    );

    return (
        <LandingSectionShell>
            <div ref={timelineRef}>
                <LandingBento>
                    <MergedBentoBlock>
                        <LandingBentoRow>
                            <LandingBentoCell className="order-2 md:order-1 md:px-0 md:pr-8">
                                <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                                    <ShinyText text="What This Means for Employers" className={landingSectionHeadingClass} color="#3f3f46" shineColor="#18181b" speed={3} spread={120} />
                                </TimelineContent>
                                <div className="hidden md:block">{employersBody}</div>
                            </LandingBentoCell>
                            <LandingBentoCell className="order-1 flex items-center justify-center md:order-2 md:px-0 md:pl-8">
                                <SectionImage src={employeemeanSvg} />
                            </LandingBentoCell>
                        </LandingBentoRow>
                        <div className="px-0 py-6 md:hidden">{employersBody}</div>
                    </MergedBentoBlock>

                    <MergedBentoBlock>
                        <LandingBentoRow>
                            <LandingBentoCell className="order-1 flex items-center justify-center md:px-0 md:pr-8">
                                <SectionImage src={learnermeanSvg} />
                            </LandingBentoCell>
                            <LandingBentoCell className="order-2 md:px-0 md:pl-8">
                                <TimelineContent as="h2" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                                    <ShinyText text="What This Means for Learners" className={landingSectionHeadingClass} color="#3f3f46" shineColor="#18181b" speed={3} spread={120} />
                                </TimelineContent>
                                <div className="hidden md:block">{learnersBody}</div>
                            </LandingBentoCell>
                        </LandingBentoRow>
                        <div className="px-0 py-6 md:hidden">{learnersBody}</div>
                    </MergedBentoBlock>

                    <MergedBentoBlock>
                        <LandingBentoRow>
                            <LandingBentoCell className="order-2 md:order-1 md:px-0 md:pr-8">
                                <TimelineContent as="h2" animationNum={8} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                                    <ShinyText text="Integrity, Transparency & Standards" className={landingSectionHeadingClass} color="#3f3f46" shineColor="#18181b" speed={3} spread={120} />
                                </TimelineContent>
                                <div className="hidden md:block">{integrityBody}</div>
                            </LandingBentoCell>
                            <LandingBentoCell className="order-1 flex items-center justify-center md:order-2 md:px-0 md:pl-8">
                                <SectionImage src={intrigitySvg} />
                            </LandingBentoCell>
                        </LandingBentoRow>
                        <div className="px-0 py-6 md:hidden">{integrityBody}</div>
                    </MergedBentoBlock>

                    <LandingGoalBanner
                        title={
                            <div className="mx-auto max-w-3xl space-y-5">
                                <p className="text-lg font-bold leading-relaxed text-zinc-700 md:text-2xl lg:text-3xl">
                                    &ldquo;In cybersecurity, trust is earned through evidence.&rdquo;
                                </p>
                           
                                <p className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                                    CYBERLABS certification and evaluation framework ensures that every credential stands for{" "}
                                    <span className="font-semibold text-blue-600">Real Skill, Real Effort, and Real Readiness.</span>
                                </p>
                            </div>
                        }
                    />
                </LandingBento>
            </div>
        </LandingSectionShell>
    );
};

export default WhatThisMean;
