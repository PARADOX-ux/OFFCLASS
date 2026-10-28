// ============================================================
// POST /api/razorpay/verify-payment
// Verifies Razorpay payment signature and saves to Supabase
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { isRazorpayConfigured } from '@/lib/razorpay';

// Use service role key for server-side Supabase operations (with safe fallback for build-time evaluation)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
);

export async function POST(request: NextRequest) {
  try {
    if (!isRazorpayConfigured) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured on this environment.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      userEmail,
      planId,
      courseId,
      courseName,
      amount,
      type, // 'subscription' | 'course'
    } = body;

    // ── Step 0: Validate required payload ─────────────────────
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment signature verification parameters' },
        { status: 400 }
      );
    }
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Payment verification failed — invalid signature' },
        { status: 400 }
      );
    }

    // ── Step 2: Save payment record to Supabase ────────────────
    const paymentRecord = {
      user_id: userId,
      user_email: userEmail,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      payment_type: type || 'subscription',
      plan_id: planId || null,
      course_id: courseId || null,
      course_name: courseName || null,
      amount_paise: amount,
      amount_inr: amount ? (amount / 100).toFixed(2) : null,
      currency: 'INR',
      status: 'captured',
      created_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabaseAdmin
      .from('payments')
      .insert(paymentRecord);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      // Payment was verified even if DB insert fails — don't fail the user
    }

    // ── Step 3: Update user subscription if it's a plan ────────
    if (type === 'subscription' && planId && userId) {
      const now = new Date();
      const isAnnual = planId.includes('annual');
      const tier = planId.includes('pro') ? 'pro' : 'plus';
      const expiresAt = new Date(now);
      if (isAnnual) {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }

      const { error: upsertError } = await supabaseAdmin
        .from('subscriptions')
        .upsert(
          {
            user_id: userId,
            plan_id: planId,
            tier,
            interval: isAnnual ? 'annual' : 'monthly',
            status: 'active',
            razorpay_payment_id,
            started_at: now.toISOString(),
            expires_at: expiresAt.toISOString(),
            updated_at: now.toISOString(),
          },
          { onConflict: 'user_id' }
        );

      if (upsertError) {
        console.error('Supabase subscription upsert error:', upsertError);
      }
    }

    // ── Step 4: Save course purchase ───────────────────────────
    if (type === 'course' && courseId && userId) {
      const { error: courseError } = await supabaseAdmin
        .from('course_purchases')
        .insert({
          user_id: userId,
          course_id: courseId,
          course_name: courseName || null,
          razorpay_payment_id,
          amount_paise: amount,
          purchased_at: new Date().toISOString(),
        });

      if (courseError) {
        console.error('Supabase course purchase error:', courseError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error('Razorpay verify-payment error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
