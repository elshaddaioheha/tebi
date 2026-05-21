"use client";

import React from "react";
import { BookOpen, Lock, Sparkles } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";

const Resources = () => {
    const courses = [
        {
            title: "Introduction to Event Planning Business",
            subtitle: "Building your foundation from the ground up.",
            desc: "The essential curriculum for aspiring planners ready to turn their passion into a structured, profitable business.",
            tier: "Beginner",
            icon: <BookOpen className="w-8 h-8 text-secondary" />,
        },
        {
            title: "The Authority Event Planner™",
            subtitle: "Moving from chaos-driven planning to calm, premium execution.",
            desc: "For existing planners looking to stop the hustle and start leading with systems, strategy, and authority.",
            tier: "Professional",
            icon: <Sparkles className="w-8 h-8 text-secondary" />,
        },
        {
            title: "The Authority Event Planner™ Mastery",
            subtitle: "The Elite Standard in Premium Event Execution.",
            desc: "The final tier for veteran planners ready to dominate the market and build a sustainable legacy brand.",
            tier: "Elite Mastery",
            icon: <Lock className="w-8 h-8 text-secondary" />,
        },
    ];

    return (
        <section id="resources" className="py-24 px-6 bg-primary/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <FadeIn>
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">
                            Educational Programs
                        </span>
                    </FadeIn>
                    <FadeIn delay={100}>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary">
                            Master the Business of Events
                        </h2>
                    </FadeIn>
                    <FadeIn delay={150}>
                        <p className="mt-6 text-primary/60 max-w-2xl mx-auto text-lg">
                            Structured learning tiers designed to take you from initial spark to industry authority.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {courses.map((course, i) => (
                        <FadeIn key={i} delay={i * 100} className="h-full">
                            {/* hover:-translate-y-2 replaces framer-motion whileHover={{ y: -10 }} */}
                            <div className="bg-white p-10 rounded-[2.5rem] border border-primary/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group flex flex-col h-full">
                                <div className="mb-8 inline-block p-5 bg-primary/[0.02] rounded-3xl group-hover:bg-secondary/10 transition-colors">
                                    {course.icon}
                                </div>

                                <div className="flex-grow">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-4 block">
                                        {course.tier}
                                    </span>
                                    <h3 className="text-2xl font-serif text-primary mb-3 leading-tight">{course.title}</h3>
                                    <p className="text-primary/80 font-medium mb-4 text-sm leading-relaxed">
                                        {course.subtitle}
                                    </p>
                                    <p className="text-primary/60 text-sm leading-relaxed mb-8">
                                        {course.desc}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-primary/5 mt-auto flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary/40">
                                        Status
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-4 py-2 bg-secondary/10 rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Resources;
