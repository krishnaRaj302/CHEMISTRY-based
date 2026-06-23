"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, FlaskConical } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Initial theme check
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between p-1.5 w-16 h-8 rounded-full border border-lab-blue/30 dark:border-lab-cyan/35 bg-white/20 dark:bg-primary-navy/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-105"
      aria-label="Toggle scientific environment theme"
    >
      <Sun className="w-4 h-4 text-amber-500 z-10 transition-transform duration-300 scale-90 dark:scale-100" />
      <FlaskConical className="w-3.5 h-3.5 text-lab-cyan dark:text-lab-green absolute left-1/2 -translate-x-1/2 z-10 opacity-70 animate-pulse" />
      <Moon className="w-4 h-4 text-blue-300 z-10 transition-transform duration-300 scale-100 dark:scale-90" />
      <div
        className={`absolute top-0.5 bottom-0.5 w-7 rounded-full bg-gradient-to-br from-lab-blue to-lab-cyan transition-transform duration-300 shadow-md ${
          theme === "light" ? "left-0.5 translate-x-0" : "left-0.5 translate-x-8"
        }`}
      />
    </button>
  );
}
