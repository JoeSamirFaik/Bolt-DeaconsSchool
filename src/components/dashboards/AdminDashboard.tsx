import React from 'react';
import { UsersIcon, BookOpenIcon, ClipboardDocumentCheckIcon, Cog6ToothIcon, ChartBarIcon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'إجمالي المستخدمين', value: '148', icon: UsersIcon, color: 'text-blue-600', bgColor: 'bg-blue-50', trend: '+12 هذا الأسبوع' },
    { label: 'الدروس النشطة', value: '32', icon: BookOpenIcon, color: 'text-green-600', bgColor: 'bg-green-50', trend: '5 جديدة هذا الشهر' },
    { label: 'الاختبارات', value: '24', icon: ClipboardDocumentCheckIcon, color: 'text-purple-600', bgColor: 'bg-purple-50', trend: '8 مكتملة اليوم' },
    { label: 'صحة النظام', value: '99.9%', icon: Cog6ToothIcon, color: 'text-orange-600', bgColor: 'bg-orange-50', trend: 'جميع الأنظمة تعمل!' },
  ];

  const usersByRole = [
    { role: 'الشمامسة', count: 89, color: 'bg-blue-100', icon: '🎓', growth: '+5' },
    { role: 'المعلمون', count: 12, color: 'bg-green-100', icon: '👨‍🏫', growth: '+2' },
    { role: 'الأهل', count: 45, color: 'bg-purple-100', icon: '👨‍👩‍👧', growth: '+8' },
    { role: 'المديرون', count: 2, color: 'bg-orange-100', icon: '⚡', growth: '0' },
  ];

  const recentActivities = [
    { activity: 'تم رفع درس جديد "الصلاة"', time: 'منذ ساعتين', type: 'content', icon: '📚', priority: 'high' },
    { activity: '5 شمامسة انضموا هذا الأسبوع', time: 'منذ يوم', type: 'users', icon: '👥', priority: 'medium' },
    { activity: 'تم إكمال النسخ الاحتياطي بنجاح', time: 'منذ يومين', type: 'system', icon: '💾', priority: 'low' },
    { activity: 'تم إرسال التقارير الشهرية', time: 'منذ 3 أيام', type: 'reports', icon: '📈', priority: 'medium' },
  ];

  const systemAlerts = [
    { message: 'صيانة نهاية الأسبوع مجدولة', type: 'info', priority: 'high', icon: '🔧' },
    { message: '2 من إجابات الاختبارات في انتظار مراجعتك', type: 'warning', priority: 'medium', icon: '⏰' },
    { message: 'تم إكمال النسخ الاحتياطي - جميع البيانات آمنة', type: 'success', priority: 'low', icon: '✅' },
  ];

  const quickManagementActions = [
    { title: 'إدارة المستخدمين', description: 'إضافة أعضاء جدد', icon: '👥', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
    { title: 'رفع المحتوى', description: 'مشاركة دروس جديدة', icon: '📚', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
    { title: 'إرسال الإشعارات', description: 'نشر الأخبار المهمة', icon: '📢', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
    { title: 'إنشاء التقارير', description: 'رؤية التقدم', icon: '📊', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white">👑</span>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900 font-cairo mb-2">
              المدير {user?.firstName}!
            </h1>
            <p className="text-gray-600 font-cairo text-lg mb-3">
              أنت تصنع السحر للجميع!
            </p>
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
              <span className="flex items-center space-x-2 space-x-reverse bg-red-50 px-3 py-1 rounded-full">
                <span className="font-cairo">قائد النظام</span>
                <span>🚀</span>
              </span>
              <span className="flex items-center space-x-2 space-x-reverse bg-yellow-50 px-3 py-1 rounded-full">
                <span className="font-cairo">تحقيق الأحلام</span>
                <span>🌟</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 font-cairo mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600 font-cairo">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium text-right font-cairo">{stat.trend}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users by Role */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">المجتمع</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {usersByRole.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-xl font-bold text-gray-700">{item.count}</span>
                    {item.growth !== '0' && (
                      <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        {item.growth}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="font-semibold text-gray-900 font-cairo text-lg">{item.role}</span>
                    <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">الأنشطة الأخيرة</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-6 space-x-reverse p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex-1 text-right">
                    <p className="text-sm font-semibold text-gray-900 font-cairo mb-2">{activity.activity}</p>
                    <div className="flex items-center space-x-3 space-x-reverse justify-end">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                        activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {activity.priority === 'high' ? 'عالي' : activity.priority === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                      <p className="text-xs text-gray-500 font-cairo">{activity.time}</p>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                    activity.type === 'content' ? 'bg-blue-100' :
                    activity.type === 'users' ? 'bg-green-100' :
                    activity.type === 'system' ? 'bg-purple-100' : 
                    'bg-orange-100'
                  }`}>
                    <span className="text-xl">{activity.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts & Quick Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">تحديثات النظام</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 ${
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    alert.type === 'info' ? 'bg-blue-50 border-blue-200' :
                    'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                      alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.priority === 'high' ? 'عالي' : alert.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <p className="text-sm font-semibold text-gray-900 font-cairo">{alert.message}</p>
                      <span className="text-xl">{alert.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">الإجراءات السريعة</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {quickManagementActions.map((action, index) => (
                <button
                  key={index}
                  className={`w-full text-right p-6 border-2 rounded-2xl transition-all ${action.color}`}
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-cairo text-lg mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600 font-cairo">{action.description}</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="text-xl">{action.icon}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Analytics */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white p-8">
        <div className="text-right">
          <h2 className="text-2xl font-bold mb-8 font-cairo">التأثير (آخر 30 يوماً)</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/20 rounded-2xl">
              <div className="text-4xl font-bold mb-3">1,245</div>
              <div className="text-sm opacity-90 font-cairo mb-2">الدروس المكتملة</div>
              <div className="text-xs opacity-70 font-cairo">+15% من الشهر الماضي</div>
            </div>
            <div className="text-center p-6 bg-white/20 rounded-2xl">
              <div className="text-4xl font-bold mb-3">892</div>
              <div className="text-sm opacity-90 font-cairo mb-2">الاختبارات</div>
              <div className="text-xs opacity-70 font-cairo">+22% من الشهر الماضي</div>
            </div>
            <div className="text-center p-6 bg-white/20 rounded-2xl">
              <div className="text-4xl font-bold mb-3">15.2k</div>
              <div className="text-sm opacity-90 font-cairo mb-2">مشاهدات الصفحة</div>
              <div className="text-xs opacity-70 font-cairo">+8% من الشهر الماضي</div>
            </div>
            <div className="text-center p-6 bg-white/20 rounded-2xl">
              <div className="text-4xl font-bold mb-3">98.5%</div>
              <div className="text-sm opacity-90 font-cairo mb-2">وقت تشغيل النظام</div>
              <div className="text-xs opacity-70 font-cairo">موثوق دائماً!</div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white/20 rounded-2xl">
            <p className="text-center font-cairo text-lg leading-relaxed">
              "أنت تخلق بيئة تعليمية مذهلة تغير حياة الشباب كل يوم! استمر في العمل الرائع!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;