"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Construction, TrendingDown, DollarSign, Clock, Users } from "lucide-react";

const Problem = () => {
    const points = [
        {
            icon: <Clock className="text-secondary" />,
            title: "The Constant Hustle",
            desc: "Working 80-hour weeks but barely seeing the profit to justify it.",
        },
        {
            icon: <Zap className="text-secondary" />,
            title: "Reactive Planning",
            desc: "Always putting out fires instead of leading with strategy.",
        },
        {
            icon: <DollarSign className="text-secondary" />,
            title: "Uncertain Pricing",
            desc: "Fear of charging what you're worth or losing clients to 'cheaper' options.",
        },
    ];

    return (
        <section id="philosophy" className="py-24 px-6 bg-primary/[0.02] border-y border-primary/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
                            Talented, but Overwhelmed?
                        </h2>
                        <p className="text-lg md:text-xl text-primary/70 mb-8 leading-relaxed">
                            Many event planners are talented and hardworking yet still overwhelmed and underpaid.
                            The problem is not creativity—it is the absence of business structure.
                        </p>

                        <div className="space-y-6">
                            {points.map((point, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-primary/5 flex items-center justify-center">
                                        {point.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-primary mb-1">{point.title}</h4>
                                        <p className="text-primary/60">{point.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-primary/5 border border-primary/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Construction size={120} />
                        </div>

                        <h3 className="text-2xl font-serif text-primary mb-8 border-b border-primary/10 pb-4">
                            The Reality Gap
                        </h3>

                        <div className="space-y-12">
                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold uppercase tracking-widest text-primary/40">The Hustler (Chaos)</span>
                                    <span className="text-red-500 font-bold flex items-center gap-1"><TrendingDown size={14} /> Low Margin</span>
                                </div>
                                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "90%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-red-400"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-primary/50 italic text-right">Burnout Territory</p>
                            </div>

                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold uppercase tracking-widest text-secondary">The CEO (Structure)</span>
                                    <span className="text-green-600 font-bold flex items-center gap-1"><Users size={14} /> Scaleable</span>
                                </div>
                                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.8 }}
                                        className="h-full bg-secondary"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-secondary font-bold italic text-right">Freedom & Growth</p>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-primary/[0.01] border border-dashed border-primary/10 rounded-xl text-center">
                            <p className="text-primary/70 font-medium italic">
                                &quot;Event planning is not just a service—it is a business.&quot;
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
