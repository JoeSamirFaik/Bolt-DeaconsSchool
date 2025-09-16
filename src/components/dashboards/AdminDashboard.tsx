import React from 'react';
import { UsersIcon, BookOpenIcon, ClipboardDocumentCheckIcon, Cog6ToothIcon, ChartBarIcon, BellIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'إجمالي المستخدمين', value: '148', icon: UsersIcon, color: 'from-blue-600 to-indigo-700', emoji: '👥', trend: '+12 هذا الأسبوع' },
    { label: 'الدروس النشطة', value: '32', icon: BookOpenIcon, color: 'from-green-600 to-emerald-700', emoji: '📚', trend: '5 جديدة هذا الشهر' },
    { label: 'الاختبارات الممتعة', value: '24', icon: ClipboardDocumentCheckIcon, color: 'from-purple-600 to-pink-700', emoji: '🎮', trend: '8 مكتملة اليوم' },
    { label: 'صحة النظام', value: '99.9%', icon: Cog6ToothIcon, color: 'from-amber-600 to-orange-700', emoji: '⚡', trend: 'جميع الأنظمة تعمل!' },
  ];

  const usersByRole = [
    { role: 'الشمامسة الرائعون', count: 89, color: 'from-blue-600 to-purple-700', emoji: '🎓', growth: '+5' },
    { role: 'المعلمون المميزون', count: 12, color: 'from-green-600 to-teal-700', emoji: '👨‍🏫', growth: '+2' },
    { role: 'الأهل الفخورون', count: 45, color: 'from-purple-600 to-pink-700', emoji: '👨‍👩‍👧', growth: '+8' },
    { role: 'المديرون الرائعون', count: 2, color: 'from-red-600 to-orange-700', emoji: '⚡', growth: '0' },
  ];

  const recentActivities = [
    { activity: 'تم رفع درس جديد "مغامرات الصلاة"! 🎉', time: 'منذ ساعتين', type: 'content', emoji: '📚', priority: 'high' },
    { activity: '5 شمامسة صغار انضموا هذا الأسبوع! 🌟', time: 'منذ يوم', type: 'users', emoji: '👥', priority: 'medium' },
    { activity: 'تم إكمال النسخ الاحتياطي بنجاح ✅', time: 'منذ يومين', type: 'system', emoji: '💾', priority: 'low' },
    { activity: 'تم إرسال التقارير الشهرية لجميع الأهل! 📊', time: 'منذ 3 أيام', type: 'reports', emoji: '📈', priority: 'medium' },
  ];

  const systemAlerts = [
    { message: 'صيانة نهاية الأسبوع مجدولة - النظام سيكون أفضل! 🚀', type: 'info', priority: 'high', emoji: '🔧' },
    { message: '2 من إجابات الاختبارات في انتظار مراجعتك 📝', type: 'warning', priority: 'medium', emoji: '⏰' },
    { message: 'تم إكمال النسخ الاحتياطي - جميع البيانات آمنة! 🛡️', type: 'success', priority: 'low', emoji: '✅' },
  ];

  const quickManagementActions = [
    { title: 'إدارة المستخدمين', description: 'إضافة أعضاء رائعين جدد!', emoji: '👥', color: 'from-blue-600 to-indigo-700' },
    { title: 'رفع المحتوى', description: 'مشاركة دروس مذهلة!', emoji: '📚', color: 'from-green-600 to-emerald-700' },
    { title: 'إرسال الإشعارات', description: 'نشر الأخبار الجيدة!', emoji: '📢', color: 'from-amber-600 to-orange-700' },
    { title: 'إنشاء التقارير', description: 'رؤية التقدم المذهل!', emoji: '📊', color: 'from-purple-600 to-pink-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-gray-700 to-slate-800 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 left-4 text-6xl opacity-20">⚡</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-20">🚀</div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 space-x-reverse mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl">👑</span>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold">
                المدير الممتاز {user?.firstName}! 🎉
              </h1>
              <p className="text-slate-200 text-lg font-cairo">
                أنت تصنع السحر للجميع!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse text-sm justify-end">
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>قائد النظام</span>
              <RocketLaunchIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>تحقيق الأحلام</span>
              <span>🌟</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="relative overflow-hidden bg-white rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-102">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`}></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-xl">{stat.emoji}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 font-cairo">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600 font-cairo">{stat.label}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium text-right font-cairo">{stat.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users by Role */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">مجتمعنا الرائع</h2>
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {usersByRole.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-lg font-bold text-gray-700">{item.count}</span>
                    {item.growth !== '0' && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-bold">
                        {item.growth}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="font-bold text-gray-900 font-cairo">{item.role}</span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-lg">{item.emoji}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">ما يحدث</h2>
              <span className="text-2xl">🎯</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 space-x-reverse p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                  <div className="flex-1 text-right">
                    <p className="text-sm font-bold text-gray-900 font-cairo">{activity.activity}</p>
                    <div className="flex items-center space-x-2 space-x-reverse mt-1 justify-end">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                        activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {activity.priority === 'high' ? 'عالي' : activity.priority === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                      <p className="text-xs text-gray-500 font-cairo">{activity.time}</p>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    activity.type === 'content' ? 'bg-gradient-to-r from-blue-600 to-purple-700' :
                    activity.type === 'users' ? 'bg-gradient-to-r from-green-600 to-teal-700' :
                    activity.type === 'system' ? 'bg-gradient-to-r from-purple-600 to-pink-700' : 
                    'bg-gradient-to-r from-amber-600 to-orange-700'
                  }`}>
                    <span className="text-lg">{activity.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts & Quick Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">تحديثات النظام</h2>
              <span className="text-2xl">🚨</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl border-2 ${
                    alert.type === 'warning' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' :
                    alert.type === 'info' ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' :
                    'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                      alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.priority === 'high' ? 'عالي' : alert.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <p className="text-sm font-bold text-gray-900">{alert.message}</p>
                      <span className="text-lg">{alert.emoji}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">القوى الخارقة</h2>
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {quickManagementActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full text-right p-4 border-2 border-gray-200 rounded-2xl hover:border-transparent transition-all duration-300 transform hover:scale-102 group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="relative flex items-center space-x-3 space-x-reverse">
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-lg">{action.emoji}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Analytics */}
      <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-3xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-4 left-4 text-6xl opacity-20">📊</div>
        <div className="relative z-10 p-6 text-right">
          <div className="flex items-center space-x-3 space-x-reverse mb-6 justify-end">
            <h2 className="text-xl font-bold">التأثير المذهل (آخر 30 يوماً)</h2>
            <span className="text-2xl">🚀</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">1,245</div>
              <div className="text-sm opacity-90">🎓 الدروس المكتملة</div>
              <div className="text-xs opacity-70 mt-1">+15% من الشهر الماضي</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">892</div>
              <div className="text-sm opacity-90">🎯 مغامرات الاختبارات</div>
              <div className="text-xs opacity-70 mt-1">+22% من الشهر الماضي</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">15.2k</div>
              <div className="text-sm opacity-90">👀 مشاهدات الصفحة</div>
              <div className="text-xs opacity-70 mt-1">+8% من الشهر الماضي</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">98.5%</div>
              <div className="text-sm opacity-90">⚡ وقت تشغيل النظام</div>
              <div className="text-xs opacity-70 mt-1">موثوق دائماً!</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            <p className="text-center italic">
              "أنت تخلق بيئة تعليمية مذهلة تغير حياة الشباب كل يوم! استمر في العمل الرائع! 🌟"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;