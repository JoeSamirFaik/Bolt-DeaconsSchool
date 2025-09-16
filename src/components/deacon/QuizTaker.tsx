import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  ClipboardDocumentCheckIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { Quiz, Question } from '../../types/lms';

interface QuizTakerProps {
  quiz: Quiz;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const QuizTaker: React.FC<QuizTakerProps> = ({ quiz, onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: any }>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convert to seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [timeLeft, isSubmitted]);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    
    setIsSubmitted(true);
    
    // Calculate score
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    
    quiz.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (question.type === 'multiple_choice') {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
          earnedPoints += question.points;
        }
      } else if (question.type === 'true_false') {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
          earnedPoints += question.points;
        }
      } else if (question.type === 'short_answer') {
        // Simple string comparison - in real app, this would be more sophisticated
        if (userAnswer?.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim()) {
          correctAnswers++;
          earnedPoints += question.points;
        }
      }
    });
    
    const finalScore = Math.round((earnedPoints / totalPoints) * 100);
    setScore(finalScore);
    setShowResults(true);
    onComplete(finalScore);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft > quiz.timeLimit * 60 * 0.5) return 'text-green-600';
    if (timeLeft > quiz.timeLimit * 60 * 0.25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderQuestion = (question: Question) => {
    const userAnswer = answers[question.id];
    
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center space-x-3 space-x-reverse p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  userAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isSubmitted ? 'cursor-not-allowed' : ''}`}
              >
                <span className="text-gray-700 font-cairo flex-1 text-right">{option}</span>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={userAnswer === index}
                  onChange={() => !isSubmitted && handleAnswerChange(question.id, index)}
                  disabled={isSubmitted}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </label>
            ))}
          </div>
        );
      
      case 'true_false':
        return (
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
              userAnswer === 'true'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${isSubmitted ? 'cursor-not-allowed' : ''}`}>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={userAnswer === 'true'}
                onChange={() => !isSubmitted && handleAnswerChange(question.id, 'true')}
                disabled={isSubmitted}
                className="sr-only"
              />
              <div className="text-center">
                <CheckCircleIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="font-medium text-gray-900 font-cairo">صح</span>
              </div>
            </label>
            
            <label className={`flex items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
              userAnswer === 'false'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${isSubmitted ? 'cursor-not-allowed' : ''}`}>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={userAnswer === 'false'}
                onChange={() => !isSubmitted && handleAnswerChange(question.id, 'false')}
                disabled={isSubmitted}
                className="sr-only"
              />
              <div className="text-center">
                <XCircleIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <span className="font-medium text-gray-900 font-cairo">خطأ</span>
              </div>
            </label>
          </div>
        );
      
      case 'short_answer':
        return (
          <textarea
            value={userAnswer || ''}
            onChange={(e) => !isSubmitted && handleAnswerChange(question.id, e.target.value)}
            disabled={isSubmitted}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo resize-none"
            placeholder="اكتب إجابتك هنا..."
          />
        );
      
      default:
        return <div>نوع السؤال غير مدعوم</div>;
    }
  };

  if (showResults) {
    const passed = score >= quiz.passingScore;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
          {/* Results Header */}
          <div className={`p-8 text-center rounded-t-2xl ${
            passed ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-red-50 to-rose-50'
          }`}>
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <TrophyIcon className="w-10 h-10 text-green-600" />
              ) : (
                <XCircleIcon className="w-10 h-10 text-red-600" />
              )}
            </div>
            
            <h2 className={`text-3xl font-bold mb-2 font-cairo ${
              passed ? 'text-green-900' : 'text-red-900'
            }`}>
              {passed ? 'مبروك! نجحت في الاختبار' : 'للأسف، لم تنجح في الاختبار'}
            </h2>
            
            <div className="text-6xl font-bold mb-4 font-cairo">
              <span className={passed ? 'text-green-600' : 'text-red-600'}>{score}%</span>
            </div>
            
            <p className={`font-cairo ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed 
                ? `تحتاج إلى ${quiz.passingScore}% للنجاح - حققت ${score}%`
                : `تحتاج إلى ${quiz.passingScore}% للنجاح - حققت ${score}% فقط`
              }
            </p>
          </div>

          {/* Results Details */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 font-cairo">
                  {Object.keys(answers).length}/{quiz.questions.length}
                </div>
                <div className="text-sm text-gray-600 font-cairo">الأسئلة المجابة</div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 font-cairo">
                  {formatTime((quiz.timeLimit * 60) - timeLeft)}
                </div>
                <div className="text-sm text-gray-600 font-cairo">الوقت المستغرق</div>
              </div>
            </div>

            <div className="flex space-x-3 space-x-reverse">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                إغلاق
              </button>
              
              {!passed && (
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  إعادة المحاولة
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
            
            {/* Timer */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <ClockIcon className={`w-5 h-5 ${getTimeColor()}`} />
              <span className={`text-lg font-bold font-cairo ${getTimeColor()}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900 font-cairo">{quiz.title}</h2>
            <p className="text-gray-600 font-cairo">{quiz.description}</p>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setCurrentQuestionIndex(Math.min(quiz.questions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === quiz.questions.length - 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900 font-cairo">
                السؤال {currentQuestionIndex + 1} من {quiz.questions.length}
              </span>
              <div className="text-sm text-gray-600 font-cairo">
                {currentQuestion.points} نقطة
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 font-cairo mb-4 text-right leading-relaxed">
              {currentQuestion.text}
            </h3>
          </div>
          
          {renderQuestion(currentQuestion)}
          
          {currentQuestion.explanation && isSubmitted && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-semibold text-blue-900 font-cairo mb-2 text-right">التفسير:</h4>
              <p className="text-blue-800 font-cairo text-right">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3 space-x-reverse">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                إلغاء
              </button>
              
              {currentQuestionIndex === quiz.questions.length - 1 && !isSubmitted && (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center space-x-2 space-x-reverse"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>إنهاء الاختبار</span>
                </button>
              )}
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 font-cairo">
                <span>الأسئلة المجابة: {Object.keys(answers).length}/{quiz.questions.length}</span>
                <span>•</span>
                <span>المحاولة 1 من {quiz.maxAttempts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTaker;