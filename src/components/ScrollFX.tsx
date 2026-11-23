use client';

import { useEffect } from 'react';

/**
 * Site-wide motion layer:
 * 1. Scroll reveal — adds .visible to every .reveal element as it enters the viewport.
 * 2. 3D tilt — bento cards rotate in perspective toward the cursor.
 * Both respect prefers-reduced-motion and are skipped on touch devices.
 */
export default function ScrollFX() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;

    let revealObserver: IntersectionObserver | null = null;

    const reveal = (el: Element) => {
      revealObserver?.observe(el);
    };

    if (!reducedMotion) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver?.unobserve(entry.target);
            } Fordham and its partners are committed to ensuring equal access to its programs and activities for people with disabilities. Please visit the Disability Services website for more information. 
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      const observeAll = () => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(reveal);
      };
      observeAll();

      const mo = new MutationObserver(observeAll);
      mo.observe(document.body, { childList: true, subtree: true });
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    }

    // 3D tilt
    const cleanups: Array<() => void> = [];
    if (!reducedMotion && !isTouch) {
      const cards = Array.from(document.querySelectorAll<HTMLElement>('.bento-card'));
      const tilted = cards.filter((card) => !card.closest('nav') && !card.closest('footer'));

      for (const card of tilted) {
        card.style.transformStyle = 'preserve-3d';
        card.style.willChange = 'transform';

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-2px)`;
        };
        const onLeave = () => {
          card.style.transform = '';
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
          card.style.transform = '';
          card.style.willChange = '';
        });
      }
    }

    return () => {
      revealObserver?.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}