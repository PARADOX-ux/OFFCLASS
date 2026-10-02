'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { InternshipTracker, TimePlanner } from '@/components/tools';
import { LogOut, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { demoOpportunities, demoSkills } from '@/lib/data';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [savedOpps, setSavedOpps] = useState<any[]>([]);
  const [savedSkills, setSavedSkills] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const oppIds = JSON.parse(localStorage.getItem('offclass-saved-opportunitys') || '[]');
    const skillIds = JSON.parse(localStorage.getItem('offclass-saved-skills') || '[]');
    
    setSavedOpps(demoOpportunities.filter(o => oppIds.includes(o.id)));
    setSavedSkills(demoSkills.filter(s => skillIds.includes(s.id)));
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!mounted || loading || !user) {
    return (
      <div className="container mx-auto px-6 py-20 flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-tech)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <section className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] py-8">
        <div className="container mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[rgba(49,87,213,0.1)] text-[var(--color-tech)] flex items-center justify-center flex-shrink-0">
                <User size={32} />
              </div>
              <div>
                <h1 className="text-[1.8rem] font-bold font-[var(--font-display)]">
                  Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'Student'}
                </h1>
                <p className="text-[0.9rem] text-[var(--color-muted)]">{user.email}</p>
              </div>
            </div>
            <button onClick={signOut} className="btn btn-outline btn-sm self-start md:self-auto">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-[1.2rem] font-bold font-[var(--font-display)] mb-4">Saved Opportunities</h2>
              {savedOpps.length === 0 ? (
                <div className="card p-6 md:p-8 flex flex-col items-center text-center">
                  <p className="text-[0.9rem] text-[var(--color-muted)] mb-4">
                    You haven&apos;t saved any opportunities yet.
                  </p>
                  <Link href="/opportunities" className="btn btn-primary btn-sm">
                    Explore Opportunities
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedOpps.map(opp => (
                    <div key={opp.id} className="card p-4 flex items-center justify-between group hover:border-[var(--color-tech)] transition-colors">
                      <div>
                        <h3 className="font-bold font-[var(--font-display)] text-[0.95rem]">{opp.title}</h3>
                        <p className="text-[0.8rem] text-[var(--color-muted)]">{opp.organization}</p>
                      </div>
                      <Link href="/opportunities" className="p-2 text-[var(--color-muted)] group-hover:text-[var(--color-tech)] transition-colors">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-[1.2rem] font-bold font-[var(--font-display)] mb-4">Saved Skills</h2>
              {savedSkills.length === 0 ? (
                <div className="card p-6 md:p-8 flex flex-col items-center text-center">
                  <p className="text-[0.9rem] text-[var(--color-muted)] mb-4">
                    You haven&apos;t saved any skills yet.
                  </p>
                  <Link href="/skills" className="btn btn-primary btn-sm">
                    Explore Skills
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedSkills.map(skill => (
                    <div key={skill.id} className="card p-4 flex items-center justify-between group hover:border-[var(--color-tech)] transition-colors">
                      <div>
                        <h3 className="font-bold font-[var(--font-display)] text-[0.95rem]">{skill.title}</h3>
                        <p className="text-[0.8rem] text-[var(--color-muted)]">{skill.category}</p>
                      </div>
                      <Link href="/skills" className="p-2 text-[var(--color-muted)] group-hover:text-[var(--color-tech)] transition-colors">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h2 className="text-[1.2rem] font-bold font-[var(--font-display)] mb-4 mt-12">Your Tools</h2>
          <div className="grid grid-cols-1 gap-8">
            <InternshipTracker />
            <TimePlanner />
          </div>
        </div>
      </section>
    </>
  );
}
