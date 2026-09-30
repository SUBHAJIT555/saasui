
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "@/components/ui/Portal";
import { useCourses } from "@/hooks/useCourses";
import { useBootcamps } from "@/hooks/useBootcamps";
import type { Course } from "@/types/program";
import { crosshatchBgStyle } from "@/config/constants/bootcampStyles";
import { CandyButton } from "@/components/ui/candy-button";
import BootcampPriceBlock from "@/components/ui/BootcampPriceBlock";
import {
  DateTimePickerField,
  defaultDateTimeLocal,
} from "@/components/ui/DateTimePickerField";
import { EmailField } from "@/components/ui/EmailField";
import { IndianPhoneField } from "@/components/ui/IndianPhoneField";
import { FormSuccessPopup } from "@/components/ui/FormSuccessPopup";
import { FormErrorPopup } from "@/components/ui/FormErrorPopup";
import { useFormSubmitFeedback } from "@/hooks/useFormSubmitFeedback";
import { FORM_FEEDBACK_COPY } from "@/config/constants/formFeedbackCopy";
import { formatIndianMobileE164 } from "@/lib/formValidation";
import { useLenis } from "@/hooks/useLenis";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  programSlug?: string;
  bootcampSlug?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  callbackTime: string;
  enquiryFor: string;
  bootCampOfInterest: string;
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const validateProgramOrBootCamp = (_value: string, formValues: FormData): true | string => {
  const hasProgram = Boolean(formValues.enquiryFor);
  const hasBootcamp = Boolean(formValues.bootCampOfInterest);
  if (!hasProgram && !hasBootcamp) {
    return "Please select at least one program or boot camp";
  }
  return true;
};

const defaultCallbackTime = defaultDateTimeLocal;

