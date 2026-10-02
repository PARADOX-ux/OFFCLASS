'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, CheckCircle, XCircle, ListChecks } from 'lucide-react';

interface Application {
  id: string;
  company: string;
  role: string;
  dateApplied: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  notes: string;
}

export default function InternshipTracker() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newApp, setNewApp] = useState<Partial<Application>>({
    company: '',
    role: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('offclass-internships');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved applications');
      }
    }
  }, []);

  const saveApplications = (apps: Application[]) => {
    setApplications(apps);
    localStorage.setItem('offclass-internships', JSON.stringify(apps));
  };

  const handleAdd = () => {
    if (!newApp.company || !newApp.role) return;

    const app: Application = {
      id: Date.now().toString(),
      company: newApp.company,
      role: newApp.role,
      status: newApp.status as Application['status'],
      dateApplied: newApp.dateApplied || new Date().toISOString().split('T')[0],
      notes: newApp.notes || '',
    };

    saveApplications([...applications, app]);
    setIsAdding(false);
    setNewApp({ company: '', role: '', status: 'Applied', dateApplied: new Date().toISOString().split('T')[0], notes: '' });
  };

  const handleDelete = (id: string) => {
    saveApplications(applications.filter(a => a.id !== id));
  };

  const updateStatus = (id: string, status: Application['status']) => {
    saveApplications(applications.map(a => a.id === id ? { ...a, status } : a));
  };

  const statusColors = {
    Applied: 'bg-[rgba(49,87,213,0.1)] text-[var(--color-tech)]',
    Interviewing: 'bg-[rgba(234,179,8,0.1)] text-[#b45309]',
    Offer: 'bg-[rgba(34,197,94,0.1)] text-[#16a34a]',
    Rejected: 'bg-[rgba(220,38,38,0.1)] text-[#dc2626]',
  };

  if (!mounted) return <div className="card p-6 md:p-8 animate-pulse h-64" />;

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(17,17,17,0.06)] dark:bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
            <ListChecks size={20} className="text-[var(--color-ink)]" />
          </div>
          <div>
            <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">
              Internship Tracker
            </h3>
            <p className="text-[0.8rem] text-[var(--color-muted)]">
              Manage your applications
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn btn-outline btn-sm"
        >
          {isAdding ? 'Cancel' : <><Plus size={16} /> Add New</>}
        </button>
      </div>

      {isAdding && (
        <div className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] mb-6 bg-[var(--color-surface-hover)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Company</label>
              <input
                type="text"
                className="input"
                value={newApp.company}
                onChange={e => setNewApp({ ...newApp, company: e.target.value })}
                placeholder="e.g., Google"
              />
            </div>
            <div>
              <label className="label">Role</label>
              <input
                type="text"
                className="input"
                value={newApp.role}
                onChange={e => setNewApp({ ...newApp, role: e.target.value })}
                placeholder="e.g., Frontend Intern"
              />
            </div>
            <div>
              <label className="label">Date Applied</label>
              <input
                type="date"
                className="input"
                value={newApp.dateApplied}
                onChange={e => setNewApp({ ...newApp, dateApplied: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Status</label>
              <select
                className="select"
                value={newApp.status}
                onChange={e => setNewApp({ ...newApp, status: e.target.value as Application['status'] })}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={!newApp.company || !newApp.role}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Application
          </button>
        </div>
      )}

      {applications.length === 0 ? (
        <div className="text-center py-10 bg-[var(--color-offwhite-dark)] rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)]">
          <p className="text-[var(--color-muted)] text-[0.9rem]">No applications tracked yet.</p>
          <button onClick={() => setIsAdding(true)} className="text-[var(--color-tech)] font-semibold text-[0.85rem] mt-2">
            Add your first application
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map(app => (
            <div key={app.id} className="p-4 border border-[var(--color-border)] rounded-[var(--radius-md)] flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-[var(--color-muted-light)] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h4 className="font-bold font-[var(--font-display)] truncate">{app.role}</h4>
                  <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-muted)]">
                  <span>{app.company}</span>
                  <span>•</span>
                  <span>Applied: {app.dateApplied}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <select
                  className="select py-1.5 px-3 text-[0.8rem] w-auto h-auto min-h-0"
                  value={app.status}
                  onChange={e => updateStatus(app.id, e.target.value as Application['status'])}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="p-1.5 text-[var(--color-muted)] hover:text-[#dc2626] transition-colors rounded-md hover:bg-[rgba(220,38,38,0.1)] opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
