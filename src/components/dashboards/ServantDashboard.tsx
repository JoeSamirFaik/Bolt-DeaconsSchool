import React from 'react';
import { UsersIcon, ClipboardDocumentCheckIcon, BellIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const ServantDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'الشمامسة', value: '24', icon: UsersIcon, color: 'text-blue-600', bgColor: 'bg-blue-50', trend: '+2 هذا الأسبوع' },
    { label: 'نسبة الحضور', value: '89%', icon: ClipboardDocumentCheckIcon, color: 'text-green-600', bgColor: 'bg-green-50', trend: '+5% من الأسبوع الماضي' },
    { label: 'الرسائل', value: '5', icon: BellIcon, color: 'text-orange-600', bgColor: 'bg-orange-50', trend: '2 عاجلة' },
    { label: 'الجلسات', value: '12/16', icon: ChartBarIcon, color: 'text-purple-600', bgColor: 'bg-purple-50', trend: '4 متبقية' },
  ];

  const recentAttendance = [
    { name: 'يوحنا سمير', stage: 'ابتدائي', level: '1', status: 'present', lastSeen: 'اليوم', avatar: '👦' },
    { name: 'مريم يوسف', stage: 'ابتدائي', level: '2', status: 'absent', lastSeen: 'منذ يومين', avatar: '👧' },
    { name: 'داود إبراهيم', stage: 'إعدادي', level: '1', status: 'late', lastSeen: 'اليوم', avatar: '🧒' },
    { name: 'سارة مينا', stage: 'ابتدائي', level: '1', status: 'present', lastSeen: 'اليوم', avatar: '👧' },
  ];

  const quickActions = [
    { title: 'تسجيل الحضور', description: 'سجل من حضر اليوم', icon: '📝', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
    { title: 'إرسال تنبيه', description: 'شارك الأخبار المهمة', icon: '📢', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
    { title: 'عرض التقارير', description: 'راجع إحصائيات التقدم', icon: '📊', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
    { title: 'التواصل مع الأهل', description: 'شارك الأخبار الجيدة', icon: '📞', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
  ];

  const studentHighlights = [
    { name: 'إيما', achievement: 'أكملت 5 دروس هذا الأسبوع!', icon: '🌟', color: 'bg-yellow-50 border-yellow-200' },
    { name: 'أليكس', achievement: 'ساعد 3 زملاء في الاختبارات', icon: '🤝', color: 'bg-blue-50 border-blue-200' },
    { name: 'صوفيا', achievement: 'حضور مثالي لمدة أسبوعين!', icon: '🎯', color: 'bg-green-50 border-green-200' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white">👨‍🏫</span>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900 font-cairo mb-2">
              أهلاً أستاذ {user?.firstName}!
            </h1>
            <p className="text-gray-600 font-cairo text-lg mb-3">
              مستعد لإلهام القلوب الصغيرة اليوم؟
            </p>
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
              <span className="flex items-center space-x-2 space-x-reverse bg-green-50 px-3 py-1 rounded-full">
                <span className="font-cairo">24 شماس رائع</span>
                <span>🎓</span>
              </span>
              <span className="flex items-center space-x-2 space-x-reverse bg-red-50 px-3 py-1 rounded-full">
                <span className="font-cairo">إحداث فرق</span>
                <span>❤️</span>
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
        {/* Student Attendance */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors font-cairo">
                تسجيل الحضور
              </button>
              <h2 className="text-2xl font-bold text-gray-900 font-cairo">الشمامسة</h2>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {recentAttendance.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-sm text-gray-500 font-cairo">{student.lastSeen}</span>
                    <span className={`px-4 py-2 text-xs font-medium rounded-full ${
                      student.status === 'present' ? 'bg-green-100 text-green-800' :
                      student.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.status === 'present' ? 'حاضر' : 
                       student.status === 'late' ? 'متأخر' : 'غائب'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 space-x-reverse">
                    <div className="text-right">
                      <h3 className="font-semibold text-gray-900 font-cairo text-lg mb-1">{student.name}</h3>
                      <p className="text-sm text-gray-600 font-cairo">{student.stage} - المستوى {student.level}</p>
                    </div>
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">{student.avatar}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">الإجراءات السريعة</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {quickActions.map((action, index) => (
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

      {/* Student Highlights & Weekly Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">إنجازات الطلاب</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {studentHighlights.map((highlight, index) => (
                <div key={index} className={`p-6 rounded-2xl border-2 ${highlight.color}`}>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="text-right">
                      <h3 className="font-semibold text-gray-900 font-cairo text-lg mb-1">{highlight.name}</h3>
                      <p className="text-sm text-gray-700 font-cairo">{highlight.achievement}</p>
                    </div>
                    <span className="text-3xl">{highlight.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-lg text-white p-8">
          <div className="text-right">
            <h2 className="text-2xl font-bold mb-8 font-cairo">تأثير هذا الأسبوع</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">12</span>
                <span className="font-medium font-cairo text-lg">الدروس المُدرَّسة</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">24</span>
                <span className="font-medium font-cairo text-lg">الطلاب المساعدون</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">∞</span>
                <span className="font-medium font-cairo text-lg">الابتسامات المُنشأة</span>
              </div>
              <div className="mt-8 p-6 bg-white/20 rounded-2xl">
                <p className="text-sm font-cairo leading-relaxed">
                  "أنت تُحدث فرقاً حقيقياً في هذه الحياة الصغيرة! استمر في العمل الرائع!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServantDashboard;