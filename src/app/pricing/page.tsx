'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Zap, ArrowRight, ShieldAlert, Loader2 } from 'lucide-react';
import RevealSection from '@/components/RevealSection';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [processingState, setProcessingState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = () => {
    setProcessingState('loading');
    // Simulate Razorpay popup delay
    setTimeout(() => {
      setProcessingState('success');
      // Reset after showing success
      setTimeout(() => setProcessingState('idle'), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20">
      <div className="container mx-auto max-w-[1200px] px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <RevealSection>
            <span className="pill pill-money mb-4 inline-block">Simple Pricing</span>
            <h1 className="text-display-lg mb-6">Invest in yourself.</h1>
            <p className="text-body-lg text-[var(--color-muted)] mb-10">
              We designed our pricing to be affordable for students. Less than the cost of a coffee, giving you access to premium creator courses and tools.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-[0.9rem] font-bold ${!isAnnual ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 rounded-full bg-[var(--color-ink)] p-1 relative transition-colors duration-300"
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-[0.9rem] font-bold flex items-center gap-2 ${isAnnual ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`}>
                Annually
                <span className="bg-[var(--color-money)] text-[var(--color-ink)] text-[0.65rem] px-2 py-0.5 rounded-full uppercase tracking-wider">Save 40%</span>
              </span>
            </div>
          </RevealSection>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          
          {/* Free Tier */}
          <RevealSection delay={0.1}>
            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-8 flex flex-col h-full hover:shadow-sm transition-shadow">
              <div className="mb-8">
                <h3 className="text-2xl font-bold font-[var(--font-display)] mb-2">Basic</h3>
                <p className="text-[var(--color-muted)] text-[0.85rem]">Everything you need to get started.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold font-[var(--font-display)] tracking-tight">₹0</span>
                <span className="text-[var(--color-muted)] text-sm">/forever</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
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
            <div className="bg-[var(--color-ink)] text-white border border-gray-800 rounded-3xl p-8 flex flex-col h-full relative overflow-hidden transform md:-translate-y-4 shadow-xl">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-money)] opacity-[0.1] blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[var(--color-money)] text-[var(--color-ink)] text-[0.65rem] font-bold uppercase tracking-widest py-1 px-4 rounded-b-xl">
                Most Popular
              </div>

              <div className="mb-8 relative z-10 mt-4">
                <h3 className="text-2xl font-bold font-[var(--font-display)] mb-2 text-white flex items-center gap-2">
                  OFFCLASS+
                  <Zap size={18} className="text-[var(--color-money)]" />
                </h3>
                <p className="text-gray-400 text-[0.85rem]">For students serious about their growth.</p>
              </div>
              <div className="mb-8 relative z-10">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold font-[var(--font-display)] tracking-tight text-white">
                    ₹{isAnnual ? '99' : '149'}
                  </span>
                  <span className="text-gray-400 text-sm mb-1">/month</span>
                </div>
                {isAnnual && (
                  <p className="text-[var(--color-money)] text-[0.75rem] mt-2 font-bold tracking-wide uppercase">Billed ₹1,188 yearly</p>
                )}
              </div>
              <ul className="space-y-4 mb-8 flex-1 relative z-10">
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
                onClick={handleSubscribe}
                disabled={processingState === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-[0.9rem] bg-[var(--color-money)] text-[var(--color-ink)] hover:bg-[#a3df3d] transition-colors flex items-center justify-center gap-2 relative z-10 disabled:opacity-80"
              >
                {processingState === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Processing...</>
                ) : processingState === 'success' ? (
                  <><CheckCircle2 size={16} /> Subscribed!</>
                ) : (
                  <>Subscribe Plus <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </RevealSection>

          {/* Pro Tier */}
          <RevealSection delay={0.3}>
            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-8 flex flex-col h-full hover:shadow-sm transition-shadow">
              <div className="mb-8">
                <h3 className="text-2xl font-bold font-[var(--font-display)] mb-2 text-[var(--color-tech)]">OFFCLASS Pro</h3>
                <p className="text-[var(--color-muted)] text-[0.85rem]">1-on-1 mentorship and ultimate access.</p>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold font-[var(--font-display)] tracking-tight text-[var(--color-ink)]">
                    ₹{isAnnual ? '299' : '399'}
                  </span>
                  <span className="text-[var(--color-muted)] text-sm mb-1">/month</span>
                </div>
                {isAnnual && (
                  <p className="text-[var(--color-tech)] text-[0.75rem] mt-2 font-bold tracking-wide uppercase">Billed ₹3,588 yearly</p>
                )}
              </div>
              <ul className="space-y-4 mb-8 flex-1">
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
                onClick={handleSubscribe}
                disabled={processingState === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-[0.9rem] bg-[rgba(49,87,213,0.1)] text-[var(--color-tech)] hover:bg-[rgba(49,87,213,0.15)] transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
              >
                {processingState === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Processing...</>
                ) : processingState === 'success' ? (
                  <><CheckCircle2 size={16} /> Subscribed!</>
                ) : (
                  <>Subscribe Pro</>
                )}
              </button>
            </div>
          </RevealSection>

        </div>

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
