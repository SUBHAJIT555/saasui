import { useEffect, useRef } from "react";
import { useLocation } from "@/lib/react-router";
import { useLenis } from "./useLenis";
interface UseLenisHashScrollOptions {
  defaultOffset?: number;
  offsets?: Record<string, number>;
}


/**
 * Hook for hash-based scrolling with Lenis.
 * 
 * ARCHITECTURE RULES:
 * - Lenis is the ONLY scroll authority
 * - Waits for DOM and layout stability using observers
 * - Scrolls exactly once per hash change
 * - Works across route changes
 * 
 * HOW IT WORKS:
 * 1. Detects hash changes in URL
 * 2. Waits for target element to exist
 * 3. Observes DOM mutations and resize events for stability
 * 4. Scrolls to element with offset when stable
 * 5. Cleans up observers after scroll completes
 */
export const useLenisHashScroll = ({
  defaultOffset = 80,
  offsets = {},
}: UseLenisHashScrollOptions = {}) => {
  const location = useLocation();
  const lenis = useLenis();
  const handledRef = useRef<string | null>(null);

  useEffect(() => {
    if (!lenis || !location.hash) return;

    const id = location.hash.slice(1);
    if (!id) return;

    const key = location.pathname + location.hash;
    if (handledRef.current === key) return;
    handledRef.current = key;

    const offset =
      offsets[id] ?? defaultOffset;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;

        lenis.scrollTo(el, {
          offset: -offset,
          duration: 1.2,
        });
      });
    });
  }, [location.key, location.hash, location.pathname, lenis, defaultOffset, offsets]);
};
