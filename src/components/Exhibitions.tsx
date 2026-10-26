import React, { useState, useEffect, useRef } from "react";
import { EXHIBITIONS } from "../data";
import { MapPin, ArrowRight } from "lucide-react";
import { getAssetUrl } from "../utils/asset";

export default function Exhibitions() {
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [inView, setInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer to trigger entrance fly-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const years = ["ALL", ...EXHIBITIONS.map((e) => e.year)];
  const filteredExhibitions =
    selectedYear === "ALL"
      ? EXHIBITIONS
      : EXHIBITIONS.filter((e) => e.year === selectedYear);

  // Helper to cleanly separate event venue and location
  const parseEvent = (evt: string) => {
    const parts = evt.split(",");
    if (parts.length >= 2) {
      const location = parts.slice(-2).join(",").trim();
      const title = parts.slice(0, -2).join(",").trim();
      return { title: title || parts[0].trim(), location };
    }
    return { title: evt, location: "" };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-900 pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden select-auto border-t border-zinc-100"
      id="exhibitions-root"
    >
      {/* BACKGROUND LAYER: Atmospheric Exhibition Venue Photograph of Olivier Pauwels */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src={getAssetUrl("/images/kunstenaar-olivier-pauwels-bij-zijn-creatie.jpeg")}
          alt="Olivier Pauwels Exhibition"
          className="w-full h-full object-cover object-center sm:object-[center_28%] opacity-30 sm:opacity-35 filter contrast-[1.1] grayscale-25"
          loading="lazy"
          decoding="async"
        />
        {/* Soft editorial white gradient overlay ensuring clean readability and high contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95 backdrop-blur-[0.5px]" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header with Fly-In Text */}
        <div className="mb-12 sm:mb-16">
          <span 
            className={`font-sans text-xs sm:text-sm text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-2 transform transition-all duration-700 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            SELECTED EXHIBITIONS
          </span>

          <h2 
            className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-zinc-900 transform transition-all duration-900 ease-out delay-100 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            A journey through international galleries & public venues.
          </h2>

          <p 
            className={`font-sans text-base sm:text-[1.05rem] text-zinc-600 leading-relaxed font-light mt-3 max-w-3xl transform transition-all duration-1000 ease-out delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            From monumental installations across Belgium and the Netherlands to exhibitions in Melbourne, Copenhagen, and South Africa, discover where Olivier Pauwels' biomechanical world has come to life.
          </p>

          {/* Year Filter Tabs: Fly in with staggered subtle rise */}
          <div 
            className={`flex flex-wrap items-center gap-2 mt-6 pt-2 transform transition-all duration-1000 ease-out delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`font-sans text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  selectedYear === year
                    ? "bg-zinc-900 text-white font-semibold shadow-md scale-105"
                    : "bg-zinc-100/90 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 border border-zinc-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Exhibitions Timeline with Dual-Direction Fly-In */}
        <div key={selectedYear} className="space-y-12 sm:space-y-16">
          {filteredExhibitions.map((group, idx) => (
            <div
              key={group.year}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start"
            >
              {/* Year Column: Flies in from the LEFT */}
              <div 
                className={`md:col-span-3 lg:col-span-2 transform transition-all duration-1000 ease-out ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: `${Math.min(idx * 120, 600)}ms` }}
              >
                <div className="sticky top-28 flex md:flex-col items-baseline md:items-start gap-3">
                  <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-zinc-900 tracking-tight">
                    {group.year}
                  </span>
                  <span className="font-sans text-[11px] text-zinc-500 tracking-[0.2em] uppercase font-medium">
                    {group.events.length} {group.events.length === 1 ? "EXHIBIT" : "EXHIBITS"}
                  </span>
                </div>
              </div>

              {/* Events Column: Each event row flies in from the RIGHT */}
              <div className="md:col-span-9 lg:col-span-10 divide-y divide-zinc-200/80">
                {group.events.map((evt, eIdx) => {
                  const { title, location } = parseEvent(evt);
                  return (
                    <div
                      key={eIdx}
                      className={`group py-4 transition-colors transform transition-all duration-900 ease-out ${
                        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                      }`}
                      style={{ transitionDelay: `${Math.min(idx * 100 + eIdx * 60, 800)}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <h3 className="font-serif text-lg sm:text-xl md:text-[1.25rem] text-zinc-900 font-normal leading-snug group-hover:text-zinc-600 transition-colors">
                          {title}
                        </h3>
                        {location && (
                          <div className="flex items-center gap-1.5 shrink-0 pt-0.5 sm:pt-0">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
                            <span className="font-sans text-xs text-zinc-500 tracking-[0.18em] uppercase font-medium">
                              {location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Inquiry Callout at Bottom: Flies in from bottom with button from right */}
        <div
          className={`mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-zinc-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transform transition-all duration-1000 ease-out delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div 
            className={`transform transition-all duration-900 ease-out ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="font-serif italic text-lg sm:text-xl text-zinc-900">
              Interested in exhibiting Olivier Pauwels' work or commissioning a public installation?
            </p>
            <p className="font-sans text-sm text-zinc-600 font-light mt-1">
              Studio visits and gallery collaborations available by appointment.
            </p>
          </div>
          <button
            onClick={() => {
              document.getElementById("biography-images")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`font-sans text-xs bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-2.5 rounded-full tracking-[0.25em] uppercase font-semibold flex items-center gap-2 group cursor-pointer shrink-0 transition-all shadow-md transform duration-900 ease-out ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
