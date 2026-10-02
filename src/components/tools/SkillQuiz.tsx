'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lightbulb, ArrowRight } from 'lucide-react';

export default function SkillQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      question: 'What interests you most?',
      options: ['Building things', 'Creating visuals', 'Writing', 'Solving problems', 'Communicating with people'],
    },
    {
      question: 'How much time can you dedicate per week?',
      options: ['2–5 hours', '5–10 hours', '10–20 hours', '20+ hours'],
    },
    {
      question: 'What do you value more?',
      options: ['Quick income', 'Long-term career', 'Creative expression', 'Problem solving'],
    },
    {
      question: 'How comfortable are you with technology?',
      options: ['Very comfortable', 'Somewhat comfortable', 'I prefer non-tech work'],
    },
  ];

  const getRecommendation = () => {
    const interest = answers[0];
    if (interest === 'Building things') return { skill: 'Web Development', desc: 'Build websites and apps. High demand, lots of freelance opportunities.', time: '~12 weeks' };
    if (interest === 'Creating visuals') return { skill: 'UI/UX Design', desc: 'Design beautiful digital products. Great for visual thinkers.', time: '~8 weeks' };
    if (interest === 'Writing') return { skill: 'Copywriting', desc: 'Write persuasive content for brands. Quick to learn and monetize.', time: '~4 weeks' };
    if (interest === 'Solving problems') return { skill: 'Data Analysis', desc: 'Turn data into insights. Valuable across industries.', time: '~10 weeks' };
    return { skill: 'Digital Marketing', desc: 'Grow brands online. Combines creativity and strategy.', time: '~8 weeks' };
  };

  const isComplete = step >= questions.length;

  return (
    <div className="card p-6 md:p-8" id="skill-quiz">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(49,87,213,0.1)] flex items-center justify-center">
          <Lightbulb size={20} className="text-[var(--color-tech)]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">&ldquo;What Should I Learn?&rdquo; Quiz</h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">Get personalized skill recommendations</p>
        </div>
      </div>

      {!isComplete ? (
        <>
          <div className="progress-bar mb-6">
            <div className="progress-fill progress-fill-tech" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
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
                className={`w-full text-left p-4 rounded-[var(--radius-md)] border transition-all ${
                  answers[step] === opt
                    ? 'border-[var(--color-tech)] bg-[rgba(49,87,213,0.06)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-muted-light)]'
                }`}
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
          <div className="p-5 bg-[rgba(49,87,213,0.06)] rounded-[var(--radius-md)] mb-4">
            <p className="text-[0.75rem] text-[var(--color-tech)] font-bold uppercase tracking-[0.1em] mb-2">
              Recommended Skill
            </p>
            <h4 className="text-[1.3rem] font-bold font-[var(--font-display)] mb-2">
              {getRecommendation().skill}
            </h4>
            <p className="text-[0.9rem] text-[var(--color-muted)] mb-2">
              {getRecommendation().desc}
            </p>
            <p className="text-[0.8rem] text-[var(--color-tech)] font-semibold">
              Learning time: {getRecommendation().time}
            </p>
          </div>
          <p className="text-[0.75rem] text-[var(--color-muted)] mb-4">
            This is a simplified recommendation. Your ideal skill depends on many factors. Explore more options on the Skills page.
          </p>
          <div className="flex gap-3">
            <Link href="/skills" className="btn btn-primary btn-sm">
              Explore Skills <ArrowRight size={14} />
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
