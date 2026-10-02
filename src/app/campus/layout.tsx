import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Campus — Events, Clubs, Competitions & Student Opportunities',
  description: 'Find campus events, clubs, hackathons, competitions, scholarships, and student discounts. Filter by city, college, and category.',
};
export default function CampusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
