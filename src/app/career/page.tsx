'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  Palette,
  Briefcase,
  TrendingUp,
  Film,
  Microscope,
  Rocket,
  Building2,
  CheckCircle2,
  FileText,
  Users,
  Globe,
  Award,
  Target,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { demoCareerPaths } from '@/lib/data';

const careerIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />,
  Palette: <Palette size={24} />,
  Briefcase: <Briefcase size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Film: <Film size={24} />,
  Microscope: <Microscope size={24} />,
  Rocket: <Rocket size={24} />,
  Building2: <Building2 size={24} />,
};

export default function CareerPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Career</p>
            <h1 className="text-display-lg mb-6 max-w-[600px]">
              Build before you apply.
            </h1>
            <p className="text-body-lg text-[var(--color-muted)] mb-8 max-w-[520px]">
              A career isn&apos;t just about landing a job. It&apos;s about becoming the kind
              of person who deserves one. Explore paths, build skills, and prepare for what comes next.
            </p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <p className="text-[1rem] font-semibold font-[var(--font-display)] text-[var(--color-ink)] mt-8 mb-4">
              &ldquo;What do I need to become before I apply?&rdquo;
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Career Directions */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Choose Your Direction</p>
            <h2 className="text-display-sm mb-12">
              Explore career paths.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {demoCareerPaths.map((path, i) => (
              <RevealSection key={path.id} delay={i * 0.05}>
                <button
                  onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
                  className={`card w-full text-left h-full transition-all ${
                    selectedPath === path.id ? 'border-[var(--color-tech)] shadow-[var(--shadow-md)]' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)] flex items-center justify-center mb-4 text-[var(--color-ink)]">
                    {(path.iconName && careerIcons[path.iconName]) || <Briefcase size={24} />}
                  </div>
                  <h3 className="text-[1.05rem] font-bold font-[var(--font-display)] mb-1">
                    {path.title}
                  </h3>
                  <p className="text-[0.82rem] text-[var(--color-muted)] leading-relaxed mb-3">
                    {path.summary}
                  </p>
                  <div className="flex items-center gap-3 text-[0.75rem]">
                    <span className={`font-semibold ${path.demandLevel === 'high' ? 'text-[#16a34a]' : path.demandLevel === 'growing' ? 'text-[var(--color-tech)]' : 'text-[var(--color-muted)]'}`}>
                      {path.demandLevel === 'high' ? '🔥 High demand' : path.demandLevel === 'growing' ? '📈 Growing' : '📊 Moderate'}
                    </span>
                  </div>
                  <span className="badge badge-demo mt-3">Demo</span>
                </button>
              </RevealSection>
            ))}
          </div>

          {/* Expanded Career Path */}
          {selectedPath && (() => {
            const path = demoCareerPaths.find((p) => p.id === selectedPath);
            if (!path) return null;
            return (
              <RevealSection>
                <div className="mt-8 card p-8 border-[var(--color-tech)]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-display-sm mb-4">{path.title}</h3>
                      <p className="text-[0.95rem] text-[var(--color-muted)] mb-6 leading-relaxed">
                        {path.summary}
                      </p>
                      <div className="mb-6">
                        <h4 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] mb-3">
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {path.skills.map((s) => (
                            <span key={s} className="pill pill-tech text-[0.75rem]">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-[0.85rem] text-[var(--color-muted)]">
                        <span className="font-semibold text-[var(--color-ink)]">Typical salary range:</span>{' '}
                        {path.avgSalaryRange}
                        <p className="text-[0.75rem] text-[var(--color-muted)] mt-1 italic">
                          Ranges are approximate and vary by location, experience, and company. Demo data.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] mb-3">
                        Steps to Get Started
                      </h4>
                      <div className="space-y-3">
                        {path.steps.map((step, j) => (
                          <div key={step} className="flex items-start gap-3">
                            <span className="text-[0.7rem] font-bold font-[var(--font-display)] text-[var(--color-tech)] mt-0.5 w-5">
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[0.9rem] text-[var(--color-ink)]">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            );
          })()}
        </div>
      </section>

      {/* Career Building Blocks */}
      <section className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Career Building Blocks</p>
            <h2 className="text-display-sm mb-12">
              What actually matters when building a career.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FileText size={24} />, title: 'Resume', desc: 'A clear, honest resume that shows what you can do — not just your degree.' },
              { icon: <Palette size={24} />, title: 'Portfolio', desc: 'Proof of your abilities through real projects, case studies, and work samples.' },
              { icon: <Users size={24} />, title: 'Networking', desc: 'Building genuine relationships with people in your field — not just collecting contacts.' },
              { icon: <Target size={24} />, title: 'Interviews', desc: 'The ability to communicate your value clearly and confidently.' },
              { icon: <Globe size={24} />, title: 'LinkedIn', desc: 'A professional online presence that represents your skills and ambitions.' },
              { icon: <Award size={24} />, title: 'Certifications', desc: 'Relevant credentials that validate your skills — when they add real value.' },
            ].map((block, i) => (
              <RevealSection key={block.title} delay={i * 0.06}>
                <div className="card h-full">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)] flex items-center justify-center mb-4 text-[var(--color-ink)]">
                    {block.icon}
                  </div>
                  <h3 className="text-[1.05rem] font-bold font-[var(--font-display)] mb-2">
                    {block.title}
                  </h3>
                  <p className="text-[0.85rem] text-[var(--color-muted)] leading-relaxed">
                    {block.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Career disclaimer + CTA */}
      <section className="py-20 bg-[var(--color-ink)] text-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6 text-center">
          <RevealSection>
            <p className="text-[0.8rem] text-[var(--color-muted)] mb-6">
              OFFCLASS does not guarantee jobs, salaries, or career outcomes. We provide tools and knowledge to help you prepare.
            </p>
            <h2 className="text-display-sm mb-6">
              Skills + Experience + Preparation = Opportunity
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/opportunities" className="btn btn-accent">
                Browse Opportunities
                <ArrowRight size={14} />
              </Link>
              <Link href="/tools#resume-checklist" className="btn btn-outline border-[rgba(255,255,255,0.15)] text-[var(--color-offwhite)] hover:bg-[var(--color-offwhite)] hover:text-[var(--color-ink)]">
                Resume Checklist
                <ArrowRight size={14} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
