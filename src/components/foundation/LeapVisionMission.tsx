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
      y: 35,
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
      className="py-16 md:py-24 bg-[#FFF3F0] text-[#0B1F3A] px-6 md:px-12 relative overflow-hidden border-b border-[#0B1F3A]/5"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-white/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Vision Card */}
          <div className="leap-vm-card bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-[#0B1F3A]/5 hover:border-gold/30 hover:shadow-lg transition-all duration-500 flex flex-col justify-between relative overflow-hidden group shadow-sm shadow-[#0B1F3A]/5">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold/5 rounded-full blur-xl group-hover:bg-gold/10 transition-all duration-500" />
            <div>
              {/* Icon Box */}
              <div className="bg-[#0B1F3A] text-gold p-3 rounded-2xl w-12 h-12 flex items-center justify-center mb-6 shadow-md shadow-[#0B1F3A]/10">
                <Eye size={22} />
              </div>
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-2.5 block">
                Our Future State
              </span>
              <h3 className="font-display font-light text-3xl md:text-4xl text-[#0B1F3A] mb-4">
                Vision
              </h3>
              <p className="font-display font-light text-lg md:text-xl text-[#0B1F3A]/80 leading-relaxed italic">
                &ldquo;To create a world where every young person thrives, empowered to shine in their unique brilliance.&rdquo;
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="leap-vm-card bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-[#0B1F3A]/5 hover:border-gold/30 hover:shadow-lg transition-all duration-500 flex flex-col justify-between relative overflow-hidden group shadow-sm shadow-[#0B1F3A]/5">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold/5 rounded-full blur-xl group-hover:bg-gold/10 transition-all duration-500" />
            <div>
              {/* Icon Box */}
              <div className="bg-[#0B1F3A] text-gold p-3 rounded-2xl w-12 h-12 flex items-center justify-center mb-6 shadow-md shadow-[#0B1F3A]/10">
                <Target size={22} />
              </div>
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-2.5 block">
                Our Daily Calling
              </span>
              <h3 className="font-display font-light text-3xl md:text-4xl text-[#0B1F3A] mb-4">
                Mission
              </h3>
              <p className="font-body text-base text-[#0B1F3A]/70 leading-relaxed">
                To provide the support, education, and opportunities that help young people unlock their potentials, rise above challenges, lead with purpose, and make a difference in their communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
