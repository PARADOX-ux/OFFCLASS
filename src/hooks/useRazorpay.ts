// ============================================================
// useRazorpay — Client-side hook for Razorpay checkout
// ============================================================

'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface UseRazorpayOptions {
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

interface SubscriptionPayload {
  type: 'subscription';
  planId: string;
}

interface CoursePayload {
  type: 'course';
  courseId: string;
  courseName: string;
  /** Amount in paise */
  amount: number;
}

type CheckoutPayload = SubscriptionPayload | CoursePayload;

export function useRazorpay(options: UseRazorpayOptions = {}) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const checkout = useCallback(
    async (payload: CheckoutPayload) => {
      if (!user) {
        options.onError?.('Please log in to continue');
        return;
      }

      // Check if Razorpay script is loaded
      if (typeof window.Razorpay === 'undefined') {
        options.onError?.('Payment system is loading. Please try again.');
        return;
      }

      setIsProcessing(true);
      setPaymentStatus('processing');

      try {
        // Step 1: Create order on the server
        const orderBody =
          payload.type === 'subscription'
            ? {
                planId: payload.planId,
                userId: user.id,
                userEmail: user.email,
              }
            : {
                courseId: payload.courseId,
                courseName: payload.courseName,
                amount: payload.amount,
                userId: user.id,
                userEmail: user.email,
              };

        const orderRes = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderBody),
        });

        if (!orderRes.ok) {
          const errData = await orderRes.json();
          throw new Error(errData.error || 'Failed to create order');
        }

        const orderData = await orderRes.json();

        // Step 2: Open Razorpay checkout
        const razorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'OFFCLASS',
          description: orderData.description,
          order_id: orderData.orderId,
          prefill: {
            name: user.user_metadata?.full_name || '',
            email: user.email || '',
          },
          theme: {
            color: '#1a1a1a',
            backdrop_color: 'rgba(0,0,0,0.6)',
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
              setPaymentStatus('idle');
            },
          },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            // Step 3: Verify payment on the server
            try {
              const verifyRes = await fetch('/api/razorpay/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...response,
                  userId: user.id,
                  userEmail: user.email,
                  ...(payload.type === 'subscription'
                    ? { planId: (payload as SubscriptionPayload).planId, type: 'subscription', amount: orderData.amount }
                    : {
                        courseId: (payload as CoursePayload).courseId,
                        courseName: (payload as CoursePayload).courseName,
                        type: 'course',
                        amount: orderData.amount,
                      }),
                }),
              });

              if (!verifyRes.ok) {
                const errData = await verifyRes.json();
                throw new Error(errData.error || 'Payment verification failed');
              }

              setPaymentStatus('success');
              options.onSuccess?.(response.razorpay_payment_id);

              // Reset after success animation
              setTimeout(() => {
                setPaymentStatus('idle');
              }, 4000);
            } catch (verifyError: any) {
              setPaymentStatus('error');
              options.onError?.(verifyError.message);
            } finally {
              setIsProcessing(false);
            }
          },
        };

        const rzp = new window.Razorpay(razorpayOptions);

        rzp.on('payment.failed', (response: any) => {
          setIsProcessing(false);
          setPaymentStatus('error');
          options.onError?.(
            response.error?.description || 'Payment failed. Please try again.'
          );
          // Reset after error state
          setTimeout(() => setPaymentStatus('idle'), 4000);
        });

        rzp.open();
      } catch (error: any) {
        setIsProcessing(false);
        setPaymentStatus('error');
        options.onError?.(error.message || 'Something went wrong');
        setTimeout(() => setPaymentStatus('idle'), 4000);
      }
    },
    [user, options]
  );

  return {
    checkout,
    isProcessing,
    paymentStatus,
  };
}
