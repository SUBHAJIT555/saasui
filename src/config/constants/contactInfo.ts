/**
 * Single source of truth for company contact information.
 * Use these constants everywhere contact details are displayed.
 */

export const CONTACT = {
  /** Registered legal entity name, as it appears on payment records */
  registeredEntity: "TANIKSHA ENTERPRISES",

  /** Registered office address (display lines) */
  officeAddressIndia: [
    "Shop No. C-A12, Shudhanshu Chember",
    "Near Railway Station, Kalyan West",
    "Kalyan, Thane – 421301, Maharashtra, India",
  ],

  /** Full registered address as single string for mail/maps */
  officeAddressIndiaFull:
    "Shop No. C-A12, Shudhanshu Chember, Near Railway Station, Kalyan West, Kalyan, Thane – 421301, Maharashtra, India",

  /** General enquiries and support */
  supportEmail: "info@prime-hive.com",
} as const;
