// ============================================================
// Razorpay Server-side Client
// Used ONLY in API routes (server-side)
// ============================================================

import Razorpay from 'razorpay';

export const isRazorpayConfigured = Boolean(
  process.env.RAZORPAY_KEY_ID &&
  process.env.RAZORPAY_KEY_SECRET &&
  !process.env.RAZORPAY_KEY_ID.includes('placeholder')
);

const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_placeholder';
const keySecret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret';

const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
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
