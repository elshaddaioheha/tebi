"use client";

import { useRef } from "react";
import { Eye, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LeapVisionMission() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".leap-vm-card", {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-16 bg-[#FAFAF5] text-[#0B1F3A] px-6 md:px-12 relative overflow-hidden border-b border-[#0B1F3A]/5"
    >
      {/* Subtle ambient blur */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 bg-[#C8A24B]/3 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Vision Card */}
          <div className="leap-vm-card bg-[#FBF7EE] p-6 md:p-8 rounded-[2rem] border border-[#0B1F3A]/5 hover:border-gold/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="bg-[#0B1F3A] text-gold p-3.5 rounded-xl w-11 h-11 flex items-center justify-center mb-6 shadow-sm">
                <Eye size={20} />
              </div>
              <span className="font-body text-[9px] uppercase tracking-[0.2em] text-gold font-bold mb-2 block">
                Our Future State
              </span>
              <h3 className="font-display font-light text-2xl md:text-3xl text-[#0B1F3A] mb-4">
                Vision
              </h3>
              <p className="font-display font-light text-base md:text-lg text-[#0B1F3A]/80 leading-relaxed italic">
                &ldquo;To create a world where every young person thrives, empowered to shine in their unique brilliance.&rdquo;
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="leap-vm-card bg-[#FBF7EE] p-6 md:p-8 rounded-[2rem] border border-[#0B1F3A]/5 hover:border-gold/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="bg-[#0B1F3A] text-gold p-3.5 rounded-xl w-11 h-11 flex items-center justify-center mb-6 shadow-sm">
                <Target size={20} />
              </div>
              <span className="font-body text-[9px] uppercase tracking-[0.2em] text-gold font-bold mb-2 block">
                Our Daily Calling
              </span>
              <h3 className="font-display font-light text-2xl md:text-3xl text-[#0B1F3A] mb-4">
                Mission
              </h3>
              <p className="font-body text-sm md:text-base text-[#0B1F3A]/70 leading-relaxed">
                To provide the support, education, and opportunities that help young people unlock their potentials, rise above challenges, lead with purpose, and make a difference in their communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
