'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';
import OAuthButtons from '@/components/OAuthButtons';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto max-w-[400px] px-6 py-20 animate-[fade-in_0.4s_ease]">
        <div className="card p-8 text-center mb-6 border-[var(--color-tech)]">
          <h1 className="text-display-sm mb-4">Check your email</h1>
          <p className="text-[var(--color-muted)] text-[0.95rem] mb-6">
            We sent a verification link to <strong>{email}</strong>. Please check your inbox to complete your registration.
          </p>
          <Link href="/login" className="btn btn-outline w-full justify-center">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[400px] px-6 py-20 animate-[fade-in_0.4s_ease]">
      <div className="card p-8 text-center mb-6">
        <h1 className="text-display-sm mb-2">Create Account</h1>
        <p className="text-[var(--color-muted)] text-[0.9rem] mb-8">
          Join OFFCLASS to save opportunities and track your progress.
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

        <form onSubmit={handleSignup} className="space-y-4 text-left">
          <div>
            <label className="label">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18} />
              <input
                type="text"
                required
                className="input"
                style={{ paddingLeft: '40px' }}
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
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
                minLength={6}
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
            {loading ? 'Creating account...' : 'Sign Up'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="divider my-6" />

        <p className="text-[0.85rem] text-[var(--color-muted)]">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-tech)] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
