"use client";

import { motion, Variants } from "framer-motion";
import { Eye, Target } from "lucide-react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function LeapVisionMission() {
  return (
    <section
      className="py-12 md:py-16 bg-[#FAFAF5] text-[#0B1F3A] px-6 md:px-12 relative overflow-hidden border-b border-[#0B1F3A]/5"
    >
      {/* Subtle ambient blur */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 bg-[#C8A24B]/3 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Vision Card */}
          <motion.div
            variants={cardVariants}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#0B1F3A]/5 hover:border-gold/30 hover:shadow-lg transition-all duration-500 flex flex-col justify-between relative overflow-hidden group shadow-sm shadow-[#0B1F3A]/5"
          >
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
          </motion.div>

          {/* Mission Card */}
          <motion.div
            variants={cardVariants}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#0B1F3A]/5 hover:border-gold/30 hover:shadow-lg transition-all duration-500 flex flex-col justify-between relative overflow-hidden group shadow-sm shadow-[#0B1F3A]/5"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
