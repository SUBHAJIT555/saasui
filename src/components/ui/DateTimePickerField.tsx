"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import type {
  Control,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { FormFeedbackPopup } from "@/components/ui/FormFeedbackPopup";
import "react-datepicker/dist/react-datepicker.css";
import type { HTMLAttributes, PropsWithChildren } from "react";

const BUSINESS_OPEN_HOUR = 11;
const BUSINESS_CLOSE_HOUR = 21;

const PAST_DATE_TIME_MESSAGE =
  "Please select a valid date and time. Past dates and times cannot be selected.";

const OFF_HOURS_MESSAGE =
  "Please select a valid date and time. Callbacks are available between 11:00 AM and 9:00 PM only.";

const INVALID_DATE_TIME_MESSAGE =
  "Please select a valid date and time. Choose a future slot between 11:00 AM and 9:00 PM.";

function DatePickerCalendarContainer({
  className,
  children,
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(className, "cyberlabs-datepicker-calendar")}
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
    >
      {children}
    </div>
  );
}

export const parseDateTimeLocal = (value?: string | null): Date | null => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDateTimeLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const isWithinBusinessHours = (date: Date): boolean => {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();
  return (
    totalMinutes >= BUSINESS_OPEN_HOUR * 60 &&
    totalMinutes <= BUSINESS_CLOSE_HOUR * 60
  );
};

export const isValidCallbackDateTime = (value?: string | Date | null): boolean => {
  if (!value) return false;
  const date = typeof value === "string" ? parseDateTimeLocal(value) : value;
  if (!date) return false;
  return date.getTime() >= Date.now() && isWithinBusinessHours(date);
};

/** @deprecated Use isValidCallbackDateTime instead. */
export const isFutureDateTime = isValidCallbackDateTime;

export const defaultDateTimeLocal = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(BUSINESS_OPEN_HOUR, 0, 0, 0);
  return formatDateTimeLocal(date);
};

const startOfDay = (date = new Date()) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const getBusinessOpenTime = (date: Date) => {
  const next = new Date(date);
  next.setHours(BUSINESS_OPEN_HOUR, 0, 0, 0);
  return next;
};

const getBusinessCloseTime = (date: Date) => {
  const next = new Date(date);
  next.setHours(BUSINESS_CLOSE_HOUR, 0, 0, 0);
  return next;
};

const getInvalidSelectionMessage = (date: Date) => {
  if (date.getTime() < Date.now()) {
    return PAST_DATE_TIME_MESSAGE;
  }

  if (!isWithinBusinessHours(date)) {
    return OFF_HOURS_MESSAGE;
  }

  return INVALID_DATE_TIME_MESSAGE;
};

const getTimeBounds = (selected: Date | null) => {
  const referenceDate = selected ?? new Date();
  const businessOpen = getBusinessOpenTime(referenceDate);
  const businessClose = getBusinessCloseTime(referenceDate);
  const now = new Date();

  if (selected && isSameDay(selected, now)) {
    return {
      minTime: now.getTime() > businessOpen.getTime() ? now : businessOpen,
      maxTime: businessClose,
    };
  }

  return {
    minTime: businessOpen,
    maxTime: businessClose,
  };
};

type DateTimeValidationPopupProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

function DateTimeValidationPopup({
  open,
  message,
  onClose,
}: DateTimeValidationPopupProps) {
  return (
    <FormFeedbackPopup
      open={open}
      onClose={onClose}
      title="Invalid Date & Time"
      message={message}
      buttonLabel="OK"
      buttonVariant="light"
      ariaLabel="Close invalid date and time message"
      role="alertdialog"
      titleId="datetime-validation-title"
      icon={<FaExclamationCircle className="h-9 w-9 text-amber-600" />}
      iconWrapperClassName="border-amber-200 bg-amber-50"
    />
  );
}

type DateTimePickerInputProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldId: string;
  error?: FieldError;
  inputClassName: string;
  popperClassName: string;
  placeholder: string;
  disabled: boolean;
  minDate: Date;
};

