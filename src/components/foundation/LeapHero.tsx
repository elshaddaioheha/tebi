"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function LeapHero() {
  const scrollToContent = () => {
    const element = document.getElementById("pillars");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden">
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
        <div className="absolute inset-0 bg-[#FBF7EE]/80 md:bg-[#FBF7EE]/70 backdrop-blur-[3px]" />
        {/* Subtle vignette/gradient to isolate the content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7EE]/20 via-transparent to-[#FBF7EE]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Logo Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="bg-[#0B1F3A] p-4 rounded-2xl shadow-xl shadow-[#0B1F3A]/10 border border-gold/20 inline-block hover:scale-102 transition-transform duration-300">
            <Image
              src="/leap-logo.png"
              alt="LEAP Logo"
              width={160}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Tagline / Subtitle */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-gold font-bold mb-4 block"
        >
          Emma Collins Center For
        </motion.span>

        {/* Hero Main Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display font-light text-4xl md:text-6xl lg:text-7xl text-[#0B1F3A] mb-6 leading-tight tracking-tight max-w-4xl"
        >
          Empowering Creative Visionaries <br />
          to <span className="font-accent italic text-gold font-medium">Leap Higher</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-body text-base md:text-lg text-[#0B1F3A]/70 mb-10 max-w-2xl leading-relaxed"
        >
          Nurturing next-generation leaders and entrepreneurs through systematic resource mobilization, professional mentorship, and intentional community action.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
        >
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
        </motion.div>

        {/* Floating Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0B1F3A]/40 hover:text-gold transition-colors duration-300 cursor-pointer"
        >
          <span className="font-body text-[8px] uppercase tracking-[0.25em] font-medium">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
