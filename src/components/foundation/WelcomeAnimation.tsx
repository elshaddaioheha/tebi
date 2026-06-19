"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Stage transitions
    // Step 0: Welcome to LEAP (0s - 2s)
    // Step 1: L-E-A-P sequential reveal (2s - 6s)
    // Step 2: Full video-masked LEAP with subtexts (6s - 9.5s)
    // At 9.5s, auto-complete if not skipped
    const timer1 = setTimeout(() => setStep(1), 2000);
    const timer2 = setTimeout(() => setStep(2), 6500);
    const timer3 = setTimeout(() => onComplete(), 10500);

    // Disable scrolling when welcome animation is active
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  // Handle skip or manual enter
  const handleSkip = () => {
    onComplete();
  };

  const containerVariants = {
    exit: {
      opacity: 0,
      y: -100,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      className="fixed inset-0 bg-[#06152D] text-cream flex flex-col justify-center items-center z-[60] px-6 select-none overflow-hidden"
    >
      {/* Top Bar / Skip Button */}
      <div className="absolute top-8 right-8 z-[70]">
        <button
          onClick={handleSkip}
          className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/60 hover:text-gold border border-cream/20 hover:border-gold px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
        >
          Skip Intro
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Welcome Screen */}
        {step === 0 && (
          <motion.div
            key="welcome-intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <Image
                src="/leap-logo.png"
                alt="LEAP Logo Silhouette"
                width={120}
                height={96}
                className="h-24 w-auto object-contain brightness-0 invert opacity-80"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-body text-xs uppercase tracking-[0.4em] text-gold"
            >
              Diamond Dreams Foundation
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-display font-light text-4xl md:text-5xl tracking-wide text-cream"
            >
              Welcome to <span className="font-accent italic text-gold">LEAP</span>
            </motion.h1>
          </motion.div>
        )}

        {/* Step 1: L-E-A-P Accronym build */}
        {step === 1 && (
          <motion.div
            key="acronym-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl flex flex-col justify-center space-y-8 md:space-y-12"
          >
            {[
              { letter: "L", label: "Leadership Empowerment", delay: 0 },
              { letter: "E", label: "Entrepreneurship", delay: 1.0 },
              { letter: "A", label: "Action", delay: 2.0 },
              { letter: "P", label: "Purpose", delay: 3.0 }
            ].map((item) => (
              <div key={item.letter} className="flex items-center gap-6 md:gap-8 pl-4 md:pl-16">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotateX: 45 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{
                    delay: item.delay,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  className="font-display font-extrabold text-5xl md:text-7xl text-gold border-r border-gold/20 pr-6 w-20 md:w-28 text-center"
                >
                  {item.letter}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay + 0.3, duration: 0.5 }}
                  className="font-body text-xl md:text-3xl font-light tracking-wide text-cream/90"
                >
                  {item.label}
                </motion.span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 2: Revealed Hero Logo and video-masked LEAP text */}
        {step === 2 && (
          <motion.div
            key="masked-reveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="text-center flex flex-col items-center justify-center space-y-8 max-w-4xl"
          >
            {/* Logo Silhouette */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center"
            >
              <Image
                src="/leap-logo.png"
                alt="LEAP Logo Silhouette"
                width={140}
                height={112}
                className="h-28 w-auto object-contain"
              />
            </motion.div>

            {/* Video text mask using SVG */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative w-full h-[180px] md:h-[260px] flex items-center justify-center overflow-hidden"
            >
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
            </motion.div>

            {/* Accronym values list */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-body text-xs md:text-sm tracking-[0.2em] text-cream/70 max-w-2xl leading-relaxed flex flex-wrap justify-center gap-2"
            >
              <span>Leadership Empowerment</span>
              <span className="text-gold">•</span>
              <span>Entrepreneurship</span>
              <span className="text-gold">•</span>
              <span>Action</span>
              <span className="text-gold">•</span>
              <span>Purpose</span>
            </motion.div>

            {/* Enter Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="pt-6"
            >
              <button
                onClick={handleSkip}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold text-[#06152D] font-body text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-cream hover:scale-105 transition-all duration-300 shadow-xl shadow-gold/10 hover:shadow-cream/5 cursor-pointer"
              >
                Enter Portal
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
