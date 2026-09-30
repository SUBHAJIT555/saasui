import { MAIL_API_URL } from "@/lib/api";

type SubmitFormResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

const SERVICE_UNAVAILABLE_MESSAGE =
  "We couldn't reach our form service right now. Please try again shortly, or contact us by email.";

const NETWORK_ERROR_MESSAGE =
  "Something went wrong while sending your request. Please check your connection and try again.";

const DEFAULT_FAILURE_MESSAGE =
  "We couldn't send your request. Please try again.";

export async function submitFormData(
  payload: Record<string, unknown>,
): Promise<{ message: string }> {
  let response: Response;

  try {
    response = await fetch(MAIL_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }

  const raw = await response.text();
  let result: SubmitFormResponse | null = null;

  if (raw.trim()) {
    try {
      result = JSON.parse(raw) as SubmitFormResponse;
    } catch {
      throw new Error(SERVICE_UNAVAILABLE_MESSAGE);
    }
  } else if (!response.ok) {
    throw new Error(SERVICE_UNAVAILABLE_MESSAGE);
  }

  if (!response.ok) {
    throw new Error(result?.error ?? DEFAULT_FAILURE_MESSAGE);
  }

  return {
    message: result?.message ?? "Message sent successfully.",
  };
}
