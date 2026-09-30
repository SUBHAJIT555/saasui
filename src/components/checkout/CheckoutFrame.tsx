import type { ReactNode } from "react";
import { AccentLabel } from "@/components/ui/ggw-button";

export const checkoutInputClass =
  "w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-base text-ink placeholder:text-muted transition-colors focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20";

export const checkoutLabelClass = "mb-2 block text-sm font-medium text-ink";

export const checkoutCardClass = "rounded-lg border border-hairline bg-canvas p-6 md:p-8";

const steps = [
  { id: "details", label: "Details" },
  { id: "payment", label: "Payment" },
  { id: "pay", label: "Pay" },
] as const;

export function CheckoutFrame({
  kicker,
  title,
  lead,
  step,
  children,
}: {
  kicker: string;
  title: string;
  lead?: string;
  step?: (typeof steps)[number]["id"];
  children: ReactNode;
}) {
  const activeIndex = step ? steps.findIndex((entry) => entry.id === step) : -1;

  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <section className="px-4 pb-16 pt-32 sm:px-6 md:px-8 md:pb-20 md:pt-40">
        <AccentLabel>{kicker}</AccentLabel>
        <h1 className="mt-4 max-w-3xl text-section text-ink">{title}</h1>
        {lead ? <p className="mt-3 max-w-2xl text-copy text-body">{lead}</p> : null}
        {step ? (
          <ol className="mt-8 grid grid-cols-3 border-t border-dashed border-hairline">
            {steps.map((item, index) => {
              const active = index === activeIndex;
              const done = activeIndex > index;
              return (
                <li key={item.id} className="border-b border-dashed border-hairline py-4 pr-3">
                  <span className={active || done ? "text-caption font-semibold text-brand-accent" : "text-caption font-semibold text-muted"}>
                    0{index + 1}
                  </span>
                  <span className={active ? "mt-1 block text-title-sm text-ink" : "mt-1 block text-title-sm text-body"}>{item.label}</span>
                </li>
              );
            })}
          </ol>
        ) : null}
        <div className="mt-8">{children}</div>
      </section>
    </div>
  );
}
