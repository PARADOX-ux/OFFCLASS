'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Palette,
  Code2,
  Video,
  PenTool,
  BarChart3,
  Megaphone,
  Brain,
  Camera,
  Clock,
  Star,
  Zap,
  ChevronRight,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import SaveButton from '@/components/SaveButton';
import { demoSkills } from '@/lib/data';

const skillIcons: Record<string, React.ReactNode> = {
  Palette: <Palette size={24} />,
  Code2: <Code2 size={24} />,
  Video: <Video size={24} />,
  PenTool: <PenTool size={24} />,
  BarChart3: <BarChart3 size={24} />,
  Megaphone: <Megaphone size={24} />,
  Brain: <Brain size={24} />,
  Camera: <Camera size={24} />,
};

const categories = ['All', 'Tech', 'Design', 'Creative', 'Writing', 'Business'];

const difficultyColors: Record<string, string> = {
  beginner: 'text-[#16a34a] bg-[rgba(34,197,94,0.1)]',
  intermediate: 'text-[var(--color-tech)] bg-[rgba(49,87,213,0.1)]',
  advanced: 'text-[#b45309] bg-[rgba(234,179,8,0.1)]',
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? demoSkills
    : demoSkills.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-offwhite)] relative overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[var(--color-tech)] opacity-[0.04] blur-[80px]" />

        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <RevealSection>
            <p className="section-label">Skills</p>
            <h1 className="text-display-lg mb-6 max-w-[600px]">
              Become useful. Become capable.
            </h1>
            <p className="text-body-lg text-[var(--color-muted)] mb-8 max-w-[520px]">
              Explore practical, market-ready skills. Each one comes with a learning path,
              project ideas, and ways to turn it into income or career opportunities.
            </p>
          </RevealSection>

          {/* Learning Framework */}
          <RevealSection delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mt-8">
              {['Learn', 'Practice', 'Build', 'Prove', 'Earn'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="text-[0.8rem] font-bold font-[var(--font-display)] px-3 py-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)]">
                    {step}
                  </span>
                  {i < 4 && <ChevronRight size={14} className="text-[var(--color-muted)]" />}
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          {/* Category Filter */}
          <RevealSection>
            <div className="flex flex-wrap gap-2 mb-10">
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

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((skill, i) => (
              <RevealSection key={skill.id} delay={i * 0.06}>
                <div className="card h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)] flex items-center justify-center text-[var(--color-ink)] flex-shrink-0">
                      {(skill.iconName && skillIcons[skill.iconName]) || <Zap size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[1.15rem] font-bold font-[var(--font-display)]">
                            {skill.title}
                          </h3>
                          <span className={`text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded ${difficultyColors[skill.difficulty]}`}>
                            {skill.difficulty}
                          </span>
                          <span className="badge badge-demo">Demo</span>
                        </div>
                        <SaveButton itemId={skill.id} itemType="skill" />
                      </div>
                      <p className="text-[0.85rem] text-[var(--color-muted)]">
                        {skill.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed mb-4">
                    {skill.summary}
                  </p>

                  <div className="flex items-center gap-4 text-[0.8rem] text-[var(--color-muted)] mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      ~{skill.learningTimeWeeks} weeks
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {skill.careerApplications.length} career paths
                    </span>
                  </div>

                  {/* Expandable details */}
                  <button
                    onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                    className="text-[0.85rem] font-semibold text-[var(--color-tech)] hover:text-[var(--color-tech-light)] transition-colors flex items-center gap-1"
                    aria-expanded={expandedSkill === skill.id}
                  >
                    {expandedSkill === skill.id ? 'Show less' : 'View details'}
                    <ChevronRight size={14} className={`transition-transform ${expandedSkill === skill.id ? 'rotate-90' : ''}`} />
                  </button>

                  {expandedSkill === skill.id && (
                    <div className="mt-4 pt-4 border-t border-[var(--color-border)] space-y-4 animate-[fade-in_0.3s_ease]">
                      <div>
                        <h4 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] mb-2">
                          Beginner Project
                        </h4>
                        <p className="text-[0.85rem] text-[var(--color-ink)]">{skill.beginnerProject}</p>
                      </div>
                      <div>
                        <h4 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] mb-2">
                          Portfolio Project
                        </h4>
                        <p className="text-[0.85rem] text-[var(--color-ink)]">{skill.portfolioProject}</p>
                      </div>
                      <div>
                        <h4 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] mb-2">
                          Ways to Monetize
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.monetizationPotential.map((m) => (
                            <span key={m} className="pill pill-money text-[0.72rem] py-1 px-2.5">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] mb-2">
                          Career Applications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.careerApplications.map((c) => (
                            <span key={c} className="pill pill-tech text-[0.72rem] py-1 px-2.5">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        href="/tools#skill-quiz"
                        className="btn btn-primary btn-sm mt-2"
                      >
                        Build this skill
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--color-muted)] text-[1rem] mb-2">No skills found in this category.</p>
              <button onClick={() => setActiveCategory('All')} className="text-[var(--color-tech)] font-semibold text-[0.9rem]">
                View all skills
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-ink)] text-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6 text-center">
          <RevealSection>
            <h2 className="text-display-sm mb-4">
              Not sure what to learn?
            </h2>
            <p className="text-[0.95rem] text-[var(--color-muted-light)] mb-8 max-w-[400px] mx-auto">
              Take our quick quiz to get personalized skill recommendations based on your interests and goals.
            </p>
            <Link href="/tools#skill-quiz" className="btn btn-accent">
              Take the Skill Quiz
              <ArrowRight size={14} />
            </Link>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
