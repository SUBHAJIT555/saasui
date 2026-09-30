/**
 * Mail API endpoint (mail.php). Used by newsletter, contact, request-callback, and callback-modal forms.
 */
export const MAIL_API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/submit.php`;
