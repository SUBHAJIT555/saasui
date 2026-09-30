import { Suspense } from "react";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutView />
    </Suspense>
  );
}
