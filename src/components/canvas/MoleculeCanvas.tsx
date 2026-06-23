"use client";

import { useEffect, useRef, useState } from "react";

interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type: string; // 'H', 'O', 'C', 'N', etc.
}

interface Bubble {
  x: number;
  y: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function MoleculeCanvas({
  showDNA = false,
  showBubbles = false,
  density = 45,
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check dark mode
    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const atoms: Atom[] = [];
    const bubbles: Bubble[] = [];
    const elementTypes = [
      { name: "C", color: isDarkMode ? "#4FC3F7" : "#1976D2", radius: 7 }, // Carbon
      { name: "O", color: "#FF5252", radius: 6 }, // Oxygen
      { name: "H", color: isDarkMode ? "#E2F1FF" : "#0B2545", radius: 4 }, // Hydrogen
      { name: "N", color: "#00C853", radius: 6.5 }, // Nitrogen
    ];

    // Initialize atoms
    const initAtoms = () => {
      atoms.length = 0;
      const count = Math.floor((width * height) / (25000 - density * 300));
      for (let i = 0; i < count; i++) {
        const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        atoms.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: type.radius,
          color: type.color,
          type: type.name,
        });
      }
    };

    // Initialize DNA properties
    let dnaAngle = 0;
    const dnaNodes = 18;
    const dnaRadiusX = Math.min(width * 0.15, 120);
    const dnaRadiusY = height * 0.7;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initAtoms();
    };

    window.addEventListener("resize", resize);
    initAtoms();

    // Mouse handlers with lerp for smooth parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse
      const mouse = mouseRef.current;
      if (mouse.x === -1000) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
      }

      // Draw chemistry network bonds
      ctx.lineWidth = 0.8;
      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];
        
        // Update physics
        a.x += a.vx;
        a.y += a.vy;

        // Bounce walls
        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        // Mouse attraction/parallax force
        if (mouse.x !== -1000) {
          const dx = mouse.x - a.x;
          const dy = mouse.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            // Apply subtle pull towards mouse
            a.x += (dx / dist) * 0.2;
            a.y += (dy / dist) * 0.2;
          }
        }

        // Draw connections
        for (let j = i + 1; j < atoms.length; j++) {
          const b = atoms[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * (isDarkMode ? 0.18 : 0.1);
            ctx.strokeStyle = isDarkMode ? `rgba(79, 195, 247, ${alpha})` : `rgba(25, 118, 210, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw atom
        ctx.fillStyle = a.color;
        ctx.shadowBlur = isDarkMode ? 6 : 0;
        ctx.shadowColor = a.color;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw chemical symbol labels inside or beside atoms
        ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(11, 37, 69, 0.5)";
        ctx.font = "8px Space Grotesk";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(a.type, a.x, a.y + a.radius + 8);
      }

      // Draw rotating DNA Helix (typically in sidebar or background)
      if (showDNA) {
        dnaAngle += 0.008;
        const centerX = width * 0.85;
        const startY = height * 0.15;
        const endY = height * 0.85;
        const verticalSpacing = (endY - startY) / dnaNodes;

        for (let i = 0; i < dnaNodes; i++) {
          const y = startY + i * verticalSpacing;
          const offsetAngle = dnaAngle + i * 0.4;
          
          // Double strand node positions
          const x1 = centerX + Math.sin(offsetAngle) * dnaRadiusX;
          const x2 = centerX - Math.sin(offsetAngle) * dnaRadiusX;
          
          const z1 = Math.cos(offsetAngle); // Perspective scale (-1 to 1)
          const z2 = -Math.cos(offsetAngle);

          const r1 = (z1 + 1.5) * 3 + 2;
          const r2 = (z2 + 1.5) * 3 + 2;

          // Connection horizontal rungs
          const alpha = (z1 + 1.5) / 2.5 * 0.2;
          ctx.strokeStyle = isDarkMode ? `rgba(79, 195, 247, ${alpha})` : `rgba(25, 118, 210, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();

          // Strand 1 node
          ctx.fillStyle = isDarkMode ? "#4FC3F7" : "#1976D2";
          ctx.beginPath();
          ctx.arc(x1, y, r1, 0, Math.PI * 2);
          ctx.fill();

          // Strand 2 node
          ctx.fillStyle = "#00C853";
          ctx.beginPath();
          ctx.arc(x2, y, r2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw lab bubbles bubbling up (for beaker details or container overlays)
      if (showBubbles) {
        if (bubbles.length < 25 && Math.random() < 0.05) {
          bubbles.push({
            x: Math.random() * width,
            y: height + 20,
            vy: -(Math.random() * 1.5 + 0.5),
            radius: Math.random() * 5 + 2,
            opacity: Math.random() * 0.5 + 0.1,
          });
        }

        ctx.strokeStyle = isDarkMode ? "rgba(79, 195, 247, 0.4)" : "rgba(25, 118, 210, 0.3)";
        ctx.lineWidth = 1;
        for (let k = bubbles.length - 1; k >= 0; k--) {
          const bub = bubbles[k];
          bub.y += bub.vy;
          
          ctx.beginPath();
          ctx.arc(bub.x, bub.y, bub.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Pop bubble if out of screen
          if (bub.y < -10) {
            bubbles.splice(k, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, showDNA, showBubbles, isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
