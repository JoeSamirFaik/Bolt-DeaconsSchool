import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  TrophyIcon, 
  EyeIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  FireIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentArrowDownIcon,
  BellIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types/user';
import { DeaconBalance, DeaconRecord, PointsTransaction } from '../../types/approval';
import { deaconRecordsApi, balancesApi, transactionsApi } from '../../services/approvalApi';
import { usersApi } from '../../services/userApi';
import { levelsApi } from '../../services/lmsApi';
import { Level } from '../../types/lms';

interface DeaconWithStats extends User {
  balance?: DeaconBalance;
  rank: number;
  attendanceRate: number;
  currentStreak: number;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  lastActivity: string;
}

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [deacon, setDeacon] = useState<DeaconWithStats | null>(null);
  const [records, setRecords] = useState<DeaconRecord[]>([]);
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'progress' | 'attendance'>('overview');

  useEffect(() => {
    loadParentData();
  }, [user]);

  const loadParentData = async () => {
    try {
      setLoading(true);
      
      // Get the child deacon (assuming first child for demo)
      const childId = user?.parentInfo?.children[0];
      if (!childId) {
        setLoading(false);
        return;
      }

      const [deaconData, recordsData, transactionsData, levelsData, balancesData] = await Promise.all([
        usersApi.getById(childId),
        deaconRecordsApi.getByDeaconId(childId),
        transactionsApi.getByDeaconId(childId),
        levelsApi.getAll(),
        balancesApi.getByDeaconId(childId)
      ]);

      // Mock additional stats for comprehensive report
      const mockStats = {
        attendanceRate: Math.floor(Math.random() * 30) + 70, // 70-100%
        currentStreak: Math.floor(Math.random() * 15) + 1, // 1-15 days
        completedLessons: Math.floor(Math.random() * 20) + 5, // 5-25 lessons
        totalLessons: 30,
        averageScore: Math.floor(Math.random() * 25) + 75, // 75-100%
        lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        rank: Math.floor(Math.random() * 10) + 1
      };

      const deaconWithStats: DeaconWithStats = {
        ...deaconData,
        balance: balancesData,
        ...mockStats
      };

      setDeacon(deaconWithStats);
      setRecords(recordsData);
      setTransactions(transactionsData);
      setLevels(levelsData);
    } catch (error) {
      console.error('Error loading parent data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'liturgy':
        return <span className="text-2xl">⛪</span>;
      case 'prayer':
        return <span className="text-2xl">🙏</span>;
      case 'personal_study':
        return <BookOpenIcon className="w-6 h-6 text-blue-600" />;
      case 'community_service':
        return <span className="text-2xl">❤️</span>;
      default:
        return <DocumentTextIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'liturgy':
        return 'قداس/صلاة كنسية';
      case 'prayer':
        return 'صلاة شخصية';
      case 'personal_study':
        return 'دراسة شخصية';
      case 'community_service':
        return 'خدمة مجتمعية';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'needs_revision':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'approved':
        return 'معتمد';
      case 'rejected':
        return 'مرفوض';
      case 'needs_revision':
        return 'يحتاج مراجعة';
      default:
        return status;
    }
  };

  const calculateMonthlyProgress = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthRecords = records.filter(r => {
      const recordDate = new Date(r.date);
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    });
    
    const lastMonthRecords = records.filter(r => {
      const recordDate = new Date(r.date);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return recordDate.getMonth() === lastMonth && recordDate.getFullYear() === lastMonthYear;
    });
    
    return {
      thisMonth: thisMonthRecords.length,
      lastMonth: lastMonthRecords.length,
      change: thisMonthRecords.length - lastMonthRecords.length
    };
  };

  // Mock additional data for comprehensive report
  const mockAttendanceHistory = [
    { date: '2024-12-21', session: 'درس الكتاب المقدس', status: 'present', time: '10:05' },
    { date: '2024-12-20', session: 'قداس السبت', status: 'present', time: '18:30' },
    { date: '2024-12-19', session: 'اجتماع الشمامسة', status: 'late', time: '19:15' },
    { date: '2024-12-18', session: 'درس الألحان', status: 'present', time: '11:00' },
    { date: '2024-12-17', session: 'صلاة عشية', status: 'excused', time: '-' }
  ];

  const mockLessonProgress = [
    { subject: 'الكتاب المقدس', completed: 8, total: 10, percentage: 80, lastScore: 95 },
    { subject: 'تاريخ الكنيسة', completed: 6, total: 8, percentage: 75, lastScore: 88 },
    { subject: 'الألحان والتسبيح', completed: 4, total: 6, percentage: 67, lastScore: 92 },
    { subject: 'الصلاة والروحانيات', completed: 5, total: 7, percentage: 71, lastScore: 85 }
  ];

  const mockAchievements = [
    { title: 'متعلم نشط', description: 'أكمل 5 دروس متتالية', icon: '📚', date: '2024-12-15' },
    { title: 'نجم الحضور', description: '7 أيام حضور متتالية', icon: '🔥', date: '2024-12-18' },
    { title: 'محب الصلاة', description: 'سجل 10 صلوات شخصية', icon: '🙏', date: '2024-12-20' },
    { title: 'خادم المجتمع', description: 'شارك في 3 أنشطة خدمية', icon: '❤️', date: '2024-12-12' }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل تقرير طفلك...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!deacon) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد أطفال مسجلين</h3>
            <p className="text-gray-500 font-cairo">يرجى التواصل مع الإدارة لتسجيل طفلك في المدرسة</p>
          </div>
        </div>
      </div>
    );
  }

  const monthlyProgress = calculateMonthlyProgress();
  const currentLevel = levels.find(l => l.id === deacon.deaconInfo?.currentLevel);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-3xl font-bold mb-2 font-cairo">أهلاً وسهلاً، {user?.firstName}! 👨‍👩‍👧</h1>
              <p className="text-lg opacity-90 font-cairo">تقرير شامل عن تقدم طفلك {deacon.firstName}</p>
            </div>
            
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl">👨‍👩‍👧</span>
            </div>
          </div>
          
          {/* Quick Overview */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{deacon.balance?.totalPoints || 0}</div>
              <div className="text-sm opacity-90 font-cairo">إجمالي النقاط</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{deacon.attendanceRate}%</div>
              <div className="text-sm opacity-90 font-cairo">نسبة الحضور</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{deacon.completedLessons}</div>
              <div className="text-sm opacity-90 font-cairo">دروس مكتملة</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{deacon.currentStreak}</div>
              <div className="text-sm opacity-90 font-cairo">أيام متتالية</div>
            </div>
          </div>
        </div>
      </div>

      {/* Child Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-900 font-cairo mb-2">
                {deacon.firstName} {deacon.lastName}
              </h2>
              <p className="text-gray-600 font-cairo mb-2">{currentLevel?.name || 'غير محدد'}</p>
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  المركز {deacon.rank}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {deacon.balance?.totalPoints || 0} نقطة
                </span>
              </div>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-purple-600">
                {deacon.firstName.charAt(0)}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3 space-x-reverse">
            <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105">
              <DocumentArrowDownIcon className="w-4 h-4" />
              <span>تحميل التقرير</span>
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105">
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              <span>تواصل مع المعلم</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 space-x-reverse bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
            activeTab === 'overview'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ChartBarIcon className="w-4 h-4" />
          <span>نظرة عامة</span>
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
            activeTab === 'records'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <DocumentTextIcon className="w-4 h-4" />
          <span>السجلات</span>
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
            activeTab === 'progress'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpenIcon className="w-4 h-4" />
          <span>التقدم الأكاديمي</span>
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
            activeTab === 'attendance'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CalendarIcon className="w-4 h-4" />
          <span>الحضور</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-900 mb-1">{deacon.balance?.totalPoints || 0}</p>
                    <p className="text-sm text-purple-700 font-cairo">إجمالي النقاط</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrophyIcon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  {monthlyProgress.change >= 0 ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${monthlyProgress.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {monthlyProgress.change >= 0 ? '+' : ''}{monthlyProgress.change} هذا الشهر
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-900 mb-1">{deacon.attendanceRate}%</p>
                    <p className="text-sm text-green-700 font-cairo">نسبة الحضور</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700"
                    style={{ width: `${deacon.attendanceRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900 mb-1">{deacon.completedLessons}/{deacon.totalLessons}</p>
                    <p className="text-sm text-blue-700 font-cairo">الدروس المكتملة</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700"
                    style={{ width: `${(deacon.completedLessons / deacon.totalLessons) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-900 mb-1">{deacon.currentStreak}</p>
                    <p className="text-sm text-orange-700 font-cairo">أيام متتالية</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FireIcon className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-orange-600 font-cairo">
                  {deacon.currentStreak >= 7 ? 'أداء ممتاز!' : 'يمكن التحسين'}
                </p>
              </div>
            </div>

            {/* Points Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">توزيع النقاط</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⛪</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">{deacon.balance?.liturgyPoints || 0}</div>
                  <p className="text-sm text-gray-600 font-cairo">قداسات وصلوات كنسية</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-green-500 transition-all duration-700"
                      style={{ width: `${((deacon.balance?.liturgyPoints || 0) / (deacon.balance?.totalPoints || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🙏</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{deacon.balance?.prayerPoints || 0}</div>
                  <p className="text-sm text-gray-600 font-cairo">صلوات شخصية</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all duration-700"
                      style={{ width: `${((deacon.balance?.prayerPoints || 0) / (deacon.balance?.totalPoints || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpenIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">{deacon.balance?.studyPoints || 0}</div>
                  <p className="text-sm text-gray-600 font-cairo">دراسة شخصية</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-purple-500 transition-all duration-700"
                      style={{ width: `${((deacon.balance?.studyPoints || 0) / (deacon.balance?.totalPoints || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">❤️</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-1">{deacon.balance?.servicePoints || 0}</div>
                  <p className="text-sm text-gray-600 font-cairo">خدمة مجتمعية</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-red-500 transition-all duration-700"
                      style={{ width: `${((deacon.balance?.servicePoints || 0) / (deacon.balance?.totalPoints || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">الإنجازات الأخيرة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAchievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="text-right flex-1">
                        <h4 className="font-bold text-purple-900 font-cairo">{achievement.title}</h4>
                        <p className="text-sm text-purple-700 font-cairo">{achievement.description}</p>
                        <p className="text-xs text-purple-600 font-cairo mt-1">
                          {new Date(achievement.date).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                      <div className="text-3xl">{achievement.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Records Tab */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">سجل الأنشطة</h3>
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}>
                          {getStatusLabel(record.status)}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded-full font-medium">
                          {record.pointsRequested} نقطة
                        </span>
                      </div>

                      <div className="flex-1 text-right mx-6">
                        <div className="flex items-center space-x-3 space-x-reverse mb-2">
                          <span className="text-sm text-gray-500 font-cairo">
                            {new Date(record.date).toLocaleDateString('ar-EG')}
                          </span>
                          <h4 className="text-lg font-bold text-gray-900 font-cairo">
                            {record.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 font-cairo mb-2">{record.description}</p>
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                          <span className="font-cairo">📍 {record.location}</span>
                          {record.duration && (
                            <span className="font-cairo">⏰ {record.duration} دقيقة</span>
                          )}
                        </div>
                        {record.reviewNotes && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-800 font-cairo text-sm">{record.reviewNotes}</p>
                          </div>
                        )}
                      </div>

                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                        {getTypeIcon(record.type)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">التقدم الأكاديمي</h3>
              <div className="space-y-6">
                {mockLessonProgress.map((subject, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          subject.lastScore >= 90 ? 'bg-green-100 text-green-800' :
                          subject.lastScore >= 80 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          آخر درجة: {subject.lastScore}%
                        </span>
                        <span className="text-lg font-bold text-gray-900 font-cairo">{subject.percentage}%</span>
                      </div>
                      <div className="text-right">
                        <h4 className="text-lg font-bold text-gray-900 font-cairo">{subject.subject}</h4>
                        <p className="text-sm text-gray-600 font-cairo">{subject.completed} من {subject.total} دروس</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700"
                        style={{ width: `${subject.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">سجل الحضور الأخير</h3>
              <div className="space-y-4">
                {mockAttendanceHistory.map((attendance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        attendance.status === 'present' ? 'bg-green-100 text-green-800 border-green-200' :
                        attendance.status === 'late' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        attendance.status === 'excused' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {attendance.status === 'present' ? 'حاضر' :
                         attendance.status === 'late' ? 'متأخر' :
                         attendance.status === 'excused' ? 'معذور' : 'غائب'}
                      </div>
                      <div className="text-right">
                        <h4 className="font-semibold text-gray-900 font-cairo">{attendance.session}</h4>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                          <span className="font-cairo">{new Date(attendance.date).toLocaleDateString('ar-EG')}</span>
                          {attendance.time !== '-' && (
                            <span className="font-cairo">⏰ {attendance.time}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${
                      attendance.status === 'present' ? 'bg-green-500' :
                      attendance.status === 'late' ? 'bg-yellow-500' :
                      attendance.status === 'excused' ? 'bg-blue-500' :
                      'bg-red-500'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Communication Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Messages */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105">
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              <span>رسالة جديدة</span>
            </button>
            <div className="flex items-center space-x-3 space-x-reverse">
              <h3 className="text-xl font-bold text-gray-900 font-cairo">رسائل المعلم</h3>
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full font-cairo">جديد</span>
                <span className="text-xs text-gray-500 font-cairo">منذ ساعة</span>
              </div>
              <p className="text-sm font-medium text-gray-900 font-cairo">{deacon.firstName} يحقق تقدماً ممتازاً!</p>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full font-cairo">تقرير</span>
                <span className="text-xs text-gray-500 font-cairo">منذ يوم</span>
              </div>
              <p className="text-sm font-medium text-gray-900 font-cairo">التقرير الشهري متاح للتحميل</p>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <DocumentArrowDownIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full font-cairo">تذكير</span>
                <span className="text-xs text-gray-500 font-cairo">منذ يومين</span>
              </div>
              <p className="text-sm font-medium text-gray-900 font-cairo">اجتماع أولياء الأمور غداً</p>
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <h3 className="text-xl font-bold text-gray-900 font-cairo">ملخص الأداء</h3>
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <div className="text-lg font-bold text-green-900 font-cairo">{deacon.attendanceRate}%</div>
                  <div className="text-sm text-green-700 font-cairo">نسبة الحضور</div>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-900 font-cairo">{deacon.averageScore}%</div>
                  <div className="text-sm text-blue-700 font-cairo">متوسط الدرجات</div>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <AcademicCapIcon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-900 font-cairo">{deacon.currentStreak}</div>
                  <div className="text-sm text-orange-700 font-cairo">أيام حضور متتالية</div>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FireIcon className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-900 font-cairo">المركز {deacon.rank}</div>
                  <div className="text-sm text-purple-700 font-cairo">الترتيب العام</div>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrophyIcon className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 rounded-2xl p-6 border border-purple-200 relative overflow-hidden hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 w-8 h-8 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 bg-indigo-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative z-10 flex items-center space-x-6 space-x-reverse">
          <div className="text-right">
            <h3 className="text-xl font-bold text-purple-900 mb-2 font-cairo">
              {deacon.firstName} يحقق تقدماً رائعاً! 🌟
            </h3>
            <p className="text-purple-700 font-cairo">
              نسبة حضور ممتازة {deacon.attendanceRate}% ومتوسط درجات {deacon.averageScore}%. استمر في التشجيع والدعم!
            </p>
            
            {/* Parent Achievement Highlights */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-purple-800">{deacon.balance?.totalPoints || 0}</div>
                <div className="text-xs text-purple-700 font-cairo">نقاط طفلك</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-purple-800">{deacon.completedLessons}</div>
                <div className="text-xs text-purple-700 font-cairo">دروس مكتملة</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-purple-800">#{deacon.rank}</div>
                <div className="text-xs text-purple-700 font-cairo">الترتيب</div>
              </div>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <TrophyIcon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;