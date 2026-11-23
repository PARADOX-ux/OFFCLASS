import Link from 'next/link';
import { ArrowRight, IndianRupee, Zap, Briefcase, GraduationCap, Compass, Target } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import RevealSection from '@/components/RevealSection';
import { pillars, demoOpportunities } from '@/lib/data';

const PILLAR_ICONS: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = {
  IndianRupee,
  Zap,
  Briefcase,
  GraduationCap,
  Compass,
  Target,
};

const PROBLEMS = [
  {
    title: 'Four years of theory, zero proof',
    body: 'You sit through semesters of slides, but no interviewer asks for marks. They ask what you have actually built.',
  },
  {
    title: 'Opportunities exist — they just never reach you',
    body: 'Internships, hackathons and paid fellowships are announced somewhere, once, in a PDF nobody forwards.',
  },
  {
    title: 'Money advice made for salaries, not students',
    body: 'You want to earn your first ₹20,000/month without falling for scams or underpricing your work.',
  },
];

const TRACK = [
  { step: '01', title: 'Pick your track', body: 'Money, skills, career or college life — one guided path instead of fifty tabs.', href: '/skills' },
  { step: '02', title: 'Build real things', body: 'Interactive tools, portfolio projects and checklists you can finish in one focused hour.', href: '/tools' },
  { step: '03', title: 'Apply with proof', body: 'A verified feed of internships, hackathons and fellowships you can actually enter.', href: '/opportunities' },
];

