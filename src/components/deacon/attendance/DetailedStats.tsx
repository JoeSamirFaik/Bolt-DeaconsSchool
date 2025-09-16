import React from 'react';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface DetailedStatsProps {
  stats: {
    presentSessions: number;
    lateSessions: number;
    excusedSessions: number;
    absentSessions: number;
  };
}

const DetailedStats: React.FC<DetailedStatsProps> = ({ stats }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <p className="text-sm text-gray-600 font-cairo">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DetailedStats;