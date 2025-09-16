import React from 'react';
import { 
  ClipboardDocumentCheckIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline';
import { Quiz } from '../../../types/lms';

interface QuizCardProps {
  quiz: Quiz;
  isCompleted: boolean;
  score?: number | null;
  attempts: number;
  isUnlocked: boolean;
  onStart: () => void;
  isMobile?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  isCompleted,
  score,
  attempts,
  isUnlocked,
  onStart,
  isMobile = false
}) => {
  const canRetake = attempts < quiz.maxAttempts;

  return (
    <div
      className={`relative border-2 rounded-lg p-2 sm:p-3 transition-all duration-300 hover:shadow-lg ${
        !isUnlocked ? 'opacity-50 cursor-not-allowed' :
        isCompleted ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 hover:scale-105' : 
        'border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 hover:scale-105 cursor-pointer'
      }`}
    >
      {/* Quiz Type Badge */}
      <div className={`absolute -top-1 -right-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium text-white shadow-lg ${
        quiz.type === 'lesson_quiz' ? 'bg-blue-500' : 'bg-red-500'
      }`}>
        {quiz.type === 'lesson_quiz' ? '📝' : '🎓'}
      </div>
      
      {/* Lock Indicator */}
      {!isUnlocked && (
        <div className="absolute top-1 left-1 w-4 h-4 sm:w-5 sm:h-5 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
          <LockClosedIcon className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
        </div>
      )}
      
      <div className="text-right mb-2 sm:mb-3">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-1 space-x-reverse">
            {isCompleted && (
              <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-full font-medium shadow-sm">
                +{quiz.type === 'final_exam' ? '200' : '100'} XP
              </span>
            )}
            {score && (
              <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-full font-medium shadow-sm ${
                score >= quiz.passingScore ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {score}%
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 space-x-reverse justify-end sm:justify-start">
            {isCompleted ? (
              <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
            ) : isUnlocked ? (
              <ClipboardDocumentCheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
            ) : (
              <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            )}
            <span className="text-xs text-gray-500 font-cairo">{quiz.timeLimit} د</span>
          </div>
        </div>
        
        <h5 className="font-bold text-gray-900 font-cairo text-xs sm:text-sm mb-1 line-clamp-1">
          {quiz.title}
        </h5>
        <p className="text-gray-600 font-cairo text-xs leading-relaxed mb-1 sm:mb-2 line-clamp-2">
          {quiz.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 font-cairo mb-1 sm:mb-0">
          <span className="hidden sm:inline">درجة النجاح: {quiz.passingScore}%</span>
          <span className="sm:hidden">نجاح: {quiz.passingScore}%</span>
          <span className="hidden sm:inline">عدد الأسئلة: {quiz.questions.length}</span>
          <span className="sm:hidden">{quiz.questions.length} سؤال</span>
          {isCompleted && (
            <>
              <span className="hidden sm:inline">المحاولات: {attempts}/{quiz.maxAttempts}</span>
              <span className="sm:hidden">{attempts}/{quiz.maxAttempts}</span>
            </>
          )}
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isUnlocked) onStart();
        }}
        disabled={!isUnlocked || (isCompleted && !canRetake)}
        className={`w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-200 font-medium text-xs ${
          !isUnlocked
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : isCompleted && !canRetake
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : isCompleted
            ? 'bg-purple-100 text-purple-800 hover:bg-purple-200 hover:scale-105 shadow-lg'
            : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 shadow-xl'
        }`}
      >
        {!isUnlocked
          ? (isMobile ? '🔒 مقفل' : '🔒 مقفل - أكمل 50% من الدروس')
          : isCompleted && !canRetake
          ? '❌ انتهت المحاولات'
          : isCompleted
          ? (isMobile ? '🔄 إعادة' : '🔄 إعادة المحاولة')
          : (isMobile ? '🚀 بدء' : '🚀 بدء الاختبار')}
      </button>
    </div>
  );
};

export default QuizCard;