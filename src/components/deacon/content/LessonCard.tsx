import React from 'react';
import { 
  PlayIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline';
import { Lesson } from '../../../types/lms';

interface LessonCardProps {
  lesson: Lesson;
  lessonIndex: number;
  isCompleted: boolean;
  score?: number | null;
  isUnlocked: boolean;
  onStart: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  lessonIndex,
  isCompleted,
  score,
  isUnlocked,
  onStart
}) => {
  return (
    <div
      className={`relative border-2 rounded-lg p-3 transition-all duration-300 hover:shadow-lg ${
        !isUnlocked ? 'opacity-50 cursor-not-allowed' :
        isCompleted ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:scale-105' : 
        'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:scale-105 cursor-pointer'
      }`}
    >
      {/* Lesson Number Badge */}
      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg ${
        isCompleted ? 'bg-green-500 animate-pulse' : 
        isUnlocked ? 'bg-blue-500' : 'bg-gray-400'
      }`}>
        {lesson.order}
      </div>
      
      {/* Lock Indicator */}
      {!isUnlocked && (
        <div className="absolute top-1 left-1 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
          <LockClosedIcon className="w-3 h-3 text-white" />
        </div>
      )}
      
      <div className="text-right mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1 space-x-reverse">
            {isCompleted && (
              <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full font-medium shadow-sm animate-bounce">
                +50 XP
              </span>
            )}
            {score && (
              <span className={`px-2 py-1 text-xs rounded-full font-medium shadow-sm ${
                score >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {score}%
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 space-x-reverse">
            {isCompleted ? (
              <CheckCircleIcon className="w-3 h-3 text-green-600" />
            ) : isUnlocked ? (
              <PlayIcon className="w-3 h-3 text-blue-600" />
            ) : (
              <ClockIcon className="w-3 h-3 text-gray-400" />
            )}
            <span className="text-xs text-gray-500 font-cairo">{lesson.duration} دقيقة</span>
          </div>
        </div>
        
        <h5 className="font-bold text-gray-900 font-cairo text-sm mb-1">
          {lesson.title}
        </h5>
        <p className="text-gray-600 font-cairo text-xs leading-relaxed">
          {lesson.description}
        </p>
      </div>
      
      <button
        onClick={() => isUnlocked && onStart()}
        disabled={!isUnlocked}
        className={`w-full py-2 px-3 rounded-lg transition-all duration-200 font-medium text-xs ${
          !isUnlocked
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : isCompleted
            ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:scale-105 shadow-lg'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-xl'
        }`}
      >
        {!isUnlocked ? '🔒 مقفل' :
         isCompleted ? '📖 مراجعة الدرس' : '▶️ بدء الدرس'}
      </button>
    </div>
  );
};

export default LessonCard;