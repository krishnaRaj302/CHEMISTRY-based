"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileDown, Search, Mail, ChevronDown } from "lucide-react";
import MoleculeCanvas from "./canvas/MoleculeCanvas";

const ROLES = [
  "Research Enthusiast",
  "Laboratory Analyst",
  "Scientific Explorer",
  "Chemical Synthesist",
  "Analytical Chemist",
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  useEffect(() => {
    setDisplayed(words[wordIdx].slice(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return displayed;
}

function VaporParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 rounded-full"
          style={{
            left: `${10 + i * 11}%`,
            bottom: "5%",
            background: `radial-gradient(circle, rgba(79,195,247,${0.04 + (i % 3) * 0.02}) 0%, transparent 70%)`,
            filter: "blur(8px)",
          }}
          animate={{
            y: [0, -(80 + i * 30)],
            x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 5)],
            opacity: [0, 0.6, 0.3, 0],
            scale: [0.5, 1.2, 1.6, 2],
          }}
          transition={{
            duration: 6 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let angle = 0;
    const nodes = 20;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isDark = () => document.documentElement.classList.contains("dark");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.008;

      const cx = canvas.width * 0.88;
      const radiusX = Math.min(50, canvas.width * 0.04);
      const startY = canvas.height * 0.1;
      const endY = canvas.height * 0.9;
      const spacing = (endY - startY) / nodes;

      for (let i = 0; i < nodes; i++) {
        const y = startY + i * spacing;
        const nodeAngle = angle + i * 0.35;
        const x1 = cx + Math.sin(nodeAngle) * radiusX;
        const x2 = cx - Math.sin(nodeAngle) * radiusX;
        const cos = Math.cos(nodeAngle);
        const r1 = Math.max(2, (cos + 1.5) * 2.5);
        const r2 = Math.max(2, (-cos + 1.5) * 2.5);
        const alpha = ((cos + 1) / 2) * 0.25;

        // Rung
        ctx.strokeStyle = `rgba(79,195,247,${alpha + 0.04})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // Strand 1
        ctx.fillStyle = isDark()
          ? `rgba(79,195,247,${0.5 + cos * 0.3})`
          : `rgba(25,118,210,${0.3 + cos * 0.2})`;
        ctx.beginPath();
        ctx.arc(x1, y, r1, 0, Math.PI * 2);
        ctx.fill();

        // Strand 2
        ctx.fillStyle = `rgba(0,200,83,${0.4 + (-cos) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x2, y, r2, 0, Math.PI * 2);
        ctx.fill();

        // Spine connections
        if (i < nodes - 1) {
          const nextAngle = angle + (i + 1) * 0.35;
          const nx1 = cx + Math.sin(nextAngle) * radiusX;
          const nx2 = cx - Math.sin(nextAngle) * radiusX;
          const nextY = startY + (i + 1) * spacing;

          ctx.strokeStyle = isDark()
            ? "rgba(79,195,247,0.2)"
            : "rgba(25,118,210,0.12)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(nx1, nextY);
          ctx.stroke();

          ctx.strokeStyle = "rgba(0,200,83,0.15)";
          ctx.beginPath();
          ctx.moveTo(x2, y);
          ctx.lineTo(nx2, nextY);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70 dark:opacity-100"
    />
  );
}

export default function Hero() {
  const role = useTypewriter(ROLES, 75, 2200);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden scientific-grid"
    >
      {/* Molecule network canvas */}
      <MoleculeCanvas density={55} />

      {/* DNA helix right-side canvas */}
      <DNABackground />

      {/* Vapor / smoke particles */}
      <VaporParticles />

      {/* Decorative glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-lab-blue/8 dark:bg-lab-cyan/5 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-lab-cyan/10 dark:bg-lab-green/4 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Left Content ── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-lab-cyan/30 text-xs font-space font-semibold tracking-wider text-lab-blue dark:text-lab-cyan"
            >
              <span className="w-2 h-2 rounded-full bg-lab-green animate-ping" />
              INTEGRATED MSC CHEMISTRY · ST. XAVIER&apos;S COLLEGE, ALUVA
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue leading-tight"
            >
              Nandana K.S
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-space text-base sm:text-lg font-semibold tracking-wide text-lab-blue/80 dark:text-lab-cyan/80 flex items-center gap-1 h-7"
            >
              <span>{role}</span>
              <span className="w-0.5 h-5 bg-lab-cyan animate-pulse ml-0.5" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="max-w-xl text-sm sm:text-base leading-relaxed text-primary-navy/75 dark:text-soft-white/65"
            >
              Driven by a deep passion for chemical synthesis and analytical precision. Specializing in gravimetric processes, organic mixture preparation, molecular modelling, and research innovation — unlocking the future of basic sciences through academic rigour and chemical safety.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {[
                { label: "National Fellowship", value: "IASc-INSA-NASI" },
                { label: "World Record", value: "URF 2024" },
                { label: "Proficiency Prize", value: "2023–25" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card px-4 py-2 rounded-xl border border-lab-cyan/20 flex flex-col items-center"
                >
                  <span className="font-space text-[10px] text-primary-navy/50 dark:text-soft-white/40 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="font-space text-xs font-extrabold text-lab-blue dark:text-lab-cyan">
                    {stat.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto"
            >
              <a
                href="/Nandana_KS_CV.txt"
                download="Nandana_KS_CV.txt"
                className="magnetic-btn flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-lab-blue to-lab-cyan text-white text-sm font-semibold shadow-lg shadow-lab-blue/25 hover:shadow-lab-blue/45 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                <FileDown className="w-4 h-4" />
                Download CV
              </a>
              <a
                href="#research"
                className="magnetic-btn flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass-card border border-slate-300/50 dark:border-slate-700/50 text-primary-navy dark:text-soft-white hover:border-lab-cyan/50 text-sm font-semibold hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                View Research
              </a>
              <a
                href="#contact"
                className="magnetic-btn flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-lab-cyan/40 text-lab-blue dark:text-lab-cyan text-sm font-semibold hover:bg-lab-cyan/10 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* ── Right: Profile + Orbit ── */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Outer dashed orbit */}
              <div className="absolute inset-0 rounded-full border border-dashed border-lab-blue/30 dark:border-lab-cyan/30 animate-spin-slow" />

              {/* Mid orbit */}
              <div
                className="absolute inset-6 rounded-full border border-lab-cyan/20 animate-spin-slow"
                style={{ animationDirection: "reverse", animationDuration: "20s" }}
              />

              {/* Orbiting electrons */}
              <div className="absolute top-1/2 left-0 w-3.5 h-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-lab-cyan shadow-[0_0_10px_#4FC3F7] animate-pulse" />
              <div className="absolute top-0 right-1/4 w-2.5 h-2.5 -translate-y-1/2 rounded-full bg-lab-green shadow-[0_0_10px_#00C853] animate-ping" />
              <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-lab-blue dark:bg-lab-cyan shadow-md animate-pulse" />
              <div className="absolute top-1/4 right-0 w-2 h-2 rounded-full bg-yellow-400 animate-bounce" />

              {/* Profile frame */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/60 dark:border-slate-900/60 shadow-2xl bg-gradient-to-b from-lab-blue/10 to-lab-cyan/10 group">
                <img
                  src="/nandna.png"
                  alt="Nandana K.S – Chemistry Researcher"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>

              {/* Element card */}
              <div className="absolute -bottom-5 right-4 sm:right-6 glass-card px-4 py-2.5 rounded-xl text-center shadow-xl border border-lab-green/40 backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-lab-green">
                  <span className="font-space text-[10px] font-bold animate-spin-slow">⚛</span>
                  <span className="font-space text-xs font-bold">Element: Nd</span>
                </div>
                <div className="text-[10px] text-primary-navy/55 dark:text-soft-white/55">
                  Analytical · Precise · Curious
                </div>
              </div>

              {/* Formula card */}
              <div className="absolute -top-4 left-2 sm:left-4 glass-card px-3 py-2 rounded-xl shadow-lg border border-lab-blue/30 backdrop-blur-md">
                <span className="font-space text-xs font-bold text-lab-blue dark:text-lab-cyan">
                  C₁₇H₃₅COONa
                </span>
                <div className="text-[10px] text-primary-navy/40 dark:text-soft-white/40">Soap Synthesis</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-navy/40 dark:text-soft-white/30 hover:text-lab-cyan dark:hover:text-lab-cyan transition-colors group z-20"
        aria-label="Scroll to about section"
      >
        <span className="font-space text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
