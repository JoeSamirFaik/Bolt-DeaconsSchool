import React from 'react';
import { CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementBadgesProps {
  achievements: Achievement[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ achievements }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <button className="text-amber-600 hover:text-amber-700 font-cairo font-medium text-xs sm:text-sm hover:scale-105 transition-transform duration-200">
          عرض الكل →
        </button>
        <div className="flex items-center space-x-3 space-x-reverse">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 font-cairo">الإنجازات</h2>
          <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative p-2 sm:p-3 rounded-lg border-2 transition-all duration-300 hover:scale-110 cursor-pointer ${
              achievement.unlocked
                ? `bg-gradient-to-br ${achievement.color} text-white shadow-lg border-transparent`
                : 'bg-gray-100 border-gray-200 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {achievement.unlocked && (
              <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircleIcon className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
              </div>
            )}
            <div className="text-center">
              <div className="text-lg sm:text-xl mb-1">{achievement.icon}</div>
              <h4 className="font-bold text-xs font-cairo mb-1 line-clamp-1">{achievement.title}</h4>
              <p className="text-xs opacity-80 font-cairo leading-tight line-clamp-2 hidden sm:block">{achievement.description}</p>
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs opacity-60 font-cairo mt-1 hidden sm:block">
                  {new Date(achievement.unlockedAt).toLocaleDateString('ar-EG')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;