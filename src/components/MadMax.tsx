import React, { useState, useEffect, useRef, useCallback } from "react";
import { MADMAX_IMAGES } from "../data";
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause, Youtube, ExternalLink } from "lucide-react";

interface SlideInfo {
  src: string;
  title: string;
  caption: string;
}

const MADMAX_SLIDES: SlideInfo[] = [
  {
    src: "/img/madmax/1a.jpg",
    title: "Citadel War Relic",
    caption: "Steering wheel and biomechanical skull armature engineered for the Citadel war fleet.",
  },
  {
    src: "/img/madmax/2.jpg",
    title: "V8 Mechanical Shrine",
    caption: "Repurposed camshafts, vintage spark igniters, and skull altar artifact.",
  },
  {
    src: "/img/madmax/3.jpg",
    title: "War Rig Combat Totem",
    caption: "Hand-forged spiked skull mount designed for high-speed desert warfare.",
  },
  {
    src: "/img/madmax/4.jpg",
    title: "Immortal Respirator Apparatus",
    caption: "Concept breathing mask crafted from recycled aircraft tubing and filtration dials.",
  },
  {
    src: "/img/madmax/5.jpg",
    title: "Wasteland Engine Totem",
    caption: "Salvaged industrial manifold valves fused into a cybernetic skull sculpture.",
  },
  {
    src: "/img/madmax/6.jpg",
    title: "War Boy Steering Wheel Fetish",
    caption: "Iconic custom wheel relic worshipped by the Citadel drivers before entering battle.",
  },
  {
    src: "/img/madmax/7.jpg",
    title: "Studio Workshop Assembly",
    caption: "Production prototype in progress with hand-oxidized brass fittings and iron gears.",
  },
  {
    src: "/img/madmax/8.jpg",
    title: "Heavy Weapon Fixture",
    caption: "Biomechanical weapon housing built for high-impact vehicular combat sequences.",
  },
  {
    src: "/img/madmax/10.jpg",
    title: "Desert Film Set Sculpture",
    caption: "Monumental prop deployed on the desert location sets of Mad Max: Fury Road.",
  },
  {
    src: "/img/madmax/11.jpg",
    title: "Gauges & Ignition Harness",
    caption: "Authentic aircraft cockpit meters and vintage wiring harnesses woven into sculpture.",
  },
  {
    src: "/img/madmax/12.jpg",
    title: "Breathing Mask Prototype",
    caption: "Biomechanical facial prosthesis exploring tactile survival aesthetics.",
  },
  {
    src: "/img/madmax/15.jpg",
    title: "On-Set Creature Relic",
    caption: "Finished tactical prop presented on location under Namibian desert lighting.",
  },
];

