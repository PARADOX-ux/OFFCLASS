'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Mail, Lock, Sparkles, BookOpen, Briefcase, Zap, GraduationCap, Code } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-[var(--color-bg)]">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-[20%] left-[15%] text-[var(--color-tech)] opacity-20 animate-[float_4s_ease-in-out_infinite]">
          <BookOpen size={48} />
        </div>
        <div className="absolute bottom-[25%] left-[20%] text-[var(--color-money)] opacity-20 animate-[float_5s_ease-in-out_infinite_1s]">
          <Code size={40} />
        </div>
        <div className="absolute top-[30%] right-[18%] text-[#b45309] opacity-20 animate-[float_6s_ease-in-out_infinite_0.5s]">
          <Briefcase size={54} />
        </div>
        <div className="absolute bottom-[30%] right-[15%] text-[var(--color-tech)] opacity-20 animate-[float_4.5s_ease-in-out_infinite_1.5s]">
          <Zap size={44} />
        </div>
        <div className="absolute top-[10%] left-[45%] text-[var(--color-ink)] opacity-10 animate-[float_7s_ease-in-out_infinite_2s]">
          <Sparkles size={32} />
        </div>
        <div className="absolute bottom-[10%] right-[40%] text-[var(--color-ink)] opacity-10 animate-[float_5.5s_ease-in-out_infinite_0.8s]">
          <GraduationCap size={48} />
        </div>
      </div>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-[380px] p-8 mx-6 bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-xl)] animate-[scale-in_0.4s_ease]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[var(--color-ink)] text-[var(--color-offwhite)] rounded-xl flex items-center justify-center mx-auto mb-4 font-[var(--font-display)] font-bold text-xl shadow-[var(--shadow-md)]">
            O
          </div>
          <h1 className="text-2xl font-bold font-[var(--font-display)] mb-2">Welcome Back</h1>
          <p className="text-[var(--color-muted)] text-[0.85rem]">
            Sign in to access your dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-[rgba(220,38,38,0.1)] text-[#dc2626] rounded-md text-[0.8rem] text-center border border-[rgba(220,38,38,0.2)]">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[0.75rem] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1.5 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-light)]" size={16} />
              <input
                type="email"
                required
                className="w-full bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-lg py-2.5 pl-10 pr-4 text-[0.9rem] focus:outline-none focus:border-[var(--color-tech)] transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-[0.75rem] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1.5 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-light)]" size={16} />
              <input
                type="password"
                required
                className="w-full bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-lg py-2.5 pl-10 pr-4 text-[0.9rem] focus:outline-none focus:border-[var(--color-tech)] transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-ink)] text-[var(--color-offwhite)] font-bold rounded-lg py-3 mt-4 hover:bg-[var(--color-ink-light)] transition-colors flex items-center justify-center gap-2 text-[0.9rem] disabled:opacity-70 shadow-md"
          >
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-[0.8rem] text-[var(--color-muted)]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[var(--color-ink)] font-bold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
