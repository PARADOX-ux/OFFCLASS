import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFreelanceRate,
  calculateBudget,
  calculateSavings,
  calculateIncomeGoal,
} from './calculators.ts';

describe('Financial Calculators Unit Tests', () => {
  describe('calculateFreelanceRate', () => {
    it('calculates project price and hourly rate correctly with valid inputs', () => {
      const result = calculateFreelanceRate(20000, 4, 10);
      assert.strictEqual(result.pricePerProject, 5000);
      assert.strictEqual(result.hourlyRate, 500);
    });

    it('handles zero hours without division by zero errors', () => {
      const result = calculateFreelanceRate(10000, 2, 0);
      assert.strictEqual(result.pricePerProject, 5000);
      assert.strictEqual(result.hourlyRate, 0);
    });

    it('defaults to at least 1 project to prevent division by zero', () => {
      const result = calculateFreelanceRate(15000, 0, 5);
      assert.strictEqual(result.pricePerProject, 15000);
      assert.strictEqual(result.hourlyRate, 3000);
    });

    it('handles negative or invalid values gracefully', () => {
      const result = calculateFreelanceRate(-5000, -2, -10);
      assert.strictEqual(result.pricePerProject, 0);
      assert.strictEqual(result.hourlyRate, 0);
    });
  });

  describe('calculateBudget', () => {
    it('sums diverse expense categories and computes remaining balance', () => {
      const expenses = {
        rent: '4000',
        food: '3000',
        transport: 1000,
        phone: '500',
        entertainment: 1500,
      };
      const result = calculateBudget(12000, expenses);
      assert.strictEqual(result.totalExpenses, 10000);
      assert.strictEqual(result.remaining, 2000);
      assert.strictEqual(result.savingsRatePercent, 17);
    });

    it('handles zero or negative income safely', () => {
      const expenses = { food: '1000' };
      const result = calculateBudget(0, expenses);
      assert.strictEqual(result.totalExpenses, 1000);
      assert.strictEqual(result.remaining, -1000);
      assert.strictEqual(result.savingsRatePercent, 0);
    });

    it('ignores invalid strings or empty expense fields', () => {
      const expenses = { rent: '', food: 'abc', transport: '2000' };
      const result = calculateBudget(5000, expenses);
      assert.strictEqual(result.totalExpenses, 2000);
      assert.strictEqual(result.remaining, 3000);
      assert.strictEqual(result.savingsRatePercent, 60);
    });
  });

  describe('calculateSavings', () => {
    it('computes monthly and weekly breakdown for savings goals', () => {
      const result = calculateSavings(10000, 2000, 4);
      assert.strictEqual(result.remaining, 8000);
      assert.strictEqual(result.monthly, 2000);
      assert.strictEqual(Math.round(result.weekly), Math.round(2000 / 4.33));
      assert.strictEqual(result.progressPercent, 20);
    });

    it('caps progress at 100% when current exceeds goal', () => {
      const result = calculateSavings(5000, 8000, 2);
      assert.strictEqual(result.remaining, 0);
      assert.strictEqual(result.monthly, 0);
      assert.strictEqual(result.progressPercent, 100);
    });
  });

  describe('calculateIncomeGoal', () => {
    it('calculates required hourly rate based on weekly hours', () => {
      const result = calculateIncomeGoal(10000, 10);
      assert.strictEqual(Math.round(result.totalHoursPerMonth), 43);
      assert.strictEqual(Math.round(result.requiredHourlyRate), Math.round(10000 / (10 * 4.33)));
    });

    it('returns 0 rate when 0 hours are available', () => {
      const result = calculateIncomeGoal(5000, 0);
      assert.strictEqual(result.totalHoursPerMonth, 0);
      assert.strictEqual(result.requiredHourlyRate, 0);
    });
  });
});
