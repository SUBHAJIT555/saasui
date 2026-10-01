"use client";

import { FormFeedbackPopup } from "@/components/ui/FormFeedbackPopup";

type FormErrorPopupProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonLabel?: string;
};

export function FormErrorPopup({
  open,
  onClose,
  title = "Could not send",
  message,
  buttonLabel = "Try again",
}: FormErrorPopupProps) {
  return (
    <FormFeedbackPopup
      open={open}
      onClose={onClose}
      tone="error"
      title={title}
      message={message}
      buttonLabel={buttonLabel}
      ariaLabel="Close error message"
      role="alertdialog"
      titleId="form-error-title"
    />
  );
}
