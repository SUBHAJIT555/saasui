export const FORM_FEEDBACK_COPY = {
  contact: {
    successTitle: "Message Sent Successfully",
    successMessage:
      "Thank you! We've received your message and will contact you soon.",
    errorTitle: "Unable to Send Message",
  },
  requestCallback: {
    successTitle: "Request Sent Successfully",
    successMessage:
      "Thank you! Our admissions team will review your request and contact you within one business day.",
    errorTitle: "Unable to Send Request",
  },
  callbackModal: {
    successTitle: "Callback Request Sent",
    successMessage: "Thank you! We will call you at the requested time.",
    errorTitle: "Request Not Sent",
  },
  newsletter: {
    successTitle: "Subscribed Successfully",
    successMessage:
      "You're subscribed! We'll keep you updated with the latest from CYBERLABS.",
    errorTitle: "Subscription Failed",
  },
  enrollment: {
    successTitle: "Enrollment Request Sent",
    successMessage:
      "Thank you! We've received your enrollment request and will contact you soon.",
    errorTitle: "Enrollment Not Sent",
  },
  bootcampEnrollment: {
    successTitle: "Bootcamp Enrollment Sent",
    successMessage:
      "Thank you! We've received your bootcamp enrollment request and will contact you soon.",
    errorTitle: "Enrollment Not Sent",
  },
} as const;

export function getCheckoutFeedbackCopy(formType: string) {
  return formType === "bootcamp-enrollment"
    ? FORM_FEEDBACK_COPY.bootcampEnrollment
    : FORM_FEEDBACK_COPY.enrollment;
}
