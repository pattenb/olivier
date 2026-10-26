import React from "react";
import { ArrowLeft, Home, Compass } from "lucide-react";

interface NotFoundProps {
  onGoHome: () => void;
}

export default function NotFound({ onGoHome }: NotFoundProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center select-auto">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 mb-2">
          <Compass className="w-8 h-8 animate-pulse text-zinc-700" />
        </div>

        <span className="font-sans text-xs tracking-[0.25em] text-zinc-500 font-semibold uppercase block">
          Error 404 — Artifact Not Found
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-zinc-900 font-normal tracking-tight">
          Lost in the Mechanical Labyrinth
        </h1>

        <p className="font-sans text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
          The sculpture or page you are searching for does not exist or may have been relocated within the studio archives.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Gallery</span>
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
