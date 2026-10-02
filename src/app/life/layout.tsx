import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Life — Build Independence Beyond Academics',
  description: 'Practical skills for student independence: productivity, communication, networking, adulting, decision making, and personal branding.',
};
export default function LifeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
