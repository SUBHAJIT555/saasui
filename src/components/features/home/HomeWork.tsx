import { useRef, type ComponentType } from "react";
import { Briefcase, ClipboardList, FolderOpen, Kanban, MessagesSquare, Receipt } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel } from "@/components/ui/ggw-button";
import { LandingSectionShell, landingRevealVariants, homeSectionSpacingClass } from "@/components/ui/landing-section";

const steps = [
  "Talk through the work, whether that is planning, records, documents, a project, billing, or customer communication.",
  "Agree the scope, the deliverables, and the payment purpose before any work starts.",
  "Prepare the records, documents, coordination, or client updates that were agreed.",
  "Share progress, organized files, and a clear record of what was completed.",
];

const audiences: {
  title: string;
  body: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  {
    title: "Planning and advisory",
    body: "Founders who need planning and advisory support.",
    Icon: Briefcase,
  },
  {
    title: "Day-to-day administration",
    body: "Teams that need day-to-day administration.",
    Icon: ClipboardList,
  },
  {
    title: "Documents and records",
    body: "Businesses organizing documents and records.",
    Icon: FolderOpen,
  },
  {
    title: "Project coordination",
    body: "Projects that need coordination and reporting.",
    Icon: Kanban,
  },
  {
    title: "Invoices and payments",
    body: "Offices tracking invoices and payments.",
    Icon: Receipt,
  },
  {
    title: "Customer enquiries",
    body: "Companies handling customer enquiries.",
    Icon: MessagesSquare,
  },
];

const HomeWork = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="how-it-works" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(15rem,22rem)_minmax(0,1fr)] lg:gap-0">
          <div className="lg:border-r lg:border-dashed lg:border-hairline lg:pr-12">
            <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
              <AccentLabel>Engagement</AccentLabel>
            </TimelineContent>
            <TimelineContent as="h2" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-section text-ink">
              How an engagement works
            </TimelineContent>
            <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-copy font-medium text-brand-accent">
              Clear scope. Steady delivery.
            </TimelineContent>
          </div>

          <div className="lg:pl-12">
            <TimelineContent as="p" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-copy text-body">
              An engagement is a defined piece of work. You choose the service, we agree what will be delivered, and the payment purpose stays attached to that work — a consultation fee, a monthly service fee, a document processing fee, a project milestone payment, an invoice management fee, or a contracted support fee.
            </TimelineContent>
            <ol className="mt-8 border-t border-dashed border-hairline">
              {steps.map((step, index) => (
                <TimelineContent
                  key={step}
                  as="li"
                  animationNum={4 + index}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-dashed border-hairline py-4"
                >
                  <span className="text-caption font-semibold text-brand-accent">0{index + 1}</span>
                  <span className="text-copy text-body">{step}</span>
                </TimelineContent>
              ))}
            </ol>
            <TimelineContent as="p" animationNum={8} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 text-copy text-body">
              Start from any service page and continue to checkout with that payment purpose already selected. Nothing is billed until the scope is agreed.
            </TimelineContent>
          </div>
        </div>

        <div className="mt-14 border-t border-dashed border-hairline pt-12">
          <TimelineContent as="h3" animationNum={9} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-section text-ink">
            Who this support is for
          </TimelineContent>
          <TimelineContent as="p" animationNum={10} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-3 max-w-2xl text-copy font-medium text-brand-accent">
            Teams that need the operational work handled.
          </TimelineContent>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item, index) => (
              <TimelineContent
                key={item.title}
                as="div"
                animationNum={11 + index}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
              >
                <item.Icon className="h-6 w-6 text-brand-accent" strokeWidth={1.75} />
                <h4 className="mt-4 text-title-sm text-ink">{item.title}</h4>
                <p className="mt-2 text-copy leading-relaxed text-body">{item.body}</p>
              </TimelineContent>
            ))}
          </div>
        </div>
      </div>
    </LandingSectionShell>
  );
};

export default HomeWork;
