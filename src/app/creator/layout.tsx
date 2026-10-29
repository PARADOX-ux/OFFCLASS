'use client';

import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Users, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--color-offwhite)] text-[var(--color-ink)] font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex-col hidden md:flex">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-ink)] text-[var(--color-offwhite)] flex items-center justify-center">
            <span className="font-bold text-xs">CR</span>
          </div>
          <span className="font-bold text-lg tracking-tight font-[var(--font-display)]">Creator Studio</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/creator/dashboard"
            className="flex items-center gap-3 px-3 py-2 bg-black/[0.04] dark:bg-white/[0.06] text-[var(--color-ink)] rounded-md font-medium text-sm"
          >
            <LayoutDashboard size={18} className="text-[var(--color-tech)]" />
            Dashboard
          </Link>
          <Link
            href="#courses"
            className="flex items-center gap-3 px-3 py-2 text-[var(--color-muted)] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-[var(--color-ink)] rounded-md font-medium text-sm transition-colors"
          >
            <BookOpen size={18} className="text-[var(--color-muted)]" />
            My Courses
          </Link>
          <Link
            href="#students"
            className="flex items-center gap-3 px-3 py-2 text-[var(--color-muted)] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-[var(--color-ink)] rounded-md font-medium text-sm transition-colors"
          >
            <Users size={18} className="text-[var(--color-muted)]" />
            Students
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--color-border)] space-y-2">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs text-[var(--color-muted)]">Mode</span>
            <ThemeToggle />
          </div>
          <Link
            href="#settings"
            className="flex items-center gap-3 px-3 py-2 text-[var(--color-muted)] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-[var(--color-ink)] rounded-md font-medium text-sm transition-colors"
          >
            <Settings size={18} className="text-[var(--color-muted)]" />
            Settings
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-rose-500 hover:bg-rose-500/10 rounded-md font-medium text-sm transition-colors"
          >
            <LogOut size={18} />
            Exit to OFFCLASS
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] h-16 flex items-center px-8 justify-between md:justify-end">
          <div className="md:hidden font-bold">Creator Studio</div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-[var(--color-money)] flex items-center justify-center text-sm font-bold text-neutral-900">
              JD
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
