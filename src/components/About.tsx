"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { Info, HelpCircle, FlaskConical } from "lucide-react";

const chemicalEquations = [
  "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
  "H₂O + CO₂ ⇌ H₂CO₃",
  "N₂ + 3H₂ ⇌ 2NH₃",
  "2H₂ + O₂ → 2H₂O",
  "Fe + CuSO₄ → FeSO₄ + Cu",
  "C₁₇H₃₅COOH + NaOH → C₁₇H₃₅COONa + H₂O",
];

const periodicTableTiles = [
  { symbol: "H", name: "Hydrogen", mass: "1.008", category: "Nonmetal" },
  { symbol: "He", name: "Helium", mass: "4.002", category: "Noble Gas" },
  { symbol: "Li", name: "Lithium", mass: "6.94", category: "Alkali Metal" },
  { symbol: "C", name: "Carbon", mass: "12.011", category: "Nonmetal" },
  { symbol: "N", name: "Nitrogen", mass: "14.007", category: "Nonmetal" },
  { symbol: "O", name: "Oxygen", mass: "15.999", category: "Nonmetal" },
  { symbol: "F", name: "Fluorine", mass: "18.998", category: "Halogen" },
  { symbol: "Ne", name: "Neon", mass: "20.180", category: "Noble Gas" },
];

interface StatItem {
  value: number;
  label: string;
  suffix: string;
}

