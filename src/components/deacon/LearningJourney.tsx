import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Level, Subject, Lesson, Quiz } from '../../types/lms';
import { User, LevelAssignment } from '../../types/user';
import { levelsApi, subjectsApi, lessonsApi, quizzesApi } from '../../services/lmsApi';
import { levelAssignmentsApi } from '../../services/userApi';

// Import components
import GameStats from './gamification/GameStats';
import AchievementBadges from './gamification/AchievementBadges';
import LevelPath from './gamification/LevelPath';
import LevelOverview from './gamification/LevelOverview';
import SubjectCard from './content/SubjectCard';
import LessonsGrid from './content/LessonsGrid';
import QuizzesGrid from './content/QuizzesGrid';
import LoadingState from './states/LoadingState';
import EmptyState from './states/EmptyState';

// Import modals
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

interface GameStatsData {
  totalXP: number;
  level: number;
  streak: number;
  badges: number;
  rank: string;
}

const LearningJourney: React.FC = () => {
  const { user } = useAuth();
  
  // State
  const [assignments, setAssignments] = useState<LevelAssignment[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  
  // Game state
  const [gameStats, setGameStats] = useState<GameStatsData>({
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
  const achievements: Achievement[] = [
    { id: '1', title: 'أول خطوة', description: 'أكمل أول درس', icon: '🎯', color: 'from-blue-400 to-indigo-500', unlocked: true, unlockedAt: '2024-12-01' },
    { id: '2', title: 'متعلم نشط', description: 'أكمل 5 دروس', icon: '📚', color: 'from-green-400 to-emerald-500', unlocked: true, unlockedAt: '2024-12-05' },
    { id: '3', title: 'نجم الاختبارات', description: 'احصل على 90% في 3 اختبارات', icon: '⭐', color: 'from-yellow-400 to-orange-500', unlocked: true, unlockedAt: '2024-12-10' },
    { id: '4', title: 'المثابر', description: 'ادرس لمدة 7 أيام متتالية', icon: '🔥', color: 'from-red-400 to-rose-500', unlocked: true, unlockedAt: '2024-12-12' },
    { id: '5', title: 'خبير المستوى', description: 'أكمل مستوى كامل', icon: '🏆', color: 'from-purple-400 to-indigo-500', unlocked: false },
    { id: '6', title: 'عالم الكنيسة', description: 'أكمل جميع المستويات', icon: '👑', color: 'from-amber-400 to-orange-500', unlocked: false }
  ];

  // Effects
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

  // Data loading functions
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

  // Helper functions
  const getSubjectProgress = (subjectId: string) => {
    const subjectLessons = lessons.filter(l => l.subjectId === subjectId);
    const completedLessons = subjectLessons.filter(l => isLessonCompleted(l.id));
    return subjectLessons.length > 0 ? Math.round((completedLessons.length / subjectLessons.length) * 100) : 0;
  };

  const getLevelProgress = (levelId: string) => {
    const levelSubjects = subjects.filter(s => levels.find(l => l.id === levelId));
    if (levelSubjects.length === 0) return 0;
    
    const totalProgress = levelSubjects.reduce((sum, subject) => sum + getSubjectProgress(subject.id), 0);
    return Math.round(totalProgress / levelSubjects.length);
  };

  const isSubjectUnlocked = (subjectIndex: number) => {
    if (subjectIndex === 0) return true;
    const previousSubject = subjects[subjectIndex - 1];
    return getSubjectProgress(previousSubject.id) >= previousSubject.passPercentage;
  };

  const isLessonCompleted = (lessonId: string) => {
    return Math.random() > 0.4; // Mock completion
  };

  const getLessonScore = (lessonId: string) => {
    return isLessonCompleted(lessonId) ? Math.floor(Math.random() * 30) + 70 : null;
  };

  const isLessonUnlocked = (lesson: Lesson, lessonIndex: number) => {
    if (lessonIndex === 0) return true;
    const subjectLessons = lessons.filter(l => l.subjectId === lesson.subjectId);
    const previousLesson = subjectLessons[lessonIndex - 1];
    return isLessonCompleted(previousLesson.id);
  };

  const isQuizCompleted = (quizId: string) => {
    return Math.random() > 0.5; // Mock completion
  };

  const getQuizScore = (quizId: string) => {
    return isQuizCompleted(quizId) ? Math.floor(Math.random() * 30) + 70 : null;
  };

  const getQuizAttempts = (quizId: string) => {
    return isQuizCompleted(quizId) ? Math.floor(Math.random() * 3) + 1 : 0;
  };

  const isQuizUnlocked = (quiz: Quiz) => {
    const subjectLessons = lessons.filter(l => l.subjectId === quiz.subjectId);
    const completedLessons = subjectLessons.filter(l => isLessonCompleted(l.id));
    return subjectLessons.length === 0 || (completedLessons.length / subjectLessons.length) >= 0.5;
  };

  const canGenerateCertificate = (levelId: string) => {
    const assignment = assignments.find(a => a.levelId === levelId);
    const progress = getLevelProgress(levelId);
    const level = levels.find(l => l.id === levelId);
    
    return assignment?.status === 'completed' || 
           (progress >= (level?.passPercentage || 70) && assignment?.status === 'in_progress');
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

  // Event handlers
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

  const handleLessonComplete = () => {
    setShowLessonViewer(false);
    setSelectedLesson(null);
    setGameStats(prev => ({ ...prev, totalXP: prev.totalXP + 50 }));
    if (selectedLevel) loadLevelContent(selectedLevel);
  };

  const handleQuizComplete = (score: number) => {
    setShowQuizTaker(false);
    setSelectedQuiz(null);
    const xpGain = selectedQuiz?.type === 'final_exam' ? 200 : 100;
    const bonusXP = score >= 90 ? 50 : score >= 80 ? 25 : 0;
    setGameStats(prev => ({ ...prev, totalXP: prev.totalXP + xpGain + bonusXP }));
    if (selectedLevel) loadLevelContent(selectedLevel);
  };

  // Render states
  if (loading) {
    return <LoadingState />;
  }

  if (assignments.length === 0) {
    return <EmptyState />;
  }

  const currentLevel = levels.find(l => l.id === selectedLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Gamified Header Dashboard */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl shadow-lg border border-purple-300 p-4 text-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full animate-pulse"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <GameStats {...gameStats} />
              
              {/* Player Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform duration-300">
                <span className="text-lg font-bold text-white">
                  {user?.firstName?.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Showcase */}
        <AchievementBadges achievements={achievements} />

        {/* Level Selection Path */}
        <LevelPath
          assignments={assignments}
          levels={levels}
          selectedLevel={selectedLevel}
          onLevelSelect={setSelectedLevel}
          getLevelProgress={getLevelProgress}
        />

        {/* Current Level Content */}
        {selectedLevel && currentLevel && (
          <div className="space-y-4">
            {/* Level Overview */}
            <LevelOverview
              level={currentLevel}
              progress={getLevelProgress(selectedLevel)}
              subjectsCount={subjects.length}
              lessonsCount={lessons.length}
              canGenerateCertificate={canGenerateCertificate(selectedLevel)}
              onGenerateCertificate={() => handleGenerateCertificate(currentLevel)}
            />

            {/* Subjects Journey Path */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo flex items-center space-x-2 space-x-reverse">
                <span>مسار المقررات</span>
              </h3>
              
              <div className="space-y-4">
                {subjects.map((subject, subjectIndex) => {
                  const subjectLessons = lessons.filter(l => l.subjectId === subject.id);
                  const subjectQuizzes = quizzes.filter(q => q.subjectId === subject.id);
                  const progress = getSubjectProgress(subject.id);
                  const isUnlocked = isSubjectUnlocked(subjectIndex);
                  const isExpanded = expandedSubjects.has(subject.id);
                  
                  return (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      subjectIndex={subjectIndex}
                      lessons={subjectLessons}
                      quizzes={subjectQuizzes}
                      progress={progress}
                      isUnlocked={isUnlocked}
                      isExpanded={isExpanded}
                      onToggleExpansion={() => toggleSubjectExpansion(subject.id)}
                    >
                      {/* Lessons Section */}
                      <LessonsGrid
                        lessons={subjectLessons}
                        onStartLesson={handleStartLesson}
                        isLessonCompleted={isLessonCompleted}
                        getLessonScore={getLessonScore}
                        isLessonUnlocked={isLessonUnlocked}
                      />

                      {/* Quizzes Section */}
                      <QuizzesGrid
                        quizzes={subjectQuizzes}
                        onStartQuiz={handleStartQuiz}
                        isQuizCompleted={isQuizCompleted}
                        getQuizScore={getQuizScore}
                        getQuizAttempts={getQuizAttempts}
                        isQuizUnlocked={isQuizUnlocked}
                      />
                    </SubjectCard>
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
            onComplete={handleLessonComplete}
          />
        )}

        {showQuizTaker && selectedQuiz && (
          <QuizTaker
            quiz={selectedQuiz}
            onClose={() => {
              setShowQuizTaker(false);
              setSelectedQuiz(null);
            }}
            onComplete={handleQuizComplete}
          />
        )}

        {showCertificate && selectedLevelForCert && (
          <CertificateGenerator
            level={selectedLevelForCert}
            deacon={user!}
            assignment={assignments.find(a => a.levelId === selectedLevelForCert.id)!}
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