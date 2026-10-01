import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/react-router";
import { useMobileMenuStore } from "@/store/mobileMenuStore";
import { IoClose, IoMailOutline } from "react-icons/io5";
import { Logo } from "@/components";
import { useLenis } from "@/hooks/useLenis";
import { CONTACT } from "@/config/constants/contactInfo";
import { primaryNav } from "@/config/routes";

const MobileMenu: React.FC = () => {
  const { isOpen, closeMenu } = useMobileMenuStore();
  const lenis = useLenis();

  const navigationItems = primaryNav.map((item) => ({
    name: item.name,
    path: item.path,
  }));

  // Prevent background scroll when menu is open
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        closeMenu();
      }
    };

    // Prevent background scroll (wheel, touch, keyboard)
    const preventScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      // Allow scrolling only within the menu panel
      if (!target.closest(".mobile-menu-panel")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Prevent touch scroll on background
    const preventTouchScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      // Allow scrolling only within the menu panel
      if (!target.closest(".mobile-menu-panel")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (isOpen) {
      // Add click outside listener
      document.addEventListener("click", handleClickOutside);

      // Prevent background scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Stop Lenis smooth scroll
      if (lenis) {
        lenis.stop();
      }

      // Prevent wheel scroll on background
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventTouchScroll, { passive: false });

      // Prevent keyboard scroll (arrow keys, space, etc.)
      document.addEventListener("keydown", preventScroll, { passive: false });
    } else {
      // Restore scrolling
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Resume Lenis smooth scroll
      if (lenis) {
        lenis.start();
      }
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventTouchScroll);
      document.removeEventListener("keydown", preventScroll);

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Ensure Lenis is resumed on cleanup
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen, closeMenu, lenis]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-999 mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 cursor-pointer overflow-hidden"
              style={{ touchAction: "none" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />

            {/* Menu Panel */}
            <motion.div
              className="mobile-menu-panel absolute top-0 right-0 h-screen w-full md:w-80 bg-white backdrop-blur-md border-l border-white/10 flex flex-col overflow-y-auto"
              style={{
                background:
                  "repeating-linear-gradient(135deg, #f9fafb 0px, #f9fafb 1px, transparent 1px, transparent 4px), white",
                touchAction: "pan-y",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-4 px-4 sm:px-6 flex-1 flex flex-col min-h-0 pb-20">
                {/* Logo and Close Button */}
                <div className="flex justify-between items-center mb-8">
                  {/* Logo */}
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Link to="/" onClick={closeMenu}>
                      <motion.div
                        className="w-24 sm:w-28 h-full relative"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Logo />
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    className="text-text-primary p-2 hover:text-primary transition-colors cursor-pointer duration-200"
                    onClick={closeMenu}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <IoClose className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => {
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-text-primary text-base sm:text-lg font-inter-display font-semibold tracking-wide hover:text-primary transition-colors duration-200 py-2"
                        onClick={closeMenu}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.08,
                            ease: "easeOut",
                          }}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Bottom Section - Contact Info */}
                <motion.div
                  className="mt-auto pt-8 pb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <div className="space-y-3 pb-6">
                    <motion.a
                      href={`mailto:${CONTACT.supportEmail}`}
                      className="flex items-center gap-3 text-text-primary hover:text-primary transition-colors duration-200 group"
                      whileHover={{ x: 2 }}
                    >
                      <IoMailOutline className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-inter-display">
                        {CONTACT.supportEmail}
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
