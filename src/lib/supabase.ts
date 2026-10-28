import { createClient } from '@supabase/supabase-js';

/**
 * Validates if a key is a secret / service-role key that is forbidden in browser contexts.
 * Supabase rejects requests made from browsers with secret keys with:
 * "Forbidden use of secret API key in browser"
 */
export function isSecretApiKey(key: string): boolean {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  // New Supabase secret key format
  if (trimmed.startsWith('sb_secret_') || trimmed.startsWith('sbs_')) {
    return true;
  }
  // Legacy JWT format: check payload role
  if (trimmed.startsWith('eyJ')) {
    try {
      const parts = trimmed.split('.');
      if (parts.length >= 2) {
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const json = typeof atob === 'function'
          ? decodeURIComponent(
              atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            )
          : typeof Buffer !== 'undefined'
          ? Buffer.from(base64, 'base64').toString('utf8')
          : '';
        if (json) {
          const payload = JSON.parse(json);
          return payload.role === 'service_role';
        }
      }
    } catch {
      // ignore parse errors
    }
  }
  return false;
}

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const hasSecretKeyMisconfigured = isSecretApiKey(rawAnonKey);

if (hasSecretKeyMisconfigured) {
  console.error(
    '🚨 [OFFCLASS SECURITY ALERT] Forbidden use of secret API key in browser detected!\n' +
    'The environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY contains a secret / service_role API key.\n' +
    'Secret keys have administrative privileges, bypass Row Level Security, and are blocked by Supabase in browsers with:\n' +
    '"Forbidden use of secret API key in browser"\n' +
    'To fix this:\n' +
    '1. Open your Supabase Dashboard -> Project Settings -> API Keys\n' +
    '2. Copy the "anon" / "publishable" key (NOT the "service_role" or "secret" key)\n' +
    '3. Update NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel Project Settings and .env.local'
  );
}

const supabaseUrl = rawUrl && !rawUrl.includes('your-project')
  ? rawUrl
  : 'https://placeholder.supabase.co';

// If a secret key was mistakenly configured as the public anon key, neutralize it in browser/client
const supabaseAnonKey = rawAnonKey && !hasSecretKeyMisconfigured
  ? rawAnonKey
  : 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawAnonKey &&
  !rawUrl.includes('your-project') &&
  !rawAnonKey.includes('placeholder') &&
  !hasSecretKeyMisconfigured
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
