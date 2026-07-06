"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LeapHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    const element = document.getElementById("pillars");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".gsap-hero-logo",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    )
    .fromTo(
      ".gsap-hero-tag",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      ".gsap-hero-heading",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".gsap-hero-desc",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".gsap-hero-actions",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".gsap-hero-scroll",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden">
      {/* Background Image: Group Photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/leap-hero.jpg"
          alt="LEAP Group Photo"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft, premium light cream overlay with backdrop blur */}
        <div className="absolute inset-0 bg-[#FBF7EE]/70 md:bg-[#FBF7EE]/60 backdrop-blur-[3px]" />
        {/* Subtle vignette/gradient to isolate the content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7EE]/20 via-transparent to-[#FBF7EE]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Logo Badge */}
        <div className="gsap-hero-logo mb-8 opacity-0">
          <div className="bg-[#0B1F3A] p-4 rounded-2xl shadow-xl shadow-[#0B1F3A]/10 border border-gold/20 inline-block hover:scale-102 transition-transform duration-300">
            <Image
              src="/leap-logo.png"
              alt="LEAP Logo"
              width={160}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>
        </div>

        {/* Tagline / Subtitle */}
        <span className="gsap-hero-tag opacity-0 font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-gold font-bold mb-4 block">
          Emma Collins Center For
        </span>

        {/* Hero Main Header */}
        <h1 className="gsap-hero-heading opacity-0 font-display font-light text-4xl md:text-6xl lg:text-7xl text-[#0B1F3A] mb-6 leading-tight tracking-tight max-w-4xl">
          Empowering Creative Visionaries <br />
          to <span className="font-accent italic text-gold font-medium">Leap Higher</span>
        </h1>

        {/* Description */}
        <p className="gsap-hero-desc opacity-0 font-body text-base md:text-lg text-[#0B1F3A]/70 mb-10 max-w-2xl leading-relaxed">
          Nurturing next-generation leaders and entrepreneurs through systematic resource mobilization, professional mentorship, and intentional community action.
        </p>

        {/* Actions */}
        <div className="gsap-hero-actions opacity-0 flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
          <button
            onClick={scrollToContent}
            className="w-full sm:w-auto px-8 py-4 bg-[#0B1F3A] text-cream font-body text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-gold hover:text-[#0B1F3A] transition-all duration-300 shadow-lg shadow-[#0B1F3A]/10 active:scale-98 cursor-pointer"
          >
            Explore Pillars
          </button>
          <a
            href="#join"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#0B1F3A] hover:bg-[#0B1F3A]/5 font-body text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 active:scale-98 text-center"
          >
            Become a Partner
          </a>
        </div>

        {/* Floating Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="gsap-hero-scroll opacity-0 absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0B1F3A]/40 hover:text-gold transition-colors duration-300 cursor-pointer"
        >
          <span className="font-body text-[8px] uppercase tracking-[0.25em] font-medium">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
