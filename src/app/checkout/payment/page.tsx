import { Suspense } from "react";
import { CheckoutPayment } from "@/components/checkout/CheckoutPayment";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutPayment />
    </Suspense>
  );
}
