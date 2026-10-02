'use client';

import { useReveal } from '@/hooks/useReveal';
import { ReactNode } from 'react';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealSection({ children, className = '', delay = 0 }: RevealSectionProps) {
  const { ref, isVisible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
