'use client';

import React from 'react';
import { Plus, BarChart3, Users, Clock, PlayCircle } from 'lucide-react';

export default function CreatorDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto animate-[fade-in_0.4s_ease]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-display)] text-[var(--color-ink)]">
            Welcome back, Creator
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Here is what is happening with your content today.
          </p>
        </div>
        <button className="btn btn-primary btn-sm flex items-center gap-2 shadow-sm">
          <Plus size={16} />
          Create New Course
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bento-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-muted)]">Total Students</h3>
            <div className="w-8 h-8 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--color-ink)] font-[var(--font-display)]">1,248</p>
          <p className="text-xs text-[#10b981] font-medium mt-2 flex items-center gap-1">
            <BarChart3 size={12} /> +12% from last month
          </p>
        </div>

        <div className="bento-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-muted)]">Total Watch Time</h3>
            <div className="w-8 h-8 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--color-ink)] font-[var(--font-display)]">842 hrs</p>
          <p className="text-xs text-[#10b981] font-medium mt-2 flex items-center gap-1">
            <BarChart3 size={12} /> +5% from last month
          </p>
        </div>

        <div className="bento-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-muted)]">Estimated Earnings</h3>
            <div className="w-8 h-8 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <BarChart3 size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--color-ink)] font-[var(--font-display)]">₹42,500</p>
          <p className="text-xs text-[#10b981] font-medium mt-2 flex items-center gap-1">
            <BarChart3 size={12} /> +18% from last month
          </p>
        </div>
      </div>

      {/* Course List Section */}
      <div className="bento-card overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--color-ink)] font-[var(--font-display)]">Your Active Courses</h2>
          <button className="text-xs font-semibold text-[var(--color-tech)] hover:underline">View All</button>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {[
            { title: 'The Complete Freelancing Playbook', students: 840, rev: '₹28,500' },
            { title: 'Mastering Remote Internships', students: 408, rev: '₹14,000' },
          ].map((c, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center text-[var(--color-ink)]">
                  <PlayCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-ink)] text-sm">{c.title}</h3>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">{c.students} active learners enrolled</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-[var(--color-ink)] text-sm">{c.rev}</span>
                <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
