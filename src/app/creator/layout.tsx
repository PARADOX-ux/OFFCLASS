'use client';

import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Users, Settings, LogOut, LayoutDashboard } from 'lucide-react';

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F9FAFB] text-[#111827] font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-ink)] flex items-center justify-center">
            <span className="text-white font-bold text-xs">CR</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Creator Studio</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/creator/dashboard" className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-900 rounded-md font-medium text-sm">
            <LayoutDashboard size={18} className="text-gray-500" />
            Dashboard
          </Link>
          <Link href="#courses" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium text-sm transition-colors">
            <BookOpen size={18} className="text-gray-400" />
            My Courses
          </Link>
          <Link href="#students" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium text-sm transition-colors">
            <Users size={18} className="text-gray-400" />
            Students
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-200 space-y-1">
          <Link href="#settings" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium text-sm transition-colors">
            <Settings size={18} className="text-gray-400" />
            Settings
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium text-sm transition-colors">
            <LogOut size={18} className="text-red-500" />
            Exit to OFFCLASS
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between md:justify-end">
          <div className="md:hidden font-bold">Creator Studio</div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Help</button>
            <div className="w-8 h-8 rounded-full bg-[var(--color-money)] flex items-center justify-center text-sm font-bold text-gray-900">
              JD
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
