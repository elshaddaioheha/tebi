"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/shared/FadeIn";
import TaglineCarousel from "@/components/shared/TaglineCarousel";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 px-6">
            {/* Static Background Gradients — replaces the two infinite animated orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Logo — FadeIn with delay=0; priority keeps the image itself eager-loaded */}
                <FadeIn delay={0} className="relative w-32 h-32 mx-auto mb-8">
                    <Image
                        src="/tebi-logo.png"
                        alt="The Event Business Institute Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </FadeIn>

                {/* Animated tagline pill — replaces static motion.span */}
                <TaglineCarousel />

                <FadeIn delay={100}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary mb-8 leading-[1.1] tracking-tight text-balance">
                        Turn Your Event Planning into a <br className="hidden md:block" />
                        <span className="text-secondary italic">Business That Pays You Well.</span>
                    </h1>
                </FadeIn>

                <FadeIn delay={200}>
                    <p className="text-xl md:text-2xl text-primary/70 mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
                        TEBI gives event planners the tools, training, and strategy they need to stop overworking and start earning what they deserve.
                    </p>
                </FadeIn>

                <FadeIn delay={300}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#courses"
                            className="w-full sm:w-auto px-10 py-5 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20"
                        >
                            See What We Teach
                        </Link>
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-primary/20 text-primary text-lg font-bold rounded-full hover:border-primary hover:bg-primary/5 active:scale-95 transition-all duration-300"
                        >
                            Talk to an Advisor
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Hero;