export default function MadMax() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  // Intersection observer matching About Olivier section
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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MADMAX_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + MADMAX_SLIDES.length) % MADMAX_SLIDES.length);
  }, []);

  // Autoplay slideshow only when in view and playing
  useEffect(() => {
    if (!isPlaying || !inView) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, inView, nextSlide]);

  // Keep active thumbnail centered strictly inside the container without affecting window scroll
  useEffect(() => {
    const container = thumbnailScrollRef.current;
    if (container) {
      const activeThumb = container.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        const containerWidth = container.offsetWidth;
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const targetScrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;

        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = MADMAX_SLIDES[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-900 pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden border-t border-zinc-100"
      id="madmax-root"
    >
      {/* Background Image Layer from Portfolio */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/img/portfolio/17-full.jpg"
          alt="V8 Hoover Plymouth — Sculpture by Olivier Pauwels"
          className="w-full h-full object-cover object-center opacity-35 sm:opacity-40 filter contrast-[1.05]"
        />
        {/* Soft white gradient fade ensuring maximum contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header matching Biography.tsx style */}
      <div
        className={`mb-6 sm:mb-8 transform transition-all duration-900 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <span className="font-sans text-xs sm:text-sm text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-2">
          CINEMATIC COLLABORATION
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-tight tracking-tight text-zinc-900">
          Creature & vehicle concept design for Mad Max: Fury Road.
        </h2>
        <p className="font-sans text-base sm:text-[1.05rem] text-zinc-600 leading-relaxed font-light mt-3 max-w-3xl">
          When director George Miller envisioned the ferocious vehicular mythology of <em>Mad Max: Fury Road</em>, he invited Olivier Pauwels to collaborate on the creature and prop design, bringing authentic biomechanical relics to life.
        </p>
      </div>

      {/* GRAND HERO SLIDESHOW: Elegant picture frame matching Biography style */}
      <div
        className={`mb-8 sm:mb-12 transform transition-all duration-1000 ease-out ${
          inView ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.98] translate-y-8"
        }`}
      >
        {/* Main Display Stage */}
        <div
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] bg-zinc-950 rounded-lg overflow-hidden group shadow-2xl"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Slide image with smooth transition */}
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <img
              key={currentSlide.src}
              src={currentSlide.src}
              alt={currentSlide.title}
              className="max-w-full max-h-full object-contain transition-opacity duration-700 ease-in-out select-none"
              loading="eager"
            />
          </div>

          {/* Top Info Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            <div className="font-sans text-[11px] sm:text-xs text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-auto">
              <span>{String(currentIndex + 1).padStart(2, "0")} / {String(MADMAX_SLIDES.length).padStart(2, "0")}</span>
              <span className="mx-2 text-white/40">·</span>
              <span className="text-zinc-300 uppercase tracking-widest">{currentSlide.title}</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-white/80 hover:text-white bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/10 transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-2 text-white/80 hover:text-white bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/10 transition-colors cursor-pointer"
                aria-label="View fullscreen image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full border border-white/15 transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full border border-white/15 transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom subtle gradient caption overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-6 pt-12 z-10 flex flex-col justify-end pointer-events-none">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-white font-normal drop-shadow">
              {currentSlide.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light mt-1 max-w-2xl drop-shadow">
              {currentSlide.caption}
            </p>
          </div>
        </div>

        {/* Caption credit line matching Biography.tsx caption */}
        <p className="mt-2.5 font-serif text-sm text-zinc-500 tracking-wide text-right">
          Backstage production design for Mad Max: Fury Road, directed by George Miller
        </p>

        {/* Thumbnail Filmstrip */}
        <div
          ref={thumbnailScrollRef}
          className="flex items-center gap-2.5 overflow-x-auto py-4 mt-2 no-scrollbar scroll-smooth"
        >
          {MADMAX_SLIDES.map((slide, idx) => (
            <button
              key={slide.src}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className={`relative flex-shrink-0 aspect-square w-16 sm:w-20 rounded-md overflow-hidden transition-all duration-300 cursor-pointer bg-zinc-900 ${
                idx === currentIndex
                  ? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-white scale-105 opacity-100 shadow-md"
                  : "opacity-50 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* 2-COLUMN BALANCED EDITORIAL FLOW matching Biography.tsx */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column - Flies in from Left */}
        <div
          className={`space-y-5 text-zinc-700 font-sans text-base sm:text-[1.05rem] leading-relaxed font-light transform transition-all duration-1000 ease-out delay-150 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <p>
            When six-time Academy Award-winning director George Miller began preliminary design for <em>Mad Max: Fury Road</em>, he sought out visionary sculptors whose understanding of industrial anatomy went far beyond standard computer-generated modeling.
          </p>
          <p>
            Invited to contribute directly to the production workshops, Olivier Pauwels created an extraordinary series of tactile creature sculptures, mechanical skull totems, breathing masks, and custom steering wheels used by the Citadel’s war drivers.
          </p>
          <p>
            Each piece was handcrafted in his studio from vintage camshafts, scavenged 1950s aircraft dials, and heavy industrial fittings, infusing the film’s post-apocalyptic universe with authentic mechanical weight and visceral history.
          </p>
        </div>

        {/* Right Column - Flies in from Right */}
        <div
          className={`space-y-6 transform transition-all duration-1000 ease-out delay-300 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          {/* Pull Quote matching About section */}
          <div className="pl-6 border-l-2 border-zinc-900 py-2">
            <p className="font-serif italic text-lg sm:text-xl lg:text-[1.35rem] text-zinc-900 leading-snug">
              “Olivier’s craftsmanship gave the wasteland relics a soul—heavy with history, mechanical danger, and unmistakable artistic presence.”
            </p>
            <span className="block mt-3 font-sans text-xs tracking-widest text-zinc-500 uppercase font-semibold">
              MAD MAX: FURY ROAD PRODUCTION COLLABORATION
            </span>
          </div>

          <div className="space-y-4 text-zinc-600 font-sans text-sm sm:text-base leading-relaxed font-light">
            <p>
              The film went on to win six Academy Awards and earned widespread acclaim for its revolutionary practical effects and uncompromising production design.
            </p>
            <div className="pt-2 flex items-center gap-6 font-sans text-xs tracking-widest text-zinc-500 uppercase">
              <div>
                <span className="text-zinc-900 font-bold block text-lg font-serif">12</span>
                <span>PRODUCTION RELICS</span>
              </div>
              <div className="w-px h-8 bg-zinc-200"></div>
              <div>
                <span className="text-zinc-900 font-bold block text-lg font-serif">6</span>
                <span>ACADEMY AWARDS</span>
              </div>
              <div className="w-px h-8 bg-zinc-200"></div>
              <div>
                <span className="text-zinc-900 font-bold block text-lg font-serif">2015</span>
                <span>WARNER BROS.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archival Video Documentation Section */}
      <div
        className={`mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-zinc-200 transform transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-6 sm:mb-8">
          <span className="font-sans text-xs text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-1.5">
            PRODUCTION FOOTAGE // STUDIO ARCHIVE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-900 tracking-tight">
            Behind the Scenes: Kinetic Relics & Fabrication
          </h3>
          <p className="font-sans text-sm sm:text-base text-zinc-600 font-light mt-2 max-w-2xl leading-relaxed">
            Archival video documentation highlighting the practical mechanical craftsmanship, kinetic steering wheel relics, and wasteland props designed by Olivier Pauwels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Video 1: DJOA3ElxKc4 */}
          <div className="flex flex-col space-y-3">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow-md border border-zinc-200/80">
              <iframe
                src="https://www.youtube-nocookie.com/embed/DJOA3ElxKc4"
                title="Olivier Pauwels Mad Max Fury Road"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg text-zinc-900 font-normal">
                Olivier Pauwels — Mad Max: Fury Road
              </h4>
              <p className="font-sans text-xs text-zinc-500 tracking-wider mt-0.5">
                STUDIO FABRICATION & PROP ASSEMBLAGE
              </p>
            </div>
          </div>

          {/* Video 2: hs8qGy0CvSw */}
          <div className="flex flex-col space-y-3">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow-md border border-zinc-200/80">
              <iframe
                src="https://www.youtube-nocookie.com/embed/hs8qGy0CvSw"
                title="Olivier Pauwels wheel Mad Max Fury Road"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg text-zinc-900 font-normal">
                Olivier Pauwels — The Steering Wheel Relic
              </h4>
              <p className="font-sans text-xs text-zinc-500 tracking-wider mt-0.5">
                KINETIC STEERING MECHANISM & DETAILS
              </p>
            </div>
          </div>
        </div>

        {/* Link to Olivier's YouTube Channel */}
        <div className="mt-8 pt-4 flex justify-center">
          <a
            href="https://www.youtube.com/@olivierpauwels784/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs text-zinc-700 hover:text-black uppercase tracking-[0.2em] bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-400 px-5 py-2.5 rounded-full transition-all"
          >
            <Youtube className="w-4 h-4 text-zinc-700" />
            <span>MORE ON YOUTUBE // @olivierpauwels784</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-50"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-6xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.src}
              alt={currentSlide.title}
              className="max-w-full max-h-[75vh] object-contain rounded shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h4 className="font-serif text-xl text-white font-normal">{currentSlide.title}</h4>
              <p className="font-sans text-sm text-zinc-400 font-light mt-1 max-w-xl">{currentSlide.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
