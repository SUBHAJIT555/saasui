"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { assetSrc } from "@/lib/utils";
import { Link } from "@/lib/react-router";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel, GgwButton } from "@/components/ui/ggw-button";
import CallToAction from "@/components/common/CallToAction";
import {
  LandingSectionShell,
  landingRevealVariants,
  homeSectionSpacingClass,
} from "@/components/ui/landing-section";
import { services, servicePath, type Service } from "@/config/data/services";
import { siteRoutes } from "@/config/routes";
import consultancy from "@/assets/img/Home/undraw/five-year-plan_7hwj.svg";
import administration from "@/assets/img/Home/undraw/getting-organized_lyqo.svg";
import documentation from "@/assets/img/Home/undraw/ai-document-analysis_1sq9.svg";
import projects from "@/assets/img/Home/undraw/project-flow_ghph.svg";
import billing from "@/assets/img/Home/undraw/digital-invoice_nx9a.svg";
import customers from "@/assets/img/Home/undraw/work-emails_3qkc.svg";
import faqImage from "@/assets/img/Home/undraw/status-page_46km.svg";
import heroScene from "@/assets/img/HeroImage/ServicesHero.webp";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

const illustrations: Record<Service["slug"], string> = {
  "business-consultancy": consultancy,
  "administrative-support": administration,
  "documentation-services": documentation,
  "project-operational-support": projects,
  "billing-invoice-management": billing,
  "customer-business-support": customers,
};

const differences = [
  {
    title: "The work is named first",
    body: "Each service is a defined piece of work. Planning, records, documents, projects, invoices, and customer communication are not folded into one open list.",
  },
  {
    title: "Payment follows that service",
    body: "A consultation fee, a monthly service fee, a document processing fee, a project milestone payment, an invoice management fee, or a contracted support fee. The purpose is visible before checkout.",
  },
  {
    title: "One service is enough",
    body: "Start with the service that matches the work. Add another later if the scope is separate. Each one keeps its own page and its own agreement.",
  },
  {
    title: "The result stays written down",
    body: "Plans, organized records, prepared documents, project updates, billing records, and handled enquiries stay with the engagement, along with a note of what was completed.",
  },
];

const faqItems = [
  {
    question: "How do I choose a service?",
    answer:
      "Match the work you need. Planning and advice sit under business consultancy. Day-to-day records sit under administrative support. Documents, projects, invoices, and customer communication each have their own service.",
  },
  {
    question: "What is on a service page?",
    answer:
      "The kind of work, what it covers, and the payment purpose used if you continue. The scope is still agreed before anything is treated as started.",
  },
  {
    question: "Is the fee the same for every service?",
    answer:
      "No. Each service has its own payment purpose, from a consultation fee to a contracted support fee. That purpose is what checkout uses for the service you opened.",
  },
  {
    question: "Can we use more than one service?",
    answer:
      "Yes, when the work is separate. Each service keeps its own scope and its own payment purpose, so they are not blended into a single unnamed list.",
  },
  {
    question: "When does a service start?",
    answer:
      "After the scope and the payment purpose are agreed. Opening a page or browsing the list does not start the work.",
  },
  {
    question: "How do we ask about a service?",
    answer:
      "Use the contact page and name the service. If the scope is already clear, open that service and continue toward checkout with its payment purpose selected.",
  },
];

function ServicesHero() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={timelineRef} className="relative isolate overflow-hidden bg-canvas pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-120 w-[calc(100%-6px)] overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 50%)",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 50%)",
        }}
      >
        <img src={assetSrc(heroScene)} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <TimelineContent
          as="h1"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="max-w-[22ch] text-balance text-hero text-ink md:max-w-[28ch]"
        >
          Six services, each with a{" "}
          <span className="bg-brand-accent px-1.5 text-on-primary">clear purpose</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-[56ch] text-pretty text-copy text-body"
        >
          Choose the support that matches the work. Every service explains what it covers and the payment purpose attached to it.
        </TimelineContent>
        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <GgwButton href="#overview" variant="accent" className="h-11 px-5">
            See the services
            <ArrowRight className="h-4 w-4" />
          </GgwButton>
          <GgwButton href={siteRoutes.contact} variant="secondary" className="h-11 px-5">
            Contact
          </GgwButton>
        </TimelineContent>
      </div>
    </section>
  );
}

