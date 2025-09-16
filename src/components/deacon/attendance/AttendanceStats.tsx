import React from 'react';
import { FireIcon, TrophyIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AttendanceStatsProps {
  stats: {
    totalSessions: number;
    presentSessions: number;
    lateSessions: number;
    excusedSessions: number;
    absentSessions: number;
    attendanceRate: number;
    currentStreak: number;
    totalPoints: number;
  };
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ stats }) => {
  const getMotivationalMessage = () => {
    if (stats.currentStreak >= 7) {
      return `🔥 رائع! لديك ${stats.currentStreak} أيام متتالية من الحضور!`;
    } else if (stats.attendanceRate >= 90) {
      return `⭐ ممتاز! نسبة حضورك ${stats.attendanceRate}%`;
    } else if (stats.attendanceRate >= 70) {
      return '👍 جيد! استمر في المحافظة على الحضور';
    } else {
      return '💪 يمكنك تحسين نسبة حضورك - استمر!';
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full animate-pulse"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-right">
            <h1 className="text-3xl font-bold mb-2 font-cairo">سجل الحضور التفاعلي</h1>
            <p className="text-lg opacity-90 font-cairo">تتبع حضورك وحافظ على انتظامك</p>
          </div>
          
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
              <FireIcon className="w-6 h-6 text-orange-300" />
              <span className="text-2xl font-bold">{stats.currentStreak}</span>
            </div>
            <p className="text-sm opacity-90 font-cairo">أيام متتالية</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
              <ChartBarIcon className="w-6 h-6 text-green-300" />
              <span className="text-2xl font-bold">{stats.attendanceRate}%</span>
            </div>
            <p className="text-sm opacity-90 font-cairo">نسبة الحضور</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
              <CheckCircleIcon className="w-6 h-6 text-blue-300" />
              <span className="text-2xl font-bold">{stats.presentSessions}</span>
            </div>
            <p className="text-sm opacity-90 font-cairo">جلسة حضور</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
              <TrophyIcon className="w-6 h-6 text-yellow-300" />
              <span className="text-2xl font-bold">{stats.totalPoints}</span>
            </div>
            <p className="text-sm opacity-90 font-cairo">نقطة</p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-center">
            <p className="text-lg font-cairo">{getMotivationalMessage()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;