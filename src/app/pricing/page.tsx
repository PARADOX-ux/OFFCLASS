'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Zap, ArrowRight, ShieldAlert, Loader2, XCircle, Sparkles } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { checkout, isProcessing, paymentStatus } = useRazorpay({
    onSuccess: (paymentId) => {
      setToastMessage({ type: 'success', text: `Payment successful! ID: ${paymentId}` });
      setTimeout(() => setToastMessage(null), 5000);
    },
    onError: (error) => {
      setToastMessage({ type: 'error', text: error });
      setTimeout(() => setToastMessage(null), 5000);
    },
  });

  const handleSubscribe = (tier: 'plus' | 'pro') => {
    if (!user) {
      router.push('/login?redirect=/pricing');
      return;
    }

    const planId = `${tier}_${isAnnual ? 'annual' : 'monthly'}`;
    checkout({ type: 'subscription', planId });
  };

  // Button states
  const getButtonContent = (tier: 'plus' | 'pro') => {
    if (paymentStatus === 'processing') {
      return <><Loader2 size={16} className="animate-spin" /> Processing...</>;
    }
    if (paymentStatus === 'success') {
      return <><CheckCircle2 size={16} /> Subscribed!</>;
    }
    if (paymentStatus === 'error') {
      return <><XCircle size={16} /> Try Again</>;
    }
    return tier === 'plus'
      ? <>Subscribe Plus <ArrowRight size={16} /></>
      : <>Subscribe Pro</>;
  };

  return (
    <div className="min-h-[85vh] bg-[var(--color-bg)] pt-24 pb-12">
      <div className="container mx-auto max-w-[1200px] px-6">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div
            className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-[0.85rem] font-medium animate-[slideInRight_0.3s_ease] ${
              toastMessage.type === 'success'
                ? 'bg-[#0d1f0d] text-[#86efac] border border-[#22633a]'
                : 'bg-[#1f0d0d] text-[#fca5a5] border border-[#7f1d1d]'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 size={18} />
            ) : (
              <XCircle size={18} />
            )}
            {toastMessage.text}
            <button onClick={() => setToastMessage(null)} className="ml-2 opacity-60 hover:opacity-100">
              <XCircle size={14} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <RevealSection>
            <span className="pill pill-money mb-3 inline-block">Simple Pricing</span>
            <h1 className="text-display-md mb-3">Invest in yourself.</h1>
            <p className="text-[0.9rem] text-[var(--color-muted)] mb-6">
              We designed our pricing to be affordable for students. Less than the cost of a coffee, giving you access to premium creator courses and tools.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-[0.9rem] font-bold ${!isAnnual ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 rounded-full bg-neutral-900 dark:bg-neutral-800 border border-neutral-700 p-1 relative transition-colors duration-300 cursor-pointer"
                aria-label="Toggle annual billing"
              >
                <div className={`w-6 h-6 bg-white dark:bg-[var(--color-money)] rounded-full absolute top-1 transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-[0.9rem] font-bold flex items-center gap-2 ${isAnnual ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`}>
                Annually
                <span className="bg-[var(--color-money)] text-[var(--color-ink)] text-[0.65rem] px-2 py-0.5 rounded-full uppercase tracking-wider">Save 40%</span>
              </span>
            </div>
          </RevealSection>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          
          {/* Free Tier */}
          <RevealSection delay={0.1}>
            <div className="bento-card p-6 flex flex-col h-full hover:shadow-md transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-[var(--font-display)] mb-1">Basic</h3>
                <p className="text-[var(--color-muted)] text-[0.75rem]">Everything you need to get started.</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold font-[var(--font-display)] tracking-tight">₹0</span>
                <span className="text-[var(--color-muted)] text-xs">/forever</span>
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {[
                  'Access to 50+ basic articles',
                  'Interactive money & time tools',
                  'Save up to 10 opportunities',
                  'Basic community access',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-[0.85rem] text-[var(--color-ink)] leading-snug">
                    <CheckCircle2 size={16} className="text-[var(--color-muted)] mr-3 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn btn-outline w-full justify-center">
                Get Started Free
              </Link>
            </div>
          </RevealSection>

          {/* Plus Tier */}
          <RevealSection delay={0.2}>
            <div className="bg-neutral-950 text-white border border-blue-500/40 rounded-3xl p-6 flex flex-col h-full relative overflow-hidden transform md:-translate-y-2 shadow-2xl dark:shadow-[0_0_50px_-10px_rgba(49,87,213,0.3)]">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[var(--color-money)] opacity-[0.1] blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[var(--color-money)] text-[var(--color-ink)] text-[0.6rem] font-bold uppercase tracking-widest py-1 px-4 rounded-b-lg">
                Most Popular
              </div>

              <div className="mb-6 relative z-10 mt-3">
                <h3 className="text-xl font-bold font-[var(--font-display)] mb-1 text-white flex items-center gap-2">
                  OFFCLASS+
                  <Zap size={16} className="text-[var(--color-money)]" />
                </h3>
                <p className="text-gray-400 text-[0.75rem]">For students serious about their growth.</p>
              </div>
              <div className="mb-6 relative z-10">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold font-[var(--font-display)] tracking-tight text-white">
                    ₹{isAnnual ? '99' : '149'}
                  </span>
                  <span className="text-gray-400 text-xs mb-1">/month</span>
                </div>
                {isAnnual && (
                  <p className="text-[var(--color-money)] text-[0.65rem] mt-1 font-bold tracking-wide uppercase">Billed ₹1,188 yearly</p>
                )}
              </div>
              <ul className="space-y-3 mb-6 flex-1 relative z-10">
                {[
                  'Unlimited access to all Premium Creator Courses',
                  'Save unlimited opportunities',
                  'Early access to exclusive internships',
                  'Verified OFFCLASS+ profile badge',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-[0.85rem] text-gray-200 leading-snug">
                    <CheckCircle2 size={16} className="text-[var(--color-money)] mr-3 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleSubscribe('plus')}
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-[0.9rem] bg-[var(--color-money)] text-[var(--color-ink)] hover:bg-[#a3df3d] transition-colors flex items-center justify-center gap-2 relative z-10 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {getButtonContent('plus')}
              </button>
              {!user && (
                <p className="text-gray-500 text-[0.7rem] text-center mt-2 relative z-10">
                  You&apos;ll be asked to log in first
                </p>
              )}
            </div>
          </RevealSection>

          {/* Pro Tier */}
          <RevealSection delay={0.3}>
            <div className="bento-card p-6 flex flex-col h-full hover:shadow-md transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-[var(--font-display)] mb-1 text-[var(--color-tech)]">OFFCLASS Pro</h3>
                <p className="text-[var(--color-muted)] text-[0.75rem]">1-on-1 mentorship and ultimate access.</p>
              </div>
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold font-[var(--font-display)] tracking-tight text-[var(--color-ink)]">
                    ₹{isAnnual ? '299' : '399'}
                  </span>
                  <span className="text-[var(--color-muted)] text-xs mb-1">/month</span>
                </div>
                {isAnnual && (
                  <p className="text-[var(--color-tech)] text-[0.65rem] mt-1 font-bold tracking-wide uppercase">Billed ₹3,588 yearly</p>
                )}
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {[
                  'Everything in OFFCLASS+',
                  '1-on-1 monthly mentorship call',
                  'Professional resume & portfolio review',
                  'Direct messaging with creators',
                  'Private Pro Discord channel',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-[0.85rem] text-[var(--color-ink)] leading-snug">
                    <CheckCircle2 size={16} className="text-[var(--color-tech)] mr-3 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleSubscribe('pro')}
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-[0.9rem] bg-[rgba(49,87,213,0.1)] text-[var(--color-tech)] hover:bg-[rgba(49,87,213,0.15)] transition-colors flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {getButtonContent('pro')}
              </button>
              {!user && (
                <p className="text-[var(--color-muted)] text-[0.7rem] text-center mt-2">
                  You&apos;ll be asked to log in first
                </p>
              )}
            </div>
          </RevealSection>

        </div>

        {/* Security & Payment Badge */}
        <RevealSection delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-muted)]">
              <Sparkles size={14} className="text-[var(--color-money)]" />
              Powered by Razorpay
            </div>
            <span className="text-[var(--color-border)]">•</span>
            <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-muted)]">
              <ShieldAlert size={14} />
              256-bit SSL Encrypted
            </div>
            <span className="text-[var(--color-border)]">•</span>
            <div className="text-[0.8rem] text-[var(--color-muted)]">
              UPI • Cards • Net Banking • Wallets
            </div>
          </div>
        </RevealSection>

        {/* Disclaimer Bottom */}
        <RevealSection delay={0.3}>
          <div className="max-w-3xl mx-auto flex items-center justify-center gap-3 p-4 bg-[rgba(234,179,8,0.08)] rounded-xl">
            <ShieldAlert size={18} className="text-[#b45309]" />
            <p className="text-[0.85rem] text-[#b45309]">
              Subscription directly supports the content creators and platform maintenance. Cancel anytime.
            </p>
          </div>
        </RevealSection>

      </div>
    </div>
  );
}
