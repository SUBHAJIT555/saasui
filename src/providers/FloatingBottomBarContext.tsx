import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

type FloatingBottomBarContextValue = {
    isActive: boolean;
    setIsActive: (active: boolean) => void;
};

const FloatingBottomBarContext = createContext<FloatingBottomBarContextValue | null>(
    null,
);

export function FloatingBottomBarProvider({ children }: { children: ReactNode }) {
    const [isActive, setIsActive] = useState(false);

    const value = useMemo(
        () => ({
            isActive,
            setIsActive,
        }),
        [isActive],
    );

    return (
        <FloatingBottomBarContext.Provider value={value}>
            {children}
        </FloatingBottomBarContext.Provider>
    );
}

export function useFloatingBottomBar() {
    const context = useContext(FloatingBottomBarContext);
    if (!context) {
        throw new Error(
            "useFloatingBottomBar must be used within FloatingBottomBarProvider",
        );
    }
    return context;
}
