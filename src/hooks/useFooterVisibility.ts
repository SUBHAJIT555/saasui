import { useEffect, useState } from "react";

export const useFooterVisibility = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => setIsFooterVisible(entry.isIntersecting));
            },
            { threshold: 0.05, rootMargin: "0px 0px 0px 0px" },
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return isFooterVisible;
};
