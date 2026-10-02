import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'OFFCLASS privacy policy. How we handle your data, what we collect, and your rights.',
};

export default function PrivacyPage() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-offwhite)]">
      <div className="container mx-auto max-w-[800px] px-6">
        <p className="section-label">Legal</p>
        <h1 className="text-display-md mb-8">Privacy Policy</h1>
        <p className="text-[0.85rem] text-[var(--color-muted)] mb-12">
          Last updated: October 2026
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">1. What This Policy Covers</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              This privacy policy explains how OFFCLASS collects, uses, and protects your
              information when you use our website and services. We believe in being transparent
              about data practices.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">2. Information We May Collect</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed mb-3">
              When you use OFFCLASS, we may collect:
            </p>
            <ul className="list-disc list-inside text-[0.9rem] text-[var(--color-muted)] leading-relaxed space-y-2 ml-4">
              <li>Information you provide directly (name, email, when you contact us or sign up)</li>
              <li>Usage data (pages viewed, tools used, interactions)</li>
              <li>Device and browser information for improving the experience</li>
              <li>Cookies for essential functionality and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-[0.9rem] text-[var(--color-muted)] leading-relaxed space-y-2 ml-4">
              <li>To provide and improve our services</li>
              <li>To personalize your experience (if you create a profile)</li>
              <li>To communicate with you when you reach out</li>
              <li>To understand how the platform is used and improve it</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">4. What We Don&apos;t Do</h2>
            <ul className="list-disc list-inside text-[0.9rem] text-[var(--color-muted)] leading-relaxed space-y-2 ml-4">
              <li>We do not sell your personal data</li>
              <li>We do not share your data with third parties for their marketing</li>
              <li>We do not collect data we don&apos;t need</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">5. Your Rights</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              You have the right to access, correct, or delete your personal data.
              You can contact us at any time to exercise these rights. We aim to respond
              to all requests promptly.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">6. Contact</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              For privacy-related questions, contact us at privacy@offclass.in (placeholder).
            </p>
          </section>

          <div className="p-4 bg-[rgba(234,179,8,0.08)] rounded-[var(--radius-md)]">
            <p className="text-[0.8rem] text-[#b45309]">
              Note: This is a foundational privacy policy for an early-stage platform.
              It will be updated and reviewed by legal professionals before launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
