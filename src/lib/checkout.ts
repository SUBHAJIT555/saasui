import { getService, type Service } from "@/config/data/services";

export const CHECKOUT_STORAGE_KEY = "xyz-checkout-request";
export const CHECKOUT_CART_KEY = "xyz-checkout-cart";
export const PENDING_ORDER_KEY = "xyz_pending_order_id";

export const amountChoices = [
  { id: "500", label: "₹500", amount: 500 },
  { id: "1000", label: "₹1,000", amount: 1000 },
  { id: "2000", label: "₹2,000", amount: 2000 },
  { id: "5000", label: "₹5,000", amount: 5000 },
  { id: "custom", label: "Custom", amount: null },
] as const;

export type AmountChoiceId = (typeof amountChoices)[number]["id"];

export const paymentMethods = [
  {
    id: "online-banking",
    label: "Online banking",
    hint: "Coming soon. Hosted checkout is not active for this merchant.",
    enabled: false,
  },
  {
    id: "card",
    label: "Card",
    hint: "Coming soon. Hosted checkout is not active for this merchant.",
    enabled: false,
  },
  {
    id: "upi",
    label: "UPI",
    hint: "Phone: open your UPI app. Computer: scan the QR with your phone.",
    enabled: true,
  },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];

export type CheckoutCartItem = {
  name: string;
  quantity: number;
  price: number;
  serviceSlug: string;
};

export type CheckoutRequest = {
  id: string;
  serviceSlug: Service["slug"];
  serviceName: string;
  paymentPurpose: string;
  amountChoiceId: AmountChoiceId;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  contactType: "Telegram" | "WhatsApp";
  contactDetails: string;
  amount: number;
  amountLabel: string;
  currency: "INR";
  message: string;
  createdAt: string;
  paymentMethodId?: PaymentMethodId;
  paymentMethodLabel?: string;
  paidAt?: string;
  orderId?: string;
};

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatAmount(value: number) {
  return inrFormatter.format(value);
}

export function getAmountChoice(id: string | null | undefined) {
  return amountChoices.find((choice) => choice.id === id) ?? null;
}

export function createCheckoutId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `xyz-${Date.now()}`;
}

export function saveCheckoutCart(items: CheckoutCartItem[]) {
  window.localStorage.setItem(CHECKOUT_CART_KEY, JSON.stringify(items));
}

export function clearCheckoutCart() {
  window.localStorage.removeItem(CHECKOUT_CART_KEY);
}

export function saveCheckoutRequest(request: CheckoutRequest) {
  window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(request));
  saveCheckoutCart([
    {
      name: `${request.serviceName} — ${request.paymentPurpose}`,
      quantity: 1,
      price: request.amount,
      serviceSlug: request.serviceSlug,
    },
  ]);
}

export function readCheckoutRequest(): CheckoutRequest | null {
  const raw = window.localStorage.getItem(CHECKOUT_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as CheckoutRequest;
    if (!getService(parsed.serviceSlug)) return null;
    if (!Number.isFinite(parsed.amount) || parsed.amount <= 0) return null;
    // A request saved by an older build can be missing fields the payment step
    // reads, which would otherwise surface as an opaque runtime error. Treating
    // it as absent sends the customer back to checkout instead.
    const required = ["name", "message", "contactType", "contactDetails", "amountLabel"] as const;
    if (required.some((key) => typeof parsed[key] !== "string")) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getPaymentMethod(id: string | null | undefined) {
  return paymentMethods.find((method) => method.id === id) ?? null;
}

export function isEnabledPaymentMethod(id: string | null | undefined): id is PaymentMethodId {
  return paymentMethods.some((method) => method.id === id && method.enabled);
}

export function saveCheckoutPayment(
  request: CheckoutRequest,
  methodId: PaymentMethodId,
  extras?: Partial<CheckoutRequest>,
) {
  const method = getPaymentMethod(methodId);
  if (!method?.enabled) return request;

  const next: CheckoutRequest = {
    ...request,
    paymentMethodId: method.id,
    paymentMethodLabel: method.label,
    ...extras,
  };
  saveCheckoutRequest(next);
  return next;
}

export function markCheckoutPaid(request: CheckoutRequest, orderId?: string) {
  const next: CheckoutRequest = {
    ...request,
    paidAt: new Date().toISOString(),
    orderId: orderId || request.orderId,
  };
  saveCheckoutRequest(next);
  clearCheckoutCart();
  window.sessionStorage.removeItem(PENDING_ORDER_KEY);
  return next;
}

export function preferredUpiMode() {
  if (typeof navigator === "undefined") return "QR";
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? "INTENT"
    : "QR";
}

export function splitName(name: string | null | undefined) {
  const parts = String(name ?? "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" ") || "Customer",
  };
}

export function normalizeIndianMobile(value: string) {
  return value.replace(/\D/g, "").replace(/^91/, "");
}

export function isIndianMobile(value: string) {
  return /^[6-9][0-9]{9}$/.test(normalizeIndianMobile(value));
}

export type MpurseCreateResult = {
  success?: boolean;
  error?: string;
  order_id?: string;
  flow?: string;
  pay_url?: string;
  checkout_url?: string;
  amount?: string;
  qr_data?: string;
  intent_url?: string;
};

export async function startMpursePayment(request: CheckoutRequest) {
  const names = splitName(request.name);
  const notes = [
    String(request.message ?? "").trim(),
    `Contact: ${request.contactType ?? ""} ${request.contactDetails ?? ""}`.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  const res = await fetch("/api/mpurse.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "create_session",
      payment_method: "upi",
      upi_mode: preferredUpiMode(),
      name: request.name,
      billing_first_name: names.firstName,
      billing_last_name: names.lastName,
      billing_email: request.email,
      billing_phone: request.phone,
      billing_address: request.address || request.company,
      billing_town: request.city,
      notes,
      cart_items: [
        {
          name: `${request.serviceName} — ${request.paymentPurpose}`,
          quantity: 1,
          price: request.amount,
        },
      ],
    }),
  });

  const raw = await res.text();
  let result: MpurseCreateResult = {};
  try {
    result = raw ? (JSON.parse(raw) as MpurseCreateResult) : {};
  } catch {
    throw new Error("Payment PHP is not running. Keep yarn dev open and in another terminal run: yarn php:api");
  }

  if (!res.ok || !result.order_id) {
    throw new Error(result.error || "Failed to start payment");
  }

  if (result.flow === "hosted") {
    throw new Error("Card and net banking are not available yet. Please pay with UPI.");
  }

  window.sessionStorage.setItem(PENDING_ORDER_KEY, result.order_id);
  saveCheckoutPayment(request, "upi", { orderId: result.order_id });
  return result;
}
