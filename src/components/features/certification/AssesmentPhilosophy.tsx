import { assetSrc, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import comptiaImage from "@/assets/img/CertificateTag/cyberlab_ceritificate_comptia.webp";
import iscImage from "@/assets/img/CertificateTag/cyberlab_ceritificate_isc.webp";
import ecCouncilImage from "@/assets/img/CertificateTag/cyberlab_ceritificate_ec-council.webp";
import assesmentSvg from "@/assets/img/Official certification/assesment.svg";
import industryallignmentSvg from "@/assets/img/Official certification/industryallignment.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  landingListIconWrapperClass,
  landingListRowHoverClass,
  landingListTextHoverClass,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const textWideRowClass = "md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]";
const imageLeftTextWideRowClass = "md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]";

const PARTNER_ORGS = [
  { name: "ISC²", src: iscImage, alt: "ISC² Certificate" },
  { name: "CompTIA", src: comptiaImage, alt: "CompTIA Certificate" },
  { name: "EC-Council", src: ecCouncilImage, alt: "EC-Council Certificate" },
];

function MergedBentoBlock({ children }: { children: ReactNode }) {
  return <div className="max-md:divide-y max-md:divide-zinc-200">{children}</div>;
}

function SectionImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <img
      src={assetSrc(src)}
      alt={alt}
      className="mx-auto h-auto w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px]"
    />
  );
}

function PartnerLogoGrid() {
  return (
    <div className="grid grid-cols-1 divide-y border-y border-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {PARTNER_ORGS.map((org) => (
        <div key={org.name} className="flex flex-col items-center px-4 py-4 md:py-5">
          <p className="mb-3 text-sm font-semibold text-zinc-900 md:text-base">{org.name}</p>
          <img
            src={assetSrc(org.src)}
            alt={org.alt}
            className="h-auto w-full max-w-[110px] object-contain sm:max-w-[120px] md:max-w-[130px]"
          />
        </div>
      ))}
    </div>
  );
}

