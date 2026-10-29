'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-black/5 dark:border-white/10 opacity-40" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] border border-black/[0.04] dark:border-white/[0.08] transition-all text-[var(--color-ink)] cursor-pointer"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun size={15} className="text-[var(--color-money)] transition-transform hover:rotate-45" />
      ) : (
        <Moon size={15} className="text-[var(--color-ink)] transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
