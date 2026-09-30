"use client";

import { FaExclamationCircle } from "react-icons/fa";
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
  title = "Unable to Send Request",
  message,
  buttonLabel = "Try Again",
}: FormErrorPopupProps) {
  return (
    <FormFeedbackPopup
      open={open}
      onClose={onClose}
      title={title}
      message={message}
      buttonLabel={buttonLabel}
      buttonVariant="light"
      ariaLabel="Close error message"
      role="alertdialog"
      titleId="form-error-title"
      icon={<FaExclamationCircle className="h-9 w-9 text-amber-600" />}
      iconWrapperClassName="border-amber-200 bg-amber-50"
    />
  );
}
