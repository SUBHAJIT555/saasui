/**
 * Single source of truth for company contact information.
 * Use these constants everywhere contact details are displayed.
 */

export const CONTACT = {
  /** Registered legal entity name */
  registeredEntity: "Cyveritas Technologies LLP",

  /** India office address (display lines) */
  officeAddressIndia: [
    "Office No. 702 & 705, VB Capital",
    "Aundh, Haveli, Pune – 411007",
    "Maharashtra, India",
  ],

  /** Full India office address as single string for mail/maps */
  officeAddressIndiaFull:
    "Office No. 702 & 705, VB Capital, Aundh, Haveli, Pune – 411007, Maharashtra, India",

  /** Course / education related queries */
  educationEmail: "education@cyberlabs-india.com",

  /** General support */
  supportEmail: "education@cyberlabs-india.com",
} as const;
