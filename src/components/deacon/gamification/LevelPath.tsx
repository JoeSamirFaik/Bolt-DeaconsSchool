import React from 'react';
import { TrophyIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { Level } from '../../../types/lms';
import { LevelAssignment } from '../../../types/user';

interface LevelPathProps {
  assignments: LevelAssignment[];
  levels: Level[];
  selectedLevel: string;
  onLevelSelect: (levelId: string) => void;
  getLevelProgress: (levelId: string) => number;
}

const LevelPath: React.FC<LevelPathProps> = ({ 
  assignments, 
  levels, 
  selectedLevel, 
  onLevelSelect, 
  getLevelProgress 
}) => {
  if (assignments.length <= 1) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo">مسار المستويات</h3>
      <div className="relative">
        {/* Progress Path Line */}
        <div className="absolute top-1/2 left-6 right-6 h-1 bg-gradient-to-r from-gray-300 via-amber-400 to-green-500 rounded-full transform -translate-y-1/2 shadow-sm"></div>
        
        <div className="flex items-center justify-between relative z-10">
          {assignments.map((assignment, index) => {
            const level = levels.find(l => l.id === assignment.levelId);
            const progress = getLevelProgress(assignment.levelId);
            const isActive = selectedLevel === assignment.levelId;
            const isCompleted = assignment.status === 'completed';
            const isInProgress = assignment.status === 'in_progress';
            
            return (
              <button
                key={assignment.id}
                onClick={() => onLevelSelect(assignment.levelId)}
                className={`relative group transition-all duration-300 hover:scale-110 ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                {/* Level Node */}
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 animate-pulse' :
                  isInProgress 
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300' :
                  'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-200'
                }`}>
                  {isCompleted ? (
                    <TrophyIcon className="w-5 h-5 text-white" />
                  ) : isInProgress ? (
                    <span className="text-xs font-bold text-white">{progress}%</span>
                  ) : (
                    <ClockIcon className="w-5 h-5 text-white" />
                  )}
                </div>
                
                {/* Level Info */}
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                  <h4 className="font-bold text-gray-900 font-cairo text-xs mb-1">
                    {level?.name}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm ${
                    isCompleted ? 'bg-green-100 text-green-800' :
                    isInProgress ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {isCompleted ? 'مكتمل ✅' : isInProgress ? 'قيد التنفيذ 🔄' : 'قادم ⏳'}
                  </span>
                </div>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -inset-3 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-20 animate-ping"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelPath;