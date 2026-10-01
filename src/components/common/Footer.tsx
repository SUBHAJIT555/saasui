import { Link } from "@/lib/react-router";
import { useForm, type FieldValues } from "react-hook-form";
import { useRef, type BaseSyntheticEvent, type ReactNode } from "react";
import Logo from "@/components/common/Logo";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/siteMetadata";
import { GgwButton } from "@/components/ui/ggw-button";
import { FormSuccessPopup } from "@/components/ui/FormSuccessPopup";
import { FormErrorPopup } from "@/components/ui/FormErrorPopup";
import { useFormSubmitFeedback } from "@/hooks/useFormSubmitFeedback";
import { CONTACT } from "@/config/constants/contactInfo";
import { primaryNav, siteRoutes } from "@/config/routes";
import { services, servicePath } from "@/config/data/services";
import { FORM_FEEDBACK_COPY } from "@/config/constants/formFeedbackCopy";
import { emailValidationRules } from "@/lib/formValidation";

const usefulLinks = primaryNav.map((item) => ({
    label: item.name,
    to: item.path,
}));

const legalLinks = [
    { label: "Terms & Condition", to: "/terms-and-conditions" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Cookie Policy", to: "/cookie-policy" },
    { label: "Refund & Cancellation Policy", to: "/refund-and-cancellation" },
    { label: "Support", to: `mailto:${CONTACT.supportEmail}`, external: true },
];



const Footer = () => {
    const {
        showSuccessPopup,
        setShowSuccessPopup,
        showErrorPopup,
        setShowErrorPopup,
        errorMessage,
        successMessage,
        submitForm,
    } = useFormSubmitFeedback();
    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: FieldValues) => {
        try {
            await submitForm(
                {
                    formType: "newsletter",
                    email: data.email,
                },
                { successMessage: FORM_FEEDBACK_COPY.newsletter.successMessage },
            );
            reset();
        } catch {
            // Error popup is handled by useFormSubmitFeedback.
        }
    };

    return (
        <footer className="relative w-full overflow-x-hidden bg-surface-soft screen-line-top">
            <div className="mx-auto max-w-content border-x border-dashed border-hairline px-5 py-12 sm:px-6 sm:py-14">
                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
                    <div>
                        <Link to="/" className="inline-flex items-center transition-opacity duration-200 hover:opacity-80">
                            <Logo className="h-10 w-auto" />
                        </Link>
                        <p className="mt-4 max-w-md text-copy text-muted">
                            Planning, administration, documents, projects, billing, and customer
                            communication. Each service is scoped work with a clear payment purpose.
                        </p>
                        <div className="mt-5 text-sm text-muted">
                            <p className="font-semibold text-ink">{CONTACT.registeredEntity}</p>
                            <address className="mt-1 not-italic">
                                {CONTACT.officeAddressIndia.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </address>
                        </div>
                        <ul className="mt-5 flex flex-col gap-2.5 text-sm text-muted">
                            <li>
                                <a href={`mailto:${CONTACT.supportEmail}`} className="transition-colors hover:text-ink">
                                    {CONTACT.supportEmail}
                                </a>
                            </li>
                            <li>
                                <Link to={siteRoutes.contact} className="transition-colors hover:text-ink">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <NewsletterSignup
                        formRef={formRef}
                        register={register}
                        handleSubmit={handleSubmit(onSubmit)}
                        isSubmitting={isSubmitting}
                        emailError={errors.email?.message}
                    />
                </div>

                <div className="mt-10 border-t border-dashed border-hairline pt-8">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <FooterColumn title="Useful Links">
                            <ul className="flex flex-col gap-2.5">
                                {usefulLinks.map((item) => (
                                    <li key={item.to}>
                                        <FooterLink to={item.to}>{item.label}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </FooterColumn>
                        <FooterColumn title="Services">
                            <ul className="flex flex-col gap-2.5">
                                {services.map((service) => (
                                    <li key={service.slug}>
                                        <FooterLink to={servicePath(service.slug)}>{service.name}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </FooterColumn>
                        <FooterColumn title="Legals & Policies">
                            <ul className="flex flex-col gap-2.5">
                                {legalLinks.map((item) => (
                                    <li key={item.label}>
                                        {item.external ? (
                                            <FooterLink href={item.to} external>
                                                {item.label}
                                            </FooterLink>
                                        ) : (
                                            <FooterLink to={item.to}>{item.label}</FooterLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </FooterColumn>
                        <FooterColumn title="Get in Touch">
                            <ul className="flex flex-col gap-2.5">
                                <li>
                                    <FooterLink href={`mailto:${CONTACT.supportEmail}`}>
                                        {CONTACT.supportEmail}
                                    </FooterLink>
                                </li>
                                <li>
                                    <FooterLink to={siteRoutes.contact}>Contact</FooterLink>
                                </li>
                            </ul>
                        </FooterColumn>
                    </div>
                </div>

                <div className="mt-8 border-t border-dashed border-hairline pt-5 text-center text-caption text-muted">
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <Link to="/" className="text-ink hover:underline">
                            {SITE_NAME}
                        </Link>{" "}
                        | A unit of {CONTACT.registeredEntity} | All rights reserved. |{" "}
                        <Link to="/sitemap" className="text-ink hover:underline">
                            Sitemap
                        </Link>
                    </p>
                </div>
            </div>

            <FormSuccessPopup
                open={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                title={FORM_FEEDBACK_COPY.newsletter.successTitle}
                message={successMessage}
            />

            <FormErrorPopup
                open={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title={FORM_FEEDBACK_COPY.newsletter.errorTitle}
                message={errorMessage}
            />
        </footer>
    );
};

type NewsletterSignupProps = {
    formRef: React.RefObject<HTMLFormElement | null>;
    register: ReturnType<typeof useForm<{ email: string }>>["register"];
    handleSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
    isSubmitting: boolean;
    emailError?: string;
};

function NewsletterSignup({
    formRef,
    register,
    handleSubmit,
    isSubmitting,
    emailError,
}: NewsletterSignupProps) {
    return (
        <div className="border border-dashed border-hairline bg-canvas p-5 sm:p-6">
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink">Newsletter</p>
            <h3 className="mt-2 text-title-sm text-ink">Stay in touch</h3>
            <p className="mt-2 text-copy text-muted">
                Occasional notes about services and how an engagement is handled.
            </p>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-4 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto]"
                noValidate
            >
                <input type="hidden" name="formType" value="newsletter" />
                <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className={cn(
                        "h-12 w-full min-w-0 rounded-md border border-hairline bg-white px-4 text-base text-ink placeholder:text-muted",
                        "shadow-[inset_0_1.5px_8px_0_rgba(38,103,255,0.10)] focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30",
                    )}
                    {...register("email", emailValidationRules)}
                />
                <GgwButton type="submit" variant="accent" disabled={isSubmitting} className="h-12 w-full sm:w-auto">
                    {isSubmitting ? "Submitting..." : "Subscribe"}
                </GgwButton>
                {emailError ? <p className="text-sm text-red-600 sm:col-span-2">{emailError}</p> : null}
            </form>
        </div>
    );
}

function FooterColumn({
    title,
    children,
    className,
}: {
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={className}>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink">{title}</p>
            <div className="mt-4">{children}</div>
        </div>
    );
}

function FooterLink({
    to,
    href,
    children,
    external,
}: {
    to?: string;
    href?: string;
    children: ReactNode;
    external?: boolean;
}) {
    const className = "text-sm text-muted transition-colors duration-200 hover:text-ink";

    if (href || external) {
        const linkHref = href ?? to ?? "#";
        return (
            <a
                href={linkHref}
                target={external || linkHref.startsWith("http") ? "_blank" : undefined}
                rel={
                    external || linkHref.startsWith("http")
                        ? "noreferrer"
                        : undefined
                }
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <Link to={to ?? "/"} className={className}>
            {children}
        </Link>
    );
}

export default Footer;
