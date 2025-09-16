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
  const [gameStats, setGameStats] = useState<GameStats>({
    totalXP: 1250,
    level: 5,
    streak: 7,
    badges: 12,
    rank: 'شماس متميز',
  });

  // Modal states
  const [showLessonViewer, setShowLessonViewer] = useState(false);
  const [showQuizTaker, setShowQuizTaker] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedLevelForCert, setSelectedLevelForCert] = useState<Level | null>(null);

  // Mock achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'أول خطوة',
      description: 'أكمل أول درس',
      icon: '🎯',
      color: 'from-blue-400 to-indigo-500',
      unlocked: true,
      unlockedAt: '2024-12-01',
    },
    {
      id: '2',
      title: 'متعلم نشط',
      description: 'أكمل 5 دروس',
      icon: '📚',
      color: 'from-green-400 to-emerald-500',
      unlocked: true,
      unlockedAt: '2024-12-05',
    },
    {
      id: '3',
      title: 'نجم الاختبارات',
      description: 'احصل على 90% في 3 اختبارات',
      icon: '⭐',
      color: 'from-yellow-400 to-orange-500',
      unlocked: true,
      unlockedAt: '2024-12-10',
    },
    {
      id: '4',
      title: 'المثابر',
      description: 'ادرس لمدة 7 أيام متتالية',
      icon: '🔥',
      color: 'from-red-400 to-rose-500',
      unlocked: true,
      unlockedAt: '2024-12-12',
    },
    {
      id: '5',
      title: 'خبير المستوى',
      description: 'أكمل مستوى كامل',
      icon: '🏆',
      color: 'from-purple-400 to-indigo-500',
      unlocked: false,
    },
    {
      id: '6',
      title: 'عالم الكنيسة',
      description: 'أكمل جميع المستويات',
      icon: '👑',
      color: 'from-amber-400 to-orange-500',
      unlocked: false,
    },
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
        levelsApi.getAll(),
      ]);

      setAssignments(assignmentsData);
      setLevels(levelsData);

      // Auto-select the first active assignment
      if (assignmentsData.length > 0) {
        const activeAssignment =
          assignmentsData.find((a) => a.status === 'in_progress') || assignmentsData[0];
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
        quizzesApi.getAll(),
      ]);

      setSubjects(subjectsData);
      setLessons(lessonsData.filter((l) => subjectsData.some((s) => s.id === l.subjectId)));
      setQuizzes(quizzesData.filter((q) => subjectsData.some((s) => s.id === q.subjectId)));
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

  const getAssignmentForLevel = (levelId: string) => {
    return assignments.find((a) => a.levelId === levelId);
  };

  const getSubjectProgress = (subjectId: string) => {
    const subjectLessons = lessons.filter((l) => l.subjectId === subjectId);
    const completedLessons = subjectLessons.filter(() => Math.random() > 0.3); // Mock completion
    return subjectLessons.length > 0
      ? Math.round((completedLessons.length / subjectLessons.length) * 100)
      : 0;
  };

  const getLevelProgress = (levelId: string) => {
    const levelSubjects = subjects.filter((s) =>
      levels.find((l) => l.id === levelId)?.subjects?.includes(s.id)
    );
    if (levelSubjects.length === 0) return 0;

    const totalProgress = levelSubjects.reduce(
      (sum, subject) => sum + getSubjectProgress(subject.id),
      0
    );
    return Math.round(totalProgress / levelSubjects.length);
  };

  const canGenerateCertificate = (levelId: string) => {
    const assignment = getAssignmentForLevel(levelId);
    const progress = getLevelProgress(levelId);
    const level = levels.find((l) => l.id === levelId);

    return (
      assignment?.status === 'completed' ||
      (progress >= (level?.passPercentage || 70) && assignment?.status === 'in_progress')
    );
  };

  const getXPForNextLevel = () => {
    return gameStats.level * 200 - (gameStats.totalXP % (gameStats.level * 200));
  };

  const getProgressToNextLevel = () => {
    const currentLevelXP = gameStats.totalXP % (gameStats.level * 200);
    const requiredXP = gameStats.level * 200;
    return Math.round((currentLevelXP / requiredXP) * 100);
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
          <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">
            لم يتم تكليفك بأي مستوى بعد
          </h3>
          <p className="text-gray-500 font-cairo">
            يرجى التواصل مع المدير أو الخادم لتكليفك بمستوى دراسي
          </p>
        </div>
      </div>
    );
  }

  // Main return
  return (
    <div className="space-y-6">
      {/* Header, Achievements, Levels, Subjects, Modals ... (unchanged content) */}
      {/* --- full JSX code continues here as in your original --- */}
    </div>
  );
};

export default LearningJourney;
