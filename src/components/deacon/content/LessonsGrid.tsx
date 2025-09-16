import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { Lesson } from '../../../types/lms';
import LessonCard from './LessonCard';

interface LessonsGridProps {
  lessons: Lesson[];
  onStartLesson: (lesson: Lesson) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonScore: (lessonId: string) => number | null;
  isLessonUnlocked: (lesson: Lesson, index: number) => boolean;
  isMobile?: boolean;
}

const LessonsGrid: React.FC<LessonsGridProps> = ({
  lessons,
  onStartLesson,
  isLessonCompleted,
  getLessonScore,
  isLessonUnlocked,
  isMobile = false
}) => {
  if (lessons.length === 0) return null;

  return (
    <div className="mb-3 sm:mb-4">
      <h4 className="text-sm sm:text-md font-bold text-gray-900 mb-2 sm:mb-3 text-right font-cairo flex items-center space-x-1 sm:space-x-2 space-x-reverse">
        <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
        <span>الدروس ({lessons.length})</span>
      </h4>
      <div className={`grid gap-2 sm:gap-3 ${
        isMobile 
          ? 'grid-cols-1' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {lessons.map((lesson, lessonIndex) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            lessonIndex={lessonIndex}
            isCompleted={isLessonCompleted(lesson.id)}
            score={getLessonScore(lesson.id)}
            isUnlocked={isLessonUnlocked(lesson, lessonIndex)}
            onStart={() => onStartLesson(lesson)}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsGrid;