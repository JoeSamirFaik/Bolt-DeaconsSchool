import React from 'react';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface DetailedStatsProps {
  stats: {
    presentSessions: number;
    lateSessions: number;
    excusedSessions: number;
    absentSessions: number;
  };
  isMobile?: boolean;
}

const DetailedStats: React.FC<DetailedStatsProps> = ({ stats, isMobile = false }) => {
  const statItems = [
    {
      label: 'حضور كامل',
      value: stats.presentSessions,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'حضور متأخر',
      value: stats.lateSessions,
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'غياب بعذر',
      value: stats.excusedSessions,
      icon: ExclamationTriangleIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'غياب',
      value: stats.absentSessions,
      icon: XCircleIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6 text-center hover:shadow-lg transition-shadow">
            <div className={`w-8 h-8 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4`}>
              <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.color}`} />
            </div>
            <div className={`text-lg sm:text-2xl font-bold ${stat.color} mb-1 sm:mb-2`}>{stat.value}</div>
            <p className="text-xs sm:text-sm text-gray-600 font-cairo">
              {isMobile ? (
                stat.label === 'حضور كامل' ? 'حاضر' :
                stat.label === 'حضور متأخر' ? 'متأخر' :
                stat.label === 'غياب بعذر' ? 'معذور' :
                'غائب'
              ) : stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DetailedStats;