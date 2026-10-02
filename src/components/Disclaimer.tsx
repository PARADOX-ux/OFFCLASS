import { ShieldAlert } from 'lucide-react';

interface DisclaimerProps {
  type?: 'financial' | 'career' | 'general' | 'demo';
  className?: string;
}

const messages: Record<string, string> = {
  financial: 'We don\'t guarantee earnings. All content is educational, not financial advice.',
  career: 'OFFCLASS does not guarantee jobs, salaries, or career outcomes. We provide tools and knowledge to help you prepare.',
  general: 'All content is for educational and informational purposes only.',
  demo: 'These are sample listings for design purposes. Real data will be connected soon.',
};

export default function Disclaimer({ type = 'general', className = '' }: DisclaimerProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 bg-[rgba(234,179,8,0.08)] rounded-[var(--radius-md)] ${className}`}
      role="note"
      aria-label="Disclaimer"
    >
      <ShieldAlert size={16} className="text-[#b45309] flex-shrink-0" />
      <p className="text-[0.8rem] text-[#b45309]">
        {messages[type]}
      </p>
    </div>
  );
}
