'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, MapPin, Calendar, Users, Tag, Award, Ticket } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { demoCampusEvents } from '@/lib/data';

const categories = ['All', 'Competition', 'Workshop', 'Club', 'Discount', 'Hackathon', 'Scholarship'];
const cities = ['All Cities', 'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

const eventTypeIcons: Record<string, React.ReactNode> = {
  competition: <Award size={20} />,
  workshop: <Users size={20} />,
  club: <Users size={20} />,
  discount: <Ticket size={20} />,
  hackathon: <Tag size={20} />,
  scholarship: <Award size={20} />,
  event: <Calendar size={20} />,
};

export default function CampusPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCity, setActiveCity] = useState('All Cities');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = demoCampusEvents.filter((e) => {
    if (activeCategory !== 'All' && e.eventType !== activeCategory.toLowerCase()) return false;
    if (activeCity !== 'All Cities' && e.city !== activeCity) return false;
    if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Campus</p>
            <h1 className="text-display-lg mb-6 max-w-[600px]">
              Get more from college.
            </h1>
            <p className="text-body-lg text-[var(--color-muted)] mb-8 max-w-[520px]">
              Discover events, clubs, competitions, hackathons, workshops, scholarships,
              and student discounts happening on and around campuses.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Filters + Events */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          {/* Search + Filters */}
          <RevealSection>
            <div className="mb-10 space-y-4">
              <div className="relative max-w-[480px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
                <input
                  type="search"
                  className="input pl-12"
                  placeholder="Search events, clubs, competitions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search campus events"
                />
              </div>

              <div className="flex flex-wrap gap-2">
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

              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setActiveCity(city)}
                    className={`pill text-[0.75rem] py-1 px-3 ${activeCity === city ? 'pill-default active' : 'pill-muted'}`}
                  >
                    <MapPin size={10} />
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((event, i) => (
              <RevealSection key={event.id} delay={i * 0.05}>
                <div className="card h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-md bg-[var(--color-offwhite-dark)] flex items-center justify-center text-[var(--color-ink)]">
                      {eventTypeIcons[event.eventType] || <Calendar size={16} />}
                    </div>
                    <span className="pill pill-default text-[0.7rem] py-0.5 px-2">
                      {event.eventType}
                    </span>
                    <span className="badge badge-demo">Demo</span>
                  </div>
                  <h3 className="text-[1rem] font-bold font-[var(--font-display)] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-[0.85rem] text-[var(--color-muted)] leading-relaxed mb-4 flex-1">
                    {event.summary}
                  </p>
                  <div className="flex items-center justify-between text-[0.8rem] text-[var(--color-muted)]">
                    {event.city && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {event.city}
                      </span>
                    )}
                    <span className="text-[0.75rem]">{event.eligibility}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[1.5rem] mb-2">🎓</p>
              <p className="text-[var(--color-muted)] text-[1rem] mb-2">No events found matching your filters.</p>
              <button
                onClick={() => { setActiveCategory('All'); setActiveCity('All Cities'); setSearchQuery(''); }}
                className="text-[var(--color-tech)] font-semibold text-[0.9rem]"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Architecture note */}
          <RevealSection delay={0.2}>
            <div className="mt-12 p-5 bg-[var(--color-offwhite)] rounded-[var(--radius-lg)] border border-[var(--color-border)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-coming-soon">Architecture Ready</span>
              </div>
              <p className="text-[0.85rem] text-[var(--color-muted)]">
                This page is designed to support database-driven content. Future updates will include
                real events filtered by college, city, course, and year. The current listings are demo data
                for design purposes only.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6 text-center">
          <RevealSection>
            <h2 className="text-display-sm mb-4">
              Know about a campus event?
            </h2>
            <p className="text-[0.95rem] text-[var(--color-muted)] mb-8 max-w-[400px] mx-auto">
              We&apos;re building a community-driven campus events database. Want to contribute?
            </p>
            <Link href="/contact" className="btn btn-primary">
              Submit an Event
              <ArrowRight size={14} />
            </Link>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
