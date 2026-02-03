import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, ArrowUpRight } from "lucide-react";

const Footer = () => {
    return (
        <footer id="contact" className="bg-primary text-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-20">
                    <div className="lg:col-span-1">
                        <div className="relative w-24 h-24 mb-6">
                            <Image
                                src="/tebi-logo.png"
                                alt="TEBI Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-white/60 leading-relaxed mb-8">
                            Helping event planners build structured, profitable, and sustainable businesses.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://instagram.com/theeventbusinessinstitute" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="https://facebook.com/diamonddreamsevents" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="https://wa.me/2348093000380" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                                <Phone size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-secondary text-sm mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {["Philosophy", "The Reset", "About", "Success Stories"].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-white/60 hover:text-white transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="font-bold uppercase tracking-widest text-secondary text-sm mb-8">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-white/60">
                                <Mail size={20} className="text-secondary shrink-0 mt-1" />
                                <span className="break-words whitespace-normal">theeventbusinessinstitute@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-4 text-white/60">
                                <Phone size={20} className="text-secondary shrink-0 mt-1" />
                                <span>08093000380</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="font-bold uppercase tracking-widest text-secondary text-sm mb-8">The Newsletter</h4>
                        <p className="text-white/60 mb-6 font-medium">Weekly CEO-level insights delivered to your inbox.</p>
                        <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                            <input
                                type="email"
                                placeholder="CEO Email"
                                className="bg-transparent border-none outline-none flex-grow px-4 text-sm w-full"
                            />
                            <button className="bg-secondary text-primary p-3 rounded-lg hover:bg-secondary-light transition-all shrink-0">
                                <ArrowUpRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
                    <p>© 2024 The Event Business Institute. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
