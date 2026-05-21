"use client";

import React from "react";
import { ArrowRight, Layers, BarChart3, UserCheck } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";

const Solution = () => {
    const shifts = [
        {
            title: "From Chaos to Structure",
            desc: "Implement systems that run your business while you focus on the vision.",
            icon: <Layers className="w-8 h-8 text-secondary" />,
            tag: "Systems",
        },
        {
            title: "From Busy to Profitable",
            desc: "Master your pricing and margins to ensure every event is a financial win.",
            icon: <BarChart3 className="w-8 h-8 text-secondary" />,
            tag: "Pricing",
        },
        {
            title: "From Doing Everything to Leading",
            desc: "Shift from the worker-bee mindset to the strategic CEO perspective.",
            icon: <UserCheck className="w-8 h-8 text-secondary" />,
            tag: "Leadership",
        },
    ];

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-6">
                            Three Shifts That Change Everything
                        </h2>
                    </FadeIn>
                    <FadeIn delay={100}>
                        <p className="text-xl text-primary/60 max-w-2xl mx-auto">
                            Our methodology is designed to rebuild your business from the ground up, focusing on the fundamentals that drive sustainable growth.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {shifts.map((shift, i) => (
                        <FadeIn key={i} delay={i * 100} className="h-full">
                            {/* hover:-translate-y-2 replaces framer-motion whileHover={{ y: -8 }} */}
                            <div className="group p-8 bg-white border border-primary/5 rounded-[2rem] hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 relative h-full flex flex-col">
                                <div className="mb-6 inline-block p-4 bg-primary/[0.02] rounded-2xl group-hover:bg-secondary/10 transition-colors">
                                    {shift.icon}
                                </div>
                                <span className="block text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                                    {shift.tag}
                                </span>
                                <h3 className="text-2xl font-serif text-primary mb-4 group-hover:text-secondary transition-colors">
                                    {shift.title}
                                </h3>
                                <p className="text-primary/70 leading-relaxed mb-6 flex-grow">
                                    {shift.desc}
                                </p>
                                <div className="flex items-center text-primary font-bold gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                                    Learn more <ArrowRight size={16} />
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solution;
