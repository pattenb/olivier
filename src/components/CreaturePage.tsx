import React, { useState, useEffect } from "react";
import { PortfolioCreature } from "../data/portfolioData";
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Share2, 
  Check, 
  Copy, 
  Mail, 
  Maximize2, 
  X,
  Layers,
  Sparkles
} from "lucide-react";

interface CreaturePageProps {
  creature: PortfolioCreature;
  allCreatures: PortfolioCreature[];
  onBack: () => void;
  onSelectCreature: (creature: PortfolioCreature) => void;
}

export default function CreaturePage({
  creature,
  allCreatures,
  onBack,
  onSelectCreature,
}: CreaturePageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  // Reset active image index whenever creature changes
  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [creature.id]);

  // Current index in all creatures
  const currentIndex = allCreatures.findIndex((c) => c.id === creature.id);
  const prevCreature = currentIndex > 0 ? allCreatures[currentIndex - 1] : allCreatures[allCreatures.length - 1];
  const nextCreature = currentIndex < allCreatures.length - 1 ? allCreatures[currentIndex + 1] : allCreatures[0];

  const currentImage = creature.images[activeImageIndex] || creature.full || creature.thumb;
  
  // URL pointing directly to /name-of-the-sculpture
  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/${creature.slug}` 
    : "";
  const shareTitle = `${creature.title} (${creature.year}) by Olivier Pauwels (BOHI)`;
  const shareText = `Explore '${creature.title}' by sculptor Olivier Pauwels — monumental biomechanical assemblage art from Ostend, Belgium.`;

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % creature.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + creature.images.length) % creature.images.length);
  };

  const isSold = creature.status.toLowerCase().includes("sold") || creature.status.toLowerCase().includes("acquired");

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-800 selection:text-white pt-20">
      
      {/* Top Floating Sticky Header / Breadcrumb Bar */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between border-b border-zinc-100 bg-white/95 backdrop-blur-md sticky top-16 z-30">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer group py-1"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO PORTFOLIO</span>
        </button>

        {/* Sculpture Title & Quick Switcher */}
        <div className="flex items-center gap-4 sm:gap-6 font-sans text-xs text-zinc-500">
          <span className="hidden md:inline font-serif text-base text-zinc-900 italic font-normal">
            {creature.title} ({creature.year})
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCreature(prevCreature)}
              className="p-1.5 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors cursor-pointer flex items-center gap-1"
              title={`Previous: ${prevCreature.title}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] tracking-wider uppercase">PREV</span>
            </button>
            <span className="text-zinc-300">/</span>
            <button
              onClick={() => onSelectCreature(nextCreature)}
              className="p-1.5 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors cursor-pointer flex items-center gap-1"
              title={`Next: ${nextCreature.title}`}
            >
              <span className="hidden sm:inline text-[11px] tracking-wider uppercase">NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FULL-PAGE HERO PICTURE STAGE */}
      <section className="relative w-full min-h-[82vh] lg:min-h-[90vh] bg-zinc-950 flex items-center justify-center overflow-hidden px-4 sm:px-8 py-8 select-none">
        
        {/* Full Viewport Picture */}
        <div className="relative w-full h-full max-w-[1700px] flex items-center justify-center">
          <img
            key={currentImage}
            src={currentImage}
            alt={`${creature.title} - Full Picture`}
            className="max-h-[78vh] lg:max-h-[86vh] w-auto max-w-full object-contain select-none drop-shadow-2xl transition-all duration-700 ease-out"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Floating Controls & Details on the Full Picture */}
        <div className="absolute top-6 left-6 font-sans text-xs text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 z-10">
          <span className="font-semibold text-white">{activeImageIndex + 1} / {creature.images.length}</span>
          <span className="text-white/30">·</span>
          <span className="uppercase tracking-widest text-[11px]">{creature.category}</span>
        </div>

        {/* Fullscreen Lightbox Button */}
        <button
          onClick={() => {
            setLightboxImageIndex(activeImageIndex);
            setIsLightboxOpen(true);
          }}
          className="absolute top-6 right-6 p-2.5 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full border border-white/10 transition-colors cursor-pointer z-10"
          title="Open in fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Previous / Next Arrows on Full-Page Picture (if multiple pictures) */}
        {creature.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/10 transition-all cursor-pointer z-10"
              aria-label="Previous view"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/10 transition-all cursor-pointer z-10"
              aria-label="Next view"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Floating Thumbnail Strip at bottom of Full-Page Stage */}
        {creature.images.length > 1 && (
          <div className="absolute bottom-6 inset-x-0 flex justify-center z-10 px-4">
            <div className="flex items-center gap-2 max-w-full overflow-x-auto py-1 px-2 bg-black/70 backdrop-blur-md rounded-full border border-white/10 no-scrollbar">
              {creature.images.map((img, idx) => (
                <button
                  key={img + idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden transition-all duration-300 cursor-pointer border-2 ${
                    idx === activeImageIndex
                      ? "border-white scale-110 opacity-100 shadow-lg ring-2 ring-white/50"
                      : "border-transparent opacity-50 hover:opacity-90"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* DIRECTLY UNDER BIG PICTURES: MODERN COMPACT SHARE BAR */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-zinc-600">
          
          {/* Social Share Icons */}
          <div className="flex items-center gap-2.5">
            <span className="font-sans text-[10px] tracking-[0.2em] text-zinc-400 uppercase flex items-center gap-1.5 flex-shrink-0 mr-1">
              <Share2 className="w-3.5 h-3.5 text-zinc-500" />
              SHARE
            </span>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Facebook"
              className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-600 flex items-center justify-center transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>

            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on X (Twitter)"
              className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-600 flex items-center justify-center transition-all cursor-pointer"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on WhatsApp"
              className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-600 flex items-center justify-center transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </a>

            {/* Pinterest */}
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.origin + currentImage : currentImage
              )}&description=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Pinterest"
              className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-600 flex items-center justify-center transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
          </div>

          {/* Minimalist Copy Direct Link Pill with /{creature.slug} */}
          <button
            onClick={copyToClipboard}
            title="Click to copy direct URL"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans text-[11px] transition-all cursor-pointer border shadow-xs ${
              copied
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>COPIED /{creature.slug}</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-zinc-400" />
                <span className="text-zinc-600 font-medium">/{creature.slug}</span>
              </>
            )}
          </button>

        </div>
      </div>

      {/* EDITORIAL DOSSIER, SPECIFICATIONS & INQUIRIES */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Main Description & Narrative (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <span className="font-sans text-xs sm:text-sm text-zinc-500 font-semibold tracking-[0.25em] uppercase">
                  CATALOGUE RAISONNÉ // {creature.year}
                </span>
                <span
                  className={`font-sans text-[9px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                    isSold
                      ? "bg-zinc-100 text-zinc-600 border border-zinc-200"
                      : "bg-zinc-900 text-white border border-zinc-900"
                  }`}
                >
                  {isSold ? "Acquired / In Collection" : "Available for Acquisition"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl text-zinc-900 font-normal tracking-tight leading-tight">
                {creature.title}
              </h1>
              <p className="font-sans text-xs text-zinc-500 tracking-wider uppercase mt-1">
                {creature.category}
              </p>
            </div>

            {/* Curatorial Story */}
            <div className="space-y-4 text-zinc-700 font-sans text-base sm:text-lg leading-relaxed font-light border-t border-b border-zinc-200 py-6">
              <p>{creature.description}</p>
            </div>

            {/* Provenance and Workshop location (Ostend) */}
            <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-5 font-sans text-xs text-zinc-600 space-y-1.5">
              <div className="text-zinc-900 font-semibold uppercase tracking-wider">
                STUDIO PROVENANCE
              </div>
              <p className="font-sans text-sm text-zinc-600 font-light">
                Sculpture handcrafted by Olivier Pauwels in his Ostend studio atelier. Constructed using original historical scrap metals, vintage flight relics, and decontextualized industrial mechanisms.
              </p>
              <div className="text-[11px] text-zinc-400 pt-1">
                Ostend, Belgium · Representation by The Boutique Gallery
              </div>
            </div>
          </div>

          {/* Specifications, Sharing Links & Inquiry (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Technical Specifications */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 space-y-4 font-sans text-xs text-zinc-600">
              <span className="font-sans text-xs font-semibold tracking-[0.2em] text-zinc-900 uppercase block border-b border-zinc-200 pb-2">
                TECHNICAL SPECIFICATIONS
              </span>

              {creature.dimensions && (
                <div className="flex justify-between border-b border-zinc-100 pb-2">
                  <span className="text-zinc-400 uppercase tracking-widest">Dimensions:</span>
                  <span className="text-zinc-900 font-medium">{creature.dimensions}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-zinc-100 pb-2">
                <span className="text-zinc-400 uppercase tracking-widest">Year:</span>
                <span className="text-zinc-900 font-medium">{creature.year}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-2">
                <span className="text-zinc-400 uppercase tracking-widest">Artist:</span>
                <span className="text-zinc-900 font-medium">Olivier Pauwels (BOHI)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-2">
                <span className="text-zinc-400 uppercase tracking-widest">Origin:</span>
                <span className="text-zinc-900 font-medium">Ostend, Belgium</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-2">
                <span className="text-zinc-400 uppercase tracking-widest">Representation:</span>
                <span className="text-zinc-900 font-medium">The Boutique Gallery</span>
              </div>

              {creature.materials && creature.materials.length > 0 && (
                <div className="pt-2">
                  <span className="text-zinc-400 uppercase tracking-widest block mb-2">
                    Salvaged Materials & Elements:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {creature.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="bg-white border border-zinc-200 text-zinc-700 px-2.5 py-1 rounded text-[11px] font-sans"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Inquire CTA */}
            <div>
              <a
                href={`mailto:Info@OlivierPauwels.com?subject=Inquiry: ${encodeURIComponent(
                  `${creature.title} (${creature.year})`
                )}&body=Hello Olivier,%0D%0A%0D%0AI would like to inquire regarding ${encodeURIComponent(
                  creature.title
                )} (${creature.year}).%0D%0A%0D%0A`}
                className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-sans text-xs tracking-[0.2em] uppercase py-3.5 px-6 rounded transition-colors shadow-sm cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{isSold ? "INQUIRE ABOUT SIMILAR CREATIONS" : "INQUIRE ABOUT THIS CREATURE"}</span>
              </a>
              <p className="mt-2 font-sans text-[11px] text-zinc-400 text-center">
                Direct inquiry to Olivier Pauwels studio (Ostend) & The Boutique Gallery
              </p>
            </div>

          </div>

        </div>

        {/* FULL-PAGE PLATES GALLERY: Show all views in monumental full-width plates if multiple exist */}
        {creature.images.length > 1 && (
          <div className="mt-20 pt-16 border-t border-zinc-200 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-sans text-xs text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-2">
                FULL-PAGE PLATES GALLERY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-900">
                Angles, Profiles & Close-Up Relics
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-600 font-light mt-2">
                High-resolution full-page plates documenting every angle and mechanical detail of {creature.title}.
              </p>
            </div>

            <div className="space-y-10">
              {creature.images.map((img, idx) => (
                <div
                  key={img + "-plate-" + idx}
                  className="bg-zinc-950 rounded-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-4 sm:p-8 relative group"
                >
                  <img
                    src={img}
                    alt={`${creature.title} - Plate ${idx + 1}`}
                    className="max-h-[82vh] w-auto max-w-full object-contain select-none transition-transform duration-700 group-hover:scale-[1.01]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="w-full flex items-center justify-between text-white/70 font-sans text-xs pt-4 border-t border-white/10 mt-4">
                    <span className="tracking-widest uppercase">
                      PLATE {idx + 1} OF {creature.images.length} // {creature.title}
                    </span>
                    <button
                      onClick={() => {
                        setLightboxImageIndex(idx);
                        setIsLightboxOpen(true);
                      }}
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>FULLSCREEN</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation to other sculptures */}
        <div className="mt-20 pt-12 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-2 px-4 border border-zinc-200 rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PORTFOLIO ARCHIVE</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectCreature(prevCreature)}
              className="font-sans text-xs tracking-wider uppercase text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREV: {prevCreature.title}</span>
            </button>
            <span className="text-zinc-300">·</span>
            <button
              onClick={() => onSelectCreature(nextCreature)}
              className="font-sans text-xs tracking-wider uppercase text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>NEXT: {nextCreature.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-50"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          {creature.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex((prev) => (prev - 1 + creature.images.length) % creature.images.length);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex((prev) => (prev + 1) % creature.images.length);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="max-w-7xl max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={creature.images[lightboxImageIndex] || currentImage}
              alt={creature.title}
              className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
            />
            <div className="mt-4 text-center font-sans text-xs text-white/70 tracking-wider">
              <span>{creature.title} ({creature.year})</span>
              <span className="mx-2">·</span>
              <span>PLATE {lightboxImageIndex + 1} OF {creature.images.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
