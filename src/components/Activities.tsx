"use client";

import { motion } from "framer-motion";
import { Users, FileText, CheckCircle2 } from "lucide-react";

export default function Activities() {
  return (
    <section
      id="activities"
      className="relative py-24 bg-white/10 dark:bg-slate-900/5 scientific-grid"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-16">
          
          {/* Header */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
              Academic Activities
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
          </div>

          <div className="relative max-w-4xl mx-auto w-full">
            {/* Desktop SVG Connecting Lab Tube */}
            <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] -translate-y-1/2 h-4 bg-slate-200 dark:bg-slate-800 rounded-full border border-slate-300 dark:border-slate-700 overflow-hidden">
              {/* Glowing Liquid Flow */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-1/3 h-full bg-linear-to-r from-lab-cyan to-lab-blue opacity-85 shadow-[0_0_8px_#4FC3F7]"
              />
            </div>

            {/* Activities Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 relative z-10">
              
              {/* Card 1: IQAC */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 rounded-3xl border-slate-200/50 dark:border-slate-800/40 relative group hover:border-lab-blue/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-lab-blue/15 text-lab-blue flex items-center justify-center shadow-inner">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="font-space text-[10px] font-bold text-lab-blue dark:text-lab-cyan uppercase tracking-wider bg-lab-blue/10 dark:bg-lab-cyan/15 px-2.5 py-1 rounded-md">
                    College Committee
                  </span>
                </div>

                <h3 className="font-poppins font-bold text-lg sm:text-xl text-primary-navy dark:text-soft-white mb-2 group-hover:text-lab-blue dark:group-hover:text-lab-cyan transition-colors duration-300">
                  Member of IQAC
                </h3>
                <h4 className="text-xs font-semibold text-primary-navy/50 dark:text-soft-white/50 mb-4">
                  Internal Quality Assurance Cell
                </h4>

                <p className="text-xs sm:text-sm text-primary-navy/70 dark:text-soft-white/60 leading-relaxed mb-6">
                  Actively contribute to evaluating and maintaining high educational standards, designing curriculum enhancement plans, and organizing quality enhancement initiatives within the institution.
                </p>

                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-start gap-2 text-xs text-primary-navy/80 dark:text-soft-white/80">
                    <CheckCircle2 className="w-4 h-4 text-lab-green shrink-0 mt-0.5" />
                    <span>Participating in strategic academic audits and reviews.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-primary-navy/80 dark:text-soft-white/80">
                    <CheckCircle2 className="w-4 h-4 text-lab-green shrink-0 mt-0.5" />
                    <span>Suggesting laboratory safety and upgrade checklists.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Card 2: Stakeholder Group */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 rounded-3xl border-slate-200/50 dark:border-slate-800/40 relative group hover:border-lab-cyan/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-lab-cyan/15 text-lab-blue dark:text-lab-cyan flex items-center justify-center shadow-inner">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="font-space text-[10px] font-bold text-lab-cyan dark:text-lab-green uppercase tracking-wider bg-lab-cyan/10 dark:bg-lab-green/15 px-2.5 py-1 rounded-md">
                    Academic Planning
                  </span>
                </div>

                <h3 className="font-poppins font-bold text-lg sm:text-xl text-primary-navy dark:text-soft-white mb-2 group-hover:text-lab-cyan dark:group-hover:text-lab-green transition-colors duration-300">
                  Member of Stakeholder Group
                </h3>
                <h4 className="text-xs font-semibold text-primary-navy/50 dark:text-soft-white/50 mb-4">
                  St. Xavier's Academic Stakeholders
                </h4>

                <p className="text-xs sm:text-sm text-primary-navy/70 dark:text-soft-white/60 leading-relaxed mb-6">
                  Collaborate in policymaking, voicing student feedback, academic restructuring reviews, and optimizing college facilities to align with modern scientific education goals.
                </p>

                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-start gap-2 text-xs text-primary-navy/80 dark:text-soft-white/80">
                    <CheckCircle2 className="w-4 h-4 text-lab-cyan dark:text-lab-green shrink-0 mt-0.5" />
                    <span>Providing student input on academic facilities upgrades.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-primary-navy/80 dark:text-soft-white/80">
                    <CheckCircle2 className="w-4 h-4 text-lab-cyan dark:text-lab-green shrink-0 mt-0.5" />
                    <span>Representing scientific student interests in policy discussions.</span>
                  </li>
                </ul>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
