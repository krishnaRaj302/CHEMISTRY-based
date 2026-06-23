"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Medal, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";

interface Achievement {
  title: string;
  provider: string;
  year: string;
  detail: string;
  icon: React.ReactNode;
  badge: string;
}

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Trigger laboratory success celebration confetti
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 30 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        // Confetti shooting from two sides
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  const achievements: Achievement[] = [
    {
      title: "All India Summer Fellowship Programme",
      provider: "IASc-INSA-NASI & ICMR-RMRC",
      year: "2025",
      badge: "National Fellowship",
      detail: "Selected for the Prestigious All India Summer Fellowship Programme jointly conducted by the Indian Academy of Sciences, Indian National Science Academy, The National Academy of Sciences India, and ICMR-RMRC, Bhubaneswar.",
      icon: <Trophy className="w-6 h-6 text-yellow-500 animate-pulse" />,
    },
    {
      title: "URF World Record in Herbal Soap Making",
      provider: "Universal Records Forum",
      year: "2024",
      badge: "World Record",
      detail: "Created a URF World Record in Herbal Soap Making using different herbal extracts (2024). Explored natural extraction processes and soap saponification methods.",
      icon: <Medal className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Proficiency Prize for Academic Excellence",
      provider: "St. Xavier's College for Women",
      year: "23-24 & 24-25",
      badge: "Academic Prize",
      detail: "Awarded the college proficiency prize for consecutive academic years (2023–24 and 2024–25) in recognition of top academic rank and laboratory efficiency.",
      icon: <Award className="w-6 h-6 text-cyan-500" />,
    },
  ];

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative py-24 bg-white/40 dark:bg-slate-900/10 border-y border-slate-200/50 dark:border-slate-800/40 overflow-hidden"
    >
      {/* Decorative atomic orbitals */}
      <div className="absolute top-1/4 left-10 w-48 h-48 rounded-full border border-dashed border-lab-cyan/15 animate-spin-slow -z-10" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full border border-dashed border-lab-green/10 animate-spin-slow -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-16">
          
          {/* Header */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
              Scientific Achievements
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
          </div>

          {/* Cards Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {achievements.map((ach, idx) => (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card p-8 rounded-3xl border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between relative group hover:border-lab-cyan/40 hover:shadow-xl transition-all duration-300 min-h-[360px]"
              >
                
                {/* Shiny Gold/Cyan Accent Hover Border */}
                <div className="absolute inset-0.5 rounded-3xl border border-transparent group-hover:border-lab-cyan/20 pointer-events-none transition-colors duration-300" />
                
                <div className="flex flex-col gap-4">
                  {/* Top bar info */}
                  <div className="flex justify-between items-center">
                    <span className="font-space text-xs font-bold text-lab-cyan dark:text-lab-green tracking-wide">
                      {ach.badge}
                    </span>
                    <div className="px-2.5 py-1 rounded-md bg-slate-100/50 dark:bg-slate-900/60 font-space text-xs font-bold border border-slate-200/30 dark:border-slate-800/30">
                      {ach.year}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {ach.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-bold text-base sm:text-lg text-primary-navy dark:text-soft-white group-hover:text-lab-cyan transition-colors duration-300">
                    {ach.title}
                  </h3>

                  {/* Provider */}
                  <h4 className="text-xs font-semibold text-primary-navy/50 dark:text-soft-white/50 uppercase tracking-wider">
                    {ach.provider}
                  </h4>

                  {/* Detail */}
                  <p className="text-xs sm:text-sm text-primary-navy/70 dark:text-soft-white/60 leading-relaxed mt-2">
                    {ach.detail}
                  </p>
                </div>

                {/* Certificate indicator stamp */}
                <div className="flex items-center gap-1.5 mt-6 pt-4 border-t border-slate-200/30 dark:border-slate-800/30 text-lab-green">
                  <div className="w-1.5 h-1.5 rounded-full bg-lab-green animate-ping" />
                  <span className="font-space text-[10px] font-bold uppercase tracking-wider">
                    Certified Credential
                  </span>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
