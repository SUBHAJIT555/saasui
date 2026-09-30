"use client";

import { WebinarRegistrationProvider } from "@/providers/webinar-registration";
import { HeroSection } from "@/components/features/webinars/sections/HeroSection";
import { WebinarInsightsSection } from "@/components/features/webinars/sections/WebinarInsightsSection";
import { WebinarScheduleSection } from "@/components/features/webinars/sections/WebinarScheduleSection";
import { WhyAttendSection } from "@/components/features/webinars/sections/WhyAttendSection";
import { LearnFromProsSection } from "@/components/features/webinars/sections/LearnFromProsSection";
import { CareerBenefitsSection } from "@/components/features/webinars/sections/CareerBenefitsSection";
import { WebinarTopicsSection } from "@/components/features/webinars/sections/WebinarTopicsSection";
import { WhoShouldAttendSection } from "@/components/features/webinars/sections/WhoShouldAttendSection";
import { WhyCyberlabsSection } from "@/components/features/webinars/sections/WhyCyberlabsSection";
import { WhyChooseCTASection } from "@/components/features/webinars/sections/CTASection";

const CyberlabsWebinars = () => {
  return (
    <WebinarRegistrationProvider>
      <div className="relative z-10">
        <HeroSection />
        <WebinarInsightsSection />
        <WebinarScheduleSection />
        <WhyAttendSection />
        <LearnFromProsSection />
        <CareerBenefitsSection />
        <WebinarTopicsSection />
        <WhoShouldAttendSection />
        <WhyCyberlabsSection />
        <WhyChooseCTASection />
      </div>
    </WebinarRegistrationProvider>
  );
};

export default CyberlabsWebinars;
