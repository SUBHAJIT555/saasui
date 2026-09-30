import { Suspense } from "react";
import { PayView } from "@/components/checkout/PayView";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PayView />
    </Suspense>
  );
}
