import { SITE_NAME } from "@/lib/siteMetadata";

export const FORM_FEEDBACK_COPY = {
  contact: {
    successTitle: "Message Sent Successfully",
    successMessage:
      "Thank you! We've received your message and will contact you soon.",
    errorTitle: "Unable to Send Message",
  },
  newsletter: {
    successTitle: "Subscribed Successfully",
    successMessage: `You're subscribed! We'll keep you updated with the latest from ${SITE_NAME}.`,
    errorTitle: "Subscription Failed",
  },
} as const;
