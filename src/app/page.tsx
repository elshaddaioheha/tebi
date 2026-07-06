"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ctaLink =
  "font-body text-[10px] uppercase tracking-widest border-b border-navy pb-1 hover:text-gold hover:border-gold transition-colors inline-block";

const slides = [
  {
    title: "The LEAP Foundation",
    subtitle: "Empowering Next Generation Creatives",
    desc: "Empowering the next generation of young creatives and entrepreneurs to build sustainable, structured futures.",
    linkText: "Support the Cause",
    linkUrl: "/foundation/leap",
  },
  {
    title: "SheLeaps Initiative",
    subtitle: "Leadership • Entrepreneurship • Empowerment • Action • Purpose",
    desc: "A targeted standard mapping out mentorship, resource mobilization, and scaling for creative female leaders and business visionaries.",
    linkText: "Explore SheLeaps",
    linkUrl: "/foundation/leap",
  },
];

export default function MasterPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useGSAP(() => {
    // Hero timeline entrance
    const tl = gsap.timeline();
    tl.fromTo(
      ".gsap-hero-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out", delay: 0.3 }
    )
    .fromTo(
      ".gsap-hero-sub",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      ".gsap-hero-explore",
      { opacity: 0 },
      { opacity: 1, duration: 1.0, ease: "power2.out" },
      "-=0.3"
    );

    // Scroll trigger rows
    const rows = gsap.utils.toArray<HTMLElement>(".gsap-reveal-row");
    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: containerRef });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-cream text-navy">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/bride_and_groom1.JPG"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        >
          <source src="/diamonddreamshero_video.mp4" type="video/mp4" />
        </video>
        {/* natural brightness: subtler overlays for clean contrast without heavy darkening */}
        <div className="absolute inset-0 bg-navy/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-navy/20" />

        <div className="relative z-10 text-center">
          <h1 className="gsap-hero-title opacity-0 font-display font-light text-cream text-6xl md:text-8xl leading-tight mb-6">
            Diamond <span className="font-accent italic text-gold">Dreams</span>
          </h1>
          <p className="gsap-hero-sub opacity-0 font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/70">
            Moments, Spaces &amp; Mastery.
          </p>
        </div>

        <div className="gsap-hero-explore opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 font-body text-[10px] uppercase tracking-[0.3em] text-cream/50 z-10">
          Explore
        </div>
      </section>

      {/* ── Asymmetrical gateway ─────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* 01 — Bridal (image left, text right) */}
        <div className="gsap-reveal-row grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24 md:mb-32">
          <div className="md:col-span-6 relative h-[60vh] md:h-[70vh]">
            <Image
              src="/bridal1.JPG"
              alt="Bridal styling by Diamond Dreams"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="md:col-span-4 md:col-start-8">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-4 block">
              01 / Boutique
            </span>
            <h2 className="font-display font-light text-5xl mb-6">Bridal</h2>
            <p className="font-accent italic text-xl text-navy/70 mb-8">
              Curating luxury gowns and unmatched bridal consultations.
            </p>
            <Link href="/bridal" className={ctaLink}>
              Discover the Collection
            </Link>
          </div>
        </div>

        {/* 02 — Event Decor (text left, image right) */}
        <div className="gsap-reveal-row grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24 md:mb-32">
          <div className="md:col-span-4 md:col-start-2 order-2 md:order-1">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-4 block">
              02 / Design
            </span>
            <h2 className="font-display font-light text-5xl mb-6">
              Event <span className="font-accent italic">Decor</span>
            </h2>
            <p className="font-accent italic text-xl text-navy/70 mb-8">
              Transforming atmospheres into premium visual experiences.
            </p>
            <Link href="/decor" className={ctaLink}>
              View the Portfolio
            </Link>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 relative h-[55vh] md:h-[60vh]">
            <Image
              src="/decor1.JPG"
              alt="Luxury event decor by Diamond Dreams"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* 03 — The Academy / TEBI (image left, text right) */}
        <div className="gsap-reveal-row grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 relative h-[40vh] md:h-[45vh] flex items-center justify-center">
            <Image
              src="/tebi-logo.png"
              alt="The Event Business Institute Logo"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
          <div className="md:col-span-4 md:col-start-8">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-4 block">
              03 / Mastery
            </span>
            <h2 className="font-display font-light text-5xl mb-2">TEBI</h2>
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-navy/50 mb-6">
              The Event Business Institute
            </p>
            <p className="font-accent italic text-xl text-navy/70 mb-8">
              Training event planners to build profitable, structured businesses.
            </p>
            <Link href="/academy" className={ctaLink}>
              Enter the Academy
            </Link>
          </div>
        </div>
      </section>

      {/* ── 04 — Foundation band ─────────────────────────────── */}
      <section className="bg-navy text-cream px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">
        {/* Decorative subtle ambient lights */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold block mb-6">
              04 / Purpose
            </span>
            <div className="flex justify-center">
              <Image
                src="/leap-logo.png"
                alt="LEAP Logo"
                width={140}
                height={112}
                className="h-16 w-auto object-contain brightness-0 invert opacity-75"
              />
            </div>
          </div>

          <div className="relative min-h-[300px] flex items-center justify-center">
            {/* Left navigation arrow */}
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-0 md:-left-12 p-3 text-cream/40 hover:text-gold transition-colors focus:outline-none z-20 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Slide content with AnimatePresence */}
            <div className="w-full px-8 md:px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <h2 className="font-display font-light text-4xl md:text-5xl tracking-wide">
                    {slides[activeSlide].title}
                  </h2>
                  <p className="font-accent italic text-lg text-gold/90 font-medium max-w-2xl mx-auto">
                    {slides[activeSlide].subtitle}
                  </p>
                  <p className="font-body text-base text-cream/70 leading-relaxed max-w-2xl mx-auto">
                    {slides[activeSlide].desc}
                  </p>
                  <div className="pt-4">
                    <Link
                      href={slides[activeSlide].linkUrl}
                      className="font-body text-[10px] uppercase tracking-widest border-b border-cream pb-1 hover:text-gold hover:border-gold transition-colors inline-block"
                    >
                      {slides[activeSlide].linkText}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-0 md:-right-12 p-3 text-cream/40 hover:text-gold transition-colors focus:outline-none z-20 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeSlide ? "bg-gold w-6" : "bg-cream/20 hover:bg-cream/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 — The Visionary ──────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="gsap-reveal-row grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* CEO photo */}
          <div className="md:col-span-6 relative pt-8 pl-8 pb-8">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-10 border-[12px] border-white">
              <Image
                src="/ceo.jpg"
                alt="Dr. Emma Collins - CEO of Diamond Dreams"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-32 h-32 border-t-4 border-l-4 border-gold z-0" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold/10 rounded-full z-0 blur-2xl" />
          </div>

          {/* Text column */}
          <div className="md:col-span-6">
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-gold mb-4 block">
              The Visionary
            </span>
            <h2 className="font-display font-light text-5xl text-navy mb-8 leading-tight">
              Meet Dr. Emma Collins
            </h2>
            <div className="space-y-6 font-body text-base text-navy/80 leading-relaxed">
              <p>
                Dr. Emma Collins is the visionary CEO of <strong>Diamondreams Events</strong> and <strong>Diamondreams Decor</strong>, based in Jos. With an unwavering commitment to excellence, she has built a legacy of transforming complex event logistics into seamless, premium experiences.
              </p>
              <p>
                Her journey is fueled by a passion for structural integrity in the event industry. She doesn&apos;t just plan events; she architect systems that allow creativity to thrive within a framework of operational dominance.
              </p>
              <p className="font-accent italic text-2xl text-navy border-l-4 border-gold pl-6 py-2">
                &quot;Sustainability in this business is not an accident—it is the result of intention, strategy, and CEO-level thinking.&quot;
              </p>
              <p>
                Through TEBI, Dr. Collins bridges the gap between creative talent and business mastery, empowering the next generation of event leaders to move from chaos to calm, respected execution.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div>
                <p className="font-display text-xl text-navy font-bold">Dr. Emma Collins</p>
                <p className="font-body text-xs uppercase tracking-wider text-gold font-medium">Founder &amp; CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
