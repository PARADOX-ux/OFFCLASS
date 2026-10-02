'use client';

import React, { useState, useEffect } from 'react';

export default function IntroVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState(0);

  // Sequence the animation phases
  useEffect(() => {
    // Check if they already saw it this session
    const hasSeen = sessionStorage.getItem('offclass-intro-seen');
    if (hasSeen) {
      setIsVisible(false);
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 1000), // 1s: Show "Build your life."
      setTimeout(() => setPhase(2), 3000), // 3s: Show "...beyond the classroom."
      setTimeout(() => setPhase(3), 5500), // 5.5s: Show OFFCLASS logo with glow
      setTimeout(() => setPhase(4), 7500), // 7.5s: Show "Click to enter"
      setTimeout(() => handleFinish(), 10000), // 10s: Auto finish
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleFinish = () => {
    setIsVisible(false);
    sessionStorage.setItem('offclass-intro-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div 
      onClick={handleFinish}
      className="fixed inset-0 z-[9999] bg-[var(--color-ink)] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-opacity duration-1000"
    >
      {/* Background glow effects */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-tech)] rounded-full blur-[120px] opacity-0 transition-opacity duration-[3000ms] ${phase >= 3 ? 'opacity-[0.15]' : ''}`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-money)] rounded-full blur-[100px] opacity-0 transition-opacity duration-[2000ms] delay-500 ${phase >= 3 ? 'opacity-[0.15]' : ''}`} />

      {/* Text Phase 1 & 2 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h2 className={`text-display-md text-[var(--color-offwhite)] transition-all duration-1000 transform ${phase === 1 ? 'opacity-100 translate-y-0' : phase >= 2 ? 'opacity-100 -translate-y-4' : 'opacity-0 translate-y-4'}`}>
          Build your life.
        </h2>
        <h2 className={`text-display-md text-[var(--color-money)] transition-all duration-1000 transform mt-2 ${phase >= 2 && phase < 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          ...beyond the classroom.
        </h2>
      </div>

      {/* Logo Phase 3 */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-[1500ms] transform ${phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="text-center">
          <h1 className="text-[4rem] md:text-[6rem] font-bold tracking-tight font-[var(--font-display)] text-white drop-shadow-[0_0_30px_rgba(49,87,213,0.5)]">
            OFF<span className="text-[var(--color-tech)]">CLASS</span>
          </h1>
          
          {/* Animated geometric circles around the logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-[rgba(183,243,74,0.3)] rounded-full animate-[spin_8s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-[rgba(49,87,213,0.2)] rounded-full animate-[spin_12s_linear_infinite_reverse]" />
        </div>
      </div>

      {/* Hint Phase 4 */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-[var(--color-muted-light)] text-[0.85rem] tracking-widest uppercase animate-pulse">
          Click anywhere to enter
        </p>
      </div>

      {/* Click overlay just to make sure the whole screen is covered but we have the onClick on the parent anyway */}
      <div className="absolute inset-0 z-50 bg-transparent" />
    </div>
  );
}
