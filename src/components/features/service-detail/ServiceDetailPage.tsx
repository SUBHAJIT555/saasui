"use client";

import { useRef, useState, type ComponentType } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarClock,
  Check,
  ClipboardCheck,
  Files,
  FolderOpen,
  Headset,
  Inbox,
  Kanban,
  ListChecks,
  MessagesSquare,
  Milestone,
  NotebookPen,
  Receipt,
  Repeat,
  Scan,
  Sparkles,
  Target,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { assetSrc } from "@/lib/utils";
import { Link } from "@/lib/react-router";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel, GgwButton } from "@/components/ui/ggw-button";
import CallToAction from "@/components/common/CallToAction";
import Testimonials from "@/components/common/Testimonials";
import { checkoutPath, getService, servicePath, services, type Service } from "@/config/data/services";
import { siteRoutes } from "@/config/routes";
import { servicePageContent } from "@/components/features/service-detail/servicePageContent";
import consultancy from "@/assets/img/Home/undraw/five-year-plan_7hwj.svg";
import administration from "@/assets/img/Home/undraw/getting-organized_lyqo.svg";
import documentation from "@/assets/img/Home/undraw/ai-document-analysis_1sq9.svg";
import projects from "@/assets/img/Home/undraw/project-flow_ghph.svg";
import billing from "@/assets/img/Home/undraw/digital-invoice_nx9a.svg";
import customers from "@/assets/img/Home/undraw/work-emails_3qkc.svg";
import faqImage from "@/assets/img/Home/undraw/shared-goals_ijlg.svg";
import {
  LandingSectionShell,
  landingRevealVariants,
  homeSectionSpacingClass,
} from "@/components/ui/landing-section";

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

const imageAlt: Record<Service["slug"], string> = {
  "business-consultancy": "A planning board for a business consultation",
  "administrative-support": "A person organizing records and daily administration",
  "documentation-services": "Documents being reviewed and filed",
  "project-operational-support": "A project moving from tasks to a milestone",
  "billing-invoice-management": "An invoice prepared on a laptop",
  "customer-business-support": "Customer messages being handled",
};

const heroScenes: Record<Service["slug"], string> = {
  "business-consultancy":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=80",
  "administrative-support":
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2400&q=80",
  "documentation-services":
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=2400&q=80",
  "project-operational-support":
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=2400&q=80",
  "billing-invoice-management":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2400&q=80",
  "customer-business-support":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2400&q=80",
};

const heroParts: Record<Service["slug"], { before: string; highlight: string }> = {
  "business-consultancy": { before: "A plan and a recommendation,", highlight: "not a task list" },
  "administrative-support": { before: "The back office,", highlight: "kept current" },
  "documentation-services": { before: "Documents prepared,", highlight: "easy to find" },
  "project-operational-support": { before: "A project that", highlight: "reports its progress" },
  "billing-invoice-management": { before: "Invoices prepared,", highlight: "payments tracked" },
  "customer-business-support": { before: "Customer questions", highlight: "answered" },
};

type MarkIcon = ComponentType<{ className?: string; strokeWidth?: number }>;

const benefitIcons: Record<Service["slug"], MarkIcon[]> = {
  "business-consultancy": [Target, BookOpen, Workflow, Sparkles],
  "administrative-support": [CalendarClock, Files, ClipboardCheck, Repeat],
  "documentation-services": [NotebookPen, Scan, FolderOpen, BarChart3],
  "project-operational-support": [ListChecks, Milestone, Kanban, BarChart3],
  "billing-invoice-management": [Receipt, Wallet, ClipboardCheck, FolderOpen],
  "customer-business-support": [Inbox, Users, MessagesSquare, Headset],
};

function ServiceHero({ service }: { service: Service }) {
  const content = servicePageContent[service.slug];
  const timelineRef = useRef<HTMLDivElement>(null);
  const title = heroParts[service.slug];

  return (
    <section ref={timelineRef} className="relative isolate overflow-hidden bg-canvas pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-120 w-[calc(100%-6px)] overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 50%)",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 50%)",
        }}
      >
        <img src={heroScenes[service.slug]} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="text-caption font-semibold uppercase tracking-[0.14em] text-muted"
        >
          {service.paymentPurpose}
        </TimelineContent>
        <TimelineContent
          as="h1"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-[24ch] text-balance text-hero text-ink md:max-w-[28ch]"
        >
          {title.before} <span className="bg-brand-accent px-1.5 text-on-primary">{title.highlight}</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-[62ch] text-pretty text-copy text-body"
        >
          {content.heroBody}
        </TimelineContent>
        <TimelineContent
          as="div"
          animationNum={3}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <GgwButton href={checkoutPath(service.slug)} variant="accent" className="h-11 px-5">
            Continue to checkout
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

