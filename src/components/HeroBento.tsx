'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calculator,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Clock,
  Compass,
} from 'lucide-react';

type StudentStage = 'early' | 'junior' | 'final' | 'freelance';

interface StageData {
  title: string;
  badge: string;
  targetGoal: string;
  focus: string;
  recommendedTool: { name: string; href: string };
  keyMilestone: string;
}

const STAGES: Record<StudentStage, StageData> = {
  early: {
    title: '1st & 2nd Year',
    badge: 'Foundations & Exploration',
    targetGoal: '₹8,000 / mo',
    focus: 'Build real portfolio projects & discover your natural strengths',
    recommendedTool: { name: 'Skill Matrix', href: '/skills' },
    keyMilestone: '1 Live Portfolio Project Deployed',
  },
  junior: {
    title: '3rd Year',
    badge: 'Internships & Freelancing',
    targetGoal: '₹20,000 / mo',
    focus: 'Secure verified remote internships & initial freelance contracts',
    recommendedTool: { name: 'Freelance Rate Calc', href: '/tools/freelance-calculator' },
    keyMilestone: 'First Paid Client Delivery',
  },
  final: {
    title: 'Final Year',
    badge: 'Career Placement & Scale',
    targetGoal: '₹45,000+ / mo',
    focus: 'Convert internships into full-time roles or scalable freelance agency',
    recommendedTool: { name: 'Career Playbook', href: '/career' },
    keyMilestone: 'Verified Job Offer or Sustained Agency Income',
  },
  freelance: {
    title: 'Self-Taught',
    badge: 'Independent Earner',
    targetGoal: '₹35,000 / mo',
    focus: 'Direct client acquisition, cold outreach & high-ticket proposals',
    recommendedTool: { name: 'Income Planner', href: '/tools/income-goal-calculator' },
    keyMilestone: 'Recurring Retainer Clients',
  },
};

export default function HeroBento() {
  const [activeStage, setActiveStage] = useState<StudentStage>('junior');
  const [weeklyHours, setWeeklyHours] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(650);

  const stage = STAGES[activeStage];
  const estimatedMonthlyEarnings = weeklyHours * hourlyRate * 4;

  return (
    <div className="w-full max-w-[560px] mx-auto flex flex-col gap-3.5">
      {/* ── Top Bento Card: Interactive Stage Selector ──────────── */}
      <div className="bento-card p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="live-pulse-dot" />
            <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--color-muted)] font-[var(--font-display)]">
              Interactive Path Selector
            </span>
          </div>
          <span className="tech-tag text-[var(--color-tech)] font-bold">
            {stage.badge}
          </span>
        </div>

        {/* Stage Toggle Pills */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/[0.04] dark:bg-white/[0.04] rounded-xl mb-4">
          {(Object.keys(STAGES) as StudentStage[]).map((key) => {
            const isSelected = activeStage === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveStage(key)}
                className={`py-1.5 px-1 text-[0.73rem] font-bold rounded-lg transition-all text-center truncate ${
                  isSelected
                    ? 'bg-white dark:bg-neutral-800 text-[var(--color-ink)] shadow-sm'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                {STAGES[key].title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Stage Details */}
        <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05]">
          <div>
            <p className="text-[0.72rem] uppercase font-bold text-[var(--color-muted)] mb-0.5">
              Target Trajectory
            </p>
            <p className="text-[0.85rem] font-medium text-[var(--color-ink)] leading-snug">
              {stage.focus}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[0.7rem] uppercase font-bold text-[var(--color-muted)] mb-0.5">
              Goal Benchmark
            </p>
            <p className="text-[1.05rem] font-bold text-[var(--color-tech)] font-[var(--font-display)]">
              {stage.targetGoal}
            </p>
          </div>
        </div>
      </div>

      {/* ── Middle Bento Grid: 2 Asymmetrical Cards ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card A: Interactive Live Earning Slider */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--color-muted)] flex items-center gap-1.5">
                <Calculator size={13} className="text-[var(--color-tech)]" />
                Live Calculator
              </span>
              <span className="text-[0.68rem] text-[var(--color-muted)] font-mono">
                {weeklyHours} hrs/wk
              </span>
            </div>

            {/* Slider */}
            <div className="mb-3">
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
                className="w-full accent-[var(--color-tech)] cursor-pointer h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none"
                aria-label="Weekly available hours"
              />
            </div>

            {/* Rate toggle pills */}
            <div className="flex items-center gap-1 mb-4">
              {[
                { label: '₹400/h', rate: 400 },
                { label: '₹650/h', rate: 650 },
                { label: '₹1,200/h', rate: 1200 },
              ].map((item) => (
                <button
                  key={item.rate}
                  type="button"
                  onClick={() => setHourlyRate(item.rate)}
                  className={`flex-1 py-1 text-[0.68rem] font-bold rounded-md transition-all ${
                    hourlyRate === item.rate
                      ? 'bg-[var(--color-ink)] text-[var(--color-offwhite)] shadow-xs'
                      : 'bg-black/[0.04] dark:bg-white/[0.05] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] text-[var(--color-muted)] uppercase font-semibold">
                Est. Monthly
              </p>
              <p className="text-[1.1rem] font-bold text-[var(--color-ink)] font-[var(--font-display)]">
                ₹{estimatedMonthlyEarnings.toLocaleString('en-IN')}
              </p>
            </div>
            <Link
              href="/tools/freelance-calculator"
              className="text-[0.72rem] font-bold text-[var(--color-tech)] hover:underline flex items-center gap-1"
            >
              Full Tool
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* Card B: Live Opportunity Radar */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--color-muted)] flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#10b981]" />
                Verified Radar
              </span>
              <span className="text-[0.68rem] font-bold text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.05]">
                <div className="flex items-center justify-between text-[0.78rem] font-bold text-[var(--color-ink)]">
                  <span>Google Summer of Code</span>
                  <span className="text-[0.68rem] text-[var(--color-tech)] font-mono">$1,500+</span>
                </div>
                <p className="text-[0.68rem] text-[var(--color-muted)] truncate">Open Source Stipend • Global</p>
              </div>

              <div className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.05]">
                <div className="flex items-center justify-between text-[0.78rem] font-bold text-[var(--color-ink)]">
                  <span>Smart India Hackathon</span>
                  <span className="text-[0.68rem] text-[#10b981] font-mono">₹1,00,000</span>
                </div>
                <p className="text-[0.68rem] text-[var(--color-muted)] truncate">National Innovation Challenge</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between">
            <span className="text-[0.7rem] text-[var(--color-muted)] flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#10b981]" />
              Official sources only
            </span>
            <Link
              href="/opportunities"
              className="text-[0.72rem] font-bold text-[var(--color-tech)] hover:underline flex items-center gap-1"
            >
              Explore
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom Micro-Ticker: Quick Trust Highlights ─────────── */}
      <div className="bento-card px-4 py-2.5 flex items-center justify-between text-[0.75rem] text-[var(--color-muted)]">
        <span className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-[var(--color-money-dark)]" />
          <span>Curated for Indian college students</span>
        </span>
        <span className="font-semibold text-[var(--color-ink)]">
          100% Free Open Tools
        </span>
      </div>
    </div>
  );
}
