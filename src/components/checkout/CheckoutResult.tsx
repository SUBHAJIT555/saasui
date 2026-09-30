"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "@/lib/react-router";
import { GgwButton } from "@/components/ui/ggw-button";
import { checkoutPath } from "@/config/data/services";
import { siteRoutes } from "@/config/routes";
import { readCheckoutRequest, type CheckoutRequest } from "@/lib/checkout";
import { CheckoutFrame, checkoutCardClass } from "@/components/checkout/CheckoutFrame";

export function CheckoutSuccess() {
  const navigate = useNavigate();
  const [request, setRequest] = useState<CheckoutRequest | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readCheckoutRequest();
    setRequest(stored);
    setReady(true);
    if (stored?.orderId && !stored.paidAt) {
      navigate(`/pay?order_id=${encodeURIComponent(stored.orderId)}`, { replace: true });
    }
  }, [navigate]);

  if (!ready) {
    return <section className="min-h-[40vh] bg-canvas" />;
  }

  const paid = Boolean(request?.paidAt);

  return (
    <CheckoutFrame
      kicker="Checkout"
      title={paid ? "Payment received" : "Payment pending"}
      lead={
        paid
          ? `Thanks ${request?.name}. Payment for ${request?.serviceName} is confirmed.`
          : "Payment is not confirmed yet. If you already started UPI, keep the pay page open until it succeeds."
      }
    >
      <div className={`${checkoutCardClass} mx-auto max-w-xl text-center`}>
        {paid && request ? (
          <p className="text-copy text-body">
            {request.paymentPurpose}
            {request.amountLabel ? ` · ${request.amountLabel}` : ""}
            <br />
            Reference: {request.orderId || request.id}
          </p>
        ) : (
          <p className="text-copy text-body">You can return to checkout and start again.</p>
        )}
        <div className="mt-6">
          <GgwButton
            href={
              request?.orderId && !paid
                ? `/pay?order_id=${encodeURIComponent(request.orderId)}`
                : request
                  ? checkoutPath(request.serviceSlug)
                  : siteRoutes.checkout
            }
            variant="accent"
          >
            {paid ? "Back to checkout" : "Open payment page"}
          </GgwButton>
        </div>
        <p className="mt-4 text-copy text-body">
          <Link to={siteRoutes.contact} className="font-medium text-brand-accent hover:underline">
            Contact us
          </Link>{" "}
          if you need help with this order.
        </p>
      </div>
    </CheckoutFrame>
  );
}

export function CheckoutCancel() {
  const [request, setRequest] = useState<CheckoutRequest | null>(null);

  useEffect(() => {
    setRequest(readCheckoutRequest());
  }, []);

  return (
    <CheckoutFrame
      kicker="Checkout"
      title="Payment cancelled"
      lead="No payment was taken. You can return to checkout when the scope is ready."
    >
      <div className={`${checkoutCardClass} mx-auto max-w-xl text-center`}>
        <GgwButton href={request ? checkoutPath(request.serviceSlug) : siteRoutes.checkout} variant="accent">
          Resume checkout
        </GgwButton>
        <p className="mt-4 text-sm">
          <Link to={siteRoutes.services} className="font-medium text-brand-accent hover:underline">
            Browse services
          </Link>
        </p>
      </div>
    </CheckoutFrame>
  );
}
