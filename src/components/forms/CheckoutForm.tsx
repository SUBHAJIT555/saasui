import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "@/lib/react-router";
import type { Hero } from "@/types/program";
import { CandyButton } from "@/components/ui/candy-button";
import BootcampPriceBlock from "@/components/ui/BootcampPriceBlock";
import {
  DateTimePickerField,
  defaultDateTimeLocal,
} from "@/components/ui/DateTimePickerField";
import { FormSuccessPopup } from "@/components/ui/FormSuccessPopup";
import { FormErrorPopup } from "@/components/ui/FormErrorPopup";
import { useFormSubmitFeedback } from "@/hooks/useFormSubmitFeedback";
import { getCheckoutFeedbackCopy } from "@/config/constants/formFeedbackCopy";
import {
  formatIndianMobileE164,
  zodEmail,
  zodIndianMobile,
  zodOptionalIndianMobile,
} from "@/lib/formValidation";
import { EmailField } from "@/components/ui/EmailField";
import { IndianPhoneField } from "@/components/ui/IndianPhoneField";

const parsePriceValue = (value: string) => Number(value.replace(/[^\d]/g, "")) || 0;

const normalizeCurrency = (currency: string) =>
  currency === "₹" || currency === "INR" ? "INR" : currency;

// Zod validation schema
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  age: z
    .number()
    .min(13, "Age must be at least 13")
    .max(100, "Age must be less than 100"),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender",
  }),
  occupation: z.enum(["Student", "Working", "Gap Year", "Freelancer", "Other"], {
    message: "Please select an occupation",
  }),
  preferredCallTime: z.string().min(1, "Preferred callback time is required"),
  phoneNumber: zodIndianMobile(),
  secondaryPhoneNumber: zodOptionalIndianMobile(),
  address: z.string().min(10, "Address must be at least 10 characters"),
  email: zodEmail(),
  collegeSchool: z.string().min(1, "Please enter your college/school name"),
  graduationYear: z
    .string()
    .min(1, "Graduation year is required")
    .regex(/^\d{4}$/, "Enter a 4-digit year")
    .refine((value) => {
      const year = Number(value);
      return year >= 1990 && year <= new Date().getFullYear() + 10;
    }, `Enter a year between 1990 and ${new Date().getFullYear() + 10}`),
});

interface CheckoutFormProps {
  courseData: Hero;
  courseTitle: string;
  pricing: {
    baseAmount: number;
    platformFees: number;
    gst: number;
    totalAmount: number;
    currency: string;
  };
  onBack: () => void;
  courseSlug?: string;
  formType?: string;
  onSuccess?: () => void;
  embedded?: boolean;
}

