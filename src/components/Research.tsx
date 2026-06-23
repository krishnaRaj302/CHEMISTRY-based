"use client";

import { motion } from "framer-motion";
import { Search, Compass, RefreshCw, BarChart2, Lightbulb, ShieldCheck } from "lucide-react";

interface ResearchTopic {
  title: string;
  desc: string;
  icon: React.ReactNode;
  formula: string;
  moleculeSvg: React.ReactNode;
  color: string;
}

export default function Research() {
  const researchTopics: ResearchTopic[] = [
    {
      title: "Analytical Chemistry",
      desc: "Precise estimation and separation of inorganic mixtures, quantifications via volumetric titrations, and gravimetric weight estimation.",
      icon: <BarChart2 className="w-6 h-6" />,
      formula: "pH = -log[H⁺]",
      color: "from-blue-500 to-cyan-400",
      moleculeSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-cyan-400 fill-none" strokeWidth="2">
          {/* Hexagon ring with analytical balance indicator */}
          <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
          <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      ),
    },
    {
      title: "Organic Chemistry",
      desc: "Synthesizing organic structures, recrystallization of products, checking yields, and studying organic chemical reactivities.",
      icon: <Compass className="w-6 h-6" />,
      formula: "C₆H₆ (Benzene)",
      color: "from-teal-500 to-emerald-400",
      moleculeSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-emerald-400 fill-none" strokeWidth="2">
          {/* Benzene Ring */}
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
          <circle cx="50" cy="50" r="22" strokeDasharray="5 3" />
        </svg>
      ),
    },
    {
      title: "Laboratory Research",
      desc: "Investigating natural formulations and soap synthesis utilizing diverse herbal extracts to capture eco-friendly antimicrobe properties.",
      icon: <Search className="w-6 h-6" />,
      formula: "C₁₇H₃₅COONa",
      color: "from-emerald-500 to-green-400",
      moleculeSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-green-400 fill-none" strokeWidth="2">
          {/* Hydrophobic tail / Hydrophilic head */}
          <path d="M15,50 L25,40 L35,60 L45,40 L55,60 L65,40 L75,50" />
          <circle cx="82" cy="50" r="8" />
        </svg>
      ),
    },
    {
      title: "Instrumentation",
      desc: "Applying UV-Visible spectrophotometry, pH measurements, colorimetry, and chromatography techniques for compounds estimation.",
      icon: <RefreshCw className="w-6 h-6" />,
      formula: "A = ε · c · l",
      color: "from-purple-500 to-indigo-400",
      moleculeSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-purple-400 fill-none" strokeWidth="2">
          {/* Wave and slits */}
          <path d="M10,50 Q25,20 40,50 T70,50 T100,50" />
          <line x1="30" y1="20" x2="30" y2="80" strokeDasharray="4 4" />
          <line x1="60" y1="20" x2="60" y2="80" strokeDasharray="4 4" />
        </svg>
      ),
    },
    {
      title: "Scientific Innovation",
      desc: "Proposing molecular modelling layouts via ChemSketch and Avogadro to inspect dynamic crystal formations and compound physics.",
      icon: <Lightbulb className="w-6 h-6" />,
      formula: "E = mc²",
      color: "from-amber-500 to-orange-400",
      moleculeSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-400 fill-none" strokeWidth="2">
          {/* Glowing atom */}
          <circle cx="50" cy="50" r="10" fill="currentColor" className="opacity-20" />
          <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(-30 50 50)" />
          <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(90 50 50)" />
        </svg>
      ),
    },
    {
      title: "Chemical Safety",
      desc: "Enforcing chemical compatibility charts, MSDS protocols, neutralizers handling, and waste management for zero incident experiments.",
      icon: <ShieldCheck className="w-6 h-6" />,
      formula: "NFPA 704",
      color: "from-red-500 to-pink-400",
      moleculeSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-red-400 fill-none" strokeWidth="2">
          {/* Safety diamond */}
          <polygon points="50,15 85,50 50,85 15,50" />
          <line x1="50" y1="15" x2="50" y2="85" />
          <line x1="15" y1="50" x2="85" y2="50" />
        </svg>
      ),
    },
  ];

  return (
    <section id="research" className="relative py-24 bg-white/10 dark:bg-slate-900/5 scientific-grid">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-16">
          
          {/* Header */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
              Research Interests
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border-slate-200/50 dark:border-slate-800/40 text-primary-navy dark:text-soft-white relative overflow-hidden group flex flex-col justify-between min-h-[320px] hover:border-lab-cyan/35 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                
                {/* Visual Molecule reveal on hover */}
                <div className="absolute right-[-40px] top-[-40px] w-48 h-48 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 group-hover:rotate-45 pointer-events-none transition-all duration-500">
                  {topic.moleculeSvg}
                </div>

                <div className="flex flex-col gap-4">
                  {/* Icon Indicator */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br ${topic.color} text-white shadow-md`}>
                    {topic.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-bold text-lg text-primary-navy dark:text-soft-white group-hover:text-lab-cyan transition-colors duration-300">
                    {topic.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-primary-navy/70 dark:text-soft-white/60 leading-relaxed">
                    {topic.desc}
                  </p>
                </div>

                {/* Chemical formula foot banner */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200/30 dark:border-slate-800/30">
                  <span className="font-space text-xs text-primary-navy/40 dark:text-soft-white/40">
                    Formula Module
                  </span>
                  <span className="font-space text-xs font-bold text-lab-blue dark:text-lab-cyan bg-slate-100/50 dark:bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-200/30 dark:border-slate-800/30">
                    {topic.formula}
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
