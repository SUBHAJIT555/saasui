import { useCallback, useState } from "react";
import { submitFormData } from "@/lib/submitForm";

export const FORM_SUBMIT_FALLBACK_ERROR =
  "Something went wrong. Please try again.";

type SubmitOptions = {
  successMessage?: string;
  onSuccess?: () => void;
};

export function useFormSubmitFeedback() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetFeedback = useCallback(() => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
    setErrorMessage("");
    setSuccessMessage("");
  }, []);

  const beginSubmit = useCallback(() => {
    setShowErrorPopup(false);
    setErrorMessage("");
  }, []);

  const submitForm = useCallback(
    async (payload: Record<string, unknown>, options?: SubmitOptions) => {
      beginSubmit();

      try {
        const result = await submitFormData(payload);
        setSuccessMessage(options?.successMessage ?? result.message);
        setShowSuccessPopup(true);
        options?.onSuccess?.();
        return result;
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : FORM_SUBMIT_FALLBACK_ERROR,
        );
        setShowErrorPopup(true);
        throw error;
      }
    },
    [beginSubmit],
  );

  return {
    showSuccessPopup,
    setShowSuccessPopup,
    showErrorPopup,
    setShowErrorPopup,
    errorMessage,
    successMessage,
    resetFeedback,
    beginSubmit,
    submitForm,
  };
}
