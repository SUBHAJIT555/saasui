import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { assetSrc } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel, GgwButton } from "@/components/ui/ggw-button";
import {
  LandingSectionShell,
  landingRevealVariants,
  homeSectionSpacingClass,
} from "@/components/ui/landing-section";
import { services, servicePath, type Service } from "@/config/data/services";
import consultancy from "@/assets/img/Home/undraw/five-year-plan_7hwj.svg";
import administration from "@/assets/img/Home/undraw/getting-organized_lyqo.svg";
import documentation from "@/assets/img/Home/undraw/ai-document-analysis_1sq9.svg";
import projects from "@/assets/img/Home/undraw/project-flow_ghph.svg";
import billing from "@/assets/img/Home/undraw/digital-invoice_nx9a.svg";
import customers from "@/assets/img/Home/undraw/work-emails_3qkc.svg";

const illustrations: Record<Service["slug"], string> = {
  "business-consultancy": consultancy,
  "administrative-support": administration,
  "documentation-services": documentation,
  "project-operational-support": projects,
  "billing-invoice-management": billing,
  "customer-business-support": customers,
};

const HomeServices = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="services" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <TimelineContent
          as="div"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <AccentLabel>Services</AccentLabel>
        </TimelineContent>
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 max-w-3xl space-y-2"
        >
          <h2 className="text-section text-ink">Choose the support you need</h2>
          <p className="text-copy text-body">
            Each service has its own page and a payment purpose used at checkout.
          </p>
        </TimelineContent>

        <div className="mt-10 grid grid-cols-1 border-l border-t border-dashed border-hairline sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <TimelineContent
              key={service.slug}
              as="article"
              animationNum={2 + index}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="flex h-full flex-col border-b border-r border-dashed border-hairline bg-canvas p-5 md:p-6"
            >
              <div className="flex h-40 items-center justify-center">
                <img
                  src={assetSrc(illustrations[service.slug])}
                  alt=""
                  className="h-auto max-h-36 w-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-title-sm text-ink">{service.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{service.summary}</p>
              {/* <p className="mt-4 text-caption font-semibold uppercase tracking-[0.14em] text-brand-accent">
                {service.paymentPurpose}
              </p> */}
              <GgwButton href={servicePath(service.slug)} variant="accent" className="mt-5 h-10 w-full">
                View service
                <ArrowRight className="h-4 w-4" />
              </GgwButton>
            </TimelineContent>
          ))}
        </div>
      </div>
    </LandingSectionShell>
  );
};

export default HomeServices;
