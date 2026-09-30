import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const TABLE_DATA = [
  {
    program: "Cybercrime, Dark Web & Crypto Investigations",
    educationalBackground: [
      "Computer Science / IT",
      "Engineering (any branch)",
      "Commerce / Finance / Economics",
      "Law, Criminology, or Criminal Justice",
    ],
    bestFor: [
      "Aspiring cybercrime investigators",
      "Fintech, AML & fraud analysts",
      "Intelligence & compliance professionals",
      "Individuals interested in digital investigations & attribution",
    ],
    notRecommended: [
      "Candidates with no interest in investigation or analysis",
      "Those seeking purely technical or coding-focused roles",
    ],
  },
  {
    program: "Platform, Identity & Abuse Defense Engineering",
    educationalBackground: [
      "Computer Science / IT",
      "Engineering (Software, Electronics, Telecom)",
      "Mathematics / Data-focused degrees",
    ],
    bestFor: [
      "Platform security & Trust & Safety aspirants",
      "Product, identity & abuse prevention roles",
      "SaaS, fintech & marketplace security teams",
    ],
    notRecommended: [
      "Candidates without interest in systems, platforms, or applications",
      "Those expecting traditional \"ethical hacking\" content",
    ],
  },
  {
    program: "Full-Stack Cyber Defense & Offensive Security",
    educationalBackground: [
      "Any graduate or final-year student",
      "Engineering / Science / IT preferred but not mandatory",
    ],
    bestFor: [
      "Beginners seeking structured entry into cybersecurity",
      "Career switchers from non-cyber backgrounds",
      "Students building end-to-end cyber capability",
    ],
    notRecommended: [
      "Candidates looking for a short or casual program",
      "Those unwilling to commit to a long, intensive learning journey",
    ],
  },
];

const BulletList = ({
  items,
  textClassName,
}: {
  items: string[];
  textClassName: string;
}) => (
  <ul className="list-none space-y-1.5 pl-0 sm:space-y-2">
    {items.map((item, i) => (
      <li key={i} className={cn("flex items-start gap-2 text-sm font-medium leading-relaxed sm:text-base", textClassName)}>
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ProgramAlignmentTable = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          <div className="py-6 md:py-8">
            <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
              <ShinyText
                text="Who Should Apply – "
                className={landingSectionHeadingClass}
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
              <span className={`${landingSectionHeadingClass} text-blue-600`}>
                Program Alignment Guide
              </span>
            </TimelineContent>
          </div>

          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="w-full overflow-x-auto border border-zinc-200"
          >
            <table className="w-full min-w-[800px] border-collapse bg-white">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="w-[18%] border-b border-zinc-200 px-4 py-4 text-left text-sm font-semibold text-zinc-900 sm:px-5 sm:text-base md:px-6 md:text-lg">
                    Program
                  </th>
                  <th className="w-[27%] border-b border-l border-zinc-200 px-4 py-4 text-left text-sm font-semibold text-zinc-900 sm:px-5 sm:text-base md:px-6 md:text-lg">
                    Educational Background
                  </th>
                  <th className="w-[27%] border-b border-l border-zinc-200 px-4 py-4 text-left text-sm font-semibold text-zinc-900 sm:px-5 sm:text-base md:px-6 md:text-lg">
                    Who This Is Best For
                  </th>
                  <th className="w-[28%] border-b border-l border-zinc-200 px-4 py-4 text-left text-sm font-semibold text-zinc-900 sm:px-5 sm:text-base md:px-6 md:text-lg">
                    Not Recommended For
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_DATA.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}
                  >
                    <td className="border-b border-zinc-200 px-4 py-4 align-top sm:px-5 md:px-6">
                      <p className="text-sm font-semibold leading-snug text-zinc-900 sm:text-base md:text-lg">
                        {row.program}
                      </p>
                    </td>
                    <td className="border-b border-l border-zinc-200 px-4 py-4 align-top sm:px-5 md:px-6">
                      <BulletList items={row.educationalBackground} textClassName="text-blue-600" />
                    </td>
                    <td className="border-b border-l border-zinc-200 px-4 py-4 align-top sm:px-5 md:px-6">
                      <BulletList items={row.bestFor} textClassName="text-green-600" />
                    </td>
                    <td className="border-b border-l border-zinc-200 px-4 py-4 align-top sm:px-5 md:px-6">
                      <BulletList items={row.notRecommended} textClassName="text-red-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TimelineContent>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default ProgramAlignmentTable;
