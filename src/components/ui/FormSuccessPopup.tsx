"use client";

import type { ReactNode } from "react";
import { FormFeedbackPopup } from "@/components/ui/FormFeedbackPopup";

type FormSuccessPopupProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonLabel?: string;
  children?: ReactNode;
};

export function FormSuccessPopup({
  open,
  onClose,
  title = "Message sent",
  message,
  buttonLabel = "Got it",
  children,
}: FormSuccessPopupProps) {
  return (
    <FormFeedbackPopup
      open={open}
      onClose={onClose}
      tone="success"
      title={title}
      message={message}
      buttonLabel={buttonLabel}
      ariaLabel="Close success message"
      role="dialog"
      titleId="form-success-title"
    >
      {children}
    </FormFeedbackPopup>
  );
}
