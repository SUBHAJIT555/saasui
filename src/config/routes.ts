export const siteRoutes = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
  checkout: "/checkout",
  checkoutPayment: "/checkout/payment",
  checkoutSuccess: "/checkout/success",
  checkoutCancel: "/checkout/cancel",
  pay: "/pay",
  orderStatus: "/order-status",
} as const;

export const primaryNav = [
  { name: "Home", path: siteRoutes.home },
  { name: "About", path: siteRoutes.about },
  { name: "Services", path: siteRoutes.services },
  { name: "Contact", path: siteRoutes.contact },
] as const;

export const legalNav = [
  { name: "Terms & Condition", path: "/terms-and-conditions" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Cookie Policy", path: "/cookie-policy" },
  { name: "Refund & Cancellation", path: "/refund-and-cancellation" },
] as const;

export const checkoutNav = [
  { name: "Checkout", path: siteRoutes.checkout },
  { name: "Payment", path: siteRoutes.checkoutPayment },
  { name: "Pay", path: siteRoutes.pay },
  { name: "Order status", path: siteRoutes.orderStatus },
  { name: "Payment success", path: siteRoutes.checkoutSuccess },
  { name: "Payment cancelled", path: siteRoutes.checkoutCancel },
] as const;
