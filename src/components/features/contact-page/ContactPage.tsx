"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Mail, MapPin, MessagesSquare } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel, GgwButton } from "@/components/ui/ggw-button";
import { EmailField } from "@/components/ui/EmailField";
import { IndianPhoneField } from "@/components/ui/IndianPhoneField";
import { FormSuccessPopup } from "@/components/ui/FormSuccessPopup";
import { FormErrorPopup } from "@/components/ui/FormErrorPopup";
import { useFormSubmitFeedback } from "@/hooks/useFormSubmitFeedback";
import { FORM_FEEDBACK_COPY } from "@/config/constants/formFeedbackCopy";
import { formatIndianMobileE164 } from "@/lib/formValidation";
import { CONTACT } from "@/config/constants/contactInfo";
import { WHATSAPP_URL } from "@/config/data/site-contact";
import { services } from "@/config/data/services";
import { siteRoutes } from "@/config/routes";
import { assetSrc } from "@/lib/utils";
import messagesImage from "@/assets/img/Home/undraw/work-emails_3qkc.svg";
import faqImage from "@/assets/img/Home/undraw/working-at-home_usrj.svg";
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

const HERO_SCENE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=80";

const inputBase =
  "w-full rounded-md border bg-canvas px-4 py-3 text-base text-ink placeholder:text-muted transition-colors focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20";
const inputError = "border-red-300 focus:border-red-500 focus:ring-red-500/20";
const inputNormal = "border-hairline";
const labelClass = "mb-2 block text-sm font-medium text-ink";
const errorClass = "mt-1 text-sm text-red-500";

type ContactFormData = {
  fullName: string;
  email: string;
  mobileNumber: string;
  service: string;
  message: string;
};

const nextSteps = [
  {
    title: "We read what you sent",
    body: "The service you named and the work you described are the starting point. A message without a service is still read.",
  },
  {
    title: "We reply with the scope",
    body: "The reply names what the work would cover and the payment purpose attached to that service.",
  },
  {
    title: "Nothing starts early",
    body: "Sending this form does not begin the work or create a charge. That happens only after the scope is agreed.",
  },
];

const faqItems = [
  {
    question: "Which service should I mention?",
    answer:
      "Name the one that matches the work: consultancy, administration, documentation, project support, billing, or customer communication. If you are not sure, choose “Not sure yet” and describe the work.",
  },
  {
    question: "Does sending the form start the work?",
    answer:
      "No. The form is a way to describe what you need. The scope and the payment purpose are agreed before anything is treated as started.",
  },
  {
    question: "Can I write about more than one service?",
    answer:
      "Yes. Pick the main one in the form and mention the others in the message. Each service still keeps its own scope.",
  },
  {
    question: "What email should I use?",
    answer: `Use the form, or write directly to ${CONTACT.educationEmail}. Include the service and a short description of the work.`,
  },
  {
    question: "Where is the office?",
    answer: CONTACT.officeAddressIndiaFull,
  },
  {
    question: "What should the message include?",
    answer:
      "The kind of work, what you want delivered, and any timing that matters. You do not need a finished scope. That is what the reply is for.",
  },
];

function ContactHero() {
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
        <img src={HERO_SCENE} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <TimelineContent
          as="h1"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="max-w-[22ch] text-balance text-hero text-ink md:max-w-[28ch]"
        >
          Tell us <span className="bg-brand-accent px-1.5 text-on-primary">the work you need</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-[56ch] text-pretty text-copy text-body"
        >
          Write with the service in mind. We reply with the scope and the payment purpose before any work starts.
        </TimelineContent>
        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <GgwButton href="#write" variant="accent" className="h-11 px-5">
            Write to us
            <ArrowRight className="h-4 w-4" />
          </GgwButton>
          <GgwButton href={siteRoutes.services} variant="secondary" className="h-11 px-5">
            View services
          </GgwButton>
        </TimelineContent>
      </div>
    </section>
  );
}

