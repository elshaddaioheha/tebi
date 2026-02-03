"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Users, Lock, Sparkles } from "lucide-react";

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
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block"
                    >
                        Educational Programs
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-primary"
                    >
                        Master the Business of Events
                    </motion.h2>
                    <p className="mt-6 text-primary/60 max-w-2xl mx-auto text-lg">
                        Structured learning tiers designed to take you from initial spark to industry authority.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {courses.map((course, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[2.5rem] border border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-500 relative group flex flex-col h-full"
                        >
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Resources;
