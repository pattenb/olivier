import React, { useState, useEffect, useRef } from "react";
import { BOOKS } from "../data";
import { X, BookOpen, ArrowRight, ExternalLink } from "lucide-react";

interface BookDetail {
  id: string;
  title: string;
  year: string;
  status: string;
  image: string;
  pages?: string;
  format?: string;
  description: string;
}

const BOOK_DETAILS: Record<string, { pages: string; format: string; description: string }> = {
  b1: {
    pages: "96 Pages",
    format: "Hardcover, Full Color Retrospective",
    description:
      "The seminal first monograph introducing Olivier Pauwels' early biomechanical sculptures, anatomical sketches, and scrap-metal assemblage methodology.",
  },
  b2: {
    pages: "160 Pages",
    format: "Collector's Exhibition Catalog",
    description:
      "Official catalog from the international museum exhibition tour, exploring digital-mechanical symbiosis, futuristic anatomy, and cybernetic evolution.",
  },
  b3: {
    pages: "128 Pages",
    format: "Hardcover, Limited Edition",
    description:
      "Focusing on Pauwels' acclaimed Cyber-Baby sculpture series, including full-page plate photography, fabrication logs, and philosophical commentary.",
  },
  b4: {
    pages: "144 Pages",
    format: "Hardcover, Archival Edition",
    description:
      "The definitive second volume capturing the expanded universe of Cyber-Baby sculptures, scale models, and behind-the-scenes studio sketches.",
  },
};

export default function Books() {
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0] | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Keyboard navigation for popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedBook(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-zinc-900 pt-10 sm:pt-14 pb-14 sm:pb-18 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto overflow-hidden"
      id="books-root"
    >
      {/* Section Header: Matching About Olivier style */}
      <div
        className={`mb-8 sm:mb-10 transform transition-all duration-900 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <span className="font-sans text-xs sm:text-sm text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-2">
          PUBLICATIONS & MONOGRAPHS
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-tight tracking-tight text-zinc-900">
          Printed retrospective volumes & signed art books.
        </h2>
        <p className="font-sans text-base sm:text-[1.05rem] text-zinc-600 leading-relaxed font-light mt-3 max-w-3xl">
          Comprehensive documentation of Olivier Pauwels' biomechanical universe, featuring exclusive studio photography, engineering sketches, and signed collector monographs.
        </p>
      </div>

      {/* COMPACT BOOKS DISPLAY: Smaller, refined gallery presentation */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto transform transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {BOOKS.map((book, idx) => {
          const isSoldOut = book.status.toLowerCase().includes("sold");
          return (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className={`group cursor-pointer flex flex-col items-center text-center transform transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Compact Book Cover Card with subtle shadow and lift on hover */}
              <div className="relative aspect-[3/4] w-full max-w-[160px] sm:max-w-[190px] bg-zinc-50 rounded-md p-2 border border-zinc-200 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-contain drop-shadow transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Status Pill */}
                <div
                  className={`absolute top-2.5 right-2.5 font-sans text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider backdrop-blur-sm ${
                    isSoldOut
                      ? "bg-zinc-900/80 text-zinc-300"
                      : "bg-white/90 text-zinc-900 border border-zinc-200 shadow-xs"
                  }`}
                >
                  {book.status}
                </div>

                {/* Subtle Hover Overlay with BookOpen icon */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white bg-black/75 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>VIEW</span>
                  </span>
                </div>
              </div>

              {/* Minimalist Editorial Title & Year */}
              <div className="mt-3 w-full px-1">
                <h3 className="font-serif text-sm sm:text-base font-normal text-zinc-900 group-hover:text-zinc-600 transition-colors leading-snug line-clamp-1">
                  {book.title}
                </h3>
                <p className="font-sans text-[11px] text-zinc-400 tracking-wider mt-0.5">
                  {book.year}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDITORIAL POPUP MODAL ON CLICK */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-2xl relative border border-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 z-20 p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close book details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-5 p-6 sm:p-8 gap-6 sm:gap-8 items-center">
              {/* Book Cover Presentation */}
              <div className="sm:col-span-2 flex items-center justify-center bg-zinc-50 p-4 rounded-md border border-zinc-100">
                <img
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  className="max-h-64 sm:max-h-72 w-auto object-contain drop-shadow-xl"
                />
              </div>

              {/* Book Information */}
              <div className="sm:col-span-3 space-y-4">
                <div>
                  <span className="font-sans text-xs text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-1">
                    MONOGRAPH // {selectedBook.year}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-zinc-900 font-normal leading-tight">
                    {selectedBook.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`font-sans text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                        selectedBook.status.toLowerCase().includes("sold")
                          ? "bg-zinc-200 text-zinc-700"
                          : "bg-zinc-100 text-zinc-900 border border-zinc-200"
                      }`}
                    >
                      {selectedBook.status}
                    </span>
                    {BOOK_DETAILS[selectedBook.id]?.pages && (
                      <span className="font-sans text-xs text-zinc-400">
                        · {BOOK_DETAILS[selectedBook.id].pages}
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
                  {BOOK_DETAILS[selectedBook.id]?.description}
                </p>

                {BOOK_DETAILS[selectedBook.id]?.format && (
                  <p className="font-sans text-xs text-zinc-400 tracking-wider">
                    FORMAT: {BOOK_DETAILS[selectedBook.id].format}
                  </p>
                )}

                {/* Inquiry CTA */}
                <div className="pt-2">
                  {!selectedBook.status.toLowerCase().includes("sold") ? (
                    <a
                      href={`mailto:Info@OlivierPauwels.com?subject=Book Inquiry: ${encodeURIComponent(
                        selectedBook.title
                      )}`}
                      className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-sans text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded transition-colors cursor-pointer shadow-sm"
                    >
                      <span>INQUIRE / ACQUIRE COPY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-block font-sans text-xs text-zinc-400 uppercase tracking-widest">
                      ARCHIVE REFERENCE // SOLD OUT
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
