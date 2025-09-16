import React, { useState, useEffect } from 'react';
import { 
  BookOpenIcon, 
  ClipboardDocumentCheckIcon, 
  CalendarIcon,
  TrophyIcon,
  FireIcon,
  ChartBarIcon,
  BellIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const DeaconDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [totalXP, setTotalXP] = useState(0);
  const [xpBreakdown, setXpBreakdown] = useState({
    lessons: 0,
    liturgies: 0,
    prayers: 0,
    achievements: 0
  });

  useEffect(() => {
    // Simulate loading and calculate XP
    setTimeout(() => {
      calculateTotalXP();
      setLoading(false);
    }, 1000);
  }, []);

  const calculateTotalXP = () => {
    // Mock data - in real app, this would come from APIs
    const completedLessons = 12; // From lessons completed
    const liturgyAttendance = 8; // From attendance records (liturgy type)
    const prayerSessions = 15; // From attendance records (prayer type)
    const unlockedAchievements = 4; // From achievements system
    
    const breakdown = {
      lessons: completedLessons * 50, // 50 XP per lesson
      liturgies: liturgyAttendance * 50, // 50 XP per liturgy
      prayers: prayerSessions * 25, // 25 XP per prayer
      achievements: unlockedAchievements * 100 // 100 XP per achievement
    };
    
    const total = breakdown.lessons + breakdown.liturgies + breakdown.prayers + breakdown.achievements;
    
    setXpBreakdown(breakdown);
    setTotalXP(total);
  };

  // Mock data - in real app, this would come from APIs
  const stats = [
    { 
      label: 'الدروس المكتملة', 
      value: '12', 
      total: '20',
      percentage: 60, 
      color: 'from-blue-400 via-indigo-500 to-purple-500',
      icon: BookOpenIcon,
      trend: '+3 هذا الأسبوع'
    },
    { 
      label: 'نسبة الحضور', 
      value: '89%', 
      percentage: 89, 
      color: 'from-green-400 via-emerald-500 to-teal-500',
      icon: ClipboardDocumentCheckIcon,
      trend: 'ممتاز!'
    },
    { 
      label: 'النقاط المكتسبة',
      value: totalXP.toLocaleString(),
      percentage: 85, 
      color: 'from-amber-400 via-orange-500 to-red-500',
      icon: TrophyIcon,
      trend: `+${(xpBreakdown.lessons + xpBreakdown.liturgies + xpBreakdown.prayers) > 0 ? Math.floor((xpBreakdown.lessons + xpBreakdown.liturgies + xpBreakdown.prayers) * 0.1) : 150} هذا الشهر`
    },
    { 
      label: 'أيام الحضور المتتالية', 
      value: '7', 
      percentage: 70, 
      color: 'from-red-400 via-pink-500 to-purple-500',
      icon: FireIcon,
      trend: 'استمر!'
    },
  ];

  const upcomingSessions = [
    {
      id: '1',
      name: 'درس الكتاب المقدس',
      type: 'lesson',
      date: '2024-12-22',
      time: '10:00',
      location: 'قاعة الدراسة',
      icon: '📚'
    },
    {
      id: '2',
      name: 'ورشة الألحان',
      type: 'lesson',
      date: '2024-12-24',
      time: '11:00',
      location: 'قاعة الموسيقى',
      icon: '🎵'
    },
    {
      id: '3',
      name: 'احتفال عيد الميلاد',
      type: 'event',
      date: '2024-12-25',
      time: '16:00',
      location: 'القاعة الكبرى',
      icon: '🎉'
    }
  ];

  const recentAchievements = [
    {
      id: '1',
      title: 'متعلم نشط',
      description: 'أكمل 5 دروس متتالية',
      icon: '📚',
      color: 'from-blue-400 to-indigo-500',
      unlockedAt: '2024-12-15'
    },
    {
      id: '2',
      title: 'نجم الحضور',
      description: '7 أيام حضور متتالية',
      icon: '🔥',
      color: 'from-red-400 to-rose-500',
      unlockedAt: '2024-12-18'
    },
    {
      id: '3',
      title: 'محب الصلاة',
      description: 'سجل 10 صلوات شخصية',
      icon: '🙏',
      color: 'from-purple-400 to-indigo-500',
      unlockedAt: '2024-12-20'
    }
  ];

  const currentLevel = {
    name: 'المستوى الابتدائي',
    progress: 60,
    totalSubjects: 5,
    completedSubjects: 3,
    nextMilestone: 'إكمال مقرر تاريخ الكنيسة'
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل لوحة التحكم...</p>
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
              <h1 className="text-3xl font-bold mb-2 font-cairo">مرحباً، {user?.firstName}! 👋</h1>
              <p className="text-lg opacity-90 font-cairo">استمر في رحلتك التعليمية المميزة</p>
            </div>
            
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl">🎓</span>
            </div>
          </div>
          
          {/* Quick Level Progress */}
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-75 font-cairo">{currentLevel.completedSubjects}/{currentLevel.totalSubjects} مقررات مكتملة</span>
              <h3 className="font-bold font-cairo">{currentLevel.name}</h3>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-1000"
                style={{ width: `${currentLevel.progress}%` }}
              ></div>
            </div>
            <p className="text-sm opacity-75 font-cairo mt-2">التالي: {currentLevel.nextMilestone}</p>
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
              
              {stat.percentage && (
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-700`}
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500 font-cairo bg-gray-50 px-3 py-1 rounded-full text-center">
                {stat.trend}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Level Progress */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="text-amber-600 hover:text-amber-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
              عرض التفاصيل →
            </button>
            <div className="flex items-center space-x-3 space-x-reverse">
              <h2 className="text-xl font-bold text-gray-900 font-cairo">تقدمي الحالي</h2>
              <AcademicCapIcon className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          
          {/* Level Progress Card */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-right">
                <h3 className="text-2xl font-bold text-amber-900 font-cairo mb-2">{currentLevel.name}</h3>
                <p className="text-amber-700 font-cairo">المقرر التالي: {currentLevel.nextMilestone}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">{currentLevel.progress}%</span>
              </div>
            </div>
            
            <div className="w-full bg-white/50 rounded-full h-4 shadow-inner">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-1000 shadow-lg"
                style={{ width: `${currentLevel.progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-sm text-amber-800">
              <span className="font-cairo">{currentLevel.completedSubjects} من {currentLevel.totalSubjects} مقررات</span>
              <span className="font-cairo">نسبة النجاح: 70%</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-4 transition-all duration-200 hover:scale-105 group">
              <div className="text-center">
                <BookOpenIcon className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-blue-900 font-cairo text-sm">الدروس</h4>
                <p className="text-xs text-blue-700 font-cairo">متابعة التعلم</p>
              </div>
            </button>
            
            <button className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl p-4 transition-all duration-200 hover:scale-105 group">
              <div className="text-center">
                <CalendarIcon className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-purple-900 font-cairo text-sm">التقويم</h4>
                <p className="text-xs text-purple-700 font-cairo">الجلسات القادمة</p>
              </div>
            </button>
            
            <button className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-4 transition-all duration-200 hover:scale-105 group">
              <div className="text-center">
                <ClipboardDocumentCheckIcon className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-green-900 font-cairo text-sm">الحضور</h4>
                <p className="text-xs text-green-700 font-cairo">سجل حضورك</p>
              </div>
            </button>
          </div>
        </div>

        {/* Achievements & Profile */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">
                  {user?.firstName?.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-600 font-cairo mb-4">شماس متميز</p>
              
              {/* Level Badge */}
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <AcademicCapIcon className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-900 font-cairo">{currentLevel.name}</span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="font-bold text-gray-900">المستوى 5</div>
                  <div className="text-gray-600 font-cairo">الحالي</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="font-bold text-gray-900">{totalXP.toLocaleString()}</div>
                  <div className="text-gray-600 font-cairo">نقطة</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <button className="text-amber-600 hover:text-amber-700 font-cairo font-medium text-sm hover:scale-105 transition-transform duration-200">
                عرض الكل →
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">الإنجازات الأخيرة</h3>
                <TrophyIcon className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} bg-opacity-10 border border-opacity-20 hover:scale-105 transition-transform duration-200`}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-right flex-1">
                      <h4 className="font-bold text-gray-900 font-cairo text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600 font-cairo">{achievement.description}</p>
                      <p className="text-xs text-gray-500 font-cairo mt-1">
                        {new Date(achievement.unlockedAt).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                    <div className="text-2xl">{achievement.icon}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* XP Breakdown */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-md font-bold text-gray-900 mb-3 text-right font-cairo">مصادر النقاط</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-600">{xpBreakdown.lessons}</div>
                  <div className="text-xs text-gray-600 font-cairo">دروس (50 XP لكل درس)</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-600">{xpBreakdown.liturgies}</div>
                  <div className="text-xs text-gray-600 font-cairo">قداسات (50 XP لكل قداس)</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-600">{xpBreakdown.prayers}</div>
                  <div className="text-xs text-gray-600 font-cairo">صلوات (25 XP لكل صلاة)</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-amber-600">{xpBreakdown.achievements}</div>
                  <div className="text-xs text-gray-600 font-cairo">إنجازات (100 XP لكل إنجاز)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="text-blue-600 hover:text-blue-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
              عرض التقويم →
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
                        session.type === 'lesson' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {session.type === 'lesson' ? 'درس' : 'فعالية'}
                      </span>
                      <h4 className="font-semibold text-gray-900 font-cairo">{session.name}</h4>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                      <span className="font-cairo">📍 {session.location}</span>
                      <span className="font-cairo">⏰ {session.time}</span>
                      <span className="font-cairo">📅 {new Date(session.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                  <div className="text-3xl">{session.icon}</div>
                </div>
              </div>
            ))}
          </div>
          
          {upcomingSessions.length === 0 && (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-cairo">لا توجد جلسات قادمة</p>
            </div>
          )}
        </div>

        {/* Recent Activity & Notifications */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 font-cairo">آخر 7 أيام</span>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">النشاط الأخير</h3>
                <ChartBarIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="text-xs text-gray-500 font-cairo bg-gray-100 px-2 py-1 rounded-full">اليوم</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-700 font-cairo flex-1">أكملت درس "قوة الصلاة" بنجاح</p>
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="text-xs text-gray-500 font-cairo bg-gray-100 px-2 py-1 rounded-full">أمس</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-700 font-cairo flex-1">حضرت قداس الأحد</p>
                <span className="text-lg">⛪</span>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="text-xs text-gray-500 font-cairo bg-gray-100 px-2 py-1 rounded-full">منذ 3 أيام</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-sm text-gray-700 font-cairo flex-1">حصلت على 95% في اختبار الكتاب المقدس</p>
                <StarIcon className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">ابدأ الآن</h3>
                <PlayIcon className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <BookOpenIcon className="w-5 h-5" />
                  <span className="font-medium font-cairo">متابعة الدرس التالي</span>
                </div>
              </button>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <span className="text-lg">⛪</span>
                  <span className="font-medium font-cairo">إضافة قداس</span>
                </div>
              </button>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <span className="text-lg">🙏</span>
                  <span className="font-medium font-cairo">إضافة صلاة</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-2xl p-6 border border-green-200 relative overflow-hidden hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 w-8 h-8 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 bg-emerald-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative z-10 flex items-center space-x-6 space-x-reverse">
          <div className="text-right">
            <h3 className="text-xl font-bold text-green-900 mb-2 font-cairo">
              {totalXP >= 2000 ? 'أنت نجم حقيقي! 🌟' : 
               totalXP >= 1000 ? 'استمر في التميز! 🌟' : 
               'ابدأ رحلتك نحو التميز! 🚀'}
            </h3>
            <p className="text-green-700 font-cairo">
              {totalXP >= 2000 ? 
                `لديك ${totalXP.toLocaleString()} نقطة! أنت من أفضل الشمامسة في المدرسة.` :
               totalXP >= 1000 ? 
                `رائع! لديك ${totalXP.toLocaleString()} نقطة. ${currentLevel.progress >= 80 ? 'أوشكت على الانتهاء!' : 'استمر في التقدم!'}` :
                `لديك ${totalXP.toLocaleString()} نقطة. أضف المزيد من الصلوات والقداسات لتحصل على نقاط إضافية!`
              }
            </p>
            
            {/* XP Goals */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-green-800">+50 XP</div>
                <div className="text-xs text-green-700 font-cairo">قداس</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-green-800">+25 XP</div>
                <div className="text-xs text-green-700 font-cairo">صلاة</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-green-800">+50 XP</div>
                <div className="text-xs text-green-700 font-cairo">درس</div>
              </div>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <TrophyIcon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeaconDashboard;