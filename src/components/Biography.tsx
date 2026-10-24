import React, { useState, useEffect, useRef } from "react";

export default function Biography() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-900 pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden" 
      id="biography-root"
    >
      {/* Background Image Layer featuring the Nick Decombel photograph of Olivier holding Mickey's */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img 
          src="/img/portfolio/19-full.jpg" 
          alt="Marchal M12 — Sculpture by Olivier Pauwels" 
          className="w-full h-full object-cover object-center opacity-35 sm:opacity-40 filter contrast-[1.05]"
        />
        {/* Soft white gradient fade ensuring maximum text contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/90" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header: Clean typography, NO borders */}
        <div 
          className={`mb-8 sm:mb-10 transform transition-all duration-900 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <span className="font-sans text-xs sm:text-sm text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-2">
            ABOUT OLIVIER PAUWELS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-tight tracking-tight text-zinc-900">
            Discover the mind behind the biomechanical creations.
          </h2>
        </div>

        {/* 2-COLUMN BALANCED EDITORIAL FLOW OVER BACKGROUND */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start" id="biography-manifesto">
          
          {/* Left Column */}
          <div 
            className={`space-y-5 text-zinc-800 font-sans text-base sm:text-[1.05rem] leading-relaxed font-light transform transition-all duration-1000 ease-out delay-150 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p>
              Belgian artist Olivier Pauwels (°1974), also known by his moniker BOHI, was born in Ostend and works from his studio in Middelkerke. Armed with a degree in graphic arts, he began his career as a painter and graphic designer in the advertising sector before deliberately pursuing an autonomous path as a full-time sculptor. That transition paved the way for the intricate three-dimensional assemblages that define his work today—provocative sculptures that bridge the gap between imagination and social critique.
            </p>

            <blockquote className="my-6 py-3 px-4 border-l-2 border-zinc-900 bg-white/70 backdrop-blur-xs rounded-r-lg shadow-xs">
              <p className="font-serif italic text-lg sm:text-xl text-zinc-950 leading-snug">
                “Where the life of an object stops… the dream world of the artist begins.”
              </p>
            </blockquote>

            <p>
              At the core of his artistic language is an ongoing confrontation between striking opposites: recycling versus throwaway culture, delicate vulnerability versus cold mechanical power, and playful humour versus simmering threat. Pauwels builds an apocalyptic visual trajectory using salvaged relics—from discarded aeroplane fragments and dismantled telephone booths to mechanical components—which he decontextualises and combines with gleaming stainless steel, cast polyester, and authentic historical artifacts. Every component sheds its original purpose to enter an entirely new identity.
            </p>
          </div>

          {/* Right Column */}
          <div 
            className={`space-y-5 text-zinc-800 font-sans text-base sm:text-[1.05rem] leading-relaxed font-light transform transition-all duration-1000 ease-out delay-250 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p>
              The signature figures within this universe are his cyberbabies. Born from classic toy doll forms merged with heavy industrial machinery, these android creatures don authentic vintage helmets, harnesses, and military gear. They are charming yet unsettling, confronting the observer with the razor-thin boundary separating innocence from aggression. For Pauwels, these infants represent the blank canvas of upcoming generations—a vehicle onto which society projects its dreams, desires, and anxieties. By integrating explicit military elements, such as historical nods to WWII bombers like the B40 Flying Fortress, his work consciously cultivates tension. It serves as a stark reminder of cyclical human history: every generation vows to build a better future, yet the same conflicts inevitably repeat.
            </p>

            <p>
              Pauwels' singular eye for industrial assemblage caught the attention of visionary director George Miller in 2010, leading to a collaboration that helped shape the gritty, tactile aesthetic of the six-time Oscar-winning feature Mad Max: Fury Road (2015). That partnership gave his career major international momentum, establishing him as a master of apocalyptic craftsmanship. Today, his work commands both film history and prominent public venues, epitomised by monumental installations like B40 Ufo in the striking architectural setting of Silt. For Pauwels, placing bold, narrative art in open public spaces rather than tucking it away is the ultimate goal, allowing these intricate machines to provoke thought and spark conversation with everyone who encounters them.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
