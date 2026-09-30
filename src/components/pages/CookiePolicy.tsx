"use client";

import { Link } from "@/lib/react-router";
import { LegalList, LegalPage, LegalSection } from "@/components/features/legal/legalPageShared";

const linkClass = "text-brand-accent hover:underline";

const CookiePolicy = () => {
  return (
    <LegalPage
      label="Cookies"
      title="What this site"
      highlight="stores"
      summary="This website does not use advertising or analytics cookies. A checkout draft is stored in your browser so you can return to it."
      currentPath="/cookie-policy"
    >
      <LegalSection number="01" title="Cookies">
        <p>
          A cookie is a small file a website can store in the browser. This website does not set advertising cookies and does not run a third-party analytics tag.
        </p>
        <p>
          The host that serves the site may set a strictly necessary cookie so the page can load. That cookie is not used to build a marketing profile.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Storage that is not a cookie">
        <p>Checkout uses browser storage on your device:</p>
        <LegalList
          items={[
            "Local storage keeps the service, amount, and contact details you entered, so the checkout form can be restored.",
            "Session storage keeps the pending order reference while a UPI payment is in progress. It is cleared when that browser session ends.",
          ]}
        />
        <p>
          This storage stays in your browser. It is not sold and it is not read by an advertising network.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Clearing it">
        <p>
          Use your browser’s site-data or cookie controls to remove stored data for this website. Clearing it removes a saved checkout. It does not cancel a payment that has already been confirmed.
        </p>
        <p>
          How personal details are used after you submit them is described in the{" "}
          <Link to="/privacy-policy" className={linkClass}>
            privacy policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="04" title="Changes">
        <p>
          If the website starts using a cookie for a new purpose, this page will say what it is and why it is there. The date at the top is the date of the current version.
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default CookiePolicy;
