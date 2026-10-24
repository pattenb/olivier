import React, { useState, useEffect, useRef } from "react";
import { 
  Instagram, 
  Facebook, 
  Play, 
  Volume2, 
  VolumeX, 
  ExternalLink 
} from "lucide-react";

interface VideoState {
  src: string;
  isPlaying: boolean;
  isMuted: boolean;
  title: string;
  subtitle: string;
}

export default function StudioReels() {
  const videoPath = "/images/reels/Amare_BOHI.mp4";

  const [video1, setVideo1] = useState<VideoState>({
    src: videoPath,
    isPlaying: true,
    isMuted: true,
    title: "Amare — Studio Assembly",
    subtitle: "Olivier Pauwels (BOHI)",
  });

  const [video2, setVideo2] = useState<VideoState>({
    src: videoPath,
    isPlaying: true,
    isMuted: true,
    title: "Biomechanical Details",
    subtitle: "Ostend Studio, Belgium",
  });

  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

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

  // Toggle Play / Pause
  const togglePlay = (phoneNum: 1 | 2) => {
    if (phoneNum === 1 && video1Ref.current) {
      if (video1.isPlaying) {
        video1Ref.current.pause();
      } else {
        video1Ref.current.play().catch(() => {});
      }
      setVideo1((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    } else if (phoneNum === 2 && video2Ref.current) {
      if (video2.isPlaying) {
        video2Ref.current.pause();
      } else {
        video2Ref.current.play().catch(() => {});
      }
      setVideo2((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = (phoneNum: 1 | 2) => {
    if (phoneNum === 1 && video1Ref.current) {
      video1Ref.current.muted = !video1.isMuted;
      setVideo1((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    } else if (phoneNum === 2 && video2Ref.current) {
      video2Ref.current.muted = !video2.isMuted;
      setVideo2((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="reels" 
      className="bg-white text-zinc-900 py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-zinc-100 selection:bg-zinc-800 selection:text-white"
    >
      {/* Soft ambient background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-100/80 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section with Scroll Fly-in */}
        <div 
          className={`text-center max-w-2xl mx-auto mb-14 sm:mb-18 transform transition-all duration-900 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <span className="font-sans text-xs text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-3">
            STUDIO REELS & IN MOTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-tight tracking-tight text-zinc-900">
            Olivier Pauwels in the Studio
          </h2>
          <p className="font-sans text-base text-zinc-600 font-light mt-3 leading-relaxed">
            Watch the intricate mechanical creation process, welding, and assembly of biomechanical sculptures straight from the workbench.
          </p>
        </div>

        {/* 2 Phones Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-14 lg:gap-20 mb-16">
          
          {/* PHONE 1 — Flies in from left */}
          <div 
            className={`flex flex-col items-center transform transition-all duration-1000 ease-out delay-150 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            
            {/* Phone Frame — Sleeker, slimmer bezel */}
            <div className="relative w-[235px] sm:w-[268px] h-[470px] sm:h-[536px] bg-zinc-950 rounded-[38px] sm:rounded-[42px] p-1.5 sm:p-2 border-[2.5px] border-zinc-700/80 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.22)] ring-1 ring-black/15 group transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Dynamic Island / Sleek Pill Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 sm:w-18 h-3 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-between px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
              </div>

              {/* Screen Area (9:16 Aspect Ratio) */}
              <div className="relative w-full h-full bg-black rounded-[32px] sm:rounded-[36px] overflow-hidden">
                
                {/* Video Element */}
                <video
                  ref={video1Ref}
                  src={video1.src}
                  autoPlay
                  loop
                  muted={video1.isMuted}
                  playsInline
                  className="w-full h-full object-cover select-none cursor-pointer"
                  onClick={() => togglePlay(1)}
                />

                {/* Top-Right Mute Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute(1);
                  }}
                  className="absolute top-4 right-3.5 z-20 p-1.5 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-colors pointer-events-auto cursor-pointer border border-white/10"
                  title={video1.isMuted ? "Unmute" : "Mute"}
                >
                  {video1.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                {/* Center Play/Pause Indicator (shown when paused) */}
                {!video1.isPlaying && (
                  <button
                    onClick={() => togglePlay(1)}
                    className="absolute inset-0 m-auto w-12 h-12 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white flex items-center justify-center z-20 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </button>
                )}

                {/* Bottom Video Title Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex flex-col justify-end text-left pointer-events-none">
                  <span className="font-serif text-sm font-normal text-white drop-shadow-md">
                    {video1.title}
                  </span>
                  <span className="font-sans text-[10px] text-zinc-300 font-light mt-0.5">
                    {video1.subtitle}
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* PHONE 2 — Flies in from right */}
          <div 
            className={`flex flex-col items-center transform transition-all duration-1000 ease-out delay-250 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            
            {/* Phone Frame — Sleeker, slimmer bezel */}
            <div className="relative w-[235px] sm:w-[268px] h-[470px] sm:h-[536px] bg-zinc-950 rounded-[38px] sm:rounded-[42px] p-1.5 sm:p-2 border-[2.5px] border-zinc-700/80 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.22)] ring-1 ring-black/15 group transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Dynamic Island / Sleek Pill Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 sm:w-18 h-3 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-between px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
              </div>

              {/* Screen Area (9:16 Aspect Ratio) */}
              <div className="relative w-full h-full bg-black rounded-[32px] sm:rounded-[36px] overflow-hidden">
                
                {/* Video Element */}
                <video
                  ref={video2Ref}
                  src={video2.src}
                  autoPlay
                  loop
                  muted={video2.isMuted}
                  playsInline
                  className="w-full h-full object-cover select-none cursor-pointer"
                  onClick={() => togglePlay(2)}
                />

                {/* Top-Right Mute Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute(2);
                  }}
                  className="absolute top-4 right-3.5 z-20 p-1.5 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-colors pointer-events-auto cursor-pointer border border-white/10"
                  title={video2.isMuted ? "Unmute" : "Mute"}
                >
                  {video2.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                {/* Center Play/Pause Indicator (shown when paused) */}
                {!video2.isPlaying && (
                  <button
                    onClick={() => togglePlay(2)}
                    className="absolute inset-0 m-auto w-12 h-12 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white flex items-center justify-center z-20 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </button>
                )}

                {/* Bottom Video Title Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex flex-col justify-end text-left pointer-events-none">
                  <span className="font-serif text-sm font-normal text-white drop-shadow-md">
                    {video2.title}
                  </span>
                  <span className="font-sans text-[10px] text-zinc-300 font-light mt-0.5">
                    {video2.subtitle}
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Under the Phones: Social Section with Scroll Fly-in */}
        <div 
          className={`pt-8 sm:pt-12 border-t border-zinc-200 text-center max-w-3xl mx-auto flex flex-col items-center gap-5 transform transition-all duration-1000 ease-out delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="font-sans text-xs sm:text-sm text-zinc-500 font-semibold tracking-[0.25em] uppercase block mb-2">
              STUDIO UPDATES & WORK IN PROGRESS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-tight tracking-tight text-zinc-900">
              Follow behind the scenes on social media.
            </h3>
            <p className="font-sans text-base sm:text-[1.05rem] text-zinc-600 leading-relaxed font-light mt-3 max-w-2xl mx-auto">
              Weekly progress, sculpture reveals, and studio assembly straight from Ostend.
            </p>
          </div>

          {/* Social Media Link Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            
            {/* Instagram Link Button */}
            <a
              href="https://instagram.com/olivier.pauwels.sculptures/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-sans text-[11px] font-semibold tracking-wider uppercase hover:opacity-95 hover:scale-105 transition-all shadow-sm cursor-pointer group"
            >
              <Instagram className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>INSTAGRAM</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Facebook Link Button */}
            <a
              href="https://www.facebook.com/OLIVIERPAUWELSlBOHI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-sans text-[11px] font-semibold tracking-wider uppercase hover:scale-105 transition-all shadow-sm cursor-pointer group"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span>FACEBOOK</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
