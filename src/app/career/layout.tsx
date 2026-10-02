import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career — Build Your Path From Student to Professional',
  description: 'Explore career paths in tech, design, business, finance, media, research, entrepreneurship, and more. Build skills, prepare for interviews, and launch your career.',
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
