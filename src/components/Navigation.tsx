'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, User, ArrowRight, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/components/AuthProvider';
import SearchModal from '@/components/SearchModal';

const mainNav = [
  { label: 'Money', href: '/money' },
  { label: 'Skills', href: '/skills' },
  { label: 'Career', href: '/career' },
  { label: 'Campus', href: '/campus' },
  { label: 'Life', href: '/life' },
];

const secondaryNav = [
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'Tools', href: '/tools' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className="fixed top-2 sm:top-3 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300"
        role="banner"
      >
        <div
          className={`max-w-[1240px] mx-auto rounded-full floating-nav-capsule pointer-events-auto px-3.5 sm:px-5 py-2 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'shadow-xl shadow-black/[0.08] dark:shadow-black/50' : ''
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group text-[1.15rem] sm:text-[1.25rem] font-bold font-[var(--font-display)] tracking-[-0.03em] text-[var(--color-ink)]"
            aria-label="OFFCLASS Home"
          >
            <span className="w-7 h-7 rounded-full bg-[var(--color-ink)] text-[var(--color-offwhite)] flex items-center justify-center text-xs font-bold shadow-sm transition-transform group-hover:scale-105">
              O
            </span>
            <span>
              OFF<span className="text-[var(--color-tech)]">CLASS</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] p-1 rounded-full border border-black/[0.03] dark:border-white/[0.04]"
            aria-label="Main menu"
          >
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-[0.83rem] font-medium rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-white dark:bg-neutral-800 text-[var(--color-ink)] shadow-sm font-semibold'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="w-px h-3.5 bg-black/10 dark:bg-white/10 mx-1" />

            {secondaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1.5 text-[0.8rem] font-medium rounded-full transition-all duration-200 ${
                    active
                      ? 'text-[var(--color-tech)] font-semibold'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2">
            {/* Search Pill */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.09] text-[0.8rem] text-[var(--color-muted)] hover:text-[var(--color-ink)] border border-transparent hover:border-black/[0.06] dark:hover:border-white/[0.08] transition-all"
              aria-label="Open global search (Ctrl + K)"
            >
              <Search size={14} />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-black/[0.06] dark:bg-white/[0.08] font-mono text-[var(--color-muted)]">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Auth Action */}
            {!loading && (
              user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-[var(--color-ink)] bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] px-3.5 py-1.5 rounded-full transition-all"
                >
                  <User size={13} className="text-[var(--color-tech)]" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex text-[0.82rem] font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] px-2.5 py-1.5 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/pricing"
                    className="btn btn-sm btn-primary rounded-full px-3.5 py-1 text-[0.82rem] shadow-sm font-semibold flex items-center gap-1"
                  >
                    <Sparkles size={12} className="text-[var(--color-money)]" />
                    <span>Get Pro</span>
                  </Link>
                </div>
              )
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 rounded-full hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors text-[var(--color-ink)] ml-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Global Search Modal */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--color-offwhite)]/95 dark:bg-neutral-950/95 backdrop-blur-2xl lg:hidden overflow-y-auto animate-[fade-in_0.2s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="pt-24 px-6 pb-12 max-w-[500px] mx-auto">
            {/* Primary Mobile CTA */}
            {!loading && (
              user ? (
                <Link
                  href="/dashboard"
                  className="bento-card p-4 mb-6 flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-tech)] text-white flex items-center justify-center font-bold">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[0.95rem] font-bold text-[var(--color-ink)]">My Dashboard</p>
                      <p className="text-[0.75rem] text-[var(--color-muted)]">{user.email}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[var(--color-muted)] group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link
                    href="/login"
                    className="btn btn-outline text-center justify-center rounded-xl py-2.5 text-[0.88rem]"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="btn btn-primary text-center justify-center rounded-xl py-2.5 text-[0.88rem]"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up Free
                  </Link>
                </div>
              )
            )}

            {/* Core Pillars */}
            <div className="space-y-1.5 mb-6">
              <p className="text-caption text-[var(--color-muted)] mb-2 px-3">Student Pillars</p>
              <div className="grid grid-cols-1 gap-1.5">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-[0.98rem] font-semibold transition-all ${
                      isActive(item.href)
                        ? 'bg-[var(--color-tech)]/10 text-[var(--color-tech)]'
                        : 'text-[var(--color-ink)] hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={14} className="opacity-40" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Secondary Resources */}
            <div className="space-y-1.5 mb-8">
              <p className="text-caption text-[var(--color-muted)] mb-2 px-3">Features & Tools</p>
              <div className="grid grid-cols-1 gap-1">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[0.9rem] font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={13} className="opacity-30" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer links */}
            <div className="border-t border-black/5 dark:border-white/10 pt-5 flex items-center justify-between text-[0.82rem] text-[var(--color-muted)]">
              <Link href="/about" onClick={() => setIsOpen(false)} className="hover:underline">
                About
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:underline">
                Contact
              </Link>
              <Link href="/privacy" onClick={() => setIsOpen(false)} className="hover:underline">
                Privacy
              </Link>
              <Link href="/disclaimer" onClick={() => setIsOpen(false)} className="hover:underline">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
