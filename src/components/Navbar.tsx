"use client";

import { useState, useEffect } from "react";
import { Menu, X, Atom } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Research", href: "#research" },
  { name: "Achievements", href: "#achievements" },
  { name: "Activities", href: "#activities" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section check on scroll
      const sections = navLinks.map((link) => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (!section) return;
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.getAttribute("id") || "";

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a
            href="#home"
            className="flex items-center gap-2 group font-space text-lg font-bold tracking-wider text-primary-navy dark:text-soft-white"
          >
            <Atom className="w-6 h-6 text-lab-blue dark:text-lab-cyan animate-spin-slow group-hover:rotate-180 transition-transform duration-700" />
            <span>
              NANDANA<span className="text-lab-blue dark:text-lab-cyan">.KS</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 dark:bg-slate-900/30 border border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "bg-linear-to-r from-lab-blue to-lab-cyan text-white shadow-md shadow-lab-blue/20"
                      : "text-primary-navy/70 dark:text-soft-white/70 hover:text-lab-blue dark:hover:text-lab-cyan hover:bg-slate-100/10"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-md text-primary-navy dark:text-soft-white hover:bg-slate-100/10 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-l border-slate-200/50 dark:border-slate-800/50 shadow-2xl transition-transform duration-300 flex flex-col p-6 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-primary-navy dark:text-soft-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? "bg-linear-to-r from-lab-blue to-lab-cyan text-white"
                  : "text-primary-navy/80 dark:text-soft-white/80 hover:text-lab-blue dark:hover:text-lab-cyan hover:bg-slate-100/10"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
