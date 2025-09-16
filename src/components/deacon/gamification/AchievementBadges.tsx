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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <button className="text-amber-600 hover:text-amber-700 font-cairo font-medium text-sm hover:scale-105 transition-transform duration-200">
          عرض الكل →
        </button>
        <div className="flex items-center space-x-3 space-x-reverse">
          <h2 className="text-lg font-bold text-gray-900 font-cairo">الإنجازات</h2>
          <SparklesIcon className="w-5 h-5 text-amber-600" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative p-3 rounded-lg border-2 transition-all duration-300 hover:scale-110 cursor-pointer ${
              achievement.unlocked
                ? `bg-gradient-to-br ${achievement.color} text-white shadow-lg border-transparent`
                : 'bg-gray-100 border-gray-200 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {achievement.unlocked && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircleIcon className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="text-center">
              <div className="text-xl mb-1">{achievement.icon}</div>
              <h4 className="font-bold text-xs font-cairo mb-1">{achievement.title}</h4>
              <p className="text-xs opacity-80 font-cairo leading-tight">{achievement.description}</p>
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs opacity-60 font-cairo mt-1">
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