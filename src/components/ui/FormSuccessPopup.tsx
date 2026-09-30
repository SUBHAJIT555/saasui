"use client";

import { FaCheckCircle } from "react-icons/fa";
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
  title = "Message Sent Successfully",
  message,
  buttonLabel = "Got it",
  children,
}: FormSuccessPopupProps) {
  return (
    <FormFeedbackPopup
      open={open}
      onClose={onClose}
      title={title}
      message={message}
      buttonLabel={buttonLabel}
      buttonVariant="default"
      ariaLabel="Close success message"
      role="dialog"
      titleId="form-success-title"
      icon={<FaCheckCircle className="h-9 w-9 text-green-600" />}
      iconWrapperClassName="border-green-200 bg-green-50"
    >
      {children}
    </FormFeedbackPopup>
  );
}
