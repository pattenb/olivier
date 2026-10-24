import React, { useState, useEffect, useRef } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Gallery from "./components/Gallery";
import CreaturePage from "./components/CreaturePage";
import Exhibitions from "./components/Exhibitions";
import StudioReels from "./components/StudioReels";
import Biography from "./components/Biography";
import MadMax from "./components/MadMax";
import Books from "./components/Books";
import { PORTFOLIO_CREATURES, PortfolioCreature } from "./data/portfolioData";
import { Mail, Instagram, Facebook, Youtube, ArrowUp, Send, CheckCircle2, ChevronRight, MessageSquareCode, ZoomIn, X } from "lucide-react";
import { getAssetUrl, getBaseUrl } from "./utils/asset";

export default function App() {
  const [selectedCreature, setSelectedCreature] = useState<PortfolioCreature | null>(null);
  const [isPortraitZoomed, setIsPortraitZoomed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isBannerInView, setIsBannerInView] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBannerInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Show "Back to top" button once the user scrolls past the hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("home");
      const triggerPoint = heroElement 
        ? heroElement.offsetTop + heroElement.offsetHeight - 120 
        : 400;
      setShowBackToTop(window.scrollY > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedCreature]);

  // Sync with URL pathname e.g. /name-of-the-sculpture or hash fallback (subpath aware)
  useEffect(() => {
    const parseRoute = () => {
      const baseClean = (getBaseUrl() || "/").replace(/^\/+|\/+$/g, "");
      let path = window.location.pathname.replace(/^\/+|\/+$/g, "");
      if (baseClean && path.startsWith(baseClean)) {
        path = path.slice(baseClean.length).replace(/^\/+|\/+$/g, "");
      }
      const hash = window.location.hash.replace("#", "");

      // Check pathname first (e.g. /mickeys or /porsche-felca-gt)
      if (path && path !== "index.html") {
        const found = PORTFOLIO_CREATURES.find(
          (c) =>
            c.slug === path ||
            c.slug === path.toLowerCase() ||
            c.id === path ||
            c.id === path.replace("creature-", "")
        );
        if (found) {
          setSelectedCreature(found);
          return;
        }
      }

      // Check hash fallback (e.g. #mickeys or #creature-28)
      if (hash) {
        const cleanHash = hash.replace(/^creature-/, "");
        const found = PORTFOLIO_CREATURES.find(
          (c) => c.slug === hash || c.slug === cleanHash || c.id === cleanHash
        );
        if (found) {
          setSelectedCreature(found);
          return;
        }
      }

      setSelectedCreature(null);
    };

    parseRoute();
    window.addEventListener("popstate", parseRoute);
    window.addEventListener("hashchange", parseRoute);
    return () => {
      window.removeEventListener("popstate", parseRoute);
      window.removeEventListener("hashchange", parseRoute);
    };
  }, []);

  const handleSelectCreature = (creature: PortfolioCreature) => {
    setSelectedCreature(creature);
    const baseUrl = getBaseUrl();
    const prefix = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    window.history.pushState({ creatureSlug: creature.slug }, "", `${prefix}#${creature.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromCreature = () => {
    setSelectedCreature(null);
    const baseUrl = getBaseUrl();
    window.history.pushState({}, "", `${baseUrl}#portfolio`);
    setTimeout(() => {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const handleNavigate = (id: string) => {
    if (selectedCreature) {
      setSelectedCreature(null);
      const baseUrl = getBaseUrl();
      window.history.pushState({}, "", `${baseUrl}#${id}`);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen text-zinc-900 font-sans flex flex-col justify-between selection:bg-zinc-800 selection:text-white">
      
      {/* Main Navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Primary Content View */}
      <main className="flex-grow">
        {selectedCreature ? (
          <div id="creature-view">
            <CreaturePage
              creature={selectedCreature}
              allCreatures={PORTFOLIO_CREATURES}
              onBack={handleBackFromCreature}
              onSelectCreature={handleSelectCreature}
            />
          </div>
        ) : (
          <>
            <div id="home">
              <HeroSection />
            </div>
            
            <div id="about">
              <Biography />
            </div>

            <div id="portfolio">
              <Gallery onSelectCreature={handleSelectCreature} />
            </div>
            
            <div id="madmax">
              <MadMax />
            </div>

            <div id="books">
              <Books />
            </div>

            <div id="exhibitions">
              <Exhibitions />
            </div>

            <div id="reels">
              <StudioReels />
            </div>

            {/* HERO-STYLE PICTURE BANNER JUST ABOVE FOOTER */}
            <div 
              id="biography-images" 
              ref={bannerRef}
              className="w-full bg-white overflow-hidden"
            >
              <div className="relative w-full overflow-hidden bg-white">
                <img 
                  src={getAssetUrl("/images/olivier-pauwels-portrait.webp")} 
                  alt="Olivier Pauwels (BOHI)" 
                  className={`w-full h-auto object-cover object-[82%_center] block transition-all duration-1000 ease-out will-change-transform ${
                    isBannerInView 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 translate-x-20 sm:translate-x-32"
                  }`}
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Desktop & Tablet Overlay: BOHI Logo, Boutique Gallery Logo & Contact, with Studio Inquiries under it */}
                <div className={`hidden sm:flex absolute left-12 md:left-20 lg:left-32 top-[54%] md:top-[55%] -translate-y-1/2 w-48 md:w-64 lg:w-80 xl:w-96 max-w-[36%] flex-col items-center text-center gap-4 md:gap-5 z-10 transition-all duration-1000 ease-out delay-200 ${
                  isBannerInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}>
                  
                  {/* Black BOHI Logo */}
                  <div className="w-full pointer-events-none select-none">
                    <img 
                      src={getAssetUrl("/img/logos/bohiwit.png")} 
                      alt="BOHI Logo" 
                      className="w-full h-auto object-contain filter brightness-0 opacity-95 mx-auto"
                    />
                  </div>

                  {/* The Boutique Gallery Logo & Centered Contact Info */}
                  <div className="w-full flex flex-col items-center text-center space-y-1">
                    <a 
                      href="https://theboutiquegallery.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full block hover:opacity-85 transition-opacity"
                      title="The Boutique Gallery"
                    >
                      <img 
                        src={getAssetUrl("/img/logos/theboutiquegallerylogo.webp")} 
                        alt="The Boutique Gallery Logo" 
                        className="w-[92%] h-auto object-contain block mix-blend-multiply mx-auto"
                      />
                    </a>
                    <a 
                      href="mailto:latem@theboutiquegallery.be" 
                      className="font-serif text-sm md:text-base text-black hover:text-zinc-700 transition-colors block font-medium leading-tight"
                    >
                      latem@theboutiquegallery.be
                    </a>
                    <a 
                      href="tel:+32470030502" 
                      className="font-sans text-[11px] text-black/80 hover:text-black transition-colors block font-normal tracking-wide leading-tight"
                    >
                      +32 470030502 · Sint-Martens-Latem, Belgium
                    </a>
                  </div>

                  {/* Studio Inquiries moved under latem@theboutiquegallery with generous whitespace */}
                  <div className="w-full flex flex-col items-center text-center space-y-1 pt-6 md:pt-8 border-t border-black/10 text-black">
                    <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-black uppercase block">
                      STUDIO INQUIRIES
                    </span>
                    <a 
                      href="mailto:Info@OlivierPauwels.com" 
                      className="font-serif text-[16px] leading-[20px] text-black hover:text-zinc-700 transition-colors block font-medium"
                    >
                      Info@OlivierPauwels.com
                    </a>
                    <p className="font-sans text-xs text-black/80 font-normal tracking-wide leading-tight">
                      Ostend, Belgium · GCV. 0664.601.636
                    </p>
                  </div>

                </div>

                {/* Desktop & Tablet Overlay: Bottom-Left Copyright & Created by StudioPB */}
                <div className="hidden sm:block absolute bottom-6 left-12 md:left-20 lg:left-32 z-10 text-black/75 font-sans text-[9px] italic leading-[11.5px] tracking-wider">
                  © {new Date().getFullYear()} — OLIVIER PAUWELS (BOHI) · Created by{' '}
                  <a 
                    href="https://studiopb.be" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-black hover:underline"
                  >
                    StudioPB
                  </a>
                </div>

                {/* Desktop & Tablet Overlay: Bottom-Right FOLLOW & Photo Credit */}
                <div className="hidden sm:flex absolute bottom-6 right-8 md:right-14 lg:right-24 flex-col items-end space-y-2 z-10">

                  <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-black uppercase block">
                    FOLLOW
                  </span>
                  <div className="flex items-center gap-2">
                      <a 
                        href="https://www.facebook.com/OLIVIERPAUWELSlBOHI" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Facebook"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-xs"
                      >
                        <Facebook className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                      <a 
                        href="https://instagram.com/olivier.pauwels.sculptures/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Instagram"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-xs"
                      >
                        <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                      <a 
                        href="https://www.youtube.com/@olivierpauwels784/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="YouTube"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-xs"
                      >
                        <Youtube className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                  </div>
                  <span className="font-serif italic text-[10px] text-zinc-500 tracking-wider block select-none pointer-events-none pt-0.5">
                    Picture by Nick Decombel
                  </span>
                </div>
              </div>

              {/* Mobile View: Everything cleanly placed underneath the picture on clean white */}
              <div className="block sm:hidden bg-white px-6 pt-8 pb-12 text-center text-black">
                <div className="max-w-md mx-auto flex flex-col items-center gap-6">
                  
                  {/* BOHI Logo */}
                  <div className="w-44 max-w-[70%] select-none">
                    <img 
                      src={getAssetUrl("/img/logos/bohiwit.png")} 
                      alt="BOHI Logo" 
                      className="w-full h-auto object-contain filter brightness-0 opacity-95 mx-auto"
                    />
                  </div>

                  {/* The Boutique Gallery Logo & Contact */}
                  <div className="w-full flex flex-col items-center space-y-1.5">
                    <a 
                      href="https://theboutiquegallery.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-40 max-w-[65%] block hover:opacity-85 transition-opacity mb-1"
                      title="The Boutique Gallery"
                    >
                      <img 
                        src={getAssetUrl("/img/logos/theboutiquegallerylogo.webp")} 
                        alt="The Boutique Gallery Logo" 
                        className="w-full h-auto object-contain block mix-blend-multiply mx-auto"
                      />
                    </a>
                    <a 
                      href="mailto:latem@theboutiquegallery.be" 
                      className="font-serif text-sm text-black hover:text-zinc-700 transition-colors block font-medium"
                    >
                      latem@theboutiquegallery.be
                    </a>
                    <a 
                      href="tel:+32470030502" 
                      className="font-sans text-xs text-black/80 hover:text-black transition-colors block font-normal tracking-wide"
                    >
                      +32 470030502 · Sint-Martens-Latem, Belgium
                    </a>
                  </div>

                  {/* Studio Inquiries under Boutique Gallery with generous whitespace */}
                  <div className="w-full flex flex-col items-center space-y-1.5 pt-6 border-t border-black/10">
                    <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-black uppercase block">
                      STUDIO INQUIRIES
                    </span>
                    <a 
                      href="mailto:Info@OlivierPauwels.com" 
                      className="font-serif text-base text-black hover:text-zinc-700 transition-colors block font-medium"
                    >
                      Info@OlivierPauwels.com
                    </a>
                    <p className="font-sans text-xs text-black/80 font-normal tracking-wide">
                      Ostend, Belgium · GCV. 0664.601.636
                    </p>
                    <p className="font-sans text-[9px] italic leading-[11.5px] text-black/75 tracking-wider pt-1">
                      © {new Date().getFullYear()} — OLIVIER PAUWELS (BOHI) · Created by{' '}
                      <a 
                        href="https://studiopb.be" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-medium text-black hover:underline"
                      >
                        StudioPB
                      </a>
                    </p>
                  </div>

                  {/* Follow Social Icons & Photo Credit */}
                  <div className="w-full flex flex-col items-center space-y-3 pt-6 border-t border-black/10">
                    <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-black uppercase block">
                      FOLLOW
                    </span>
                    <div className="flex items-center gap-3">
                      <a 
                        href="https://www.facebook.com/OLIVIERPAUWELSlBOHI" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Facebook"
                        className="w-9 h-9 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-xs"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://instagram.com/olivier.pauwels.sculptures/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Instagram"
                        className="w-9 h-9 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-xs"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://www.youtube.com/@olivierpauwels784/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="YouTube"
                        className="w-9 h-9 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-xs"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                    </div>
                    <span className="font-serif italic text-[10px] text-zinc-500 tracking-wider block select-none pointer-events-none pt-1">
                      Picture by Nick Decombel
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}
      </main>



      {/* Floating Back to Top Button: Positioned higher to avoid blocking social follow icons */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        id="floating-back-to-top"
        className={`fixed bottom-24 right-6 sm:bottom-28 sm:right-8 lg:bottom-32 lg:right-10 z-40 bg-black/90 hover:bg-black text-white px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full border border-zinc-700/70 shadow-2xl backdrop-blur-md flex items-center gap-2 transition-all duration-300 group cursor-pointer ${
          showBackToTop 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <span className="font-sans text-[10px] sm:text-[11px] font-medium tracking-widest uppercase hidden xs:inline sm:inline">
          BACK TO TOP
        </span>
        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-zinc-300 group-hover:text-white" />
      </button>
    </div>
  );
}