const CheckoutForm = ({
  courseData,
  courseTitle,
  onBack,
  courseSlug: propSlug,
  formType = "enrollment-modal",
  onSuccess,
  embedded = false,
}: Omit<CheckoutFormProps, 'pricing'>) => {
  const [searchParams] = useSearchParams();
  // Use prop slug if provided (for modal), otherwise fall back to search params (for payment portal page)
  const courseSlug = propSlug || searchParams.get("slug") || "";
  const providedCourseLink = searchParams.get("courseLink") || searchParams.get("courseUrl") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    showSuccessPopup,
    setShowSuccessPopup,
    showErrorPopup,
    setShowErrorPopup,
    errorMessage,
    submitForm,
  } = useFormSubmitFeedback();
  const feedbackCopy = getCheckoutFeedbackCopy(formType);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      preferredCallTime: defaultDateTimeLocal(),
    },
  });

  const onSubmit = async (data: z.infer<typeof checkoutFormSchema>) => {
    setIsSubmitting(true);

    console.log(data);
    const normalizedSlug = courseSlug
      .replace(/^\/+|\/+$/g, "")
      .replace(/^cyber-defense-programs\/bootcamp\//, "")
      .replace(/^cyber-defense-programs\//, "")
      .replace(/^bootcamp\//, "");
    const isBootcampEnrollment = formType === "bootcamp-enrollment";
    const coursePath = isBootcampEnrollment
      ? `/cyber-defense-programs/bootcamp/${normalizedSlug}`
      : `/cyber-defense-programs/${normalizedSlug}`;
    const courseLink =
      providedCourseLink ||
      (normalizedSlug && typeof window !== "undefined"
        ? `${window.location.origin}${coursePath}`
        : "");

    try {
      await submitForm(
        {
          formType,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: formatIndianMobileE164(data.phoneNumber),
          secondaryPhoneNumber: data.secondaryPhoneNumber
            ? formatIndianMobileE164(data.secondaryPhoneNumber)
            : "",
          age: data.age.toString(),
          gender: data.gender,
          occupation: data.occupation,
          preferredCallTime: data.preferredCallTime,
          address: data.address,
          collegeSchool: data.collegeSchool,
          graduationYear: data.graduationYear,
          courseSlug: courseSlug || "",
          courseLink,
        },
        { successMessage: feedbackCopy.successMessage },
      );
    } catch {
      // Error popup is handled by useFormSubmitFeedback.
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current year for graduation year validation
  const currentYear = new Date().getFullYear();
  const originalPrice = parsePriceValue(courseData.pricing.originalPrice);
  const launchPrice = parsePriceValue(courseData.pricing.currentPrice);
  const currency = normalizeCurrency(courseData.pricing.currency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={embedded ? "p-5 sm:p-6 md:p-8" : "p-6 sm:p-8 md:p-10"}
      data-lenis-prevent
    >
      {/* Header */}
      {!embedded && (
        <div className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 hidden items-center gap-2 text-sm font-montserrat font-medium text-gray-600 transition-colors hover:text-text-primary sm:flex sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Overview
          </button>

          <div>
            <h2 className="text-2xl sm:text-3xl font-montserrat font-semibold tracking-tight text-text-primary mb-2">
              Program Details
            </h2>
            <div className="w-12 h-0.5 bg-primary"></div>
          </div>
        </div>
      )}

      {/* Course Summary */}
      <div className={`mb-8 ${embedded ? "pb-0" : "border-b border-gray-200 pb-6"}`}>
        <div className="border border-dashed border-zinc-200 bg-white/90 p-4 sm:p-5">
          <h3 className="text-lg font-semibold leading-snug text-zinc-900 sm:text-xl">
            {courseTitle}
          </h3>
          {courseData.subheading && (
            <p className="mt-1.5 text-sm font-medium text-blue-600 sm:text-base">
              {courseData.subheading}
            </p>
          )}
          {originalPrice > 0 && launchPrice > 0 && (
            <div className="mt-4">
              <BootcampPriceBlock
                originalPrice={originalPrice}
                launchPrice={launchPrice}
                currency={currency}
                variant="strip"
              />
            </div>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-text-primary text-sm font-medium font-montserrat mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("fullName")}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat ${errors.fullName
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
                }`}
              placeholder="Enter Full Name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500 font-montserrat">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-text-primary text-sm font-medium font-montserrat mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat ${errors.age
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
                }`}
              placeholder="Enter Age"
              min="13"
              max="100"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-500 font-montserrat">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-text-primary text-sm font-medium font-montserrat mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              {...register("gender")}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat appearance-none cursor-pointer ${errors.gender
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
                }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500 font-montserrat">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-text-primary text-sm font-medium font-montserrat mb-2">
              Occupation <span className="text-red-500">*</span>
            </label>
            <select
              {...register("occupation")}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat appearance-none cursor-pointer ${errors.occupation
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
                }`}
            >
              <option value="">Select Occupation</option>
              <option value="Student">Student</option>
              <option value="Working">Working</option>
              <option value="Gap Year">Gap Year</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Other">Other</option>
            </select>
            {errors.occupation && (
              <p className="mt-1 text-sm text-red-500 font-montserrat">
                {errors.occupation.message}
              </p>
            )}
          </div>

          <DateTimePickerField
            label="When should we call you?"
            name="preferredCallTime"
            control={control}
            error={errors.preferredCallTime}
            labelClassName="block text-text-primary text-sm font-medium font-montserrat mb-2"
            inputClassName="bg-white font-montserrat focus:ring-primary/20 cyberlabs-datepicker"
          />

          <IndianPhoneField
            label="Phone Number (Primary)"
            name="phoneNumber"
            register={register}
            error={errors.phoneNumber}
            showHint={false}
            labelClassName="block text-text-primary text-sm font-medium font-montserrat mb-2"
            prefixClassName={`shrink-0 inline-flex items-center px-3 py-3 rounded-lg border bg-white text-text-primary font-montserrat font-medium text-base ${errors.phoneNumber ? "border-red-300" : "border-gray-300"}`}
            inputClassName={`flex-1 px-4 py-3 bg-white border rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat ${errors.phoneNumber ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-primary"}`}
            errorClassName="mt-1 text-sm text-red-500 font-montserrat"
          />

          <IndianPhoneField
            label="Phone Number (Secondary)"
            name="secondaryPhoneNumber"
            register={register}
            error={errors.secondaryPhoneNumber}
            required={false}
            showHint={false}
            placeholder="Optional alternate number"
            labelClassName="block text-text-primary text-sm font-medium font-montserrat mb-2"
            prefixClassName={`shrink-0 inline-flex items-center px-3 py-3 rounded-lg border bg-white text-text-primary font-montserrat font-medium text-base ${errors.secondaryPhoneNumber ? "border-red-300" : "border-gray-300"}`}
            inputClassName={`flex-1 px-4 py-3 bg-white border rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat ${errors.secondaryPhoneNumber ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-primary"}`}
            errorClassName="mt-1 text-sm text-red-500 font-montserrat"
          />

          {/* Address */}
          <div>
            <label className="block text-text-primary text-sm font-medium font-montserrat mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("address")}
              rows={3}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat resize-none ${errors.address
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
                }`}
              placeholder="Enter your complete address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500 font-montserrat">
                {errors.address.message}
              </p>
            )}
          </div>

          <EmailField
            label="Email Address"
            name="email"
            register={register}
            error={errors.email}
            labelClassName="block text-text-primary text-sm font-medium font-montserrat mb-2"
            inputClassName={`w-full px-4 py-3 bg-white border rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat ${errors.email ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-primary"}`}
            errorClassName="mt-1 text-sm text-red-500 font-montserrat"
            placeholder="Enter Email Address"
          />

          {/* College / School */}
          <div>
            <label className="block text-text-primary text-sm font-medium font-montserrat mb-2">
              College / School <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("collegeSchool")}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat ${errors.collegeSchool
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
                }`}
              placeholder="Enter College / School Name"
            />
            {errors.collegeSchool && (
              <p className="mt-1 text-sm text-red-500 font-montserrat">
                {errors.collegeSchool.message}
              </p>
            )}
          </div>

          {/* Graduation Year */}
          <div>
            <label
              htmlFor="graduationYear"
              className="block text-text-primary text-sm font-medium font-montserrat mb-2"
            >
              Graduation Year <span className="text-red-500">*</span>
            </label>
            <input
              id="graduationYear"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={4}
              placeholder="e.g. 2024"
              {...register("graduationYear", {
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
                },
              })}
              className={`w-full px-4 py-3 bg-white border rounded-lg text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-montserrat ${errors.graduationYear
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
                }`}
            />
            <p className="mt-1 text-xs text-gray-500 font-montserrat">
              Enter a year between 1990 and {currentYear + 10}
            </p>
            {errors.graduationYear && (
              <p className="mt-1 text-sm text-red-500 font-montserrat">
                {errors.graduationYear.message}
              </p>
            )}
          </div>

          <CandyButton
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-lg! border-zinc-800! bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)]! px-6! py-3! text-sm! text-white shadow-none! active:rotate-0 disabled:cursor-not-allowed disabled:border-zinc-300! disabled:bg-zinc-300! disabled:opacity-100 sm:text-base!"
          >
            {isSubmitting ? "Submitting..." : "Submit Details"}
          </CandyButton>
        </form>
      </div>

      <FormSuccessPopup
        open={showSuccessPopup}
        onClose={() => {
          setShowSuccessPopup(false);
          onSuccess?.();
        }}
        title={feedbackCopy.successTitle}
        message={feedbackCopy.successMessage}
      />

      <FormErrorPopup
        open={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        title={feedbackCopy.errorTitle}
        message={errorMessage}
      />
    </motion.div>
  );
};

export default CheckoutForm;
