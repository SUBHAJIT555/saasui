import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "@/lib/react-router";
import { useLenis } from "./useLenis";


/**
 * Hook for scroll restoration on route changes.
 * 
 * ARCHITECTURE RULES:
 * - ONLY handles non-hash routes (hash scrolling is handled separately)
 * - Lenis is the ONLY scroll authority
 * - Scrolls to top for new routes (PUSH/REPLACE)
 * - Does NOT restore scroll position on back/forward (let browser handle it)
 * 
 * WHY NO BACK/FORWARD RESTORATION:
 * - Browser's native scroll restoration works fine for non-hash routes
 * - Lenis will sync with browser's scroll position automatically
 * - Prevents conflicts and double scrolling
 */
export const useLenisScrollRestoration = ({ duration = 0.6 } = {}) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const lenis = useLenis();
  const positions = useRef(new Map<string, number>());

  useEffect(() => {
    if (!lenis) return;

    const key = location.key;

    // SAVE scroll position before navigation
    return () => {
      positions.current.set(
        key,
        lenis.scroll
      );
    };
  }, [location.key, lenis]);

  useEffect(() => {
    if (!lenis) return;

    const saved = positions.current.get(location.key);

    // HASH takes priority
    if (location.hash) return;

    if (navigationType === "POP" && saved != null) {
      lenis.scrollTo(saved, { immediate: true });
      return;
    }

    // PUSH / REPLACE → scroll to top
    lenis.scrollTo(0, { duration });
  }, [location.key, navigationType, location.hash, lenis, duration]);
  
};
