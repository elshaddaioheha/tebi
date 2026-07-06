"use client";

import Image from "next/image";
import { ArrowDown, Facebook, Instagram } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface LeapHeroProps {
  active: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const elementVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const elementFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const mediaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

const doodleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function LeapHero({ active }: LeapHeroProps) {
  const scrollToContent = () => {
    const element = document.getElementById("pillars");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden bg-[#FBF7EE]"
    >
      {/* Subtle ambient lighting gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left relative">
          {/* Hand-drawn Flower Doodle */}
          <motion.div
            variants={doodleVariants}
            className="absolute -bottom-24 -left-12 w-28 h-28 text-gold/30 pointer-events-none select-none z-0"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M 40 80 Q 43 65 50 65" />
              <path d="M 50 65 Q 50 50 42 45 Q 35 40 32 50 Q 32 60 50 65" />
              <path d="M 50 65 Q 63 50 72 55 Q 77 60 72 68 Q 67 76 50 65" />
              <path d="M 50 65 Q 50 78 58 82 Q 67 86 67 73 Q 67 65 50 65" />
              <path d="M 50 65 Q 37 78 28 73 Q 23 68 28 60 Q 32 50 50 65" />
            </svg>
          </motion.div>

          {/* Logo Badge */}
          <motion.div variants={elementVariants} className="mb-6 z-10">
            <div className="bg-[#0B1F3A] p-3.5 rounded-2xl shadow-xl shadow-[#0B1F3A]/10 border border-gold/20 inline-block hover:scale-102 transition-transform duration-300">
              <Image
                src="/leap-logo.png"
                alt="LEAP Logo"
                width={140}
                height={70}
                className="h-16 w-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Tagline / Subtitle */}
          <motion.span variants={elementFadeVariants} className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-gold font-bold mb-4 block z-10">
            Emma Collins Center For
          </motion.span>

          {/* Hero Main Header */}
          <motion.h1 variants={elementVariants} className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[#0B1F3A] mb-6 leading-tight tracking-tight max-w-2xl z-10">
            Make Big Changes <br className="hidden sm:block" />
            and <span className="font-accent italic text-gold font-medium">Help the World</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={elementFadeVariants} className="font-body text-base text-[#0B1F3A]/70 mb-8 max-w-xl leading-relaxed z-10">
            Nurturing next-generation leaders and entrepreneurs through systematic resource mobilization, professional mentorship, and intentional community action.
          </motion.p>

          {/* Actions & Social Connect */}
          <motion.div variants={elementVariants} className="flex flex-col sm:flex-row gap-6 items-center w-full z-10">
            <button
              onClick={scrollToContent}
              className="w-full sm:w-auto px-8 py-4 bg-[#0B1F3A] text-cream font-body text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-gold hover:text-[#0B1F3A] transition-all duration-300 shadow-lg shadow-[#0B1F3A]/10 active:scale-98 cursor-pointer text-center"
            >
              Get Started
            </button>
            
            {/* Social Icons inside Hero */}
            <div className="flex items-center gap-4">
              <span className="font-body text-[10px] uppercase tracking-wider text-[#0B1F3A]/60 font-semibold">
                Follow us
              </span>
              <div className="flex gap-2">
                <a
                  href="https://facebook.com/diamonddreamsevents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white hover:bg-gold text-[#0B1F3A] hover:text-gold border border-[#0B1F3A]/10 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <Facebook size={14} />
                </a>
                <a
                  href="https://instagram.com/theeventbusinessinstitute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white hover:bg-gold text-[#0B1F3A] hover:text-gold border border-[#0B1F3A]/10 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <Instagram size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Hero Media / Tablet frame */}
        <motion.div variants={mediaVariants} className="lg:col-span-6 flex justify-center items-center relative w-full">
          {/* Hand-drawn Sun Doodle */}
          <motion.div
            variants={doodleVariants}
            className="absolute -top-12 -left-8 md:-top-16 md:-left-12 w-28 h-28 text-gold/40 pointer-events-none select-none z-0"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M 50 35 C 58 33, 66 38, 65 47 C 64 56, 57 65, 48 64 C 39 63, 34 54, 37 45 C 40 36, 44 37, 50 35 Z" />
              <path d="M 50 12 L 50 22" />
              <path d="M 50 78 L 50 88" />
              <path d="M 12 50 L 22 50" />
              <path d="M 78 50 L 88 50" />
              <path d="M 23 23 L 31 31" />
              <path d="M 69 69 L 77 77" />
              <path d="M 77 23 L 69 31" />
              <path d="M 31 69 L 23 77" />
            </svg>
          </motion.div>

          {/* Tablet Device Frame */}
          <div className="relative w-full max-w-lg md:max-w-xl aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[10px] border-[#0B1F3A] bg-[#0B1F3A] shadow-2xl shadow-[#0B1F3A]/20 overflow-hidden z-10">
            <div className="absolute inset-0">
              <Image
                src="/leap-hero.jpg"
                alt="LEAP Group Photo"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1F3A]/10 via-transparent to-white/10 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 text-[#0B1F3A]/30 hover:text-gold transition-colors duration-300 cursor-pointer z-20"
      >
        <span className="font-body text-[8px] uppercase tracking-[0.25em] font-medium">Scroll</span>
        <ArrowDown size={12} className="animate-bounce" />
      </button>
    </motion.section>
  );
}
