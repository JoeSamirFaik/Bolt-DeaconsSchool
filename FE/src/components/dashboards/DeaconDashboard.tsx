import React from 'react';
import { useApi } from '../../hooks/useApi';
import { progressAPI, lessonsAPI, attendanceAPI } from '../../services/api';
import { BookOpenIcon, ClipboardDocumentCheckIcon, ChartBarIcon, TrophyIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const DeaconDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Fetch real data from API
  const { data: progressStats, loading: statsLoading } = useApi(() => progressAPI.getMyStats());
  const { data: myProgress, loading: progressLoading } = useApi(() => progressAPI.getMyProgress());
  const { data: attendanceStats, loading: attendanceLoading } = useApi(() => attendanceAPI.getMyAttendanceStats());
  const { data: lessons, loading: lessonsLoading } = useApi(() => 
    lessonsAPI.getLessons(user?.stage, user?.level)
  );

  // Calculate stats from real data
  const stats = [
    { 
      label: 'الدروس المكتملة', 
      value: statsLoading ? '...' : `${progressStats?.completedLessons || 0}/${progressStats?.totalLessons || 0}`, 
      icon: BookOpenIcon, 
      color: 'from-blue-400 to-purple-500', 
      emoji: '📚', 
      percentage: statsLoading ? 0 : Math.round(progressStats?.completionRate || 0)
    },
    { 
      label: 'متوسط النتائج', 
      value: statsLoading ? '...' : `${Math.round(progressStats?.averageScore || 0)}%`, 
      icon: ClipboardDocumentCheckIcon, 
      color: 'from-green-400 to-teal-500', 
      emoji: '🎯', 
      percentage: statsLoading ? 0 : Math.round(progressStats?.averageScore || 0)
    },
    { 
      label: 'التقدم العام', 
      value: statsLoading ? '...' : `${Math.round(progressStats?.completionRate || 0)}%`, 
      icon: ChartBarIcon, 
      color: 'from-purple-400 to-pink-500', 
      emoji: '📈', 
      percentage: statsLoading ? 0 : Math.round(progressStats?.completionRate || 0)
    },
    { 
      label: 'نسبة الحضور', 
      value: attendanceLoading ? '...' : `${Math.round(attendanceStats?.attendanceRate || 0)}%`, 
      icon: TrophyIcon, 
      color: 'from-yellow-400 to-orange-500', 
      emoji: '⭐', 
      percentage: attendanceLoading ? 0 : Math.round(attendanceStats?.attendanceRate || 0)
    },
  ];

  // Map real lessons with progress data
  const recentLessons = lessons?.slice(0, 4).map((lesson: any) => {
    const progress = myProgress?.find((p: any) => p.lessonId === lesson.id);
    return {
      id: lesson.id,
      title: lesson.title,
      completed: progress?.completed || false,
      score: progress?.score || null,
      emoji: '📚',
      difficulty: 'متوسط'
    };
  }) || [];

  const achievements = [
    { title: 'الخطوات الأولى', description: 'أكملت درسك الأول!', earned: true, emoji: '👶' },
    { title: 'بطل الاختبارات', description: 'حصلت على 90%+ في 5 اختبارات', earned: true, emoji: '🧠' },
    { title: 'المتعلم المثابر', description: 'حضرت 10 جلسات متتالية', earned: false, emoji: '🔥' },
    { title: 'بطل المساعدة', description: 'ساعدت 3 زملاء', earned: false, emoji: '🦸' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'دراسة الكتاب المقدس الممتعة', date: 'غداً، 7:00 مساءً', type: 'study', emoji: '📖' },
    { id: 2, title: 'تحدي الاختبار الكبير', date: 'الجمعة، 6:00 مساءً', type: 'quiz', emoji: '🎮' },
    { id: 3, title: 'يوم المجتمع المرح', date: 'الأحد، 9:00 صباحاً', type: 'service', emoji: '🎉' },
  ];

  // Show loading state
  if (statsLoading || progressLoading || attendanceLoading || lessonsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">⛪</span>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-gray-800">
            <h2 className="text-2xl font-bold mb-2 font-cairo">جاري تحميل بياناتك...</h2>
            <p className="text-gray-600 font-cairo">نحضر كل شيء من أجلك! 🎉</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 left-4 text-6xl opacity-20">🌟</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-20">⛪</div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl">👋</span>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold">
                أهلاً {user?.firstName}! 🎉
              </h1>
              <p className="text-purple-100 text-lg font-cairo">
                مستعد ليوم رائع آخر من التعلم؟
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse text-sm justify-end">
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>المرحلة: {user?.stage}</span>
              <span>🎓</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>المستوى: {user?.level}</span>
              <span>⭐</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>سلسلة 5 أيام!</span>
              <FireIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="relative overflow-hidden bg-white rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`}></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl">{stat.emoji}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 font-cairo">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600 font-cairo">{stat.label}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Lessons */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">رحلة التعلم الخاصة بك</h2>
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div key={lesson.id} className="relative overflow-hidden p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className={`w-4 h-4 rounded-full ${lesson.completed ? 'bg-green-500' : 'bg-orange-400'} animate-pulse`} />
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="text-right">
                        <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{lesson.title}</h3>
                        <div className="flex items-center space-x-3 space-x-reverse mt-1 justify-end">
                          <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                            lesson.difficulty === 'سهل' ? 'bg-green-100 text-green-800' :
                            lesson.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {lesson.difficulty}
                          </span>
                          {lesson.completed ? (
                            <>
                              <span className="text-sm text-purple-600 font-bold">🏆 {lesson.score}%</span>
                              <span className="text-sm text-green-600 font-bold flex items-center space-x-1 space-x-reverse">
                                <span>مكتمل!</span>
                                <span>✅</span>
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-orange-600 font-bold flex items-center space-x-1 space-x-reverse">
                              <span>جاهز للبدء!</span>
                              <span>🎯</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-xl">{lesson.emoji}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">الإنجازات</h2>
              <span className="text-2xl">🏆</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                  achievement.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {achievement.earned && (
                      <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                    <div className="flex-1 text-right">
                      <h3 className={`font-bold ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-xs ${achievement.earned ? 'text-yellow-600' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      achievement.earned ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}>
                      <span className="text-lg">{achievement.emoji}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events & Daily Verse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <h2 className="text-xl font-bold text-gray-900">الأحداث القادمة!</h2>
              <span className="text-2xl">🗓️</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 space-x-reverse p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100">
                  <div className="flex-1 text-right">
                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-blue-600 font-medium">{event.date}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <span className="text-lg">{event.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-4 left-4 text-6xl opacity-20">✨</div>
          <div className="relative z-10 p-6 text-right">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 justify-end">
              <h2 className="text-xl font-bold">الإلهام اليومي</h2>
              <span className="text-2xl">📖</span>
            </div>
            <blockquote className="text-lg leading-relaxed mb-4 italic">
              "لأني عرفت الأفكار التي أنا مفتكر بها عنكم، يقول الرب، أفكار سلام لا شر، لأعطيكم آخرة ورجاء."
            </blockquote>
            <p className="text-green-100 font-medium">— إرميا 29:11</p>
            <div className="mt-4 flex items-center space-x-2 space-x-reverse justify-end">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-bold transition-colors">
                📤 مشاركة
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-bold transition-colors">
                💖 أحبها!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeaconDashboard;