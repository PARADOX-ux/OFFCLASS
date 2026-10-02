import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'OFFCLASS disclaimer. Important information about our content, tools, and financial information.',
};

export default function DisclaimerPage() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-offwhite)]">
      <div className="container mx-auto max-w-[800px] px-6">
        <p className="section-label">Legal</p>
        <h1 className="text-display-md mb-8">Disclaimer</h1>
        <p className="text-[0.85rem] text-[var(--color-muted)] mb-12">
          Last updated: October 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">General</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              OFFCLASS is an educational and informational platform for students.
              All content, tools, calculators, and resources are provided for general
              educational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">Financial Information</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed mb-3">
              Any content related to money, earning, budgeting, or financial planning on OFFCLASS is
              strictly educational. It is NOT professional financial advice.
            </p>
            <ul className="list-disc list-inside text-[0.9rem] text-[var(--color-muted)] leading-relaxed space-y-2 ml-4">
              <li>We do not guarantee any income, earnings, or financial outcomes</li>
              <li>Earning potential depends on individual effort, skills, market conditions, and many other factors</li>
              <li>We do not recommend specific financial products, investments, or loans</li>
              <li>Always consult a qualified financial advisor for important financial decisions</li>
              <li>Calculator results are estimates only and should not be treated as financial advice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">Career Information</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              Career paths, salary ranges, and job market information are provided as general guidance.
              We do not guarantee jobs, salaries, or career outcomes. Salary ranges shown are approximate
              and vary significantly based on location, experience, company, and market conditions.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">Opportunities</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              Opportunities listed on OFFCLASS (internships, gigs, scholarships, competitions, etc.)
              are sourced from various channels. We make efforts to verify them but cannot guarantee
              their accuracy, legitimacy, or availability. Always verify opportunities independently
              and exercise caution.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">Demo Data</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              Any content marked as &quot;Demo&quot; or &quot;Demo Data&quot; is sample content used for design and
              development purposes only. It does not represent real organizations, deadlines,
              compensation, or opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] font-bold font-[var(--font-display)] mb-3">Third-Party Content</h2>
            <p className="text-[0.9rem] text-[var(--color-muted)] leading-relaxed">
              OFFCLASS may reference or link to third-party websites, tools, or platforms.
              These references are for informational purposes and do not constitute endorsement.
              We are not responsible for external content or services.
            </p>
          </section>

          <div className="p-4 bg-[rgba(234,179,8,0.08)] rounded-[var(--radius-md)]">
            <p className="text-[0.8rem] text-[#b45309]">
              Note: This is a foundational disclaimer for an early-stage platform.
              It will be updated and reviewed by legal professionals before launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
