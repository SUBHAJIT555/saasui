"use client";

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "@/lib/react-router";
import { GgwButton } from "@/components/ui/ggw-button";
import { PENDING_ORDER_KEY, markCheckoutPaid, readCheckoutRequest } from "@/lib/checkout";
import { CheckoutFrame, checkoutCardClass } from "@/components/checkout/CheckoutFrame";

type PayViewState = "loading" | "pay" | "success" | "failed" | "missing";

type StatusPayload = {
  status?: string;
  order_id?: string;
  amount?: string | number;
  txn_id?: string;
  error?: string;
  message?: string;
  qr_data?: string;
  intent_url?: string;
  payer_vpa?: string;
  payment_mode?: string;
};

function resolvePayStatus(result: StatusPayload) {
  const status = (result.status || "pending").toLowerCase();
  const msg = `${result.message || ""} ${result.error || ""}`.toLowerCase();
  if (status === "failed" && /not found|database error|no record|does not exist/.test(msg)) {
    return "pending";
  }
  return status;
}

function isPhoneBrowser() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function qrImageSrc(qrData?: string, intentUrl?: string) {
  if (qrData) {
    return qrData.startsWith("data:") ? qrData : `data:image/png;base64,${qrData}`;
  }
  if (intentUrl) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&ecc=M&data=${encodeURIComponent(intentUrl)}`;
  }
  return "";
}

export function PayView() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<PayViewState>("loading");
  const [details, setDetails] = useState<StatusPayload>({});
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    setIsPhone(isPhoneBrowser());
  }, []);

  useEffect(() => {
    const orderId = searchParams.get("order_id") || window.sessionStorage.getItem(PENDING_ORDER_KEY) || "";

    if (!orderId) {
      setView("missing");
      return;
    }

    const poll = { cancelled: false, timer: 0 };

    const check = async () => {
      const res = await fetch("/api/mpurse.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "status", order_id: orderId }),
      });
      const raw = await res.text();
      let result: StatusPayload = {};
      try {
        result = raw ? (JSON.parse(raw) as StatusPayload) : {};
      } catch {
        throw new Error("Payment PHP is not running.");
      }
      if (poll.cancelled) return null;
      setDetails({ ...result, order_id: result.order_id || orderId });
      return resolvePayStatus(result);
    };

    const finish = (next: PayViewState) => {
      if (poll.timer) {
        window.clearInterval(poll.timer);
        poll.timer = 0;
      }
      if (next === "success") {
        const request = readCheckoutRequest();
        if (request) markCheckoutPaid(request, orderId);
      }
      setView(next);
    };

    const run = async () => {
      try {
        const status = await check();
        if (poll.cancelled || !status) return;
        if (status === "success" || status === "failed") {
          finish(status);
          return;
        }
        setView("pay");
      } catch {
        if (!poll.cancelled) {
          setDetails({ error: "Unable to load payment. Keep yarn dev open and run yarn php:api in another terminal.", order_id: orderId });
          setView("pay");
        }
        return;
      }

      poll.timer = window.setInterval(() => {
        void (async () => {
          try {
            const next = await check();
            if (poll.cancelled || !next) return;
            if (next === "success" || next === "failed") finish(next);
          } catch {
            /* keep waiting */
          }
        })();
      }, 3000);
    };

    void run();

    return () => {
      poll.cancelled = true;
      if (poll.timer) window.clearInterval(poll.timer);
    };
  }, [searchParams]);

  const amountLabel =
    details.amount !== undefined && details.amount !== null && details.amount !== ""
      ? `₹${Number(details.amount).toLocaleString("en-IN")}`
      : "";
  const qrSrc = qrImageSrc(details.qr_data, details.intent_url);

  return (
    <CheckoutFrame
      kicker={view === "success" ? "Paid" : "UPI"}
      title={
        view === "loading"
          ? "Preparing payment"
          : view === "success"
            ? "Payment successful"
            : view === "failed"
              ? "Payment failed"
              : view === "missing"
                ? "No order found"
                : "Complete payment"
      }
      lead={
        view === "pay"
          ? "Keep this page open. It updates on its own when the UPI payment succeeds."
          : undefined
      }
      step="pay"
    >
      <div className={`${checkoutCardClass} mx-auto max-w-xl text-center`}>
        {view === "loading" ? <p className="text-copy text-body">Please wait.</p> : null}

        {view === "pay" ? (
          <div className="space-y-4 text-copy leading-relaxed text-body">
            <p>
              {amountLabel ? `Amount: ${amountLabel}. ` : ""}
              {details.order_id ? `Order ${details.order_id}.` : ""}
            </p>
            {details.payer_vpa ? (
              <p>
                A payment request was sent to <strong className="text-ink">{details.payer_vpa}</strong>. Approve it in your UPI app.
              </p>
            ) : null}
            {isPhone && details.intent_url ? (
              <GgwButton href={details.intent_url} variant="accent">
                Open UPI app
              </GgwButton>
            ) : null}
            {qrSrc ? (
              <div className="mx-auto max-w-xs rounded-lg border border-dashed border-hairline bg-surface-soft p-5">
                <p>
                  {isPhone
                    ? "Or scan this QR from another phone."
                    : "Scan this QR with GPay, PhonePe, Paytm, or any UPI app on your phone."}
                </p>
                <img src={qrSrc} alt="UPI QR code" width={220} height={220} className="mx-auto mt-4 rounded-lg bg-canvas p-2" />
              </div>
            ) : null}
            {!details.payer_vpa && !qrSrc && !details.intent_url ? (
              <p className="text-red-600" role="alert">
                {details.error || details.message || "Payment details are not available. Go back to checkout and try again."}
              </p>
            ) : null}
          </div>
        ) : null}

        {view === "success" ? (
          <div className="space-y-3 text-copy leading-relaxed text-body">
            <p>
              {details.order_id ? `Order ID: ${details.order_id}. ` : ""}
              {amountLabel ? `Amount paid: ${amountLabel}.` : ""}
            </p>
            <GgwButton href="/" variant="accent">
              Back to home
            </GgwButton>
          </div>
        ) : null}

        {view === "failed" ? (
          <div className="space-y-3 text-copy leading-relaxed text-body">
            <p>{details.message || details.error || "The UPI payment was not completed."}</p>
            <GgwButton href="/checkout" variant="accent">
              Try again
            </GgwButton>
          </div>
        ) : null}

        {view === "missing" ? (
          <div className="space-y-3 text-copy leading-relaxed text-body">
            <p>Start checkout again to generate a new UPI payment.</p>
            <GgwButton href="/checkout" variant="accent">
              Go to checkout
            </GgwButton>
          </div>
        ) : null}

        {view !== "success" ? (
          <p className="mt-6 text-sm">
            <Link to="/checkout" className="font-medium text-brand-accent hover:underline">
              Back to checkout
            </Link>
          </p>
        ) : null}
      </div>
    </CheckoutFrame>
  );
}
