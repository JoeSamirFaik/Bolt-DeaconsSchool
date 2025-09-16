import React from 'react';
import { ChartBarIcon, CalendarIcon, ChatBubbleLeftRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'تقدم الطفل', value: '75%', color: 'from-blue-400 via-indigo-500 to-purple-500', trend: '+10% هذا الشهر' },
    { label: 'الدروس المكتملة', value: '15/20', color: 'from-green-400 via-emerald-500 to-teal-500', trend: '5 متبقية' },
    { label: 'نسبة الحضور', value: '92%', color: 'from-purple-400 via-indigo-500 to-blue-500', trend: 'ممتاز!' },
    { label: 'رسائل جديدة', value: '2', color: 'from-orange-400 via-red-500 to-pink-500', trend: 'من المعلم' },
  ];

  const childProgress = [
    { subject: 'الكتاب المقدس', percentage: 90, color: 'from-blue-400 to-indigo-500' },
    { subject: 'تاريخ الكنيسة', percentage: 75, color: 'from-green-400 to-emerald-500' },
    { subject: 'الصلاة والعبادة', percentage: 67, color: 'from-purple-400 to-indigo-500' },
    { subject: 'خدمة المجتمع', percentage: 75, color: 'from-orange-400 to-red-500' },
  ];

  const familyMembers = [
    { name: 'الطفل', avatar: 'ط', color: 'from-blue-400 to-indigo-500' },
    { name: 'المعلمة', avatar: 'م', color: 'from-pink-400 to-rose-500' },
    { name: 'الأب', avatar: 'أ', color: 'from-green-400 to-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex -space-x-2 space-x-reverse">
            {familyMembers.map((member, index) => (
              <div
                key={index}
                className={`w-12 h-12 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white font-bold text-sm border-3 border-white shadow-lg hover:scale-110 transition-transform duration-200`}
              >
                {member.avatar}
              </div>
            ))}
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm border-3 border-white shadow-lg hover:scale-110 transition-transform duration-200">
              +2
            </div>
          </div>
          <span className="text-sm text-gray-600 font-cairo">العائلة</span>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-4 space-x-reverse mb-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full font-cairo shadow-lg">سنوي</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full font-cairo hover:bg-gray-200 transition-colors cursor-pointer">شهري</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full font-cairo hover:bg-gray-200 transition-colors cursor-pointer">أسبوعي</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-cairo">نظرة عامة</h1>
          </div>
        </div>
      </div>

      {/* Congratulations Banner */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 rounded-3xl p-8 border border-purple-200 relative overflow-hidden shadow-lg">
        <button className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-all duration-200">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="text-right">
            <h3 className="text-2xl font-bold text-purple-900 mb-3 font-cairo">رائع! 👨‍👩‍👧</h3>
            <p className="text-purple-700 font-cairo text-lg">طفلك يحقق تقدماً ممتازاً في جميع المواد.</p>
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg">
            <ChartBarIcon className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900 font-cairo mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 font-cairo">{stat.label}</p>
              </div>
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <span className="text-white text-2xl">📊</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-cairo bg-gray-50 px-3 py-2 rounded-full">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Parent Profile Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">👨‍👩‍👧</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">{user?.firstName} {user?.lastName}</h3>
            <p className="text-gray-600 font-cairo mb-6 text-lg">ولي أمر مهتم</p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all duration-200 hover:scale-110">
                <span className="text-2xl">📧</span>
              </button>
              <button className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all duration-200 hover:scale-110">
                <span className="text-2xl">📱</span>
              </button>
              <button className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all duration-200 hover:scale-110">
                <span className="text-2xl">💬</span>
              </button>
            </div>
          </div>
        </div>

        {/* Team Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-900 font-cairo mb-2">فريق التعليم</h3>
                <p className="text-sm text-gray-600 font-cairo">هناك اجتماع في الساعة 6 مساءً.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 space-x-reverse">
              {familyMembers.map((member, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200`}
                >
                  {member.avatar}
                </div>
              ))}
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200">
                +2
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-900 font-cairo mb-2">أولياء الأمور</h3>
                <p className="text-sm text-gray-600 font-cairo">هناك اجتماع في الساعة 8 مساءً.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200">
                ع
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200">
                ف
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200">
                ن
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200">
                +4
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Child Progress */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3 space-x-reverse">
              <span className="text-blue-600 font-cairo font-medium">مقارنة بـ 2024</span>
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold text-gray-900 font-cairo mb-1">تقدم الطفل</h3>
              <p className="text-sm text-gray-600 font-cairo">سنوي</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
              <ChartBarIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="space-y-6">
            {childProgress.map((subject, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900 font-cairo">{subject.percentage}%</span>
                  <span className="text-sm text-gray-600 font-cairo">{subject.subject}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-700 shadow-sm`}
                    style={{ width: `${subject.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities and Messages */}
        <div className="space-y-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-500 font-cairo">آخر أسبوعين</span>
              <h3 className="text-xl font-bold text-gray-900 font-cairo">الأنشطة الأخيرة</h3>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg">
                <CalendarIcon className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 space-x-reverse p-3 hover:bg-gray-50 rounded-2xl transition-colors">
                <span className="text-xs text-gray-500 font-cairo bg-gray-100 px-3 py-1 rounded-full">اليوم</span>
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                <p className="text-sm text-gray-700 font-cairo flex-1">أكمل درس "قوة الصلاة"</p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse p-3 hover:bg-gray-50 rounded-2xl transition-colors">
                <span className="text-xs text-gray-500 font-cairo bg-gray-100 px-3 py-1 rounded-full">أمس</span>
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
                <p className="text-sm text-gray-700 font-cairo flex-1">حصل على 95% في اختبار الكتاب المقدس</p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse p-3 hover:bg-gray-50 rounded-2xl transition-colors">
                <span className="text-xs text-gray-500 font-cairo bg-gray-100 px-3 py-1 rounded-full">منذ 3 أيام</span>
                <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm"></div>
                <p className="text-sm text-gray-700 font-cairo flex-1">حضر يوم المجتمع</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-cairo shadow-lg hover:scale-105">
                + جديد
              </button>
              <h3 className="text-xl font-bold text-gray-900 font-cairo">رسائل المعلم</h3>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full font-cairo shadow-sm">جديد</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ ساعتين</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">طفلك يقوم بعمل رائع!</p>
                <div className="w-8 h-8 bg-purple-500 rounded-full shadow-lg"></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full font-cairo shadow-sm">تقرير</span>
                  <span className="text-xs text-gray-500 font-cairo">منذ يوم</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">التقرير الشهري جاهز</p>
                <div className="w-8 h-8 bg-blue-500 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;