import Link from 'next/link';
import { ArrowRight, IndianRupee, Zap, Briefcase, GraduationCap, Compass, Target } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import RevealSection from '@/components/RevealSection';
import { pillars, demoOpportunities } from '@/lib/data';

const PILLAR_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
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

      {/* Act I: the problem */}
      <section aria-labelledby="stage-problem-heading" className="stage-section">
        <RevealSection>
          <p className="stage-eyebrow mb-4">The problem</p>
          <h2 id="stage-problem-heading" className="stage-h2 mb-14 max-w-3xl">
            College is long. The world wants proof now.
          </h2>
        </RevealSection>
        <div className="grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((problem, i) => (
            <RevealSection key={problem.title} delay={i * 0.08}>
              <div className="stage-card h-full p-7">
                <span className="stage-num mb-5 block">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="stage-h3 mb-3">{problem.title}</h3>
                <p className="stage-body">{problem.body}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Act II: the track */}
      <section aria-labelledby="stage-track-heading" className="stage-section">
        <RevealSection>
          <p className="stage-eyebrow mb-4">The track</p>
          <h2 id="stage-track-heading" className="stage-h2 mb-6 max-w-3xl">
            One focused hour, then the next one.
          </h2>
          <p className="stage-body stage-body-lg mb-14 max-w-2xl">
            OFFCLASS is built around four pillars — each one a complete path, not a content dump.
          </p>
        </RevealSection>

        <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[pillar.iconName] ?? GraduationCap;
            return (
              <RevealSection key={pillar.id} delay={i * 0.06}>
                <Link href={pillar.href} className="stage-card flex h-full flex-col p-7">
                  <Icon size={26} className="stage-icon mb-5" />
                  <h3 className="stage-h3 mb-1 font-display">{pillar.title}</h3>
                  <p className="stage-pill-text mb-3 font-semibold">{pillar.tagline}</p>
                  <p className="stage-body">{pillar.description}</p>
                </Link>
              </RevealSection>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TRACK.map((item, i) => (
            <RevealSection key={item.step} delay={i * 0.08}>
              <Link href={item.href} className="stage-track-link flex h-full items-start gap-4 p-5">
                <span className="stage-num text-sm">{item.step}</span>
                <span>
                  <span className="stage-h3 block">{item.title} →</span>
                  <span className="stage-body mt-1 block text-[0.88rem]">{item.body}</span>
                </span>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Act III: the proof */}
      <section aria-labelledby="stage-proof-heading" className="stage-section">
        <RevealSection>
          <p className="stage-eyebrow mb-4">The proof</p>
          <h2 id="stage-proof-heading" className="stage-h2 mb-6 max-w-3xl">
            Real openings, sourced and checked.
          </h2>
          <p className="stage-body stage-body-lg mb-14 max-w-2xl">
            A live sample from the opportunities feed — every listing carries its official source and deadline.
          </p>
        </RevealSection>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredOpportunities.map((opp, i) => (
            <RevealSection key={opp.id} delay={i * 0.08}>
              <a href={opp.link} target="_blank" rel="noopener noreferrer" className="stage-card flex h-full flex-col p-7">
                <span className="stage-pill mb-4 w-fit">{opp.type}</span>
                <h3 className="stage-h3 mb-2">{opp.title}</h3>
                <p className="stage-body mb-5 text-[0.88rem]">{opp.summary}</p>
                <span className="stage-meta mt-auto flex items-center justify-between text-[0.8rem]">
                  <span>{opp.organization}</span>
                  <span>{opp.deadline}</span>
                </span>
              </a>
            </RevealSection>
          ))}
        </div>

        <RevealSection>
          <Link href="/opportunities" className="stage-ghost mt-10 inline-flex items-center gap-2 px-6 py-3 text-[0.9rem] font-bold">
            See all opportunities
            <ArrowRight size={16} aria-hidden />
          </Link>
        </RevealSection>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="stage-final-heading" className="stage-final">
        <div aria-hidden className="stage-final-glow" />
        <RevealSection>
          <h2 id="stage-final-heading" className="stage-h2 relative mb-6">
            Your first focused hour starts today.
          </h2>
          <p className="stage-body stage-body-lg relative mx-auto mb-10 max-w-xl">
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