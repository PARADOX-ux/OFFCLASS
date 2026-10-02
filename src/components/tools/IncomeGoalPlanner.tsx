'use client';

import { useState } from 'react';
import { Target } from 'lucide-react';

export default function IncomeGoalPlanner() {
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [skill, setSkill] = useState('');

  const goal = parseFloat(monthlyGoal) || 0;
  const hours = parseInt(hoursPerWeek) || 0;
  const totalHoursPerMonth = hours * 4.33;
  const requiredHourlyRate = totalHoursPerMonth > 0 ? goal / totalHoursPerMonth : 0;

  return (
    <div className="card p-6 md:p-8" id="income-goal">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(183,243,74,0.15)] flex items-center justify-center">
          <Target size={20} className="text-[#5a7a1a]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">Income Goal Planner</h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">Plan your income target</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label" htmlFor="income-goal-monthly">Monthly income goal (₹)</label>
          <input id="income-goal-monthly" type="number" className="input" placeholder="e.g., 5000" value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="income-goal-hours">Hours available per week</label>
          <input id="income-goal-hours" type="number" className="input" placeholder="e.g., 10" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="income-goal-skill">Primary skill</label>
          <select id="income-goal-skill" className="select" value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option value="">Select a skill...</option>
            <option value="writing">Writing</option>
            <option value="design">Design</option>
            <option value="coding">Web Development</option>
            <option value="video">Video Editing</option>
            <option value="marketing">Digital Marketing</option>
            <option value="data">Data Analysis</option>
            <option value="photography">Photography</option>
            <option value="tutoring">Tutoring</option>
          </select>
        </div>

        {goal > 0 && hours > 0 && (
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)] animate-[fade-in_0.3s_ease]">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-[0.75rem] text-[var(--color-muted)]">Required hourly rate</p>
                <p className="text-[1.2rem] font-bold font-[var(--font-display)]">
                  ₹{Math.ceil(requiredHourlyRate).toLocaleString()}/hr
                </p>
              </div>
              <div>
                <p className="text-[0.75rem] text-[var(--color-muted)]">Total hours/month</p>
                <p className="text-[1.2rem] font-bold font-[var(--font-display)]">
                  ~{Math.round(totalHoursPerMonth)}h
                </p>
              </div>
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted)]">
              This is a planning estimate. Actual earnings depend on skill level, market demand, and effort.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
