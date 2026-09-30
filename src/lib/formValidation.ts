import { z } from "zod";

export const INDIAN_COUNTRY_CODE = "+91";

/** 10-digit Indian mobile: starts with 6, 7, 8, or 9 */
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const FORM_VALIDATION_MESSAGES = {
  emailRequired: "Email address is required",
  emailInvalid: "Please enter a valid email address",
  phoneRequired: "Mobile number is required",
  phoneInvalid: "Please enter a valid 10-digit Indian mobile number",
} as const;

export function sanitizeIndianMobileInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function isValidIndianMobile(value: string): boolean {
  return INDIAN_MOBILE_REGEX.test(sanitizeIndianMobileInput(value));
}

export function formatIndianMobileE164(value: string): string {
  return `${INDIAN_COUNTRY_CODE}${sanitizeIndianMobileInput(value)}`;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export const emailValidationRules = {
  required: FORM_VALIDATION_MESSAGES.emailRequired,
  pattern: {
    value: EMAIL_REGEX,
    message: FORM_VALIDATION_MESSAGES.emailInvalid,
  },
} as const;

export const indianMobileValidationRules = {
  required: FORM_VALIDATION_MESSAGES.phoneRequired,
  validate: (value: string) =>
    isValidIndianMobile(value) || FORM_VALIDATION_MESSAGES.phoneInvalid,
} as const;

export const optionalIndianMobileValidationRules = {
  validate: (value?: string) =>
    !value?.trim() || isValidIndianMobile(value) || FORM_VALIDATION_MESSAGES.phoneInvalid,
} as const;

export const zodIndianMobile = () =>
  z
    .string()
    .min(1, FORM_VALIDATION_MESSAGES.phoneRequired)
    .refine(isValidIndianMobile, FORM_VALIDATION_MESSAGES.phoneInvalid);

export const zodOptionalIndianMobile = () =>
  z
    .string()
    .optional()
    .refine(
      (value) => !value?.trim() || isValidIndianMobile(value),
      FORM_VALIDATION_MESSAGES.phoneInvalid,
    );

export const zodEmail = () =>
  z
    .string()
    .min(1, FORM_VALIDATION_MESSAGES.emailRequired)
    .refine(isValidEmail, FORM_VALIDATION_MESSAGES.emailInvalid);
