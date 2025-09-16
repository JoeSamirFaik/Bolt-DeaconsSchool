import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  DocumentChartBarIcon,
  UsersIcon,
  TrophyIcon,
  CalendarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import DeaconReportsTable from './DeaconReportsTable';

const ReportsManagement: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'overview' | 'detailed'>('overview');

  // Mock summary statistics
  const summaryStats = {
    totalDeacons: 24,
    activeDeacons: 22,
    averagePoints: 1150,
    averageAttendance: 87,
    topPerformer: 'يوحنا سمير',
    totalActivities: 156,
    thisMonthActivities: 28,
    pendingReviews: 5
  };

  if (activeView === 'detailed') {
    return <DeaconReportsTable />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-3 space-x-reverse">
            <button
              onClick={() => setActiveView('detailed')}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
            >
              <DocumentChartBarIcon className="w-5 h-5" />
              <span>التقارير التفصيلية</span>
            </button>
          </div>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">التقارير والإحصائيات</h1>
            <p className="text-gray-600 font-cairo">نظرة شاملة على أداء جميع الشمامسة</p>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600 mb-1">{summaryStats.totalDeacons}</p>
              <p className="text-sm text-gray-600 font-cairo">إجمالي الشمامسة</p>
              <p className="text-xs text-green-600 font-cairo">{summaryStats.activeDeacons} نشط</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-amber-600 mb-1">{summaryStats.averagePoints}</p>
              <p className="text-sm text-gray-600 font-cairo">متوسط النقاط</p>
              <p className="text-xs text-gray-500 font-cairo">لكل شماس</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600 mb-1">{summaryStats.averageAttendance}%</p>
              <p className="text-sm text-gray-600 font-cairo">متوسط الحضور</p>
              <p className="text-xs text-green-600 font-cairo">ممتاز</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600 mb-1">{summaryStats.totalActivities}</p>
              <p className="text-sm text-gray-600 font-cairo">إجمالي الأنشطة</p>
              <p className="text-xs text-purple-600 font-cairo">+{summaryStats.thisMonthActivities} هذا الشهر</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpenIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">أفضل الشمامسة هذا الشهر</h3>
          <div className="space-y-4">
            {[
              { name: 'يوحنا سمير', points: 1250, rank: 1, avatar: 'ي' },
              { name: 'مريم يوسف', points: 1180, rank: 2, avatar: 'م' },
              { name: 'داود إبراهيم', points: 1120, rank: 3, avatar: 'د' },
              { name: 'سارة مينا', points: 1050, rank: 4, avatar: 'س' },
              { name: 'مرقس عادل', points: 980, rank: 5, avatar: 'م' }
            ].map((performer) => (
              <div key={performer.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-lg font-bold text-amber-600 font-cairo">{performer.points}</span>
                  <span className="text-sm text-gray-500 font-cairo">نقطة</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-sm font-medium text-gray-900 font-cairo">{performer.name}</span>
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-amber-600">{performer.avatar}</span>
                  </div>
                  <span className="text-2xl">
                    {performer.rank === 1 ? '🥇' : performer.rank === 2 ? '🥈' : performer.rank === 3 ? '🥉' : `#${performer.rank}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">توزيع الأنشطة</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-lg font-bold text-green-600">45%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-sm font-medium text-gray-900 font-cairo">قداسات وصلوات</span>
                <span className="text-2xl">⛪</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-lg font-bold text-blue-600">30%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-sm font-medium text-gray-900 font-cairo">صلوات شخصية</span>
                <span className="text-2xl">🙏</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-lg font-bold text-purple-600">15%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-sm font-medium text-gray-900 font-cairo">دراسة شخصية</span>
                <BookOpenIcon className="w-4 h-4 text-purple-600" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-lg font-bold text-red-600">10%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-sm font-medium text-gray-900 font-cairo">خدمة مجتمعية</span>
                <span className="text-2xl">❤️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">الاتجاهات الشهرية</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 font-cairo mb-2">الأداء العام</h4>
            <p className="text-3xl font-bold text-green-600 mb-2">📈</p>
            <p className="text-sm text-gray-600 font-cairo">تحسن بنسبة 15% عن الشهر الماضي</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 font-cairo mb-2">معدل الحضور</h4>
            <p className="text-3xl font-bold text-blue-600 mb-2">87%</p>
            <p className="text-sm text-gray-600 font-cairo">زيادة 5% عن الشهر الماضي</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpenIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 font-cairo mb-2">إكمال الدروس</h4>
            <p className="text-3xl font-bold text-purple-600 mb-2">78%</p>
            <p className="text-sm text-gray-600 font-cairo">متوسط إكمال الدروس</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="text-xl font-bold text-amber-900 mb-4 text-right font-cairo">إجراءات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveView('detailed')}
            className="bg-white hover:bg-gray-50 border border-amber-200 rounded-xl p-4 transition-all duration-200 hover:scale-105 text-right"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <DocumentChartBarIcon className="w-6 h-6 text-amber-600" />
              <div>
                <h4 className="font-semibold text-gray-900 font-cairo">التقارير التفصيلية</h4>
                <p className="text-sm text-gray-600 font-cairo">عرض تقارير شاملة لكل شماس</p>
              </div>
            </div>
          </button>

          <button className="bg-white hover:bg-gray-50 border border-amber-200 rounded-xl p-4 transition-all duration-200 hover:scale-105 text-right">
            <div className="flex items-center space-x-3 space-x-reverse">
              <TrophyIcon className="w-6 h-6 text-amber-600" />
              <div>
                <h4 className="font-semibold text-gray-900 font-cairo">تصدير التقارير</h4>
                <p className="text-sm text-gray-600 font-cairo">تحميل تقارير PDF أو Excel</p>
              </div>
            </div>
          </button>

          <button className="bg-white hover:bg-gray-50 border border-amber-200 rounded-xl p-4 transition-all duration-200 hover:scale-105 text-right">
            <div className="flex items-center space-x-3 space-x-reverse">
              <ChartBarIcon className="w-6 h-6 text-amber-600" />
              <div>
                <h4 className="font-semibold text-gray-900 font-cairo">الإحصائيات المتقدمة</h4>
                <p className="text-sm text-gray-600 font-cairo">تحليلات مفصلة ورسوم بيانية</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;