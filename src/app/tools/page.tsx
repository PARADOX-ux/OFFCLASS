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
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import SpotlightCard from '@/components/SpotlightCard';
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
  ComparePathsTool
} from '@/components/tools';

const toolIcons: Record<string, React.ReactNode> = {
  Calculator: <Calculator size={22} />,
  PiggyBank: <IndianRupee size={22} />,
  IndianRupee: <IndianRupee size={22} />,
  Target: <Target size={22} />,
  ClipboardCheck: <ClipboardCheck size={22} />,
  HelpCircle: <Lightbulb size={22} />,
  Lightbulb: <Lightbulb size={22} />,
  ListChecks: <ListChecks size={22} />,
  Clock: <Clock size={22} />,
};

// ============================================================
// TOOLS PAGE
// ============================================================

export default function ToolsPage() {
  const categories = ['All', 'Money', 'Career', 'Skills', 'Life'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedToolId, setSelectedToolId] = useState<string>('tool-compare-paths');

  const filteredTools = activeCategory === 'All'
    ? demoTools
    : demoTools.filter((t) => t.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Tools</p>
            <h1 className="text-display-lg mb-6 max-w-[600px]">
              Useful tools, not decorative features.
            </h1>
            <p className="text-body-lg text-[var(--color-muted)] mb-8 max-w-[520px]">
              Interactive calculators, quizzes, checklists, and planners designed for real
              student problems. Every tool here actually works.
            </p>
          </RevealSection>
        </div>
      </section>



      {/* Tool Directory */}
      <section className="py-10 bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pill ${activeCategory === cat ? 'pill-default active' : 'pill-default'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {filteredTools.map((tool, i) => (
              <RevealSection key={tool.id} delay={i * 0.04}>
                <SpotlightCard className="h-full border-none shadow-[var(--shadow-sm)] hover:-translate-y-[2px] transition-transform duration-300">
                  <button
                    onClick={(e) => {
                      if (tool.status === 'published') {
                        e.preventDefault();
                        setSelectedToolId(tool.id);
                        document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`flex items-start text-left gap-4 h-full p-6 w-full ${tool.status === 'coming_soon' ? 'opacity-60 cursor-default' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--color-offwhite-dark)] flex items-center justify-center text-[var(--color-ink)] flex-shrink-0">
                      {toolIcons[tool.iconName] || <Calculator size={22} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[0.95rem] font-bold font-[var(--font-display)]">{tool.name}</h3>
                        {tool.status === 'coming_soon' && <span className="badge badge-coming-soon">Coming Soon</span>}
                      </div>
                      <p className="text-[0.82rem] text-[var(--color-muted)]">{tool.description}</p>
                    </div>
                  </button>
                </SpotlightCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Workspace */}
      <section id="interactive-workspace" className="section bg-[var(--color-offwhite)] min-h-[60vh]">
        <div className="container mx-auto max-w-[900px] px-6">
          <RevealSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="section-label">Interactive Workspace</p>
                <h2 className="text-display-sm">
                  {demoTools.find(t => t.id === selectedToolId)?.name || 'Compare Career Paths'}
                </h2>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="bg-[var(--color-surface)] p-1 rounded-2xl shadow-sm border border-[var(--color-border)]">
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
              
              {(!selectedToolId || !['tool-internship-tracker', 'tool-time-planner', 'tool-income-goal', 'tool-resume-checklist', 'tool-skill-quiz', 'tool-earn-quiz', 'tool-budget', 'tool-freelance-pricing', 'tool-savings', 'tool-compare-paths'].includes(selectedToolId)) && (
                <ComparePathsTool />
              )}
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
