"use client";

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/shared/FadeIn";

const About = () => {
    return (
        <section id="about" className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* CEO photo — FadeIn replaces motion.div scale-in */}
                    <FadeIn delay={0} className="relative pt-8 pl-8 pb-8">
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-10 border-[12px] border-white">
                            <Image
                                src="/ceo.jpg"
                                alt="Dr. Emma Collins - CEO of TEBI"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-secondary z-0" />
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/10 rounded-full z-0 blur-2xl" />
                    </FadeIn>

                    {/* Text column */}
                    <div>
                        <FadeIn delay={100}>
                            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">The Visionary</span>
                        </FadeIn>
                        <FadeIn delay={150}>
                            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                                Meet Dr. Emma Collins
                            </h2>
                        </FadeIn>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <FadeIn delay={200}>
                                <p>
                                    Dr. Emma Collins is the visionary CEO of <strong>Diamondreams Events</strong> and <strong>Diamondreams Decor</strong>, based in Jos. With an unwavering commitment to excellence, she has built a legacy of transforming complex event logistics into seamless, premium experiences.
                                </p>
                            </FadeIn>
                            <FadeIn delay={250}>
                                <p>
                                    Her journey is fueled by a passion for structural integrity in the event industry. She doesn&apos;t just plan events; she architects systems that allow creativity to thrive within a framework of operational dominance.
                                </p>
                            </FadeIn>
                            <FadeIn delay={300}>
                                <p className="font-serif text-2xl text-primary italic border-l-4 border-secondary pl-6 py-2">
                                    &quot;Sustainability in this business is not an accident—it is the result of intention, strategy, and CEO-level thinking.&quot;
                                </p>
                            </FadeIn>
                            <FadeIn delay={350}>
                                <p>
                                    Through TEBI, Dr. Collins bridges the gap between creative talent and business mastery, empowering the next generation of event leaders to move from chaos to calm, respected execution.
                                </p>
                            </FadeIn>
                        </div>

                        <FadeIn delay={400}>
                            <div className="mt-12 flex items-center gap-6">
                                <div>
                                    <p className="font-serif text-xl text-primary font-bold">Dr. Emma Collins</p>
                                    <p className="text-secondary font-medium">Founder &amp; CEO</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
