"use client";

import { useRef } from "react";
import Image from "next/image";
import { Award, Compass, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROGRAMS = [
  {
    title: "Mentorship Circles",
    desc: "Connecting upcoming female planners and designers with verified global industry leaders. Real-time guidance, structural auditing, and peer-to-peer masterminds.",
    icon: HeartHandshake,
  },
  {
    title: "Resource Mobilization",
    desc: "Facilitating access to start-up grants, interest-free equipment loans, and digital execution toolkits designed specifically for creative businesses.",
    icon: Compass,
  },
  {
    title: "Scaling Masterclasses",
    desc: "Focused modules on transition strategy, legal compliance, pricing formulas, contract negotiation, and scaling from a boutique setup to a conglomerate.",
    icon: Award,
  },
];

export default function SheLeaps() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal text block
    gsap.from(".sheleaps-left", {
      opacity: 0,
      x: -40,
      duration: 1.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // Reveal right program cards in stagger
    gsap.from(".sheleaps-card", {
      opacity: 0,
      x: 40,
      stagger: 0.2,
      duration: 1.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 md:py-20 bg-[#FFF3F0] text-[#0B1F3A] px-6 md:px-12 relative overflow-hidden">
      {/* Abstract elegant shapes */}
      <div className="absolute top-12 left-10 w-[500px] h-[500px] bg-white/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text/Header Column */}
          <div className="sheleaps-left lg:col-span-5">
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-[#C8A24B] font-bold mb-4 block">
              Specialized Initiative
            </span>
            <h2 className="font-display font-light text-4xl md:text-5xl leading-tight mb-6">
              SheLeaps <span className="font-accent italic text-[#C8A24B]">Initiative</span>
            </h2>
            <div className="h-[2px] w-20 bg-gold/30 mb-8" />
            <p className="font-body text-base text-[#0B1F3A]/80 leading-relaxed mb-8">
              A targeted standard mapping out structured mentorship, direct resource mobilization, and operational scaling blueprints for creative female leaders and business visionaries.
            </p>
            <div className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-[#C8A24B]/10 hover:border-gold/30 transition-all duration-300">
              <p className="font-accent italic text-lg md:text-xl text-[#0B1F3A]/90">
                &quot;True empowerment is structural. By providing women with systems and capital support, we build legacy organizations rather than temporary efforts.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-cream border border-gold/20 relative">
                  <Image
                    src="/ceo.jpg"
                    alt="Dr. Emma Collins"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-[#0B1F3A]">Dr. Emma Collins</h4>
                  <p className="font-body text-[9px] uppercase tracking-wider text-gold font-medium">Founder &amp; Trustee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Program list cards */}
          <div className="lg:col-span-7 space-y-6">
            {PROGRAMS.map((prog) => {
              const Icon = prog.icon;
              return (
                <div
                  key={prog.title}
                  className="sheleaps-card bg-white/70 hover:bg-white p-6 md:p-8 rounded-[2rem] border border-[#0B1F3A]/5 hover:border-gold/20 hover:shadow-xl hover:shadow-[#0B1F3A]/5 transition-all duration-300 flex flex-col md:flex-row items-start gap-6"
                >
                  <div className="p-4 bg-[#FFF5F2] text-[#C8A24B] rounded-2xl shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-[#0B1F3A] mb-2">
                      {prog.title}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-[#0B1F3A]/75 leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
