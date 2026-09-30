"use client";

import { useState } from "react";
import { CandyButton } from "@/components/ui/candy-button";
import {
  webinarScheduleContent,
  type WebinarSession,
} from "@/config/data/webinar-schedule";
import { cn } from "@/lib/utils";
import { WebinarJoinNoticeModal } from "@/components/features/webinars/WebinarJoinNoticeModal";

type WebinarJoinButtonProps = {
  webinar: WebinarSession;
  className?: string;
};

function JoinWebinarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
      <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
    </svg>
  );
}

export function WebinarJoinButton({ webinar, className }: WebinarJoinButtonProps) {
  const [open, setOpen] = useState(false);
  const hasLink = Boolean(webinar.joinUrl);

  return (
    <>
      <CandyButton
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        className={cn(
          "w-full gap-2 rounded-lg! border-[#C072E0]! bg-[#C072E0]! px-3! py-2.5! text-sm! text-white shadow-none! active:rotate-0",
          hasLink ? "after:via-white/40" : "opacity-45",
          className,
        )}
      >
        <JoinWebinarIcon />
        {webinarScheduleContent.joinWebinarLabel}
      </CandyButton>

      <WebinarJoinNoticeModal
        open={open}
        webinar={webinar}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
