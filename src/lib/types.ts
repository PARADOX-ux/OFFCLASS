// ============================================================
// OFFCLASS Core Data Types
// ============================================================

// Content status system
export type ContentStatus = 'published' | 'draft' | 'archived' | 'coming_soon';
export type VerificationStatus = 'verified' | 'reviewed' | 'community' | 'external' | 'demo';

// Base content type — all content entities extend this
export interface BaseContent {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  iconName?: string;
  createdAt: string;
  updatedAt: string;
  status: ContentStatus;
  verificationStatus: VerificationStatus;
}

// ============================================================
// PILLAR-SPECIFIC TYPES
// ============================================================

export interface Skill extends BaseContent {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningTimeWeeks: number;
  monetizationPotential: string[];
  careerApplications: string[];
  beginnerProject: string;
  portfolioProject: string;
  prerequisites: string[];
}

export interface Opportunity extends BaseContent {
  type: 'internship' | 'job' | 'freelance' | 'competition' | 'scholarship' | 'hackathon' | 'creator' | 'campus_job' | 'event';
  organization: string;
  location: string;
  deadline?: string;
  eligibility: string;
  link: string;
  compensation?: string;
  remote: boolean;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  iconName: string;
  route: string;
  status: ContentStatus;
  isPremium: boolean;
}

export interface CareerPath extends BaseContent {
  direction: string;
  skills: string[];
  avgSalaryRange: string;
  demandLevel: 'high' | 'medium' | 'growing';
  steps: string[];
}

export interface CampusEvent extends BaseContent {
  eventType: 'event' | 'club' | 'competition' | 'hackathon' | 'workshop' | 'scholarship' | 'discount';
  college?: string;
  city?: string;
  course?: string;
  year?: string;
  deadline?: string;
  eligibility: string;
  link: string;
}

export interface Article extends BaseContent {
  contentType: 'article' | 'guide' | 'resource' | 'roadmap';
  pillar: 'money' | 'skills' | 'career' | 'campus' | 'life';
  readTimeMinutes: number;
  content: string;
}

// ============================================================
// USER / PROFILE TYPES (Future-ready)
// ============================================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  college?: string;
  course?: string;
  year?: number;
  city?: string;
  interests: string[];
  skills: string[];
  goals: string[];
  hoursAvailable?: number;
  financialGoal?: number;
  careerInterest?: string;
}

// ============================================================
// ANALYTICS (Abstraction)
// ============================================================

export type AnalyticsEvent =
  | 'page_view'
  | 'pillar_click'
  | 'tool_usage'
  | 'opportunity_view'
  | 'opportunity_save'
  | 'roadmap_start'
  | 'cta_click'
  | 'sign_up'
  | 'search'
  | 'filter_change'
  | 'form_submit';

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp: string;
}

// ============================================================
// UI TYPES
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SearchResult {
  type: 'skill' | 'opportunity' | 'tool' | 'article' | 'career';
  title: string;
  summary: string;
  href: string;
  pillar?: string;
}
