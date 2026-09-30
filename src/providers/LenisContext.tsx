"use client";

import { createContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";

export interface LenisContextType {
  lenis: Lenis | null;
}

export const LenisContext = createContext<LenisContextType>({ lenis: null });

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis immediately
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Attach Lenis to window for proper initialization
    if (typeof window !== "undefined") {
      (window as Window & { lenis?: Lenis }).lenis = lenisInstance;
    }

      // Animation frame loop
      function raf(time: number) {
        lenisInstance.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }

      rafRef.current = requestAnimationFrame(raf);

      // Ensure Lenis is always active and responsive
      lenisInstance.on("scroll", () => {
        // Keep Lenis active
      });

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        setLenis(null);
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
};
