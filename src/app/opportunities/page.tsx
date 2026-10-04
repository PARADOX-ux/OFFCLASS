'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, MapPin, Calendar, ExternalLink } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import SaveButton from '@/components/SaveButton';
import { demoOpportunities } from '@/lib/data';

const types = ['All', 'internship', 'freelance', 'hackathon', 'scholarship', 'campus_job', 'event', 'competition', 'creator'];
const locations = ['All Locations', 'Remote', 'Delhi', 'Mumbai', 'Bangalore', 'Multiple Cities', 'Pan India'];

export default function OpportunitiesPage() {
  const [activeType, setActiveType] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = demoOpportunities.filter((o) => {
    if (activeType !== 'All' && o.type !== activeType) return false;
    if (activeLocation !== 'All Locations' && o.location !== activeLocation) return false;
    if (searchQuery && !o.title.toLowerCase().includes(searchQuery.toLowerCase()) && !o.summary.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });


  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Opportunities</p>
            <h1 className="text-display-lg mb-6 max-w-[600px]">
              Find what&apos;s out there for you.
            </h1>
            <p className="text-body-lg text-[var(--color-muted)] mb-8 max-w-[520px]">
              Browse internships, freelancing gigs, competitions, scholarships, hackathons,
              and more. Filter by type, location, and keyword.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          {/* Search */}
          <RevealSection>
            <div className="mb-8 space-y-4">
              <div className="relative max-w-[500px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
                <input
                  type="search"
                  className="input pl-12"
                  placeholder="Search opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search opportunities"
                />
              </div>

              {/* Type filters */}
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`pill ${activeType === type ? 'pill-default active' : 'pill-default'}`}
                  >
                    {type === 'All' ? 'All Types' : type.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Location filters */}
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setActiveLocation(loc)}
                    className={`pill text-[0.75rem] py-1 px-3 ${activeLocation === loc ? 'pill-default active' : 'pill-muted'}`}
                  >
                    <MapPin size={10} />
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Results count */}
          <p className="text-[0.85rem] text-[var(--color-muted)] mb-6">
            {filtered.length} {filtered.length === 1 ? 'opportunity' : 'opportunities'} found
          </p>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((opp, i) => (
              <RevealSection key={opp.id} delay={i * 0.04}>
                <div className="card h-full flex flex-col relative group hover:border-[var(--color-tech)] transition-colors cursor-pointer">
                  {/* Invisible link overlay covering the entire card */}
                  <a href={opp.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0" aria-label={`View ${opp.title}`} />
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 relative z-10 pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="pill pill-default text-[0.7rem] py-0.5 px-2">
                        {opp.type.replace('_', ' ')}
                      </span>
                    </div>
                    {/* Ensure save button can be clicked over the link overlay */}
                    <div className="pointer-events-auto">
                      <SaveButton itemId={opp.id} itemType="opportunity" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-[1.05rem] font-bold font-[var(--font-display)] mb-1 relative z-10 group-hover:text-[var(--color-tech)] transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-[0.8rem] text-[var(--color-tech)] font-medium mb-2 relative z-10">
                    {opp.organization}
                  </p>
                  <p className="text-[0.85rem] text-[var(--color-muted)] leading-relaxed mb-4 flex-1 relative z-10">
                    {opp.summary}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 text-[0.8rem] text-[var(--color-muted)] mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <MapPin size={13} /> {opp.location}
                      {opp.remote && <span className="pill pill-tech text-[0.65rem] py-0 px-1.5">Remote</span>}
                    </div>
                    {opp.deadline && (
                      <div className="flex items-center gap-2">
                        <Calendar size={13} /> Deadline: {opp.deadline}
                      </div>
                    )}
                    {opp.compensation && (
                      <div className="flex items-center gap-2 font-semibold text-[var(--color-ink)]">
                        💰 {opp.compensation}
                      </div>
                    )}
                  </div>

                  {/* Eligibility */}
                  <p className="text-[0.75rem] text-[var(--color-muted)] mb-4 relative z-10">
                    Eligibility: {opp.eligibility}
                  </p>

                  {/* Action */}
                  <div className="mt-auto pt-4 relative z-10">
                    <span className="inline-flex items-center gap-2 text-[0.85rem] font-bold text-[var(--color-tech)] group-hover:text-[var(--color-ink)] transition-colors pointer-events-none">
                      <ExternalLink size={14} />
                      <span>View & Apply</span>
                    </span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[1.5rem] mb-2">🔍</p>
              <p className="text-[var(--color-muted)] text-[1rem] mb-2">No opportunities match your filters.</p>
              <button
                onClick={() => { setActiveType('All'); setActiveLocation('All Locations'); setSearchQuery(''); }}
                className="text-[var(--color-tech)] font-semibold text-[0.9rem]"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Architecture note */}
          <RevealSection delay={0.2}>
            <div className="mt-12 p-5 bg-[var(--color-offwhite)] rounded-[var(--radius-lg)] border border-[var(--color-border)]">
              <p className="text-[0.85rem] text-[var(--color-muted)]">
                More opportunities are added weekly. Saving opportunities will require an account in a future update.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
