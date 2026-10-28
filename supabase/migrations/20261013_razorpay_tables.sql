-- ============================================================
-- Supabase Migration: Razorpay Payment Tables
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Payments table — records every successful payment
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT NOT NULL UNIQUE,
  razorpay_signature TEXT NOT NULL,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('subscription', 'course')),
  plan_id TEXT,
  course_id TEXT,
  course_name TEXT,
  amount_paise INTEGER,
  amount_inr TEXT,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'captured',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Subscriptions table — tracks active subscription per user
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  plan_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('plus', 'pro')),
  interval TEXT NOT NULL CHECK (interval IN ('monthly', 'annual')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  razorpay_payment_id TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Course purchases table — tracks individual course purchases
CREATE TABLE IF NOT EXISTS course_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  course_id TEXT NOT NULL,
  course_name TEXT,
  razorpay_payment_id TEXT NOT NULL,
  amount_paise INTEGER,
  purchased_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_purchases ENABLE ROW LEVEL SECURITY;

-- Payments: Users can only read their own payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Subscriptions: Users can only read their own subscription
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Course purchases: Users can only read their own purchases
CREATE POLICY "Users can view own course purchases"
  ON course_purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Server-side insert policies (via service role key, these bypass RLS)
-- But we add explicit insert policies for extra safety
CREATE POLICY "Service can insert payments"
  ON payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service can insert subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service can update subscriptions"
  ON subscriptions FOR UPDATE
  USING (true);

CREATE POLICY "Service can insert course purchases"
  ON course_purchases FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- Indexes for common queries
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order ON payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_course_purchases_user_id ON course_purchases(user_id);
