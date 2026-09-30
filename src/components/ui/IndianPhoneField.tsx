"use client";

import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import {
  FORM_VALIDATION_MESSAGES,
  INDIAN_COUNTRY_CODE,
  indianMobileValidationRules,
  optionalIndianMobileValidationRules,
  sanitizeIndianMobileInput,
} from "@/lib/formValidation";

type IndianPhoneFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  rules?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  placeholder?: string;
  showHint?: boolean;
  showFlag?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
  prefixClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
};

export function IndianPhoneField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  rules,
  required = true,
  placeholder = "9876543210",
  showHint = true,
  showFlag = false,
  labelClassName = "block text-text-primary text-sm sm:text-base font-medium font-inter-display mb-2",
  wrapperClassName = "flex gap-2",
  prefixClassName = "shrink-0 inline-flex items-center px-3 sm:px-4 py-3 rounded-lg border border-neutral-200 bg-white/95 text-text-primary font-inter-display font-medium text-base",
  inputClassName = "w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white/95 text-text-primary placeholder:text-neutral-400 font-inter-display text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
  errorClassName = "mt-1 text-sm text-red-500 font-inter-display",
  hintClassName = "mt-1 text-xs text-text-primary/60 font-inter-display",
}: IndianPhoneFieldProps<T>) {
  const baseRules = required
    ? indianMobileValidationRules
    : optionalIndianMobileValidationRules;

  const registration = register(name, {
    ...baseRules,
    ...rules,
  } as RegisterOptions<T, Path<T>>);

  return (
    <div>
      <label className={labelClassName}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={wrapperClassName}>
        <span className={prefixClassName}>
          {showFlag ? `🇮🇳 ${INDIAN_COUNTRY_CODE}` : INDIAN_COUNTRY_CODE}
        </span>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder={placeholder}
          maxLength={10}
          className={inputClassName}
          aria-invalid={error ? "true" : "false"}
          {...registration}
          onChange={(event) => {
            event.target.value = sanitizeIndianMobileInput(event.target.value);
            registration.onChange(event);
          }}
        />
      </div>
      {showHint && required && (
        <p className={hintClassName}>
          Indian mobile numbers only (10 digits, starting with 6–9)
        </p>
      )}
      {error && (
        <p className={errorClassName} role="alert">
          {error.message ?? FORM_VALIDATION_MESSAGES.phoneInvalid}
        </p>
      )}
    </div>
  );
}