const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  programSlug,
  bootcampSlug,
}) => {
  const { getCourses, getCourseBySlug } = useCourses();
  const { getBootcamps, getBootcampBySlug } = useBootcamps();
  const allCourses = useMemo(() => getCourses() as unknown as Course[], [getCourses]);
  const allBootcamps = useMemo(() => getBootcamps(), [getBootcamps]);
  const course = programSlug ? getCourseBySlug(programSlug) : undefined;
  const bootcamp = bootcampSlug ? getBootcampBySlug(bootcampSlug) : undefined;
  const hasContext = Boolean(course || bootcamp);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lenis = useLenis();
  const {
    showSuccessPopup,
    setShowSuccessPopup,
    showErrorPopup,
    setShowErrorPopup,
    errorMessage,
    resetFeedback,
    submitForm,
  } = useFormSubmitFeedback();

  const {
    register,
    control,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      callbackTime: defaultCallbackTime(),
      enquiryFor: "",
      bootCampOfInterest: "",
    },
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        email: "",
        phone: "",
        callbackTime: defaultCallbackTime(),
        enquiryFor: course?.title ?? "",
        bootCampOfInterest: bootcamp?.title ?? "",
      });
      resetFeedback();
    }
  }, [isOpen, course?.title, bootcamp?.title, reset, resetFeedback]);

  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";
    if (lenis) lenis.stop();

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
      document.documentElement.style.overflow = originalHtmlOverflow;
      if (lenis) lenis.start();
    };
  }, [isOpen, lenis]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const programLink = programSlug
        ? `${window.location.origin}/cyber-defense-programs/${programSlug}`
        : "";
      const bootcampLink = bootcampSlug
        ? `${window.location.origin}/cyber-defense-programs/bootcamp/${bootcampSlug}`
        : "";

      await submitForm(
        {
          formType: "callback-modal",
          name: data.name,
          email: data.email,
          phone: formatIndianMobileE164(data.phone),
          callbackTime: data.callbackTime,
          enquiryFor: data.enquiryFor,
          bootCampOfInterest: data.bootCampOfInterest,
          programLink,
          bootcampLink,
        },
        { successMessage: FORM_FEEDBACK_COPY.callbackModal.successMessage },
      );
      reset();
    } catch {
      // Error popup is handled by useFormSubmitFeedback.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/50 backdrop-blur-sm z-9998"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9998,
              }}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-9999 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                padding: isMobile ? "1rem" : "2rem",
              }}
            >
              <motion.div
                className="relative flex h-[78vh] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white sm:h-[80vh]"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  margin: isMobile ? "0.5rem" : "1.25rem",
                  maxWidth: isMobile ? "calc(100vw - 1rem)" : "36rem",
                }}
              >
                <div
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={crosshatchBgStyle}
                />
                {/* Header */}
                <div className="relative z-10 p-4 sm:p-6 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-text-primary text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter-display font-bold">
                      Request a callback
                    </h2>
                    <CandyButton
                      type="button"
                      variant="white"
                      onClick={onClose}
                      aria-label="Close modal"
                      className="h-9 w-9 shrink-0 rounded-lg! px-0! py-0! shadow-none!"
                    >
                      <CloseIcon />
                    </CandyButton>
                  </div>
                  <p className="text-text-primary text-sm font-inter-display">
                    Fill the form below to request a callback from our team.
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={rhfHandleSubmit(onSubmit)}
                  data-lenis-prevent
                  data-lenis-prevent-wheel
                  className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 pb-6 space-y-4 sm:px-6 sm:pb-8"
                >
                  {hasContext && course && (
                    <div className="rounded-lg border border-neutral-200 bg-white/95 p-3 sm:p-4">
                      <p className="mb-2 text-xs font-inter-display font-semibold uppercase tracking-wide text-primary">
                        Flagship Program
                      </p>
                      <div className="min-w-0">
                        <h3 className="text-xs font-inter-display font-semibold text-text-primary leading-snug sm:text-base">
                          {course.title}
                        </h3>
                        {course.subheading && (
                          <p className="mt-1 text-xs font-inter-display text-blue-600 font-medium sm:text-base">
                            {course.subheading}
                          </p>
                     
                        )}
                        {course.originalPrice > 0 && course.currentPrice > 0 && (
                          <div className="mt-2 sm:mt-3">
                            <BootcampPriceBlock
                              originalPrice={course.originalPrice}
                              launchPrice={course.currentPrice}
                              currency="INR"
                              variant="strip"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {hasContext && bootcamp && (
                    <div className="rounded-lg border border-neutral-200 bg-white/95 p-3 sm:p-4">
                      <p className="mb-2 text-xs font-inter-display font-semibold uppercase tracking-wide text-primary">
                        Elite Boot Camp
                      </p>
                      <div className="min-w-0">
                        <h3 className="text-sm font-inter-display font-semibold text-text-primary leading-snug sm:text-[1.625rem]">
                          {bootcamp.title}
                        </h3>
                        <p className="mt-1 text-xs font-inter-display font-medium text-primary sm:text-[1.625rem]">
                          {bootcamp.duration} · {bootcamp.language}
                        </p>
                        <div className="mt-2 sm:mt-3">
                          <BootcampPriceBlock
                            originalPrice={bootcamp.originalPrice}
                            launchPrice={bootcamp.launchPrice}
                            currency={bootcamp.currency}
                            variant="strip"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {hasContext && (
                    <>
                      <input type="hidden" {...register("enquiryFor")} />
                      <input type="hidden" {...register("bootCampOfInterest")} />
                    </>
                  )}

                  {/* Name Field */}
                  <div>
                    <label className="block text-text-primary text-sm font-medium font-inter-display mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Full name is required" })}
                      placeholder="Name"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border text-text-primary placeholder-neutral-400 focus:outline-none rounded-lg focus:ring focus:ring-neutral-400 focus:ring-offset-2 md:focus-ring-offset-4 transition-colors text-sm sm:text-base font-inter-display ${errors.name ? "border-red-400 focus:border-red-500" : "border-neutral-300 focus:border-neutral-400"
                        }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 font-inter-display">{errors.name.message}</p>
                    )}
                  </div>

                  <EmailField
                    label="Email Address"
                    name="email"
                    register={register}
                    error={errors.email}
                    labelClassName="block text-text-primary text-sm font-medium font-inter-display mb-2"
                    inputClassName={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border text-text-primary placeholder-neutral-400 focus:outline-none rounded-lg focus:ring focus:ring-neutral-400 focus:ring-offset-2 md:focus-ring-offset-4 transition-colors text-sm sm:text-base font-inter-display ${errors.email ? "border-red-400 focus:border-red-500" : "border-neutral-300 focus:border-neutral-400"}`}
                  />

                  <IndianPhoneField
                    label="Phone Number"
                    name="phone"
                    register={register}
                    error={errors.phone}
                    showFlag
                    labelClassName="block text-text-primary text-sm font-medium font-inter-display mb-2"
                    wrapperClassName="flex"
                    prefixClassName={`inline-flex items-center px-2 sm:px-3 py-2 sm:py-3 bg-neutral-100 border border-r-0 rounded-l-lg text-text-primary text-sm sm:text-base font-inter-display ${errors.phone ? "border-red-400" : "border-neutral-300"}`}
                    inputClassName={`flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-background border border-l-0 text-text-primary placeholder-neutral-400 focus:outline-none focus:ring focus:ring-neutral-400 focus:ring-offset-2 md:focus-ring-offset-4 rounded-r-lg transition-colors text-sm sm:text-base font-inter-display ${errors.phone ? "border-red-400 focus:border-red-500" : "border-neutral-300 focus:border-neutral-400"}`}
                  />

                  <DateTimePickerField
                    label="When should we call you?"
                    name="callbackTime"
                    control={control}
                    rules={{ required: "Preferred callback time is required" }}
                    error={errors.callbackTime}
                    popperClassName="z-[120]"
                  />

                  {!hasContext && (
                    <div className="space-y-4 pt-2 border-t border-neutral-200 border-dashed">
                      <p className="text-sm font-inter-display text-text-primary/70">
                        Select at least one program or boot camp <span className="text-red-500">*</span>
                      </p>

                      <div>
                        <label className="block text-text-primary text-sm font-medium font-inter-display mb-2">
                          Program Enquiry
                        </label>
                        <select
                          {...register("enquiryFor", {
                            validate: (value, formValues) =>
                              validateProgramOrBootCamp(value, formValues as FormData),
                          })}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border text-text-primary focus:outline-none focus:ring focus:ring-neutral-400 focus:ring-offset-2 md:focus-ring-offset-4 rounded-lg transition-colors appearance-none cursor-pointer text-sm sm:text-base font-inter-display ${errors.enquiryFor ? "border-red-400 focus:border-red-500" : "border-neutral-300 focus:border-neutral-400"
                            }`}
                        >
                          <option value="">Select a program</option>
                          {allCourses.map((c) => (
                            <option key={c.id} value={c.title}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                        {errors.enquiryFor && (
                          <p className="mt-1 text-sm text-red-500 font-inter-display">{errors.enquiryFor.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-text-primary text-sm font-medium font-inter-display mb-2">
                          Boot Camp Enquiry
                        </label>
                        <select
                          {...register("bootCampOfInterest", {
                            validate: (value, formValues) =>
                              validateProgramOrBootCamp(value, formValues as FormData),
                          })}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border text-text-primary focus:outline-none focus:ring focus:ring-neutral-400 focus:ring-offset-2 md:focus-ring-offset-4 rounded-lg transition-colors appearance-none cursor-pointer text-sm sm:text-base font-inter-display ${errors.bootCampOfInterest ? "border-red-400 focus:border-red-500" : "border-neutral-300 focus:border-neutral-400"
                            }`}
                        >
                          <option value="">Select a boot camp</option>
                          {allBootcamps.map((b) => (
                            <option key={b.id} value={b.title}>
                              {b.title}
                            </option>
                          ))}
                        </select>
                        {errors.bootCampOfInterest && (
                          <p className="mt-1 text-sm text-red-500 font-inter-display">{errors.bootCampOfInterest.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <CandyButton
                    type="submit"
                    disabled={isSubmitting}
                    className="mb-1 mt-2 w-full rounded-lg! border-zinc-800 bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)] px-8 py-3 font-inter-display! text-base font-semibold shadow-none! sm:text-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </CandyButton>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FormSuccessPopup
        open={showSuccessPopup}
        onClose={() => {
          setShowSuccessPopup(false);
          onClose();
        }}
        title={FORM_FEEDBACK_COPY.callbackModal.successTitle}
        message={FORM_FEEDBACK_COPY.callbackModal.successMessage}
      />

      <FormErrorPopup
        open={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        title={FORM_FEEDBACK_COPY.callbackModal.errorTitle}
        message={errorMessage}
      />
    </Portal>
  );
};

export default CallbackModal;
