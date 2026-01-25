"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -5, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-3xl"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.03]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase text-secondary border border-secondary/30 rounded-full bg-secondary/5"
                    >
                        Systems. Strategy. Pricing. CEO-Level Thinking.
                    </motion.span>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary mb-8 leading-[1.1] tracking-tight text-balance"
                    >
                        Where Event Planners Build <br className="hidden md:block" />
                        <span className="text-secondary italic">Real Businesses.</span>
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="text-xl md:text-2xl text-primary/70 mb-12 max-w-3xl mx-auto leading-relaxed text-balance"
                    >
                        Help emerging and scaling event planners stop hustling and start building structured, profitable event businesses.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="#reset"
                            className="w-full sm:w-auto px-10 py-5 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20"
                        >
                            View The Business Reset
                        </Link>
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-primary/20 text-primary text-lg font-bold rounded-full hover:border-primary hover:bg-primary/5 active:scale-95 transition-all duration-300"
                        >
                            Consult the Institute
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
