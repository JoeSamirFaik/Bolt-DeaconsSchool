import React from 'react';
import { ChartBarIcon, CalendarIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'تقدم الطفل', value: '75%', icon: ChartBarIcon, color: 'from-blue-600 to-purple-700', emoji: '📈', trend: '+10% هذا الشهر' },
    { label: 'الدروس المكتملة', value: '15/20', icon: DocumentTextIcon, color: 'from-green-600 to-emerald-700', emoji: '📚', trend: '5 متبقية' },
    { label: 'نسبة الحضور', value: '92%', icon: CalendarIcon, color: 'from-purple-600 to-pink-700', emoji: '🎯', trend: 'ممتاز!' },
    { label: 'رسائل جديدة', value: '2', icon: ChatBubbleLeftRightIcon, color: 'from-amber-600 to-orange-700', emoji: '💌', trend: 'من المعلم' },
  ];

  const childProgress = [
    { subject: 'مغامرات الكتاب المقدس', completed: 18, total: 20, percentage: 90, emoji: '📖', color: 'from-blue-600 to-purple-700' },
    { subject: 'تاريخ الكنيسة الممتع', completed: 12, total: 16, percentage: 75, emoji: '🏛️', color: 'from-green-600 to-teal-700' },
    { subject: 'الصلاة والعبادة', completed: 8, total: 12, percentage: 67, emoji: '🙏', color: 'from-purple-600 to-pink-700' },
    { subject: 'أبطال المجتمع', completed: 6, total: 8, percentage: 75, emoji: '🤝', color: 'from-amber-600 to-orange-700' },
  ];

  const recentActivities = [
    { activity: 'أكمل درس "قوة الصلاة"', date: 'اليوم', type: 'lesson', emoji: '🙏', mood: 'excited' },
    { activity: 'حصل على 95% في اختبار أبطال الكتاب المقدس', date: 'أمس', type: 'quiz', emoji: '🏆', mood: 'proud' },
    { activity: 'حضر يوم المجتمع الممتع', date: 'منذ 3 أيام', type: 'attendance', emoji: '🎉', mood: 'happy' },
    { activity: 'حصل على شارة "بطل المساعدة"', date: 'منذ أسبوع', type: 'achievement', emoji: '🦸', mood: 'amazing' },
  ];

  const messages = [
    { from: 'المعلمة مريم', subject: 'طفلك يقوم بعمل رائع! 🌟', time: 'منذ ساعتين', read: false, priority: 'high', emoji: '🌟' },
    { from: 'إدارة المدرسة', subject: 'التقرير الشهري الممتع جاهز! 📊', time: 'منذ يوم', read: false, priority: 'normal', emoji: '📊' },
    { from: 'المعلمة مريم', subject: 'احتفال الأهل القادم! 🎉', time: 'منذ 3 أيام', read: true, priority: 'normal', emoji: '🎉' },
  ];

  const childMoods = ['😊', '🤩', '😇', '🥳', '😍'];
  const randomMood = childMoods[Math.floor(Math.random() * childMoods.length)];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-gray-700 to-slate-800 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 left-4 text-6xl opacity-20">👨‍👩‍👧</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-20">💖</div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 space-x-reverse mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl">{randomMood}</span>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold">
                أهلاً {user?.firstName}! 👋
              </h1>
              <p className="text-slate-200 text-lg font-cairo">
                طفلك يقوم بعمل رائع! إليك رحلته...
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse text-sm justify-end">
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>والد فخور</span>
              <HeartIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>دعم نموهم</span>
              <StarIcon className="w-4 h-4" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Child's Progress */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">تقدم التعلم</h2>
              <span className="text-2xl">🌟</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {childProgress.map((subject, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-purple-600">{subject.percentage}%</span>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="text-right">
                        <h3 className="font-bold text-gray-900 font-cairo">{subject.subject}</h3>
                        <span className="text-sm text-gray-600 font-cairo">{subject.completed}/{subject.total} مكتمل</span>
                      </div>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${subject.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-lg">{subject.emoji}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-500 relative overflow-hidden`}
                      style={{ width: `${subject.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">المغامرات الأخيرة</h2>
              <span className="text-2xl">🎯</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 space-x-reverse p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                  <div className="flex-1 text-right">
                    <p className="text-sm font-bold text-gray-900">{activity.activity}</p>
                    <div className="flex items-center space-x-2 space-x-reverse mt-1 justify-end">
                      <span className="text-sm">
                        {activity.mood === 'excited' ? '🤩' : 
                         activity.mood === 'proud' ? '😎' : 
                         activity.mood === 'happy' ? '😊' : '🌟'}
                      </span>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    activity.type === 'lesson' ? 'bg-gradient-to-r from-blue-600 to-purple-700' :
                    activity.type === 'quiz' ? 'bg-gradient-to-r from-green-600 to-teal-700' :
                    activity.type === 'attendance' ? 'bg-gradient-to-r from-purple-600 to-pink-700' : 
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

      {/* Messages & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">رسائل من المعلمين</h2>
              <span className="text-2xl">💌</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                    message.read ? 'bg-gray-50 border-gray-200' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{message.time}</span>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      {message.priority === 'high' && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">مهم!</span>
                      )}
                      <span className="text-sm font-bold text-gray-900">{message.from}</span>
                      <span className="text-lg">{message.emoji}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700 text-right">{message.subject}</p>
                  {!message.read && (
                    <div className="flex items-center space-x-2 space-x-reverse mt-2 justify-end">
                      <span className="text-xs text-blue-600 font-bold">رسالة جديدة!</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-3xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-4 left-4 text-6xl opacity-20">🚀</div>
          <div className="relative z-10 p-6 text-right">
            <div className="flex items-center space-x-3 space-x-reverse mb-6 justify-end">
              <h2 className="text-xl font-bold">الإجراءات السريعة</h2>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="space-y-4">
              <button className="w-full text-right p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all backdrop-blur-sm">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div>
                    <h3 className="font-bold">اتصال بالمعلم</h3>
                    <p className="text-xs opacity-80">جدولة محادثة</p>
                  </div>
                  <span className="text-lg">📞</span>
                </div>
              </button>
              
              <button className="w-full text-right p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all backdrop-blur-sm">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div>
                    <h3 className="font-bold">التقرير الكامل</h3>
                    <p className="text-xs opacity-80">تحميل التقدم</p>
                  </div>
                  <span className="text-lg">📊</span>
                </div>
              </button>
              
              <button className="w-full text-right p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all backdrop-blur-sm">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div>
                    <h3 className="font-bold">عرض التقويم</h3>
                    <p className="text-xs opacity-80">الأحداث القادمة</p>
                  </div>
                  <span className="text-lg">📅</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher's Special Note */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-4 left-4 text-6xl opacity-20">💖</div>
        <div className="relative z-10 p-6 text-right">
          <div className="flex items-center space-x-3 space-x-reverse mb-4 justify-end">
            <h2 className="text-xl font-bold">ملاحظة خاصة من المعلم</h2>
            <span className="text-2xl">✨</span>
          </div>
          <div className="bg-white/20 border-2 border-white/30 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-lg italic leading-relaxed">
              "طفلك رائع تماماً! يُظهر حماساً كبيراً للتعلم ويساعد زملاءه دائماً. 
              أسئلته مدروسة ومشاركته تُنير الفصل بأكمله. استمر في تشجيع فضوله في المنزل - إنه مميز حقاً! 🌟"
            </p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2 space-x-reverse">
                <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-bold transition-colors">
                  📤 مشاركة
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-bold transition-colors">
                  💖 أحب هذا!
                </button>
              </div>
              <p className="text-sm font-bold">— المعلمة مريم، ديسمبر 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;