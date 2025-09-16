import React from 'react';
import { 
  BookOpenIcon, 
  TrophyIcon, 
  LockClosedIcon, 
  ChevronRightIcon,
  ClipboardDocumentCheckIcon 
} from '@heroicons/react/24/outline';
import { Subject, Lesson, Quiz } from '../../../types/lms';

interface SubjectCardProps {
  subject: Subject;
  subjectIndex: number;
  lessons: Lesson[];
  quizzes: Quiz[];
  progress: number;
  isUnlocked: boolean;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  isMobile?: boolean;
  children?: React.ReactNode;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  subjectIndex,
  lessons,
  quizzes,
  progress,
  isUnlocked,
  isExpanded,
  onToggleExpansion,
  isMobile = false,
  children
}) => {
  const isCompleted = progress >= subject.passPercentage;

  return (
    <div className={`relative transition-all duration-500 ${!isUnlocked ? 'opacity-50' : ''}`}>
      {/* Connection Line to Next Subject */}
      {!isMobile && subjectIndex < 10 && ( // Hide connection line on mobile
        <div className="absolute top-12 right-10 w-1 h-8 bg-gradient-to-b from-amber-300 to-orange-400 rounded-full shadow-sm"></div>
      )}
      
      {/* Subject Header - Clickable */}
      <button
        onClick={() => isUnlocked && onToggleExpansion()}
        disabled={!isUnlocked}
        className="w-full"
      >
        <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse mb-2 sm:mb-3 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102">
          {/* Subject Node */}
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${
            isCompleted 
              ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300' :
            isUnlocked 
              ? 'bg-gradient-to-br from-blue-400 to-indigo-500 border-blue-300' :
            'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-200'
          }`}>
            {!isUnlocked ? (
              <LockClosedIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            ) : isCompleted ? (
              <TrophyIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            ) : (
              <BookOpenIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            )}
            <span className="text-white font-bold text-xs mt-0.5 sm:mt-1">{progress}%</span>
          </div>
          
          {/* Subject Info */}
          <div className="flex-1 text-right">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 sm:space-x-reverse mb-2">
              <div className="flex space-x-1 sm:space-x-2 space-x-reverse justify-end sm:justify-start">
                <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium shadow-sm">
                  {lessons.length} درس
                </span>
                <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium shadow-sm">
                  {quizzes.length} اختبار
                </span>
                {isCompleted && (
                  <span className="bg-green-100 text-green-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium shadow-sm animate-pulse">
                    +100 XP
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-cairo">{subject.name}</h3>
            </div>
            <p className="text-gray-600 font-cairo text-xs sm:text-sm mb-2 leading-relaxed line-clamp-2 sm:line-clamp-none">{subject.description}</p>
            
            {/* Subject Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner">
              <div
                className={`h-2 sm:h-3 rounded-full transition-all duration-700 shadow-sm ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  isUnlocked 
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500' :
                  'bg-gray-300'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between mt-1 sm:mt-2">
              <span className="text-xs text-gray-500 font-cairo hidden sm:inline">
                نسبة النجاح: {subject.passPercentage}%
              </span>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-xs sm:text-sm font-bold text-gray-700 font-cairo">{progress}%</span>
                <ChevronRightIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-300 ${
                  isExpanded ? 'rotate-90' : ''
                }`} />
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isUnlocked && isExpanded && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 ml-4 sm:ml-8 shadow-inner border border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default SubjectCard;