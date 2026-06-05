"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const LEFT_LINKS = [
    { name: "Bridal", href: "/bridal" },
    { name: "Decor", href: "/decor" },
];

const RIGHT_LINKS = [
    { name: "The Academy", href: "/academy" },
    { name: "Foundation", href: "/foundation" },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

export default function Navbar() {
    const pathname = usePathname() ?? "/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Transparent only over the homepage's dark hero image; solid navy on
    // every cream-themed page and once scrolled.
    const solid = isScrolled || pathname !== "/";

    const linkClass =
        "font-body text-[10px] uppercase tracking-[0.2em] text-cream/70 hover:text-gold transition-colors duration-300";

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
                solid
                    ? "bg-navy/90 backdrop-blur-md border-gold/10 py-4"
                    : "bg-transparent border-transparent py-8"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Left links (desktop) */}
                <nav className="hidden md:flex gap-8 flex-1">
                    {LEFT_LINKS.map((link) => (
                        <Link key={link.name} href={link.href} className={linkClass}>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Center wordmark */}
                <Link
                    href="/"
                    className="font-display font-light text-2xl md:text-3xl text-cream tracking-wide whitespace-nowrap flex-1 text-center md:flex-none"
                >
                    Diamond Dreams
                </Link>

                {/* Right links (desktop) + mobile toggle */}
                <div className="flex items-center justify-end gap-8 flex-1">
                    <nav className="hidden md:flex gap-8">
                        {RIGHT_LINKS.map((link) => (
                            <Link key={link.name} href={link.href} className={linkClass}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <button
                        className="md:hidden text-cream w-8 h-8 relative flex flex-col items-center justify-center focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-4 relative flex flex-col justify-between items-center">
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-px bg-cream rounded-full origin-center"
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-px bg-cream rounded-full"
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-px bg-cream rounded-full origin-center"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-lg border-t border-gold/20 flex flex-col items-center gap-6 py-10 md:hidden overflow-hidden"
                    >
                        {ALL_LINKS.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 + 0.15 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-body text-xs uppercase tracking-[0.25em] text-cream/80 hover:text-gold transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
