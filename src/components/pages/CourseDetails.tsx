"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "@/lib/react-router";
import ProgramHero from "@/components/ui/ProgramDeatailHero";
import WhatsNew from "@/components/ui/WhatsNew";
import ModuleExplained from "@/components/ui/ModuleExplained";
import CallbackModal from "@/components/modals/CallbackModal";
import EnrollmentModal from "@/components/modals/EnrollmentModal";
import ModuleChart from "@/components/features/programs/ModuleChart";
import CareerOpertunity from "@/components/features/programs/CareerOpertunity";
import LaymanStory from "@/components/features/programs/LaymanStory";
import ProgramTeaches from "@/components/features/programs/ProgramTeaches";
import ProgramDetailHero from "@/components/features/programs/ProgramDetailHero";
import BootcampModuleChart from "@/components/features/bootcamp/BootcampModuleChart";
import BootcampDeepDive from "@/components/features/bootcamp/BootcampDeepDive";
import BootcampProgramTeaches from "@/components/features/bootcamp/BootcampProgramTeaches";
import BootcampLaymanStory from "@/components/features/bootcamp/BootcampLaymanStory";
import BootcampCareerOpportunity from "@/components/features/bootcamp/BootcampCareerOpportunity";
import BootcampWhatsNew from "@/components/features/bootcamp/BootcampWhatsNew";
import { CandyButton } from "@/components/ui/candy-button";
import FloatingBackButton from "@/components/ui/FloatingBackButton";
import Portal from "@/components/ui/Portal";
import { useLenis } from "@/hooks/useLenis";
import { useCourses } from "@/hooks/useCourses";
import { useFloatingBottomBar } from "@/providers/FloatingBottomBarContext";
import { useFooterVisibility } from "@/hooks/useFooterVisibility";

const sectionDivider = (
  <div
    className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-t border-dashed border-zinc-200"
    aria-hidden
  />
);

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const lenis = useLenis();
  const { getCourseBySlug, getCourseDetailBySlug } = useCourses();
  const course = slug ? getCourseBySlug(slug) : undefined;
  const hasBootcampLayout = slug ? Boolean(getCourseDetailBySlug(slug)) : false;

  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const isFooterVisible = useFooterVisibility();
  const { setIsActive: setFloatingBottomBarActive } = useFloatingBottomBar();

  useEffect(() => {
    if (slug && !course) {
      navigate("/cyber-defense-programs#flagship-programs", { replace: true });
    }
  }, [slug, course, navigate]);

  useEffect(() => {
    if (!lenis) {
      setShowBackButton(false);
      setShowFloatingButton(false);
      return;
    }

    const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    const scrollThreshold = viewportHeight;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      const show = scroll > scrollThreshold && !isFooterVisible;
      setShowBackButton(show);
      setShowFloatingButton(show);
    };

    handleScroll({ scroll: lenis.scroll || 0 });
    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis, isFooterVisible]);

  useEffect(() => {
    setFloatingBottomBarActive(showFloatingButton);
    return () => setFloatingBottomBarActive(false);
  }, [showFloatingButton, setFloatingBottomBarActive]);

  if (!course) return null;

  return (
    <>
      <div className="relative z-10">
        {hasBootcampLayout ? (
          <>
            <ProgramDetailHero onEnroll={() => setIsEnrollmentModalOpen(true)} />
            <BootcampModuleChart />
            {sectionDivider}
            <BootcampDeepDive />
            {sectionDivider}
            <BootcampProgramTeaches />
            {sectionDivider}
            <BootcampLaymanStory />
            {sectionDivider}
            <BootcampCareerOpportunity />
            {sectionDivider}
            <BootcampWhatsNew />
          </>
        ) : (
          <>
            <ProgramHero onEnroll={() => setIsEnrollmentModalOpen(true)} />
            <ModuleChart />
            {sectionDivider}
            <ModuleExplained />
            {sectionDivider}
            <ProgramTeaches />
            {sectionDivider}
            <LaymanStory />
            {sectionDivider}
            <CareerOpertunity />
            {sectionDivider}
            <WhatsNew />
          </>
        )}

        <Portal>
          <AnimatePresence>
            {showFloatingButton && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-4 left-1/2 z-9999 flex w-[calc(100%-2rem)] max-w-[95vw] -translate-x-1/2 transform flex-row items-center gap-3 rounded-xl border border-zinc-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm sm:bottom-6 sm:w-auto sm:min-w-[400px] sm:max-w-[600px]"
              >
                <CandyButton
                  type="button"
                  onClick={() => setIsEnrollmentModalOpen(true)}
                  className="min-w-0 flex-1 rounded-lg! border-zinc-800 bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)] px-4 py-2.5 font-montserrat! text-xs font-semibold whitespace-nowrap sm:text-sm"
                >
                  Enroll Now
                </CandyButton>
                <CandyButton
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="min-w-0 flex-1 rounded-lg! border-zinc-400 bg-[radial-gradient(95%_60%_at_50%_75%,#52525b_0%,#71717a_100%)] px-4 py-2.5 font-inter-display! text-xs font-medium whitespace-nowrap sm:text-sm"
                >
                  Request Callback
                </CandyButton>
              </motion.div>
            )}
          </AnimatePresence>

          <FloatingBackButton
            isVisible={showBackButton}
            onClick={() => navigate(-1)}
          />
        </Portal>

        <CallbackModal
          isOpen={isCallbackModalOpen}
          onClose={() => setIsCallbackModalOpen(false)}
          programSlug={slug}
        />

        {slug && (
          <EnrollmentModal
            isOpen={isEnrollmentModalOpen}
            onClose={() => setIsEnrollmentModalOpen(false)}
            slug={slug}
          />
        )}
      </div>
    </>
  );
};

export default CourseDetails;
