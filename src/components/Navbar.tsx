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
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="w-full px-2 sm:px-4 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo / Personal Brand */}
          <a
            href="#home"
            className="flex items-center gap-1 sm:gap-2 group font-space font-bold tracking-wider text-primary-navy dark:text-soft-white flex-shrink-0 min-w-0"
          >
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-lab-blue dark:text-lab-cyan animate-spin-slow group-hover:rotate-180 transition-transform duration-700 flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base lg:text-lg truncate">
              <span className="hidden sm:inline">NANDANA</span>
              <span className="sm:hidden">ND</span>
              <span className="text-lab-blue dark:text-lab-cyan">.KS</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <div className="flex items-center gap-1 xl:gap-2 p-1 rounded-full bg-white/10 dark:bg-slate-900/30 border border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap ${
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
          <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md text-primary-navy dark:text-soft-white hover:bg-slate-100/10 cursor-pointer flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-56 max-w-xs z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-l border-slate-200/50 dark:border-slate-800/50 shadow-2xl transition-transform duration-300 flex flex-col pt-20 sm:pt-6 px-4 sm:px-6 py-6 lg:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-6 absolute top-4 right-4 sm:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-primary-navy dark:text-soft-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
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

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
