import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const metadata = {
  title: 'Blog — OFFCLASS',
  description: 'Articles and guides to help you navigate college, career, and money.',
};

const posts = [
  {
    id: 'how-to-land-internships',
    title: 'How to Land a Tech Internship with Zero Experience',
    excerpt: 'The exact step-by-step strategy to build a portfolio and get hired without a degree.',
    date: 'Oct 4, 2026',
    author: 'OFFCLASS Team',
    category: 'Career',
    readTime: '5 min read'
  },
  {
    id: 'student-budgeting-101',
    title: 'Student Budgeting 101: Stop Being Broke',
    excerpt: 'A practical, no-BS guide to managing your money, saving more, and living better in college.',
    date: 'Sep 28, 2026',
    author: 'OFFCLASS Team',
    category: 'Money',
    readTime: '4 min read'
  },
  {
    id: 'networking-on-campus',
    title: 'How to Network on Campus Without Being Awkward',
    excerpt: 'Building real relationships with professors and peers that actually matter.',
    date: 'Sep 15, 2026',
    author: 'OFFCLASS Team',
    category: 'Campus',
    readTime: '6 min read'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-[1200px] px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="section-label">Read</p>
          <h1 className="text-display-lg mb-6">The OFFCLASS Blog</h1>
          <p className="text-body-lg text-[var(--color-muted)]">
            Practical guides, unfiltered advice, and actionable strategies for students building a life beyond the classroom.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Link href={`/blog/${posts[0].id}`} className="block group">
            <div className="card-flat bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 md:p-12 hover:border-[var(--color-tech)] transition-colors overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-tech)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 text-[0.8rem] text-[var(--color-muted)] mb-4">
                  <span className="pill pill-tech py-0.5">{posts[0].category}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {posts[0].date}</span>
                  <span>• {posts[0].readTime}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-[var(--font-display)] mb-6 group-hover:text-[var(--color-tech)] transition-colors">
                  {posts[0].title}
                </h2>
                <p className="text-lg text-[var(--color-muted)] mb-8 max-w-2xl">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[var(--color-ink)]">
                    <User size={16} className="text-[var(--color-muted)]" />
                    {posts[0].author}
                  </div>
                  <span className="text-[var(--color-tech)] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block group">
              <div className="card h-full flex flex-col hover:border-[var(--color-tech)] transition-colors">
                <div className="flex items-center gap-3 text-[0.75rem] text-[var(--color-muted)] mb-4">
                  <span className="text-[var(--color-tech)] font-bold">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold font-[var(--font-display)] mb-3 group-hover:text-[var(--color-tech)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[0.9rem] text-[var(--color-muted)] mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[0.8rem] font-medium text-[var(--color-ink)] mt-auto pt-4 border-t border-[var(--color-border)]">
                  Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
