import React from 'react';
import { AcademicCapIcon, GiftIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Level } from '../../../types/lms';

interface LevelOverviewProps {
  level: Level;
  progress: number;
  subjectsCount: number;
  lessonsCount: number;
  canGenerateCertificate: boolean;
  onGenerateCertificate: () => void;
}

const LevelOverview: React.FC<LevelOverviewProps> = ({
  level,
  progress,
  subjectsCount,
  lessonsCount,
  canGenerateCertificate,
  onGenerateCertificate
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-sm border border-amber-200 p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Certificate Generation */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {canGenerateCertificate && (
            <button
              onClick={onGenerateCertificate}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
            >
              <GiftIcon className="w-4 h-4" />
              <span className="text-sm">تحميل الشهادة</span>
              <DocumentArrowDownIcon className="w-4 h-4" />
            </button>
          )}
          
          {/* Level Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center shadow-sm">
              <div className="text-lg font-bold text-amber-600 mb-1">{progress}%</div>
              <p className="text-xs text-gray-700 font-cairo">التقدم</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center shadow-sm">
              <div className="text-lg font-bold text-orange-600 mb-1">{subjectsCount}</div>
              <p className="text-xs text-gray-700 font-cairo">مقرر</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center shadow-sm">
              <div className="text-lg font-bold text-red-600 mb-1">{lessonsCount}</div>
              <p className="text-xs text-gray-700 font-cairo">درس</p>
            </div>
          </div>
        </div>
        
        {/* Level Header */}
        <div className="text-right">
          <div className="flex items-center space-x-3 space-x-reverse mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
              <AcademicCapIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-cairo">
                {level.name}
              </h2>
              <p className="text-gray-600 font-cairo text-sm">
                {level.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium text-xs shadow-sm">
              نسبة النجاح: {level.passPercentage}%
            </span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium text-xs shadow-sm">
              +50 XP لكل درس
            </span>
          </div>
        </div>
      </div>
      
      {/* Animated Progress Bar */}
      <div className="relative">
        <div className="w-full bg-white/50 rounded-full h-4 shadow-inner">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-1000 shadow-lg relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xs font-bold text-gray-700 font-cairo">
          {progress}% مكتمل
        </div>
      </div>
    </div>
  );
};

export default LevelOverview;