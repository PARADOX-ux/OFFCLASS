import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center bg-[var(--color-offwhite)]">
      <div className="container mx-auto max-w-[1320px] px-6 text-center">
        <p className="text-[6rem] font-bold font-[var(--font-display)] text-[var(--color-offwhite-dark)] leading-none mb-4">
          404
        </p>
        <h1 className="text-display-sm mb-4">
          Page not found.
        </h1>
        <p className="text-[0.95rem] text-[var(--color-muted)] mb-8 max-w-[400px] mx-auto">
          This page doesn&apos;t exist yet — or maybe it moved. Here are some places to start.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            <Home size={16} />
            Go Home
          </Link>
          <Link href="/money" className="btn btn-outline">
            Start with Money
          </Link>
          <Link href="/skills" className="btn btn-outline">
            Explore Skills
          </Link>
        </div>
      </div>
    </section>
  );
}
