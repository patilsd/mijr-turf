// components/TeamStatsCard.tsx
import { Users, Trophy, Shield } from 'lucide-react';

interface TeamStatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  status?: string;
}

export const TeamStatsCard: React.FC<TeamStatsCardProps> = ({ icon, title, value, status }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg ">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-semibold text-gray-900">{value}</dd>
              {status && <dd className="text-lg font-semibold text-green-600">{status}</dd>}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
