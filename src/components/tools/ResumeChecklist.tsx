'use client';

import { useState } from 'react';
import { ClipboardCheck, CheckCircle2, Circle } from 'lucide-react';

export default function ResumeChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = [
    { id: 'name', text: 'Full name and contact information' },
    { id: 'email', text: 'Professional email address' },
    { id: 'summary', text: 'Brief professional summary or objective' },
    { id: 'education', text: 'Education details with dates' },
    { id: 'skills', text: 'Relevant skills listed' },
    { id: 'projects', text: 'Projects with descriptions and outcomes' },
    { id: 'experience', text: 'Work experience or internships (if any)' },
    { id: 'achievements', text: 'Relevant achievements or certifications' },
    { id: 'formatting', text: 'Clean formatting — consistent fonts and spacing' },
    { id: 'proofread', text: 'Proofread for spelling and grammar' },
    { id: 'one-page', text: 'One page (for students and early career)' },
    { id: 'pdf', text: 'Saved as PDF with a professional filename' },
    { id: 'links', text: 'LinkedIn/portfolio/GitHub links included' },
    { id: 'tailored', text: 'Tailored to the specific job/internship' },
  ];

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="card p-6 md:p-8" id="resume-checklist">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(49,87,213,0.1)] flex items-center justify-center">
          <ClipboardCheck size={20} className="text-[var(--color-tech)]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">Resume Checklist</h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">{completedCount}/{items.length} complete</p>
        </div>
      </div>

      <div className="progress-bar mb-6">
        <div className="progress-fill progress-fill-tech" style={{ width: `${progress}%` }} />
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setChecked({ ...checked, [item.id]: !checked[item.id] })}
            className={`w-full flex items-center gap-3 p-3 rounded-[var(--radius-sm)] text-left transition-colors ${
              checked[item.id] ? 'bg-[rgba(34,197,94,0.05)]' : 'hover:bg-[var(--color-offwhite-dark)]'
            }`}
          >
            {checked[item.id] ? (
              <CheckCircle2 size={18} className="text-[#16a34a] flex-shrink-0" />
            ) : (
              <Circle size={18} className="text-[var(--color-muted-light)] flex-shrink-0" />
            )}
            <span className={`text-[0.9rem] ${checked[item.id] ? 'text-[var(--color-muted)] line-through' : 'text-[var(--color-ink)]'}`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>

      {completedCount === items.length && (
        <div className="mt-4 p-4 bg-[rgba(34,197,94,0.08)] rounded-[var(--radius-md)] animate-[fade-in_0.3s_ease]">
          <p className="text-[0.9rem] text-[#16a34a] font-semibold">
            ✅ Your resume covers all the essentials! Review it once more, then start applying.
          </p>
        </div>
      )}
    </div>
  );
}