function ServiceDetails({ service }: { service: Service }) {
  const content = servicePageContent[service.slug];
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="details" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-0">
        <div className="lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>Service details</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 text-section text-ink"
          >
            {content.detailsTitle}
          </TimelineContent>
          <TimelineContent
            as="p"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 text-copy font-medium text-brand-accent"
          >
            {content.detailsLead}
          </TimelineContent>
          <TimelineContent
            as="p"
            animationNum={3}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-3 text-copy text-body"
          >
            {content.detailsBody}
          </TimelineContent>
          <TimelineContent as="div" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-8">
            <img
              src={assetSrc(illustrations[service.slug])}
              alt={imageAlt[service.slug]}
              className="h-auto max-h-72 w-full max-w-sm object-contain"
            />
          </TimelineContent>
        </div>
        <ol className="border-t border-dashed border-hairline lg:border-l lg:border-t-0 lg:pl-12">
          {content.detailsPoints.map((item, index) => (
            <TimelineContent
              key={item.title}
              as="li"
              animationNum={5 + index}
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

function ServiceDifference({ service }: { service: Service }) {
  const content = servicePageContent[service.slug];
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="different" className={`${homeSectionSpacingClass} screen-line-top bg-surface-soft`}>
      <div ref={timelineRef}>
        <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-muted">How this is different</p>
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-3 max-w-3xl text-section text-ink"
        >
          {content.differentTitle}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-3 max-w-2xl text-copy text-body"
        >
          {content.differentLead}
        </TimelineContent>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {content.differentPoints.map((item, index) => (
            <TimelineContent
              key={item.title}
              as="article"
              animationNum={3 + index}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="rounded-2xl bg-canvas p-6 shadow-[0_12px_40px_-24px_rgba(17,17,17,0.45)]"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-sm font-semibold text-on-primary">
                {index + 1}
              </span>
              <h3 className="mt-4 text-title-sm text-ink">{item.title}</h3>
              <p className="mt-2 text-copy leading-relaxed text-muted">{item.body}</p>
            </TimelineContent>
          ))}
        </div>
      </div>
    </LandingSectionShell>
  );
}

function ServiceBenefits({ service }: { service: Service }) {
  const content = servicePageContent[service.slug];
  const timelineRef = useRef<HTMLDivElement>(null);
  const icons = benefitIcons[service.slug];

  return (
    <LandingSectionShell id="benefits" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <AccentLabel>Benefits</AccentLabel>
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 max-w-2xl text-section text-ink"
        >
          {content.benefitsTitle}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-3 max-w-2xl text-copy font-medium text-brand-accent"
        >
          {content.benefitsLead}
        </TimelineContent>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {content.benefits.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <TimelineContent
                key={item}
                as="div"
                animationNum={3 + index}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
              >
                <Icon className="h-6 w-6 text-brand-accent" strokeWidth={1.75} />
                <p className="mt-4 text-copy leading-relaxed text-ink">{item}</p>
              </TimelineContent>
            );
          })}
        </div>
      </div>
    </LandingSectionShell>
  );
}

function PaymentCheck({ children, onBlue }: { children: string; onBlue?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={
          onBlue
            ? "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/70 text-on-primary"
            : "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-accent text-brand-accent"
        }
      >
        <Check className="h-3 w-3" strokeWidth={2.5} />
      </span>
      <span className={onBlue ? "text-sm leading-relaxed text-on-primary" : "text-sm leading-relaxed text-body"}>{children}</span>
    </li>
  );
}

function ServicePayment({ service }: { service: Service }) {
  const content = servicePageContent[service.slug];
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="payment" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <AccentLabel>Payment</AccentLabel>
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 max-w-3xl text-section text-ink"
        >
          {content.paymentLead}
        </TimelineContent>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <TimelineContent
            as="article"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="h-full rounded-lg border border-hairline bg-canvas p-6 shadow-sm md:p-8"
          >
            <h3 className="text-title-sm text-ink md:text-xl">Before you pay</h3>
            <p className="mt-3 text-copy text-body">{content.paymentBody}</p>
            <p className="mt-6 text-copy text-body">
              Scope still unclear?{" "}
              <Link to={siteRoutes.contact} className="font-medium text-brand-accent hover:underline">
                Contact us
              </Link>{" "}
              before checkout.
            </p>
          </TimelineContent>
          <TimelineContent
            as="article"
            animationNum={3}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="flex h-full flex-col rounded-lg border border-hairline bg-brand-accent p-6 text-on-primary shadow-sm md:p-8"
          >
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-white/80">Selected for this service</p>
            <h3 className="mt-3 text-title-sm md:text-xl">{service.paymentPurpose}</h3>
            <ul className="mt-6 space-y-4">
              {content.paymentCovers.map((item) => (
                <PaymentCheck key={item} onBlue>
                  {item}
                </PaymentCheck>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <GgwButton href={checkoutPath(service.slug)} variant="secondary" className="h-11 w-fit px-5">
                Continue to checkout
                <ArrowRight className="h-4 w-4" />
              </GgwButton>
            </div>
          </TimelineContent>
        </div>
      </div>
    </LandingSectionShell>
  );
}

function ServiceFaq({ service }: { service: Service }) {
  const content = servicePageContent[service.slug];
  const timelineRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const others = services.filter((item) => item.slug !== service.slug);

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
            Questions about {service.name.toLowerCase()}
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
          {content.faqs.map((item, index) => {
            const open = openIndex === index;
            const last = index === content.faqs.length - 1;
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

      <div className="mt-14 border-t border-dashed border-hairline pt-10">
        <h3 className="text-title-sm text-ink">Other services</h3>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-6">
          {others.map((item, index) => (
            <li key={item.slug} className={index < 3 ? "md:col-span-2" : "md:col-span-3"}>
              <Link
                to={servicePath(item.slug)}
                className="group flex h-full items-center gap-4 rounded-xl border border-hairline bg-canvas p-4 shadow-[0_10px_28px_-20px_rgba(17,17,17,0.45)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgba(38,103,255,0.45)]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-surface-soft">
                  <img
                    src={assetSrc(illustrations[item.slug])}
                    alt=""
                    className="h-12 w-12 object-contain transition-transform duration-200 group-hover:scale-110"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-title-sm text-ink">{item.name}</span>
                  <span className="mt-1 block text-caption font-semibold uppercase tracking-[0.12em] text-brand-accent">
                    {item.paymentPurpose}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </LandingSectionShell>
  );
}

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <ServiceHero service={service} />
      <ServiceDetails service={service} />
      <ServiceDifference service={service} />
      <ServiceBenefits service={service} />
      <ServicePayment service={service} />
      <ServiceFaq service={service} />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
