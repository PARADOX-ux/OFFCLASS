'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowDown,
  IndianRupee,
  Zap,
  Briefcase,
  GraduationCap,
  Compass,
  Calculator,
  Target,
  ClipboardCheck,
  Lightbulb,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import HeroPreview from '@/components/HeroPreview';
import { pillars, studentJourney, demoOpportunities, demoTools } from '@/lib/data';

const pillarIcons: Record<string, React.ReactNode> = {
  IndianRupee: <IndianRupee size={24} />,
  Zap: <Zap size={24} />,
  Briefcase: <Briefcase size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  Compass: <Compass size={24} />,
};

const toolIcons: Record<string, React.ReactNode> = {
  Calculator: <Calculator size={20} />,
  PiggyBank: <IndianRupee size={20} />,
  IndianRupee: <IndianRupee size={20} />,
  Target: <Target size={20} />,
  ClipboardCheck: <ClipboardCheck size={20} />,
  HelpCircle: <Lightbulb size={20} />,
  Lightbulb: <Lightbulb size={20} />,
};

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          SECTION 1: HERO
          ============================================================ */}
      <section className="relative min-h-[90vh] flex items-center bg-[var(--color-offwhite)] overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Accent orb */}
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--color-money)] opacity-[0.06] blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-[var(--color-tech)] opacity-[0.05] blur-[80px]" />

        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <div className="max-w-[800px]">
            <RevealSection>
              <div className="flex items-center gap-3 mb-8">
                <span className="pill pill-money text-[0.75rem]">
                  <Sparkles size={12} />
                  For students, by design
                </span>
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="text-display-xl font-bold text-[var(--color-ink)] mb-6">
                Build your life<br />
                <span className="relative inline-block">
                  beyond the classroom
                  <svg className="absolute -bottom-2 left-[5%] w-[90%]" viewBox="0 0 400 12" fill="none">
                    <path d="M2 8 C100 2, 300 2, 398 8" stroke="var(--color-money)" strokeWidth="4" strokeLinecap="round" className="animate-draw-line" />
                  </svg>
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-body-lg text-[var(--color-muted)] max-w-[560px] mb-10">
                OFFCLASS helps students learn useful skills, find opportunities,
                earn money, build careers, and navigate college — all in one place.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <div className="flex flex-col gap-4">
                <p className="font-bold text-[1.05rem] text-[var(--color-ink)] mb-1">
                  Don't know what to do next? Start here.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/money" className="btn btn-accent btn-lg text-[0.95rem]">
                    💰 I want to earn
                  </Link>
                  <Link href="/skills" className="btn btn-primary btn-lg text-[0.95rem]">
                    🧠 I want to build a skill
                  </Link>
                  <Link href="/career" className="btn btn-outline btn-lg text-[0.95rem] bg-white hover:bg-gray-50">
                    🚀 I want to build my career
                  </Link>
                </div>
              </div>
            </RevealSection>

            {/* Mini stats — NOT fake user counts */}
            <RevealSection delay={0.4}>
              <div className="mt-14 flex flex-wrap gap-8">
                {[
                  { label: 'Core Pillars', value: '5' },
                  { label: 'Interactive Tools', value: '9+' },
                  { label: 'Career Paths', value: '8' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[1.5rem] font-bold font-[var(--font-display)] text-[var(--color-ink)]">
                      {stat.value}
                    </p>
                    <p className="text-[0.8rem] text-[var(--color-muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>

          {/* Right side — Dynamic UI Preview */}
          <div className="hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 w-[550px] items-center justify-center">
            <RevealSection delay={0.3}>
              <HeroPreview />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: THE GAP
          ============================================================ */}
      <section className="section bg-[var(--color-ink)] text-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label text-[var(--color-money)]">The Reality</p>
            <h2 className="text-display-md mb-12 max-w-[600px]">
              College is only part of the journey.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <RevealSection delay={0.1}>
              <div>
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-6">
                  What college teaches
                </h3>
                <div className="space-y-3">
                  {['Classes & lectures', 'Exams & grades', 'Assignments & projects', 'Theory & concepts', 'Degree & certificate'].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.06)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)]" />
                      <span className="text-[var(--color-muted-light)] text-[0.95rem]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div>
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--color-money)] mb-6">
                  What real life requires
                </h3>
                <div className="space-y-3">
                  {['Money & financial literacy', 'Practical skills & portfolio', 'Internships & experience', 'Career building & networking', 'Independence & decision making'].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.06)]">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-money)]" />
                      <span className="text-[var(--color-offwhite)] font-medium text-[0.95rem]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>

          <RevealSection delay={0.3}>
            <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-[1.25rem] text-[var(--color-muted-light)] max-w-[600px] leading-relaxed">
                College gives students a degree.
                <br />
                <span className="text-[var(--color-offwhite)] font-semibold">
                  OFFCLASS helps them build a life.
                </span>
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: FIVE PILLARS
          ============================================================ */}
      <section id="pillars" className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Five Pillars</p>
            <h2 className="text-display-md mb-4 max-w-[500px]">
              Everything students need. One platform.
            </h2>
            <p className="text-body-lg text-[var(--color-muted)] mb-14 max-w-[500px]">
              Each pillar addresses a real part of student life that traditional education doesn&apos;t fully cover.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <RevealSection key={pillar.id} delay={i * 0.08}>
                <Link href={pillar.href} className="block group">
                  <div className="card h-full hover:border-[var(--color-ink)] flex flex-col">
                    <div
                      className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: pillar.color === '#B7F34A' ? 'rgba(183,243,74,0.15)' : pillar.color === '#3157D5' ? 'rgba(49,87,213,0.1)' : 'rgba(0,0,0,0.06)',
                        color: pillar.color,
                      }}
                    >
                      {pillarIcons[pillar.iconName]}
                    </div>
                    <h3 className="text-[1.3rem] font-bold font-[var(--font-display)] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-[0.8rem] text-[var(--color-tech)] font-semibold font-[var(--font-display)] mb-3">
                      {pillar.tagline}
                    </p>
                    <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed mb-5 flex-1">
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {pillar.features.map((f) => (
                        <span key={f} className="text-[0.72rem] bg-[var(--color-offwhite-dark)] text-[var(--color-muted)] px-2.5 py-1 rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[0.85rem] font-semibold text-[var(--color-ink)] group-hover:gap-2 transition-all">
                      Explore {pillar.title}
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: THE OFFCLASS JOURNEY
          ============================================================ */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">The Journey</p>
            <h2 className="text-display-md mb-4 max-w-[500px]">
              From confusion to independence.
            </h2>
            <p className="text-body-lg text-[var(--color-muted)] mb-14 max-w-[520px]">
              Every feature in OFFCLASS maps to a stage in the student journey.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentJourney.map((step, i) => (
              <RevealSection key={step.stage} delay={i * 0.08}>
                <div className="card group cursor-default">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[0.65rem] font-bold font-[var(--font-display)] uppercase tracking-[0.1em] px-2.5 py-1 rounded-md"
                      style={{
                        backgroundColor: step.color === '#111111' ? 'var(--color-ink)' : step.color === '#B7F34A' ? 'var(--color-money)' : step.color === '#3157D5' ? 'var(--color-tech)' : 'var(--color-offwhite-dark)',
                        color: step.color === '#111111' || step.color === '#3157D5' ? 'white' : step.color === '#8E8E8E' ? 'var(--color-ink)' : 'var(--color-ink)',
                      }}
                    >
                      {step.stage}
                    </span>
                    {i < studentJourney.length - 1 && (
                      <ChevronRight size={14} className="text-[var(--color-muted-light)] hidden sm:block" />
                    )}
                  </div>
                  <p className="text-[1rem] font-semibold font-[var(--font-display)] text-[var(--color-ink)] mb-2 leading-snug">
                    &ldquo;{step.question}&rdquo;
                  </p>
                  <p className="text-[0.85rem] text-[var(--color-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: MONEY-FIRST CTA
          ============================================================ */}
      <section className="section bg-[var(--color-ink)] text-[var(--color-offwhite)] relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--color-money)] opacity-[0.05] blur-[120px]" />

        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <div>
                <p className="section-label text-[var(--color-money)]">Your First Step</p>
                <h2 className="text-display-md mb-6">
                  Want to make your first{' '}
                  <span className="text-[var(--color-money)]">₹1,000</span>?
                </h2>
                <p className="text-body-lg text-[var(--color-muted-light)] mb-8 max-w-[440px]">
                  A practical roadmap that helps you identify your existing skills,
                  find realistic opportunities, and make your first income as a student.
                </p>
                <p className="text-[0.8rem] text-[var(--color-muted)] mb-8">
                  Note: This is an educational tool. Earning outcomes vary and are never guaranteed.
                </p>
                <Link href="/money" className="btn btn-accent btn-lg">
                  Build My Earning Route
                  <ArrowRight size={18} />
                </Link>
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div className="space-y-4">
                {[
                  { step: '01', text: 'Identify your existing skills' },
                  { step: '02', text: 'Choose a realistic earning path' },
                  { step: '03', text: 'Build proof of your abilities' },
                  { step: '04', text: 'Create a basic portfolio' },
                  { step: '05', text: 'Find prospects or opportunities' },
                  { step: '06', text: 'Make your first offer' },
                  { step: '07', text: 'Earn your first ₹1,000' },
                  { step: '08', text: 'Repeat, improve, scale' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-4 p-4 rounded-[var(--radius-md)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(183,243,74,0.2)] transition-colors group"
                  >
                    <span className="text-[0.7rem] font-bold font-[var(--font-display)] text-[var(--color-money)] w-7">
                      {item.step}
                    </span>
                    <span className="text-[0.95rem] text-[var(--color-muted-light)] group-hover:text-[var(--color-offwhite)] transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: TOOLS PREVIEW
          ============================================================ */}
      <section className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Student Tools</p>
            <h2 className="text-display-md mb-4 max-w-[500px]">
              Useful tools, not decorative features.
            </h2>
            <p className="text-body-lg text-[var(--color-muted)] mb-14 max-w-[500px]">
              Interactive calculators and planners designed for real student problems.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {demoTools.filter(t => t.status === 'published').slice(0, 6).map((tool, i) => (
              <RevealSection key={tool.id} delay={i * 0.06}>
                <Link href={tool.route} className="block group">
                  <div className="card h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--color-offwhite-dark)] flex items-center justify-center text-[var(--color-ink)] group-hover:bg-[var(--color-tech)] group-hover:text-white transition-all">
                        {toolIcons[tool.iconName] || <Calculator size={20} />}
                      </div>
                      <span className="text-[0.7rem] text-[var(--color-muted)] font-medium">
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="text-[1rem] font-bold font-[var(--font-display)] mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-[0.85rem] text-[var(--color-muted)] leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={0.4}>
            <div className="mt-10 text-center">
              <Link href="/tools" className="btn btn-outline">
                View all tools
                <ArrowRight size={14} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: OPPORTUNITIES PREVIEW
          ============================================================ */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <div className="flex items-start justify-between flex-wrap gap-4 mb-14">
              <div>
                <p className="section-label">Opportunities</p>
                <h2 className="text-display-md max-w-[500px]">
                  Find what&apos;s out there for you.
                </h2>
              </div>
              <Link href="/opportunities" className="btn btn-outline btn-sm mt-2">
                Browse all
                <ArrowRight size={14} />
              </Link>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {demoOpportunities.slice(0, 6).map((opp, i) => (
              <RevealSection key={opp.id} delay={i * 0.06}>
                <div className="card h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="pill pill-default text-[0.7rem] py-1 px-2.5">
                      {opp.type.replace('_', ' ')}
                    </span>
                    <span className="badge badge-demo">Demo</span>
                  </div>
                  <h3 className="text-[1rem] font-bold font-[var(--font-display)] mb-1">
                    {opp.title}
                  </h3>
                  <p className="text-[0.8rem] text-[var(--color-muted)] mb-1">
                    {opp.organization}
                  </p>
                  <p className="text-[0.85rem] text-[var(--color-muted)] leading-relaxed mb-4 flex-1">
                    {opp.summary}
                  </p>
                  <div className="flex items-center justify-between text-[0.8rem]">
                    <span className="text-[var(--color-muted)]">
                      📍 {opp.location}
                    </span>
                    {opp.compensation && (
                      <span className="text-[var(--color-tech)] font-semibold">
                        {opp.compensation}
                      </span>
                    )}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8: JOURNEY BY YEAR
          ============================================================ */}
      <section className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Your Timeline</p>
            <h2 className="text-display-md mb-14 max-w-[500px]">
              OFFCLASS grows with you.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                year: 'Year 1',
                question: 'What do I even do?',
                focus: ['Explore skills & interests', 'Learn budgeting basics', 'Join campus clubs', 'Start building habits'],
                color: 'var(--color-muted)',
              },
              {
                year: 'Year 2',
                question: 'What should I learn?',
                focus: ['Pick a skill to develop', 'Start a project', 'Explore earning options', 'Build first portfolio piece'],
                color: 'var(--color-tech)',
              },
              {
                year: 'Year 3',
                question: 'How do I get experience?',
                focus: ['Apply for internships', 'Freelance or work part-time', 'Grow your portfolio', 'Network in your field'],
                color: 'var(--color-tech)',
              },
              {
                year: 'Final Year',
                question: 'How do I launch my career?',
                focus: ['Prepare for interviews', 'Polish your resume', 'Apply to jobs/programs', 'Plan your next steps'],
                color: 'var(--color-ink)',
              },
            ].map((y, i) => (
              <RevealSection key={y.year} delay={i * 0.1}>
                <div className="card h-full">
                  <span
                    className="text-[0.65rem] font-bold font-[var(--font-display)] uppercase tracking-[0.1em] px-2.5 py-1 rounded-md inline-block mb-4"
                    style={{
                      backgroundColor: y.color === 'var(--color-ink)' ? 'var(--color-ink)' : y.color === 'var(--color-tech)' ? 'rgba(49,87,213,0.1)' : 'var(--color-offwhite-dark)',
                      color: y.color === 'var(--color-ink)' ? 'white' : y.color === 'var(--color-tech)' ? 'var(--color-tech)' : 'var(--color-ink)',
                    }}
                  >
                    {y.year}
                  </span>
                  <p className="text-[1.05rem] font-semibold font-[var(--font-display)] text-[var(--color-ink)] mb-4">
                    &ldquo;{y.question}&rdquo;
                  </p>
                  <div className="space-y-2.5">
                    {y.focus.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="text-[var(--color-tech)] mt-0.5 flex-shrink-0" />
                        <span className="text-[0.85rem] text-[var(--color-muted)]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 9: WHY OFFCLASS
          ============================================================ */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Why OFFCLASS</p>
            <h2 className="text-display-md mb-14 max-w-[500px]">
              Built around real student problems.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Practical, not theoretical',
                description: 'Every feature exists to help students take action — not just consume content.',
              },
              {
                title: 'Opportunity-focused',
                description: 'We connect students to real opportunities — internships, gigs, scholarships, and more.',
              },
              {
                title: 'Built for the full journey',
                description: 'From Year 1 to graduation and beyond. OFFCLASS evolves as you do.',
              },
              {
                title: 'No fake promises',
                description: 'We don\'t guarantee income, jobs, or success. We provide tools, knowledge, and honest guidance.',
              },
              {
                title: 'More than just academics',
                description: 'Skills, money, career, campus life, and independence — all in one platform.',
              },
              {
                title: 'Designed to evolve',
                description: 'OFFCLASS will keep growing with new tools, features, and opportunities.',
              },
            ].map((item, i) => (
              <RevealSection key={item.title} delay={i * 0.06}>
                <div className="card-flat p-7 rounded-[var(--radius-lg)] h-full">
                  <h3 className="text-[1.05rem] font-bold font-[var(--font-display)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 10: FINAL CTA
          ============================================================ */}
      <section className="section bg-[var(--color-ink)] text-[var(--color-offwhite)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle, var(--color-offwhite) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div className="container mx-auto max-w-[1320px] px-6 text-center relative z-10">
          <RevealSection>
            <h2 className="text-display-lg mb-6 max-w-[600px] mx-auto">
              Your degree is only one part of the story.
            </h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <p className="text-body-lg text-[var(--color-muted-light)] mb-10 max-w-[480px] mx-auto">
              Don&apos;t just graduate. Build the skills, income, experience, and independence you need for what comes next.
            </p>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/money" className="btn btn-accent btn-lg">
                Start Building
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn btn-outline btn-lg border-[rgba(255,255,255,0.15)] text-[var(--color-offwhite)] hover:bg-[var(--color-offwhite)] hover:text-[var(--color-ink)]">
                Learn more about OFFCLASS
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
