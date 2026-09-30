"use client";

import { Link } from "@/lib/react-router";
import { CONTACT } from "@/config/constants/contactInfo";
import { LegalList, LegalPage, LegalSection } from "@/components/features/legal/legalPageShared";

const linkClass = "text-brand-accent hover:underline";

const PrivacyPolicy = () => {
  return (
    <LegalPage
      label="Privacy"
      title="How we handle"
      highlight="your details"
      summary="What Cyveritas Technologies LLP collects when you write, subscribe, or pay for a service, and how that information is used."
      currentPath="/privacy-policy"
    >
      <LegalSection number="01" title="Who this covers">
        <p>
          {CONTACT.registeredEntity} is responsible for the personal information collected through this website. The services are business support, not a training platform and not a public directory of customers.
        </p>
      </LegalSection>

      <LegalSection number="02" title="What you give us">
        <LegalList
          items={[
            "Contact form: your name, email, mobile number, the service you ask about, and your message.",
            "Checkout: your name, email, mobile number, address, the service, the payment purpose, the amount you choose, and how you prefer to be reached.",
            "Newsletter: the email address you submit.",
            "Payment step: an order reference and the payment status returned after UPI. We do not receive your UPI PIN.",
          ]}
        />
      </LegalSection>

      <LegalSection number="03" title="How it is used">
        <LegalList
          items={[
            "To reply to an enquiry and to carry out the service you selected.",
            "To send the payment request and a record of that payment.",
            "To send the newsletter only when you asked for it.",
            "To keep accounting records of a completed payment.",
          ]}
        />
        <p>We do not sell personal information.</p>
      </LegalSection>

      <LegalSection number="04" title="What stays on your device">
        <p>
          A checkout draft is saved in local storage on your browser so the same request can be restored. A pending order reference is kept in session storage until that payment step ends. Clearing site data in the browser removes both. See the{" "}
          <Link to="/cookie-policy" className={linkClass}>
            cookie policy
          </Link>{" "}
          for what this website does and does not store.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Who else sees it">
        <p>
          A payment provider receives what it needs to collect the UPI payment. An email provider receives what it needs to deliver a reply or the newsletter. We do not pass your details to advertisers.
        </p>
      </LegalSection>

      <LegalSection number="06" title="How long it is kept">
        <p>
          Enquiry and order records are kept for as long as needed to deliver the service, answer a later question about that work, and meet accounting requirements. A newsletter address is kept until you ask to be removed.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Your requests">
        <p>
          Write to{" "}
          <a href={`mailto:${CONTACT.supportEmail}`} className={linkClass}>
            {CONTACT.supportEmail}
          </a>{" "}
          to ask for a copy of the details we hold, a correction, or deletion of details we no longer need to keep. Records required for accounting are kept for that purpose.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Children and updates">
        <p>
          These services are for businesses. We do not seek information from children.
        </p>
        <p>
          If this policy changes, the date at the top of the page changes with it.
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default PrivacyPolicy;
