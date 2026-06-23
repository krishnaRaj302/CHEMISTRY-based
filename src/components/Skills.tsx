"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Beaker, ShieldAlert, Cpu, Sparkles, ShieldCheck, Flame, BookOpen, Layers } from "lucide-react";

// Types
interface Skill {
  name: string;
  level: number; // 0-100
  info: string;
}

interface SafetySkill {
  name: string;
  icon: React.ReactNode;
  color: string;
  detail: string;
}

interface SoftNode {
  name: string;
  x: number; // Coordinates for SVG rendering
  y: number;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<"lab" | "safety" | "computer" | "soft">("lab");
  const [hoveredSoft, setHoveredSoft] = useState<string | null>(null);

  // 1. Lab Skills Data
  const labSkills: Skill[] = [
    { name: "Titration", level: 90, info: "Acid-base, redox, complexometric, and iodometric analysis." },
    { name: "Gravimetry", level: 85, info: "Quantitative determination by precipitation and thermal decomposition." },
    { name: "Mixture Analysis", level: 88, info: "Systematic identification of inorganic cations and organic compounds." },
    { name: "Instrumentation", level: 80, info: "Spectrophotometry, colorimetry, pH-metry, and chromatography." },
    { name: "Organic Preparations", level: 85, info: "Synthesis, recrystallization, distillation, and yield calculations." },
  ];

  // 2. Chemical Safety Data
  const safetySkills: SafetySkill[] = [
    { name: "Hazardous Handling", icon: <Flame className="w-5 h-5" />, color: "#FF5252", detail: "Expertise in chemical labelling, hazard identification, MSDS interpretation, and PPE usage." },
    { name: "Waste Disposal", icon: <Layers className="w-5 h-5" />, color: "#4FC3F7", detail: "Eco-friendly disposal protocols for heavy metal wastes, organic solvents, and acids." },
    { name: "Emergency Response", icon: <ShieldCheck className="w-5 h-5" />, color: "#00C853", detail: "Spill management, eye-wash protocols, neutralizer handling, and fire protection." },
    { name: "Solution Preparation", icon: <Beaker className="w-5 h-5" />, color: "#1976D2", detail: "Precise dilution protocols and standard stock preparation to avoid reactive hazards." },
    { name: "Molarity Calculation", icon: <BookOpen className="w-5 h-5" />, color: "#9C27B0", detail: "Normality, molality, ppm, and stoichiometry calculations for reagent balancing." },
  ];

  // 3. Computer Skills Data
  const computerSkills = [
    { name: "ChemSketch", desc: "Chemical structures draw and 3D optimization", type: "Chemistry tool" },
    { name: "Avogadro", desc: "Molecular building and force-field mechanics", type: "Molecular modelling" },
    { name: "BioRender", desc: "Scientific illustration and poster graphics", type: "Research design" },
    { name: "MS Word", desc: "Manuscript writing and scientific formatting", type: "Office" },
    { name: "Spreadsheet", desc: "Statistical data plotting and calibration curve mapping", type: "Data analysis" },
    { name: "PowerPoint", desc: "Seminar slides, graphical abstract structures", type: "Presentation" },
  ];

  // 4. Soft Skills Molecular Node coordinates
  const softSkills: SoftNode[] = [
    { name: "Communication", x: 120, y: 80 },
    { name: "Teamwork", x: 280, y: 80 },
    { name: "Observation", x: 60, y: 180 },
    { name: "Decision Making", x: 200, y: 220 },
    { name: "Active Listening", x: 340, y: 180 },
    { name: "Presentation", x: 130, y: 320 },
    { name: "Multi-tasking", x: 270, y: 320 },
  ];

