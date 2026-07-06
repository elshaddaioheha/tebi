"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Disable scrolling when welcome animation is active
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleExit = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    document.body.style.overflow = "unset";
    gsap.to(containerRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        onComplete();
      }
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        handleExit();
      }
    });
    timelineRef.current = tl;

    // --- STEP 0 ---
    tl.set(".gsap-step-0", { display: "flex", opacity: 0 });
    tl.set(".gsap-step-1", { display: "none", opacity: 0 });
    tl.set(".gsap-step-2", { display: "none", opacity: 0 });

    tl.to(".gsap-step-0", { opacity: 1, duration: 0.4 });
    tl.fromTo(
      [".gsap-logo-0", ".gsap-tag-0", ".gsap-title-0"],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.2"
    );
    tl.to(".gsap-step-0", { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.8");

    // --- STEP 1 ---
    tl.set(".gsap-step-0", { display: "none" });
    tl.set(".gsap-step-1", { display: "flex", opacity: 1 });

    [".gsap-row-l", ".gsap-row-e", ".gsap-row-a", ".gsap-row-p"].forEach((rowClass, idx) => {
      tl.fromTo(
        rowClass,
        { opacity: 0, scale: 0.9, x: -20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.6, ease: "back.out(1.5)" },
        idx === 0 ? undefined : "+=0.4"
      );
    });

    tl.to(".gsap-step-1", { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.8");

    // --- STEP 2 ---
    tl.set(".gsap-step-1", { display: "none" });
    tl.set(".gsap-step-2", { display: "flex", opacity: 1 });

    tl.fromTo(
      ".gsap-logo-2",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
    tl.fromTo(
      ".gsap-text-clip-2",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
    tl.fromTo(
      ".gsap-labels-2",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
    tl.fromTo(
      ".gsap-btn-2",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Hold step 2 for a reading period
    tl.to({}, { duration: 3.0 });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#06152D] text-cream flex flex-col justify-center items-center z-[60] px-6 select-none overflow-hidden"
    >
      {/* Top Bar / Skip Button */}
      <div className="absolute top-8 right-8 z-[70]">
        <button
          onClick={handleExit}
          className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/60 hover:text-gold border border-cream/20 hover:border-gold px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
        >
          Skip Intro
        </button>
      </div>

      {/* Step 0: Welcome Screen */}
      <div className="gsap-step-0 absolute inset-0 flex flex-col justify-center items-center text-center space-y-4 px-6">
        <div className="gsap-logo-0 opacity-0 flex justify-center mb-6">
          <Image
            src="/leap-logo.png"
            alt="LEAP Logo Silhouette"
            width={120}
            height={96}
            className="h-24 w-auto object-contain brightness-0 invert opacity-80"
          />
        </div>
        <p className="gsap-tag-0 opacity-0 font-body text-xs uppercase tracking-[0.4em] text-gold">
          Diamond Dreams Foundation
        </p>
        <h1 className="gsap-title-0 opacity-0 font-display font-light text-4xl md:text-5xl tracking-wide text-cream">
          Welcome to <span className="font-accent italic text-gold">LEAP</span>
        </h1>
      </div>

      {/* Step 1: L-E-A-P Acronym build */}
      <div className="gsap-step-1 absolute inset-0 flex flex-col justify-center w-full max-w-2xl mx-auto space-y-8 md:space-y-12 px-6">
        {[
          { letter: "L", label: "Leadership" },
          { letter: "E", label: "Empowerment/Entrepreneurship" },
          { letter: "A", label: "Action" },
          { letter: "P", label: "Purpose" }
        ].map((item) => (
          <div key={item.letter} className={`gsap-row-${item.letter.toLowerCase()} opacity-0 flex items-center gap-6 md:gap-8 pl-4 md:pl-16 w-full`}>
            <span className="font-display font-extrabold text-5xl md:text-7xl text-gold border-r border-gold/20 pr-6 w-20 md:w-28 text-center">
              {item.letter}
            </span>
            <span className="font-body text-xl md:text-3xl font-light tracking-wide text-cream/90">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step 2: Revealed Hero Logo and video-masked LEAP text */}
      <div className="gsap-step-2 absolute inset-0 flex flex-col justify-center items-center text-center space-y-8 max-w-4xl mx-auto px-6">
        {/* Logo Silhouette */}
        <div className="gsap-logo-2 opacity-0 flex justify-center">
          <Image
            src="/leap-logo.png"
            alt="LEAP Logo Silhouette"
            width={140}
            height={112}
            className="h-28 w-auto object-contain"
          />
        </div>

        {/* Video text mask using SVG */}
        <div className="gsap-text-clip-2 opacity-0 relative w-full h-[180px] md:h-[260px] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full select-none" viewBox="0 0 800 220">
            <defs>
              <clipPath id="text-clip">
                <text
                  x="50%"
                  y="70%"
                  textAnchor="middle"
                  className="font-display font-black tracking-widest text-[130px] md:text-[150px] uppercase font-extrabold fill-white"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900 }}
                >
                  LEAP
                </text>
              </clipPath>
            </defs>
            <foreignObject x="0" y="0" width="100%" height="100%" clipPath="url(#text-clip)">
              <div className="w-full h-full relative">
                {/* Golden fluid video loops inside letters */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
                  src="https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-background-34241-large.mp4"
                />
                {/* Fallback solid background in case video fails */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold via-amber-400 to-gold mix-blend-multiply opacity-20" />
              </div>
            </foreignObject>
          </svg>
        </div>

        {/* Acronym values list */}
        <div className="gsap-labels-2 opacity-0 font-body text-xs md:text-sm tracking-[0.2em] text-cream/70 max-w-2xl leading-relaxed flex flex-wrap justify-center gap-2">
          <span>Leadership Empowerment</span>
          <span className="text-gold">•</span>
          <span>Entrepreneurship</span>
          <span className="text-gold">•</span>
          <span>Action</span>
          <span className="text-gold">•</span>
          <span>Purpose</span>
        </div>

        {/* Enter Button */}
        <div className="gsap-btn-2 opacity-0 pt-6">
          <button
            onClick={handleExit}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold text-[#06152D] font-body text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-cream hover:scale-105 transition-all duration-300 shadow-xl shadow-gold/10 hover:shadow-cream/5 cursor-pointer"
          >
            Enter Portal
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
