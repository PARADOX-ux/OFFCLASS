'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import OAuthButtons from '@/components/OAuthButtons';

export default function LoginPage() {
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
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="container mx-auto max-w-[400px] px-6 py-20 animate-[fade-in_0.4s_ease]">
      <div className="card p-8 text-center mb-6">
        <h1 className="text-display-sm mb-2">Welcome Back</h1>
        <p className="text-[var(--color-muted)] text-[0.9rem] mb-8">
          Sign in to access your saved tools and opportunities.
        </p>

        {error && (
          <div className="mb-6 p-3 bg-[rgba(220,38,38,0.1)] text-[#dc2626] rounded-md text-[0.85rem]">
            {error}
          </div>
        )}

        <OAuthButtons />

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-[var(--color-border)]"></div>
          <span className="flex-shrink-0 px-4 text-[0.8rem] text-[var(--color-muted)]">OR CONTINUE WITH EMAIL</span>
          <div className="flex-grow border-t border-[var(--color-border)]"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="label">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18} />
              <input
                type="email"
                required
                className="input"
                style={{ paddingLeft: '40px' }}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18} />
              <input
                type="password"
                required
                className="input"
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full justify-center mt-2 disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="divider my-6" />

        <p className="text-[0.85rem] text-[var(--color-muted)]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[var(--color-tech)] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
