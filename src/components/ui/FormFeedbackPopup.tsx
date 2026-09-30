"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import type { ReactNode } from "react";
import Portal from "@/components/ui/Portal";
import { ShinyButton, type ShinyButtonVariant } from "@/components/ui/shiny-button";
import { crosshatchBgStyle } from "@/config/constants/bootcampStyles";

const POPUP_TRANSITION = { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const };
const ICON_SPRING = {
  delay: 0.12,
  type: "spring" as const,
  stiffness: 260,
  damping: 18,
};

type FormFeedbackPopupProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonLabel: string;
  buttonVariant?: ShinyButtonVariant;
  icon: ReactNode;
  iconWrapperClassName: string;
  ariaLabel: string;
  role?: "dialog" | "alertdialog";
  titleId?: string;
  children?: ReactNode;
};

export function FormFeedbackPopup({
  open,
  onClose,
  title,
  message,
  buttonLabel,
  buttonVariant = "default",
  icon,
  iconWrapperClassName,
  ariaLabel,
  role = "dialog",
  titleId = "form-feedback-title",
  children,
}: FormFeedbackPopupProps) {
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label={ariaLabel}
              className="fixed inset-0 z-10060 cursor-default border-0 bg-background/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
            />
            <div className="pointer-events-none fixed inset-0 z-10061 flex items-center justify-center p-4">
              <motion.div
                role={role}
                aria-modal="true"
                aria-labelledby={titleId}
                className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl ring ring-neutral-200 ring-offset-4 md:ring-offset-8"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={POPUP_TRANSITION}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={crosshatchBgStyle}
                  aria-hidden
                />
                <div className="relative z-10 p-6 sm:p-8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-lg p-1.5 text-text-primary/70 transition-colors hover:bg-neutral-100 hover:text-text-primary"
                    aria-label="Close"
                  >
                    <IoClose className="h-5 w-5" />
                  </button>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={ICON_SPRING}
                    className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border ${iconWrapperClassName}`}
                  >
                    {icon}
                  </motion.div>

                  <motion.h2
                    id={titleId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mb-2 text-center text-xl font-inter-display font-semibold tracking-tight text-text-primary sm:text-2xl"
                  >
                    {title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.3 }}
                    className="text-center text-sm font-inter-display leading-relaxed text-text-primary/80 sm:text-base"
                  >
                    {message}
                  </motion.p>

                  {children && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.34, duration: 0.3 }}
                      className="mt-6 border-t border-dashed border-neutral-200 pt-6"
                    >
                      {children}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: children ? 0.4 : 0.36, duration: 0.3 }}
                    className="mt-6"
                  >
                    <ShinyButton
                      type="button"
                      variant={buttonVariant}
                      onClick={onClose}
                      className="w-full rounded-lg! font-inter-display! text-base font-medium shadow-lg! active:scale-95!"
                    >
                      {buttonLabel}
                    </ShinyButton>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
