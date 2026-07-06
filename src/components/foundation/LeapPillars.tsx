"use client";

import { Compass, Users, Sparkles, GraduationCap } from "lucide-react";
import { motion, Variants } from "framer-motion";

const PILLARS = [
  {
    letter: "L",
    title: "Leadership Empowerment",
    desc: "Developing self-governance, strategic influence, and operational authority. We train creative directors and project leads to command teams and guide organizational visions with confidence and clarity.",
    icon: Users,
    color: "from-blue-500/10 to-indigo-500/5",
  },
  {
    letter: "E",
    title: "Entrepreneurship",
    desc: "Transforming raw creative talent into scalable corporate assets. Through business modeling, pricing methodologies, and administrative systems, we align with TEBI to build sustainable enterprises.",
    icon: GraduationCap,
    color: "from-amber-500/10 to-orange-500/5",
  },
  {
    letter: "A",
    title: "Action",
    desc: "Moving theories into executable, high-impact programs. Organizing local talent, structural resource mobilization, mentorship hubs, and community outreach projects to drive concrete results.",
    icon: Sparkles,
    color: "from-emerald-500/10 to-teal-500/5",
  },
  {
    letter: "P",
    title: "Purpose",
    desc: "Rooting business actions in community impact and long-term inheritance. We help entrepreneurs align commercial success with personal fulfillment, ethics, and generational legacy.",
    icon: Compass,
    color: "from-purple-500/10 to-pink-500/5",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function LeapPillars() {
  return (
    <section id="pillars" className="pt-16 pb-6 md:pt-20 md:pb-8 bg-[#FAFAF5] text-[#0B1F3A] px-6 md:px-12 relative overflow-hidden">
      {/* Decorative lines / light ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8A24B]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0B1F3A]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-3 block">
            Our Core Blueprint
          </span>
          <h2 className="font-display font-light text-4xl md:text-5xl text-[#0B1F3A] mb-6">
            The Pillars of <span className="font-accent italic text-gold font-medium">LEAP</span>
          </h2>
          <div className="h-1 w-12 bg-gold/40 mx-auto rounded-full mb-6" />
          <p className="font-body text-sm md:text-base text-[#0B1F3A]/70 leading-relaxed">
            LEAP represents the strategic framework through which Diamond Dreams Foundation cultivates capacity, structures enterprises, and generates visible community advancement.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {PILLARS.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={cardVariants}
                className="leap-pillar-card group relative bg-[#FBF7EE] p-8 md:p-10 rounded-[2.5rem] border border-[#0B1F3A]/5 hover:border-gold/30 hover:shadow-xl hover:shadow-[#0B1F3A]/5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative background hover block */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                <div>
                  {/* Top line with Letter & Icon */}
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-display font-black text-6xl text-gold/20 group-hover:text-gold/40 transition-colors duration-300 select-none">
                      {p.letter}
                    </span>
                    <div className="p-4 bg-[#FAFAF5] border border-[#0B1F3A]/5 rounded-2xl text-gold group-hover:bg-[#0B1F3A] group-hover:text-cream group-hover:border-transparent transition-all duration-300">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display font-semibold text-xl text-[#0B1F3A] mb-4 group-hover:text-gold transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#0B1F3A]/75 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                {/* Subtle border line on bottom card */}
                <div className="mt-8 pt-4 border-t border-[#0B1F3A]/5 flex justify-end">
                  <span className="font-body text-[9px] uppercase tracking-widest text-[#0B1F3A]/40 group-hover:text-gold transition-colors">
                    Pillar 0{index + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
