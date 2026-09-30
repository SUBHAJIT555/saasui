"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, type ReactNode } from "react";

type PortalProps = {
    children: ReactNode;
};

const Portal = ({ children }: PortalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(children, document.body);
};

export default Portal;