  // Define lines connecting molecular nodes for Soft Skills visual
  const nodeConnections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 3, to: 6 },
    { from: 5, to: 6 },
  ];

  return (
    <section
      id="skills"
      className="relative py-24 bg-white/40 dark:bg-slate-900/10 border-y border-slate-200/50 dark:border-slate-800/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-12">
          
          {/* Header */}
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
                Scientific Skills
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
              <p className="text-sm text-primary-navy/50 dark:text-soft-white/40 mt-2 font-space">Laboratory · Safety · Digital tools · Soft competencies</p>
            </div>

            {/* Scientific Switcher Tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-1 rounded-xl bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/60 max-w-md mx-auto md:mx-0">
              <button
                onClick={() => setActiveTab("lab")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-space font-bold transition-all duration-300 ${
                  activeTab === "lab"
                    ? "bg-lab-blue text-white shadow-md shadow-lab-blue/20"
                    : "text-primary-navy/70 dark:text-soft-white/70 hover:text-lab-blue"
                }`}
              >
                <Beaker className="w-3.5 h-3.5" />
                Laboratory
              </button>
              <button
                onClick={() => setActiveTab("safety")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-space font-bold transition-all duration-300 ${
                  activeTab === "safety"
                    ? "bg-lab-cyan text-primary-navy font-extrabold shadow-md shadow-lab-cyan/20"
                    : "text-primary-navy/70 dark:text-soft-white/70 hover:text-lab-cyan"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Safety
              </button>
              <button
                onClick={() => setActiveTab("computer")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-space font-bold transition-all duration-300 ${
                  activeTab === "computer"
                    ? "bg-lab-green text-white shadow-md shadow-lab-green/20"
                    : "text-primary-navy/70 dark:text-soft-white/70 hover:text-lab-green"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Computer
              </button>
              <button
                onClick={() => setActiveTab("soft")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-space font-bold transition-all duration-300 ${
                  activeTab === "soft"
                    ? "bg-primary-navy dark:bg-soft-white text-white dark:text-primary-navy shadow-md"
                    : "text-primary-navy/70 dark:text-soft-white/70 hover:text-primary-navy dark:hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Soft Skills
              </button>
            </div>
          </div>

          {/* Dynamic Content Panel */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Laboratory Skills */}
              {activeTab === "lab" && (
                <motion.div
                  key="lab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  {/* Left: Interactive Beakers / Tubes Graphics */}
                  <div className="flex justify-center gap-8 py-6">
                    {/* Pipette / Liquid drop representation */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-6 border-lab-cyan/20 w-44">
                      <span className="font-space text-[10px] font-bold text-lab-cyan">REACTION KINETICS</span>
                      <div className="relative w-16 h-36 flex flex-col items-center justify-between">
                        {/* Pipette dropper body */}
                        <div className="w-2.5 h-16 bg-slate-300 dark:bg-slate-700 rounded-t-full border border-slate-400" />
                        
                        {/* Dropping element animation */}
                        <motion.div
                          animate={{
                            y: [0, 80],
                            opacity: [0, 1, 1, 0],
                            scale: [1, 1.2, 0.8, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-2 h-2 rounded-full bg-lab-cyan shadow-[0_0_8px_#4FC3F7]"
                        />

                        {/* Liquid container base */}
                        <div className="w-12 h-12 rounded-b-full bg-linear-to-b from-lab-blue/30 to-lab-cyan/50 border border-lab-blue/30 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-lab-green animate-ping" />
                        </div>
                      </div>
                      <span className="text-[10px] text-center text-primary-navy/60 dark:text-soft-white/60">Droplet Titrant Kinetics</span>
                    </div>

                    {/* Test tubes bubbling */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-6 border-lab-blue/20 w-44">
                      <span className="font-space text-[10px] font-bold text-lab-blue dark:text-lab-cyan">COLOR REACTION</span>
                      <div className="flex gap-4">
                        {/* Tube 1: Cyan liquid */}
                        <div className="w-6 h-28 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-b-full relative overflow-hidden flex items-end">
                          <div className="w-full h-3/5 bg-linear-to-b from-lab-cyan/50 to-lab-blue/80 relative">
                            {/* Bubble elements */}
                            <div className="absolute bottom-2 left-1.5 w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" />
                            <div className="absolute bottom-6 right-1 w-1 h-1 rounded-full bg-white/60 animate-pulse" />
                            <div className="absolute bottom-10 left-2 w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
                          </div>
                        </div>
                        
                        {/* Tube 2: Green liquid */}
                        <div className="w-6 h-28 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-b-full relative overflow-hidden flex items-end">
                          <div className="w-full h-4/5 bg-linear-to-b from-lab-green/40 to-emerald-600/70 relative">
                            <div className="absolute bottom-4 left-1 w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                            <div className="absolute bottom-8 right-2 w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" />
                            <div className="absolute bottom-12 left-1.5 w-1 h-1 rounded-full bg-white/50 animate-pulse" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-center text-primary-navy/60 dark:text-soft-white/60">Catalytic Bubbles Color Shift</span>
                    </div>
                  </div>

                  {/* Right: Detailed Skill Cards & Progress bars */}
                  <div className="flex flex-col gap-5">
                    {labSkills.map((skill) => (
                      <div key={skill.name} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-sm font-space">
                          <span className="font-extrabold text-primary-navy dark:text-soft-white">{skill.name}</span>
                          <span className="text-lab-blue dark:text-lab-cyan font-bold">{skill.level}%</span>
                        </div>
                        
                        {/* Liquid-tube styled progress bar */}
                        <div className="relative h-4 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200/50 dark:border-slate-800/40 p-0.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-linear-to-r from-lab-blue to-lab-cyan rounded-full relative"
                          >
                            {/* Inner bubble sparkles for flask feel */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_50%)]" />
                          </motion.div>
                        </div>
                        <p className="text-xs text-primary-navy/60 dark:text-soft-white/60 leading-relaxed">
                          {skill.info}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Chemical Safety Skills */}
              {activeTab === "safety" && (
                <motion.div
                  key="safety"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
                >
                  {safetySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="glass-card p-6 rounded-2xl flex flex-col gap-4 border-slate-200/50 dark:border-slate-800/40 relative group hover:border-lab-cyan/30 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Safety shield background highlight */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: `${skill.color}15`, color: skill.color }}>
                        {skill.icon}
                      </div>

                      <h3 className="font-poppins font-bold text-sm text-primary-navy dark:text-soft-white">
                        {skill.name}
                      </h3>

                      <p className="text-xs text-primary-navy/70 dark:text-soft-white/60 leading-relaxed">
                        {skill.detail}
                      </p>

                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.color }} />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab 3: Computer Tools Skills */}
              {activeTab === "computer" && (
                <motion.div
                  key="computer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {computerSkills.map((tool) => (
                    <div
                      key={tool.name}
                      className="glass-card p-6 rounded-2xl border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-3 group hover:scale-[1.02] hover:border-lab-green/40 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-space text-[10px] font-bold text-lab-green tracking-wider uppercase">
                          {tool.type}
                        </span>
                        <div className="w-2.5 h-2.5 rounded-full bg-lab-green/20 group-hover:bg-lab-green transition-colors duration-300" />
                      </div>
                      
                      <h3 className="font-poppins font-bold text-base text-primary-navy dark:text-soft-white">
                        {tool.name}
                      </h3>
                      
                      <p className="text-xs text-primary-navy/70 dark:text-soft-white/60 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab 4: Soft Skills Nodes connected by chemical bonds */}
              {activeTab === "soft" && (
                <motion.div
                  key="soft"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col lg:flex-row items-center gap-12"
                >
                  {/* Left column Node chart */}
                  <div className="w-full max-w-[400px] h-[400px] bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-800/30 rounded-2xl relative overflow-hidden flex items-center justify-center">
                    
                    {/* SVG chemistry node network */}
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                      
                      {/* Connection bonds */}
                      {nodeConnections.map((conn, idx) => {
                        const fromNode = softSkills[conn.from];
                        const toNode = softSkills[conn.to];
                        const isHighlighted = hoveredSoft === fromNode.name || hoveredSoft === toNode.name;
                        return (
                          <line
                            key={idx}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={isHighlighted ? "#4FC3F7" : "rgba(100, 120, 150, 0.2)"}
                            strokeWidth={isHighlighted ? 2.5 : 1}
                            className="transition-all duration-300"
                          />
                        );
                      })}

                      {/* Nodes (Atoms) */}
                      {softSkills.map((node, idx) => {
                        const isHovered = hoveredSoft === node.name;
                        return (
                          <g
                            key={node.name}
                            onMouseEnter={() => setHoveredSoft(node.name)}
                            onMouseLeave={() => setHoveredSoft(null)}
                            className="cursor-pointer"
                          >
                            {/* Outer glowing ripple ring on hover */}
                            {isHovered && (
                              <circle
                                cx={node.x}
                                cy={node.y}
                                r={24}
                                fill="none"
                                stroke="#4FC3F7"
                                strokeWidth="1"
                                className="animate-ping opacity-60"
                              />
                            )}

                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={isHovered ? 16 : 12}
                              fill={isHovered ? "#4FC3F7" : "#0B2545"}
                              stroke={isHovered ? "#1976D2" : "none"}
                              strokeWidth={2}
                              className="transition-all duration-300"
                            />
                            
                            {/* Inner element text label */}
                            <text
                              x={node.x}
                              y={node.y}
                              fill={isHovered ? "#0B2545" : "#ffffff"}
                              fontSize={isHovered ? "10" : "8"}
                              fontFamily="Space Grotesk"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="central"
                              className="transition-all duration-300"
                            >
                              {node.name.slice(0, 2).toUpperCase()}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Right column text descriptors */}
                  <div className="flex flex-col gap-6 flex-1 w-full justify-center">
                    <h3 className="font-poppins font-bold text-lg text-primary-navy dark:text-soft-white">
                      Molecular Soft Skills
                    </h3>
                    <p className="text-xs sm:text-sm text-primary-navy/70 dark:text-soft-white/70 leading-relaxed">
                      Just like covalent bonds coordinate chemical structures, these collaborative soft skills shape my approach to scientific research and laboratory investigations.
                    </p>
                    
                    {/* Node detail display */}
                    <div className="min-h-[100px] glass-card p-6 rounded-2xl border-lab-cyan/20">
                      {hoveredSoft ? (
                        <div>
                          <h4 className="font-space text-sm font-extrabold text-lab-cyan">
                            Skill: {hoveredSoft}
                          </h4>
                          <p className="text-xs text-primary-navy/80 dark:text-soft-white/80 mt-2 leading-relaxed">
                            {hoveredSoft === "Communication" && "Conveying technical chemistry observations, writing lab records with high precision, and discussing findings clearly with team members."}
                            {hoveredSoft === "Teamwork" && "Collaborating on complex group preparation reactions, balancing lab tasks, and ensuring chemical safety compliance collectively."}
                            {hoveredSoft === "Observation" && "Tracking subtle titration color changes, measuring accurate gravimetric precipitates, and recording structural adjustments under the microscope."}
                            {hoveredSoft === "Decision Making" && "Executing emergency safety response protocols, identifying reagents accurately, and adjusting molecular mechanics models under Avogadro."}
                            {hoveredSoft === "Active Listening" && "Following specific instructor guidelines, absorbing critical lab instructions, and respecting safety warnings."}
                            {hoveredSoft === "Presentation" && "Illustrating biological systems using BioRender, presenting chemistry seminars, and presenting data calculations elegantly."}
                            {hoveredSoft === "Multi-tasking" && "Monitoring multiple heating reactions, supervising boiling mixtures, and maintaining safety protocols simultaneously."}
                          </p>
                        </div>
                      ) : (
                        <div className="text-xs text-primary-navy/40 dark:text-soft-white/40 flex items-center h-full justify-center text-center">
                          💡 Hover over any node in the molecular map to explore details about the soft skills bond structures.
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

// Dark Mode helper
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
