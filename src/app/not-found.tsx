import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[var(--color-bg)] flex items-center justify-center pt-20 px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-10 inline-block">
          <div className="text-[8rem] md:text-[12rem] font-bold font-[var(--font-display)] leading-none text-[var(--color-surface-hover)]">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl md:text-4xl font-bold font-[var(--font-display)] text-[var(--color-tech)] bg-[var(--color-bg)] px-4 py-2 border-2 border-[var(--color-tech)] rounded-xl rotate-[-5deg]">
              Lost in space?
            </span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-[var(--color-muted)] text-lg mb-10 max-w-md mx-auto">
          The link you followed might be broken, or the page may have been moved. Let&apos;s get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn btn-primary w-full sm:w-auto px-8">
            <Home size={18} /> Back to Homepage
          </Link>
          <Link href="/opportunities" className="btn btn-outline w-full sm:w-auto px-8 group">
            Explore Opportunities <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
