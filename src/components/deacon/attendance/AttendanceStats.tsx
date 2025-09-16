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
  isMobile?: boolean;
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ stats, isMobile = false }) => {
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
    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-12 sm:h-12 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-4 h-4 sm:w-8 sm:h-8 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-16 sm:h-16 bg-white rounded-full animate-pulse"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 mb-3 sm:mb-6">
          <div className="text-right">
            <h1 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 font-cairo">سجل الحضور التفاعلي</h1>
            <p className="text-sm sm:text-lg opacity-90 font-cairo">تتبع حضورك وحافظ على انتظامك</p>
          </div>
          
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mx-auto sm:mx-0">
            <CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse mb-1 sm:mb-2">
              <FireIcon className="w-4 h-4 sm:w-6 sm:h-6 text-orange-300" />
              <span className="text-lg sm:text-2xl font-bold">{stats.currentStreak}</span>
            </div>
            <p className="text-xs sm:text-sm opacity-90 font-cairo">
              <span className="hidden sm:inline">أيام متتالية</span>
              <span className="sm:hidden">يوم</span>
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse mb-1 sm:mb-2">
              <ChartBarIcon className="w-4 h-4 sm:w-6 sm:h-6 text-green-300" />
              <span className="text-lg sm:text-2xl font-bold">{stats.attendanceRate}%</span>
            </div>
            <p className="text-xs sm:text-sm opacity-90 font-cairo">
              <span className="hidden sm:inline">نسبة الحضور</span>
              <span className="sm:hidden">حضور</span>
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse mb-1 sm:mb-2">
              <CheckCircleIcon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-300" />
              <span className="text-lg sm:text-2xl font-bold">{stats.presentSessions}</span>
            </div>
            <p className="text-xs sm:text-sm opacity-90 font-cairo">
              <span className="hidden sm:inline">جلسة حضور</span>
              <span className="sm:hidden">جلسة</span>
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse mb-1 sm:mb-2">
              <TrophyIcon className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300" />
              <span className="text-lg sm:text-2xl font-bold">{stats.totalPoints}</span>
            </div>
            <p className="text-xs sm:text-sm opacity-90 font-cairo">نقطة</p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-3 sm:mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
          <div className="text-center">
            <p className="text-sm sm:text-lg font-cairo">{getMotivationalMessage()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;