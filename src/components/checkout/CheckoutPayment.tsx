"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@/lib/react-router";
import { GgwButton } from "@/components/ui/ggw-button";
import { checkoutPath } from "@/config/data/services";
import {
  getPaymentMethod,
  isEnabledPaymentMethod,
  paymentMethods,
  readCheckoutRequest,
  startMpursePayment,
  type CheckoutRequest,
  type PaymentMethodId,
} from "@/lib/checkout";
import { CheckoutFrame, checkoutCardClass } from "@/components/checkout/CheckoutFrame";

const defaultMethod = paymentMethods.find((method) => method.enabled)?.id ?? "upi";

export function CheckoutPayment() {
  const navigate = useNavigate();
  const [request, setRequest] = useState<CheckoutRequest | null>(null);
  const [ready, setReady] = useState(false);
  const [methodId, setMethodId] = useState<PaymentMethodId>(defaultMethod);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = readCheckoutRequest();
    setRequest(stored);
    if (stored?.paymentMethodId && isEnabledPaymentMethod(stored.paymentMethodId)) {
      setMethodId(stored.paymentMethodId);
    } else {
      setMethodId(defaultMethod);
    }
    setReady(true);
  }, []);

  const method = useMemo(() => getPaymentMethod(methodId), [methodId]);
  const checkoutHref = request ? checkoutPath(request.serviceSlug) : "/checkout";

  async function onPay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!request || !method?.enabled) {
      setStatus("UPI is the only payment method available right now.");
      return;
    }

    setSubmitting(true);
    setStatus("");
    try {
      const result = await startMpursePayment(request);
      navigate(`/pay?order_id=${encodeURIComponent(result.order_id ?? "")}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not start payment.");
      setSubmitting(false);
    }
  }

  if (!ready) {
    return <section className="min-h-[40vh] bg-canvas" />;
  }

  if (!request) {
    return (
      <CheckoutFrame kicker="Payment" title="Payment" lead="No checkout request was found in this browser." step="payment">
        <GgwButton type="button" variant="accent" onClick={() => navigate("/checkout")}>
          Back to checkout
        </GgwButton>
      </CheckoutFrame>
    );
  }

  return (
    <CheckoutFrame
      kicker="Payment"
      title="Complete payment"
      lead={`Pay ${request.amountLabel} for ${request.serviceName}. UPI is open. Card and online banking stay closed until the merchant enables them.`}
      step="payment"
    >
      <form className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]" onSubmit={onPay} noValidate>
        <div className={checkoutCardClass}>
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-ink">Payment method</legend>
            <div className="grid gap-3">
              {paymentMethods.map((item) => {
                const selected = methodId === item.id;
                const disabled = !item.enabled;
                return (
                  <label
                    key={item.id}
                    className={[
                      "rounded-lg border px-4 py-4",
                      disabled ? "cursor-not-allowed border-hairline bg-surface-soft opacity-70" : "cursor-pointer",
                      selected && !disabled ? "border-brand-accent bg-canvas" : "",
                      !selected && !disabled ? "border-hairline bg-canvas" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={item.id}
                      checked={selected}
                      disabled={disabled}
                      className="sr-only"
                      onChange={() => {
                        if (disabled) return;
                        setMethodId(item.id);
                        setStatus("");
                      }}
                    />
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-ink">{item.label}</span>
                      {disabled ? (
                        <span className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Coming soon</span>
                      ) : (
                        <span className="bg-brand-accent px-1.5 text-caption font-semibold uppercase tracking-[0.12em] text-on-primary">
                          Available
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block text-copy leading-relaxed text-body">{item.hint}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <p className="mt-5 text-copy leading-relaxed text-body">
            On a phone we open your UPI app. On a computer we show a QR to scan. Keep the next page open until the payment succeeds.
          </p>
        </div>

        <aside className={`${checkoutCardClass} lg:sticky lg:top-28`}>
          <h2 className="text-title-sm text-ink">Payment summary</h2>
          <dl className="mt-4 border-t border-dashed border-hairline text-sm">
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-hairline py-3">
              <dt className="text-muted">Service</dt>
              <dd className="text-right font-medium text-ink">{request.serviceName}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-hairline py-3">
              <dt className="text-muted">Payment</dt>
              <dd className="text-right font-medium text-ink">{request.paymentPurpose}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-hairline py-3">
              <dt className="text-muted">Amount</dt>
              <dd className="text-right font-semibold text-ink">{request.amountLabel}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-hairline py-3">
              <dt className="text-muted">Method</dt>
              <dd className="text-right font-medium text-ink">{method?.label ?? "—"}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <GgwButton type="submit" variant="accent" className="w-full" disabled={submitting}>
              {submitting ? "Starting UPI…" : `Pay ${request.amountLabel} with UPI`}
            </GgwButton>
            {status ? (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {status}
              </p>
            ) : null}
          </div>
          <p className="mt-4 text-sm">
            <Link to={checkoutHref} className="font-medium text-brand-accent hover:underline">
              Back to checkout
            </Link>
          </p>
        </aside>
      </form>
    </CheckoutFrame>
  );
}
