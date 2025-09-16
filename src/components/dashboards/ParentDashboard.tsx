import React from 'react';
import { ChartBarIcon, CalendarIcon, ChatBubbleLeftRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'تقدم الطفل', value: '75%', icon: ChartBarIcon, color: 'text-blue-600', bgColor: 'bg-blue-50', trend: '+10% هذا الشهر' },
    { label: 'الدروس المكتملة', value: '15/20', icon: DocumentTextIcon, color: 'text-green-600', bgColor: 'bg-green-50', trend: '5 متبقية' },
    { label: 'نسبة الحضور', value: '92%', icon: CalendarIcon, color: 'text-purple-600', bgColor: 'bg-purple-50', trend: 'ممتاز!' },
    { label: 'رسائل جديدة', value: '2', icon: ChatBubbleLeftRightIcon, color: 'text-orange-600', bgColor: 'bg-orange-50', trend: 'من المعلم' },
  ];

  const childProgress = [
    { subject: 'الكتاب المقدس', completed: 18, total: 20, percentage: 90, icon: '📖', color: 'bg-blue-600' },
    { subject: 'تاريخ الكنيسة', completed: 12, total: 16, percentage: 75, icon: '🏛️', color: 'bg-green-600' },
    { subject: 'الصلاة والعبادة', completed: 8, total: 12, percentage: 67, icon: '🙏', color: 'bg-purple-600' },
    { subject: 'خدمة المجتمع', completed: 6, total: 8, percentage: 75, icon: '🤝', color: 'bg-orange-600' },
  ];

  const recentActivities = [
    { activity: 'أكمل درس "قوة الصلاة"', date: 'اليوم', type: 'lesson', icon: '🙏' },
    { activity: 'حصل على 95% في اختبار الكتاب المقدس', date: 'أمس', type: 'quiz', icon: '🏆' },
    { activity: 'حضر يوم المجتمع', date: 'منذ 3 أيام', type: 'attendance', icon: '🎉' },
    { activity: 'حصل على شارة "بطل المساعدة"', date: 'منذ أسبوع', type: 'achievement', icon: '🦸' },
  ];

  const messages = [
    { from: 'المعلمة مريم', subject: 'طفلك يقوم بعمل رائع!', time: 'منذ ساعتين', read: false, priority: 'high', icon: '🌟' },
    { from: 'إدارة المدرسة', subject: 'التقرير الشهري جاهز', time: 'منذ يوم', read: false, priority: 'normal', icon: '📊' },
    { from: 'المعلمة مريم', subject: 'احتفال الأهل القادم', time: 'منذ 3 أيام', read: true, priority: 'normal', icon: '🎉' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white">👨‍👩‍👧</span>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900 font-cairo mb-2">
              أهلاً {user?.firstName}!
            </h1>
            <p className="text-gray-600 font-cairo text-lg mb-3">
              طفلك يقوم بعمل رائع! إليك رحلته...
            </p>
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
              <span className="flex items-center space-x-2 space-x-reverse bg-purple-50 px-3 py-1 rounded-full">
                <span className="font-cairo">والد فخور</span>
                <span>❤️</span>
              </span>
              <span className="flex items-center space-x-2 space-x-reverse bg-yellow-50 px-3 py-1 rounded-full">
                <span className="font-cairo">دعم النمو</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Child's Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">تقدم التعلم</h2>
          </div>
          <div className="p-8">
            <div className="space-y-8">
              {childProgress.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-purple-600">{subject.percentage}%</span>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="text-right">
                        <h3 className="font-semibold text-gray-900 font-cairo text-lg mb-1">{subject.subject}</h3>
                        <span className="text-sm text-gray-600 font-cairo">{subject.completed}/{subject.total} مكتمل</span>
                      </div>
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <span className="text-xl">{subject.icon}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${subject.color} transition-all duration-500`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">الأنشطة الأخيرة</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-6 space-x-reverse p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex-1 text-right">
                    <p className="text-sm font-semibold text-gray-900 font-cairo mb-1">{activity.activity}</p>
                    <p className="text-xs text-gray-500 font-cairo">{activity.date}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                    activity.type === 'lesson' ? 'bg-blue-100' :
                    activity.type === 'quiz' ? 'bg-green-100' :
                    activity.type === 'attendance' ? 'bg-purple-100' : 
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

      {/* Messages & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">رسائل من المعلمين</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    message.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500 font-cairo">{message.time}</span>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      {message.priority === 'high' && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">مهم!</span>
                      )}
                      <span className="text-sm font-semibold text-gray-900 font-cairo">{message.from}</span>
                      <span className="text-xl">{message.icon}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 text-right font-cairo mb-2">{message.subject}</p>
                  {!message.read && (
                    <div className="flex items-center space-x-2 space-x-reverse justify-end">
                      <span className="text-xs text-blue-600 font-semibold font-cairo">رسالة جديدة!</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg text-white p-8">
          <div className="text-right">
            <h2 className="text-2xl font-bold mb-8 font-cairo">الإجراءات السريعة</h2>
            <div className="space-y-4">
              <button className="w-full text-right p-4 bg-white/20 hover:bg-white/30 rounded-2xl transition-all">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div>
                    <h3 className="font-semibold font-cairo text-lg mb-1">اتصال بالمعلم</h3>
                    <p className="text-xs opacity-80 font-cairo">جدولة محادثة</p>
                  </div>
                  <span className="text-2xl">📞</span>
                </div>
              </button>
              
              <button className="w-full text-right p-4 bg-white/20 hover:bg-white/30 rounded-2xl transition-all">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div>
                    <h3 className="font-semibold font-cairo text-lg mb-1">التقرير الكامل</h3>
                    <p className="text-xs opacity-80 font-cairo">تحميل التقدم</p>
                  </div>
                  <span className="text-2xl">📊</span>
                </div>
              </button>
              
              <button className="w-full text-right p-4 bg-white/20 hover:bg-white/30 rounded-2xl transition-all">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div>
                    <h3 className="font-semibold font-cairo text-lg mb-1">عرض التقويم</h3>
                    <p className="text-xs opacity-80 font-cairo">الأحداث القادمة</p>
                  </div>
                  <span className="text-2xl">📅</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher's Special Note */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg text-white p-8">
        <div className="text-right">
          <h2 className="text-2xl font-bold mb-6 font-cairo">ملاحظة خاصة من المعلم</h2>
          <div className="bg-white/20 border-2 border-white/30 rounded-2xl p-6">
            <p className="text-xl leading-relaxed font-cairo mb-6">
              "طفلك رائع تماماً! يُظهر حماساً كبيراً للتعلم ويساعد زملاءه دائماً. 
              أسئلته مدروسة ومشاركته تُنير الفصل بأكمله. استمر في تشجيع فضوله في المنزل - إنه مميز حقاً!"
            </p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-3 space-x-reverse">
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors font-cairo">
                  مشاركة
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors font-cairo">
                  حفظ
                </button>
              </div>
              <p className="text-sm font-medium font-cairo">— المعلمة مريم، ديسمبر 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;