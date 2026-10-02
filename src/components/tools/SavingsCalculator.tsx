'use client';

import { useState } from 'react';
import { Target } from 'lucide-react';

export default function SavingsCalculator() {
  const [goal, setGoal] = useState('');
  const [months, setMonths] = useState('');
  const [current, setCurrent] = useState('');

  const goalNum = parseFloat(goal) || 0;
  const monthsNum = parseInt(months) || 1;
  const currentNum = parseFloat(current) || 0;
  const remaining = Math.max(0, goalNum - currentNum);
  const monthly = remaining / monthsNum;
  const weekly = monthly / 4.33;

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(49,87,213,0.1)] flex items-center justify-center">
          <Target size={20} className="text-[var(--color-tech)]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">
            Savings Goal Calculator
          </h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">
            Figure out how much to save
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label" htmlFor="savings-goal">Savings Goal (₹)</label>
          <input id="savings-goal" type="number" className="input" placeholder="e.g., 10000" value={goal} onChange={(e) => setGoal(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="savings-current">Currently Saved (₹)</label>
          <input id="savings-current" type="number" className="input" placeholder="e.g., 2000" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="savings-months">Months to Reach Goal</label>
          <input id="savings-months" type="number" className="input" placeholder="e.g., 6" value={months} onChange={(e) => setMonths(e.target.value)} />
        </div>

        {goalNum > 0 && (
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)]">
            <div className="mb-3">
              <div className="progress-bar">
                <div className="progress-fill progress-fill-tech" style={{ width: `${Math.min(100, (currentNum / goalNum) * 100)}%` }} />
              </div>
              <p className="text-[0.75rem] text-[var(--color-muted)] mt-1">
                {Math.round((currentNum / goalNum) * 100)}% saved
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[0.75rem] text-[var(--color-muted)]">Save monthly</p>
                <p className="text-[1.1rem] font-bold font-[var(--font-display)] text-[var(--color-tech)]">
                  ₹{Math.ceil(monthly).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[0.75rem] text-[var(--color-muted)]">Save weekly</p>
                <p className="text-[1.1rem] font-bold font-[var(--font-display)] text-[var(--color-tech)]">
                  ₹{Math.ceil(weekly).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
