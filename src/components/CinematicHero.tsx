'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const cube = cubeRef.current;
      const copy = copyRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      if (cube && !reduced.matches) {
        const baseSpin = performance.now() * 0.00004 * 360;
        cube.style.transform = `rotateX(${62 + progress * 26}deg) rotateZ(${baseSpin + progress * 70}deg) scale(${1 - progress * 0.18})`;
      }
      if (copy && !reduced.matches) {
        copy.style.transform = `translateY(${progress * 120}px)`;
        copy.style.opacity = String(1 - progress * 1.4);
      }
    };
    const onScroll = () => { if (frame === 0) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="stage relative flex min-h-[100svh] items-center overflow-hidden" aria-labelledby="stage-hero-heading">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" style={{ background: 'radial-gradient(circle, rgba(76,141,255,0.22) 0%, rgba(76,141,255,0) 65%)' }} />
      <div aria-hidden className="stage-floor pointer-events-none absolute inset-0" />
      <div className="container relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-6 pt-24 pb-16 lg:grid-cols-2 lg:gap-6">
        <div ref={copyRef} className="order-2 max-w-[560px] lg:order-1">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.74rem] font-bold tracking-[0.14em] uppercase" style={{ borderColor: 'rgba(76,141,255,0.35)', color: '#8FB8FF', background: 'rgba(76,141,255,0.08)' }}>
            OFFCLASS · Skills beyond the syllabus
          </p>
          <h1 id="stage-hero-heading" className="mb-5 text-display-xl font-bold leading-[1.05]" style={{ color: '#F5F9FF' }}>
            One focused hour{' '}
            <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(90deg, #4C8DFF, #8FB8FF)' }}>
              changes everything
            </span>
          </h1>
          <p className="text-body-lg mb-9 leading-relaxed" style={{ color: '#8CA0B3' }}>
            Career-ready skill tracks, real projects and placement prep for Indian college students — ₹99 a month, start free.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/signup" className="stage-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.95rem] font-bold">
              Start learning free
              <ArrowRight size={17} aria-hidden />
            </Link>
            <p className="text-[0.8rem]" style={{ color: '#8CA0B3' }}>
              No card needed · Full access on the free plan
            </p>
          </div>
        </div>
        <div className="order-1 flex items-center justify-center lg:order-2" aria-hidden>
          <div className="stage-scene h-[300px] w-[300px] sm:h-[380px] sm:w-[380px]">
            <div ref={cubeRef} className="stage-cube absolute inset-0">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="stage-plane" style={{ transform: `translateZ(${i * 46}px)`, animationDelay: `${i * 0.4}s` }}>
                  <span className="stage-plane-notch" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[0.7rem] font-bold tracking-[0.2em] uppercase animate-float" style={{ color: '#8CA0B3' }}>
        Scroll ↓
      </div>
    </section>
  );
}