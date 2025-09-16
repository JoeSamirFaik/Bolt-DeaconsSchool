import React from 'react';
import { FireIcon, TrophyIcon, BoltIcon } from '@heroicons/react/24/outline';

interface GameStatsProps {
  totalXP: number;
  level: number;
  streak: number;
  badges: number;
  rank: string;
}

const GameStats: React.FC<GameStatsProps> = ({ totalXP, level, streak, badges, rank }) => {
  const getXPForNextLevel = () => {
    return (level * 200) - (totalXP % (level * 200));
  };

  const getProgressToNextLevel = () => {
    const currentLevelXP = totalXP % (level * 200);
    const requiredXP = level * 200;
    return Math.round((currentLevelXP / requiredXP) * 100);
  };

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 flex-1">
      <div className="flex items-center justify-between mb-4">
        {/* Player Info */}
        <div className="text-right text-white">
          <h2 className="text-2xl font-bold font-cairo mb-2">رحلتي التعليمية</h2>
          <p className="text-lg opacity-90 font-cairo">{rank}</p>
        </div>
        
        {/* Player Stats */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Streak Counter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg min-w-[80px]">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <FireIcon className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{streak}</span>
            </div>
            <p className="text-sm text-gray-600 font-cairo">يوم متتالي</p>
          </div>
          
          {/* Badges Count */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg min-w-[80px]">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <TrophyIcon className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{badges}</span>
            </div>
            <p className="text-sm text-gray-600 font-cairo">شارة</p>
          </div>

          {/* Current Level */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg min-w-[80px]">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <BoltIcon className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{level}</span>
            </div>
            <p className="text-sm text-gray-600 font-cairo">المستوى</p>
          </div>
        </div>
      </div>
      
      {/* XP Progress System */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white opacity-75 font-cairo">{getXPForNextLevel()} XP للمستوى التالي</span>
          <div className="flex items-center space-x-2 space-x-reverse text-white">
            <span className="text-lg font-bold font-cairo">المستوى {level}</span>
            <BoltIcon className="w-5 h-5 text-yellow-300" />
          </div>
        </div>
        <div className="w-full bg-white/30 rounded-full h-4 shadow-inner">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-1000 shadow-lg relative overflow-hidden"
            style={{ width: `${getProgressToNextLevel()}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm text-white opacity-75">
          <span className="font-cairo">{totalXP} XP</span>
          <span className="font-cairo">{level * 200} XP</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;