function DateTimePickerInput({
  field,
  fieldId,
  error,
  inputClassName,
  popperClassName,
  placeholder,
  disabled,
  minDate,
}: DateTimePickerInputProps) {
  const selected = parseDateTimeLocal(field.value as string | undefined);
  const { minTime, maxTime } = getTimeBounds(selected);
  const [invalidPopup, setInvalidPopup] = useState({ open: false, message: "" });
  const disabledClickCleanupRef = useRef<(() => void) | null>(null);

  const showInvalidPopup = useCallback((message: string) => {
    setInvalidPopup({ open: true, message });
  }, []);

  const closeInvalidPopup = useCallback(() => {
    setInvalidPopup({ open: false, message: "" });
  }, []);

  const attachDisabledClickHandlers = useCallback(() => {
    const poppers = document.querySelectorAll(".cyberlabs-datepicker-popper");

    const handleDisabledClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const disabledDay = target.closest(".react-datepicker__day--disabled");
      const disabledTime = target.closest(
        ".react-datepicker__time-list-item--disabled",
      );

      if (!disabledDay && !disabledTime) return;

      event.preventDefault();
      event.stopPropagation();

      if (disabledDay) {
        showInvalidPopup(PAST_DATE_TIME_MESSAGE);
        return;
      }

      const timeText = disabledTime?.textContent?.trim();
      if (timeText && selected) {
        const [hours, minutes] = timeText.split(":").map(Number);
        if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
          const attempt = new Date(selected);
          attempt.setHours(hours, minutes, 0, 0);
          showInvalidPopup(getInvalidSelectionMessage(attempt));
          return;
        }
      }

      showInvalidPopup(OFF_HOURS_MESSAGE);
    };

    poppers.forEach((popper) => {
      popper.addEventListener("click", handleDisabledClick, true);
    });

    return () => {
      poppers.forEach((popper) => {
        popper.removeEventListener("click", handleDisabledClick, true);
      });
    };
  }, [showInvalidPopup, selected?.getTime()]);

  useEffect(() => {
    if (!selected) return undefined;

    if (!isValidCallbackDateTime(selected)) {
      field.onChange("");
      return undefined;
    }

    const interval = window.setInterval(() => {
      if (!isValidCallbackDateTime(selected)) {
        field.onChange("");
      }
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [field, selected?.getTime()]);

  useEffect(
    () => () => {
      disabledClickCleanupRef.current?.();
    },
    [],
  );

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      field.onChange("");
      return;
    }

    if (!isValidCallbackDateTime(date)) {
      showInvalidPopup(getInvalidSelectionMessage(date));
      return;
    }

    field.onChange(formatDateTimeLocal(date));
  };

  return (
    <>
      <DatePicker
        id={fieldId}
        selected={selected}
        onChange={handleDateChange}
        onBlur={field.onBlur}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={minDate}
        minTime={minTime}
        maxTime={maxTime}
        filterTime={(time) => isValidCallbackDateTime(time)}
        disabled={disabled}
        placeholderText={placeholder}
        className={cn(
          "cyberlabs-datepicker w-full cursor-pointer rounded-lg border bg-background px-3 py-2 text-sm text-text-primary transition-colors focus:outline-none focus:ring focus:ring-neutral-400 focus:ring-offset-2 sm:px-4 sm:py-3 sm:text-base md:focus-ring-offset-4",
          error ? "border-red-400" : "border-neutral-300 focus:border-neutral-400",
          inputClassName,
        )}
        popperClassName={cn("cyberlabs-datepicker-popper", popperClassName)}
        wrapperClassName="w-full"
        calendarContainer={DatePickerCalendarContainer}
        onCalendarOpen={() => {
          requestAnimationFrame(() => {
            document
              .querySelectorAll(".cyberlabs-datepicker-popper")
              .forEach((node) => {
                node.setAttribute("data-lenis-prevent", "");
                node.setAttribute("data-lenis-prevent-wheel", "");
                node.setAttribute("data-lenis-prevent-touch", "");
              });

            disabledClickCleanupRef.current?.();
            disabledClickCleanupRef.current = attachDisabledClickHandlers();
          });
        }}
        onCalendarClose={() => {
          disabledClickCleanupRef.current?.();
          disabledClickCleanupRef.current = null;
        }}
      />

      <DateTimeValidationPopup
        open={invalidPopup.open}
        message={invalidPopup.message}
        onClose={closeInvalidPopup}
      />
    </>
  );
}

type DateTimePickerFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
  id?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  popperClassName?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function DateTimePickerField<T extends FieldValues>({
  label,
  name,
  control,
  rules,
  error,
  id,
  labelClassName = "block text-text-primary text-sm font-medium font-inter-display mb-2",
  inputClassName = "",
  errorClassName = "mt-1 text-sm text-red-500 font-inter-display",
  popperClassName = "",
  placeholder = "Select date and time",
  disabled = false,
}: DateTimePickerFieldProps<T>) {
  const minDate = useMemo(() => startOfDay(), []);
  const fieldId = id ?? String(name);

  const mergedRules = useMemo<RegisterOptions<T, Path<T>>>(
    () => ({
      ...rules,
      validate: (value, formValues) => {
        if (value && !isValidCallbackDateTime(value as string)) {
          return INVALID_DATE_TIME_MESSAGE;
        }

        if (!rules?.validate) return true;

        if (typeof rules.validate === "function") {
          return rules.validate(value, formValues);
        }

        return true;
      },
    }),
    [rules],
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={mergedRules}
      render={({ field }) => (
        <div>
          <label htmlFor={fieldId} className={labelClassName}>
            {label} <span className="text-red-500">*</span>
          </label>
          <DateTimePickerInput
            field={field as ControllerRenderProps<FieldValues, string>}
            fieldId={fieldId}
            error={error}
            inputClassName={inputClassName}
            popperClassName={popperClassName}
            placeholder={placeholder}
            disabled={disabled}
            minDate={minDate}
          />
          <p className="mt-1.5 text-xs text-zinc-500">
            Available callback hours: 11:00 AM to 9:00 PM.
          </p>
          {error ? <p className={errorClassName}>{error.message}</p> : null}
        </div>
      )}
    />
  );
}
