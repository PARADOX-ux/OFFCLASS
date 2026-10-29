'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, PlayCircle, CheckCircle, Loader2, ShoppingCart, Sparkles, XCircle } from 'lucide-react';
import SaveButton from '@/components/SaveButton';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

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
  description: 'Learn the fundamentals of building wealth. From mutual funds to basic investing strategies.',
  chapters: [
    { id: 1, title: 'Introduction to Wealth Building', duration: '5 min', completed: true },
    { id: 2, title: 'Understanding Compound Interest', duration: '8 min', completed: false },
    { id: 3, title: 'Index Funds vs. Mutual Funds', duration: '12 min', completed: false },
    { id: 4, title: 'Risk Tolerance & Portfolios', duration: '10 min', completed: false },
    { id: 5, title: 'Action Plan: Your First ₹1,000', duration: '10 min', completed: false },
  ]
};

export default function CoursePage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const [resolvedSlug, setResolvedSlug] = useState<string>('investing-101');

  React.useEffect(() => {
    Promise.resolve(params).then((p) => {
      if (p?.slug) setResolvedSlug(p.slug);
    });
  }, [params]);
  const { user } = useAuth();
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { checkout, isProcessing, paymentStatus } = useRazorpay({
    onSuccess: (paymentId) => {
      setToastMessage({ type: 'success', text: `Course purchased! Payment ID: ${paymentId}` });
      setTimeout(() => setToastMessage(null), 5000);
    },
    onError: (error) => {
      setToastMessage({ type: 'error', text: error });
      setTimeout(() => setToastMessage(null), 5000);
    },
  });

  const handleBuyCourse = () => {
    if (!user) {
      router.push('/login?redirect=/courses/' + dummyCourseData.slug);
      return;
    }
    checkout({
      type: 'course',
      courseId: dummyCourseData.slug,
      courseName: dummyCourseData.title,
      amount: 29900, // ₹299 in paise — replace with real course price
    });
  };
  
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-24 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-[0.85rem] font-medium ${
            toastMessage.type === 'success'
              ? 'bg-[#0d1f0d] text-[#86efac] border border-[#22633a]'
              : 'bg-[#1f0d0d] text-[#fca5a5] border border-[#7f1d1d]'
          }`}
        >
          {toastMessage.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
          {toastMessage.text}
          <button onClick={() => setToastMessage(null)} className="ml-2 opacity-60 hover:opacity-100">
            <XCircle size={14} />
          </button>
        </div>
      )}

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
                <span className="pill pill-money text-[0.75rem]">DEMO COURSE</span>
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
            <div className="w-full aspect-video bg-neutral-950 rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden group cursor-pointer shadow-[var(--shadow-md)] border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <PlayCircle size={64} className="text-[var(--color-money)] relative z-20 group-hover:scale-110 transition-transform duration-300" />
              <p className="mt-4 font-bold tracking-widest text-[0.85rem] relative z-20">PLAY CHAPTER 2</p>
            </div>

            {/* Article / Transcript Content */}
            <div className="mt-12 prose prose-lg prose-headings:font-display prose-headings:font-bold prose-a:text-[var(--color-tech)] max-w-none">
              <h2>The Power of Compound Interest</h2>
              <p>
                Albert Einstein supposedly called compound interest the eighth wonder of the world. He who understands it, earns it; he who doesn&apos;t, pays it.
              </p>
              <p>
                When you invest your money, you earn interest on your principal. But more importantly, the next year, you earn interest on both your principal <strong>and the interest you previously earned</strong>. Over a span of 20 or 30 years, this creates an exponential growth curve that is the secret behind nearly every self-made millionaire.
              </p>
              <blockquote>
                &quot;The stock market is a device for transferring money from the impatient to the patient.&quot; — Warren Buffett
              </blockquote>
            </div>
          </div>

          {/* Sidebar - Curriculum */}
          <div className="lg:col-span-4">
            {/* Buy Course Card */}
            <div className="sticky top-24 space-y-4">
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-2xl font-bold font-[var(--font-display)] tracking-tight">₹299</span>
                  <span className="text-[var(--color-muted)] text-xs mb-1 line-through">₹599</span>
                  <span className="bg-[var(--color-money)] text-[var(--color-ink)] text-[0.6rem] px-2 py-0.5 rounded-full font-bold ml-2">50% OFF</span>
                </div>
                <p className="text-[0.75rem] text-[var(--color-muted)] mb-4">One-time purchase · Lifetime access</p>
                
                <button
                  onClick={handleBuyCourse}
                  disabled={isProcessing}
                  className="w-full py-3 px-6 rounded-xl font-bold text-[0.9rem] btn-primary flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed mb-3"
                >
                  {paymentStatus === 'processing' ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing...</>
                  ) : paymentStatus === 'success' ? (
                    <><CheckCircle size={16} /> Purchased!</>
                  ) : (
                    <><ShoppingCart size={16} /> Buy This Course</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[0.7rem] text-[var(--color-muted)]">
                  <Sparkles size={12} className="text-[var(--color-money)]" />
                  Secure payment via Razorpay
                </div>
              </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
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
    </div>
  );
}
