"use client";

import { motion } from "framer-motion";
import { Atom, Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030A14] text-white py-16 overflow-hidden border-t border-slate-800/60">

      {/* Animated chemical bond network backdrop */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0">
        <svg className="w-full h-full stroke-white fill-none" strokeWidth="1">
          {/* Row 1 hexagons */}
          <polygon points="80,20 120,40 120,80 80,100 40,80 40,40" className="animate-pulse" />
          <line x1="120" y1="40" x2="200" y2="40" />
          <polygon points="240,20 280,40 280,80 240,100 200,80 200,40" />
          <line x1="280" y1="80" x2="360" y2="80" />
          <polygon points="400,20 440,40 440,80 400,100 360,80 360,40" className="animate-pulse" />
          <line x1="440" y1="40" x2="520" y2="40" />
          <polygon points="560,20 600,40 600,80 560,100 520,80 520,40" />
          <line x1="600" y1="80" x2="680" y2="80" />
          <polygon points="720,20 760,40 760,80 720,100 680,80 680,40" className="animate-pulse" />

          {/* Atom nodes at junctions */}
          <circle cx="80" cy="20" r="4" fill="white" />
          <circle cx="240" cy="20" r="3" fill="white" />
          <circle cx="400" cy="20" r="4" fill="white" />
          <circle cx="560" cy="20" r="3" fill="white" />
          <circle cx="720" cy="20" r="4" fill="white" />
          <circle cx="120" cy="80" r="3" fill="white" />
          <circle cx="280" cy="40" r="3" fill="white" />
          <circle cx="440" cy="80" r="3" fill="white" />
          <circle cx="600" cy="40" r="3" fill="white" />

          {/* Double bonds */}
          <line x1="120" y1="43" x2="200" y2="43" strokeDasharray="4 3" />
          <line x1="360" y1="83" x2="440" y2="83" strokeDasharray="4 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-space text-lg font-bold tracking-wider">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Atom className="w-5 h-5 text-lab-cyan" />
              </motion.div>
              <span>NANDANA<span className="text-lab-cyan">.KS</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Integrated MSc Chemistry student, passionate researcher, and laboratory innovator. Designed with passion for chemistry &amp; scientific innovation.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {/* Social links */}
              <a
                href="mailto:nandanakstdy@gmail.com"
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-lab-cyan hover:border-lab-cyan hover:shadow-[0_0_10px_rgba(79,195,247,0.3)] transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-lab-cyan hover:border-lab-cyan hover:shadow-[0_0_10px_rgba(79,195,247,0.3)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-lab-cyan hover:border-lab-cyan hover:shadow-[0_0_10px_rgba(79,195,247,0.3)] transition-all duration-300"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-space text-xs font-bold tracking-widest uppercase text-slate-400">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "About", href: "#about" },
                { name: "Education", href: "#education" },
                { name: "Skills", href: "#skills" },
                { name: "Research", href: "#research" },
                { name: "Achievements", href: "#achievements" },
                { name: "Gallery", href: "#gallery" },
                { name: "Activities", href: "#activities" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs text-slate-400 hover:text-lab-cyan transition-colors font-space flex items-center gap-1 group"
                >
                  <span className="w-1 h-1 rounded-full bg-lab-cyan/30 group-hover:bg-lab-cyan transition-colors" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact snippet */}
          <div className="flex flex-col gap-4">
            <h4 className="font-space text-xs font-bold tracking-widest uppercase text-slate-400">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Phone className="w-3.5 h-3.5" />
                Contact number hidden for privacy
              </div>
              <a href="mailto:nandanakstdy@gmail.com" className="flex items-center gap-2 text-xs text-slate-400 hover:text-lab-cyan transition-colors">
                <Mail className="w-3.5 h-3.5" />
                nandanakstdy@gmail.com
              </a>
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                Thiruvambadi, Kozhikode, Kerala, India
              </div>
            </div>

            {/* Chemical formula flourish */}
            <div className="mt-4 font-space text-[10px] text-slate-600 space-y-1">
              <div>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</div>
              <div>C₁₇H₃₅COONa · Saponification</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <p>© {currentYear} Nandana K.S. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Scientific Advancement
          </p>
          <p className="font-space tracking-wider">
            Integrated MSc Chemistry · St. Xavier&apos;s College, Aluva
          </p>
        </div>
      </div>
    </footer>
  );
}
