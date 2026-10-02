'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function IntroVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Check if they already saw it this session
    const hasSeen = sessionStorage.getItem('offclass-intro-seen');
    if (hasSeen) {
      setIsVisible(false);
      return;
    }

    // Advanced Timeline
    const timers = [
      setTimeout(() => setPhase(1), 500),   // 0.5s: Start typography
      setTimeout(() => setPhase(2), 2500),  // 2.5s: Reveal neon geometry
      setTimeout(() => setPhase(3), 5000),  // 5.0s: Reveal the OG background image zooming out
      setTimeout(() => setPhase(4), 8500),  // 8.5s: Flash and show "Click to Enter"
      setTimeout(() => setPhase(5), 10000), // 10.0s: Lock frame
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    sessionStorage.setItem('offclass-intro-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[var(--color-ink)] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${phase === 5 ? 'cursor-pointer' : ''}`}
      onClick={phase === 5 ? handleEnter : undefined}
    >
      {/* 1. The OG Background Image (Fades in at 5s, zooms out) */}
      <div 
        className={`absolute inset-0 transition-all duration-[5000ms] ease-out ${
          phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-150'
        }`}
      >
        <Image 
          src="/og-intro.png" 
          alt="OFFCLASS Cinematic" 
          fill
          className="object-cover opacity-60 mix-blend-screen"
          priority
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-[var(--color-ink)] opacity-90" />
      </div>

      {/* 2. Neon Geometry (Visible between 2.5s and 8.5s) */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${phase >= 2 && phase < 4 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[2px] bg-[var(--color-tech)] rotate-45 blur-[2px] animate-[pulse_2s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[2px] bg-[var(--color-money)] -rotate-45 blur-[2px] animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
      </div>

      {/* 3. Central Typography */}
      <div className="relative z-10 text-center pointer-events-none">
        <h1 className="text-[5rem] md:text-[8rem] font-bold tracking-tighter font-[var(--font-display)] text-white drop-shadow-[0_0_40px_rgba(49,87,213,0.8)] overflow-hidden">
          <span className={`inline-block transition-transform duration-[2000ms] ${phase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'}`}>
            OFF<span className="text-[var(--color-tech)]">CLASS</span>
          </span>
        </h1>
        
        <p className={`text-[var(--color-money)] tracking-[0.3em] uppercase text-sm md:text-base mt-2 transition-all duration-1000 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Beyond the classroom
        </p>
      </div>

      {/* 4. The 10th Second "Click to Enter" Action */}
      <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 transition-all duration-1000 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button 
          onClick={handleEnter}
          className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border border-[var(--color-money)] text-[var(--color-money)] font-bold tracking-widest uppercase transition-colors hover:bg-[var(--color-money)] hover:text-[var(--color-ink)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            Click to Continue
            <svg className="w-5 h-5 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-[var(--color-money)] opacity-10 blur-xl group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Quick White Flash at 8.5s to lock in the final frame */}
      <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-1000 ${phase === 4 ? 'opacity-20' : 'opacity-0'}`} />

    </div>
  );
}
