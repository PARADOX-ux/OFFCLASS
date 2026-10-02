// ============================================================
// OFFCLASS Analytics Abstraction
// Vendor-agnostic analytics layer
// ============================================================

import type { AnalyticsEvent, AnalyticsPayload } from './types';

class Analytics {
  private enabled: boolean;

  constructor() {
    this.enabled = typeof window !== 'undefined';
  }

  track(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
    if (!this.enabled) return;

    const payload: AnalyticsPayload = {
      event,
      properties,
      timestamp: new Date().toISOString(),
    };

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[OFFCLASS Analytics]', payload);
    }

    // Future: Send to analytics provider
    // e.g., posthog.capture(event, properties)
    // e.g., gtag('event', event, properties)
  }

  pageView(path: string) {
    this.track('page_view', { path });
  }

  pillarClick(pillar: string) {
    this.track('pillar_click', { pillar });
  }

  ctaClick(label: string, location: string) {
    this.track('cta_click', { label, location });
  }

  toolUsage(toolId: string) {
    this.track('tool_usage', { tool_id: toolId });
  }

  opportunityView(opportunityId: string) {
    this.track('opportunity_view', { opportunity_id: opportunityId });
  }

  search(query: string, resultCount: number) {
    this.track('search', { query, result_count: resultCount });
  }
}

export const analytics = new Analytics();
