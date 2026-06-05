"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" as const } },
};

const rowReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8 },
};

const ctaLink =
  "font-body text-[10px] uppercase tracking-widest border-b border-navy pb-1 hover:text-gold hover:border-gold transition-colors inline-block";

export default function MasterPortal() {
  return (
    <div className="bg-cream text-navy">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <Image
          src="/bridal1.JPG"
          alt="A Diamond Dreams celebration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* navy overlays for legibility + to ground the watermark */}
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/40" />

        <motion.div
          className="relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display font-light text-cream text-6xl md:text-8xl leading-tight mb-6"
          >
            Diamond <span className="font-accent italic text-gold">Dreams</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/70"
          >
            Moments, Spaces &amp; Mastery.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-body text-[10px] uppercase tracking-[0.3em] text-cream/50 z-10"
        >
          Explore
        </motion.div>
      </section>

      {/* ── Asymmetrical gateway ─────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* 01 — Bridal (image left, text right) */}
        <motion.div {...rowReveal} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24 md:mb-32">
          <div className="md:col-span-6 relative h-[60vh] md:h-[70vh]">
            <Image
              src="/bride_and_groom1.JPG"
              alt="Bridal styling by Diamond Dreams"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div className="md:col-span-4 md:col-start-8">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-4 block">
              01 / Boutique
            </span>
            <h2 className="font-display font-light text-5xl mb-6">Bridal</h2>
            <p className="font-accent italic text-xl text-navy/70 mb-8">
              Curating luxury gowns and unmatched bridal consultations.
            </p>
            <Link href="/bridal" className={ctaLink}>
              Discover the Collection
            </Link>
          </div>
        </motion.div>

        {/* 02 — Event Decor (text left, image right) */}
        <motion.div {...rowReveal} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24 md:mb-32">
          <div className="md:col-span-4 md:col-start-2 order-2 md:order-1">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-4 block">
              02 / Design
            </span>
            <h2 className="font-display font-light text-5xl mb-6">
              Event <span className="font-accent italic">Decor</span>
            </h2>
            <p className="font-accent italic text-xl text-navy/70 mb-8">
              Transforming atmospheres into premium visual experiences.
            </p>
            <Link href="/decor" className={ctaLink}>
              View the Portfolio
            </Link>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 relative h-[55vh] md:h-[60vh]">
            <Image
              src="/decor1.JPG"
              alt="Luxury event decor by Diamond Dreams"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        {/* 03 — The Academy / TEBI (image left, text right) */}
        <motion.div {...rowReveal} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 relative h-[60vh] md:h-[70vh]">
            <Image
              src="/ceo.jpg"
              alt="The Event Business Institute"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div className="md:col-span-4 md:col-start-8">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-4 block">
              03 / Mastery
            </span>
            <h2 className="font-display font-light text-5xl mb-2">TEBI</h2>
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-navy/50 mb-6">
              The Event Business Institute
            </p>
            <p className="font-accent italic text-xl text-navy/70 mb-8">
              Training event planners to build profitable, structured businesses.
            </p>
            <Link href="/academy" className={ctaLink}>
              Enter the Academy
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── 04 — Foundation band ─────────────────────────────── */}
      <section className="bg-navy text-cream px-6 md:px-12 py-24 md:py-32">
        <motion.div {...rowReveal} className="max-w-3xl mx-auto text-center">
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-4 block">
            04 / Purpose
          </span>
          <h2 className="font-display font-light text-5xl mb-6">
            The <span className="font-accent italic text-gold">LEAP</span> Foundation
          </h2>
          <p className="font-accent italic text-xl text-cream/70 mb-8">
            Empowering the next generation of young creatives and entrepreneurs.
          </p>
          <Link
            href="/foundation"
            className="font-body text-[10px] uppercase tracking-widest border-b border-cream pb-1 hover:text-gold hover:border-gold transition-colors inline-block"
          >
            Support the Cause
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
