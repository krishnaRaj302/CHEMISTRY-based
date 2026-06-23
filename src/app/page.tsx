"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Research from "@/components/Research";
import Achievements from "@/components/Achievements";
import Activities from "@/components/Activities";
import Languages from "@/components/Languages";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const handleMouseLeave = () => setCursorVisible(false);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Loading Splash */}
      <LoadingScreen />

      {/* Cursor Glow Effect */}
      {cursorVisible && (
        <div
          className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-40 hidden md:block transition-opacity duration-300"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background:
              "radial-gradient(circle, rgba(79,195,247,0.07) 0%, rgba(25,118,210,0.04) 40%, transparent 70%)",
          }}
        />
      )}

      {/* Dot Cursor */}
      {cursorVisible && (
        <div
          className="fixed w-2 h-2 rounded-full bg-lab-cyan/80 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block mix-blend-difference"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        />
      )}

      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Research />
        <Achievements />
        <Activities />
        <Languages />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
