// ============================================================
// POST /api/razorpay/create-order
// Creates a Razorpay order for subscription plans or course purchases
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import razorpay, { PLANS, type PlanId } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, courseId, courseName, amount: courseAmount, userId, userEmail } = body;

    let amount: number;
    let currency = 'INR';
    let receipt: string;
    let description: string;
    let notes: Record<string, string> = {};

    if (planId) {
      // Subscription plan payment
      const plan = PLANS[planId as PlanId];
      if (!plan) {
        return NextResponse.json(
          { error: 'Invalid plan ID' },
          { status: 400 }
        );
      }
      amount = plan.amount;
      currency = plan.currency;
      receipt = `sub_${planId}_${Date.now()}`;
      description = plan.description;
      notes = {
        type: 'subscription',
        plan_id: planId,
        tier: plan.tier,
        interval: plan.interval,
        user_id: userId || '',
        user_email: userEmail || '',
      };
    } else if (courseId && courseAmount) {
      // Validate that courseAmount is a positive integer (in paise)
      const parsedAmount = parseInt(String(courseAmount), 10);
      if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > 5000000) {
        return NextResponse.json(
          { error: 'Invalid course amount' },
          { status: 400 }
        );
      }
      // One-time course purchase
      amount = parsedAmount;
      receipt = `course_${courseId}_${Date.now()}`;
      description = `Purchase: ${courseName || courseId}`;
      notes = {
        type: 'course',
        course_id: String(courseId).slice(0, 50),
        course_name: String(courseName || courseId).slice(0, 100),
        user_id: userId ? String(userId).slice(0, 60) : '',
        user_email: userEmail ? String(userEmail).slice(0, 100) : '',
      };
    } else {
      return NextResponse.json(
        { error: 'Either planId or courseId with amount is required' },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      description,
      notes,
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