function ServicesOverview() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="overview" className={`${homeSectionSpacingClass} screen-line-top bg-surface-soft`}>
      <div ref={timelineRef}>
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="text-caption font-semibold uppercase tracking-[0.14em] text-muted"
        >
          Services
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-3 max-w-3xl text-section text-ink"
        >
          What each service <span className="bg-brand-accent px-1.5 text-on-primary">covers</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-3 max-w-2xl text-copy text-muted"
        >
          A short look at the six services. Open any one for its page.
        </TimelineContent>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <TimelineContent
              key={service.slug}
              as="div"
              animationNum={3 + index}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
            >
              <Link
                to={servicePath(service.slug)}
                className="flex h-full flex-col rounded-2xl bg-canvas p-3 shadow-[0_12px_40px_-24px_rgba(17,17,17,0.45)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex h-52 items-center justify-center overflow-hidden rounded-xl bg-surface-soft">
                  <img
                    src={assetSrc(illustrations[service.slug])}
                    alt=""
                    className="h-40 w-auto max-w-[85%] object-contain"
                  />
                </div>
                <div className="flex items-start gap-3 px-2 pb-3 pt-4">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent text-xs font-semibold text-on-primary">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-title-sm font-semibold text-ink">{service.name}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">{service.summary}</span>
                    <span className="mt-3 block text-caption font-semibold uppercase tracking-[0.14em] text-brand-accent">
                      {service.paymentPurpose}
                    </span>
                  </span>
                </div>
              </Link>
            </TimelineContent>
          ))}
        </div>
      </div>
    </LandingSectionShell>
  );
}

function ServicesDifference() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="different" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(15rem,22rem)_minmax(0,1fr)] lg:gap-0">
        <div className="lg:border-r lg:border-dashed lg:border-hairline lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>What makes us different</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 text-section text-ink"
          >
            The service and the payment stay together
          </TimelineContent>
          <TimelineContent
            as="p"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 text-copy font-medium text-brand-accent"
          >
            Support is easier to follow when the work has a name, a scope, and a payment purpose before it begins.
          </TimelineContent>
        </div>
        <ol className="border-t border-dashed border-hairline lg:border-t-0 lg:pl-12">
          {differences.map((item, index) => (
            <TimelineContent
              key={item.title}
              as="li"
              animationNum={3 + index}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-dashed border-hairline py-5"
            >
              <span className="text-caption font-semibold text-brand-accent">0{index + 1}</span>
              <div>
                <h3 className="text-title-sm text-ink">{item.title}</h3>
                <p className="mt-1 text-copy text-body">{item.body}</p>
              </div>
            </TimelineContent>
          ))}
        </ol>
      </div>
    </LandingSectionShell>
  );
}

function ServicesFaq() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <LandingSectionShell id="faq" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-0">
        <div className="lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>FAQ</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 max-w-sm text-section text-ink"
          >
            Questions about the services
          </TimelineContent>
          <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-8">
            <img src={assetSrc(faqImage)} alt="" className="h-auto w-full max-w-sm object-contain object-left" />
          </TimelineContent>
        </div>
        <TimelineContent
          as="div"
          animationNum={3}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="border-t border-dashed border-hairline lg:border-l lg:border-t-0 lg:pl-12"
        >
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            const last = index === faqItems.length - 1;
            return (
              <div key={item.question} className={last ? "" : "border-b border-dashed border-hairline"}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className={open ? "text-title-sm text-ink" : "text-title-sm font-medium text-body"}>
                    {item.question}
                  </span>
                  <span
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-lg leading-none text-ink"
                    aria-hidden
                  >
                    {open ? "–" : "+"}
                  </span>
                </button>
                <div className={open ? "grid grid-rows-[1fr] transition-all duration-300" : "grid grid-rows-[0fr] transition-all duration-300"}>
                  <div className="overflow-hidden">
                    <div className="pb-4 pr-10 text-copy leading-relaxed text-body">{item.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
}

export default function ServicesPage() {
  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <ServicesHero />
      <ServicesOverview />
      <ServicesDifference />
      <ServicesFaq />
      <CallToAction />
    </div>
  );
}
