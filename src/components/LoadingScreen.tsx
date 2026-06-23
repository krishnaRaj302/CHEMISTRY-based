"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent body scroll during load
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
          }, 400);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  const dnaNodes = 12;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#030A14] overflow-hidden"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, #4FC3F7 1px, transparent 1px), linear-gradient(to bottom, #4FC3F7 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(79,195,247,0.08)_0%,transparent_70%)] animate-pulse" />
          </div>

          {/* DNA Helix SVG Animation */}
          <div className="relative mb-10">
            <svg width="80" height="160" viewBox="0 0 80 160" className="overflow-visible">
              {Array.from({ length: dnaNodes }).map((_, i) => {
                const y = 10 + i * 12;
                const angle = (i / dnaNodes) * Math.PI * 2;
                const x1 = 40 + Math.sin(angle) * 28;
                const x2 = 40 - Math.sin(angle) * 28;
                const r1 = Math.max(3, (Math.cos(angle) + 1.5) * 3);
                const r2 = Math.max(3, (-Math.cos(angle) + 1.5) * 3);
                const alpha = (Math.cos(angle) + 1) / 2;
                return (
                  <g key={i}>
                    {/* Rung */}
                    <line
                      x1={x1}
                      y1={y}
                      x2={x2}
                      y2={y}
                      stroke={`rgba(79,195,247,${alpha * 0.4 + 0.05})`}
                      strokeWidth="1"
                    />
                    {/* Strand 1 node */}
                    <circle cx={x1} cy={y} r={r1} fill="#4FC3F7" opacity={0.6 + alpha * 0.4}>
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 40 80`}
                        to={`360 40 80`}
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* Strand 2 node */}
                    <circle cx={x2} cy={y} r={r2} fill="#00C853" opacity={0.5 + (1 - alpha) * 0.4} />
                  </g>
                );
              })}

              {/* Spine lines */}
              {Array.from({ length: dnaNodes - 1 }).map((_, i) => {
                const y1 = 10 + i * 12;
                const y2 = 10 + (i + 1) * 12;
                const a1 = (i / dnaNodes) * Math.PI * 2;
                const a2 = ((i + 1) / dnaNodes) * Math.PI * 2;
                const x1a = 40 + Math.sin(a1) * 28;
                const x2a = 40 + Math.sin(a2) * 28;
                const x1b = 40 - Math.sin(a1) * 28;
                const x2b = 40 - Math.sin(a2) * 28;
                return (
                  <g key={`spine-${i}`}>
                    <line x1={x1a} y1={y1} x2={x2a} y2={y2} stroke="#4FC3F7" strokeWidth="1.5" opacity="0.4" />
                    <line x1={x1b} y1={y1} x2={x2b} y2={y2} stroke="#00C853" strokeWidth="1.5" opacity="0.3" />
                  </g>
                );
              })}
            </svg>

            {/* Rotating orbital ring around DNA */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed border-[#4FC3F7]/20 animate-spin-slow pointer-events-none" />
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <div className="font-space text-xs font-bold tracking-[0.3em] text-[#4FC3F7]/60 uppercase mb-2">
              Initializing Laboratory
            </div>
            <div className="font-poppins text-2xl font-extrabold tracking-widest text-white">
              NANDANA<span className="text-[#4FC3F7]">.KS</span>
            </div>
            <div className="font-space text-xs text-white/40 tracking-wider mt-1">
              Integrated MSc Chemistry Portfolio
            </div>
          </motion.div>

          {/* Progress bar — styled as a test tube */}
          <div className="w-64 flex flex-col items-center gap-3">
            <div className="w-full h-2 bg-white/5 rounded-full border border-white/10 overflow-hidden relative">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#1976D2] via-[#4FC3F7] to-[#00C853] relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3)_0%,transparent_60%)]" />
              </motion.div>
            </div>
            <div className="font-space text-xs text-white/30">
              {Math.min(Math.round(progress), 100)}% · Compiling Molecules
            </div>
          </div>

          {/* Floating chemical formula particles */}
          {["H₂O", "C₆H₆", "NH₃", "NaCl", "CO₂"].map((formula, i) => (
            <motion.div
              key={formula}
              className="absolute font-space text-[10px] font-bold text-[#4FC3F7]/20 select-none pointer-events-none"
              style={{
                left: `${10 + i * 18}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              {formula}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
