"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
    return (
        <section id="about" className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-10 border-[12px] border-white">
                            <Image
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" // Professional placeholder
                                alt="Founder of TEBI"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-secondary z-0" />
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/10 rounded-full z-0 blur-2xl" />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.8,
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                    >
                        <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">The Institute</motion.span>
                        <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                            Meet the Institute
                        </motion.h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                I run The Event Business Institute because I saw too many brilliant planners burning out before they could build a legacy.
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                I focus on the business of events—systems, strategy, pricing, and CEO-level thinking—so planners can grow without burning out.
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-serif text-2xl text-primary italic border-l-4 border-secondary pl-6 py-2">
                                &quot;This is not a space for hobbyists. This is for planners ready to build something stable.&quot;
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                Our mission is to bridge the gap between creative excellence and operational dominance, turning talented hustlers into visionary CEOs.
                            </motion.p>
                        </div>

                        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-12 flex items-center gap-6">
                            <div>
                                <p className="font-serif text-xl text-primary font-bold">The Founder</p>
                                <p className="text-secondary font-medium">Head of Strategy</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
