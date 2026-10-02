import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'Money', href: '/money' },
    { label: 'Skills', href: '/skills' },
    { label: 'Career', href: '/career' },
    { label: 'Campus', href: '/campus' },
    { label: 'Life', href: '/life' },
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
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-[1.3rem] font-bold tracking-[-0.03em] font-[var(--font-display)]">
                OFF<span className="text-[var(--color-tech)]">CLASS</span>
              </Link>
              <p className="mt-4 text-[0.85rem] text-[var(--color-muted)] leading-relaxed max-w-[240px]">
                Build your life beyond the classroom.
              </p>
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
            {/* Social placeholders — no fake accounts */}
            {['Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
              <span
                key={platform}
                className="text-[0.75rem] text-[var(--color-muted)] flex items-center gap-1 cursor-default"
                title={`${platform} — Coming soon`}
              >
                {platform}
                <ArrowUpRight size={10} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
