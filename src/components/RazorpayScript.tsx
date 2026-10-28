// ============================================================
// RazorpayScript — Loads the Razorpay checkout.js script
// Add this to the root layout so it's available site-wide
// ============================================================

'use client';

import Script from 'next/script';

export default function RazorpayScript() {
  return (
    <Script
      id="razorpay-checkout"
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="lazyOnload"
    />
  );
}
