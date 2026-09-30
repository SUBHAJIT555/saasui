import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "@/lib/react-router";
import { Logo } from "@/components";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";
import { GgwButton } from "@/components/ui/ggw-button";
import {
    Root as DrawerRoot,
    Trigger as DrawerTrigger,
    Content as DrawerContent,
    Header as DrawerHeader,
    Body as DrawerBody,
    Footer as DrawerFooter,
} from "@/components/ui/drawer";
import { Kbd } from "@/components/ui/kbd";
import { crosshatchBgStyle } from "@/config/constants/bootcampStyles";
import { CONTACT } from "@/config/constants/contactInfo";
import { Briefcase, ClipboardList, FolderOpen, Kanban, MessagesSquare, Receipt, type LucideIcon } from "lucide-react";
import { services, servicePath, type Service } from "@/config/data/services";
import { legalNav, primaryNav, siteRoutes } from "@/config/routes";
import { CandyButton } from "@/components/ui/candy-button";

const drawerItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.035,
            duration: 0.18,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    }),
};

type DrawerNavItemData = { name: string; path: string };

function DrawerServicesMenu({
    index,
    active,
    pathname,
    onNavigate,
}: {
    index: number;
    active: boolean;
    pathname: string;
    onNavigate: () => void;
}) {
    const [open, setOpen] = useState(active);

    return (
        <motion.div custom={index} initial="hidden" animate="visible" variants={drawerItemVariants}>
            <div
                className={cn(
                    "group flex w-full items-center gap-2 border-b border-dashed border-hairline py-3 text-sm",
                    active ? "font-semibold text-ink" : "font-medium text-body",
                )}
            >
                <Link to={siteRoutes.services} onClick={onNavigate} className="min-w-0 flex-1">
                    Services
                </Link>
                <button
                    type="button"
                    aria-expanded={open}
                    aria-label={open ? "Hide services" : "Show services"}
                    onClick={() => setOpen((value) => !value)}
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-ink"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn("transition-transform duration-200", open && "rotate-180")}
                        aria-hidden
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 9l6 6l6 -6" />
                    </svg>
                </button>
            </div>
            {open ? (
                <div className="border-b border-dashed border-hairline py-2 pl-3">
                    {services.map((service) => {
                        const path = servicePath(service.slug);
                        const serviceActive = pathname === path || pathname.startsWith(`${path}/`);
                        const Icon = serviceMenuIcons[service.slug];
                        return (
                            <Link key={service.slug} to={path} onClick={onNavigate} className="flex items-start gap-3 py-2">
                                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                                <span className="min-w-0">
                                    <span className={cn("block text-sm", serviceActive ? "font-semibold text-ink" : "font-medium text-body")}>
                                        {service.name}
                                    </span>
                                    <span className="mt-0.5 block text-caption font-semibold uppercase tracking-[0.12em] text-brand-accent">
                                        {service.paymentPurpose}
                                    </span>
                                </span>
                            </Link>
                        );
                    })}
                </div>
            ) : null}
        </motion.div>
    );
}

const serviceMenuIcons: Record<Service["slug"], LucideIcon> = {
    "business-consultancy": Briefcase,
    "administrative-support": ClipboardList,
    "documentation-services": FolderOpen,
    "project-operational-support": Kanban,
    "billing-invoice-management": Receipt,
    "customer-business-support": MessagesSquare,
};

