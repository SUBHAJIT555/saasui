"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CourseCard from "@/components/features/programs/CourseCardCatagories1";
import Certification from "@/components/features/home/LevelUp";
import PerformanceTranscript from "@/components/features/certification/PerformanceTranscript";
import ProgramPageOpening from "@/components/features/programs/ProgramPageOpening";
import IndustryRecognition from "@/components/features/certification/IndustryRecognition";
import ProgramHero from "@/components/features/programs/ProgramHero";
import ElitBootcamp from "@/components/features/bootcamp/ElitBootcamp";
import CallbackModal from "@/components/modals/CallbackModal";
import Portal from "@/components/ui/Portal";
import { FloatingRequestCallbackButton } from "@/components/ui/FloatingRequestCallbackButton";
import { useLenis } from "@/hooks/useLenis";
import { useFooterVisibility } from "@/hooks/useFooterVisibility";
import { useFloatingBottomBar } from "@/providers/FloatingBottomBarContext";


const Programs = () => {
  const lenis = useLenis();
  const isFooterVisible = useFooterVisibility();
  const { setIsActive: setFloatingBottomBarActive } = useFloatingBottomBar();
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  useEffect(() => {
    const updateVisibility = (scroll: number) => {
      const bootcampSection = document.getElementById("elite-bootcamps");
      const flagshipSection = document.getElementById("flagship-programs");
      if (!bootcampSection || !flagshipSection) {
        setShowFloatingButton(false);
        return;
      }

      const bootcampRect = bootcampSection.getBoundingClientRect();
      const flagshipRect = flagshipSection.getBoundingClientRect();
      const sectionTop = bootcampRect.top + scroll;
      const sectionBottom = flagshipRect.bottom + scroll;

      const inProgramsZone =
        scroll >= sectionTop - 120 &&
        scroll <= sectionBottom - 120 &&
        scroll > 100;

      setShowFloatingButton(inProgramsZone && !isFooterVisible);
    };

    if (!lenis) {
      const onWindowScroll = () => updateVisibility(window.scrollY);
      onWindowScroll();
      window.addEventListener("scroll", onWindowScroll, { passive: true });
      window.addEventListener("resize", onWindowScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onWindowScroll);
        window.removeEventListener("resize", onWindowScroll);
      };
    }

    const handleScroll = ({ scroll }: { scroll: number }) => {
      updateVisibility(scroll);
    };

    const onResize = () => handleScroll({ scroll: lenis.scroll || 0 });

    handleScroll({ scroll: lenis.scroll || 0 });
    lenis.on("scroll", handleScroll);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      lenis.off("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [lenis, isFooterVisible]);

  useEffect(() => {
    setFloatingBottomBarActive(showFloatingButton);
    return () => setFloatingBottomBarActive(false);
  }, [showFloatingButton, setFloatingBottomBarActive]);

  return (
    <div className="relative z-10">
      <ProgramHero />
      <ProgramPageOpening />
      <ElitBootcamp />
      <CourseCard />
      <Certification />
      <PerformanceTranscript />
      <IndustryRecognition />

      <Portal>
        <AnimatePresence>
          {showFloatingButton && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-4 left-1/2 z-9999 -translate-x-1/2 sm:bottom-6"
            >
              <FloatingRequestCallbackButton
                onClick={() => setIsCallbackModalOpen(true)}
                className="max-w-[calc(100vw-2rem)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </div>
  );
};

export default Programs;
