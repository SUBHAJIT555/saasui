"use client";

import { useRef } from "react";
import { FlowStepCard } from "@/components/ui/FlowStepCard";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingSectionSubheadingClass,
} from "@/components/ui/landing-section";

const flowSteps = [
  { label: "Structured training", sub: "Theory & methodology" },
  { label: "Hands-on labs", sub: "Practical execution" },
  { label: "Formal assessment", sub: "Evaluation & grading" },
  { label: "Official credential", sub: "CYBERLABS USA certificate" },
];

const LevelUp = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text="Certification & Professional Grading"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <TimelineContent
          as="h3"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className={`mt-4 ${landingSectionSubheadingClass} text-zinc-800`}
        >
          Official Credentials Issued by CYBERLABS USA
        </TimelineContent>

        <LandingBento className="mt-8 border-y border-zinc-200">
          <LandingBentoCell className=" md:px-8">
            <TimelineContent
              as="div"
              animationNum={2}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="space-y-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
            >
              <p>
                Upon successful completion of the Cyber Defense Program, learners are awarded an{" "}
                <span className="font-semibold text-blue-600">official internal certificate issued by CYBERLABS USA</span>.
              </p>
              <p>
                These certificates are issued under{" "}
                <span className="font-semibold text-blue-600">CYBERLABS USA&apos;s global training and evaluation framework</span>{" "}
                and represent a{" "}
                <span className="font-semibold text-zinc-900">rigorous standard of practical cybersecurity capability</span>, with strong emphasis on investigation, operational thinking, and real-world execution.
              </p>
              <p>
                The certification validates that the learner has successfully completed structured training, extensive hands-on labs, and formal assessments aligned with{" "}
                <span className="font-semibold text-blue-600">CYBERLABS USA methodologies.</span>
              </p>
            </TimelineContent>
          </LandingBentoCell>
        </LandingBento>

        <TimelineContent
          as="div"
          animationNum={3}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4"
        >
          {flowSteps.map((step, index) => (
            <FlowStepCard
              key={step.label}
              stepNumber={index + 1}
              label={step.label}
              sub={step.sub}
              className="h-full"
            />
          ))}
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
};

export default LevelUp;
