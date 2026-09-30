"use client";

import { CONTACT } from "@/config/constants/contactInfo";
import { LegalList, LegalPage, LegalSection } from "@/components/features/legal/legalPageShared";

const RefundPolicy = () => {
  return (
    <LegalPage
      label="Refunds"
      title="Refunds and"
      highlight="cancellations"
      summary="How a payment for a business service can be cancelled, and when an amount already paid for completed work stays paid."
      currentPath="/refund-and-cancellation"
    >
      <LegalSection number="01" title="What the payment is for">
        <p>
          A payment is made to {CONTACT.registeredEntity} for one published service and the payment purpose named on that service. The amount is the amount you select at checkout. It is not a course fee and it does not reserve a training seat.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Before the work starts">
        <p>
          If you cancel before any of the agreed work has started, write to us and we will refund the amount paid for that request. A saved checkout that was never paid does not need a refund.
        </p>
      </LegalSection>

      <LegalSection number="03" title="After the work has started">
        <LegalList
          items={[
            "The fee for work already completed stays paid.",
            "An amount that covers work not yet started can be reviewed and refunded for that unused part.",
            "Stopping midway does not refund the completed part of the engagement.",
          ]}
        />
      </LegalSection>

      <LegalSection number="04" title="If we cannot deliver">
        <p>
          If we cannot carry out the agreed scope, we refund the amount paid for the work that will not be delivered. If nothing has been delivered, that refund is the full amount paid for the request.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Duplicate or failed payments">
        <p>
          A duplicate charge for the same request is refunded. A payment that fails and does not reach us is not a completed order. The UPI provider’s confirmation is the record of whether the payment succeeded.
        </p>
      </LegalSection>

      <LegalSection number="06" title="How to ask">
        <p>
          Email {CONTACT.supportEmail} with the service name, the amount, the date of payment, and the order reference if you have one. We reply to that address with the outcome. Refunds go back by the same UPI route where the provider allows it.
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default RefundPolicy;
