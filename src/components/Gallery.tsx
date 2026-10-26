import React, { useState, useEffect, useRef } from "react";
import { PORTFOLIO_CREATURES, PortfolioCreature } from "../data/portfolioData";

interface GalleryProps {
  onSelectCreature: (creature: PortfolioCreature) => void;
  limit?: number;
}

export default function Gallery({ onSelectCreature, limit = 16 }: GalleryProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const displayedCreatures = PORTFOLIO_CREATURES.slice(0, limit);

  const availableCount = displayedCreatures.filter(
    (c) => c.status.toLowerCase() === "available"
  ).length;
  const acquiredCount = displayedCreatures.length - availableCount;

  const filteredItems = displayedCreatures.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "AVAILABLE") return item.status.toLowerCase() === "available";
    if (filter === "ACQUIRED") return item.status.toLowerCase() !== "available";
    return true;
  });

  return (
    <section
      ref={sectionRef}
      className="bg-white text-zinc-900 pt-6 sm:pt-8 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto selection:bg-zinc-800 selection:text-white"
      id="gallery-root"
    >
      {/* Header matching About Olivier style with scroll fly-in animation */}
      <div 
        className={`mb-10 sm:mb-14 transform transition-all duration-900 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div>
            <span className="font-sans text-xs sm:text-sm text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-2">
              SCULPTURE PORTFOLIO & ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-tight tracking-tight text-zinc-900">
              Monumental assemblages & biomechanical creatures.
            </h2>
            <p className="font-sans text-base sm:text-[1.05rem] text-zinc-600 leading-relaxed font-light mt-3 max-w-3xl">
              Explore Olivier Pauwels' comprehensive catalogue raisonné from 2007 to {new Date().getFullYear()}. Each sculpture is a singular creation assembled from historical scrap, aircraft parts, and industrial mechanisms.
            </p>
          </div>

          {/* Minimalist Borderless Filter Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 font-sans text-xs tracking-wider font-medium shrink-0">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === "ALL"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              ALL ({displayedCreatures.length})
            </button>
            <button
              onClick={() => setFilter("AVAILABLE")}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === "AVAILABLE"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              AVAILABLE ({availableCount})
            </button>
            <button
              onClick={() => setFilter("ACQUIRED")}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === "ACQUIRED"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              ACQUIRED ({acquiredCount})
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Creatures with Staggered Scroll Fly-in Entrance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
        {filteredItems.map((item, idx) => {
          const isSold = item.status.toLowerCase().includes("sold") || item.status.toLowerCase().includes("acquired");
          return (
            <a
              key={item.id}
              href={`/${item.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectCreature(item);
              }}
              className={`group cursor-pointer flex flex-col no-underline text-inherit transform transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(idx % 8) * 50}ms` }}
            >
              {/* Picture: 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-zinc-200/90 shadow-xs bg-zinc-50 group-hover:border-zinc-300 transition-colors">
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out select-none drop-shadow-sm rounded-lg"
                  loading="lazy"
                  decoding="async"
                />

                {/* Status Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`font-sans text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold backdrop-blur-md shadow-2xs ${
                      isSold
                        ? "bg-zinc-900/80 text-zinc-300"
                        : "bg-white/95 text-zinc-900 border border-zinc-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-3.5 flex flex-col">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-normal text-zinc-900 group-hover:text-zinc-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <span className="font-sans text-xs text-zinc-400 font-light shrink-0">
                    {item.year}
                  </span>
                </div>

                <p className="font-sans text-xs text-zinc-500 font-light mt-1 line-clamp-2 leading-relaxed">
                  {item.category}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
