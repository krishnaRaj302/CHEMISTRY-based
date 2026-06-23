"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageSquare, Check, User } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneRinging, setPhoneRinging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-white/40 dark:bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-800/40 overflow-hidden"
    >
      {/* Decorative atoms */}
      <div className="absolute top-8 right-16 w-3 h-3 rounded-full bg-lab-cyan/40 animate-ping" />
      <div className="absolute bottom-16 left-8 w-2 h-2 rounded-full bg-lab-green/35 animate-pulse" />
      <div className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-lab-blue/30 animate-bounce" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
              Contact Me
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
            <p className="text-sm text-primary-navy/55 dark:text-soft-white/45 mt-3 font-space">
              Open to research collaborations, internships & scientific discussions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Profile card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl border border-lab-cyan/20 flex items-center gap-5"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-lab-cyan/30 shrink-0 shadow-lg">
                  <img
                    src="/nandna.png"
                    alt="Nandana K.S"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-base text-primary-navy dark:text-soft-white">
                    Nandana K.S
                  </h3>
                  <p className="font-space text-xs text-lab-blue dark:text-lab-cyan mt-0.5">
                    Integrated MSc Chemistry · Sem 7
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lab-green animate-ping" />
                    <span className="font-space text-[10px] text-lab-green font-bold">Available for Opportunities</span>
                  </div>
                </div>
              </motion.div>

              {/* Phone card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex items-center gap-5 group hover:border-lab-blue/30 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setPhoneRinging(true)}
                onMouseLeave={() => setPhoneRinging(false)}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-lab-blue/15 text-lab-blue flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    phoneRinging ? "animate-bounce" : "group-hover:scale-110"
                  }`}
                >
                  <Phone className={`w-5 h-5 ${phoneRinging ? "animate-pulse" : ""}`} />
                </div>
                <div>
                  <h4 className="font-space text-xs font-bold text-primary-navy/45 dark:text-soft-white/40 uppercase tracking-wider">
                    Call / WhatsApp
                  </h4>
                  <span className="text-base font-space font-extrabold text-primary-navy dark:text-soft-white">
                    Phone hidden for privacy
                  </span>
                </div>
              </motion.div>

              {/* Email card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex items-center gap-5 group hover:border-lab-cyan/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-lab-cyan/15 text-lab-blue dark:text-lab-cyan flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-space text-xs font-bold text-primary-navy/45 dark:text-soft-white/40 uppercase tracking-wider">
                    Email Inquiry
                  </h4>
                  <a
                    href="mailto:nandanakstdy@gmail.com"
                    className="text-sm font-space font-extrabold text-primary-navy dark:text-soft-white hover:text-lab-cyan transition-colors break-all"
                  >
                    nandanakstdy@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Location card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex items-center gap-5 group hover:border-lab-green/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-lab-green/15 text-lab-green flex items-center justify-center group-hover:-translate-y-1 transition-transform shrink-0">
                  <MapPin className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-space text-xs font-bold text-primary-navy/45 dark:text-soft-white/40 uppercase tracking-wider">
                    Research Location
                  </h4>
                  <p className="text-base font-poppins font-bold text-primary-navy dark:text-soft-white">
                    Thiruvambadi, Kozhikode
                  </p>
                  <p className="text-xs text-primary-navy/50 dark:text-soft-white/40">Kerala, India</p>
                </div>
              </motion.div>

              {/* Map mock */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="glass-card h-44 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/40 relative flex items-center justify-center bg-slate-100/40 dark:bg-slate-950/20"
              >
                <svg className="w-full h-full stroke-slate-300 dark:stroke-slate-800/80 fill-none" strokeWidth="1">
                  <line x1="0" y1="44" x2="100%" y2="44" />
                  <line x1="0" y1="88" x2="100%" y2="88" />
                  <line x1="0" y1="132" x2="100%" y2="132" />
                  <line x1="80" y1="0" x2="80" y2="100%" />
                  <line x1="180" y1="0" x2="180" y2="100%" />
                  <line x1="280" y1="0" x2="280" y2="100%" />
                  <line x1="380" y1="0" x2="380" y2="100%" />
                  <circle cx="185" cy="88" r="16" className="stroke-lab-cyan/60 fill-lab-cyan/6" />
                  <circle cx="185" cy="88" r="28" className="stroke-lab-cyan/30 fill-none animate-pulse" />
                  <circle cx="185" cy="88" r="5" className="fill-lab-cyan stroke-none" />
                </svg>
                <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white border border-slate-700/50 font-space font-semibold tracking-wider">
                  11.2504° N, 75.7849° E · Kozhikode, Kerala
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7 w-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-lg relative overflow-hidden"
              >
                {/* Decorative glow corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-lab-cyan/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex items-center gap-2 mb-8 text-primary-navy dark:text-soft-white">
                  <MessageSquare className="w-5 h-5 text-lab-cyan" />
                  <h3 className="font-poppins font-bold text-lg">Send Scientific Inquiry</h3>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="font-space text-xs font-bold text-primary-navy/55 dark:text-soft-white/55 flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      REAGENT NAME (YOUR NAME)
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Enter full name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/20 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-lab-cyan focus:ring-2 focus:ring-lab-cyan/20 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="font-space text-xs font-bold text-primary-navy/55 dark:text-soft-white/55 flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      CONTACT VECTOR (EMAIL)
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/20 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-lab-cyan focus:ring-2 focus:ring-lab-cyan/20 transition-all duration-300"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="font-space text-xs font-bold text-primary-navy/55 dark:text-soft-white/55 flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" />
                      INQUIRY CONTEXT (MESSAGE)
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your inquiry, research interest, or collaboration idea..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/20 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-lab-cyan focus:ring-2 focus:ring-lab-cyan/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit / Success */}
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 justify-center px-6 py-4 rounded-xl bg-lab-green/15 border border-lab-green/50 text-lab-green text-sm font-space font-bold"
                        >
                          <Check className="w-5 h-5" />
                          ⚗ REACTION SUCCESSFUL · INQUIRY DISPATCHED!
                        </motion.div>
                      ) : (
                        <motion.button
                          key="submit-btn"
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-lab-blue to-lab-cyan text-white text-sm font-semibold shadow-lg shadow-lab-blue/20 hover:shadow-lab-blue/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 transition-all duration-300 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit Reaction (Send Inquiry)
                            </>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
