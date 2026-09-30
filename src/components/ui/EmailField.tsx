"use client";

import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { emailValidationRules } from "@/lib/formValidation";

type EmailFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  rules?: RegisterOptions<T, Path<T>>;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
};

export function EmailField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  rules,
  placeholder = "Enter your email address",
  labelClassName = "block text-text-primary text-sm sm:text-base font-medium font-inter-display mb-2",
  inputClassName = "w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white/95 text-text-primary placeholder:text-neutral-400 font-inter-display text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
  errorClassName = "mt-1 text-sm text-red-500 font-inter-display",
}: EmailFieldProps<T>) {
  return (
    <div>
      <label className={labelClassName}>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={placeholder}
        className={inputClassName}
        aria-invalid={error ? "true" : "false"}
        {...register(name, {
          ...emailValidationRules,
          ...rules,
        } as RegisterOptions<T, Path<T>>)}
      />
      {error && (
        <p className={errorClassName} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
