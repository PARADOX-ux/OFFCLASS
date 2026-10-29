'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import SaveButton from '@/components/SaveButton';
import { demoOpportunities } from '@/lib/data';

const types = [
  'All',
  'internship',
  'freelance',
  'hackathon',
  'scholarship',
  'campus_job',
  'event',
  'competition',
  'creator',
];

const locations = [
  'All Locations',
  'Remote',
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Multiple Cities',
  'Pan India',
];

export default function OpportunitiesPage() {
  const [activeType, setActiveType] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = demoOpportunities.filter((o) => {
    if (activeType !== 'All' && o.type !== activeType) return false;
    if (activeLocation !== 'All Locations' && o.location !== activeLocation) return false;
    if (
      searchQuery &&
      !o.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.summary.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <>
      {/* ── Hero Section (Linear / Supabase Style) ─────────────── */}
      <section className="relative pt-28 pb-14 bg-[var(--color-offwhite)] dark:bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 linear-grid-mesh pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-[var(--color-money)] opacity-[0.05] dark:opacity-[0.08] blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <RevealSection>
            <div className="max-w-[700px]">
              <span className="tech-tag text-[#10b981] mb-4 inline-flex items-center gap-1.5">
                <span className="live-pulse-dot" />
                <span>Curated & audited opportunity radar</span>
              </span>
              <h1 className="text-display-lg text-[var(--color-ink)] mb-4 font-bold">
                Find Real Opportunities That Value You
              </h1>
              <p className="text-body-lg text-[var(--color-muted)] max-w-[560px]">
                Browse vetted internships, open source fellowships, nationwide hackathons, and high-trust scholarships without spam or scam postings.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Filter Bar & Opportunity Bento Grid ────────────────── */}
      <section className="py-12 bg-[var(--color-surface)] dark:bg-neutral-900 border-t border-black/[0.05] dark:border-white/[0.05]">
        <div className="container mx-auto max-w-[1320px] px-6">
          {/* Controls */}
          <RevealSection>
            <div className="bento-card p-5 mb-8 space-y-4">
              {/* Search Input */}
              <div className="relative max-w-[560px]">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                />
                <input
                  type="search"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-[0.88rem] text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-tech)] transition-colors"
                  placeholder="Search opportunities (e.g. Google, Remote, Frontend, Stipend)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search opportunities"
                />
              </div>

              {/* Type Filter Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {types.map((type) => {
                  const active = activeType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`px-3 py-1.5 rounded-full text-[0.78rem] font-semibold capitalize transition-all ${
                        active
                          ? 'bg-[var(--color-ink)] text-[var(--color-offwhite)] shadow-sm'
                          : 'bg-black/[0.03] dark:bg-white/[0.05] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                      }`}
                    >
                      {type === 'All' ? 'All Categories' : type.replace('_', ' ')}
                    </button>
                  );
                })}
              </div>

              {/* Location Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.05]">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--color-muted)] mr-2 flex items-center gap-1">
                  <MapPin size={12} />
                  Location:
                </span>
                {locations.map((loc) => {
                  const active = activeLocation === loc;
                  return (
                    <button
                      key={loc}
                      onClick={() => setActiveLocation(loc)}
                      className={`px-2.5 py-1 rounded-md text-[0.74rem] font-medium transition-all ${
                        active
                          ? 'bg-[var(--color-tech)] text-white shadow-xs font-semibold'
                          : 'bg-black/[0.02] dark:bg-white/[0.03] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                      }`}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            </div>
          </RevealSection>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6 text-[0.82rem] text-[var(--color-muted)]">
            <span>
              Showing <strong className="text-[var(--color-ink)]">{filtered.length}</strong> verified opportunities
            </span>
            {(activeType !== 'All' || activeLocation !== 'All Locations' || searchQuery) && (
              <button
                onClick={() => {
                  setActiveType('All');
                  setActiveLocation('All Locations');
                  setSearchQuery('');
                }}
                className="text-[var(--color-tech)] font-semibold hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Opportunities Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {filtered.map((opp, i) => (
              <RevealSection key={opp.id} delay={i * 0.04}>
                <div className="bento-card bento-card-interactive p-5 h-full flex flex-col justify-between relative group">
                  {/* Invisible link overlay covering card body */}
                  <a
                    href={opp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-20"
                    aria-label={`View ${opp.title}`}
                  />

                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3 relative z-30 pointer-events-auto">
                      <div className="flex items-center gap-2">
                        <span className="tech-tag text-[0.68rem] capitalize font-semibold">
                          {opp.type.replace('_', ' ')}
                        </span>
                        {opp.remote && (
                          <span className="tech-tag text-[var(--color-tech)] bg-[var(--color-tech)]/10 text-[0.68rem]">
                            Remote
                          </span>
                        )}
                      </div>
                      <SaveButton itemId={opp.id} itemType="opportunity" />
                    </div>

                    {/* Organization & Title */}
                    <p className="text-[0.76rem] font-bold text-[var(--color-tech)] uppercase tracking-wider mb-1">
                      {opp.organization}
                    </p>
                    <h3 className="text-[1.02rem] font-bold font-[var(--font-display)] text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-tech)] transition-colors leading-snug">
                      {opp.title}
                    </h3>
                    <p className="text-[0.82rem] text-[var(--color-muted)] leading-relaxed mb-4">
                      {opp.summary}
                    </p>
                  </div>

                  {/* Footer & Badges */}
                  <div>
                    <div className="space-y-1.5 text-[0.78rem] text-[var(--color-muted)] mb-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          {opp.location}
                        </span>
                        {opp.compensation && (
                          <span className="font-bold text-[var(--color-ink)] font-mono">
                            {opp.compensation}
                          </span>
                        )}
                      </div>
                      {opp.deadline && (
                        <div className="flex items-center gap-1.5 text-[0.74rem]">
                          <Calendar size={12} />
                          <span>Deadline: {opp.deadline}</span>
                        </div>
                      )}
                    </div>

                    {/* Trust status */}
                    <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.04] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[0.72rem] text-[#10b981] font-semibold">
                        <ShieldCheck size={14} />
                        <span>
                          {opp.verificationStatus === 'verified'
                            ? 'Verified Source'
                            : 'Representative Listing'}
                        </span>
                      </div>
                      <span className="text-[0.74rem] font-bold text-[var(--color-tech)] flex items-center gap-1">
                        Apply <ExternalLink size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 bento-card p-8 max-w-[500px] mx-auto">
              <p className="text-3xl mb-2">🔍</p>
              <h3 className="font-bold text-[1.1rem] mb-1">No matching opportunities</h3>
              <p className="text-[var(--color-muted)] text-[0.85rem] mb-4">
                Try widening your search keywords or switching location filters.
              </p>
              <button
                onClick={() => {
                  setActiveType('All');
                  setActiveLocation('All Locations');
                  setSearchQuery('');
                }}
                className="btn btn-primary btn-sm rounded-xl px-4 py-2 text-[0.82rem]"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Trust Banner */}
          <RevealSection delay={0.2}>
            <div className="bento-card p-6 sm:p-7 border-l-4 border-l-[var(--color-tech)]">
              <h4 className="text-[0.95rem] font-bold font-[var(--font-display)] mb-2 flex items-center gap-2 text-[var(--color-ink)]">
                <ShieldCheck size={18} className="text-[var(--color-tech)]" />
                <span>Verification & Opportunity Integrity Policy</span>
              </h4>
              <p className="text-[0.84rem] text-[var(--color-muted)] leading-relaxed mb-2">
                Listings marked <strong>&quot;Verified Source&quot;</strong> are audited against live organization portals (e.g. AICTE Smart India Hackathon, Google Summer of Code, Reliance Foundation, IIT Bombay E-Cell). Deadlines, eligibility requirements, and portal links are updated systematically.
              </p>
              <p className="text-[0.78rem] text-[var(--color-muted)]">
                OFFCLASS never charges fees for job applications or guarantees placement outcomes.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