function DesktopServicesMenu({
    active,
    pathname,
}: {
    active: boolean;
    pathname: string;
}) {
    const [open, setOpen] = useState(false);
    const closeTimer = useRef<number | null>(null);

    const openMenu = () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const scheduleClose = () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setOpen(false), 140);
    };

    return (
        <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
        >
            <div
                className={cn(
                    "inline-flex items-center rounded-full transition-colors",
                    open || active ? "bg-zinc-100 text-ink" : "text-body hover:bg-zinc-100 hover:text-ink",
                )}
            >
                <Link
                    to={siteRoutes.services}
                    className="py-1.5 pl-3 text-sm font-medium"
                    onClick={() => setOpen(false)}
                >
                    Services
                </Link>
                <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-label="Show services"
                    onClick={openMenu}
                    className="py-1.5 pr-3 pl-1"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn("transition-transform duration-200", open && "rotate-180")}
                    aria-hidden
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 9l6 6l6 -6" />
                </svg>
                </button>
            </div>
            {open ? (
                <div className="absolute left-1/2 top-full z-50 w-[42rem] -translate-x-1/2 pt-3">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-[0_18px_50px_-28px_rgba(17,17,17,0.45)]">
                        <div className="grid grid-cols-3 gap-1">
                            {services.map((service) => {
                                const path = servicePath(service.slug);
                                const serviceActive = pathname === path || pathname.startsWith(`${path}/`);
                                const Icon = serviceMenuIcons[service.slug];
                                return (
                                    <Link
                                        key={service.slug}
                                        to={path}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-zinc-50",
                                            serviceActive && "bg-zinc-50",
                                        )}
                                    >
                                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-800" aria-hidden />
                                        <span className="min-w-0">
                                            <span className="block text-sm font-semibold text-ink">{service.name}</span>
                                            <span className="mt-1 block text-xs leading-relaxed text-muted">
                                                {service.summary}
                                            </span>
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function DrawerNavItem({
    item,
    index,
    active,
    onNavigate,
}: {
    item: DrawerNavItemData;
    index: number;
    active: boolean;
    onNavigate: () => void;
}) {
    return (
        <motion.div
            key={item.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={drawerItemVariants}
        >
            <Link to={item.path} onClick={onNavigate} className="block w-full">
                <div
                    className={cn(
                        "flex w-full items-center border-b border-dashed border-hairline py-3 text-sm",
                        active ? "font-semibold text-ink" : "font-medium text-body",
                    )}
                >
                    <span className="truncate">{item.name}</span>
                </div>
            </Link>
        </motion.div>
    );
}

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCommandOpen, setIsCommandOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCommandUrl, setActiveCommandUrl] = useState<string | null>(null);

    const commandInputRef = useRef<HTMLInputElement | null>(null);
    const commandScrollRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const lenis = useLenis();

    const navigationItems = primaryNav.map((item) => ({
        name: item.name,
        path: item.path,
    }));

    const legalItems = legalNav.map((item) => ({
        name: item.name,
        path: item.path,
    }));

    useEffect(() => {
        if (!lenis) return;

        let ticking = false;

        const handleScroll = ({ scroll }: { scroll: number }) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(scroll > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };

        lenis.on("scroll", handleScroll);

        if (lenis.scroll !== undefined) {
            setIsScrolled(lenis.scroll > 10);
        }

        return () => {
            lenis.off("scroll", handleScroll);
        };
    }, [lenis]);

    const normalizedQuery = searchQuery.toLowerCase().trim();

    const filterByQuery = (text: string) =>
        !normalizedQuery || text.toLowerCase().includes(normalizedQuery);

    const filteredNavigation = navigationItems.filter(
        (item) => filterByQuery(item.name) || filterByQuery(item.path)
    );

    const filteredServices = services.filter(
        (service) =>
            filterByQuery(service.name) ||
            filterByQuery(service.paymentPurpose) ||
            filterByQuery(service.slug)
    );

    const filteredLegal = legalItems.filter(
        (item) => filterByQuery(item.name) || filterByQuery(item.path)
    );

    // Prevent background scroll when sidebar or command palette is open
    useEffect(() => {
        if (isSidebarOpen || isCommandOpen) {
            document.body.style.overflow = "hidden";
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = "";
            if (lenis) lenis.start();
        }
        return () => {
            document.body.style.overflow = "";
            if (lenis) lenis.start();
        };
    }, [isSidebarOpen, isCommandOpen,
        lenis
    ]);

    // Keyboard shortcut: Ctrl/Cmd + K to open command modal
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMetaK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
            if (isMetaK) {
                event.preventDefault();
                setIsCommandOpen(true);
            }
            if (event.key === "Escape") {
                setIsCommandOpen(false);
                setSearchQuery("");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus the command input when the palette opens (desktop only)
    useEffect(() => {
        if (isCommandOpen && commandInputRef.current) {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            // Only focus on desktop since input is hidden on mobile
            if (!isMobile) {
                commandInputRef.current.focus();
                commandInputRef.current.select();
            }
        }
    }, [isCommandOpen]);

    // Handle wheel scrolling inside the command palette so Lenis
    // doesn't block scroll when it has prevented default behavior.
    const handleCommandWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (!commandScrollRef.current) return;
        const container = commandScrollRef.current;
        container.scrollTop += event.deltaY;
    };

    // Handle keyboard actions inside the command palette (Enter / Esc)
    const handleCommandKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isCommandOpen) return;

        if (event.key === "Enter") {
            event.preventDefault();
            if (activeCommandUrl) {
                navigate(activeCommandUrl);
                setIsCommandOpen(false);
                setSearchQuery("");
            }
        }
        if (event.key === "Escape") {
            event.preventDefault();
            setIsCommandOpen(false);
            setSearchQuery("");
        }
    };

    // Check if a path is active
    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <motion.header
                className={cn(
                    "fixed inset-x-0 top-0 z-50 border-b border-dashed border-hairline bg-canvas transition-shadow duration-300",
                    isScrolled && "shadow-[0_8px_24px_-18px_rgba(17,17,17,0.45)]",
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between border-x border-dashed border-hairline px-4 sm:px-6">
                        <Link to="/" className="inline-flex shrink-0 items-center cursor-pointer">
                            <motion.div
                                className="relative h-8 w-24 sm:h-9 sm:w-28 md:h-10 md:w-32"
                                transition={{ duration: 0.2 }}
                            >
                                <Logo />
                            </motion.div>
                        </Link>

                        <div className="flex items-center gap-1 sm:gap-2">
                        <nav className="hidden items-center lg:flex" aria-label="Primary">
                            {navigationItems
                                .filter((item) => item.path !== siteRoutes.contact && item.path !== siteRoutes.services)
                                .map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={cn(
                                            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                            isActive(item.path) ? "text-ink" : "text-body hover:text-ink",
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            <DesktopServicesMenu
                                active={isActive(siteRoutes.services)}
                                pathname={location.pathname}
                            />
                        </nav>

                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className="hidden lg:block">
                                <GgwButton
                                    variant="accent"
                                    className="h-10 px-4"
                                    onClick={() => navigate(siteRoutes.contact)}
                                    aria-label="Contact"
                                >
                                    Contact
                                </GgwButton>
                            </div>

                            <motion.button
                                className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
                                whileTap={{ scale: 0.95 }}
                                aria-label="Contact"
                                onClick={() => navigate(siteRoutes.contact)}
                            >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-phone-incoming"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                        <path d="M15 9l5 -5" />
                                        <path d="M15 5l0 4l4 0" />
                                    </svg>
                            </motion.button>

                            <DrawerRoot open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                                <DrawerTrigger asChild>
                                    <motion.button
                                        className="inline-flex h-9 w-9 items-center justify-center text-zinc-800 transition hover:text-zinc-900 cursor-pointer lg:hidden"
                                        whileTap={{ scale: 0.95 }}
                                        aria-label="Open Menu"
                                        aria-expanded={isSidebarOpen}
                                    >
                                        <span className="relative block h-4 w-4">
                                            <span
                                                className={cn(
                                                    "absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition",
                                                    isSidebarOpen ? "translate-y-[7px] rotate-45" : "translate-y-0",
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "absolute left-0 top-[7px] h-0.5 w-4 rounded-full bg-current transition",
                                                    isSidebarOpen ? "opacity-0" : "opacity-100",
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "absolute left-0 top-[14px] h-0.5 w-4 rounded-full bg-current transition",
                                                    isSidebarOpen ? "translate-y-[-7px] -rotate-45" : "translate-y-0",
                                                )}
                                            />
                                        </span>
                                    </motion.button>
                                </DrawerTrigger>

                                <DrawerContent side="right">
                                    <DrawerHeader className="bg-canvas">
                                        <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                                            <motion.div
                                                className="w-24 sm:w-28 md:w-32 lg:w-36 h-full relative"
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Logo />
                                            </motion.div>
                                        </Link>
                                    </DrawerHeader>

                                    <DrawerBody className="bg-canvas px-4 py-6">
                                        <nav className="w-full space-y-8">
                                            <div>
                                                <p className="text-caption font-semibold uppercase tracking-[0.14em] text-muted">
                                                    Menu
                                                </p>
                                                <div className="mt-2 border-t border-dashed border-hairline">
                                                    {navigationItems
                                                        .filter((item) => item.path !== siteRoutes.contact)
                                                        .map((item, index) =>
                                                            item.path === siteRoutes.services ? (
                                                                <DrawerServicesMenu
                                                                    key={item.name}
                                                                    index={index}
                                                                    active={isActive(item.path)}
                                                                    pathname={location.pathname}
                                                                    onNavigate={() => setIsSidebarOpen(false)}
                                                                />
                                                            ) : (
                                                                <DrawerNavItem
                                                                    key={item.name}
                                                                    item={item}
                                                                    index={index}
                                                                    active={isActive(item.path)}
                                                                    onNavigate={() => setIsSidebarOpen(false)}
                                                                />
                                                            ),
                                                        )}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-caption font-semibold uppercase tracking-[0.14em] text-muted">
                                                    Legal
                                                </p>
                                                <div className="mt-2 border-t border-dashed border-hairline">
                                                    {legalItems.map((item, index) => (
                                                        <DrawerNavItem
                                                            key={item.name}
                                                            item={item}
                                                            index={index}
                                                            active={isActive(item.path)}
                                                            onNavigate={() => setIsSidebarOpen(false)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </nav>
                                    </DrawerBody>

                                    <DrawerFooter className="flex flex-col items-stretch gap-4 bg-canvas">
                                        <GgwButton
                                            variant="accent"
                                            className="w-full"
                                            onClick={() => {
                                                setIsSidebarOpen(false);
                                                navigate(siteRoutes.contact);
                                            }}
                                        >
                                            Contact
                                        </GgwButton>
                                        <p className="text-center text-caption text-muted">
                                            © {new Date().getFullYear()} CYBERLABS INDIA. All rights reserved.
                                        </p>
                                    </DrawerFooter>
                                </DrawerContent>
                            </DrawerRoot>
                        </div>
                        </div>
                </div>
            </motion.header>

            {/* Command / Search Modal */}
            {isCommandOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center bg-white/70 backdrop-blur-sm"
                    onClick={() => {
                        setIsCommandOpen(false);
                        setSearchQuery("");
                    }}
                    onTouchStart={(e) => {
                        // Only close on backdrop, not on modal content
                        if (e.target === e.currentTarget) {
                            setIsCommandOpen(false);
                            setSearchQuery("");
                        }
                    }}
                >
                    <div
                        className="mt-20 w-full max-w-3xl px-4"
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <div
                            className="relative overflow-hidden flex flex-col rounded-xl border border-dashed border-zinc-200 bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200/80"
                            style={{
                                maxHeight: "calc(100vh - 160px)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            onKeyDown={handleCommandKeyDown}
                        >
                            <div
                                className="absolute inset-0 z-0 pointer-events-none"
                                style={crosshatchBgStyle}
                                aria-hidden
                            />
                            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                            <div className="shrink-0 border-b border-dashed border-zinc-200 bg-transparent px-3 pb-2 pt-3 sm:px-4">
                                <div className="flex items-center justify-between px-2 py-1.5">
                                    <span className="text-base font-semibold text-zinc-900">
                                        CYBERLABS INDIA
                                    </span>
                                    <CandyButton
                                        type="button"
                                        variant="white"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsCommandOpen(false);
                                            setSearchQuery("");
                                        }}
                                        onTouchStart={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsCommandOpen(false);
                                            setSearchQuery("");
                                        }}
                                        aria-label="Close menu"
                                        className="h-9 w-9 shrink-0 touch-manipulation rounded-lg! px-0! py-0! shadow-none! sm:h-9 sm:w-9"
                                        style={{ touchAction: "manipulation" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-5 w-5"
                                            aria-hidden
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </CandyButton>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div
                                className="px-3 sm:px-4 py-2 bg-transparent"
                                ref={commandScrollRef}
                                onWheel={handleCommandWheel}
                                onTouchMove={(e) => {
                                    // Allow touch move events for scrolling
                                    e.stopPropagation();
                                }}
                                style={{
                                    WebkitOverflowScrolling: 'touch',
                                    WebkitTransform: 'translateZ(0)',
                                    touchAction: 'pan-y',
                                    overscrollBehavior: 'contain',
                                    flex: '1 1 0%',
                                    minHeight: 0,
                                    overflowY: 'scroll',
                                    overflowX: 'hidden',
                                    position: 'relative',
                                    height: '100%',
                                }}
                            >
                                <div className="space-y-4">
                                    {/* Navigation Links */}
                                    <div>
                                        <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                                            Menu
                                        </p>
                                        <ul className="space-y-0.5">
                                            {filteredNavigation.map((item, index) => (
                                                <li key={item.path}>
                                                    <Link
                                                        to={item.path}
                                                        onMouseEnter={() => setActiveCommandUrl(item.path)}
                                                        onClick={() => {
                                                            setIsCommandOpen(false);
                                                            setSearchQuery("");
                                                        }}
                                                        className="group flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 sm:text-base"
                                                    >
                                                        <span className="text-zinc-500 shrink-0">
                                                            {index === 0 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-home"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                                                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                                                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                                                </svg>
                                                            )}
                                                            {index === 1 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-alert-square-rounded"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
                                                                    <path d="M12 8v4" />
                                                                    <path d="M12 16h.01" />
                                                                </svg>
                                                            )}
                                                            {index === 2 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-users-group"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                                    <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                                                                    <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                                    <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                                                                    <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                                    <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                                                                </svg>
                                                            )}
                                                            {index === 3 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-school"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                                                                    <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                                                                </svg>
                                                            )}
                                                            {index === 4 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-user-screen"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M19.03 17.818a3 3 0 0 0 1.97 -2.818v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3v8c0 1.317 .85 2.436 2.03 2.84" />
                                                                    <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                                    <path d="M8 21a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
                                                                </svg>
                                                            )}
                                                            {index === 5 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop-bolt"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M14.5 16h-10.5a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v7.5" />
                                                                    <path d="M7 20h6" />
                                                                    <path d="M9 16v4" />
                                                                    <path d="M19 16l-2 3h4l-2 3" />
                                                                </svg>
                                                            )}
                                                            {index === 6 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-checklist"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                                                                    <path d="M14 19l2 2l4 -4" />
                                                                    <path d="M9 8h4" />
                                                                    <path d="M9 12h2" />
                                                                </svg>
                                                            )}
                                                            {index === 7 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2 2 0 0 1 -2.2 -2.2v-1a2 2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                                                                    <path d="M9 12l2 2l4 -4" />
                                                                </svg>
                                                            )}
                                                            {index === 8 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-phone-incoming"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                                                    <path d="M15 9l5 -5" />
                                                                    <path d="M15 5v4h4" />
                                                                </svg>
                                                            )}
                                                            {index === 9 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-mail-share"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M13 19h-8a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" />
                                                                    <path d="M3 7l9 6l9 -6" />
                                                                    <path d="M16 22l5 -5" />
                                                                    <path d="M21 21.5v-4.5h-4.5" />
                                                                </svg>
                                                            )}
                                                            {index === 10 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-help-hexagon"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033" />
                                                                    <path d="M12 16v.01" />
                                                                    <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                                                                </svg>
                                                            )}
                                                        </span>
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                                            Services
                                        </p>
                                        <ul className="space-y-0.5">
                                            {filteredServices.map((service) => {
                                                const url = servicePath(service.slug);
                                                return (
                                                    <li key={service.slug}>
                                                        <Link
                                                            to={url}
                                                            onMouseEnter={() => setActiveCommandUrl(url)}
                                                            onClick={() => {
                                                                setIsCommandOpen(false);
                                                                setSearchQuery("");
                                                            }}
                                                            className="flex items-start gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-50 text-sm sm:text-base text-zinc-900"
                                                        >
                                                            <span className="text-zinc-500 shrink-0 mt-0.5">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                                                                    <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                                                                    <path d="M12 12l0 .01" />
                                                                    <path d="M3 13a20 20 0 0 0 18 0" />
                                                                </svg>
                                                            </span>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">{service.name}</span>
                                                                <span className="text-[12px] font-medium sm:text-xs text-zinc-500">
                                                                    {service.paymentPurpose}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    {/* Actions */}
                                    <div>
                                        <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                                            Actions
                                        </p>
                                        <ul className="space-y-0.5">
                                            <li>
                                                <Link
                                                    to={siteRoutes.contact}
                                                    onMouseEnter={() => setActiveCommandUrl(siteRoutes.contact)}
                                                    onClick={() => {
                                                        setIsCommandOpen(false);
                                                        setSearchQuery("");
                                                    }}
                                                    className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-50 text-sm sm:text-base text-zinc-900 font-medium cursor-pointer focus:outline-none focus-visible:outline-none"
                                                >
                                                    <span className="text-zinc-500">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="icon icon-tabler icons-tabler-outline icon-tabler-phone-incoming"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                                            <path d="M15 9l5 -5" />
                                                            <path d="M15 5l0 4l4 0" />
                                                        </svg>
                                                    </span>
                                                    <span>Contact</span>
                                                </Link>
                                            </li>
                                            {/* Frequently Asked Questions */}
                                            {/* <li>
                                                <Link
                                                    to="/frequently-asked-questions"
                                                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-50 text-sm sm:text-base text-zinc-900 font-medium cursor-pointer"
                                                >
                                                    <span className="text-zinc-500 shrink-0">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="icon icon-tabler icons-tabler-outline icon-tabler-help-hexagon"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033" />
                                                            <path d="M12 16v.01" />
                                                            <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                                                        </svg>
                                                    </span>
                                                    <span>Frequently Asked Questions</span>
                                                </Link>
                                            </li> */}

                                            {/* Email support */}
                                            <li>
                                                <a
                                                    href={`mailto:${CONTACT.supportEmail}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-50 text-sm sm:text-base text-zinc-900 font-medium cursor-pointer"
                                                >
                                                    <span className="text-zinc-500">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="icon icon-tabler icons-tabler-outline icon-tabler-message-dots"
                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M12 11v.01" />
                                                            <path d="M8 11v.01" />
                                                            <path d="M16 11v.01" />
                                                            <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3l12 0" />
                                                        </svg>
                                                    </span>
                                                    <span>Support</span>
                                                </a>
                                            </li>
                                        </ul>


                                    </div>

                                    {/* Legal Links */}
                                    <div>
                                        <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                                            Legals
                                        </p>
                                        <ul className="space-y-0.5">
                                            {filteredLegal.map((item, index) => (
                                                <li key={item.path}>
                                                    <Link
                                                        to={item.path}
                                                        onMouseEnter={() => setActiveCommandUrl(item.path)}
                                                        onClick={() => {
                                                            setIsCommandOpen(false);
                                                            setSearchQuery("");
                                                        }}
                                                        className="group flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 sm:text-base"
                                                    >
                                                        <span className="text-zinc-500 shrink-0">
                                                            {index === 0 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-file-text"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
                                                                    <path d="M9 9h1" />
                                                                    <path d="M9 13h6" />
                                                                    <path d="M9 17h6" />
                                                                </svg>
                                                            )}
                                                            {index === 1 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-shield-lock"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
                                                                    <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                                                    <path d="M12 12v2.5" />
                                                                </svg>
                                                            )}
                                                            {index === 2 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-cookie"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M8 13v.01" />
                                                                    <path d="M12 17v.01" />
                                                                    <path d="M12 12v.01" />
                                                                    <path d="M16 14v.01" />
                                                                    <path d="M11 8v.01" />
                                                                    <path d="M13.148 3.476l2.667 1.104a4 4 0 0 0 4.656 6.14l.053 .132a3 3 0 0 1 0 2.296c-.25 .396 -.427 .69 -.553 .957c-.192 .414 -.338 .808 -.507 1.463c-.107 .406 -.252 .951 -.483 1.613a3 3 0 0 1 -1.624 1.623c-.624 .157 -1.03 .273 -1.4 .42c-.42 .166 -.79 .346 -1.352 .677c-.53 .314 -.848 .5 -1.162 .5c-.314 0 -.632 -.186 -1.162 -.5c-.562 -.331 -.932 -.511 -1.352 -.677c-.37 -.147 -.776 -.263 -1.4 -.42a3 3 0 0 1 -1.623 -1.624c-.231 -.662 -.376 -1.207 -.483 -1.613c-.169 -.655 -.315 -1.049 -.507 -1.463c-.126 -.267 -.303 -.561 -.553 -.957a3 3 0 0 1 0 -2.296c.25 -.396 .427 -.69 .553 -.957c.192 -.414 .338 -.808 .507 -1.463c.107 -.406 .252 -.951 .483 -1.613a3 3 0 0 1 1.624 -1.623c.624 -.157 1.03 -.273 1.4 -.42c.42 -.166 .79 -.346 1.352 -.677c.53 -.314 .848 -.5 1.162 -.5c.314 0 .632 .186 1.162 .5" />
                                                                </svg>
                                                            )}
                                                            {index === 3 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-refresh"
                                                                >
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                                                                    <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                                                                </svg>
                                                            )}
                                                        </span>
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Footer hints */}
                            <div className="flex shrink-0 flex-col gap-1.5 border-t border-dashed border-zinc-200 bg-transparent px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-4">
                                <p className="text-center text-[10px] text-zinc-500 sm:text-left sm:text-xs">
                                    Use your mouse or keyboard to navigate. Press{" "}
                                    <span className="font-semibold">Enter</span> to open.
                                </p>
                                <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 sm:justify-end sm:text-xs">
                                    <span className="flex items-center gap-1">
                                        <Kbd>↵</Kbd>
                                        <span>Go to Page</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Kbd>Esc</Kbd>
                                        <span>Close</span>
                                    </span>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Navbar;
