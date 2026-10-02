'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Briefcase, GraduationCap, Calculator, Calendar, ArrowRight } from 'lucide-react';
import { demoSkills, demoOpportunities, demoCampusEvents, demoTools } from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchQuery = query.toLowerCase();

  const filteredSkills = demoSkills.filter(s => s.title.toLowerCase().includes(searchQuery) || s.tags.some(t => t.toLowerCase().includes(searchQuery))).slice(0, 3);
  const filteredOpps = demoOpportunities.filter(o => o.title.toLowerCase().includes(searchQuery) || o.organization.toLowerCase().includes(searchQuery)).slice(0, 3);
  const filteredEvents = demoCampusEvents.filter(e => e.title.toLowerCase().includes(searchQuery)).slice(0, 3);
  const filteredTools = demoTools.filter(t => t.name.toLowerCase().includes(searchQuery)).slice(0, 3);

  const hasResults = query.length > 1 && (filteredSkills.length > 0 || filteredOpps.length > 0 || filteredEvents.length > 0 || filteredTools.length > 0);

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 animate-[fade-in_0.2s_ease]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[var(--color-offwhite)] dark:bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-[var(--color-border)]">
        {/* Search Input Area */}
        <div className="flex items-center px-4 py-4 border-b border-[var(--color-border)]">
          <Search className="text-[var(--color-muted)] mr-3" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-[1.1rem] placeholder:text-[var(--color-muted-light)]"
            placeholder="Search skills, opportunities, tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-1 rounded-md hover:bg-[rgba(0,0,0,0.05)] text-[var(--color-muted)]">
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {query.length <= 1 ? (
            <div className="py-12 text-center text-[var(--color-muted)]">
              <p className="text-[0.9rem]">Type at least 2 characters to search.</p>
              <div className="flex gap-2 justify-center mt-4 text-[0.75rem]">
                <span className="px-2 py-1 bg-[var(--color-surface-hover)] rounded border border-[var(--color-border)]">Try: &quot;freelance&quot;</span>
                <span className="px-2 py-1 bg-[var(--color-surface-hover)] rounded border border-[var(--color-border)]">Try: &quot;design&quot;</span>
                <span className="px-2 py-1 bg-[var(--color-surface-hover)] rounded border border-[var(--color-border)]">Try: &quot;calculator&quot;</span>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-[var(--color-muted)]">
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Skills */}
              {filteredSkills.length > 0 && (
                <div>
                  <h3 className="text-[0.75rem] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-2 px-2">Skills</h3>
                  <div className="space-y-1">
                    {filteredSkills.map(skill => (
                      <button 
                        key={skill.id}
                        onClick={() => handleNavigate('/skills')}
                        className="w-full flex items-center justify-between p-3 rounded-md hover:bg-[rgba(49,87,213,0.05)] group transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
                            <GraduationCap size={16} className="text-[var(--color-tech)]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[0.9rem]">{skill.title}</p>
                            <p className="text-[0.75rem] text-[var(--color-muted)] truncate max-w-[300px] sm:max-w-[400px]">{skill.summary}</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-[var(--color-tech)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Opportunities */}
              {filteredOpps.length > 0 && (
                <div>
                  <h3 className="text-[0.75rem] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-2 px-2">Opportunities</h3>
                  <div className="space-y-1">
                    {filteredOpps.map(opp => (
                      <button 
                        key={opp.id}
                        onClick={() => handleNavigate('/opportunities')}
                        className="w-full flex items-center justify-between p-3 rounded-md hover:bg-[rgba(234,179,8,0.05)] group transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
                            <Briefcase size={16} className="text-[#b45309]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[0.9rem]">{opp.title}</p>
                            <p className="text-[0.75rem] text-[var(--color-muted)]">{opp.organization}</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-[#b45309] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {filteredTools.length > 0 && (
                <div>
                  <h3 className="text-[0.75rem] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-2 px-2">Tools</h3>
                  <div className="space-y-1">
                    {filteredTools.map(tool => (
                      <button 
                        key={tool.id}
                        onClick={() => handleNavigate('/tools')}
                        className="w-full flex items-center justify-between p-3 rounded-md hover:bg-[rgba(183,243,74,0.1)] group transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
                            <Calculator size={16} className="text-[#5a7a1a]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[0.9rem]">{tool.name}</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-[#5a7a1a] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Campus Events */}
              {filteredEvents.length > 0 && (
                <div>
                  <h3 className="text-[0.75rem] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-2 px-2">Campus Events</h3>
                  <div className="space-y-1">
                    {filteredEvents.map(event => (
                      <button 
                        key={event.id}
                        onClick={() => handleNavigate('/campus')}
                        className="w-full flex items-center justify-between p-3 rounded-md hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] group transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
                            <Calendar size={16} className="text-[var(--color-ink)]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[0.9rem]">{event.title}</p>
                            <p className="text-[0.75rem] text-[var(--color-muted)]">{event.city}</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface-hover)] flex items-center justify-between">
          <div className="flex gap-4 text-[0.7rem] text-[var(--color-muted)]">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-offwhite)]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-offwhite)]">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-offwhite)]">Enter</kbd> to select</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-offwhite)]">Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
