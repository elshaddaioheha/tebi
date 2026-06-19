"use client";

import { useState, useEffect, useRef } from "react";
import WelcomeAnimation from "@/components/foundation/WelcomeAnimation";
import LeapHero from "@/components/foundation/LeapHero";
import LeapPillars from "@/components/foundation/LeapPillars";
import SheLeaps from "@/components/foundation/SheLeaps";
import LeapJoin from "@/components/foundation/LeapJoin";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LeapPageContent() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already seen the welcome animation in the current session
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("hasSeenLeapIntro");
      setTimeout(() => {
        if (hasSeen === "true") {
          setIntroCompleted(true);
        }
        setLoadingSession(false);
      }, 0);
    }
  }, []);

  const handleIntroComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenLeapIntro", "true");
    }
    setIntroCompleted(true);
  };

  useGSAP(() => {
    if (introCompleted && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: "power2.out" }
      );
    }
  }, { dependencies: [introCompleted] });

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#06152D] flex items-center justify-center">
        {/* Simple initial loading state during hydration/session check */}
        <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5] text-[#0B1F3A] overflow-hidden">
      {!introCompleted && (
        <WelcomeAnimation onComplete={handleIntroComplete} />
      )}

      {/* Main Website Contents - revealed dynamically */}
      <div
        ref={contentRef}
        style={{ opacity: introCompleted ? 1 : 0 }}
      >
        <LeapHero />
        <LeapPillars />
        <SheLeaps />
        <LeapJoin />
      </div>
    </div>
  );
}
