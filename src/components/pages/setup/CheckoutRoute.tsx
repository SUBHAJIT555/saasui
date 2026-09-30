"use client";

import { getService } from "@/config/data/services";
import { siteRoutes } from "@/config/routes";
import { useSearchParams } from "@/lib/react-router";
import RouteShell, { RouteTextLink } from "@/components/pages/setup/RouteShell";

const stepCopy: Record<
  string,
  { kicker: string; title: string; description: string }
> = {
  checkout: {
    kicker: "Checkout",
    title: "Checkout",
    description: "Customer details for the selected service. Payment comes next.",
  },
  payment: {
    kicker: "Payment",
    title: "Payment",
    description: "Choose how to pay, then continue to the payment step.",
  },
  pay: {
    kicker: "Pay",
    title: "Pay",
    description: "Complete the payment for this order.",
  },
  success: {
    kicker: "Checkout",
    title: "Payment received",
    description: "This order is marked as paid.",
  },
  cancel: {
    kicker: "Checkout",
    title: "Payment cancelled",
    description: "The payment was not completed. You can return to checkout.",
  },
  status: {
    kicker: "Order",
    title: "Order status",
    description: "Check the status of a checkout order.",
  },
};

export default function CheckoutRoute({
  step,
}: {
  step: "checkout" | "payment" | "pay" | "success" | "cancel" | "status";
}) {
  const [searchParams] = useSearchParams();
  const service = getService(searchParams.get("service"));
  const copy = stepCopy[step];

  return (
    <RouteShell kicker={copy.kicker} title={copy.title} description={copy.description}>
      <p className="text-sm text-zinc-600">
        {service
          ? `${service.name} · ${service.paymentPurpose}`
          : "No service selected yet."}
      </p>
      <p className="mt-6 flex flex-wrap gap-4 text-sm">
        <RouteTextLink to={siteRoutes.checkout}>Checkout</RouteTextLink>
        <RouteTextLink to={siteRoutes.checkoutPayment}>Payment</RouteTextLink>
        <RouteTextLink to={siteRoutes.pay}>Pay</RouteTextLink>
        <RouteTextLink to={siteRoutes.orderStatus}>Order status</RouteTextLink>
        <RouteTextLink to={siteRoutes.services}>Services</RouteTextLink>
      </p>
    </RouteShell>
  );
}
