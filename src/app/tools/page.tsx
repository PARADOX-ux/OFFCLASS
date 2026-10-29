'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Target,
  IndianRupee,
  ClipboardCheck,
  Lightbulb,
  ListChecks,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { demoTools } from '@/lib/data';
import {
  IncomeGoalPlanner,
  ResumeChecklist,
  SkillQuiz,
  EarnQuiz,
  InternshipTracker,
  TimePlanner,
  BudgetCalculator,
  SavingsCalculator,
  FreelancePricingCalculator,
  ComparePathsTool,
} from '@/components/tools';

const toolIcons: Record<string, React.ReactNode> = {
  Calculator: <Calculator size={20} />,
  PiggyBank: <IndianRupee size={20} />,
  IndianRupee: <IndianRupee size={20} />,
  Target: <Target size={20} />,
  ClipboardCheck: <ClipboardCheck size={20} />,
  HelpCircle: <Lightbulb size={20} />,
  Lightbulb: <Lightbulb size={20} />,
  ListChecks: <ListChecks size={20} />,
  Clock: <Clock size={20} />,
};

export default function ToolsPage() {
  const categories = ['All', 'Money', 'Career', 'Skills', 'Life'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedToolId, setSelectedToolId] = useState<string>('tool-freelance-pricing');

  const filteredTools =
    activeCategory === 'All'
      ? demoTools
      : demoTools.filter((t) => t.category === activeCategory);

  return (
    <>
      {/* ── Hero Section (Linear / Supabase Style) ─────────────── */}
      <section className="relative pt-28 pb-14 bg-[var(--color-offwhite)] dark:bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 linear-grid-mesh pointer-events-none" />
        <div className="absolute top-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-[var(--color-tech)] opacity-[0.06] dark:opacity-[0.09] blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <RevealSection>
            <div className="max-w-[700px]">
              <span className="tech-tag text-[var(--color-tech)] mb-4 inline-flex items-center gap-1.5">
                <span className="live-pulse-dot" />
                <span>Zero fluff • Functional interactive tools</span>
              </span>
              <h1 className="text-display-lg text-[var(--color-ink)] mb-4 font-bold">
                Tools Designed for Real Student Problems
              </h1>
              <p className="text-body-lg text-[var(--color-muted)] max-w-[560px]">
                Calculators, track planners, resume audits, and path analyzers that run in your browser with instant feedback.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Tool Directory (Bento Cards) ────────────────────────── */}
      <section className="py-12 bg-[var(--color-surface)] dark:bg-neutral-900 border-t border-black/[0.05] dark:border-white/[0.05]">
        <div className="container mx-auto max-w-[1320px] px-6">
          {/* Category Filter Pills */}
          <RevealSection>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[0.82rem] font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[var(--color-ink)] text-[var(--color-offwhite)] shadow-sm'
                      : 'bg-black/[0.04] dark:bg-white/[0.05] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealSection>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {filteredTools.map((tool, i) => {
              const isSelected = selectedToolId === tool.id;
              return (
                <RevealSection key={tool.id} delay={i * 0.04}>
                  <button
                    onClick={() => {
                      if (tool.status === 'published') {
                        setSelectedToolId(tool.id);
                        document
                          .getElementById('interactive-workspace')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`bento-card text-left p-5 w-full h-full flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-[var(--color-tech)] ring-2 ring-[var(--color-tech)]/20 shadow-md'
                        : 'hover:border-black/20 dark:hover:border-white/20'
                    } ${tool.status === 'coming_soon' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                            isSelected
                              ? 'bg-[var(--color-tech)] text-white'
                              : 'bg-black/[0.04] dark:bg-white/[0.06] text-[var(--color-ink)]'
                          }`}
                        >
                          {toolIcons[tool.iconName] || <Calculator size={20} />}
                        </div>
                        <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[var(--color-muted)] bg-black/[0.03] dark:bg-white/[0.05] px-2 py-0.5 rounded-md">
                          {tool.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-[0.98rem] font-bold font-[var(--font-display)] text-[var(--color-ink)]">
                          {tool.name}
                        </h3>
                        {tool.status === 'coming_soon' && (
                          <span className="badge badge-coming-soon text-[0.65rem]">Soon</span>
                        )}
                      </div>
                      <p className="text-[0.82rem] text-[var(--color-muted)] leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-[0.76rem]">
                      <span className="font-semibold text-[var(--color-tech)]">
                        {isSelected ? '✓ Open in Workspace' : 'Click to Load Tool'}
                      </span>
                      <ArrowRight size={13} className="text-[var(--color-tech)]" />
                    </div>
                  </button>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Interactive Tools Workspace ─────────────────────────── */}
      <section
        id="interactive-workspace"
        className="section bg-[var(--color-offwhite)] dark:bg-neutral-950 min-h-[70vh] border-t border-black/[0.05] dark:border-white/[0.05]"
      >
        <div className="container mx-auto max-w-[960px] px-6">
          <RevealSection>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.05] dark:border-white/[0.05]">
              <div>
                <span className="tech-tag text-[var(--color-tech)] mb-1">
                  Active Sandbox Workspace
                </span>
                <h2 className="text-display-sm text-[var(--color-ink)] font-bold">
                  {demoTools.find((t) => t.id === selectedToolId)?.name ||
                    'Freelance Pricing Calculator'}
                </h2>
              </div>
              <span className="text-[0.75rem] text-[var(--color-muted)] font-mono">
                Auto-saved locally
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="bento-card p-6 sm:p-8 bg-white dark:bg-neutral-900 shadow-xl">
              {selectedToolId === 'tool-internship-tracker' && <InternshipTracker />}
              {selectedToolId === 'tool-time-planner' && <TimePlanner />}
              {selectedToolId === 'tool-income-goal' && <IncomeGoalPlanner />}
              {selectedToolId === 'tool-resume-checklist' && <ResumeChecklist />}
              {selectedToolId === 'tool-skill-quiz' && <SkillQuiz />}
              {selectedToolId === 'tool-earn-quiz' && <EarnQuiz />}
              {selectedToolId === 'tool-budget' && <BudgetCalculator />}
              {selectedToolId === 'tool-freelance-pricing' && <FreelancePricingCalculator />}
              {selectedToolId === 'tool-savings' && <SavingsCalculator />}
              {selectedToolId === 'tool-compare-paths' && <ComparePathsTool />}

              {(!selectedToolId ||
                ![
                  'tool-internship-tracker',
                  'tool-time-planner',
                  'tool-income-goal',
                  'tool-resume-checklist',
                  'tool-skill-quiz',
                  'tool-earn-quiz',
                  'tool-budget',
                  'tool-freelance-pricing',
                  'tool-savings',
                  'tool-compare-paths',
                ].includes(selectedToolId)) && <FreelancePricingCalculator />}
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
