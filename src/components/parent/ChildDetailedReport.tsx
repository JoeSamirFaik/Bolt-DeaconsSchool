import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  ChartBarIcon, 
  TrophyIcon, 
  CalendarIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
  AcademicCapIcon,
  UserIcon,
  MapPinIcon,
  DocumentTextIcon,
  PhotoIcon,
  PhoneIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { User } from '../../types/user';
import { DeaconBalance, DeaconRecord, PointsTransaction } from '../../types/approval';
import { deaconRecordsApi, balancesApi, transactionsApi } from '../../services/approvalApi';
import { levelsApi } from '../../services/lmsApi';
import { Level } from '../../types/lms';

interface ChildDetailedReportProps {
  child: User & {
    balance?: DeaconBalance;
    rank: number;
    attendanceRate: number;
    currentStreak: number;
    completedLessons: number;
    totalLessons: number;
    averageScore: number;
    lastActivity: string;
  };
  onClose: () => void;
}

const ChildDetailedReport: React.FC<ChildDetailedReportProps> = ({ child, onClose }) => {
  const [records, setRecords] = useState<DeaconRecord[]>([]);
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'progress' | 'attendance' | 'notes'>('overview');

  // Mock notes data
  const childNotes = [
    {
      id: 1,
      title: 'تحسن ملحوظ في الحضور',
      content: 'أظهر الطالب تحسناً كبيراً في الحضور والمشاركة خلال الأسبوعين الماضيين. يشارك بفعالية في النقاشات ويظهر اهتماماً حقيقياً بالمواد الدراسية.',
      category: 'behavioral',
      priority: 'medium',
      isPrivate: false,
      createdAt: '2024-12-20T10:30:00Z'
    },
    {
      id: 2,
      title: 'يحتاج دعم إضافي في الألحان',
      content: 'الطالب يواجه صعوبة في حفظ بعض الألحان الجديدة. أنصح بممارسة إضافية في المنزل والاستعانة بالتسجيلات الصوتية المتوفرة.',
      category: 'academic',
      priority: 'high',
      isPrivate: false,
      createdAt: '2024-12-18T14:15:00Z'
    },
    {
      id: 3,
      title: 'نمو روحي مميز',
      content: 'يظهر الطالب نضجاً روحياً واضحاً من خلال أسئلته العميقة وتفاعله مع النصوص الكتابية. يشارك تجاربه الروحية بصدق وانفتاح.',
      category: 'spiritual',
      priority: 'low',
      isPrivate: true,
      createdAt: '2024-12-15T16:45:00Z'
    }
  ];

  useEffect(() => {
    loadChildData();
  }, [child.id]);

  const loadChildData = async () => {
    try {
      setLoading(true);
      const [recordsData, transactionsData, levelsData] = await Promise.all([
        deaconRecordsApi.getByDeaconId(child.id),
        transactionsApi.getByDeaconId(child.id),
        levelsApi.getAll()
      ]);
      
      setRecords(recordsData);
      setTransactions(transactionsData);
      setLevels(levelsData);
    } catch (error) {
      console.error('Error loading child data:', error);
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

  const monthlyProgress = calculateMonthlyProgress();
  const currentLevel = levels.find(l => l.id === child.deaconInfo?.currentLevel);

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل التقرير التفصيلي لطفلك...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-900 font-cairo">
                التقرير التفصيلي - {child.firstName} {child.lastName}
              </h2>
              <p className="text-gray-600 font-cairo">
                {currentLevel?.name || 'غير محدد'} • المركز {child.rank} • {child.balance?.totalPoints || 0} نقطة
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-purple-600">
                {child.firstName.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 space-x-reverse bg-gray-100 p-1 m-6 rounded-xl">
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
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'notes'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            <span>ملاحظات المعلم</span>
          </button>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-900 mb-1">{child.balance?.totalPoints || 0}</p>
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
                      <p className="text-2xl font-bold text-green-900 mb-1">{child.attendanceRate}%</p>
                      <p className="text-sm text-green-700 font-cairo">نسبة الحضور</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700"
                      style={{ width: `${child.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-900 mb-1">{child.completedLessons}/{child.totalLessons}</p>
                      <p className="text-sm text-blue-700 font-cairo">الدروس المكتملة</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BookOpenIcon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700"
                      style={{ width: `${(child.completedLessons / child.totalLessons) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-900 mb-1">{child.currentStreak}</p>
                      <p className="text-sm text-red-700 font-cairo">أيام متتالية</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <FireIcon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <p className="text-xs text-red-600 font-cairo">
                    {child.currentStreak >= 7 ? 'أداء ممتاز!' : 'يمكن التحسين'}
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
                    <div className="text-2xl font-bold text-green-600 mb-1">{child.balance?.liturgyPoints || 0}</div>
                    <p className="text-sm text-gray-600 font-cairo">قداسات وصلوات كنسية</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full bg-green-500 transition-all duration-700"
                        style={{ width: `${((child.balance?.liturgyPoints || 0) / (child.balance?.totalPoints || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🙏</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{child.balance?.prayerPoints || 0}</div>
                    <p className="text-sm text-gray-600 font-cairo">صلوات شخصية</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-700"
                        style={{ width: `${((child.balance?.prayerPoints || 0) / (child.balance?.totalPoints || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpenIcon className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">{child.balance?.studyPoints || 0}</div>
                    <p className="text-sm text-gray-600 font-cairo">دراسة شخصية</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full bg-purple-500 transition-all duration-700"
                        style={{ width: `${((child.balance?.studyPoints || 0) / (child.balance?.totalPoints || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">❤️</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600 mb-1">{child.balance?.servicePoints || 0}</div>
                    <p className="text-sm text-gray-600 font-cairo">خدمة مجتمعية</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full bg-red-500 transition-all duration-700"
                        style={{ width: `${((child.balance?.servicePoints || 0) / (child.balance?.totalPoints || 1)) * 100}%` }}
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

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">ملاحظات وتعليقات المعلم</h3>
                <div className="space-y-4">
                  {childNotes.map((note) => {
                    const getCategoryIcon = (category: string) => {
                      switch (category) {
                        case 'academic': return '📚';
                        case 'behavioral': return '👤';
                        case 'spiritual': return '🙏';
                        case 'general': return '💬';
                        default: return '📝';
                      }
                    };

                    const getCategoryLabel = (category: string) => {
                      switch (category) {
                        case 'academic': return 'أكاديمي';
                        case 'behavioral': return 'سلوكي';
                        case 'spiritual': return 'روحي';
                        case 'general': return 'عام';
                        default: return category;
                      }
                    };

                    const getCategoryColor = (category: string) => {
                      switch (category) {
                        case 'academic': return 'bg-blue-100 text-blue-800';
                        case 'behavioral': return 'bg-orange-100 text-orange-800';
                        case 'spiritual': return 'bg-purple-100 text-purple-800';
                        case 'general': return 'bg-gray-100 text-gray-800';
                        default: return 'bg-gray-100 text-gray-800';
                      }
                    };

                    const getPriorityColor = (priority: string) => {
                      switch (priority) {
                        case 'high': return 'bg-red-100 text-red-800';
                        case 'medium': return 'bg-yellow-100 text-yellow-800';
                        case 'low': return 'bg-green-100 text-green-800';
                        default: return 'bg-gray-100 text-gray-800';
                      }
                    };

                    const getPriorityLabel = (priority: string) => {
                      switch (priority) {
                        case 'high': return 'مهم';
                        case 'medium': return 'متوسط';
                        case 'low': return 'عادي';
                        default: return priority;
                      }
                    };

                    return (
                      <div key={note.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(note.priority)}`}>
                              {getPriorityLabel(note.priority)}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(note.category)}`}>
                              {getCategoryLabel(note.category)}
                            </span>
                            {note.isPrivate && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                ملاحظة خاصة
                              </span>
                            )}
                          </div>

                          <div className="flex-1 text-right mx-6">
                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                              <span className="text-sm text-gray-500 font-cairo">
                                {new Date(note.createdAt).toLocaleDateString('ar-EG')}
                              </span>
                              <h4 className="text-lg font-bold text-gray-900 font-cairo">
                                {note.title}
                              </h4>
                            </div>
                            <p className="text-gray-600 font-cairo mb-2 leading-relaxed">{note.content}</p>
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                              <span className="font-cairo">👨‍🏫 المعلم: مريم يوسف</span>
                              <span className="font-cairo">📝 {getCategoryLabel(note.category)}</span>
                            </div>
                          </div>

                          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                            <span className="text-3xl">{getCategoryIcon(note.category)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {childNotes.length === 0 && (
                  <div className="text-center py-12">
                    <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد ملاحظات</h3>
                    <p className="text-gray-500 font-cairo">لم يترك المعلم أي ملاحظات بعد</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildDetailedReport;