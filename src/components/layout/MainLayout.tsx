"use client";

import ScrollToTopButton from "@/components/common/ScrollToTop";
import { FloatingBottomBarProvider } from "@/providers/FloatingBottomBarContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useScrollRestoreDebug } from "@/hooks/useScrollRestoreDebug";
import { useLenisHashScroll } from "@/hooks/useLenisHashScroll";
import { useLenisScrollRestoration } from "@/hooks/useLenisScrollRestoration";
import type { ReactNode } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

type MainLayoutProps = {
  children: ReactNode;
};

/**
 * MainLayout Component
 *
 * ARCHITECTURE RULES:
 * - Lenis is the ONLY scroll authority
 * - Hash scrolling takes priority over normal scroll restoration
 * - Order matters: hash scroll hook runs first, then scroll restoration
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  useScrollRestoreDebug("MainLayout");

  // Handle hash-based scrolling (e.g. /page#section)
  // This MUST run first to take priority over scroll restoration
  // Offset accounts for fixed header height (~80px) + spacing
  useLenisHashScroll({ offsets: { "contact-form": 50, 'frequently-asked-questions': 100, 'request-callback-form': 80, 'our-programs': 260, webinars: 80, home: 80, services: 80, why: 80, expertise: 80, career: 80, topics: 80, audience: 80, solutions: 80, contact: 80 } });

  // Handle scroll restoration on route change
  // ONLY handles non-hash routes (skips if hash is present)
  // ONLY handles new routes (PUSH/REPLACE), not back/forward
  useLenisScrollRestoration({ duration: 0.6 });

  return (
    <FloatingBottomBarProvider>
      <div className="min-h-screen w-full overflow-x-clip bg-canvas text-body">
        <Navbar />
        {/* <MobileMenu /> */}
        <main className="w-full overflow-x-clip">
          {children}
        </main>
        {/* <TextHoverEffect text="CYBERLABS INDIA" /> */}
        <Footer />
        <ScrollToTopButton />
        {/* ScrollRestoration REMOVED - conflicts with Lenis */}
      </div>
    </FloatingBottomBarProvider>
  );
};

export default MainLayout;
