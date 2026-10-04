import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-[fade-in_0.3s_ease]">
        <div className="relative">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 bg-[var(--color-tech)] opacity-20 blur-xl rounded-full" />
          
          {/* Spinner */}
          <div className="w-16 h-16 rounded-full border-4 border-[rgba(49,87,213,0.1)] flex items-center justify-center relative">
            <Loader2 size={32} className="text-[var(--color-tech)] animate-spin" />
          </div>
        </div>
        
        <h2 className="text-[1.2rem] font-bold font-[var(--font-display)] text-[var(--color-ink)] animate-pulse">
          Loading OFFCLASS...
        </h2>
      </div>
    </div>
  );
}
