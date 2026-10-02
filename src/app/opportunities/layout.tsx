import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Opportunities — Internships, Gigs, Scholarships & More',
  description: 'Browse student opportunities including internships, freelancing gigs, hackathons, scholarships, competitions, and campus jobs. Filter by type and location.',
};
export default function OpportunitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
