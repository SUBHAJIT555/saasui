import ContactHero from "@/components/ui/ContactHero";
import ContactCompanyInfo from "@/components/features/contact/ContactCompanyInfo";
import ContactAddress from "@/components/features/contact/ContactAddress";
import ContactHeader from "@/components/features/contact/ContactHeader";
import HowReachUs from "@/components/features/contact/HowReachUs";

const sectionDivider = (
  <div
    className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-t border-dashed border-zinc-200"
    aria-hidden
  />
);

const Contact = () => {
  return (
    <div className="relative z-10">
      <ContactHero />
      <ContactCompanyInfo />
      {sectionDivider}
      <ContactHeader />
      {sectionDivider}
      <ContactAddress />
      <HowReachUs />
    </div>
  );
};

export default Contact;
