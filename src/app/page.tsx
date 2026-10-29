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
  XCircle,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import HeroBento from '@/components/HeroBento';
import { pillars, studentJourney, demoOpportunities, demoTools } from '@/lib/data';

const pillarIcons: Record<string, React.ReactNode> = {
  IndianRupee: <IndianRupee size={22} />,
  Zap: <Zap size={22} />,
  Briefcase: <Briefcase size={22} />,
  GraduationCap: <GraduationCap size={22} />,
  Compass: <Compass size={22} />,
};

const toolIcons: Record<string, React.ReactNode> = {
  Calculator: <Calculator size={18} />,
  PiggyBank: <IndianRupee size={18} />,
  IndianRupee: <IndianRupee size={18} />,
  Target: <Target size={18} />,
  ClipboardCheck: <ClipboardCheck size={18} />,
  HelpCircle: <Lightbulb size={18} />,
  Lightbulb: <Lightbulb size={18} />,
};

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          SECTION 1: HERO (Modern Tech Bento Showcase)
          ============================================================ */}
      <section className="relative min-h-[92vh] pt-28 pb-16 flex items-center bg-[var(--color-offwhite)] dark:bg-neutral-950 overflow-hidden">
        {/* Linear-style Grid Background & Ambient Spotlights */}
        <div className="absolute inset-0 linear-grid-mesh pointer-events-none" />
        <div className="absolute top-[10%] right-[10%] w-[550px] h-[550px] rounded-full bg-[var(--color-money)] opacity-[0.06] dark:opacity-[0.08] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[var(--color-tech)] opacity-[0.07] dark:opacity-[0.1] blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-6 xl:col-span-7 max-w-[700px]">
              <RevealSection>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] mb-6">
                  <span className="live-pulse-dot" />
                  <span className="text-[0.76rem] font-bold text-[var(--color-ink)]">
                    Engineered for ambitious college students
                  </span>
                </div>
              </RevealSection>

              <RevealSection delay={0.1}>
                <h1 className="text-display-xl font-bold text-[var(--color-ink)] mb-5">
                  Build your career{' '}
                  <span className="relative inline-block text-gradient">
                    beyond the classroom
                  </span>
                </h1>
              </RevealSection>

              <RevealSection delay={0.2}>
                <p className="text-body-lg text-[var(--color-muted)] max-w-[540px] mb-8 leading-relaxed">
                  Colleges teach theory. OFFCLASS equips you with high-value freelance skills, verified opportunities, income roadmaps, and career frameworks.
                </p>
              </RevealSection>

              {/* Action Buttons */}
              <RevealSection delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <Link
                    href="/money"
                    className="btn btn-accent btn-lg text-[0.92rem] shadow-sm rounded-xl px-6 py-3.5 font-bold flex items-center justify-center gap-2"
                  >
                    <span>⚡ Start Earning Roadmap</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/tools"
                    className="btn btn-outline btn-lg text-[0.92rem] rounded-xl px-5 py-3.5 font-semibold bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-800 flex items-center justify-center gap-2"
                  >
                    <Calculator size={16} className="text-[var(--color-tech)]" />
                    <span>Explore 9+ Tools</span>
                  </Link>
                </div>
              </RevealSection>

              {/* Mini Metrics Bento Badges */}
              <RevealSection delay={0.4}>
                <div className="grid grid-cols-3 gap-3 max-w-[480px]">
                  {[
                    { label: 'Core Pillars', value: '5 Pathways' },
                    { label: 'Interactive Tools', value: '9+ Calculators' },
                    { label: 'Verified Sources', value: '100% Curated' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05]"
                    >
                      <p className="text-[0.92rem] font-bold font-[var(--font-display)] text-[var(--color-ink)]">
                        {stat.value}
                      </p>
                      <p className="text-[0.72rem] text-[var(--color-muted)]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>

            {/* Right Hero Column: Interactive Tech Bento Showcase */}
            <div className="lg:col-span-6 xl:col-span-5 w-full flex justify-center">
              <RevealSection delay={0.2}>
                <HeroBento />
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: THE REALITY (High-Contrast Bento Comparison Matrix)
          ============================================================ */}
      <section className="section section-dark relative overflow-hidden border-y border-black/10 dark:border-white/5">
        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <RevealSection>
            <div className="max-w-[620px] mb-12">
              <span className="tech-tag text-[var(--color-money)] border-[var(--color-money)]/20 mb-3">
                The Student Reality Check
              </span>
              <h2 className="text-display-md text-white mb-3">
                Why traditional college isn&apos;t enough.
              </h2>
              <p className="text-[0.95rem] text-[var(--color-muted-light)]">
                Most students realize the gap between exam scores and real-world employment too late. Here is how OFFCLASS bridges it.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Card: The Conventional Bubble */}
            <RevealSection delay={0.1}>
              <div className="bento-card p-6 sm:p-8 bg-neutral-900/60 border-white/5 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                    <span className="text-[0.8rem] font-bold uppercase tracking-wider text-neutral-400">
                      Traditional College Loop
                    </span>
                    <span className="text-[0.72rem] font-semibold text-rose-400 bg-rose-400/10 px-2.5 py-0.5 rounded-full">
                      High Uncertainty
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: '4-Year Outdated Syllabi', desc: 'Focuses heavily on memorization, theory, and standardized written exams.' },
                      { title: 'Zero Cash Flow Training', desc: 'Leaves financial literacy, freelancing, and emergency savings completely unaddressed.' },
                      { title: 'Unverified Cold Mass Applications', desc: 'Students spray 500 identical resumes on job boards with zero feedback.' },
                      { title: 'Degree With No Portfolio', desc: 'Graduating with a transcript, but no public evidence of building anything real.' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <XCircle size={18} className="text-rose-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[0.9rem] font-bold text-neutral-200">{item.title}</p>
                          <p className="text-[0.8rem] text-neutral-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 text-[0.78rem] text-neutral-500">
                  Result: Post-graduation anxiety and entry-level underemployment.
                </div>
              </div>
            </RevealSection>

            {/* Right Card: The OFFCLASS Engine */}
            <RevealSection delay={0.2}>
              <div className="bento-card p-6 sm:p-8 bg-neutral-900/90 border-blue-500/30 h-full flex flex-col justify-between shadow-[0_0_40px_-10px_rgba(49,87,213,0.25)]">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <span className="text-[0.8rem] font-bold uppercase tracking-wider text-[var(--color-money)]">
                      The OFFCLASS Engine
                    </span>
                    <span className="text-[0.72rem] font-semibold text-[var(--color-money)] bg-[var(--color-money)]/10 px-2.5 py-0.5 rounded-full">
                      Proof of Work
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: 'Market-Ready Skill Stacks', desc: 'Learn modern development, design, and growth with concrete milestone projects.' },
                      { title: 'First ₹1,000 to ₹30,000 Income Path', desc: 'Calculate rates, build freelance proposals, and land independent client contracts.' },
                      { title: 'Verified Opportunity Radar', desc: 'Curated fellowships, government challenges (SIH), and vetted remote internships.' },
                      { title: 'Live Public Proof of Work', desc: 'Ship projects, write case studies, and cultivate an unfair advantage before year 4.' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-[var(--color-money)] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[0.9rem] font-bold text-white">{item.title}</p>
                          <p className="text-[0.8rem] text-neutral-300">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[0.78rem] text-[var(--color-money)] font-semibold">
                    Result: Career clarity, financial momentum & real agency.
                  </span>
                  <Link
                    href="/career"
                    className="text-[0.78rem] font-bold text-white hover:text-[var(--color-money)] flex items-center gap-1 transition-colors"
                  >
                    View Playbook <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: THE 5 PILLARS (Modern Bento Grid)
          ============================================================ */}
      <section className="section bg-[var(--color-offwhite)] dark:bg-neutral-950">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="tech-tag text-[var(--color-tech)] mb-2">
                  System Architecture
                </span>
                <h2 className="text-display-md text-[var(--color-ink)]">
                  The Five Pillars of Student Growth
                </h2>
              </div>
              <p className="text-[0.92rem] text-[var(--color-muted)] max-w-[420px]">
                Each pillar provides actionable tools, verified roadmaps, and step-by-step guides.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((pillar, i) => (
              <RevealSection key={pillar.id} delay={i * 0.07}>
                <Link href={pillar.href} className="block group h-full">
                  <div className="bento-card bento-card-interactive p-6 sm:p-7 h-full flex flex-col justify-between">
                    <div>
                      {/* Pillar Icon & Tagline */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs"
                          style={{
                            backgroundColor:
                              pillar.color === '#B7F34A'
                                ? 'rgba(183,243,74,0.18)'
                                : pillar.color === '#3157D5'
                                ? 'rgba(49,87,213,0.12)'
                                : 'rgba(0,0,0,0.05)',
                            color: pillar.color === '#B7F34A' ? '#4d6910' : pillar.color,
                          }}
                        >
                          {pillarIcons[pillar.iconName]}
                        </div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--color-muted)] font-[var(--font-display)]">
                          {pillar.tagline}
                        </span>
                      </div>

                      <h3 className="text-[1.25rem] font-bold font-[var(--font-display)] text-[var(--color-ink)] mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-[0.88rem] text-[var(--color-muted)] leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                    </div>

                    <div>
                      {/* Features Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {pillar.features.map((f) => (
                          <span
                            key={f}
                            className="text-[0.72rem] font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] text-[var(--color-muted)] px-2.5 py-1 rounded-lg"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] dark:border-white/[0.05] text-[0.82rem] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-tech)] transition-colors">
                        <span>Explore {pillar.title}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: STUDENT TOOLS (Tactile Bento Grid)
          ============================================================ */}
      <section className="section bg-[var(--color-surface)] dark:bg-neutral-900 border-y border-black/[0.05] dark:border-white/[0.05]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
              <div>
                <span className="tech-tag text-[var(--color-tech)] mb-2">
                  Interactive Utilities
                </span>
                <h2 className="text-display-md text-[var(--color-ink)]">
                  Practical Tools for Real Student Problems
                </h2>
              </div>
              <Link href="/tools" className="btn btn-outline btn-sm rounded-xl px-4 py-2 text-[0.85rem]">
                <span>All 9+ Tools</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoTools.filter((t) => t.status === 'published').slice(0, 6).map((tool, i) => (
              <RevealSection key={tool.id} delay={i * 0.05}>
                <Link href={tool.route} className="block group h-full">
                  <div className="bento-card bento-card-interactive p-5 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center text-[var(--color-ink)] group-hover:bg-[var(--color-tech)] group-hover:text-white transition-all shadow-xs">
                          {toolIcons[tool.iconName] || <Calculator size={18} />}
                        </div>
                        <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[var(--color-muted)] bg-black/[0.03] dark:bg-white/[0.05] px-2 py-0.5 rounded-md">
                          {tool.category}
                        </span>
                      </div>
                      <h3 className="text-[0.98rem] font-bold font-[var(--font-display)] text-[var(--color-ink)] mb-1.5 group-hover:text-[var(--color-tech)] transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-[0.82rem] text-[var(--color-muted)] leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-[0.76rem] font-bold text-[var(--color-tech)]">
                      <span>Launch Tool</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: OPPORTUNITIES PREVIEW
          ============================================================ */}
      <section className="section bg-[var(--color-offwhite)] dark:bg-neutral-950">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <div className="flex items-start justify-between flex-wrap gap-4 mb-12">
              <div>
                <span className="tech-tag text-[#10b981] mb-2">
                  Curated Radar
                </span>
                <h2 className="text-display-md text-[var(--color-ink)] max-w-[500px]">
                  Verified Opportunities for Students
                </h2>
              </div>
              <Link href="/opportunities" className="btn btn-outline btn-sm rounded-xl px-4 py-2 text-[0.85rem]">
                <span>Browse Directory</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoOpportunities.slice(0, 6).map((opp, i) => (
              <RevealSection key={opp.id} delay={i * 0.05}>
                <div className="bento-card p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[var(--color-muted)] bg-black/[0.04] dark:bg-white/[0.05] px-2 py-0.5 rounded-md">
                        {opp.type.replace('_', ' ')}
                      </span>
                      <span className="badge badge-demo text-[0.68rem]">Curated</span>
                    </div>
                    <h3 className="text-[0.98rem] font-bold font-[var(--font-display)] text-[var(--color-ink)] mb-1">
                      {opp.title}
                    </h3>
                    <p className="text-[0.78rem] font-semibold text-[var(--color-tech)] mb-2">
                      {opp.organization}
                    </p>
                    <p className="text-[0.82rem] text-[var(--color-muted)] leading-relaxed mb-4">
                      {opp.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between text-[0.78rem]">
                    <span className="text-[var(--color-muted)]">
                      📍 {opp.location}
                    </span>
                    {opp.compensation && (
                      <span className="font-bold text-[var(--color-ink)] font-mono">
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
          SECTION 6: FINAL CTA
          ============================================================ */}
      <section className="section section-dark relative overflow-hidden border-t border-black/10 dark:border-white/5">
        <div className="container mx-auto max-w-[1320px] px-6 text-center relative z-10">
          <RevealSection>
            <span className="tech-tag text-[var(--color-money)] border-[var(--color-money)]/20 mb-4 inline-flex">
              Take Action Today
            </span>
            <h2 className="text-display-lg text-white mb-5 max-w-[640px] mx-auto">
              Your degree is only one chapter of your story.
            </h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <p className="text-body-lg text-[var(--color-muted-light)] mb-8 max-w-[500px] mx-auto">
              Build the tangible skills, freelance earnings, portfolio proof, and career network you need before you graduate.
            </p>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/money" className="btn btn-accent btn-lg rounded-xl px-7 py-3.5 text-[0.95rem] font-bold">
                Start Building Now
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/about"
                className="btn btn-outline btn-lg rounded-xl px-6 py-3.5 text-[0.95rem] border-white/20 text-white hover:bg-white hover:text-[var(--color-ink)]"
              >
                Learn More About OFFCLASS
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
