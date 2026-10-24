import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { getAssetUrl } from "../utils/asset";

interface NavigationProps {
  onNavigate?: (id: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "portfolio", label: "PORTFOLIO" },
    { id: "madmax", label: "MAD MAX" },
    { id: "books", label: "BOOKS" },
    { id: "exhibitions", label: "EXHIBITIONS" },
    { id: "reels", label: "REELS" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#3d4047]/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/20" 
          : "bg-gradient-to-b from-[#2d2f35]/70 via-[#2d2f35]/25 to-transparent py-5"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Left: Logo matching public/img/logos/bohiwit.png */}
        <div className="flex items-center gap-10">
          <div 
            onClick={() => handleNavClick("home")} 
            className="flex items-center cursor-pointer group"
            id="nav-brand"
          >
            <img 
              src={getAssetUrl("/img/logos/bohiwit.png")} 
              alt="Olivier Pauwels" 
              className="h-8 sm:h-9 md:h-10 w-auto object-contain opacity-100 group-hover:opacity-85 transition-opacity drop-shadow-md"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="py-1 text-xs font-sans tracking-[0.2em] uppercase transition-colors cursor-pointer text-white/90 hover:text-white drop-shadow-sm"
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Studio info & direct inquire link */}
        <div className="hidden md:flex items-center gap-6 text-[11px] font-sans tracking-[0.2em] text-white/80 uppercase">
          <button
            onClick={() => {
              document.getElementById('footer-site')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer drop-shadow-sm"
          >
            INQUIRE
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white bg-black/40 backdrop-blur-sm border border-white/20 rounded cursor-pointer"
            aria-label="Toggle menu"
            id="mobile-nav-toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#3d4047]/95 backdrop-blur-xl border-t border-white/10 z-40 transition-all duration-300">
          <nav className="flex flex-col justify-center h-full p-8 space-y-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left border-b border-white/10 pb-3 cursor-pointer text-zinc-100 hover:text-white"
                id={`mobile-nav-item-${item.id}`}
              >
                <span className="font-display text-xl font-bold tracking-wider">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
