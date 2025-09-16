import React from 'react';
import { UsersIcon, ClipboardDocumentCheckIcon, BellIcon, ChartBarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const ServantDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'الشمامسة', value: '24', icon: UsersIcon, color: 'from-blue-600 to-indigo-700', emoji: '👥', trend: '+2 هذا الأسبوع' },
    { label: 'نسبة الحضور', value: '89%', icon: ClipboardDocumentCheckIcon, color: 'from-green-600 to-emerald-700', emoji: '✅', trend: '+5% من الأسبوع الماضي' },
    { label: 'الرسائل', value: '5', icon: BellIcon, color: 'from-amber-600 to-orange-700', emoji: '💌', trend: '2 عاجلة' },
    { label: 'الجلسات', value: '12/16', icon: ChartBarIcon, color: 'from-purple-600 to-pink-700', emoji: '📊', trend: '4 متبقية' },
  ];

  const recentAttendance = [
    { name: 'يوحنا سمير', stage: 'ابتدائي', level: '1', status: 'present', lastSeen: 'اليوم', avatar: '👦', mood: 'happy' },
    { name: 'مريم يوسف', stage: 'ابتدائي', level: '2', status: 'absent', lastSeen: 'منذ يومين', avatar: '👧', mood: 'sad' },
    { name: 'داود إبراهيم', stage: 'إعدادي', level: '1', status: 'late', lastSeen: 'اليوم', avatar: '🧒', mood: 'neutral' },
    { name: 'سارة مينا', stage: 'ابتدائي', level: '1', status: 'present', lastSeen: 'اليوم', avatar: '👧', mood: 'excited' },
  ];

  const quickActions = [
    { title: 'تسجيل الحضور', description: 'سجل من حضر اليوم', emoji: '📝', color: 'from-green-600 to-teal-700' },
    { title: 'إرسال تنبيه', description: 'شارك الأخبار المهمة', emoji: '📢', color: 'from-amber-600 to-orange-700' },
    { title: 'عرض التقارير', description: 'راجع إحصائيات التقدم', emoji: '📈', color: 'from-blue-600 to-indigo-700' },
    { title: 'التواصل مع الأهل', description: 'شارك الأخبار الجيدة', emoji: '📞', color: 'from-rose-600 to-pink-700' },
  ];

  const studentHighlights = [
    { name: 'إيما', achievement: 'أكملت 5 دروس هذا الأسبوع!', emoji: '🌟', color: 'bg-yellow-50 border-yellow-200' },
    { name: 'أليكس', achievement: 'ساعد 3 زملاء في الاختبارات', emoji: '🤝', color: 'bg-blue-50 border-blue-200' },
    { name: 'صوفيا', achievement: 'حضور مثالي لمدة أسبوعين!', emoji: '🎯', color: 'bg-green-50 border-green-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-gray-700 to-slate-800 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 left-4 text-6xl opacity-20">👨‍🏫</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-20">❤️</div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 space-x-reverse mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl">🌟</span>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold">
                أهلاً أستاذ {user?.firstName}! 👋
              </h1>
              <p className="text-slate-200 text-lg font-cairo">
                مستعد لإلهام القلوب الصغيرة اليوم؟
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse text-sm justify-end">
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>إحداث فرق</span>
              <HeartIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>24 شماس رائع</span>
              <span>🎓</span>
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
        {/* Student Attendance */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <button className="bg-gradient-to-r from-green-600 to-teal-700 text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all">
                ✅ تسجيل الحضور
              </button>
              <div className="flex items-center space-x-3 space-x-reverse">
                <h2 className="text-xl font-bold text-gray-900">الشمامسة الرائعون</h2>
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentAttendance.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-lg">
                      {student.mood === 'happy' ? '😊' : 
                       student.mood === 'excited' ? '🤩' : 
                       student.mood === 'sad' ? '😢' : '😐'}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{student.lastSeen}</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      student.status === 'present' ? 'bg-green-100 text-green-800' :
                      student.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.status === 'present' ? '✅ حاضر!' : 
                       student.status === 'late' ? '⏰ متأخر' : '❌ غائب'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="text-right">
                      <h3 className="font-bold text-gray-900 font-cairo">{student.name}</h3>
                      <p className="text-sm text-gray-600 font-cairo">{student.stage} - المستوى {student.level}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-xl">{student.avatar}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">الإجراءات السريعة</h2>
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {quickActions.map((action, index) => (
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

      {/* Student Highlights & Weekly Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">إنجازات الطلاب</h2>
              <span className="text-2xl">🌟</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {studentHighlights.map((highlight, index) => (
                <div key={index} className={`p-4 rounded-2xl border-2 ${highlight.color}`}>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-right">
                      <h3 className="font-bold text-gray-900">{highlight.name}</h3>
                      <p className="text-sm text-gray-700">{highlight.achievement}</p>
                    </div>
                    <span className="text-2xl">{highlight.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-3xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-4 left-4 text-6xl opacity-20">📊</div>
          <div className="relative z-10 p-6 text-right">
            <div className="flex items-center space-x-3 space-x-reverse mb-6 justify-end">
              <h2 className="text-xl font-bold">تأثير هذا الأسبوع</h2>
              <span className="text-2xl">📈</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">12</span>
                <span className="font-medium">الدروس المُدرَّسة</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">24</span>
                <span className="font-medium">الطلاب المساعدون</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">∞</span>
                <span className="font-medium">الابتسامات المُنشأة</span>
              </div>
              <div className="mt-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <p className="text-sm italic">
                  "أنت تُحدث فرقاً حقيقياً في هذه الحياة الصغيرة! استمر في العمل الرائع! 💖"
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