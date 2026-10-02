'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IndianRupee, ArrowRight } from 'lucide-react';

export default function EarnQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      question: 'What skills do you already have?',
      options: ['Writing', 'Design', 'Tech/Coding', 'Video/Photo', 'Teaching/Tutoring', 'Marketing', 'None yet'],
    },
    {
      question: 'How many hours per week can you work?',
      options: ['2–5 hours', '5–10 hours', '10–20 hours', '20+ hours'],
    },
    {
      question: 'Do you prefer online or offline work?',
      options: ['Online only', 'Offline preferred', 'Either works'],
    },
  ];

  const getRecommendation = () => {
    const skill = answers[0];
    if (skill === 'Writing') return { path: 'Freelance Content Writing', desc: 'Start writing blog posts, social media content, or copy for businesses. Low barrier to entry.', firstStep: 'Write 3 sample articles and list them on a freelance platform.' };
    if (skill === 'Design') return { path: 'Freelance Design Work', desc: 'Offer logo, social media, or presentation design services to local businesses or online clients.', firstStep: 'Create a portfolio with 5 sample designs and share it online.' };
    if (skill === 'Tech/Coding') return { path: 'Web Development Projects', desc: 'Build websites for small businesses, portfolios, or web apps.', firstStep: 'Create a personal portfolio site and list your services.' };
    if (skill === 'Video/Photo') return { path: 'Content Creation Services', desc: 'Offer video editing, photography, or social media content services.', firstStep: 'Create a reel of your best work and reach out to local businesses.' };
    if (skill === 'Teaching/Tutoring') return { path: 'Tutoring', desc: 'Teach subjects you excel at — online or in person.', firstStep: 'Start with 1–2 students in your network and build from there.' };
    if (skill === 'Marketing') return { path: 'Social Media Management', desc: 'Manage social accounts for small businesses or creators.', firstStep: 'Offer to manage one account for free to build a case study.' };
    return { path: 'Start Learning a Skill', desc: 'No skills yet? Start with something practical like copywriting or basic design — they\'re quick to learn.', firstStep: 'Pick one skill from the Skills page and commit 1 hour/day for 2 weeks.' };
  };

  const isComplete = step >= questions.length;

  return (
    <div className="card p-6 md:p-8" id="earn-quiz">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(183,243,74,0.15)] flex items-center justify-center">
          <IndianRupee size={20} className="text-[#5a7a1a]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">&ldquo;How Can I Earn?&rdquo; Quiz</h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">Discover earning opportunities for you</p>
        </div>
      </div>

      {!isComplete ? (
        <>
          <div className="progress-bar mb-6">
            <div className="progress-fill progress-fill-money" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
          </div>

          <p className="text-[0.75rem] text-[var(--color-muted)] mb-2">Question {step + 1} of {questions.length}</p>
          <h4 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-5">
            {questions[step].question}
          </h4>

          <div className="space-y-2">
            {questions[step].options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setAnswers({ ...answers, [step]: opt });
                  setStep(step + 1);
                }}
                className="w-full text-left p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-muted-light)] transition-all"
              >
                <span className="text-[0.9rem] font-medium">{opt}</span>
              </button>
            ))}
          </div>

          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="text-[0.85rem] text-[var(--color-tech)] font-medium mt-4">
              ← Go back
            </button>
          )}
        </>
      ) : (
        <div className="animate-[fade-in_0.4s_ease]">
          <div className="p-5 bg-[rgba(183,243,74,0.08)] rounded-[var(--radius-md)] mb-4">
            <p className="text-[0.75rem] text-[#5a7a1a] font-bold uppercase tracking-[0.1em] mb-2">
              Recommended Path
            </p>
            <h4 className="text-[1.3rem] font-bold font-[var(--font-display)] mb-2">
              {getRecommendation().path}
            </h4>
            <p className="text-[0.9rem] text-[var(--color-muted)] mb-3">
              {getRecommendation().desc}
            </p>
            <div className="p-3 bg-[var(--color-surface)] rounded-md">
              <p className="text-[0.8rem] font-semibold text-[var(--color-ink)]">
                First step: {getRecommendation().firstStep}
              </p>
            </div>
          </div>
          <p className="text-[0.75rem] text-[var(--color-muted)] mb-4">
            These are suggestions, not guarantees. Earning potential depends on your effort, market, and skills.
          </p>
          <div className="flex gap-3">
            <Link href="/money" className="btn btn-accent btn-sm">
              Explore Money <ArrowRight size={14} />
            </Link>
            <button onClick={() => { setStep(0); setAnswers({}); }} className="btn btn-outline btn-sm">
              Retake quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
