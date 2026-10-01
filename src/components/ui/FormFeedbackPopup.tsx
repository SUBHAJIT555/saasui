"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, TriangleAlert, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import Portal from "@/components/ui/Portal";
import { GgwButton } from "@/components/ui/ggw-button";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

const PANEL_TRANSITION = { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const };
const ICON_SPRING = { delay: 0.08, type: "spring" as const, stiffness: 280, damping: 20 };

export type FeedbackTone = "success" | "error";

const toneStyles: Record<FeedbackTone, { tile: string; icon: ReactNode }> = {
  success: {
    tile: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    icon: <Check className="h-6 w-6" strokeWidth={2.75} />,
  },
  error: {
    tile: "bg-amber-50 text-amber-600 ring-amber-100",
    icon: <TriangleAlert className="h-5.5 w-5.5" strokeWidth={2.25} />,
  },
};

type FormFeedbackPopupProps = {
  open: boolean;
  onClose: () => void;
  tone: FeedbackTone;
  title: string;
  message: string;
  buttonLabel: string;
  ariaLabel: string;
  role?: "dialog" | "alertdialog";
  titleId?: string;
  children?: ReactNode;
};

export function FormFeedbackPopup({
  open,
  onClose,
  tone,
  title,
  message,
  buttonLabel,
  ariaLabel,
  role = "dialog",
  titleId = "form-feedback-title",
  children,
}: FormFeedbackPopupProps) {
  const lenis = useLenis();
  const actionRef = useRef<HTMLButtonElement>(null);

  // Lenis owns scrolling, so pausing it is what actually freezes the page behind
  // the dialog; overflow:hidden on body alone does nothing here.
  useEffect(() => {
    if (!open) return;

    lenis?.stop();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => actionRef.current?.focus(), 120);

    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose, lenis]);

  const { tile, icon } = toneStyles[tone];

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-label={ariaLabel}
              className="fixed inset-0 z-10060 cursor-default border-0 bg-ink/40 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
            <div className="pointer-events-none fixed inset-0 z-10061 flex items-center justify-center p-4">
              <motion.div
                role={role}
                aria-modal="true"
                aria-labelledby={titleId}
                className={cn(
                  "pointer-events-auto relative w-full max-w-100 overflow-hidden",
                  "rounded-3xl border border-hairline bg-canvas",
                  "shadow-[0_32px_64px_-28px_rgba(17,17,17,0.3)]",
                )}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={PANEL_TRANSITION}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-surface-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30"
                >
                  <X className="h-4 w-4" strokeWidth={2.25} />
                </button>

                <div className="px-6 pb-6 pt-8 text-center sm:px-7 sm:pb-7">
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={ICON_SPRING}
                    className={cn(
                      "mx-auto flex h-13 w-13 items-center justify-center rounded-2xl ring-1",
                      tile,
                    )}
                  >
                    {icon}
                  </motion.span>

                  <motion.h2
                    id={titleId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14, duration: 0.26 }}
                    className="mt-5 text-section text-ink"
                  >
                    {title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.26 }}
                    className="mt-2 text-copy text-muted"
                  >
                    {message}
                  </motion.p>

                  {children ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.26, duration: 0.26 }}
                      className="mt-5 rounded-2xl bg-surface-soft p-4 text-left"
                    >
                      {children}
                    </motion.div>
                  ) : null}

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: children ? 0.32 : 0.26, duration: 0.26 }}
                  >
                    <GgwButton
                      ref={actionRef}
                      type="button"
                      variant="accent"
                      onClick={onClose}
                      className="mt-6 w-full"
                    >
                      {buttonLabel}
                    </GgwButton>
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
