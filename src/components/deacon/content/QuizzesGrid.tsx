import React from 'react';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { Quiz } from '../../../types/lms';
import QuizCard from './QuizCard';

interface QuizzesGridProps {
  quizzes: Quiz[];
  onStartQuiz: (quiz: Quiz) => void;
  isQuizCompleted: (quizId: string) => boolean;
  getQuizScore: (quizId: string) => number | null;
  getQuizAttempts: (quizId: string) => number;
  isQuizUnlocked: (quiz: Quiz) => boolean;
  isMobile?: boolean;
}

const QuizzesGrid: React.FC<QuizzesGridProps> = ({
  quizzes,
  onStartQuiz,
  isQuizCompleted,
  getQuizScore,
  getQuizAttempts,
  isQuizUnlocked,
  isMobile = false
}) => {
  if (quizzes.length === 0) return null;

  return (
    <div>
      <h4 className="text-sm sm:text-md font-bold text-gray-900 mb-2 sm:mb-3 text-right font-cairo flex items-center space-x-1 sm:space-x-2 space-x-reverse">
        <ClipboardDocumentCheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
        <span>الاختبارات ({quizzes.length})</span>
      </h4>
      <div className={`grid gap-2 sm:gap-3 ${
        isMobile 
          ? 'grid-cols-1' 
          : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            isCompleted={isQuizCompleted(quiz.id)}
            score={getQuizScore(quiz.id)}
            attempts={getQuizAttempts(quiz.id)}
            isUnlocked={isQuizUnlocked(quiz)}
            onStart={() => onStartQuiz(quiz)}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizzesGrid;