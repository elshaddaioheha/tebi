"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

// Routes that manage their own chrome and should NOT get the global
// Navbar/Footer: the auth screens and the authenticated academy app
// (dashboard + courses, which have their own LMS top bar). The public
// academy landing (/academy exactly) still gets the global chrome.
const BARE_PREFIXES = ["/login", "/register", "/academy/dashboard", "/academy/courses"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() ?? "/";
    const isBare = BARE_PREFIXES.some(
        (p) => pathname === p || pathname.startsWith(p + "/")
    );

    if (isBare) return <>{children}</>;

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
