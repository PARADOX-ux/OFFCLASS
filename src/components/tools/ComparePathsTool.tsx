'use client';

import { useState } from 'react';
import { ArrowRightLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import { demoCareerPaths } from '@/lib/data';

export default function ComparePathsTool() {
  const [path1Id, setPath1Id] = useState(demoCareerPaths[0].id);
  const [path2Id, setPath2Id] = useState(demoCareerPaths[1].id);

  const path1 = demoCareerPaths.find((p) => p.id === path1Id);
  const path2 = demoCareerPaths.find((p) => p.id === path2Id);

  return (
    <div className="card p-6 md:p-8" id="compare-paths">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(49,87,213,0.1)] flex items-center justify-center">
          <ArrowRightLeft size={20} className="text-[var(--color-tech)]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">Compare Career Paths</h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">Side-by-side comparison</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="label" htmlFor="path1-select">Career Path 1</label>
          <div className="relative">
            <select
              id="path1-select"
              className="select w-full appearance-none pr-10"
              value={path1Id}
              onChange={(e) => setPath1Id(e.target.value)}
            >
              {demoCareerPaths.map((p) => (
                <option key={p.id} value={p.id} disabled={p.id === path2Id}>
                  {p.title}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="path2-select">Career Path 2</label>
          <div className="relative">
            <select
              id="path2-select"
              className="select w-full appearance-none pr-10"
              value={path2Id}
              onChange={(e) => setPath2Id(e.target.value)}
            >
              {demoCareerPaths.map((p) => (
                <option key={p.id} value={p.id} disabled={p.id === path1Id}>
                  {p.title}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
          </div>
        </div>
      </div>

      {path1 && path2 && (
        <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border)] animate-[fade-in_0.3s_ease]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-surface-hover)]">
                <th className="p-4 border-b border-[var(--color-border)] w-1/3 text-[0.85rem] text-[var(--color-muted)] font-medium">Metric</th>
                <th className="p-4 border-b border-[var(--color-border)] w-1/3 font-bold text-[0.95rem] border-l">{path1.title}</th>
                <th className="p-4 border-b border-[var(--color-border)] w-1/3 font-bold text-[0.95rem] border-l">{path2.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-[var(--color-border)] text-[0.85rem] font-medium text-[var(--color-ink)]">Avg Salary Range</td>
                <td className="p-4 border-b border-[var(--color-border)] text-[0.9rem] border-l">{path1.avgSalaryRange}</td>
                <td className="p-4 border-b border-[var(--color-border)] text-[0.9rem] border-l">{path2.avgSalaryRange}</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-[var(--color-border)] text-[0.85rem] font-medium text-[var(--color-ink)]">Demand Level</td>
                <td className="p-4 border-b border-[var(--color-border)] text-[0.9rem] border-l capitalize">
                  <span className={`pill ${path1.demandLevel === 'high' ? 'pill-money' : 'pill-default'} px-2 py-0.5 text-[0.75rem]`}>
                    {path1.demandLevel}
                  </span>
                </td>
                <td className="p-4 border-b border-[var(--color-border)] text-[0.9rem] border-l capitalize">
                  <span className={`pill ${path2.demandLevel === 'high' ? 'pill-money' : 'pill-default'} px-2 py-0.5 text-[0.75rem]`}>
                    {path2.demandLevel}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-[var(--color-border)] text-[0.85rem] font-medium text-[var(--color-ink)] align-top">Core Skills</td>
                <td className="p-4 border-b border-[var(--color-border)] border-l">
                  <ul className="space-y-1">
                    {path1.skills.map(s => (
                      <li key={s} className="flex items-start gap-2 text-[0.85rem] text-[var(--color-muted)]">
                        <CheckCircle2 size={14} className="text-[var(--color-tech)] mt-0.5 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 border-b border-[var(--color-border)] border-l">
                  <ul className="space-y-1">
                    {path2.skills.map(s => (
                      <li key={s} className="flex items-start gap-2 text-[0.85rem] text-[var(--color-muted)]">
                        <CheckCircle2 size={14} className="text-[var(--color-tech)] mt-0.5 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="p-4 text-[0.85rem] font-medium text-[var(--color-ink)] align-top">First Step</td>
                <td className="p-4 text-[0.85rem] text-[var(--color-muted)] border-l">{path1.steps[0]}</td>
                <td className="p-4 text-[0.85rem] text-[var(--color-muted)] border-l">{path2.steps[0]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
