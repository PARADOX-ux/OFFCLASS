import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock content for demonstration
  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-[800px] px-6">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-[0.85rem] font-bold text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors mb-12">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Article Header */}
        <div className="mb-12 border-b border-[var(--color-border)] pb-12">
          <div className="flex items-center gap-4 text-[0.85rem] text-[var(--color-muted)] mb-6">
            <span className="pill pill-tech py-1 px-3">Career</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> Oct 4, 2026</span>
            <span>• 5 min read</span>
          </div>
          
          <h1 className="text-display-md md:text-display-lg mb-6 leading-tight">
            How to Land a Tech Internship with Zero Experience
          </h1>
          
          <div className="flex items-center gap-3 text-[0.9rem] font-medium text-[var(--color-ink)] mt-8">
            <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] flex items-center justify-center border border-[var(--color-border)]">
              <User size={18} className="text-[var(--color-muted)]" />
            </div>
            <div>
              <p>OFFCLASS Team</p>
              <p className="text-[0.75rem] text-[var(--color-muted)] font-normal">Building for students</p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none prose-headings:font-[var(--font-display)] prose-a:text-[var(--color-tech)]">
          <p className="lead text-xl text-[var(--color-muted)] mb-8">
            The biggest lie you've been told is that you need a degree or years of experience to get an internship. You don't. You need proof of work.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">1. Stop applying, start building</h2>
          <p className="mb-6 text-[var(--color-ink)] leading-relaxed">
            When you apply through a standard portal with a blank resume, you are competing against thousands of students. Instead of applying, spend that weekend building a clone of a popular app, or a simple tool that solves a real problem.
          </p>

          <div className="bg-[rgba(234,179,8,0.08)] border border-[rgba(234,179,8,0.2)] rounded-xl p-6 mb-8 text-[#b45309]">
            <strong>Pro Tip:</strong> Build something related to the company you want to work for. If you want to work at Notion, build a Notion template or extension.
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. The "Cold Email" Strategy</h2>
          <p className="mb-6 text-[var(--color-ink)] leading-relaxed">
            Find the startup founder or hiring manager on LinkedIn or Twitter. Send them a short, 3-sentence email. Don't ask for a job. Show them what you built.
          </p>
          <pre className="bg-[var(--color-ink)] text-white p-6 rounded-xl overflow-x-auto text-sm mb-8">
            Hi [Name],{'\n\n'}
            I'm a student learning React. I love [Company Name], so I spent this weekend building [Tool Name] using your API.{'\n\n'}
            Here is the link: [Link].{'\n\n'}
            Would love any feedback if you have a minute!
          </pre>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Follow up (The Fortune is in the Follow-up)</h2>
          <p className="mb-6 text-[var(--color-ink)] leading-relaxed">
            People are busy. If they don't reply in 4 days, reply to your own email with: "Hey [Name], just bumping this in case it got buried!" 50% of the time, this is the email they reply to.
          </p>
        </article>

        {/* Footer CTA */}
        <div className="mt-16 pt-12 border-t border-[var(--color-border)] text-center">
          <h3 className="text-2xl font-bold font-[var(--font-display)] mb-4">Ready to find opportunities?</h3>
          <p className="text-[var(--color-muted)] mb-6">Check out our curated list of internships, hackathons, and freelance gigs.</p>
          <Link href="/opportunities" className="btn btn-primary inline-flex">
            View Opportunities
          </Link>
        </div>

      </div>
    </div>
  );
}
