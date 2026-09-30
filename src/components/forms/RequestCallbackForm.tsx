import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCourses } from "@/hooks/useCourses";
import { useBootcamps } from "@/hooks/useBootcamps";
import { Course } from "@/types/program";
import { CandyButton } from "@/components/ui/candy-button";
import { LandingSectionShell } from "@/components/ui/landing-section";
import { crosshatchBgStyle } from "@/config/constants/bootcampStyles";
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

interface FormData {
    fullName: string;
    email: string;
    mobileNumber: string;
    currentBackground: string;
    yearsOfExperience: string;
    programOfInterest: string;
    bootCampOfInterest: string;
    preferredTime: string;
    questionsOrGoals?: string;
}

const inputBase =
    "w-full px-4 py-3 rounded-lg border bg-white text-zinc-900 placeholder:text-zinc-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors";
const inputError = "border-red-300 focus:border-red-500 focus:ring-red-500/20";
const inputNormal = "border-zinc-200";
const labelClass = "block text-sm font-medium text-zinc-900 mb-2";
const errorClass = "mt-1 text-sm text-red-500";

const validateProgramOrBootCamp = (_value: string, formValues: FormData): true | string => {
    const hasProgram = Boolean(formValues.programOfInterest);
    const hasBootcamp = Boolean(formValues.bootCampOfInterest);
    if (!hasProgram && !hasBootcamp) {
        return "Please select at least one program or boot camp";
    }
    return true;
};

