import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'OFFCLASS terms of service. Rules for using the platform, limitations, and your responsibilities.',
};

export default function TermsPage() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-offwhite)]">
      <div className="container mx-auto max-w-[800px] px-6">
        <p className="section-label">Legal</p>
        <h1 className="text-display-md mb-8">Terms of Service</h1>
        <p className="text-[0.85rem] text-[var(--color-muted)] mb-12">
          Last updated: October 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">1. Acceptance</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              By using OFFCLASS, you agree to these terms. If you don&apos;t agree, please don&apos;t use the platform.
              We keep these terms as readable as possible.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">2. What OFFCLASS Provides</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              OFFCLASS provides educational content, tools, resources, and opportunity listings for students.
              We do not guarantee specific outcomes from using the platform — including but not limited to
              income, jobs, or career results.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">3. Your Responsibilities</h2>
            <ul className="list-disc list-inside text-[0.9rem] text-[var(--color-muted)] leading-relaxed space-y-2 ml-4">
              <li>You are responsible for how you use the content and tools on OFFCLASS</li>
              <li>You should not misuse the platform or submit false information</li>
              <li>You should not use OFFCLASS for illegal activities</li>
              <li>You are responsible for your own financial and career decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">4. Content</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              Content on OFFCLASS is for educational and informational purposes only.
              It does not constitute professional financial, legal, or career advice.
              Always consult qualified professionals for important decisions.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">5. Third-Party Links</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              OFFCLASS may link to third-party websites, opportunities, or resources.
              We are not responsible for the content, accuracy, or practices of those external sites.
              Always verify information independently.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">6. Limitation of Liability</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              OFFCLASS is provided &quot;as is&quot; without warranties. We are not liable for any damages
              arising from your use of the platform, tools, or content.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">7. Changes</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              We may update these terms from time to time. Continued use of the platform
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <div className="p-4 bg-[rgba(234,179,8,0.08)] rounded-[var(--radius-md)]">
            <p className="text-[0.8rem] text-[#b45309]">
              Note: This is a foundational terms document for an early-stage platform.
              It will be updated and reviewed by legal professionals before launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
