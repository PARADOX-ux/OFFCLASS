'use client';

import { supabase } from '@/lib/supabase';

export default function OAuthButtons() {
  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        type="button"
        onClick={() => handleOAuthLogin('google')}
        className="btn btn-outline w-full justify-center bg-[var(--color-surface)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
      
      <button
        type="button"
        onClick={() => handleOAuthLogin('apple')}
        className="btn btn-outline w-full justify-center bg-[var(--color-surface)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.365 21.46c-1.378.02-2.715-.54-3.92-1.02-1.125-.45-2.036-.81-2.61-.81-.593 0-1.57.38-2.763.85-1.284.51-2.583 1.03-3.804.99-1.332-.05-2.677-.73-3.86-1.92C-3.05 17.07 1.055 8.1 5.92 8.13c1.512.01 2.822.84 4.07 1.66 1.01.66 1.832 1.21 2.508 1.21.642 0 1.503-.58 2.56-1.27 1.34-.86 2.83-1.83 4.606-1.74 1.765.09 3.324.8 4.295 2.03-3.535 2.04-2.88 7.03.738 8.44-1.144 2.92-3.13 5.4-5.59 5.43-1.014.01-1.725-.26-2.502-.55M15.42 7.74c-.2.03-.43.04-.67.04-2.14 0-4.08-1.54-4.57-3.7-.03-.18-.05-.36-.05-.53 0-.17.02-.38.04-.6.04-.37.13-.76.27-1.13.14-.36.32-.69.54-.98 1.55-2.11 4.54-2.1 4.75-2.07.03.22.05.47.05.74 0 2.2-1.6 3.96-3.83 4.45-.18.04-.36.06-.53.07"/>
        </svg>
        Continue with Apple
      </button>
    </div>
  );
}
