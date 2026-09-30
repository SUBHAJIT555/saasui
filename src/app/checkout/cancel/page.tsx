import { Suspense } from "react";
import { CheckoutCancel } from "@/components/checkout/CheckoutResult";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutCancel />
    </Suspense>
  );
}
