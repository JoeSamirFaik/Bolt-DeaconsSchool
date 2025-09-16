import React from 'react';
import { BookOpenIcon, ClipboardDocumentCheckIcon, ChartBarIcon, TrophyIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const DeaconDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'الدروس المكتملة', value: '12/20', icon: BookOpenIcon, color: 'text-blue-600', bgColor: 'bg-blue-50', percentage: 60 },
    { label: 'نتائج الاختبارات', value: '8/12', icon: ClipboardDocumentCheckIcon, color: 'text-green-600', bgColor: 'bg-green-50', percentage: 67 },
    { label: 'التقدم العام', value: '60%', icon: ChartBarIcon, color: 'text-purple-600', bgColor: 'bg-purple-50', percentage: 60 },
    { label: 'النقاط', value: '1,250', icon: TrophyIcon, color: 'text-orange-600', bgColor: 'bg-orange-50', percentage: 85 },
  ];

  const recentLessons = [
    { id: 1, title: 'تاريخ الكنيسة القبطية', completed: true, score: 95, icon: '🏛️', difficulty: 'سهل' },
    { id: 2, title: 'أبطال الكتاب المقدس', completed: true, score: 88, icon: '⚔️', difficulty: 'متوسط' },
    { id: 3, title: 'قوة الصلاة', completed: false, score: null, icon: '🙏', difficulty: 'سهل' },
    { id: 4, title: 'خدمة المجتمع', completed: false, score: null, icon: '🤝', difficulty: 'صعب' },
  ];

  const achievements = [
    { title: 'الخطوات الأولى', description: 'أكملت درسك الأول!', earned: true, icon: '🎯' },
    { title: 'بطل الاختبارات', description: 'حصلت على 90%+ في 5 اختبارات', earned: true, icon: '🧠' },
    { title: 'المتعلم المثابر', description: 'حضرت 10 جلسات متتالية', earned: false, icon: '🔥' },
    { title: 'بطل المساعدة', description: 'ساعدت 3 زملاء', earned: false, icon: '🦸' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'دراسة الكتاب المقدس', date: 'غداً، 7:00 مساءً', type: 'study', icon: '📖' },
    { id: 2, title: 'اختبار تاريخ الكنيسة', date: 'الجمعة، 6:00 مساءً', type: 'quiz', icon: '📝' },
    { id: 3, title: 'خدمة المجتمع', date: 'الأحد، 9:00 صباحاً', type: 'service', icon: '🤝' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white">👋</span>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900 font-cairo mb-2">
              أهلاً {user?.firstName}!
            </h1>
            <p className="text-gray-600 font-cairo text-lg mb-3">
              مرحباً بك في رحلتك التعليمية
            </p>
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
              <span className="flex items-center space-x-2 space-x-reverse bg-blue-50 px-3 py-1 rounded-full">
                <span className="font-cairo">المرحلة: {user?.stage}</span>
                <span>🎓</span>
              </span>
              <span className="flex items-center space-x-2 space-x-reverse bg-purple-50 px-3 py-1 rounded-full">
                <span className="font-cairo">المستوى: {user?.level}</span>
                <StarIcon className="w-4 h-4" />
              </span>
              <span className="flex items-center space-x-2 space-x-reverse bg-orange-50 px-3 py-1 rounded-full">
                <span className="font-cairo">سلسلة 5 أيام!</span>
                <FireIcon className="w-4 h-4 text-orange-500" />
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
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 font-cairo mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600 font-cairo">{stat.label}</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-${stat.color.split('-')[1]}-400 transition-all duration-500`}
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Lessons */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">الدروس الأخيرة</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                  <div className={`w-4 h-4 rounded-full ${lesson.completed ? 'bg-green-500' : 'bg-orange-400'}`} />
                  <div className="flex items-center space-x-6 space-x-reverse">
                    <div className="text-right">
                      <h3 className="font-semibold text-gray-900 font-cairo text-lg mb-2">{lesson.title}</h3>
                      <div className="flex items-center space-x-4 space-x-reverse justify-end">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          lesson.difficulty === 'سهل' ? 'bg-green-100 text-green-800' :
                          lesson.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {lesson.difficulty}
                        </span>
                        {lesson.completed ? (
                          <span className="text-sm text-green-600 font-semibold">
                            ✅ {lesson.score}%
                          </span>
                        ) : (
                          <span className="text-sm text-orange-600 font-semibold">
                            ⏳ جاري التعلم
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">{lesson.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">الإنجازات</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-6 rounded-2xl border-2 transition-all ${
                  achievement.earned 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    {achievement.earned && (
                      <StarIcon className="w-6 h-6 text-yellow-500 fill-current" />
                    )}
                    <div className="flex-1 text-right">
                      <h3 className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'} font-cairo mb-1`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.earned ? 'text-yellow-600' : 'text-gray-500'} font-cairo`}>
                        {achievement.description}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      achievement.earned ? 'bg-yellow-100' : 'bg-gray-200'
                    }`}>
                      <span className="text-xl">{achievement.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events & Daily Verse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-right font-cairo">الأحداث القادمة</h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-6 space-x-reverse p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-gray-900 font-cairo text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-blue-600 font-cairo">{event.date}</p>
                  </div>
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">{event.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white p-8">
          <div className="text-right">
            <h2 className="text-2xl font-bold mb-6 font-cairo">الآية اليومية</h2>
            <blockquote className="text-xl leading-relaxed mb-6 font-cairo">
              "لأني عرفت الأفكار التي أنا مفتكر بها عنكم، يقول الرب، أفكار سلام لا شر، لأعطيكم آخرة ورجاء."
            </blockquote>
            <p className="text-blue-100 font-cairo text-lg mb-6">— إرميا 29:11</p>
            <div className="flex space-x-3 space-x-reverse justify-end">
              <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl text-sm font-medium transition-colors font-cairo">
                مشاركة
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl text-sm font-medium transition-colors font-cairo">
                حفظ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeaconDashboard;