import { Suspense } from "react";
import { CheckoutSuccess } from "@/components/checkout/CheckoutResult";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccess />
    </Suspense>
  );
}
