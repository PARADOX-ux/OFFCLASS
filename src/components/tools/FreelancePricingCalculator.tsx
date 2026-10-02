'use client';

import { useState } from 'react';
import { IndianRupee } from 'lucide-react';

export default function FreelancePricingCalculator() {
  const [hoursPerProject, setHoursPerProject] = useState('');
  const [desiredMonthly, setDesiredMonthly] = useState('');
  const [projectsPerMonth, setProjectsPerMonth] = useState('');

  const hours = parseFloat(hoursPerProject) || 0;
  const monthly = parseFloat(desiredMonthly) || 0;
  const projects = parseInt(projectsPerMonth) || 1;

  const pricePerProject = monthly / projects;
  const hourlyRate = hours > 0 ? pricePerProject / hours : 0;

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(183,243,74,0.15)] flex items-center justify-center">
          <IndianRupee size={20} className="text-[#5a7a1a]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">
            Freelance Pricing Calculator
          </h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">
            Figure out what to charge
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label" htmlFor="pricing-monthly">Desired Monthly Income (₹)</label>
          <input id="pricing-monthly" type="number" className="input" placeholder="e.g., 10000" value={desiredMonthly} onChange={(e) => setDesiredMonthly(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="pricing-projects">Projects per Month</label>
          <input id="pricing-projects" type="number" className="input" placeholder="e.g., 4" value={projectsPerMonth} onChange={(e) => setProjectsPerMonth(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="pricing-hours">Hours per Project</label>
          <input id="pricing-hours" type="number" className="input" placeholder="e.g., 8" value={hoursPerProject} onChange={(e) => setHoursPerProject(e.target.value)} />
        </div>

        {monthly > 0 && (
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)]">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[0.75rem] text-[var(--color-muted)]">Charge per project</p>
                <p className="text-[1.2rem] font-bold font-[var(--font-display)]">
                  ₹{Math.ceil(pricePerProject).toLocaleString()}
                </p>
              </div>
              {hours > 0 && (
                <div>
                  <p className="text-[0.75rem] text-[var(--color-muted)]">Hourly rate</p>
                  <p className="text-[1.2rem] font-bold font-[var(--font-display)]">
                    ₹{Math.ceil(hourlyRate).toLocaleString()}/hr
                  </p>
                </div>
              )}
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted)] mt-3">
              These are starting estimates. Adjust based on your market, experience, and client budget.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
