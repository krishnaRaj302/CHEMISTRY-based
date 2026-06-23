"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  title: string;
  category: string;
  src: string;
  desc: string;
}

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      title: "Chemistry Laboratory",
      category: "Lab Analysis",
      src: "/lab.png",
      desc: "Working with quantitative analysis procedures, standardizing titrants, and monitoring inorganic mixture reactions.",
    },
    {
      title: "Molecular Research",
      category: "Research Study",
      src: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
      desc: "Analyzing structures under the microscope and running molecular simulations in Avogadro modeling tool.",
    },
    {
      title: "Scientific Poster Presentations",
      category: "Publications",
      src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
      desc: "Designing poster presentations and structural schemes using ChemSketch for academic seminars.",
    },
    {
      title: "Academic Events & Seminars",
      category: "College Life",
      src: "/collage.png",
      desc: "Participating in college science festivals, quality assurance cells audits, and educational group seminars.",
    },
  ];

  return (
    <section
      id="gallery"
      className="relative py-24 bg-white/10 dark:bg-slate-900/5 scientific-grid"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-16">
          
          {/* Header */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-poppins font-extrabold tracking-tight text-gradient-navy-blue">
              Scientific Gallery
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-lab-blue to-lab-cyan mt-2 mx-auto md:mx-0 rounded-full" />
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={item.title}
                onClick={() => setSelectedImg(item)}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer border-slate-200/50 dark:border-slate-800/40 relative group shadow-md hover:border-lab-cyan/45 transition-all duration-300 h-80"
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // fallback image
                    e.currentTarget.src = "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=800";
                  }}
                />

                {/* Glassmorphism Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary-navy/90 via-primary-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-1.5 text-lab-cyan mb-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span className="font-space text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-base text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 mt-1">
                    {item.desc}
                  </p>
                  
                  {/* Search / Zoom indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Search className="w-4 h-4" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox / View image modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="glass-card max-w-4xl w-full rounded-3xl overflow-hidden border-slate-800 flex flex-col md:flex-row relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition-colors z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image */}
            <div className="md:w-3/5 h-64 md:h-[480px]">
              <img
                src={selectedImg.src}
                alt={selectedImg.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=800";
                }}
              />
            </div>

            {/* Lightbox Text */}
            <div className="md:w-2/5 p-8 flex flex-col justify-between bg-white dark:bg-slate-950">
              <div className="flex flex-col gap-4">
                <span className="font-space text-xs font-bold text-lab-cyan bg-lab-cyan/10 dark:bg-lab-cyan/15 px-3 py-1 rounded-md self-start">
                  {selectedImg.category}
                </span>
                
                <h3 className="font-poppins font-bold text-xl md:text-2xl text-primary-navy dark:text-soft-white">
                  {selectedImg.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-primary-navy/70 dark:text-soft-white/60 leading-relaxed">
                  {selectedImg.desc}
                </p>
              </div>
              
              <div className="text-[10px] text-primary-navy/40 dark:text-soft-white/40 pt-6 border-t border-slate-100 dark:border-slate-800">
                Chemistry Portfolio Image Showcase
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
