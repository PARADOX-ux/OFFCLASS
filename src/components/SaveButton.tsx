'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface SaveButtonProps {
  itemId: string;
  itemType: 'opportunity' | 'skill' | 'event' | 'tool' | 'career';
  className?: string;
  showText?: boolean;
}

export default function SaveButton({ itemId, itemType, className = '', showText = false }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    async function checkSavedStatus() {
      if (!user) return;
      const { data } = await supabase
        .from('saved_items')
        .select('id')
        .match({ user_id: user.id, item_id: itemId, item_type: itemType })
        .single();
        
      if (data) setIsSaved(true);
    }
    
    checkSavedStatus();
  }, [itemId, itemType, user]);

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/login');
      return;
    }

    const nextState = !isSaved;
    setIsSaved(nextState);

    if (nextState) {
      await supabase.from('saved_items').insert({
        user_id: user.id,
        item_id: itemId,
        item_type: itemType
      });
    } else {
      await supabase.from('saved_items')
        .delete()
        .match({ user_id: user.id, item_id: itemId, item_type: itemType });
    }
  };

  if (!mounted || loading) {
    return (
      <button className={`p-2 rounded-md bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] opacity-50 cursor-wait ${className}`}>
        <Bookmark size={18} className="text-[var(--color-muted)]" />
        {showText && <span className="ml-2 text-[0.85rem]">Save</span>}
      </button>
    );
  }

  return (
    <button
      onClick={toggleSave}
      className={`flex items-center p-2 rounded-md transition-colors ${
        isSaved
          ? 'bg-[rgba(49,87,213,0.1)] text-[var(--color-tech)]'
          : 'bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] text-[var(--color-muted)] hover:bg-[rgba(0,0,0,0.06)] dark:hover:bg-[rgba(255,255,255,0.06)] hover:text-[var(--color-ink)]'
      } ${className}`}
      aria-label={isSaved ? 'Unsave item' : 'Save item'}
      title={isSaved ? 'Saved' : 'Save'}
    >
      {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      {showText && <span className="ml-2 text-[0.85rem] font-medium">{isSaved ? 'Saved' : 'Save'}</span>}
    </button>
  );
}
