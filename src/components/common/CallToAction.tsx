import { useRef } from "react";
import { useNavigate } from "@/lib/react-router";
import { GgwButton } from "@/components/ui/ggw-button";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { siteRoutes } from "@/config/routes";
import { LandingSectionShell, landingRevealVariants, homeSectionSpacingClass } from "@/components/ui/landing-section";

const outcomes = [
  "Business planning and operational guidance",
  "Records, data entry, and day-to-day administration",
  "Documents, reports, and organized files",
  "Project coordination and customer communication",
];

const CallToAction = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
          <div className="lg:border-r lg:border-dashed lg:border-hairline lg:pr-12">
            <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
              <span className="inline-block w-fit bg-brand-accent px-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-on-primary">
                Start with one service
              </span>
            </TimelineContent>
            <TimelineContent as="h2" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-section text-ink">
              Pick the work that needs support, then continue with a payment purpose that matches it.
            </TimelineContent>
          </div>
          <div className="lg:pl-12">
            <TimelineContent as="h3" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-title-sm text-ink">
              Support can cover
            </TimelineContent>
            <ul className="mt-4 border-t border-dashed border-hairline">
              {outcomes.map((item, index) => (
                <TimelineContent
                  key={item}
                  as="li"
                  animationNum={3 + index}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className="border-b border-dashed border-hairline py-3 text-copy text-body"
                >
                  {item}
                </TimelineContent>
              ))}
            </ul>
          </div>
        </div>

        <TimelineContent
          as="div"
          animationNum={7}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="relative -mx-4 -mb-10 mt-14 overflow-hidden border-t border-dashed border-hairline py-10 text-center md:-mb-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-55"
            style={{
              mask: "radial-gradient(70% 65% at 50% 45%, transparent 0%, transparent 48%, black 100%)",
              WebkitMask: "radial-gradient(70% 65% at 50% 45%, transparent 0%, transparent 48%, black 100%)",
              backgroundImage:
                "linear-gradient(90deg, var(--color-hairline) 1px, transparent 0), linear-gradient(180deg, var(--color-hairline) 1px, transparent 0), repeating-linear-gradient(45deg, var(--color-hairline), transparent 2px 10px)",
              backgroundSize: "24px 24px, 24px 24px, 24px 24px",
            }}
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-section text-ink">Begin with the service you need today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-copy font-medium text-brand-accent">
              Open a service, agree the scope, and continue with the payment purpose that belongs to that work.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GgwButton type="button" variant="accent" onClick={() => navigate(siteRoutes.services)} className="h-12 w-full px-6 sm:w-auto">
                View services
              </GgwButton>
              <GgwButton type="button" variant="secondary" onClick={() => navigate(siteRoutes.contact)} className="h-12 w-full px-6 sm:w-auto">
                Contact
              </GgwButton>
            </div>
          </div>
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
};

export default CallToAction;
