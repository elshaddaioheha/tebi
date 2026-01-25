"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, BarChart3, UserCheck } from "lucide-react";

const Solution = () => {
    const shifts = [
        {
            title: "From Chaos to Structure",
            desc: "Implement systems that run your business while you focus on the vision.",
            icon: <Layers className="w-8 h-8 text-secondary" />,
            tag: "Operations",
        },
        {
            title: "From Busy to Profitable",
            desc: "Master your pricing and margins to ensure every event is a financial win.",
            icon: <BarChart3 className="w-8 h-8 text-secondary" />,
            tag: "Finance",
        },
        {
            title: "From Doing Everything to Leading",
            desc: "Shift from the worker-bee mindset to the strategic CEO perspective.",
            icon: <UserCheck className="w-8 h-8 text-secondary" />,
            tag: "Strategy",
        },
    ];

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-6"
                    >
                        The Planner-to-CEO Framework™
                    </motion.h2>
                    <p className="text-xl text-primary/60 max-w-2xl mx-auto">
                        Our methodology is designed to rebuild your business from the ground up, focusing on the fundamentals that drive sustainable growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {shifts.map((shift, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group p-8 bg-surface border border-primary/5 rounded-[2rem] hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 relative"
                        >
                            <div className="mb-6 inline-block p-4 bg-primary/[0.02] rounded-2xl group-hover:bg-secondary/10 transition-colors">
                                {shift.icon}
                            </div>
                            <span className="block text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                                {shift.tag}
                            </span>
                            <h3 className="text-2xl font-serif text-primary mb-4 group-hover:text-secondary transition-colors">
                                {shift.title}
                            </h3>
                            <p className="text-primary/70 leading-relaxed mb-6">
                                {shift.desc}
                            </p>
                            <div className="flex items-center text-primary font-bold gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Learn more <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solution;
