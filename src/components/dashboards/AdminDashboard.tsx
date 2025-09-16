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
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ServerIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock comprehensive statistics
  const systemStats = [
    { 
      label: 'إجمالي المستخدمين', 
      value: '148', 
      change: '+12',
      trend: 'up',
      color: 'from-blue-400 via-indigo-500 to-purple-500',
      icon: UsersIcon,
      description: 'مستخدم نشط',
      breakdown: { deacons: 89, servants: 12, parents: 45, admins: 2 }
    },
    { 
      label: 'سجلات في الانتظار', 
      value: '23', 
      change: '-5',
      trend: 'down',
      color: 'from-amber-400 via-orange-500 to-red-500',
      icon: ClipboardDocumentCheckIcon,
      description: 'تحتاج مراجعة',
      breakdown: { liturgy: 8, prayer: 7, study: 5, service: 3 }
    },
    { 
      label: 'متوسط الحضور', 
      value: '87%', 
      change: '+5%',
      trend: 'up',
      color: 'from-green-400 via-emerald-500 to-teal-500',
      icon: CheckCircleIcon,
      description: 'هذا الشهر',
      breakdown: { excellent: 65, good: 20, needs_improvement: 3 }
    },
    { 
      label: 'صحة النظام', 
      value: '99.9%', 
      change: '0%',
      trend: 'stable',
      color: 'from-purple-400 via-indigo-500 to-blue-500',
      icon: ServerIcon,
      description: 'جميع الأنظمة تعمل',
      breakdown: { uptime: '99.9%', performance: 'excellent', errors: 0 }
    },
  ];

  const quickActions = [
    {
      title: 'مراجعة السجلات',
      description: 'مراجعة واعتماد سجلات الشمامسة',
      icon: ClipboardDocumentCheckIcon,
      color: 'from-amber-500 to-orange-500',
      route: 'records-approval',
      badge: '23 في الانتظار',
      priority: 'high'
    },
    {
      title: 'إدارة المستخدمين',
      description: 'إضافة وتعديل الشمامسة والخدام',
      icon: UsersIcon,
      color: 'from-blue-500 to-indigo-500',
      route: 'deacon-parent-mgmt',
      badge: '148 مستخدم',
      priority: 'medium'
    },
    {
      title: 'تقارير شاملة',
      description: 'عرض تقارير مفصلة لجميع الشمامسة',
      icon: DocumentChartBarIcon,
      color: 'from-purple-500 to-indigo-500',
      route: 'deacon-reports',
      badge: 'تحليلات متقدمة',
      priority: 'medium'
    },
    {
      title: 'إدارة المحتوى',
      description: 'إدارة المستويات والمقررات والدروس',
      icon: BookOpenIcon,
      color: 'from-green-500 to-emerald-500',
      route: 'lessons-mgmt',
      badge: '32 درس نشط',
      priority: 'low'
    },
    {
      title: 'إدارة الحضور',
      description: 'تسجيل الحضور وإدارة الجلسات',
      icon: CalendarIcon,
      color: 'from-teal-500 to-cyan-500',
      route: 'attendance',
      badge: '12 جلسة هذا الأسبوع',
      priority: 'medium'
    },
    {
      title: 'إعدادات النظام',
      description: 'تخصيص وإدارة جميع جوانب النظام',
      icon: Cog6ToothIcon,
      color: 'from-red-500 to-rose-500',
      route: 'settings',
      badge: 'تحكم كامل',
      priority: 'low'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'approval',
      message: 'تم اعتماد 8 سجلات جديدة للشمامسة',
      time: 'منذ 30 دقيقة',
      icon: '✅',
      color: 'text-green-600',
      user: 'مريم يوسف'
    },
    {
      id: '2',
      type: 'user_registration',
      message: 'انضم 3 شمامسة جدد إلى المدرسة',
      time: 'منذ ساعة',
      icon: '👥',
      color: 'text-blue-600',
      user: 'نظام التسجيل'
    },
    {
      id: '3',
      type: 'content_update',
      message: 'تم إضافة درس جديد "الصلاة في الكنيسة"',
      time: 'منذ ساعتين',
      icon: '📚',
      color: 'text-purple-600',
      user: 'داود إبراهيم'
    },
    {
      id: '4',
      type: 'system_backup',
      message: 'تم إنشاء نسخة احتياطية تلقائية بنجاح',
      time: 'منذ 3 ساعات',
      icon: '💾',
      color: 'text-gray-600',
      user: 'النظام التلقائي'
    },
    {
      id: '5',
      type: 'achievement',
      message: '5 شمامسة حصلوا على إنجازات جديدة',
      time: 'منذ 4 ساعات',
      icon: '🏆',
      color: 'text-yellow-600',
      user: 'نظام الإنجازات'
    }
  ];

  const systemHealth = [
    {
      component: 'خادم قاعدة البيانات',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: 'منذ دقيقة',
      icon: '🗄️'
    },
    {
      component: 'خادم التطبيق',
      status: 'healthy',
      uptime: '100%',
      lastCheck: 'منذ دقيقة',
      icon: '⚡'
    },
    {
      component: 'نظام الإشعارات',
      status: 'healthy',
      uptime: '98.5%',
      lastCheck: 'منذ 5 دقائق',
      icon: '🔔'
    },
    {
      component: 'النسخ الاحتياطي',
      status: 'healthy',
      uptime: '100%',
      lastCheck: 'منذ ساعة',
      icon: '💾'
    }
  ];

  const topPerformers = [
    { 
      name: 'يوحنا سمير', 
      points: 1250, 
      avatar: 'ي', 
      color: 'from-amber-400 to-orange-500',
      level: 'المستوى المتوسط',
      attendanceRate: 95,
      improvement: '+15%'
    },
    { 
      name: 'مريم يوسف', 
      points: 1180, 
      avatar: 'م', 
      color: 'from-blue-400 to-indigo-500',
      level: 'المستوى الابتدائي',
      attendanceRate: 92,
      improvement: '+8%'
    },
    { 
      name: 'داود إبراهيم', 
      points: 1120, 
      avatar: 'د', 
      color: 'from-green-400 to-emerald-500',
      level: 'المستوى المتوسط',
      attendanceRate: 89,
      improvement: '+12%'
    },
  ];

  const monthlyMetrics = {
    totalActivities: 342,
    approvedActivities: 298,
    pendingReviews: 23,
    averageScore: 87,
    newRegistrations: 12,
    systemUptime: 99.9,
    dataBackups: 30,
    notificationsSent: 1247
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل لوحة تحكم المدير...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-3xl font-bold mb-2 font-cairo">أهلاً وسهلاً، {user?.firstName}! 👑</h1>
              <p className="text-lg opacity-90 font-cairo">إدارة شاملة لجميع جوانب مدرسة الشمامسة</p>
            </div>
            
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl">👑</span>
            </div>
          </div>
          
          {/* Quick System Overview */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{monthlyMetrics.totalActivities}</div>
              <div className="text-sm opacity-90 font-cairo">إجمالي الأنشطة</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{monthlyMetrics.pendingReviews}</div>
              <div className="text-sm opacity-90 font-cairo">مراجعات معلقة</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{monthlyMetrics.newRegistrations}</div>
              <div className="text-sm opacity-90 font-cairo">تسجيلات جديدة</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{monthlyMetrics.systemUptime}%</div>
              <div className="text-sm opacity-90 font-cairo">صحة النظام</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
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
                  ) : stat.trend === 'down' ? (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                  ) : (
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
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
            <p className="text-gray-600 font-cairo">الوصول السريع للمهام الإدارية الأساسية</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      action.priority === 'high' ? 'bg-red-100 text-red-800' :
                      action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
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
        {/* Top Performers & System Health */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Performers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <button className="text-amber-600 hover:text-amber-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
                عرض التقارير التفصيلية →
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h2 className="text-xl font-bold text-gray-900 font-cairo">أفضل الشمامسة</h2>
                <TrophyIcon className="w-6 h-6 text-amber-600" />
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
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-center font-medium">
                          {performer.points}
                        </div>
                        <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-center font-medium">
                          {performer.improvement}
                        </div>
                      </div>
                      <div className="text-right">
                        <h3 className="text-lg font-bold text-gray-900 font-cairo">{performer.name}</h3>
                        <p className="text-sm text-gray-600 font-cairo">{performer.level}</p>
                        <div className="flex items-center space-x-2 space-x-reverse mt-1">
                          <span className="text-xs text-gray-500 font-cairo">حضور</span>
                          <span className="text-xs text-gray-500 font-cairo">•</span>
                          <span className="text-xs text-gray-500 font-cairo">نقاط</span>
                          <span className="text-xs text-gray-500 font-cairo">•</span>
                          <span className="text-xs text-gray-500 font-cairo">تحسن</span>
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

          {/* System Health Monitor */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <button className="text-green-600 hover:text-green-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
                عرض التفاصيل →
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h2 className="text-xl font-bold text-gray-900 font-cairo">صحة النظام</h2>
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemHealth.map((component, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {component.uptime}
                        </span>
                        <span className="text-xs text-gray-500 font-cairo">{component.lastCheck}</span>
                      </div>
                      <div className="text-right">
                        <h4 className="font-semibold text-green-900 font-cairo">{component.component}</h4>
                        <p className="text-xs text-green-700 font-cairo">يعمل بشكل طبيعي</p>
                      </div>
                    </div>
                    <div className="text-2xl">{component.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Profile & Recent Activities */}
        <div className="space-y-6">
          {/* Admin Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">
                  {user?.firstName?.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-600 font-cairo mb-4">مدير النظام</p>
              
              {/* Admin Badge */}
              <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <UserIcon className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-900 font-cairo">صلاحيات كاملة</span>
                </div>
              </div>
              
              {/* Admin Stats */}
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-bold text-gray-900 font-cairo">{user?.email}</div>
                  <div className="text-gray-600 font-cairo">البريد الإلكتروني</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-bold text-gray-900 font-cairo">
                    {new Date().toLocaleDateString('ar-EG')}
                  </div>
                  <div className="text-gray-600 font-cairo">آخر تسجيل دخول</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <button className="text-blue-600 hover:text-blue-700 font-cairo font-medium hover:scale-105 transition-transform duration-200">
                عرض جميع الأنشطة →
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h2 className="text-xl font-bold text-gray-900 font-cairo">الأنشطة الأخيرة</h2>
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
                  <div className="flex-1 text-right">
                    <p className="text-sm text-gray-700 font-cairo">{activity.message}</p>
                    <p className="text-xs text-gray-500 font-cairo">بواسطة: {activity.user}</p>
                  </div>
                  <div className="text-2xl">{activity.icon}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System Metrics Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-xl font-bold text-gray-900 font-cairo">ملخص هذا الشهر</h3>
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-900 font-cairo">{monthlyMetrics.approvedActivities}</div>
                    <div className="text-sm text-green-700 font-cairo">نشاط معتمد</div>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-900 font-cairo">{monthlyMetrics.notificationsSent}</div>
                    <div className="text-sm text-blue-700 font-cairo">إشعار مرسل</div>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BellIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-900 font-cairo">{monthlyMetrics.dataBackups}</div>
                    <div className="text-sm text-purple-700 font-cairo">نسخة احتياطية</div>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ShieldCheckIcon className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-lg font-bold text-amber-900 font-cairo">{monthlyMetrics.averageScore}%</div>
                    <div className="text-sm text-amber-700 font-cairo">متوسط الدرجات</div>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <AcademicCapIcon className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Admin Tools */}
        <div className="space-y-6">
          {/* Critical Alerts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-cairo shadow-lg hover:scale-105">
                + تنبيه جديد
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">التنبيهات الهامة</h3>
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full font-cairo">عاجل</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ ساعة</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">23 سجل يحتاج مراجعة</p>
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">23</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full font-cairo">تذكير</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ 3 ساعات</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">النسخ الاحتياطي مجدول اليوم</p>
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <ClockIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full font-cairo">معلومات</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ يوم</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">12 مستخدم جديد هذا الأسبوع</p>
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick System Controls */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">تحكم سريع</h3>
                <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span className="font-medium font-cairo">نسخ احتياطي فوري</span>
                </div>
              </button>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <BellIcon className="w-5 h-5" />
                  <span className="font-medium font-cairo">إرسال إشعار عام</span>
                </div>
              </button>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <ChartBarIcon className="w-5 h-5" />
                  <span className="font-medium font-cairo">تقرير شامل</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-red-100 via-orange-100 to-amber-100 rounded-2xl p-6 border border-red-200 relative overflow-hidden hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 w-8 h-8 bg-red-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 bg-orange-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative z-10 flex items-center space-x-6 space-x-reverse">
          <div className="text-right">
            <h3 className="text-xl font-bold text-red-900 mb-2 font-cairo">
              إدارة ممتازة! 👑
            </h3>
            <p className="text-red-700 font-cairo">
              النظام يعمل بكفاءة {monthlyMetrics.systemUptime}% والمستخدمون راضون. تم اعتماد {monthlyMetrics.approvedActivities} نشاط هذا الشهر!
            </p>
            
            {/* Admin Achievement Highlights */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-red-800">{monthlyMetrics.totalActivities}</div>
                <div className="text-xs text-red-700 font-cairo">إجمالي الأنشطة</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-red-800">{monthlyMetrics.newRegistrations}</div>
                <div className="text-xs text-red-700 font-cairo">تسجيلات جديدة</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-red-800">{monthlyMetrics.systemUptime}%</div>
                <div className="text-xs text-red-700 font-cairo">صحة النظام</div>
              </div>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <TrophyIcon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;