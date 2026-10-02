'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  MessageSquare,
  Users,
  Shield,
  FolderOpen,
  Home,
  GitBranch,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { lifeCategories } from '@/lib/data';

const lifeIcons: Record<string, React.ReactNode> = {
  Zap: <Zap size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Users: <Users size={24} />,
  Shield: <Shield size={24} />,
  FolderOpen: <FolderOpen size={24} />,
  Home: <Home size={24} />,
  GitBranch: <GitBranch size={24} />,
  UserCheck: <UserCheck size={24} />,
};

export default function LifePage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Life</p>
            <h1 className="text-display-lg mb-6 max-w-[600px]">
              Become capable. Not just qualified.
            </h1>
            <p className="text-body-lg text-[var(--color-muted)] mb-8 max-w-[520px]">
              The skills nobody teaches in college — productivity, communication, networking,
              decision making, and the practical stuff that makes you independent.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Life Categories Grid */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Practical Independence</p>
            <h2 className="text-display-sm mb-12">
              What can I actually do with this?
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lifeCategories.map((cat, i) => (
              <RevealSection key={cat.title} delay={i * 0.06}>
                <div className="card h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)] flex items-center justify-center text-[var(--color-ink)] flex-shrink-0">
                      {lifeIcons[cat.iconName] || <Zap size={24} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[1.15rem] font-bold font-[var(--font-display)] mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-[0.85rem] text-[var(--color-muted)] leading-relaxed mb-4">
                        {cat.description}
                      </p>

                      {/* Actionable */}
                      <div className="p-3 bg-[rgba(183,243,74,0.08)] rounded-[var(--radius-sm)] mb-4">
                        <p className="text-[0.8rem] text-[#5a7a1a] font-medium">
                          💡 {cat.actionable}
                        </p>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1.5">
                        {cat.topics.map((t) => (
                          <span key={t} className="text-[0.72rem] bg-[var(--color-offwhite-dark)] text-[var(--color-muted)] px-2.5 py-1 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Key Principle */}
      <section className="section bg-[var(--color-ink)] text-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6 text-center">
          <RevealSection>
            <h2 className="text-display-md mb-6 max-w-[500px] mx-auto">
              Everything here is practical. Not self-help fluff.
            </h2>
            <p className="text-body-lg text-[var(--color-muted-light)] mb-4 max-w-[480px] mx-auto">
              Every topic answers one question: &ldquo;What can I actually do with this today?&rdquo;
            </p>
            <p className="text-[0.8rem] text-[var(--color-muted)] mb-10">
              More practical guides and interactive tools coming soon.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/skills" className="btn btn-accent">
                Explore Skills
                <ArrowRight size={14} />
              </Link>
              <Link href="/tools" className="btn btn-outline border-[rgba(255,255,255,0.15)] text-[var(--color-offwhite)] hover:bg-[var(--color-offwhite)] hover:text-[var(--color-ink)]">
                Use Tools
                <ArrowRight size={14} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
