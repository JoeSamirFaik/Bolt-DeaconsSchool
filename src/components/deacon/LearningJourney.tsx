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
  FireIcon,
  BoltIcon,
  SparklesIcon,
  GiftIcon,
  LockClosedIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Level, Subject, Lesson, Quiz } from '../../types/lms';
import { User, LevelAssignment } from '../../types/user';
import { levelsApi, subjectsApi, lessonsApi, quizzesApi } from '../../services/lmsApi';
import { levelAssignmentsApi } from '../../services/userApi';
import LessonViewer from './LessonViewer';
import QuizTaker from './QuizTaker';
import CertificateGenerator from './CertificateGenerator';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface GameStats {
  totalXP: number;
  level: number;
  streak: number;
  badges: number;
  rank: string;
}

const LearningJourney: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<LevelAssignment[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [gameStats, setGameStats] = useState<GameStats>({
    totalXP: 1250,
    level: 5,
    streak: 7,
    badges: 12,
    rank: 'شماس متميز'
  });
  
  // Modal states
  const [showLessonViewer, setShowLessonViewer] = useState(false);
  const [showQuizTaker, setShowQuizTaker] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedLevelForCert, setSelectedLevelForCert] = useState<Level | null>(null);

  // Mock achievements
  const [achievements] = useState<Achievement[]>([
    { id: '1', title: 'أول خطوة', description: 'أكمل أول درس', icon: '🎯', color: 'from-blue-400 to-indigo-500', unlocked: true, unlockedAt: '2024-12-01' },
    { id: '2', title: 'متعلم نشط', description: 'أكمل 5 دروس', icon: '📚', color: 'from-green-400 to-emerald-500', unlocked: true, unlockedAt: '2024-12-05' },
    { id: '3', title: 'نجم الاختبارات', description: 'احصل على 90% في 3 اختبارات', icon: '⭐', color: 'from-yellow-400 to-orange-500', unlocked: true, unlockedAt: '2024-12-10' },
    { id: '4', title: 'المثابر', description: 'ادرس لمدة 7 أيام متتالية', icon: '🔥', color: 'from-red-400 to-rose-500', unlocked: true, unlockedAt: '2024-12-12' },
    { id: '5', title: 'خبير المستوى', description: 'أكمل مستوى كامل', icon: '🏆', color: 'from-purple-400 to-indigo-500', unlocked: false },
    { id: '6', title: 'عالم الكنيسة', description: 'أكمل جميع المستويات', icon: '👑', color: 'from-amber-400 to-orange-500', unlocked: false }
  ]);

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

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subjectId)) {
        newSet.delete(subjectId);
      } else {
        newSet.add(subjectId);
      }
      return newSet;
    });
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
    const levelSubjects = subjects.filter(s => levels.find(l => l.id === levelId));
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

  const getXPForNextLevel = () => {
    return (gameStats.level * 200) - (gameStats.totalXP % (gameStats.level * 200));
  };

  const getProgressToNextLevel = () => {
    const currentLevelXP = gameStats.totalXP % (gameStats.level * 200);
    const requiredXP = gameStats.level * 200;
    return Math.round((currentLevelXP / requiredXP) * 100);
  };

  const isSubjectUnlocked = (subjectIndex: number) => {
    if (subjectIndex === 0) return true;
    const previousSubject = subjects[subjectIndex - 1];
    return getSubjectProgress(previousSubject.id) >= previousSubject.passPercentage;
  };

  const isLessonUnlocked = (lesson: Lesson, lessonIndex: number) => {
    if (lessonIndex === 0) return true;
    const subjectLessons = lessons.filter(l => l.subjectId === lesson.subjectId);
    const previousLesson = subjectLessons[lessonIndex - 1];
    return Math.random() > 0.3; // Mock completion check
  };

  const isQuizUnlocked = (quiz: Quiz) => {
    const subjectLessons = lessons.filter(l => l.subjectId === quiz.subjectId);
    const completedLessons = subjectLessons.filter(l => Math.random() > 0.3); // Mock completion
    return subjectLessons.length === 0 || (completedLessons.length / subjectLessons.length) >= 0.5;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-gray-900 shadow-2xl">
            <h2 className="text-2xl font-bold mb-3 font-cairo">جاري تحميل رحلتك التعليمية...</h2>
            <p className="text-gray-600 font-cairo">نحضر كل شيء من أجلك! 🎓</p>
          </div>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-2xl">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <AcademicCapIcon className="w-12 h-12 text-amber-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-cairo">مرحباً بك في رحلتك التعليمية!</h3>
          <p className="text-gray-600 font-cairo text-lg mb-8">لم يتم تكليفك بأي مستوى دراسي بعد. يرجى التواصل مع المدير أو الخادم لبدء رحلتك التعليمية.</p>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6">
            <p className="text-amber-800 font-cairo font-medium">💡 نصيحة: بمجرد تكليفك بمستوى، ستتمكن من الوصول إلى جميع الدروس والاختبارات!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Gamified Header Dashboard */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-lg border border-purple-300 p-6 text-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              {/* Player Stats */}
              <div className="flex items-center space-x-4 space-x-reverse">
                {/* Streak Counter */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-2 space-x-reverse mb-1">
                    <FireIcon className="w-4 h-4 text-orange-300" />
                    <span className="text-xl font-bold">{gameStats.streak}</span>
                  </div>
                  <p className="text-xs opacity-90 font-cairo">يوم متتالي</p>
                </div>
                
                {/* Badges Count */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-2 space-x-reverse mb-1">
                    <TrophyIcon className="w-4 h-4 text-yellow-300" />
                    <span className="text-xl font-bold">{gameStats.badges}</span>
                  </div>
                  <p className="text-xs opacity-90 font-cairo">شارة</p>
                </div>

                {/* Current Level */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-2 space-x-reverse mb-1">
                    <BoltIcon className="w-4 h-4 text-yellow-300" />
                    <span className="text-xl font-bold">{gameStats.level}</span>
                  </div>
                  <p className="text-xs opacity-90 font-cairo">المستوى</p>
                </div>
              </div>
              
              {/* Player Info */}
              <div className="text-right">
                <h1 className="text-2xl font-bold mb-2 font-cairo">رحلتي التعليمية</h1>
                <p className="text-lg opacity-90 font-cairo mb-1">{gameStats.rank}</p>
                <p className="text-sm opacity-75 font-cairo">{user?.firstName} {user?.lastName}</p>
              </div>
              
              {/* Player Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform duration-300">
                <span className="text-xl font-bold text-white">
                  {user?.firstName?.charAt(0)}
                </span>
              </div>
            </div>
            
            {/* XP Progress System */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs opacity-90 font-cairo">{getXPForNextLevel()} XP للمستوى التالي</span>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-lg font-bold font-cairo">المستوى {gameStats.level}</span>
                  <BoltIcon className="w-5 h-5 text-yellow-300" />
                </div>
              </div>
              <div className="w-full bg-white/30 rounded-full h-4 shadow-inner">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-1000 shadow-lg relative overflow-hidden"
                  style={{ width: `${getProgressToNextLevel()}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs opacity-90">
                <span className="font-cairo">{gameStats.totalXP} XP</span>
                <span className="font-cairo">{gameStats.level * 200} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Showcase */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="text-amber-600 hover:text-amber-700 font-cairo font-medium text-sm hover:scale-105 transition-transform duration-200">
              عرض الكل →
            </button>
            <div className="flex items-center space-x-4 space-x-reverse">
              <h2 className="text-xl font-bold text-gray-900 font-cairo">الإنجازات</h2>
              <SparklesIcon className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-110 cursor-pointer ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${achievement.color} text-white shadow-xl border-transparent`
                    : 'bg-gray-100 border-gray-200 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {achievement.unlocked && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h4 className="font-bold text-xs font-cairo mb-1">{achievement.title}</h4>
                  <p className="text-xs opacity-80 font-cairo leading-tight">{achievement.description}</p>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs opacity-60 font-cairo mt-1">
                      {new Date(achievement.unlockedAt).toLocaleDateString('ar-EG')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level Selection Path */}
        {assignments.length > 1 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">مسار المستويات</h3>
            <div className="relative">
              {/* Progress Path Line */}
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-gray-300 via-amber-400 to-green-500 rounded-full transform -translate-y-1/2 shadow-sm"></div>
              
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
                      onClick={() => setSelectedLevel(assignment.levelId)}
                      className={`relative group transition-all duration-300 hover:scale-125 ${
                        isActive ? 'scale-125' : ''
                      }`}
                    >
                      {/* Level Node */}
                      <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 animate-pulse' :
                        isInProgress 
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300' :
                        'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-200'
                      }`}>
                        {isCompleted ? (
                          <TrophyIcon className="w-6 h-6 text-white" />
                        ) : isInProgress ? (
                          <span className="text-sm font-bold text-white">{progress}%</span>
                        ) : (
                          <ClockIcon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      
                      {/* Level Info */}
                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                        <h4 className="font-bold text-gray-900 font-cairo text-sm mb-1">
                          {level?.name}
                        </h4>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                          isCompleted ? 'bg-green-100 text-green-800' :
                          isInProgress ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {isCompleted ? 'مكتمل ✅' : isInProgress ? 'قيد التنفيذ 🔄' : 'قادم ⏳'}
                        </span>
                      </div>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-20 animate-ping"></div>
                      )}
                      
                      {/* Completion Celebration */}
                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                          <StarIcon className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Current Level Content */}
        {selectedLevel && (
          <div className="space-y-6">
            {/* Level Overview */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-200 p-6">
              <div className="flex items-center justify-between mb-6">
                {/* Certificate Generation */}
                <div className="flex items-center space-x-4 space-x-reverse">
                  {canGenerateCertificate(selectedLevel) && (
                    <button
                      onClick={() => handleGenerateCertificate(levels.find(l => l.id === selectedLevel)!)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
                    >
                      <GiftIcon className="w-4 h-4" />
                      <span className="text-sm">تحميل الشهادة</span>
                      <DocumentArrowDownIcon className="w-4 h-4" />
                    </button>
                  )}
                  
                  {/* Level Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                      <div className="text-xl font-bold text-amber-600 mb-1">{getLevelProgress(selectedLevel)}%</div>
                      <p className="text-xs text-gray-700 font-cairo">التقدم</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                      <div className="text-xl font-bold text-orange-600 mb-1">{subjects.length}</div>
                      <p className="text-xs text-gray-700 font-cairo">مقرر</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                      <div className="text-xl font-bold text-red-600 mb-1">{lessons.length}</div>
                      <p className="text-xs text-gray-700 font-cairo">درس</p>
                    </div>
                  </div>
                </div>
                
                {/* Level Header */}
                <div className="text-right">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <AcademicCapIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 font-cairo">
                        {levels.find(l => l.id === selectedLevel)?.name}
                      </h2>
                      <p className="text-gray-600 font-cairo text-sm">
                        {levels.find(l => l.id === selectedLevel)?.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium text-sm shadow-sm">
                      نسبة النجاح: {levels.find(l => l.id === selectedLevel)?.passPercentage}%
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium text-sm shadow-sm">
                      +50 XP لكل درس
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="relative">
                <div className="w-full bg-white/50 rounded-full h-6 shadow-inner">
                  <div
                    className="h-6 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-1000 shadow-lg relative overflow-hidden"
                    style={{ width: `${getLevelProgress(selectedLevel)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sm font-bold text-gray-700 font-cairo">
                  {getLevelProgress(selectedLevel)}% مكتمل
                </div>
              </div>
            </div>

            {/* Subjects Journey Path */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo flex items-center space-x-3 space-x-reverse">
                <BookOpenIcon className="w-6 h-6 text-blue-600" />
                <span>مسار المقررات</span>
              </h3>
              
              <div className="space-y-6">
                {subjects.map((subject, subjectIndex) => {
                  const subjectLessons = lessons.filter(l => l.subjectId === subject.id);
                  const subjectQuizzes = quizzes.filter(q => q.subjectId === subject.id);
                  const progress = getSubjectProgress(subject.id);
                  const isCompleted = progress >= subject.passPercentage;
                  const isUnlocked = isSubjectUnlocked(subjectIndex);
                  const isExpanded = expandedSubjects.has(subject.id);
                  
                  return (
                    <div key={subject.id} className="relative">
                      {/* Connection Line to Next Subject */}
                      {subjectIndex < subjects.length - 1 && (
                        <div className="absolute top-16 right-12 w-1 h-12 bg-gradient-to-b from-amber-300 to-orange-400 rounded-full shadow-sm"></div>
                      )}
                      
                      <div className={`relative transition-all duration-500 ${
                        !isUnlocked ? 'opacity-50' : ''
                      }`}>
                        {/* Subject Header - Clickable */}
                        <button
                          onClick={() => isUnlocked && toggleSubjectExpansion(subject.id)}
                          disabled={!isUnlocked}
                          className="w-full"
                        >
                          <div className="flex items-center space-x-6 space-x-reverse mb-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102">
                            {/* Subject Node */}
                            <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${
                              isCompleted 
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300' :
                              isUnlocked 
                                ? 'bg-gradient-to-br from-blue-400 to-indigo-500 border-blue-300' :
                              'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-200'
                            }`}>
                              {!isUnlocked ? (
                                <LockClosedIcon className="w-8 h-8 text-white" />
                              ) : isCompleted ? (
                                <TrophyIcon className="w-8 h-8 text-white" />
                              ) : (
                                <BookOpenIcon className="w-8 h-8 text-white" />
                              )}
                              <span className="text-white font-bold text-sm mt-1">{progress}%</span>
                            </div>
                            
                            {/* Subject Info */}
                            <div className="flex-1 text-right">
                              <div className="flex items-center space-x-3 space-x-reverse mb-3">
                                <div className="flex space-x-3 space-x-reverse">
                                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                                    {subjectLessons.length} درس
                                  </span>
                                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                                    {subjectQuizzes.length} اختبار
                                  </span>
                                  {isCompleted && (
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm animate-pulse">
                                      +100 XP
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 font-cairo">{subject.name}</h3>
                              </div>
                              <p className="text-gray-600 font-cairo text-sm mb-3 leading-relaxed">{subject.description}</p>
                              
                              {/* Subject Progress Bar */}
                              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                                <div
                                  className={`h-4 rounded-full transition-all duration-700 shadow-sm ${
                                    isCompleted 
                                      ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                                    isUnlocked 
                                      ? 'bg-gradient-to-r from-blue-400 to-indigo-500' :
                                    'bg-gray-300'
                                  }`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-500 font-cairo">
                                  نسبة النجاح المطلوبة: {subject.passPercentage}%
                                </span>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                  <span className="text-sm font-bold text-gray-700 font-cairo">{progress}%</span>
                                  <ChevronRightIcon className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                                    isExpanded ? 'rotate-90' : ''
                                  }`} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Expanded Content - Lessons and Quizzes */}
                        {isUnlocked && isExpanded && (
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 ml-12 shadow-inner border border-gray-200">
                            {/* Lessons Section */}
                            {subjectLessons.length > 0 && (
                              <div className="mb-6">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo flex items-center space-x-2 space-x-reverse">
                                  <BookOpenIcon className="w-5 h-5 text-blue-600" />
                                  <span>الدروس ({subjectLessons.length})</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {subjectLessons.map((lesson, lessonIndex) => {
                                    const isLessonCompleted = Math.random() > 0.4; // Mock completion
                                    const score = isLessonCompleted ? Math.floor(Math.random() * 30) + 70 : null;
                                    const isLessonUnlocked = isLessonUnlocked(lesson, lessonIndex);
                                    
                                    return (
                                      <div
                                        key={lesson.id}
                                        className={`relative border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg ${
                                          !isLessonUnlocked ? 'opacity-50 cursor-not-allowed' :
                                          isLessonCompleted ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:scale-105' : 
                                          'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:scale-105 cursor-pointer'
                                        }`}
                                      >
                                        {/* Lesson Number Badge */}
                                        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                                          isLessonCompleted ? 'bg-green-500 animate-pulse' : 
                                          isLessonUnlocked ? 'bg-blue-500' : 'bg-gray-400'
                                        }`}>
                                          {lesson.order}
                                        </div>
                                        
                                        {/* Lock Indicator */}
                                        {!isLessonUnlocked && (
                                          <div className="absolute top-2 left-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
                                            <LockClosedIcon className="w-4 h-4 text-white" />
                                          </div>
                                        )}
                                        
                                        <div className="text-right mb-4">
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                              {isLessonCompleted && (
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
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                              {isLessonCompleted ? (
                                                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                                              ) : isLessonUnlocked ? (
                                                <PlayIcon className="w-4 h-4 text-blue-600" />
                                              ) : (
                                                <ClockIcon className="w-4 h-4 text-gray-400" />
                                              )}
                                              <span className="text-xs text-gray-500 font-cairo">{lesson.duration} دقيقة</span>
                                            </div>
                                          </div>
                                          
                                          <h5 className="font-bold text-gray-900 font-cairo text-sm mb-2">
                                            {lesson.title}
                                          </h5>
                                          <p className="text-gray-600 font-cairo text-xs leading-relaxed">
                                            {lesson.description}
                                          </p>
                                        </div>
                                        
                                        <button
                                          onClick={() => isLessonUnlocked && handleStartLesson(lesson)}
                                          disabled={!isLessonUnlocked}
                                          className={`w-full py-3 px-4 rounded-lg transition-all duration-200 font-medium text-sm ${
                                            !isLessonUnlocked
                                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                              : isLessonCompleted
                                              ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:scale-105 shadow-lg'
                                              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-xl'
                                          }`}
                                        >
                                          {!isLessonUnlocked ? '🔒 مقفل' :
                                           isLessonCompleted ? '📖 مراجعة الدرس' : '▶️ بدء الدرس'}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Quizzes Section */}
                            {subjectQuizzes.length > 0 && (
                              <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo flex items-center space-x-2 space-x-reverse">
                                  <ClipboardDocumentCheckIcon className="w-5 h-5 text-purple-600" />
                                  <span>الاختبارات ({subjectQuizzes.length})</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {subjectQuizzes.map((quiz) => {
                                    const isQuizCompleted = Math.random() > 0.5; // Mock completion
                                    const score = isQuizCompleted ? Math.floor(Math.random() * 30) + 70 : null;
                                    const attempts = isQuizCompleted ? Math.floor(Math.random() * quiz.maxAttempts) + 1 : 0;
                                    const isQuizUnlocked = isQuizUnlocked(quiz);
                                    
                                    return (
                                      <div
                                        key={quiz.id}
                                        className={`relative border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg ${
                                          !isQuizUnlocked ? 'opacity-50 cursor-not-allowed' :
                                          isQuizCompleted ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 hover:scale-105' : 
                                          'border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 hover:scale-105 cursor-pointer'
                                        }`}
                                      >
                                        {/* Quiz Type Badge */}
                                        <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${
                                          quiz.type === 'lesson_quiz' ? 'bg-blue-500' : 'bg-red-500'
                                        }`}>
                                          {quiz.type === 'lesson_quiz' ? '📝 اختبار' : '🎓 امتحان'}
                                        </div>
                                        
                                        {/* Lock Indicator */}
                                        {!isQuizUnlocked && (
                                          <div className="absolute top-2 left-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
                                            <LockClosedIcon className="w-4 h-4 text-white" />
                                          </div>
                                        )}
                                        
                                        <div className="text-right mb-4">
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                              {isQuizCompleted && (
                                                <span className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded-full font-medium shadow-sm">
                                                  +{quiz.type === 'final_exam' ? '200' : '100'} XP
                                                </span>
                                              )}
                                              {score && (
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium shadow-sm ${
                                                  score >= quiz.passingScore ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                  {score}%
                                                </span>
                                              )}
                                            </div>
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                              {isQuizCompleted ? (
                                                <CheckCircleIcon className="w-4 h-4 text-purple-600" />
                                              ) : isQuizUnlocked ? (
                                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-purple-600" />
                                              ) : (
                                                <ClockIcon className="w-4 h-4 text-gray-400" />
                                              )}
                                              <span className="text-xs text-gray-500 font-cairo">{quiz.timeLimit} دقيقة</span>
                                            </div>
                                          </div>
                                          
                                          <h5 className="font-bold text-gray-900 font-cairo text-sm mb-2">
                                            {quiz.title}
                                          </h5>
                                          <p className="text-gray-600 font-cairo text-xs leading-relaxed mb-3">
                                            {quiz.description}
                                          </p>
                                          
                                          <div className="flex items-center justify-between text-xs text-gray-500 font-cairo">
                                            <span>درجة النجاح: {quiz.passingScore}%</span>
                                            <span>عدد الأسئلة: {quiz.questions.length}</span>
                                            {isQuizCompleted && (
                                              <span>المحاولات: {attempts}/{quiz.maxAttempts}</span>
                                            )}
                                          </div>
                                        </div>
                                        
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isQuizUnlocked) handleStartQuiz(quiz);
                                          }}
                                          disabled={!isQuizUnlocked || (isQuizCompleted && attempts >= quiz.maxAttempts)}
                                          className={`w-full py-3 px-4 rounded-lg transition-all duration-200 font-medium text-sm ${
                                            !isQuizUnlocked
                                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                              : isQuizCompleted && attempts >= quiz.maxAttempts
                                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                              : isQuizCompleted
                                              ? 'bg-purple-100 text-purple-800 hover:bg-purple-200 hover:scale-105 shadow-lg'
                                              : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 shadow-xl'
                                          }`}
                                        >
                                          {!isQuizUnlocked
                                            ? '🔒 مقفل - أكمل 50% من الدروس'
                                            : isQuizCompleted && attempts >= quiz.maxAttempts
                                            ? '❌ انتهت المحاولات'
                                            : isQuizCompleted
                                            ? '🔄 إعادة المحاولة'
                                            : '🚀 بدء الاختبار'}
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
                    </div>
                  );
                })}
              </div>
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
              // Update XP and refresh data
              setGameStats(prev => ({ ...prev, totalXP: prev.totalXP + 50 }));
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
              // Update XP based on quiz type and score
              const xpGain = selectedQuiz?.type === 'final_exam' ? 200 : 100;
              const bonusXP = score >= 90 ? 50 : score >= 80 ? 25 : 0;
              setGameStats(prev => ({ ...prev, totalXP: prev.totalXP + xpGain + bonusXP }));
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
    </div>
  );
};

export default LearningJourney;