export default function Home() {
  const featuredOpportunities = demoOpportunities.slice(0, 3);

  return (
    <main className="stage">
      <CinematicHero />

      {/* ── Act I: The problem ──────────────────────────────────── */}
      <section
        aria-labelledby="stage-problem-heading"
        className="relative mx-auto max-w-[1320px] px-6 py-24 md:py-36"
        style={{ borderTop: '1px solid rgba(230,237,243,0.07)' }}
      >
        <RevealSection>
          <p className="mb-4 text-[0.74rem] font-bold uppercase tracking-[0.18em]" style={{ color: '#8FB8FF' }}>
            The problem
          </p>
          <h2 id="stage-problem-heading" className="text-display-lg mb-14 max-w-3xl font-bold leading-tight" style={{ color: '#F5F9FF' }}>
            College is long. The world wants proof now.
          </h2>
        </RevealSection>
        <div className="grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((problem, i) => (
            <RevealSection key={problem.title} delay={i * 0.08}>
              <div className="stage-card h-full p-7">
                <span className="mb-5 block font-display text-2xl font-bold" style={{ color: 'rgba(76,141,255,0.6)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 text-lg font-bold" style={{ color: '#F5F9FF' }}>{problem.title}</h3>
                <p className="text-[0.92rem] leading-relaxed" style={{ color: '#8CA0B3' }}>{problem.body}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Act II: The track ───────────────────────────────────── */}
      <section
        aria-labelledby="stage-track-heading"
        className="relative mx-auto max-w-[1320px] px-6 py-24 md:py-36"
        style={{ borderTop: '1px solid rgba(230,237,243,0.07)' }}
      >
        <RevealSection>
          <p className="mb-4 text-[0.74rem] font-bold uppercase tracking-[0.18em]" style={{ color: '#8FB8FF' }}>
            The track
          </p>
          <h2 id="stage-track-heading" className="text-display-lg mb-6 max-w-3xl font-bold leading-tight" style={{ color: '#F5F9FF' }}>
            One focused hour, then the next one.
          </h2>
          <p className="mb-14 max-w-2xl text-[1.05rem] leading-relaxed" style={{ color: '#8CA0B3' }>
            OFFCLASS is built around four pillars — each one a complete path, not a content dump.
          </p>
        </RevealSection>

        <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[pillar.iconName] ?? GraduationCap;
            return (
              <RevealSection key={pillar.id} delay={i * 0.06}>
                <Link href={pillar.href} className="stage-card flex h-full flex-col p-7">
                  <Icon size={26} className="mb-5" style={{ color: '#4C8DFF' }} />
                  <h3 className="mb-1 font-display text-lg font-bold" style={{ color: '#F5F9FF' }}>{pillar.title}</h3>
                  <p className="mb-3 text-[0.82rem] font-semibold" style={{ color: '#8FB8FF' }}>{pillar.tagline}</p>
                  <p className="text-[0.88rem] leading-relaxed" style={{ color: '#8CA0B3' }}>{pillar.description}</p>
                </Link>
              </RevealSection>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TRACK.map((item, i) => (
            <RevealSection key={item.step} delay={i * 0.08}>
              <Link href={item.href} className="flex h-full items-start gap-4 rounded-[14px] p-5 transition-colors hover:bg-[rgba(76,141,255,0.06)]">
                <span className="font-display text-sm font-bold" style={{ color: '#4C8DFF' }}>{item.step}</span>
                <span>
                  <span className="block font-bold" style={{ color: '#F5F9FF' }}>{item.title} →</span>
                  <span className="mt-1 block text-[0.88rem] leading-relaxed" style={{ color: '#8CA0B3' }}>{item.body}</span>
                </span>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Act III: The proof ──────────────────────────────────── */}
      <section
        aria-labelledby="stage-proof-heading"
        className="relative mx-auto max-w-[1320px] px-6 py-24 md:py-36"
        style={{ borderTop: '1px solid rgba(230,237,243,0.07)' }}
      >
        <RevealSection>
          <p className="mb-4 text-[0.74rem] font-bold uppercase tracking-[0.18em]" style={{ color: '#8FB8FF' }}>
            The proof
          </p>
          <h2 id="stage-proof-heading" className="text-display-lg mb-6 max-w-3xl font-bold leading-tight" style={{ color: '#F5F9FF' }}>
            Real openings, sourced and checked.
          </h2>
          <p className="mb-14 max-w-2xl text-[1.05rem] leading-relaxed" style={{ color: '#8CA0B3' }>
            A live sample from the opportunities feed — every listing carries its official source and deadline.
          </p>
        </RevealSection>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredOpportunities.map((opp, i) => (
            <RevealSection key={opp.id} delay={i * 0.08}>
              <a
                href={opp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="stage-card flex h-full flex-col p-7"
              >
                <span className="mb-4 inline-flex w-fit rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide" style={{ color: '#8FB8FF', background: 'rgba(76,141,255,0.12)' }}>
                  {opp.type}
                </span>
                <h3 className="mb-2 font-bold" style={{ color: '#F5F9FF' }}>{opp.title}</h3>
                <p className="mb-5 text-[0.88rem] leading-relaxed" style={{ color: '#8CA0B3' }}>{opp.summary}</p>
                <span className="mt-auto flex items-center justify-between text-[0.8rem]" style={{ color: '#8CA0B3' }}>
                  <span>{opp.organization}</span>
                  <span>{opp.deadline}</span>
                </span>
              </a>
            </RevealSection>
          ))}
        </div>

        <RevealSection>
          <Link
            href="/opportunities"
            className="stage-ghost mt-10 inline-flex items-center gap-2 px-6 py-3 text-[0.9rem] font-bold"
          >
            See all opportunities
            <ArrowRight size={16} aria-hidden />
          </Link>
        </RevealSection>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section
        aria-labelledby="stage-final-heading"
        className="relative overflow-hidden px-6 py-28 text-center md:py-40"
        style={{ borderTop: '1px solid rgba(230,237,243,0.07)' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, rgba(76,141,255,0.18) 0%, rgba(76,141,255,0) 70%)' }}
        />
        <RevealSection>
          <h2 id="stage-final-heading" className="text-display-lg relative mb-6 font-bold leading-tight" style={{ color: '#F5F9FF' }}>
            Your first focused hour starts today.
          </h2>
          <p className="relative mx-auto mb-10 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: '#8CA0B3' }}>
            Create a free account, pick a track, and see what one hour actually gets you.
          </p>
          <Link href="/signup" className="stage-cta relative inline-flex items-center gap-2 px-9 py-4 text-[1rem] font-bold">
            Start learning free
            <ArrowRight size={18} aria-hidden />
          </Link>
        </RevealSection>
      </section>
    </main>
  );
}