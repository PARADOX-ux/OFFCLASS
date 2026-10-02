'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ArrowRight, User } from 'lucide-react';
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
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-offwhite)]/95 backdrop-blur-md shadow-[var(--shadow-sm)]'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto max-w-[1320px] px-6">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="font-[var(--font-display)] text-[1.4rem] font-bold tracking-[-0.03em] text-[var(--color-ink)] hover:opacity-80 transition-opacity"
              aria-label="OFFCLASS Home"
            >
              OFF<span className="text-[var(--color-tech)]">CLASS</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-[0.9rem] font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-[var(--color-tech)] bg-[rgba(49,87,213,0.06)]'
                      : 'text-[var(--color-ink)] hover:text-[var(--color-tech)] hover:bg-[rgba(0,0,0,0.03)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="w-px h-5 bg-[var(--color-border)] mx-2" />

              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-[0.85rem] font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-[var(--color-tech)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                aria-label="Search"
              >
                <Search size={18} className="text-[var(--color-muted)]" />
              </button>

              <Link
                href="/about"
                className="text-[0.85rem] font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors px-3 py-2"
              >
                About
              </Link>

              {!loading && (
                user ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-[0.85rem] font-medium text-[var(--color-ink)] bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] transition-colors px-3 py-1.5 rounded-full"
                  >
                    <User size={14} />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="btn btn-primary btn-sm"
                  >
                    Sign In
                  </Link>
                )
              )}
            </div>

            {/* Mobile Buttons */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                aria-label="Search"
              >
                <Search size={18} className="text-[var(--color-muted)]" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <X size={22} className="text-[var(--color-ink)]" />
                ) : (
                  <Menu size={22} className="text-[var(--color-ink)]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Modal */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--color-offwhite)] lg:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="pt-[80px] px-6 pb-8">
            {/* Primary CTA */}
            {!loading && (
              user ? (
                <Link
                  href="/dashboard"
                  className="btn btn-primary w-full mb-8 text-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={16} />
                  My Dashboard
                </Link>
              ) : (
                <div className="flex gap-2 mb-8">
                  <Link
                    href="/login"
                    className="btn btn-outline flex-1 justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="btn btn-primary flex-1 justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )
            )}

            {/* Main Nav */}
            <div className="space-y-1 mb-8">
              <p className="text-caption text-[var(--color-muted)] mb-3 px-3">Explore</p>
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-[var(--radius-md)] text-[1.05rem] font-semibold transition-all ${
                    isActive(item.href)
                      ? 'bg-[rgba(49,87,213,0.06)] text-[var(--color-tech)]'
                      : 'text-[var(--color-ink)] hover:bg-[rgba(0,0,0,0.03)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Secondary Nav */}
            <div className="space-y-1 mb-8">
              <p className="text-caption text-[var(--color-muted)] mb-3 px-3">Resources</p>
              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-[var(--radius-md)] text-[1.05rem] font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-[var(--color-tech)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Footer links */}
            <div className="border-t border-[var(--color-border)] pt-6 space-y-1">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 text-[0.95rem] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
