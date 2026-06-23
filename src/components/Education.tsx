"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, BookOpen, School } from "lucide-react";

interface Milestone {
  type: string;
  degree: string;
  institution: string;
  location: string;
  stats: string;
  details: string;
  year: string;
  icon: React.ReactNode;
  color: string;
}

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  const milestones: Milestone[] = [
    {
      type: "MSc",
      degree: "Integrated MSc in Basic Science – Chemistry",
      institution: "St. Xavier's College for Women",
      location: "Aluva, Kerala",
      stats: "SGPA: 4.14",
      details: "Semester 7 (Current) · Focused on Advanced Organic Synthesis, Spectroscopic Methods, Solid State Chemistry, and Research Methodology.",
      year: "2021 – 2026",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-lab-blue to-lab-cyan",
    },
    {
      type: "HSE",
      degree: "Higher Secondary Education",
      institution: "St. Joseph's Higher Secondary School",
      location: "Pullurampara, Kozhikode, Kerala",
      stats: "96.1%",
      details: "Specialized in Science stream (Physics, Chemistry, Mathematics, Biology). Selected for multiple state-level science exhibition events.",
      year: "2019 – 2021",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-lab-cyan to-lab-green",
    },
    {
      type: "SSC",
      degree: "Secondary School Certificate (SSLC)",
      institution: "St. Joseph's Higher Secondary School",
      location: "Pullurampara, Kozhikode, Kerala",
      stats: "A+ Grade",
      details: "Completed with distinction across all subjects. Demonstrated early aptitude in mathematics and science fundamentals.",
      year: "2019",
      icon: <School className="w-5 h-5" />,
      color: "from-lab-green to-emerald-400",
    },
  ];

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-24 bg-white/10 dark:bg-slate-900/5 scientific-grid"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
              Education Timeline
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
            <p className="text-xs sm:text-sm text-primary-navy/55 dark:text-soft-white/45 mt-3 font-space">
              Academic journey through scientific excellence
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto w-full">

            {/* Animated tube spine */}
            <div className="absolute left-[6px] sm:left-3 md:left-1/2 md:-translate-x-1/2 top-6 bottom-4 w-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleY: pathLength }}
                className="w-full h-full origin-top bg-gradient-to-b from-lab-cyan via-lab-blue to-lab-green shadow-[0_0_10px_#4FC3F7]"
              />
            </div>

            {/* Milestones */}
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-16">
              {milestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Node marker */}
                    <div
                      className={`absolute left-0 sm:left-1 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 rounded-full bg-gradient-to-br ${milestone.color} text-white shadow-lg border-2 border-white dark:border-slate-950 z-10 hover:scale-110 transition-transform duration-300 -translate-x-[13px] sm:-translate-x-[16px] md:translate-x-0`}
                    >
                      {milestone.icon}
                    </div>

                    {/* Card */}
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] pt-1 pl-10 sm:pl-12 md:pl-0 md:pt-0 ${
                        isEven ? "md:pr-8" : "md:pl-8"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30, x: isEven ? 20 : -20 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="glass-card p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-md hover:border-lab-cyan/40 hover:shadow-lg transition-all duration-300 relative group"
                      >
                        {/* Type badge */}
                        <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-1.5 sm:px-2.5 py-0.5 rounded-md bg-gradient-to-r ${milestone.color} bg-opacity-10 font-space text-[8px] sm:text-[10px] font-bold text-white`}
                          style={{ background: `linear-gradient(135deg, rgba(25,118,210,0.15), rgba(79,195,247,0.15))` }}
                        >
                          <span className="text-lab-blue dark:text-lab-cyan">{milestone.type}</span>
                        </div>

                        <span className="font-space text-[9px] sm:text-xs font-bold text-lab-cyan dark:text-lab-green block mb-1">
                          📅 {milestone.year}
                        </span>

                        <h3 className="text-sm sm:text-base md:text-lg font-poppins font-bold text-primary-navy dark:text-soft-white group-hover:text-lab-blue dark:group-hover:text-lab-cyan transition-colors duration-300 pr-14 sm:pr-16">
                          {milestone.degree}
                        </h3>

                        <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold text-primary-navy/70 dark:text-soft-white/60 mt-1">
                          {milestone.institution}{" "}
                          <span className="text-primary-navy/35 dark:text-soft-white/35">·</span> {milestone.location}
                        </h4>

                        <p className="text-[10px] sm:text-xs md:text-sm text-primary-navy/60 dark:text-soft-white/55 mt-2 leading-relaxed">
                          {milestone.details}
                        </p>

                        {/* Score bar */}
                        <div className="flex items-center gap-2 mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 border-t border-slate-200/30 dark:border-slate-800/30">
                          <div className="flex-1 h-2 sm:h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-lab-blue to-lab-cyan rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{
                                width:
                                  milestone.type === "MSc"
                                    ? "82%"
                                    : milestone.type === "HSE"
                                    ? "96.1%"
                                    : "90%",
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            />
                          </div>
                          <span className="font-space text-[8px] sm:text-[9px] md:text-xs font-extrabold text-primary-navy dark:text-soft-white whitespace-nowrap">
                            {milestone.stats}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
