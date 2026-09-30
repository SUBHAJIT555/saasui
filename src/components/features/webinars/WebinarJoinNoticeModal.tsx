"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Portal from "@/components/ui/Portal";
import { CandyButton } from "@/components/ui/candy-button";
import {
  webinarScheduleContent,
  type WebinarSession,
} from "@/config/data/webinar-schedule";
import {
  formatWebinarCountdown,
  formatWebinarDate,
  formatWebinarTime,
  getWebinarJoinNoticeVariant,
  getWebinarMsUntilStart,
  splitWebinarTopic,
  type WebinarJoinNoticeVariant,
} from "@/lib/webinar-schedule-utils";

type WebinarJoinNoticeModalProps = {
  open: boolean;
  webinar: WebinarSession | null;
  onClose: () => void;
};

const panelTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

export function WebinarJoinNoticeModal({
  open,
  webinar,
  onClose,
}: WebinarJoinNoticeModalProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!open || !webinar?.joinUrl) return;

    setNow(Date.now());
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, [open, webinar]);

  if (!webinar) return null;

  const variant: WebinarJoinNoticeVariant = getWebinarJoinNoticeVariant(
    webinar,
    now,
  );
  const { main: webinarName } = splitWebinarTopic(webinar.topic);
  const countdown = formatWebinarCountdown(
    getWebinarMsUntilStart(webinar.scheduledAt, now),
  );
  const scheduledLabel = `${formatWebinarDate(webinar.scheduledAt)} · ${formatWebinarTime(webinar.scheduledAt)}`;

  const handleJoin = () => {
    if (!webinar.joinUrl) {
      onClose();
      return;
    }

    window.open(webinar.joinUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Portal>
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close webinar join notice"
              className="fixed inset-0 z-10060 cursor-default border-0 bg-background/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
            <div className="pointer-events-none fixed inset-0 z-10061 flex items-center justify-center p-4">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="webinar-join-notice-title"
                className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl"
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={panelTransition}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="border-b border-dashed border-zinc-200 px-5 py-4 pr-12">
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                    aria-label="Close"
                  >
                    <IoClose className="h-5 w-5" />
                  </button>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                    {webinarScheduleContent.joinWebinarLabel}
                  </p>
                  <h2
                    id="webinar-join-notice-title"
                    className="mt-2 text-base font-semibold leading-snug text-zinc-900 sm:text-lg"
                  >
                    {webinarName}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">{scheduledLabel}</p>
                </div>

                <div className="space-y-3 px-5 py-4">
                  {variant === "no-link" ? (
                    <>
                      <p className="text-sm leading-relaxed text-zinc-700">
                        {webinarScheduleContent.joinNoticeNoLinkBody1}
                      </p>
                      <p className="text-sm leading-relaxed text-zinc-700">
                        {webinarScheduleContent.joinNoticeNoLinkBody2}
                      </p>
                      <p className="text-sm font-medium leading-relaxed text-zinc-900">
                        {webinarScheduleContent.joinNoticeNoLinkBody3}
                      </p>
                    </>
                  ) : null}

                  {variant === "before-start" ? (
                    <>
                      <div className="rounded-lg border border-dotted border-[#C072E0]/40 bg-[#C072E0]/10 px-4 py-3 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9d4edd]">
                          {webinarScheduleContent.joinNoticeBeforeStartLead}
                        </p>
                        <p className="mt-1 font-sans text-2xl font-bold tracking-wide text-[#7c3aed]">
                          {countdown}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-700">
                        {webinarScheduleContent.joinNoticeBeforeStartBody1}
                      </p>
                      <p className="text-sm font-medium leading-relaxed text-zinc-900">
                        {webinarScheduleContent.joinNoticeBeforeStartBody2}
                      </p>
                    </>
                  ) : null}

                  {variant === "after-start" ? (
                    <>
                      <p className="text-sm font-semibold leading-relaxed text-zinc-900">
                        {webinarScheduleContent.joinNoticeAfterStartTitle}
                      </p>
                      <p className="text-sm leading-relaxed text-zinc-700">
                        {webinarScheduleContent.joinNoticeAfterStartBody}
                      </p>
                    </>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2 border-t border-dashed border-zinc-200 px-5 py-4 sm:flex-row">
                  <CandyButton
                    type="button"
                    variant="white"
                    onClick={onClose}
                    className="w-full rounded-lg! px-4! py-2.5! text-sm! shadow-none! active:rotate-0 sm:flex-1"
                  >
                    {webinarScheduleContent.joinNoticeCloseButton}
                  </CandyButton>
                  {variant !== "no-link" ? (
                    <CandyButton
                      type="button"
                      onClick={handleJoin}
                      className="w-full gap-2 rounded-lg! border-[#C072E0]! bg-[#C072E0]! px-4! py-2.5! text-sm! text-white shadow-none! active:rotate-0 sm:flex-1"
                    >
                      {webinarScheduleContent.joinWebinarLabel}
                    </CandyButton>
                  ) : null}
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
}
