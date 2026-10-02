'use client';

import React from 'react';
import { Target, Code2, Sparkles, TrendingUp } from 'lucide-react';

export default function HeroPreview() {
  return (
    <div className="relative w-full max-w-[500px] h-[500px]">
      {/* Central Floating Element (Mock Opportunity) */}
      <div 
        className="absolute top-1/2 left-1/2 w-[320px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-[var(--shadow-md)] z-20 animate-float-center"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-tech)] text-white flex items-center justify-center">
            <Code2 size={20} />
          </div>
          <div>
            <h4 className="font-bold font-[var(--font-display)] text-[0.95rem]">Frontend Developer</h4>
            <p className="text-[0.75rem] text-[var(--color-muted)]">Part-time • Remote</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-[var(--color-border)]">
          <span className="text-[0.8rem] font-bold text-[var(--color-ink)]">₹15,000/mo</span>
          <button className="bg-[var(--color-ink)] text-white px-4 py-1.5 rounded-full text-[0.75rem] font-bold">Apply</button>
        </div>
      </div>

      {/* Top Right Floating Element (Skill Badge) */}
      <div 
        className="absolute top-[10%] right-[5%] w-[180px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 shadow-[var(--shadow-sm)] z-30 animate-float-1"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-[rgba(183,243,74,0.2)] flex items-center justify-center text-[#5a7a1a]">
            <Sparkles size={14} />
          </div>
          <span className="text-[0.8rem] font-bold">Skill Unlocked</span>
        </div>
        <div className="h-2 w-full bg-[var(--color-offwhite-dark)] rounded-full overflow-hidden mt-3">
          <div className="h-full bg-[var(--color-money)] w-[75%]" />
        </div>
      </div>

      {/* Bottom Left Floating Element (Goal Tracker) */}
      <div 
        className="absolute bottom-[10%] left-[5%] w-[220px] bg-[var(--color-ink)] border border-[var(--color-border-dark)] rounded-2xl p-5 shadow-[var(--shadow-lg)] z-10 animate-float-2"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-white">
            <Target size={16} />
          </div>
          <div className="text-white">
            <p className="text-[0.7rem] text-gray-400">Monthly Goal</p>
            <p className="text-[0.95rem] font-bold font-[var(--font-display)]">₹30,000</p>
          </div>
        </div>
        <div className="flex items-end gap-1 h-12 mt-4">
          <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-sm h-[30%]" />
          <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-sm h-[50%]" />
          <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-sm h-[70%]" />
          <div className="w-full bg-[var(--color-money)] rounded-sm h-[100%]" />
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-money)_0%,transparent_70%)] opacity-10 blur-3xl z-0 rounded-full" />
    </div>
  );
}