function SplitBorderedIconList({
  items,
}: {
  items: { text: string; icon: ReactNode }[];
}) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <div className="border-y border-zinc-200">
      <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
        {columns.map((column, colIndex) => (
          <ul key={colIndex} className={cn(colIndex === 0 ? "md:pr-8" : "md:pl-8")}>
            {column.map((item, rowIndex) => {
              const isLastInColumn = rowIndex === column.length - 1;
              const isLastOverall = colIndex === columns.length - 1 && isLastInColumn;

              return (
                <li
                  key={item.text}
                  className={cn(
                    "flex items-start gap-3 py-4",
                    landingListRowHoverClass,
                    !isLastOverall && "border-b border-zinc-200",
                    isLastInColumn && colIndex === 0 && "md:border-b-0",
                    rowIndex !== column.length - 1 && "md:border-b md:border-zinc-200",
                  )}
                >
                  <span className={landingListIconWrapperClass}>{item.icon}</span>
                  <span
                    className={cn(
                      "text-sm leading-relaxed text-zinc-700 md:text-base",
                      landingListTextHoverClass,
                    )}
                  >
                    {item.text}
                  </span>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

const AssesmentPhilosophy = () => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const AnimatedBrainIcon = () => (
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
                d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.7, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    const AnimatedMapSearchIcon = () => (
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
                d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M9 4v13"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M15 7v5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M20.2 20.2l1.8 1.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    const AnimatedChartDotsIcon = () => (
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
                d="M3 3v18h18"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M7 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M11 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M16 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M21 3l-6 1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M14.113 6.65l2.771 3.695"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.7, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M16 12.5l-5 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    const AnimatedScaleIcon = () => (
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
                d="M7 20l10 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M6 6l6 -1l6 1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M12 3l0 17"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    const AnimatedRosetteCheckIcon = () => (
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
            className="h-6 w-6 shrink-0 text-blue-600"
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
                d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path
                d="M9 12l2 2l4 -4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1, repeat: Infinity, repeatDelay: 3 }}
            />
        </svg>
    );

    const philosophyListItems = [
        { text: "How learners think under complexity.", icon: <AnimatedBrainIcon /> },
        { text: "How they investigate unfamiliar scenarios.", icon: <AnimatedMapSearchIcon /> },
        { text: "How they analyze evidence and data.", icon: <AnimatedChartDotsIcon /> },
        { text: "How they make defensible, professional decisions.", icon: <AnimatedScaleIcon /> },
    ];

    const section1Body = (
        <>
            <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm text-zinc-700 md:text-base">
                Assessments at CYBERLABS are <span className="font-semibold text-zinc-900">not memory-based exams.</span>
            </TimelineContent>
            <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="my-4 text-sm font-semibold text-zinc-900 md:text-base lg:text-lg">
                They are designed to evaluate:
            </TimelineContent>
            <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <SplitBorderedIconList items={philosophyListItems} />
            </TimelineContent>
            <TimelineContent as="p" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 border-t border-zinc-200 pt-5 text-sm font-semibold text-zinc-900 md:text-base lg:text-lg">
                This mirrors how cybersecurity professionals are evaluated in real-world roles.
            </TimelineContent>
        </>
    );

    const section2IntroBody = (
        <>
            <TimelineContent as="p" animationNum={6} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
                All certificates issued by CYBERLABS USA are{" "}
                <span className="font-semibold text-blue-600">industry-aligned and professionally relevant</span> in the context of global cybersecurity role requirements.
            </TimelineContent>
            <TimelineContent as="p" animationNum={7} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
                CYBERLABS USA programs are <span className="font-semibold text-zinc-900">mapped and aligned</span> to the knowledge domains, skill areas, and professional competencies defined by globally recognized cybersecurity bodies such as:
            </TimelineContent>
        </>
    );

    const section2DetailBody = (
        <>
            <TimelineContent as="div" animationNum={8} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <PartnerLogoGrid />
            </TimelineContent>
            <TimelineContent as="p" animationNum={9} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:mt-5 md:text-base">
                This alignment ensures that learners develop capabilities that are <span className="font-semibold text-zinc-900">relevant, transferable, and compatible</span> with internationally recognized cybersecurity career pathways, while maintaining CYBERLABS&apos; own investigation-driven and operational training standards.
            </TimelineContent>
            <TimelineContent as="div" animationNum={10} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 flex items-start gap-3 border-t border-zinc-200 pt-4 md:mt-5 md:pt-5">
                <span className="mt-0.5 shrink-0 text-blue-600">
                    <AnimatedRosetteCheckIcon />
                </span>
                <p className="text-lg font-bold leading-relaxed text-zinc-700 md:text-xl">
                    CYBERLABS certifications emphasize <span className="font-bold text-blue-600">practical capability and operational readiness</span>, rather than exam-only credentialing.
                </p>
            </TimelineContent>
       
        </>
    );

    return (
        <LandingSectionShell>
            <div ref={timelineRef}>
                <LandingBento>
                    <MergedBentoBlock>
                        <LandingBentoRow className={textWideRowClass}>
                            <LandingBentoCell className="md:px-0 md:pr-8">
                                <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                                    <ShinyText text="Assessment Philosophy" className={landingSectionHeadingClass} color="#3f3f46" shineColor="#18181b" speed={3} spread={120} />
                                </TimelineContent>
                                <div className="hidden md:block">{section1Body}</div>
                            </LandingBentoCell>
                            <LandingBentoCell className="flex items-center justify-center py-6 md:px-0 md:py-0 md:pl-6 lg:pl-8">
                                <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                                    <SectionImage src={assesmentSvg} />
                                </TimelineContent>
                            </LandingBentoCell>
                        </LandingBentoRow>
                        <div className="px-0 pb-6 md:hidden">{section1Body}</div>
                    </MergedBentoBlock>

                    <MergedBentoBlock>
                        <LandingBentoRow className={imageLeftTextWideRowClass}>
                            <LandingBentoCell className="order-2 flex items-center justify-center py-6 md:order-0 md:px-0 md:py-0 md:pr-6 lg:pr-8">
                                <TimelineContent as="div" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                                    <SectionImage src={industryallignmentSvg} />
                                </TimelineContent>
                            </LandingBentoCell>
                            <LandingBentoCell className="order-1 md:order-0 md:px-0 md:pl-8">
                                <TimelineContent as="h2" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                                    <ShinyText
                                        text="Industry Alignment &"
                                        className={cn(landingSectionHeadingClass, "block")}
                                        color="#3f3f46"
                                        shineColor="#18181b"
                                        speed={3}
                                        spread={120}
                                    />
                                    <span className={cn(landingSectionHeadingClass, "mt-1 block")}>Professional Relevance</span>
                                </TimelineContent>
                                <div className="hidden md:block">{section2IntroBody}</div>
                            </LandingBentoCell>
                        </LandingBentoRow>
                        <div className="px-0 pb-6 md:hidden">{section2IntroBody}</div>
                        <div className="border-t border-zinc-200 px-0 py-6 md:py-8">{section2DetailBody}</div>
                    </MergedBentoBlock>
                </LandingBento>
            </div>
        </LandingSectionShell>
    );
};

export default AssesmentPhilosophy;
