'use client';

import { useState, useEffect } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';

interface TimeBlock {
  id: string;
  day: string;
  title: string;
  category: 'Class' | 'Study' | 'Work' | 'Skill' | 'Life';
  hours: number;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function TimePlanner() {
  const [blocks, setBlocks] = useState<TimeBlock[]>([]);
  const [mounted, setMounted] = useState(false);
  const [newBlock, setNewBlock] = useState<Partial<TimeBlock>>({
    day: 'Mon',
    category: 'Class',
    hours: 1,
    title: '',
  });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('offclass-timeplanner');
    if (saved) {
      try {
        setBlocks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved time blocks');
      }
    }
  }, []);

  const saveBlocks = (newBlocks: TimeBlock[]) => {
    setBlocks(newBlocks);
    localStorage.setItem('offclass-timeplanner', JSON.stringify(newBlocks));
  };

  const handleAdd = () => {
    if (!newBlock.title || !newBlock.hours) return;

    const block: TimeBlock = {
      id: Date.now().toString(),
      day: newBlock.day as string,
      title: newBlock.title,
      category: newBlock.category as TimeBlock['category'],
      hours: Number(newBlock.hours),
    };

    saveBlocks([...blocks, block]);
    setNewBlock({ ...newBlock, title: '' });
  };

  const handleDelete = (id: string) => {
    saveBlocks(blocks.filter(b => b.id !== id));
  };

  const categoryColors = {
    Class: 'bg-[rgba(17,17,17,0.1)] text-black dark:text-white',
    Study: 'bg-[rgba(49,87,213,0.15)] text-[var(--color-tech)]',
    Work: 'bg-[rgba(183,243,74,0.2)] text-[#5a7a1a]',
    Skill: 'bg-[rgba(234,179,8,0.15)] text-[#b45309]',
    Life: 'bg-[rgba(142,142,142,0.15)] text-[var(--color-muted)]',
  };

  const totalHours = blocks.reduce((sum, b) => sum + b.hours, 0);

  if (!mounted) return <div className="card p-6 md:p-8 animate-pulse h-64" />;

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[rgba(17,17,17,0.06)] dark:bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
          <Clock size={20} className="text-[var(--color-ink)]" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold font-[var(--font-display)]">
            Study & Time Planner
          </h3>
          <p className="text-[0.8rem] text-[var(--color-muted)]">
            Organize your week
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-end bg-[var(--color-offwhite-dark)] p-4 rounded-[var(--radius-md)]">
        <div>
          <label className="label">Activity</label>
          <input
            type="text"
            className="input py-2"
            value={newBlock.title}
            onChange={e => setNewBlock({ ...newBlock, title: e.target.value })}
            placeholder="e.g., UI/UX Course"
          />
        </div>
        <div>
          <label className="label">Category</label>
          <select
            className="select py-2"
            value={newBlock.category}
            onChange={e => setNewBlock({ ...newBlock, category: e.target.value as TimeBlock['category'] })}
          >
            {Object.keys(categoryColors).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label">Day</label>
            <select
              className="select py-2"
              value={newBlock.day}
              onChange={e => setNewBlock({ ...newBlock, day: e.target.value })}
            >
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Hours</label>
            <input
              type="number"
              className="input py-2"
              value={newBlock.hours}
              onChange={e => setNewBlock({ ...newBlock, hours: Number(e.target.value) })}
              min="0.5"
              step="0.5"
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={!newBlock.title}
          className="btn btn-primary w-full disabled:opacity-50 h-[42px]"
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {days.map(day => (
              <div key={day} className="text-center text-[0.8rem] font-bold text-[var(--color-muted)] uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map(day => (
              <div key={day} className="space-y-2 min-h-[120px] bg-[var(--color-surface-hover)] p-2 rounded-[var(--radius-sm)] border border-[var(--color-border)]">
                {blocks.filter(b => b.day === day).map(block => (
                  <div key={block.id} className={`p-2 rounded flex justify-between group text-[0.75rem] ${categoryColors[block.category]}`}>
                    <div className="min-w-0 pr-1">
                      <p className="font-bold truncate" title={block.title}>{block.title}</p>
                      <p className="opacity-80 text-[0.65rem]">{block.hours}h</p>
                    </div>
                    <button
                      onClick={() => handleDelete(block.id)}
                      className="opacity-0 group-hover:opacity-100 flex-shrink-0"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-[0.85rem] text-[var(--color-muted)]">
        <span>Total tracked: <strong>{totalHours} hours/week</strong></span>
        {totalHours > 40 && <span className="text-[#b45309]">Careful, that&apos;s more than a full-time job.</span>}
      </div>
    </div>
  );
}