const stats: StatItem[] = [
  { value: 96.1, label: "HSE Score", suffix: "%" },
  { value: 4.14, label: "SGPA", suffix: "" },
  { value: 3, label: "Major Awards", suffix: "+" },
  { value: 5, label: "Semesters", suffix: "" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(parseFloat(current.toFixed(1)));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-space text-2xl font-extrabold text-lab-blue dark:text-lab-cyan">
      {count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eqIndex, setEqIndex] = useState(0);
  const [hoveredTile, setHoveredTile] = useState<typeof periodicTableTiles[0] | null>(null);
  const isDarkMode = useIsDarkMode();

  // Scroll track for filling beaker
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const fillPercentage = useTransform(scrollYProgress, [0.1, 0.6], [0, 80]);
  const [liquidHeight, setLiquidHeight] = useState(0);

  useEffect(() => {
    return fillPercentage.on("change", (v) => {
      setLiquidHeight(Math.min(Math.max(v, 0), 80));
    });
  }, [fillPercentage]);

  // Rotate chemical equations
  useEffect(() => {
    const interval = setInterval(() => {
      setEqIndex((prev) => (prev + 1) % chemicalEquations.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 bg-white/40 dark:bg-slate-900/10 border-y border-slate-200/50 dark:border-slate-800/40 overflow-hidden"
    >
      {/* Decorative particles */}
      <div className="absolute top-10 right-12 w-2 h-2 rounded-full bg-lab-cyan/40 animate-ping" />
      <div className="absolute bottom-20 left-10 w-3 h-3 rounded-full bg-lab-green/25 animate-pulse" />
      <div className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full bg-lab-blue/30 animate-bounce" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-14">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
              About Me
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
          </motion.div>

          {/* Animated Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-5 rounded-2xl text-center border border-slate-200/50 dark:border-slate-800/40 hover:border-lab-cyan/35 transition-colors duration-300 group"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="font-space text-xs text-primary-navy/55 dark:text-soft-white/50 mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">

              {/* Profile photo + bio side-by-side on lg */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-md flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Small profile thumb */}
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-lab-cyan/30 shadow-lg">
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
                  <div className="mt-2 text-center">
                    <div className="font-space text-[9px] font-bold text-lab-blue dark:text-lab-cyan tracking-wider uppercase">
                      Sem 7
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm md:text-base leading-relaxed text-primary-navy dark:text-soft-white/80">
                    I am an <strong className="text-lab-blue dark:text-lab-cyan">Integrated MSc Chemistry</strong> student at St. Xavier&apos;s College for Women, Aluva. My journey in chemistry is fueled by a relentless curiosity about molecular behaviors, chemical synthesis, and analytical protocols. I thrive in the laboratory environment, where precision, observation, and safety converge to unlock new scientific insights.
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-primary-navy dark:text-soft-white/80">
                    For me, chemistry is not just an academic discipline — it is a creative canvas where complex elements build the foundations of life. I am dedicated to continuous learning, exploring instrumentation methods, and researching <strong className="text-lab-green dark:text-lab-green">herbal formulation techniques</strong>.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Analytical Chemistry", "Organic Synthesis", "Lab Safety", "Instrumentation", "Research"].map((tag) => (
                      <span
                        key={tag}
                        className="font-space text-[10px] font-bold px-2.5 py-1 rounded-md bg-lab-blue/8 dark:bg-lab-cyan/10 text-lab-blue dark:text-lab-cyan border border-lab-blue/15 dark:border-lab-cyan/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Fading Chemical Equations */}
              <div className="h-14 flex items-center justify-center lg:justify-start px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={eqIndex}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.45 }}
                    className="font-space text-sm sm:text-base text-lab-blue dark:text-lab-cyan tracking-wider font-bold flex items-center gap-2"
                  >
                    <FlaskConical className="w-4 h-4 shrink-0" />
                    {chemicalEquations[eqIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive Periodic Table Tiles */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-3"
              >
                <h3 className="text-xs font-space font-bold tracking-wider text-primary-navy/60 dark:text-soft-white/50">
                  ⚗ INTERACTIVE PERIODIC TABLE · HOVER TO EXPLORE
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {periodicTableTiles.map((tile) => (
                    <button
                      key={tile.symbol}
                      onMouseEnter={() => setHoveredTile(tile)}
                      onMouseLeave={() => setHoveredTile(null)}
                      className={`h-12 flex flex-col items-center justify-center rounded-lg border font-space transition-all duration-300 ${
                        hoveredTile?.symbol === tile.symbol
                          ? "bg-lab-cyan/25 border-lab-cyan text-lab-blue dark:text-lab-cyan scale-110 shadow-lg shadow-lab-cyan/15"
                          : "glass-card border-slate-200/50 dark:border-slate-800/40 text-primary-navy dark:text-soft-white hover:scale-105"
                      }`}
                    >
                      <span className="text-base font-extrabold">{tile.symbol}</span>
                    </button>
                  ))}
                </div>

                <div className="h-14 relative">
                  <AnimatePresence>
                    {hoveredTile && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center gap-4 px-4 py-2.5 rounded-xl bg-gradient-to-r from-lab-blue/6 to-lab-cyan/6 border border-lab-blue/10 dark:border-lab-cyan/10 text-xs"
                      >
                        <Info className="w-4 h-4 text-lab-cyan shrink-0" />
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-primary-navy dark:text-soft-white">{hoveredTile.name}</span>
                          <span className="text-primary-navy/30 dark:text-soft-white/30">·</span>
                          <span>Mass: {hoveredTile.mass}</span>
                          <span className="text-primary-navy/30 dark:text-soft-white/30">·</span>
                          <span className="text-lab-green font-semibold">{hoveredTile.category}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!hoveredTile && (
                    <div className="text-xs text-primary-navy/35 dark:text-soft-white/35 flex items-center gap-1.5 py-2.5">
                      <HelpCircle className="w-4 h-4" />
                      Hover over an elemental symbol to view atomic statistics.
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Beaker + Microscope */}
            <div className="lg:col-span-5 flex flex-col md:flex-row lg:flex-col gap-8 justify-center items-center">

              {/* Beaker */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-6 rounded-2xl w-full max-w-[240px] flex flex-col items-center gap-4 border border-lab-blue/20"
              >
                <span className="font-space text-xs font-bold text-lab-blue dark:text-lab-cyan">
                  VOLUME MEASUREMENT
                </span>
                <div className="relative w-28 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 150">
                    <path
                      d="M25,20 L25,10 L30,10 L35,10 L35,20 L30,20 L30,135 C30,140 35,142 50,142 C65,142 70,140 70,135 L70,20 L65,20 L65,10 L75,10 L75,20 Z"
                      fill="none"
                      stroke={isDarkMode ? "#E2F1FF" : "#0B2545"}
                      strokeWidth="2"
                    />
                    <line x1="30" y1="40" x2="42" y2="40" stroke={isDarkMode ? "#E2F1FF" : "#0B2545"} strokeWidth="1.5" />
                    <line x1="30" y1="65" x2="38" y2="65" stroke={isDarkMode ? "#E2F1FF" : "#0B2545"} strokeWidth="1" />
                    <line x1="30" y1="90" x2="42" y2="90" stroke={isDarkMode ? "#E2F1FF" : "#0B2545"} strokeWidth="1.5" />
                    <line x1="30" y1="115" x2="38" y2="115" stroke={isDarkMode ? "#E2F1FF" : "#0B2545"} strokeWidth="1" />
                    <text x="48" y="43" fill={isDarkMode ? "#E2F1FF" : "#0B2545"} fontSize="8" fontFamily="Space Grotesk">100ml</text>
                    <text x="48" y="93" fill={isDarkMode ? "#E2F1FF" : "#0B2545"} fontSize="8" fontFamily="Space Grotesk">50ml</text>
                    <clipPath id="beaker-clip">
                      <rect x="28" y={142 - (125 * liquidHeight) / 100} width="44" height="135" />
                    </clipPath>
                    <path
                      d="M30,30 L70,30 L70,135 C70,141 65,142 50,142 C35,142 30,141 30,135 Z"
                      fill="url(#liquid-gradient)"
                      clipPath="url(#beaker-clip)"
                    />
                    {/* Bubble inside beaker */}
                    {liquidHeight > 20 && (
                      <>
                        <circle cx="42" cy={130 - liquidHeight * 0.8} r="2" fill="rgba(255,255,255,0.5)" className="animate-bounce" />
                        <circle cx="58" cy={120 - liquidHeight * 0.6} r="1.5" fill="rgba(255,255,255,0.4)" className="animate-pulse" />
                      </>
                    )}
                    <defs>
                      <linearGradient id="liquid-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#1976D2" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="font-space text-sm font-extrabold text-primary-navy dark:text-soft-white">
                  {Math.round(liquidHeight)}% Fill Volume
                </div>
              </motion.div>

              {/* Microscope */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="glass-card p-6 rounded-2xl w-full max-w-[240px] flex flex-col items-center gap-4 border border-lab-cyan/20"
              >
                <span className="font-space text-xs font-bold text-lab-green">
                  MICROSCOPE ANALYZER
                </span>
                <div className="w-24 h-24 text-primary-navy dark:text-soft-white hover:text-lab-green transition-colors duration-500 group">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="45" y1="15" x2="55" y2="25" />
                    <line x1="42" y1="12" x2="48" y2="18" />
                    <path d="M55,25 Q70,40 55,65" />
                    <path d="M38,42 L46,50" />
                    <line x1="40" y1="46" x2="35" y2="52" />
                    <line x1="25" y1="65" x2="55" y2="65" />
                    <circle cx="35" cy="78" r="5" className="group-hover:stroke-lab-green transition-colors" />
                    <path d="M20,90 L70,90" />
                    <path d="M55,65 L55,90" />
                  </svg>
                </div>
                <div className="text-[10px] text-center text-primary-navy/55 dark:text-soft-white/55 leading-relaxed">
                  Focusing on Molecular Analysis &amp; Compound Syntheses
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);
  return isDark;
}
