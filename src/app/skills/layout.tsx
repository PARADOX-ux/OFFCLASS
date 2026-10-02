import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills — Learn Practical, Market-Ready Skills',
  description: 'Discover practical skills like coding, design, marketing, writing, and more. Each skill comes with learning paths, project ideas, and ways to monetize.',
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
