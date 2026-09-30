import { useEffect } from "react";
import { useLocation, useNavigationType } from "@/lib/react-router";

export function useScrollRestoreDebug(tag: string) {
    const location = useLocation();
    const navType = useNavigationType(); // POP / PUSH / REPLACE

    useEffect(() => {
        const t0 = performance.now();

        const log = (phase: string) => {
            const se = document.scrollingElement;
            console.log(`[${tag}] ${phase}`, {
                navType,
                path: location.pathname + location.search + location.hash,
                winY: window.scrollY,
                docY: se?.scrollTop,
                docH: se?.scrollHeight,
                bodyH: document.body.scrollHeight,
                htmlH: document.documentElement.scrollHeight,
                overflowBody: getComputedStyle(document.body).overflow,
                overflowHtml: getComputedStyle(document.documentElement).overflow,
                smoothHtml: getComputedStyle(document.documentElement).scrollBehavior,
            });
        };

        log("mount");
        requestAnimationFrame(() => log("rAF1"));
        requestAnimationFrame(() => log("rAF2"));
        setTimeout(() => log("t+0"), 0);
        setTimeout(() => log("t+50"), 50);
        setTimeout(() => log("t+250"), 250);

        return () => {
            const dt = Math.round(performance.now() - t0);
            console.log(`[${tag}] unmount after ${dt}ms`, {
                path: location.pathname + location.search + location.hash,
                winY: window.scrollY,
                docY: document.scrollingElement?.scrollTop,
            });
        };
    }, [location.key]); // important: key changes on navigation
}
