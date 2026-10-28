import test from 'node:test';
import assert from 'node:assert/strict';
import { isSecretApiKey } from './supabase.ts';

test('Supabase API Key Security Audit Tests', async (t) => {
  await t.test('detects modern sb_secret_ prefix as secret key', () => {
    assert.equal(isSecretApiKey('sb_secret_test1234567890'), true);
    assert.equal(isSecretApiKey('sbs_test1234567890'), true);
  });

  await t.test('allows modern sb_publishable_ prefix as valid public key', () => {
    assert.equal(isSecretApiKey('sb_publishable_test1234567890'), false);
    assert.equal(isSecretApiKey('sbp_test1234567890'), false);
  });

  await t.test('detects legacy JWT service_role key', () => {
    const payload = Buffer.from(JSON.stringify({ role: 'service_role', exp: 9999999999 })).toString('base64');
    const jwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.signature`;
    assert.equal(isSecretApiKey(jwt), true);
  });

  await t.test('allows legacy JWT anon public key', () => {
    const payload = Buffer.from(JSON.stringify({ role: 'anon', exp: 9999999999 })).toString('base64');
    const jwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.signature`;
    assert.equal(isSecretApiKey(jwt), false);
  });

  await t.test('handles empty, null, and malformed inputs gracefully without throwing', () => {
    assert.equal(isSecretApiKey(''), false);
    assert.equal(isSecretApiKey('placeholder-anon-key'), false);
    assert.equal(isSecretApiKey('random-non-jwt-string'), false);
    assert.equal(isSecretApiKey('eyJmalformed.jwt'), false);
  });
});
