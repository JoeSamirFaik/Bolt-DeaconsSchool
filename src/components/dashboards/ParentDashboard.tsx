import React from 'react';
import { 
  ChartBarIcon, 
  CalendarIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  TrophyIcon,
  FireIcon,
  BookOpenIcon,
  CheckCircleIcon,
  EyeIcon,
  UserIcon,
  AcademicCapIcon,
  BellIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types/user';
import { DeaconBalance } from '../../types/approval';
import ChildDetailedReport from '../parent/ChildDetailedReport';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showDetailedReport, setShowDetailedReport] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock child data - in real app, this would come from API based on parent's children
  const mockChild: User & {
    balance?: DeaconBalance;
    rank: number;
    attendanceRate: number;
    currentStreak: number;
    completedLessons: number;
    totalLessons: number;
    averageScore: number;
    lastActivity: string;
  } = {
    id: '1',
    email: 'child@example.com',
    firstName: 'يوحنا',
    lastName: 'داود',
    role: 'deacon',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    deaconInfo: {
      dateOfBirth: '2010-05-15',
      parentId: user?.id,
      currentLevel: '1',
      enrollmentDate: '2024-09-01',
      notes: 'طالب متميز ونشط'
    },
    balance: {
      id: '1',
      deaconId: '1',
      totalPoints: 1250,
      liturgyPoints: 600,
      prayerPoints: 400,
      studyPoints: 150,
      servicePoints: 100,
      bonusPoints: 0,
      lastUpdated: '2024-12-21T15:00:00Z'
    },
    rank: 3,
    attendanceRate: 92,
    currentStreak: 7,
    completedLessons: 12,
    totalLessons: 20,
    averageScore: 87,
    lastActivity: '2024-12-21T10:30:00Z'
  };

  const stats = [
    { 
      label: 'إجمالي النقاط', 
      value: mockChild.balance?.totalPoints.toLocaleString() || '0', 
      change: '+150',
      trend: 'up',
      color: 'from-purple-400 via-indigo-500 to-blue-500', 
      icon: TrophyIcon,
      description: 'نقطة هذا الشهر'
    },
    { 
      label: 'نسبة الحضور', 
      value: `${mockChild.attendanceRate}%`, 
      change: '+5%',
      trend: 'up',
      color: 'from-green-400 via-emerald-500 to-teal-500', 
      icon: CheckCircleIcon,
      description: 'ممتاز!'
    },
    { 
      label: 'الدروس المكتملة', 
      value: `${mockChild.completedLessons}/${mockChild.totalLessons}`, 
      change: '+3',
      trend: 'up',
      color: 'from-blue-400 via-indigo-500 to-purple-500', 
      icon: BookOpenIcon,
      description: 'درس هذا الأسبوع'
    },
    { 
      label: 'أيام متتالية', 
      value: mockChild.currentStreak.toString(), 
      change: '+2',
      trend: 'up',
      color: 'from-red-400 via-pink-500 to-purple-500', 
      icon: FireIcon,
      description: 'يوم حضور'
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'achievement',
      message: 'حصل على شارة "متعلم نشط" لإكمال 5 دروس متتالية',
      time: 'منذ ساعة',
      icon: '🏆',
      color: 'text-purple-600'
    },
    {
      id: '2',
      type: 'lesson',
      message: 'أكمل درس "قوة الصلاة" بدرجة 95%',
      time: 'منذ 3 ساعات',
      icon: '📚',
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'attendance',
      message: 'حضر قداس السبت في الكنيسة الكبرى',
      time: 'أمس',
      icon: '⛪',
      color: 'text-green-600'
    },
    {
      id: '4',
      type: 'prayer',
      message: 'سجل صلاة الصبح (20 دقيقة)',
      time: 'منذ يومين',
      icon: '🙏',
      color: 'text-indigo-600'
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      name: 'درس الكتاب المقدس',
      date: '2024-12-22',
      time: '10:00',
      location: 'قاعة الدراسة',
      type: 'lesson'
    },
    {
      id: '2',
      name: 'احتفال عيد الميلاد',
      date: '2024-12-25',
      time: '16:00',
      location: 'القاعة الكبرى',
      type: 'event'
    },
    {
      id: '3',
      name: 'اجتماع أولياء الأمور',
      date: '2024-12-28',
      time: '18:00',
      location: 'قاعة الاجتماعات',
      type: 'meeting'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل لوحة تحكم ولي الأمر...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <p className="text-lg opacity-90 font-cairo">متابعة رحلة طفلك التعليمية والروحية</p>
            </div>
            
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl">👨‍👩‍👧</span>
            </div>
          </div>
          
          {/* Child Quick Overview */}
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-75 font-cairo">المركز {mockChild.rank} من 24 شماس</span>
              <h3 className="font-bold font-cairo text-lg">{mockChild.firstName} {mockChild.lastName}</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{mockChild.balance?.totalPoints || 0}</div>
                <div className="text-xs opacity-90 font-cairo">نقطة</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{mockChild.attendanceRate}%</div>
                <div className="text-xs opacity-90 font-cairo">حضور</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{mockChild.completedLessons}</div>
                <div className="text-xs opacity-90 font-cairo">درس</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{mockChild.currentStreak}</div>
                <div className="text-xs opacity-90 font-cairo">يوم</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 font-cairo mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-cairo">{stat.label}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {stat.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-cairo">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Child Profile & Detailed Report Button */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowDetailedReport(true)}
            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-3 space-x-reverse font-medium shadow-lg hover:scale-105"
          >
            <EyeIcon className="w-6 h-6" />
            <span>عرض التقرير التفصيلي الكامل</span>
          </button>
          
          <div className="text-right">
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900 font-cairo mb-1">
                  {mockChild.firstName} {mockChild.lastName}
                </h2>
                <p className="text-gray-600 font-cairo">
                  المستوى الابتدائي • المركز {mockChild.rank} • {mockChild.balance?.totalPoints || 0} نقطة
                </p>
                <div className="flex items-center space-x-3 space-x-reverse mt-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    حضور ممتاز: {mockChild.attendanceRate}%
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {mockChild.currentStreak} يوم متتالي
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-purple-600">
                  {mockChild.firstName.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <div className="text-lg font-bold text-green-900 font-cairo">{mockChild.balance?.liturgyPoints || 0}</div>
                <div className="text-sm text-green-700 font-cairo">نقاط القداسات</div>
              </div>
              <div className="text-2xl">⛪</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <div className="text-lg font-bold text-blue-900 font-cairo">{mockChild.balance?.prayerPoints || 0}</div>
                <div className="text-sm text-blue-700 font-cairo">نقاط الصلوات</div>
              </div>
              <div className="text-2xl">🙏</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <div className="text-lg font-bold text-purple-900 font-cairo">{mockChild.balance?.studyPoints || 0}</div>
                <div className="text-sm text-purple-700 font-cairo">نقاط الدراسة</div>
              </div>
              <div className="w-6 h-6 text-purple-600">
                <BookOpenIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <div className="text-lg font-bold text-red-900 font-cairo">{mockChild.balance?.servicePoints || 0}</div>
                <div className="text-sm text-red-700 font-cairo">نقاط الخدمة</div>
              </div>
              <div className="text-2xl">❤️</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="text-purple-600 hover:text-purple-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
              عرض جميع الأنشطة →
            </button>
            <div className="flex items-center space-x-3 space-x-reverse">
              <h2 className="text-xl font-bold text-gray-900 font-cairo">أنشطة طفلك الأخيرة</h2>
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:scale-102">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-xs text-gray-500 font-cairo bg-gray-200 px-3 py-1 rounded-full">
                      {activity.time}
                    </span>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900 font-cairo">{activity.message}</p>
                      <p className="text-sm text-gray-600 font-cairo">نشاط تعليمي وروحي</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Profile & Quick Actions */}
        <div className="space-y-6">
          {/* Parent Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">
                  {user?.firstName?.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-600 font-cairo mb-4">ولي أمر مهتم</p>
              
              {/* Parent Badge */}
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <UserIcon className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-900 font-cairo">ولي أمر نشط</span>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-bold text-gray-900 font-cairo">{user?.email}</div>
                  <div className="text-gray-600 font-cairo">البريد الإلكتروني</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-bold text-gray-900 font-cairo">
                    {user?.parentInfo?.phone || '01234567890'}
                  </div>
                  <div className="text-gray-600 font-cairo">رقم الهاتف</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-cairo shadow-lg hover:scale-105">
                + رسالة جديدة
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">رسائل المعلم</h3>
                <BellIcon className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full font-cairo">جديد</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ ساعة</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">طفلك يحقق تقدماً ممتازاً!</p>
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full font-cairo">إنجاز</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ يومين</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">حصل على شارة جديدة</p>
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full font-cairo">تقرير</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ 3 أيام</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">التقرير الشهري جاهز</p>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button className="text-blue-600 hover:text-blue-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
            عرض التقويم الكامل →
          </button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <h3 className="text-xl font-bold text-gray-900 font-cairo">الجلسات القادمة</h3>
            <CalendarIcon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:scale-102">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.type === 'lesson' ? 'bg-blue-100 text-blue-800' :
                      session.type === 'event' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {session.type === 'lesson' ? 'درس' : 
                       session.type === 'event' ? 'فعالية' : 'اجتماع'}
                    </span>
                    <h4 className="font-semibold text-gray-900 font-cairo">{session.name}</h4>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                    <span className="font-cairo">📍 {session.location}</span>
                    <span className="font-cairo">⏰ {session.time}</span>
                    <span className="font-cairo">📅 {new Date(session.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>
                <div className="text-3xl">
                  {session.type === 'lesson' ? '📚' : 
                   session.type === 'event' ? '🎉' : '👥'}
                </div>
              </div>
            </div>
          ))}
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
              {mockChild.balance && mockChild.balance.totalPoints >= 1000 ? 'طفلك نجم حقيقي! 🌟' : 'طفلك في طريقه للتميز! 🚀'}
            </h3>
            <p className="text-purple-700 font-cairo">
              {mockChild.firstName} يحقق تقدماً رائعاً بنسبة حضور {mockChild.attendanceRate}% و{mockChild.balance?.totalPoints || 0} نقطة. 
              {mockChild.currentStreak >= 7 ? ' لديه سلسلة حضور ممتازة!' : ' يمكنه تحسين انتظامه أكثر.'}
            </p>
            
            {/* Parent Encouragement */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-purple-800">#{mockChild.rank}</div>
                <div className="text-xs text-purple-700 font-cairo">الترتيب</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-purple-800">{mockChild.averageScore}%</div>
                <div className="text-xs text-purple-700 font-cairo">متوسط الدرجات</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-purple-800">{mockChild.currentStreak}</div>
                <div className="text-xs text-purple-700 font-cairo">يوم متتالي</div>
              </div>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <TrophyIcon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Detailed Report Modal */}
      {showDetailedReport && (
        <ChildDetailedReport
          child={mockChild}
          onClose={() => setShowDetailedReport(false)}
        />
      )}
    </div>
  );
};

export default ParentDashboard;