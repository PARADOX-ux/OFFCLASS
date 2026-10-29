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
      className="w-8 h-8 flex items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] border border-black/[0.05] dark:border-white/[0.1] transition-all text-[var(--color-ink)] active:scale-90 cursor-pointer shadow-xs"
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
