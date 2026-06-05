import Link from "next/link";
import { Instagram, Facebook, Phone } from "lucide-react";

const PILLARS = [
    { label: "The Event Business Institute", href: "/academy" },
    { label: "Decoration & Events", href: "/decor" },
    { label: "Bridal Boutique", href: "/bridal" },
    { label: "LEAP for Youths", href: "/foundation/leap" },
];

const CONNECT = [
    { label: "Our Story", href: "/about" },
    { label: "Journal & Resources", href: "/resources" },
];

const SOCIALS = [
    { icon: Instagram, href: "https://instagram.com/theeventbusinessinstitute", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/diamonddreamsevents", label: "Facebook" },
    { icon: Phone, href: "https://wa.me/2348093000380", label: "WhatsApp" },
];

const colHeader = "font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-8";
const colLink = "font-body text-xs text-cream/70 hover:text-cream transition-colors";

export default function Footer() {
    return (
        <footer
            id="contact"
            className="bg-navy border-t border-gold/20 pt-24 pb-12 px-6 md:px-12"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Brand (spans 4) */}
                <div className="md:col-span-4">
                    <h2 className="font-display text-3xl text-cream mb-6">Diamond Dreams</h2>
                    <p className="font-accent italic text-cream/60 text-lg pr-8 mb-8">
                        One brand. Five pillars. One extraordinary platform.
                    </p>
                    <div className="flex gap-4">
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center text-cream/60 hover:border-gold hover:text-gold transition-all duration-300"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Asymmetry buffer (spans 2) */}
                <div className="hidden md:block md:col-span-2" />

                {/* The Pillars (spans 3) */}
                <div className="md:col-span-3">
                    <h3 className={colHeader}>The Pillars</h3>
                    <ul className="space-y-4">
                        {PILLARS.map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className={colLink}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Connect (spans 3) */}
                <div className="md:col-span-3">
                    <h3 className={colHeader}>Connect</h3>
                    <ul className="space-y-4">
                        {CONNECT.map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className={colLink}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a href="mailto:hello@diamonddreamsgroup.com" className={colLink}>
                                Enquiries
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between text-center md:text-left gap-4">
                <span className="font-body text-[10px] uppercase tracking-widest text-cream/40">
                    © {new Date().getFullYear()} Diamond Dreams Group.
                </span>
                <span className="font-body text-[10px] uppercase tracking-widest text-cream/40">
                    All rights reserved.
                </span>
            </div>
        </footer>
    );
}
