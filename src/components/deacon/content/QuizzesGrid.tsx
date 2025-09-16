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
}

const QuizzesGrid: React.FC<QuizzesGridProps> = ({
  quizzes,
  onStartQuiz,
  isQuizCompleted,
  getQuizScore,
  getQuizAttempts,
  isQuizUnlocked
}) => {
  if (quizzes.length === 0) return null;

  return (
    <div>
      <h4 className="text-md font-bold text-gray-900 mb-3 text-right font-cairo flex items-center space-x-2 space-x-reverse">
        <ClipboardDocumentCheckIcon className="w-4 h-4 text-purple-600" />
        <span>الاختبارات ({quizzes.length})</span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            isCompleted={isQuizCompleted(quiz.id)}
            score={getQuizScore(quiz.id)}
            attempts={getQuizAttempts(quiz.id)}
            isUnlocked={isQuizUnlocked(quiz)}
            onStart={() => onStartQuiz(quiz)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizzesGrid;