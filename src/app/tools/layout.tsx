import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Tools — Interactive Student Calculators, Quizzes & Planners',
  description: 'Use free student tools: budget calculator, savings planner, freelance pricing, resume checklist, skill quiz, and more. Interactive and useful.',
};
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
