import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAssetUrl } from "../utils/asset";

interface SlideData {
  id: string;
  image: string;
  alt: string;
  objectPosition: string;
  objectPositionMobile?: string;
  transformOrigin: string;
  transformOriginMobile?: string;
  title: string;
  description: string;
  cta: string;
}

const slides: SlideData[] = [
  {
    id: "sculptor",
    image: getAssetUrl("/images/hero/OlivierPauwels013.webp"),
    alt: "Olivier Pauwels with Biomechanical Sculpture",
    objectPosition: "35% 15%",
    objectPositionMobile: "35% 15%",
    transformOrigin: "35% 18%",
    transformOriginMobile: "35% 18%",
    title: "Where the life of an object stops…",
    description: "…the dream world of the artist begins. Handcrafted steampunk and biomechanical sculptures forged from recycled industrial components.",
    cta: "EXPLORE THE COLLECTION",
  },
  {
    id: "disney",
    image: getAssetUrl("/images/hero/OlivierDisney.webp"),
    alt: "Olivier Pauwels Welcome to Disneyland",
    objectPosition: "82% center",
    objectPositionMobile: "82% 35%",
    transformOrigin: "82% 35%",
    transformOriginMobile: "82% 35%",
    title: "Olivier Pauwels Welcome to Disneyland",
    description: "A monumental artistic encounter between recycled industrial fantasy and the magical realm of Disneyland.",
    cta: "EXPLORE THE COLLECTION",
  },
  {
    id: "gt1900",
    image: getAssetUrl("/images/hero/headerbg1c.webp"),
    alt: "Olivier Pauwels GT 1900 Sculpture",
    objectPosition: "center 40%",
    objectPositionMobile: "50% 40%",
    transformOrigin: "50% 45%",
    transformOriginMobile: "50% 40%",
    title: "GT 1900",
    description: "A visionary mechanical masterpiece engineered from recycled parts, salvaged aircraft dials, and repurposed industrial machinery.",
    cta: "EXPLORE THE COLLECTION",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 7500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const handleExploreClick = () => {
    const portfolioElem = document.getElementById("portfolio");
    if (portfolioElem) {
      portfolioElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-black select-none" 
      id="hero-root"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Ken Burns Zoom Effect and Smooth Crossfade */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const currentPos = isMobile ? (slide.objectPositionMobile || slide.objectPosition) : slide.objectPosition;
        const currentOrigin = isMobile ? (slide.transformOriginMobile || slide.transformOrigin) : slide.transformOrigin;

        return (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <img 
              src={slide.image}
              alt={slide.alt} 
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none animate-hero-zoom"
              style={{
                objectPosition: currentPos,
                transformOrigin: currentOrigin,
              }}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      })}

      {/* Subtle atmospheric vignette gradient scrims for contrast without darkening the subject */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/65 pointer-events-none z-[1]" />

      {/* Bottom Left Content: Text on the left side */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-8 sm:pb-10 lg:pb-12 max-w-lg md:max-w-xl mt-auto">
        <div key={slides[currentSlide].id} className="animate-in fade-in slide-in-from-left-6 duration-700 ease-out">
          <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[2rem] text-white font-normal leading-snug tracking-tight drop-shadow-md">
            {slides[currentSlide].title}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed font-light mt-2 max-w-md drop-shadow">
            {slides[currentSlide].description}
          </p>

          <div className="mt-5 flex items-center gap-4">
            <button
              onClick={handleExploreClick}
              className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-white hover:text-white/70 transition-colors duration-300 flex items-center gap-2 group cursor-pointer drop-shadow py-2"
            >
              <span>{slides[currentSlide].cta}</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Bar: Progress Indicator & Slide Nav Buttons */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-6 pt-2 flex items-center justify-between border-t border-white/10">
        {/* Slide Counter and Progress Indicators */}
        <div className="flex items-center gap-4">
          <span className="font-sans text-xs text-white/60">
            0{currentSlide + 1} / 0{slides.length}
          </span>
          <div className="flex items-center gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 transition-all duration-500 rounded-full cursor-pointer ${
                  idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Previous / Next Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 border border-white/15 rounded-full transition-colors cursor-pointer backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 border border-white/15 rounded-full transition-colors cursor-pointer backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
