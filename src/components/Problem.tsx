"use client";

import React from "react";

import { Zap, Construction, TrendingDown, DollarSign, Clock, Users } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";

const Problem = () => {
    const points = [
        {
            icon: <Clock className="text-secondary" />,
            title: "The Constant Hustle",
            desc: "Working 80 hours per week but barely seeing the profit to justify it.",
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
        <section id="how-it-works" className="py-24 px-6 bg-primary/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left column — headline, body, pain points */}
                    <div>
                        <FadeIn delay={0}>
                            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
                                You&apos;re good at planning. But is your business working for you?
                            </h2>
                        </FadeIn>
                        <FadeIn delay={100}>
                            <p className="text-lg md:text-xl text-primary/70 mb-8 leading-relaxed">
                                Most event planners are skilled at their craft but never learned how to run a business. That gap is what TEBI closes.
                            </p>
                        </FadeIn>

                        <div className="space-y-6">
                            {points.map((point, i) => (
                                <FadeIn key={i} delay={200 + i * 100}>
                                    <div className="flex gap-4 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-primary/5 flex items-center justify-center group-hover:bg-secondary/10 group-hover:scale-110 transition-all duration-300">
                                            {point.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors duration-300">{point.title}</h4>
                                            <p className="text-primary/60">{point.desc}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* Right column — "Reality Gap" card */}
                    <FadeIn delay={150}>
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-primary/5 border border-primary/5 relative overflow-hidden">
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
                                        <div
                                            className="h-full bg-red-400"
                                            style={{
                                                width: "90%",
                                                transformOrigin: "left",
                                                animation: "grow-bar 1s 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
                                            }}
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
                                        <div
                                            className="h-full bg-secondary"
                                            style={{
                                                width: "100%",
                                                transformOrigin: "left",
                                                animation: "grow-bar 1s 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
                                            }}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-secondary font-bold italic text-right">Freedom &amp; Growth</p>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-primary/[0.01] border border-dashed border-primary/10 rounded-xl text-center">
                                <p className="text-primary/70 font-medium italic">
                                    &quot;Event planning is not just a service—it is a business.&quot;
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default Problem;
