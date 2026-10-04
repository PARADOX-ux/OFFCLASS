'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'Money', href: '/money' },
    { label: 'Skills', href: '/skills' },
    { label: 'Career', href: '/career' },
    { label: 'Campus', href: '/campus' },
    { label: 'Life', href: '/life' },
    { label: 'Pricing', href: '/pricing' },
  ],
  resources: [
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'Tools', href: '/tools' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'For Creators', href: '/creator/dashboard' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-offwhite)]" role="contentinfo">
      <div className="container mx-auto max-w-[1320px] px-6">
        {/* Main Footer */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
            {/* Brand & Newsletter */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
              <div>
                <Link href="/" className="text-[1.3rem] font-bold tracking-[-0.03em] font-[var(--font-display)]">
                  OFF<span className="text-[var(--color-tech)]">CLASS</span>
                </Link>
                <p className="mt-4 text-[0.85rem] text-[var(--color-muted)] leading-relaxed max-w-[240px]">
                  Build your life beyond the classroom.
                </p>
              </div>

              <div>
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-3">
                  Stay Updated
                </h3>
                <form className="flex gap-2 max-w-[240px]" onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); e.currentTarget.reset(); }}>
                  <input type="email" placeholder="Email address" required className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-[0.8rem] px-3 py-2 flex-1 rounded-[var(--radius-sm)] focus:border-[var(--color-tech)] outline-none transition-colors" />
                  <button type="submit" className="bg-[var(--color-tech)] text-white px-3 py-2 rounded-[var(--radius-sm)] text-[0.8rem] font-semibold hover:opacity-90 transition-opacity">
                    Join
                  </button>
                </form>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">
                Explore
              </h3>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9rem] text-[var(--color-muted-light)] hover:text-[var(--color-offwhite)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9rem] text-[var(--color-muted-light)] hover:text-[var(--color-offwhite)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9rem] text-[var(--color-muted-light)] hover:text-[var(--color-offwhite)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9rem] text-[var(--color-muted-light)] hover:text-[var(--color-offwhite)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.08)] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.8rem] text-[var(--color-muted)]">
            © {new Date().getFullYear()} OFFCLASS. Built for students.
          </p>

          <div className="flex items-center gap-4">
            {/* Social Links */}
            {[
              { name: 'Twitter', url: 'https://twitter.com/offclass' },
              { name: 'Instagram', url: 'https://instagram.com/offclass' },
              { name: 'LinkedIn', url: 'https://linkedin.com/company/offclass' }
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.75rem] text-[var(--color-muted)] hover:text-[var(--color-offwhite)] flex items-center gap-1 transition-colors"
              >
                {platform.name}
                <ArrowUpRight size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
