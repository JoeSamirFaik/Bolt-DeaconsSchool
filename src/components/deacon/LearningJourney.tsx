import React, { useState, useEffect } from 'react';
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  ClipboardDocumentCheckIcon,
  TrophyIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  DocumentArrowDownIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Level, Subject, Lesson, Quiz } from '../../types/lms';
import { User, LevelAssignment } from '../../types/user';
import { levelsApi, subjectsApi, lessonsApi, quizzesApi } from '../../services/lmsApi';
import { levelAssignmentsApi } from '../../services/userApi';
import LessonViewer from './LessonViewer';
import QuizTaker from './QuizTaker';
import CertificateGenerator from './CertificateGenerator';

const LearningJourney: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<LevelAssignment[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  
  // Modal states
  const [showLessonViewer, setShowLessonViewer] = useState(false);
  const [showQuizTaker, setShowQuizTaker] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedLevelForCert, setSelectedLevelForCert] = useState<Level | null>(null);

  useEffect(() => {
    if (user?.role === 'deacon') {
      loadDeaconData();
    }
  }, [user]);

  useEffect(() => {
    if (selectedLevel) {
      loadLevelContent(selectedLevel);
    }
  }, [selectedLevel]);

  const loadDeaconData = async () => {
    try {
      setLoading(true);
      const [assignmentsData, levelsData] = await Promise.all([
        levelAssignmentsApi.getByDeaconId(user!.id),
        levelsApi.getAll()
      ]);
      
      setAssignments(assignmentsData);
      setLevels(levelsData);
      
      // Auto-select the first active assignment
      if (assignmentsData.length > 0) {
        const activeAssignment = assignmentsData.find(a => a.status === 'in_progress') || assignmentsData[0];
        setSelectedLevel(activeAssignment.levelId);
      }
    } catch (error) {
      console.error('Error loading deacon data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLevelContent = async (levelId: string) => {
    try {
      const [subjectsData, lessonsData, quizzesData] = await Promise.all([
        subjectsApi.getByLevelId(levelId),
        lessonsApi.getAll(),
        quizzesApi.getAll()
      ]);
      
      setSubjects(subjectsData);
      setLessons(lessonsData.filter(l => subjectsData.some(s => s.id === l.subjectId)));
      setQuizzes(quizzesData.filter(q => subjectsData.some(s => s.id === q.subjectId)));
    } catch (error) {
      console.error('Error loading level content:', error);
    }
  };

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowLessonViewer(true);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizTaker(true);
  };

  const handleGenerateCertificate = (level: Level) => {
    setSelectedLevelForCert(level);
    setShowCertificate(true);
  };

  const getAssignmentForLevel = (levelId: string) => {
    return assignments.find(a => a.levelId === levelId);
  };

  const getSubjectProgress = (subjectId: string) => {
    const subjectLessons = lessons.filter(l => l.subjectId === subjectId);
    const completedLessons = subjectLessons.filter(l => Math.random() > 0.3); // Mock completion
    return subjectLessons.length > 0 ? Math.round((completedLessons.length / subjectLessons.length) * 100) : 0;
  };

  const getLevelProgress = (levelId: string) => {
    const levelSubjects = subjects.filter(s => levels.find(l => l.id === levelId)?.subjects?.includes(s.id));
    if (levelSubjects.length === 0) return 0;
    
    const totalProgress = levelSubjects.reduce((sum, subject) => sum + getSubjectProgress(subject.id), 0);
    return Math.round(totalProgress / levelSubjects.length);
  };

  const canGenerateCertificate = (levelId: string) => {
    const assignment = getAssignmentForLevel(levelId);
    const progress = getLevelProgress(levelId);
    const level = levels.find(l => l.id === levelId);
    
    return assignment?.status === 'completed' || 
           (progress >= (level?.passPercentage || 70) && assignment?.status === 'in_progress');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-cairo">جاري تحميل رحلتك التعليمية...</p>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AcademicCapIcon className="w-10 h-10 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">لم يتم تكليفك بأي مستوى بعد</h3>
          <p className="text-gray-500 font-cairo">يرجى التواصل مع المدير أو الخادم لتكليفك بمستوى دراسي</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-900 font-cairo">رحلتي التعليمية</h1>
          <p className="text-gray-600 font-cairo">تابع تقدمك في المستويات المكلف بها</p>
        </div>
      </div>

      {/* Level Selection */}
      {assignments.length > 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right font-cairo">المستويات المكلف بها</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((assignment) => {
              const level = levels.find(l => l.id === assignment.levelId);
              const progress = getLevelProgress(assignment.levelId);
              
              return (
                <button
                  key={assignment.id}
                  onClick={() => setSelectedLevel(assignment.levelId)}
                  className={`p-4 rounded-xl border-2 transition-all text-right ${
                    selectedLevel === assignment.levelId
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      assignment.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {assignment.status === 'completed' ? 'مكتمل' :
                       assignment.status === 'in_progress' ? 'قيد التنفيذ' : 'مُكلف'}
                    </span>
                    <span className="text-lg font-bold text-amber-600">{progress}%</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 font-cairo mb-2">{level?.name}</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Level Content */}
      {selectedLevel && (
        <div className="space-y-6">
          {/* Level Overview */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-sm border border-amber-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                {canGenerateCertificate(selectedLevel) && (
                  <button
                    onClick={() => handleGenerateCertificate(levels.find(l => l.id === selectedLevel)!)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
                  >
                    <DocumentArrowDownIcon className="w-5 h-5" />
                    <span>تحميل الشهادة</span>
                  </button>
                )}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-2">
                    <span className="text-xl font-bold text-amber-600">{getLevelProgress(selectedLevel)}%</span>
                  </div>
                  <p className="text-xs text-gray-600 font-cairo">التقدم</p>
                </div>
              </div>
              
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900 font-cairo mb-2">
                  {levels.find(l => l.id === selectedLevel)?.name}
                </h2>
                <p className="text-gray-600 font-cairo mb-3">
                  {levels.find(l => l.id === selectedLevel)?.description}
                </p>
                <div className="flex items-center space-x-4 space-x-reverse text-sm">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                    {subjects.length} مقرر
                  </span>
                  <span className="text-gray-500">
                    نسبة النجاح: {levels.find(l => l.id === selectedLevel)?.passPercentage}%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-700 shadow-sm"
                  style={{ width: `${getLevelProgress(selectedLevel)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-4">
            {subjects.map((subject) => {
              const subjectLessons = lessons.filter(l => l.subjectId === subject.id);
              const subjectQuizzes = quizzes.filter(q => q.subjectId === subject.id);
              const isExpanded = expandedSubjects.includes(subject.id);
              const progress = getSubjectProgress(subject.id);
              
              return (
                <div key={subject.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Subject Header */}
                  <button
                    onClick={() => toggleSubjectExpansion(subject.id)}
                    className="w-full p-6 text-right hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-1">
                            <span className="text-sm font-bold text-blue-600">{progress}%</span>
                          </div>
                          <p className="text-xs text-gray-600 font-cairo">التقدم</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-gray-900 font-cairo mb-2">{subject.name}</h3>
                        <p className="text-gray-600 font-cairo mb-3">{subject.description}</p>
                        <div className="flex items-center space-x-4 space-x-reverse text-sm">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                            {subjectLessons.length} درس
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                            {subjectQuizzes.length} اختبار
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </button>

                  {/* Subject Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6">
                      {/* Lessons */}
                      {subjectLessons.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-right font-cairo flex items-center space-x-2 space-x-reverse">
                            <BookOpenIcon className="w-5 h-5 text-blue-600" />
                            <span>الدروس</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subjectLessons.map((lesson, index) => {
                              const isCompleted = Math.random() > 0.4; // Mock completion
                              const score = isCompleted ? Math.floor(Math.random() * 30) + 70 : null;
                              
                              return (
                                <div
                                  key={lesson.id}
                                  className={`border-2 rounded-xl p-4 transition-all hover:shadow-md ${
                                    isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                      <span className="text-sm text-gray-500 font-cairo">#{lesson.order}</span>
                                      <span className="text-sm text-gray-500 font-cairo">{lesson.duration} دقيقة</span>
                                    </div>
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                      {isCompleted ? (
                                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                      ) : (
                                        <ClockIcon className="w-5 h-5 text-gray-400" />
                                      )}
                                      {score && (
                                        <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full font-medium">
                                          {score}%
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <h5 className="font-semibold text-gray-900 font-cairo mb-2 text-right">
                                    {lesson.title}
                                  </h5>
                                  <p className="text-sm text-gray-600 font-cairo mb-4 text-right">
                                    {lesson.description}
                                  </p>
                                  
                                  <button
                                    onClick={() => handleStartLesson(lesson)}
                                    className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
                                      isCompleted
                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                  >
                                    {isCompleted ? 'مراجعة الدرس' : 'بدء الدرس'}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Quizzes */}
                      {subjectQuizzes.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-right font-cairo flex items-center space-x-2 space-x-reverse">
                            <ClipboardDocumentCheckIcon className="w-5 h-5 text-purple-600" />
                            <span>الاختبارات</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subjectQuizzes.map((quiz) => {
                              const isCompleted = Math.random() > 0.5; // Mock completion
                              const score = isCompleted ? Math.floor(Math.random() * 30) + 70 : null;
                              const attempts = isCompleted ? Math.floor(Math.random() * quiz.maxAttempts) + 1 : 0;
                              
                              return (
                                <div
                                  key={quiz.id}
                                  className={`border-2 rounded-xl p-4 transition-all hover:shadow-md ${
                                    isCompleted ? 'border-purple-200 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                      <span className="text-sm text-gray-500 font-cairo">#{quiz.order}</span>
                                      <span className="text-sm text-gray-500 font-cairo">{quiz.timeLimit} دقيقة</span>
                                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        quiz.type === 'lesson_quiz' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                      }`}>
                                        {quiz.type === 'lesson_quiz' ? 'اختبار درس' : 'امتحان نهائي'}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                      {isCompleted ? (
                                        <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                                      ) : (
                                        <ClockIcon className="w-5 h-5 text-gray-400" />
                                      )}
                                      {score && (
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                          score >= quiz.passingScore ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                          {score}%
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <h5 className="font-semibold text-gray-900 font-cairo mb-2 text-right">
                                    {quiz.title}
                                  </h5>
                                  <p className="text-sm text-gray-600 font-cairo mb-3 text-right">
                                    {quiz.description}
                                  </p>
                                  
                                  {isCompleted && (
                                    <div className="text-xs text-gray-500 font-cairo mb-3 text-right">
                                      المحاولات: {attempts}/{quiz.maxAttempts}
                                    </div>
                                  )}
                                  
                                  <button
                                    onClick={() => handleStartQuiz(quiz)}
                                    disabled={isCompleted && attempts >= quiz.maxAttempts}
                                    className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
                                      isCompleted && attempts >= quiz.maxAttempts
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : isCompleted
                                        ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                        : 'bg-purple-600 text-white hover:bg-purple-700'
                                    }`}
                                  >
                                    {isCompleted && attempts >= quiz.maxAttempts
                                      ? 'انتهت المحاولات'
                                      : isCompleted
                                      ? 'إعادة المحاولة'
                                      : 'بدء الاختبار'}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals */}
      {showLessonViewer && selectedLesson && (
        <LessonViewer
          lesson={selectedLesson}
          onClose={() => {
            setShowLessonViewer(false);
            setSelectedLesson(null);
          }}
          onComplete={() => {
            setShowLessonViewer(false);
            setSelectedLesson(null);
            // Refresh data to update progress
            loadLevelContent(selectedLevel);
          }}
        />
      )}

      {showQuizTaker && selectedQuiz && (
        <QuizTaker
          quiz={selectedQuiz}
          onClose={() => {
            setShowQuizTaker(false);
            setSelectedQuiz(null);
          }}
          onComplete={(score: number) => {
            setShowQuizTaker(false);
            setSelectedQuiz(null);
            // Refresh data to update progress
            loadLevelContent(selectedLevel);
          }}
        />
      )}

      {showCertificate && selectedLevelForCert && (
        <CertificateGenerator
          level={selectedLevelForCert}
          deacon={user!}
          assignment={getAssignmentForLevel(selectedLevelForCert.id)!}
          onClose={() => {
            setShowCertificate(false);
            setSelectedLevelForCert(null);
          }}
        />
      )}
    </div>
  );
};

export default LearningJourney;