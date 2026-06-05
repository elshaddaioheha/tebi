"use client";

import React from "react";
import { CheckCircle2, Trophy, Target, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/global/FadeIn";
import Link from "next/link";

const Reset = () => {
    const whoIsItFor = [
        "Planners already booking clients",
        "Planners who feel overworked and underpaid",
        "Ready to operate like CEOs, not freelancers",
    ];

    const outcomes = [
        { icon: <Target className="text-secondary" />, text: "Clear business structure" },
        { icon: <Trophy className="text-secondary" />, text: "Confident pricing decisions" },
        { icon: <ShieldCheck className="text-secondary" />, text: "90-day execution plan" },
    ];

    return (
        <section id="courses" className="py-24 px-6 bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative p-8 md:p-16 bg-brand rounded-[3rem] text-white overflow-hidden shadow-2xl">
                    {/* Static background highlights */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <FadeIn delay={0}>
                                <span className="inline-block px-4 py-1 bg-secondary text-primary text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6">
                                    Signature Offer
                                </span>
                            </FadeIn>
                            <FadeIn delay={100}>
                                <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                                    The Event Business Reset
                                </h2>
                            </FadeIn>
                            <FadeIn delay={150}>
                                <p className="text-xl text-white/70 mb-10 leading-relaxed">
                                    A structured 12-week transformation for event planners tired of the hustle and ready for the legacy.
                                </p>
                            </FadeIn>

                            <div className="space-y-4 mb-10">
                                <FadeIn delay={200}>
                                    <p className="text-lg font-bold border-b border-white/10 pb-2 mb-6">Who This Is For:</p>
                                </FadeIn>
                                {whoIsItFor.map((item, i) => (
                                    <FadeIn key={i} delay={250 + i * 80}>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 size={20} className="text-secondary" />
                                            <span className="text-white/90 text-lg">{item}</span>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>

                        <FadeIn delay={200}>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-3xl">
                                <h3 className="text-2xl font-serif mb-8 text-center">What You Walk Away With</h3>
                                <div className="grid gap-6">
                                    {outcomes.map((outcome, i) => (
                                        <FadeIn key={i} delay={300 + i * 80}>
                                            <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                                    {outcome.icon}
                                                </div>
                                                <span className="text-xl font-medium">{outcome.text}</span>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>

                                <div className="mt-12 text-center">
                                    <button className="w-full py-5 bg-secondary text-primary font-bold text-lg rounded-2xl hover:bg-secondary-light hover:scale-[1.02] transition-all shadow-xl shadow-black/20">
                                        Join the Next Cohort
                                    </button>
                                    <p className="mt-4 text-sm text-white/50">Next Cohort Starts March 2024</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reset;
