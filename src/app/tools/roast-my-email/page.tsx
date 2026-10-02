'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RevealSection from '@/components/RevealSection';

export default function EmailRoasterPage() {
  const [emailText, setEmailText] = useState('');
  const [isRoasting, setIsRoasting] = useState(false);
  const [result, setResult] = useState<{ score: number; roast: string; rewrite: string } | null>(null);

  // This function simulates the Google Gemini API call
  // To make it real, you just need a free Google AI Studio API key!
  const handleRoast = async () => {
    if (!emailText.trim()) return;
    
    setIsRoasting(true);
    
    // Simulating API latency (In reality, we would fetch to /api/gemini here)
    setTimeout(() => {
      setResult({
        score: 45,
        roast: "This email sounds a bit too desperate and uses too much filler language. You are burying your actual skills at the very bottom! Hiring managers spend 6 seconds reading an email—you need to hit them with your value proposition in the first sentence.",
        rewrite: "Hi [Name],\n\nI noticed [Company] is scaling its design team. I am a UX design student with 2 years of freelance experience, and I recently redesigned an e-commerce flow that increased conversions by 15%.\n\nI'd love to bring this kind of impact to your upcoming projects as a summer intern. Do you have 5 minutes next Tuesday for a quick chat?\n\nBest,\n[Your Name]"
      });
      setIsRoasting(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-24 pb-20">
      <div className="container mx-auto max-w-4xl px-6">
        
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Tools
        </Link>

        <RevealSection>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(49,87,213,0.1)] text-[var(--color-tech)] rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[rgba(49,87,213,0.2)]">
              <Bot size={14} /> Powered by Google AI
            </div>
            <h1 className="text-display-md mb-4">Cold Email Roaster 🔥</h1>
            <p className="text-[var(--color-muted)]">
              Paste your cold email or internship outreach message below. Our Google AI-powered mentor will brutally roast your mistakes and rewrite it into a top-tier, highly convertible message.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Input Side */}
          <RevealSection delay={0.1}>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm">
              <label className="block text-sm font-bold text-[var(--color-ink)] mb-3">Your Draft Email</label>
              <textarea 
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                placeholder="Hi Sir/Madam, I am a student looking for an internship. Please give me a chance..."
                className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-tech)] focus:border-transparent resize-none text-[0.9rem] mb-4"
              />
              <button 
                onClick={handleRoast}
                disabled={isRoasting || !emailText.trim()}
                className="w-full btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isRoasting ? (
                  <span className="animate-pulse">Analyzing with AI...</span>
                ) : (
                  <>Roast My Email <Sparkles size={16} /></>
                )}
              </button>
            </div>
          </RevealSection>

          {/* Results Side */}
          <RevealSection delay={0.2}>
            {result ? (
              <div className="flex flex-col gap-6 h-full">
                
                {/* The Roast */}
                <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#be123c] flex items-center gap-2">
                      <AlertTriangle size={18} /> The Brutal Truth
                    </h3>
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-[#be123c] flex items-center justify-center font-bold text-[#be123c]">
                      {result.score}
                    </div>
                  </div>
                  <p className="text-[0.9rem] text-[#9f1239] leading-relaxed">
                    {result.roast}
                  </p>
                </div>

                {/* The Rewrite */}
                <div className="bg-[var(--color-ink)] text-white rounded-2xl p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-[var(--color-money)] flex items-center gap-2 mb-4">
                    <Send size={18} /> The AI Rewrite
                  </h3>
                  <div className="flex-1 bg-[rgba(255,255,255,0.05)] rounded-xl p-4 text-[0.9rem] text-gray-300 whitespace-pre-wrap font-mono">
                    {result.rewrite}
                  </div>
                  <button className="w-full mt-4 py-2 border border-gray-600 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-colors">
                    Copy to Clipboard
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <Bot size={32} />
                </div>
                <h3 className="font-bold text-gray-600 mb-2">Waiting for your draft</h3>
                <p className="text-sm text-gray-400 max-w-[200px]">
                  Paste your email to let Google AI analyze your tone and structure.
                </p>
              </div>
            )}
          </RevealSection>

        </div>
      </div>
    </div>
  );
}
