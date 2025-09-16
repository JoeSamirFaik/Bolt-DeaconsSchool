import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  BookOpenIcon, 
  ClockIcon, 
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Lesson } from '../../types/lms';

interface LessonViewerProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onClose, onComplete }) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleComplete = () => {
    setCompleted(true);
    setIsPlaying(false);
    onComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.min((timeSpent / (lesson.duration * 60)) * 100, 100);

  const renderContent = () => {
    switch (lesson.contentType) {
      case 'text':
        return (
          <div className="prose prose-lg max-w-none text-right font-cairo">
            <div className="bg-gray-50 rounded-xl p-6 leading-relaxed text-gray-800">
              {lesson.content.text || 'محتوى الدرس سيكون متاحاً قريباً...'}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="text-center">
            {lesson.content.imageUrl ? (
              <img 
                src={lesson.content.imageUrl} 
                alt={lesson.title}
                className="max-w-full h-auto rounded-xl shadow-lg mx-auto"
              />
            ) : (
              <div className="bg-gray-100 rounded-xl p-12">
                <p className="text-gray-500 font-cairo">لا توجد صورة متاحة</p>
              </div>
            )}
          </div>
        );
      
      case 'video':
        return (
          <div className="text-center">
            {lesson.content.videoUrl ? (
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <video 
                  controls 
                  className="w-full h-auto"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={lesson.content.videoUrl} type="video/mp4" />
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-xl p-12">
                <p className="text-gray-500 font-cairo">لا يوجد فيديو متاح</p>
              </div>
            )}
          </div>
        );
      
      case 'mixed':
        return (
          <div className="space-y-6">
            {lesson.content.text && (
              <div className="prose prose-lg max-w-none text-right font-cairo">
                <div className="bg-gray-50 rounded-xl p-6 leading-relaxed text-gray-800">
                  {lesson.content.text}
                </div>
              </div>
            )}
            
            {lesson.content.imageUrl && (
              <div className="text-center">
                <img 
                  src={lesson.content.imageUrl} 
                  alt={lesson.title}
                  className="max-w-full h-auto rounded-xl shadow-lg mx-auto"
                />
              </div>
            )}
            
            {lesson.content.videoUrl && (
              <div className="text-center">
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <video 
                    controls 
                    className="w-full h-auto"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={lesson.content.videoUrl} type="video/mp4" />
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div className="bg-gray-100 rounded-xl p-12 text-center">
            <p className="text-gray-500 font-cairo">نوع المحتوى غير مدعوم</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
            
            {/* Timer and Progress */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded-lg transition-colors ${
                  isPlaying ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}
              >
                {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
              </button>
              
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 font-cairo">{formatTime(timeSpent)}</div>
                <div className="text-xs text-gray-500 font-cairo">من {lesson.duration} دقيقة</div>
              </div>
              
              <div className="w-32">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900 font-cairo">{lesson.title}</h2>
            <p className="text-gray-600 font-cairo">{lesson.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3 space-x-reverse">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                إغلاق
              </button>
              
              {progressPercentage >= 80 && !completed && (
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center space-x-2 space-x-reverse"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>إكمال الدرس</span>
                </button>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600 font-cairo">
                {progressPercentage >= 80 
                  ? 'ممتاز! يمكنك الآن إكمال الدرس' 
                  : `تحتاج إلى مشاهدة ${Math.max(0, 80 - Math.round(progressPercentage))}% إضافية لإكمال الدرس`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;