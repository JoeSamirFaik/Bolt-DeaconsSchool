import React, { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  ClipboardDocumentCheckIcon, 
  BellIcon, 
  ChartBarIcon,
  CalendarIcon,
  BookOpenIcon,
  TrophyIcon,
  FireIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  AcademicCapIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const ServantDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock data - in real app, this would come from APIs
  const stats = [
    { 
      label: 'إجمالي الشمامسة', 
      value: '24', 
      change: '+2',
      trend: 'up',
      color: 'from-blue-400 via-indigo-500 to-purple-500',
      icon: UsersIcon,
      description: 'شماس نشط'
    },
    { 
      label: 'متوسط الحضور', 
      value: '87%', 
      change: '+5%',
      trend: 'up',
      color: 'from-green-400 via-emerald-500 to-teal-500',
      icon: CheckCircleIcon,
      description: 'هذا الشهر'
    },
    { 
      label: 'سجلات في الانتظار', 
      value: '8', 
      change: '-3',
      trend: 'down',
      color: 'from-amber-400 via-orange-500 to-red-500',
      icon: ClipboardDocumentCheckIcon,
      description: 'تحتاج مراجعة'
    },
    { 
      label: 'الجلسات هذا الأسبوع', 
      value: '12', 
      change: '+4',
      trend: 'up',
      color: 'from-purple-400 via-indigo-500 to-blue-500',
      icon: CalendarIcon,
      description: 'جلسة مجدولة'
    },
  ];

  const topPerformers = [
    { 
      name: 'يوحنا سمير', 
      points: 1250, 
      avatar: 'ي', 
      color: 'from-amber-400 to-orange-500',
      level: 'المستوى المتوسط',
      attendanceRate: 95,
      streak: 12
    },
    { 
      name: 'مريم يوسف', 
      points: 1180, 
      avatar: 'م', 
      color: 'from-blue-400 to-indigo-500',
      level: 'المستوى الابتدائي',
      attendanceRate: 92,
      streak: 8
    },
    { 
      name: 'داود إبراهيم', 
      points: 1120, 
      avatar: 'د', 
      color: 'from-green-400 to-emerald-500',
      level: 'المستوى المتوسط',
      attendanceRate: 89,
      streak: 15
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'approval',
      message: 'تم اعتماد سجل "قداس الأحد" ليوحنا سمير',
      time: 'منذ 30 دقيقة',
      icon: '✅',
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'attendance',
      message: 'تم تسجيل حضور 18 شماس في درس الكتاب المقدس',
      time: 'منذ ساعة',
      icon: '📚',
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'achievement',
      message: 'مريم يوسف حصلت على شارة "متعلم نشط"',
      time: 'منذ ساعتين',
      icon: '🏆',
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'session',
      message: 'تم إضافة جلسة جديدة "ورشة الألحان"',
      time: 'منذ 3 ساعات',
      icon: '🎵',
      color: 'text-orange-600'
    },
    {
      id: '5',
      type: 'review',
      message: 'طلب مراجعة لسجل "دراسة شخصية" لداود إبراهيم',
      time: 'منذ 4 ساعات',
      icon: '📝',
      color: 'text-yellow-600'
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      name: 'درس الكتاب المقدس',
      date: '2024-12-22',
      time: '10:00',
      attendees: 18,
      maxAttendees: 20,
      type: 'lesson',
      location: 'قاعة الدراسة'
    },
    {
      id: '2',
      name: 'اجتماع أولياء الأمور',
      date: '2024-12-23',
      time: '18:00',
      attendees: 12,
      maxAttendees: 15,
      type: 'meeting',
      location: 'قاعة الاجتماعات'
    },
    {
      id: '3',
      name: 'رحلة إلى الدير',
      date: '2024-12-25',
      time: '08:00',
      attendees: 25,
      maxAttendees: 30,
      type: 'trip',
      location: 'دير الأنبا بيشوي'
    }
  ];

  const quickActions = [
    {
      title: 'مراجعة السجلات',
      description: 'مراجعة واعتماد سجلات الشمامسة',
      icon: ClipboardDocumentCheckIcon,
      color: 'from-amber-500 to-orange-500',
      route: 'records-approval',
      badge: '8 في الانتظار'
    },
    {
      title: 'تسجيل الحضور',
      description: 'تسجيل حضور الجلسات والفعاليات',
      icon: CheckCircleIcon,
      color: 'from-green-500 to-emerald-500',
      route: 'attendance',
      badge: '3 جلسات اليوم'
    },
    {
      title: 'تقارير الشمامسة',
      description: 'عرض تقارير مفصلة لجميع الشمامسة',
      icon: DocumentChartBarIcon,
      color: 'from-purple-500 to-indigo-500',
      route: 'reports',
      badge: '24 شماس'
    },
    {
      title: 'إدارة الشمامسة',
      description: 'إضافة وتعديل بيانات الشمامسة',
      icon: UsersIcon,
      color: 'from-blue-500 to-cyan-500',
      route: 'users-mgmt',
      badge: 'إدارة كاملة'
    }
  ];

  const monthlyStats = {
    totalActivities: 156,
    approvedActivities: 142,
    pendingReviews: 8,
    averageScore: 87,
    topCategory: 'قداسات وصلوات',
    improvement: 15
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل لوحة تحكم الخادم...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-3xl font-bold mb-2 font-cairo">أهلاً وسهلاً، {user?.firstName}! 👨‍🏫</h1>
              <p className="text-lg opacity-90 font-cairo">إدارة وتوجيه رحلة الشمامسة التعليمية</p>
            </div>
            
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl">👨‍🏫</span>
            </div>
          </div>
          
          {/* Quick Overview */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{monthlyStats.totalActivities}</div>
              <div className="text-sm opacity-90 font-cairo">إجمالي الأنشطة</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{monthlyStats.averageScore}%</div>
              <div className="text-sm opacity-90 font-cairo">متوسط الدرجات</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{monthlyStats.pendingReviews}</div>
              <div className="text-sm opacity-90 font-cairo">مراجعات معلقة</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">+{monthlyStats.improvement}%</div>
              <div className="text-sm opacity-90 font-cairo">تحسن هذا الشهر</div>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900 font-cairo">الإجراءات السريعة</h2>
            <p className="text-gray-600 font-cairo">الوصول السريع للمهام الأساسية</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg text-right group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {action.badge && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full font-medium">
                      {action.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 font-cairo mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 font-cairo">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="text-green-600 hover:text-green-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
              عرض التقارير التفصيلية →
            </button>
            <div className="flex items-center space-x-3 space-x-reverse">
              <h2 className="text-xl font-bold text-gray-900 font-cairo">أفضل الشمامسة</h2>
              <TrophyIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:scale-102">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-center font-medium">
                        {performer.attendanceRate}%
                      </div>
                      <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-center font-medium">
                        {performer.streak} يوم
                      </div>
                      <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-center font-medium">
                        {performer.points}
                      </div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-lg font-bold text-gray-900 font-cairo">{performer.name}</h3>
                      <p className="text-sm text-gray-600 font-cairo">{performer.level}</p>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <span className="text-xs text-gray-500 font-cairo">حضور</span>
                        <span className="text-xs text-gray-500 font-cairo">•</span>
                        <span className="text-xs text-gray-500 font-cairo">سلسلة</span>
                        <span className="text-xs text-gray-500 font-cairo">•</span>
                        <span className="text-xs text-gray-500 font-cairo">نقاط</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-3xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                    <div className={`w-12 h-12 bg-gradient-to-br ${performer.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                      {performer.avatar}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Servant Profile & Quick Stats */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">
                  {user?.firstName?.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-600 font-cairo mb-4">خادم متميز</p>
              
              {/* Specialization Badge */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <AcademicCapIcon className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900 font-cairo">
                    {user?.servantInfo?.specialization || 'تعليم عام'}
                  </span>
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
                    {user?.servantInfo?.phone || '01234567890'}
                  </div>
                  <div className="text-gray-600 font-cairo">رقم الهاتف</div>
                </div>
              </div>
            </div>
          </div>

          {/* This Month Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">ملخص هذا الشهر</h3>
                <ChartBarIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="text-right">
                  <div className="text-lg font-bold text-green-900 font-cairo">{monthlyStats.approvedActivities}</div>
                  <div className="text-sm text-green-700 font-cairo">نشاط معتمد</div>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                <div className="text-right">
                  <div className="text-lg font-bold text-amber-900 font-cairo">{monthlyStats.pendingReviews}</div>
                  <div className="text-sm text-amber-700 font-cairo">في انتظار المراجعة</div>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-900 font-cairo">{monthlyStats.topCategory}</div>
                  <div className="text-sm text-purple-700 font-cairo">النشاط الأكثر شيوعاً</div>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-lg">⛪</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="text-blue-600 hover:text-blue-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
              عرض جميع الأنشطة →
            </button>
            <div className="flex items-center space-x-3 space-x-reverse">
              <h3 className="text-xl font-bold text-gray-900 font-cairo">الأنشطة الأخيرة</h3>
              <BellIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 space-x-reverse p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="text-xs text-gray-500 font-cairo bg-gray-100 px-3 py-1 rounded-full">
                  {activity.time}
                </span>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <p className="text-sm text-gray-700 font-cairo flex-1">{activity.message}</p>
                <div className="text-2xl">{activity.icon}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="text-purple-600 hover:text-purple-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
              عرض التقويم →
            </button>
            <div className="flex items-center space-x-3 space-x-reverse">
              <h3 className="text-xl font-bold text-gray-900 font-cairo">الجلسات القادمة</h3>
              <CalendarIcon className="w-6 h-6 text-purple-600" />
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
                        session.type === 'meeting' ? 'bg-orange-100 text-orange-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {session.type === 'lesson' ? 'درس' : 
                         session.type === 'meeting' ? 'اجتماع' : 'رحلة'}
                      </span>
                      <h4 className="font-semibold text-gray-900 font-cairo">{session.name}</h4>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                      <span className="font-cairo">📍 {session.location}</span>
                      <span className="font-cairo">⏰ {session.time}</span>
                      <span className="font-cairo">📅 {new Date(session.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-xs text-gray-500 font-cairo">
                          {session.attendees}/{session.maxAttendees} مسجل
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-1">
                          <div
                            className="h-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                            style={{ width: `${(session.attendees / session.maxAttendees) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl">
                    {session.type === 'lesson' ? '📚' : 
                     session.type === 'meeting' ? '👥' : '🚌'}
                  </div>
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

        {/* Performance Insights */}
        <div className="space-y-6">
          {/* Monthly Performance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">أداء هذا الشهر</h3>
                <ChartBarIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-600">87%</span>
              </div>
              <p className="text-sm text-gray-600 font-cairo">متوسط الأداء العام</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-green-600">+15%</span>
                <span className="text-gray-600 font-cairo">تحسن عن الشهر الماضي</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>

          {/* Quick Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-cairo shadow-lg hover:scale-105">
                + إشعار جديد
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">الإشعارات</h3>
                <BellIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full font-cairo">جديد</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ ساعة</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">8 سجلات تحتاج مراجعة</p>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">8</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full font-cairo">تذكير</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ 3 ساعات</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">جلسة الغد في 10 صباحاً</p>
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full font-cairo">إنجاز</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ يوم</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">3 شمامسة حققوا إنجازات</p>
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <TrophyIcon className="w-3 h-3 text-white" />
                </div>
              </div>
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
              عمل رائع! 🌟
            </h3>
            <p className="text-green-700 font-cairo">
              الشمامسة تحت إشرافك يحققون تقدماً ممتازاً. متوسط الحضور {monthlyStats.averageScore}% والتحسن مستمر بنسبة +{monthlyStats.improvement}%!
            </p>
            
            {/* Achievement Highlights */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-green-800">24</div>
                <div className="text-xs text-green-700 font-cairo">شماس نشط</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-green-800">142</div>
                <div className="text-xs text-green-700 font-cairo">نشاط معتمد</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-green-800">87%</div>
                <div className="text-xs text-green-700 font-cairo">متوسط الأداء</div>
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

export default ServantDashboard;