function ContactWrite() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    showSuccessPopup,
    setShowSuccessPopup,
    showErrorPopup,
    setShowErrorPopup,
    errorMessage,
    successMessage,
    submitForm,
  } = useFormSubmitFeedback();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitForm(
        {
          formType: "contact",
          fullName: data.fullName,
          email: data.email,
          mobileNumber: formatIndianMobileE164(data.mobileNumber),
          service: data.service,
          message: data.message,
          questionsOrGoals: `Service: ${data.service}\n\n${data.message}`,
        },
        { successMessage: FORM_FEEDBACK_COPY.contact.successMessage },
      );
      reset();
    } catch {
      // The error popup is handled by useFormSubmitFeedback.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LandingSectionShell id="write" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-0">
        <div className="lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>Write to us</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 max-w-md text-section text-ink"
          >
            A message is enough to begin
          </TimelineContent>
          <TimelineContent
            as="p"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 text-copy text-body"
          >
            Use the form, or reach the office directly. Include the service and a short description of the work.
          </TimelineContent>
          <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-8">
            <img
              src={assetSrc(messagesImage)}
              alt="Messages being prepared for a business"
              className="h-auto w-full max-w-70 object-contain"
            />
          </TimelineContent>
          <ul className="mt-8 border-t border-dashed border-hairline">
            <li className="flex gap-3 border-b border-dashed border-hairline py-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <a href={`mailto:${CONTACT.educationEmail}`} className="text-sm text-brand-accent hover:underline">
                  {CONTACT.educationEmail}
                </a>
              </div>
            </li>
            <li className="flex gap-3 border-b border-dashed border-hairline py-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-semibold text-ink">Office</p>
                {CONTACT.officeAddressIndia.map((line) => (
                  <p key={line} className="text-sm leading-relaxed text-body">
                    {line}
                  </p>
                ))}
              </div>
            </li>
            <li className="flex gap-3 border-b border-dashed border-hairline py-4">
              <MessagesSquare className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-semibold text-ink">WhatsApp</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-accent hover:underline">
                  Message on WhatsApp
                </a>
              </div>
            </li>
          </ul>
        </div>

        <TimelineContent
          as="div"
          animationNum={4}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="lg:border-l lg:border-dashed lg:border-hairline lg:pl-12"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className={labelClass} htmlFor="contact-name">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={`${inputBase} ${errors.fullName ? inputError : inputNormal}`}
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName ? <p className={errorClass}>{errors.fullName.message}</p> : null}
            </div>

            <EmailField
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              labelClassName={labelClass}
              inputClassName={`${inputBase} ${errors.email ? inputError : inputNormal}`}
              errorClassName={errorClass}
            />

            <IndianPhoneField
              label="Mobile number"
              name="mobileNumber"
              register={register}
              error={errors.mobileNumber}
              labelClassName={labelClass}
              inputClassName={`flex-1 ${inputBase} ${errors.mobileNumber ? inputError : inputNormal}`}
              prefixClassName={`shrink-0 rounded-md border bg-canvas px-4 py-3 text-base font-medium text-ink ${errors.mobileNumber ? inputError : inputNormal}`}
              errorClassName={errorClass}
            />

            <div>
              <label className={labelClass} htmlFor="contact-service">
                Service <span className="text-red-500">*</span>
              </label>
              <select
                id="contact-service"
                className={`${inputBase} ${errors.service ? inputError : inputNormal}`}
                {...register("service", { required: "Choose a service" })}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.name}>
                    {service.name}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet</option>
              </select>
              {errors.service ? <p className={errorClass}>{errors.service.message}</p> : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="contact-message">
                What do you need? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Describe the work, what you want delivered, and any timing that matters."
                className={`${inputBase} resize-y ${errors.message ? inputError : inputNormal}`}
                {...register("message", {
                  required: "Tell us what you need",
                  minLength: { value: 12, message: "Add a little more detail about the work" },
                })}
              />
              {errors.message ? <p className={errorClass}>{errors.message.message}</p> : null}
            </div>

            <GgwButton type="submit" variant="accent" disabled={isSubmitting} className="h-11 px-5">
              {isSubmitting ? "Sending…" : "Send message"}
            </GgwButton>
          </form>
        </TimelineContent>
      </div>

      <FormSuccessPopup
        open={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title={FORM_FEEDBACK_COPY.contact.successTitle}
        message={successMessage || FORM_FEEDBACK_COPY.contact.successMessage}
      />
      <FormErrorPopup
        open={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        title={FORM_FEEDBACK_COPY.contact.errorTitle}
        message={errorMessage}
      />
    </LandingSectionShell>
  );
}

function ContactNext() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="next" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(15rem,22rem)_minmax(0,1fr)] lg:gap-0">
        <div className="lg:border-r lg:border-dashed lg:border-hairline lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>After you write</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 text-section text-ink"
          >
            The reply comes before the work
          </TimelineContent>
        </div>
        <ol className="border-t border-dashed border-hairline lg:border-t-0 lg:pl-12">
          {nextSteps.map((item, index) => (
            <TimelineContent
              key={item.title}
              as="li"
              animationNum={2 + index}
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

function ContactFaq() {
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
            Questions about getting in touch
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

export default function ContactPage() {
  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <ContactHero />
      <ContactWrite />
      <ContactNext />
      <ContactFaq />
    </div>
  );
}
