/**
 * Mathematical logic and business calculations for OFFCLASS student financial tools.
 * Kept as pure functions to allow thorough automated unit testing.
 */

export interface FreelanceRateResult {
  pricePerProject: number;
  hourlyRate: number;
}

export function calculateFreelanceRate(
  desiredMonthly: number,
  projectsPerMonth: number = 1,
  hoursPerProject: number = 0
): FreelanceRateResult {
  const safeMonthly = Math.max(0, desiredMonthly || 0);
  const safeProjects = Math.max(1, projectsPerMonth || 1);
  const safeHours = Math.max(0, hoursPerProject || 0);

  const pricePerProject = safeMonthly / safeProjects;
  const hourlyRate = safeHours > 0 ? pricePerProject / safeHours : 0;

  return {
    pricePerProject,
    hourlyRate,
  };
}

export interface BudgetResult {
  totalExpenses: number;
  remaining: number;
  savingsRatePercent: number;
}

export function calculateBudget(
  income: number,
  expenses: Record<string, number | string>
): BudgetResult {
  const safeIncome = Math.max(0, income || 0);
  const totalExpenses = Object.values(expenses).reduce<number>((sum, val) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return sum + (Number.isFinite(num) && num > 0 ? num : 0);
  }, 0);

  const remaining = safeIncome - totalExpenses;
  const savingsRatePercent = safeIncome > 0 ? Math.round((remaining / safeIncome) * 100) : 0;

  return {
    totalExpenses,
    remaining,
    savingsRatePercent,
  };
}

export interface SavingsResult {
  remaining: number;
  monthly: number;
  weekly: number;
  progressPercent: number;
}

export function calculateSavings(
  goal: number,
  current: number = 0,
  months: number = 1
): SavingsResult {
  const safeGoal = Math.max(0, goal || 0);
  const safeCurrent = Math.max(0, current || 0);
  const safeMonths = Math.max(1, months || 1);

  const remaining = Math.max(0, safeGoal - safeCurrent);
  const monthly = remaining / safeMonths;
  const weekly = monthly / 4.33;
  const progressPercent = safeGoal > 0 ? Math.min(100, Math.round((safeCurrent / safeGoal) * 100)) : 0;

  return {
    remaining,
    monthly,
    weekly,
    progressPercent,
  };
}

export interface IncomeGoalResult {
  totalHoursPerMonth: number;
  requiredHourlyRate: number;
}

export function calculateIncomeGoal(
  monthlyGoal: number,
  hoursPerWeek: number
): IncomeGoalResult {
  const safeGoal = Math.max(0, monthlyGoal || 0);
  const safeHours = Math.max(0, hoursPerWeek || 0);

  const totalHoursPerMonth = safeHours * 4.33;
  const requiredHourlyRate = totalHoursPerMonth > 0 ? safeGoal / totalHoursPerMonth : 0;

  return {
    totalHoursPerMonth,
    requiredHourlyRate,
  };
}
