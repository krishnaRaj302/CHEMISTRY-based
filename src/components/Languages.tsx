"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Language {
  name: string;
  percentage: number;
  label: string;
}

export default function Languages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const languages: Language[] = [
    { name: "English", percentage: 90, label: "Professional" },
    { name: "Malayalam", percentage: 100, label: "Native" },
    { name: "Hindi", percentage: 75, label: "Working" },
  ];

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <section
      id="languages"
      ref={containerRef}
      className="relative py-24 bg-white/40 dark:bg-slate-900/10 border-y border-slate-200/50 dark:border-slate-800/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-16">
          
          {/* Header */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
              Languages
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
          </div>

          {/* Gauges Container */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto w-full">
            {languages.map((lang) => {
              const strokeOffset = circumference - (lang.percentage / 100) * circumference;

              return (
                <div
                  key={lang.name}
                  className="glass-card p-8 rounded-3xl border-slate-200/50 dark:border-slate-800/40 flex flex-col items-center gap-6 group hover:border-lab-cyan/30 hover:scale-[1.03] transition-all duration-300"
                >
                  {/* Circular Gauge SVG */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background circle track */}
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        className="stroke-slate-200 dark:stroke-slate-800 fill-none"
                        strokeWidth="8"
                      />
                      {/* Active glowing indicator path */}
                      <motion.circle
                        cx="60"
                        cy="60"
                        r={radius}
                        className="stroke-lab-cyan dark:stroke-lab-cyan fill-none"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={isInView ? { strokeDashoffset: strokeOffset } : { strokeDashoffset: circumference }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    {/* Centered text display */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-space text-lg font-extrabold text-primary-navy dark:text-soft-white">
                        {lang.percentage}%
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary-navy/40 dark:text-soft-white/40">
                        Fluency
                      </span>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="text-center">
                    <h3 className="font-poppins font-bold text-base text-primary-navy dark:text-soft-white">
                      {lang.name}
                    </h3>
                    <p className="font-space text-xs font-bold text-lab-blue dark:text-lab-green mt-1">
                      {lang.label} Proficiency
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
