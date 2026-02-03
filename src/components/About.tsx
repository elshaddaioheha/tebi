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
                                src="/ceo.jpg"
                                alt="Dr. Emma Collins - CEO of TEBI"
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
                                    duration: 0.6,
                                    staggerChildren: 0.08,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                    >
                        <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">The Visionary</motion.span>
                        <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                            Meet Dr. Emma Collins
                        </motion.h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                Dr. Emma Collins is the visionary CEO of <strong>Diamondreams Events</strong> and <strong>Diamondreams Decor</strong>, based in Jos. With an unwavering commitment to excellence, she has built a legacy of transforming complex event logistics into seamless, premium experiences.
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                Her journey is fueled by a passion for structural integrity in the event industry. She doesn&apos;t just plan events; she architects systems that allow creativity to thrive within a framework of operational dominance.
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-serif text-2xl text-primary italic border-l-4 border-secondary pl-6 py-2">
                                &quot;Sustainability in this business is not an accident—it is the result of intention, strategy, and CEO-level thinking.&quot;
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                Through TEBI, Dr. Collins bridges the gap between creative talent and business mastery, empowering the next generation of event leaders to move from chaos to calm, respected execution.
                            </motion.p>
                        </div>

                        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-12 flex items-center gap-6">
                            <div>
                                <p className="font-serif text-xl text-primary font-bold">Dr. Emma Collins</p>
                                <p className="text-secondary font-medium">Founder & CEO</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
