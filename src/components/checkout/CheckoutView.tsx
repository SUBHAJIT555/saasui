"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "@/lib/react-router";
import { GgwButton } from "@/components/ui/ggw-button";
import { checkoutPath, getService, servicePath, services } from "@/config/data/services";
import { siteRoutes } from "@/config/routes";
import {
  amountChoices,
  createCheckoutId,
  formatAmount,
  getAmountChoice,
  isIndianMobile,
  normalizeIndianMobile,
  readCheckoutRequest,
  saveCheckoutRequest,
  type AmountChoiceId,
} from "@/lib/checkout";
import { CheckoutFrame, checkoutCardClass, checkoutInputClass, checkoutLabelClass } from "@/components/checkout/CheckoutFrame";

export function CheckoutView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const service = getService(searchParams.get("service"));
  const [choiceId, setChoiceId] = useState<AmountChoiceId>("custom");
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    contactType: "WhatsApp",
    contactDetails: "",
    message: "",
  });

  useEffect(() => {
    const stored = readCheckoutRequest();
    if (!stored || stored.paidAt || (service && stored.serviceSlug !== service.slug)) {
      setHydrated(true);
      return;
    }
    setChoiceId(stored.amountChoiceId || "custom");
    setCustomAmount(stored.amountChoiceId === "custom" ? String(stored.amount || "") : "");
    setSaved({
      name: stored.name ?? "",
      email: stored.email ?? "",
      phone: stored.phone ?? "",
      company: stored.company ?? "",
      address: stored.address ?? "",
      city: stored.city ?? "",
      contactType: stored.contactType ?? "WhatsApp",
      contactDetails: stored.contactDetails ?? "",
      message: stored.message ?? "",
    });
    setHydrated(true);
  }, [service]);

  const choice = useMemo(() => getAmountChoice(choiceId), [choiceId]);
  const isCustom = choiceId === "custom";
  const parsedCustom = Number(customAmount.replace(/[^\d]/g, ""));
  const amount = isCustom ? parsedCustom : (choice?.amount ?? parsedCustom);
  const amountValid = Number.isFinite(amount) && amount > 0;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!service) return;
    const form = event.currentTarget;
    if (!form.checkValidity() || !amountValid) {
      setStatus(isCustom ? "Enter the agreed amount in INR." : "Choose an amount to continue.");
      return;
    }

    const data = new FormData(form);
    const phone = normalizeIndianMobile(String(data.get("phone") ?? ""));
    if (!isIndianMobile(phone)) {
      setStatus("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    const existing = readCheckoutRequest();
    const sameOrder = existing && !existing.paidAt && existing.serviceSlug === service.slug;
    saveCheckoutRequest({
      id: sameOrder ? existing.id : createCheckoutId(),
      serviceSlug: service.slug,
      serviceName: service.name,
      paymentPurpose: service.paymentPurpose,
      amountChoiceId: choiceId,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone,
      company: String(data.get("company") ?? "").trim(),
      address: String(data.get("address") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      contactType: data.get("contact-type") === "Telegram" ? "Telegram" : "WhatsApp",
      contactDetails: String(data.get("contact-details") ?? "").trim(),
      amount,
      amountLabel: formatAmount(amount),
      currency: "INR",
      message: String(data.get("message") ?? "").trim(),
      createdAt: sameOrder ? existing.createdAt : new Date().toISOString(),
    });

    navigate(siteRoutes.checkoutPayment);
  }

  if (!service) {
    return (
      <CheckoutFrame
        kicker="Checkout"
        title="Choose a service"
        lead="Each service is paid for its own purpose. Open the one you agreed, then enter the amount."
        step="details"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <Link
              key={item.slug}
              to={checkoutPath(item.slug)}
              className="flex h-full flex-col rounded-lg border border-hairline bg-canvas p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-accent">{item.paymentPurpose}</span>
              <strong className="mt-3 text-title-sm text-ink">{item.name}</strong>
              <span className="mt-2 text-copy leading-relaxed text-body">{item.summary}</span>
              <span className="mt-5 text-sm font-semibold text-brand-accent">Continue</span>
            </Link>
          ))}
        </div>
      </CheckoutFrame>
    );
  }

  return (
    <CheckoutFrame
      kicker="Checkout"
      title="Checkout"
      lead={`${service.name} is paid as a ${service.paymentPurpose.toLowerCase()}. Choose a quick amount or enter the figure you agreed.`}
      step="details"
    >
      <form key={hydrated ? "ready" : "init"} className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]" onSubmit={onSubmit} noValidate>
        <div className={checkoutCardClass}>
          <div className="border-b border-dashed border-hairline pb-5">
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-accent">{service.paymentPurpose}</p>
            <h2 className="mt-2 text-title-sm text-ink">{service.name}</h2>
            <p className="mt-2 text-copy leading-relaxed text-body">{service.summary}</p>
            <Link to={servicePath(service.slug)} className="mt-3 inline-block text-sm font-medium text-brand-accent hover:underline">
              Back to this service
            </Link>
          </div>

          <fieldset className="mt-6">
            <legend className={checkoutLabelClass}>Amount in INR</legend>
            <div className="flex flex-wrap gap-2">
              {amountChoices.map((item) => {
                const selected = choiceId === item.id;
                return (
                  <label
                    key={item.id}
                    className={
                      selected
                        ? "cursor-pointer rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-on-primary"
                        : "cursor-pointer rounded-md border border-hairline bg-canvas px-4 py-2 text-sm font-semibold text-ink"
                    }
                  >
                    <input
                      type="radio"
                      name="amount-choice"
                      value={item.id}
                      checked={selected}
                      className="sr-only"
                      onChange={() => {
                        setChoiceId(item.id);
                        setCustomAmount(item.amount ? String(item.amount) : "");
                        setStatus("");
                      }}
                    />
                    {item.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-4">
            <label htmlFor="custom-amount" className={checkoutLabelClass}>
              {isCustom ? "Agreed amount" : "Or type a different amount"}
            </label>
            <input
              id="custom-amount"
              name="custom-amount"
              inputMode="numeric"
              placeholder="Enter amount in ₹"
              value={customAmount}
              className={checkoutInputClass}
              onChange={(event) => {
                setChoiceId("custom");
                setCustomAmount(event.target.value);
                setStatus("");
              }}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="checkout-name" className={checkoutLabelClass}>
                Full name
              </label>
              <input id="checkout-name" name="name" required defaultValue={saved.name} className={checkoutInputClass} />
            </div>
            <div>
              <label htmlFor="checkout-email" className={checkoutLabelClass}>
                Email
              </label>
              <input id="checkout-email" type="email" name="email" required defaultValue={saved.email} className={checkoutInputClass} />
            </div>
            <div>
              <label htmlFor="checkout-phone" className={checkoutLabelClass}>
                Mobile
              </label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-hairline bg-surface-soft px-3 text-sm font-medium text-body">
                  +91
                </span>
                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  required
                  inputMode="numeric"
                  placeholder="10-digit mobile"
                  defaultValue={saved.phone}
                  className={`${checkoutInputClass} rounded-l-none`}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="checkout-company" className={checkoutLabelClass}>
                Company
              </label>
              <input id="checkout-company" name="company" defaultValue={saved.company} className={checkoutInputClass} />
            </div>
            <div>
              <label htmlFor="checkout-address" className={checkoutLabelClass}>
                Street address
              </label>
              <input id="checkout-address" name="address" required defaultValue={saved.address} className={checkoutInputClass} />
            </div>
            <div>
              <label htmlFor="checkout-city" className={checkoutLabelClass}>
                City
              </label>
              <input id="checkout-city" name="city" required defaultValue={saved.city} className={checkoutInputClass} />
            </div>
            <div>
              <label htmlFor="checkout-contact-type" className={checkoutLabelClass}>
                Contact on
              </label>
              <select
                id="checkout-contact-type"
                name="contact-type"
                defaultValue={saved.contactType}
                className={checkoutInputClass}
              >
                <option>WhatsApp</option>
                <option>Telegram</option>
              </select>
            </div>
            <div>
              <label htmlFor="checkout-contact-details" className={checkoutLabelClass}>
                Contact details
              </label>
              <input
                id="checkout-contact-details"
                name="contact-details"
                required
                defaultValue={saved.contactDetails}
                className={checkoutInputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="checkout-message" className={checkoutLabelClass}>
                Note about the scope
              </label>
              <textarea
                id="checkout-message"
                name="message"
                rows={4}
                defaultValue={saved.message}
                className={`${checkoutInputClass} resize-y`}
              />
            </div>
          </div>
        </div>

        <aside className={`${checkoutCardClass} lg:sticky lg:top-28`}>
          <h2 className="text-title-sm text-ink">Request summary</h2>
          <dl className="mt-4 border-t border-dashed border-hairline text-sm">
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-hairline py-3">
              <dt className="text-muted">Service</dt>
              <dd className="text-right font-medium text-ink">{service.name}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-hairline py-3">
              <dt className="text-muted">Payment</dt>
              <dd className="text-right font-medium text-ink">{service.paymentPurpose}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-hairline py-3">
              <dt className="text-muted">Amount</dt>
              <dd className="text-right font-semibold text-ink">{amountValid ? formatAmount(amount) : "Enter INR amount"}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-hairline py-3">
              <dt className="text-muted">Currency</dt>
              <dd className="text-right font-medium text-ink">INR</dd>
            </div>
          </dl>
          <div className="mt-6">
            <GgwButton type="submit" variant="accent" className="w-full">
              Continue to payment
            </GgwButton>
            {status ? (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {status}
              </p>
            ) : null}
          </div>
        </aside>
      </form>
    </CheckoutFrame>
  );
}
