"use client";

import { useRef } from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { CONTACT } from "@/config/constants/contactInfo";
import Shuffle from "@/components/ui/Shuffle";
import { YouTubeIcon } from "@/components/ui/YouTubeIcon";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  SectionEyebrow,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cyberlabs-india/posts/?feedView=all",
    icon: FaLinkedinIn,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cyberlabsindia",
    icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@cyberlabsindiabycyveritas-y7h",
    icon: YouTubeIcon,
    isYouTube: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/971504602632",
    icon: FaWhatsapp,
  },
] as const;

function ContactShuffleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Shuffle
      text={text}
      tag="span"
      textAlign="left"
      className={cn("block text-sm font-medium sm:text-base", className)}
      triggerOnHover={true}
      hoverTarget="parent-group"
      triggerOnce={true}
      shuffleDirection="right"
      duration={0.28}
      stagger={0.02}
    />
  );
}

const ContactCompanyInfo = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef} className="mx-auto w-full max-w-5xl">
        <TimelineContent
          as="div"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text="CYBERLABS INDIA"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base"
        >
          (A division of {CONTACT.registeredEntity})
        </TimelineContent>

        <LandingBento className="mt-8 border-y border-zinc-200">
          <LandingBentoRow>
            <LandingBentoCell>
              <TimelineContent
                as="div"
                animationNum={2}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="space-y-6"
              >
                <div>
                  <SectionEyebrow>Registered Entity</SectionEyebrow>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                    {CONTACT.registeredEntity}
                  </p>
                </div>
                <div>
                  <SectionEyebrow>Office Address</SectionEyebrow>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                    {CONTACT.officeAddressIndia.map((line, index) => (
                      <span key={line}>
                        {line}
                        {index < CONTACT.officeAddressIndia.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell>
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="space-y-6"
              >
                <div className="flex flex-col items-start">
                  <SectionEyebrow>Email</SectionEyebrow>
                  <a
                    href={`mailto:${CONTACT.educationEmail}`}
                    className="group mt-3 block w-full break-all text-blue-600"
                  >
                    <ContactShuffleText text={CONTACT.educationEmail} />
                  </a>
                </div>
                <div>
                  <SectionEyebrow>Social Media</SectionEyebrow>
                  <div className="mt-4 flex flex-col gap-3">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 text-zinc-800"
                        >
                          {"isYouTube" in link && link.isYouTube ? (
                            <YouTubeIcon className="h-5 w-5 shrink-0 text-blue-600" />
                          ) : (
                            <Icon className="h-5 w-5 shrink-0 text-blue-600" />
                          )}
                          <ContactShuffleText text={link.label} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default ContactCompanyInfo;
