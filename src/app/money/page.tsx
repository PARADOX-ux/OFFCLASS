'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  IndianRupee,
  Laptop,
  Clock,
  Building2,
  Sparkles,
  GraduationCap,
  Wrench,
  Calculator,
  Target,
  ShieldAlert,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { earningPathways, demoTools } from '@/lib/data';

const pathwayIcons: Record<string, React.ReactNode> = {
  Laptop: <Laptop size={24} />,
  Clock: <Clock size={24} />,
  Building2: <Building2 size={24} />,
  Sparkles: <Sparkles size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  Wrench: <Wrench size={24} />,
};

// ============================================================
// Budget Calculator Component
// ============================================================

function BudgetCalculator() {
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

// ============================================================
// Savings Goal Calculator
// ============================================================

function SavingsCalculator() {
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
          <input
            id="savings-goal"
            type="number"
            className="input"
            placeholder="e.g., 10000"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="savings-current">Currently Saved (₹)</label>
          <input
            id="savings-current"
            type="number"
            className="input"
            placeholder="e.g., 2000"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="savings-months">Months to Reach Goal</label>
          <input
            id="savings-months"
            type="number"
            className="input"
            placeholder="e.g., 6"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>

        {goalNum > 0 && (
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)]">
            <div className="mb-3">
              <div className="progress-bar">
                <div
                  className="progress-fill progress-fill-tech"
                  style={{ width: `${Math.min(100, (currentNum / goalNum) * 100)}%` }}
                />
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

// ============================================================
// Freelance Pricing Calculator
// ============================================================

function FreelancePricingCalculator() {
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
          <input
            id="pricing-monthly"
            type="number"
            className="input"
            placeholder="e.g., 10000"
            value={desiredMonthly}
            onChange={(e) => setDesiredMonthly(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="pricing-projects">Projects per Month</label>
          <input
            id="pricing-projects"
            type="number"
            className="input"
            placeholder="e.g., 4"
            value={projectsPerMonth}
            onChange={(e) => setProjectsPerMonth(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="pricing-hours">Hours per Project</label>
          <input
            id="pricing-hours"
            type="number"
            className="input"
            placeholder="e.g., 8"
            value={hoursPerProject}
            onChange={(e) => setHoursPerProject(e.target.value)}
          />
        </div>

        {monthly > 0 && (
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)]">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[0.75rem] text-[var(--color-muted)]">Charge per project</p>
                <p className="text-[1.2rem] font-bold font-[var(--font-display)] text-[var(--color-ink)]">
                  ₹{Math.ceil(pricePerProject).toLocaleString()}
                </p>
              </div>
              {hours > 0 && (
                <div>
                  <p className="text-[0.75rem] text-[var(--color-muted)]">Hourly rate</p>
                  <p className="text-[1.2rem] font-bold font-[var(--font-display)] text-[var(--color-ink)]">
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

// ============================================================
// Money Education Accordion
// ============================================================

function MoneyEducation() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const topics = [
    {
      title: 'Budgeting basics',
      content:
        'Track your income and expenses. The simplest approach: 50% needs, 30% wants, 20% savings. Even saving ₹500/month builds a habit that compounds over time.',
    },
    {
      title: 'Emergency savings',
      content:
        'Try to keep at least 1–2 months of basic expenses saved. Start small — even ₹1,000 set aside gives you breathing room for unexpected costs.',
    },
    {
      title: 'Recognizing scams',
      content:
        'Be cautious of anything that promises guaranteed income, asks for money upfront, or sounds too good to be true. Remote data-entry jobs and "pay-to-unlock-work" schemes are common scams targeting students. Never pay to get a job or share banking OTPs with recruiters.',
    },
    {
      title: 'Tax basics for students',
      content:
        'If you earn above the basic exemption limit, you need to file taxes. Freelance income is taxable. Keep records of your earnings. Consult a tax professional for specific advice.',
    },
    {
      title: 'Understanding financial terms',
      content:
        'EMI = monthly installment. APR = annual interest rate. Credit score = your borrowing reputation. UPI = digital payment. GST = goods & services tax. Learn these before making financial decisions.',
    },
  ];

  return (
    <div className="space-y-3">
      {topics.map((topic, i) => (
        <div
          key={topic.title}
          className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-expanded={openIndex === i}
          >
            <span className="text-[0.95rem] font-semibold font-[var(--font-display)]">
              {topic.title}
            </span>
            {openIndex === i ? (
              <ChevronUp size={16} className="text-[var(--color-muted)] flex-shrink-0" />
            ) : (
              <ChevronDown size={16} className="text-[var(--color-muted)] flex-shrink-0" />
            )}
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4">
              <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
                {topic.content}
              </p>
              <p className="text-[0.75rem] text-[var(--color-muted)] mt-3 italic">
                This is educational content, not professional financial advice.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MONEY PAGE
// ============================================================

export default function MoneyPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-offwhite)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--color-money)] opacity-[0.06] blur-[100px]" />

        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <RevealSection>
            <p className="section-label text-[#5a7a1a]">Money</p>
            <h1 className="text-display-lg mb-6 max-w-[600px]">
              Your first money starts with your first move.
            </h1>
            <p className="text-body-lg text-[var(--color-muted)] mb-8 max-w-[520px]">
              Discover realistic ways to earn, learn to manage your budget, and build the
              foundation for financial independence — all as a student.
            </p>
            <div className="flex items-center gap-3 p-3 bg-[rgba(234,179,8,0.08)] rounded-[var(--radius-md)] max-w-fit">
              <ShieldAlert size={16} className="text-[#b45309]" />
              <p className="text-[0.8rem] text-[#b45309]">
                We don&apos;t guarantee earnings. All content is educational, not financial advice.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection delay={0.2}>
            <Link href="/courses/investing-101" className="block group">
              <div className="bg-[var(--color-offwhite-dark)] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between border border-[var(--color-border)] hover:border-[var(--color-money)] hover:shadow-sm transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[var(--color-money)] text-[var(--color-ink)] flex items-center justify-center flex-shrink-0">
                    <BookOpen size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[0.65rem] font-bold tracking-wider text-[var(--color-tech)] bg-[rgba(49,87,213,0.1)] px-2 py-0.5 rounded-full uppercase">
                        Featured Course
                      </span>
                      <span className="text-[0.75rem] text-[var(--color-muted)]">45 mins</span>
                    </div>
                    <h3 className="font-bold text-[1.1rem] font-[var(--font-display)] text-[var(--color-ink)] group-hover:text-[var(--color-money)] transition-colors">
                      The Blueprint to Modern Investing
                    </h3>
                    <p className="text-[0.85rem] text-[var(--color-muted)] mt-1">
                      Learn the fundamentals of building wealth. From index funds to basic strategies.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center text-[0.85rem] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-money)] transition-colors">
                  Start Learning
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Earning Pathways */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Earning Pathways</p>
            <h2 className="text-display-sm mb-4">
              Realistic ways students can earn.
            </h2>
            <p className="text-[0.95rem] text-[var(--color-muted)] mb-12 max-w-[480px]">
              Each pathway has different requirements, time commitments, and earning potential.
              Choose what fits your situation.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {earningPathways.map((p, i) => (
              <RevealSection key={p.title} delay={i * 0.06}>
                <div className="card h-full">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-offwhite-dark)] flex items-center justify-center mb-4 text-[var(--color-ink)]">
                    {pathwayIcons[p.iconName]}
                  </div>
                  <h3 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-[0.85rem] text-[var(--color-muted)] mb-4 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.examples.map((e) => (
                      <span key={e} className="text-[0.72rem] bg-[var(--color-offwhite-dark)] text-[var(--color-muted)] px-2.5 py-1 rounded-md">
                        {e}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[0.8rem] text-[var(--color-muted)] pt-3 border-t border-[var(--color-border)]">
                    <span>Difficulty: {p.difficulty}</span>
                    <span>First earning: {p.timeToFirstEarning}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* First ₹1,000 Roadmap */}
      <section className="section bg-[var(--color-ink)] text-[var(--color-offwhite)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--color-money)] opacity-[0.04] blur-[120px]" />

        <div className="container mx-auto max-w-[1320px] px-6 relative z-10">
          <RevealSection>
            <p className="section-label text-[var(--color-money)]">Your First Step</p>
            <h2 className="text-display-md mb-6 max-w-[500px]">
              Your First <span className="text-[var(--color-money)]">₹1,000</span> Roadmap
            </h2>
            <p className="text-[0.95rem] text-[var(--color-muted-light)] mb-4 max-w-[480px]">
              A practical step-by-step approach to making your first income as a student.
            </p>
            <p className="text-[0.8rem] text-[var(--color-muted)] mb-12 max-w-[480px]">
              Results vary. This is a framework, not a guarantee.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Identify your skills', desc: 'What can you already do? Writing, design, coding, photography, communication?' },
              { step: '02', title: 'Choose your path', desc: 'Pick one earning pathway that matches your skills, time, and preferences.' },
              { step: '03', title: 'Build proof', desc: 'Create 2–3 sample projects or work pieces that demonstrate your capability.' },
              { step: '04', title: 'Create a portfolio', desc: 'Put your samples online — even a simple one-page site or document works.' },
              { step: '05', title: 'Find prospects', desc: 'Look for people/businesses who need what you offer — locally or online.' },
              { step: '06', title: 'Make your offer', desc: 'Reach out with a clear, honest message about what you can do and your price.' },
              { step: '07', title: 'Deliver & earn', desc: 'Complete your first project. Earn your first income. Get a review if possible.' },
              { step: '08', title: 'Repeat & improve', desc: 'Refine your skills, raise your rates, and build a sustainable earning system.' },
            ].map((item, i) => (
              <RevealSection key={item.step} delay={i * 0.06}>
                <div className="p-5 rounded-[var(--radius-md)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(183,243,74,0.2)] transition-colors h-full">
                  <span className="text-[0.7rem] font-bold font-[var(--font-display)] text-[var(--color-money)]">
                    STEP {item.step}
                  </span>
                  <h3 className="text-[1rem] font-bold font-[var(--font-display)] mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[0.8rem] text-[var(--color-muted-light)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Student Money Tools */}
      <section id="tools" className="section bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <RevealSection>
            <p className="section-label">Money Tools</p>
            <h2 className="text-display-sm mb-4">
              Tools that actually help you plan.
            </h2>
            <p className="text-[0.95rem] text-[var(--color-muted)] mb-14 max-w-[480px]">
              Interactive calculators for budgeting, saving, and pricing your freelance work.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="budget-calculator">
            <RevealSection>
              <BudgetCalculator />
            </RevealSection>
            <RevealSection delay={0.1}>
              <SavingsCalculator />
            </RevealSection>
          </div>

          <div className="mt-8" id="freelance-pricing">
            <RevealSection delay={0.2}>
              <div className="max-w-[600px]">
                <FreelancePricingCalculator />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Money Education */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RevealSection>
              <div>
                <p className="section-label">Financial Literacy</p>
                <h2 className="text-display-sm mb-4">
                  Money basics every student should know.
                </h2>
                <p className="text-[0.95rem] text-[var(--color-muted)] mb-6 max-w-[440px]">
                  Practical financial knowledge — not investment advice, not get-rich schemes.
                  Just the fundamentals.
                </p>
                <div className="flex items-center gap-3 p-3 bg-[rgba(49,87,213,0.06)] rounded-[var(--radius-md)] max-w-fit">
                  <BookOpen size={16} className="text-[var(--color-tech)]" />
                  <p className="text-[0.8rem] text-[var(--color-tech)]">
                    Educational content only. Not professional financial advice.
                  </p>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <MoneyEducation />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6 text-center">
          <RevealSection>
            <h2 className="text-display-sm mb-4">
              Ready to explore more?
            </h2>
            <p className="text-[0.95rem] text-[var(--color-muted)] mb-8">
              Money is just one pillar. Build skills, find careers, and navigate campus life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/skills" className="btn btn-primary">
                Explore Skills
                <ArrowRight size={14} />
              </Link>
              <Link href="/opportunities" className="btn btn-outline">
                Browse Opportunities
                <ArrowRight size={14} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
