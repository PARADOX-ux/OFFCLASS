'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function BudgetCalculator() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState({
    rent: '',
    food: '',
    transport: '',
    phone: '',
    entertainment: '',
    other: '',
  });

  const totalExpenses = Object.values(expenses).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );
  const remaining = (parseFloat(income) || 0) - totalExpenses;

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(183,243,74,0.15)] flex items-center justify-center">
          <Calculator size={20} className="text-[#5a7a1a]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">
            Student Budget Calculator
          </h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">
            Plan your monthly budget
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label" htmlFor="budget-income">Monthly Income (₹)</label>
          <input
            id="budget-income"
            type="number"
            className="input"
            placeholder="e.g., 5000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            aria-label="Monthly income in rupees"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(expenses).map(([key, val]) => (
            <div key={key}>
              <label className="label" htmlFor={`budget-${key}`}>
                {key.charAt(0).toUpperCase() + key.slice(1)} (₹)
              </label>
              <input
                id={`budget-${key}`}
                type="number"
                className="input"
                placeholder="0"
                value={val}
                onChange={(e) =>
                  setExpenses({ ...expenses, [key]: e.target.value })
                }
                aria-label={`${key} expense in rupees`}
              />
            </div>
          ))}
        </div>

        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)] mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[0.85rem] text-[var(--color-muted)]">Total expenses</span>
            <span className="font-bold font-[var(--font-display)]">₹{totalExpenses.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[0.85rem] text-[var(--color-muted)]">Remaining</span>
            <span
              className={`text-[1.2rem] font-bold font-[var(--font-display)] ${
                remaining >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'
              }`}
            >
              ₹{remaining.toLocaleString()}
            </span>
          </div>
          {remaining < 0 && (
            <p className="text-[0.8rem] text-[#dc2626] mt-2">
              Your expenses exceed your income. Consider adjusting your budget.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
