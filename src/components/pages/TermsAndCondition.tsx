"use client";

import { Link } from "@/lib/react-router";
import { CONTACT } from "@/config/constants/contactInfo";
import { LegalList, LegalPage, LegalSection } from "@/components/features/legal/legalPageShared";

const linkClass = "text-brand-accent hover:underline";

const TermsAndCondition = () => {
  return (
    <LegalPage
      label="Terms"
      title="Terms for"
      highlight="the work"
      summary="These terms cover the website and the business services offered by Cyveritas Technologies LLP."
      currentPath="/terms-and-conditions"
    >
      <LegalSection number="01" title="Who these terms cover">
        <p>
          This website is operated by {CONTACT.registeredEntity}. The services on it are business consultancy, administrative support, documentation services, project and operational support, billing and invoice management, and customer and business support.
        </p>
        <p>
          By using the website, sending an enquiry, or paying for a service, you agree to these terms. If you do not agree, do not use the website or complete a payment.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Using the website">
        <LegalList
          items={[
            "Use the website for lawful enquiries and to request a published service.",
            "Give accurate contact details and accurate instructions for the work.",
            "Do not attempt to disrupt the website, the checkout, or the payment step.",
            "Do not submit unlawful, misleading, or unsolicited material through the forms.",
          ]}
        />
      </LegalSection>

      <LegalSection number="03" title="What a service includes">
        <p>
          Each service page describes the work and names the payment purpose. The engagement is that described scope. It is not a software licence, a training course, or a certification.
        </p>
        <p>
          Work starts after the payment is confirmed and the scope is clear. A saved checkout on your device is a draft until that payment is confirmed.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Payments">
        <LegalList
          items={[
            "Amounts are in Indian rupees. You choose the amount at checkout for the service you selected.",
            "The payment is collected by UPI and is tied to the payment purpose shown for that service.",
            "Card and net-banking checkout are not offered.",
            "A payment does not transfer ownership of our website, copy, or illustrations.",
          ]}
        />
        <p>
          Cancellation and refunds are set out in the{" "}
          <Link to="/refund-and-cancellation" className={linkClass}>
            refund and cancellation policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="05" title="Materials you send">
        <p>
          Records, documents, and instructions you send stay yours. You confirm you have the right to share them for the service. We use them only to carry out that work and to keep the records the engagement needs.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Website materials">
        <p>
          The text, layout, and illustrations on this website belong to {CONTACT.registeredEntity}. You may read them and share a link. You may not copy them to run a competing service, or remove the credit from an illustration that requires one.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Privacy">
        <p>
          Personal details are handled as described in the{" "}
          <Link to="/privacy-policy" className={linkClass}>
            privacy policy
          </Link>
          . Checkout details can stay in your browser so you can return to the same request. Cookies are described in the{" "}
          <Link to="/cookie-policy" className={linkClass}>
            cookie policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="08" title="Limits">
        <p>
          The work is administrative, documentary, and advisory support. Decisions you take from that work remain yours. We are not responsible for loss caused by incomplete or incorrect material you provide.
        </p>
        <p>
          Where the law allows a limit, liability for a paid engagement is limited to the amount paid for that engagement.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Stopping the work">
        <p>
          Either side may stop an engagement before the work has started. After it has started, completed work is handled under the refund policy. We may decline a request that sits outside the published services or that we cannot deliver.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Changes, law, and disputes">
        <p>
          We may update these terms. The date on this page is the date of the current version. Continuing to use the website after an update means you accept the updated terms.
        </p>
        <p>
          These terms are governed by the laws of India. The courts of Maharashtra have jurisdiction.
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default TermsAndCondition;
