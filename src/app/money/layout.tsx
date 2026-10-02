import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Money — Earn, Budget & Build Financial Independence',
  description: 'Discover realistic earning pathways, use budgeting tools, and build financial literacy as a student. No get-rich-quick promises — just practical money skills.',
};

export default function MoneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
