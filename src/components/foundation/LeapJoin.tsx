"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LeapJoin() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    role: "partner",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useGSAP(() => {
    gsap.from(".join-reveal-left", {
      opacity: 0,
      x: -40,
      duration: 1.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    gsap.from(".join-reveal-right", {
      opacity: 0,
      x: 40,
      duration: 1.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef });

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please include a message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", org: "", role: "partner", message: "" });
    }, 1800);
  };

  return (
    <section ref={containerRef} id="join" className="py-24 md:py-32 bg-[#FAFAF5] text-[#0B1F3A] px-6 md:px-12 relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Left Info Column */}
          <div className="join-reveal-left lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-4 block">
                Collaborative Impact
              </span>
              <h2 className="font-display font-light text-4xl md:text-5xl leading-tight mb-8">
                Join the LEAP <br />
                <span className="font-accent italic text-gold font-medium">Movement</span>
              </h2>
              <p className="font-body text-base text-[#0B1F3A]/75 leading-relaxed mb-8 max-w-md">
                We believe in structured execution. Whether you want to volunteer, fund programs, offer internships, or mentor the next generation of creative builders, your involvement starts here.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6 pt-6 border-t border-[#0B1F3A]/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FBF7EE] border border-[#0B1F3A]/5 rounded-xl text-gold">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="font-body text-[10px] uppercase tracking-widest text-[#0B1F3A]/50">Write to Us</h4>
                  <a href="mailto:foundation@diamonddreamsgroup.com" className="font-body text-sm font-semibold hover:text-gold transition-colors">
                    foundation@diamonddreamsgroup.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FBF7EE] border border-[#0B1F3A]/5 rounded-xl text-gold">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="font-body text-[10px] uppercase tracking-widest text-[#0B1F3A]/50">Call/WhatsApp</h4>
                  <a href="https://wa.me/2348093000380" target="_blank" rel="noopener noreferrer" className="font-body text-sm font-semibold hover:text-gold transition-colors">
                    +234 809 300 0380
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FBF7EE] border border-[#0B1F3A]/5 rounded-xl text-gold">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="font-body text-[10px] uppercase tracking-widest text-[#0B1F3A]/50">Headquarters</h4>
                  <p className="font-body text-sm font-semibold">
                    Jos, Plateau State, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="join-reveal-right lg:col-span-7">
            <div className="bg-[#FBF7EE] p-8 md:p-12 rounded-[2.5rem] border border-[#0B1F3A]/5 shadow-xl shadow-[#0B1F3A]/5 relative overflow-hidden h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="partnership-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-body text-xs font-semibold uppercase tracking-wider text-[#0B1F3A]/70">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-5 py-4 border rounded-2xl bg-white text-[#0B1F3A] outline-none text-sm transition-all ${
                            errors.name ? "border-red-500 focus:border-red-500" : "border-[#0B1F3A]/10 focus:border-gold focus:ring-1 focus:ring-gold"
                          }`}
                          placeholder="Dr. Emma Collins"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-body text-xs font-semibold uppercase tracking-wider text-[#0B1F3A]/70">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-5 py-4 border rounded-2xl bg-white text-[#0B1F3A] outline-none text-sm transition-all ${
                            errors.email ? "border-red-500 focus:border-red-500" : "border-[#0B1F3A]/10 focus:border-gold focus:ring-1 focus:ring-gold"
                          }`}
                          placeholder="example@domain.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Organization */}
                      <div className="space-y-2">
                        <label htmlFor="org" className="font-body text-xs font-semibold uppercase tracking-wider text-[#0B1F3A]/70">
                          Organization (Optional)
                        </label>
                        <input
                          type="text"
                          id="org"
                          value={formData.org}
                          onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                          className="w-full px-5 py-4 border border-[#0B1F3A]/10 rounded-2xl bg-white text-[#0B1F3A] outline-none text-sm focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                          placeholder="Company or Center"
                        />
                      </div>

                      {/* Role Dropdown */}
                      <div className="space-y-2">
                        <label htmlFor="role" className="font-body text-xs font-semibold uppercase tracking-wider text-[#0B1F3A]/70">
                          Preferred Involvement
                        </label>
                        <select
                          id="role"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-5 py-4 border border-[#0B1F3A]/10 rounded-2xl bg-white text-[#0B1F3A]/80 outline-none text-sm focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none cursor-pointer"
                        >
                          <option value="partner">Corporate Partner</option>
                          <option value="sponsor">Program Sponsor</option>
                          <option value="mentor">Executive Mentor</option>
                          <option value="volunteer">Volunteer Lead</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-body text-xs font-semibold uppercase tracking-wider text-[#0B1F3A]/70">
                        Inquiry / Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-5 py-4 border rounded-2xl bg-white text-[#0B1F3A] outline-none text-sm transition-all resize-none ${
                          errors.message ? "border-red-500 focus:border-red-500" : "border-[#0B1F3A]/10 focus:border-gold focus:ring-1 focus:ring-gold"
                        }`}
                        placeholder="Tell us how you would like to collaborate..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4.5 bg-[#0B1F3A] text-cream font-body text-xs uppercase tracking-widest font-semibold rounded-2xl hover:bg-gold hover:text-[#0B1F3A] transition-all duration-300 shadow-xl shadow-[#0B1F3A]/10 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Partnership Request</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-box"
                    className="text-center space-y-6 py-12 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-full">
                      <CheckCircle size={40} className="animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-semibold text-2xl text-[#0B1F3A]">Request Sent Successfully</h3>
                      <p className="font-body text-sm text-[#0B1F3A]/70 max-w-md mx-auto">
                        Thank you for your interest in LEAP. A representative from the Diamond Dreams Foundation will reach out to you shortly via email to discuss details.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-3 border border-[#0B1F3A]/10 hover:border-[#0B1F3A] rounded-full font-body text-[10px] uppercase tracking-widest text-[#0B1F3A]/70 hover:text-[#0B1F3A] transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
