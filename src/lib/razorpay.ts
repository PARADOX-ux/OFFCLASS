// ============================================================
// Razorpay Server-side Client
// Used ONLY in API routes (server-side)
// ============================================================

import Razorpay from 'razorpay';

if (!process.env.RAZORPAY_KEY_ID) {
  console.warn('⚠ RAZORPAY_KEY_ID is not set in environment variables');
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  console.warn('⚠ RAZORPAY_KEY_SECRET is not set in environment variables');
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export default razorpayInstance;

// ============================================================
// Plan Configuration
// ============================================================

export type PlanId = 'plus_monthly' | 'plus_annual' | 'pro_monthly' | 'pro_annual';

export interface PlanConfig {
  id: PlanId;
  name: string;
  description: string;
  /** Amount in paise (₹1 = 100 paise) */
  amount: number;
  currency: string;
  interval: 'monthly' | 'annual';
  tier: 'plus' | 'pro';
}

export const PLANS: Record<PlanId, PlanConfig> = {
  plus_monthly: {
    id: 'plus_monthly',
    name: 'OFFCLASS+ Monthly',
    description: 'Monthly subscription to OFFCLASS+',
    amount: 14900, // ₹149
    currency: 'INR',
    interval: 'monthly',
    tier: 'plus',
  },
  plus_annual: {
    id: 'plus_annual',
    name: 'OFFCLASS+ Annual',
    description: 'Annual subscription to OFFCLASS+ (Save 40%)',
    amount: 118800, // ₹1,188 (₹99/mo × 12)
    currency: 'INR',
    interval: 'annual',
    tier: 'plus',
  },
  pro_monthly: {
    id: 'pro_monthly',
    name: 'OFFCLASS Pro Monthly',
    description: 'Monthly subscription to OFFCLASS Pro',
    amount: 39900, // ₹399
    currency: 'INR',
    interval: 'monthly',
    tier: 'pro',
  },
  pro_annual: {
    id: 'pro_annual',
    name: 'OFFCLASS Pro Annual',
    description: 'Annual subscription to OFFCLASS Pro (Save 25%)',
    amount: 358800, // ₹3,588 (₹299/mo × 12)
    currency: 'INR',
    interval: 'annual',
    tier: 'pro',
  },
};

// One-time course purchase helper
export interface CoursePaymentConfig {
  courseId: string;
  courseName: string;
  /** Amount in paise */
  amount: number;
  currency: string;
}
