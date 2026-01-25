"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Users, Lock, Sparkles } from "lucide-react";

const Resources = () => {
    const products = [
        {
            title: "Resource Library",
            desc: "A curated collection of industry-standard tools and case studies.",
            icon: <BookOpen className="w-8 h-8 text-secondary" />,
            status: "MVP"
        },
        {
            title: "Premium Templates",
            desc: "Plug-and-play contracts, checklists, and budget trackers.",
            icon: <FileText className="w-8 h-8 text-secondary" />,
            status: "MVP"
        },
        {
            title: "Private Community",
            desc: "Network with other ambitious planners and share strategies.",
            icon: <Users className="w-8 h-8 text-secondary" />,
            status: "MVP"
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
                        Tools & Learning
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-primary"
                    >
                        Foundation Pack
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {products.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 relative group"
                        >
                            <div className="mb-6 inline-block p-4 bg-primary/[0.02] rounded-2xl group-hover:bg-secondary/10 transition-colors">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                            <p className="text-primary/60 mb-6">{item.desc}</p>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/30 px-3 py-1 bg-primary/5 rounded-full">
                                {item.status}
                            </span>
                        </motion.div>
                    ))}

                    {/* LMS Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1 relative group"
                    >
                        <div className="h-full bg-primary p-8 rounded-3xl border border-white/10 shadow-lg relative overflow-hidden">
                            {/* Animated particles background */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-1/2 -right-1/2 w-full h-full border-2 border-dashed border-white rounded-full"
                                />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-6 inline-block p-4 bg-secondary/20 rounded-2xl">
                                    <Lock className="w-8 h-8 text-secondary" />
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="text-xl font-bold text-white">The Learning Hub</h3>
                                    <Sparkles size={16} className="text-secondary animate-pulse" />
                                </div>
                                <p className="text-white/60 mb-6 flex-grow">
                                    Full LMS integration featuring video masterclasses, curriculum tracking, and live coaching archives.
                                </p>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-3 py-1 bg-secondary/20 rounded-full w-fit">
                                    Coming Soon
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Resources;
