'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, PlayCircle, CheckCircle } from 'lucide-react';
import SaveButton from '@/components/SaveButton';

// This is dummy data. In the future, we will fetch this from Supabase based on the params.slug
const dummyCourseData = {
  slug: 'investing-101',
  title: 'The Blueprint to Modern Investing',
  creator: {
    name: 'Sarah Jenkins',
    role: 'Financial Analyst',
    avatar: 'SJ'
  },
  duration: '45 mins',
  lessons: 8,
  description: 'Learn the fundamentals of building wealth outside of a 9-to-5 job. From index funds to basic real estate strategies.',
  chapters: [
    { id: 1, title: 'Introduction to Wealth Building', duration: '5 min', completed: true },
    { id: 2, title: 'Understanding Compound Interest', duration: '8 min', completed: false },
    { id: 3, title: 'Index Funds vs. Mutual Funds', duration: '12 min', completed: false },
    { id: 4, title: 'Risk Tolerance & Portfolios', duration: '10 min', completed: false },
    { id: 5, title: 'Action Plan: Your First $1,000', duration: '10 min', completed: false },
  ]
};

export default function CoursePage({ params }: { params: { slug: string } }) {
  // Use React.use to unwrap params if needed in Next.js 15, but since we aren't using the slug yet we can just mock it.
  
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-24 pb-20">
      <div className="container mx-auto max-w-[1200px] px-6">
        
        {/* Back Navigation */}
        <Link href="/money" className="inline-flex items-center text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors mb-8 font-medium text-[0.85rem]">
          <ArrowLeft size={16} className="mr-2" />
          Back to Money
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="pill pill-money text-[0.75rem]">Investing</span>
                <span className="text-[var(--color-muted)] text-[0.85rem] flex items-center">
                  <Clock size={14} className="mr-1" /> {dummyCourseData.duration}
                </span>
              </div>
              
              <h1 className="text-display-md font-bold mb-4">{dummyCourseData.title}</h1>
              <p className="text-body-lg text-[var(--color-muted)] mb-6">{dummyCourseData.description}</p>
              
              <div className="flex items-center justify-between border-y border-[var(--color-border)] py-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-ink)] text-[var(--color-offwhite)] flex items-center justify-center font-bold font-[var(--font-display)]">
                    {dummyCourseData.creator.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[0.9rem]">{dummyCourseData.creator.name}</p>
                    <p className="text-[0.75rem] text-[var(--color-muted)]">{dummyCourseData.creator.role}</p>
                  </div>
                </div>
                <div>
                  <SaveButton itemId={dummyCourseData.slug} itemType="opportunity" showText />
                </div>
              </div>
            </div>

            {/* Video Player Placeholder */}
            <div className="w-full aspect-video bg-[var(--color-ink)] rounded-2xl flex flex-col items-center justify-center text-[var(--color-offwhite)] relative overflow-hidden group cursor-pointer shadow-[var(--shadow-md)]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <PlayCircle size={64} className="text-[var(--color-money)] relative z-20 group-hover:scale-110 transition-transform duration-300" />
              <p className="mt-4 font-bold tracking-widest text-[0.85rem] relative z-20">PLAY CHAPTER 2</p>
            </div>

            {/* Article / Transcript Content */}
            <div className="mt-12 prose prose-lg prose-headings:font-display prose-headings:font-bold prose-a:text-[var(--color-tech)] max-w-none">
              <h2>The Power of Compound Interest</h2>
              <p>
                Albert Einstein supposedly called compound interest the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.
              </p>
              <p>
                When you invest your money, you earn interest on your principal. But more importantly, the next year, you earn interest on both your principal <strong>and the interest you previously earned</strong>. Over a span of 20 or 30 years, this creates an exponential growth curve that is the secret behind nearly every self-made millionaire.
              </p>
              <blockquote>
                "The stock market is a device for transferring money from the impatient to the patient." — Warren Buffett
              </blockquote>
            </div>
          </div>

          {/* Sidebar - Curriculum */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
              <h3 className="font-bold text-[1.1rem] mb-6 flex items-center">
                <BookOpen size={18} className="mr-2 text-[var(--color-money)]" />
                Course Curriculum
              </h3>
              
              <div className="flex flex-col gap-1">
                {dummyCourseData.chapters.map((chapter, idx) => (
                  <button 
                    key={chapter.id}
                    className={`flex items-start text-left p-3 rounded-lg transition-colors ${
                      idx === 1 
                        ? 'bg-[var(--color-offwhite)] border border-[var(--color-border)] shadow-sm' 
                        : 'hover:bg-[var(--color-offwhite)] border border-transparent'
                    }`}
                  >
                    <div className="mt-0.5 mr-3">
                      {chapter.completed ? (
                        <CheckCircle size={18} className="text-[var(--color-money)]" />
                      ) : (
                        <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center text-[0.6rem] font-bold ${
                          idx === 1 ? 'border-[var(--color-ink)] text-[var(--color-ink)]' : 'border-[var(--color-muted)] text-[var(--color-muted)]'
                        }`}>
                          {chapter.id}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`font-medium text-[0.9rem] ${idx === 1 ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`}>
                        {chapter.title}
                      </p>
                      <p className="text-[0.75rem] text-[var(--color-muted)] mt-1">{chapter.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