const RequestCallbackForm = () => {
    const { getCourses } = useCourses();
    const { getBootcamps } = useBootcamps();
    const allCourses = getCourses() as unknown as Course[];
    const allBootcamps = getBootcamps();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-80px" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        showSuccessPopup,
        setShowSuccessPopup,
        showErrorPopup,
        setShowErrorPopup,
        errorMessage,
        submitForm,
    } = useFormSubmitFeedback();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            fullName: "",
            email: "",
            mobileNumber: "",
            currentBackground: "",
            yearsOfExperience: "",
            programOfInterest: "",
            bootCampOfInterest: "",
            preferredTime: defaultDateTimeLocal(),
            questionsOrGoals: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            const mobileNumber = formatIndianMobileE164(data.mobileNumber);
            await submitForm(
                {
                    formType: "request-callback",
                    fullName: data.fullName,
                    email: data.email,
                    mobileNumber,
                    currentBackground: data.currentBackground,
                    yearsOfExperience: data.yearsOfExperience,
                    programOfInterest: data.programOfInterest,
                    bootCampOfInterest: data.bootCampOfInterest,
                    preferredTime: data.preferredTime,
                    questionsOrGoals: data.questionsOrGoals ?? "",
                },
                { successMessage: FORM_FEEDBACK_COPY.requestCallback.successMessage },
            );
            reset();
        } catch {
            // Error popup is handled by useFormSubmitFeedback.
        } finally {
            setIsSubmitting(false);
        }
    };

    const whatHappensNextContent = (
        <div className="border-y border-zinc-200">
            {[
                "Your request is reviewed by the admissions team",
                "An advisor contacts you to schedule a call",
                "You receive a structured walkthrough of the relevant program",
                "Clear next steps are shared only if the program is the right fit",
            ].map((text, i) => (
                <div key={i} className="flex gap-3 border-b border-zinc-200 py-3 last:border-b-0">
                    <span className="shrink-0 font-semibold text-zinc-400">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="flex-1 text-sm leading-relaxed text-zinc-700 md:text-base">
                        {text}
                    </p>
                </div>
            ))}
            <p className="pt-4 text-sm italic leading-relaxed text-zinc-600 md:text-base">
                No pressure. No spam. Only informed decision-making.
            </p>
        </div>
    );

    return (
        <LandingSectionShell>
            <div ref={containerRef} className="mx-auto w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative overflow-hidden border border-neutral-200 bg-white shadow-xl "
                >
                    <div
                        className="pointer-events-none absolute inset-0 z-0"
                        style={crosshatchBgStyle}
                        aria-hidden
                    />

                    <div className="relative z-10 border-b border-zinc-200 px-6 py-6 sm:px-8 sm:py-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                            Request a Call Back
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                            Share your details. Our team will contact you within one business day.
                        </p>
                    </div>

                    <div className="relative z-10 px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                                    <div className="space-y-2">
                                        <label className={labelClass}>
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("fullName", { required: "Full name is required" })}
                                            className={`${inputBase} ${errors.fullName ? inputError : inputNormal}`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                        <EmailField
                                            label="Email Address"
                                            name="email"
                                            register={register}
                                            error={errors.email}
                                            labelClassName={labelClass}
                                            inputClassName={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                                        />

                                        <IndianPhoneField
                                            label="Mobile Number"
                                            name="mobileNumber"
                                            register={register}
                                            error={errors.mobileNumber}
                                            labelClassName={labelClass}
                                            inputClassName={`flex-1 ${inputBase} ${errors.mobileNumber ? inputError : inputNormal}`}
                                            prefixClassName={`shrink-0 px-4 py-3 rounded-lg border bg-white text-zinc-900 font-medium text-base ${errors.mobileNumber ? inputError : inputNormal}`}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 border-t border-zinc-200 pt-5 sm:pt-6">
                                        <div className="space-y-2">
                                            <label className={labelClass}>
                                                Current Background <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                {...register("currentBackground", { required: "Please select your current background" })}
                                                className={`${inputBase} appearance-none cursor-pointer ${errors.currentBackground ? inputError : inputNormal}`}
                                            >
                                                <option value="">Select your current background</option>
                                                <option value="Student">Student</option>
                                                <option value="IT Professional">IT Professional</option>
                                                <option value="Security Professional">Security Professional</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.currentBackground && <p className={errorClass}>{errors.currentBackground.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>
                                                Years of Experience <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                {...register("yearsOfExperience", { required: "Please select years of experience" })}
                                                className={`${inputBase} appearance-none cursor-pointer ${errors.yearsOfExperience ? inputError : inputNormal}`}
                                            >
                                                <option value="">Select years of experience</option>
                                                <option value="0-1">0–1</option>
                                                <option value="1-3">1–3</option>
                                                <option value="3-7">3–7</option>
                                                <option value="7+">7+</option>
                                            </select>
                                            {errors.yearsOfExperience && <p className={errorClass}>{errors.yearsOfExperience.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-4 border-t border-zinc-200 pt-5 sm:pt-6">
                                        <p className="text-sm text-zinc-600">
                                            Select at least one program or boot camp <span className="text-red-500">*</span>
                                        </p>

                                        <div className="space-y-2">
                                            <label className={labelClass}>
                                                Program of Interest
                                            </label>
                                            <select
                                                {...register("programOfInterest", {
                                                    validate: (value, formValues) =>
                                                        validateProgramOrBootCamp(value, formValues as FormData),
                                                })}
                                                className={`${inputBase} appearance-none cursor-pointer ${errors.programOfInterest ? inputError : inputNormal}`}
                                            >
                                                <option value="">Select a program</option>
                                                {allCourses.map((course) => (
                                                    <option key={course.id} value={course.title}>
                                                        {course.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.programOfInterest && (
                                                <p className={errorClass}>
                                                    {errors.programOfInterest.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className={labelClass}>
                                                Boot Camp of Interest
                                            </label>
                                            <select
                                                {...register("bootCampOfInterest", {
                                                    validate: (value, formValues) =>
                                                        validateProgramOrBootCamp(value, formValues as FormData),
                                                })}
                                                className={`${inputBase} appearance-none cursor-pointer ${errors.bootCampOfInterest ? inputError : inputNormal}`}
                                            >
                                                <option value="">Select a boot camp</option>
                                                {allBootcamps.map((bootcamp) => (
                                                    <option key={bootcamp.id} value={bootcamp.title}>
                                                        {bootcamp.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.bootCampOfInterest && (
                                                <p className={errorClass}>
                                                    {errors.bootCampOfInterest.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="border-t border-zinc-200 pt-5 sm:pt-6">
                                        <DateTimePickerField
                                            label="When should we call you?"
                                            name="preferredTime"
                                            control={control}
                                            rules={{ required: "Preferred callback time is required" }}
                                            error={errors.preferredTime}
                                            labelClassName={labelClass}
                                            inputClassName={cn(
                                                inputBase,
                                                errors.preferredTime ? inputError : inputNormal,
                                                "cyberlabs-datepicker",
                                            )}
                                            errorClassName={errorClass}
                                        />
                                    </div>

                                    <div className="space-y-2 border-t border-zinc-200 pt-5 sm:pt-6">
                                        <label className={labelClass}>
                                            Any specific questions or goals <span className="text-zinc-400 text-xs font-normal">(Optional)</span>
                                        </label>
                                        <textarea
                                            {...register("questionsOrGoals")}
                                            rows={4}
                                            className={`${inputBase} resize-none ${inputNormal}`}
                                            placeholder="Share any questions or goals you'd like to discuss..."
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <CandyButton
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full rounded-lg! border-zinc-800 bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)] px-8 py-3 font-inter-display! text-base font-semibold shadow-none! disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Request"}
                                        </CandyButton>
                                    </div>
                        </form>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
                    className="relative mt-8 overflow-hidden rounded-xl border border-blue-200 bg-blue-50/70 px-6 py-5 sm:px-8 sm:py-6"
                >
                    <div
                        className="pointer-events-none absolute inset-0 z-0 opacity-30"
                        style={crosshatchBgStyle}
                        aria-hidden
                    />
                    <p className="relative z-10 border-l-4 border-blue-600 pl-5 text-base font-medium italic leading-relaxed text-zinc-800 md:text-lg">
                        Cybersecurity is not learned casually. If you are ready to take it seriously, we&apos;re ready to guide you.
                    </p>
                </motion.div>
            </div>

            <FormSuccessPopup
                open={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                title={FORM_FEEDBACK_COPY.requestCallback.successTitle}
                message={FORM_FEEDBACK_COPY.requestCallback.successMessage}
            >
                <h3 className="mb-4 text-lg font-semibold text-zinc-900">
                    What Happens Next
                </h3>
                {whatHappensNextContent}
            </FormSuccessPopup>
            <FormErrorPopup
                open={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title={FORM_FEEDBACK_COPY.requestCallback.errorTitle}
                message={errorMessage}
            />
        </LandingSectionShell>
    );
};

export default RequestCallbackForm;
