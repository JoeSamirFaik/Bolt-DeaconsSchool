import React from 'react';
import { BookOpenIcon, ClipboardDocumentCheckIcon, ChartBarIcon, TrophyIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const DeaconDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'الدروس المكتملة', value: '12/20', percentage: 60, color: 'from-amber-400 to-orange-500' },
    { label: 'نتائج الاختبارات', value: '8/12', percentage: 67, color: 'from-red-400 to-rose-500' },
    { label: 'التقدم العام', value: '60%', percentage: 60, color: 'from-purple-400 to-indigo-500' },
    { label: 'النقاط', value: '1,250', percentage: 85, color: 'from-green-400 to-emerald-500' },
  ];

  const recentLessons = [
    { id: 1, title: 'تاريخ الكنيسة القبطية', completed: true, score: 95, color: 'from-amber-100 to-orange-100' },
    { id: 2, title: 'أبطال الكتاب المقدس', completed: true, score: 88, color: 'from-red-100 to-rose-100' },
    { id: 3, title: 'قوة الصلاة', completed: false, score: null, color: 'from-purple-100 to-indigo-100' },
    { id: 4, title: 'خدمة المجتمع', completed: false, score: null, color: 'from-green-100 to-emerald-100' },
  ];

  const teamMembers = [
    { name: 'مريم يوسف', role: 'معلمة', avatar: 'M', color: 'from-pink-400 to-rose-500' },
    { name: 'يوحنا سمير', role: 'زميل', avatar: 'ي', color: 'from-blue-400 to-indigo-500' },
    { name: 'داود إبراهيم', role: 'زميل', avatar: 'د', color: 'from-green-400 to-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex -space-x-2 space-x-reverse">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`w-10 h-10 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-lg`}
              >
                {member.avatar}
              </div>
            ))}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm border-2 border-white shadow-lg">
              +3
            </div>
          </div>
          <span className="text-sm text-gray-600 font-cairo">فريق التعلم</span>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-4 space-x-reverse mb-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full font-cairo">سنوي</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full font-cairo">شهري</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full font-cairo">أسبوعي</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">نظرة عامة</h1>
          </div>
        </div>
      </div>

      {/* Congratulations Banner */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6 border border-purple-200 relative overflow-hidden">
        <button className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="text-right">
            <h3 className="text-xl font-bold text-purple-900 mb-2 font-cairo">مبروك! 🎉</h3>
            <p className="text-purple-700 font-cairo">لقد وصلت إلى أهدافك الشهرية في التعلم.</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 font-cairo mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 font-cairo">{stat.label}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <span className="text-white text-xl">📊</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                style={{ width: `${stat.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Member Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">👨‍🎓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">{user?.firstName} {user?.lastName}</h3>
            <p className="text-gray-600 font-cairo mb-4">شماس متميز</p>
            <div className="flex justify-center space-x-3 space-x-reverse">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <span className="text-xl">📧</span>
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <span className="text-xl">📱</span>
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <span className="text-xl">💬</span>
              </button>
            </div>
          </div>
        </div>

        {/* Team Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="text-right">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">فريق التعلم</h3>
                <p className="text-sm text-gray-600 font-cairo">هناك اجتماع في الساعة 12 ظهراً.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white font-bold text-xs`}
                >
                  {member.avatar}
                </div>
              ))}
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs">
                +3
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="text-right">
                <h3 className="text-lg font-bold text-gray-900 font-cairo">فريق التصميم</h3>
                <p className="text-sm text-gray-600 font-cairo">هناك اجتماع في الساعة 3 عصراً.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                س
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                ع
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                م
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs">
                +1
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-blue-600 font-cairo">مقارنة بـ 2024</span>
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold text-gray-900 font-cairo">الدخل</h3>
              <p className="text-sm text-gray-600 font-cairo">سنوي</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 mb-4">
            <h4 className="text-lg font-bold text-gray-900 font-cairo mb-2">المبيعات</h4>
            <div className="h-32 flex items-end justify-center">
              <div className="text-6xl">📈</div>
            </div>
          </div>
        </div>

        {/* Activities and Issues */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 font-cairo">آخر أسبوعين</span>
              <h3 className="text-lg font-bold text-gray-900 font-cairo">الأنشطة الأخيرة</h3>
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center">
                <BellIcon className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-xs text-gray-500 font-cairo">7:16 ص</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-700 font-cairo">تم شراء ترخيص موسع من المالية.</p>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-xs text-gray-500 font-cairo">2:59 ص</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-700 font-cairo">⭐⭐⭐⭐⭐ تم استلام تقييم جديد.</p>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-xs text-gray-500 font-cairo">10:11 م</span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-700 font-cairo">تم حل مشكلة العميل.</p>
              </div>
            </div>
          </div>

          {/* John's Issue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors font-cairo">
                + جديد
              </button>
              <h3 className="text-lg font-bold text-gray-900 font-cairo">مشكلة يوحنا</h3>
              <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-rose-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600">⚠️</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded font-cairo">جديد</span>
                  <span className="text-xs text-gray-500 font-cairo">في يوم واحد</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">المنتجات الجديدة ستكون...</p>
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded font-cairo">تحديث</span>
                  <span className="text-xs text-gray-500 font-cairo">في يومين</span>
                </div>
                <p className="text-sm font-medium text-gray-900 font-cairo">صور الغلاف ستكون...</p>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeaconDashboard;