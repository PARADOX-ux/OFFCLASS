import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Theme System & Dark Mode Integrity Tests', async (t) => {
  await t.test('globals.css configures Tailwind v4 class-based dark variant', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    assert.ok(
      css.includes('@custom-variant dark (&:where(.dark, .dark *));'),
      'Tailwind v4 must declare @custom-variant dark for class-based toggling'
    );
  });

  await t.test('globals.css has a unified .dark definition with OLED tokens', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    // Must have .dark definition
    assert.ok(css.includes('.dark {'), 'Must have .dark selector');
    assert.ok(css.includes('--color-offwhite: #0a0c10;'), 'Must have OLED offwhite background');
    assert.ok(css.includes('--color-surface: #12151c;'), 'Must have dark surface token');
    assert.ok(css.includes('--color-ink: #F7F6F2;'), 'Must have light ink text token');
  });

  await t.test('layout.tsx contains inline anti-FOUC theme script and suppressHydrationWarning', () => {
    const layoutPath = path.resolve(process.cwd(), 'src/app/layout.tsx');
    const layout = fs.readFileSync(layoutPath, 'utf8');

    assert.ok(
      layout.includes('suppressHydrationWarning'),
      'html element must have suppressHydrationWarning'
    );
    assert.ok(
      layout.includes("localStorage.getItem('offclass-theme')"),
      'Inline pre-paint script must check saved theme'
    );
    assert.ok(
      layout.includes("document.documentElement.classList.add('dark')"),
      'Inline pre-paint script must add dark class before paint'
    );
  });

  await t.test('ThemeProvider exports useTheme and ThemeProvider with safe fallback', () => {
    const providerPath = path.resolve(process.cwd(), 'src/components/ThemeProvider.tsx');
    const provider = fs.readFileSync(providerPath, 'utf8');

    assert.ok(provider.includes('export function ThemeProvider'), 'ThemeProvider component exported');
    assert.ok(provider.includes('export function useTheme'), 'useTheme hook exported');
    assert.ok(provider.includes('window.addEventListener'), 'Storage & media listeners registered');
  });

  await t.test('pricing and blog pages do not contain un-themed hardcoded white cards', () => {
    const pricingPath = path.resolve(process.cwd(), 'src/app/pricing/page.tsx');
    const pricing = fs.readFileSync(pricingPath, 'utf8');
    assert.ok(!pricing.includes('bg-white border border-[var(--color-border)] rounded-3xl'), 'Pricing cards must adapt to dark mode');

    const blogPath = path.resolve(process.cwd(), 'src/app/blog/page.tsx');
    const blog = fs.readFileSync(blogPath, 'utf8');
    assert.ok(!blog.includes('card-flat bg-white border'), 'Blog cards must adapt to dark mode');
  });
});
