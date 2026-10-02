import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About OFFCLASS — Why We Exist',
  description: 'OFFCLASS exists because college teaches you how to graduate, but not how to build a life. We help students with money, skills, careers, campus life, and independence.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <p className="section-label">About</p>
          <h1 className="text-display-lg mb-6 max-w-[700px]">
            College gives students a degree.<br />
            <span className="text-[var(--color-tech)]">OFFCLASS helps them build a life.</span>
          </h1>
          <p className="text-body-lg text-[var(--color-muted)] max-w-[560px]">
            We exist because traditional education handles classes, exams, and grades — but
            students also need help with money, skills, careers, opportunities, and independence.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-display-sm mb-6">The problem we&apos;re solving.</h2>
              <p className="text-[0.95rem] text-[var(--color-muted)] leading-relaxed mb-6">
                Most students go through college focused entirely on their degree. But when they
                graduate, they realize the degree was only one part of becoming a capable adult.
              </p>
              <p className="text-[0.95rem] text-[var(--color-muted)] leading-relaxed mb-6">
                They needed to learn practical skills, manage money, find opportunities, build
                a portfolio, prepare for careers, and develop independence — but there was no
                single place that helped with all of this.
              </p>
              <p className="text-[0.95rem] text-[var(--color-ink)] font-semibold">
                OFFCLASS bridges the gap between college and real life.
              </p>
            </div>
            <div>
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] mb-6">
                What OFFCLASS Covers
              </h3>
              <div className="space-y-3">
                {[
                  'Money — earning, budgeting, financial literacy',
                  'Skills — practical, project-based, portfolio-ready',
                  'Career — paths, preparation, opportunities',
                  'Campus — events, clubs, scholarships, discounts',
                  'Life — productivity, communication, independence',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 py-2">
                    <CheckCircle2 size={16} className="text-[var(--color-tech)] mt-0.5 flex-shrink-0" />
                    <span className="text-[0.9rem] text-[var(--color-ink)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-20 bg-[var(--color-ink)] text-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-display-md mb-6 max-w-[600px] mx-auto">
            Our mission is simple.
          </h2>
          <p className="text-[1.15rem] text-[var(--color-muted-light)] mb-6 max-w-[500px] mx-auto leading-relaxed">
            Help every student make the most of their college years by giving them practical
            tools, knowledge, opportunities, and resources to build financial, professional,
            and personal independence.
          </p>
          <p className="text-[0.8rem] text-[var(--color-muted)]">
            We don&apos;t promise magic. We provide practical help.
          </p>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20 bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <h2 className="text-display-sm mb-12 text-center">
            The OFFCLASS Student Journey
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['START', 'LEARN', 'BUILD', 'EARN', 'LAUNCH', 'INDEPENDENCE'].map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="text-[0.85rem] font-bold font-[var(--font-display)] px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
                  {stage}
                </span>
                {i < 5 && <span className="text-[var(--color-muted)]">→</span>}
              </div>
            ))}
          </div>
          <p className="text-center text-[0.9rem] text-[var(--color-muted)] mt-8 max-w-[500px] mx-auto">
            Every feature, tool, and resource in OFFCLASS maps to a stage in this journey.
            The platform grows with the student.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <h2 className="text-display-sm mb-12 text-center">What we believe.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {[
              { title: 'Practical over theoretical', desc: 'Everything we build should help students take action — not just consume content.' },
              { title: 'Honest over impressive', desc: 'We don\'t fabricate statistics, promise income, or make claims we can\'t back up.' },
              { title: 'Inclusive over exclusive', desc: 'OFFCLASS is for all students — regardless of course, background, or location.' },
              { title: 'Action over consumption', desc: 'We design for doing, building, and earning — not endless scrolling.' },
              { title: 'Growth over perfection', desc: 'The platform will evolve. We build what\'s useful now and improve continuously.' },
              { title: 'Trust over hype', desc: 'We earn trust by being useful, not by making flashy promises.' },
            ].map((value) => (
              <div key={value.title} className="card-flat p-6 rounded-[var(--radius-lg)]">
                <h3 className="text-[1rem] font-bold font-[var(--font-display)] mb-2">{value.title}</h3>
                <p className="text-[0.85rem] text-[var(--color-muted)] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-display-sm mb-6">
            Start exploring OFFCLASS.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/money" className="btn btn-accent">
              Start with Money <ArrowRight size={14} />
            </Link>
            <Link href="/skills" className="btn btn-outline">
              Explore Skills <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
