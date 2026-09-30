import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import { MagicText } from "@/components/ui/magic-text";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel } from "@/components/ui/ggw-button";
import { LandingSectionShell, landingRevealVariants, homeSectionSpacingClass } from "@/components/ui/landing-section";
import overviewImage from "@/assets/img/Home/undraw/shared-goals_ijlg.svg";

const highlightWords = new Set(["planning", "administration", "documents", "projects", "billing", "communication"]);

const styleServiceWords = (word: string) => {
  const lowerWord = word.toLowerCase().replace(/[.,-]/g, "");
  if (highlightWords.has(lowerWord)) {
    return <span className="font-semibold text-brand-accent">{word}</span>;
  }
  return word;
};

const HomeOverview = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="overview" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-0">
        <div className="lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>Overview</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 max-w-md text-section text-ink"
          >
            The back office stays in order while the business moves.
          </TimelineContent>
          <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-8">
            <img
              src={assetSrc(overviewImage)}
              alt="Two people aligning on shared business goals"
              className="h-auto w-full max-w-[340px] object-contain"
            />
          </TimelineContent>
        </div>

        <div className="lg:border-l lg:border-dashed lg:border-hairline lg:pl-12">
          <TimelineContent
            as="p"
            animationNum={3}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="text-copy font-medium text-brand-accent"
          >
            Six services cover planning, records, documents, projects, invoices, and customer communication.
          </TimelineContent>
          <TimelineContent as="div" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6">
            <MagicText
              text="Each service is a defined piece of work: business planning, day-to-day administration, document preparation, project coordination, invoice tracking, and customer communication. The payment purpose matches the work, from a consultation fee to a contracted support fee."
              className="text-copy leading-relaxed text-body"
              renderWord={styleServiceWords}
            />
          </TimelineContent>
        </div>
      </div>
    </LandingSectionShell>
  );
};

export default HomeOverview;
